const router = require('express').Router()
const { Mini } = require('../db/models')
const {
  requireLogin, 
  requireJudge1
} = require('../middlewares')

// /api/minis GET
router.get('/', requireLogin, async (req, res, next) => {
  try {
    const mini = await Mini.findAll()
    res.json(mini)
  } catch (e) { next(e) }
})

// /api/minis POST
router.post('/', requireJudge1, async (req, res, next) => {
  try {
    const newMini = req.body
    if (!newMini.userId) newMini.userId = req.user.id
    const mini = await Mini.create(newMini)
    res.status(200).json(mini)
  } catch (e) { next(e) }
})


// /api/minis/:miniId/join PUT
router.put('/:miniId/join', requireLogin, async (req, res, next) => {
  try {
    const mini = await Mini.join(req.params.miniId, req.user.id)
    res.json(mini)
  } catch (e) { next(e) }
})

module.exports = router