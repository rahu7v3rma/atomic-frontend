import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import {
  fetchProductKeywords,
  productDetailSelector,
} from "../../../../../redux/slices/product_detail";

const ProductContainer = styled(Box)`
  background: #ffffff;
  width: 100%;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  margin-top: 20px;
  display: flex;
`;

const ProductImage = styled.img`
  background: #ffffff;
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin: 20px;
`;

const ProductTitle = styled(Typography)`
  font: 600 16px "Inter", sans-serif;
  color: #0f172a;
  margin: 0;
`;

const ProductSubtitle = styled(ProductTitle)`
  font-size: 13px;
  color: #215ee4;
`;

const ProductTextContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
`;

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { productKeywordsData } = useSelector(productDetailSelector);

  useEffect(() => {
    dispatch(fetchProductKeywords({ productId: 1 }));
  }, [dispatch]);
  return (
    <ProductContainer>
      <ProductImage src={productKeywordsData.productImage} />
      <ProductTextContainer>
        <ProductTitle>{productKeywordsData.title}</ProductTitle>
        <ProductSubtitle>{productKeywordsData.subTitle}</ProductSubtitle>
      </ProductTextContainer>
    </ProductContainer>
  );
};

// eslint-disable-next-line import/no-unused-modules
export default ProductDetails;
