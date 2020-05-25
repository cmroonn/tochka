"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var body = document.querySelector("body"); // Hamburger menu settings

  {
    var button = document.querySelector(".menu-btn");
    button.addEventListener("click", function (e) {
      e.preventDefault();
      button.classList.toggle("menu-btn-active");
      body.classList.toggle("disabled");
    });
  }
});