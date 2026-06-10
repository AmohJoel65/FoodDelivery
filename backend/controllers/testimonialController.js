const Testimonial = require('../models/Testimonial');
const User = require('../models/User');

// Add a testimonial (logged-in users)
const addTestimonial = async (req, res) => {
  try {
    const { userId, message, rating } = req.body;

    if (!userId || !message || !rating) {
      return res.json({ success: false, message: "Please provide all required fields." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found." });
    }

    const newTestimonial = await Testimonial.create({
      userId,
      userName: user.name,
      message: message.trim(),
      rating: Math.min(5, Math.max(1, parseInt(rating))),
      approved: true // auto-approve; admin can toggle later
    });

    res.json({ success: true, message: "Thank you for your feedback!", testimonial: newTestimonial });
  } catch (error) {
    console.error("Add Testimonial Error:", error);
    res.json({ success: false, message: "Failed to submit testimonial." });
  }
};

// List approved testimonials (public)
const listTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ approved: true })
      .sort({ date: -1 })
      .limit(20);

    res.json({ success: true, data: testimonials });
  } catch (error) {
    console.error("List Testimonials Error:", error);
    res.json({ success: false, message: "Failed to load testimonials." });
  }
};

module.exports = { addTestimonial, listTestimonials };
