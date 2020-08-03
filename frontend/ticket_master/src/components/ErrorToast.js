import React, { Component } from 'react';
import {Toast, ToastBody, ToastHeader} from 'react-bootstrap';

export default class SuccessToast extends Component{
    render() {
        const toastCss={
            position: 'fixed',
            top:'10px',
            right:'10px',
            zIndex:'1',
            boxShadow:'0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)'
        };
        return(
            <div style={this.props.children.show ? toastCss : null}>
                <Toast className={"border border-warning bg-warning text-white"} show={this.props.children.show}>
                    <ToastHeader className={"bg-warning text-white"} closeButton={false}>
                        <strong className={"mr-auto"}> Oops, bir sorun oluştu</strong>
                    </ToastHeader>
                    <ToastBody>
                        {this.props.children.message}
                    </ToastBody>
                </Toast>
            </div>
        );
    }

}