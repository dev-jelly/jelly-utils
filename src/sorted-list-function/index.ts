type SortedList<T> = {
  add: (item: T) => void;
  get: (index: number) => T;
  find: (item: T) => number;
  findIndex: (item: T) => number;
  remove: (item: number) => void;
  removeIndex: (index: number) => void;
  length: number;
}

const binarySearch = <T>(list: T[], compare, value: T): number => {
  let start = 0;
  let end = list.length;
  while (start < end) {
    const mid = Math.floor((start + end) / 2);
    const compareResult = compare(value, list[mid]);
    if (compareResult === 0) {
      return mid;
    } else if (compareResult > 0) {
      start = mid + 1;
    } else {
      end = mid;
    }
  }
  return start;
}

export const sortedList = <T>(compare: (a: T, b: T) => number): SortedList<T> => {
  let list: T[] = [];
  return {
    add: (item: T) => {
      const index = binarySearch(list, compare, item);
      list.splice(index, 0, item);
    },
    get: (index: number) => list[index],
    find: (item: T) => list[binarySearch(list, compare, item)],
    findIndex: (item: T) => binarySearch(list, compare, item),
    remove: (item: T) => {
      const index = binarySearch(list, compare, item);
      list.splice(index, 1);
    },
    removeIndex: (index: number) => list.splice(index, 1),
    get array () {
      return list;
    },
    get length() {
      return list.length;
    },
  };
}

