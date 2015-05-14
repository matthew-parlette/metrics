var nutrition = new function() {
    this.divid = "nutrition";
    this.aggregation = undefined;
    this.aggregation_strategy = "sum";
    this.chart = undefined;
    this.numIntervals = 7;
    this.intervals = undefined;
    this.refresh = function() {
        // Replace canvas to clear any previous graph
        $('#' + this.divid).replaceWith('<canvas id="' + this.divid + '"></canvas>');
        var ctx = $("#" + this.divid).get(0).getContext("2d");
        console.log(ctx);
        // Build labels for this week
        this.intervals = [];

        // Build intervals for this aggregation
        console.log("Building intervals from aggregation '" + this.aggregation + "'")
        for(i = this.numIntervals - 1; i >= 0; i--) {
            this.intervals.push(moment().subtract(i, this.aggregation));
        }
        console.log("Intervals: " + this.intervals)
        // Build dataset
        $.when(
            $.get('/calories')
        ).then( function (rawCalories) {
            console.log("rawCalories:");
            console.log(rawCalories);
            console.log("Aggregating calories");
            // aggregate() returns an array, for this, there is only one element, so we specify [0] to use it
            var caloriesToday = aggregate(rawCalories,'day',[moment().subtract(1, 'day')], nutrition.aggregation_strategy);
            console.log(caloriesToday);
            console.log("Building nutrition dataset")
            var options = []
            var data = [
                {
                    value: caloriesToday[0]['protein'],
                    color:"#F7464A",
                    highlight: "#FF5A5E",
                    label: "Protein"
                },
                {
                    value: caloriesToday[0]['fat'],
                    color: "#46BFBD",
                    highlight: "#5AD3D1",
                    label: "Fat"
                },
                {
                    value: caloriesToday[0]['carbohydrates'],
                    color: "#FDB45C",
                    highlight: "#FFC870",
                    label: "Carbohydrates"
                }
            ]
            var nutrition_breakdown = new Chart(ctx).Pie(data,options);
            // $('#body-legend').html(chart.generateLegend());
        });
    }
}
