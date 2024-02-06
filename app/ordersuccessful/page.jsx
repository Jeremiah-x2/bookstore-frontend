import '../components/styles/orderSuccessful.scss';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Syne, Unica_One } from 'next/font/google';

const syne = Syne({ subsets: ['latin'], weight: ['400', '500', '600'] });
const unica = Unica_One({ subsets: ['latin'], weight: '400' });
export default function SuccessfulOrder() {
    return (
        <div className={`order--success ${syne.className}`}>
            <Image
                src={'/images/success-anim.svg'}
                width={465}
                height={465}
                alt="Order placed successfully"
            />
            <p className={`thanks ${unica.className}`}>
                Thank you for your order
            </p>
            <p className="check--email">
                Check your e-mail inbox for the receipt
            </p>
            <Link href={'/'}>
                <button>
                    <Image
                        src={'/images/SHOPPING_CART.svg'}
                        width={26}
                        height={24}
                        alt="Shopping Cart"
                    />
                    Continue Shopping
                </button>
            </Link>
        </div>
    );
}
