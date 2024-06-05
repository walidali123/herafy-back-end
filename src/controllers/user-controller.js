import bcrypt from 'bcrypt';
import User from '../models/user.js';
import Mongoose from 'mongoose';

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, jobTitle, description } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !role ||
      (role === 'craftsman' && (!jobTitle || !description))
    ) {
      return res.status(400).send('missing required fields');
    }

    let user = await User.findOne({ email });
    if (user) return res.status(400).send('User already registered.');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      jobTitle,
      description,
    });

    await user.save();

    const token = user.genAuthToken();
    res.header('x-auth-token', token).send('Registered successfully');
  } catch (error) {
    if (error instanceof Mongoose.Error.ValidationError) {
      for (const e in error.errors) {
        console.log(error.errors[e].message);
      }
    } else {
      console.log(error.message);
    }
    res.status(500).send('Server error');
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).send('Invalid email or password.');

    const token = user.genAuthToken();
    res.header('x-auth-token', token).json({
      message: 'Logged in successfully',
      user: user.toObject(),
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// export const getUserProfile = async (req, res) => {
//   const user = await User.findById(req.user._id).select('-password');
//   res.send(user);
// };
