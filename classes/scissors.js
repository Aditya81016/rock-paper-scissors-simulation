import Element from "./element.js";

export default class Scissors extends Element {
  name = "scissors";
  target = "paper";
  danger = "rock";

  constructor() {
    super();
  }
}
