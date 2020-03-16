type IEdge = [string, string, number, number | null]; // [id1, id2, edgeWeight, group]

export class UnionFind {
  private edges: IEdge[];
  private groupID: number = 0;
  constructor(edges: IEdge[]) {
    this.edges = edges.map(edge => {
      if (edge[0] === edge[1]) {
        throw Error(`edge with id: ${edge[0]} cannot be connected to itself`);
      }
      return [...[edge[0], edge[1]].sort(), edge[2], null] as IEdge;
    });
  }

  public print() {
    return console.log(this.edges);
  }

  public getSortedEdges() {
    return this.edges.sort((a, b) => {
      if (a[2] < b[2]) {
        return -1;
      } else if (a[2] > b[2]) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  public group() {
    [...this.edges].forEach((edge: IEdge, index) => {
      if (edge[3] === null) {
        if (edge[0] === "D" && edge[1] === "E") {
          const a = 2;
        }
        const preferredGroup = this.preferredGroupAvailable(edge);
        if (preferredGroup === "loop") {
          // do nothing
        } else if (preferredGroup === "none") {
          // make new group
          edge[3] = this.groupID++;
        } else {
          // use preferred group
          edge[3] = preferredGroup;
        }
      }
    });
  }

  private preferredGroupAvailable(targetEdge: IEdge) {
    const targetEdgeLetters = targetEdge.slice(0, 2).join("");
    const filteredEdges = this.edges
      .filter(edge => edge[3] !== null) // only search un grouped edges
      .filter(edge => edge.slice(0, 2).join("") !== targetEdgeLetters); // skip comparing the same edge
    const findFirst = filteredEdges.find(edge => {
      return edge
        .slice(0, 2)
        .join("")
        .includes(targetEdge[0]);
    }); // see if first letter of target edge is included in this edge
    const findSecond = filteredEdges.find(edge => {
      return edge
        .slice(0, 2)
        .join("")
        .includes(targetEdge[1]);
    }); // see if first letter of target edge is included in this edge
    if (this.isCycle(findFirst, findSecond)) {
      return "loop";
    }
    if (findFirst && findFirst[3] !== null) {
      return findFirst[3]; // use this group
    } else if (findSecond && findSecond[3] !== null) {
      return findSecond[3]; // use this group
    } else {
      return "none"; // make new group
    }
  }

  private isCycle(a, b) {
    // how to find cycle? this is wrong
    return !!a && !!b;
  }
}

const union = new UnionFind([
  ["I", "J", 0, null],
  ["A", "E", 1, null],
  ["C", "I", 1, null],
  ["E", "F", 1, null],
  ["G", "H", 1, null],
  ["B", "D", 2, null],
  ["C", "J", 2, null],
  ["D", "E", 2, null],
  ["D", "H", 2, null]
]);

union.getSortedEdges();
union.group();
union.print();
