import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
export default function App() {

  // console.log(import.meta.env.VITE_API_URL);

  return (
    <>
      <div className='appConfinement'>
        <Layout />
        <ToastContainer />
      </div>
    </>
  )
}

