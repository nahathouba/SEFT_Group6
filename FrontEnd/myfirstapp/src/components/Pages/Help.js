import React from "react";
import '../../styles/help.css';
import { Image } from 'react-bootstrap-icons';

function Help(props) {
    return (
        <>
        <h5 className="LOGO_ad">Get further information by contacting us</h5>
        <Image className={"HelpPageImg" + (props.about ? ' AboutPageImg' : '')}/>
        <div className="HelpPageInfo">
            <h4>General enquiries to Bookeroo Team</h4>
            Phone: +61 3 9925 2000<br/>
            Postal address: Rmit University, GPO Box 2476, Melbourne<br/>
            VIC 2001 Australia<br/>
            Street addressL 124 La Trobe Street, Melbourne VIC 3000<br/>
            Hours: Monday to Friday 9am - 5pm, Australian Eastern<br/>
            Standard Time.<br/>
        </div>
        </>
    );
}

export default Help;