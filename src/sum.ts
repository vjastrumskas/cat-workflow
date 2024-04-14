export default function suma(...numbers: number[]) {
  return numbers.reduce((total, number) => total + number, 0);
}
