export default function calcAngle(p1, p2) {
  const height = p1[1] - p2[1];
  const base = p1[0] - p2[0];

  const slope = height / base;

  let angle = Math.atan(slope);
  if (base > 0) angle += Math.PI;
  return angle;
}
