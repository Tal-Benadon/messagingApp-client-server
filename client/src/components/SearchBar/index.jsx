import React from 'react'
import styles from './styles.module.css'
import { BiSearch } from "react-icons/bi";
export default function SearchBar() {

    const handleOnSubmit = (event) => {
        event.preventDefault()
    }


    return (
        <form className={styles.searchBarContainer} onSubmit={handleOnSubmit}>
            <input type="text" placeholder='Search' className={styles.input} />
            <button className={styles.searchButton}>
                <BiSearch className={styles.searchIcon} />
            </button>
        </form>
    )
}
