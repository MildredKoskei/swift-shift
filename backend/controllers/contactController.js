const ContactSubmission = require('../models/contactSubmission');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Ready to Send');
  }
});

const submittedEmails = new Set();

// Function to send an email
const sendEmail = (mailOptions, res, successMessage) => {
  contactEmail.sendMail(mailOptions, (error) => {
    if (error) {
      console.error('Error:', error);
      res.status(500).json({ status: 'ERROR' });
    } else {
      res.status(200).json({ status: successMessage });
    }
  });
};

// Function to handle the contact form submission
const handleContactSubmission = async (req, res) => {
  const { firstName, lastName, email, phone, industry, message } = req.body;

  if (submittedEmails.has(email)) {
    res.status(400).json({ status: 'Duplicate Submission' });
    return;
  }

  try {
    const newSubmission = new ContactSubmission({
      firstName,
      lastName,
      email,
      phone,
      industry,
      message,
    });

    await newSubmission.save();

    submittedEmails.add(email);

    const mailOptions = {
      from: firstName,
      to: "henry@segmetrix-research.com",
      subject: 'Contact Form Submission',
      html: `<p>firstname: ${firstName}</p>
             <p>lastname: ${lastName}</p>
             <p>Email: ${email}</p>
             <p>Phone: ${phone}</p>
             <p>Industry: ${industry}</p>
             <p>Message: ${message}</p>`,
    };

    const responseMailOptions = {
      from: `Segmetrix Research <${process.env.EMAIL_USER}>`, // Update with your email
      to: email, // Use the client's provided email address
      subject: 'Thank you for contacting Segmetrix Research',
      html: `<p>Dear ${firstName},</p>
              <p>Thank you for contacting us. We have received your message and will get back to you shortly.</p>
              <p>Best regards,<br>Segmetrix Research</p>`,
    };

    sendEmail(mailOptions, res, 'Message Sent');
    sendEmail(responseMailOptions, res, 'Automatic response sent');
  } catch (error) {
    console.error('Error saving submission:', error);
    res.status(500).json({ status: 'ERROR' });
  }
};

module.exports = {
  handleContactSubmission,
};
