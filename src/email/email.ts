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