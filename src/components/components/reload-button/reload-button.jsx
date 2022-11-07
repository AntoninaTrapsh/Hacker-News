import React from "react"
import styles from "../../pages/news-page/news-pages.module.css";
import {LoadingOutlined, ReloadOutlined} from "@ant-design/icons";

const ReloadButton = ({handleReloadClick, isLoading}) => {
    return (
        <button className={styles['news-page__reload-button']} disabled={isLoading} onClick={handleReloadClick}>
            {
                isLoading ? <LoadingOutlined/> : <ReloadOutlined/>
            }
        </button>
    )
}

export default ReloadButton;
