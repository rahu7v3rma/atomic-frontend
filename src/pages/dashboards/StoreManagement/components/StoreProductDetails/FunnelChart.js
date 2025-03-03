import { ResponsiveFunnel } from "@nivo/funnel";
import React from "react";

const FunnelCharts = (props) => {
  let funnelData = props.data.map((result) => ({
    id: result.title,
    value: result.value,
    label: result.title,
  }));
  return (
    <>
      <ResponsiveFunnel
        data={funnelData}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        direction="horizontal"
        valueFormat=" >-.4s"
        colors={{ scheme: "blue_purple" }}
        borderWidth={20}
        borderColor="#e9effd"
        beforeSeparatorOffset={10}
        afterSeparatorOffset={10}
        currentPartSizeExtension={10}
        currentBorderWidth={40}
        motionConfig="wobbly"
      />
    </>
  );
};

export default FunnelCharts;
