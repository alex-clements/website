import React, { useState, useEffect} from 'react';
import './MenuBar.css';


export default function MenuBarDateTime(props) {
    const [currentTime, setCurrentTime] = useState(0)
  const d = new Date();

  useEffect(() => {
      setInterval(updateTime, 1000)
  })

  const updateTime = () => {
      var d = new Date()
      var minutes = d.getUTCMinutes().toString();
      setCurrentTime(d.getHours() + ":" + (minutes.length == 1 ? "0" + minutes : minutes));
  }

  return (
    <div className="menu-bar-datetime">
        <p className="mx-2 mb-0 menu-bar-font">{currentTime}</p>
    </div>
  )
}
