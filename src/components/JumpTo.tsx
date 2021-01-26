import React from 'react'

interface JumpToProps {
  action: () => void
}

const JumpTo = ({ action }:JumpToProps) => (
  <div className="JumpToButton" onClick={() => action()}>
    Jump to search
  </div>
)

export default JumpTo