$(function() {
	//We instantiate our model
	var model = new Model();
	
	//And create the needed controllers and views
	
	var mainView = new MainView($("#mainView"), model);
	var addActivityView = new AddActivityView($("#addActivityView"), model);
	var parkedView = new ParkedView($("#parkedView"), model);
	var dayView = new DayView($("#dayView"), model);

	var addActivityController = new AddActivityController(addActivityView, model);
});