# STRAD-TimeRadar
Web-based library for the visualization of temporal data.

This is a practical web library to query and visualize temporal data in different granularity levels: year, month, day of the week, time of the day.
It is based and depends on D3.js (//link), jquery (//link), and other open source resources:
- D3.circularbrush.js //link
- radar.js //blabla version, based in turn on the library //link.


// refer to the image xxx to become familiar with the graphical elements

## Demo
//gist page here

## Definitions
### Represented time levels
- year: Displayed year. Of type integer.
- month: Month of the year. Represented as an integer from 0 to 11 respectively from January to December.
- dow: Day of the Week. Integer in the set **_[0,1,2,3,4,5,6]_** corresponding to the days from Sunday(0) to Saturday(6)
- tod: Time of the day. Represented as an integer for each hour from 0 to 23.

### Filters
Includes:
- displayed_year
- dates_range
- dows
- tod_range

### Displayed data
Includes:
- year_plotline
- tod_plotline


## Example of Use
//complete with demo doc.
## API
### Initializing
- TimeRadar(selector): Constructor
- setYearsSet(years_array)

### Setting displayed data:
- addDayPlotline()
- addYearPlotline()
- removeDayPlotline()
- removeYearPlotline()
- removeAllDayPlotlines()
- removeAllYearPlotlines()

### Working with filters: getters and setters:

### Subscribing to changes
- .onChange(delegate_function): 
- .onDatesChange(delegate_function): 
- .onDowsChange(delegate_function): 
- .onTodChange(delegate_function): 

