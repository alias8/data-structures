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

  private compare(parent: number, child: number) {
    return this.minHeap ? parent < child : parent > child;
  }

  public get() {
    return this.heap;
  }

  public getParentValueOfIndex(indexOfChild?: number) {
    // indexOfChild && this.checkValues(indexOfChild);
    let index = indexOfChild ? indexOfChild : this.heap.length;
    return this.heap[this.getParentIndex(index)];
  }

  private getParentIndex(indexOfChild?: number) {
    // indexOfChild && this.checkValues(indexOfChild);
    let index = indexOfChild ? indexOfChild : this.heap.length;
    return (index - (index % 2 === 0 ? 2 : 1)) / 2;
  }

  private checkValues(index: number) {
    if (index === 0) {
      throw new Error("No parent");
    }
    if (index < 0) {
      throw new Error("index must be positive");
    }
    if (index > this.heap.length - 1) {
      throw new Error("index out of range");
    }
  }

  private canAdd(element: number) {
    return this.compare(this.getParentValueOfIndex(), element);
  }

  private isViolatedAtIndex(index: number, checkParent: boolean) {
    if (checkParent) {
      // for bubbling up, or when we add stuff
      return !this.compare(this.getParentValueOfIndex(index), this.heap[index]);
    } else {
      // for bubbling down, or when we take out stuff
      const leftChild = this.getLeftChildValue(index);
      const rightChild = this.getRightChildValue(index);
      if (
        !!leftChild &&
        this.compare(this.heap[index], leftChild) &&
        !!rightChild &&
        this.compare(this.heap[index], rightChild)
      ) {
        return false;
      } else {
        return true;
      }
    }
  }

  private swapChildAtIndexWithItsParent(childIndex: number) {
    const parentValue = this.getParentValueOfIndex(childIndex);
    const parentIndex = this.getParentIndex(childIndex);
    this.heap[parentIndex] = this.heap[childIndex];
    this.heap[childIndex] = parentValue;
  }

  private compareSiblings(left: number, right: number) {
    return this.minHeap ? left <= right : left >= right;
  }

  private swapParentAtIndexWithItsChild(parentIndex: number) {
    const swapParentWithChild = (parentIndex: number, childIndex: number) => {
      const temp = this.heap[parentIndex];
      this.heap[parentIndex] = this.heap[childIndex];
      this.heap[childIndex] = temp;
    };

    const leftChildIndex = this.getLeftChildIndex(parentIndex);
    const rightChildIndex = this.getRightChildIndex(parentIndex);
    if (leftChildIndex) {
      const leftChild = this.getLeftChildValue(parentIndex);
      if (rightChildIndex) {
        const rightChild = this.getRightChildValue(parentIndex);
        if (this.compareSiblings(leftChild!, rightChild!)) {
          // if left less than right, swap parent with left
          swapParentWithChild(parentIndex, leftChildIndex);
          return leftChildIndex;
        } else {
          // if right less than left, swap parent with right
          swapParentWithChild(parentIndex, rightChildIndex);
          return rightChildIndex;
        }
      } else {
        // swap parent with left if only left child avail
        swapParentWithChild(parentIndex, leftChildIndex);
        return leftChildIndex;
      }
    } else {
      throw new Error("cannot do swap, no valid children");
    }
  }

  public bubble(element: number) {
    this.heap.push(element);
    let targetNodeIndex = this.heap.length - 1;
    while (this.isViolatedAtIndex(targetNodeIndex, true)) {
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

  public poll() {
    // swap 1st index with last
    const temp = this.heap[0];
    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap[this.heap.length - 1] = temp;
    this.heap.pop();
    let targetNodeIndex = 0;
    while (this.isViolatedAtIndex(targetNodeIndex, false)) {
      targetNodeIndex = this.swapParentAtIndexWithItsChild(targetNodeIndex);
      if (targetNodeIndex === this.heap.length - 1) {
        // bubbled to bottom of tree, nothing more to do
        break;
      }
    }
    return this.heap;
  }

  private getLeftChildIndex(parentIndex: number) {
    const index = 2 * parentIndex + 1;
    if (this.heap.length >= index) {
      return index;
    }
    return null;
  }

  private getRightChildIndex(parentIndex: number) {
    const index = 2 * parentIndex + 2;
    if (this.heap.length >= index) {
      return index;
    }
    return null;
  }

  private getLeftChildValue(parentIndex: number) {
    const index = this.getLeftChildIndex(parentIndex);
    if (index) {
      return this.heap[index];
    }
    return null;
  }

  private getRightChildValue(parentIndex: number) {
    const index = this.getRightChildIndex(parentIndex);
    if (index) {
      return this.heap[index];
    }
    return null;
  }
}

const binaryHeap = new BinaryHeap([
  1,
  5,
  1,
  8,
  6,
  2,
  2,
  13,
  12,
  11,
  7,
  2,
  15,
  3,
  10
]);
binaryHeap.poll();
const a = 2;
