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
    return this.heap[this.getParentIndex(indexOfChild)];
  }

  private getParentIndex(indexOfChild?: number) {
    indexOfChild && this.checkValues(indexOfChild);
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
  }

  private canAdd(element: number) {
    return this.compare(this.getParentValueOfIndex(), element);
  }

  private isViolatedAtIndex(
    index: number,
    check: "parent" | "children"
  ): boolean {
    if (check === "parent") {
      // for bubbling up, or when we add stuff
      return !this.compare(this.getParentValueOfIndex(index), this.heap[index]);
    }
    // for bubbling down, or when we take out stuff
    const leftChild = this.getLeftChildValue(index);
    const rightChild = this.getRightChildValue(index);
    if (leftChild) {
      if (this.compare(this.heap[index], leftChild)) {
        if (rightChild) {
          return !this.compare(this.heap[index], rightChild);
        }
        return false;
      }
      return true;
    }
    return false;
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

  private getChildIndexToSwap(parentIndex: number): number | null {
    const leftChildIndex = this.getLeftChildIndex(parentIndex);
    const rightChildIndex = this.getRightChildIndex(parentIndex);
    if (!rightChildIndex) {
      return leftChildIndex;
    } else if (leftChildIndex) {
      if (
        this.compareSiblings(
          this.heap[leftChildIndex],
          this.heap[rightChildIndex]
        )
      ) {
        return leftChildIndex;
      } else {
        return rightChildIndex;
      }
    } else {
      return null;
    }
  }

  public bubble(element: number) {
    this.heap.push(element);
    let targetNodeIndex = this.heap.length - 1;
    while (this.isViolatedAtIndex(targetNodeIndex, "parent")) {
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
    if (this.canAdd(element)) {
      this.heap.push(element);
    } else {
      this.bubble(element);
    }
  }

  public poll() {
    // swap 1st index with last, then pop it
    const temp = this.heap[0];
    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap[this.heap.length - 1] = temp;
    const popped = this.heap.pop();
    let targetNodeIndex: number | null = 0;
    while (this.isViolatedAtIndex(targetNodeIndex!, "children")) {
      targetNodeIndex = this.getChildIndexToSwap(targetNodeIndex);
      if (targetNodeIndex !== null) {
        this.swapChildAtIndexWithItsParent(targetNodeIndex);
      } else {
        break;
      }
    }
    return popped;
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
