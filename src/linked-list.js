const Node = require('./node');

class LinkedList {
  constructor() {
    this.clear();
  }

  append(data) {
    if (this.isEmpty()) {
      this._head = new Node(data);
      this._tail = this._head;
    } else {
      this._tail.next = new Node(data, this._tail);
      this._tail = this._tail.next;
    }
    this.length += 1;
    return this;
  }

  head() {
    return this._head ? this._head.data : null;
  }

  tail() {
    return this._tail ? this._tail.data : null;
  }

  nodeAt(index) {
    let node = this._head;

    for (let i = 0; i < index; i += 1) {
      node = node.next;
    }

    return node;
  }

  at(index) {
    return this.nodeAt(index).data;
  }

  insertAt(index, data) {
    if (this.isEmpty() && index === 0) {
      this.append(data);
      return this;
    }

    if (index === 0) {
      this._head.prev = new Node(data, null, this._head);
      this._head = this._head.prev;
      return this;
    }

    if (index === this.length) {
      this._tail.next = new Node(data, this._tail, null);
      this._tail = this._tail.next;
      return this;
    }

    const temp = this.nodeAt(index);
    temp.prev = new Node(data, temp.prev, temp);
    temp.prev.prev.next = temp.prev;
    return this;
  }

  isEmpty() {
    return this.length === 0;
  }

  clear() {
    this._head = null;
    this._tail = null;
    this.length = 0;
    return this;
  }

  deleteAt(index) {
    if (this.length === 1) {
      this.clear();
      return this;
    }

    if (index === 0) {
      this._head.next.prev = null;
      this._head = this._head.next;
      this.length -= 1;
      return this;
    }

    if (index === this.length - 1) {
      this._tail.prev.next = null;
      this._tail = this._tail.prev;
      this.length -= 1;
      return this;
    }

    const temp = this.nodeAt(index);
    temp.prev.next = temp.next;
    temp.next.prev = temp.prev;
    this.length -= 1;
    return this;
  }

  reverse() {
    let node = this._tail;
    let temp;

    while (node) {
      temp = node.prev;
      node.prev = node.next;
      node.next = temp;
      node = node.next;
    }

    temp = this._head;
    this._head = this._tail;
    this._tail = temp;
    return this;
  }

  indexOf(data) {
    let node = this._head;

    for (let i = 0; i < this.length; i += 1) {
      if (node.data === data) return i;
      node = node.next;
    }

    return -1;
  }
}

module.exports = LinkedList;
