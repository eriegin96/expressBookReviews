const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',async function (req, res) {
    let myPromise1 = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve(books)
        },1000)})
    const bookPromise = await myPromise1

    res.send(JSON.stringify(bookPromise,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',async function (req, res) {
    let myPromise1 = new Promise((resolve,reject) => {
        setTimeout(() => {
            const isbn = req.params.isbn;
          resolve(books[isbn])
        },1000)})
    const bookPromise = await myPromise1
   
    res.send(bookPromise)
});
  
// Get book details based on author
public_users.get('/author/:author',async function (req, res) {
    let myPromise1 = new Promise((resolve,reject) => {
        setTimeout(() => {
            const author = req.params.author;
            const bookIsbn = Object.keys(books).find((isbn) => books[isbn].author === author)
          resolve(books[bookIsbn])
        },1000)})
    const bookPromise = await myPromise1
   
    res.send(bookPromise)
});

// Get all books based on title
public_users.get('/title/:title',async function (req, res) {
    let myPromise1 = new Promise((resolve,reject) => {
        setTimeout(() => {
            const title = req.params.title;
            const bookIsbn = Object.keys(books).find((isbn) => books[isbn].title === title)
          resolve(books[bookIsbn])
        },1000)})
    const bookPromise = await myPromise1

    res.send(bookPromise)
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn].reviews)
});

module.exports.general = public_users;
