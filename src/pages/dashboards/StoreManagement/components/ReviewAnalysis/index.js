import React, { useContext } from "react";

import ResultsContext from "../../../../../contexts/ResultsContext";
import LoaderDiv from "../../../../components/LoaderDiv";

import Navbar from "./Navbar";
import ReviewsReportCard from "./ReviewsReportCard";
import Search from "./Search";

function ReviewAnalysis() {
  const { navValue, reviewsLoading } = useContext(ResultsContext);
  return (
    <React.Fragment>
      <Navbar />
      <br />
      {{
        2: (
          <React.Fragment>
            <Search />
            {reviewsLoading ? (
              <div>
                <LoaderDiv />
              </div>
            ) : (
              <ReviewsReportCard />
            )}
          </React.Fragment>
        ),
      }[navValue] || null}
    </React.Fragment>
  );
}

export default ReviewAnalysis;
