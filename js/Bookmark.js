import Component from "./Component.js";
import BookmarkListItem from "./BookmarkListItem.js";

export default class Bookmark extends Component {
  constructor(initState, initProps) {
    super(initState, initProps);

    this.rootElement = document.createElement('div');
    this.rootElement.className = 'list';

    this.render = () => {
      const title = document.createElement('h1');
      title.textContent = '북마크';

      const ul = document.createElement('ul');
      this.props.items.forEach((item) => {
        ul.appendChild((new BookmarkListItem({}, item)).rootElement);
      });

      this.rootElement.appendChild(title);
      this.rootElement.appendChild(ul);
    };

    this.render();
  }
}
