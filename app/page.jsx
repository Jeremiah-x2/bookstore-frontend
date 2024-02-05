'use client';

import Image from 'next/image';
import './components/styles/page.scss';
import { Syne, Unica_One } from 'next/font/google';
import Book from './components/Book';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { useEffect, useState } from 'react';
import TrendingBook from './components/TrendingBook';
import Link from 'next/link';
import { sign, decode, verify } from 'jsonwebtoken';

const syne = Syne({ subsets: ['latin'], weight: ['500', '400', '600'] });
const unica = Unica_One({ subsets: ['latin'], weight: '400' });

async function getBooks() {
    const response = await fetch('http://localhost:5000/books', {
        next: { revalidate: 0 },
        credentials: 'include',
    });
    const data = await response.json();

    return data;
}

export default function Home() {
    const [data, setData] = useState();

    // console.log(data.result.slice(0, 3));
    // const [user, setUser] = useState(false);
    // const [token, setToken] = useState(null);
    useEffect(() => {
        async function parseData() {
            const token = window.localStorage.getItem('userToken');
            const res = await getBooks();
            await setData(res);
            console.log(res.result.slice(0, 1));
        }

        console.log('Cookie', document.cookie);
        // if (token) {
        //     try {
        //         const decodedToken = decode(token, 'hello');
        //         console.log(decodedToken.id);
        //         setToken(decodedToken.id);
        //     } catch (error) {
        //         console.log('Error', error);
        //     }
        // }

        parseData();
    }, []);
    return (
        <main>
            <section className={`hero ${syne.className}`}>
                <div className="left">
                    <p className={`what`}>What book you looking for?</p>
                    <p className="explore">
                        Explore our catalog and find your next read.
                    </p>
                    <div className="search">
                        <input
                            type="text"
                            placeholder="Type the name of book or author..."
                        />
                    </div>
                    <button className="btn--explore">
                        Explore{' '}
                        <Image
                            src={'/images/Binoculars.svg'}
                            width={24}
                            height={18}
                            alt="Binoculars"
                        />
                    </button>
                </div>
                <div className="right">
                    <Image
                        src={'/images/hero.svg'}
                        width={528}
                        height={538}
                        alt="hero"
                    />
                </div>
            </section>
            <section className={`trending--books ${unica.className}`}>
                <div className="heading">
                    <h4>TRENDING BOOKS</h4>
                    <p>Drag to explore</p>
                </div>
                <Splide
                    options={{ perPage: 5, wheel: true, pagination: false }}>
                    {data &&
                        data.result.slice(1, 20).map((item, index) => (
                            <SplideSlide key={index}>
                                <TrendingBook book={item} />
                            </SplideSlide>
                        ))}
                </Splide>
            </section>
            <section className="categories--section">
                <p>CATEGORIES</p>
                <div className="categories">
                    {[
                        'sports',
                        'trending',
                        'clothing',
                        'beauty',
                        'electronics',
                        'books',
                    ].map((item, index) => (
                        <Link
                            href={`/catalog/categories/${item}`}
                            key={index}>
                            <div
                                className="category"
                                key={index}>
                                {item.slice(0, 1).toUpperCase() + item.slice(1)}
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <section className={`romance ${unica.className}`}>
                <h4>Romance</h4>
                <Splide
                    options={{ pagination: false, perPage: 5, wheel: true }}>
                    {data &&
                        data.result.slice(0, 10).map((item, index) => (
                            <SplideSlide key={index}>
                                <Book
                                    book={item}
                                    // token={token}
                                />
                            </SplideSlide>
                        ))}
                </Splide>
            </section>

            <section className={`adventure ${unica.className}`}>
                <h4>Adventure</h4>
                <Splide
                    options={{ pagination: false, perPage: 5, wheel: true }}>
                    {data &&
                        data.result.slice(0, 10).map((item, index) => (
                            <SplideSlide key={index}>
                                <Book book={item} />
                            </SplideSlide>
                        ))}
                </Splide>
            </section>
        </main>
    );
}
