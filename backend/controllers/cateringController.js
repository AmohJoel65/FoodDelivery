const { readDB, writeDB } = require('../config/db');
const { sendCateringInquiry } = require('../utils/emailService');

const submitCateringInquiry = async (req, res) => {
  try {
    const { name, email, phone, date, eventType, guestCount, theme, dietaryTheme, customRequests } = req.body;

    // Basic validation
    if (!name || !email || !phone || !date || !guestCount) {
      return res.json({ success: false, message: 'Please fill in all required fields.' });
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.json({ success: false, message: 'Please provide a valid email address.' });
    }

    const db = readDB();
    if (!db.cateringInquiries) db.cateringInquiries = [];

    const inquiry = {
      _id: `catering_${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      date,
      eventType: eventType || 'Corporate Gala',
      guestCount: parseInt(guestCount, 10),
      theme: theme || 'Not specified',
      dietaryTheme: dietaryTheme || 'None',
      customRequests: (customRequests || '').trim(),
      submittedAt: new Date().toISOString(),
      status: 'New'
    };

    db.cateringInquiries.push(inquiry);
    writeDB(db);

    // Send email notification to restaurant owner — non-blocking
    sendCateringInquiry(inquiry).catch(err =>
      console.error('Catering email notification failed:', err)
    );

    res.json({
      success: true,
      message: 'Your catering inquiry has been received! We will contact you within 24 hours.',
      inquiryId: inquiry._id
    });
  } catch (error) {
    console.error('Catering Inquiry Error:', error);
    res.json({ success: false, message: 'Failed to submit inquiry. Please try again.' });
  }
};

module.exports = { submitCateringInquiry };
