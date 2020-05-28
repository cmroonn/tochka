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
    });
  }
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
  } // Set nearest delivery time 

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
  }
  {
    var _button2 = document.getElementById("date-picker");

    var _closeButton = document.querySelector(".date-pick .close-window");

    var datePicker = document.querySelector(".date-pick");
    var timeTabs = document.querySelectorAll(".date-pick-time .time-item");
    var inputsBlock = document.querySelector(".cart__data-date-inputs");
    var timeInput = document.getElementById("select_time");
    var editDate = document.getElementById("editDate");

    _button2.addEventListener("click", function (e) {
      e.preventDefault();
      datePicker.classList.add("show");
      inputsBlock.classList.add("show");
      _button2.style.display = "none";
    });

    _closeButton.addEventListener("click", function () {
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
        console.log(errors);
        return true;
      } else {
        console.log(errors);
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
  }
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
  } // Address suggestion 
  // {
  //     const addressessWrapper = document.querySelector(".address_suggest");
  //     const addresses = document.querySelectorAll(".address_suggest-item");
  //     const input = document.querySelector(".cart__data input[name='address']");
  //     input.addEventListener("click", () => {
  //         addressessWrapper.classList.add("show");
  //     });
  //     addresses.forEach(address => {
  //         address.addEventListener("click", e => {
  //             let target = e.target.innerText;
  //             input.value = target;
  //             address.parentElement.classList.remove("show");
  //         });
  //     });
  // }
  // apartment informer 

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
    // собираем все якоря; устанавливаем время анимации и количество кадров
    var anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
        animationTime = 400,
        framesCount = 50;
    anchors.forEach(function (item) {
      // каждому якорю присваиваем обработчик события
      item.addEventListener('click', function (e) {
        // убираем стандартное поведение
        e.preventDefault(); // для каждого якоря берем соответствующий ему элемент и определяем его координату Y

        var coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset - document.querySelector(".header").offsetHeight; // запускаем интервал, в котором

        var scroller = setInterval(function () {
          // считаем на сколько скроллить за 1 такт
          var scrollBy = coordY / framesCount; // если к-во пикселей для скролла за 1 такт больше расстояния до элемента
          // и дно страницы не достигнуто

          if (scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
            // то скроллим на к-во пикселей, которое соответствует одному такту
            window.scrollBy(0, scrollBy);
          } else {
            // иначе добираемся до элемента и выходим из интервала
            window.scrollTo(0, coordY);
            clearInterval(scroller);
          } // время интервала равняется частному от времени анимации и к-ва кадров

        }, animationTime / framesCount);
      });
    });
    var toFillData = document.querySelector(".fill-data-mobile");
    window.addEventListener("scroll", function () {
      var scrollY = window.pageYOffset;

      if (scrollY > 1223) {
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
  }
});