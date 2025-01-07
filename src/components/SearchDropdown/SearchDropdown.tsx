import React from "react";
import { useSearch } from "../../context/SearchContext";
import DropdownItem from "../DropdownItem/DropdownItem";
import styles from "./SearchDropdown.module.css";

interface SearchDropdownProps {
  isOpen: boolean;
}

const SearchDropdown = ({ isOpen }: SearchDropdownProps) => {
  const { value, autocompleteItems } = useSearch();

  if (!isOpen || !autocompleteItems.length) return null;

  const listOfItems =
    value !== "" ? (
      <>
        <DropdownItem
          key={value}
          item={{ title: value, id: 0, description: "" }}
        />
        {autocompleteItems.slice(0, 9).map((result) => (
          <DropdownItem key={result.id} item={result} />
        ))}
      </>
    ) : (
      autocompleteItems.map((result) => (
        <DropdownItem key={result.id} item={result} />
      ))
    );

  return (
    <div className={styles.dropdownWrapper}>
      <div className={styles.divider} />
      <ul className={styles.listWrapper}>{listOfItems}</ul>
    </div>
  );
};

export default SearchDropdown;
