import React, {useEffect} from 'react';
import captureAnalytics from '../../scripts/captureAnalytics.js';

export default function ReadMeContents(props) {

  useEffect(() => {
    captureAnalytics("spacestagram");
}, []);

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
