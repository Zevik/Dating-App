/**
 * Pagination parameters interface
 */
export interface PaginationParams {
  page: number;
  limit: number;
}

/**
 * Parse pagination parameters from query string
 * @param query Request query object containing page and limit parameters
 * @param defaultLimit Default number of items per page
 * @returns Parsed pagination parameters with defaults applied
 */
export function parsePaginationParams(
  query: any, 
  defaultLimit: number = 10
): PaginationParams {
  const page = query.page ? Math.max(1, parseInt(query.page, 10)) : 1;
  const limit = query.limit ? Math.max(1, Math.min(100, parseInt(query.limit, 10))) : defaultLimit;
  
  return { page, limit };
}

/**
 * Interface for pagination result
 */
export interface PaginatedResult<T> {
  totalCount: number;
  page: number;
  limit: number;
  data: T[];
} 