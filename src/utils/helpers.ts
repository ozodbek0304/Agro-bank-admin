import { useEffect, useState } from "react";

export function useDebounce(value: string, delay: any) {
    const [debouncedValue, setDebouncedValue] = useState<string>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export const formatPhoneNumber = (value: string) => {
    if (!value) return value;

    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength <= 2) return `(${phoneNumber}`;
    if (phoneNumberLength <= 5) return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
    if (phoneNumberLength <= 7) return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 5)}-${phoneNumber.slice(5)}`;
    if (phoneNumberLength <= 9) return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 5)}-${phoneNumber.slice(5, 7)}-${phoneNumber.slice(7)}`;

    // Agar uzunlik 9 dan katta bo'lsa
    const formattedPart = `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 5)}-${phoneNumber.slice(5, 7)}-${phoneNumber.slice(7, 9)}`;
    // const remainingPart = phoneNumber.slice(9);

    return `${formattedPart}`;
};

export const reversePhone = (value: string) => {
    return `+998${value.replace(/[^\d]/g, '').length <= 9 ? value.replace(/[^\d]/g, '') : value.replace(/[^\d]/g, '').split('').slice(0, 9).join('')}`
}

export const formatPhone = (value: any) => {
    if (!value) return value;

    const phoneNumber = value.replace('+998', '').replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength <= 2) return `(${phoneNumber}`;
    if (phoneNumberLength <= 5) return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
    if (phoneNumberLength <= 7) return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 5)}-${phoneNumber.slice(5)}`;
    if (phoneNumberLength <= 9) return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 5)}-${phoneNumber.slice(5, 7)}-${phoneNumber.slice(7)}`;

    // Agar uzunlik 9 dan katta bo'lsa
    const formattedPart = `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 5)}-${phoneNumber.slice(5, 7)}-${phoneNumber.slice(7, 9)}`;
    // const remainingPart = phoneNumber.slice(9);

    return `${formattedPart}`;
}

export const formatAmount = (value: string | number) => {
    if (typeof value === 'string') {
        return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
        return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
};

export const reverseAmount = (value: string) => {
    return value.toString().replace(',', '');
};

export function formatDateTime(dateString: Date): string {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        throw new Error('Invalid date string');
    }

    const pad = (num: number) => num.toString().padStart(2, '0');

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1); // Months are zero-based
    const year = date.getFullYear();
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    return `${day}.${month}.${year} / ${hours}:${minutes}`;
}