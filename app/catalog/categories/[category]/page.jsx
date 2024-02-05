import Book from '@/app/components/Book';
import React from 'react';

async function getBooksByCategory() {
    const res = await fetch('http://localhost:5000/books', {
        credentials: 'include',
    });
    return res.json();
}

export default async function Category({ params }) {
    const response = await getBooksByCategory();
    const data = await response.result.filter(
        (item) => item.category === params.category
    );

    return (
        <div>
            {data.length}
            {data.map((item, index) => (
                <Book
                    book={item}
                    key={index}
                />
            ))}
        </div>
    );
}
