import { DoublyLinkedList } from "./index";

test("It builds a doubly linked list", () => {
  const list = new DoublyLinkedList([5, 23, 7, 13]);
  expect(list.getList()).toEqual({
    "5": { previous: null, next: 23 },
    "7": { previous: 23, next: 13 },
    "13": { previous: 7, next: null },
    "23": { previous: 5, next: 7 },
    head: 5,
    tail: 13
  });
});

test("It inserts a value correctly at position 0", () => {
  const list = new DoublyLinkedList([5, 23, 7, 13]);

  list.insertAt(0, 18);
  expect(list.getList()).toEqual({
    "5": { previous: 18, next: 23 },
    "7": { previous: 23, next: 13 },
    "13": { previous: 7, next: null },
    "18": { previous: null, next: 5 },
    "23": { previous: 5, next: 7 },
    head: 18,
    tail: 13
  });
});

test("It inserts a value correctly in the middle", () => {
  const list = new DoublyLinkedList([5, 23, 7, 13]);

  list.insertAt(2, 18);
  expect(list.getList()).toEqual({
    "5": { previous: null, next: 23 },
    "7": { previous: 18, next: 13 },
    "13": { previous: 7, next: null },
    "18": { previous: 23, next: 7 },
    "23": { previous: 5, next: 18 },
    head: 5,
    tail: 13
  });
});

test("It inserts a value correctly at the end", () => {
  const list = new DoublyLinkedList([5, 23, 7, 13]);

  list.insertAt(4, 18);
  list.print();
  expect(list.getList()).toEqual({
    "5": { previous: null, next: 23 },
    "7": { previous: 23, next: 13 },
    "13": { previous: 7, next: 18 },
    "18": { previous: 13, next: null },
    "23": { previous: 5, next: 7 },
    head: 5,
    tail: 18
  });
});
