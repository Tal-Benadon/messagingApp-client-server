import React, { useEffect, useState } from 'react'
import Layout from './Layout'

export default function App() {

  // console.log(import.meta.env.VITE_API_URL);

  return (
    <>
      <div className='appConfinement'>
        <Layout />
      </div>
    </>
  )
}

