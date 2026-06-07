const nodemailer = require('nodemailer');

// Email transporter configuration
const createTransporter = () => {
  // For production, use real SMTP credentials
  // For development, we'll use a test account or ethereal.email
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER || 'your-email@gmail.com',
      pass: process.env.SMTP_PASS || 'your-app-password'
    }
  });
};

// Send order confirmation email
const sendOrderConfirmation = async (email, orderDetails) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.SMTP_FROM || '"Joel. Artisan Gastronomy" <joelamoh65@gmail.com>',
      to: email,
      subject: `Order Confirmation - ${orderDetails.orderId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 30px; border-radius: 10px 10px 0 0;">
            <h1 style="color: #d4af37; margin: 0; font-size: 28px;">Joel. Artisan Gastronomy</h1>
            <p style="color: #fdfbf7; margin: 10px 0 0 0; font-size: 14px;">Order Confirmation</p>
          </div>
          <div style="background: #fdfbf7; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
            <h2 style="color: #1a1a1a; margin-top: 0;">Thank you for your order!</h2>
            <p style="color: #666; line-height: 1.6;">Your order has been placed successfully and is now being processed.</p>
            
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 0 0 10px 0; font-weight: bold; color: #1a1a1a;">Order Details:</p>
              <p style="margin: 5px 0; color: #666;"><strong>Order ID:</strong> ${orderDetails.orderId}</p>
              <p style="margin: 5px 0; color: #666;"><strong>Total Amount:</strong> ${orderDetails.amount} FCFA</p>
              <p style="margin: 5px 0; color: #666;"><strong>Payment Method:</strong> Mobile Money Transfer</p>
              <p style="margin: 5px 0; color: #666;"><strong>Delivery Address:</strong> ${orderDetails.address.street}, ${orderDetails.address.city}</p>
            </div>

            <p style="color: #666; line-height: 1.6;">Please complete your payment to <strong>237673184599 (AMOH JOEL)</strong> to confirm your order. We will verify your payment and process your order shortly.</p>
            
            <p style="color: #666; line-height: 1.6;">You can track your order status in your account dashboard.</p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
              <p style="color: #666; font-size: 12px; margin: 0;">If you have any questions, please contact us at:</p>
              <p style="color: #666; font-size: 12px; margin: 5px 0;">📞 237673184599 | ✉️ joelamoh65@gmail.com</p>
              <p style="color: #666; font-size: 12px; margin: 5px 0;">📍 Bamenda, North West Region, Cameroon</p>
            </div>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    return { success: false, error: error.message };
  }
};

// Send order status update email
const sendOrderStatusUpdate = async (email, orderDetails) => {
  try {
    const transporter = createTransporter();
    
    const statusColors = {
      'Food Processing': '#d4af37',
      'Out for Delivery': '#2196f3',
      'Delivered': '#4caf50',
      'Cancelled': '#f44336'
    };

    const mailOptions = {
      from: process.env.SMTP_FROM || '"Joel. Artisan Gastronomy" <joelamoh65@gmail.com>',
      to: email,
      subject: `Order Status Update - ${orderDetails.orderId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 30px; border-radius: 10px 10px 0 0;">
            <h1 style="color: #d4af37; margin: 0; font-size: 28px;">Joel. Artisan Gastronomy</h1>
            <p style="color: #fdfbf7; margin: 10px 0 0 0; font-size: 14px;">Order Status Update</p>
          </div>
          <div style="background: #fdfbf7; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
            <h2 style="color: #1a1a1a; margin-top: 0;">Your order status has been updated</h2>
            
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 0 0 10px 0; font-weight: bold; color: #1a1a1a;">Order ID: ${orderDetails.orderId}</p>
              <p style="margin: 5px 0; color: #666;">
                <strong>New Status:</strong> 
                <span style="color: ${statusColors[orderDetails.status] || '#1a1a1a'}; font-weight: bold;">
                  ${orderDetails.status}
                </span>
              </p>
            </div>

            <p style="color: #666; line-height: 1.6;">Thank you for choosing Joel. Artisan Gastronomy. We appreciate your business!</p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
              <p style="color: #666; font-size: 12px; margin: 0;">If you have any questions, please contact us at:</p>
              <p style="color: #666; font-size: 12px; margin: 5px 0;">📞 237673184599 | ✉️ joelamoh65@gmail.com</p>
            </div>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Order status update email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending order status update email:', error);
    return { success: false, error: error.message };
  }
};

// Send password reset email
const sendPasswordResetEmail = async (email, resetToken) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.SMTP_FROM || '"Joel. Artisan Gastronomy" <joelamoh65@gmail.com>',
      to: email,
      subject: 'Password Reset Request - Joel. Artisan Gastronomy',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 30px; border-radius: 10px 10px 0 0;">
            <h1 style="color: #d4af37; margin: 0; font-size: 28px;">Joel. Artisan Gastronomy</h1>
            <p style="color: #fdfbf7; margin: 10px 0 0 0; font-size: 14px;">Password Reset</p>
          </div>
          <div style="background: #fdfbf7; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
            <h2 style="color: #1a1a1a; margin-top: 0;">Password Reset Request</h2>
            <p style="color: #666; line-height: 1.6;">You requested a password reset for your Joel. account.</p>
            
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 0 0 10px 0; font-weight: bold; color: #1a1a1a;">Your Reset Token:</p>
              <p style="margin: 0; font-family: monospace; font-size: 16px; color: #d4af37; font-weight: bold; letter-spacing: 2px;">
                ${resetToken}
              </p>
            </div>

            <p style="color: #666; line-height: 1.6;">Use this token to reset your password. This token will expire in 1 hour.</p>
            
            <p style="color: #666; line-height: 1.6;">If you didn't request this password reset, please ignore this email.</p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
              <p style="color: #666; font-size: 12px; margin: 0;">If you have any questions, please contact us at:</p>
              <p style="color: #666; font-size: 12px; margin: 5px 0;">📞 237673184599 | ✉️ joelamoh65@gmail.com</p>
            </div>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return { success: false, error: error.message };
  }
};

