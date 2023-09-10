/* eslint-disable react/prop-types */
import {GiEmptyHourglass} from 'react-icons/gi'

const EmptyState = ({name}) => {
  return (
    <div className='border-[0.1px] border-[#ffffff4d] flex flex-col items-center justify-center gap-3 py-8 rounded-md'>
        <div className='w-[60px] h-[60px] flex items-center justify-center'>
            <GiEmptyHourglass className='text-[50px] text-[#ffffff80]'/>
        </div>
        <p className='text-[20px] text-[#ffffff80] font-bold'>No {name} at the moment</p>
    </div>
  )
}

export default EmptyState