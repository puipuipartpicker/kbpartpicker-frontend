import React from 'react'
import './JumpTo.css'

interface JumpToProps {
  action: () => void
}

const JumpTo = ({ action }:JumpToProps) => (
  <div className="JumpToButton" onClick={() => {
    window.scroll(0,0)
    action()
    }}>
    <div className="JumpToButton__content">^</div>
  </div>
)

export default JumpTo