import React from "react";
import { useSearch } from "../../context/SearchContext";
import styles from "./ResultsList.module.css";

const ResultsList = () => {
  const { results, resultsNumber, searchTime } = useSearch();

  if (!results.length || !resultsNumber || searchTime === null) return null;

  const getStats = () =>
    `Found ${resultsNumber} result${resultsNumber === 1 ? "" : "s"} (${
      searchTime === 0 ? "<0.01" : searchTime?.toFixed(2)
    } ms)`;

  return (
    <div className={styles.pageWrapper}>
      <span className={styles.statWrapper}>{getStats()}</span>
      <div className={styles.listWrapper}>
        {results.map((result) => (
          <div className={styles.itemWrapper} key={result.id}>
            <a href={result.url}>{result.title}</a>
            <span>{result.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsList;
