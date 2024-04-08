import { ElementStates } from "../../types/element-states";

export function randomArr(maxLen:number,minLen:number, isMaxMin:boolean):number[] {
  // let maxLen = 17;
  // let minLen = 3
  const lengthArr =isMaxMin? Math.floor(Math.random() * (maxLen - minLen + 1) + minLen):maxLen;
let min = 0;
let max = 100;
  let randomArray = [];
  for (let i = 0; i < lengthArr; i++) {
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    randomArray.push(randomNumber);
  }
  return randomArray;
}
export const getRandomInt = (minLen: number, maxLen: number): number => {
  return Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
};
export const getRandomArray = (maxLength: number, maxNumber: number): string[] => {
  return Array.from({length: maxLength},
      () => (getRandomInt(0, maxNumber).toString()));
}