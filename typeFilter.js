"use strict";
/*
1. Add class "fItem" to elements to be sorted with data-ftype attribute with sort value
2. Add class "fGroup" to elements to be sorted with data-fgroup attribute with sort value (if need group filtering)
3. Add class "fType" to elements to be button for selected filter with data-ftype attribute value for what to be sorted
3.1 Add data-fgroup attribute if you added groups for filtering
4. Init class as new TypeFilter('.fItem','.fType','activeClassName','hiddenClassName') after event DOMContentLoaded where first param is class for items and second is for switchers
5. This classes can be changed on your wish
6. Inner text of node element with classname fSum will be replaced with total elemens on page
7. node element with data-ftype-total="id" where id is selector, same as on button, innerText will be replaced with total elements with placed id
*/
class TypeFilter {
  init() {
    this.countSum();
    this.bindGroups();
    this.bindButtons();
    this.findButtons();
    this.bindReset();
  }
  bindReset() {
    self.resetBtn.addEventListener("click", function () {
      console.warn(self.id);
      self.items.forEach((f) => {});
    });
  }
  bindGroups() {
    let self = this;
    if (!self.groups) return;
    self.groups.forEach((g) => {
      g.addEventListener("click", function (x) {
        let group = g.getAttribute("data-fgroup");
        self.groups.forEach((g) => {
          g.classList.remove(self.active);
        });
        if (self.groupSelected != group) {
          x.target.classList.add(self.active);
          self.showGroup(group);
        } else {
          self.showAll();
          self.groupSelected = 0;
          if (self.groupSelected == 0) {
            self.buttons.forEach((b) => {
              b.classList.remove(self.hidden);
            });
          }
        }
      });
    });
  }
  showGroup(id) {
    let self = this;
    self.typeSelected = [];
    self.buttons.forEach((b) => {
      b.classList.remove(self.active);
      if (
        b.getAttribute("data-fgroup") != id &&
        b.getAttribute("data-ftype") != 0
      ) {
        b.classList.add(self.hidden);
      } else {
        b.classList.remove(self.hidden);
        if (id == b.getAttribute("data-fgroup")) {
          self.typeSelected.push(b.getAttribute("data-ftype"));
        }
      }
    });

    self.hideAll();
    self.typeSelected.forEach((f) => {
      self.showById(f);
    });

    self.groupSelected = id;
  }
  bindButtons() {
    self = this;
    self.buttons.forEach((x) => {
      let id = x.getAttribute("data-ftype");
      if (id == 0) {
        self.resetBtn = x;
      }
      x.addEventListener("click", (e) => {
        if (e.target.getAttribute("data-ftype") != 0) {
          if (id == 0) {
            if (self.id != 0) {
              self.hideAll();
              self.showAll();
              self.buttons.forEach((b) => {
                b.classList.remove(self.active);
              });
              x.classList.add(self.active);
              self.id = 0;
              return;
            }
          }

          if (self.id == id) {
            x.classList.remove(self.active);
            self.id = 0;
            this.showAll(self.typeSelected);
            return;
          }
          if (self.id != id) {
            self.buttons.forEach((b) => {
              b.classList.remove(self.active);
            });
            self.id = id;
            x.classList.add(self.active);
            self.hideAll();
            self.showById(id);
            return;
          }
          if (self.id > 0) {
            x.classList.add(self.active);
            self.id = id;
            self.hideAll();
            self.showById();
            return;
          }
        } else {
          self.id = 0;
          self.groupSelected = [];
          self.buttons.forEach((f) => {
            f.classList.remove(self.active);
            f.classList.remove(self.hidden);
          });
          self.groups.forEach((f) => {
            f.classList.remove(self.active);
            f.classList.remove(self.hidden);
          });
          self.showAll();
        }
      });
    });
  }
  findButtons() {
    let self = this;
    let ids = [];
    self.buttons.forEach((b) => {
      ids.push(b.getAttribute("data-ftype"));
    });
    ids.forEach((i) => {
      self.countById(i);
    });
  }
  countById(id) {
    let total = 0;
    this.items.forEach((i) => {
      if (i.getAttribute("data-ftype") == id) {
        total++;
      }
    });
    let sum = document.querySelector('[data-ftype-total="' + id + '"]');
    if (sum) {
      sum.innerText = total;
    }
    return total;
  }
  countSum() {
    let sum = document.querySelector(".fSum");
    if (sum) {
      sum.innerText = this.items.length;
    }
  }
  hideAll() {
    this.items.forEach((f) => {
      f.classList.add(self.hidden);
    });
  }
  showById(id) {
    let self = this;
    this.items.forEach((f) => {
      if (f.getAttribute("data-ftype") == id && id > 0) {
        f.classList.remove(self.hidden);
      }
    });
  }
  showAll(id = false) {
    let self = this;
    if (id.length > 0) {
      this.items.forEach((f) => {
        let found = self.typeSelected.indexOf(f.getAttribute("data-ftype"));
        if (found >= 0) {
          f.classList.remove(self.hidden);
        } else {
          f.classList.add(self.hidden);
        }
      });
    } else {
      this.items.forEach((f) => {
        f.classList.remove(self.hidden);
      });
    }
  }
  constructor(groupsInit, itemsInit, buttonsInit, active, hidden) {
    let self = this;
    document.addEventListener("DOMContentLoaded", function () {
      let groups = !groupsInit ? ".fGroup" : groupsInit;
      let items = !itemsInit ? ".fItem" : itemsInit;
      let buttons = !buttonsInit ? ".fType" : buttonsInit;
      self.active = !active ? "active" : active;
      self.hidden = !hidden ? "hidden" : hidden;
      self.typeSelected = [];
      self.itemsClass = items;
      self.groups = document.querySelectorAll(groups);
      self.items = document.querySelectorAll(items);
      self.buttons = document.querySelectorAll(buttons);
      self.active = active;
      self.id = 0;
      if (self.items && self.buttons) {
        self.init();
      }
    });
  }
}

//Simple execute code. All params are not nessary. These are defaults
new TypeFilter(".fGroup", ".fItem", ".fType", "active", "hidden");
