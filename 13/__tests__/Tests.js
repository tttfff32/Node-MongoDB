const {newWorker,takeLibrary,returnLibrary}=require('../Functions')
const { expect, test } = require('@jest/globals');

 const tryTest=()=>{
  test('should create a new worker object', () => {
    const id = 1;
    const name = 'John Doe';
    const age = 30;
    const expected = {
      myId: id,
      myName: name,
      myAge: age,
    };
    const actual = newWorker(id, name, age);
    console.log(expect(actual).toEqual(expected));
  });

  test('should return false  if not a perfect worker object', () => {
    const id = 1;
    const name = 'John Doe';
    const expected = false;
    const actual = newWorker(id, name);
    expect(actual).toEqual(expected);
  });

  
  test('should return true if book is successfully borrowed', () => {
    const bookID = 1;
    const userID = 2;
    const expected = true;
    const actual = takeLibrary(bookID, userID);
    expect(actual).toBe(expected);
  });
  
  test('should return false if book is already borrowed', () => {
    const bookID = 1;
    const userID1 = 2;
    const userID2 = 3;
    takeLibrary(bookID, userID1);
    const expected = false;
    const actual = takeLibrary(bookID, userID2);
    expect(actual).toBe(expected);
  });
  
  test('should return false if user already borrowed a book', () => {
    const bookID1 = 1;
    const bookID2 = 2;
    const userID = 2;
    takeLibrary(bookID1, userID);
    const expected = false;
    const actual = takeLibrary(bookID2, userID);
    expect(actual).toBe(expected);
  });
  test('should return true if book is successfully returned', () => {
    const bookID = 1;
    const userID = 2;
    takeLibrary(bookID, userID);
    const expected = true;
    const actual = returnLibrary(bookID, userID);
    expect(actual).toBe(expected);
  });
  

  test('should return false if book was not borrowed by user', () => {
    const bookID = 1;
    const userID1 = 2;
    const userID2 = 3;
    takeLibrary(bookID, userID1);
    const expected = false;
    const actual = returnLibrary(bookID, userID2);
    expect(actual).toBe(expected);
  });
    
}

tryTest();
