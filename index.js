'use strict';

const fs = require('fs');
const greyscale = require('./lib/greyscale');
const inversion = require('./lib/inversion');

const FILE_TYPE_OFFSET = 0;
const FILE_SIZE_OFFSET = 2;
const PIXEL_OFFSET = 10;
const WIDTH_OFFSET = 18;
const HEIGHT_OFFSET = 22;
const BYTES_PER_PIXEL_OFFSET = 28;
const COLOR_TABLE_OFFSET = 54;

/**
 * Bitmap -- receives a file name, used in the transformer to note the new buffer
 * @param filePath
 * @constructor
 */
function Bitmap(filePath) {
  this.file = filePath;
}

/**
 * Parser -- accepts a buffer and will parse through it, according to the specification, creating object properties for each segment of the file
 * @param buffer
 */

Bitmap.prototype.parse = function(buffer) {
  this.buffer = buffer;
  this.type = buffer.toString('utf-8', FILE_TYPE_OFFSET, 2);
  this.fileSize = buffer.readInt32LE(FILE_SIZE_OFFSET);
  this.pixelOffset = buffer.readInt32LE(PIXEL_OFFSET);
  this.width = buffer.readInt32LE(WIDTH_OFFSET);
  this.height = buffer.readInt32LE(HEIGHT_OFFSET);
  this.bytesPerPixel = buffer.readInt32LE(BYTES_PER_PIXEL_OFFSET);
  this.colorArray = buffer.slice(COLOR_TABLE_OFFSET, this.pixelOffset);
  this.pixelArray = buffer.slice(this.pixelOffset);
};

/**
 * Transform a bitmap using some set of rules. The operation points to some function, which will operate on a bitmap instance
 * @param operation
 */
Bitmap.prototype.transform = function(operation) {
  // This is really assumptive and unsafe
  transforms[operation](this);
  this.newFile = this.file.replace(/\.bmp/, `.${operation}.bmp`);
};

const pixelate = (bmp) => {
  // bmp = {};
  console.log('In the Pixel function');
  if(!bmp.pixelArray.length){
    throw 'Invalid .bmp format';
  }else{
    
    for(let i =0; i < bmp.pixelArray.length; i+= 4){
      let random = Math.floor((Math.random()*4)+1);
      bmp.pixelArray[i+random] = null;
    }
  }
};

// /**
//  * A dictionary of transformations
//  * Each property represents a transformation that someone could enter on the command line and then a function that would be called on the bitmap to do this job
//  */
const transforms = {
  greyscale: greyscale,
  invert: inversion,
  pixel: pixelate,
};

// ------------------ GET TO WORK ------------------- //
function transformWithCallbacks() {

  fs.readFile(file, (err, buffer) => {

    if (err) {
      throw err;
    }

    bitmap.parse(buffer);

    bitmap.transform(operation);

    // Note that this has to be nested!
    // Also, it uses the bitmap's instance properties for the name and thew new buffer
    fs.writeFile(bitmap.newFile, bitmap.buffer, (err, out) => {
      if (err) {
        throw err;
      }
      console.log(`Bitmap Transformed: ${bitmap.newFile}`);
    });

  });
}

// TODO: Explain how this works (in your README)
const [file, operation] = process.argv.slice(2);

let bitmap = new Bitmap(file);

transformWithCallbacks(operation);

