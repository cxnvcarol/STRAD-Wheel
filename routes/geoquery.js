/**
 * Created by CarolXimena on 30/09/2015.
 */

var pg = require('pg');
var wkt = require('terraformer-wkt-parser');
//var WKT = require('terraformer-wkt-parser');

/**
 * Creates a geojson
 * <ul>
 *        <li> <b>geometry: </b>  column name that contains the geometry
 <li> <b>tableName: </b> table from the database
 <li> <b>properties: </b> How are the properties going to be created (all, none, array with properties' names)
 </ul>
 * @param queryParams
 * @param {Object} callback function
 * @param tweets_table
 */
    //TODO setup a reliable connection (is it right to connect every time?)
function geoQuery(queryParams, callback) {

    var geojson = {
        "type": "FeatureCollection",
        "features": []
    };
    var columns = [];
    if (queryParams.properties.constructor === Array) {
        columns = queryParams.properties;
    }
    var filters={};
    if(queryParams.filters!=undefined)
    {
        filters=queryParams.filters;
    }

    var connection = new pg.Client(connectionString);
    connection.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
        var query = 'SELECT *, ST_AsText('  + queryParams.tableName+"."+ queryParams.geometry + ') AS wkt FROM ' + queryParams.tableName;


        if(filters.upzs!=undefined && filters.upzs.length>0)
        {
            query+=" LEFT JOIN upz_urban ON st_contains(upz_urban.geom, "+ queryParams.tableName+"."+ queryParams.geometry+")";
        }

        var whereStr="";
        // French data correction?
        //whereStr+=" and t_georef='G' ";
        if (filters.datesRange != undefined) {
            if(filters.datesRange[1]>filters.datesRange[0])
            {
                whereStr += ' AND '+ queryParams.tableName+'.t_datemod BETWEEN ' + "to_timestamp("+(new Date(filters.datesRange[0])).getTime()/1000+") and to_timestamp("+ new Date(filters.datesRange[1]).getTime()/1000+")";
            }
            else{
                var tEne=new Date(filters.datesRange[1]);
                tEne.setMonth(0,0);//last day of past year
                var tDic=new Date(filters.datesRange[0]);
                tDic.setMonth(12,1);
                whereStr += ' AND ('+ queryParams.tableName+'.t_datemod BETWEEN ' + "to_timestamp("+(new Date(filters.datesRange[0])).getTime()/1000+") and to_timestamp("+ tDic.getTime()/1000+") or "+ queryParams.tableName+'.t_datemod BETWEEN ' + "to_timestamp("+tEne.getTime()/1000+") and to_timestamp("+ new Date(filters.datesRange[1]).getTime()/1000+"))";
            }
        }

        if(filters.hoursRange!=undefined && filters.hoursRange.length==2) {

            var h1=filters.hoursRange[0];
            var h2=filters.hoursRange[1];
            whereStr+=" and (";
            if(h1<=h2)
            {
                whereStr+=" date_part('hour', t_datemod) between "+h1 +" and "+ h2+" ";
            }
            else{
                whereStr+=" date_part('hour', t_datemod) between "+h1 +" and "+ 23+" ";
                whereStr+=" or date_part('hour', t_datemod) between "+0 +" and "+ h2+" ";
            }
            whereStr+=")";
        }
        if(filters.upzs!=undefined && filters.upzs.length>0)
        {
            whereStr+=" and ( ";
            var strUpzs=filters.upzs.toString();
            //strUpzs=strUpzs.substr(1,strUpzs.length-2);
            whereStr+="upz_urban.gid in ("+strUpzs+")";

            whereStr+=" ) ";
        }
        if(filters.dows!=undefined && filters.dows.length>0)
        {
            var dowsStr="("+filters.dows.toString()+")";
            whereStr+=" and (date_part('dow', t_datemod) in "+ dowsStr+") ";
        }
        if(whereStr.length>0)
        {
            whereStr=" where"+whereStr.substr(4);
            query+=whereStr;
        }


        var returnFormattedResult=function(){
            //from here gives format to the result
            //console.log(query);
            connection.query(query, function (err, result) {
                if (err) {
                    console.log('error')
                    console.log(err.stack);
                }

                if (queryParams.properties == 'all') {
                    for (field in result.fields) {
                        var name = result.fields[field].name;
                        if (name != queryParams.geometry && name != 'wkt')
                            columns.push(result.fields[field].name);
                    }
                }

                for (each in result.rows) {
                    try{
                        var properties = {};
                        for (i in columns) {
                            var col = columns[i];
                            properties[col] = result.rows[each][col];
                        }

                        var geometry = wkt.parse(result.rows[each].wkt);
                        var feature = {
                            "type": "Feature",
                            "geometry": geometry,
                            "properties": properties
                        };
                        geojson.features.push(feature);
                    }

                    catch(er){
                        console.log("GEOQUERYparsing wkt... "+er);
                    }
                }
                callback(geojson);
                connection.end();
            });
        }

        if (queryParams.limit != undefined) {
            if ( queryParams.random) {
                //query += ' ORDER BY random() ';

                var countQuery="select count(*) as count from ("+query+") as subq";
                connection.query(countQuery,function(err,res){
                    var count=parseInt(res.rows[0].count);
                    var perc=queryParams.limit/(count+1);
                    query+= " and random()< "+perc;
                    returnFormattedResult();
                });
            }
            else{
                query += ' LIMIT ' + queryParams.limit;
                returnFormattedResult();
            }
        }
        else{
            returnFormattedResult();
        }
    });

}

module.exports=geoQuery;
//-------------------------------------------------------------------
