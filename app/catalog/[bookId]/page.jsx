import React from 'react';
import BookById from '../../components/BookById';

async function getBookById(id) {
    const response = await fetch(`http://localhost:5000/books/${id}`);

    const result = await response.json();

    return result;
}

export default async function BookDetails({ params }) {
    const bookById = await getBookById(params.bookId);
    return (
        <div>
            {/* {JSON.stringify(params)} */}
            <BookById book={bookById.item} />
        </div>
    );
}
