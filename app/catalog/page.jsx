'use client';

import '../components/styles/catalog.scss';
import { Suspense, useEffect, useState } from 'react';
import Book from '../components/Book';
import Loading from './loading';
import { Syne } from 'next/font/google';
import { Categories } from '../components/CustomSelect';
import Image from 'next/image';
import Link from 'next/link';

const syne = Syne({ subsets: ['latin'], weight: ['400', '500', '700'] });
async function getAllBooks() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
        credentials: 'include',
    });

    return res.json();
}

const options = [
    'Categories',
    'Trending',
    'Sports',
    'Beauty',
    'Electronics',
    'Books',
    'Clothing',
];

export default function Catalog() {
    const [data, setData] = useState(null);
    const [numOfBooks, setNumOfBooks] = useState(20);
    const [search, setSearch] = useState('');
    const [categoriesCurrentValue, setcategoriesCurrentValue] = useState(
        options[0]
    );

    useEffect(() => {
        async function setBooksData() {
            const books = await getAllBooks();
            setData(books);
        }
        setBooksData();
    }, []);

    return (
        <section className="all--books">
            <div className="search--books">
                <div className="search--input">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        name="search"
                        placeholder="Type the name of book or author..."
                        // disabled={true}
                    />
                    {search !== '' &&
                        data.result.filter(
                            (item) =>
                                item.title.startsWith(search) ||
                                item.author.startsWith(search)
                        ).length !== 0 && (
                            <div className="search--result">
                                {data &&
                                    data.result
                                        .filter(
                                            (item) =>
                                                item.title.startsWith(search) ||
                                                item.author.startsWith(search)
                                        )
                                        .map((item, index) => (
                                            <Link
                                                href={`/catalog/${item._id}`}
                                                key={index}>
                                                <div>
                                                    <Image
                                                        src={item.image}
                                                        width={50}
                                                        height={100}
                                                        alt="Image"
                                                    />
                                                    <div>
                                                        <p>{item.title}</p>
                                                        <p>{item.author}</p>
                                                        <p>{item.price}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                            </div>
                        )}
                </div>
                <div className="filter">
                    <p>
                        Results <span>NAME BOOK OR NAME AUTHOR</span>
                    </p>
                    <div className="filters">
                        <Categories
                            options={options}
                            currentValue={categoriesCurrentValue}
                            setcategoriesCurrentValue={
                                setcategoriesCurrentValue
                            }
                        />
                    </div>
                </div>
            </div>
            {data && (
                <div className="books">
                    {categoriesCurrentValue === 'Categories'
                        ? data.result
                              .slice(0, numOfBooks)
                              .map((item, index) => (
                                  <Book
                                      book={item}
                                      key={index}
                                  />
                              ))
                        : data.result
                              .filter(
                                  (item) =>
                                      item.category ===
                                      categoriesCurrentValue.toLowerCase()
                              )
                              .slice(0, numOfBooks)
                              .map((item, index) => (
                                  <Book
                                      book={item}
                                      key={index}
                                  />
                              ))}
                </div>
            )}
            <div className="more">
                <button
                    onClick={() => setNumOfBooks((prev) => prev + 10)}
                    className={`${syne.className}`}>
                    See More{' '}
                    <Image
                        src={'/images/arrow-down.svg'}
                        width={16}
                        height={8}
                        alt="Arrow down"
                    />
                </button>
            </div>
        </section>
    );
}
