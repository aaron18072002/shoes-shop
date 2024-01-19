import React from 'react';
import { useController } from 'react-hook-form';

interface InputProps {
    control: any;
    id: string;
    name: string;
    type: string;
    placeholder: string;
    defaultValue?: any;
    // readonly?: boolean;
    hasIcon?: boolean;
    children?: any;
}

const Input: React.FC<InputProps> = (props: InputProps) => {
    const { control, id, name, type, placeholder, defaultValue, hasIcon, children } = props;
    const { field } = useController({
        control,
        name: name,
        defaultValue: '',
    });

    return (
        <div className="w-full relative">
            <input
                {...field}
                className={`w-full border border-gray-300 focus:border-gray-500 rounded placeholder:text-sm transition-all ${
                    hasIcon ? 'py-2 pl-4 pr-14' : 'py-2 px-4'
                }`}
                id={id}
                // readOnly={readonly}
                type={type}
                placeholder={placeholder}
            />
            {children && <div className="input-icon">{children}</div>}
        </div>
    );
};

export default Input;
