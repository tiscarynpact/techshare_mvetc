//https://developer.mozilla.org/en-US/docs/Glossary/MVC
class ViewModel {
  model = null;
  constructor(model) {
    this.model = model;
  }
  register(binder) {
    this.binder = binder;
  }
  add(value) {
    this.binder.add(value);
  }
}

class Model {
  constructor(startCount) {
    this._count = Number(startCount);
  }
  add(num) {
    this._count += Number(num);
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
      vm.add(ipt.value);
    };
    this.divRes = dom.createElement('div');
    this.divRes.textContent = 0;
    container.appendChild(this.divRes);

    this.waiting = dom.createElement('div');
    this.waiting.textContent = '';
    container.appendChild(this.waiting);
  }
  setValue(v) {
    this.divRes.innerText = v;
  }
  setStatusDisplay(txt) {
    this.waiting.textContent = txt;
  }
}
