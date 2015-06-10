require.config({
  baseUrl: "/scripts"
});

require([
  "app"
], function (app) {
  $(app.lunch);
});