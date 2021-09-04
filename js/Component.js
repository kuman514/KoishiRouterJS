export default class Component {
  constructor(initState, initProps) {
    this.state = initState;
    this.props = initProps;
    
    this.rootElement = document.createElement('div');

    this.render = () => {
      this.rootElement.textContent = 'Default Render';
    };

    this.setState = (newState) => {
      Object.entries(newState).forEach(([key, value]) => {
        this.state[key] = value;
      });
      this.render();
    };

    this.render();
  }
};
