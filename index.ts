// export interface INode {
//   id: number;
//   previous?: number;
//   next?: number;
// }
//
// export interface IList {
//   headID: number;
//   tailID: number;
//   nodes: INode[];
// }
//
// export class DoublyLinkedList {
//   private list: IList;
//   constructor(list: number[]) {
//     this.list = {
//       headID: list[0],
//       tailID: list[list.length - 1],
//       nodes: []
//     };
//     list.forEach((id, index, array) => {
//       let node: INode = {
//         id,
//         previous: undefined,
//         next: undefined
//       };
//       if (index === 0) {
//         node = {
//           ...node,
//           next: array[index + 1]
//         };
//       } else if (index === array.length - 1) {
//         node = {
//           ...node,
//           previous: array[index - 1]
//         };
//       } else {
//         node = {
//           ...node,
//           previous: array[index - 1],
//           next: array[index + 1]
//         };
//       }
//       this.list.nodes.push(node);
//     });
//   }
//
//   private checkValues(position: number) {
//     const numberOfNodes = this.list.nodes.length;
//     if (position > numberOfNodes) {
//       throw new Error(`There is no element at index ${position}`);
//     }
//     if (position < 0 || Math.floor(position) !== position) {
//       throw new Error(`Position must be a positive integer`);
//     }
//   }
//
//   private getNodeWithID(id: number): INode | undefined {
//     return this.list.nodes.find(node => node.id === id);
//   }
//
//   public getNodeAtPosition(position: number) {
//     this.checkValues(position);
//     const numberOfNodes = this.list.nodes.length;
//     if (position === 0) {
//       return this.getNodeWithID(this.list.headID);
//     } else if (position === numberOfNodes) {
//       return this.getNodeWithID(this.list.tailID);
//     } else {
//       let count = 0;
//       let currentNode = this.getNodeWithID(this.list.headID);
//       let nextNode = this.getNodeWithID(currentNode?.next!);
//       while (count !== position) {
//         currentNode = nextNode;
//         nextNode = this.getNodeWithID(currentNode?.next!);
//         count++;
//       }
//       return currentNode;
//     }
//   }
//
//   private insertNode(node: INode) {
//     this.list.nodes.push(node);
//   }
//
//   private modifyNode(id: number, node: Omit<INode, "id">) {
//     const index = this.list.nodes.findIndex(node => node.id === id);
//     this.list.nodes[index] = {
//       ...this.list.nodes[index],
//       ...node
//     };
//   }
//
//   public insertAt(position: number, value: number) {
//     this.checkValues(position);
//     const numberOfNodes = this.list.nodes.length;
//     if (position === 0) {
//       // insert at start
//       this.insertNode({
//         id: value,
//         previous: undefined,
//         next: this.list.headID
//       });
//       this.modifyNode(this.list.headID, { previous: value });
//       this.list.headID = value;
//     } else if (position === numberOfNodes) {
//       // append to end
//       this.insertNode({
//         id: value,
//         previous: this.list.tailID,
//         next: undefined
//       });
//       this.modifyNode(this.list.tailID, { next: value });
//       this.list.tailID = value;
//     } else {
//       const nodeAtPosition = this.getNodeAtPosition(position);
//       this.insertNode({
//         id: value,
//         previous: nodeAtPosition?.previous,
//         next: nodeAtPosition?.id
//       });
//       this.modifyNode(nodeAtPosition?.id!, { previous: value });
//       this.modifyNode(nodeAtPosition?.previous!, { next: value });
//     }
//   }
//
//   public removeNodeWithID(id: number) {
//     this.list.nodes = this.list.nodes.filter(node => node.id !== id);
//   }
//
//   public deleteAt(position: number) {
//     this.checkValues(position);
//     const numberOfNodes = this.list.nodes.length;
//     if (position === 0) {
//       // at start
//       const oldHeadNode = this.getNodeWithID(this.list.headID);
//       const newHeadNode = this.getNodeWithID(oldHeadNode?.next!);
//       this.modifyNode(newHeadNode?.id!, { previous: undefined });
//       this.list.headID = newHeadNode?.id!;
//       this.removeNodeWithID(oldHeadNode?.id!);
//     } else if (position === numberOfNodes - 1) {
//       // at end
//       const oldTailNode = this.getNodeWithID(this.list.tailID);
//       const newTailNode = this.getNodeWithID(oldTailNode?.previous!);
//       this.modifyNode(newTailNode?.id!, { next: undefined });
//       this.list.tailID = newTailNode?.id!;
//       this.removeNodeWithID(oldTailNode?.id!);
//     } else {
//       // in middle
//       const nodeToBeRemoved = this.getNodeAtPosition(position);
//       const before = this.getNodeWithID(nodeToBeRemoved?.previous!);
//       const after = this.getNodeWithID(nodeToBeRemoved?.next!);
//       this.modifyNode(before?.id!, { next: after?.id });
//       this.modifyNode(after?.id!, { previous: before?.id });
//       this.removeNodeWithID(nodeToBeRemoved?.id!);
//     }
//   }
//
//   public getList() {
//     return this.list; ///
//   }
//
//   public print() {
//     console.log(this.list);
//   }
//
//   public reverse() {
//     for (let i = 0; i < this.list.nodes.length; i++) {
//       const newPrevious = this.list.nodes[i].next;
//       const newNext = this.list.nodes[i].previous;
//       this.list.nodes[i].previous = newPrevious;
//       this.list.nodes[i].next = newNext;
//     }
//     const temp = this.list.headID;
//     this.list.headID = this.list.tailID;
//     this.list.tailID = temp;
//   }
// }
//
// const list = new DoublyLinkedList([5, 23, 7, 13]);
//
// list.insertAt(4, 18);
// const b = 4;

