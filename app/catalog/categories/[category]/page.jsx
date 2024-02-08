'use client';
import '@/app/components/styles/categories.scss';
import Book from '@/app/components/Book';
import React, { useEffect, useState } from 'react';

async function getBooksByCategory() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
        credentials: 'include',
        next: {
            revalidate: 0,
        },
    });

    return res.json();
}

export default function Category({ params }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function getBooksByCategories() {
            const response = await getBooksByCategory();
            const data = await response.result.filter(
                (item) => item.category === params.category
            );
            setData(data);
        }
        getBooksByCategories();
    }, []);

    return (
        <div className="books--categories">
            {data &&
                data.map((item, index) => (
                    <Book
                        book={item}
                        key={index}
                    />
                ))}
        </div>
    );
}
