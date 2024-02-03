import Image from 'next/image';
import './styles/book.scss';

export default function TrendingBook({ book }) {
    return (
        <div className="books">
            <Image
                src={book.image}
                width={200}
                height={300}
                alt="Book Image"
            />
        </div>
    );
}
