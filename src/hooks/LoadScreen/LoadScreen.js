import React, {useEffect, useState} from 'react';
import './LoadScreen.css';
import { init } from 'ityped'


export default function LoadScreen(props) {
    useEffect(() => {
        const myElement1 = document.querySelector('#myElement1')
        init(myElement1, {showCursor: false, disableBackTyping: true, cursorChar: "_", typeSpeed: 10, 
                         strings: ['alex.os.init();'], onFinished: textBlock2})

        
    }, [])

    const textBlock2 = () => {
      const myElement2 = document.querySelector('#myElement2')
      init(myElement2, {showCursor: false, disableBackTyping: true, cursorChar: "_", typeSpeed: 10, 
                       strings: ['BOOTING UP'], startDelay: 100, onFinished: textBlock3})
    }

    const textBlock3 = () => {
      const myElement2 = document.querySelector('#myElement3')
      init(myElement2, {showCursor: true, disableBackTyping: true, cursorChar: "_", typeSpeed: 10, 
                       strings: ['HACKING THINGS TOGETHER...'], startDelay: 100, onFinished: setTimeout(loadFinished, 1500)})
    }

    const loadFinished = () => {
      props.onComplete();
    }

  return (
        <div className="load-screen text-start container-fluid" onClick={loadFinished}>
          <div id="myElement1" className="text-start animated-text"></div>
          <br />
          <div id="myElement2" className="text-start animated-text"></div>
          <br />
          <div id="myElement3" className="text-start animated-text"></div>
        </div>
  )
}
