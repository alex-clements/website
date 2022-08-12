import React, { useEffect } from "react";
import captureAnalytics from "../../scripts/captureAnalytics";
import "./SpaceInvaders.css";
import SpaceInvadersGame from "./SpaceInvadersGame.js";

export default function SpaceInvadersContents(props) {
  useEffect(() => {
    var spaceInvadersGame = new SpaceInvadersGame();
    captureAnalytics("space invaders");

    return () => {
      spaceInvadersGame.stopGame();
    };
  }, []);

  return (
    <div
      id="space-invaders-game"
      tabIndex="0"
      className="space-invaders-main"
    ></div>
  );
}
