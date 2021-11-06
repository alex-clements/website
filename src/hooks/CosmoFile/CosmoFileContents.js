import React, { useState, useEffect } from 'react';
import CosmoPicture from '../../data/cosmo.jpeg';

export default function CosmoFileContents(props) {

  const styleProps = {
    "width" : "100%",
    "height" : "auto"
  }

  return (
    <img style={styleProps} src={CosmoPicture} />
  )
}
