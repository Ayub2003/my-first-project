class LinkedListNode<T> {
  next: LinkedListNode<T> | null;
  prev: LinkedListNode<T> | null;
  value: T | null;

  constructor(
    value: T | null = null,
    next: LinkedListNode<T> | null = null,
    prev: LinkedListNode<T> | null = null
  ) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}

export class LinkedList<T> {
  private head: LinkedListNode<T>;
  private tail: LinkedListNode<T>;
  private currentNode: LinkedListNode<T>;
  private size: number;

  constructor(
    size: number,
    doubleLinked: boolean = true,
    dataArray: Array<T> = []
  ) {
    this.head = new LinkedListNode<T>();
    this.tail = this.head;
    this.currentNode = this.head;
    this.size = size;

    this.init(doubleLinked, dataArray);
  }

  private init(doubleLinked: boolean, dataArray: Array<T>): void {
    this.head = new LinkedListNode<T>(null, null, null);
    this.currentNode = this.head;
    this.currentNode.value = dataArray[0];
    this.tail = this.head;

    if (doubleLinked) {
      for (let i = 1; i < this.size; i++) {
        const nextNode = new LinkedListNode<T>(null, null, this.currentNode);
        this.currentNode.next = nextNode;
        this.currentNode = this.currentNode.next;
        this.currentNode.value = dataArray[i];
        this.tail = nextNode;
      }
    }

    this.currentNode = this.head;

    console.log('current', this.currentNode);
    console.log('head', this.head);
    console.log('teail', this.tail);
  }

  ///Нужно возвращать LinkedList, а не LinkedListNode в методах

  public setValue(value: T | null): LinkedList<T> {
    this.currentNode.value = value;

    return this;
  }

  public toNext(): LinkedList<T> {
    if (!this.currentNode.next) {
      this.currentNode = this.head;
      return this;
    }

    this.currentNode = this.currentNode.next;
    return this;
  }

  public toPrev(): LinkedList<T> {
    if (!this.currentNode.prev) {
      this.currentNode = this.tail;
      return this;
    }

    this.currentNode = this.currentNode.prev;
    return this;
  }

  public toHead(): LinkedList<T> {
    this.currentNode = this.head;
    return this;
  }

  public toTail(): LinkedList<T> {
    this.currentNode = this.tail;
    return this;
  }

  public getValue(): T | null {
    return this.currentNode.value;
  }

  public getSize(): number {
    return this.size;
  }

  //В методах shift и pop нужно проверять, что currentNode не указывает на удаленный элемент

  public push(value: T | null): void {
    this.tail.next = new LinkedListNode<T>(value, null, this.tail);
    this.tail = this.tail.next;
    this.size++;
  }

  public pop(): void {
    if (this.tail.prev) {
      this.tail = this.tail.prev;
      this.tail.next = null;
      this.size--;
    } else {
      this.head = new LinkedListNode<T>(null, null, null);
      this.tail = this.head;
      this.size = 1;
    }
  }

  public unshift(value: T | null) {
    const newHead: LinkedListNode<T> = new LinkedListNode<T>(
      value,
      this.head,
      null
    );
    this.head.prev = newHead;
    this.head = newHead;
    this.size++;
  }

  public shift() {
    if (this.head.next) {
      this.head = this.head.next;
      this.head.prev = null;
      this.size--;
    } else {
      this.head = new LinkedListNode<T>(null, null, null);
      this.tail = this.head;
      this.size = 1;
    }
  }

  public fill(value: T | null): void {
    this.currentNode = this.head;
    for (let i = 0; i < this.size - 1; i++) {
      this.setValue(value);
      this.toNext();
    }
  }

  public clone(): LinkedList<T> {
    return new LinkedList<T>(1);
  }

  public forEach(callback: (value: T | null) => T | null): void {
    this;
  }
}
