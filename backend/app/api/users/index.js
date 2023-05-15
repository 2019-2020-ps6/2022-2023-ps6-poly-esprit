const { Router } = require('express')

const { User } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')

const router = new Router()

router.get('/', (req, res) => {
    try {
        res.status(200).json(User.get())
    } catch (err) {
        manageAllErrors(res, err)
    }
})