const exppress=require('express')
const { createPost, getPostByID, updatePost, deletePostById, countPost, postGeoLocation } = require('../controller/post')
const { userRegistration, userLoing } = require('../controller/user')
const auth = require('../middleware/auth')
const router=exppress.Router()

router.post('/user/registration',userRegistration)
router.post('/user/login',userLoing)


// Posts APIs
router.post('/post',auth,createPost)
router.get('/post/details/:id',auth,getPostByID)
router.put('/post/update/:id',auth,updatePost)
router.delete('/post/delete/:id',auth,deletePostById)
router.get('/post/count',auth,countPost)
router.get('/post/geoLocation/:geoLocation',auth,postGeoLocation)

module.exports=router
