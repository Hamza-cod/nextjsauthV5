import React from 'react'

import { CardWrapper } from '@/components/auth/card-wrapper';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

export const ErrorCard = () => {
  return (
    <CardWrapper
    backbButtonLabel='back to login page'
    headerLabel='Oops! somthing went wrong'
    backButtonHref='/auth/login'
    >
      <div className='w-full flex items-center justify-center'>
        <ExclamationTriangleIcon  className='text-2xl size-12 text-destructive '/>
      </div>
    </CardWrapper>
  )
}
