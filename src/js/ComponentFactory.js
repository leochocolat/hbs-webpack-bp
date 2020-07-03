const COMPONENTS = {
    'sample': () => import('./components/SampleComponent'),
}

class ComponentFactory {
    constructor() {
        this._selector = 'data-component';
        this._components = [];
    }

    start(activeView) {
        this._elements = activeView ? activeView.querySelectorAll(`[${this._selector}]`) : document.querySelectorAll(`[${this._selector}]`);
    
        for (let i = 0, limit = this._elements.length; i < limit; i++) {
          const element = this._elements[i];
          const componentName = element.getAttribute(this._selector);
    
          if (COMPONENTS[componentName]) {
            COMPONENTS[componentName]().then((value) => {
              const component = {
                name: componentName,
                instance:  new value.default(element),
                el: element
              };
              this._components.push(component);
            })
          } else {
            console.log(`Component: '${componentName}' not found`)
          }
        }
    }

    update() {
        for (let i in this._components) {
            if (!this._components[i].update) continue;
            this._components[i].update();
        }
    }

    close() {    
        for (let i = 0; i < this._components.length; i++) {
          if (!this._components[i].close) continue;
          this._components[i].close();
        }
    
        this._components = [];
    }
}

export default new ComponentFactory();

