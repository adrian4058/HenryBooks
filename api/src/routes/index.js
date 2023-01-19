const {Router}=require ('express');
const autores=require('./autor.routes')

const router=Router();


router.use('/autores',autores)




module.exports = router;
