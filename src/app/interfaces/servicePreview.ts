
export interface ServicePreviewPage {
  content:          ServicePreview[];
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


export interface ServicePreview {
  id: number;
  cost: number;
  name: string;
  description: string;
  durationWarranty: number;
  isDefault: boolean
}
