import React from "react"
import {Empty} from "antd";
import styles from "./page-not-found.module.css"

const PageNotFound = () => {
    return (
        <div className={styles['not-found__wrapper']}>
            <Empty description="404 Not Found"/>
        </div>
    )
}

export default PageNotFound;
