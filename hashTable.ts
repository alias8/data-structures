import { LinkedList } from "./linkedList";

export class Entry<V> {
  private hash: number;
  private key: string | number;
  private value: V;

  constructor(key: standardValues, value: V) {
    this.key = key;
    this.value = value;
    this.hash = hash(key);
  }

  public equals(other: Entry<V>): boolean {
    if (this.hash != other.hash) {
      return false;
    }
    return this.key === other.key;
  }

  public getKey() {
    return this.key;
  }

  public getValue() {
    return this.value;
  }

  public getHash() {
    return this.hash;
  }
}

function hash(key: string | number) {
  if (typeof key === "string") {
    return key.split("").reduce((prev, letter) => {
      const bb = prev + polynomial(letter.charCodeAt(0));
      return prev + polynomial(letter.charCodeAt(0));
    }, 0);
  } else {
    return polynomial(key);
  }

  function polynomial(x: number) {
    return x ** 2 + x + 1;
  }
}

export type standardValues = string | number;

class HashTable<Element extends Entry<any> = Entry<standardValues>> {
  private maxSize = 1;
  private table: Array<LinkedList<Element> | null> = [];
  private size = 0;
  private readonly loadFactor = 0.5;
  private readonly maxLinkedListLength = 3;
  private overLimit: boolean = false;

  constructor() {
    this.resetTable();
  }

  private resetTable() {
    this.table = [];
    this.size = 0;
    this.overLimit = false;
    for (let i = 0; i < this.maxSize; i++) {
      this.table.push(null);
    }
  }

  // arbitrary hash function
  private hash(key: standardValues) {
    return hash(key) % this.maxSize;
  }

  private resize() {
    const tableCopy = [...this.table];
    this.maxSize *= 2;
    this.resetTable();
    tableCopy
      .filter(list => list !== null)
      .forEach(list => {
        let node = list!.getAt(0);
        while (node !== null) {
          this.add(node.element.getKey(), node.element.getValue());
          node = node.next;
        }
      });
  }

  public add(key: standardValues, value: standardValues) {
    if (this.size / this.maxSize > this.loadFactor || this.overLimit) {
      this.resize();
    }

    const hash = this.hash(key);
    const entry = new Entry(key, value);
    if (this.table[hash] === null) {
      this.table[hash] = new LinkedList();
    }
    // @ts-ignore
    this.table[hash]!.add(entry);

    if (
      this.table[hash] &&
      this.table[hash]!.getSize() > this.maxLinkedListLength
    ) {
      this.overLimit = true;
    }
    if (this.table[hash]?.getSize() === 1) {
      // fresh bucket
      this.size++;
    }
  }

  public get(key: standardValues) {
    const hash = this.hash(key);
    if (this.table[hash]?.getSize()) {
      const entry = this.table[hash]?.find(key);
      return entry ? entry.element.getValue() : undefined;
    }
    return undefined;
  }
}

const table = new HashTable();
table.add("james", 1);
table.add("george", 2);
table.add("jerry", 3);
table.add("elaine", 4);
table.add("kramer", 5);
const b = table.get("james");
const c = table.get("james1");
const d = 2;
