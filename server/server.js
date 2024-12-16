import dotenv from 'dotenv';
import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import admin from 'firebase-admin';
import cookieParser from 'cookie-parser';

dotenv.config();

const server = express()
server.use(express.json());
server.use(cors({ origin: 'http://localhost:5173',credentials: true, }));
server.use(cookieParser());

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
});
server.post('/Delizioso/api/send-email', (req, res) => {
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
  transporter.sendMail(mailOptions, (error) => {
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

const client = new SecretManagerServiceClient({
  keyFilename: process.env.VITE_GOOGLE_APPLICATION_CREDENTIALS,  
});

async function getSecret() {
  const secretPath = `projects/716002007714/secrets/delizioso/versions/latest`;
  try {
    const [version] = await client.accessSecretVersion({
      name: secretPath,
    });
    const secretPayload = version.payload.data.toString('utf8');
    return JSON.parse(secretPayload);
  } catch (error) {
    console.error('Error accessing secret:', error);
    throw error;
  }
}
async function initializeFirebaseAdmin() {
  try {
    const serviceAccount = await getSecret();
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error) {
    console.error('Ошибка при инициализации Firebase Admin SDK:', error);
  }
}
initializeFirebaseAdmin();


server.get('/Delizioso/api/protected', async (req, res) => {
  const sessionCookie = req.cookies.session || '';
  try {
    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);
    res.status(200).send({ message: 'Access granted', user: decodedClaims });
  } catch (error) {
    res.status(401).send('Unauthorized');
  }
});

server.post('/Delizioso/api/logout', (_, res) => {
  res.clearCookie('session');
  res.status(200).send({ message: 'Logged out' });
});

server.post('/Delizioso/api/login', async (req, res) => {
  const idToken = req.body.idToken;
  const expiresIn = 60 * 60 * 24 * 5 * 1000; 
  try {
    const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });
    const options = { maxAge: expiresIn, httpOnly: true, secure: false };
    res.cookie('session', sessionCookie, options); 
    res.status(200).send({ message: 'Login successful' });
  } catch (error) {
    console.error('Error creating session cookie:', error);
    res.status(401).send('Unauthorized');
  }
});

server.get('/Delizioso/api/check-session', async (req, res) => {
  const sessionCookie = req.cookies.session || ''; 
  if (!sessionCookie) {
    return res.status(401).send({ message: 'No session cookie found' });
  }
  try {
    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);
    res.status(200).send({ message: 'Session valid', user: decodedClaims });
  } catch (error) {
    console.error('Error verifying session cookie:', error);
    res.status(401).send({ message: 'Invalid or expired session cookie' });
  }
});