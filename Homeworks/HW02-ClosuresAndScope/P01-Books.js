/**
 * Created by Panglot on 31-Aug-16.
 */
/* Task Description */
/*
 *	Create a module for working with books
 *	The module must provide the following functionalities:
 *	Add a new book to category
 *	Each book has unique title, author and ISBN
 *	It must return the newly created book with assigned ID
 *	If the category is missing, it must be automatically created
 *	List all books
 *	Books are sorted by ID
 *	This can be done by author, by category or all
 *	List all categories
 *	Categories are sorted by ID
 *	Each book/category has a unique identifier (ID) that is a number greater than or equal to 1
 *	When adding a book/category, the ID is generated automatically
 *	Add validation everywhere, where possible
 *	Book title and category name must be between 2 and 100 characters, including letters, digits and special characters ('!', ',', '.', etc)
 *	Author is any non-empty string
 *	Unique params are Book title and Book ISBN
 *	Book ISBN is an unique code that contains either 10 or 13 digits
 *	If something is not valid - throw Error
 */
function solve() {

    var library = (function () {
        var books = [];
        var categories = [];

        function listBooks() {
            return books;
        }

        function addCategory(categoryToAdd) {
            categoryToAdd.ID = categories.length + 1;
            categories.push(categoryToAdd);
            return categoryToAdd;
        }

        function addBook(bookToAdd) {
            books.forEach(function (currentBook) {
                if (currentBook.title === bookToAdd.title &&
                    currentBook.author === bookToAdd.author &&
                    currentBook.ISBN === bookToAdd.ISBN) {
                    throw 'Error: This book exists in the database. New books should be unique.';
                }
            })
            if(10 > bookToAdd.ISBN.length || bookToAdd.ISBN.length > 13){
                throw  'Error: Invalid ISBN. ISBN must be between 10 and 13 symbols.';
            }

            bookToAdd.ID = books.length + 1;
            books.push(bookToAdd);
            return bookToAdd;
        }

        function listCategories() {
            return categories;
        }

        return {
            books: {
                list: listBooks,
                add: addBook
            },
            categories: {
                list: listCategories,
                add: addCategory
            }
        };
    })();


    library.books.add({title: "Harry Potter and the sorcerer's stone", author: "J.K. Rowling", ISBN: "15A23"});
    library.books.add({title: "Harry Potter and the chamber of secrets", author: "J.K. Rowling", ISBN: "15A23"});
    library.books.add({title: "Harry Potter and the prisoner of Azkaban", author: "J.K. Rowling", ISBN: "15A23"});
    library.books.add({title: "Harry Potter and the Goblet of fire", author: "J.K. Rowling", ISBN: "15A23"});

    console.log(library.books.list());


    return library;
}

solve();