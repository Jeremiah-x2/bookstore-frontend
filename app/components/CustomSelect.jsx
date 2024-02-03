// 'use client';
import { syne } from '../layout';
import './styles/select.scss';
import Image from 'next/image';

export function Categories({
    options,
    currentValue,
    setcategoriesCurrentValue,
}) {
    return (
        <div className={`select ${syne.className}`}>
            <p className="current--value">
                {currentValue}{' '}
                <Image
                    src={'/images/arrow-down.svg'}
                    width={16}
                    height={8}
                    alt="Arrow down"
                />
            </p>
            <ul>
                {options
                    .filter((item) => item !== currentValue)
                    .map((item, index) => (
                        <li
                            key={index}
                            onClick={() => setcategoriesCurrentValue(item)}>
                            {item}
                        </li>
                    ))}
            </ul>
        </div>
    );
}

// export function FilterBy({ options, currentValue }) {
//     return (
//         <div className="select">
//             <p className="current--value">{currentValue}</p>
//             <ul>
//                 {options
//                     .filter((item) => item !== currentValue)
//                     .map((item, index) => (
//                         <li key={index}>{item}</li>
//                     ))}
//             </ul>
//         </div>
//     );
// }
