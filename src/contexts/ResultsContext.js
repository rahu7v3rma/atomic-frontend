import { createContext, useState } from "react";
import { useSelector } from "react-redux";

// import our fetchNiche thunk
import { brandSelector } from "../redux/slices/brand";
import { nicheSelector } from "../redux/slices/niche";
// import our fetchBrand thunk
// import our fetchAllReviewsReports thunk
import { reviewsSelector } from "../redux/slices/reviews";
// import our fetchStoreAnalytics thunk
import { storeAnalyticsSelector } from "../redux/slices/store_analytics";

const ResultsContext = createContext();

export const ResultsProvider = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [fieldChanges, setFieldChanges] = useState([]);
  const { niche, nicheLoading, nicheErrorMessage } = useSelector(nicheSelector);
  const { reviews, reviewsLoading, reviewsErrorMessage } =
    useSelector(reviewsSelector);
  const [navValue, setNavValue] = useState(2);
  const [reviewsAsin, setReviewsAsin] = useState("");
  const [reviewsCompetingAsins, setReviewsCompetingAsins] = useState([]);

  const { brand, brandLoading, errorMessage, edit } =
    useSelector(brandSelector);

  const {
    storeAnalyticsData,
    storeAnalyticsLoading,
    storeAnalyticsErrorMessage,
  } = useSelector(storeAnalyticsSelector);

  const handleEditableTextFieldChange = (e) => {
    setFieldChanges({ ...fieldChanges, [e.target.name]: e.target.value });
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavValueChange = (value) => {
    setNavValue(value);
  };
  const handleReviewsAsinChange = (value) => {
    setReviewsAsin(value);
  };
  const handleReviewsCompetingAsinsChange = (value) => {
    setReviewsCompetingAsins(value);
  };

  return (
    <ResultsContext.Provider
      value={{
        brand,
        edit,
        niche,
        fieldChanges,
        handleEditableTextFieldChange,
        nicheLoading,
        brandLoading,
        errorMessage,
        nicheErrorMessage,
        reviews,
        reviewsLoading,
        reviewsErrorMessage,
        handleDrawerToggle,
        navValue,
        handleNavValueChange,
        reviewsAsin,
        handleReviewsAsinChange,
        reviewsCompetingAsins,
        handleReviewsCompetingAsinsChange,
        storeAnalyticsData,
        storeAnalyticsLoading,
        storeAnalyticsErrorMessage,
      }}
    >
      {children}
    </ResultsContext.Provider>
  );
};

export default ResultsContext;
