import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchHistoricalCharts,
  productDetailSelector,
} from "../../../../../../redux/slices/product_detail";

import { ChartCard, DaysSelector, PriceChartCard } from "./components";
import { generateDataset, isNonEmptyObject } from "./helpers";
import { Gap, Header, Title } from "./styles";

const HistoricalCharts = (props) => {
  const { store, asin, childAsin, sku } = props;

  const dispatch = useDispatch();
  const { historicalChartsData } = useSelector(productDetailSelector);
  useEffect(() => {
    dispatch(fetchHistoricalCharts({ store, asin, sku, childAsin }));
  }, [dispatch, store, asin, sku, childAsin]);

  const [reviewVelocityOpen, setReviewVelocityOpen] = useState(false);
  const [reviewVelocityDataset, setReviewVelocityDataset] = useState([]);
  const reviewVelocityData = {
    labels: historicalChartsData?.data?.review_velocity?.date,
    datasets: reviewVelocityDataset,
  };

  const [salesRankOpen, setSalesRankOpen] = useState(false);
  const [salesRankDataset, setSalesRankDataset] = useState([]);
  const salesRankData = {
    labels: historicalChartsData?.data?.sales_rank?.date,
    datasets: salesRankDataset,
  };

  const [listPriceDataset, setListPriceDataset] = useState([]);
  const listPriceData = {
    labels: historicalChartsData?.data?.sales_rank?.date,
    datasets: listPriceDataset,
  };
  const [marketplacePriceDataset, setMarketplacePriceDataset] = useState([]);
  const marketplacePriceData = {
    labels: historicalChartsData?.data?.sales_rank?.date,
    datasets: marketplacePriceDataset,
  };

  const [activeDays, setActiveDays] = useState(90);

  useEffect(() => {
    if (isNonEmptyObject(historicalChartsData?.data?.review_velocity)) {
      setReviewVelocityDataset(
        generateDataset(historicalChartsData?.data?.review_velocity)
      );
    }
    if (isNonEmptyObject(historicalChartsData?.data?.sales_rank)) {
      setSalesRankDataset(
        generateDataset(historicalChartsData?.data?.sales_rank)
      );
    }
    if (isNonEmptyObject(historicalChartsData?.data?.price)) {
      if (isNonEmptyObject(historicalChartsData?.data?.price?.list_price)) {
        setListPriceDataset(
          generateDataset(historicalChartsData?.data?.price?.list_price)
        );
      }
      if (
        isNonEmptyObject(historicalChartsData?.data?.price?.marketplace_price)
      ) {
        setMarketplacePriceDataset(
          generateDataset(historicalChartsData?.data?.price?.marketplace_price)
        );
      }
    }
  }, [historicalChartsData]);

  return (
    <>
      <Header>
        <Title>Historical Charts</Title>
        <DaysSelector active={activeDays} setActive={setActiveDays} />
      </Header>
      <Gap height={20} />
      <PriceChartCard
        listPriceData={listPriceData}
        marketplacePriceData={marketplacePriceData}
      />
      <Gap height={10} />
      <ChartCard
        title="Sales Rank"
        data={salesRankData}
        open={salesRankOpen}
        setOpen={setSalesRankOpen}
      />
      <Gap height={10} />
      <ChartCard
        title="Review Velocity"
        data={reviewVelocityData}
        open={reviewVelocityOpen}
        setOpen={setReviewVelocityOpen}
      />
    </>
  );
};

export default HistoricalCharts;
