$(document).ready(function() {

    $(".choose-city_popup-desk .choose-city_popup-body").jScrollPane({
        verticalDragMinHeight: 63,
		verticalDragMaxHeight: 63,
    });

    $(".choose-city_popup-mob .choose-city_popup-body").jScrollPane({
        verticalDragMinHeight: 18,
		verticalDragMaxHeight: 18,
    });

    $(".cart__data").jScrollPane();

    $(window).resize(function() {
        if(window.innerWidth < 1170) {
            $(".cart__data").jScrollPane().data('jsp').destroy();
            console.log('preive');
        }
    });

});