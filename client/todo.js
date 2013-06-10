var TodosRouter = Backbone.Router.extend({
  routes: {
    "e/:employee_id": "main",
    "" : "welcome",
    "r" : "ranking",
    "t" : "thanks",
    "a" : "alerts"
  },
  main: function (employee_id) {
    Session.set("employee_id", employee_id);
     Session.set("e", true);
  },
  welcome: function () {
    Session.set("w", false);
    Session.set("r", false);
    Session.set("t", false);
    Session.set("a", false);

    Session.set("w", true);
  },
  ranking: function () {
    Session.set("w", false);
    Session.set("r", false);
    Session.set("t", false);
    Session.set("a", false);

    Session.set("r", true);
  },
  thanks: function () {
    Session.set("w", false);
    Session.set("r", false);
    Session.set("t", false);
    Session.set("a", false);

    Session.set("t", true);
  },
  alerts: function () {
    Session.set("w", false);
    Session.set("r", false);
    Session.set("t", false);
    Session.set("a", false);

    Session.set("a", true);
  }
});

Router = new TodosRouter;

Meteor.startup(function () {
  Backbone.history.start({pushState: true});
});

!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');