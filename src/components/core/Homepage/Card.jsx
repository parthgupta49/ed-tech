import React from 'react'

const Card = ({ card, currentCard, setCurrentCard }) => {
    // console.log(currentCard)
    return (
        <div className={`flex flex-col pt-[1.8rem] gap-[5rem] w-[28%] justify-between cursor-pointer  px-5 ${currentCard === card.heading && ' shadow-cardShadow bg-white text-black'} bg-richblack-800`} onClick={() => {
            const cardName = card.heading;
            setCurrentCard(cardName);
        }}>
            <div className='flex flex-col gap-3'>
                <h2 className=' font-semibold text-xl'>Learn {card.heading}</h2>
                <p className='text-richblack-500 w-[90%]'>{card.description}</p>
            </div>
            <div className='flex justify-between  border-t border-dotted items-center  py-5'>
                <div>{card.level}</div>
                <div>{card.lessionNumber} Lessons</div>
            </div>
        </div>
    )
}

export default Card