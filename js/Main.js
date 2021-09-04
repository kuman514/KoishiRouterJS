import App from "./App.js";

const startRender = (element) => {
  document.body.appendChild(element);
};

startRender((new App({mode: 'main'}, {})).rootElement);
