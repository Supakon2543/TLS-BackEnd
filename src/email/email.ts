import axios from 'axios';
// import * as nodemailer from 'nodemailer';

// const emailTemplate = (
//   name: string,
//   subject: string,
//   message: string,
//   buttonUrl: string,
//   buttonText: string = 'View Request'
// ) => `
//   <div style="background:#1a428a;padding:0.5rem 0 0.5rem 0;">
//     <img src="https://osotspa.com/logo.png" alt="OSOTSPA" style="height:40px;margin-left:20px;">
//   </div>
//   <div style="padding:2rem 2rem 0 2rem;">
//     <p>Hi <b>${name}</b> ,</p>
//     <p>Subject <b>${subject}</b></p>
//     <p style="white-space:pre-line;">${message}</p>
//     <a href="${buttonUrl}" style="display:inline-block;margin-top:2rem;padding:0.75rem 2rem;background:#00a6b2;color:#fff;text-decoration:none;border-radius:8px;">${buttonText}</a>
//   </div>
//   <div style="background:#1a428a;height:40px;margin-top:2rem;"></div>
// `;

const mailbody = (
    title: string,
    receiver: string,
    message: string,
    SubmittedBy: string,
    id: string
) => `  <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta http-equiv="Content-Style-Type" content="text/css" />
            <meta name="generator" content="Aspose.Words for .NET 23.11.0" />
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Courier+Prime:wght@700&family=Roboto:wght@100;400;500;700&display=swap" rel="stylesheet">
            <title></title>
            <style type="text/css">
                body {
                    font-size: 12pt;
                    font-family: Roboto;
                }
         
                .header{
                    color: #24408E;
                    font-family: Roboto;
                    font-size: 20px;
                    font-style: normal;
                    font-weight: 700;
                    line-height: 22px;
                    margin-top: 2%;
                }
         
                .detail {
                    border-bottom: 5px solid #24408E;
                    width: 70%;
                    color: #24408E;
                    font-family: Roboto;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 700;
                    line-height: 22px;
                }
 
                .detail-text{
                    color: #333;
                    font-family: Roboto;
                    font-size: 13px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 22px;
                }
         
                .buttonView {
                    width: 237px;
                    height: 39.241px;
                    padding: 6.4px 15px;
                    border-radius: 8px;
                    background-color: #00A0B1;
                    color: white !important;
                    border: none;
                    text-decoration:none;
                }
            </style>
        </head>
        <body>
            <div>
                <div class="header" style="display: flex;font-size:25px; margin-left:190px">OSOTSPA VENDOR FORM</div>
                <div class="detail" style="margin-top:30pt; text-align:justify; line-height:18pt; margin-left:40px; font-size:15pt; max-width: 650px;">${title}</div>
                <div class="detail-text" style="margin-top:23pt; margin-left:28.9pt; text-align:justify; line-height:15.85pt; font-size:13pt">Hi ${receiver} ,</div>
                <div class="detail-text" style="margin-top:5pt; margin-left:28.9pt; line-height:27.2pt; font-size:13pt">${message}</div>
                <div class="detail-text" style="margin-top:10pt; margin-left:28.9pt; text-align:justify; line-height:15.85pt; font-size:13pt">${SubmittedBy}</div>
                <div style="margin-top:30pt; margin-left:200px; text-align:justify; line-height:19.5pt">
                    <a class="buttonView" style="display:flex !important;justify-content:center !important;align-items:center !important;" href="${process.env.FRONTEND_URL}/vendor/${id}">
                    <div style="text-align:center;width:500px;margin-top: 5.5px;">View Request</div>
                    </a>
                </div>
            </div>
        </body>
        </html>`

export async function testEmail(
    to: string,
    name: string,
    subject: string,
    message: string,
    SubmittedBy: string,
    // id: string
    ) {
        const emailBody = mailbody(subject, name, message, SubmittedBy, "1");
        return await axios.post(
            `${process.env.EMAILBASEURL}/send_email`, {
                sender: process.env.SENDER_EMAIL,
                subject: subject,
                receivers: to,
                message: emailBody,
            }
        );
    }

const emailTemplate_send = (
  name: string,
  buttonUrl: string,
) => `เรียน ${name}
    คุณมีเอกสารใบส่งตัวอย่างรอพิจารณา กรุณากด Link ด้านล่าง เพื่อทวนสอบและอนุมัติ/พิจารณา
    <a href='${buttonUrl}'>รายละเอียดใบส่งตัวอย่าง</a>
`;

export async function sendMail(
  to: string,
  name: string,
  subject: string,
  activity_request_id: string,
  buttonUrl: string
) {
    let message = '';
    if (activity_request_id === 'SEND'){
        message = emailTemplate_send(name, buttonUrl);
    }
    return await axios.post(
        `${process.env.EMAILBASEURL}/send_email`, {
            sender: process.env.SENDER_EMAIL,
            subject: subject,
            receivers: to,
            message: message,
        }
    );
}