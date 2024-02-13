'use client';
import { useEffect, useState } from 'react';
import { Unica_One } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const unica = Unica_One({ subsets: ['latin'], weight: '400' });

export default function Header({ setFetchTrigger }) {
    const router = useRouter();
    const [isAuthorized, setisAuthorized] = useState(null);

    async function logout(e) {
        console.log('User logged out');
        console.log(e.target);
        try {
            const req = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/users/logout`,
                {
                    method: 'POST',
                    credentials: 'include',
                }
            );
            console.log(req);
            if (req.status === 201) {
                localStorage.removeItem('_id');
                await new Promise((resolve) =>
                    setTimeout(() => router.push('/'), 1000)
                );
                console.log('after new Promise');
                // router.push('/');
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            header.classList.toggle('sticky', scrollY > 200);
        });
        const checkIsAuth = () => {
            // const isAuth = document.cookie
            //     .split(';')
            //     .some((cookie) => cookie.trim().startsWith('token='));
            const isAuth = window.localStorage.getItem('_id') ? true : false;
            setisAuthorized(isAuth);
        };
        checkIsAuth();
        const interval = setInterval(() => {
            checkIsAuth();
        }, 1000);
        return () => clearInterval(interval);
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

            <div className="cart">
                {isAuthorized ? (
                    <>
                        <Link
                            href={`/user/${localStorage.getItem('_id')}`}
                            className={`${unica.className} acct`}>
                            Account
                        </Link>
                        <button
                            onClick={logout}
                            className="sign">
                            Logout
                        </button>
                    </>
                ) : (
                    <div className="account--auth">
                        <Link href={'/user/login'}>
                            <button className={`${unica.className} login`}>
                                Login
                            </button>
                        </Link>
                        <Link href={'/user/signup'}>
                            <button className={`sign ${unica.className}`}>
                                Sign Up
                            </button>
                        </Link>
                    </div>
                )}
                <Link href={'/checkout'}>
                    <Image
                        src={'/images/SHOPPING_CART.svg'}
                        width={34}
                        height={24}
                        alt="Cart"
                        onClick={() => {
                            setFetchTrigger((prev) => !prev);
                        }}
                    />
                </Link>
            </div>
        </header>
    );
}
