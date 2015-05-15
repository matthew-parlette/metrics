var body = new function() {
    this.divid = "body";
    this.aggregation = undefined;
    this.aggregation_strategy = "average";
    this.chart = undefined;
    this.numIntervals = 7;
    this.intervals = undefined;
    this.refresh = function() {
        // Replace canvas to clear any previous gra
        $('#' + this.divid).replaceWith('<canvas id="' + this.divid + '"></canvas>');
        var ctx = $("#" + this.divid).get(0).getContext("2d");
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
            $.get('/weight'),
            $.get('/bodyfat')
        ).then( function (rawWeight, rawBodyfat) {
            console.log(rawWeight[0]);
            console.log(rawBodyfat[0]);
            console.log("Building weight dataset")
            aggregatedWeight = aggregate(rawWeight[0], body.aggregation, body.intervals, body.aggregation_strategy);
            console.log(aggregatedWeight);
            weight = {
                label: "Weight",
                fillColor: "rgba(0,0,220,0.6)",
                strokeColor: "rgba(0,0,220,1)",
                pointColor: "rgba(0,0,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(0,0,220,0.6)",
                data: aggregatedWeight.map(function(entry){ if (entry) {return entry["value"]; } else { return 0; } })
            };
            console.log("Building bodyfat dataset")
            var bodyfat = aggregate(rawBodyfat[0], body.aggregation, body.intervals, body.aggregation_strategy);
            console.log(bodyfat);
            var leanMass = [];
            for(i = 0; i < weight['data'].length; i++){
                if (bodyfat[i] && bodyfat[i]['value'] > 0) {
                    leanMass.push(weight['data'][i] - (weight['data'][i] * (bodyfat[i]['value'] * 0.01)));
                } else {
                    leanMass.push(0);
                }
            }
            console.log(leanMass);
            lean = {
                label: "Lean Mass",
                fillColor: "rgba(0,220,0,0.6)",
                strokeColor: "rgba(0,220,0,1)",
                pointColor: "rgba(0,220,0,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(0,220,0,0.6)",
                data: leanMass
            };
            var chart = new Chart(ctx).Line({
                labels: intervalsAsLabels(body.intervals, body.aggregation),
                datasets: [
                    weight,
                    lean
                ]
            },{scaleBeginAtZero: true});
            // populateDataSet(chart, '/weight', this.aggregation, 0, intervals);
            $('#body-legend').html(chart.generateLegend());
        });
    }
}
