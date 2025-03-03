import { Link } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import styled from "styled-components/macro";

const Store = "/assets/Store.png";

const ProductDetails = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

const ProductText = styled.div`
  display: flex;
`;

const BackArrow = styled.img`
  width: 32px;
  height: 32px;
`;

const Details = styled.div`
  margin-left: 16px;
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
`;

const ProductKeywords = () => {
  return (
    <React.Fragment>
      <ProductDetails>
        <ProductText>
          <div>
            <Link href={"/sm-product-list"}>
              <BackArrow src={Store} />
            </Link>
          </div>
          <Details>Product Keywords & Search Funnel</Details>
        </ProductText>
      </ProductDetails>
    </React.Fragment>
  );
};

export default ProductKeywords;
