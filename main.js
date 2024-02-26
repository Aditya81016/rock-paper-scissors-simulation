import Paper from "./classes/paper.js";
import Rock from "./classes/rock.js";
import Scissors from "./classes/scissors.js";

console.log("main.js");

for (let i = 0; i < 30; i++) {
  const rock = new Rock();
  const paper = new Paper();
  const scissors = new Scissors();
  rock.append();
  scissors.append();
  paper.append();
}
