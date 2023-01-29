import {basisFill, waveFill} from "../draws";
import {SortedList} from "../sorted-list-class";

const render = async () => {
  const app = document.getElementById("app");
  const waveFillCanvas = renderWaveFill();
  app.appendChild(waveFillCanvas);

  const basisFillCanvas = renderBasisFill();
  app.appendChild(basisFillCanvas);

  const basisWaveFillCanvas = renderBasisFill(true);
  app.appendChild(basisWaveFillCanvas);

  const sortedBenchmark = await renderSortedBenchmark();
  app.appendChild(sortedBenchmark);

}


const renderWaveFill = () => {
  const canvas = document.createElement("canvas");
  canvas.height = 120;
  canvas.width = 1200;
  const ctx = canvas.getContext("2d");
  const positions = {x: [], y: []};

  for (let i = 0; i < canvas.width; i += 15) {
    const x = i;
    const y = Math.floor(Math.random() * canvas.height);
    positions.x.push(x);
    positions.y.push(y);
  }
  waveFill(canvas, ctx, positions);
  return canvas;
}

const renderBasisFill = (wave = false) => {
  const canvas = document.createElement("canvas");
  canvas.height = 120;
  canvas.width = 1200;
  const ctx = canvas.getContext("2d");
  const positions = {x: [], y: []};

  for (let i = 0; i < canvas.width; i += 15) {
    const x = i;
    const y = Math.floor(Math.random() * canvas.height);
    positions.x.push(x);
    positions.y.push(y);
  }
  basisFill(canvas, ctx, positions, "rgba(0, 0, 0, 0.5)", wave, true);
  return canvas;
}


const testCount = 5;
const arrLength = 10000;
const sortedListBenchmark = () => {
  const unsortedList = [];
  for (let i = 0; i < arrLength; i++) {
    unsortedList.push(Math.floor(Math.random() * 1000000));
  }
  const sortedPerfs = [];
  for (let i = 0; i < testCount; i++) {
    const copiedUnsorted = [...unsortedList];
    const startTime = performance.now();
    const list = new SortedList<number>((a, b) => a - b, copiedUnsorted);
    for (let i = 0; i < arrLength; i++) {
      list.add(Math.floor(Math.random() * 1000000));
    }
    const endTime = performance.now();
    sortedPerfs.push(endTime - startTime);
  }

  const normalPerfs = [];
  for (let i = 0; i < testCount; i++) {
    const copiedUnsorted = [...unsortedList];
    const startTime = performance.now();
    const list = copiedUnsorted.sort((a, b) => a - b);
    for (let i = 0; i < arrLength; i++) {
      list.push(Math.floor(Math.random() * 1000000));
      list.sort((a, b) => a - b);
    }
    const endTime = performance.now();
    normalPerfs.push(endTime - startTime);
  }

  return {
    sortedPerfs,
    normalPerfs
  }
}

const renderSortedBenchmark = async () => {
  const div = document.createElement("div");
  const pre = document.createElement("pre");
  pre.innerText = `When List Has ${arrLength} Elements. Add ${arrLength} Elements
  // Sorted List Codes
    const copiedUnsorted = [...unsortedList];
    const list = new SortedList<number>((a, b) => a - b, copiedUnsorted);
    for (let i = 0; i < arrLength; i++) {
      list.add(Math.floor(Math.random() * 1000000));
    }    

  // Normal Array Codes
  const list = copiedUnsorted.sort((a, b) => a - b);
  for (let i = 0; i < arrLength; i++) {
    list.push(Math.floor(Math.random() * 1000000));
    list.sort((a, b) => a - b);
  }
`;

  div.appendChild(pre)
  const {sortedPerfs, normalPerfs} = sortedListBenchmark();
  const sortedAvg = sortedPerfs.reduce((a, b) => a + b, 0) / sortedPerfs.length;
  const normalAvg = normalPerfs.reduce((a, b) => a + b, 0) / normalPerfs.length;
  for (let i = 0; i < testCount; i++) {
    const sortedP = document.createElement("p");
    sortedP.innerText = `Sorted: ${sortedPerfs[i]}`;
    div.appendChild(sortedP);
    const normalP = document.createElement("p");
    normalP.innerText = `Normal: ${normalPerfs[i]}`;
    div.appendChild(normalP);
  }
  const p = document.createElement("p");


  p.innerHTML = `When List Has ${arrLength} Elements. Add ${arrLength} Elements.
  <br>Sorted List Average: ${sortedAvg}ms
  <br>Normal Array Average: ${normalAvg}ms`;


  div.appendChild(p);
  return div;
}


render().then(console.log).catch(console.error);