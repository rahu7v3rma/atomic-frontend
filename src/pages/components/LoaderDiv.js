import React from "react";
import Loader from "react-js-loader";
import styled from "styled-components/macro";

const LoaderStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LoaderDiv = (props) => {
  const inlineStyles = {
    "`minHeight`": props.loaderHeight,
  };

  return (
    <LoaderStyle style={inlineStyles}>
      <Loader
        type="box-rectangular"
        bgColor="#04175e"
        title="Loading..."
        color="#04175e"
        size={100}
      />
    </LoaderStyle>
  );
};

export default LoaderDiv;
