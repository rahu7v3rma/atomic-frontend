//import { Link } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components/macro";

import {
  fetchProductDetails,
  productDetailSelector,
} from "../../../../../redux/slices/product_detail";

import Product from "./Product";

const Store = "/assets/Store.png";
const Amazon = "/assets/Amazon.png";

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

const AmazonIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const Details = styled.div`
  margin-left: 16px;
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
`;

const AmazonText = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  color: #334155;
  margin-left: 9px;
`;

const AmazonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 16px;
  height: 32px;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
`;

const StoreProductDetails = ({
  store,
  skuId,
  asinId,
  childAsin,
  isLevel2Selected,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const asin = asinId;
  const sku = skuId;
  const child_asin = childAsin;
  const { productDetailData, productDetailLoading } = useSelector(
    productDetailSelector
  );
  useEffect(() => {
    const { pathname, search } = window.location;
    const params = new URLSearchParams(search);
    if (
      params.has("sku") ||
      params.has("store") ||
      params.has("asin") ||
      params.has("child_asin")
    ) {
      params.set("sku", sku);
      params.set("store", store);
      params.set("asin", asin);
      params.set("child_asin", child_asin);
      const newUrl = `${pathname}?${params.toString()}`;
      navigate(newUrl, { replace: true });
    }
  }, [navigate, store, sku, asin, child_asin]);

  useEffect(() => {
    if (isLevel2Selected) {
      dispatch(
        fetchProductDetails({
          store: store,
          sku: sku,
          asin: asin,
          child_asin: child_asin,
        })
      );
    }
  }, [dispatch, isLevel2Selected, sku, store, asin, child_asin]);

  return (
    <React.Fragment>
      <ProductDetails>
        <ProductText>
          <div>
            <NavLink to={"/sm-product-list"}>
              <BackArrow src={Store} />
            </NavLink>
          </div>
          <Details>Product details</Details>
        </ProductText>
        <AmazonContainer>
          <AmazonIcon src={Amazon} />
          <AmazonText>See in store</AmazonText>
        </AmazonContainer>
      </ProductDetails>
      <Product
        productDetail={productDetailData}
        productDetailLoading={productDetailLoading}
      />
    </React.Fragment>
  );
};

export default StoreProductDetails;
