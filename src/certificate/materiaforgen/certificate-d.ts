import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { convertImageToBase64 } from './convertImageToBase64';
import { CertTemplateD, ChemParamTable } from './model';

const generateReportD = async (data: CertTemplateD) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const margin = 10;
  const colonGap = 3;
  const logoY = 5;
  const lineHeight = 6;
  let recivedByLineCount = 0;
  const companyLogo = await convertImageToBase64('/images/CompanyLogo.jpg');

  const addHeader = () => {
    doc.addImage(companyLogo, 'JPEG', margin, logoY, 25, 25);
    doc.setFont('AngsanaNew', 'bold');
    doc.setFontSize(20);
    const companyName = 'OSOTSPA PUBLIC COMPANY LIMITED';
    const companyNameWidth = doc.getTextWidth(companyName);
    const companyNameX = (pageWidth - companyNameWidth) - margin;
    const companyNameY = 15;
    doc.text(companyName, companyNameX, companyNameY);

    doc.setFontSize(26);
    const certName = "Chemical Test Report";
    const certNameWidth = doc.getTextWidth(certName);
    const certNameX = (pageWidth - certNameWidth) / 2;
    const certNameY = 35;
    doc.text(certName, certNameX, certNameY);

    const maxLabelWidth1 = 20;
    const maxValueWidth1 = 125;
    const maxLabelWidth2 = 15;

    const info1LabelX = margin;
    const info1ColonX = info1LabelX + maxLabelWidth1 + (colonGap / 2);
    const info1ValueX = info1ColonX + colonGap;
    const info2LabelX = info1ValueX + maxValueWidth1 + (colonGap / 2);
    const info2ColonX = info2LabelX + maxLabelWidth2 + colonGap;
    const info2ValueX = info2ColonX + colonGap;

    const defaultInfoY = 45;
    let infoY = defaultInfoY;

    doc.setFontSize(12);
    doc.setFont('AngsanaNew', 'bold');
    doc.text('Receive Result by', info1LabelX, infoY);
    doc.text(':', info1ColonX, infoY);

    const wrappedRecivedByLines = doc.splitTextToSize(data.header.received_by, maxValueWidth1);
    wrappedRecivedByLines.forEach((line: string, index: number) => {
      doc.text(line, info1ValueX, infoY + (index * lineHeight));
    });

    recivedByLineCount = wrappedRecivedByLines.length;

    doc.text('Requisition No', info2LabelX, infoY);
    doc.text(':', info2ColonX, infoY);
    doc.text(data.header.request_no, info2ValueX, infoY);
    infoY += (lineHeight * recivedByLineCount);

    doc.text('Received Date', info1LabelX, infoY);
    doc.text(':', info1ColonX, infoY);
    doc.text(data.header.received_date, info1ValueX, infoY);

    doc.text('Report Date', info2LabelX, infoY);
    doc.text(':', info2ColonX, infoY);
    doc.text(data.header.report_date, info2ValueX, infoY);
  };

  const addFooter = () => {
    let footerY = 280;
    footerY += 6;
    doc.setFontSize(12);
    doc.setFont('AngsanaNew', 'normal');
    doc.text(data.footer.form_id, margin, footerY);
    footerY += 4;
    doc.text(`Revision: ${data.footer.revision} Effective Date: ${data.footer.effective_date}`, margin, footerY);
    const addressText = `Beverage Laboratory : ${data.footer.address}`;
    const addressWidth = doc.getTextWidth(addressText);
    doc.text(addressText, pageWidth - addressWidth - margin, footerY);
  };

  const headerHeight = 65 + (recivedByLineCount * lineHeight);
  const footerHeight = 25;
  const sectionGap = 5;
  let currentY = headerHeight;

  for (const sample of data.table_source) {
    const parameterChunks: ChemParamTable[][] = [];
    const rowHeight = 6;
    const tableHeaderHeight = 12;
    const sampleInfoHeight = lineHeight * 2 + 1;
    const maxTableHeightPerPage = pageHeight - currentY - footerHeight - margin - sampleInfoHeight;

    let chunk: ChemParamTable[] = [];
    let currentChunkHeight = tableHeaderHeight;
    for (const param of sample.parameter) {
      if (currentChunkHeight + rowHeight > maxTableHeightPerPage && chunk.length > 0) {
        parameterChunks.push(chunk);
        chunk = [];
        currentChunkHeight = tableHeaderHeight;
      }
      chunk.push(param);
      currentChunkHeight += rowHeight;
    }
    if (chunk.length > 0) parameterChunks.push(chunk);

    parameterChunks.forEach((paramGroup, groupIndex) => {
      if (groupIndex > 0) {
        doc.addPage();
        currentY = headerHeight;
      }

      doc.setFillColor(232, 244, 255);
      doc.rect(margin, currentY - 4, pageWidth - 2 * margin, sampleInfoHeight, 'F');
      doc.setDrawColor(0);
      doc.setLineWidth(0.5);
      doc.line(margin, currentY - 4, pageWidth - margin, currentY - 4);

      doc.setFont('AngsanaNew', 'bold');
      doc.setFontSize(12);
      doc.text('Sample Name:', margin, currentY);
      doc.text(sample.sample_name, margin + 22, currentY);
      doc.text('Sample Code:', 161, currentY);
      doc.text(sample.sample_code, 182, currentY);

      currentY += lineHeight;

      doc.text('Sampling Date/MFG:', margin, currentY);
      doc.text(sample.sampling_date, margin + 30, currentY);
      doc.text('Time :', 70, currentY);
      doc.text(sample.time, 82, currentY);
      doc.text('Line:', 100, currentY);
      doc.text(sample.line, 110, currentY);

      currentY += 3;

      autoTable(doc, {
        startY: currentY,
        head: [['Parameter', 'Result', 'Unit', 'Method']],
        body: paramGroup.map(e => [e.parameter, e.results, e.unit, e.method]),
        margin: { left: margin, right: margin },
        theme: 'plain',
        styles: { font: 'AngsanaNew', fontSize: 12 },
        headStyles: {
          cellPadding: { top: 0.5, bottom: 0.5 },
        },
        bodyStyles: {
          cellPadding: { top: 0.5, bottom: 0.5 },
        },
        columnStyles: {
          0: { cellWidth: 50 },
          1: { cellWidth: 20 },
          2: { cellWidth: 20 },
          3: { cellWidth: 100 },
        },
        didParseCell: (e) => {
          if (e.section === 'head' || e.section === 'body') {
            if (e.column.index > 0) {
              e.cell.styles.halign = 'center';
            }
          }
        }
      });

      const finalY = (doc as jsPDF & { lastAutoTable?: { finalY?: number } }).lastAutoTable?.finalY ?? currentY;
      currentY = finalY + sectionGap;

      const isLastGroup = groupIndex === parameterChunks.length - 1;
      const isLastSample = sample === data.table_source[data.table_source.length - 1];
      if (isLastGroup && isLastSample) {
        doc.setDrawColor(0);
        doc.setLineWidth(0.5);
         doc.line(margin, finalY + 1.5, pageWidth - margin, finalY + 1.5);
      }
    });
  }

  const signatureWidth = 30;
  const signatureHeight = 15;
  const signSectionHeight = 30;
  const finalY = (doc as jsPDF & { lastAutoTable?: { finalY?: number } }).lastAutoTable?.finalY ?? currentY;
  const spaceAfterTable = pageHeight - finalY - footerHeight;

  let contentY = finalY + lineHeight;

  if (spaceAfterTable < lineHeight + (data.remark.length * 4) + signSectionHeight + 10) {
    doc.addPage();
    contentY = headerHeight + 5;
  }

  const contentValueX = 30;
  doc.setFont('AngsanaNew', 'normal');
  doc.setFontSize(12);
  doc.text('Remark', margin, contentY);
  doc.text(':', 26, contentY);
  if (data.remark.length === 0) {
    doc.text('-', contentValueX, contentY);
    contentY += 4;
  } else {
    data.remark.forEach(e => {
      doc.text(`${e.text}`, contentValueX, contentY);
      contentY += 4;
    });
  }

  const signCenterX = pageWidth - (pageWidth / 4);
  const signImageY = contentY;
  const signTextY = signImageY + signatureHeight + 4;

  doc.addImage(data.approver.signature, 'PNG', signCenterX - signatureWidth / 2, signImageY, signatureWidth, signatureHeight);
  doc.setFont('AngsanaNew', 'bold');
  doc.text('Approved by', 100, signTextY - (signatureHeight / 2), { align: 'center' });
  doc.text(data.approver.name, signCenterX, signTextY, { align: 'center' });
  doc.text(data.approver.position, signCenterX, signTextY + 5, { align: 'center' });

  const endReport = '-------------------------------------------End Report-------------------------------------------';
  const endReportWidth = doc.getTextWidth(endReport);
  const endReportX = (pageWidth - endReportWidth) / 2;
  contentY = signTextY + 12;
  doc.text(endReport, endReportX, contentY);

  doc.setFont('AngsanaNew', 'normal');
  doc.setFontSize(8);
  contentY += 10;
  const noteText = '- The above results are valid only for the analyzed/tested sample(s) as indicated in this report. No part of this report or certificate may be reproduced in any from without written consent from the Laboratory.';
  const noteTextWidth = doc.getTextWidth(noteText);
  const noteTextX = (pageWidth - noteTextWidth) / 2;
  doc.text(noteText, noteTextX, contentY);

  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addHeader();
    addFooter();
    doc.setFont('AngsanaNew', 'bold');
    doc.setFontSize(20);
    doc.text(`${i} of ${totalPages}`, pageWidth - (margin * 2), 25);
  }

  const pdfBase64 = btoa(
    new Uint8Array(doc.output('arraybuffer'))
      .reduce((data, byte) => data + String.fromCharCode(byte), '')
  );

  return pdfBase64
};

export default generateReportD;
