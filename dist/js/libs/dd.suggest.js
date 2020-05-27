"use strict";

(function () {
  function throttle(func, ms) {
    var isThrottled = false,
        savedArgs,
        savedThis;

    function wrapper() {
      if (isThrottled) {
        savedArgs = arguments;
        savedThis = this;
        return;
      }

      func.apply(this, arguments);
      isThrottled = true;
      setTimeout(function () {
        isThrottled = false;

        if (savedArgs) {
          wrapper.apply(savedThis, savedArgs);
          savedArgs = savedThis = null;
        }
      }, ms);
    }

    return wrapper;
  }

  function suggestKeyup() {
    var $this = $(this),
        query = $this.val(),
        suggestData = {
      // creating query object
      query: query,
      locations: [{
        region: 'москва'
      }, {
        region: 'московская'
      }]
    };
    suggestData = JSON.stringify(suggestData);
    $.ajax({
      url: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
      type: 'POST',
      contentType: 'application/json',
      data: suggestData,
      headers: {
        'Authorization': 'Token e6a0c28515d821dfd8e7af017ab582e228c1b4d5'
      }
    }).done(fillSuggestions);
  }

  function fillSuggestions(data) {
    var $suggestWrapper = $('.address_suggest');
    $suggestWrapper.fadeOut(150);
    $suggestWrapper.empty(); // clearing suggests

    if (data.suggestions.length) {
      data.suggestions.forEach(function (elem) {
        // filling 'em with new elements
        $suggestWrapper.append('<div class="address_suggest-item">' + elem.value + '</div>');
      });
    } else {
      $suggestWrapper.append('<div class="address_suggest-item">Адрес не найден</div>');
    }

    $suggestWrapper.fadeIn(150);
  }

  $(document).ready(function () {
    var throttledKeyup = throttle(suggestKeyup, 600);
    $('.address-suggest-input').keyup(throttledKeyup);
    $('.address_suggest').on('click', '.address_suggest-item', function () {
      $('.address-suggest-input').val(this.innerText);
      $('.address_suggest').fadeOut(150);
    });
    $(document).click(function (e) {
      if (!e.target.classList.contains('address_suggest') || !e.target.classList.contains('address-suggest-input')) {
        $('.address_suggest').fadeOut(150);
      }
    });
  });
})();