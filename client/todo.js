var TodosRouter = Backbone.Router.extend({
  routes: {
    "e/:employee_id": "main"
  },
  main: function (employee_id) {
    Session.set("employee_id", employee_id);
  },
});

Router = new TodosRouter;

Meteor.startup(function () {
  Backbone.history.start({pushState: true});
});