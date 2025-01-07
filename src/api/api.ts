import mockData from "../database/MOCK_DATA.json";
import { SearchItem } from "../types/SearchItem";

export const fetchAutocomplete = async (
  query: string,
): Promise<SearchItem[]> => {
  return new Promise((resolve) => {
    const filteredData = mockData
      .filter((item) =>
        item.title.toLowerCase().startsWith(query.toLowerCase()),
      )
      .slice(0, 10);
    resolve(filteredData);
  });
};

export const fetchSearchResults = async (
  query: string,
): Promise<SearchItem[]> => {
  return new Promise((resolve) => {
    const filteredData = mockData
      .filter((item) =>
        item.title.toLowerCase().startsWith(query.toLowerCase()),
      )
      .map((item) => ({ ...item, url: item.url || "http://example.com/" }));
    resolve(filteredData);
  });
};
