/* Simple Vanilla JS Content Swither
 *  version 1.1
 *  27.12.2020
 *  Georgy Khudiakov
 *  me@regesh.ru
 *  ---------------------------------
 * 1.About
 *   You have content blocks on web page needs to be controled the visibility of them by another elements?
 *   So that is what this simple script is made for. Offen is usable, so why not to right once - use everywhere.
 *   No debendencies.
 * 2.Information
 *   The link between buttons and content they control visibility is "data-sw" attribute.
 *   Value of "swButton" attribute must be the same as on "swItem" element to be controled.
 *   Each "swItem" element that is hidden has class "swhidden" - default, can be changed.
 *   Each active "swItem" element has class "swactive" such as "swButton" - default, can be changed.
 * 3. Setup
 *   Add "swContainer" class to root dom element where items and buttons are presents.
 *   Add buttons to switch content by adding "swButton" class and data-sw="value" attribute.
 *   Add elements visible of which are controlled by buttons simple by adding class "swItem" to any
 *   dom element inside the root dom element with className "swContainer" where buttons are.
 *   And adding attribute data-sw="value" to each "swItem" element.
 * 4. Settings
 *   Class for active button and item can be changed by data-swactive attribute. Default is "swactive".
 *   Class for hidden item can be changed by data-swhidden attribute. Default is "swhidden".
 *   Change item and button linked to it, to be displayed on page load, can be changed by "data-swfirst" attribute.
 *   Add data-swtype="select" param and "swButton" class to "SELECT" dom element and to use options with value to change content
 *   by setting index of element needs to be visible.
 */

document.addEventListener("DOMContentLoaded", function () {
  (function () {
    console.clear();
    document.querySelectorAll(".swContainer").forEach((c) => {
      let swtype = !c.getAttribute("data-swtype") ? "single" : "select";
      let swactive = !c.getAttribute("data-swactive")
        ? "swactive"
        : c.getAttribute("data-swactive");
      let swhidden = !c.getAttribute("data-swhidden")
        ? "swhidden"
        : c.getAttribute("data-swhidden");
      let first = !c.getAttribute("data-swfirst")
        ? 0
        : c.getAttribute("data-swfirst") - 1;
      let swfirst = first > c.querySelectorAll(".swItem").length ? 0 : first;
      c.classList.remove(swhidden);
      c.querySelectorAll(".swItem").forEach((i) => {
        i.classList.add(swhidden);
      });
      c.querySelectorAll(".swItem")[swfirst].classList.remove(swhidden);
      c.querySelectorAll(".swButton")[swfirst].classList.add(swactive);
      c.querySelectorAll(".swItem")[swfirst].classList.add(swactive);
      if (c.querySelectorAll(".swButton")[0].nodeName == "SELECT") {
        c.querySelectorAll(".swButton")[0].addEventListener(
          "change",
          function (e) {
            let id = e.target.options[e.target.options.selectedIndex].value;
            c.querySelectorAll(".swItem").forEach((i) => {
              i.classList.add(swhidden);
              i.classList.remove(swactive);
              if (i.getAttribute("data-sw") == id) {
                i.classList.remove(swhidden);
                i.classList.add(swactive);
              }
            });
          }
        );
      } else {
        c.querySelectorAll(".swButton").forEach((b) => {
          b.addEventListener("click", (e) => {
            let curentBtn = e.target.classList.contains("swButton")
              ? e.target
              : e.target.closest(".swButton");
            c.querySelectorAll(".swButton").forEach((b) => {
              b.classList.remove(swactive);
            });
            curentBtn.classList.add(swactive);
            let id = curentBtn.getAttribute("data-sw");
            c.querySelectorAll(".swItem").forEach((i) => {
              i.classList.add(swhidden);
              i.classList.remove(swactive);
              if (i.getAttribute("data-sw") == id) {
                i.classList.remove(swhidden);
                i.classList.add(swactive);
              }
            });
          });
        });
      }
    });
  })();
});
