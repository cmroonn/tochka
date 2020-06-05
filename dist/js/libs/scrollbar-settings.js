$(document).ready(function() {

    $(".choose-city_popup-desk .choose-city_popup-body").jScrollPane({
        verticalDragMinHeight: 63,
		verticalDragMaxHeight: 63,
    });

    $(".delivery-info__content").jScrollPane({
        verticalDragMinHeight: 63,
		verticalDragMaxHeight: 63,
    });

    $(".cart__data").jScrollPane();


    $(window).resize(function() {
        if(window.innerWidth < 1170) {
            $(".cart__data").jScrollPane().data('jsp').destroy();

        }
    });

});