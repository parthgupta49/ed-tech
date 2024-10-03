import React from 'react'
import Card from './Card'

const Cards = ({data,currentCard,setCurrentCard}) => {
    console.log(data);
    return (
        <div className='flex gap-5'>
            {data.map((course,index)=>(
                <Card key = {index} card = {course} currentCard = {currentCard} setCurrentCard = {setCurrentCard} />
            ))}
        </div>
    )
}

export default Cards