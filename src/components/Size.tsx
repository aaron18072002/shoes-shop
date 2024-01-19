import React from 'react';

interface SizeProps {
    size: string;
    handleSelectSize: Function;
}

const Size: React.FC<SizeProps> = (props: SizeProps) => {
    const { size, handleSelectSize } = props;

    return (
        <span
            onClick={() => handleSelectSize()}
            className={`inline-block w-full h-fit overflow-hidden cursor-pointer hover:border-gray-600 transition border border-gray-200 py-4 px-6 rounded-md`}
        >
            {size}
        </span>
    );
};

export default Size;
