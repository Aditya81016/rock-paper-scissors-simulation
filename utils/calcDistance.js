export default function calcDistance(p1, p2) {
  const height = p2[1] - p1[1];
  const base = p2[0] - p1[0];

  const distance = Math.sqrt(Math.pow(height, 2) + Math.pow(base, 2));

  return distance;
}
