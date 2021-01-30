import React from 'react'
import { Link } from 'react-router-dom'
import Paths from '../types/Paths'
import './Categories.css'

const Categories = () => (
  <div className="Categories">
    <div className="Categories__category">
      <Link className="Categories__category-cases" tabIndex={0} to={Paths.cases}>case</Link>
    </div>
    <div className="Categories__category">
      <Link tabIndex={0} to={Paths.pcb}>PCB</Link>
    </div>
    <div className="Categories__category">
      <Link tabIndex={0} to={Paths.plates}>plate</Link>
    </div>
    <div className="Categories__category">
      <Link tabIndex={0} to={Paths.stabilizers}>stabilizer</Link>
    </div>
    <div className="Categories__category">
      <Link tabIndex={0} to={Paths.switch}>switch</Link>
    </div>
    <div className="Categories__category">
      <Link tabIndex={0} to={Paths.keycaps}>keycaps</Link>
    </div>
  </div>
)

export default Categories