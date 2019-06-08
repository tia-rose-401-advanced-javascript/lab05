'use strict'; 

const greyscale = require('../lib/greyscale');
const inversion = require('../lib/inversion');


describe('GreyScale function', () => {
  let greyParams = {
    file: './assets/baldy.bmp',
    buffer: [],
    type: 'BM',
    fileSize: 15146,
    pixelOffset: 1146,
    width: 110,
    height: 125,
    bytesPerPixel: 8,
    colorArray: [7, 150, 23, 1],
    pixelData: [],
  };

  it('should greyscale a provided bitmap', () => {
    greyscale(greyParams);

    expect(greyParams.colorArray[0]).toEqual(60);
    expect(greyParams.colorArray[1]).toEqual(60);
    expect(greyParams.colorArray[2]).toEqual(60);
    expect(greyParams.colorArray[3]).toEqual(1);
  });

  describe('Inversion function', () => {
    let inversionParams = {
      file: './assets/baldy.bmp',
      buffer: [],
      type: 'BM',
      fileSize: 15146,
      pixelOffset: 1146,
      width: 110,
      height: 125,
      bytesPerPixel: 8,
      colorArray: [255, 255, 255, 1],
      pixelData: [],
    };
  
    it('should greyscale a provided bitmap', () => {
      inversion(inversionParams);
  
      expect(inversionParams.colorArray[0]).toEqual(255);
      expect(inversionParams.colorArray[1]).toEqual(127);
      expect(inversionParams.colorArray[2]).toEqual(0);
      expect(inversionParams.colorArray[3]).toEqual(1);
    });
  });
});