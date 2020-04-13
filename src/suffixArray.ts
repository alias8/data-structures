import * as _ from "lodash";

interface ITable {
  substring: string;
  suffixArrayIndex: number;
  longestCommonPrefix?: number;
}

// naive approach
class SuffixArray {
  private word: string;
  private array: ITable[] = [];
  constructor(word: string) {
    this.word = word;
    this.buildArray();
  }

  buildArray() {
    this.array = this.word
      .split("")
      .map((_, index, word) => ({
        // n
        substring: this.word.slice(index),
        suffixArrayIndex: index
      }))
      .sort((
        a,
        b // n^2 for length < 10, nlogn otherwise
      ) => (a.substring < b.substring ? -1 : a.substring > b.substring ? 1 : 0))
      .map((obj, index, array) => ({
        // n
        ...obj,
        longestCommonPrefix:
          index === 0
            ? 0
            : this.longestCommonPrefix(
                array[index - 1].substring,
                array[index].substring
              )
      }));
  }

  longestCommonPrefix(a: string, b: string) {
    let counter = 0;
    for (let i = 0; i < a.length; i++) {
      if (a[i] && b[i] && a[i] === b[i]) {
        counter++;
      } else {
        break;
      }
    }
    return counter;
  }
}

/*
 * aa = [
 * {"amel", 1},
 * {"camel", 0},
 * {"el", 3},
 * {"l", 4},
 * {"mel", 2},
 * ]
 * */

interface ITable2 {
  substring: string;
  suffixArrayIndex: number;
  colour: number;
  longestCommonPrefix: number;
}

/*
 * Used for the Longest common substring problem.
 * Given 2 or more strings, find the longest common substring.
 * */
class SuffixArray2 {
  // private readonly SENTINELS: string[] = _.range(33, 65).map(code =>
  //   String.fromCharCode(code)
  // );
  private readonly SENTINELS: string[] = ["#", "$", "%", "&"];
  private lettersEach: number;
  private readonly k = 2; // number of groups that we want to match
  private REMAINING_SENTINELS = [...this.SENTINELS];
  private word: string = "";
  private array: ITable2[] = [];
  private totalWords: number;

  constructor(words: string[]) {
    this.totalWords = words.length;
    this.lettersEach = words[0].length;
    words.forEach((word, index, array) => {
      const sentinel = this.REMAINING_SENTINELS.shift();
      this.word += word + sentinel;
    });
    this.buildArray();
  }

  buildArray() {
    this.array = this.word
      .split("")
      .map((_, index, word) => {
        const substring = this.word.slice(index);
        return {
          // n
          substring: substring,
          suffixArrayIndex: index,
          colour: this.getColour(substring)
        };
      })
      .sort((
        a,
        b // n^2 for length < 10, nlogn otherwise
      ) => (a.substring < b.substring ? -1 : a.substring > b.substring ? 1 : 0))
      .map((obj, index, array) => ({
        // n
        ...obj,
        longestCommonPrefix:
          index === 0
            ? 0
            : this.longestCommonPrefix(
                array[index - 1].substring,
                array[index].substring
              )
      }))
      .slice(this.totalWords);
  }

  getColour(substring: string) {
    return Math.floor(
      substring.slice(0, substring.length - 1).length / (this.lettersEach + 1)
    );
  }

  longestCommonPrefix(a: string, b: string) {
    let counter = 0;
    for (let i = 0; i < a.length; i++) {
      if (a[i] && b[i] && a[i] === b[i]) {
        counter++;
      } else {
        break;
      }
    }
    return counter;
  }

  findLCS() {
    let start = 0;
    let end = this.k;
    let maxLength = 0;
    let longestSubstrings: string[] = [];
    while (
      end !== this.array.length - 1 &&
      start !== this.array.length - (this.k - 1)
    ) {
      const slice = this.array.slice(start, end);
      const colours = new Set(slice.map(obj => obj.colour));

      // colour check
      if (colours.size >= this.k) {
        const windowLCSElement = _.last(slice);
        // length check
        if (windowLCSElement!.longestCommonPrefix >= maxLength) {
          const valid = slice.every(
            obj =>
              obj.substring.slice(0, windowLCSElement!.longestCommonPrefix) ===
              windowLCSElement!.substring.slice(
                0,
                windowLCSElement!.longestCommonPrefix
              )
          );
          // valid common substrings check
          if (valid) {
            maxLength = windowLCSElement!.longestCommonPrefix; // update max length
            longestSubstrings = longestSubstrings
              .filter(s => s.length === maxLength)
              .concat(
                windowLCSElement!.substring.slice(
                  0,
                  windowLCSElement!.longestCommonPrefix
                )
              );
            const bb = 2;
          }
        }
      }
      // adjust start and end
      if (colours.size < this.k) {
        end++;
      } else if (colours.size >= this.k && slice.length >= this.k) {
        start++;
      }
    }
    return longestSubstrings;
  }

  appendString() {}
}

// appears to run in n.log(n) time, the sort is the bottleneck
// const allTimes = [];
// for (let i = 10; i <= 10 ** 6; i *= 10) {
//   let times: number[] = [];
//   for (let j = 0; j < 1; j++) {
//     const lettersEach = i;
//     const stringsToCompare = 2;
//     const letters = ["A", "G", "C", "T"];
//     const array: string[] = _.range(0, stringsToCompare).map(i =>
//       _.range(0, lettersEach)
//         .map(i => letters[_.random(0, letters.length - 1)])
//         .join("")
//     );
//     const aa = new SuffixArray2(array);
//     const hrstart = process.hrtime();
//     const bb = aa.findLCS();
//     const hrend = process.hrtime(hrstart);
//     times.push(hrend[0] + hrend[1] / 1000000);
//     console.info(
//       "building: %d %ds %dms",
//       lettersEach,
//       hrend[0],
//       hrend[1] / 1000000
//     );
//   }
//   allTimes.push({
//     N: i,
//     time: _.mean(times)
//   });
// }

function longestRepeatedSubstring(word: string) {
  const ff = new SuffixArray(word);
  const p = 2;
}

const aa = longestRepeatedSubstring("ABABBAABAA");
const gg = 2;
