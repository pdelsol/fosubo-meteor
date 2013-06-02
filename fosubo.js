// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".

Players = new Meteor.Collection("players");
Ratings = new Meteor.Collection("ratings");
Employees = new Meteor.Collection("employees");

if (Meteor.isClient) {

	Template.rateme.employee = function () {
		return Employees.findOne({id: Session.get("employee_id")});
	}

	Template.rateme.rendered = function () {
		$('#rateit').rateit({max: 4, step: 1, backingfld: '#ratingx' });
	}

	Template.rateme.events({
		'click a#submit': function () {
			var employee = Employees.findOne({id: Session.get("employee_id")});
			Ratings.insert({employee: employee,rating: $('#ratingx')[0].value, feedback: $('#feedback')[0].value});
			Session.set("e",false);
      Session.set("t",true);
		}
	});

  Template.rateme.events({
		'click a#request_call': function () {

        // Esto es para saber donde hacer el redirect de vuelta en el PHP que hace la llamada
        var current_url = document.location.href;
        var back_to = "fosubo";
        if (current_url.indexOf('localhost') !== -1) back_to = "localhost";

        url = 'http://clicktocall.fosubo.com/clickfono.php?backto='+back_to+'&number='+$('#phonenumber')[0].value;
        document.location.href=url;
    }
  });

	Template.rateme.w = function () {
    return Session.get("w");
	}
	Template.rateme.e = function () {
    return Session.get("e");
	}
	Template.rateme.r = function () {
    return Session.get("r");
	}
	Template.rateme.t = function () {
    return Session.get("t");
	}

	Template.rateme.ratings = function () {
		return Ratings.find({}, {sort: {rating: -1, name: 1}});
	};
}

// On server startup, create some players if the database is empty.
if (Meteor.isServer) {
	/*Employees.remove({name : {$ne : " "}})*/
	Meteor.startup(function () {
		if (Employees.find().count() === 0) {
			var names = ["Nicolas Brenner",
						 "Fabian Perez",
						 "Patricio del Sol"];
			var ids = ["1","2","3"];
			var pics = ["557107_10101459959845573_741973235_n.jpg",
						 "a5d8826dfeae92fb7c450bf84e800d07.jpg",
						 "253803_10101349099750114_1164553438_n.jpg"];
			for (var i = 0; i < names.length; i++)
				Employees.insert({name: names[i], id: ids[i], pic: pics[i]});
		}
	});

  /*
  Meteor.methods({
		fetchFromService: function(phonenumber) {
			var url = 'http://clicktocall.fosubo.com/clickfono.php?number='+phonenumber;
      var result = Meteor.http.get(url, {timeout:30000});
      if(result.statusCode==200) {
          var respJson = JSON.parse(result.content);
          console.log("response received.");
          //custom code
          if(respJson.message.code == 0) { //IF OK
              console.log('returning response');
              return respJson;
          } else {
              throw new Meteor.Error(respJson.message.code, respJson.message.text);
          }
      } else {
          console.log("Content issue: ", result.statusCode);
          throw new Meteor.Error("");
      }
		}
	});*/

}

