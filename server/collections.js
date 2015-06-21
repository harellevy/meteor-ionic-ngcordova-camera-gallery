Meteor.publish('Projects', function () {
	return Projects.find({});
});

Meteor.publish('Tasks', function () {
	return Tasks.find({});
});
