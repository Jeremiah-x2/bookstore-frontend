'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import '@/app/components/styles/bookById.scss';
import { Syne, Unica_One } from 'next/font/google';
import CartButton from '@/app/components/CartButton';
import { usePathname, useRouter } from 'next/navigation';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const unica = Unica_One({ subsets: ['latin'], weight: '400' });
const syne = Syne({ subsets: ['latin'], weight: ['400', '500', '600'] });

async function getBookById(id) {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/books/${id}`,
            {
                credentials: 'include',
                next: { revalidate: 0 },
            }
        );
        if (response.status === 200) {
            const result = await response.json();
            console.log(result);

            return result;
        }
        if (response.status === 500) {
        }
    } catch (error) {
        console.log(error);
    }
}

export default function BookDetails({ params, showCart }) {
    const [book, setBook] = useState(null);
    const router = useRouter();
    const path = usePathname();

    async function addItem() {
        const request = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/orders/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ book: book._id }),
            }
        );
        const response = await request.json();
        console.log(response);
        // router.refresh();
        // router.push(`/catalog/${book._id}`);
        // if (request.status === 201) {
        //     setOrderQuantity(1);
        // }

        console.log(request.status);
    }

    useEffect(() => {
        async function getABook() {
            const bookById = await getBookById(params.bookId);
            await setBook(bookById);
        }
        getABook();
    }, []);
    return (
        <>
            {book ? (
                <section className={`${syne.className}`}>
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
                                    <button className={`buy ${syne.className}`}>
                                        <Link
                                            href={'/checkout'}
                                            onClick={addItem}>
                                            Buy Now
                                        </Link>
                                    </button>
                                </div>
                                <CartButton book={book} />
                                <div className={`cart--buy`}>
                                    {/* {book.orders && (
                                        <>
                                            <CartButton book={book} />
                                        </>
                                    )} */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`details ${unica.className}`}>
                        {/* {JSON.stringify(Object.entries(book))} */}
                        {Object.entries(book)
                            .filter(
                                (item) =>
                                    item[0] !== '_id' &&
                                    item[0] !== 'stock_quantity' &&
                                    item[0] !== 'image' &&
                                    item[0] !== 'book_id'
                            )
                            .map((item, index) => (
                                <div key={index}>
                                    <span>{item[0]}:</span>
                                    {item[1]}
                                </div>
                            ))}
                    </div>

                    <div className="more"></div>
                </section>
            ) : (
                <BookByIdSkeleton />
            )}
        </>
    );
}

function BookByIdSkeleton() {
    return (
        <div className="book--skeleton">
            <div className="top">
                <div className="image">
                    <Skeleton height={'100%'} />
                </div>
                <div className="book--desc">
                    <h4>
                        <Skeleton height={'100%'} />
                    </h4>
                    <p className="title">
                        <Skeleton height={'100%'} />
                    </p>
                    <p className="desc">
                        <Skeleton height={'100%'} />
                    </p>
                    <div>
                        <Skeleton height={'100%'} />
                    </div>
                    <div>
                        <Skeleton />
                    </div>
                </div>
            </div>
        </div>
    );
}
