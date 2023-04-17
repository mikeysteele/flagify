
import express  from 'express';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import apiRouter from './api.mjs';

const COUNTRIES_PATH = 'src/resources/reference-data/countries.json';

const router = express.Router();

async function getCountries(){
    try{
        const data =  await readFile(resolve(COUNTRIES_PATH));
        return JSON.parse(data.toString())
    }catch(e){
        console.log(e)
        return '';
    }
   
}
/* GET home page. */
router.get('/', async (req, res) => {
    res.render('index', { countries: await getCountries() });
});
router.use('/api/v1', apiRouter)



export default router