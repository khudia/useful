"use strict";

/*
1. Add class "fItem" to elements to be sorted with data-ftype attribute with sort value
2. Add class "fType" to elements to be button for selected filter with data-ftype attribute value for what to be sorted
3. Init class as new TypeFilter('.fItem','.fType') after event DOMContentLoaded where first param is class for items and second is for switchers
4. This classes can be changed on your wish
*/
class TypeFilter {
  init() {
    document.querySelector(self.buttons).classList.add('active');
    let self = this;
    document.querySelectorAll(self.buttons).forEach(x => {
      x.addEventListener('click', () => {
        document.querySelectorAll(self.buttons).forEach(e => {
          e.classList.remove('active');
        });
        x.classList.add('active');
        let type = x.getAttribute('data-ftype');

        if (type > 0) {
          document.querySelectorAll(self.items + '[data-ftype]').forEach(f => {
            if (f.getAttribute('data-ftype') != type) {
              f.style.display = 'none';
            } else {
              f.style.removeProperty('display');
            }
          });
        } else {
          document.querySelectorAll(self.items + '[data-ftype]').forEach(f => {
            f.style.removeProperty('display');
          });
        }
      });
    });
  }

  constructor(items, buttons) {
    this.items = items;
    this.buttons = buttons;

    if (document.querySelector(this.items) && document.querySelector(this.buttons)) {
      console.clear();
      this.init();
    }
  }

}

document.addEventListener("DOMContentLoaded", function () {
  new TypeFilter('.fItem', '.fType');
});

