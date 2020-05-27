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
    var window = document.querySelector(".notification-popup");
    close.forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        window.style.display = "none";
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
  }
  {
    var addressessWrapper = document.querySelector(".address_suggest");
    var addresses = document.querySelectorAll(".address_suggest-item");
    var input = document.querySelector(".cart__data input[name='address']");
    input.addEventListener("click", function () {
      addressessWrapper.classList.add("show");
    });
    addresses.forEach(function (address) {
      address.addEventListener("click", function (e) {
        var target = e.target.innerText;
        input.value = target;
        address.parentElement.classList.remove("show");
      });
    });
  }
});