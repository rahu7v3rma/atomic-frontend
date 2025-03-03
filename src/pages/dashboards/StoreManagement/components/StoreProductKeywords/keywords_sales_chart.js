import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import {
  fetchKeywordsSales,
  keywordsSelector,
} from "../../../../../redux/slices/keywords";
import LoaderDiv from "../../../../components/LoaderDiv";

import KeywordsDynamicChart from "./keywords_dynamic_chart";

function KeywordsSalesBarchart({ cardsDates, isValidDateRange }) {
  //chart data
  const dispatch = useDispatch();
  const { keywordsSalesData, keywordsSalesLoading } =
    useSelector(keywordsSelector);
  const [searchParams] = useSearchParams();
  const selectedSku = searchParams.get("sku")
    ? searchParams.get("sku")
    : "select";
  const selectedStore = searchParams.get("store")
    ? searchParams.get("store")
    : "all";

  React.useEffect(() => {
    if (cardsDates?.startDate && cardsDates?.endDate && isValidDateRange) {
      dispatch(
        fetchKeywordsSales(
          selectedStore,
          selectedSku,
          moment(cardsDates.startDate).format("YYYY-MM-DD"),
          moment(cardsDates.endDate).format("YYYY-MM-DD"),
          moment(cardsDates?.comparedStartDate).format("YYYY-MM-DD"),
          moment(cardsDates?.comparedEndDate).format("YYYY-MM-DD")
        )
      );
    }
  }, [cardsDates, dispatch, selectedStore, selectedSku, isValidDateRange]);

  const keywords = keywordsSalesData.map((el) => el.keyword);
  const current_date_sales = keywordsSalesData.map(
    (el) => el.current_date_sales
  );
  const compared_date_sales = keywordsSalesData.map(
    (el) => el.compared_date_sales
  );

  const search_volumes = keywordsSalesData.map((el) => el.search_volume);

  return (
    <React.Fragment>
      {keywordsSalesLoading ? (
        <LoaderDiv />
      ) : (
        <KeywordsDynamicChart
          dates={[
            moment(cardsDates.startDate).toDate(),
            moment(cardsDates.endDate).toDate(),
          ]}
          keywords={keywords}
          data1={current_date_sales}
          data2={compared_date_sales}
          data3={search_volumes}
          data_type="keyword_sales"
        />
      )}
    </React.Fragment>
  );
}

export default KeywordsSalesBarchart;
