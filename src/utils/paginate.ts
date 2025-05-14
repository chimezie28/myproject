interface PaginationParams {
    page?: string | number;
    limit?: string | number;
  }
  
  interface PaginationResult {
    offset: number;
    limit: number;
    page: number;
    pageSize: number;
  }
  
  export function paginate({ page = 1, limit = 10 }: PaginationParams): PaginationResult {
    const pageNumber = Math.max(Number(page) || 1, 1);
    const pageSize = Math.max(Number(limit) || 10, 1);
  
    return {
      offset: (pageNumber - 1) * pageSize,
      limit: pageSize,
      page: pageNumber,
      pageSize,
    };
  }
  