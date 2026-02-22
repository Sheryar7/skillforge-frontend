import React from 'react';
import Button from "./Buttons"
import { FaArrowRight } from "react-icons/fa"
import { TypeAnimation } from "react-type-animation"

function Code({ position, heading, subheading, btn1, btn2, code, gradient, codeColor }) {
    return (  
        <div className={`flex ${position} flex-col lg:flex-row items-center gap-8 lg:gap-10 my-10 lg:my-20 justify-between`}>
            {/* sec 1 - Left side (50%) */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4 lg:gap-8">
                {heading}
                <div className="text-slate-300 text-base lg:text-lg font-medium">
                    {subheading}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 lg:gap-7 mt-4 lg:mt-7">
                    <Button active={btn1.active} linkto={btn1.linkto}>
                        <div className="flex gap-2 items-center">
                            {btn1.text}
                            <FaArrowRight />
                        </div>
                    </Button>
                    <Button active={btn2.active} linkto={btn2.linkto}>
                        {btn2.text}
                    </Button>
                </div>
            </div>

            {/* sec 2 - Right side (50%) */}
            <div className="w-full lg:w-1/2 h-fit flex flex-row mt-6 lg:mt-0 py-4 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 rounded-lg shadow-xl overflow-hidden">
                {/* Line numbers */}
                <div className="text-center flex flex-col w-[10%] min-w-[40px] text-slate-500 font-mono font-bold text-sm lg:text-base select-none">
                    {[...Array(code.split('\n').length)].map((_, index) => (
                        <div key={index} className="py-[1px]">
                            {index + 1}
                        </div>
                    ))}
                </div>

                {/* Code with proper whitespace handling */}
                <div className={`w-[90%] flex flex-col font-mono ${codeColor} overflow-x-auto`}>
                    <TypeAnimation
                        sequence={[code, 5000, ""]}
                        repeat={Infinity}
                        cursor={true}
                        style={{
                            whiteSpace: "pre",
                            display: "block",
                            fontSize: "12px",
                            sm: "13px",
                            md: "14px",
                            lineHeight: "1.5",
                            paddingLeft: "10px",
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Code