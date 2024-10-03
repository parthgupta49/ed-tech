import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore'
import Cards from './Cards'
import Card from './Card'
import HighlightText from './HighlightText'
const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Career paths",
    "Skills paths"
]

const ExploreMore = () => {
    const [tab, setTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)
    // console.log(courses)
    // console.log("current Card is settled to : ", currentCard);
    const handleTab = (event) => {
        const clickedTab = event.target.textContent;
        if (clickedTab !== tab) {
            setTab(clickedTab);
            // console.log(clickedTab);
            const result = HomePageExplore.filter((obj) => obj.tag === clickedTab);
            // console.log(result);
            setCourses(
                result[0].courses
            );
            setCurrentCard(
                result[0].courses[0].heading
            )
            console.log(courses);
            // console.log(courses);
        }
        // console.log(tab);
    }
    // const courses = HomePageExplore;
    // console.log(courses);

    return (
        <div className='flex flex-col gap-3'>
            <h2 className='text-center text-4xl font-semibold'>Unlock the <HighlightText text={"Power of Code"} /></h2>
            <p className='text-richblack-300 text-center' >Learn to Build Anything You can imagine</p>
            {/* the tabs div */}
            <div className='mt-10 flex gap-4 rounded-3xl justify-center bg-richblack-600 w-fit mx-auto px-5 py-2'>
                {
                    tabsName.map((tabname, index) => (
                        <button key={index} onClick={handleTab}
                            className={`${tab === tabname && 'bg-richblack-900'} rounded-3xl px-3 py-1`}
                        >{tabname}</button>
                    ))
                }
            </div>

            {/* courses div */}
            <div className='flex gap-10 mt-10 -mb-[5rem] justify-center'>
            {
                courses?.map((course, index) => (
                    <Card key={index} card={course} currentCard={currentCard} setCurrentCard={setCurrentCard} />
                ))
            }
            </div>
        </div>
    )
}

export default ExploreMore