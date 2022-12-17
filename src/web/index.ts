import {waveFill} from "../draws";

const render = () => {
  const app = document.getElementById("app");

  const canvas = document.createElement("canvas");
  canvas.height = 30;
  canvas.width = 1200;
  const ctx = canvas.getContext("2d");
  const positions = {x: [], y: []};

  for (let i = 0; i < canvas.width; i++) {
    const x = i;
    const y = Math.floor(Math.random() * canvas.height);
    positions.x.push(x);
    positions.y.push(y);
  }
  console.log(positions);
  waveFill(canvas, ctx, positions);
  app.appendChild(canvas);

}

render();