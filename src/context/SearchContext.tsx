import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useCallback,
} from "react";
import { SearchItem } from "../types/SearchItem";
import { fetchAutocomplete, fetchSearchResults } from "../api/api";

interface SearchContextType {
  value: string;
  autocompleteItems: SearchItem[];
  results: SearchItem[];
  history: number[];
  resultsNumber: number | null;
  searchTime: number | null;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  searchAutocomplete: (query: string) => void;
  searchForResults: (query: string) => void;
  addToHistory: (item: SearchItem) => void;
  removeFromHistory: (id: number) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [value, setValue] = useState("");
  const [autocompleteItems, setAutocompleteItems] = useState<SearchItem[]>([]);
  const [results, setResults] = useState<SearchItem[]>([]);
  const [history, setHistory] = useState<number[]>([]);
  const [resultsNumber, setResultsNumber] = useState<number | null>(null);
  const [searchTime, setSearchTime] = useState<number | null>(null);

  const addToHistory = (item: SearchItem) => {
    if (!history.some((historyItemId) => historyItemId === item.id)) {
      setHistory((prevHistory) => [...prevHistory, item.id]);
    }
  };

  const removeFromHistory = (id: number) => {
    setHistory((prevHistory) =>
      prevHistory.filter((historyItemId) => historyItemId !== id),
    );
  };

  const setResultsWithTime = (results: SearchItem[], time: number) => {
    const resultsLength = results.length;
    setResults(results.slice(0, 10));
    setResultsNumber(resultsLength);
    setSearchTime(time);
  };

  const clearAutocomplete = () => {
    setAutocompleteItems([]);
  };

  const clearResults = () => {
    setResults([]);
    setResultsNumber(null);
    setSearchTime(null);
  };

  const searchAutocomplete = useCallback(async (query: string) => {
    try {
      if (query === "") {
        clearAutocomplete();
        return;
      }

      const searchResults = await fetchAutocomplete(query);
      setAutocompleteItems(searchResults);
    } catch (error) {
      console.error(`error fetching autocomplete results for query ${query}`);
      clearAutocomplete();
    }
  }, []);

  const searchForResults = useCallback(async (query: string) => {
    try {
      if (query === "") {
        clearResults();
        return;
      }

      const start = performance.now();
      const searchResults = await fetchSearchResults(query);
      const end = performance.now();
      setResultsWithTime(searchResults, end - start);
    } catch (error) {
      console.error(`error fetching search results for query ${query}`);
      clearResults();
    }
  }, []);

  return (
    <SearchContext.Provider
      value={{
        value,
        autocompleteItems,
        results,
        history,
        resultsNumber,
        searchTime,
        setValue,
        searchAutocomplete,
        searchForResults,
        addToHistory,
        removeFromHistory,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
