// import jwt from 'jsonwebtoken';
// import userModel from '../models/userModel.js';

// const authMiddleware = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res.status(401).json({ success: false, message: 'No token provided' });
//     }
//  const token = authHeader.split(' ')[1];
// const decoded = jwt.verify(token, process.env.JWT_SECRET);
// console.log('Decoded JWT:', decoded);
// console.log('Auth header:', req.headers.authorization);
// console.log('Decoded JWT:', decoded);
// console.log('User fetched:', user);


// const userId = decoded.userId || decoded.id || decoded._id;

// if (!userId) {
//   return res.status(401).json({ success: false, message: 'Invalid token payload' });
// }

// const user = await userModel.findById(userId).select('-password');
//  // ✅ sahi

  
    
//     if (!user) {
//       return res.status(401).json({ success: false, message: 'User not found' });
//     }

//     req.user = user; // ✅ this makes user available in routes
//     next();
//   } catch (error) {
//     console.error('Auth Error:', error);
//     res.status(401).json({ success: false, message: 'Unauthorized' });
//   }
// };

// export default authMiddleware;

import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded JWT:', decoded);
    console.log('Auth header:', req.headers.authorization);

    const userId = decoded.userId || decoded.id || decoded._id;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Invalid token payload' });
    }

    const user = await userModel.findById(userId).select('-password');
    console.log('User fetched:', user);

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    req.user = user; // ✅ this makes user available in routes
    next();
  } catch (error) {
    console.error('Auth Error:', error);
    res.status(401).json({ success: false, message: 'Unauthorized' });
  }
};

export default authMiddleware;

