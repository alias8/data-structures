import { Entry, standardValues } from "./hashTable";

class Node_<Element> {
  // constructor
  public element: Element;
  public next: null | Node_<Element>;
  constructor(element: Element) {
    this.element = element;
    this.next = null;
  }
}

export class LinkedList<Element extends Entry<any> = Entry<standardValues>> {
  private head: null | Node_<Element>;
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

  insertAt(data: Element, index: number) {
    // if the list is empty i.e. head = null
    if (!this.head) {
      this.head = new Node_(data);
      return;
    }
    // if new node needs to be inserted at the front of the list i.e. before the head.
    if (index === 0) {
      this.head = new Node_(data);
      return;
    }
    // else, use getAt() to find the previous node.
    const previous = this.getAt(index - 1);
    let newNode = new Node_(data);
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

  insertAtEnd(data: Element) {
    // A newNode object is created with property data and next=null

    let newNode = new Node_(data);
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

  insertAtBeginning(data: Element) {
    // A newNode object is created with property data and next = null
    let newNode = new Node_(data);
    // The pointer next is assigned head pointer so that both pointers now point at the same node.
    newNode.next = this.head;
    // As we are inserting at the beginning the head pointer needs to now point at the newNode.

    this.head = newNode;
    return this.head;
  }

  add(element: Element) {
    // creates a new node
    const node = new Node_(element);

    // to store current node
    var current: Node_<Element>;

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

  getSize() {
    return this.size;
  }

  deleteList() {
    this.head = null;
  }

  find(key: standardValues) {
    let node = this.head;
    while (node) {
      if (node.element.getKey() === key) {
        return node;
      }
      node = node.next;
    }
    return undefined;
  }
}
