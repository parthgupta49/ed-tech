import React from 'react'
import HighlightText from './HighlightText';
import { FaArrowRight } from 'react-icons/fa';
import CTAButton from '../Homepage/Button';
import { TypeAnimation } from 'react-type-animation';




const CodeBlocks = ({ position, heading, subHeading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor }) => {
    const doctype = codeblock.substring(0,16);
    const html = codeblock.substring(16, 181);
    // html.style.color = 'white';
    
    return (
        <div className={`flex ${position}  my-20 justify-between gap-[5rem] codeBlocks`}>
            {/* static text */}
            <div className='flex flex-col gap-3 w-[55%] pr-[5rem]'>
                {heading}
                <div className='text-richblack-300 font-bold pr-[3rem]'>
                    {subHeading}
                </div>
                <div className='flex gap-7 mt-7'>
                    <CTAButton
                        active={ctabtn1.active}
                        linkTo={ctabtn1.linkTo}
                    ><div className='flex items-center gap-2'><p>{ctabtn1.text}</p> <FaArrowRight /></div></CTAButton>
                    <CTAButton
                        active={ctabtn2.active}
                        linkTo={ctabtn2.linkTo}
                    >{ctabtn2.text}</CTAButton>
                </div>
            </div>

            {/* CodeBlock */}
            <div className='flex w-[45%]  relative border border-richblack-800'>
                {backgroundGradient}
                {/* Lines */}
                <div className='text-center text-richblue-400 font-inter font-bold flex flex-col w-[10%]'>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                    <p>12</p>
                </div>
                {/* Code */}
                <div className={`w-[90%] ${codeColor} flex flex-col gap-2 font-mono pr-2`}
                >
                    <TypeAnimation
                        sequence={[codeblock, 5000, ""]}
                        cursor={true}
                        repeat={Infinity}
                        omitDeletionAnimation={true}
                        style={{
                            whiteSpace: "break-spaces",
                            display: "block"
                        }}
                    />
                </div>
            </div>
        </div >
    )
}

export default CodeBlocks