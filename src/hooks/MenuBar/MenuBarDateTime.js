import React, { useState, useEffect} from 'react';
import './MenuBar.css';

export default function MenuBarDateTime(props) {
  const [currentTime, setCurrentTime] = useState(0)
  const d = new Date();

  /**
   * Triggered upon component mount. Sets an interval to update the time each second.
   */
  useEffect(() => {
      setInterval(updateTime, 1000)
  }, [])

  /**
   * Function for updating the time displayed by the component.
   */
  const updateTime = () => {
      var d = new Date()
      var minutes = d.getUTCMinutes().toString();
      var hours = d.getHours() > 12 ? d.getHours() - 12 : d.getHours();
      setCurrentTime(hours + ":" + (minutes.length == 1 ? "0" + minutes : minutes));
  }

  return (
    <div className="menu-bar-datetime">
        <p className="mx-2 mb-0 menu-bar-font">{currentTime}</p>
    </div>
  )
}