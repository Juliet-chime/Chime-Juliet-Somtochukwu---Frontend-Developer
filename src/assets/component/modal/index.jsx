/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react'
import { FaTimes } from 'react-icons/fa'
import CustomButton from '../CustomButton';

const CustomModal = ({
  open,
  onClose,
  onsubmit,
  modalBody,
  modalFooter,
  modalHeader,
  submitLabel,
}) => {

  const modalref = useRef(null);

  const closeModal = (e) => {
    if (modalref.current === e.target) {
      onClose()
    }
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [open, modalref])
  return (
    <>
      {open && (
        <div className='fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.8)] z-[999999]' ref={modalref} onClick={closeModal}>
          <div className='min-w-[100%] md:min-w-[80%] max-w-[100%] md:max-w-[90%] h-auto max-h-[80%] flex flex-col bg-[#040D12] shadow-[4px 8px 25px rgba(0, 0, 0, 0.5] fixed top-[50%] left-[50%] z-[999999999] -translate-y-[50%] -translate-x-[50%] rounded-[4px] p-2 md:p-10 overflow-y-scroll no-scrollbar' >
            <div className='flex items-center justify-end'>
              <div className='w-[25px] h-[25px] border text-[15px] flex justify-center items-center cursor-pointer rounded-full bg-[white] text-[black]' onClick={onClose}><FaTimes /></div>
            </div>
            {modalHeader && <div>{modalHeader}</div>}
            {modalBody && <div>{modalBody}</div>}
            {modalFooter && (
              <div className='flex items-center justify-around md:justify-end flex-wrap gap-2'>
                {modalFooter}
                {onsubmit && (
                  <CustomButton text={submitLabel} onClick={onsubmit} />
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default CustomModal