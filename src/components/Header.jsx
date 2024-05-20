import React from 'react';
import Navbar from './header/Navbar';
import Headimg from './header/Headimg';

const Header = (props) => {
    return (
        <div>
            <div className="">
                <Navbar url={props.url}/>
            </div>
            <div className="py-2">
                <Headimg/>
            </div>
        </div>
    );
};

export default Header;