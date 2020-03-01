import { DoublyLinkedList } from "./index";

test("It builds a doubly linked list", () => {
  const list = new DoublyLinkedList([5, 23, 7, 13]);
  expect(list.getList()).toEqual({
    headID: 5,
    tailID: 13,
    nodes: [
      { id: 5, previous: undefined, next: 23 },
      { id: 23, previous: 5, next: 7 },
      { id: 7, previous: 23, next: 13 },
      { id: 13, previous: 7, next: undefined }
    ]
  });
});

test("It inserts a value correctly at position 0", () => {
  const list = new DoublyLinkedList([5, 23, 7, 13]);

  list.insertAt(0, 18);
  expect(list.getList()).toEqual({
    headID: 18,
    tailID: 13,
    nodes: [
      { id: 5, previous: 18, next: 23 },
      { id: 23, previous: 5, next: 7 },
      { id: 7, previous: 23, next: 13 },
      { id: 13, previous: 7, next: undefined },
      { id: 18, previous: undefined, next: 5 }
    ]
  });
});

test("It inserts a value correctly in the middle", () => {
  const list = new DoublyLinkedList([5, 23, 7, 13]);

  list.insertAt(2, 18);
  expect(list.getList()).toEqual({
    headID: 5,
    tailID: 13,
    nodes: [
      { id: 5, previous: undefined, next: 23 },
      { id: 23, previous: 5, next: 18 },
      { id: 7, previous: 18, next: 13 },
      { id: 13, previous: 7, next: undefined },
      { id: 18, previous: 23, next: 7 }
    ]
  });
});

test("It inserts a value correctly at the end", () => {
  const list = new DoublyLinkedList([5, 23, 7, 13]);

  list.insertAt(4, 18);
  expect(list.getList()).toEqual({
    headID: 5,
    tailID: 18,
    nodes: [
      { id: 5, previous: undefined, next: 23 },
      { id: 23, previous: 5, next: 7 },
      { id: 7, previous: 23, next: 13 },
      { id: 13, previous: 7, next: 18 },
      { id: 18, previous: 13, next: undefined }
    ]
  });
});

test("It deletes a value correctly at the end", () => {
  const list = new DoublyLinkedList([5, 23, 7, 13]);

  list.deleteAt(3);
  expect(list.getList()).toEqual({
    headID: 5,
    tailID: 7,
    nodes: [
      { id: 5, previous: undefined, next: 23 },
      { id: 23, previous: 5, next: 7 },
      { id: 7, previous: 23, next: undefined }
    ]
  });
});

test("It deletes a value correctly at the start", () => {
  const list = new DoublyLinkedList([5, 23, 7, 13]);

  list.deleteAt(0);
  expect(list.getList()).toEqual({
    headID: 23,
    tailID: 13,
    nodes: [
      { id: 23, previous: undefined, next: 7 },
      { id: 7, previous: 23, next: 13 },
      { id: 13, previous: 7, next: undefined }
    ]
  });
});

test("It deletes a value correctly in the middle", () => {
  const list = new DoublyLinkedList([5, 23, 7, 13]);
  list.deleteAt(2);
  expect(list.getList()).toEqual({
    headID: 5,
    tailID: 13,
    nodes: [
      { id: 5, previous: undefined, next: 23 },
      { id: 23, previous: 5, next: 13 },
      { id: 13, previous: 23, next: undefined }
    ]
  });
});

test("It reverses the list", () => {
  const list = new DoublyLinkedList([5, 23, 7, 13]);
  list.reverse();
  expect(list.getList()).toEqual({
    headID: 13,
    tailID: 5,
    nodes: [
      { id: 5, previous: 23, next: undefined },
      { id: 23, previous: 7, next: 5 },
      { id: 7, previous: 13, next: 23 },
      { id: 13, previous: undefined, next: 7 }
    ]
  });
});
