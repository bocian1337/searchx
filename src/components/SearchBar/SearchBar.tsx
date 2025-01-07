import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../context/SearchContext';
import SearchDropdown from '../SearchDropdown/SearchDropdown';
import { ReactComponent as MagnifyingGlassIcon } from '../../icons/magnifying-glass.svg';
import { ReactComponent as XIcon } from '../../icons/x.svg';
import styles from './SearchBar.module.css'

const SearchBar = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { value, setValue, searchAutocomplete, autocompleteItems } = useSearch();
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isInputFocused) setIsInputFocused((prev) => !prev);
    setValue(event.target.value);
    searchAutocomplete(event.target.value);
  }

  const handleClick = () => {
    inputRef.current?.focus();
    setIsInputFocused(true);
  };

  const handleClear = (event: React.MouseEvent<SVGElement>) => {
    event.stopPropagation();
    setValue('');
    searchAutocomplete('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value !== '') {
      navigate(`/search/${value}`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsInputFocused(false);
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isInputFocused) setIsDropdownOpen(!!autocompleteItems.length);
  }, [autocompleteItems.length, isInputFocused]);

  return (
    <div className={styles.wrapper}>
      <div
        ref={wrapperRef}
        className={`
          ${styles.searchBarWrapper}
          ${isInputFocused ? styles.focused : ''}
          ${isDropdownOpen ? styles.resultsOpen : ''}
        `}
        onClick={handleClick}
      >
        <MagnifyingGlassIcon />
        <input
          type='text'
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          autoFocus
        />
        {!!value.length && <XIcon className={styles.xIcon} aria-label='Clear' onClick={handleClear} />}
      </div>
      <SearchDropdown isOpen={isDropdownOpen} />
    </div>
  );
};

export default SearchBar;
