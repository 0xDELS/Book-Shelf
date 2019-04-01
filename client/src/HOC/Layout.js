import React from 'react';
import Header from '../Components/Header/Header';

const Layout = (props) => {
    return (
        <div>
            <Header/>
            <div>
                {props.children}
            </div>
        </div>
    );
};

export default Layout;