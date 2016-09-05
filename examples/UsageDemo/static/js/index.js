/**
 * Created by carol on 1/08/16.
 */
var timewheel;

//dummie data:

var dummie_yeardata1=[{"m":0,"d":0,"v":2.5},{"m":0,"d":1,"v":1.2},{"m":0,"d":2,"v":10},{"m":0,"d":3,"v":7.4},{"m":0,"d":4,"v":10},{"m":0,"d":5,"v":10},{"m":0,"d":6,"v":10},{"m":1,"d":0,"v":10},{"m":1,"d":1,"v":10},{"m":1,"d":2,"v":10},{"m":1,"d":3,"v":15},{"m":1,"d":4,"v":10},{"m":1,"d":5,"v":10},{"m":1,"d":6,"v":10},{"m":2,"d":0,"v":10},{"m":2,"d":1,"v":10},{"m":2,"d":2,"v":10},{"m":2,"d":3,"v":15},
    {"m":2,"d":4,"v":10},{"m":2,"d":5,"v":10},{"m":2,"d":6,"v":10},{"m":3,"d":0,"v":10},{"m":3,"d":1,"v":10},{"m":3,"d":2,"v":10},{"m":3,"d":3,"v":15},{"m":3,"d":4,"v":10},{"m":3,"d":5,"v":10},{"m":3,"d":6,"v":10},{"m":4,"d":0,"v":10},{"m":4,"d":1,"v":10},{"m":4,"d":2,"v":10},{"m":4,"d":3,"v":15},{"m":4,"d":4,"v":10},{"m":4,"d":5,"v":10},{"m":4,"d":6,"v":10},{"m":5,"d":0,"v":10},{"m":5,"d":1,"v":10},
    {"m":5,"d":2,"v":10},{"m":5,"d":3,"v":15},{"m":5,"d":4,"v":10},{"m":5,"d":5,"v":10},{"m":5,"d":6,"v":10},{"m":6,"d":0,"v":10},{"m":6,"d":1,"v":10},{"m":6,"d":2,"v":10},{"m":6,"d":3,"v":15},{"m":6,"d":4,"v":10},{"m":6,"d":5,"v":10},{"m":6,"d":6,"v":10},{"m":7,"d":0,"v":10},{"m":7,"d":1,"v":10},{"m":7,"d":2,"v":10},{"m":7,"d":3,"v":15},{"m":7,"d":4,"v":10},{"m":7,"d":5,"v":10},{"m":7,"d":6,"v":10},
    {"m":8,"d":0,"v":10},{"m":8,"d":1,"v":10},{"m":8,"d":2,"v":10},{"m":8,"d":3,"v":15},{"m":8,"d":4,"v":10},{"m":8,"d":5,"v":10},{"m":8,"d":6,"v":10},{"m":9,"d":0,"v":10},{"m":9,"d":1,"v":10},{"m":9,"d":2,"v":10},{"m":9,"d":3,"v":15},{"m":9,"d":4,"v":10},{"m":9,"d":5,"v":10},{"m":9,"d":6,"v":10},{"m":10,"d":0,"v":10},{"m":10,"d":1,"v":10},{"m":10,"d":2,"v":10},{"m":10,"d":3,"v":15},{"m":10,"d":4,"v":10},
    {"m":10,"d":5,"v":10},{"m":10,"d":6,"v":10},{"m":11,"d":0,"v":10},{"m":11,"d":1,"v":10},{"m":11,"d":2,"v":10},{"m":11,"d":3,"v":15},{"m":11,"d":4,"v":10},{"m":11,"d":5,"v":10},{"m":11,"d":6,"v":10}];

var dummie_toddata1=[{"h":0,"v":1.5},{"h":1,"v":1},{"h":2,"v":1.2},{"h":3,"v":2.7},{"h":4,"v":2.5},{"h":5,"v":2.5},{"h":6,"v":2.5},{"h":7,"v":2.5},{"h":8,"v":2.5},{"h":9,"v":2.5},{"h":10,"v":2.5},{"h":11,"v":2.5},{"h":12,"v":2.5},{"h":13,"v":2.5},{"h":14,"v":2.5},{"h":15,"v":2.5},{"h":16,"v":2.5},{"h":17,"v":2.5},{"h":18,"v":2.5},{"h":19,"v":2.5},{"h":20,"v":2.5},{"h":21,"v":2.5},{"h":22,"v":2.5},{"h":23,"v":2.5}];

