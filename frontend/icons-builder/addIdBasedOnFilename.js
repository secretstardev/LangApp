module.exports = {
  name: 'addIdBasedOnFilename',
  type: 'full',
  fn: (item, params, info) => {
    return {
      element: {
        enter: (node) => {
          if (node.name === 'svg') {
            const filename = info.path ? info.path.split('/').pop().split('.')[0] : 'defaultId';
            node.attributes.id = filename;
          }
        },
      },
    };
  },
};
