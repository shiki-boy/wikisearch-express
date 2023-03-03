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
      const page = parseInt(req.query?.page as string) ?? 1;
      const limit = parseInt(req.query?.limit as string) ?? 10;
      const url = new URL(
        `${req.protocol}://${req.get("host")}${req.originalUrl}`
      );
      const dateFilter = (req.query.date as string) ?? "";

      const data = await this.searchService.listSavedSearches(
        req.user,
        page,
        limit,
        url,
        dateFilter
      );

      res.status(200).json({ ...data });
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

  public deleteSearch = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      console.log(req.params)
      if (!req.params.id) {
        res.status(400).json({message: "No id provided"})
      }
      await this.searchService.deleteSearch(req.params.id, req.user)

      res.status(204).json({ message: "Search deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
}

export default SearchController;
