//ExampleView Object constructor
var AddActivityView = function (container, model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)

	this.addActivity = container.find("#addActivity");	
	this.addActivityDoneButton = container.find("#addActivityDoneButton");
	this.addActivityCancelButton = container.find("#addActivityCancelButton");
	this.activityDescription = container.find("#activityDescription");
	this.activityName = container.find("#activityName");
	this.activityLength = container.find("#activityLength");
	this.activityType = container.find("#activityType");



	this.addActivityCancelButton.click(function(){
		document.getElementById("addActivityView").style.display = "none"; 
		document.getElementById("blackout").style.display = "none"; 
		
	});

	this.update = function(){
	if(this.activityName.val() && this.activityDescription.val() && this.activityLength.val() > 0 && this.activityType.val()){
           this.addActivityDoneButton.prop('disabled', false);
    }




	}

	this.resetFields = function(){
		this.activityDescription.val('');
		this.activityName.val('');
		this.activityLength.val('');
		this.activityType.val('');
	}	
}
 



