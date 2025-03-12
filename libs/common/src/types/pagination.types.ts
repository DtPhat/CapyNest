export interface Sort {
  field: string,
  direction: "asc" | "desc"
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalCount: number;
}