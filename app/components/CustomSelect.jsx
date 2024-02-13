// 'use client';
import { syne } from '../layout';
import './styles/select.scss';
import Image from 'next/image';

export function Categories({
    options,
    currentValue,
    setcategoriesCurrentValue,
}) {
    function closeSelection() {
        document.querySelector('.select--lists').classList.toggle('hide');
    }
    return (
        <div className={`select ${syne.className}`}>
            <p className="current--value">
                {currentValue}{' '}
                <Image
                    src={'/images/arrow-down.svg'}
                    width={16}
                    height={8}
                    alt="Arrow down"
                    onClick={closeSelection}
                />
            </p>
            <div className="select--lists hide">
                <ul>
                    {options
                        .filter((item) => item !== currentValue)
                        .map((item, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    setcategoriesCurrentValue(item);
                                    closeSelection();
                                }}>
                                {item}
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
}
