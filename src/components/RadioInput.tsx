import React from 'react';
import { useController } from 'react-hook-form';
import { AiOutlineCheck } from 'react-icons/ai';
import clsx from 'clsx';

type RadioInputProps = any;

const RadioInput: React.FC<RadioInputProps> = ({ control, ...props }: RadioInputProps) => {
    const { field } = useController({
        control,
        name: props.name,
    });

    return (
        <label className="cursor-pointer custom-radio">
            <input
                type="radio"
                checked={props.checked}
                className="hidden"
                style={{
                    display: 'none',
                }}
                {...field}
                {...props}
            />
            <div
                className={clsx(
                    'bg-white flex items-center justify-center shadow',
                    props.className,
                )}
            >
                <span className="icon_checked">
                    <AiOutlineCheck size={12} />
                </span>
            </div>
        </label>
    );
};

export default RadioInput;
