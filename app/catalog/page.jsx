'use client';

// import '../components/styles/catalog.scss';
import '../components/styles/catalog.scss';
import { Suspense, useEffect, useState } from 'react';
import Book from '../components/Book';
import Loading from './loading';
import { Syne } from 'next/font/google';
import { Categories } from '../components/CustomSelect';
import Image from 'next/image';

const syne = Syne({ subsets: ['latin'], weight: ['400', '500', '700'] });
async function getAllBooks() {
    const res = await fetch('http://localhost:5000/books', {
        credentials: 'include',
    });

    return res.json();
}

const options = ['Categories', 'Trending', 'Sports'];

export default function page() {
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
                        disabled={true}
                    />
                </div>
                <div className="filter">
                    <p>
                        Results <span>"NAME BOOK OR NAME AUTHOR"</span>
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
            <div className="books">
                {data && search === ''
                    ? data.result.slice(0, numOfBooks).map((item, index) => (
                          <Book
                              book={item}
                              key={index}
                          />
                      ))
                    : data &&
                      data.result
                          .filter(
                              (item) =>
                                  item.title
                                      .toLowerCase()
                                      .startsWith(search.toLowerCase()) ||
                                  item.author
                                      .toLowerCase()
                                      .startsWith(search.toLowerCase())
                          )
                          .slice(0, numOfBooks)
                          .map((item, index) => (
                              <Book
                                  book={item}
                                  key={index}
                              />
                          ))}
                {/* {data && JSON.stringify(data.result.slice(0, 2))} */}
            </div>
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
