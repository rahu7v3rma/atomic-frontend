//import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Grid, Skeleton, Snackbar, SnackbarContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/macro";

import TransitionAlerts from "../../../../../components/alerts/TransitionAlert";
import { productDetailSelector } from "../../../../../redux/slices/product_detail";

// import StarRating from "../shared/StarRating";

const Copy = "/assets/Copy.png";

const BoxContainer = styled(Grid)`
  background: #ffffff;
  width: 100%;
  border: 1px solid #e2e8f0;
  margin: 5px 0;
  border-radius: 8px;
  margin-top: 32px;
  padding: 20px;
`;

//const InfoIcon = styled(InfoOutlinedIcon)`
//  width: 20px;
//  height: 20px;
//  margin-left: 5px;
//  color: #94a3b8;
//`;

const ImageItem = styled.img`
  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: 10px;
  margin-left: 20px;
  background: #ffffff;
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
`;

const CopyIcon = styled.img`
  width: 22px;
  height: 22px;
  margin-left: 5px;
  cursor: pointer;
`;

const Li = styled.div`
  text-align: left;
  padding: 0;
  font-family: Inter;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 28px;
  display: flex;
  align-items: center;
  color: #0f172a;
  text-decoration: ${(p) => (p.strike ? "line-through" : "")};
`;

const Head = styled.div`
  text-align: left;
  padding: 0;
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 28px;
  color: #64748b;
  margin-left: 35px;
`;

const Title = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  color: #0f172a;
  margin-left: 35px;
  margin-top: 20px;
`;

const SubTitle = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  color: #215ee4;
`;

//const Span = styled.span`
//  color: #215ee4;
//  font-family: Inter;
//  font-style: normal;
//  font-weight: 400;
//  font-size: 14px;
//  line-height: 28px;
//  padding-right: 9px;
//`;

const Product = ({
  productDetail = {},
  name = "",
  asin = "",
  sku = "",
  image = "",
  productDetailLoading = false,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const copyContent = async () => {
    setOpen(true);
    try {
      let text = document.getElementById("asinLi").innerHTML;
      await navigator.clipboard.writeText(text);
    } catch {}
  };
  const { productDetailErrorMessage } = useSelector(productDetailSelector);
  const [alertData, setAlertData] = useState({
    errorAlert: false,
    messageFailure: "",
  });

  useEffect(() => {
    if (productDetailErrorMessage !== null) {
      setAlertData({
        errorAlert: true,
        messageFailure: productDetailErrorMessage,
      });
    }
  }, [productDetailErrorMessage]);

  return (
    <React.Fragment>
      <BoxContainer container>
        {productDetailLoading ? (
          <>
            {[1, 2, 3, 4, 5].map((item) => (
              <Skeleton
                key={item}
                width={"100%"}
                sx={{ mt: 5, ml: 5 }}
                variant="rectangular"
                height={15}
              />
            ))}
          </>
        ) : (
          <>
            <Grid item md={3} lg={3} xl={2}>
              <ImageItem
                src={
                  image
                    ? image
                    : productDetail?.data?.image ||
                      "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
                }
              />
            </Grid>
            <Grid item md={12} lg={9}>
              <Title>
                {name
                  ? name
                  : productDetail.data
                  ? productDetail.data.productName
                  : null}
              </Title>
              <SubTitle />
              <Grid container>
                <Grid item md={6}>
                  <Grid container>
                    <Grid item md={4}>
                      <Head>ASIN:</Head>
                      <Head>SKU:</Head>
                      {/*<Head>Price:</Head>*/}
                      {/*<Head>Created:</Head> */}
                      {/* <Head>Rating:</Head> */}
                    </Grid>
                    <Grid item md={8}>
                      <Li>
                        <Li id="asinLi">
                          {asin
                            ? asin
                            : productDetail.data
                            ? productDetail.data.parent_asin
                            : null}
                        </Li>
                        <CopyIcon
                          role="button"
                          src={Copy}
                          onClick={copyContent}
                        />
                      </Li>
                      <Li>
                        {sku
                          ? sku
                          : productDetail.data
                          ? productDetail.data.sku
                          : null}
                      </Li>
                      {/*<Li>*/}
                      {/*  $*/}
                      {/*  {productDetail.price*/}
                      {/*    ? productDetail.price*/}
                      {/*    : productDetail.data*/}
                      {/*    ? productDetail.data.yourPrice*/}
                      {/*    : null}*/}
                      {/*</Li>*/}
                      {/* <Li strike={true}>{productDetail.created}</Li> */}
                      {/* <Li>
                        <StarRating reviews={"20,470"} rating={5} />
                      </Li> */}
                    </Grid>
                  </Grid>
                </Grid>
                {/* <Grid item md={6}>
                  <Grid container>
                    <Grid item md={4}>
                      <Head>Ranking:</Head>
                      <Head>Size::</Head>
                      <Head>Estimated fees:</Head>
                    </Grid>
                    <Grid item md={8}>
                      <Li strike={true}>
                        <Span>{productDetail.ranking}</Span>in Flags
                      </Li>
                      <Li strike={true}>
                        {productDetail.size} <InfoIcon />
                      </Li>
                      <Li strike={true}>
                        {productDetail.estimatedFees}
                        <InfoIcon />
                      </Li>
                    </Grid>
                  </Grid>
                </Grid> */}
              </Grid>
            </Grid>
          </>
        )}
      </BoxContainer>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Text copied"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <SnackbarContent
          sx={{ minWidth: "100px !important" }}
          message="Text copied"
        />
      </Snackbar>
      <TransitionAlerts alert={alertData} />
    </React.Fragment>
  );
};

export default Product;
