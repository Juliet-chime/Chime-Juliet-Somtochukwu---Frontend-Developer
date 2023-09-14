/* eslint-disable react/prop-types */
import CustomSelect from '../CustomSelect';
import { capsuleStatus, capsuleType } from '../../../constant';
import CustomDatePicker from '../CustomDatePicker';
import CustomButton from '../CustomButton';

const DisplayCapsule = ({
  filter = true,
  onTypeChange,
  onStatusChange,
  onDateChange,
  onClearDateFilter,
  onHandleSearch,
  launchDate,
}) => {
  return (
    <>
      {filter && (
        <div className="flex justify-end mt-10">
          <div className="w-[100%] md:w-[90%] lg:w-[65%] bg-[#14171f] p-4 rounded-md grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#040D12] rounded-md">
              <CustomSelect options={capsuleType} placeholder="filter by type" onChange={onTypeChange} />
            </div>
            <div className="bg-[#040D12] rounded-md">
              <CustomSelect options={capsuleStatus} placeholder="filter by status" onChange={onStatusChange} />
            </div>
            <div className="bg-[#040D12] rounded-md">
              <CustomDatePicker
                selected={launchDate}
                value={launchDate}
                onChange={onDateChange}
                placeholderText="Select a date"
              >
                <button
                  className="bg-[#14171f] p-2 rounded-sm text-[white] cursor-pointer font-semibold"
                  onClick={onClearDateFilter}
                >
                  Clear filter
                </button>
              </CustomDatePicker>
            </div>
            <CustomButton text="Apply Filter" onClick={onHandleSearch} />
          </div>
        </div>
      )}
    </>
  );
};

export default DisplayCapsule;
