type IEdge = [string, string, number]; // [id1, id2, edgeWeight]
type Colour = number;
/*
 * Find minimum spanning tree.
 *
 * Uses a data structure called disjoint-set / union–find / merge-find set
 * https://en.wikipedia.org/wiki/Minimum_spanning_tree#Algorithms
 * */
export class KruskalsAlgorithm {
  private edges: IEdge[];
  private findGroupByVertex: { [vertex: string]: Colour } = {};
  private getVertexesInGroup: { [colour: number]: Set<string> } = {};
  private unvistedVertices: Set<string> = new Set();
  constructor(edges: IEdge[]) {
    // sort list of edges so that shortest length is at the start
    const temp = new Set();
    this.edges = edges
      .map(edge => {
        if (edge[0] === edge[1]) {
          throw Error(`edge with id: ${edge[0]} cannot be connected to itself`);
        }
        const combined = [...[edge[0], edge[1]].sort(), edge[2]] as IEdge;
        // check for duplicates
        if (temp.has(combined)) {
          throw new Error(`duplicate edge: ${combined}`);
        }
        temp.add(combined);
        return combined;
      })
      .sort((a, b) => {
        if (a[2] !== b[2]) {
          // if unequal weights, use that to sort
          return a[2] - b[2];
        } else if (a[0] !== b[0]) {
          // if unequal first letters, sort by that
          return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0;
        } else {
          // if equal everything else, sort by 2nd letter
          return a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0;
        }
      });

    // give random colours to each vertex
    let colour: Colour = 0;
    this.edges.forEach(edge => {
      const vertex1 = edge[0];
      const vertex2 = edge[1];
      if (!(vertex1 in this.findGroupByVertex)) {
        this.findGroupByVertex[vertex1] = colour;
        this.getVertexesInGroup[colour] = new Set([vertex1]);
        colour++;
      }
      if (!(vertex2 in this.findGroupByVertex)) {
        this.findGroupByVertex[vertex2] = colour;
        this.getVertexesInGroup[colour] = new Set([vertex2]);
        colour++;
      }
      this.unvistedVertices.add(vertex1);
      this.unvistedVertices.add(vertex2);
    });
  }

  public get() {
    return this.edges;
  }

  public print() {
    return console.log(this.edges);
  }

  private isConnectedTree() {
    return (
      this.unvistedVertices.size === 0 &&
      Object.keys(this.getVertexesInGroup).length === 1
    );
  }

  private find(vertex: string): Colour {
    return this.findGroupByVertex[vertex];
  }

  public unionAll() {
    let index = 0;
    while (index < this.edges.length && !this.isConnectedTree()) {
      const edge = this.edges[index]; // AE
      const firstVertex = edge[0];
      const secondVertex = edge[1];
      const firstVertexColour = this.find(firstVertex); // 0
      const secondVertexColour = this.find(secondVertex); // 1
      if (firstVertexColour !== secondVertexColour) {
        // if groups are not equal, attempt to combine them
        const firstGroupSize = this.getVertexesInGroup[firstVertexColour].size;
        const secondGroupSize = this.getVertexesInGroup[secondVertexColour]
          .size;
        if (firstGroupSize >= secondGroupSize) {
          // make 2nd group part of 1st
          this.union(secondVertexColour, firstVertexColour);
        } else {
          // make 1st part of 2nd
          this.union(firstVertexColour, secondVertexColour);
        }
        this.unvistedVertices.delete(firstVertex);
        this.unvistedVertices.delete(secondVertex);
      } else {
        // groups are equal, do not connect them as this would create a cycle
      }
      index++;
    }
    console.log(
      `found minimum spanning tree after ${index + 1} of ${
        this.edges.length
      } union steps`
    );
    return this.getVertexesInGroup;
  }

  private union(fromVertexColour: Colour, toVertexColour: Colour) {
    const iterator = this.getVertexesInGroup[fromVertexColour].values();
    for (let fromVertexName of iterator) {
      this.findGroupByVertex[fromVertexName] = toVertexColour;
      this.getVertexesInGroup[toVertexColour].add(fromVertexName);
      this.getVertexesInGroup[fromVertexColour].delete(fromVertexName);
      if (this.getVertexesInGroup[fromVertexColour].size === 0) {
        delete this.getVertexesInGroup[fromVertexColour];
      }
    }
  }
}

const union = new KruskalsAlgorithm([
  ["I", "J", 0],
  ["A", "E", 1],
  ["C", "I", 1],
  ["E", "F", 1],
  ["G", "H", 1],
  ["B", "D", 2],
  ["C", "J", 2],
  ["D", "E", 2],
  ["D", "H", 2],
  ["A", "D", 4],
  ["B", "C", 4],
  ["C", "H", 4],
  ["G", "I", 4],
  ["A", "B", 5],
  ["D", "F", 5],
  ["H", "I", 6],
  ["F", "G", 7],
  ["D", "G", 11]
]);

const aa = [
  ["A", "E", 1],
  ["E", "F", 1],
  ["E", "D", 2],
  ["D", "H", 2],
  ["H", "G", 1],
  ["D", "B", 2],
  ["B", "C", 4],
  ["I", "J", 0]
];

const aab = union.unionAll();
union.print();
