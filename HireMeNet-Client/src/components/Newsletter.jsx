import React from 'react'
import { FaEnvelopeOpenText, FaRocket} from "react-icons/fa6"

const Newsletter = () => {
  return (
    <div>
        <div>
            <h3 className='text-lg font-bold mb-2 flex items-center gap-2'>
                <FaEnvelopeOpenText />
                Sign Up for Newsletter!
            </h3>
            <p className="text-primary/70 text-base  mb-4">Get the latest news, tips and tricks straight to your inbox.</p>
            <div className='w-full space-y-4'>
                <input type="email" name="email" id="email" placeholder='name@mail.com' className='w-full block py-2 pl-3 border focus:outline-none' />
                <input type="submit" value="subscribe" className='w-full block py-2 pl-3 border focus:outline-none bg-blue rounded-sm text-white cursor-pointer font-semibold' />
            </div>
        </div>

        <div className='mt-20' >
            <h3 className='text-lg font-bold mb-2 flex items-center gap-2'>
                <FaRocket />
                Get Noticed faster
            </h3>
            <p className="text-primary/70 text-base  mb-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dolores expedita corrupti exercitationem libero! Optio expedita ut soluta at ipsam iste temporibus eos obcaecati nobis itaque deleniti, quas saepe eligendi?
            </p>
            <div className='w-full space-y-4'>
                <input type="submit" value="subscribe" className='w-full block py-2 pl-3 border focus:outline-none bg-blue rounded-sm text-white cursor-pointer font-semibold' />
            </div>
        </div>
    </div>
  )
}

export default Newsletter