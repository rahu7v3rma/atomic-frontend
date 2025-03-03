import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import {
  fetchProductDetails,
  fetchProductKeywords,
  productDetailSelector,
} from "../../../../../redux/slices/product_detail";
import Product from "../StoreProductDetails/Product";

import ProductKeywords from "./ProductKeywords";

const StoreProductKeywords = ({ store, skuId, asinId, isLevel2Selected }) => {
  const dispatch = useDispatch();
  const { productKeywordsData, productDetailData, productDetailLoading } =
    useSelector(productDetailSelector);
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const asin = searchParams.get("asin") ? searchParams.get("asin") : asinId;
  const sku = searchParams.get("sku") ? searchParams.get("sku") : skuId;

  useEffect(() => {
    if (isLevel2Selected) {
      dispatch(fetchProductDetails({ store: store, sku: sku, asin: asin }));
    } else {
      dispatch(fetchProductKeywords({ productId: 1 }));
    }
  }, [dispatch, asin, isLevel2Selected, sku, store]);

  return (
    <React.Fragment>
      <ProductKeywords productDetail={productKeywordsData} />
      <Product
        productDetail={productDetailData}
        name={name}
        asin={asin}
        sku={sku}
        productDetailLoading={productDetailLoading}
      />
    </React.Fragment>
  );
};

export default StoreProductKeywords;
