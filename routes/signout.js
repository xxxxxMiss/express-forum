const express = require('express')
const router = express.Router()

router.get('/signout', (req, res) => {
  req.session.user = null
  res.redirect('/topics')
})

module.exports = router