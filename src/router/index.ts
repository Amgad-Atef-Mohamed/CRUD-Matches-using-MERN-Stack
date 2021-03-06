import { Router } from 'express'

const  IoCContainer = require('../IoCContainer')
const router: Router = Router()

router.use('/matches', IoCContainer.resolve('MatchesController').applyRoutes())
router.use('*',  (req, res) => {
    return res.status(200).send('this is the root Api')
})

export default router
