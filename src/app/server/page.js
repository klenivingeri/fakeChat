"use server"
import nodemailer from "nodemailer";

export const sendEmail = (msgs) => {
      let htmlChat = ''
      msgs.map(m => {
        if(m.msg){
          if(m.user == 0 ){
            htmlChat = htmlChat + `<p><b>${m.msg}</b></p>`
         } else{
           htmlChat = htmlChat + `<p>${m.msg}</p>`
         }
        }
      } )

      var transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "04a38f6e242ce7",
          pass: "4d2c4ce36058c2"
        }
      });
      
      // Definições do e-mail
      const mailOptions = {
        from: 'noreplay@celke.com.br',
        to: '1234@celke.com.br',
        subject: 'Assunto do e-mail',
        text: 'Conteúdo do e-mail',
        html: `${htmlChat}`
      };
      
      // Enviar e-mail
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.error('Erro ao enviar e-mail:', error);
        } else {
          console.log('E-mail enviado:', info.response);
        }
      });
}