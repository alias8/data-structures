import { UnionFind } from "./unionFind";

test("It gets sorted edges", () => {
  const union = new UnionFind([
    ["A", "B", 5, null],
    ["A", "E", 1, null],
    ["A", "D", 4, null],
    ["E", "D", 2, null],
    ["B", "D", 2, null]
  ]);
  expect(union.getSortedEdges()).toEqual([
    ["A", "E", 1],
    ["B", "D", 2],
    ["D", "E", 2],
    ["A", "D", 4],
    ["A", "B", 5]
  ]);
});

test("It groups together", () => {
  const union = new UnionFind([
    ["A", "B", 5, null],
    ["A", "E", 1, null],
    ["A", "D", 4, null],
    ["E", "D", 2, null],
    ["B", "D", 2, null]
  ]);
  expect(union.getSortedEdges()).toEqual([
    ["A", "E", 1, 1],
    ["B", "D", 2, 2],
    ["D", "E", 2, 2],
    ["A", "D", 4, 1],
    ["A", "B", 5, 1]
  ]);
});

test("It groups together", () => {
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
});
