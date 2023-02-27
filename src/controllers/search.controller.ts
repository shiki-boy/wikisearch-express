import { SaveSearchDto } from "./../dtos/search/saveSearch.dto";
import { NextFunction, Response } from "express";

import SearchService from "@/services/search.service";
import { RequestWithUser } from "@/interfaces/utils.interface";

class SearchController {
  public searchService = new SearchService();

  public listSavedSearches = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.searchService.listSavedSearches(req.user);

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };

  public saveSearch = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const searchData: SaveSearchDto = req.body;
      const newSearch = await this.searchService.saveSearch(
        searchData,
        req.user
      );
      res.json({ newSearch });
    } catch (error) {
      next(error);
    }
  };
}

export default SearchController;
