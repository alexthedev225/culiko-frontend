import jwt from 'jsonwebtoken';

export const verifyToken = (req) => {
  const token = req.headers.get('authorization')?.split(' ')[1];

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch {
    return null;
  }
};
