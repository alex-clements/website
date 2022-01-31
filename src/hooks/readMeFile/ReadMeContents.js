import React from 'react';
import './readMeFile.css';

export default function ReadMeContents(props) {

  const styleProps = {
    "height": "100%",
    "width":"100%",
    "backgroundColor": "white",
    "display": "flex"
  }

  return (
    <div className="text-start px-1 font-global read-me-font-size" style={styleProps}>
      <p>Hey, I'm Alex.  Welcome to my site!  It's a bit of a work in progress, but feel free to check it out anyhow :)</p>
    </div>
  )
}
