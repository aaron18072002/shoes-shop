'use client';

import React, { memo } from 'react';
import { AiOutlineLine } from 'react-icons/ai';
import Slider from 'rc-slider';
import Color from './Color';
import { useDispatch } from 'react-redux';

interface SimpleBarProps {
    handleSetOption: Function;
}

const colors = [
    {
        bgColor: '#f1f5f9',
        spec_color: 'light grey',
    },
    {
        bgColor: '#d1d5db',
        spec_color: 'grey',
    },
    {
        bgColor: '#fed7aa',
        spec_color: 'light orange',
    },
    {
        bgColor: '#fbbf24',
        spec_color: 'orange',
    },
    {
        bgColor: '#d97706',
        spec_color: 'dark orange',
    },
    {
        bgColor: '#84cc16',
        spec_color: 'green',
    },
    {
        bgColor: '#2563eb',
        spec_color: 'blue',
    },
    {
        bgColor: '#ec4899',
        spec_color: 'pink',
    },
    {
        bgColor: '#4d7c0f',
        spec_color: 'dark green',
    },
    {
        bgColor: '#FF0000',
        spec_color: 'red',
    },
    {
        bgColor: '#6b7280',
        spec_color: 'dark grey',
    },
    {
        bgColor: '#92400e',
        spec_color: 'brown',
    },
    {
        bgColor: '#a5f3fc',
        spec_color: 'light blue',
    },
    {
        bgColor: '#6b21a8',
        spec_color: 'dark purple',
    },
    {
        bgColor: '#000',
        spec_color: 'black',
    },
];

const SimpleBar: React.FC<SimpleBarProps> = (props: SimpleBarProps) => {
    const { handleSetOption } = props;
    const dispatch = useDispatch;

    return (
        <div className="w-[200px] max-sm:hidden max-md:w-[200px]">
            <div className="py-5 pr-7">
                <div className="flex flex-col gap-4 cursor-pointer">
                    <h3 className="uppercase font-semibold text-[18px]">{"sneaker's"}</h3>
                    <div className="uppercase font-bold text-[12px] hover:translate-y-[-2px] transition-transform flex items-center gap-1">
                        <div className="w-[15px] h-[15px] bg-slate-300" />
                        <span className="translate-x-[-10px]">
                            <AiOutlineLine size={12} className="w-[12px]" />
                        </span>
                        <span onClick={() => handleSetOption('lifestyle')}>lifestyle</span>
                    </div>
                    <div className="uppercase font-bold text-[12px] hover:translate-y-[-2px] transition-transform  flex items-center gap-1">
                        <div className="w-[15px] h-[15px] bg-slate-300" />
                        <span className="translate-x-[-10px]">
                            <AiOutlineLine size={12} className="w-[12px]" />
                        </span>
                        <span onClick={() => handleSetOption('original')}>original</span>
                    </div>

                    <div className="uppercase font-bold text-[12px] hover:translate-y-[-2px] transition-transform  flex items-center gap-1">
                        <div className="w-[15px] h-[15px] bg-slate-300" />
                        <span className="translate-x-[-10px]">
                            <AiOutlineLine size={12} className="w-[12px]" />
                        </span>
                        <span onClick={() => handleSetOption('basketball')}>basketball</span>
                    </div>
                    <div className="uppercase font-bold text-[12px] hover:translate-y-[-2px] transition-transform  flex items-center gap-1">
                        <div className="w-[15px] h-[15px] bg-slate-300" />
                        <span className="translate-x-[-10px]">
                            <AiOutlineLine size={12} className="w-[12px]" />
                        </span>
                        <span onClick={() => handleSetOption('football')}>football</span>
                    </div>
                    <div className="uppercase font-bold text-[12px] hover:translate-y-[-2px] transition-transform  flex items-center gap-1">
                        <div className="w-[15px] h-[15px] bg-slate-300" />
                        <span className="translate-x-[-10px]">
                            <AiOutlineLine size={12} className="w-[12px]" />
                        </span>
                        <span onClick={() => handleSetOption('running')}>running</span>
                    </div>
                </div>
                <div className="flex flex-col gap-4 cursor-pointer mt-5">
                    <h3 className="uppercase font-semibold text-[18px]">{'HÃNG'}</h3>
                    <div className="uppercase font-bold text-[12px] hover:translate-y-[-2px] transition-transform flex items-center gap-1">
                        <div className="w-[15px] h-[15px] bg-slate-300" />
                        <span className="translate-x-[-10px]">
                            <AiOutlineLine size={12} className="w-[12px]" />
                        </span>
                        <span onClick={() => handleSetOption('adidas')}>adiddas</span>
                    </div>
                    <div className="uppercase font-bold text-[12px] hover:translate-y-[-2px] transition-transform  flex items-center gap-1">
                        <div className="w-[15px] h-[15px] bg-slate-300" />
                        <span className="translate-x-[-10px]">
                            <AiOutlineLine size={12} className="w-[12px]" />
                        </span>
                        <span onClick={() => handleSetOption('nike')}>nike</span>
                    </div>
                </div>
                <div className="mt-8">
                    <h3 className="uppercase font-semibold text-[18px] mb-5">filter</h3>
                    <Slider
                        range
                        marks={{
                            1: `$1`,
                            1000: `$1000`,
                        }}
                        min={1}
                        max={1000}
                        defaultValue={1000}
                        handleStyle={{
                            backgroundColor: '#000',
                            borderColor: '#000',
                        }}
                        trackStyle={{
                            backgroundColor: '#000',
                        }}
                        railStyle={{
                            backgroundColor: '#000',
                            color: '#000',
                        }}
                        dotStyle={{
                            borderColor: '#000',
                            backgroundColor: '#000',
                        }}
                        activeDotStyle={{
                            backgroundColor: '#000',
                            borderColor: '#000',
                        }}
                        className="font-bold text-[#000]"
                        style={{ width: '80%', color: '#000', marginLeft: '6px' }}
                    />
                </div>
                <div className="mt-14">
                    <h3 className="uppercase font-semibold text-[18px] mb-5">colors</h3>
                    <div className="mt-6">
                        <div className="w-[80%] flex items-center gap-3 flex-wrap">
                            {colors &&
                                colors.length > 0 &&
                                colors.map((color) => {
                                    return (
                                        <div key={color.bgColor}>
                                            <Color
                                                spec_color={color.spec_color}
                                                bgColor={color.bgColor}
                                            />
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(SimpleBar);
