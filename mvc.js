//https://developer.mozilla.org/en-US/docs/Glossary/MVC
class Controler {
  model = null;
  add(value) {
    this.model.add(value);
  }
  constructor(model) {
    this.model = model;
  }
}

class Model {
  listeners = [];
  constructor(startCount) {
    this.count = startCount;
  }
  add(num) {
    this.count += Number(num);
    this.notify();
  }
  addListener(listener) {
    this.listeners = [...this.listeners, listener];
  }
  notify() {
    this.listeners.forEach((listener) => listener(this.count));
  }
}
