export type algo = {
  steps: number[][];
  indexA: number[];
  indexB: number[];
  sortedElements: number[];
};

export function bubbleSort(arr: number[], isSort: boolean) {
  const n = arr.length;
  const obj: algo = {
    steps: [],
    indexA: [],
    indexB: [],
    sortedElements: [],
  };
  const shouldSwap = (a: number, b: number) => (isSort ? a > b : a < b);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      obj.indexA.push(arr[j]);
      obj.indexB.push(arr[j + 1]);
      obj.steps.push([...arr]);
      if (shouldSwap(arr[j], arr[j + 1])) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }

      if (shouldSwap(arr[j], arr[j + 1])) {
        let temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
    obj.sortedElements.push(arr[n - i - 1]);
  }
  return obj;
}

