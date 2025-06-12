import React from 'react'

function DiscountCoupan1({date , discountCode , msg}) {
  return (
<div className="container mx-auto">
            <div className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white text-center py-2.5 px-5 sm:py-10 sm:px-20 rounded-lg shadow-md relative">
                {/* <img src="https://i.postimg.cc/KvTqpZq9/uber.png" className="w-20 mx-auto mb-4 rounded-lg"/> */}
                <h3 className="sm:text-2xl text-lg font-semibold mb-4 mt-8">{msg}</h3>
                <div className="flex items-center justify-center space-x-2 mb-6">
                    <span id="cpnCode" className="border-dashed border text-white px-4 py-2 rounded-l">{discountCode}</span>
                    <span id="cpnBtn" className="border border-white bg-white text-purple-600 px-4 py-2 rounded-r cursor-pointer">Copy Code</span>
                </div>
                
                
                <p className="text-sm">Valid Till:{date} </p>
                
<div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 left-0 -ml-6"></div>
<div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 right-0 -mr-6"></div>

            </div>
        </div>
  )
}

export default DiscountCoupan1