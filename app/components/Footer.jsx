import { syne } from '../layout';
import './styles/footer.scss';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className={syne.className}>
            <h3>BookStore Project</h3>
            <ul>
                <li>
                    <Image
                        src={'/images/LINKEDINLOGO.svg'}
                        width={24}
                        height={24}
                        alt="linkedIn"
                    />
                </li>
                <li>
                    <Image
                        src={'/images/GITHUBLOGO.svg'}
                        width={24}
                        height={24}
                        alt="linkedIn"
                    />
                </li>
                <li>
                    <Image
                        src={'/images/FIGMALOGO.svg'}
                        width={24}
                        height={24}
                        alt="linkedIn"
                    />
                </li>
            </ul>
            <p>By: Lorem Ipsum</p>
        </footer>
    );
}
