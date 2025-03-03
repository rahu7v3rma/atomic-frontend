import { StyledArrowDownwardIcon, StyledArrowUpwardIcon } from "./styles";

export const SortIcon = ({ sortType }) => {
  if (sortType === "asc") {
    return <StyledArrowUpwardIcon />;
  } else if (sortType === "desc") {
    return <StyledArrowDownwardIcon />;
  } else return <></>;
};
