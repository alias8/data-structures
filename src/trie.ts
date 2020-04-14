import fs from "fs";

interface Node1 {
  isCompleteWord: boolean;
  children: {
    [char: string]: Node1;
  };
}

export class Trie {
  private tree: Node1 = {
    isCompleteWord: false,
    children: {}
  };
  constructor(words: string[]) {
    words.forEach(word => {
      this.insert(word);
    });
  }

  insert(word: string, node: Node1 = this.tree) {
    if (word.length === 0) {
      return;
    }
    if (!node.children[word[0]]) {
      node.children[word[0]] = {
        isCompleteWord: word.length === 1,
        children: {}
      };
    }
    this.insert(word.slice(1), node.children[word[0]]);
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

  printAllWords(node: Node1 = this.tree) {
    for (let char in node.children) {
      const b = 2;
    }
  }
}

const text = fs.readFileSync("../data/text.txt", "utf8");
const textByLine = text.split(/\r\n/);
const trie = new Trie(textByLine);
const aa = trie.printAllWords();
const bb = 2;
