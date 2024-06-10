'use client';
import { useState, useEffect } from 'react';
import { Star } from '@geist-ui/icons';

interface StarSelectProps {
    value: number;
    onChange: (rating: number) => void;
}

export default function StarSelect({ value, onChange }: StarSelectProps) {
    const [hoverValue, setHoverValue] = useState<number | null>(null);

    const handleClick = (rating: number) => {
        onChange(rating);
    };

    const handleMouseEnter = (rating: number) => {
        setHoverValue(rating);
    };

    const handleMouseLeave = () => {
        setHoverValue(null);
    };

    return (
        <div className="flex items-center">
            {Array.from({ length: 5 }, (_, index) => {
                const ratingValue = index + 1;
                return (
                    <button
                        type="button"
                        key={ratingValue}
                        className="bg-transparent border-none p-0 m-0"
                        onClick={() => handleClick(ratingValue)}
                        onMouseEnter={() => handleMouseEnter(ratingValue)}
                        onMouseLeave={handleMouseLeave}
                    >
                        {hoverValue != null && hoverValue >= ratingValue ? (
                            <Star color='#FFEB3B'/>
                        ) : value >= ratingValue ? (
                            <Star color='#FFEB3B' />
                        ) : (
                            <Star color="#6b7280"/>
                        )}
                    </button>
                );
            })}
        </div>
    );
}