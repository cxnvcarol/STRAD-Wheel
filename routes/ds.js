var express = require("express");
var router = express.Router();
var geoquery = require("./geoquery");
var pg = require("pg");
var url = require( "url" );
util = require("util");
util = require("util");
var WKT = require("terraformer-wkt-parser");
//var tweets_table="tweetscompiled_2";
var tweets_table="accidentsfrance_verified";

var emptyTweetsRadarHourly=JSON.stringify([
    {h:"12am",c:0},
    {h:"1am",c:0},
    {h:"2am",c:0},
    {h:"3am",c:0},
    {h:"4am",c:0},
    {h:"5am",c:0},
    {h:"6am",c:0},
    {h:"7am",c:0},
    {h:"8am",c:0},
    {h:"9am",c:0},
    {h:"10am",c:0},
    {h:"11am",c:0},
    {h:"12m",c:0},
    {h:"1pm",c:0},
    {h:"2pm",c:0},
    {h:"3pm",c:0},
    {h:"4pm",c:0},
    {h:"5pm",c:0},
    {h:"6pm",c:0},
    {h:"7pm",c:0},
    {h:"8pm",c:0},
    {h:"9pm",c:0},
    {h:"10pm",c:0},
    {h:"11pm",c:0}
]);


var emptyTweetsRadarDows=JSON.stringify([
    {d:"Sun",c:0},
    {d:"Mon",c:0},
    {d:"Tue",c:0},
    {d:"Wed",c:0},
    {d:"Thu",c:0},
    {d:"Fri",c:0},
    {d:"Sat",c:0}
]);

Date.prototype.dayOfYear= function(){
    var j1= new Date(this);
    j1.setMonth(0, 0);
    return Math.round((this-j1)/8.64e7);
}

router.get("/upzs", function(req, res, next) {
    geoquery({
        tableName: "upz_urban",
        geometry: "geom", 					// Columna que tiene la geometr�a
        properties: ["nombre","gid"],					// Las dem�s columnas que quiero recuperar, para espec�ficas se pasan como Array
    }, function (json) {
        var arr=json.features;
        arr.sort(function(a, b) {
            //return a.properties.t_createda - b.properties.t_createda;
            return a.properties.t_datemod - b.properties.t_datemod;
        });
        res.json(arr);
    });

});


router.get("/tweets_upz", function(req, res, next) {
    var filters;
    if(req.query!=undefined)
    {
        filters= JSON.parse(req.query.filters);
    }
    upzTweetsQuery(filters, function (arr) {
        res.json(arr);
    });
});

router.get("/tweets", function(req, res, next) {
    var filters;
    if(req.query.filters!=undefined)
    {
        filters= JSON.parse(req.query.filters);
    }


    var lim = parseInt(req.query.limit||1000);

    geoquery({
        tableName: tweets_table,
        geometry: "geom", 					// Columna que tiene la geometr�a
        //properties: ["t_datemod","gid","t_text"],					// Las dem�s columnas que quiero recuperar, para espec�ficas se pasan como Array
        properties: ["t_datemod","gid","t_text","t_georef"],	//France version				// Las dem�s columnas que quiero recuperar, para espec�ficas se pasan como Array
        random: true,
        filters: filters,
        limit: lim							// Para limitar el n�mero de registros recuperados
    }, function (json) {
        var arr=json.features;
        arr.sort(function(a, b) {
            //return a.properties.t_createda - b.properties.t_createda;
            return a.properties.t_datemod - b.properties.t_datemod;
        });
        res.json(arr);
    });
});

