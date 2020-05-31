"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var body = document.querySelector("body"); // Hamburger menu settings

  {
    var button = document.querySelector(".menu-btn");
    var menu = document.getElementById("mob-menu");
    button.addEventListener("click", function (e) {
      e.preventDefault();
      button.classList.toggle("menu-btn-active");
      body.classList.toggle("disabled");
      menu.classList.toggle("show");
    }); // set new styles if scrolling down 

    window.addEventListener("scroll", function () {
      var scrollY = window.pageYOffset;

      if (scrollY > 55) {
        menu.style.top = 143 + "px";
        menu.style.height = "calc(100vh - 143px)";
      } else {
        menu.removeAttribute("style");
      }
    });
  } // Show search row in header

  {
    var _button = document.getElementById("searchButton");

    var closeButton = document.getElementById("close-search");
    var searchRow = document.getElementById("searchRow");

    _button.addEventListener("click", function (e) {
      e.preventDefault();
      searchRow.classList.toggle("show");
    });

    closeButton.addEventListener("click", function (e) {
      searchRow.classList.remove("show");
    });
  } // Notification window

  {
    var close = document.querySelectorAll(".closePopup");

    var _window = document.querySelector(".notification-popup");

    close.forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        _window.style.display = "none";
      });
    });
  } // Set nearest delivery time !!

  {
    // get current time
    var getCurrentTime = function getCurrentTime() {
      var time = new Date(Date.now());
      var hours = time.getUTCHours();
      var minutes = time.getUTCMinutes();
      return hours + ":" + minutes;
    };

    var setTime = function setTime() {
      document.getElementById("nearDelivery").innerHTML = getCurrentTime();
    };

    setInterval(setTime, 1000);
  } // Date picker

  {
    var _button2 = document.getElementById("date-picker");

    var _closeButton = document.querySelector(".date-pick .close-window");

    var datePicker = document.querySelector(".date-pick");
    var timeTabs = document.querySelectorAll(".date-pick-time .time-item");
    var inputsBlock = document.querySelector(".cart__data-date-inputs");
    var timeInput = document.getElementById("select_time");
    var editDate = document.getElementById("editDate");
    var confirm = document.querySelector(".date-pick__confirm");

    _button2.addEventListener("click", function (e) {
      e.preventDefault();
      datePicker.classList.add("show");
      inputsBlock.classList.add("show");
      _button2.style.display = "none";
    });

    _closeButton.addEventListener("click", function () {
      datePicker.classList.remove("show");
    });

    confirm.addEventListener("click", function () {
      datePicker.classList.remove("show");
    });
    timeTabs.forEach(function (elem) {
      elem.addEventListener("click", function () {
        timeTabs.forEach(function (el) {
          return el.classList.remove("active");
        }); // remove class active from all elems

        elem.classList.add("active");
        timeInput.setAttribute("value", "".concat(elem.innerText)); // set time in input 
      });
    });
    editDate.addEventListener("click", function (e) {
      e.preventDefault();
      datePicker.classList.add("show"); // show date picker
    });
    datePicker.addEventListener("click", function (e) {
      var target = e.target;
      var children = datePicker.children;

      if (target == datePicker) {
        datePicker.classList.remove("show");
      } // for(let i = 0; i < children.length; i++) {
      //     if(target !== children[i]) {
      //         datePicker.classList.remove("show");
      //     }
      // }

    });
  } // Inputs validation 

  {
    var form = document.querySelector(".cart");
    var submit = document.getElementById("cartSubmit");
    var emailInput = document.querySelector("input[name='email']");
    var fields = document.querySelectorAll(".cart .field");
    var rules = {
      email: {
        email: true,
        required: true
      },
      required: {
        required: true
      }
    };

    var validate = function validate() {
      if (!approve.value(emailInput.value, rules.email).approved) {
        emailInput.parentElement.classList.add("error");
      } else {
        emailInput.parentElement.classList.remove("error");
      }

      for (var i = 0; i < fields.length; i++) {
        if (!approve.value(fields[i].value, rules.required).approved) {
          fields[i].parentElement.classList.add("error");
        } else {
          fields[i].parentElement.classList.remove("error");
        }
      }

      ;
      var errors = document.querySelectorAll(".cart .cart-input.error");

      if (errors.length <= 0) {
        return true;
      } else {
        return false;
      }
    };

    submit.addEventListener("click", function (e) {
      e.preventDefault();
      validate();

      if (validate()) {
        document.getElementById("err").style.display = "none";
        $.ajax({
          method: 'POST',
          url: "sender.php"
        });
      } else {
        document.getElementById("err").style.display = "block";
      }
    });
  } // add more items 

  {
    var plus = document.querySelectorAll(".plusCount");
    var minus = document.querySelectorAll(".minusCount");
    plus.forEach(function (elem) {
      elem.addEventListener("click", function () {
        addItem(elem);
      });
    });
    minus.forEach(function (elem) {
      elem.addEventListener("click", function () {
        removeItem(elem);
      });
    });

    var addItem = function addItem(el) {
      var value = parseInt(el.parentElement.children[1].value) + 1;
      return el.parentElement.children[1].value = value;
    };

    var removeItem = function removeItem(el) {
      var value = parseInt(el.parentElement.children[1].value) - 1;

      if (value < 1) {
        return false;
      } else {
        return el.parentElement.children[1].value = value;
      }
    };
  } // apartment informer 

  {
    var informer = document.getElementById("appartmentInfo");
    var content = document.querySelector(".appartment-info-hidden");
    informer.addEventListener("mouseover", function (e) {
      content.classList.add("show");
    });
    informer.addEventListener("mouseout", function (e) {
      content.classList.remove("show");
    });
  } // anchors 

  {
    $(".anchor").on("click", function (event) {
      //отменяем стандартную обработку нажатия по ссылке
      event.preventDefault(); //забираем идентификатор бока с атрибута href

      var id = $(this).attr('href'),
          //узнаем высоту от начала страницы до блока на который ссылается якорь
      top = $(id).offset().top; //анимируем переход на расстояние - top за ВРЕМЯ мс

      $('body,html').animate({
        scrollTop: top - 150
      }, 700);
    });
    var toFillData = document.querySelector(".fill-data-mobile");
    window.addEventListener("scroll", function () {
      var scrollY = window.pageYOffset;

      if (scrollY > 1050) {
        toFillData.classList.remove("show");
      } else {
        if (!toFillData.classList.contains("show")) {
          toFillData.classList.add("show");
        }
      }
    });
  } // SMS sender settings 

  {
    $.ajax({
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://cmroonn.github.io/tochka/dist/"
      },
      url: "https://fallgetell@gmail.com:kPuqrIGUXhvl7ksomy9cOVnZNh2J@gate.smsaero.ru/v2/sms/testsend?number=79091169019&text=Test+text&sign=BIZNES&channel=DIRECT",
      type: "POST",
      timeout: '5000',
      async: true,
      dataType: "JSON",
      data: {}
    });
  } // Choose city settings

  {
    var cityBtn = document.getElementById("usersCity");
    var modal = document.querySelector(".choose-city");

    var _submit = document.getElementById("citySubmit");

    var popup = document.querySelector(".choose-city_popup");
    var openPopupBtn = document.getElementById("chooseCity");
    var popupDesk = document.querySelector(".choose-city_popup-desk");
    var popupMob = document.querySelector(".choose-city_popup-mob");
    var closeButtons = document.querySelectorAll(".choose-city_popup-desk .close, .choose-city_popup-mob .close ");
    cityBtn.addEventListener("click", function () {
      modal.classList.toggle("show");
      setPosition(cityBtn);
    });

    var setPosition = function setPosition(elem) {
      var position = elem.getBoundingClientRect(); // get position of elem

      modal.style.top = position.top + 35 + "px";
      modal.style.left = position.left + "px";
    };

    _submit.addEventListener("click", function () {
      modal.classList.remove("show");
    });

    openPopupBtn.addEventListener("click", function (e) {
      e.preventDefault();
      modal.classList.remove("show");
      popup.classList.add("show");
      body.classList.add("disabled");
    });
    popup.addEventListener("click", function (e) {
      if (e.target == popup) {
        popup.classList.remove("show");
        body.classList.remove("disabled");
      }
    });
    closeButtons.forEach(function (el) {
      el.addEventListener("click", function () {
        el.parentElement.parentElement.classList.remove("show");
        body.classList.remove("disabled");
      });
    });
    body.addEventListener("click", function (e) {
      var target = e.target;

      if (!modal.contains(target) && target !== cityBtn) {
        modal.classList.remove("show");
      }
    });
  } // fixed checkout top line

  {
    var checkoutTop = document.querySelector(".cart__checkout-top");
    checkWindowWidth();
    window.addEventListener("resize", function () {
      checkWindowWidth();
    });

    var checkWindowWidth = function checkWindowWidth() {
      if (window.innerWidth < 1170) {
        window.addEventListener("scroll", function (e) {
          if (pageYOffset > 175) {
            checkoutTop.style.boxShadow = "rgba(0, 0, 0, 0.2) 0px 23px 20px -20px";
          } else {
            checkoutTop.removeAttribute("style");
          }
        });
      }
    };
  }
});