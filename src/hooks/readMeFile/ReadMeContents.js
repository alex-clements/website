import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ReadMeContents(props) {

  const styleProps = {
    "height": "calc(100% - 30px)",
    "width":"100%",
    "backgroundColor": "white",
    "display": "flex"
  }

  return (
    <div className="text-start" style={styleProps}>
      <p>Hey, welcome to the site!  It's a bit of a work in progress, but feel free to check it out anyhow :)</p>
    </div>
  )
}
