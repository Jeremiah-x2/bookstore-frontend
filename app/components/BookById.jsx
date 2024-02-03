import React from 'react';
import Image from 'next/image';
import './styles/bookById.scss';
// import { syne, unica } from '../layout';
import { Syne, Unica_One } from 'next/font/google';
import CartButton from './CartButton';

const unica = Unica_One({ subsets: ['latin'], weight: '400' });
const syne = Syne({ subsets: ['latin'], weight: ['400', '500', '600'] });

export default function BookById({ book }) {
    return (
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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Aspernatur, neque molestiae sit veritatis commodi vitae,
                        facere quas obcaecati aliquid porro nihil aperiam.
                        Magnam, tenetur.
                    </p>
                    <div className={`purchase ${syne.className}`}>
                        <div>
                            <span className="price">${book.price}</span>
                            <div className={`order--count ${unica.className}`}>
                                <span className="reduce">-</span>
                                <span className="count">0</span>
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
                            <CartButton bookId={book._id} />
                            <button className={`buy ${syne.className}`}>
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div></div>
        </section>
    );
}
