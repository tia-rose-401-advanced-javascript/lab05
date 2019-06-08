'use strict'; 

require('../index');

describe('GreyScale functions', () => {
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
});