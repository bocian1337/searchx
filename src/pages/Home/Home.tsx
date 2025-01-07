import React from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <>
      <h1 className={styles.heading}>SearchX</h1>
      <SearchBar />
    </>
  );
};

export default Home;
