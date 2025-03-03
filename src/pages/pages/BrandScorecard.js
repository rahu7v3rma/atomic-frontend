import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { withTheme } from "styled-components";

// import ResultsContext from "../../contexts/ResultsContext";
// import Brand from "../../pages/dashboards/Brand";
import Niche from "../../pages/dashboards/Niche";
// import the useDispatch Redux hook
// import our fetchBrands thunk
// import { fetchBrands } from "../../redux/slices/brands";

// for local testing
// import brand_data from "./new_brand.json";

const BrandScorecard = () => {
  // const navigate = useNavigate();
  // const { results } = useContext(ResultsContext);

  // initialize the redux hook
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchBrands());
  // }, [results, dispatch]);

  return (
    <React.Fragment>
      {/* <Brand /> */}
      <Niche />
    </React.Fragment>
  );
};

export default withTheme(BrandScorecard);
