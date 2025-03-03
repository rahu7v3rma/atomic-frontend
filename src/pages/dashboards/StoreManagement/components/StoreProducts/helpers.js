import { sortAvailableFor } from "../../constants";

export const handleSort = (params) => {
  const {
    columnTitle,
    productsList,
    setProductsList,
    setSortBy,
    sortType,
    sortTypeState,
    setSortType,
  } = params;
  if (Object.keys(sortAvailableFor).includes(columnTitle)) {
    if (productsList.length > 0) {
      const _productList = structuredClone(productsList);
      const _sortType = sortType === "desc" ? "asc" : "desc";
      _productList.sort((a, b) => {
        let _a = sortAvailableFor[columnTitle](a);
        let _b = sortAvailableFor[columnTitle](b);
        return _sortType === "asc" ? _a - _b : _b - _a;
      });
      setSortBy(columnTitle);
      setProductsList(_productList);
      setSortType({
        ...sortTypeState,
        [columnTitle]: _sortType,
      });
    }
  }
};
