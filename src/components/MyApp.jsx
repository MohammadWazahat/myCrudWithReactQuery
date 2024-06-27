import React from 'react'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AddDataJson from './AddDataJson';
import GetJsonData from './GetJsonData';
import UpdateData from './UpdateData';
import ReadSingleData from './ReadSingleData';


const MyApp = () => {

  const route = createBrowserRouter ([
    {
      path : "/form",
      element : <AddDataJson/> ,
    },
    {
      path : "/",
      element : <GetJsonData/>,
    },
    {
      path : "/updateForm/:id",
      element : <UpdateData/> ,
    },
    {
      path : "/read/:id",
      element : <ReadSingleData/> ,
    },

  ])

  return (
    <div >
       <RouterProvider router={route}></RouterProvider>
    </div>
  )
}

export default MyApp
