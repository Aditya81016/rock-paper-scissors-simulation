import Paper from "./classes/paper.js";
import Rock from "./classes/rock.js";
import Scissors from "./classes/scissors.js";
import { frameRate, quantity, timeoutInterval } from "./config.js";

let animationInterval = undefined;

start_simulation();
animationInterval = setInterval(track_simulation, 1000 / frameRate);

function start_simulation() {
  for (let i = 0; i < quantity; i++) {
    const rock = new Rock();
    const paper = new Paper();
    const scissors = new Scissors();
    rock.append();
    scissors.append();
    paper.append();
  }
}

function end_simulation() {
  const elements = document.getElementsByClassName("element");
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    document.getElementById("root").removeChild(element);
  }
}

function track_simulation() {
  const elements = document.getElementsByClassName("element");
  const elementName = elements[0].className.replace("element", "").trim();

  let isGameConcluded = true;
  for (let i = 1; i < elements.length && isGameConcluded; i++)
    isGameConcluded = elements[i].classList.contains(elementName);

  if (isGameConcluded) {
    clearInterval(animationInterval);

    document.getElementById("header").innerText = elementName + " Won!";
    setTimeout(() => {
      document.getElementById("header").innerText = "";
      end_simulation();
      start_simulation();
      animationInterval = setInterval(track_simulation, 1000 / frameRate);
    }, timeoutInterval);
  }
}
