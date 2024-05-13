import nodemailer from 'nodemailer';



 const sendEmail = async(options) =>{
    
//     const transporter = nodemailer.createTransport({

// host: process.env.SMPT_HOST,
// port: process.env.SMTP_PORT,

// auth:{
//     user: process.env.SMPT_MAIL,
//     pass: process.env.SMTP_PASSWORD,
// },
// service : process.env.SMPT_SERVICE,

//     });

// new
var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "18841125e6b5cb",
      pass: "8dbfc7e1f6d89d"
    }
  });
  
    
      const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
      };
    
      await transport.sendMail(mailOptions);
    //   await transporter.sendMail(mailOptions);

     
 }
 export {sendEmail};