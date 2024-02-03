// 'use client';
import './styles/book.scss';
import Image from 'next/image';
import Link from 'next/link';
import CartButton from './CartButton';
// import { useEffect, useState } from 'react';
import UpdateCartButton from './UpdateCartButton';

export default function Book({ book, token }) {
    // console.log('Token', book._id, token);
    // const check = book.orders.some((obj) => obj.user === token);

    return (
        <div className="books">
            {/* {check ? <p>yes</p> : ''} */}
            <Link href={`/catalog/${book._id}`}>
                <Image
                    src={book.image}
                    width={200}
                    height={300}
                    alt="Book Image"
                />
            </Link>
            <div className="buy">
                <p>{book.book_id}</p>
                <div>
                    <span className="price">${book.price}</span>
                    <button className="favorite--btn">
                        <Image
                            src={'/images/BOOKMARK_SIMPLE.svg'}
                            width={12}
                            height={18}
                            alt="Favorite"
                        />
                    </button>
                </div>
                {book.orders.length > 0 ? (
                    <UpdateCartButton quantity={book.orders[0].quantity} />
                ) : (
                    <CartButton bookId={book._id} />
                )}
            </div>
        </div>
    );
}
