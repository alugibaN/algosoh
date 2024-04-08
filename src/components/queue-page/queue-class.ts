interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: (type: T) => void;
  clear: () => void;
  peak?: () => T | null;
  getSize?: () => number;
}

export class QueueAlgo<T> implements IQueue<T> {
  container: (T | null)[] = Array(7).fill("");
  frontIndex = 0;
  backIndex = 0;

  enqueue = (item: T): void => {
    if (this.backIndex === this.container.length) {
      return;
    }
    this.container[this.backIndex % this.container.length] = item;
    this.backIndex++;
    console.log(this.backIndex);
  };
  dequeue = (type: T): void => {
    const item = this.container[this.frontIndex];
    this.container[this.frontIndex] = type;
    if (this.frontIndex !== this.backIndex - 1) {
      this.frontIndex++;
    }
  };

  getSize = (): number => {
    return this.backIndex - this.frontIndex;
  };

  clear = (): void => {
    this.backIndex = 0;
    this.frontIndex = 0;
    this.container = Array(7).fill("");
  };
}
