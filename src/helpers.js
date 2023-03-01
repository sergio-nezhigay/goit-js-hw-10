Handlebars.registerHelper('eachProperty', function (context, options) {
  var ret = '';
  console.log('🚀 ~ file: helpers.js:10 ~ re11gisterHelper:', registerHelper);
  for (var prop in context) {
    ret = ret + options.fn({ property: prop, value: context[prop] });
  }

  return ret;
});
