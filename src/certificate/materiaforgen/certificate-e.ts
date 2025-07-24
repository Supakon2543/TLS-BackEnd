import { jsPDF } from 'jspdf';
import {
  CertTemplateE,
  MicroParam,
  MicroParamTable,
  MicroResultTable,
} from './model';
import autoTable from 'jspdf-autotable';
import { convertImageToBase64 } from './convertImageToBase64';

const generateReportE = async (data: CertTemplateE) => {
  const doc = new jsPDF({
    unit: 'mm',
    format: 'a4',
    orientation: 'landscape',
  });

  const companyLogo = await convertImageToBase64('/images/CompanyLogo.jpg');
  let recivedByLineCount = 0;

  const margin = 6;
  const colonGap = 3;
  const logoX = 2;
  const logoY = 0;
  const lineHeight = 6;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const usableWidth = pageWidth - margin * 2;

  const startX = margin;
  const defaultHeaderY = 25;
  let headerY = defaultHeaderY;
  let infoHeight = 45;
  let tableHeadY = 0;

  const rowHeight = 10;
  const paramColCount = 10;
  const colWidths = {
    sampleCode: 16,
    sampleDesc: 90,
    mfg: 16,
    parameterBlock: usableWidth - (16 + 90 + 16),
  };
  const colPositions = {
    sampleCode: startX,
    sampleDesc: startX + colWidths.sampleCode,
    mfg: startX + colWidths.sampleCode + colWidths.sampleDesc,
    parameterBlock:
      startX + colWidths.sampleCode + colWidths.sampleDesc + colWidths.mfg,
  };
  const sampleDescX = colPositions.sampleDesc;
  const sampleDescWidth = colWidths.sampleDesc;
  const paramBlockHeight = 45;
  const paramHeaderWidth = 14;
  const paramColWidth =
    (colWidths.parameterBlock - paramHeaderWidth) / (paramColCount - 1);
  const subDesColumn = [
    {
      name: 'Sample Name',
      width: 60,
    },
    {
      name: 'Time',
      width: 15,
    },
    {
      name: 'Unit',
      width: 15,
    },
  ];
  const subParamColumn = [
    {
      name: 'Parameter',
      height: 10,
    },
    {
      name: 'Unit',
      height: 10,
    },
    {
      name: 'Method',
      height: 25,
    },
  ];

  function drawCell(
    x: number,
    y: number,
    width: number,
    height: number,
    text: string,
    options: {
      paddingLeft?: number;
      paddingTop?: number;
      align?: 'left' | 'center' | 'right';
    } = {},
  ): void {
    doc.rect(x, y, width, height);
    const paddingLeft = options.paddingLeft ?? 2;
    const paddingTop = options.paddingTop ?? 7;
    const align = options.align ?? 'left';

    let textX = x + paddingLeft;
    if (align === 'center') {
      textX = x + width / 2;
    } else if (align === 'right') {
      textX = x + width - paddingLeft;
    }
    doc.text(text, textX, y + paddingTop, { align });
  }

  const addHeader = () => {
    headerY = defaultHeaderY;

    doc.addImage(companyLogo, 'JPEG', logoX, logoY, 25, 25);

    doc.setFont('AngsanaNew', 'normal');
    doc.setFontSize(32);
    const certName = 'Microbiological Test Report';
    const certNameWidth = doc.getTextWidth(certName);
    const certNameX = (pageWidth - certNameWidth) / 2;
    const certNameY = 15;
    doc.text(certName, certNameX, certNameY);

    const maxLabelWidth1 = 30;
    const maxValueWidth1 = 30;
    const maxLabelWidth2 = 30;
    const maxValueWidth2 = 150;

    const info1LabelX = colPositions.sampleDesc + 1;
    const info1ValueX = info1LabelX + maxLabelWidth1 + maxValueWidth1 / 2;
    const info2LabelX = info1ValueX + maxValueWidth1;
    const info2ValueX = info2LabelX + maxLabelWidth2 + colonGap;

    doc.setFontSize(12);
    doc.setFont('AngsanaNew', 'bold');
    doc.text('Analysis Requisition No.:', info1LabelX, headerY);
    doc.setFont('AngsanaNew', 'normal');
    doc.text(data.header.request_no, info1ValueX, headerY);

    doc.setFont('AngsanaNew', 'bold');
    doc.text('Requisition By :', info2LabelX, headerY);
    doc.setFont('AngsanaNew', 'normal');
    doc.text(data.header.request_by, info2ValueX, headerY);

    headerY += lineHeight;

    doc.setFont('AngsanaNew', 'bold');
    doc.text('Received Date :', info1LabelX, headerY);
    doc.setFont('AngsanaNew', 'normal');
    doc.text(data.header.received_date, info1ValueX, headerY);

    doc.setFont('AngsanaNew', 'bold');
    doc.text('Receive Result by :', info2LabelX, headerY);
    doc.setFont('AngsanaNew', 'normal');
    const wrappedRecivedByLines = doc.splitTextToSize(
      data.header.received_by,
      maxValueWidth2,
    );
    wrappedRecivedByLines.forEach((line: string, index: number) => {
      doc.text(line, info2ValueX, headerY + index * lineHeight);
    });
    recivedByLineCount = wrappedRecivedByLines.length;

    headerY += lineHeight;

    doc.setFont('AngsanaNew', 'bold');
    doc.text('Analysis Date :', info1LabelX, headerY);
    doc.setFont('AngsanaNew', 'normal');
    doc.text(data.header.analysis_date, info1ValueX, headerY);

    headerY += lineHeight;

    doc.setFont('AngsanaNew', 'bold');
    doc.text('Reported Date:', info1LabelX, headerY);
    doc.setFont('AngsanaNew', 'normal');
    doc.text(data.header.report_date, info1ValueX, headerY);

    headerY +=
      recivedByLineCount > 3 ? (recivedByLineCount - 3) * lineHeight : 0;
    headerY += 4;
    infoHeight = headerY;
  };

  const addFooter = () => {
    let footerY = 194;
    footerY += 6;
    doc.setFontSize(12);
    doc.setFont('AngsanaNew', 'normal');
    doc.text(data.footer.form_id, margin, footerY);
    footerY += 4;
    doc.text(
      `Revision: ${data.footer.revision} Effective Date: ${data.footer.effective_date}`,
      margin,
      footerY,
    );
    const addressText = `Beverage Laboratory : ${data.footer.address}`;
    const addressWidth = doc.getTextWidth(addressText);
    doc.text(addressText, pageWidth - addressWidth - margin, footerY);
  };

  tableHeadY = infoHeight;
  const tableBodyY = infoHeight + paramBlockHeight;
  const headerHeight = tableBodyY;
  const footerHeight = 30;

  const addTableHeader = (set: MicroParamTable) => {
    doc.setFont('AngsanaNew', 'bold');
    doc.setFontSize(11);
    drawCell(
      colPositions.sampleCode,
      tableHeadY,
      colWidths.sampleCode,
      paramBlockHeight,
      'Sample Code',
      { align: 'center', paddingTop: paramBlockHeight / 2 + 1 },
    );

    drawCell(
      sampleDescX,
      tableHeadY,
      sampleDescWidth,
      paramBlockHeight - rowHeight,
      'Sample Description',
      { align: 'center', paddingTop: (paramBlockHeight - rowHeight) / 2 + 1 },
    );

    let subDesCurrentWidth = 0;
    subDesColumn.forEach((e) => {
      const x = sampleDescX + subDesCurrentWidth;
      const y = tableHeadY + (paramBlockHeight - rowHeight);
      drawCell(x, y, e.width, rowHeight, e.name, {
        align: 'center',
        paddingTop: rowHeight / 2 + 1,
      });
      subDesCurrentWidth += e.width;
    });

    drawCell(
      colPositions.mfg,
      tableHeadY,
      colWidths.mfg,
      paramBlockHeight,
      'MFG',
      { align: 'center', paddingTop: paramBlockHeight / 2 + 3 },
    );

    let paramY = tableHeadY;
    const paramX = colPositions.parameterBlock;
    subParamColumn.forEach((e) => {
      doc.setFont('AngsanaNew', 'bold');
      let paddingTop = e.height / 2 + 1;
      drawCell(paramX, paramY, paramHeaderWidth, e.height, e.name, {
        align: 'center',
        paddingTop: paddingTop,
      });
      doc.setFont('AngsanaNew', 'normal');

      set.param.forEach((param, col) => {
        const itemX = paramX + paramHeaderWidth + col * paramColWidth;
        let value = '';
        let valueHeight = 0;
        if (e.name === 'Parameter') {
          const originalValue = param.parameter;
          value = doc.splitTextToSize(originalValue, paramColWidth - 2);
          valueHeight = value.length === 1 ? -1 : value.length * 1.5;
        } else if (e.name === 'Unit') {
          const originalValue = param.unit;
          value = doc.splitTextToSize(originalValue, paramColWidth - 2);
          valueHeight = value.length === 1 ? -1 : value.length * 1.5;
        } else if (e.name === 'Method') {
          doc.setFontSize(6);
          const originalValue = param.method;
          value = doc.splitTextToSize(originalValue, paramColWidth - 2);
          valueHeight = value.length === 1 ? -1 : value.length * 2;
        }
        paddingTop = (e.height - valueHeight) / 2;
        drawCell(itemX, paramY, paramColWidth, e.height, value, {
          align: 'center',
          paddingTop: paddingTop,
        });
      });

      paramY += e.height;
    });
  };

  function getSampleRow(
    sample: MicroResultTable,
    paramList: MicroParam[],
  ): (string | number)[] {
    const basicInfo = [
      sample.sample_code ?? '',
      sample.sample_name ?? '',
      sample.time ?? '',
      sample.unit ?? '',
      sample.mfg_date ?? '',
      '',
    ];

    const paramResults = getParameterResults(sample, paramList);

    return [...basicInfo, ...paramResults];
  }

  function getParameterResults(
    sample: MicroResultTable,
    paramList: MicroParam[],
  ): (string | number)[] {
    return paramList.map((param) => getParameterResult(sample, param));
  }

  function getParameterResult(
    sample: MicroResultTable,
    param: MicroParam,
  ): string | number {
    const matchedParam = sample.parameter?.find((p) => p.id === param.id);
    return matchedParam ? matchedParam.result : '-';
  }

  data.parameter.forEach((set, index) => {
    if (index > 0) {
      doc.addPage();
    }

    autoTable(doc, {
      startY: tableBodyY,
      head: [],
      body: data.table_source.map((sample) => getSampleRow(sample, set.param)),
      margin: {
        left: margin,
        right: margin,
        top: headerHeight,
        bottom: footerHeight,
      },
      theme: 'grid',
      styles: {
        font: 'AngsanaNew',
        fontSize: 12,
        textColor: 0,
        lineColor: 0,
        lineWidth: 0.2,
      },
      bodyStyles: {
        cellPadding: { top: 0.5, bottom: 0.5, left: 0.5, right: 0.5 },
      },
      didParseCell: function (e) {
        if (e.section === 'body') {
          if (e.column.index !== 1) {
            e.cell.styles.halign = 'center';
          }
          if (e.column.index === 5) {
            e.cell.styles.fillColor = [174, 177, 181];
          }
        }
      },
      columnStyles: {
        0: { cellWidth: colWidths.sampleCode },
        1: { cellWidth: 60 },
        2: { cellWidth: 15 },
        3: { cellWidth: 15 },
        4: { cellWidth: colWidths.mfg },
        5: { cellWidth: paramHeaderWidth },
        6: { cellWidth: paramColWidth },
        7: { cellWidth: paramColWidth },
        8: { cellWidth: paramColWidth },
        9: { cellWidth: paramColWidth },
        10: { cellWidth: paramColWidth },
        11: { cellWidth: paramColWidth },
        12: { cellWidth: paramColWidth },
        13: { cellWidth: paramColWidth },
        14: { cellWidth: paramColWidth },
      },
      didDrawPage: () => {
        addTableHeader(set);
      },
    });
  });

  const signatureWidth = 25;
  const signatureHeight = 10;
  const signSectionHeight = 30;
  const finalY =
    (doc as jsPDF & { lastAutoTable?: { finalY?: number } }).lastAutoTable
      ?.finalY ?? tableBodyY;
  const spaceAfterTable = pageHeight - finalY - footerHeight;

  let contentY = finalY + lineHeight;

  if (
    spaceAfterTable <
    lineHeight + data.remark.length * 4 + signSectionHeight
  ) {
    doc.addPage();
    contentY = headerHeight + 5;
  }

  const contentValueX = colPositions.sampleDesc;
  doc.setFont('AngsanaNew', 'normal');
  doc.setFontSize(12);
  doc.text('Remark :', margin, contentY);
  if (data.remark.length === 0) {
    doc.text('-', contentValueX, contentY);
    contentY += 5;
  } else {
    data.remark.forEach((e) => {
      doc.text(`${e.text}`, contentValueX, contentY);
      contentY += 5;
    });
  }

  const endReport =
    '-------------------------------------------End Report-------------------------------------------';
  const endReportWidth = doc.getTextWidth(endReport);
  const endReportX = (pageWidth - endReportWidth) / 2;
  doc.text(endReport, endReportX, contentY);

  contentY += 5;
  doc.text(
    '- The above results are valid only for the analyzed/tested sample(s) as indicated in this report. No part of this report or certificate may be reproduced in any from without written consent from the Laboratory.',
    margin,
    contentY,
  );

  const signCenterX = pageWidth - pageWidth / 8;
  const signImageY = contentY;
  const signTextY = signImageY + signatureHeight + 4;

  doc.addImage(
    data.approver.signature,
    'PNG',
    signCenterX - signatureWidth / 2,
    signImageY,
    signatureWidth,
    signatureHeight,
  );
  doc.text(
    'Approved by :',
    signCenterX - signatureWidth - 10,
    signTextY - signatureHeight / 2,
    { align: 'center' },
  );
  doc.text(`(${data.approver.name})`, signCenterX, signTextY, {
    align: 'center',
  });
  doc.text(data.approver.position, signCenterX, signTextY + 5, {
    align: 'center',
  });

  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addHeader();
    addFooter();
    doc.setFont('AngsanaNew', 'normal');
    doc.setFontSize(12);
    const compayName = 'OSOTSPA PUBLIC COMPANY LIMITED';
    const compayNameWidth = doc.getTextWidth(compayName);
    doc.text(compayName, pageWidth - margin - compayNameWidth, margin);
    const pageNumber = `Page No. ${i} of ${totalPages}`;
    const pageNumberWidth = doc.getTextWidth(pageNumber);
    doc.text(
      pageNumber,
      pageWidth - margin - pageNumberWidth,
      margin + lineHeight,
    );
  }

  const pdfBase64 = btoa(
    new Uint8Array(doc.output('arraybuffer')).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      '',
    ),
  );

  return pdfBase64;
};

export default generateReportE;
