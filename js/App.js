import Component from "./Component.js";
import List from "./List.js";
import Read from "./Read.js";
import Bookmark from "./Bookmark.js";

// type: 'main', 'read', 'bookmark'

export default class App extends Component {
  constructor(initState, initProps) {
    super(initState, initProps);

    this.rootElement = document.createElement('main');

    this.bookmarks = localStorage.getItem('bookmarks');
    this.saveBookmarks = () => {
      localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
    };
    this.appendBookmark = (article) => {
      this.bookmarks.push(article);
      this.saveBookmarks();
    };

    if (this.bookmarks === null || this.bookmarks === undefined) {
      this.bookmarks = [];
      this.saveBookmarks();
    } else {
      this.bookmarks = JSON.parse(this.bookmarks);
    }

    this.getAndRenderMain = () => {
      const bookmarkButton = document.createElement('button');
      bookmarkButton.className = 'bookmark-button';
      bookmarkButton.textContent = '북마크 보기';
      bookmarkButton.addEventListener('click', () => {
        // Vanilla JS Routing Used ================
        window.history.pushState(
          {
            mode: 'bookmark'
          },
          `bookmark`,
          `/bookmark`
        );
        this.setState({
          mode: 'bookmark'
        });
        // ========================================
      });
      this.rootElement.appendChild(bookmarkButton);

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
              `article/${id}`
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
      fetch(`../content/${articleId}.json`).then((response) => {
        if (response.ok) {
          return response.json();
        }
      }).then((data) => {
        data.onBookmark = () => {
          this.appendBookmark({
            id: data.id,
            title: data.title
          });
          // Vanilla JS Routing Used ================
          window.history.pushState(
            {
              mode: 'bookmark'
            },
            `bookmark`,
            `../bookmark`
          );
          this.setState({
            mode: 'bookmark'
          });
          // ========================================
        };
        this.rootElement.appendChild((new Read({}, data)).rootElement);
      });
    };

    this.getAndRenderBookmark = () => {
      const list = new Bookmark({}, {items: this.bookmarks});
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
            `article/${id}`
          );
          this.setState({
            mode: 'read'
          });
          // ========================================
        }
      });
      this.rootElement.appendChild(list.rootElement);
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
          this.getAndRenderBookmark();
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
            this.setState({mode: 'main'});
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
