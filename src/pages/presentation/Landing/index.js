import React from "react";

import AppBar from "./AppBar";
import Demos from "./Demos";
import FAQ from "./FAQ";
import Features from "./Features";
import Integrations from "./Integrations";
import Introduction from "./Introduction";
import JoinUs from "./JoinUs";
import Testimonial from "./Testimonial";

function Presentation() {
  return (
    <React.Fragment>
      <AppBar />
      <Introduction />
      <Demos />
      <Testimonial />
      <Integrations />
      <Features />
      <FAQ />
      <JoinUs />
    </React.Fragment>
  );
}

export default Presentation;
