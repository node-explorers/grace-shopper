function adminAuth(req, res, next) {
  console.log('**req.user.isAdmin**', req.user.isAdmin)
  if (req.user.isAdmin) {
    next()
  } else {
    res.sendStatus(403)
  }
}

module.exports = adminAuth
