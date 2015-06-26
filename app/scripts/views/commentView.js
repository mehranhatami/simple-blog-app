var
  Backbone = window.Backbone,
  Handlebars = window.Handlebars;

module.exports = Backbone.View.extend({

  template: Handlebars.compile($('#commentView').html()),

  render: function () {
    var model = this.model.toJSON();

    model.date = new Date(Date.parse(model.date)).toDateString();

    this.el.innerHTML = this.template(model);

    return this;
  }
});