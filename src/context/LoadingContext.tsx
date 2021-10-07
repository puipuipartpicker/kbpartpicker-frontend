import React from "react"
import { createContext, useState } from "react"

interface LoadingStatus {
  searchLoading: boolean,
  setSearchLoading: (b: boolean) => void,
  productLoading: boolean,
  setProductLoading: (b: boolean) => void,
}

export const LoadingContext = createContext<LoadingStatus>({
  searchLoading: false,
  setSearchLoading: () => {},
  productLoading: false,
  setProductLoading: () => {}
})

interface LoadingProviderProps {
  children: React.ReactChild
}

export const LoadingProvider = ({ children }:LoadingProviderProps) => {
  const [searchLoading, setSearchLoading] = useState(false)
  const [productLoading, setProductLoading] = useState(false)

  return (
    <LoadingContext.Provider
      value={{
        searchLoading,
        setSearchLoading,
        productLoading,
        setProductLoading
      }}
    >
      {children}
    </LoadingContext.Provider>
  )
}