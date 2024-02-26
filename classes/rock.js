import Element from "./element.js";

export default class Rock extends Element {
  name = "rock";
  target = "scissors";
  danger = "paper";

  constructor() {
    super();
  }
}
