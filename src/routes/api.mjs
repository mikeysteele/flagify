import express  from 'express';
import multer from  'multer';
const router = express.Router();

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

/* GET home page. */
router.get('/last-five-images',  (req, res) => {
    res.end()    

});

router.post('/process', upload.single('userImage'), async (req, res, next) => {
    res.end()     
});


export default router;
