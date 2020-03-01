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
