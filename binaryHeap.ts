// Min heap
export class BinaryHeap {
  private heap: number[];
  private minHeap: boolean;
  constructor(values: number[] = [], min = true) {
    this.minHeap = min;
    this.heap = [];
    values.forEach(value => {
      this.add(value);
    });
  }

  public compare(a: number, b: number) {
    return this.minHeap ? a <= b : a >= b;
  }

  public get() {
    return this.heap;
  }

  public getParentAtIndex(index?: number) {
    if (index && index >= 0) {
      if (index % 2 === 0) {
        const parentIndex = (index - 2) / 2;
        return this.heap[parentIndex];
      } else {
        const parentIndex = (index - 1) / 2;
        return this.heap[parentIndex];
      }
    } else {
      // default to get parent of next child
      if (this.heap.length % 2 === 0) {
        const index = (this.heap.length - 2) / 2;
        return this.heap[index];
      } else {
        const index = (this.heap.length - 1) / 2;
        return this.heap[index];
      }
    }
  }

  private getParentIndex() {
    if (this.heap.length % 2 === 0) {
      return (this.heap.length - 2) / 2;
    } else {
      return (this.heap.length - 1) / 2;
    }
  }

  private canAdd(element: number) {
    return this.compare(this.getParentAtIndex(), element);
  }

  private isViolatedAtIndex(index: number) {
    if (index <= this.heap.length - 1) {
      if (this.compare(this.heap[index], this.getParentAtIndex(index))) {
        return false;
      } else {
      }
    } else {
      throw new Error(`index ${index} out of range`);
    }
  }

  public bubble(element: number) {
    const tempHeap = [...this.heap];
    tempHeap.push(element);
    if (this.isViolatedAtIndex()) const parent = this.getParentAtIndex();
    const parentIndex = this.getParentIndex();
    this.heap[parentIndex] = element;
  }

  public add(element: number) {
    if (this.heap.length === 0) {
      this.heap.push(element);
    } else if (this.canAdd(element)) {
      this.heap.push(element);
    } else {
      this.bubble(element);
    }
  }

  public getLeftChild(parentIndex: number) {
    const index = 2 * parentIndex + 1;
    if (this.heap.length >= index) {
      return this.heap[index];
    }
    return null;
  }

  public getRightChild(parentIndex: number) {
    const index = 2 * parentIndex + 2;
    if (this.heap.length >= index) {
      return this.heap[index];
    }
    return null;
  }
}

const binaryHeap = new BinaryHeap([], false);
binaryHeap.add(9);
const a = 2;
