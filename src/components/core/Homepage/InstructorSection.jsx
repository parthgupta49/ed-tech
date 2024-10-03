import React from 'react'
import instructorImage from '../../../assets/Images/Instructor.png';
import HighlightText from './HighlightText';
import Button from '../../../components/core/Homepage/Button';
import { FaArrowRight } from "react-icons/fa";
const InstructorSection = () => {
  return (
    <div className='flex bg-richblack-900 gap-[5rem]'>
      {/* image section */}
      <div className='w-1/2'>
        <img src={instructorImage} alt='instructor image' className='shadow-instructorImage' />
      </div>



      {/* text part */}
      <div className='flex flex-col items-start w-[40%] justify-center gap-4'>
        <h2 className='text-4xl font-semibold w-1/2'>Become an <HighlightText text={"instructor"} /></h2>
        <p className='mb-11 text-richblack-300 font-medium' >Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
        <Button
          active={true}
          linkTo={"/signup"}
        >
          <div className='flex justify-center items-center gap-2'>
            <p>Start Teaching today </p>
            <FaArrowRight />
          </div>
        </Button>
      </div>
    </div>
  )
}

export default InstructorSection