const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// פונקציה ליצירת משתמש חדש
exports.createUser = async (username, password, role) => {
  const hashedPassword = await bcrypt.hash(password, 10); // הצפנת הסיסמא
  const user = new User({ username, password: hashedPassword, role }); // יצירת אובייקט משתמש חדש

  try {
    await user.save(); // שמירת המשתמש בבסיס הנתונים
    return user;
  } catch (error) {
    console.error('Error saving user:', error);
    throw error;
  }
};

// פונקציה לאימות משתמש קיים
exports.authenticateUser = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) {
    return null; // החזרת null במידה והמשתמש לא נמצא
  }

  bcrypt.compare(password, user.password, (err, result) => {

    if (err) {
      return null;
    }

    if (result) {
      console.log('Passwords match! User authenticated.');
    }

  });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' }); // יצירת טוקן JWT
  return token;
};
