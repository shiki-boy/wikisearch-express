import { SaveSearchDto } from "@/dtos/search/saveSearch.dto";
import { Search, User } from "@/interfaces/models.interface";
import searchModel from "@/models/Search";

class SearchService {
  public async saveSearch(data: SaveSearchDto, user: User): Promise<Search> {
    return searchModel.create({ ...data, user });
  }

  public async listSavedSearches(user: User): Promise<Search[]> {
    return searchModel.find({ user });
  }
}

export default SearchService;
