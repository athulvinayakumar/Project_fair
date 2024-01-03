import React, { useState } from 'react'
import { createContext } from 'react'

// create contextapi
export const addProjectResponseContext = createContext()
// edit
export const editProjectResponseContext = createContext()

export const isAuthTokenContext  = createContext()

// predefined prop - children is used to share data between all components

function ContextShare({ children }) {
  // data to share`
  const [addProjectResponse, setAddProjectResponse] = useState({})

  const [editProjectResponse, setEditProjectResponse] = useState({})

  const [isAuthToken, setIsAuthToken] = useState(false)

  return (
    <>
      {/* value to be shared have to be mentioned in value attribute */}
      <addProjectResponseContext.Provider value={{ addProjectResponse, setAddProjectResponse }}>
        <editProjectResponseContext.Provider value={{ editProjectResponse, setEditProjectResponse }}>
          <isAuthTokenContext.Provider value={{isAuthToken, setIsAuthToken}}>
          {children}
          </isAuthTokenContext.Provider>
        </editProjectResponseContext.Provider>
      </addProjectResponseContext.Provider>
    </>
  )
}

export default ContextShare