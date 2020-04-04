class Node<T> {
  data: T | null;
  public left: Node<T> | null;
  public right: Node<T> | null;

  constructor(left: Node<T> | null, right: Node<T> | null, elem: T) {
    this.data = elem;
    this.left = left;
    this.right = right;
  }
}

abstract class Comparable<T> {
  abstract compareTo(data: Comparable<T> | null): number;
}

class MyNumber<T> extends Comparable<T> {
  private data: T;
  constructor(data: T) {
    super();
    this.data = data;
  }

  compareTo(myNumberData: MyNumber<T> | null): number {
    if (myNumberData === null) {
      return -1;
    }
    if (
      typeof myNumberData.data === "number" &&
      typeof this.data === "number"
    ) {
      return this.data - myNumberData.data;
    } else {
      throw Error("type has no compare!");
    }
  }
}

export class BinarySearchTree<T extends Comparable<T>> {
  // Tracks the number of nodes in this BST
  private nodeCount = 0;

  // This BST is a rooted tree so we maintain a handle on the root node
  private root: Node<T> | null = null;

  // Check if this binary tree is empty
  public isEmpty() {
    return this.size() == 0;
  }

  // Get the number of nodes in this binary tree
  public size() {
    return this.nodeCount;
  }

  // Add an element to this binary tree. Returns true
  // if we successfully perform an insertion
  public add(elem: T) {
    // Check if the value already exists in this
    // binary tree, if it does ignore adding it
    if (this.contains(elem)) {
      return false;

      // Otherwise add this element to the binary tree
    } else {
      this.root = this.addRecursive(this.root, elem);
      this.nodeCount++;
      return true;
    }
  }

  // Private method to recursively add a value in the binary tree
  private addRecursive(node: Node<T> | null, elem: T): Node<T> {
    // Base case: found a leaf node
    if (node == null) {
      node = new Node(null, null, elem);
    } else {
      // Pick a subtree to insert element
      if (elem.compareTo(node.data) < 0) {
        node.left = this.addRecursive(node.left, elem);
      } else {
        node.right = this.addRecursive(node.right, elem);
      }
    }

    return node;
  }

  // Remove a value from this binary tree if it exists, O(n)
  public remove(elem: T) {
    // Make sure the node we want to remove
    // actually exists before we remove it
    if (this.contains(elem)) {
      this.root = this.removeRecursive(this.root, elem);
      this.nodeCount--;
      return true;
    }
    return false;
  }

  private removeRecursive(node: Node<T> | null, elem: T): Node<T> | null {
    if (node == null) return null;

    const cmp = elem.compareTo(node.data);

    // Dig into left subtree, the value we're looking
    // for is smaller than the current value
    if (cmp < 0) {
      node.left = this.removeRecursive(node.left, elem);

      // Dig into right subtree, the value we're looking
      // for is greater than the current value
    } else if (cmp > 0) {
      node.right = this.removeRecursive(node.right, elem);

      // Found the node we wish to remove
    } else {
      // This is the case with only a right subtree or
      // no subtree at all. In this situation just
      // swap the node we wish to remove with its right child.
      if (node.left == null) {
        const rightChild = node.right;

        node.data = null;
        node = null;

        return rightChild;

        // This is the case with only a left subtree or
        // no subtree at all. In this situation just
        // swap the node we wish to remove with its left child.
      } else if (node.right == null) {
        const leftChild = node.left;

        node.data = null;
        node = null;

        return leftChild;

        // When removing a node from a binary tree with two links the
        // successor of the node being removed can either be the largest
        // value in the left subtree or the smallest value in the right
        // subtree. In this implementation I have decided to find the
        // smallest value in the right subtree which can be found by
        // traversing as far left as possible in the right subtree.
      } else {
        // Find the leftmost node in the right subtree
        const tmp = this.findMin(node.right);

        // Swap the data
        node.data = tmp.data;

        // Go into the right subtree and remove the leftmost node we
        // found and swapped data with. This prevents us from having
        // two nodes in our tree with the same value.
        node.right = this.removeRecursive(node.right, tmp.data!);

        // If instead we wanted to find the largest node in the left
        // subtree as opposed to smallest node in the right subtree
        // here is what we would do:
        // Node tmp = findMax(node.left);
        // node.data = tmp.data;
        // node.left = remove(node.left, tmp.data);
      }
    }

    return node;
  }

  // Helper method to find the leftmost node (which has the smallest value)
  private findMin(node: Node<T>): Node<T> {
    while (node.left != null) node = node.left;
    return node;
  }

  // Helper method to find the rightmost node (which has the largest value)
  private findMax(node: Node<T>): Node<T> {
    while (node.right != null) node = node.right;
    return node;
  }

  // returns true is the element exists in the tree
  public contains(elem: T) {
    return this.containsRecursive(this.root, elem);
  }

  // private recursive method to find an element in the tree
  private containsRecursive(node: Node<T> | null, elem: T): boolean {
    // Base case: reached bottom, value not found
    if (node == null) return false;

    const cmp = elem.compareTo(node.data);

    // Dig into the left subtree because the value we're
    // looking for is smaller than the current value
    if (cmp < 0) return this.containsRecursive(node.left, elem);
    // Dig into the right subtree because the value we're
    // looking for is greater than the current value
    else if (cmp > 0) return this.containsRecursive(node.right, elem);
    // We found the value we were looking for
    else return true;
  }

  // Computes the height of the tree, O(n)
  public height() {
    return this.heightRecursive(this.root);
  }

  // Recursive helper method to compute the height of the tree
  private heightRecursive(node: Node<T> | null): number {
    if (node == null) return 0;
    return (
      Math.max(
        // each call will add 1 to the result, so we count the number of times we branch down
        this.heightRecursive(node.left),
        this.heightRecursive(node.right)
      ) + 1
    );
  }
}

// @ts-ignore
const tree = new BinarySearchTree<MyNumber<number>>();
tree.add(new MyNumber(7));
tree.add(new MyNumber(20));
tree.add(new MyNumber(5));
tree.add(new MyNumber(15));
tree.add(new MyNumber(10));
tree.add(new MyNumber(4));
const b = tree.height();
const a = 2;
