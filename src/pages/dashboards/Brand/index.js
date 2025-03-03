import Card from "@mui/material/Card";
import React, { useContext, useState } from "react";
import styled from "styled-components/macro";

import ResultsContext from "../../../contexts/ResultsContext";
import ExpandableSection from "../../components/ExpandableSection";
import LoaderDiv from "../../components/LoaderDiv";

import BestsellersSection from "./components/Bestsellers";
import BrandHealth from "./components/BrandHealth";
import BrandInformation from "./components/BrandInformation";
import BrandProducts from "./components/BrandProducts";
import FinancialHealth from "./components/FinancialHealth";
import GrowthPotential from "./components/GrowthPotential";
import OperationalComplexity from "./components/OperationalComplexity";
import Search from "./components/Search";

const TablesRecords = styled("div")`
  padding: 20px;
`;

const Heading = styled("h2")`
  padding: 10px;
  text-align: center;
  cursor: pointer;
`;

function Brand() {
  const [open, setOpen] = useState([true, false, false, false, false, false]);
  const { brandLoading, brand, handleEditableTextFieldChange, edit } =
    useContext(ResultsContext);

  return (
    <React.Fragment>
      <Search />
      <TablesRecords>
        {brandLoading ? (
          <div>
            <LoaderDiv />
          </div>
        ) : Object.keys(brand).length > 0 ? (
          <div>
            <Card>
              <Heading>
                Brand Information
                <ExpandableSection open={open} setOpen={setOpen} idx={0} />
              </Heading>
              {open[0] ? (
                <BrandInformation
                  results={brand}
                  edit={edit}
                  handleInputEdit={handleEditableTextFieldChange}
                />
              ) : null}
            </Card>
            <br />
            <Card>
              <Heading>
                Brand Products
                <ExpandableSection open={open} setOpen={setOpen} idx={1} />
              </Heading>
              {open[1] ? <BrandProducts results={brand} /> : null}
            </Card>
            <br />
            <Card>
              <Heading>
                Operational Complexity
                <ExpandableSection open={open} setOpen={setOpen} idx={1} />
              </Heading>
              {open[1] ? (
                <OperationalComplexity
                  results={brand}
                  edit={edit}
                  handleInputEdit={handleEditableTextFieldChange}
                />
              ) : null}
            </Card>
            <br />
            <Card>
              <Heading>
                Competitive Position
                <ExpandableSection open={open} setOpen={setOpen} idx={2} />
              </Heading>
              {open[2] ? (
                <BestsellersSection
                  results={brand}
                  edit={edit}
                  handleInputEdit={handleEditableTextFieldChange}
                />
              ) : null}
            </Card>
            <br />
            <Card>
              <Heading>
                Financial Health
                <ExpandableSection open={open} setOpen={setOpen} idx={3} />
              </Heading>
              {open[3] ? (
                <FinancialHealth
                  results={brand}
                  edit={edit}
                  handleInputEdit={handleEditableTextFieldChange}
                />
              ) : null}
            </Card>
            <br />
            <Card>
              <Heading>
                Brand Health
                <ExpandableSection open={open} setOpen={setOpen} idx={4} />
              </Heading>
              {open[4] ? (
                <BrandHealth
                  results={brand}
                  edit={edit}
                  handleInputEdit={handleEditableTextFieldChange}
                />
              ) : null}
            </Card>
            <br />
            <Card>
              <Heading>
                Growth Potential
                <ExpandableSection open={open} setOpen={setOpen} idx={5} />
              </Heading>
              {open[5] ? (
                <GrowthPotential
                  results={brand}
                  edit={edit}
                  handleInputEdit={handleEditableTextFieldChange}
                />
              ) : null}
            </Card>
            <br />
          </div>
        ) : null}
      </TablesRecords>
    </React.Fragment>
  );
}
export default Brand;
