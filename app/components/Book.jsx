// 'use client';
import './styles/book.scss';
import Image from 'next/image';
import Link from 'next/link';
import CartButton from './CartButton';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Book({ book }) {
    return (
        <div className="books--item">
            <Skeleton containerClassName="flex-1" />
            <Link href={`/catalog/${book._id}`}>
                <Image
                    src={book.image}
                    width={200}
                    height={300}
                    alt="Book Image"
                />
                <div className="about">
                    <p>
                        Title <span>{book.title.slice(0, 20)}</span>
                    </p>
                    <p>
                        Author <span>{book.author}</span>
                    </p>
                </div>
            </Link>
            <div className="buy">
                <div>
                    <span className="price">${book.price}</span>
                </div>
                <CartButton book={book} />
            </div>
        </div>
    );
}
