import { PaginatedResponse } from "@/interfaces/routes.interface";
import { SaveSearchDto } from "@/dtos/search/saveSearch.dto";
import { Search, User } from "@/interfaces/models.interface";
import searchModel from "@/models/Search";
import { parseISO } from "date-fns";

class SearchService {
  public async saveSearch(data: SaveSearchDto, user: User): Promise<Search> {
    return searchModel.create({ ...data, user });
  }

  public async listSavedSearches(
    user: User,
    page: number,
    limit: number,
    url: URL,
    filterByDate: string
  ): Promise<PaginatedResponse> {
    const dateFilter = filterByDate
      ? { createdAt: { $gte: parseISO(filterByDate) } }
      : {};

    const results = await searchModel
      .find({ user, ...dateFilter })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalCount = await searchModel.countDocuments({ user });

    // TODO: this can be refactored into a function
    let next = null,
      previous = null;

    if (totalCount > results.length) {
      // has more results
      const newQueryParams = new URLSearchParams({
        page: `${page + 1}`,
        limit: `${limit}`,
      });
      next = new URL(url.origin + url.pathname + newQueryParams);
    }

    if (page !== 1 && next) {
      // we can go back to previous
      const newQueryParams = new URLSearchParams({
        page: `${page - 1}`,
        limit: `${limit}`,
      });
      previous = new URL(url.origin + url.pathname + newQueryParams);
    }

    return { results, totalCount, next, previous };
  }
}

export default SearchService;
