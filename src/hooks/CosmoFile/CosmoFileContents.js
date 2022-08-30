import React, { useEffect } from "react";
import CosmoPicture from "../../data/cosmo.jpeg";
import captureAnalytics from "../../scripts/captureAnalytics";

export default function CosmoFileContents(props) {
  /**
   * Object with the style props for the cosmo picture.
   */
  const styleProps = {
    width: "100%",
    height: "auto",
  };

  useEffect(() => {
    captureAnalytics("cosmo");
  }, []);

  return <img style={styleProps} src={CosmoPicture} />;
}
