import { BinaryHeap } from "./binaryHeap";

test("It works", () => {
  expect(1).toEqual(1);
});

test("It adds nodes", () => {
  const binaryHeap = new BinaryHeap([], false);
  binaryHeap.add(9);
  expect(binaryHeap.get()).toEqual([9]);
});

test("It adds nodes", () => {
  const binaryHeap = new BinaryHeap([], false);
  binaryHeap.add(9);
  binaryHeap.add(8);
  binaryHeap.add(7);
  expect(binaryHeap.get()).toEqual([9, 8, 7]);
});

test("It gets correct parent value", () => {
  const binaryHeap = new BinaryHeap([], false);
  binaryHeap.add(9);
  binaryHeap.add(8);
  binaryHeap.add(7);
  expect(binaryHeap.getParentValueOfIndex()).toEqual(8);
});

test("It gets correct parent value", () => {
  const binaryHeap = new BinaryHeap([], false);
  binaryHeap.add(9);
  binaryHeap.add(8);
  binaryHeap.add(7);
  binaryHeap.add(6);
  expect(binaryHeap.getParentValueOfIndex()).toEqual(8);
});

test("It gets correct parent value", () => {
  const binaryHeap = new BinaryHeap([], false);
  binaryHeap.add(9);
  binaryHeap.add(8);
  binaryHeap.add(7);
  binaryHeap.add(6);
  binaryHeap.add(5);
  expect(binaryHeap.getParentValueOfIndex()).toEqual(7);
});

test("It gets correct parent value", () => {
  const binaryHeap = new BinaryHeap([], false);
  binaryHeap.add(9);
  binaryHeap.add(8);
  binaryHeap.add(7);
  binaryHeap.add(6);
  binaryHeap.add(5);
  binaryHeap.add(1);
  expect(binaryHeap.getParentValueOfIndex()).toEqual(7);
});

test("It inserts at correct position", () => {
  const binaryHeap = new BinaryHeap([5]);
  binaryHeap.add(1);
  expect(binaryHeap.get()).toEqual([1, 5]);
});

test("It inserts at correct position", () => {
  const binaryHeap = new BinaryHeap([5, 6, 12, 8, 7, 14, 19, 13, 12, 11]);
  binaryHeap.add(1);
  expect(binaryHeap.get()).toEqual([1, 5, 12, 8, 6, 14, 19, 13, 12, 11, 7]);
});

test("It inserts at correct position", () => {
  const binaryHeap = new BinaryHeap([5, 6, 12, 8, 7, 14, 19, 13, 12, 11]);
  binaryHeap.add(1);
  binaryHeap.add(13);
  expect(binaryHeap.get()).toEqual([1, 5, 12, 8, 6, 13, 19, 13, 12, 11, 7, 14]);
});

test("It inserts at correct position", () => {
  const binaryHeap = new BinaryHeap([5, 6, 12, 8, 7, 14, 19, 13, 12, 11]);
  binaryHeap.add(1);
  binaryHeap.add(13);
  binaryHeap.add(4);
  expect(binaryHeap.get()).toEqual([
    1,
    5,
    4,
    8,
    6,
    12,
    19,
    13,
    12,
    11,
    7,
    14,
    13
  ]);
});

test("It inserts at correct position", () => {
  const binaryHeap = new BinaryHeap([5, 6, 12, 8, 7, 14, 19, 13, 12, 11]);
  binaryHeap.add(1);
  binaryHeap.add(13);
  binaryHeap.add(4);
  binaryHeap.add(0);
  expect(binaryHeap.get()).toEqual([
    0,
    5,
    1,
    8,
    6,
    12,
    4,
    13,
    12,
    11,
    7,
    14,
    13,
    19
  ]);
});

test("It inserts at correct position", () => {
  const binaryHeap = new BinaryHeap([5, 6, 12, 8, 7, 14, 19, 13, 12, 11]);
  binaryHeap.add(1);
  binaryHeap.add(13);
  binaryHeap.add(4);
  binaryHeap.add(0);
  binaryHeap.add(10);
  expect(binaryHeap.get()).toEqual([
    0,
    5,
    1,
    8,
    6,
    12,
    4,
    13,
    12,
    11,
    7,
    14,
    13,
    19,
    10
  ]);
});

test("It removes correctly", () => {
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
  expect(binaryHeap.get()).toEqual([
    1,
    5,
    2,
    8,
    6,
    2,
    2,
    13,
    12,
    11,
    7,
    10,
    15,
    3
  ]);
});
