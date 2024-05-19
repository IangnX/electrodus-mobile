
export interface PromotionResponsePage {
  content:          Promotion[];
  pageable:         Pageable;
  totalPages:       number;
  totalElements:    number;
  last:             boolean;
  sort:             Sort;
  first:            boolean;
  number:           number;
  numberOfElements: number;
  size:             number;
  empty:            boolean;
}


export interface Pageable {
  sort:       Sort;
  pageSize:   number;
  pageNumber: number;
  offset:     number;
  paged:      boolean;
  unpaged:    boolean;
}

export interface Sort {
  sorted:   boolean;
  unsorted: boolean;
  empty:    boolean;
}

export interface Promotion {
    id:number;
    description: string;
    discount:number;
    startDate:number;
    endDate:number;
    serviceId: number;
}
