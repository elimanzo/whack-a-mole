export default function make2DArray(r, c, value) {
  return Array(r)
    .fill(null)
    .map(() => Array(c).fill(value));
}
