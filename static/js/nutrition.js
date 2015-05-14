var nutrition = new function() {
    this.divid = "nutrition";
    this.aggregation = undefined;
    this.aggregation_strategy = "sum";
    this.chart = undefined;
    this.numIntervals = 7;
    this.intervals = undefined;
    this.refresh = function() {
        // Replace canvas to clear any previous graph
        $('#nutrition-calories-actual').replaceWith('<canvas id="nutrition-calories-actual"></canvas>');
        var ctx_actual = $('#nutrition-calories-actual').get(0).getContext("2d");
        $('#nutrition-calories-target').replaceWith('<canvas id="nutrition-calories-target"></canvas>');
        var ctx_target = $('#nutrition-calories-target').get(0).getContext("2d");
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
            var caloriesToday = aggregate(rawCalories,'day',[moment()], nutrition.aggregation_strategy);
            console.log(caloriesToday);
            if (caloriesToday[0]) {
            console.log("Building nutrition dataset");
                var options = {
                    onAnimationComplete: function(){
                        ctx_actual.font = '20px Droid Sans Mono';
                        ctx_actual.fillStyle = '#000000';
                        ctx_actual.fillText("Actual:" + caloriesToday[0]['value'], 150, 100);
                    }
                };
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
                ];
                var actual_breakdown = new Chart(ctx_actual).Pie(data,options);
            }

            // Build target breakdown
            console.log("Building target breakdown dataset");
            targetCalories = []
            // Lifting or Rest day?
            for (i = 1; i <= 7; i++) {
                // 1 == Monday, 7 == Sunday
                targetCalories[i] = {};
                switch (i) {
                    case 1:
                    case 3:
                    case 5:
                    case 6:
                        // Rest day
                        targetCalories[i]['value'] = 2000;
                        targetCalories[i]['fat'] = 100;
                        targetCalories[i]['carbohydrates'] = 100;
                        targetCalories[i]['protein'] = 170;
                        break;
                    case 2:
                    case 4:
                    case 7:
                        // Lifting day
                        targetCalories[i]['value'] = 2800;
                        targetCalories[i]['fat'] = 50;
                        targetCalories[i]['carbohydrates'] = 418;
                        targetCalories[i]['protein'] = 170;
                        break;
                }
            }
            console.log(targetCalories);
            // Build graph
            var isoWeekday = moment().isoWeekday();
            var options = {
                onAnimationComplete: function(){
                    ctx_target.font = '20px Droid Sans Mono';
                    ctx_target.fillStyle = '#000000';
                    ctx_target.fillText("Target:" + targetCalories[isoWeekday]['value'], 150, 100);
                }
            };
            var newOptions = {
                inGraphDataShow: true,
                inGraphDataRadiusPosition: 2,
                inGraphDataFontColor: 'white'
            };
            console.log("Using target for isoWeekday " + isoWeekday);
            var data = [
                {
                    value: targetCalories[isoWeekday]['protein'],
                    color:"#F7464A",
                    highlight: "#FF5A5E",
                    label: "Protein"
                },
                {
                    value: targetCalories[isoWeekday]['fat'],
                    color: "#46BFBD",
                    highlight: "#5AD3D1",
                    label: "Fat"
                },
                {
                    value: targetCalories[isoWeekday]['carbohydrates'],
                    color: "#FDB45C",
                    highlight: "#FFC870",
                    label: "Carbohydrates"
                }
            ];
            var target_breakdown = new Chart(ctx_target).Pie(data,options);
            // $('#nutrition-calories-target-legend').html(target_breakdown.generateLegend());
        });
    }
}
