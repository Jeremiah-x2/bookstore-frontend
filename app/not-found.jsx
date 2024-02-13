import React from 'react';
import './components/styles/notFound.scss';
import Image from 'next/image';
import Link from 'next/link';
import { Syne, Unica_One } from 'next/font/google';

const syne = Syne({ subsets: ['latin'], weight: ['400', '500'] });
const unica = Unica_One({ subsets: ['latin'], weight: '400' });

export default function NotFound() {
    return (
        <section className={`not--found ${syne.className}`}>
            <div>
                <Image
                    src={'/images/error.svg'}
                    width={350}
                    height={350}
                    alt="Error"
                />
                <h5 className={`${unica.className}`}>
                    Oops! This page don&apos;t Exist
                </h5>
                <p>Please, return to one page existent</p>
                <Link href={'/'}>
                    <button>Go back Home</button>
                </Link>
            </div>
        </section>
    );
}
