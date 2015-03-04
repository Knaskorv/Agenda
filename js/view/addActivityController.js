//ExampleView Object constructor
var AddActivityController = function (view, model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)


	

	view.addActivityDoneButton.click(function(){
		document.getElementById("addActivityView").style.display = "none"; 
		document.getElementById("blackout").style.display = "none"; 
		//console.log(view.activityName.val()+' '+view.activityLength.val()+' '+view.activityType.val()+' '+view.activityDescription.val());
		var activity = new Activity(view.activityName.val(), view.activityLength.val(), view.activityType.val(), view.activityDescription.val());
		model.addParkedActivity(activity, 0)

		view.activityName.text(' '); 
		view.update();
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
 



