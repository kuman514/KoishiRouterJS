import Component from "./Component.js";

export default class BookmarkListItem extends Component {
  constructor(initState, initProps) {
    super(initState, initProps);

    this.rootElement = document.createElement('li');
    this.rootElement.className = 'list-item';

    this.render = () => {
      this.rootElement.id = this.props.id;

      const title = document.createElement('span');
      title.textContent = this.props.title;

      this.rootElement.appendChild(title);
    };

    this.render();
  }
}