var dummie_yeardata2=[{"m":0,"d":0,"v":5},{"m":0,"d":1,"v":1},{"m":0,"d":2,"v":10},{"m":0,"d":3,"v":7},{"m":0,"d":4,"v":8},{"m":0,"d":5,"v":11},{"m":0,"d":6,"v":12},{"m":1,"d":0,"v":15},{"m":1,"d":1,"v":9},{"m":1,"d":2,"v":10},{"m":1,"d":3,"v":12},{"m":1,"d":4,"v":11},{"m":1,"d":5,"v":6},{"m":1,"d":6,"v":7},{"m":2,"d":0,"v":8},{"m":2,"d":1,"v":8},{"m":2,"d":2,"v":1},{"m":2,"d":3,"v":10},
    {"m":2,"d":4,"v":1},{"m":2,"d":5,"v":8},{"m":2,"d":6,"v":1},{"m":3,"d":0,"v":10},{"m":3,"d":1,"v":2},{"m":3,"d":2,"v":10},{"m":3,"d":3,"v":11.5},{"m":3,"d":4,"v":10},{"m":3,"d":5,"v":8},{"m":3,"d":6,"v":12},{"m":4,"d":0,"v":13},{"m":4,"d":1,"v":8},{"m":4,"d":2,"v":12},{"m":4,"d":3,"v":15},{"m":4,"d":4,"v":15},{"m":4,"d":5,"v":1},{"m":4,"d":6,"v":1},{"m":5,"d":0,"v":10},{"m":5,"d":1,"v":10},
    {"m":5,"d":2,"v":1},{"m":5,"d":3,"v":15},{"m":5,"d":4,"v":30},{"m":5,"d":5,"v":10},{"m":5,"d":6,"v":9},{"m":6,"d":0,"v":1},{"m":6,"d":1,"v":12},{"m":6,"d":2,"v":8},{"m":6,"d":3,"v":12},{"m":6,"d":4,"v":10},{"m":6,"d":5,"v":10},{"m":6,"d":6,"v":10},{"m":7,"d":0,"v":20},{"m":7,"d":1,"v":15},{"m":7,"d":2,"v":20},{"m":7,"d":3,"v":12},{"m":7,"d":4,"v":20},{"m":7,"d":5,"v":15},{"m":7,"d":6,"v":15},
    {"m":8,"d":0,"v":0},{"m":8,"d":1,"v":9},{"m":8,"d":2,"v":20},{"m":8,"d":3,"v":15},{"m":8,"d":4,"v":8},{"m":8,"d":5,"v":10.6},{"m":8,"d":6,"v":16},{"m":9,"d":0,"v":12},{"m":9,"d":1,"v":25},{"m":9,"d":2,"v":10},{"m":9,"d":3,"v":15},{"m":9,"d":4,"v":10},{"m":9,"d":5,"v":15},{"m":9,"d":6,"v":20},{"m":10,"d":0,"v":20},{"m":10,"d":1,"v":15},{"m":10,"d":2,"v":20},{"m":10,"d":3,"v":15},{"m":10,"d":4,"v":20},
    {"m":10,"d":5,"v":11},{"m":10,"d":6,"v":10},{"m":11,"d":0,"v":18},{"m":11,"d":1,"v":9},{"m":11,"d":2,"v":25},{"m":11,"d":3,"v":16},{"m":11,"d":4,"v":15},{"m":11,"d":5,"v":8},{"m":11,"d":6,"v":8}];

