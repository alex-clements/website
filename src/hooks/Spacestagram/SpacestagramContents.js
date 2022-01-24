import React from 'react';

export default function ReadMeContents(props) {

  const styleProps = {
    "height": "100%",
    "width":"100%",
    "backgroundColor": "white",
    "display": "flex"
  }

  return (
    <iframe src="https://alex-clements.github.io/spacestagram/" style={styleProps}>
    </iframe>
  )
}
