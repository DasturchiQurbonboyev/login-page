import { CircularProgress } from '@mui/material'
import React from 'react'

const Loading = () => {
  return (
    <>
    <div className={`bg-[#7e7b7b80] fixed w-[100%] top-0 left-0 h-[100%] z-[1000000000] flex justify-center items-center`}>
      <CircularProgress color="inherit" />
    </div>
    </>
  )
}

export default Loading