# STRAD-Wheel
Web-based library for the query and visualization of temporal data. It represents the information in different granularity levels: year, month, day of the week, time of the day.
It is based on [D3.js] (https://d3js.org/), [jquery] (https://jquery.com/), and the following open source resources that have been modified:
- **D3.circularbrush.js**: Used [circular brush] (https://github.com/emeeks/d3.svg.circularbrush) to set the filters of range.
- **radar.js**: Modified [radar-chart] (https://gist.github.com/chrisrzhou/2421ac6541b68c1680f8), based in turn on this [radar-chart-d3] (https://github.com/alangrafu/radar-chart-d3) library

<img src="https://cxnvcarol.github.io/STRAD-Wheel/static/images/stradwheel.png" width="480">

## Demo
[Visit here](https://cxnvcarol.github.io/STRAD-Wheel/)

## Definitions
### Time granularities
- **year** (selected year):  Integer corresponding to the displayed year in the whole tool
- **month**(month of the year): Integer from 0 to 11 respectively from January to December
- **dow** (day of the week): Integer from 0 to 6 corresponding to the days from Sunday(0) to Saturday(6)
- **tod** (time of the day): Integer from 0 to 23 for each hour of the day

### Filters
- **selected_year**: Integer with the selected year in the `<select>` html tag.
- **dates_range**: Array of size 2 with the initial and final Date selected in the brush for the outer radar.
- **dows**: Array of size of minimum 0 and maximum 7 with the selected days of the week.
- **tod_range**: Array of size 2 with the initial and final hour of the day selected in the brush for the inner radar.

### Displayed data
Includes:
- **year_plotline**: Each of the plotlines in the outer radar representing data-values per dow per month, therefore a *year_plotline* has `12*7=84` data-values.
- **tod_plotline**: Each of the plotlines in the inner radar representing data-values per hour of the day, therefore a *tod_plotline* has `24` data-values.


## Example of Use

1. Include the javascript dependencies: jquery.js, d3.js, d3.svg.circularbrush.js and radar.js (the last two were modified version in this repository), and the proposed stylesheet: strad-wheel.css
2. Include our main library: strad-wheel.js.
3. Add the STRAD Wheel tool by initializing a new StradWheel object with the corresponding CSS selector as parameter. The referenced HTML element must be a pre existing "div" element by the time of this call. e.g., 'timewheel=new StradWheel("#timeview");'
4. Subscribe to changes in any of the modified filters, or to any change. See "Subscribing to changes" section.
5. Add, replace and remove the shown data at any time by calling the functions *addDayPlotline*, *addYearPlotline*, *removeDayPlotline* and *removeYearPlotline*. 

## API
### Initializing
- **TimeRadar(selector)**: Constructor receiving a String corresponding to the CSS3 selector of the element to populate with the STRAD Wheel.
- **setSelectableYears(years_array)**: Receives an array of integer with the selectable years (corresponding to the select element in the view). The selected year is used to match the dates
_range to the corresponding year. By default this is set to an array containing only the current year.

### Setting displayed data
- **addDayPlotline(legend,data)**: Add or replace (if the legend already exists) the data in the inner radar with the corresponding legend. The parameter *'data'* is an array with objects for pair hour(h)-value(v):   
  Ex. `[{h:0,v:500}, ... , {h:23,v:1200}]`
- **addYearPlotline(legend,data)**: Add or replace (if the legend already exists) the data in the outer radar with the corresponding legend. The parameter *'data'* is an array with objects for each tuple dow(d), month(m) and value(v):   
  Ex. `[{m:0,d:0,v:12.5},...,{m:11,d:6,v:15}]`

- **removeDayPlotline(legend)**: If exists, removes the plotline in the inner radar with the corresponding legend
- **removeYearPlotline(legend)**: If exists, removes the plotline in the outer radar with the corresponding legend
- **removeAllDayPlotlines()**: Removes all the plotlines in the inner radar
- **removeAllYearPlotlines()**: Removes all the plotlines in the outer radar

### Working with filters: getters and setters
- **getSelectedYear()/setSelectedYear(new_year)**: Gets or sets the selected year respectively. Corresponds to the `select` html tag in the tool.
- **getDows()/setDows(new_dows)** Get or set the selected dows respectively. Graphically corresponds to the inner axes in the outer (year) radar.
- **getDatesRange()/setDatesRange(new_dates_range)**: Gets or sets the selected range of dates for the selected year. Graphically corresponds to the outer (year) brush.
- **getTodRange()/setTodRange(new_tod_range)**: Gets or sets the selected range of hours of the day. Graphically corresponds to the inner (day) brush.

### Subscribing to changes
* **onYearChange(delegate_function)**: The parameter function is called after the year selection changes. It receives as parameter the new selected year.
* **onDatesChange(delegate_function)**: The parameter function is called after any change in the dates_range. It receives as parameter the new dates range.
* **onDowsChange(delegate_function)**: The parameter function is called on any change of the dows array. It receives as parameter the new array of dows.
* **onTodChange(delegate_function)**: The parameter function is called on any change of the tod_range.  It receives as parameter the new range of time of the day.
* **onChange(delegate_function)**: The delegate function is called on any change of the filters after calling the subscribed function for the corresponding filter. It receives as parameter the name of the changed filter ("year","dates_range","dows","tod_range").
