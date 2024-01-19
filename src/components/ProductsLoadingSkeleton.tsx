import React from 'react';

interface LoadingProps {}

const ProductsLoadingSkeleton: React.FC<LoadingProps> = (props: LoadingProps) => {
    return (
        <div className="animate-pulse">
            <div className="pl-8 py-5 grid grid-cols-4 max-md:grid-cols-2 max-md:gap-3 max-md:pl-0 max-md:py-2 gap-8">
                <div className="flex flex-col gap-4 max-sm:gap-3">
                    <div className="h-[200px] rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-[20px] rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-[20px] w-[100px] rounded bg-gray-200 dark:bg-gray-700" />
                </div>
                <div className="flex flex-col gap-4 max-sm:gap-3">
                    <div className="h-[200px] rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-[20px] rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-[20px] w-[100px] rounded bg-gray-200 dark:bg-gray-700" />
                </div>{' '}
                <div className="flex flex-col gap-4 max-sm:gap-3">
                    <div className="h-[200px] rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-[20px] rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-[20px] w-[100px] rounded bg-gray-200 dark:bg-gray-700" />
                </div>{' '}
                <div className="flex flex-col gap-4 max-sm:gap-3">
                    <div className="h-[200px] rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-[20px] rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-[20px] w-[100px] rounded bg-gray-200 dark:bg-gray-700" />
                </div>{' '}
                <div className="flex flex-col gap-4 max-sm:gap-3">
                    <div className="h-[200px] rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-[20px] rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-[20px] w-[100px] rounded bg-gray-200 dark:bg-gray-700" />
                </div>{' '}
                <div className="flex flex-col gap-4 max-sm:gap-3">
                    <div className="h-[200px] rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-[20px] rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-[20px] w-[100px] rounded bg-gray-200 dark:bg-gray-700" />
                </div>{' '}
                <div className="flex flex-col gap-4 max-sm:gap-3">
                    <div className="h-[200px] rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-[20px] rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-[20px] w-[100px] rounded bg-gray-200 dark:bg-gray-700" />
                </div>{' '}
                <div className="flex flex-col gap-4 max-sm:gap-3">
                    <div className="h-[200px] rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-[20px] rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-[20px] w-[100px] rounded bg-gray-200 dark:bg-gray-700" />
                </div>{' '}
                <div className="flex flex-col gap-4 max-sm:gap-3">
                    <div className="h-[200px] rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-[20px] rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-[20px] w-[100px] rounded bg-gray-200 dark:bg-gray-700" />
                </div>{' '}
                <div className="flex flex-col gap-4 max-sm:gap-3">
                    <div className="h-[200px] rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-[20px] rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-[20px] w-[100px] rounded bg-gray-200 dark:bg-gray-700" />
                </div>{' '}
                <div className="flex flex-col gap-4 max-sm:gap-3">
                    <div className="h-[200px] rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-[20px] rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-[20px] w-[100px] rounded bg-gray-200 dark:bg-gray-700" />
                </div>{' '}
                <div className="flex flex-col gap-4 max-sm:gap-3">
                    <div className="h-[200px] rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-[20px] rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-[20px] w-[100px] rounded bg-gray-200 dark:bg-gray-700" />
                </div>
            </div>
        </div>
    );
};

export default ProductsLoadingSkeleton;
