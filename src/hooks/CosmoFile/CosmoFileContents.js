import React, { useState, useEffect } from 'react';
import CosmoPicture from '../../data/cosmo.jpeg';
import captureAnalytics from '../../scripts/captureAnalytics.js';

export default function CosmoFileContents(props) {

  useEffect(() => {
    captureAnalytics("cosmo");
  }, [])

  const styleProps = {
    "width" : "100%",
    "height" : "auto"
  }

  return (
    <img style={styleProps} src={CosmoPicture} />
  )
}
