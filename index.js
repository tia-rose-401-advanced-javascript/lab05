'use strict';

const fs = require('fs');


const buffer = fs.readFileSync(`${__dirname}/assets/baldy.bmp`);
const parsedBitmap = {};

const FILE_TYPE_OFFSET = 0;
const FILE_SIZE_OFFSET = 2;
const PIXEL_OFFSET = 10;
const WIDTH_OFFSET = 18;
const HEIGHT_OFFSET = 22;
const BYTES_PER_PIXEL_OFFSET = 28;
const COLOR_TABLE_OFFSET = 54;

// //--------WORKS------//

parsedBitmap.buffer = buffer;
parsedBitmap.type = buffer.toString('utf-8', FILE_TYPE_OFFSET, 2);
parsedBitmap.fileSize = buffer.readInt32LE(FILE_SIZE_OFFSET);
parsedBitmap.pixelOffset = buffer.readInt32LE(PIXEL_OFFSET);
parsedBitmap.width = buffer.readInt32LE(WIDTH_OFFSET);
parsedBitmap.height = buffer.readInt32LE(HEIGHT_OFFSET);
parsedBitmap.bytesPerPixel = buffer.readInt32LE(BYTES_PER_PIXEL_OFFSET);
parsedBitmap.colorArray = buffer.slice(COLOR_TABLE_OFFSET, this.pixelOffset);

if(!parsedBitmap.colorArray.length){
  throw 'Invalid .bmp format';
}

function greyscale(bmp){
  for(let i = 0; i < bmp.colorArray.length; i += 4){
    let grey = (bmp.colorArray[i] + bmp.colorArray[i+1] + bmp.colorArray[i+2]) / 3;
    bmp.colorArray[i] = grey;
    bmp.colorArray[i+1] = grey;
    bmp.colorArray[i+2] = grey;
  }
}

// function randomscale(bmp){
//   for(let i =0; i < bmp.colorArray.length; i+= 4){
//     bmp.colorArray[i] = (bmp.colorArray[i] + bmp.colorArray[i+1] + bmp.colorArray[i+2]) / 3;
//     bmp.colorArray[i+1] = (bmp.colorArray[i] + bmp.colorArray[i+1] + bmp.colorArray[i+2]) / 16;
//     bmp.colorArray[i+2] = (bmp.colorArray[i] + bmp.colorArray[i+1] + bmp.colorArray[i+2]) / 13;
//   }
// }

// randomscale(parsedBitmap);
greyscale(parsedBitmap);


fs.writeFile('assets/baldy.greyscale.bmp', parsedBitmap.buffer, (err) => {
  if(err) throw err;
  console.log('success!');
});




// // -----Trying to get to work-------//

// /**
//  * Bitmap -- receives a file name, used in the transformer to note the new buffer
//  * @param filePath
//  * @constructor
//  */
// function Bitmap(filePath) {
//   this.file = filePath;
// }

// /**
//  * Parser -- accepts a buffer and will parse through it, according to the specification, creating object properties for each segment of the file
//  * @param buffer
//  */



// Bitmap.prototype.parse = function(buffer) {
//   this.buffer = buffer;
//   this.type = buffer.toString('utf-8', FILE_TYPE_OFFSET, 2);
//   this.fileSize = buffer.readInt32LE(FILE_SIZE_OFFSET);
//   this.pixelOffset = buffer.readInt32LE(PIXEL_OFFSET);
//   this.width = buffer.readInt32LE(WIDTH_OFFSET);
//   this.height = buffer.readInt32LE(HEIGHT_OFFSET);
//   this.bytesPerPixel = buffer.readInt32LE(BYTES_PER_PIXEL_OFFSET);
//   this.colorArray = buffer.slice(COLOR_TABLE_OFFSET, this.pixelOffset);
// };

// /**
//  * Transform a bitmap using some set of rules. The operation points to some function, which will operate on a bitmap instance
//  * @param operation
//  */
// Bitmap.prototype.transform = function(operation) {
//   // This is really assumptive and unsafe
//   transforms[operation](this);
//   this.newFile = this.file.replace(/\.bmp/, `.${operation}.bmp`);
// };

// /**
//  * Sample Transformer (greyscale)
//  * Would be called by Bitmap.transform('greyscale')
//  * Pro Tip: Use "pass by reference" to alter the bitmap's buffer in place so you don't have to pass it around ...
//  * @param bmp
//  */

// console.log(this.colorArray);
// const transformGreyscale = (bmp) => {

//   console.log('Transforming bitmap into greyscale', bmp);

//   //TODO: Figure out a way to validate that the bmp instance is actually valid before trying to transform it

//   console.log(bmp.colorArray);
//   if(!bmp.colorArray.length){
//     throw 'Invalid .bmp format';
//   }else{

//     //   //TODO: alter bmp to make the image greyscale ...

//     for(let i = 0; i < bmp.colorArray.length; i += 4){
//       let grey = (bmp.colorArray[i] + bmp.colorArray[i+1] + bmp.colorArray[i+2]) / 3;
//       bmp.colorArray[i] = grey;
//       bmp.colorArray[i+1] = grey;
//       bmp.colorArray[i+2] = grey;
//       console.log(bmp.colorArray);
//     }
//   }
// };



// // const doTheInversion = (bmp) => {
// //   // bmp = {};
// //   console.log('In the Inversion function');
// //   if(!parsedBitmap.colorArray.length){
// //     throw 'Invalid .bmp format';
// //   }else{
// //     for(let i = 0; i < bmp.colorArray.length; i +=4){
// //       bmp.colorArray[i] *= color.colorArray[i];
// //       bmp.colorArray[i+1] *= color.colorArray[i+1];
// //       bmp.colorArray[i+2] *= color.colorArray[i+2];
// //     }
// //   }
// // };

// // /**
// //  * A dictionary of transformations
// //  * Each property represents a transformation that someone could enter on the command line and then a function that would be called on the bitmap to do this job
// //  */
// const transforms = {
//   greyscale: transformGreyscale,
//   // invert: doTheInversion,
// };

// // // ------------------ GET TO WORK ------------------- //

// // function transformWithCallbacks() {

// //   fs.readFile(file, (err, buffer) => {
// //     console.log(file);
// //     if (err) {
// //       throw err;
// //     }

// //     bitmap.parse(buffer);

// //     bitmap.transform(operation);

// //     // Note that this has to be nested!
// //     // Also, it uses the bitmap's instance properties for the name and thew new buffer
// //     fs.writeFile(bitmap.newFile, bitmap.buffer, (err, out) => {
// //       if (err) {
// //         throw err;
// //       }
// //       console.log(`Bitmap Transformed: ${bitmap.newFile}`);
// //     });

// //   });
// // }

// // // TODO: Explain how this works (in your README)
// // const [file, operation] = process.argv.slice(2);

// // let bitmap = new Bitmap(file);

// // // transformWithCallbacks();

// transformGreyscale(parsedBitmap);


// fs.writeFile('assets/baldy.greyscale.bmp', parsedBitmap.buffer, (err) => {
//   if(err) throw err;
//   console.log('success!');
// });
