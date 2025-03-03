import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import styled from "styled-components";

const BoxCon = styled.div`
  display: flex;
  padding: 20px 5px 20px 5px;
`;

const MyTableCell = styled(TableCell)`
  border: 1.5px solid #ddd;
  padding: 0;
  text-align: center;
  &:first-child {
    border-left: none;
  }
`;

const ImageItem = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
`;

const TextContiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 10px;
  flex: 1;
`;

const TextCon = styled.label`
  color: #3b5998;
  font-weight: 700;
  font-size: 14px;
  text-align: left;
`;

const TextId = styled.label`
  color: lightgray;
  font-weight: 700;
  font-size: 14px;
  text-align: left;
`;

const MyTableContainer = styled(TableContainer)`
  border: 1.5px solid #ddd;
  padding: 16px;
  border-radius: 10px;
  background: #fff;
`;

const MyTableHead = styled(TableHead)`
  th {
    border: none;
    padding-bottom: 8px;
    &:first-child {
      text-align: left;
    }
  }
`;

const MyTableRow = styled(TableRow)``;

function WeeklyInsights({ weeklyInsightData }) {
  const ChangeCell = ({ change }) => (
    <MyTableCell
      style={{
        color: change === 0 ? "#000000" : change > 0 ? "#228B22" : "#FF0000",
      }}
    >
      {change}%
    </MyTableCell>
  );

  return (
    <MyTableContainer>
      <Table>
        <MyTableHead>
          <MyTableRow>
            <MyTableCell>Product</MyTableCell>
            <MyTableCell>Metric</MyTableCell>
            <MyTableCell>This Week</MyTableCell>
            <MyTableCell> Last Week</MyTableCell>
            <MyTableCell>Change</MyTableCell>
          </MyTableRow>
        </MyTableHead>
        <TableBody>
          {weeklyInsightData.map((item, key) => {
            return (
              <React.Fragment key={key}>
                <MyTableRow>
                  <MyTableCell
                    rowSpan="3"
                    style={{
                      width: "55%",
                      borderBottom:
                        key === weeklyInsightData.length - 1 && "none",
                    }}
                  >
                    <BoxCon>
                      <ImageItem
                        src={
                          "https://images-na.ssl-images-amazon.com/images/I/" +
                          item.images_csv?.split(",")[0]
                        }
                      />
                      <TextContiner>
                        <TextCon>{item.product_title}</TextCon>
                        <TextId>SKU: {item.sku}</TextId>
                      </TextContiner>
                    </BoxCon>
                  </MyTableCell>
                  <MyTableCell style={{ textAlign: "center" }}>
                    Sessions
                  </MyTableCell>
                  <MyTableCell>{item.sessions.last_7_days ?? 0}</MyTableCell>
                  <MyTableCell>
                    {item.sessions.previous_7_days ?? 0}
                  </MyTableCell>
                  <ChangeCell change={item.sessions.change ?? 0} />
                </MyTableRow>
                <MyTableRow>
                  <MyTableCell>Avg. Price</MyTableCell>
                  <MyTableCell>{item.avg_price.last_7_days ?? 0}$</MyTableCell>
                  <MyTableCell>
                    {item.avg_price.previous_7_days ?? 0}$
                  </MyTableCell>
                  <ChangeCell change={item.avg_price.change ?? 0} />
                </MyTableRow>
                <MyTableRow>
                  <MyTableCell>CVR</MyTableCell>
                  <MyTableCell>{item.cvr.last_7_days ?? 0}%</MyTableCell>
                  <MyTableCell>{item.cvr.previous_7_days ?? 0}%</MyTableCell>
                  <ChangeCell change={item.cvr.change ?? 0} />
                </MyTableRow>
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </MyTableContainer>
  );
}

export default WeeklyInsights;
