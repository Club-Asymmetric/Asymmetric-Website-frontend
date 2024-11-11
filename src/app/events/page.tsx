'use client';

import React from 'react'
import Link from 'next/link'

const Events = () => {
  return (
    <div>
        <h1>Events</h1>
        <Link href='/events/registration-form'>
          <p>Registration Form</p>
        </Link>
    </div>
  )
}

export default Events