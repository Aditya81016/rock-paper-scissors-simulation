import { size } from "../config.js";

export default function positionOf(element) {
  const left = element.offsetLeft;
  const top = element.offsetTop;
  return [left, top];
}

function int(px) {
  console.log(px);
  return parseInt(px.replace("px", ""));
}
