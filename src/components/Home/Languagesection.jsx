import React from 'react'
import HighlightText from './HighlightText'
import know_your_progress from '../../assets/know_your_progress.png'
import compare_with_others from '../../assets/compare_with_others.png'
import plan_your_lessons from '../../assets/plan_your_lessons.png'

function Languagesection() {
  return (
    <div className='flex flex-col gap-5 mt-40'>
      <div className='text-4xl font-semibold text-center'>
        Your Swiss knife for 
        <HighlightText text={' learning any language'}/>
      </div>
      <div className="text-center text-gray-900 mx-auto text-base font-medium w-[70%]">
        Using spin making learning multiple languages easy, with 20+ languages realistic voice-over progress tracking, custom schedule and more.
      </div>

        <div className="flex flex-row justify-center items-center">
            <img src={know_your_progress} alt="know_your_progress" className='object-contain' />
            <img src={compare_with_others} alt="compare_with_others" className='object-contain' />
            <img src={plan_your_lessons} alt="plan_your_lessons" className='object-contain' />
        </div>

    </div>
  )
}

export default Languagesection