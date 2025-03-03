import React from "react";
import { withTheme } from "styled-components";

const NicheRanking = () => {
  return (
    <React.Fragment>
      <iframe
        src="https://niche-ranking.s3.amazonaws.com/static/index.html"
        title="Niche Ranking"
        frameborder="0"
        width="100%"
        height="100%"
        allowtransparency
      />
    </React.Fragment>
  );
};

export default withTheme(NicheRanking);
