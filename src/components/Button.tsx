import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, children, disabled, type = 'button', ...props }, ref) => {
        return (
            <button
                type={type}
                disabled={disabled}
                ref={ref}
                {...props}
                className={twMerge(
                    'rounded-sm tracking-wide border border-transparent bg-[#3A3A3A] px-4 py-2 text-white disabled:opacity-50 font-medium text-[12px] hover:bg-transparent hover:border-[#3A3A3A] hover:text-[#3a3a3a] transition',
                    className,
                )}
            >
                {children}
            </button>
        );
    },
);

Button.displayName = 'button';

export default Button;
