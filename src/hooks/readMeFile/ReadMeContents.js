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
      <p>Hey, feel free to check out the site.</p>
    </div>
  )
}
