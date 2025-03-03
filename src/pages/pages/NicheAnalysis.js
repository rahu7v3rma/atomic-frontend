import React from "react";
import { withTheme } from "styled-components";

var jwt = require("jsonwebtoken");

var METABASE_SITE_URL = "https://atomic-growth.metabaseapp.com";
var METABASE_SECRET_KEY =
  "ef93d8bf36e5935eb9cc7072a1c3de1928c61eb734384a6f986f0a22ec8a583d";

var payload = {
  resource: { dashboard: 6 },
  params: {},
  exp: Math.round(Date.now() / 1000) + 600, // 10 minute expiration
};
var token = jwt.sign(payload, METABASE_SECRET_KEY);

var iframeUrl =
  METABASE_SITE_URL +
  "/embed/dashboard/" +
  token +
  "#theme=transparent&bordered=true&titled=true";

const NicheAnalysis = () => {
  return (
    <React.Fragment>
      <iframe
        src={iframeUrl}
        title="Niche analysis"
        frameborder="0"
        width="100%"
        height="100%"
        allowtransparency
      />
    </React.Fragment>
  );
};

export default withTheme(NicheAnalysis);
