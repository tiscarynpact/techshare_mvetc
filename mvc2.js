//https://www.educative.io/collection/page/5429798910296064/5725579815944192/6200954505396224
class Controler {
  model = null;
  views = null;
  constructor(model) {
    this.model = model;
    this.views = [];
  }
  registerView(v){
    this.views = [...this.views , v];
  }
  add(value) {
    this.model.add(value);
    this.updateViews();
  }
  constructor(model) {
    this.model = model;
  }
  updateViews(){
    this.views.forEach(v => v.updateSum(this.model.count))
  }
}

class Model {
  constructor(startCount) {
    this.count = startCount;
  }
  add(num) {
    this.count += Number(num);
  }
}
//input & display
class View {
  divRes = null;
  constructor(controler, container, title, dom) {
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
    btn.onclick = () => controler.add(ipt.value);

    this.divRes = dom.createElement('div');
    this.divRes.textContent = 0;
    container.appendChild(this.divRes);
    controler.registerView(this)
  }
  updateSum(value){
    this.divRes.innerText = value
  }
}
//display only (notifications du model)
class View2 {
  divRes = null;
  constructor(controler, container, title, dom) {
    this.controler = controler;
    const div = dom.createElement('div');
    div.textContent = title;
    container.appendChild(div);

    this.divRes = dom.createElement('div');
    this.divRes.textContent = 0;
    container.appendChild(this.divRes);
    controler.registerView(this)
  }
  updateSum(value){
    this.divRes.innerText = value
  }
}
//ajoute 1 au résultat (cela reste du display et ne change rien au model)
class View3 {
  constructor(controler, container, title, dom) {
    this.controler = controler;
    const div = dom.createElement('div');
    div.textContent = title;
    container.appendChild(div);

    this.divRes = dom.createElement('div');
    this.divRes.textContent = 0;
    container.appendChild(this.divRes);
    controler.registerView(this)

  }
  updateSum(value){
    this.divRes.innerText = value+1
  }
}
