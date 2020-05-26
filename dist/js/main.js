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
});