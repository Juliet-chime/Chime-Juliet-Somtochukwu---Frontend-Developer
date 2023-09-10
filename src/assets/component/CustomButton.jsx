/* eslint-disable react/prop-types */

const CustomButton = (props) => {
  return (
    <button className="border-0 bg-[#ffffffdd] outline-none text-black w-full h-[48px] px-2 rounded-md" {...props}>
        {props.text || 'Search'}
    </button>
  )
}

export default CustomButton