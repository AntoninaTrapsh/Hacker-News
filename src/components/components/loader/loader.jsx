import { Spin } from 'antd';
import React from 'react';
import styles from "./loader.module.css"

const App = () => (
    <div className={styles['loader__overlay']}>
        <div className={styles['loader']}>
            <Spin/>
        </div>
    </div>
);

export default App;
