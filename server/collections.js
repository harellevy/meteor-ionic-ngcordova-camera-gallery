Meteor.publish("guides", function(){
	return Guides.find({
		//$or: [
		//	{$and: [
		//		{"public" : true},
		//		{"public" : {$exists: true}}
		//	]},
		//	{$and: [
		//		{"owner" : this.userId},
		//		{"owner" : {$exists: true}}
		//	]}
		//]
	});
});

Meteor.publish('tasks', function () {
	return Tasks.find({});
});

Meteor.publish("users", function(){
	return Meteor.users.find({});//fields: {emails: 1, profile: 1}
});