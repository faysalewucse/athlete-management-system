import React from "react";
import jsPDF from "jspdf";

const PdfPrint = ({ events }) => {
  const generateData = () => {
    const generatedData = events?.map((event, index) => ({
      id: (index + 1).toString(),
      eventName: event.eventName,
      eventType: event.eventType,
      eventDate: event.date,
      eventTime: event.time,
      eventFee: event.fee,
      eventDescription: event.eventDescription,
    }));

    return generatedData;
  };

  const createHeaders = (keys) => {
    const result = [];
    for (let i = 0; i < keys.length; i += 1) {
      result.push({
        id: keys[i],
        name: keys[i],
        prompt: keys[i],
        width: 65,
        align: "center",
        padding: 0,
      });
    }
    return result;
  };

  const generatePDF = () => {
    const headers = createHeaders([
      "id",
      "eventName",
      "eventType",
      "eventDate",
      "eventTime",
      "eventFee",
      "eventDescription",
    ]);

    const doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });
    doc.table(1, 1, generateData(), headers, { autoSize: true });

    doc.save("events.pdf");
  };

  return (
    <button
      className="cursor-pointer px-6 bg-green-500 py-2 font-semibold text-white hover:shadow-lg  transition-all duration-200 rounded-lg mb-5 ms-2"
      onClick={generatePDF}
    >
      Print
    </button>
  );
};

export default PdfPrint;
