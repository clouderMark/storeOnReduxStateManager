import express from 'express'
import NavigationController from '../controlers/Navigation.js'

const router = new express.Router()

router.get('/getall', NavigationController.getAll)

export default router
