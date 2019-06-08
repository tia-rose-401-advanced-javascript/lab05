'use strict';

module.exports = (bmp) => {

  console.log('Transforming bitmap into greyscale', bmp);
  
  //TODO: Figure out a way to validate that the bmp instance is actually valid before trying to transform it
  
  if(!bmp.colorArray.length){
    throw 'Invalid .bmp format';
  }else{
  
    //   //TODO: alter bmp to make the image greyscale ...
  
    for(let i = 0; i < bmp.colorArray.length; i += 4){
      let grey = (bmp.colorArray[i] + bmp.colorArray[i+1] + bmp.colorArray[i+2]) / 3;
      bmp.colorArray[i] = grey;
      bmp.colorArray[i+1] = grey;
      bmp.colorArray[i+2] = grey;
    }
  }
};