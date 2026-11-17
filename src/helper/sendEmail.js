const nodemailer = require("nodemailer");

const smtpUser = process.env.SMTP_USER?.trim();
const smtpPass = process.env.SMTP_PASS?.replace(/\s+/g, "");

const subjects = {
  register: "Verify your email",
  resend_otp: "Your new verification code",
  forgot_password: "Reset your password",
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

exports.sendEmail = async ({ email, otp, name = "", type }) => {
  try {
    if (
      !smtpUser ||
      !smtpPass ||
      smtpUser === "your-gmail@gmail.com" ||
      smtpPass === "your-16-character-gmail-app-password"
    ) {
      throw new Error("Set a real Gmail address and Gmail App Password in .env");
    }

    if (!subjects[type]) {
      throw new Error(`Unknown email type: ${type}`);
    }

    await transporter.sendMail({
      from: `"Exam Rafin" <${smtpUser}>`,
      to: email,
      subject: subjects[type],
      text: `Hello ${name},\n\nYour OTP is: ${otp}\n\nThis code expires in 5 minutes.`,
      html: `<p>Hello ${name},</p><p>Your OTP is:</p><h2>${otp}</h2><p>This code expires in 5 minutes.</p>`,
    });

    return { success: true };
  } catch (error) {
    console.error(`Email failed for ${email}: ${error.message}`);
    return { success: false, message: error.message };
  }
};
