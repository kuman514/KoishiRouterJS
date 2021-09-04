import Component from "./Component.js";
import ListItem from "./ListItem.js";

export default class List extends Component {
  constructor(initState, initProps) {
    super(initState, initProps);

    this.rootElement = document.createElement('div');
    this.rootElement.className = 'list';

    this.render = () => {
      const title = document.createElement('h1');
      title.textContent = '읽을거리 목록';

      const ul = document.createElement('ul');
      this.props.items.forEach((item) => {
        ul.appendChild((new ListItem({}, item)).rootElement);
      });

      this.rootElement.appendChild(title);
      this.rootElement.appendChild(ul);
    };

    this.render();
  }
}