var dummie_toddata2=[{"h":0,"v":0.5},{"h":1,"v":1.2},{"h":2,"v":2},{"h":3,"v":0.7},{"h":4,"v":4.5},{"h":5,"v":1.5},{"h":6,"v":3.5},{"h":7,"v":1.5},{"h":8,"v":3.5},{"h":9,"v":3.5},{"h":10,"v":2.5},{"h":11,"v":1.5},{"h":12,"v":1.5},{"h":13,"v":1},{"h":14,"v":0.5},{"h":15,"v":2.2},{"h":16,"v":3.5},{"h":17,"v":0.5},{"h":18,"v":3.5},{"h":19,"v":2.5},{"h":20,"v":2},{"h":21,"v":0.5},{"h":22,"v":2},{"h":23,"v":5.5}];

var dummie_yeardata3=[{"m":0,"d":0,"v":5},{"m":0,"d":1,"v":2.4},{"m":0,"d":2,"v":20},{"m":0,"d":3,"v":14.8},{"m":0,"d":4,"v":20},{"m":0,"d":5,"v":20},{"m":0,"d":6,"v":20},{"m":1,"d":0,"v":20},{"m":1,"d":1,"v":20},{"m":1,"d":2,"v":20},{"m":1,"d":3,"v":30},{"m":1,"d":4,"v":20},{"m":1,"d":5,"v":20},{"m":1,"d":6,"v":20},{"m":2,"d":0,"v":20},{"m":2,"d":1,"v":20},{"m":2,"d":2,"v":20},{"m":2,"d":3,"v":30},{"m":2,"d":4,"v":20},
    {"m":2,"d":5,"v":20},{"m":2,"d":6,"v":20},{"m":3,"d":0,"v":20},{"m":3,"d":1,"v":20},{"m":3,"d":2,"v":20},{"m":3,"d":3,"v":30},{"m":3,"d":4,"v":20},{"m":3,"d":5,"v":20},{"m":3,"d":6,"v":20},{"m":4,"d":0,"v":20},{"m":4,"d":1,"v":20},{"m":4,"d":2,"v":20},{"m":4,"d":3,"v":30},{"m":4,"d":4,"v":20},{"m":4,"d":5,"v":20},{"m":4,"d":6,"v":20},{"m":5,"d":0,"v":20},{"m":5,"d":1,"v":20},{"m":5,"d":2,"v":20},{"m":5,"d":3,"v":30},
    {"m":5,"d":4,"v":20},{"m":5,"d":5,"v":20},{"m":5,"d":6,"v":20},{"m":6,"d":0,"v":20},{"m":6,"d":1,"v":20},{"m":6,"d":2,"v":20},{"m":6,"d":3,"v":30},{"m":6,"d":4,"v":20},{"m":6,"d":5,"v":20},{"m":6,"d":6,"v":20},{"m":7,"d":0,"v":20},{"m":7,"d":1,"v":20},{"m":7,"d":2,"v":20},{"m":7,"d":3,"v":30},{"m":7,"d":4,"v":20},{"m":7,"d":5,"v":20},{"m":7,"d":6,"v":20},{"m":8,"d":0,"v":20},{"m":8,"d":1,"v":20},{"m":8,"d":2,"v":20},
    {"m":8,"d":3,"v":30},{"m":8,"d":4,"v":20},{"m":8,"d":5,"v":20},{"m":8,"d":6,"v":20},{"m":9,"d":0,"v":20},{"m":9,"d":1,"v":20},{"m":9,"d":2,"v":20},{"m":9,"d":3,"v":30},{"m":9,"d":4,"v":20},{"m":9,"d":5,"v":20},{"m":9,"d":6,"v":20},{"m":10,"d":0,"v":20},{"m":10,"d":1,"v":20},{"m":10,"d":2,"v":20},{"m":10,"d":3,"v":30},{"m":10,"d":4,"v":20},{"m":10,"d":5,"v":20},{"m":10,"d":6,"v":20},{"m":11,"d":0,"v":20},{"m":11,"d":1,"v":20},
    {"m":11,"d":2,"v":20},{"m":11,"d":3,"v":30},{"m":11,"d":4,"v":20},{"m":11,"d":5,"v":20},{"m":11,"d":6,"v":20}];

