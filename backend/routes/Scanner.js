const express = require("express")
const router = express.Router()
const book = require("../models/booksModel")

// GET all books
router.get("/", async (req, res) => {
    try {
        const allBooks = await book.find({});
        res.json(allBooks);
    } catch(error) {
        res.json({ error: error.message });
    }
});


// GET all issued books' status
router.get("/issued", async (req,res) =>{
    try{
        const issuedBooks = await book.find({ status: "issued" });
        res.json((issuedBooks));
    } catch(error) {
        res.json({error: error.message});
    }
})

// POST a new book
router.post("/single", async (req, res) => {
    const {isbn, title, genre, row, column, shelf, status} = req.body;

    try{
        const entry = await book.create({isbn, title, genre, row, column, shelf, status});
        res.status(200).json(entry);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// POST multiple books at once
router.post("/bulk", async (req, res) => {
    const booksData = req.body; // Array of book objects

    try {
        // Validate if booksData is an array
        if (!Array.isArray(booksData)) {
            return res.status(400).json({ error: "Invalid request body. Expected an array of book objects." });
        }

        // Create multiple books
        const createdBooks = await Promise.all(booksData.map(async (bookData) => {
            const { isbn, title, genre, row, column, shelf, status, lastIssuedDate, lastReturnDate, lastIssuedBy, issuerEmailID} = bookData;
            return await book.create({ isbn, title, genre, row, column, shelf, status, lastIssuedDate, lastReturnDate, lastIssuedBy, issuerEmailID});
        }));

        res.status(200).json(createdBooks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// find the status of book
// Route for returning a book
router.post("/return", async (req, res) => {
    const { isbn } = req.body;

    try {
        const foundBook = await book.findOne({ isbn });

        if (!foundBook) {
            return res.status(404).json({ error: "Book not found" });
        }

        if (foundBook.status !== "issued") {
            return res.status(400).json({ error: "Book is not currently issued" });
        }

        const updatedFields = {
            status: "non-issued",
            lastReturnDate: new Date(),
        };

        await foundBook.updateOne(updatedFields);

        res.status(200).json({ status: updatedFields.status });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route for issuing a book
router.post("/issue", async (req, res) => {
    const { isbn, name, email } = req.body;

    try {
        const foundBook = await book.findOne({ isbn });

        if (!foundBook) {
            return res.status(404).json({ error: "Book not found" });
        }

        if (foundBook.status === "issued") {
            return res.status(400).json({ error: "Book is already issued" });
        }

        const updatedFields = {
            status: "issued",
            lastIssuedDate: new Date(),
            lastIssuedBy: name, // Use provided name for last issued by
            issuerEmailID: email // Use provided email as issuer's email
        };

        await foundBook.updateOne(updatedFields);

        res.status(200).json({ status: updatedFields.status });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;