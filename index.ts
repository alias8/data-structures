export interface IList {
  head: number;
  tail: number;
  [id: number]: {
    previous: number | null;
    next: number | null;
  };
}

export class DoublyLinkedList {
  private list: IList;
  constructor(list: number[]) {
    this.list = {
      head: list[0],
      tail: list[list.length - 1]
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

  public insertAt(position: number, value: number) {
    const numberOfNodes = Object.keys(this.list).length - 2;
    if (position > numberOfNodes) {
      throw new Error(`There is no element at index ${position + 1}`);
    }
    let count = 0;
    let currentNode = this.list[this.list.head];
    let nextNode = this.list[currentNode.next!];
    let idOfCurrentNode = this.list.head;
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
      this.list.head = value;
    } else if (position === numberOfNodes) {
      this.list[this.list.tail].next = value;
      this.list[value] = {
        previous: this.list.tail,
        next: null
      };
      this.list.tail = value;
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
      // // if last in list, we need to change the tail
      // if (count === numberOfNodes) {
      //   this.list.tail = value;
      // }
    }
  }

  public getList() {
    return this.list;
  }

  public print() {
    console.log(this.list);
  }
}

const list = new DoublyLinkedList([5, 23, 7, 13]);

list.insertAt(4, 18);
