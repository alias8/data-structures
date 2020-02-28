export interface IList {
  headID: number;
  tailID: number;
  [id: number]: {
    id: number;
    previous: number | null;
    next: number | null;
  };
}

export class DoublyLinkedList {
  private list: IList;
  private increment: number = 0;
  constructor(list: number[]) {
    this.list = {
      headID: list[0],
      tailID: list[list.length - 1]
    };
    list.forEach((id, index, array) => {
      this.list[id] = {
        previous: null,
        next: null
      };
      if (index === 0) {
        this.list[id] = {
          ...this.list[id],
          next: array[index + 1]
        };
      } else if (index === array.length - 1) {
        this.list[id] = {
          ...this.list[id],
          previous: array[index - 1]
        };
      } else {
        this.list[id] = {
          ...this.list[id],
          previous: array[index - 1],
          next: array[index + 1]
        };
      }
    });
  }

  private checkValues(position: number) {
    const numberOfNodes = Object.keys(this.list).length - 2;
    if (position > numberOfNodes) {
      throw new Error(`There is no element at index ${position}`);
    }
    if (position < 0 || Math.floor(position) !== position) {
      throw new Error(`Position must be a positive integer`);
    }
  }

  public insertAt(position: number, value: number) {
    this.checkValues(position);
    const numberOfNodes = Object.keys(this.list).length - 2;
    let count = 0;
    let currentNode = this.list[this.list.headID];
    let nextNode = this.list[currentNode.next!];
    let idOfCurrentNode = this.list.headID;
    let idOfNextNode = currentNode.next;
    if (position === 0) {
      // insert at start
      this.list[value] = {
        previous: null,
        next: idOfCurrentNode
      };
      this.list[idOfCurrentNode] = {
        ...this.list[idOfCurrentNode],
        previous: value
      };
      this.list.headID = value;
    } else if (position === numberOfNodes) {
      // append to end
      this.list[this.list.tailID].next = value;
      this.list[value] = {
        previous: this.list.tailID,
        next: null
      };
      this.list.tailID = value;
    } else {
      while (count < position - 1) {
        currentNode = nextNode;
        nextNode = this.list[currentNode.next!];
        idOfCurrentNode = nextNode.previous!;
        idOfNextNode = currentNode.next;
        count++;
      }
      this.list[value] = {
        previous: nextNode.previous,
        next: currentNode.next
      };
      // change current node
      this.list[idOfCurrentNode].next = value;
      // change next node
      this.list[idOfNextNode!].previous = value;
    }
  }

  public deleteAt(position: number) {
    this.checkValues(position);
    const numberOfNodes = Object.keys(this.list).length - 2;
    if (position === 0) {
      // at start
      const oldHeadNode = this.list[this.list.headID];
      const oldHeadNodeID = this.list.headID;
      const newHeadID = oldHeadNode.next;
      this.list[newHeadID!].previous = null;
      this.list.headID = newHeadID!;
      delete this.list[oldHeadNodeID];
    } else if (position === numberOfNodes - 1) {
      // at end
      const oldTailNode = this.list[this.list.tailID];
      const oldTailNodeID = this.list.tailID;
      const newTailID = oldTailNode.previous;
      this.list[newTailID!].next = null;
      this.list.tailID = newTailID!;
      delete this.list[oldTailNodeID];
    } else {
      let count = 0;
      let currentNode = this.list[this.list.headID];
      let nextNode = this.list[currentNode.next!];
      let idOfCurrentNode = this.list.headID;
      let idOfNextNode = currentNode.next;
      while (count < position - 1) {
        currentNode = nextNode;
        nextNode = this.list[currentNode.next!];
        idOfCurrentNode = nextNode.previous!;
        idOfNextNode = currentNode.next;
        count++;
      }
      const nodeToBeDeleted = currentNode;
      this.list[nodeToBeDeleted.previous!].next = nodeToBeDeleted.next;
      this.list[nodeToBeDeleted.next!].previous = nodeToBeDeleted.previous;
      delete this.list[nextNode.previous!];
    }
  }

  public getList() {
    return this.list; ///
  }

  public print() {
    console.log(this.list);
  }
}

const list = new DoublyLinkedList([5, 23, 7, 13]);

list.deleteAt(2);
