const addIdBasedOnFilename = require('./addIdBasedOnFilename');

module.exports = {
  plugins: [
    {
      name: 'removeDimensions',
      active: true,
    },
    {
      name: 'removeViewBox',
      active: false,
    },
    {
      name: 'removeAttrs',
      params: {
        attrs: ['xmlns'],
      },
    },
    addIdBasedOnFilename,
  ],
};
