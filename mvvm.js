//https://www.educative.io/collection/page/5429798910296064/5725579815944192/6200954505396224
class ViewModel {
  model = null;
  count = 0;
  status = '';
  constructor(model) {
    this.model = model;
    this.model.registerListener((value) =>{
      this.binder.count = value * 2;
    })
  }
  bind(boundTarget) {
    let proxy = {
      set: (target, prop, value) => {
        switch(prop){
          case "count":
            target[prop] = value;
            boundTarget[prop] = value;
            break;
          case "status":
            target[prop] = value;
            boundTarget[prop] = value;
            break;
        }
        boundTarget["model"] =  'Model count : ' + this.model.count
        return true;
      },
    };
    this.binder = new Proxy(this, proxy);
    this.binder.count = this.model.count * 2;//init
  }
  add(v) {
    this.binder.status = 'Processing...';
    setTimeout(() => {
      this.binder.status = '';
      this.model.count += Number(v);
    }, 1000);
  }
}

class Model {
  constructor(startCount) {
    this._count = Number(startCount);
    this.listeners = [];
  }
  registerListener(listener){
    this.listeners = [...this.listeners, listener];
  }
  get count() {
    return Number(this._count);
  }
  set count(v) {
    this._count = Number(v);
    this.notify()
  }
  notify(){
    this.listeners.forEach(listener => listener(this._count))
  }
}
//input & display
class View {
  constructor(vm, container, title, dom) {
    this.vm = vm;
    this.buildUI(container, title, dom);
  }
  set count(v) {
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
