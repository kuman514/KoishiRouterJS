import Component from "./Component.js";
import List from "./List.js";
import Read from "./Read.js";

// type: 'main', 'read', 'bookmark'

export default class App extends Component {
  constructor(initState, initProps) {
    super(initState, initProps);

    this.rootElement = document.createElement('main');

    this.getAndRenderMain = () => {
      fetch('content/list.json').then((response) => {
        if (response.ok) {
          return response.json();
        }
      }).then((data) => {
        const list = new List({}, {items: data});
        list.rootElement.addEventListener('click', (event) => {
          const listItem = event.target.closest('.list-item');
          if (listItem) {
            const id = parseInt(listItem.id);

            // Vanilla JS Routing Used ================
            window.history.pushState(
              {
                articleId: id,
                mode: 'read'
              },
              `Read Article ${id}`,
              `/article/${id}`
            );
            this.setState({
              mode: 'read'
            });
            // ========================================
          }
        });
        this.rootElement.appendChild(list.rootElement);
      });
    };

    this.getAndRenderRead = (articleId) => {
      fetch(`content/${articleId}.json`).then((response) => {
        if (response.ok) {
          return response.json();
        }
      }).then((data) => {
        this.rootElement.appendChild((new Read({}, data)).rootElement);
      });
    };

    this.getAndRenderBookmark = () => {

    };

    this.render = () => {
      this.rootElement.innerText = '';
      switch (this.state.mode) {
        case 'main':
          this.getAndRenderMain();
          break;
        case 'read':
          this.getAndRenderRead(window.history.state.articleId);
          break;
        case 'bookmark':
          break;
      }
    };

    // Vanilla JS Routing Used ================
    window.onpopstate = () => {
      if (window.history.state) {
        switch (window.history.state.mode) {
          case 'read':
            this.setState({mode: 'read'});
            break;
          case 'bookmark':
            this.setState({mode: 'bookmark'});
            break;
          default:
            break;
        }
      } else {
        this.setState({mode: 'main'});
      }
    };
    // ========================================

    this.render();
  }
}
