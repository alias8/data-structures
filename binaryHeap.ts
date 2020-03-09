interface ITree {
  [value: number]: Set<number>;
}

// Min heap
export class BinaryHeap {
  private heap: number[];
  private minHeap: boolean;
  private tree: ITree;

  constructor(values: number[] = [], min = true) {
    this.minHeap = min;
    this.heap = [];
    this.tree = {};
    values.forEach(value => {
      this.add(value);
    });
  }

  /*
   * Public add functions
   * */
  public poll() {
    // swap 1st index with last, then pop it
    this.swapNodes(0, this.heap.length - 1);
    const popped = this.pop();
    this.bubbleDown();
    return popped;
  }

  public add(element: number) {
    this.push(element);
    if (!this.compareParentToChild(this.getParentValueOfIndex(), element)) {
      this.bubbleUp();
    }
  }

  public remove(valueToRemove: number) {
    const index = this.heap.findIndex(value => value === valueToRemove);
    if (index !== -1) {
      this.swapNodes(index, this.heap.length - 1);
      this.pop();
      if (this.isViolatedAtIndex(index, "parent")) {
        this.bubbleUp(index);
      } else if (this.isViolatedAtIndex(index, "children")) {
        this.bubbleDown(index);
      }
      return true;
    }
    return null;
  }

  public get() {
    return this.heap;
  }

  /*
   * Util functions
   * */
  private compareParentToChild(parent: number, child: number) {
    return this.minHeap ? parent < child : parent > child;
  }

  private compareSiblings(left: number, right: number) {
    return this.minHeap ? left <= right : left >= right;
  }

  private checkValues(index: number) {
    if (index === 0) {
      throw new Error("No parent");
    }
    if (index < 0) {
      throw new Error("index must be positive");
    }
  }

  private isViolatedAtIndex(
    index: number,
    check: "parent" | "children"
  ): boolean {
    if (check === "parent") {
      // for bubbling up, or when we add stuff
      return !this.compareParentToChild(
        this.getParentValueOfIndex(index),
        this.heap[index]
      );
    }
    // for bubbling down, or when we take out stuff
    const leftChild = this.getLeftChildValue(index);
    const rightChild = this.getRightChildValue(index);
    if (leftChild) {
      if (this.compareParentToChild(this.heap[index], leftChild)) {
        if (rightChild) {
          return !this.compareParentToChild(this.heap[index], rightChild);
        }
        return false;
      }
      return true;
    }
    return false;
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

  /*
   * Moving procedures
   * */
  private bubbleUp(targetNodeIndex: number = this.heap.length - 1) {
    while (this.isViolatedAtIndex(targetNodeIndex, "parent")) {
      this.swapNodes(targetNodeIndex, this.getParentIndex(targetNodeIndex));
      targetNodeIndex = this.getParentIndex(targetNodeIndex);
      if (targetNodeIndex === 0) {
        // bubbled to top of tree, nothing more to do
        break;
      }
    }
    return this.heap;
  }

  private bubbleDown(beginningTargetNodeIndex: number = 0) {
    let targetNodeIndex: number | null = beginningTargetNodeIndex;
    while (this.isViolatedAtIndex(targetNodeIndex!, "children")) {
      targetNodeIndex = this.getChildIndexToSwap(targetNodeIndex!);
      if (targetNodeIndex !== null) {
        this.swapNodes(targetNodeIndex, this.getParentIndex(targetNodeIndex));
      } else {
        break;
      }
    }
  }

  /*
   * Modifying heap
   * */
  private push(element: number) {
    this.heap.push(element);
    this.addToTree(element, this.heap.length - 1);
  }

  private pop() {
    const popped = this.heap.pop();
    this.subtractFromTree(popped!, this.heap.length);
    return popped;
  }

  private swapNodes(indexA: number, indexB: number) {
    const valueA = this.heap[indexA];
    const valueB = this.heap[indexB];
    this.heap[indexA] = valueB;
    this.heap[indexB] = valueA;
    this.addToTree(valueA, indexB);
    this.addToTree(valueB, indexA);
    this.subtractFromTree(valueA, indexA);
    this.subtractFromTree(valueB, indexB);
  }

  /*
   * Lookup tree functions
   * */
  private addToTree(value: number, index: number) {
    if (this.tree[value]) {
      this.tree[value] = this.tree[value].add(index);
    } else {
      this.tree[value] = new Set([index]);
    }
  }

  private subtractFromTree(value: number, index: number) {
    if (this.tree[value]) {
      this.tree[value].delete(index);
    }
  }

  /*
   * Get child/parent nodes and indexes
   * */
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

  public getParentValueOfIndex(indexOfChild?: number) {
    return this.heap[this.getParentIndex(indexOfChild)];
  }

  private getParentIndex(indexOfChild?: number) {
    indexOfChild && this.checkValues(indexOfChild);
    let index = indexOfChild ? indexOfChild : this.heap.length;
    return (index - (index % 2 === 0 ? 2 : 1)) / 2;
  }
}

const binaryHeap = new BinaryHeap([1, 3, 2, 5, 6, 2, 2, 13, 8, 11, 7, 10, 15]);
binaryHeap.remove(3);
