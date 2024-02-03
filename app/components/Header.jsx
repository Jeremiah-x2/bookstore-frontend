import { Unica_One } from 'next/font/google';
import Image from 'next/image';

const unica = Unica_One({ subsets: ['latin'], weight: '400' });

export default function Header({ setShowCart, setFetchTrigger }) {
    return (
        <header>
            <div className={`logo ${unica.className}`}>
                <Image
                    src="/images/BookOpen.svg"
                    width={26}
                    height={22}
                    alt="Store Logo"
                />
                BOOKSTORE
            </div>
            <div className="cart">
                <Image
                    src={'/images/BOOKMARK_SIMPLE.svg'}
                    width={16}
                    height={23}
                    alt="Bookmark"
                />
                <Image
                    src={'/images/SHOPPING_CART.svg'}
                    width={26}
                    height={18}
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
