//https://developer.mozilla.org/en-US/docs/Glossary/MVC
class Controler {
  model = null;
  constructor(model) {
    this.model = model;
  }
  add(value) {
    //this.model.add(value);
    setTimeout(() => this.model.add(value), 1000);
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
//input & display
class View {
  constructor(controler, model, container, title, dom) {
    this.controler = controler;
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
      controler.add(ipt.value);
      this.waiting.innerText = 'in progress...';
    };

    const divRes = dom.createElement('div');
    divRes.textContent = 0;
    container.appendChild(divRes);

    this.waiting = dom.createElement('div');
    this.waiting.textContent = '';
    container.appendChild(this.waiting);

    model.addListener((value) => {
      divRes.innerText = value;
      this.waiting.innerText = '';
    });
  }
}
//display only (notifications du model)
class View2 {
  constructor(controler, model, container, title, dom) {
    this.controler = controler;
    const div = dom.createElement('div');
    div.textContent = title;
    container.appendChild(div);

    const divRes = dom.createElement('div');
    divRes.textContent = 0;
    container.appendChild(divRes);

    model.addListener((value) => (divRes.innerText = value));
  }
}
//ajoute 1 au résultat (cela reste du display et ne change rien au model)
class View3 {
  constructor(controler, model, container, title, dom) {
    this.controler = controler;
    const div = dom.createElement('div');
    div.textContent = title;
    container.appendChild(div);

    const divRes = dom.createElement('div');
    divRes.textContent = 0;
    container.appendChild(divRes);

    model.addListener((value) => (divRes.innerText = value + 1));
  }
}
