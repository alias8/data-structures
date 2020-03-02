import { BinaryHeap } from "./binaryHeap";

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
  expect(binaryHeap.getParentAtIndex()).toEqual(8);
});

test("It gets correct parent value", () => {
  const binaryHeap = new BinaryHeap([], false);
  binaryHeap.add(9);
  binaryHeap.add(8);
  binaryHeap.add(7);
  binaryHeap.add(6);
  expect(binaryHeap.getParentAtIndex()).toEqual(8);
});

test("It gets correct parent value", () => {
  const binaryHeap = new BinaryHeap([], false);
  binaryHeap.add(9);
  binaryHeap.add(8);
  binaryHeap.add(7);
  binaryHeap.add(6);
  binaryHeap.add(5);
  expect(binaryHeap.getParentAtIndex()).toEqual(7);
});

test("It gets correct parent value", () => {
  const binaryHeap = new BinaryHeap([], false);
  binaryHeap.add(9);
  binaryHeap.add(8);
  binaryHeap.add(7);
  binaryHeap.add(6);
  binaryHeap.add(5);
  binaryHeap.add(1);
  expect(binaryHeap.getParentAtIndex()).toEqual(7);
});

test("It inserts at correct position", () => {
  const binaryHeap = new BinaryHeap([5]);
  binaryHeap.add(1);
  expect(binaryHeap.get()).toEqual([1, 5]);
});
