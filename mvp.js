//https://anshul-vyas380.medium.com/model-view-presenter-b7ece803203c
//https://www.geeksforgeeks.org/mvp-model-view-presenter-architecture-pattern-in-android-with-example/
//https://www.raywenderlich.com/7026-getting-started-with-mvp-model-view-presenter-on-android
class Presenter {
  constructor(view, model) {
    this.view = view;
    console.log(view);
    this.view.registerPresenter(this);
    this.model = model;
  }
  handleValue(newValue) {
    const value = Number(this.model.getValue()) + Number(newValue);
    this.model.setValue(value);
    setTimeout(() => {
      this.view.displayValue(this.model.getValue())
      this.view.displayWaiting("");
    }, 1000);
    this.view.displayWaiting("Processing...");
  }
}
class Model {
  constructor(startValue) {
    this.value = startValue;
  }
  setValue(newValue) {
    this.value = newValue;
  }
  getValue() {
    return this.value;
  }
}

class View {
  constructor(container, title, dom) {
    this.buildUI(container, title, dom);
  }
  registerPresenter(presenter) {
    this.presenter = presenter;
  }
  displayValue(value) {
    this.divRes.textContent = value;
  }
  displayWaiting(text) {
    this.waiting.innerText = text;
  }
  
  buildUI(container, title, dom) {
    const div = dom.createElement('div');
    div.textContent = title;
    container.appendChild(div);

    const ipt = dom.createElement('input');
    ipt.type = 'text';
    ipt.value = 5;
    container.appendChild(ipt);

    const btn = dom.createElement('button');
    btn.innerText = 'add';
    container.appendChild(btn);
    btn.onclick = () => this.presenter.handleValue(ipt.value);

    this.divRes = dom.createElement('div');
    this.divRes.textContent = 0;
    container.appendChild(this.divRes);

    this.waiting = dom.createElement('div');
    this.waiting.textContent = '';
    container.appendChild(this.waiting);
  }
}
