import React from 'react'
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import timelineImage from '../../../assets/Images/TimelineImage.png'
const timeline = [
    {
        Logo: Logo1,
        heading: "Leadership",
        description: "Fully committed to the success company"
    },
    {
        Logo: Logo2,
        heading: "Leadership",
        description: "Fully committed to the success company"
    },
    {
        Logo: Logo3,
        heading: "Leadership",
        description: "Fully committed to the success company"
    },
    {
        Logo: Logo4,
        heading: "Leadership",
        description: "Fully committed to the success company"
    },
]

const TimelineSection = () => {
    return (
        <div className='w-11/12 max-w-maxContent mx-auto'>
            <div className='flex gap-15 items-center'>
                <div className='flex flex-col w-[45%] gap-11'>
                    {
                        timeline.map((element, index) => (
                            <div className='flex gap-5' key={index}>
                                <div className='flex justify-center items-center w-[50px] h-[50px] bg-white'>
                                    <img src={element?.Logo} />
                                </div>
                                <div className='flex flex-col'>
                                    <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                                    <p>{element.description}</p>
                                </div>
                            </div>
                        ))
                    }

                </div>
                {/* right part */}
                <div className='relative shadow-blue-200'>
                    <img src={timelineImage} alt='timelineImage' className='shadow-white object-cover h-fit' />

                    <div className='absolute bg-caribbeangreen-700 text-white flex flex-row uppercase py-7 -bottom-12 left-[7rem] px-3'>
                        <div className='flex gap-5 items-center border-r border-caribbeangreen-300 pr-5 justify-center'>
                            <p className='text-3xl font-bold'>10</p>
                            <p className='text-caribbeangreen-300 text-sm w-[40%]'>Years of Experience</p>

                        </div>
                        <div className='flex gap-5 items-center pl-7 justify-center'>
                            <p className='text-3xl font-bold'>250</p>
                            <p className='text-caribbeangreen-300 text-sm w-[40%]'>Type of courses</p>
                        </div>

                    </div>
                </div>
                <div>

                </div>
            </div>


        </div>
    )
}

export default TimelineSection