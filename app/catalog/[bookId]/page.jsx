'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '@/app/components/styles/bookById.scss';
import { Syne, Unica_One } from 'next/font/google';
import CartButton from '@/app/components/CartButton';
import UpdateCartButton from '@/app/components/UpdateCartButton';

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
                            src={book.image}
                            width={280}
                            height={418}
                            alt="Book Image"
                        />
                        <div className="book--details">
                            <div className={`title ${unica.className}`}>
                                <h5>{book.title}</h5>
                            </div>
                            <p className="author">Author: {book.author}</p>
                            <p className="about--book">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Aspernatur, neque molestiae
                                sit veritatis commodi vitae, facere quas
                                obcaecati aliquid porro nihil aperiam. Magnam,
                                tenetur.
                            </p>
                            <div className={`purchase ${syne.className}`}>
                                <div>
                                    <span className="price">${book.price}</span>
                                    {book.orders && (
                                        <></>
                                        // <div
                                        //     className={`order--count ${unica.className}`}>
                                        //     <span className="reduce">-</span>
                                        //     <span className="count">
                                        //         {book.orders.quantity}
                                        //     </span>
                                        //     <span className="add">+</span>
                                        // </div>
                                        // <UpdateCartButton />
                                    )}
                                </div>
                                <div className={`cart--buy`}>
                                    {book.orders && (
                                        <>
                                            {/* {JSON.stringify(book)} */}
                                            <CartButton book={book} />
                                        </>
                                    )}
                                    <button className={`buy ${syne.className}`}>
                                        <Link href={'/checkout'}>Buy Now</Link>
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
