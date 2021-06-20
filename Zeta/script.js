// Import stylesheets
import "./style.css";

//implementing a linkedlist

function Node(data, next) {
  this.data = data;
  this.next = next;
}

class LinkedList {
  constructor(data) {
    this.head = new Node(data, null);
    this.length = 0;
  }

  add = (data) => {
    const node = new Node(data, null);
    let start = this.head;
    while (start.next) {
      start = start.next;
    }
    start.next = node;
  };

  print = () => {
    let start = this.head;
    while (start) {
      console.log(start.data, "list data");
      start = start.next;
    }
  };
  remove = (index) => {
    // if (index == 0) {
    //   const data = this.head.data;
    //   this.head = this.head.next;
    //   return data;
    // }
    let i = 0;
    let curr = this.head;
    let prev = this.head;
    while (curr) {
      if (i === index) {
        const d = curr.data;
        prev.next = curr.next;
        return d;
      }
      prev = curr;
      curr = curr.next;
      i++;
    }
  };
}

const myLinkedlist = new LinkedList(4);
myLinkedlist.add(5);
myLinkedlist.add(3);
myLinkedlist.add(1);
myLinkedlist.print();
myLinkedlist.remove();

/**
 * Web components
 * Flexbox
 * Debounce/throttle
 *
 * Director Round *****
 *
 * Concurrency vs Parallelism
 * Given t1, t2 t3,  t4, t5  (t1, t2 parallely) (t3, t4 synchronously) (t5 after t1, t2, t3,  t4 gets completed)(Using callbacks, promises)
 */
