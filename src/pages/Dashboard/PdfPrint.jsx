// import React from "react";
// import jsPDF from "jspdf";
import { format, parseISO } from "date-fns";

import jsPDF from "jspdf";

// const PdfPrint = ({ dataArray, dataType }) => {
//   const generatedData = dataArray?.map((data, index) => {
//     if (dataType === "Events") {
//       return {
//         Serial: (index + 1).toString(),
//         Name: String(data.eventName),
//         Type: String(data.eventType),
//         Date: String(format(parseISO(data.date), "MM-dd-yyyy")),
//         Time: String(format(parseISO(data.time), "hh:mm a")),
//         Fee: String(data.fee),
//         Description: String(
//           data.eventDescription ? data.eventDescription : "N/A"
//         ),
//       };
//     } else {
//       return {
//         id: (index + 1).toString(),
//         Name: String(data.planName),
//         Type: String(data.planType),
//         Date: String(data.date),
//         Time: String(data.time),
//       };
//     }
//   });

//   const createHeaders = (keys) => {
//     const result = [];
//     for (let i = 0; i < keys.length; i += 1) {
//       result.push({
//         id: keys[i],
//         name: keys[i],
//         prompt: keys[i],
//         width: 65,
//         align: "center",
//         padding: 0,
//       });
//     }
//     return result;
//   };

//   const generatePDF = () => {
//     let headers;
//     if (dataType === "Events") {
//       headers = createHeaders([
//         "Serial",
//         "Name",
//         "Type",
//         "Date",
//         "Time",
//         "Fee",
//         "Description",
//       ]);
//     } else {
//       headers = createHeaders(["id", "Name", "Type", "Date", "Time"]);
//     }

//     const doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "a4" });
//     doc.table(1, 1, generatedData, headers, { autoSize: true }, );

//     doc.save(`${dataType}.pdf`);
//     doc.autoPrint();
//   };

//   return (
//     <button
//       className="cursor-pointer px-6 bg-green-500 py-2 font-semibold text-white hover:shadow-lg  transition-all duration-200 rounded-lg mb-5 ms-2"
//       onClick={generatePDF}
//     >
//       Print All Event
//     </button>
//   );
// };

// export default PdfPrint;

const generatedDataFunc = (data, dataType) => {
  if (dataType === "Events") {
    return [
      {
        Name: String(data.eventName),
        Type: String(data.eventType),
        Date: String(format(parseISO(data.date), "MM-dd-yyyy")),
        Time: String(format(parseISO(data.time), "hh:mm a")),
        Fee: String(data.fee),
        Description: String(
          data.eventDescription ? data.eventDescription : "N/A"
        ),
      },
    ];
  } else {
    return [
      {
        Name: String(data.planName),
        Type: String(data.planType),
        Date: String(data.date),
        Time: String(data.time),
      },
    ];
  }
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

export const generatePDF = (data, dataType) => {
  console.log({ data, dataType });
  let headers;
  if (dataType === "Events") {
    headers = createHeaders([
      "Name",
      "Type",
      "Date",
      "Time",
      "Fee",
      "Description",
    ]);
  } else {
    headers = createHeaders(["Name", "Type", "Date", "Time"]);
  }

  const doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });
  doc.table(1, 1, generatedDataFunc(data, dataType), headers, {
    autoSize: true,
  });

  doc.save(`${dataType}.pdf`);
  // doc.autoPrint();
};
