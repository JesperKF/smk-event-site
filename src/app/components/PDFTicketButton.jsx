"use client";

import { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import TicketDocument from "./TicketDocument";
import QRCode from "qrcode";

const PDFTicketButton = ({ event, tickets, name, email }) => {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");

  useEffect(() => {
    const bookingData = {
      eventId: event.id,
      name,
      email,
      tickets,
    };

    QRCode.toDataURL(JSON.stringify(bookingData))
      .then((url) => setQrCodeDataUrl(url))
      .catch((err) => console.error("QR generering fejlede:", err));
  }, [event.id, name, email, tickets]);

  return (
    <PDFDownloadLink
      document={
        <TicketDocument
          event={event}
          tickets={tickets}
          name={name}
          email={email}
          qrCodeDataUrl={qrCodeDataUrl}
        />
      }
      fileName="billet.pdf"
    >
      {({ loading }) =>
        loading ? "Genererer billet..." : "Download billet som PDF"
      }
    </PDFDownloadLink>
  );
};

export default PDFTicketButton;
