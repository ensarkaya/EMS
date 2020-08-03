import React, { Component } from 'react';
import Popup from "reactjs-popup";
import QRCode from "react-qr-code";

export default class PopupComp extends Component{
    render() {
        const buttonCss={
            position: 'fixed',
            top:'512px',
            right:'882px',
            zIndex:'1',
            background: 'blue',
            color: 'white',
            padding: '20px',
            textAlign: 'center',
            textDecorationColor: 'yellow',
            display : 'inline-block',
            fontSize: '16px',
            borderRadius:'24px'
        };
        const modalCss={
            position: 'fixed',
            top:'512px',
            right:'812px',
            zIndex:'1'
        };
        let userFirstName= this.props.children.userFirstName;
        let userLastName= this.props.children.userLastName;
        let userTc= this.props.children.userTc;
        let userEmail= this.props.children.userEmail;
        let eventName= this.props.children.eventName;
        let eventStart=this.props.children.eventDate;
        let eventEnd=this.props.children.eventEndDate;
        let qrMessage = "Etkinlik Adi: " + eventName + " Etkinlik Baslangic Tarihi: " + eventStart + " Etkinlik Bitis Tarihi: " +
                        eventEnd+ " Kullanici Adi: " + userFirstName+ " Kullanici Soyadi: " + userLastName +
                        " Kullanici Email: " + userEmail + " Kullanici TCK: "+ userTc;
        return(
            <div>
                <Popup trigger={<button className="button" style={buttonCss} > QR Kodu Göster</button>}
                       closeOnDocumentClick
                >
                    <div style={modalCss}>
                        <QRCode value={qrMessage} />
                    </div>
                </Popup>
            </div>

        );
    }

}