import React from 'react';

interface ColorProps {
    key?: string;
    bgColor: string;
    spec_color: string;
}

const Color: React.FC<ColorProps> = ({ key, bgColor, spec_color }: ColorProps) => {
    const onClick = () => {
        console.log(spec_color);
    };

    return (
        <div
            key={key}
            style={{
                backgroundColor: `${bgColor}`,
            }}
            onClick={onClick}
            className={`h-[15px] w-[15px] rounded-full cursor-pointer bg-[${bgColor}]`}
        />
    );
};

export default Color;
