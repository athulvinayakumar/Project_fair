import React, { useState } from 'react'
import { createContext } from 'react'

// create contextapi
export const addProjectResponseContext = createContext()
// edit
export const editProjectResponseContext = createContext()

export const tokenAuthContext= createContext()

// predefined prop - children is used to share data between all components

function ContextShare({ children }) {
  // data to share`
  const [addProjectResponse, setAddProjectResponse] = useState({})

  const [editProjectResponse, setEditProjectResponse] = useState({})

  const [isAuthorized, setIsAuthorized]= useState(true)

  return (
    <>
      {/* value to be shared have to be mentioned in value attribute */}
      <addProjectResponseContext.Provider value={{ addProjectResponse, setAddProjectResponse }}>
        <editProjectResponseContext.Provider value={{ editProjectResponse, setEditProjectResponse }}>
        <tokenAuthContext.Provider value={{isAuthorized, setIsAuthorized}}> 
          {children}
          </tokenAuthContext.Provider>
        </editProjectResponseContext.Provider>
      </addProjectResponseContext.Provider>
    </>
  )
}

export default ContextShare