import React from 'react';

const LoadingSkeleton = () => {
    return (
        <div className="animate-pulse">
            <div className="w-full h-[82px] bg-gray-200 dark:bg-gray-700 mb-[64px]" />
            <div className="max-w-[1280px] mx-auto max-md:px-3">
                <div className="mb-4 w-full h-[82px] rounded bg-gray-200 dark:bg-gray-700" />
                <div className="pl-8 py-5 grid grid-cols-4 max-md:grid-cols-2 max-md:gap-3 max-md:pl-0 max-md:py-2 gap-6 padding-left-0">
                    <div className="mb-2.5 h-[240px] rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="mb-2.5 h-[240px] rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="mb-2.5 h-[240px] rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="mb-2.5 h-[240px] rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="mb-2.5 h-[240px] rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="mb-2.5 h-[240px] rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="mb-2.5 h-[240px] rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="mb-2.5 h-[240px] rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="mb-2.5 h-[240px] rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="mb-2.5 h-[240px] rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="mb-2.5 h-[240px] rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="mb-2.5 h-[240px] rounded bg-gray-200 dark:bg-gray-700" />
                </div>
            </div>
        </div>
    );
};

export default LoadingSkeleton;
