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

  public compare(parent: number, child: number) {
    return this.minHeap ? parent <= child : parent >= child;
  }

  public get() {
    return this.heap;
  }

  public getParentAtIndex(index?: number) {
    if (index === 0) {
      throw new Error("No parent");
    }
    if (index) {
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
        const parentIndex = (this.heap.length - 2) / 2;
        return this.heap[parentIndex];
      } else {
        const parentIndex = (this.heap.length - 1) / 2;
        return this.heap[parentIndex];
      }
    }
  }

  private getParentIndex(index?: number) {
    if (index === 0) {
      throw new Error("No parent");
    }
    if (index && index > 0) {
      if (index % 2 === 0) {
        return (index - 2) / 2;
      } else {
        return (index - 1) / 2;
      }
    } else {
      // default to get parent of next child
      if (this.heap.length % 2 === 0) {
        return (this.heap.length - 2) / 2;
      } else {
        return (this.heap.length - 1) / 2;
      }
    }
  }

  private canAdd(element: number) {
    return this.compare(this.getParentAtIndex(), element);
  }

  private isViolatedAtIndex(index: number) {
    if (index === 0) {
      throw new Error("No parent");
    }
    if (index <= this.heap.length - 1) {
      return !this.compare(this.getParentAtIndex(index), this.heap[index]);
    } else {
      throw new Error(`index ${index} out of range`);
    }
  }

  public swapChildAtIndexWithItsParent(childIndex: number) {
    const parentValue = this.getParentAtIndex(childIndex);
    const parentIndex = this.getParentIndex(childIndex);
    this.heap[parentIndex] = this.heap[childIndex];
    this.heap[childIndex] = parentValue;
  }

  public bubble(element: number) {
    this.heap.push(element);
    let targetNodeIndex = this.heap.length - 1;
    while (this.isViolatedAtIndex(targetNodeIndex)) {
      this.swapChildAtIndexWithItsParent(targetNodeIndex);
      targetNodeIndex = this.getParentIndex(targetNodeIndex);
      if (targetNodeIndex === 0) {
        // bubbled to top of tree, nothing more to do
        break;
      }
    }
    return this.heap;
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

const binaryHeap = new BinaryHeap([5, 6, 12, 8, 7, 14, 19, 13, 12, 11]);
binaryHeap.add(1);
