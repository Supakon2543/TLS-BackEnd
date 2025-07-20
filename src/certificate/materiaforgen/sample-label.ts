// 'use client';

// import { jsPDF } from 'jspdf';
// // import { Option } from '@/app/lib/data/types';
// import '../../pdf/DBHeavent';

// type Label = {
//   sample_name: string;
//   material_code: string;
//   lot_no: string;
//   log_date: string;
//   lab_test_name: string;
//   time: string;
//   parameter: string,
//   sample_code: string,
//   seq: number,
//   total: number
// };

// const labels: Label[] = [
//   {
//     sample_name: 'LIPO MM NEW BT 100 1x5x10 BTT&C',
//     material_code: '10000513',
//     lot_no: 'AE21240263',
//     log_date: '04/11/2024',
//     lab_test_name: 'Chem',
//     time: '21.27',
//     parameter: 'Caffeine, Niacinamide, Pyridoxine, HCI, pH, Briz, Sensory',
//     sample_code: 'FGB2423260',
//     seq: 6,
//     total: 10
//   },
//   {
//     sample_name: 'LIPO MM NEW BT 100 1x5x10 BTT&C',
//     material_code: '10000513',
//     lot_no: 'AE21240263',
//     log_date: '04/11/2024',
//     lab_test_name: 'Chem',
//     time: '21.27',
//     parameter: 'Caffeine, Niacinamide, Pyridoxine, HCI, pH, Briz, Sensory, HCI, pH, Briz, Sensory, HCI, pH, Briz, HCI, pH, Briz',
//     sample_code: 'FGB2423260',
//     seq: 6,
//     total: 10
//   },
//   {
//     sample_name: 'LIPO MM NEW BT 100 1x5x10 BTT&C',
//     material_code: '10000513',
//     lot_no: 'AE21240263',
//     log_date: '04/11/2024',
//     lab_test_name: 'Chem',
//     time: '21.27',
//     parameter: 'Caffeine, Niacinamide, Pyridoxine, HCI, pH, Briz, Sensory',
//     sample_code: 'FGB2423260',
//     seq: 6,
//     total: 10
//   }
// ];

// const generateSampleLabel = () => {
//   const doc = new jsPDF({
//     orientation: 'landscape',
//     unit: 'cm',
//     format: [2.5, 1.5],
//   });

//   const fontSize = 2.75;
//   const lineHeight = 0.125;
//   const maxLabelWidth = 0.5;
//   const colonGap = 0.05;
//   const valueWidth = 1.95;
//   const valueX = maxLabelWidth + colonGap + 0.05;

//   labels.forEach((label, index) => {
//     if (index !== 0) doc.addPage();

//     // const lines: Option[] = [
//     //   { label: 'Sample', value: label.sample_name },
//     //   { label: 'Mat Code', value: label.material_code },
//     //   { label: 'Lot No.', value: label.lot_no },
//     //   { label: 'Log Date', value: label.log_date },
//     //   { label: 'Lab', value: label.lab_test_name },
//     //   { label: 'F.Time', value: label.time },
//     // ];

//     doc.setFontSize(fontSize);

//     let y = 0.4;

//     const isSpecialChar = (char: string) => {
//       return /[°™©®✓✔✕✖]/.test(char);
//     };

//     lines.forEach((line) => {
//       doc.setFont('DBHeavent', 'bold');
//       const wrappedLines = doc.splitTextToSize(line.value, valueWidth);

//       doc.setFont('DBHeavent', 'bold');
//       const labelWidth = doc.getTextWidth(line.label);
//       const labelX = maxLabelWidth - labelWidth;
//       doc.text(line.label, labelX, y);
//       doc.setFont('DBHeavent', 'bolder');
//       doc.text(':', maxLabelWidth + colonGap, y);

//       wrappedLines.forEach((textLine: string) => {
//         let xCursor: number = valueX;
//         for (const char of textLine) {
//           if (isSpecialChar(char)) {
//         doc.setFont('Helvetica', 'bold');
//           } else {
//         doc.setFont('DBHeavent', 'bolder');
//           }
//           doc.text(char, xCursor, y);
//           xCursor += doc.getTextWidth(char);
//         }
//         y += lineHeight;
//       });
//     });

//     const boxX = 1.25;
//     const boxY = 0.5;
//     const boxWidth = 1.15;
//     const boxHeight = 0.5;

//     doc.setFont('DBHeavent', 'bolder');
//     doc.setFontSize(2.5);
//     doc.setLineWidth(0.01);
//     doc.roundedRect(boxX, boxY, boxWidth, boxHeight, 0.01, 0.01);
//     doc.text('Parameter :', boxX + 0.03, boxY + 0.08);
//     const wrappedParams = doc.splitTextToSize(label.parameter, 1.05);
//     doc.text(wrappedParams, boxX + 0.03, boxY + 0.20);
//   });

//   const pdfBlob = doc.output('blob');
//   const pdfUrl = URL.createObjectURL(pdfBlob);
//   window.open(pdfUrl, '_blank');
// };

// export default generateSampleLabel;
