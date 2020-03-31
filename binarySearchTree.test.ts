import { BinarySearchTree } from "./binarySearchTree";

describe.only("something", () => {
  test("It adds a node", () => {
    const tree = new BinarySearchTree();
    tree.add(20);
    expect(tree.get()).toEqual([20, null, null]);
  });

  test("It adds several nodes", () => {
    const tree = new BinarySearchTree();
    tree.add(20);
    tree.add(10);
    tree.add(31);

    expect(tree.get()).toEqual([20, 10, 31]);
  });
});
