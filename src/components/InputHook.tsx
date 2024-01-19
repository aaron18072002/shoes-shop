import React from 'react';
import { useController } from 'react-hook-form';

interface InputHookProps {
    control: any;
    className: any;
    id: string;
    name: string;
    type: string;
    placeholder: string;
    defaultValue?: any;
}

const InputHook: React.FC<InputHookProps> = (props: InputHookProps) => {
    const { control, className, id, name, type, placeholder, defaultValue } = props;

    const { field } = useController({
        control,
        name,
        defaultValue: defaultValue ? defaultValue : '',
    });

    return (
        <input
            className={className}
            id={id}
            type={type}
            // defaultValue={defaultValue}
            {...field}
            placeholder={placeholder}
        />
    );
};

export default InputHook;
