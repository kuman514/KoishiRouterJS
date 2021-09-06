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
          image.src = `../img/${value}`;
          return image;
        case 'youtube':
          const yt = document.createElement('embed');
          yt.src = `https://www.youtube.com/embed/${value}`;
          return yt;
      }
    }

    this.render = () => {
      const title = document.createElement('h1');
      title.textContent = this.props.title;
      this.rootElement.appendChild(title);

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
