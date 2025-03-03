import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import {
  Card,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  ListItemText as MuiListItemText,
  Pagination as MuiPagination,
  Typography as MuiTypography,
  Rating,
  Select,
  TextField,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { darken } from "polished";
import React from "react";
import { CSVLink } from "react-csv";
import { Search as SearchIcon } from "react-feather";
import styled from "styled-components/macro";

import { filters, sort_by_list } from "../../constants";

const CardContainer = styled(Card)`
  padding: 20px;
`;

const Pagination = styled(MuiPagination)`
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
`;

const ListItemText = styled(MuiListItemText)`
  span {
    display: flex;
  }
`;

const PickerContainer = styled("div")`
  margin-bottom: 20px;
`;

const Typography = styled(MuiTypography)`
  margin-bottom: 20px;
`;

const Search = styled.div`
  border-radius: 2px;
  background-color: ${(props) => props.theme.header.background};
  display: none;
  position: relative;
  width: 22px;

  &:hover {
    background-color: ${(props) => darken(0.05, props.theme.header.background)};
  }

  ${(props) => props.theme.breakpoints.up("md")} {
    display: block;
  }
`;

const SearchIconWrapper = styled.div`
  width: 22px;
  height: 100%;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 22px;
    height: 22px;
  }
`;

const ReviewWrapper = styled.span`
  height: 22px;
  display: flex;
  align-items: center;
  svg {
    width: 22px;
    height: 22px;
    margin-right: 5px;
  }
`;

const DownloadIconWrapper = styled.div`
  margin-top: 20px;
  svg {
    width: 50px;
    height: 50px;
  }
`;

function AllReviews({ reviewsAsin }) {
  const [keyword, setKeyword] = React.useState("");
  const [filter, setFilter] = React.useState("");
  const [sortBy, setSortBy] = React.useState("");
  const [startValue, setStartValue] = React.useState(new Date());
  const [endValue, setEndValue] = React.useState(new Date());
  const [showDateRange, setShowDateRange] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [reviews, setReviews] = React.useState(reviewsAsin.reviews);
  const max_reviews_per_page = 5;

  const handleStartDateChange = (newValue) => {
    setStartValue(newValue);
  };

  const handleEndDateChange = (newValue) => {
    setEndValue(newValue);
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleDateClick = (_event) => {
    setShowDateRange(true);
  };

  const handlePageChange = (e, value) => {
    setPage(value);
  };

  const handleFilterClick = () => {
    let rev = [...reviewsAsin.reviews];
    if (keyword) {
      rev = rev.filter(
        (elem) =>
          (elem.title && elem.title.includes(keyword)) ||
          (elem.body && elem.body.includes(keyword))
      );
    }

    if (filter) {
      rev = rev.filter(
        (elem) =>
          (typeof filter === "number" &&
            elem.rating >= filter &&
            filter + 1 > elem.rating) ||
          (typeof filter !== "number" && elem.verified_purchase)
      );
    }

    if (sortBy) {
      switch (sortBy) {
        case "1":
          rev.sort(function (first, second) {
            return (
              new Date(first.date_utc).getTime() -
              new Date(second.date_utc).getTime()
            );
          });
          break;
        case "2":
          rev.sort(function (first, second) {
            return (
              new Date(second.date_utc).getTime() -
              new Date(first.date_utc).getTime()
            );
          });
          break;
        case "3":
          rev.sort(function (first, second) {
            return first.helpful_votes - second.helpful_votes;
          });
          break;
        default:
          rev.sort(function (first, second) {
            return second.helpful_votes - first.helpful_votes;
          });
      }
    }

    if (showDateRange) {
      rev = rev.filter(
        (elem) =>
          new Date(elem.date_utc).getTime() >= startValue.getTime() &&
          new Date(elem.date_utc).getTime() <= endValue.getTime()
      );
    }
    setPage(1);
    setReviews(rev);
  };

  return (
    <CardContainer>
      <Typography variant="h2">All reviews</Typography>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <TextField
            id="Keyword"
            label="Keyword"
            variant="outlined"
            onChange={handleKeywordChange}
            value={keyword}
          />
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel id="filter-by-input-label">Filter by</InputLabel>
            <Select
              labelId="filter-by-select-label"
              id="filter-by-select"
              value={filter}
              label="Filter by"
              onChange={handleFilterChange}
            >
              {filters.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel id="sort-by-input-label">Sort by</InputLabel>
            <Select
              labelId="sort-by-select-label"
              id="sort-by-select"
              value={sortBy}
              label="Sort by"
              onChange={handleSortByChange}
            >
              {sort_by_list.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          {!showDateRange && (
            <TextField
              id="outlined-read-only-input"
              label="Select date range"
              defaultValue=""
              InputProps={{
                readOnly: true,
              }}
              onClick={handleDateClick}
            />
          )}
          {showDateRange && (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <PickerContainer>
                <DesktopDatePicker
                  label="Start Date"
                  inputFormat="MM/dd/yyyy"
                  value={startValue}
                  onChange={handleStartDateChange}
                  renderInput={(params) => (
                    <TextField size="small" {...params} />
                  )}
                  style={{ marginBottom: "20px" }}
                />
              </PickerContainer>
              <DesktopDatePicker
                label="End Date"
                inputFormat="MM/dd/yyyy"
                value={endValue}
                onChange={handleEndDateChange}
                renderInput={(params) => <TextField size="small" {...params} />}
              />
            </LocalizationProvider>
          )}
        </Grid>
        <Grid item xs={1} style={{ marginBottom: "10px" }}>
          <Search onClick={handleFilterClick}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
          </Search>
        </Grid>
      </Grid>
      <DownloadIconWrapper>
        <CSVLink data={reviews}>
          <FileDownloadIcon />
        </CSVLink>
      </DownloadIconWrapper>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {reviews
          .slice((page - 1) * max_reviews_per_page, page * max_reviews_per_page)
          .map((review) => (
            <React.Fragment key={review.id}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Rating
                        name="half-rating"
                        value={review.rating}
                        precision={0.5}
                        readOnly
                      />
                      <Typography color="text.primary" variant="h6">
                        {review.title}
                      </Typography>
                    </React.Fragment>
                  }
                  secondary={
                    <React.Fragment>
                      {review.body}
                      <ReviewWrapper>
                        <ThumbUpOffAltIcon />
                        {`Found Helpful: ${review.helpful_votes}`}
                        <CalendarMonthIcon style={{ marginLeft: "10px" }} />
                        {`Review Date and time: ${review.date_utc}`}
                      </ReviewWrapper>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
      </List>
      <Pagination
        count={
          reviews.length
            ? parseInt(reviews.length / max_reviews_per_page) + 1
            : 1
        }
        variant="outlined"
        page={page}
        onChange={handlePageChange}
      />
    </CardContainer>
  );
}

export default AllReviews;
