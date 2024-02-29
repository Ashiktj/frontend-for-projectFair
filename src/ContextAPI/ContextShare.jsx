import React, { createContext, useState } from 'react'

export const addProjectContextApi = createContext()

export const editUserProjectContextApi = createContext()


function ContextShare({children}) {
    const [addProjectRes,setAddprojectRes] =useState("")
    const [editUserProjectRes,setEditUserProjectRes] = useState("")
  return (
    <div>
        <addProjectContextApi.Provider value={{addProjectRes,setAddprojectRes}}>


          <editUserProjectContextApi.Provider value={{editUserProjectRes,setEditUserProjectRes}}>

          {children}

          </editUserProjectContextApi.Provider>

       

        </addProjectContextApi.Provider>
        
    </div>
  )
}

export default ContextShare