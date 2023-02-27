import { Router } from "express";
import SearchController from "@controllers/search.controller";
import { Routes } from "@interfaces/routes.interface";
import authenticate from "@/middlewares/authenticate";

class SearchRoute implements Routes {
  public path = "/api/search";
  public router = Router();
  public searchController = new SearchController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      authenticate,
      this.searchController.listSavedSearches
    );

    this.router.post(
      `${this.path}`,
      authenticate,
      this.searchController.saveSearch
    );
  }
}

export default SearchRoute;
