module.exports = {
  configs: {
    recommended: {
      plugins: ['smx'],
      rules: {
        'smx/padding-block': 'error'
      }
    }
  },
  rules: {
    'padding-block': require('./lib/rules/padding-block')

    // add additional rules here
  }
};
