/**
 * Created by CarolXimena on 14/07/2016.
 */
//Here are the exposed services of our library.

var StradWheel=function(parent_selector){



    //empty dayradar
    var empty_dayradar=[{"group":"","axes":[{"axis":"12m","value":0},{"axis":"11am","value":0},{"axis":"10am","value":0},{"axis":"9am","value":0},{"axis":"8am","value":0},{"axis":"7am","value":0},{"axis":"6am","value":0},{"axis":"5am","value":0},{"axis":"4am","value":0},{"axis":"3am","value":0},{"axis":"2am","value":0},{"axis":"1am","value":0},{"axis":"12am","value":0},{"axis":"11pm","value":0},{"axis":"10pm","value":0},{"axis":"9pm","value":0},{"axis":"8pm","value":0},{"axis":"7pm","value":0},{"axis":"6pm","value":0},{"axis":"5pm","value":0},{"axis":"4pm","value":0},{"axis":"3pm","value":0},{"axis":"2pm","value":0},{"axis":"1pm","value":0}]}];
    var empty_yearradar=[[{"group":"","axes":[{"axis":"Sun","value":0},{"axis":"Sat","value":0},{"axis":"Fri","value":0},{"axis":"Thu","value":0},{"axis":"Wed","value":0},{"axis":"Tue","value":0},{"axis":"Mon","value":0}]}],[{"group":"Total per day of week","axes":[{"axis":"Sun","value":0},{"axis":"Sat","value":0},{"axis":"Fri","value":0},{"axis":"Thu","value":0},{"axis":"Wed","value":0},{"axis":"Tue","value":0},{"axis":"Mon","value":0}]}],[{"group":"Total per day of week","axes":[{"axis":"Sun","value":0},{"axis":"Sat","value":0},{"axis":"Fri","value":0},{"axis":"Thu","value":0},{"axis":"Wed","value":0},{"axis":"Tue","value":0},{"axis":"Mon","value":0}]}],[{"group":"Total per day of week","axes":[{"axis":"Sun","value":0},{"axis":"Sat","value":0},{"axis":"Fri","value":0},{"axis":"Thu","value":0},{"axis":"Wed","value":0},{"axis":"Tue","value":0},{"axis":"Mon","value":0}]}],[{"group":"Total per day of week","axes":[{"axis":"Sun","value":0},{"axis":"Sat","value":0},{"axis":"Fri","value":0},{"axis":"Thu","value":0},{"axis":"Wed","value":0},{"axis":"Tue","value":0},{"axis":"Mon","value":0}]}],[{"group":"Total per day of week","axes":[{"axis":"Sun","value":0},{"axis":"Sat","value":0},{"axis":"Fri","value":0},{"axis":"Thu","value":0},{"axis":"Wed","value":0},{"axis":"Tue","value":0},{"axis":"Mon","value":0}]}],[{"group":"Total per day of week","axes":[{"axis":"Sun","value":0},{"axis":"Sat","value":0},{"axis":"Fri","value":0},{"axis":"Thu","value":0},{"axis":"Wed","value":0},{"axis":"Tue","value":0},{"axis":"Mon","value":0}]}],[{"group":"Total per day of week","axes":[{"axis":"Sun","value":0},{"axis":"Sat","value":0},{"axis":"Fri","value":0},{"axis":"Thu","value":0},{"axis":"Wed","value":0},{"axis":"Tue","value":0},{"axis":"Mon","value":0}]}],[{"group":"Total per day of week","axes":[{"axis":"Sun","value":0},{"axis":"Sat","value":0},{"axis":"Fri","value":0},{"axis":"Thu","value":0},{"axis":"Wed","value":0},{"axis":"Tue","value":0},{"axis":"Mon","value":0}]}],[{"group":"Total per day of week","axes":[{"axis":"Sun","value":0},{"axis":"Sat","value":0},{"axis":"Fri","value":0},{"axis":"Thu","value":0},{"axis":"Wed","value":0},{"axis":"Tue","value":0},{"axis":"Mon","value":0}]}],[{"group":"Total per day of week","axes":[{"axis":"Sun","value":0},{"axis":"Sat","value":0},{"axis":"Fri","value":0},{"axis":"Thu","value":0},{"axis":"Wed","value":0},{"axis":"Tue","value":0},{"axis":"Mon","value":0}]}],[{"group":"Total per day of week","axes":[{"axis":"Sun","value":0},{"axis":"Sat","value":0},{"axis":"Fri","value":0},{"axis":"Thu","value":0},{"axis":"Wed","value":0},{"axis":"Tue","value":0},{"axis":"Mon","value":0}]}]];

    var empty_day_template=JSON.stringify([
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

    this.example_yearparam=[{"m":0,"d":0,"v":2.5},{"m":0,"d":1,"v":1.2},{"m":0,"d":2,"v":10},{"m":0,"d":3,"v":7.4},{"m":0,"d":4,"v":10},{"m":0,"d":5,"v":10},{"m":0,"d":6,"v":10},{"m":1,"d":0,"v":10},{"m":1,"d":1,"v":10},{"m":1,"d":2,"v":10},{"m":1,"d":3,"v":15},{"m":1,"d":4,"v":10},{"m":1,"d":5,"v":10},{"m":1,"d":6,"v":10},{"m":2,"d":0,"v":10},{"m":2,"d":1,"v":10},{"m":2,"d":2,"v":10},{"m":2,"d":3,"v":15},{"m":2,"d":4,"v":10},{"m":2,"d":5,"v":10},{"m":2,"d":6,"v":10},{"m":3,"d":0,"v":10},{"m":3,"d":1,"v":10},{"m":3,"d":2,"v":10},{"m":3,"d":3,"v":15},{"m":3,"d":4,"v":10},{"m":3,"d":5,"v":10},{"m":3,"d":6,"v":10},{"m":4,"d":0,"v":10},{"m":4,"d":1,"v":10},{"m":4,"d":2,"v":10},{"m":4,"d":3,"v":15},{"m":4,"d":4,"v":10},{"m":4,"d":5,"v":10},{"m":4,"d":6,"v":10},{"m":5,"d":0,"v":10},{"m":5,"d":1,"v":10},{"m":5,"d":2,"v":10},{"m":5,"d":3,"v":15},{"m":5,"d":4,"v":10},{"m":5,"d":5,"v":10},{"m":5,"d":6,"v":10},{"m":6,"d":0,"v":10},{"m":6,"d":1,"v":10},{"m":6,"d":2,"v":10},{"m":6,"d":3,"v":15},{"m":6,"d":4,"v":10},{"m":6,"d":5,"v":10},{"m":6,"d":6,"v":10},{"m":7,"d":0,"v":10},{"m":7,"d":1,"v":10},{"m":7,"d":2,"v":10},{"m":7,"d":3,"v":15},{"m":7,"d":4,"v":10},{"m":7,"d":5,"v":10},{"m":7,"d":6,"v":10},{"m":8,"d":0,"v":10},{"m":8,"d":1,"v":10},{"m":8,"d":2,"v":10},{"m":8,"d":3,"v":15},{"m":8,"d":4,"v":10},{"m":8,"d":5,"v":10},{"m":8,"d":6,"v":10},{"m":9,"d":0,"v":10},{"m":9,"d":1,"v":10},{"m":9,"d":2,"v":10},{"m":9,"d":3,"v":15},{"m":9,"d":4,"v":10},{"m":9,"d":5,"v":10},{"m":9,"d":6,"v":10},{"m":10,"d":0,"v":10},{"m":10,"d":1,"v":10},{"m":10,"d":2,"v":10},{"m":10,"d":3,"v":15},{"m":10,"d":4,"v":10},{"m":10,"d":5,"v":10},{"m":10,"d":6,"v":10},{"m":11,"d":0,"v":10},{"m":11,"d":1,"v":10},{"m":11,"d":2,"v":10},{"m":11,"d":3,"v":15},{"m":11,"d":4,"v":10},{"m":11,"d":5,"v":10},{"m":11,"d":6,"v":10}];
    this.example_dayparam=[{"h":0,"v":1.5},{"h":1,"v":1},{"h":2,"v":1.2},{"h":3,"v":2.7},{"h":4,"v":2.5},{"h":5,"v":2.5},{"h":6,"v":2.5},{"h":7,"v":2.5},{"h":8,"v":2.5},{"h":9,"v":2.5},{"h":10,"v":2.5},{"h":11,"v":2.5},{"h":12,"v":2.5},{"h":13,"v":2.5},{"h":14,"v":2.5},{"h":15,"v":2.5},{"h":16,"v":2.5},{"h":17,"v":2.5},{"h":18,"v":2.5},{"h":19,"v":2.5},{"h":20,"v":2.5},{"h":21,"v":2.5},{"h":22,"v":2.5},{"h":23,"v":2.5}];
    //private variables
    var parent_div=$(parent_selector);
    parent_div.addClass("timeview");
    parent_div.html(htmlTimeTool);
    $(parent_selector+" .year_selected").change(yearSelectedChange);


    var selected_year=parseInt($(parent_selector+' .year_selected').val());
    var weekdays=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    var timeFilters={ //used to update data visualizations
        hours_range:[0,23],
        dates_range:[new Date(selected_year,0,1),new Date(selected_year,11,31,23,59)],//include leap-year (365 days)
        dows:[0,1,2,3,4,5,6]
    };


    var yearRadarPlotted=empty_yearradar;
    var yearRadarData=[];
    var dayRadarData=[];
    var plottedHours=empty_dayradar;

    var timeFiltersTemporal={ //used to update the text of selection, not the showed data
        hours_range:[0,23],
        dates_range:[new Date(selected_year,0,1),new Date(selected_year,11,31,23,59)],//include leap-year (365 days)
        dows:[0,1,2,3,4,5,6]
    };



    var deferredQueue=[];//app related
    var margin_month=0.1;//% space btwn partial radars of months
    var maxGlobal=1;


    var radarConfigDate = {
        w: 550,//FIXME Better with configurable sizes
        h: 550,
        facet: false,
        levels: 5,
        levelScale: 1.2,//scale the whole graph
        labelScale: 1.2,
        showLevels: true,
        showLevelsLabels: false,
        showAxesLabels: true,
        showAxes: true,
        showLegend: false,
        showVertices: true,
        showPolygons: false,
        translateX: 0,
        translateY: 0,
        paddingX: 0,
        paddingY: 0,
        innerRadius: 0.7, //percentage
        radians: 2*Math.PI*(1-margin_month)/12,
        maxValue: 85000,
        rotate:0,
        showPaths: true,
        polygonPointSize:4,
        polygonPointSize:4,
        innerAxesLabels: true,
        clickableAxes: true,
        rotateLabels:true,
        marginLegend:{x:-70,y:20},
        colors: d3.scale.category20()
    };
    var radarConfigHours = {
        w: 240,
        h: 240,
        facet: false,
        levels: 3,
        levelScale: 1,
        labelScale: 1.05,
        showLevels: true,
        showLevelsLabels: true,
        showAxesLabels: true,
        showAxes: true,
        showLegend: true,
        showVertices: true,
        showPolygons: true,
        translateX: 0,
        translateY: 0,
        paddingX: 0,
        paddingY: 0,
        innerRadius: 0.2, //percentage
        maxValue: 1,//minimum maximum-value showed
        marginLegend:{x:50,y:270},
        colors: d3.scale.category20()
    };

//config for dummies radars for styling
    var radarConfigOuterDates= {
        w: 600,
        h: 600,
        facet: false,
        levels: 2,
        levelScale: 1.2,//scale the whole graph
        distanceLabelScale:0.85,
        labelScale: 0.9,
        showLevels: false,
        showLevelsLabels: false,
        showAxesLabels: true,
        showAxes: true,
        showLegend: false,
        showVertices: false,
        showPolygons: false,
        translateX: 0,
        translateY: 0,
        paddingX: 0,
        paddingY: 0,
        innerRadius: 0.95, //percentage
        radians: 2*Math.PI*(1-margin_month *2)/12,
        maxValue: 1,
        rotate:0,
        showPaths: false,
        polygonPointSize:4,
        innerAxesLabels: false
    };
    var radarConfigOuterLabels= {
        w: 550,
        h: 550,
        facet: false,
        levels: 2,
        levelScale: 1.2,//scale the whole graph
        distanceLabelScale:1,
        labelScale: 1.1,
        showLevels: false,
        showLevelsLabels: false,
        showAxesLabels: true,
        showAxes: false,
        showLegend: false,
        showVertices: false,
        showPolygons: false,
        translateX: 0,
        translateY: 0,
        paddingX: 0,
        paddingY: 0,
        innerRadius: 0.95, //percentage
        radians: 2*Math.PI,
        maxValue: 1,
        rotate:Math.PI/12,
        showPaths: false,
        polygonPointSize:4,
        innerAxesLabels: false
    };

    var datesBrush,hoursBrush;
    var month = ["January","February","March","April", "May","June","July", "August","September","October","November","December"];


    var onChangeFn=function(){};
    var onYearChangeFn=function(){};
    var onDatesChangeFn=function(){};
    var onDowsChangeFn=function(){};
    var onHoursChangeFn=function(){};


    /**
     *
     * @param name label x legend
     * @param data=[{month:,dow:,value}]
     */
    this.addYearPlotline=function(name,dataP){

        //for each month, if lenght!=7 it autocompletes (with 0 for now) fix radar.js to accept undefined
        //if name already exists I should replace: assign in the same index.

        if(yearRadarData.length==0)
        {
            yearRadarPlotted=[[],[],[],[],[],[],[],[],[],[],[],[]];
        }
        var iexists=-1;
        var f=yearRadarData.filter(function(o){return o.legend==name;});
        if(f.length>0)
        {
            iexists=yearRadarData.indexOf(f[0]);
        }
        if(iexists>-1)
        {
            yearRadarData[iexists]={legend:name,data:dataP};

        }
        else yearRadarData.push({legend:name,data:dataP});

        //then, map dataP into real radar format

        var month=0;
        for(month=0;month<12;month++)
        {
            var md=dataP.filter(function(o){return o.m==month;});
            var axesm=[];
            for(var d=0;d<7;d++)
            {
                var thisday=md.filter(function(o){return o.d==d});//if there is more than one value it's ignored.
                if(thisday.length>0)
                {
                    axesm.push({axis:weekdays[d],value:thisday[0].v});
                }
                else axesm.push({axis:weekdays[d],value:0});//autocomplete (with 0 for now) fixme in radar.js to accept undefined values

            }
            axesm=axesm.reverse();
            var poped=axesm.pop();
            axesm.unshift(poped);//it sets the right order!


            //then, push to yearRadarPlotted
            if(iexists>-1){
                yearRadarPlotted[month][iexists]={group:name,axes:axesm};
            }
            else yearRadarPlotted[month].push({group:name,axes:axesm});
        }

        //then plot
        updateDynamicZoom(timeFilters.dates_range);

        return yearRadarPlotted;
    };
    /**
     *
     * @param legend string
     * @param data=[{h:,v:}]
     */
    this.addDayPlotline=function(name,dataP){
        var f=dayRadarData.filter(function(o){return o.legend==name;});
        var iexists=-1;
        if(f.length>0)
        {
            iexists=dayRadarData.indexOf(f[0]);
        }
        if(iexists>-1)
        {
            dayRadarData[iexists]={legend:name,data:dataP};
            plottedHours[iexists]=hoursJson(dataP,name);
        }
        else
        {
            dayRadarData.push({legend:name,data:dataP});
            if(dayRadarData.length==1)
            {
                plottedHours=[];
            }
            plottedHours.push(hoursJson(dataP,name));
        }

        RadarChart.draw(parent_selector+" .radar_hours", plottedHours, radarConfigHours);

    }
    var addDayPlotline2=function(name,data){
        //also use the name instead of embedding it in the data parameter

        plottedHours.push(data);
        RadarChart.draw(parent_selector+" .radar_hours", plottedHours, radarConfigHours);

    };
    this.removeYearPlotline=function(name){
        var f=yearRadarData.filter(function(o){return o.legend==name;});
        if(f.length>0)
        {
            var theid=yearRadarData.indexOf(f[0]);
            yearRadarData.splice(theid,1);
            yearRadarPlotted.forEach(function(month){
                month.splice(theid,1);
            })


            //if the new size is 0 fill yearRadarPlotted with the dummy.
            if(yearRadarData.length==0)
            {
                yearRadarPlotted=empty_yearradar;
            }
            updateDynamicZoom(timeFilters.dates_range);
            return true;
        }
        return false;
    };
    this.removeDayPlotline=function(name){
        var f=dayRadarData.filter(function(o){return o.legend==name;});
        if(f.length>0)
        {
            var theid=dayRadarData.indexOf(f[0]);
            dayRadarData.splice(theid,1);
            plottedHours.splice(theid,1);

            //if the new size is 0 fill yearRadarPlotted with the dummy.
            if(dayRadarData.length==0)
            {
                plottedHours=empty_dayradar;
            }
            RadarChart.draw(parent_selector+" .radar_hours", plottedHours, radarConfigHours);

            return true;
        }
        return false;
    };

    this.removeAllDayPlotlines=function(){
        dayRadarData=[];
        plottedHours =empty_dayradar;
        RadarChart.draw(parent_selector+" .radar_hours", plottedHours, radarConfigHours);
    };
    this.removeAllYearPlotlines=function(){
        yearRadarData=[];
        yearRadarPlotted=empty_yearradar;
        repaintDatesRadar();
    };
    this.onChange=function(delegate_function){
        onChangeFn=delegate_function;

    };
    this.onTodChange=function(delegate_function){
        onHoursChangeFn=delegate_function;

    };
    this.onDowsChange=function(delegate_function){
        onDowsChangeFn=delegate_function;

    };
    this.onDatesChange=function(delegate_function){
        onDatesChangeFn=delegate_function;

    };
    this.onYearChange=function(delegate_function){
        onYearChangeFn=delegate_function;
    };

    this.setSelectableYears=function(int_array)
    {
        var stag=$(parent_selector+" select.year_selected");
        stag.html();
        var options="";
        for(var i in int_array)
        {
            options+="<option>"+int_array[i]+"</option>";
        }
        stag.html(options);
    }


    this.setDows=function (new_dows)
    {
        timeFilters.dows=clone(new_dows);
        onDowsChangeFn(new_dows);
        somethingChanged("dows");
    };
    this.setDatesRange=function (new_dates)
    {
        if(!arraysEqual(timeFilters.dates_range,new_dates))
        {
            datesBrush.extent(reverse_dates_range(new_dates));

            onDatesChangeFn(new_dates);
            somethingChanged("dates_range");
        }
    };
    this.setTodRange=function (new_hours)
    {
        if(!arraysEqual(timeFilters.hours_range,new_hours)) {
            hoursBrush.extent(reverse_hours_range(new_hours));
        }
        onHoursChangeFn(timeFilters.hours_range);
        somethingChanged("tod_range");
    };
    this.setYear=function(new_year){
        $(parent_selector+" .year_selected").val(new_year);
        yearSelectedChange();
    };


    this.getTodRange=function(){
        return clone(timeFilters.hours_range);

    };
    this.getDatesRange=function(){
        return clone(timeFilters.dates_range);

    };
    this.getDows=function(){
        return timeFilters.dows;
    };
    this.getYear=function(){
        return selected_year;
    };


    function reorderHours(d)
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
    function refactorAxisesHours(d){
        var returned= JSON.parse(empty_day_template);
        for(var i in d)
        {
            var r=d[i];
            returned[r.h].v=r.v;
        }
        return returned;
    }

    /**
     * Helper function to reformat data
     * @param dd
     * @returns {{group: string, axes: (Array|*)}}
     */
    function hoursJson(dp,legend) {
        var dd=reorderHours(refactorAxisesHours(dp));
        if(!legend)
        {
            legend="Total per hour";
        }
        return {
            group: legend,
            axes: dd.map(function (axis) {
                return {axis: axis.h, value: parseFloat(axis.v)};
            })
        };
    }
    /**
     * Helper function to reformat data
     * @param dd
     * @returns {{group: string, axes: (Array|*)}}
     */
    function datesJson(dd,legend) {
        if(!legend)
        {
            legend="Total per day of week";
        }
        return {
            group: legend,
            axes: dd.map(function (axis) {
                return {axis: axis.d, value: parseInt(axis.c)};
            })
        };
    }

    /**
     * Paint radar part with params of large and splitted in 12 parts
     * @param idradar
     * @param params
     */
    var perDowPaint=function(dataJ)
    {
        var m=dataJ.month-1;
        yearRadarPlotted[m]=[datesJson(dataJ.data)];
        var radarConfigDateM = (JSON.parse(JSON.stringify(radarConfigDate)));//cloned object
        //radarConfigDateM.colors=radarConfigDate.colors;
        radarConfigDateM.colors=d3.scale.category20();
        radarConfigDateM.rotate=(11-m)*2*Math.PI/12;
        radarConfigDateM.showLevelsLabels=(m==0)?true:false;
        radarConfigDateM.showLegend=(m==0)?true:false;
        var t1=new Date().getTime();

        RadarChart.draw(parent_selector+" svg.month_"+(m), yearRadarPlotted[m], radarConfigDateM);//draw dates 1st time

    };
    var perDowPaintAdded=function(dataJ,curveName)
    {
        var m=dataJ.month-1;
        yearRadarPlotted[m].push(datesJson(dataJ.data,curveName));
        var radarConfigDateM = (JSON.parse(JSON.stringify(radarConfigDate)));//cloned object
        radarConfigDateM.colors=radarConfigDate.colors;
        radarConfigDateM.rotate=(11-m)*2*Math.PI/12;
        radarConfigDateM.showLevelsLabels=(m==0)?true:false;
        radarConfigDateM.showLegend=(m==0)?true:false;
        var t1=new Date().getTime();

        RadarChart.draw(parent_selector+" svg.month_"+(m), yearRadarPlotted[m], radarConfigDateM);//draw dates per upz

        updateDowColors();
    };

    function repaintDatesRadar(dataPlotted)
    {
        radarConfigDate.maxValue=maxGlobal;
        for(var m=0;m<12;m++)
        {
            var radarConfigDateM = (JSON.parse(JSON.stringify(radarConfigDate)));//cloned object
            radarConfigDateM.colors=radarConfigDate.colors;
            radarConfigDateM.rotate=(11-m)*2*Math.PI/12;
            radarConfigDateM.showLevelsLabels=(m==0)?true:false;
            radarConfigDateM.showLegend=(m==0)?true:false;

            RadarChart.draw(parent_selector+" svg.month_"+(m), dataPlotted[m], radarConfigDateM);//repaint dates radar x dynamic zoom

        }
        updateDowColors();
        $(parent_selector + " .axis-clickable text").click(onAxisClicked);
    }
    /* Paint the year radar for the first time! */
    this.plotDatesRadar=function(paramsP) {//TODO Remove from production version
        var params=JSON.parse(JSON.stringify(paramsP));//clone
        var filters;
        var yearRadarData=[];
        var deferred=[];
        maxGlobal=1;
        var totalPerDowFunc=function (dataJ) {
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

        $.when(deferred[0],deferred[1],deferred[2],deferred[3],deferred[4],deferred[5],deferred[6],deferred[7],deferred[8],deferred[9],deferred[10],deferred[11]).then(function(){
            radarConfigDate.maxValue=maxGlobal;
            yearRadarData.forEach(perDowPaint);


            $('#loader1').hide();
            if(params.upz_names&&params.upz_names.length>1)
            {
                params.upz_names.forEach(function(upzName,ind){
                    var params2=JSON.parse(JSON.stringify(paramsP));
                    params2.upzs=[params2.upzs[ind]];
                    addCurveToYearRadar(JSON.parse(JSON.stringify(params2)),upzName);
                });
            }
            updateDynamicZoom(timeFilters.dates_range);

        });

    };
    function monthIncluded(drange, m) {
        var m0=drange[0].getMonth();
        var m1=drange[1].getMonth();
        if(m1>=m0){
            if(drange[0]>drange[1]&&m1==m0)
            {
                return true;
            }
            if((m>=m0&&m<=m1))
            {
                return true;
            }
        }
        else{
            if(m>=m0||m<=m1)
            {
                return true;
            }
        }
        return false;
    }
    function getMaximumValue(dates_range)
    {
        maxGlobal=1;

        if(yearRadarData.length>0)
        {
            for(var m=0;m<12;m++)
            {
                var monthData=yearRadarPlotted[m];
                if(monthIncluded(dates_range,m))
                {
                    var monthMax =d3.max(monthData, function(d) {
                        return d3.max(d.axes, function(o) { return o.value; });
                    });
                    if(monthMax>maxGlobal)
                    {
                        maxGlobal=monthMax;
                    }
                }
            }
        }

        return maxGlobal;
    }

    function updateDynamicZoom(dates_range)
    {
        try{
            var maxFiltered=getMaximumValue(dates_range);

            var dataShowed=yearRadarData.length>0?clone(yearRadarPlotted):empty_yearradar;
            for(var m=0;m<12;m++) {
                dataShowed[m].forEach(function(curve)
                {
                    curve.axes.forEach(function(axVal){
                        if(axVal.value>maxFiltered)
                        {
                            axVal.value=maxFiltered;
                        }
                    });
                });
            }
            repaintDatesRadar(dataShowed);

        }catch(e){
            console.log(e);
        }

    }
    function addCurveToYearRadar(params, curveName) {
        if(!curveName)
        {
            curveName="upz added";
        }
        var filters;
        var perDowFunc=function (dataJ) {
            var m=dataJ.month;
            //yearRadarData.push(dataJ);
            perDowPaintAdded(dataJ,curveName);

        };

        for(var i = 0; i < 12; i++){
            params.month=(12-i);
            filters = encodeURIComponent(JSON.stringify(params));
            if(curveName)
            {
                removeDeferredInQueue('month'+curveName+i);
            }
            var def= $.get("/ds/dows?filters="+filters, perDowFunc);
            if(curveName)
            {
                deferredQueue.push({id:'month'+curveName+i,def:def});
            }
        }
        updateDowColors();
    }
    function plotStaticLabels()
    {
        for(var i = 0; i < 12; i++){
            //paint lines of days
            var radarConfigOuterDatesM = (JSON.parse(JSON.stringify(radarConfigOuterDates)));//clone object
            var objDum={group:'dumm'};
            objDum.axes=[];
            var nD=new Date(selected_year,i,0).getDate();
            for(var j= nD; j>0;j--)
            {
                objDum.axes.push({axis:(j==1||j==nD?j:''), value:1});
            }
            var dataDummieOuterDates=[objDum];
            radarConfigOuterDatesM.rotate=-(i)*2*Math.PI/12;
            RadarChart.draw(parent_selector+" svg.monthDates_"+(i), dataDummieOuterDates, radarConfigOuterDatesM);//styler
        }
        //paint month labels..
        var objDumMonth={group:'dumm'};
        objDumMonth.axes=[];
        for(var j= 0; j<12;j++)
        {
            objDumMonth.axes.push({axis:month[11-j], value:1});
        }

        var dataDummieLabels=[objDumMonth];

        RadarChart.draw(parent_selector+" .monthLabels", dataDummieLabels, radarConfigOuterLabels);//styler
    }

    function updateDowColors() {
        if(timeFilters.dows.length>6)
        {
            $('.axis-clickable').attr('class','axis-clickable');
        }
        else{
            $('.axis-clickable').attr('class','axis-clickable unselected');
            for(var d in timeFilters.dows)
            {
                var wday=weekdays[timeFilters.dows[d]];
                $('.axis-clickable:contains('+wday+')').attr('class','axis-clickable selected');
            }
        }


    }

    function hours (rawHours) {
        var _suffix = "AM";
        if (rawHours > 12) {
            rawHours = rawHours - 12;
            _suffix = "PM"
        }
        if (rawHours == 12) {
            _suffix = "PM"
        }
        if (rawHours == 0 || rawHours == 24) {
            return "12AM"
        }
        return rawHours + _suffix;
    }
    function updateTimeInfo()
    {
        d3.select(parent_selector+" .filters_info").html("<i>Dates:</i> [" + timeFiltersTemporal.dates_range[0].toLocaleDateString() + "," + timeFiltersTemporal.dates_range[1].toLocaleDateString() + "]<br/>"+
        "<i>Hours:</i> [" + hours(timeFiltersTemporal.hours_range[0]) + "," + hours(timeFiltersTemporal.hours_range[1]) + "]");
    }

    function pieBrushYear() {
        var _doy = datesBrush.extent();//0,1000
        var monthRel=1000/12;//virtual n. per month
        //var margin_month2=margin_month*2;
        var margin_month2=margin_month*2*1000/12;//==200
        _doy=_doy.map(function(val,i){
            if(val==1000)
            {
                val=999;
            }
            var monthd=Math.floor(val/monthRel);//0-12
            var nD=new Date(selected_year,(monthd+1),0).getDate();//last day of that month

            var day=0;
            var vp=val-monthd*monthRel;
            if(vp>margin_month2)
            {
                day=1+(vp-margin_month2)/(monthRel-margin_month2)*nD;
            }
            if(day==0&&monthd==0)
            {
                x=new Date(selected_year,monthd,1);
            }
            else{
                x=new Date(selected_year,monthd,day);
            }

            return x;
        });
        _doy[0].setHours(0);
        _doy[0].setMinutes(0);
        _doy[1].setHours(23);
        _doy[1].setMinutes(59);

        timeFiltersTemporal.dates_range=_doy;
        updateTimeInfo();
    }
    function pieBrushHours() {
        var _h = hoursBrush.extent();

        _h=_h.map(function(val,i){

            var x= (i==0?Math.ceil(val+0.01):Math.floor(val))+12;

            if(x>23){
                x-=24;
            }
            return x;
        });
        timeFiltersTemporal.hours_range=_h;
        updateTimeInfo();
    }

    function reverse_dates_range(new_dates)
    {
        //FIXME (margin not exactly working)
        var val0=new Date("01/01/"+selected_year);
        val0.setDate(0);
        var val1=new Date(val0);
        val1.setYear(val0.getFullYear()+1);
        var yearTime=val1.getTime()-val0.getTime();
        return new_dates.map(function(val,i){
            return 1000*(val.getTime()-val0)/yearTime;
        });
    }

    function reverse_hours_range(new_hours)
    {
        //FIXME the result is confusing (better in the middle with bef/next value)
        var _h=new_hours.map(function(val,i){
            var x=val-(i==0?13:12);
            if(x<0)
            {
                x=x+24;
            }
            return x;
        });
        return _h;
    }

    function somethingChanged(prop) {
        onChangeFn(prop);
        updateDowColors();
        updateDynamicZoom(timeFilters.dates_range);
    }

    function paintDatesBrush() {

        datesBrush = d3.svg.circularbrush()
            .range([0, 1000])
            .innerRadius(radarConfigOuterDates.w / 2+40)
            .outerRadius(radarConfigOuterDates.w / 2 + 55)
            .handleSize(-0.08)
            .on("brushend", function(){
                timeFilters.dates_range=timeFiltersTemporal.dates_range;
                //state_datamodel.dates_range(clone(timeFilters.dates_range));

                //updateViews();
                onDatesChangeFn(timeFilters.dates_range);
                somethingChanged("dates_range");
            })
            .on("brush", pieBrushYear);


        d3.select(parent_selector+" svg.datebrush")
            .append("g")
            .attr("class", "radarBrush")
            .attr("transform", "translate(" + radarConfigDate.w/2 + "," + radarConfigDate.h / 2 + ")").call(datesBrush);

        datesBrush.refreshBrush();
    }

    function paintHoursBrush() {

        hoursBrush = d3.svg.circularbrush()
            .range([0, 24])
            .innerRadius(radarConfigHours.w / 2+40)
            .outerRadius(radarConfigHours.w / 2 + 55)
            .handleSize(-0.08)
            .on("brushend", function(){
                timeFilters.hours_range=timeFiltersTemporal.hours_range;
                //state_datamodel.hours_range(clone(timeFilters.hours_range));
                //updateViews();
                onHoursChangeFn(timeFilters.hours_range);
                somethingChanged("tod_range");
            })
            .on("brush", pieBrushHours);

        d3.select(parent_selector+" svg.hour_brush")
            .append("g")
            .attr("class", "radarBrush")
            .attr("transform", "translate(" + radarConfigHours.w/2 + "," + radarConfigHours.h / 2 + ")")
            .call(hoursBrush);

        hoursBrush.refreshBrush();
    }

    function onAxisClicked() {
        var dow=$(this).html();
        var dowIndex=weekdays.indexOf(dow);

        if(timeFilters.dows.length==7)
        {
            timeFilters.dows=[];
        }

        if($.inArray(dowIndex, timeFilters.dows)>-1)
        {
            timeFilters.dows.splice(timeFilters.dows.indexOf(dowIndex),1);
            if(timeFilters.dows.length==0)
            {
                timeFilters.dows=[0,1,2,3,4,5,6];
            }
        }
        else{
            timeFilters.dows.push(dowIndex);
        }
        //state_datamodel.dows(clone(timeFilters.dows));
        //updateViews();
        onDowsChangeFn(timeFilters.dows);
        somethingChanged("dows");
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

    function yearSelectedChange()
    {
        selected_year=parseInt($(parent_selector+' .year_selected').val());
        timeFilters.dates_range[0].setYear(selected_year);
        timeFilters.dates_range[1].setYear(selected_year);
        pieBrushYear();
        //
        // updateViews();
        onYearChangeFn(selected_year);
        somethingChanged("year");
    }

    function initializeTimeView()//TODO Receive other config parameters, or not?: radius?!
    {
        paintDatesBrush();
        paintHoursBrush();
        plotStaticLabels();
        pieBrushYear();
        pieBrushHours();
        RadarChart.draw(parent_selector+" .radar_hours", plottedHours, radarConfigHours);
        timeFilters.dates_range=timeFiltersTemporal.dates_range;
        timeFilters.hours_range=timeFiltersTemporal.hours_range;
    }

    initializeTimeView();
    return this;
}



//useful global variables

var htmlTimeTool='<div style="position:relative" class="radar_year">' +
    '<div style="position:absolute; top:0; left:0; z-index:1" class="months_data">' +
    '<svg class="radar month_0"></svg><svg class="radar month_1"></svg><svg class="radar month_2"></svg><svg class="radar month_3"></svg>' +
    '<svg class="radar month_4"></svg><svg class="radar month_5"></svg><svg class="radar month_6"></svg><svg class="radar month_7"></svg>' +
    '<svg class="radar month_8"></svg><svg class="radar month_9"></svg><svg class="radar month_10"></svg><svg class="radar month_11"></svg></div>' +
    '<div style="position:absolute; top:-29px; left:-29px; z-index:-1" class="months_outer">' +
    '<svg class="radar monthDates_0"></svg><svg class="radar monthDates_1"></svg><svg class="radar monthDates_2"></svg><svg class="radar monthDates_3"></svg>' +
    '<svg class="radar monthDates_4"></svg><svg class="radar monthDates_5"></svg><svg class="radar monthDates_6"></svg><svg class="radar monthDates_7"></svg>' +
    '<svg class="radar monthDates_8"></svg><svg class="radar monthDates_9"></svg><svg class="radar monthDates_10"></svg><svg class="radar monthDates_11"></svg></div>' +
    '<svg style="z-index:-1" class="monthLabels radar"></svg>' +
    '<svg style="overflow:visible; padding: 75px 0 0 55px" class="datebrush brush"></svg>' +
    '<div style="position:absolute; top:0; left:0; z-index:10;top: 210px;left: 215px;">' +
    '<svg onselectstart="return false" class="radar_hours radar"></svg>' +
    '<svg style="overflow:visible; width: 2px;height: 6px;margin-top: 20px;" class="hour_brush brush"></svg></div></div>' +
    '<p style="position: absolute; top: 10px;" class="filters_info"></p>' +
    '<div style="position: absolute; top: 60px;"><p style="float: left;">Year</p>' +
    '<select style="float: left;margin-left:10px;margin-top:13px;" data-bind="value: state_datamodel.selected_year" class="year_selected">' +
    '<option selected="selected">'+(new Date().getFullYear())+'</option></select></div>';


function findInArrayById(arrayDefs,defid)
{

    for(var i=0;i<arrayDefs.length;i++)
    {
        if(arrayDefs[i].id==defid){return arrayDefs[i];}
    }
    return undefined;
}

function arraysEqual(a1,a2) {
    return JSON.stringify(a1)==JSON.stringify(a2);
}
function clone(o)
{
    var a=o;
    if(o instanceof Date)
    {
        return o.clone();
    }
    else if(o instanceof Array)
    {
        a=o.slice();
        if(a.length>0 && a[o] instanceof Date)
        {
            a.forEach(function(v,i,ar){
                v=v.clone();
            });
            return a;
        }
        return a;
    }
    //else
    return JSON.parse(JSON.stringify(a));
}


Date.prototype.dayOfYear= function(){
    var j1= new Date(this);
    j1.setMonth(0, 0);
    return Math.round((this-j1)/8.64e7);
};
