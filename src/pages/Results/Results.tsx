import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSearch } from '../../context/SearchContext';
import SearchBar from '../../components/SearchBar/SearchBar';
import ResultsList from '../../components/ResultsList/ResultsList';
import styles from './Results.module.css';

const Results = () => {
  const params = useParams<{ query: string }>();
  const navigate = useNavigate();
  const { setValue, searchForResults } = useSearch();

  const handleReturnToHomePage = () => {
    setValue('');
    navigate('/');
  };

  useEffect(() => {
    if (params.query) {
      setValue(params.query);
      searchForResults(params.query);
    }
  }, [params.query, setValue, searchForResults])

  return (
    <>
      <div className={styles.wrapper}>
        <h2 onClick={handleReturnToHomePage}>SearchX</h2>
        <SearchBar />
      </div>
      <ResultsList />
    </>
  );
};

export default Results;
