/**
 * Point
 *
 * @param {number} x
 * @param {number} y
 */
export class Point {
    constructor(x , y) {
        if (!x || !y ) {
             throw new NullPointerException("please stop");
        }
        this.x = x;
        this.y = y;
    }
    plus(point) {
        return new Point(this.x + point.x , this.y + point.y)
    }
}
/**
 * Speaker and Screamer
 */
export function Speaker(name , verb) {
    if (!name) {
        throw new Error('please stop')
    }
    this.name = name;
    this.verb = verb || "says";
}
Speaker.prototype.speak = function (text) {
    console.log(this.name + " " + this.verb + " " + text)
}
export function Screamer(name) {
    Speaker.call(this , name , "shouts");
}
Screamer.prototype = Object.create(Speaker.prototype)
Screamer.prototype.speak = function (text) {
    Speaker.prototype.speak.call(this , text.toUpperCase());
}
/**
 * Speaker and Screamer ES6
 */
/*
export class Speaker {
    constructor(name) {
       if (name==null) throw new Error("please stop");
      this.name = name
    }
    get verb() {
      return "says"
    }
    speak(text) {
   console.log(this.name + " " + this.verb + " " + text)
    }
  }
 export class Screamer extends Speaker {
    constructor(name) {
      super(name)
    }
    get verb() {
      return "shouts"
    }
    speak(text) {
      super.speak(text.toUpperCase())
    }
  }
  */
/**
 * The Reading list
 */
export class BookList {
    constructor() {
        this.booksFinished = 0
        this.booksNotFinished = 0
        this.currentBook = null
        this.nextBook = null
        this.lastBook = null
        this.books = []
    }
    add(book) {
        if (book.title == null) {
            throw new Error("please stop");
        }
        this.books.push(book);
        if (this.books.length == 1) {
            this.currentBook = book;
        }
        this.nextBook = this.books.filter((book) => book.read === false)[1];
    }
    startReadingFirstBook() {
        if (this.books.length > 0) {
            this.currentBook = this.books.find((book) => book.read === false);
        }
    }
    finishCurrentBook() {
        this.currentBook.markAsRead();
        this.currentBook.dateRead = new Date();
        this.lastBook = this.currentBook;
        this.currentBook = this.books.find((book) => book.read === false);
    }
}
export class Book {
    constructor({title , genre = 'BookGenre' , author , isRead = false , dateFinished = null}) {
        if (!title) {
            throw new Error("please stop");
        }
        this.title = title;
        this.genre = genre;
        this.author = author;
        this.isRead = isRead; 
        this.dateFinished = dateFinished;
    }
    get read() {
        return this.isRead;
    }
    markAsRead() {
        this.isRead = true;
        this.dateRead(new Date(Date.now()));
    }
    dateRead = (newDate) => {
        this.dateFinished = newDate;
    }
}
