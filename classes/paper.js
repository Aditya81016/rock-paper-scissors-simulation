import Element from "./element.js";

export default class Paper extends Element {
  name = "paper";
  target = "rock";
  danger = "scissors";

  constructor() {
    super();
  }
}
