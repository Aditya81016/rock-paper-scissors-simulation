import calcDistance from "./calcDistance.js";

export default function findClosest(elements, selfPosition) {
  let closestElement,
    closestElementDistance = undefined;

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    const targetPosition = [element.left, element.top];

    const distance = calcDistance(selfPosition, targetPosition);

    if (!closestElementDistance || distance < closestElementDistance) {
      closestElement = element;
      closestElementDistance = distance;
    }
  }

  return closestElement;
}
