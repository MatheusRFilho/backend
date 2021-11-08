import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

function verifyJWT(req, res) {
  const token = req.headers['authorization'];
  if (!token)
    return res.status(401).json({ auth: false, message: 'No token provided.' });
  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .json({ auth: false, message: 'Failed to authenticate token.' });

    req.userId = decoded.id;
  });
}

export { verifyJWT };
