import React from 'react';
import Prefooter from './footer/Prefooter';
import Redfooter from './footer/Redfooter'


const Footer = (props) => {

    return (
        <div>
            <Prefooter url={props.url}/>
            <Redfooter url={props.url}/>
        </div>
    );
};

export default Footer;