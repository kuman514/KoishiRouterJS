import Component from "./Component.js";

export default class Read extends Component {
  constructor(initState, initProps) {
    super(initState, initProps);

    this.rootElement = document.createElement('div');
    this.rootElement.className = 'read';

    this.createNormalElement = (value) => {
      const finalElement = document.createTextNode(value);
      return finalElement;
    }

    this.createParsedElement = (code, value) => {
      //console.log(code, value);
      switch (code) {
        case 'br':
          return document.createElement('br');
        case 'img':
          const image = document.createElement('img');
          image.src = (value.indexOf('http') !== -1) ? value : `../img/${value}`;
          return image;
        case 'youtube':
          const yt = document.createElement('embed');
          yt.src = `https://www.youtube.com/embed/${value}`;
          return yt;
        case 'h2':
          const h2 = document.createElement('h2');
          const textForH2 = this.createNormalElement(value);
          h2.appendChild(textForH2);
          return h2;
        case 'anchor':
          const a = document.createElement('a');
          const data = value.split('@');
          a.target = '_blank';
          switch (data.length) {
            case 2:
              a.href = data[1];
              a.appendChild(this.createNormalElement(data[0]));
              break;
            case 3:
              a.href = data[2];
              a.appendChild(this.createParsedElement(data[0], data[1]));
              break;
          }
          return a;
      }
    }

    this.render = () => {
      const title = document.createElement('h1');
      title.textContent = this.props.title;
      this.rootElement.appendChild(title);

      const bookmarkButton = document.createElement('button');
      bookmarkButton.className = 'bookmark-button';
      bookmarkButton.textContent = '북마크하기';
      bookmarkButton.addEventListener('click', () => {
        this.props.onBookmark();
      });
      this.rootElement.appendChild(bookmarkButton);

      this.props.content.forEach((paragraph) => {
        const p = document.createElement('p');

        paragraph.split('&${').forEach((item, index) => {
          if (index === 0) {
            p.appendChild(this.createNormalElement(item));
          } else {
            const [parsedObject, normal] = item.split('}');
            //console.log(parsedObject, normal);
            p.appendChild(this.createParsedElement(...parsedObject.split(',')));
            p.appendChild(this.createNormalElement(normal));
          }
        });

        this.rootElement.appendChild(p);
      });
    };

    this.render();
  }
}
