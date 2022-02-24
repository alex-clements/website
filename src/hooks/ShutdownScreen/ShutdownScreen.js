import React, {useEffect} from 'react';
import './Shutdown.css';
import { init } from 'ityped'

export default function ShutdownScreen(props) {

    /**
     * Triggered on component mount. Initiates the typing animation.
     * Triggers the typing animation of the next line.
     */
    useEffect(() => {
        const myElement1 = document.querySelector('#shutdownElement1')
        init(myElement1, {showCursor: false, disableBackTyping: true, cursorChar: "_", typeSpeed: 10, 
                         strings: ['thanks for visiting'], onFinished : textBlock2})
    }, [])

    /**
     * Function for the typing animation of the second line of text.
     * Triggers the animation for the third line of text.
     */
    const textBlock2 = () => {
        const myElement2 = document.querySelector('#shutdownElement2')
        init(myElement2, {showCursor: false, disableBackTyping: true, cursorChar: "_", typeSpeed: 10, 
                         strings: ['to see more of my projects, check out my'], startDelay: 100, onFinished: textBlock3})
      }

      /**
       * Function for the typing animation of the last piece of text.
       */
      const textBlock3 = () => {
        const myElement2 = document.querySelector('#shutdownElement3')
        init(myElement2, {showCursor: false, disableBackTyping: true, cursorChar: "_", typeSpeed: 10, 
                         strings: ['Github'], startDelay: 100})
      }

    return (
        <div className='shutdown-screen'>
            <div className='shutdown-screen-spacer'></div>
            <p id="shutdownElement1" className="shutdown-screen-text"></p>
            <p id="shutdownElement2" className="shutdown-screen-text"></p>
            <strong><a className="shutdown-screen-text" href="https://github.com/alex-clements"><p className="shutdown-screen-text" id="shutdownElement3"></p></a></strong>
        </div>
    )
}