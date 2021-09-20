import { Button } from "react-bootstrap";
import React, { Component } from "react";
import '../../styles/alert_window.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class AlertWindow extends Component {

    render() {
        return (
        <div className="AlertWindowBack" style={{display: this.props.display}}>
            <div className="AlertWindow">
                <h1 className="Title"
                    style={ this.props.color ? {backgroundColor: this.props.color} : null}>
                    { this.props.title }
                </h1>
                <div className="Content">
                    { this.props.content }
                </div>
                <Button variant="primary" onClick={ this.props.confrim } >Confirm</Button>
                <Button variant="danger" onClick={ this.props.cancel ? this.props.cancel : this.props.confrim }>Cancel</Button>
            </div>
        </div>
        );
        
    }

}

export default AlertWindow;