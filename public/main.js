import { renderElements } from "./render.js";

let elements = [];

document.addEventListener('DOMContentLoaded', async () => {
  elements = await getAll();
  console.log(elements);
  renderElements(elements);
});

