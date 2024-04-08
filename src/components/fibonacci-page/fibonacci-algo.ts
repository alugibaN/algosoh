// export function fibonacci(index: number): number[] {
//   const fib: number[] = [1, 1];
  
//   for (let i = 2; i <= index; i++) {
//   fib.push(fib[i - 1] + fib[i - 2]);
//   }
//   return fib.slice(0, index + 1);
//   }

// export function fibonacci(index:number) {
//   let tt
//   let a = 1, b = 0, temp;
  
//   while (index > 0) {
//   temp = a;
//   a = a + b;
//   b = temp;
//   index--;
//   }
  
//   return b;
//   }
export function fibonacci(index: number): number[][] {
  const fib: number[] = [1, 1];
  const intermediateArrays: number[][] = [[1], [1, 1]];

  for (let i = 2; i <= index; i++) {
    fib.push(fib[i - 1] + fib[i - 2]);
    const newFibArray = [...intermediateArrays[i - 1], fib[i]];
    intermediateArrays.push(newFibArray);
  }

  return intermediateArrays;
}

