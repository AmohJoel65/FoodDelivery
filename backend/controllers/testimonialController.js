const { readDB, writeDB } = require('../config/db');

// Add a testimonial (logged-in users)
const addTestimonial = async (req, res) => {
  try {
    const { userId, message, rating } = req.body;

    if (!userId || !message || !rating) {
      return res.json({ success: false, message: "Please provide all required fields." });
    }

    const db = readDB();
    const user = db.users.find(u => u._id === userId);
    if (!user) {
      return res.json({ success: false, message: "User not found." });
    }

    if (!db.testimonials) db.testimonials = [];

    const newTestimonial = {
      _id: `testimonial_${Date.now()}`,
      userId,
      userName: user.name,
      message: message.trim(),
      rating: Math.min(5, Math.max(1, parseInt(rating))),
      date: new Date().toISOString(),
      approved: true // auto-approve; admin can toggle later
    };

    db.testimonials.push(newTestimonial);
    writeDB(db);

    res.json({ success: true, message: "Thank you for your feedback!", testimonial: newTestimonial });
  } catch (error) {
    console.error("Add Testimonial Error:", error);
    res.json({ success: false, message: "Failed to submit testimonial." });
  }
};

// List approved testimonials (public)
const listTestimonials = async (req, res) => {
  try {
    const db = readDB();
    const testimonials = (db.testimonials || [])
      .filter(t => t.approved)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 20);

    res.json({ success: true, data: testimonials });
  } catch (error) {
    console.error("List Testimonials Error:", error);
    res.json({ success: false, message: "Failed to load testimonials." });
  }
};

module.exports = { addTestimonial, listTestimonials };