router.get("/randomTweets", function(req, res, next) {
    var lim = parseInt(req.query.limit||100);
    geoquery({
        tableName: tweets_table,
        geometry: "geom", 					// Columna que tiene la geometr�a
        //properties: ["t_createda"],					// Las dem�s columnas que quiero recuperar, para espec�ficas se pasan como Array
        properties: ["t_datemod"],					// Las dem�s columnas que quiero recuperar, para espec�ficas se pasan como Array
        random: true,
        limit: lim							// Para limitar el n�mero de registros recuperados
    }, function (json) {
        var arr=json.features;
        arr.sort(function(a, b) {
            //return a.properties.t_createda - b.properties.t_createda;
            return a.properties.t_datemod - b.properties.t_datemod;
        });
        res.json(arr);
    });
});

function reorderHours(d)//TODO This should be in the front-side library
{
    d.reverse();
    var sliced1=d.slice(0,11);
    var sliced=d.slice(11,d.length);
    var conc=sliced.concat(sliced1);
    return conc;
}


/**
 * @param ex. [{h:20,c:25},{h:23,c:25},{h:18,c:25},{h:15,c:25},{h:10,c:25}]
 * @return [{h:20,c:25},{h:23,c:25},{h:18,c:25},{h:15,c:25},{h:10,c:25} + horas faltantes con cuenta 0]
 */
function refactorAxisesHours(d){//TODO This should be in the front-side library
    var returned= JSON.parse(emptyTweetsRadarHourly);
    for(var i in d)
    {
        var r=d[i];
        returned[r.h].c=r.c;
    }
    return returned;
}

function refactorAxisesDows(d){//TODO This should be in the front-side library
    var returned= JSON.parse(emptyTweetsRadarDows);
    for(var i in d)
    {
        var r=d[i];
        returned[r.d].c=r.c;
    }
    returned=returned.reverse();
    var poped=returned.pop();
    returned.unshift(poped);
    return returned;
}

/**
 * query grouping by hour without "where" statement... where could include geometry and range of dates
 * Format parameters: {hoursRange = [min24Hour,max24Hour],  datesRange = [0minDate,maxDate], upzs = [{polygon upz1},{}] }
 */
router.get("/hours", function(req, res, next) {
    var filters;
    if(req.query!=undefined)
    {
        filters= JSON.parse(req.query.filters);
    }
    hoursQuery(filters, function (json) {
        res.json({"totalDays":json.totalDays,data:reorderHours(refactorAxisesHours(json.data))});
    });
});


/**
 * query grouping by hour without "where" statement... where could include geometry and range of dates
 * Format parameters: {hoursRange = [min24Hour,max24Hour],  datesRange = [0minDate,maxDate], upzs = [{polygon upz1},{}] }
 */
router.get("/hours_avg", function(req, res, next) {
    var filters;
    if(req.query.filters!=undefined)
    {
        filters= JSON.parse(req.query.filters);
    }

    hoursAvgQuery(filters, function (json) {
        res.json(reorderHours(refactorAxisesHours(json)));
    });
});

