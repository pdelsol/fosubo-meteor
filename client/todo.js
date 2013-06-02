var TodosRouter = Backbone.Router.extend({
  routes: {
    "e/:employee_id": "main",
    "" : "welcome",
    "r" : "ranking",
    "t" : "thanks"
  },
  main: function (employee_id) {
    Session.set("employee_id", employee_id);
     Session.set("e", true);
  },
  welcome: function () {
    Session.set("w", true);
  },
  ranking: function () {
    Session.set("r", true);
  },
  thanks: function () {
    Session.set("t", true);
  }
});

Router = new TodosRouter;

Meteor.startup(function () {
  Backbone.history.start({pushState: true});
});