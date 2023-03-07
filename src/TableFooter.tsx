import React, { useEffect } from "react";
import { User } from "./models/user";
import styles from "./TableFooter.module.css"

// range, setPage, page, slice 
function TableFooter(props: { range: number[], setPage: React.Dispatch<React.SetStateAction<number>>, page: number, slice: User[] }) {

    useEffect(() => {
        if (props.slice.length < 1 && props.page !== 1) {
            props.setPage(props.page - 1);
        }
    }, [props.slice, props.page, props.setPage, props]);
    // console.log(props.slice)
    return (
        <div className={styles.tableFooter}>
            {props.range.map((el, index) => (
                <button
                    key={index}
                    className={`${styles.button} ${props.page === el ? styles.activeButton : styles.inactiveButton
                        }`}
                    onClick={() => props.setPage(el)}
                >
                    {el}
                </button>
            ))}
        </div>
    )
}

export default TableFooter