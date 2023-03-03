import { Router } from "express";
import SearchController from "@controllers/search.controller";
import { Routes } from "@interfaces/routes.interface";
import authenticate from "@/middlewares/authenticate";
import { validateRequest } from "@/middlewares/validateRequest.middleware";
import { SaveSearchObject } from "@/dtos/search/saveSearch.dto";

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
      validateRequest({ body: SaveSearchObject }),
      this.searchController.saveSearch
    );

    this.router.delete(
      `${this.path}/:id`,
      authenticate,
      this.searchController.deleteSearch
    );
  }
}

export default SearchRoute;
