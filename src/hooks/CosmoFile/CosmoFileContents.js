import React from 'react';
import CosmoPicture from '../../data/cosmo.jpeg';

export default function CosmoFileContents(props) {

  /**
   * Object with the style props for the cosmo picture.
   */
  const styleProps = {
    "width" : "100%",
    "height" : "auto"
  }

  return (
    <img style={styleProps} src={CosmoPicture} />
  )
}
