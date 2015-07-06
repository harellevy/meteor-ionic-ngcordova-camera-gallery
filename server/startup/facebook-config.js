//first, remove configuration entry in case service is already configured
ServiceConfiguration.configurations.remove({
	service: "facebook"
});
ServiceConfiguration.configurations.insert({
	service: "facebook",
	appId: "840725886005403",
	secret: "6054a24ff809256c516cec42f51051d2"
});