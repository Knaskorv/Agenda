//ExampleView Object constructor
var AddActivityController = function (view, model) {


	view.addActivityDoneButton.click(function(){
		document.getElementById("addActivityView").style.display = "none"; 
		document.getElementById("blackout").style.display = "none"; 
		
		var activity = new Activity(view.activityName.val(), view.activityLength.val(), view.activityType.val(), view.activityDescription.val());
		model.addParkedActivity(activity, 0)

		view.activityName.text(' '); 
		view.update();
		view.resetFields(); 
		model.notifyObservers();

	});
	
	

	view.activityName.change(function(){
		view.update();
	});
	view.activityLength.change(function(){
		view.update();
	});
	view.activityType.change(function(){
		view.update();
	});
	view.activityDescription.change(function(){
		view.update();
	});
	
	
	
}
 



