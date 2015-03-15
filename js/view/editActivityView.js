//ExampleView Object constructor
var EditActivityView = function (container, model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)

	this.editActivity = container.find("#editActivityView");	
	this.editActivityDoneButton = container.find("#editActivityDoneButton");
	this.editActivityRemoveButton = container.find("#editActivityRemoveButton");
	this.activityDescription = container.find("#editActivityDescription");
	this.activityName = container.find("#editActivityName");
	this.activityLength = container.find("#editActivityLength");
	this.activityType = container.find("#editActivityType");

	this.indexInfo=[];

	var self=this;

	// Fetches activity info to be edited.
	this.editActivity = function(e){
		document.getElementById("editActivityView").style.display="block";
		document.getElementById("blackout").style.display = "block";

		self.indexInfo = e.data.indexInfo;

		if(e.data.indexInfo[0] === 0){// In parkedView
			var act = model.parkedActivities[e.data.indexInfo[1]];

			self.activityName.val(act.getName());
			self.activityLength.val(act.getLength());
			self.activityType.val(act.getTypeId());
			self.activityDescription.val(act.getDescription());
		}
		else{ // In dayView
			var act = model.days[e.data.indexInfo[0]-1]._activities[e.data.indexInfo[1]];

			self.activityName.val(act.getName());
			self.activityLength.val(act.getLength());
			self.activityType.val(act.getTypeId());
			self.activityDescription.val(act.getDescription());
		}
	};

	

}




