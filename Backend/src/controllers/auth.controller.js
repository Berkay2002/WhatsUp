import bcrypt from 'bcryptjs';
import User from '../models/user.model.js'; // Adjust path as necessary
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).send({ id: user._id, email: user.email, token });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
};
