// condense an array of arrays down to an array of numbers (averages)
var aggregate = function(data, aggregation, intervals, strategy) {
    console.log("Aggregating data (" + data + ") over intervals (" + intervals + ") by " + aggregation);
    console.log("Using aggregation strategy of " + strategy);
    var result = [];

    // Create a 2d array for raw entries that fall into each interval
    var raw = [];
    for(i = 0;i < intervals.length; i++) {raw.push([]);}

    // Populate the raw entries
    data.forEach(function(entry){
        for(i = 0; i < intervals.length; i++) {
            if (moment(entry["created"]).isAfter(intervals[i].startOf(aggregation))) {
                if (moment(entry["created"]).isBefore(intervals[i].endOf(aggregation))) {
                    raw[i].push(entry);
                    break;
                }
            }
        }
    });

    // Aggregate the raw entries into one point per interval
    for(i = 0; i < raw.length; i++) {
        if (raw[i].length > 0) {
            console.log(raw[i]);
            console.log("i = " + i + ", raw[i].length = " + raw[i].length);
            // Initialize the sum dictionary
            var sum = {};

            // For each entry in i, add up all variables in each entry
            raw[i].forEach(function(entry){
                console.log("Processing entry of");
                console.log(entry);
                for (var key in entry){
                    if (key != "created") {
                        console.log("Processing key " + key + " in entry " + entry);
                        if (key in sum) { sum[key] += entry[key]; }
                        else { sum[key] = entry[key]; }
                    }
                }
            });
            console.log("sum calculated as");
            console.log(sum)
            result[i] = {}
            for (var key in sum) {
                if (key != "created") {
                    if (strategy == "sum") {
                        result[i][key] = sum[key];
                    }
                    if (strategy == "average") {
                        result[i][key] = sum[key] / raw[i].length;
                    }
                }
            }
        }
        else if (i > 0) {
            // if there is no value here, use the previous value
            result[i] = result[i-1];
        }
        else {
            // if there is still no value, just use 0 for this point
            result[i] = undefined;
        }
    }
    console.log("aggregate() returning " + result);
    return result;
}
var intervalsAsLabels = function(intervals, aggregation) {
    var labels = [];
    for(i = intervals.length - 1; i >= 0; i--){
        if (i > 1) { labels.push(i + " " + aggregation + "s ago"); }
        else if (i == 1) {
            // Second latest
            if (aggregation != 'day') { labels.push("last " + aggregation); }
            else { labels.push("yesterday"); }
        }
        else {
            // Latest
            if (aggregation != 'day') { labels.push("this " + aggregation); }
            else { labels.push("today"); }
        }
    }
    return labels;
}

$(document).ready(function(){
    $(".dropdown-toggle").dropdown();
    $('.aggregation button').click(function(){
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        window[this.dataset.chart].aggregation = this.dataset.aggregation;
        window[this.dataset.chart].refresh();
    });

    // Click the default buttons for each chart
    $("#body-panel > .panel-heading > .pull-right > [class*=aggregation] > [data-aggregation='week']").trigger('click');
    $("#nutrition-panel > .panel-heading > .pull-right > [class*=aggregation] > [data-aggregation='day']").trigger('click');
});
