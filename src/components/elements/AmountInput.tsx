import { ChangeEvent, useState } from 'react';
import { TextInput, TextInputProps } from '@gravity-ui/uikit';
import { formatAmount } from '@/utils/helpers';


export default function AmountInput(props: TextInputProps) {
    const [value, setValue] = useState<string>(`${props?.value || ""}`);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const rawValue = event.target.value;

        // Remove any non-numeric characters
        const numericValue = rawValue.replace(/[^0-9]/g, '');

        setValue(numericValue);

        props.onChange?.(event);
    }

    return (
        <TextInput
            {...props}
            onChange={handleChange}
            value={formatAmount(value)}
        />
    );
}
