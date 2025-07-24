import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import '../../pdf/AngsanaNew';
import { convertImageToBase64 } from './convertImageToBase64';
import { CertTemplateC } from './model';

const generateReportC = async (data: CertTemplateC) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4', //210 x 297 mm
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const margin = 10;
  const colonGap = 5;
  const logoGap = 4;
  const logoWidth = 22;
  const logoHeight = 22;
  const logoY = 5;
  const companyLogo = await convertImageToBase64('/images/CompanyLogo.jpg');
  let qaLogo = '';
  let ilacMRALogo = '';

  if (data.is_accredited) {
    qaLogo = await convertImageToBase64('/images/20Q.jpg');
    ilacMRALogo = await convertImageToBase64('/images/ilac-mra.png');
  }

  const addHeader = () => {
    doc.addImage(companyLogo, 'JPEG', margin, logoY, 25, 25);
    if (data.is_accredited) {
      doc.addImage(
        ilacMRALogo,
        'PNG',
        pageWidth - margin - logoWidth * 2 - logoGap - 2,
        logoY,
        logoWidth,
        logoHeight,
      );
      doc.addImage(
        qaLogo,
        'JPEG',
        pageWidth - margin - logoWidth - logoGap,
        logoY,
        logoWidth,
        logoHeight,
      );

      doc.setFont('AngsanaNew', 'normal');
      doc.setFontSize(12);
      const isoText = 'ISO/IEC 17025';
      const isoTextMaxWidth = 30;
      const isoTextWidth = doc.getTextWidth(isoText);
      const isoTextX =
        pageWidth -
        margin -
        isoTextMaxWidth +
        (isoTextMaxWidth - isoTextWidth) / 2;
      const isoTextY = 32;
      doc.text(isoText, isoTextX, isoTextY);

      const accreditNo = 'Accreditation No.1365/66';
      const accreditNoMaxWidth = 30;
      const accreditNoWidth = doc.getTextWidth(accreditNo);
      const accreditNoX =
        pageWidth -
        margin -
        accreditNoMaxWidth +
        (accreditNoMaxWidth - accreditNoWidth) / 2;
      const accreditNoY = 36;
      doc.text(accreditNo, accreditNoX, accreditNoY);
    }

    doc.setFont('AngsanaNew', 'bolditalic');
    doc.setFontSize(26);
    const certName = 'Test Report';
    const certNameWidth = doc.getTextWidth(certName);
    const certNameX = (pageWidth - certNameWidth) / 2;
    const certNameY = 35;
    doc.text(certName, certNameX, certNameY);

    const lineHeight = 6;
    const maxLabelWidth1 = 30;
    const maxValueWidth1 = 95;
    const maxLabelWidth2 = 15;

    const info1LabelX = margin;
    const info1ColonX = info1LabelX + maxLabelWidth1 + colonGap;
    const info1ValueX = info1ColonX + colonGap;

    const info2LabelX = info1ValueX + maxValueWidth1 + colonGap;
    const info2ColonX = info2LabelX + maxLabelWidth2 + colonGap;
    const info2ValueX = info2ColonX + colonGap;

    const defaultInfoY = 45;
    let infoY = defaultInfoY;

    doc.setFontSize(12);
    doc.setFont('AngsanaNew', 'normal');
    doc.text('Sample Name', info1LabelX, infoY);
    doc.text(':', info1ColonX, infoY);
    doc.setFont('AngsanaNew', 'bold');
    doc.text(data.header.sample_name, info1ValueX, infoY);

    infoY += lineHeight;
    doc.setFont('AngsanaNew', 'normal');

    doc.text('Sample Detail', info1LabelX, infoY);
    doc.text(':', info1ColonX, infoY);
    doc.text(data.header.sample_detail, info1ValueX, infoY);

    infoY += lineHeight;

    doc.text('Sample Description', info1LabelX, infoY);
    doc.text(':', info1ColonX, infoY);
    doc.text(data.header.sample_description, info1ValueX, infoY);

    infoY += lineHeight;

    doc.text('Sample Condition', info1LabelX, infoY);
    doc.text(':', info1ColonX, infoY);
    doc.text(data.header.sample_condition, info1ValueX, infoY);

    infoY += lineHeight;

    doc.text('Date analysis commenced', info1LabelX, infoY);
    doc.text(':', info1ColonX, infoY);
    doc.text(data.header.analysis_date, info1ValueX, infoY);

    infoY += lineHeight;

    doc.text('Customer contact information', info1LabelX, infoY);
    doc.text(':', info1ColonX, infoY);
    doc.text(data.header.customer_contact, info1ValueX, infoY);

    infoY = defaultInfoY;

    doc.text('Sample code', info2LabelX, infoY);
    doc.text(':', info2ColonX, infoY);
    doc.text(data.header.sample_code, info2ValueX, infoY);

    infoY += lineHeight;

    doc.text('Received Date', info2LabelX, infoY);
    doc.text(':', info2ColonX, infoY);
    doc.text(data.header.received_date, info2ValueX, infoY);

    infoY += lineHeight;

    doc.text('Report Date', info2LabelX, infoY);
    doc.text(':', info2ColonX, infoY);
    doc.text(data.header.report_date, info2ValueX, infoY);

    infoY += lineHeight;

    doc.text('Report No.', info2LabelX, infoY);
    doc.text(':', info2ColonX, infoY);
    doc.text(data.header.report_no, info2ValueX, infoY);

    infoY += lineHeight;

    doc.text('Reg. No', info2LabelX, infoY);
    doc.text(':', info2ColonX, infoY);
    doc.text(data.header.reg_no, info2ValueX, infoY);
  };

  const addFooter = (pageNumber: number, totalPages: number) => {
    let footerY = 273;
    doc.setFontSize(10);
    doc.setFont('AngsanaNew', 'italic');
    doc.text(
      'The above results are valid only for the tested sample(s) as received and indicated in this report. No part of this report may be reproduced in any form without written consent from the laboratory.',
      margin,
      footerY,
    );
    footerY += 4;
    doc.text(
      'OSOTSPA PUBLIC COMPANY LIMITED strongly recommends that this report is not reproduced except in full.',
      margin,
      footerY,
    );

    footerY += 6;
    doc.setFontSize(12);
    doc.setFont('AngsanaNew', 'normal');
    doc.text(data.footer.form_id, margin, footerY);
    footerY += 4;
    doc.setFontSize(10);
    doc.text(
      `Revision: ${data.footer.revision} Effective date: ${data.footer.effective_date}`,
      margin,
      footerY,
    );

    const companyName = 'OSOTSPA PULBIC COMPANY LIMITED';
    const addressText = `: ${data.footer.address}`;
    const maxAddressWidth =
      pageWidth - (margin + 80 + doc.getTextWidth(companyName)) - margin;
    const addressLines = doc.splitTextToSize(addressText, maxAddressWidth);

    footerY -= 4;
    doc.setFont('AngsanaNew', 'bold');
    doc.text(companyName, margin + 80, footerY);
    doc.setFont('AngsanaNew', 'normal');
    doc.text(
      addressLines[0],
      margin + 83 + doc.getTextWidth(companyName),
      footerY,
    );

    for (let i = 1; i < addressLines.length; i++) {
      footerY += 4;
      doc.text(addressLines[i], margin + 80, footerY);
    }

    footerY += 4;
    doc.text(
      `Page ${pageNumber} of ${totalPages}`,
      pageWidth - margin * 2,
      footerY,
    );
  };

  const tableY = 80;
  const headerHeight = tableY;
  const footerHeight = 30;

  if (data.is_accredited) {
    autoTable(doc, {
      startY: tableY,
      head: [
        [
          'Test items',
          'LOD',
          'LOQ (LOR)',
          'Results',
          'Specification',
          'Unit',
          'Method',
        ],
      ],
      body: data.table_source.map((e) => [
        e.test_items,
        e.lod,
        e.loq,
        e.results,
        e.specification,
        e.unit,
        e.method,
      ]),
      tableWidth: 190,
      margin: {
        left: margin,
        right: margin,
        top: headerHeight,
        bottom: footerHeight,
      },
      theme: 'plain',
      styles: {
        font: 'AngsanaNew',
        fontSize: 12,
      },
      headStyles: {
        cellPadding: { top: 0, bottom: 0, left: 0, right: 0 },
        lineWidth: { top: 0.1, bottom: 0.1, left: 0, right: 0 },
        lineColor: 0,
      },
      bodyStyles: {
        cellPadding: { top: 0.5, bottom: 0.5, left: 0, right: 0 },
      },
      didParseCell: function (e) {
        if (e.section === 'head') {
          e.cell.styles.valign = 'middle';
          if (e.column.index === 1 || e.column.index === 2) {
            e.cell.styles.fontSize = 11;
            e.cell.styles.halign = 'center';
          }
        }
        if (e.section === 'body') {
          const rowIndex = e.row.index;
          const rowData = data.table_source[rowIndex];
          if (rowData?.is_header) {
            e.cell.styles.fontStyle = 'bold';
            e.cell.styles.fontSize = 14;
          }
          if (e.column.index === 1 || e.column.index === 2) {
            e.cell.styles.halign = 'center';
          }
        }
      },
      columnStyles: {
        0: { cellWidth: 38 },
        1: { cellWidth: 13 },
        2: { cellWidth: 13 },
        3: { cellWidth: 13 },
        4: { cellWidth: 38 },
        5: { cellWidth: 20 },
        6: { cellWidth: 55 },
      },
      didDrawPage: () => {
        addHeader();
      },
    });
  } else {
    autoTable(doc, {
      startY: tableY,
      head: [['Test items', 'Results', 'Specification', 'Unit', 'Method']],
      body: data.table_source.map((e) => [
        e.test_items,
        e.results,
        e.specification,
        e.unit,
        e.method,
      ]),
      tableWidth: 190,
      margin: {
        left: margin,
        right: margin,
        top: headerHeight,
        bottom: footerHeight,
      },
      theme: 'plain',
      styles: {
        font: 'AngsanaNew',
        fontSize: 12,
      },
      headStyles: {
        cellPadding: { top: 1, bottom: 1, left: 0, right: 0 },
        lineWidth: { top: 0.1, bottom: 0.1, left: 0, right: 0 },
        lineColor: 0,
      },
      bodyStyles: {
        cellPadding: { top: 0.5, bottom: 0.5, left: 0, right: 0 },
      },
      didParseCell: function (e) {
        if (e.section === 'body') {
          const rowIndex = e.row.index;
          const rowData = data.table_source[rowIndex];
          if (rowData?.is_header) {
            e.cell.styles.fontStyle = 'bold';
            e.cell.styles.fontSize = 14;
          }
        }
      },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 20 },
        2: { cellWidth: 40 },
        3: { cellWidth: 20 },
        4: { cellWidth: 70 },
      },
      didDrawPage: () => {
        addHeader();
      },
    });
  }

  const signatureWidth = 30;
  const signatureHeight = 15;
  const signSectionHeight = 30;

  type DocWithAutoTable = typeof doc & { lastAutoTable?: { finalY?: number } };
  const finalY = (doc as DocWithAutoTable).lastAutoTable?.finalY ?? tableY;
  const lineHeight = 5;
  const spaceAfterTable = pageHeight - finalY - footerHeight;

  let contentY = finalY + lineHeight;

  if (
    spaceAfterTable <
    lineHeight +
      data.remark.length * (data.is_accredited ? 10 : 8) +
      signSectionHeight
  ) {
    doc.addPage();
    addHeader();
    contentY = headerHeight + 5;
  }

  const contentValueX = 30;
  if (data.decision !== '') {
    doc.setFont('AngsanaNew', 'normal');
    doc.setFontSize(12);
    doc.text('Decision', margin, contentY);
    doc.text(':', 26, contentY);
    doc.setFont('AngsanaNew', 'bold');
    doc.setFontSize(14);
    doc.text(data.decision, contentValueX, contentY);
    contentY += 5;
  }

  doc.setFont('AngsanaNew', 'normal');
  doc.setFontSize(12);
  doc.text('Remark', margin, contentY);
  doc.text(':', 26, contentY);
  if (data.remark.length === 0) {
    doc.text('-', contentValueX, contentY);
  } else {
    data.remark.forEach((e) => {
      doc.text(`${e.text}`, contentValueX, contentY);
      contentY += 4;
    });
  }

  if (data.is_accredited) {
    contentY += 8;
    doc.text(
      '- The laboratory has been accepted as an accredited laboratory complying with the ISO/IEC 17025',
      contentValueX,
      contentY,
    );
    contentY += 4;
    doc.text(
      '- "*" : Test method is/are not covered complying with the ISO/IEC 17025',
      contentValueX,
      contentY,
    );
  }

  const endReport =
    '-----------------------------------------------------------------End Report-----------------------------------------------------------------';
  const endReportWidth = doc.getTextWidth(endReport);
  const endReportX = (pageWidth - endReportWidth) / 2;
  contentY += 8;
  doc.text(endReport, endReportX, contentY);

  const signCenterX = pageWidth / 2;
  const signImageY = contentY + 10;
  const signTextY = signImageY + signatureHeight + 8;

  doc.addImage(
    data.approver.signature,
    'PNG',
    signCenterX - signatureWidth / 2,
    signImageY,
    signatureWidth,
    signatureHeight,
  );

  doc.setFont('AngsanaNew', 'normal');
  doc.text(
    '......................................................................',
    signCenterX,
    signImageY + signatureHeight + 3,
    { align: 'center' },
  );

  doc.text(`( ${data.approver.name} )`, signCenterX, signTextY, {
    align: 'center',
  });
  doc.text(data.approver.position, signCenterX, signTextY + 6, {
    align: 'center',
  });

  const totalPages = doc.getNumberOfPages();

  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addFooter(i, totalPages);
  }

  const pdfBase64 = btoa(
    new Uint8Array(doc.output('arraybuffer')).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      '',
    ),
  );

  return pdfBase64;
};

export default generateReportC;
