import { frameRate, size } from "../config.js";
import calcDistance from "../utils/calcDistance.js";
import calcAngle from "../utils/clacAngle.js";
import findClosest from "../utils/findClosest.js";
import positionOf from "../utils/positionOf.js";
import range from "../utils/range.js";

export default class Element {
  static counter = 0;
  name;
  target;
  danger;
  speed = 300;
  size = size;

  id;
  element = document.createElement("div");

  constructor() {
    this.id = `element-${Element.counter}`;
    Element.counter++;
  }

  generateElement() {
    this.element.className = this.name + " element";
    this.element.id = this.id;
    this.element.innerHTML = `
      <img src="/assets/${this.name}.svg" width=${this.size} height=${this.size} />
    `;
    // <div class="label">${this.id}</div>
    // <div class="label">${this.name} | ${this.target} | ${this.danger}</div>
    // <div class="label">${JSON.stringify(positionOf(this.element))}</div>
  }

  append() {
    this.generateElement();
    document.getElementById("root").appendChild(this.element);

    this.element.style.transition = `all ${1000 / frameRate}ms linear`;

    const initialPosition = [
      Math.random() * window.innerWidth,
      Math.random() * window.innerHeight,
    ];

    this.setPosition(initialPosition);

    this.render();
    setInterval(() => this.render(), 1000 / frameRate);
    // requestAnimationFrame(this.render);
  }

  render() {
    this.move();
    this.handleCollision();
    // this.generateElement();
  }

  move() {
    const targetElements = document.getElementsByClassName(this.target);
    const dangerElements = document.getElementsByClassName(this.danger);

    if (!targetElements.length && !dangerElements.length) return;

    const selfPosition = positionOf(this.element);

    const closestTarget = findClosest(targetElements, selfPosition);
    const closestDanger = findClosest(dangerElements, selfPosition);

    // here onward target and danger are the closets target and closest danger
    let targetPosition = undefined,
      dangerPosition = undefined,
      targetDistance = undefined,
      dangerDistance = undefined;

    if (closestTarget) targetPosition = positionOf(closestTarget);
    if (closestDanger) dangerPosition = positionOf(closestDanger);

    if (targetPosition)
      targetDistance = calcDistance(selfPosition, targetPosition);
    if (dangerPosition)
      dangerDistance = calcDistance(selfPosition, dangerPosition);

    const angleToTarget = targetPosition
      ? calcAngle(selfPosition, targetPosition)
      : 0;
    const angleToDanger = dangerPosition
      ? calcAngle(dangerPosition, selfPosition)
      : 0;

    let angleToMove = angleToTarget;

    if (targetDistance === undefined) angleToMove = -angleToDanger;
    else if (dangerDistance < targetDistance)
      angleToMove = (angleToTarget - angleToDanger) / 2;
    else if (
      targetDistance &&
      dangerDistance &&
      Math.abs(targetDistance - dangerDistance) < this.size * 2
    )
      angleToMove = -angleToDanger;

    console.log(targetDistance < dangerDistance, (angleToMove * 180) / Math.PI);

    // this.element.style.rotate = angleToTarget + "rad";

    const step = this.speed / frameRate;
    const stepX = closestTarget
      ? selfPosition[0] + Math.cos(angleToMove) * step
      : selfPosition[0];
    const stepY = selfPosition[1] + Math.sin(angleToMove) * step;

    const newPosition = [stepX, stepY];

    this.setPosition(newPosition);
  }

  handleCollision() {
    const dangers = document.getElementsByClassName(this.danger);
    const selfPosition = positionOf(this.element);

    for (let i = 0; i < dangers.length; i++) {
      const danger = dangers[i];
      const dangerPosition = positionOf(danger);

      const distance = calcDistance(dangerPosition, selfPosition);
      // console.log(distance);

      if (distance <= this.size) {
        if (this.element)
          document.getElementById("root").removeChild(this.element);
      }
    }
  }

  setPosition(position) {
    this.element.style.left = `${range(
      position[0],
      0,
      window.innerWidth - this.size
    )}px`;
    this.element.style.top = `${range(
      position[1],
      0,
      window.innerHeight - this.size
    )}px`;
  }
}
