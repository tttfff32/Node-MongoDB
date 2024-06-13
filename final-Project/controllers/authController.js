const authService = require('../services/authService');

// פונקציה לרישום משתמש חדש
exports.signup= async (req, res) => {
  const { username, password, role } = req.body; // שליפת הנתונים מבקשת ה-POST
  console.log('Received data:', req.body); 

  if (!username || !password) { // בדיקה האם המשתמש או הסיסמא ריקים
    return res.status(400).json({ message: 'Username and password are required' }); // החזרת הודעת שגיאה במידה וכן
  }

  try {
    await authService.createUser(username, password, role); // קריאה לפונקציה בשירות ליצירת משתמש חדש
    res.status(201).json({ message: 'User created' }); // החזרת הודעת הצלחה
  } catch (error) {
    console.error('Error creating user:', error); // הדפסת השגיאה ללוגים
    res.status(500).json({ message: 'Internal server error', error: error.message }); // החזרת הודעת שגיאה כללית
  }
};

// פונקציה להתחברות משתמש קיים
exports.login = async (req, res) => {
  const { username, password } = req.body; // שליפת הנתונים מבקשת ה-POST
  console.log('Login data:', req.body); 

  if (!username || !password) { // בדיקה האם המשתמש או הסיסמא ריקים
    return res.status(400).json({ message: 'Username and password are required' }); // החזרת הודעת שגיאה במידה וכן
  }

  try {
    const token = await authService.authenticateUser(username, password); // קריאה לפונקציה בשירות לאימות משתמש
    if (token) {
      res.status(200).json({ token }); // החזרת הטוקן במידה והאימות הצליח
    } else {
      res.status(401).json({ message: 'Invalid credentials' }); // החזרת הודעת שגיאה במידה והאימות נכשל
    }
  } catch (error) {
    console.error('Error logging in user:', error); // הדפסת השגיאה ללוגים
    res.status(500).json({ message: 'Internal server error', error: error.message }); // החזרת הודעת שגיאה כללית
  }
};
