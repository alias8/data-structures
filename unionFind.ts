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
    return this.edges.sort((a, b) => (a[2] < b[2] ? -1 : 1));
  }

  public group() {
    this.edges.map((edge, index) => {
      if (edge[3] === null) {
        const edgeCopy = this.edges[index];
        const preferredGroup = this.preferredGroupAvailable(edgeCopy);
        if (preferredGroup === "loop") {
          // do nothing
        } else if (preferredGroup === "none") {
          // make new group
          edgeCopy[3] = this.groupID++;
        } else {
          // use preferred group
          edgeCopy[3] = preferredGroup;
        }
        return edgeCopy;
      }
    });
  }

  private preferredGroupAvailable(targetEdge: IEdge) {
    const findFirst = this.edges.find(edge => {
      const searchIds = edge.slice(0, 1);
      return searchIds.includes(targetEdge[0]);
    });
    const findSecond = this.edges.find(edge => {
      const searchIds = edge.slice(0, 1);
      return searchIds.includes(targetEdge[1]);
    });
    if (!!findFirst && !!findSecond) {
      // in loop
      return "loop";
    }
    if (findFirst) {
      return findFirst[3];
    } else if (findSecond) {
      return findSecond[3];
    } else {
      return "none";
    }
  }
}

const union = new UnionFind([
  ["A", "B", 5, null],
  ["A", "E", 1, null],
  ["A", "D", 4, null],
  ["E", "D", 2, null],
  ["B", "D", 2, null]
]);

union.getSortedEdges();
union.group();
union.print();
