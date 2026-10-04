import nodemailer from 'nodemailer';

// Create a transporter. For production, you would configure real SMTP credentials.
// For now, we simulate success or use a test account if configured.
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: Number(process.env.SMTP_PORT) || 587,
  auth: {
    user: process.env.SMTP_USER || 'ethereal_user',
    pass: process.env.SMTP_PASS || 'ethereal_pass'
  }
});

export const sendOrderConfirmationEmail = async (customerEmail: string, orderId: string, total: number) => {
  try {
    const info = await transporter.sendMail({
      from: '"Renzen Store" <orders@renzen.com>',
      to: customerEmail,
      subject: `Order Confirmation #${orderId.substring(0, 8)}`,
      html: `
        <h2>Thank you for your order!</h2>
        <p>Your order <strong>#${orderId.substring(0, 8)}</strong> has been placed successfully.</p>
        <p>Total amount: <strong>₹${total}</strong></p>
        <p>We will notify you once it ships.</p>
      `
    });
    console.log('Order email sent: %s', info.messageId);
  } catch (error) {
    console.error('Failed to send order email', error);
  }
};

export const sendAdminNotificationEmail = async (subject: string, message: string) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@renzen.com';
    const info = await transporter.sendMail({
      from: '"Renzen Notifications" <no-reply@renzen.com>',
      to: adminEmail,
      subject: `[Admin Alert] ${subject}`,
      html: `<p>${message}</p>`
    });
    console.log('Admin notification email sent: %s', info.messageId);
  } catch (error) {
    console.error('Failed to send admin notification email', error);
  }
};
