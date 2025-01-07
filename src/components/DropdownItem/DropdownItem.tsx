import React from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/SearchContext";
import { SearchItem } from "../../types/SearchItem";
import { ReactComponent as MagnifyingGlassIcon } from "../../icons/magnifying-glass.svg";
import { ReactComponent as ClockIcon } from "../../icons/clock.svg";
import styles from "./DropdownItem.module.css";

interface DropdownItemProps {
  item: SearchItem;
}

const DropdownItem = ({ item }: DropdownItemProps) => {
  const { value, addToHistory, removeFromHistory, history } = useSearch();
  const navigate = useNavigate();
  const matchingPart = item.title.slice(0, value.length);
  const boldPart = item.title.slice(value.length);
  const isInHistory = history.includes(item.id);

  const handleClick = () => {
    if (item.id !== 0) {
      addToHistory(item);
    }
    navigate(`/search/${item.title}`);
  };

  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    removeFromHistory(item.id);
  };

  return (
    <li
      className={`
        ${styles.dropdownItem}
        ${isInHistory ? styles.inHistory : ""}
      `}
      aria-label={item.title}
      onClick={handleClick}
    >
      {isInHistory ? <ClockIcon /> : <MagnifyingGlassIcon />}
      <span>{matchingPart}</span>
      <b>{boldPart}</b>
      {isInHistory && <button onClick={handleRemove}>Remove</button>}
    </li>
  );
};

export default DropdownItem;
