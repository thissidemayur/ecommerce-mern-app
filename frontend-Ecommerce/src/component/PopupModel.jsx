import React from 'react'
import {useSelector ,useDispatch} from 'react-redux'
import {hidePopups} from '../store/popup.Slice.js'

function PopupModel() {
  const dispatch = useDispatch()
  const isModelOpen =  useSelector((state)=>state.popupSlice.isPopupOpen)

  if(!isModelOpen) return null;
  const handleClose=()=>{
    dispatch(hidePopups())
  }

  



  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold">Exclusive Discount for You!</h2>
        <p className="mt-4">Sign up now to get 20% off on your first purchase.</p>
        <div className="mt-6 flex justify-end">
          <button 
            onClick={handleClose} 
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default PopupModel