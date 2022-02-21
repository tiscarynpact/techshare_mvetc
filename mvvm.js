//https://developer.mozilla.org/en-US/docs/Glossary/MVC
class ViewModel {
  model = null;
  count = 0;
  status = '';
  constructor(model) {
    this.model = model;
    this.count = this.model.count * 2;
  }
  bind(boundTarget) {
    let proxy = {
      set: function (obj, prop, value) {
        obj[prop] = value;
        return true;
      },
    };
    this.binder = new Proxy(boundTarget, proxy);
    this.reflect();
  }
  add(v) {
    this.status = 'Processing...';
    this.reflect();
    setTimeout(() => {
      this.model.count += Number(v);
      this.count = this.model.count * 2;
      this.status = '';
      this.reflect();
    }, 1000);
  }
  reflect() {
    this.binder.status = this.status;
    this.binder.value = 'ViewModel: ' + this.count;
    this.binder.model = 'Model: ' + JSON.stringify(this.model);
  }
}

class Model {
  constructor(startCount) {
    this._count = Number(startCount);
  }
  get count() {
    return Number(this._count);
  }
  set count(v) {
    this._count = Number(v);
  }
}
//input & display
class View {
  constructor(vm, container, title, dom) {
    this.vm = vm;
    this.buildUI(container, title, dom);
  }
  set value(v) {
    this.divRes.innerText = v;
  }
  set status(txt) {
    this.waiting.textContent = txt;
  }
  set model(model) {
    this.divModel.innerText = model;
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
    btn.onclick = () => {
      this.vm.add(ipt.value);
    };
    this.divRes = dom.createElement('div');
    this.divRes.textContent = 0;
    container.appendChild(this.divRes);

    this.divModel = dom.createElement('div');
    this.divModel.textContent = '';
    container.appendChild(this.divModel);

    this.waiting = dom.createElement('div');
    this.waiting.textContent = '';
    container.appendChild(this.waiting);
  }
}
