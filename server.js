import dotenv from 'dotenv';
import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';

dotenv.config();

const server = express()
server.use(express.json());
server.use(cors({ origin: 'http://localhost:5173' }));

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
});

server.post('/send-email', (req, res) => {
  const { name, email, subject , message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).send('All fields are required');
  }
  const mailOptions = {
    from: process.env.EMAIL,
    to: email, 
    subject: `Message from ${name} Subject:${subject}`,
    text: `Email: ${email}\n\nMessage:\n${message}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Failed to send email');
    }
    res.status(200).send('Email sent successfully');
  });
});


server.listen('5000',() => {
  console.log('listening 5173')
})