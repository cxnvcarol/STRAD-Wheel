/**
 * Created by CarolXimena on 25/11/2015.
 */


var time_radar;
var params0={};
var params1={},params2={};


// so... when any of above change I should call a delegate method defined now in the other js files. (also incomplete)
function updateViews()//this should be the delegate for the filterschange event!
{
    var p0Bef=JSON.stringify(params0);
    //A. Get filters
    params0={
        hoursRange:clone(time_radar.getTodRange()),
        datesRange: clone(time_radar.getDatesRange()),
        dows: clone(time_radar.getDows())};
    //A. end
    if(p0Bef!== JSON.stringify(params0))//There should be a nicer way, but bbbaaaahhh
    {
        $('#loader2').show();
        //updateDensities(params0);
    }

    var p2Bef=JSON.stringify(params2);
    //A. Repeat
    params2={year:clone(time_radar.getYear()),
        datesRange: clone(time_radar.getDatesRange()),
        //upzs: clone(selectedUpzs),
        //upz_names: clone(selectedUpzsNames),
        dows: clone(time_radar.getDows())};
    //A. End
    if(p2Bef!== JSON.stringify(params2))
    {
        $('#loader11').show();
        //B. Send data to the hours radar!
        plotHoursRadar(params2);
        //B. End
    }

    var p1Bef=JSON.stringify(params1);
    //A. Repeat
    params1={year:time_radar.getYear(),
        hoursRange: clone(time_radar.getTodRange()),
        //upzs: clone(selectedUpzs),
        //upz_names: clone(selectedUpzsNames)
        };
    //A. end
    if(p1Bef!== JSON.stringify(params1)) {
        $('#loader1').show();
        //C. Send data to Year radar!
        time_radar.plotDatesRadar(params1,time_radar.getDatesRange());//TODO Use new definition! (?)
        //C. End
    }
}

var deferredQueue=[];//app related


function plotDatesRadar(paramsP) {
    var params=JSON.parse(JSON.stringify(paramsP));//clone
    var filters;
    var yearRadarData=[];
    var deferred=[];
    var maxGlobal=1;//lib concern
    var totalPerDowFunc=function (dataJ) {//finding max is a lib concern
        var maxLocal=0;
        var m=dataJ.month;
        for(var ee in dataJ.data)
        {
            var val=parseFloat(dataJ.data[ee].c);
            if(val>maxLocal)
            {
                maxLocal=val;
            }
        }
        if(maxLocal>maxGlobal)
        {
            maxGlobal=maxLocal;
        }
        yearRadarData.push(dataJ);
    };

    for(var i = 0; i < 12; i++){
        params.month=(12-i);
        filters = encodeURIComponent(JSON.stringify(params));
        removeDeferredInQueue('month'+i);
        var def= $.get("/ds/dows?filters="+filters, totalPerDowFunc);
        deferred.push(def);
        deferredQueue.push({id:'month'+i,def:def});
    }
    //till here is almost ok

    $.when(deferred[0],deferred[1],deferred[2],deferred[3],deferred[4],deferred[5],deferred[6],deferred[7],deferred[8],deferred[9],deferred[10],deferred[11]).then(function(){
        radarConfigDate.maxValue=maxGlobal;//lib concern!
        yearRadarData.forEach(perDowPaint);//replace this line x add first line to year


        $('#loader1').hide();
        if(params.upz_names&&params.upz_names.length>1)
        {
            params.upz_names.forEach(function(upzName,ind){
                var params2=JSON.parse(JSON.stringify(paramsP));
                params2.upzs=[params2.upzs[ind]];
                addCurveToYearRadar(JSON.parse(JSON.stringify(params2)),upzName);//call library func
            });
        }
        updateDynamicZoom(timeFilters.dates_range);

    });

}


function removeDeferredInQueue(defid)
{
    try{
        var elem=deferredQueue.find(function(elem){return elem.id==defid;});
        if(elem){
            if(elem.def){
                elem.def.abort();
            }
            deferredQueue.splice(deferredQueue.indexOf(elem),1);
        }
    }
    catch(ee){
        try{
            var elem=findInArrayById(deferredQueue,defid);
            if(elem){
                if(elem.def){
                    elem.def.abort();
                }
                deferredQueue.splice(deferredQueue.indexOf(elem),1);
            }
        }
        catch(ee2){}
    }
}

function hoursJson(dd,legend) {//TODO This should be simplified to match the lib parameter
    if(!legend)
    {
        legend="Total per hour";
    }
    return {
        group: legend,
        axes: dd.map(function (axis) {
            return {axis: axis.h, value: parseInt(axis.c)};
        })
    };
}

function plotHoursRadar(params) {
    var filters = encodeURIComponent(JSON.stringify(params));

    removeDeferredInQueue('hours');
    var d=$.get("/ds/hours?filters=" + filters, function (dataJ) {

        time_radar.removeAllDayPlotlines();
        time_radar.addDayPlotline("Total per hour",hoursJson(dataJ.data,"Total per hour"));

        $('#loader11').hide();
        if(params.upz_names&&params.upz_names.length>1)
        {
            params.upz_names.forEach(function(upzName,ind){
                var params2=JSON.parse(JSON.stringify(params));
                params2.upzs=[params2.upzs[ind]];
                //addCurveToYearRadar(JSON.parse(JSON.stringify(params2)),upzName);
                var filters2 = encodeURIComponent(JSON.stringify(params2));
                removeDeferredInQueue('hours'+upzName);
                var d=$.get("/ds/hours?filters=" + filters2, function (dataJ) {
                    time_radar.addDayPlotline(upzName,hoursJson(dataJ.data,upzName));

                    $('#loader11').hide();
                });
                deferredQueue.push({id:'hours'+upzName,def:d});
            });
        }
    });
    deferredQueue.push({id:'hours',def:d});

}


function initialize()
{
    //createMap();
    //initializeTimeView();
    time_radar=new TimeviewTool("#timeview");
    time_radar.onChange(updateViews);
    updateViews();
}
initialize();


//unused functions now

function getAvg(data,nDays)
{
    return data.map(function(v){
        return {axis: v.axis,value: v.value/nDays};
    });
}