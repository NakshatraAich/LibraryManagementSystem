const mongoose = require("mongoose");

const { Schema } = mongoose; // corrected 'schema' to 'Schema'

const bookSchema = new Schema({
    isbn:{
        type: Number,
        required: true,
        validate: {
            validator: function(v) {
                return /^\d{13}$/.test(v); // Length limit of 13 for ISBN
            },
            message: props => `${props.value} is not a valid ISBN number!`
        }
    },
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: false
    },
    row: {
        type: Number,
        required: true,
        min: 1,
        max: 99 // Limit to 99
    },
    column: {
        type: Number,
        required: true,
        min: 1,
        max: 99 // Limit to 99
    },
    shelf:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true,
        enum: ['issued', 'non-issued'] // Status can only be 'issued' or 'non-issued'
    },
    lastIssuedDate:{
        type: Date,
        required: false,
    },
    lastReturnDate:{
        type: Date,
        required: false
    },
    lastIssuedBy:{
        type: String,
        required: false
    },
    issuerEmailID:{
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Book', bookSchema);
