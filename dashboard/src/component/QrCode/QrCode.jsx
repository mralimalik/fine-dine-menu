import { useState, useContext } from "react";
import { QRCode } from "react-qr-code";
import "./QrCode.css";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
function QrCode() {
  // get the selectedVenue from context
  const { selectedVenue } = useContext(AuthContext);

  // get venueId from link params to generate qrcode
  const { venueId } = useParams();

  return (
    <>
      <div className={`generated-qr-code  ${!selectedVenue ? "filter blur-sm opacity-60" : ""}`}>
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
