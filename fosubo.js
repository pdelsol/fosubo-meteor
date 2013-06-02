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
		if (Players.find().count() === 0) {
			var names = ["Ada Lovelace",
				 "Grace Hopper",
				 "Marie Curie",
				 "Carl Friedrich Gauss",
				 "Nikola Tesla",
				 "Claude Shannon"];
			for (var i = 0; i < names.length; i++)
				Players.insert({name: names[i], score: Math.floor(Random.fraction()*10)*5});
		}
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
}

