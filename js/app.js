$(function() {
	//We instantiate our model
	var model = new Model();
	
	//And create the needed controllers and views
	
	var editActivityView = new EditActivityView($("#editActivityView"), model);
	var mainView = new MainView($("#mainView"), model, editActivityView);
	var addActivityView = new AddActivityView($("#addActivityView"), model);
	var helpView = new HelpView($("#helpView"), model);
	

	var addActivityController = new AddActivityController(addActivityView, model);
	var editActivityController = new EditActivityController(editActivityView, model);
	var mainViewController = new MainViewController(mainView, model);
	var helpViewController = new HelpViewController(helpView, model);
});