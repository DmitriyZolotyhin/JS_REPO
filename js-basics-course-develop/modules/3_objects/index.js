/**
 * Array to List
 */
export const arrayToList = (arr) => {
  return arr.reduceRight((rest, value) => ({ value, rest }), null);
};
export const listToArray = (list) => {
  let array = [];
  let item = list;
  while (item) {
      array.push(item.value);
      item = item.rest;
  }
  return array;
};
/**
* Keys and values to list
*/
export const getKeyValuePairs = (obj) => {
  return Object.entries(obj);
}
/**
* Invert keys and values
*/
export const invertKeyValue = (obj) => {
  return Object.fromEntries(Object.entries(obj).map(pair => pair.reverse()));
};
/**
* Get all methods from object
*/
export const getAllMethodsFromObject = (obj) => {
  return Object.getOwnPropertyNames(obj).filter(elem => obj[elem] instanceof Function);
};
/**
* Clock 
*/
function Clock() {
  this.run = function () {
    let getTime = function () {
      let date = new Date();
      let time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
      console.log(time);
    }
    this.timer = setInterval(getTime, 1000);
  }
  this.stop = function () { clearInterval(this.timer); }
}
/**
* Groups
*/
export class Groups {
  constructor() {
    this.members = [];
    this.length = this.members.length;
  }
  static from(array) {
    let group = new Groups();
    for (let elem of array) {
      group.add(elem);
    }
    return group;
  }
  add(elem) {
    if (!this.has(elem)) {
      this.members.push(elem);
      this.length = this.members.length;
    }
  }
  has(elem) {
    return this.members.includes(elem);
  }
  delete(elem) {
    if (this.has(elem)) {
      let index = this.members.indexOf(elem);
      this.members.splice(index, 1);
      this.length = this.members.length;
    }
  }
}