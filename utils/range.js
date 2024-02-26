export default function range(value, min, max) {
  if (value < min) return min;
  else if (value > max) return max;
  else return value;
}
