const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS ') {
    return next()
  }

  try {
    //req.headers.authorization-ით ვიღებთ "Bearer TOKEN", რომელიც უნდა გავყოთ split-ით token-ის მისაღებად
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
      return res.status(401).json({ massage: 'არ გაქვთ გავლილი ავტორიზაცია' })
    }

    const decoded = jwt.verify(token, config.get('jwtSecret'))
    req.user = decoded
    next()
  } catch (e) {
    res.status(401).json({ massage: 'არ გაქვთ გავლილი ავტორიზაცია' })
  }
}
