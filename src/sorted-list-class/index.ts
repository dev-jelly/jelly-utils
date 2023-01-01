export class SortedList<T> {
  private list: T[] = [];

  constructor(private compare: (a: T, b: T) => number, existList?: T[]) {
    if (existList) {
      this.list = [...existList];
      this.list.sort(this.compare);
    }
  }

  add(item: T) {
    const index = this.binarySearch(item, 0, this.list.length);
    this.list.splice(index, 0, item);

  }

  private binarySearch(item: T, start: number, end: number): number {
    if (start === end) {
      return start;
    }
    const mid = Math.floor((start + end) / 2);
    const compareResult = this.compare(item, this.list[mid]);
    if (compareResult === 0) {
      return mid;
    } else if (compareResult > 0) {
      return this.binarySearch(item, mid + 1, end);
    } else {
      return this.binarySearch(item, start, mid);
    }
  }

  get(index: number) {
    return this.list[index];
  }

  find(item: T) {
    const index = this.binarySearch(item, 0, this.list.length);
    return this.list[index];
  }

  findIndex(item: T) {
    return this.binarySearch(item, 0, this.list.length);
  }

  remove(item: T) {
    const index = this.binarySearch(item, 0, this.list.length);
    this.list.splice(index, 1);
  }

  removeIndex(index: number) {
    this.list.splice(index, 1);
  }

  merge(list: SortedList<T>) {
    const newList = this.list.concat(list.list);
    newList.sort(this.compare);
    this.list = newList;
  }

  get length() {
    return this.list.length;
  }

  get array() {
    return this.list;
  }

  filteredArray(start: T, end?: T) {
    if (end) return this.list.slice(this.findIndex(start), this.findIndex(end));
    return this.list.slice(this.findIndex(start));
  }
}