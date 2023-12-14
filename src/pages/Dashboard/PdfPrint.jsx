import React from "react";
import jsPDF from "jspdf";

const PdfPrint = ({ dataArray, dataType }) => {
  const generateData = () => {
    let generatedData;

    if (dataType === "Events") {
      generatedData = dataArray?.map((data, index) => ({
        id: (index + 1).toString(),
        eventName: data.eventName,
        eventType: data.eventType,
        eventDate: data.date,
        eventTime: data.time,
        eventFee: data.fee,
        eventDescription: data.eventDescription,
      }));
    } else {
      generatedData = dataArray?.map((data, index) => ({
        id: (index + 1).toString(),
        planName: data.planName,
        planType: data.planType,
        planDate: data.date,
        planTime: data.time,
      }));
    }

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
    let headers;
    if (dataType === "Events") {
      headers = createHeaders([
        "id",
        "eventName",
        "eventType",
        "eventDate",
        "eventTime",
        "eventFee",
        "eventDescription",
      ]);
    } else {
      headers = createHeaders([
        "id",
        "planName",
        "planType",
        "planDate",
        "planTime",
      ]);
    }

    const doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "a4" });
    doc.table(1, 1, generateData(), headers, { autoSize: true });

    doc.save(`${dataType}.pdf`);
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
