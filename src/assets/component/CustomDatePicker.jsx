import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = (props) => {
    return (
      <DatePicker showIcon className="border-0 bg-transparent outline-none w-full h-[48px] px-2 cursor-pointer text-white" {...props}/>
    );
}

export default CustomDatePicker