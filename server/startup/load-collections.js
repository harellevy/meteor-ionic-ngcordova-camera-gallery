Meteor.startup(function () {
	if (Guides.find().count() === 0) {
		var guides = [
			{
				"requirements": [
					"Pencil",
					"Blank page"
				],
				"skills": [
					"Basic drawing skills"
				],
				"tags": [
					"draw",
					"3D"
				],
				"public": true,
				"title": "how to draw",
				"mainTag": "ART",
				"fullDescription": "Draw 3D objects using lines on paper. Make objects appear to be coming out of the page using this simple technique. Great fun to do with children. Draw a three dimensional hand, spoon and Bart Simpson!",
				"rating": {
					"ratingAvg": "3"
				},
				"free": true,
				"difficulty": "2",
				"owner": "wghzyRzKDLrwLCN8w",
				"_id": "fuECamCWqwNWLs6Qw",
				"$$hashKey": "object:11"
			},
			{
				"difficulty": "0",
				"free": true,
				"fullDescription": "ow to cut string or rope if you haven't got a knife or a pair of scissors. Great life hack trick to help you in an emergency. Cut rope with string!",
				"mainTag": "TIPS",
				"owner": "wghzyRzKDLrwLCN8w",
				"public": true,
				"rating": {
					"ratingAvg": "4"
				},
				"requirements": [],
				"skills": [],
				"tags": [
					"Cut",
					"Rope",
					"Emergency",
					"string"
				],
				"title": "How to Cut Rope in an Emergency",
				"_id": "5LkzFsdzPizx3Ssmp",
				"$$hashKey": "object:17"
			},
			{
				"requirements": [
					"A sharp knife",
					"Cutting board"
				],
				"skills": [
					"No special skills are required"
				],
				"tags": [
					"Serve",
					"Pineapple"
				],
				"public": true,
				"fullDescription": "How to prepare and serve a pineapple. With just a few cuts your pineapple will impress your friends and be perfect for serving at a party. Fun and simple food trick.\naviram h'a gever!",
				"mainTag": "KITCHEN AND RECEPIES",
				"title": "How to Serve Pineapple",
				"rating": {
					"ratingAvg": "5"
				},
				"free": true,
				"difficulty": "1",
				"owner": "wghzyRzKDLrwLCN8w",
				"_id": "NGmyMMoceZoELzHzP",
				"$$hashKey": "object:20"
			},
			{
				"requirements": [],
				"skills": [],
				"tags": [
					"okpok",
					"ii-p[",
					"ij0okp["
				],
				"public": true,
				"title": "0oi0o",
				"mainTag": "MUSIC AND INSTRUMENT",
				"fullDescription": "oijiopi[oiuy8ui9opoyuiopl;[oiuuijokpl;['ojhjikol;",
				"owner": "wghzyRzKDLrwLCN8w",
				"_id": "dCw8ikoE4RuNLmuSc",
				"$$hashKey": "object:26"
			},
			{
				"requirements": [
					"ertewgdsfg",
					"sdfg"
				],
				"skills": [
					"erterter",
					"tert"
				],
				"tags": [
					"tterte",
					"dfs"
				],
				"public": true,
				"title": "jhkjhjkhlkjhkj",
				"mainTag": "FREE TIME AND FUN",
				"fullDescription": "lkdjfslkdfjsl;kdfja;skdjf;skdfj;asdfasd",
				"rating": {
					"ratingAvg": "3"
				},
				"free": true,
				"difficulty": "0",
				"owner": "wghzyRzKDLrwLCN8w",
				"_id": "45vC6hxZCh2zxGNs9",
				"$$hashKey": "object:29"
			}
		];


		for (var i = 0; i < guides.length; i++)
			Guides.insert({
				title: guides[i].title,
				mainTag: guides[i].mainTag,
				tags: guides[i].tags,
				guideImg: guides[i].guideImg,
				fullDescription: guides[i].fullDescription,
				commentsId: guides[i].commentsId,
				free: guides[i].free,
				difficulty: guides[i].difficulty,
				rating: guides[i].rating,
				requirements: guides[i].requirements,
				skills: guides[i].skills,
				languages: guides[i].languages,
				fullGuide: guides[i].fullGuide
			});

	}
});