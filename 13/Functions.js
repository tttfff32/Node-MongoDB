const newWorker = (id, name, age) => {
    const myId = id;
    const myName = name;
    const myAge = age;
    const myNewWorker = { myId, myName, myAge }
    if(id===null|| name===null|| age===null|| id===undefined|| name===undefined|| age===undefined)
      return false;
    return myNewWorker;
 
}
const myLibraryArrey = [];
const takeLibrary = (bookID, userID) => {
    const newUse = { book: bookID, user: userID }
    const findBook = myLibraryArrey.find(b => b.book === bookID || b.user === userID)
    if (!findBook) {
        myLibraryArrey.push(newUse);
        console.log(myLibraryArrey);
        return true;
    }
    return false;
}
const returnLibrary = (bookID, userID) => {
    const findBook = myLibraryArrey.find(b => b.book === bookID && b.user === userID)
    if (findBook) {
        const x = myLibraryArrey.findIndex(b => b.book === bookID && b.user === userID);
        myLibraryArrey.splice(x,1);
        console.log(myLibraryArrey);
        return true;
    }
    return false;
}
console.log(myLibraryArrey);
// console.log(newWorker(1, 'tirza', 20));
console.log(takeLibrary('tehilim', 2));
console.log(takeLibrary('book', 3));
console.log(returnLibrary('tehilim', 2));

module.exports={
    newWorker,returnLibrary,takeLibrary
}