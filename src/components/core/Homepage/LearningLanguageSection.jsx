import React from 'react'
import HighlightText from './HighlightText'
import Button from './Button'
import know_your_progress from '../../../assets/Images/Know_your_progress.png';
import compare_with_others from '../../../assets/Images/Compare_with_others.png';
import plan_your_lessons  from '../../../assets/Images/Plan_your_lessons.png';
const LearningLanguageSection = () => {
    return (
        <div className='w-11/12 max-w-maxContent mx-auto mt-[10rem]'>
            <div className='flex flex-col gap-5 items-center'>
                <p className='text-4xl font-semibold text-center'>Your swiss knife for <HighlightText text={"learning any language"} /></p>
                <p className='text-center text-richblue-600 mx-auto text-base font-medium w-[70%]'>Using spin making learning multiple languages easy with 20+ languages realistic voice-over, progress tracking custom schedule and more </p>
                
                {/* skewed images div */}
                <div className='flex items-center justify-center mt-5'>
                    <img src={know_your_progress} alt="progress" className='object-contain -mr-[7rem] -mt-10'/>
                    <img src={compare_with_others} alt="compare_with_others" className='object-contain'/>
                    <img src={plan_your_lessons} alt="plan_ur_lessons" className='object-contain -ml-[9rem]'/>
                </div>

                <div className=' self-center'><Button active={true} linkTo={"/signup"}>Learn More</Button></div>
            </div>
        </div>
    )
}

export default LearningLanguageSection