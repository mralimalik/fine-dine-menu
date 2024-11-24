import { useState , useContext } from "react";
import { QRCode } from "react-qr-code";
import "./QrCode.css";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
function QrCode() {
  const { selectedVenue } = useContext(AuthContext);


  const {venueId} = useParams();

  return (
    <>
        <div className={`generated-qr-code  ${!selectedVenue?"filter blur-sm opacity-60":""}`}>
          <QRCode
            value={`https://qr.finedinemenu.com/${venueId}`}
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          />
        </div>
    
    </>
  );
}

export default QrCode;