//dowsQuery
router.get("/dows", function(req, res, next) {
    var filters={};
    if(req.query!=undefined)
    {
        filters= JSON.parse(req.query.filters);
    }
    dowsQuery(filters, function (json) {
        var m=-1;
        if(filters.month!=undefined)
        {
            m=parseInt(filters.month);
        }
        res.json({month:m,data:refactorAxisesDows(json)});
    });
});
var upzTweetsQuery= function (queryParams, callback){
    if(queryParams==undefined)
    {
        queryParams={};
    }
    var geojson = {
        "type": "FeatureCollection",
        "features": []
    };
    var connection = new pg.Client(connectionString);
    connection.connect(function (err) {
        if (err) {
            return console.error("could not connect to postgres", err);
        }
        var whereStr="";

        if (queryParams.datesRange != undefined) {
            if(queryParams.datesRange[1]>queryParams.datesRange[0])
            {
                whereStr += " AND "+tweets_table+".t_datemod BETWEEN " + "to_timestamp("+(new Date(queryParams.datesRange[0])).getTime()/1000+") and to_timestamp("+ new Date(queryParams.datesRange[1]).getTime()/1000+")";
            }
            else{
                var tEne=new Date(queryParams.datesRange[1]);
                tEne.setMonth(0,0);//last day of past year
                var tDic=new Date(queryParams.datesRange[0]);
                tDic.setMonth(12,1);
                whereStr += " AND ("+tweets_table+".t_datemod BETWEEN " + "to_timestamp("+(new Date(queryParams.datesRange[0])).getTime()/1000+") and to_timestamp("+ tDic.getTime()/1000+") or "+""+tweets_table+".t_datemod BETWEEN " + "to_timestamp("+tEne.getTime()/1000+") and to_timestamp("+ new Date(queryParams.datesRange[1]).getTime()/1000+"))";
            }
        }

        if(queryParams.hoursRange!=undefined && queryParams.hoursRange.length==2) {
            whereStr += " AND ";

            var h1=queryParams.hoursRange[0];
            var h2=queryParams.hoursRange[1];
            whereStr+="(";
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
        if(queryParams.dows!=undefined && queryParams.dows.length>0)
        {
            var dowsStr="("+queryParams.dows.toString()+")";
            whereStr+=" and (date_part('dow', t_datemod) in "+ dowsStr+") ";
        }

        //area in km2 // revisar factor de conversi�n a km2
        var query="select " +
            //"upz_urban.gid,upz_urban.nombre, ST_AsText(upz_urban.geom) as wkt, ST_area(upz_urban.geom)*12.4e3 as area," +
            "upz_urban.gid,upz_urban.nombre, ST_AsText(upz_urban.geom) as wkt, pop_2013/100000 as area," +//France version:
            " count("+tweets_table+".gid) as count" +
            " from" +
            " upz_urban,"+tweets_table+"" +
            " where" +
            " upz_urban.gid="+tweets_table+".upz_gid" + whereStr +
            " group by upz_urban.gid,nombre";

        //console.log(query);
        // TODO When no tweets found it doesn't get the geometry. This solves it but it becomes twice slower:
        /*
        query
            ="select gid,nombre, wkt, area, sum(count ) as count from(select upz_urban.gid,upz_urban.nombre, ST_AsText(upz_urban.geom) as wkt, pop_2013/100000 as area, 0 as count from upz_urban union("
        +query
            +") as subTot group by gid,nombre, wkt, area order by count";
        */
        connection.query(query, function (err, result) {
            if(result==undefined){

            }
            if (err) {
                console.log("error")
                console.log(err.stack);
            }
            var columns = [];
            for (field in result.fields) {
                var name = result.fields[field].name;
                if (name != queryParams.geometry && name != "wkt")
                    columns.push(result.fields[field].name);
            }

            for (each in result.rows) {
                try {

                    var properties = {};
                    for (i in columns) {
                        var col = columns[i];
                        properties[col] = result.rows[each][col];
                    }

                    var geometry = WKT.parse(result.rows[each].wkt);
                    var feature = {
                        "type": "Feature",
                        "geometry": geometry,
                        "properties": properties
                    };
                    geojson.features.push(feature);
                }
                catch(er){
                    console.log("DSparsing wkt... "+er);
                }
            }
            callback(geojson);
            connection.end();
        });
    });
};

function daydiff(first, second) {
    return Math.round((second-first)/(1000*60*60*24));
}
/**
 * @return count of tweets per hour of day according to the parameters. Ex. [{h:0, c:2800},{h:1, c:2800}{h:2, c:2800}, ..., {h:23, c:2800} ]
 * @param queryParams. Format: {hoursRange = [minHour,maxHour],  datesRange = [0minDate,maxDate], upzs = [{polygon upz1},{}] }
 * @param callback: execute when complete.. receive as parameter the result of the query
 */
var hoursQuery = function (queryParams, callback) {
    //TODO FIX This query is taking too long!! (try to avoid the left join to match the selected upzs)!!
    // explain SELECT EXTRACT (hour FROM t_datemod) as h, COUNT(EXTRACT (hour FROM t_datemod)) as c FROM tweetscompiled_2  LEFT JOIN upz_urban ON st_contains(upz_urban.geom, tweetscompiled_2.geom) where(tweetscompiled_2.t_datemod BETWEEN to_timestamp(1413583204.356) and to_timestamp(1420066749.796))  and ( date_part('dow', t_datemod) in (0,1,2,3,4,5,6))  GROUP BY h
    //
    var tdays=365;
    var geojson = [];
    var connection = new pg.Client(connectionString);
    connection.connect(function (err) {
        if (err) {
            return console.error("could not connect to postgres", err);
        }
        var query = "SELECT EXTRACT (hour FROM t_datemod) as h, COUNT(EXTRACT (hour FROM t_datemod)) as c FROM "+tweets_table+" ";

        if(queryParams.upzs!=undefined && queryParams.upzs.length>0)
        {
            query+=" LEFT JOIN upz_urban ON st_contains(upz_urban.geom, "+tweets_table+".geom)";
        }

        if(queryParams.datesRange!=undefined ||(queryParams.upzs!=undefined && queryParams.upzs.length>0)) //|| queryParams.hoursRange!=undefined
        {
            query+=" where"
            //if defined trust in the format as
            //TODO if I don"t want to change the hours, then at leastI need to put a shadow there
            /*
            if(queryParams.hoursRange!=undefined)
            {
                var h1=queryParams.hoursRange[0];
                var h2=queryParams.hoursRange[1];
                query+="(";
                if(h1<=h2)
                {
                    query+=" date_part('hour', t_datemod) between "+h1 +" and "+ h2+" ";
                }
                else{
                    query+=" date_part('hour', t_datemod) between "+h1 +" and "+ 23+" ";
                    query+=" or date_part('hour', t_datemod) between "+0 +" and "+ h2+" ";
                }
                query+=")";
            }
            */
            if(queryParams.datesRange!=undefined)
            {
                if(!query.trim().toLowerCase().match("where$"))
                {
                    query+=" and ";
                }
                query+="(";
                //should I query the day of year?... if so.. here!
                //query+=" t_datemod between to_timestamp("+(new Date(queryParams.datesRange[0])).getTime()/1000+") and to_timestamp("+ new Date(queryParams.datesRange[1]).getTime()/1000+")";
                if(queryParams.datesRange[1]>queryParams.datesRange[0])
                {
                    var dIni=new Date(queryParams.datesRange[0]);
                    var dEnd=new Date(queryParams.datesRange[1]);
                    tdays=daydiff(dIni,dEnd);
                    query+= tweets_table+".t_datemod BETWEEN " + "to_timestamp("+(dIni).getTime()/1000+") and to_timestamp("+ dEnd.getTime()/1000+")";
                }
                else{
                    var tEne=new Date(queryParams.datesRange[1]);
                    tEne.setMonth(0,0);//last day of past year
                    var tDic=new Date(queryParams.datesRange[0]);
                    tDic.setMonth(12,1);

                    var dIni=new Date(queryParams.datesRange[0]);
                    var dEnd=new Date(queryParams.datesRange[1]);
                    tdays=daydiff(dIni,tDic)+daydiff(tEne,dEnd);

                    query+= " ("+tweets_table+".t_datemod BETWEEN " + "to_timestamp("+dIni.getTime()/1000+") and to_timestamp("+ tDic.getTime()/1000+") or "+""+tweets_table+".t_datemod BETWEEN " + "to_timestamp("+tEne.getTime()/1000+") and to_timestamp("+ dEnd.getTime()/1000+"))";
                }
                query+=") ";
            }
            if(queryParams.upzs!=undefined && queryParams.upzs.length>0)
            {
                if(!query.trim().toLowerCase().match("where$"))
                {
                    query+=" and ";
                }
                query+="( ";
                var strUpzs=queryParams.upzs.toString();
                query+="upz_urban.gid in ("+strUpzs+")";
                query+=" ) ";
            }
            if(queryParams.dows!=undefined && queryParams.dows.length>0)
            {
                tdays=tdays*queryParams.dows.length/7;
                if(!query.trim().toLowerCase().match("where$"))
                {
                    query+=" and ";
                }
                query+="(";
                var dowsStr="("+queryParams.dows.toString()+")";

                query+=" date_part('dow', t_datemod) in "+ dowsStr;
                query+=") ";
            }
        }

        query+=" GROUP BY h"
        //console.log(query);
        connection.query(query, function (err, result) {
            if (err) {
                console.log("error")
                console.log(err.stack);
            }

            for (each in result.rows) {

                geojson.push(result.rows[each]);
            }

            callback({totalDays:tdays,data:geojson});
            connection.end();
        });
    });

};

var hoursAvgQuery = function (queryParams, callback) {

    //
    var geojson = [];

    var connection = new pg.Client(connectionString);
    connection.connect(function (err) {
        if (err) {
            return console.error("could not connect to postgres", err);
        }
        var query = "SELECT EXTRACT (hour FROM t_datemod) as h, COUNT(EXTRACT (hour FROM t_datemod)) as c FROM "+tweets_table+" ";



        if(queryParams.upzs!=undefined && queryParams.upzs.length>0)
        {
            query+=" LEFT JOIN upz_urban ON st_contains(upz_urban.geom, "+tweets_table+".geom)";
        }

        if(queryParams.hoursRange!=undefined ||queryParams.datesRange!=undefined ||queryParams.upzs!=undefined )
        {
            query+=" where"
            //if defined trust in the format as
            if(queryParams.hoursRange!=undefined)
            {
                var h1=queryParams.hoursRange[0];
                var h2=queryParams.hoursRange[1];
                query+="(";
                if(h1<=h2)
                {
                    query+=" date_part('hour', t_datemod) between "+h1 +" and "+ h2+" ";
                }
                else{
                    query+=" date_part('hour', t_datemod) between "+h1 +" and "+ 23+" ";
                    query+=" or date_part('hour', t_datemod) between "+0 +" and "+ h2+" ";
                }
                query+=")";
            }
            if(queryParams.datesRange!=undefined)
            {
                if(!query.trim().toLowerCase().match("where$"))
                {
                    query+=" and ";
                }
                query+="(";
                //TODO Review... this query might not work
                query+=" t_datemod between "+(new Date(queryParams.datesRange[0]))+" and "+ new Date(queryParams.datesRange[1]);
                query+=") ";
            }
            if(queryParams.upzs!=undefined && queryParams.upzs.length>0)
            {
                if(!query.trim().toLowerCase().match("where$"))
                {
                    query+=" and ";
                }
                query+="( ";
                var strUpzs=queryParams.upzs.toString();
                query+="upz_urban.gid in ("+strUpzs+")";
                query+=" ) ";
            }
        }

        query+=" GROUP BY h"
        //console.log(query);
        connection.query(query, function (err, result) {
            if (err) {
                console.log("error")
                console.log(err.stack);
            }

            // second query
            var q2="SELECT min(extract(doy FROM t_datemod)) as minday,  max(extract(doy FROM t_datemod)) as maxday FROM "+tweets_table;
            if(queryParams.datesRange!=undefined) {
                //TODO Review... this query might not work
                q2+=" where t_datemod between "+(new Date(queryParams.datesRange[0]))+" and "+ new Date(queryParams.datesRange[1]);
            }
            connection.query(q2, function (err2, result2) {//end second query
                if (err2) {
                    console.log("error2")
                    console.log(err2.stack);
                }
                for (each in result.rows) {
                    geojson.push(result.rows[each]);
                }
                if(result2.rows.length==1)
                {
                    var minmax=result2.rows[0];
                    var diffDays=1+minmax.maxday-minmax.minday;
                    geojson=geojson.map(function(v){
                        v.c= v.c/diffDays;
                        return v;
                    });
                }
                callback(geojson);

            });


            connection.end();
        });
    });

};

function countCertainDays( days, d0, d1 ) {
    var ndays = 1 + Math.round((d1-d0)/(24*3600*1000));
    var sum = function(a,b) {
        return a + Math.floor( ( ndays + (d0.getDay()+6-b) % 7 ) / 7 ); };
    return days.reduce(sum,0);
}

/**
 * @return count of tweets per day of year according to the parameters. Ex. [{dow:0, c:2800},{dow:1, c:2800}{dow:2, c:2800}, ..., {dow:6, c:2800} ]
 * @param queryParams. Format: {datesRange = [0minDate,maxDate], upzs = [{polygon upz1},{}] }
 * @param callback: execute when complete.. receive as parameter the result of the query
 */
var dowsAvgQuery = function (queryParams, callback) {
    //
    var geojson = [];

    var connection = new pg.Client(connectionString);
    connection.connect(function (err) {
        if (err) {
            return console.error("could not connect to postgres", err);
        }
        var query = "SELECT EXTRACT (dow FROM t_datemod) as d, COUNT(EXTRACT (dow FROM t_datemod)) as c FROM "+tweets_table+" ";

        if(queryParams.upzs!=undefined && queryParams.upzs.length>0)
        {
            query+=" LEFT JOIN upz_urban ON st_contains(upz_urban.geom, "+tweets_table+".geom)";
        }

        if(queryParams.month!=undefined || queryParams.hoursRange!=undefined ||queryParams.datesRange!=undefined ||queryParams.upzs!=undefined )
        {
            query+=" where"
            //if defined trust in the format as
            if( queryParams.month!=undefined)
            {
                query+=" EXTRACT(MONTH FROM t_datemod)="+queryParams.month;

            }
            if(queryParams.datesRange!=undefined)
            {
                if(!query.trim().toLowerCase().match("where$"))
                {
                    query+=" and ";
                }
                //TODO Review... this query might not work
                query+=" t_datemod between "+(new Date(queryParams.datesRange[0]))+" and "+ new Date(queryParams.datesRange[1]);
            }
            if(queryParams.hoursRange!=undefined)
            {
                if(!query.trim().toLowerCase().match("where$"))
                {
                    query+=" and ";
                }
                var h1=queryParams.hoursRange[0];
                var h2=queryParams.hoursRange[1];
                query+="(";
                if(h1<=h2)
                {
                    query+=" date_part('hour', t_datemod) between "+h1 +" and "+ h2+" ";
                }
                else{
                    query+=" date_part('hour', t_datemod) between "+h1 +" and "+ 23+" ";
                    query+=" or date_part('hour', t_datemod) between "+0 +" and "+ h2+" ";
                }
                query+=") ";
            }
            if(queryParams.upzs!=undefined)
            {
                if(!query.trim().toLowerCase().match("where$"))
                {
                    query+=" and ";
                }
                query+=" ( ";
                var strUpzs=queryParams.upzs.toString();
                query+="upz_urban.gid in ("+strUpzs+")";
                query+=" ) ";

            }
        }

        query+=" GROUP BY d"
        //console.log(query);
        connection.query(query, function (err, result) {
            if (err) {
                console.log("error")
                console.log(err.stack);
            }


            var q2="SELECT min(t_datemod) as minday,  max(t_datemod) as maxday FROM "+tweets_table;
            if(queryParams.datesRange!=undefined) {
                //TODO Review... this query might not work
                q2+=" where t_datemod between "+(new Date(queryParams.datesRange[0]))+" and "+ new Date(queryParams.datesRange[1]);
            }
            connection.query(q2, function (err2, result2){
                if (err2) {
                    console.log("error2");
                    console.log(err2.stack);
                }
                for (each in result.rows) {
                    geojson.push(result.rows[each]);
                }
                if(result2.rows.length==1)
                {
                    var minmax=result2.rows[0];

                    geojson=geojson.map(function(v,j,arr){
                        var diffDays=countCertainDays([j],new Date(minmax.minday),new Date(minmax.maxday));
                        v.c= v.c/diffDays;
                        return v;
                    });
                }
                callback(geojson);
            });


            connection.end();
        });
    });

};


/**
 * @return count of tweets per day of year according to the parameters. Ex. [{dow:0, c:2800},{dow:1, c:2800}{dow:2, c:2800}, ..., {dow:6, c:2800} ]
 * @param queryParams. Format: {datesRange = [0minDate,maxDate], upzs = [{polygon upz1},{}] }
 * @param callback: execute when complete.. receive as parameter the result of the query
 */
var dowsQuery = function (queryParams, callback) {
    //
    var geojson = [];

    var connection = new pg.Client(connectionString);
    connection.connect(function (err) {
        if (err) {
            return console.error("could not connect to postgres", err);
        }

        var query = "SELECT EXTRACT (dow FROM t_datemod) as d, COUNT(EXTRACT (dow FROM t_datemod)) as c FROM "+tweets_table+" ";



        if(queryParams.upzs!=undefined && queryParams.upzs.length>0)
        {
            query+=" LEFT JOIN upz_urban ON st_contains(upz_urban.geom, "+tweets_table+".geom)";
        }

        if(queryParams.month!=undefined || queryParams.hoursRange!=undefined ||queryParams.datesRange!=undefined ||(queryParams.upzs!=undefined && queryParams.upzs.length>0))
        {
            query+=" where"
            //if defined trust in the format as
            if( queryParams.month!=undefined)
            {
                query+=" EXTRACT(MONTH FROM t_datemod)="+queryParams.month;

            }
            if(queryParams.datesRange!=undefined)
            {
                if(!query.trim().toLowerCase().match("where$"))
                {
                    query+=" and ";
                }
                //TODO Review... this query might not work. if it was, how? (I think I"m never sending this parameter)
                query+=" t_datemod between "+(new Date(queryParams.datesRange[0]))+" and "+ new Date(queryParams.datesRange[1]);
            }
            if(queryParams.year!=undefined)
            {
                if(!query.trim().toLowerCase().match("where$"))
                {
                    query+=" and ";
                }
                query+=" date_part('year', t_datemod) ="+queryParams.year+" "
            }
            if(queryParams.hoursRange!=undefined)
            {
                if(!query.trim().toLowerCase().match("where$"))
                {
                    query+=" and ";
                }
                var h1=queryParams.hoursRange[0];
                var h2=queryParams.hoursRange[1];
                query+="(";
                if(h1<=h2)
                {
                    query+=" date_part('hour', t_datemod) between "+h1 +" and "+ h2+" ";
                }
                else{
                    query+=" date_part('hour', t_datemod) between "+h1 +" and "+ 23+" ";
                    query+=" or date_part('hour', t_datemod) between "+0 +" and "+ h2+" ";
                }
                query+=") ";
            }
            if(queryParams.upzs!=undefined && queryParams.upzs.length>0)
            {
                if(!query.trim().toLowerCase().match("where$"))
                {
                    query+=" and ";
                }
                query+=" ( ";
                var strUpzs=queryParams.upzs.toString();
                query+="upz_urban.gid in ("+strUpzs+")";
                query+=" ) ";

            }
        }

        query+=" GROUP BY d"
        //console.log(query);
        connection.query(query, function (err, result) {
            if (err) {
                console.log("error")
                console.log(err.stack);
            }

            for (each in result.rows) {

                geojson.push(result.rows[each]);
            }
            callback(geojson);
            connection.end();
        });
    });

};
module.exports = router;