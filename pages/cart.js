import CartItems from '@/components/CartItems'
import Wrapper from '@/components/Wrapper'
import React from 'react'

const cart = () => {
  return (
    <div className='w-full'>
        <Wrapper>
            <div className='text-center py-4 max-w-[800px] mx-auto mt-10 md:mt-0 '>
                <div className='text-[28px] md:text-[34px] mb-5 font-semibold leading-tight'>
                    Shopping Cart
                </div>
            </div>
            <div className='flex flex-col lg:flex-row gap-12 py-10'>
                <div className='flex-[2] '>
                    <div className='text-lg font-bold '>
                        Cart Items
                    </div>
                    <CartItems/>
                    <CartItems/>
                    <CartItems/>
                    <CartItems/>
                </div>

                <div className='flex-[1] '>
                    <div className='text-lg font-bold'>
                        Summary
                    </div>
                </div>
            </div>
        </Wrapper>
    </div>
  )
}

export default cart