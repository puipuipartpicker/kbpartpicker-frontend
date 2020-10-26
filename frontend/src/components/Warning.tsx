import React from 'react'
import './Warning.css'

interface WarningProps {
  layoutWarning: boolean
  solderWarning: boolean
  stabSizeWarning: boolean
  stabMountWarning: boolean
}

const Warning = ({layoutWarning, solderWarning, stabSizeWarning, stabMountWarning}:WarningProps) => {
  return (
    <div className={`Warning ${layoutWarning ? '--critical' : '--moderate'}`} >
      <h2>this is the warning component</h2>
      {layoutWarning ? (
        <div className="Warning__message-layout --critical">It looks like a combination of your Case, PCB, or Plate might not be the same size. You'll need them to all be the same size to work together</div>
      ) : null}
      {solderWarning ? (
        <div className="Warning__message-solder">Soldering will be required in order to connect switches to one of your selected PCBs. If this is a problem for you, consider selecting a Hotswap PCB</div>
      ) : null}
      {stabSizeWarning ? (
        <div className="Warning__message-stab-size">You have selected a 7u size space bar stabilizer, some PCB layouts or Plates might not support 7u space bar (6.5u is more common). You might want to double check that the selected PCB/Plate should work with 7u space. You also might want to check that you are getting a 7u size spacebar Keycap</div>
      ) : null}
      {stabMountWarning ? (
        <div className="Warning__message-stab-mount">You have selected a plate mounted stabilizer. Keep in mind that it is actually more common for Plates not to support plate mounted stabilizers. Make sure your selected plate is compatible with plate mount stabilizers</div>
      ) : null}
    </div>
  )
}

export default Warning