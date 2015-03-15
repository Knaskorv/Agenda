$(function() {
	//We instantiate our model
	var model = new Model();
	
	//And create the needed controllers and views
	
	var mainView = new MainView($("#mainView"), model);
	var addActivityView = new AddActivityView($("#addActivityView"), model);
	

	var addActivityController = new AddActivityController(addActivityView, model);
});