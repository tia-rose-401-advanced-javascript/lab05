'use strict';

module.exports = (bmp) => {
  console.log('In the Inversion function');
  if(!bmp.colorArray.length){
    throw 'Invalid .bmp format';
  }else{
      
    for(let i =0; i < bmp.colorArray.length; i+= 4){
      bmp.colorArray[i] = (bmp.colorArray[i] - 0);
      bmp.colorArray[i+1] = (bmp.colorArray[i+1] - 128);
      bmp.colorArray[i+2] = (bmp.colorArray[i+2] - 255); 
    }
  }
};