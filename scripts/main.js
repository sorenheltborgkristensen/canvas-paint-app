// canvas setup //
const artboard = document.getElementById("artboard");
const canvas = document.getElementById("paper");
const ctx = canvas.getContext("2d");

canvas.width = artboard.clientWidth;
canvas.height = artboard.clientHeight;

ctx.strokeStyle = "#000000";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 10;
ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let isDrawing = false;
let lastX = 0;
let lastY = 0;

function draw(e) {
  if (!isDrawing) return;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();

  lastX = e.offsetX;
  lastY = e.offsetY;
}

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));

// toolbox setup //
const colorContainer = document.getElementById("colors");
const shapeContainer = document.getElementById("shapes");
const brushSize = document.getElementById("brush-size");
const colorPicker = document.getElementById("color-picker");

const colors = [
  "#000000",
  "#ffffff",
  "#817E7F",
  "#C4C4C4",
  "#880016",
  "#B97B56",
  "#EF1924",
  "#FEAFC9",
  "#FE7F25",
  "#FDCA09",
  "#FEF100",
  "#EFE2AE",
  "#23B14D",
  "#B5E51F",
  "#00A3E7",
  "#9AD9EB",
  "#3F46CE",
  "#7092BD",
  "#A34AA3",
  "#C8BEE8",
];

const shapes = ["round", "square"];

function getColors(color) {
  colorContainer.innerHTML += `<button class="color" value="${color}" style="background:${color}"></button>`;
}

function setColorPicker(e) {
  ctx.strokeStyle = e.target.value;
  brushPreview.style.backgroundColor = e.target.value;
}

function getShapes(shape) {
  shapeContainer.innerHTML += `<button class="shape ${shape}" value="${shape}"></button>`;
}

function updateBrushSize() {
  ctx.lineWidth = this.value;
}

colors.forEach(getColors);
shapes.forEach(getShapes);

document.addEventListener("click", (e) => {
  if (!e.target.matches(".color")) return;
  ctx.strokeStyle = e.target.value;
});

document.addEventListener("click", (e) => {
  if (!e.target.matches(".shape")) return;
  ctx.lineCap = e.target.value;
});

brushSize.addEventListener("change", updateBrushSize);
brushSize.addEventListener("mousemove", updateBrushSize);
colorPicker.addEventListener("change", setColorPicker);
