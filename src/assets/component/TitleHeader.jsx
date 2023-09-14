/* eslint-disable react/prop-types */

const TitleHeader = ({title,...props}) => {
  return (
    <h1 className="my-8 py-2 text-[1rem] md:text-[2rem] font-bold border-b-[0.1px] border-[#ffffff4d]"{...props}>{title}</h1>
  )
}

export default TitleHeader