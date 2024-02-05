'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import '@/app/components/styles/bookById.scss';
import { Syne, Unica_One } from 'next/font/google';
import CartButton from '@/app/components/CartButton';

const unica = Unica_One({ subsets: ['latin'], weight: '400' });
const syne = Syne({ subsets: ['latin'], weight: ['400', '500', '600'] });

async function getBookById(id) {
    const response = await fetch(`http://localhost:5000/books/${id}`, {
        credentials: 'include',
        next: { revalidate: 0 },
    });

    const result = await response.json();

    return result;
}

export default function BookDetails({ params }) {
    const [book, setBook] = useState(null);
    useEffect(() => {
        async function getABook() {
            const bookById = await getBookById(params.bookId);
            setBook(bookById);
        }
        getABook();
    }, []);
    return (
        <>
            {book && (
                <section className={`${syne.className}`}>
                    {JSON.stringify(book)}
                    <div className="product--details">
                        <Image
                            src={book.item.image}
                            width={280}
                            height={418}
                            alt="Book Image"
                        />
                        <div className="book--details">
                            <div className={`title ${unica.className}`}>
                                <h5>{book.item.title}</h5>
                            </div>
                            <p className="author">Author: {book.item.author}</p>
                            <p className="about--book">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Aspernatur, neque molestiae
                                sit veritatis commodi vitae, facere quas
                                obcaecati aliquid porro nihil aperiam. Magnam,
                                tenetur.
                            </p>
                            <div className={`purchase ${syne.className}`}>
                                <div>
                                    <span className="price">
                                        ${book.item.price}
                                    </span>
                                    <div
                                        className={`order--count ${unica.className}`}>
                                        <span className="reduce">-</span>
                                        <span className="count">
                                            {book.order.quantity}
                                        </span>
                                        <span className="add">+</span>
                                    </div>
                                </div>
                                <div className={`cart--buy`}>
                                    {/* <button className="cart">
                                        <Image
                                            src={'/images/SHOPPING_CART.svg'}
                                            width={20}
                                            height={20}
                                            alt="Shopping Cart"
                                        />
                                    </button> */}
                                    <CartButton bookId={book.item._id} />
                                    <button className={`buy ${syne.className}`}>
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div></div>
                </section>
            )}
        </>
    );
}
