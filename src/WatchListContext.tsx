import React from "react";
import { useState, createContext } from "react";

export const WatchListContext = createContext({

})

interface WatchListProps {
  children: React.ReactChild
}

export const WatchListProvider = ({children}:WatchListProps) => {

  return (
    <WatchListContext.Provider value={''}>{children}</WatchListContext.Provider>
  )
}