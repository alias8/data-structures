import { Trie } from "./trie";
import fs from "fs";

let textByLine: string[];
beforeAll(() => {
  const text = fs.readFileSync("../data/text.txt", "utf8");
  textByLine = text.split(/\r\n/);
});

describe.only("Trie tests", () => {
  test("it works", () => {
    const trie = new Trie(textByLine);
    trie.has("car");
    expect(trie.has("car")).toEqual(true);
  });
});