interface IElement {
  id: string;
}

class Node1 {
  // constructor
  public element: IElement;
  public next: null | Node1;
  constructor(element: IElement) {
    this.element = element;
    this.next = null;
  }
}

class LinkedList {
  private head: null | Node1;
  private size: number;
  constructor() {
    this.head = null;
    this.size = 0;
  }

  deleteAt(index: number) {
    // when list is empty i.e. head = null
    if (!this.head) {
      return;
    }
    // node needs to be deleted from the front of the list i.e. before the head.
    if (index === 0) {
      this.head = this.head.next;
      return;
    }
    // else, use getAt() to find the previous node.
    const previous = this.getAt(index - 1);

    if (!previous || !previous.next) {
      return;
    }

    previous.next = previous.next.next;
    return this.head;
  }

  deleteLastNode() {
    if (!this.head) {
      return;
    }
    // if only one node in the list
    if (!this.head.next) {
      this.head = null;
      return;
    }
    let previous = this.head;
    let tail = this.head.next;

    while (tail.next !== null) {
      previous = tail;
      tail = tail.next;
    }

    previous.next = null;
    return this.head;
  }

  deleteFirstNode() {
    if (!this.head) {
      return;
    }
    this.head = this.head.next;
    return this.head;
  }

  insertAt(data: IElement, index: number) {
    // if the list is empty i.e. head = null
    if (!this.head) {
      this.head = new Node1(data);
      return;
    }
    // if new node needs to be inserted at the front of the list i.e. before the head.
    if (index === 0) {
      this.head = new Node1(data);
      return;
    }
    // else, use getAt() to find the previous node.
    const previous = this.getAt(index - 1);
    let newNode = new Node1(data);
    newNode.next = previous!.next;
    previous!.next = newNode;

    return this.head;
  }

  getAt(index: number) {
    let counter = 0;
    let node = this.head;
    while (node) {
      if (counter === index) {
        return node;
      }
      counter++;
      node = node.next;
    }
    return null;
  }

  insertAtEnd(data: IElement) {
    // A newNode object is created with property data and next=null

    let newNode = new Node1(data);
    // When head = null i.e. the list is empty, then head itself will point to the newNode.
    if (!this.head) {
      this.head = newNode;
      return this.head;
    }
    // Else, traverse the list to find the tail (the tail node will initially be pointing at null), and update the tail's next pointer.
    let tail = this.head;
    while (tail.next !== null) {
      tail = tail.next;
    }
    tail.next = newNode;
    return this.head;
  }

  insertAtBeginning(data: IElement) {
    // A newNode object is created with property data and next = null
    let newNode = new Node1(data);
    // The pointer next is assigned head pointer so that both pointers now point at the same node.
    newNode.next = this.head;
    // As we are inserting at the beginning the head pointer needs to now point at the newNode.

    this.head = newNode;
    return this.head;
  }

  add(element: IElement) {
    // creates a new node
    const node = new Node1(element);

    // to store current node
    var current: Node1;

    // if list is Empty add the
    // element and make it head
    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;

      // iterate to the end of the
      // list
      while (current!.next) {
        current = current!.next;
      }

      // add node
      current!.next = node;
    }
    this.size++;
  }

  deleteList() {
    this.head = null;
  }
}

const list = new LinkedList();
list.add({ id: "0" });
list.add({ id: "1" });
list.add({ id: "2" });
const a = 33;
