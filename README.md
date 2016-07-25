# STRAD-TimeRadar
Web-based library for the visualization of temporal data

This is a practical web library to query and visualize temporal data in different granularity levels: year, month, day of the week, time of the day.
It is based and depends on [D3.js] (https://d3js.org/), [jquery] (https://jquery.com/), and the following open source resources:
- **D3.circularbrush.js**: Used [circular brush] (https://gist.github.com/emeeks/5850fa6583bfd90e7899) to set the filters of range.
- **radar.js**: Modified [radar-chart] (https://gist.github.com/nbremer/6506614), based in turn on this [radar-chart-d3] (https://github.com/alangrafu/radar-chart-d3) library

// include image to show graphical elements

## Demo
//gist page here

## Definitions
### Represented time levels
- **year**: Selected year. Of type integer.
- **month**: Month of the year. Represented as an integer from 0 to 11 respectively from January to December.
- **dow**: Day of the Week. Integer in the set *`[0,1,2,3,4,5,6]`* corresponding to the days from Sunday(0) to Saturday(6)
- **tod**: Time of the day. Represented as an integer for each hour from `0` to `23`.

### Filters
Includes:
- **selected_year**: integer with the year corresponding to the displayed data in both, inner(day) and outer(year) radar.
- **dates_range**: array of size 2 with the initial and final Date selected in the brush for the outer radar.
- **dows**: array of size of minimum 0 and maximum 7 with the selected days of the week.
- **tod_range**: array of size 2 with the initial and final hour of the day selected in the brush for the inner radar.

### Displayed data
Includes:
- **year_plotline**: Each of the plotlines in the outer radar representing data-values per dow per month, therefore a *year_plotline* has `84=12*7` data-values.
- **tod_plotline**: Each of the plotlines in the inner radar representing data-values per hour of the day, therefore a *tod_plotline* has `24` data-values.


## Example of Use
//complete with demo doc.
## API
### Initializing
- **TimeRadar(selector)**: Constructor receiving a String corresponding to the CSS3 selector of the element to populate with the STRAD Radar.
- **setSelectableYears(years_array)**: Receives an array of integer with the selectable years (corresponding to the select element in the view). The selected year is used to match the dates
_range to the corresponding year.

### Setting displayed data
- **addDayPlotline(legend,data)**: add or replace (if the legend already exists) the data in the inner radar with the corresponding legend. The parameter *'data'* is an array with objects for pair hour(h)-value(v):   
  Ex. `[{h:0,v:500}, ... , {h:23,v:1200}]`
- **addYearPlotline(legend,data)**: add or replace (if the legend already exists) the data in the outer radar with the corresponding legend. The parameter *'data'* is an array with objects for each tuple dow(d), month(m) and value(v):   
  Ex. `[{m:0,d:0,v:12.5},...,{m:11,d:6,v:15}]`

- **removeDayPlotline(legend)**: If exists, removes the plotline in the inner radar with the corresponding legend
- **removeYearPlotline(legend)**: If exists, removes the plotline in the outer radar with the corresponding legend
- **removeAllDayPlotlines()**: Removes all the plotlines in the inner radar
- **removeAllYearPlotlines()**: Removes all the plotlines in the outer radar

### Working with filters: getters and setters
- **getSelectedYear()/setSelectedYear(new_year)**: gets or sets the selected year respectively. Corresponds to the `select` html tag in the tool.
- **getDows()/setDows(new_dows)** get or set the selected dows respectively. Graphically corresponds to the inner axes in the outer (year) radar.
- **getDatesRange()/setDatesRange(new_dates_range)**: gets or sets the selected range of dates for the selected year. Graphically corresponds to the outer (year) brush.
- **getTodRange()/setTodRange(new_tod_range)**: gets or sets the selected range of hours of the day. Graphically corresponds to the inner (day) brush.

### Subscribing to changes
* **onChange(delegate_function)**: The delegate function is called on any change of the filters after calling the subscribed function for the specific filter as follows:
  * **onYearChange(delegate_function)**
  * **onDatesChange(delegate_function)**
  * **onDowsChange(delegate_function)**
  * **onTodChange(delegate_function)**

