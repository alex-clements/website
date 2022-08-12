import React, { useEffect } from "react";
import captureAnalytics from "../../scripts/captureAnalytics";

export default function ReadMeContents(props) {
  /**
   * Object containing the style props for the component.
   */
  const styleProps = {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    display: "flex",
  };

  useEffect(() => {
    captureAnalytics("spacestagram");
  }, []);

  return (
    <iframe
      src="https://alex-clements.github.io/spacestagram/"
      style={styleProps}
      title="spacestagram"
    ></iframe>
  );
}
