import Component from "./Component.js";

export default class ListItem extends Component {
  constructor(initState, initProps) {
    super(initState, initProps);

    this.rootElement = document.createElement('li');
    this.rootElement.className = 'list-item';

    this.render = () => {
      this.rootElement.id = this.props.id;

      const img = document.createElement('img');
      img.className = 'thumbnail';
      img.src = (this.props.thumbnail[0] !== '@') ? this.props.thumbnail : `https://kuman514.github.io/KoishiRouterJS/img/${this.props.thumbnail.split('@/')[1]}`;

      const title = document.createElement('span');
      title.textContent = this.props.title;

      this.rootElement.appendChild(img);
      this.rootElement.appendChild(title);
    };

    this.render();
  }
}