var dummie_toddata3=[{"h":0,"v":0.75},{"h":1,"v":1.7999999999999998},{"h":2,"v":3},{"h":3,"v":1.0499999999999998},{"h":4,"v":6.75},{"h":5,"v":2.25},{"h":6,"v":5.25},{"h":7,"v":2.25},{"h":8,"v":5.25},{"h":9,"v":5.25},{"h":10,"v":3.75},{"h":11,"v":2.25},{"h":12,"v":2.25},{"h":13,"v":1.5},{"h":14,"v":0.75},{"h":15,"v":3.3000000000000003},{"h":16,"v":5.25},{"h":17,"v":0.75},{"h":18,"v":5.25},{"h":19,"v":3.75},{"h":20,"v":3},{"h":21,"v":0.75},{"h":22,"v":3},{"h":23,"v":8.25}];




function initialize()
{
    //populate div with the tool
    timewheel=new StradWheel("#timeview");

    timewheel.setSelectableYears([2014,2015,2016]);
    timewheel.setYear(2015);

    //Register to changes:

    timewheel.onDatesChange(function(new_datesrange){
        $.notify("The selected dates range is now: "
            +new_datesrange
            //Could also be:
            //+timewheel.getDatesRange()
            ,{position:"top right",autoHideDelay:5000, className: 'info'})
    });

    timewheel.onTodChange(function(new_todrange){
        $.notify("The selected time range is now: ["
        +timewheel.getTodRange()
            //Could also be:
            //+new_todrange
        +"]",{position:"top right",autoHideDelay:5000, className: 'success'})
    });


    timewheel.onDowsChange(function(new_dows){
        $.notify("The selected dows are now: ["
        +timewheel.getDows()
            //Could also be:
            //+new_dows
        +"]",{position:"top right",autoHideDelay:5000, className: 'warn'})
    });

    timewheel.onChange(function(prop){
        $.notify("This has changed: "
            +prop
            ,{position:"bottom right",autoHideDelay:3000, className: 'success'})
    });




}
initialize();


timewheel.addYearPlotline("Year dummie 1", dummie_yeardata1);
timewheel.addDayPlotline("Day dummie 1",dummie_toddata1);

//choose plotlines to add/remove:
$("#btn_add_yearplotline").click(function(){
    var line=$("#add_yearplotline").val();
    switch (line)
    {
        case "Year dummie 1":
            timewheel.addYearPlotline("Year dummie 1", dummie_yeardata1);
            break;
        case "Year dummie 2":
            timewheel.addYearPlotline("Year dummie 2", dummie_yeardata2);
            break;
        case "Year dummie 3":
            timewheel.addYearPlotline("Year dummie 3", dummie_yeardata3);
            break;
    }
    $("#add_yearplotline option[value='"+line+"']").remove();
    $("#rm_yearplotline").append('<option value="'+line+'">'+line+'</option>');
});

$("#btn_add_dayplotline").click(function(){
    var line=$("#add_dayplotline").val();
    switch (line)
    {
        case "Day dummie 1":
            timewheel.addDayPlotline("Day dummie 1", dummie_toddata1);
            break;
        case "Day dummie 2":
            timewheel.addDayPlotline("Day dummie 2", dummie_toddata2);
            break;
        case "Day dummie 3":
            timewheel.addDayPlotline("Day dummie 3", dummie_toddata3);
            break;
    }
    $("#add_dayplotline option[value='"+line+"']").remove();
    $("#rm_dayplotline").append('<option value="'+line+'">'+line+'</option>');
});

$("#btn_rm_yearplotline").click(function(){
    var line=$("#rm_yearplotline").val();
    timewheel.removeYearPlotline(line);
    $("#rm_yearplotline option[value='"+line+"']").remove();
    $("#add_yearplotline").append('<option value="'+line+'">'+line+'</option>');
});

$("#btn_rm_dayplotline").click(function(){
    var line=$("#rm_dayplotline").val();
    timewheel.removeDayPlotline(line);
    $("#rm_dayplotline option[value='"+line+"']").remove();
    $("#add_dayplotline").append('<option value="'+line+'">'+line+'</option>');

});