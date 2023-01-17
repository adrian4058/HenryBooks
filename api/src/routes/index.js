const {Router}=require ('express');
const autoresRoutes=require('./autor.routes')

const router=Router();


router.use('/autores',autoresRoutes)




module.exports = router;
