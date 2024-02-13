'use client';

import './components/styles/page.scss';
import Link from 'next/link';
import Image from 'next/image';
import Book from './components/Book';
import { Syne, Unica_One } from 'next/font/google';
import '@splidejs/react-splide/css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useContext, useEffect, useState } from 'react';
import TrendingBook from './components/TrendingBook';
import { pageTriggerContext } from './layout';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const syne = Syne({ subsets: ['latin'], weight: ['500', '400', '600'] });
const unica = Unica_One({ subsets: ['latin'], weight: '400' });

async function getBooks() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
        next: { revalidate: 0 },
        credentials: 'include',
    });
    console.log(response);
    const data = await response.json();

    return data;
}

export default function Home() {
    const pageTrigger = useContext(pageTriggerContext);
    const [data, setData] = useState(null);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(false);

    useGSAP(() => {
        gsap.from('.hero .left .what .span', {
            y: -100,
            height: 0,
            duration: 2,
            overflow: 'hidden',
            position: 'relative',
            // stagger: 1,
        });
        gsap.from('.hero .right img', {
            scale: 0.6,
            duration: 1.5,
        });
    });

    useEffect(() => {
        async function parseData() {
            try {
                const response = await getBooks();
                setData(response);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        }
        parseData();
    }, [page]);
    return (
        <main>
            <section className={`hero ${syne.className}`}>
                <div className="left">
                    <div className={`what`}>
                        <p className="span">What book you</p>{' '}
                        <p className="span">looking for?</p>
                    </div>
                    <p className="explore">
                        Explore our catalog and find your next read.
                    </p>
                    <div className="search">
                        <input
                            type="text"
                            placeholder="Type the name of book or author..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        {search !== '' && (
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
                    <button className="btn--explore">
                        <Link href={'/catalog'}>Explore </Link>
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
                    options={{
                        perPage: 5,
                        wheel: true,
                        pagination: false,
                        breakpoints: {
                            600: { perPage: 1 },
                            900: { perPage: 3 },
                        },
                    }}>
                    {data &&
                        data.result.slice(1, 20).map((item, index) => (
                            <SplideSlide
                                key={index}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}>
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

            <section className={`beauty  ${unica.className}`}>
                <h4>
                    <Image
                        src={'/images/PATH.svg'}
                        width={26}
                        height={22}
                        alt="path"
                    />
                    Beauty
                </h4>
                <Splide
                    options={{
                        pagination: false,
                        perPage: 5,
                        wheel: true,
                        breakpoints: {
                            640: { perPage: 1 },
                            900: { perPage: 3 },
                        },
                    }}>
                    {data &&
                        data.result
                            .filter((item) => item.category === 'beauty')
                            .map((item, index) => (
                                <SplideSlide key={index}>
                                    <Book book={item} />
                                </SplideSlide>
                            ))}
                </Splide>
            </section>

            <section className={`sports ${unica.className}`}>
                <h4>
                    <Image
                        src={'/images/PATH.svg'}
                        width={26}
                        height={22}
                        alt="path"
                    />
                    Sports
                </h4>
                <Splide
                    options={{
                        pagination: false,
                        perPage: 5,
                        wheel: true,
                        breakpoints: {
                            640: { perPage: 1 },
                            900: { perPage: 3 },
                        },
                    }}>
                    {data &&
                        data.result
                            .filter((item) => item.category === 'sports')
                            .map((item, index) => (
                                <SplideSlide key={index}>
                                    <Book book={item} />
                                </SplideSlide>
                            ))}
                </Splide>
            </section>
        </main>
    );
}
