import React from "react";

interface FartProps {
  poop: string
}

const Farts = ({ poop }:FartProps) => (
  <div>farts {poop}</div>
) 

export default Farts