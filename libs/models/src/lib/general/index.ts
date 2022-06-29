
export type ID = undefined | null | string;

export type Entity = { id: ID };

export type PaginationState = {
  page: number
  pageSize: number
  total?: number
  siblingCount?: number
}

export type PaginationLink = {
  label: string;
  active: boolean;
  url: string | null;
  page: number | null
}

export type Response<T> = {
  data?: T
  payload?: {
    message?: string
    errors?: {
      [key: string]: Array<string>
    }
    pagination?: PaginationState
  }
}
