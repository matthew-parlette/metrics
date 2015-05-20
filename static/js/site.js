$(document).ready(function(){
    // Dropdowns
    // $(".dropdown-toggle").dropdown();
    // $('.aggregation button').click(function(){
    //     $(this).siblings().removeClass('active');
    //     $(this).addClass('active');
    //     window[this.dataset.chart].aggregation = this.dataset.aggregation;
    //     window[this.dataset.chart].refresh();
    // });
    //
    // // Click the default buttons for each chart
    // $("#body-panel > .panel-heading > .pull-right > [class*=aggregation] > [data-aggregation='week']").trigger('click');
    // $("#nutrition-panel > .panel-heading > .pull-right > [class*=aggregation] > [data-aggregation='day']").trigger('click');

    impress().init();

    $('#arrowLeft').click(function(e){
        impress().prev();
        e.preventDefault();
    });

    $('#arrowRight').click(function(e){
        impress().next();
        e.preventDefault();
    });

    window.addEventListener('impress:stepenter', function() {
        $('#' + "body").replaceWith('<canvas id="' + "body" + '"></canvas>');
		if($('#body-slide').hasClass('active')) {
            body.aggregation = 'week';
			body.refresh();
		}
	});
});
