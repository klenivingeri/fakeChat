"use server";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();


export const getData = async (params) => {
  try {
    const response = await fetch(process.env.URL + '/api/' + params);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);

  }
};


/* export const getData = (name) => {
  return dataChat[name]
}
 */


export const sendEmail = async (msgs, user) => {
  const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    secure: false,
    auth: {
      user: process.env['USER'+user.toUpperCase()],
      pass: process.env['PASS'+user.toUpperCase()],
    },
  });

  let htmlChat = msgs
    .map((m) => `<p>${m.user === 0 ? `<b>${m.msg}</b>` : m.msg}</p>`)
    .join('');

  const mailOptions = {
    from: 'noreply@celke.com.br',
    to: '1234@celke.com.br',
    subject: 'Assunto do e-mail',
    text: 'Conteúdo do e-mail',
    html: htmlChat,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('E-mail enviado:', info.response);
    return info;
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    throw error;
  }
};