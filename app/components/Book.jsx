// 'use client';
import './styles/book.scss';
import Image from 'next/image';
import Link from 'next/link';
import CartButton from './CartButton';
import UpdateCartButton from './UpdateCartButton';

export default function Book({ book }) {
    // console.log(book);
    return (
        <div className="books--item">
            {/* {JSON.stringify(book)} */}
            <Link href={`/catalog/${book._id}`}>
                <Image
                    src={book.image}
                    width={200}
                    height={300}
                    alt="Book Image"
                />
            </Link>
            <div className="buy">
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
                <CartButton book={book} />
            </div>
        </div>
    );
}
