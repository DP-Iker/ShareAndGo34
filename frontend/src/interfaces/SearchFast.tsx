export type SearchFast = {
  types: Array<string>;
  locate: string;
  fromDate: string;
  toDate: string;
};
export function SearchFast(): SearchFast {
  return {
    types: [],
    locate: "",
    fromDate: "",
    toDate: "",
  };
}

export function SearchFastLleno(
  typesI: Array<string>,
  locateI: string,
  fromDateI: string,
  toDateI: string
): SearchFast {
  return {
    types: typesI,
    locate: locateI,
    fromDate: fromDateI,
    toDate: toDateI,
  };
}
