/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { capitalizeFLetter } from '../../../utils/dataFormat'
import { parseDate } from '../../../utils/dateFormat'
import dragon1 from '../../image/dragon1.jpg'
import dragon2 from '../../image/dragon2.jpeg'
import dragon3 from '../../image/dragon3.jpg'
import dragon4 from '../../image/dragon4.jpg'

const CapsuleInfo = ({title,value}) => {
return (
    <h2 className='mb-2 text-[12px] md:text-[14px] font-bold'>{title}<br/>
    <span className={`text-[12px] font-bold ${value === 'Active'? 'text-[#00a67e]': value === 'Destroyed' ? 'text-[#FA113D]': value === 'Retired'? 'text-[#BECDE6]':'text-[#ffffff80] '}`}> {value}</span>
    </h2>
)
}

const CapsuleItem = ({item}) => {
  const imgSrc = item?.type === 'Dragon 1.0'? dragon1:item?.type === 'Dragon 1.1'? dragon2 : item?.type === 'Dragon 2.0'?dragon3 : dragon4
  return (
    <div className='w-full md:w-56 lg:w-[240px] xl:w-[240px] border-[1px] border-[#ffffff4d] rounded-md cursor-pointer'>
        <div className='w-full h-[130px]'>
            <img src={imgSrc} alt="dragon" className='rounded-t-md h-full w-full'/>
        </div>
        <div className='flex justify-between p-3'>
        <div>
            <CapsuleInfo title={'Capsule_serial'} value={item?.capsule_serial}/>
            <CapsuleInfo title={'Date launch'} value={parseDate(item?.original_launch, { separator: '/', iso: true })}/>
        </div>
        <div>
        <CapsuleInfo title={'Type'} value={item?.type}/>
        <CapsuleInfo title={'Status'} value={capitalizeFLetter(item?.status)}/>
        </div>
        </div>
        {/* <h2 className='px-4 text-[12px] text-[#ffffff80] font-bold'> Reentered after three weeks in orbit</h2> */}
    </div>
  )
}

export default CapsuleItem