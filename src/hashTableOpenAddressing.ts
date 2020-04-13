import { Entry, hash } from "./hashTableSeparateChaining";
// @ts-ignore
import gcd from "gcd";

export type standardValues = string | number;

/*
 * Generally speaking, open addressing is better used for hash tables with small records that can be stored within the
 * table (internal storage) and fit in a cache line. They are particularly suitable for elements of one word or less
 * */
class HashTableOpenAddressing<
  Element extends Entry<standardValues> = Entry<standardValues>
> {
  private maxSize = 3;
  private table: Array<Element | null> = [];
  private size = 0;
  private readonly loadFactor = 2 / 3;

  constructor() {
    this.resetTable();
  }

  private resetTable() {
    this.table = [];
    this.size = 0;
    for (let i = 0; i < this.maxSize; i++) {
      this.table.push(null);
    }
  }

  // arbitrary hash function
  private hash(key: standardValues) {
    return hash(key) % this.maxSize;
  }

  private resize() {
    console.log("table resizing");
    const tableCopy = [...this.table];
    this.maxSize *= 2;
    this.resetTable();
    tableCopy
      .filter(item => item !== null)
      .forEach(item => {
        this.add(item!.getKey(), item!.getValue());
      });
  }

  private probingFunction(value: number) {
    return 1 * value;
    // GCD calculation not required since gcd(X, 1) always equals 1
    // let x = 1;
    // while (gcd(this.maxSize, x) !== 1) {
    //   x++;
    // }
    // console.log(`using probing multipler: ${x}`);
    // return x * value;
  }

  public add(key: standardValues, value: standardValues) {
    if (this.size / this.maxSize > this.loadFactor) {
      this.resize();
    }

    let x = 1;
    let hash = this.hash(key);
    console.log(`trying position: ${hash}`);
    while (this.table[hash] !== null) {
      hash = (hash + this.probingFunction(x)) % this.maxSize;
      console.log(`trying position: ${hash}`);
      x++;
    }
    // @ts-ignore
    this.table[hash] = new Entry(key, value);
    this.size++;
  }

  public get(key: standardValues) {}
}

const table = new HashTableOpenAddressing();
table.add("james", 1);
table.add("george", 2);
table.add("jerry", 3);
table.add("elaine", 4);
table.add("kramer", 5);
const d = 2;
