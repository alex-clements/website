import React, {useEffect, useState} from 'react';
import './LoadScreen.css';
import { init } from 'ityped'


export default function LoadScreen(props) {
    const [stopFlag, setStopped] = useState(false);

    useEffect(() => {
        const myElement1 = document.querySelector('#myElement1')
        init(myElement1, {showCursor: false, disableBackTyping: true, cursorChar: "_", typeSpeed: 10, 
                         strings: ['alex.os.init();'], onFinished: textBlock2})
    }, [])

    const textBlock2 = () => {
      const myElement2 = document.querySelector('#myElement2')
      init(myElement2, {showCursor: false, disableBackTyping: true, cursorChar: "_", typeSpeed: 10, 
                       strings: ['alex.getOutOfBed();'], startDelay: 100, onFinished: textBlock3})
    }

    const textBlock3 = () => {
      const myElement2 = document.querySelector('#myElement3')
      init(myElement2, {showCursor: false, disableBackTyping: true, cursorChar: "_", typeSpeed: 10, 
                       strings: ['alex.getCoffee();'], startDelay: 100, onFinished: textBlock4})
    }

    const textBlock4 = () => {
      const myElement2 = document.querySelector('#myElement4')
      init(myElement2, {showCursor: false, disableBackTyping: true, cursorChar: "_", typeSpeed: 5, 
                       strings: ['alex.doSomething();'], startDelay: 100, onFinished: textBlock5})
    }

    const textBlock5 = () => {
      const myElement2 = document.querySelector('#myElement5')
      init(myElement2, {showCursor: false, disableBackTyping: true, cursorChar: "_", typeSpeed: 10, 
                       strings: ['HACKING THINGS TOGETHER'], startDelay: 100, onFinished: textBlock6})
    }

    const textBlock6 = () => {
      const myElement2 = document.querySelector('#myElement6')
      init(myElement2, {showCursor: true, disableBackTyping: true, cursorChar: "_", typeSpeed: 10, 
                       strings: ['BOOTING UP...'], startDelay: 100, onFinished: finish})
    }

    const finish = () => {
      setTimeout(loadFinished, 1500);
    }

    const loadFinished = () => {
      props.onComplete();
    }

  return (
        <div className="load-screen text-start container-fluid">
          <div id="myElement1" className="text-start animated-text"></div>
          <br />
          <div id="myElement2" className="text-start animated-text"></div>
          <br />
          <div id="myElement3" className="text-start animated-text"></div>
          <br />
          <div id="myElement4" className="text-start animated-text"></div>
          <br />
          <div id="myElement5" className="text-start animated-text"></div>
          <br />
          <div id="myElement6" className="text-start animated-text"></div>
        </div>
  )
}
