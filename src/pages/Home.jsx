import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import HighlightText from '../components/core/Homepage/HighlightText';
import CTAButton from '../components/core/Homepage/Button';
import Banner from '../assets/Images/banner.mp4';
import CodeBlocks from '../components/core/Homepage/CodeBlocks';
import TimelineSection from '../components/core/Homepage/TimelineSection';
import LearningLanguageSection from '../components/core/Homepage/LearningLanguageSection';
import InstructorSection from '../components/core/Homepage/InstructorSection';
import ReviewSlider from '../components/core/Homepage/ReviewSlider';
import ExploreMore from '../components/core/Homepage/ExploreMore';
const Home = () => {
    return (
        <div>
            {/* Section 1 */}
            <div>
                <div className='flex flex-col mx-auto relative w-11/12 items-center justify-between text-white max-w-maxContent pt-[7rem]'>
                    <Link to="/signup">
                        <div className=' group mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit'>
                            <div className='flex items-center gap-2 rounded-full px-5 py-[10px] group-hover:bg-richblack-900 transition-all duration-200'>
                                <p>Become an Instructor</p>
                                <FaArrowRight />
                            </div>
                        </div>
                    </Link>
                    <p className='text-center text-4xl font-semibold mt-7'>Empower Your Future with <HighlightText text={"Coding Skills"} /> </p>
                    <p className='w-[90%] text-center text-lg font-bold text-richblack-300 mt-4 '>With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. </p>
                    <div className='flex gap-5 mt-10'>
                        <CTAButton
                            active={true}
                            linkTo={"/signup"}
                        >Learn More</CTAButton>
                        <CTAButton
                            active={false}
                            linkTo={"/login"}
                        >Book a Demo</CTAButton>
                    </div>

                    {/* video */}
                    <div className='shadow-video mx-3 my-12 w-[90%] relative'>
                        <div className='absolute w-[100%] h-[97%] right-4' style={{
                            backgroundImage: 'radial-gradient(farthest-corner at 50% 50%, #1fa2ff -3.62%, #12d8fa 50.44%, #a6ffcb 104.51%)',
                            filter: 'blur(20px)'
                        }}></div>
                        <video muted autoPlay loop className='relative'>
                            <source src={Banner} type='video/mp4 ' />
                        </video>
                    </div>

                    {/* code section 1 */}
                    <div className='flex flex-col gap-[7rem] mt-10'>

                        <CodeBlocks
                            position={"lg:flex-row"}
                            heading={
                                <div className='text-4xl font-semibold'>Unlock your <HighlightText text={"coding potential"} /> with our online courses.
                                </div>
                            }
                            subHeading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                            ctabtn1={{
                                text: "Try it Yourself",
                                linkTo: "/signup",
                                active: true
                            }}
                            ctabtn2={{
                                text: "Learn More",
                                linkTo: "/login",
                                active: false
                            }}

                            codeblock={`<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<title>Page Title</title>\n\t\t<link rel="stylesheet" href="styles.css" />\n\t</head>\n\t<body>\n\t\t<nav>\n\t\t\t<a href="one/">One</a>\n\t\t</nav>\n\t</body>\n</html>`}
                            codeColor={"text-yellow-25"}

                            backgroundGradient={<div className='absolute w-[50%] h-[55%] left-[3rem]' style={{
                                backgroundImage: 'radial-gradient(farthest-corner at 50% 50%, #8a2be2 -6.46%, orange 59.04%, #f8f8ff 124.53%)',
                                filter: 'blur(150px)'

                            }}
                            ></div>}
                        >

                        </CodeBlocks>

                        <CodeBlocks
                            position={"lg:flex-row-reverse"}
                            heading={
                                <div className='text-4xl font-semibold'>Start <HighlightText text={"coding in seconds "} />
                                </div>
                            }
                            subHeading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                            ctabtn1={{
                                text: "Continue Lesson",
                                linkTo: "/signup",
                                active: true
                            }}
                            ctabtn2={{
                                text: "Learn More",
                                linkTo: "/login",
                                active: false
                            }}

                            codeblock={`<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<title>Page Title</title>\n\t\t<link rel="stylesheet" href="styles.css" />\n\t</head>\n\t<body>\n\t\t<nav>\n\t\t\t<a href="one/">One</a>\n\t\t</nav>\n\t</body>\n</html>`}
                            codeColor={"text-yellow-25"}

                            backgroundGradient={<div className='absolute w-[50%] h-[40%] left-[3rem] top-3' style={{
                                backgroundImage: 'radial-gradient(farthest-corner at 50% 50%, #1fa2ff -3.62%, #12d8fa 50.44%, #a6ffcb 104.51%)',
                                filter: 'blur(100px)'
                            }}></div>}

                        >

                        </CodeBlocks>

                        <ExploreMore />


                    </div>

                </div>
            </div>

            {/* Section 2 */}
            <div className='bg-pure-greys-5 text-richblack-700 pb-[5rem] pt-[3rem]'>
                <div className='homepage_bg h-[310px]'>
                    <div className='w-11/12 max-w-maxContent flex items-center gap-5 mx-auto'>
                        <div className='h-[250px]'></div>
                        {/* Buttons */}
                        <div className='flex gap-7 mx-auto'>
                            <CTAButton active={true} linkTo="/signup" >
                                <div className='font-bold flex items-center gap-2 rounded-full  '>
                                    <p>Explore Full Catalog</p>
                                    <FaArrowRight />
                                </div>
                            </CTAButton>
                            <CTAButton active={false} linkTo="/signup" >
                                Learn More
                            </CTAButton>
                        </div>
                    </div>
                </div>

                <div className='w-11/12 max-w-maxContent mx-auto flex flex-col items-center justify-between gap-7'>
                    <div className='flex gap-5 mb-10 mt-[95px]'>
                        <div className='text-4xl font-semibold w-[45%]'>Get the skills you need for a <HighlightText text="job that is in demand." /></div>
                        <div className='flex flex-col w-[40%] items-start gap-10'>
                            <p className='text-[16px]'>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills</p>
                            <CTAButton active={true} linkTo={"/signup"}>Learn More</CTAButton>
                        </div>
                    </div>


                </div>

                <TimelineSection />

                <LearningLanguageSection />
            </div>

            {/* Section 3 */}
            <div className='w-11/12 mx-auto max-w-maxContent flex flex-col mt-[7rem] bg-richblack-800 text-white gap-8'>
                <InstructorSection />
                <h2 className='text-center font-semibold text-3xl font-inter mt-10'>Reviews from other Learners</h2>
                
                {/* Review Slider */}
                <ReviewSlider />
            </div>

            {/* Footer */}
        </div>
    )
}

export default Home