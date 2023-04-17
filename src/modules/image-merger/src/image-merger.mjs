/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import Jimp from 'jimp'


export class Merger {
    constructor(mode) {
        this.mode = mode;
    }
    async merge(image1, image2, options) {
        var mode = this.mode;
        const file1 = await Jimp.read(image1)
        const file2 = await Jimp.read(image2)
        const merged = await file1.composite(file2, options.top, options.left)

       return merged;

         

    }
}
