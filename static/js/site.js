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
