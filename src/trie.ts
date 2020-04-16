import fs from "fs";

interface Node1 {
  isCompleteWord: boolean;
  freq?: number;
  children: {
    [char: string]: Node1;
  };
}

interface IWord {
  word: string;
  freq: number;
}

export class Trie {
  private tree: Node1 = {
    isCompleteWord: false,
    children: {}
  };
  private wordCount = 0;
  constructor(words: IWord[]) {
    words.forEach(word => {
      this.insert(word.word, word.freq);
      if (this.wordCount % 1000 === 0) {
        console.log("word count ", this.wordCount);
      }
    });
  }

  insert(word: string, freq: number, node: Node1 = this.tree) {
    if (word.length === 0) {
      this.wordCount++;
      return;
    }
    if (!node.children[word[0]]) {
      node.children[word[0]] = {
        isCompleteWord: word.length === 1,
        freq: word.length === 1 ? freq : undefined,
        children: {}
      };
    }
    this.insert(word.slice(1), freq, node.children[word[0]]);
  }

  has(word: string, node: Node1 = this.tree): boolean {
    if (word.length === 0 && node.isCompleteWord) {
      return true;
    }
    if (node.children[word[0]]) {
      return this.has(word.slice(1), node.children[word[0]]);
    }
    return false;
  }

  // Finds node, may not necessarily be a complete word
  findNode(word: string, node: Node1 = this.tree): Node1 | undefined {
    if (word.length === 0) {
      return node;
    }
    if (node.children[word[0]]) {
      return this.findNode(word.slice(1), node.children[word[0]]);
    }
    return undefined;
  }

  remove(
    word: string,
    originalWord: string = word,
    node: Node1 = this.tree
  ): boolean {
    if (word.length === 0 && node.isCompleteWord) {
      node.isCompleteWord = false;
      this.wordCount--;
      if (Object.keys(node.children).length === 0) {
        // delete further up chain
        // todo: is this needed?
        const parentNode = this.findNode(
          originalWord.slice(0, originalWord.length - 1)
        );
        if (parentNode) {
          parentNode.children = {};
        }
      }
      return true;
    }
    if (node.children[word[0]]) {
      return this.remove(word.slice(1), originalWord, node.children[word[0]]);
    }
    return false;
  }

  printAllWords(
    cb = (val: string) => {
      console.log(val);
    },
    node: Node1 = this.tree,
    w = ""
  ) {
    let word = w;
    if (node.isCompleteWord) {
      cb(word);
    }
    Object.entries(node.children).forEach(([char, node]) => {
      word += char;
      this.printAllWords(cb, node, word); // depth-first search
      word = word.substr(0, word.length - 1); // backward tracking, take off last letter
    });
  }

  wordsCount() {
    return this.wordCount;
  }
}

const text = fs.readFileSync("../data/text.txt", "utf8");
const textByLine = text
  .split("\n")
  .map((word, index) => ({
    word,
    rank: index
  }))
  .map(item => `${item.word} ${item.freq}`)
  .join("\n");
fs.writeFileSync("../data/text1.txt", textByLine);
// const textByLine = text.split("\n");
// fs.writeFileSync("../data/text1.txt", textByLine);
const trie = new Trie(textByLine);
const t = trie.findNode("t");
const th = trie.findNode("th");
const the = trie.findNode("the");
const thei = trie.findNode("thei");
const their = trie.findNode("their");
const theirs = trie.findNode("theirs");
// todo: use the frequency to make suggestions for word completion?
// const aa = trie.printAllWords();
const bb = 2;
