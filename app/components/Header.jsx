import { useEffect, useState } from 'react';
import { Unica_One } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const unica = Unica_One({ subsets: ['latin'], weight: '400' });

export default function Header({ setShowCart, setFetchTrigger }) {
    const [isAuthorized, setisAuthorized] = useState(null);
    useEffect(() => {
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            header.classList.toggle('sticky', scrollY > 200);
        });
        setisAuthorized(
            document.cookie
                .split(';')
                .some((cookie) => cookie.trim().startsWith('token='))
        );
        console.log(
            document.cookie
                .split(';')
                .some((cookie) => cookie.trim().startsWith('token='))
        );
    }, []);

    return (
        <header>
            {/* {isAuthorized ? 'Hello world' : 'Hello'} */}
            <Link href={'/'}>
                <div className={`logo ${unica.className}`}>
                    <Image
                        src="/images/BookOpen.svg"
                        width={26}
                        height={22}
                        alt="Store Logo"
                    />
                    BOOKSTORE
                </div>
            </Link>
            <div>
                Click{' '}
                <Link href={'/catalog'}>
                    <button>Here</button>
                </Link>{' '}
                to see all books
            </div>
            <div className="cart">
                {isAuthorized && <div>User Account</div>}
                <Image
                    src={'/images/SHOPPING_CART.svg'}
                    width={34}
                    height={24}
                    alt="Cart"
                    onClick={() => {
                        setShowCart(true);
                        setFetchTrigger((prev) => !prev);
                    }}
                />
            </div>
        </header>
    );
}
