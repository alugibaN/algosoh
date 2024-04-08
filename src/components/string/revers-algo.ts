export default function reverseString(str: string): string[][] {
  const words = str.split("");
  let steps: string[][] = [[...words]];

  if (str.length <= 1) {
    return steps;
  }

  for (let left = 0; left < Math.floor(words.length / 2); left++) {
    const right = str.length - 1 - left;
    const temp = words[left];
    words[left] = words[right];
    words[right] = temp;
    steps.push([... words]);
  }

  return steps;
}
