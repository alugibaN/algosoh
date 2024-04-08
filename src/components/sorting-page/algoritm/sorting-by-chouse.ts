import { algo } from "./sorting-bubble";

export const sortinByChouse = (arr: number[], isSort: boolean) => {
  const n = arr.length;
  const obj: algo = {
    steps: [],
    indexA: [],
    indexB: [],
    sortedElements: [],
  };

  const shouldSwap = (a: number, b: number) => (isSort ? (a > b) : (a < b));

  for (let i = 0; i < n; i++) {
    let maxMin = i;
    for (let j = i + 1; j < n; j++) {
      obj.indexA.push(arr[i]);
      obj.indexB.push(arr[j]);
      obj.steps.push([...arr]);

      if (shouldSwap(arr[maxMin], arr[j])) {
        maxMin = j;
      }

    }
    [arr[i], arr[maxMin]] = [arr[maxMin], arr[i]];
    obj.sortedElements.push(arr[i]);
    obj.sortedElements.push(arr[n - 1]); // Добавляем последний элемент в отсортированный массив

  }
  console.log(obj);

  return obj;
};

