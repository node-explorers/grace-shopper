const router = require('express').Router()
const { User } = require('../db/models')
const adminAuth = require('../customMiddleware')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'isAdmin']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    let result = await User.update(
      {
        isAdmin: req.body.toggAdmin
      },
      {
        where: { id: req.params.userId }
      }
    )
    res.json(result)
  } catch (err) {
    next(err)
  }
})

router.put('/password/:userId', async (req, res, next) => {
  console.log(req.body)
  try {
    await User.update(
      {
        password: req.body.newPassword,
        resetPassword: false
      },
      {
        where: {
          id: req.params.userId
        },
        individualHooks: true
      }
    )

    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

router.put('/reset/:userId', adminAuth, async (req, res, next) => {
  try {
    let result = await User.update(
      {
        resetPassword: req.body.bool
      },
      {
        where: { id: req.params.userId }
      }
    )
    res.json(result)
  } catch (err) {
    next(err)
  }
})

router.delete('/', adminAuth, async (req, res, next) => {
  try {
    let result = await User.destroy({
      where: {
        id: Number(req.query.id)
      }
    })
    res.json(result)
  } catch (err) {
    next(err)
  }
})
