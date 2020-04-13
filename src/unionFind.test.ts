import { KruskalsAlgorithm } from "./unionFind";
import exp = require("constants");

describe("Union find tests", () => {
  test("dummy", () => {
    expect(1).toEqual(1);
  });
  // test("It gets sorted edges", () => {
  //   const union = new KruskalsAlgorithm([
  //     ["A", "B", 5],
  //     ["A", "E", 1],
  //     ["A", "D", 4],
  //     ["E", "D", 2],
  //     ["E", "F", 1],
  //     ["D", "F", 5],
  //     ["D", "G", 11],
  //     ["D", "B", 2],
  //     ["D", "H", 2],
  //     ["B", "C", 4],
  //     ["C", "H", 4],
  //     ["C", "I", 1],
  //     ["C", "J", 2],
  //     ["I", "J", 0],
  //     ["H", "I", 6],
  //     ["H", "G", 1],
  //     ["C", "I", 1],
  //     ["G", "I", 4],
  //     ["F", "G", 7]
  //   ]);
  //   union.unionAll();
  //   expect(union.get()).toEqual([
  //     ["A", "E", 1],
  //     ["E", "F", 1],
  //     ["E", "D", 2],
  //     ["D", "H", 2],
  //     ["H", "G", 1],
  //     ["D", "B", 2],
  //     ["B", "C", 4],
  //     ["C", "I", 1],
  //     ["I", "J", 0]
  //   ]);
  // });
});
