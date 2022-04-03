const { Router } = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const router = Router()

// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'ელ. ფოსტა არასწორია').isEmail(),
    check('password', 'პაროლი არ შეესაბამება მოთხოვნებს').isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'მონაცემები არასწორია',
        })
      }

      const { email, password } = req.body
      const candidate = await User.findOne({
        email,
      }) /*email:email რადგან გასაღებიც და მნიშვნელობაც იგივეა იწერება მოკლედ*/
      if (candidate) {
        return res
          .status(400)
          .json({ message: 'ასეთი ელ. ფოსტით მომხმარებელი უკვე არსებობს' })
      }

      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({ email, password: hashedPassword })

      await user.save()

      res.status(201).json({ message: 'რეგისტრაცია დასრულდა წარმატებით' })
    } catch (e) {
      res
        .status(500)
        .json({ message: 'დაფიქსირდა შეცდომა, გთხოვთ სცადოთ ხელახლა' })
    }
  }
)
// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'ელ. ფოსტა არასწორია').normalizeEmail().isEmail(),
    check('password', 'შეიყვანეთ პაროლი').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'მონაცემები არასწორია',
        })
      }
      const { email, password } = req.body
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ message: 'მომხმარებლი არ მოიძებნა' })
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({ message: 'პაროლი არასწორია' })
      }
      const token = jwt.sign(
        {
          userId:
            user.id /*აქვე შეიძლება მომხმარებლის სხვა მინაცემების გადაცემაც*/,
        },
        config.get('jwtSecret'),
        { expiresIn: '1h' }
      )

      res.json({ token, userId: user.id })
    } catch (e) {
      res
        .status(500)
        .json({ message: 'დაფიქსირდა შეცდომა, გთხოვთ სცადოთ ხელახლა' })
    }
  }
)

module.exports = router
