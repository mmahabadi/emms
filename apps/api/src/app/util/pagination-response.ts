export class PaginatedResponse<T>{
    data: Array<T> = [];
    payload = {
      pagination: {
        total: 0,
        page: 1,
        pageSize: 10
      }
    }

  constructor(data: any[], page: number, total: number, pageSize: number) {
    this.data = data;
    this.payload.pagination = {
      page: +page,
      total,
      pageSize: +pageSize
    };
  }
}