// Send catering inquiry notification to restaurant owner
const sendCateringInquiry = async (inquiry) => {
  try {
    const transporter = createTransporter();
    const ownerEmail = process.env.OWNER_EMAIL || 'joelamoh65@gmail.com';

    const mailOptions = {
      from: process.env.SMTP_FROM || '"Joel\'s Kitchen" <joelamoh65@gmail.com>',
      to: ownerEmail,
      replyTo: inquiry.email,
      subject: `🍽️ New Catering Inquiry — ${inquiry.eventType} on ${inquiry.date}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 20px; background: #f9f9f9;">
          <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: #d4af37; margin: 0; font-size: 26px;">Joel's Kitchen</h1>
            <p style="color: #fdfbf7; margin: 8px 0 0 0; font-size: 14px; letter-spacing: 2px; text-transform: uppercase;">New Catering Inquiry</p>
          </div>
          <div style="background: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
            
            <h2 style="color: #1a1a1a; margin-top: 0; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">📋 Client Details</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr><td style="padding: 8px 0; color: #555; font-weight: bold; width: 40%;">Client Name</td><td style="padding: 8px 0; color: #1a1a1a;">${inquiry.name}</td></tr>
              <tr style="background:#f9f9f9"><td style="padding: 8px 4px; color: #555; font-weight: bold;">Email Address</td><td style="padding: 8px 4px; color: #1a1a1a;"><a href="mailto:${inquiry.email}" style="color: #d4af37;">${inquiry.email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #555; font-weight: bold;">Phone / WhatsApp</td><td style="padding: 8px 0; color: #1a1a1a;">${inquiry.phone}</td></tr>
            </table>

            <h2 style="color: #1a1a1a; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">🗓️ Event Details</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr><td style="padding: 8px 0; color: #555; font-weight: bold; width: 40%;">Event Date</td><td style="padding: 8px 0; color: #1a1a1a; font-weight: bold;">${inquiry.date}</td></tr>
              <tr style="background:#f9f9f9"><td style="padding: 8px 4px; color: #555; font-weight: bold;">Event Category</td><td style="padding: 8px 4px; color: #1a1a1a;">${inquiry.eventType}</td></tr>
              <tr><td style="padding: 8px 0; color: #555; font-weight: bold;">Guest Count</td><td style="padding: 8px 0; color: #1a1a1a; font-weight: bold;">${inquiry.guestCount} guests</td></tr>
              <tr style="background:#f9f9f9"><td style="padding: 8px 4px; color: #555; font-weight: bold;">Gastronomy Theme</td><td style="padding: 8px 4px; color: #1a1a1a;">${inquiry.theme}</td></tr>
              <tr><td style="padding: 8px 0; color: #555; font-weight: bold;">Dietary Requirements</td><td style="padding: 8px 0; color: #1a1a1a;">${inquiry.dietaryTheme}</td></tr>
            </table>

            ${inquiry.customRequests ? `
            <h2 style="color: #1a1a1a; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">💬 Special Requests</h2>
            <div style="background: #fffbf0; border-left: 4px solid #d4af37; padding: 16px; border-radius: 4px; margin-bottom: 24px;">
              <p style="margin: 0; color: #333; line-height: 1.6; white-space: pre-wrap;">${inquiry.customRequests}</p>
            </div>` : ''}

            <div style="background: #1a1a1a; padding: 16px; border-radius: 8px; text-align: center;">
              <p style="color: #fdfbf7; margin: 0 0 10px 0; font-size: 13px;">Reply directly to this inquiry:</p>
              <a href="mailto:${inquiry.email}?subject=Re: Your Catering Inquiry for ${encodeURIComponent(inquiry.eventType)}"
                 style="display: inline-block; padding: 10px 24px; background: #d4af37; color: #1a1a1a; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 13px; margin-right: 8px;">
                ✉️ Reply via Email
              </a>
              <a href="https://wa.me/${inquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello ' + inquiry.name + ', this is Joel\'s Kitchen regarding your catering inquiry for ' + inquiry.eventType + ' on ' + inquiry.date + '.')}"
                 style="display: inline-block; padding: 10px 24px; background: #25D366; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 13px;">
                💬 WhatsApp Client
              </a>
            </div>

            <p style="color: #888; font-size: 11px; margin-top: 20px; text-align: center;">
              Inquiry ID: ${inquiry._id} • Received: ${new Date(inquiry.submittedAt).toLocaleString()}
            </p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Catering inquiry email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending catering inquiry email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendOrderConfirmation,
  sendOrderStatusUpdate,
  sendPasswordResetEmail,
  sendCateringInquiry
};
