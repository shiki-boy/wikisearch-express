import { Router } from "express";

export interface Routes {
  path?: string;
  router: Router;
}

export interface PaginatedResponse {
  results: any[];
  totalCount: number;
  next: string | null;
  previous: string | null;
}
