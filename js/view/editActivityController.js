//ExampleView Object constructor
var EditActivityController = function (view, model) {
	
	// Changes the screen view and informs model of changes.
	view.editActivityDoneButton.click(function(){
		document.getElementById("editActivityView").style.display = "none"; 
		document.getElementById("blackout").style.display = "none"; 
		var indexInfo = view.indexInfo; 
	
		if(indexInfo[0] === 0){// Activity in parked
			var act = model.parkedActivities[indexInfo[1]];
			act.setName(view.activityName.val());
			act.setLength(view.activityLength.val());
			act.setTypeId(view.activityType.val());
			act.setDescription(view.activityDescription.val());

		}
		else{// Activity in days
			var act = model.days[indexInfo[0]-1]._activities[indexInfo[1]];
			act.setName(view.activityName.val());
			act.setLength(view.activityLength.val());
			act.setTypeId(view.activityType.val());
			act.setDescription(view.activityDescription.val());
		}


		model.notifyObservers();
	});

		
	view.editActivityRemoveButton.click(function(){
		document.getElementById("editActivityView").style.display = "none"; 
		document.getElementById("blackout").style.display = "none";
		var indexInfo = view.indexInfo; 

		if(indexInfo[0] === 0){// Activity in parked
			model.removeParkedActivity(indexInfo[1]); 

		}
		else{// Activity in days
			var act = model.days[indexInfo[0]-1]._removeActivity(indexInfo[1]);
			
		}

		model.notifyObservers();
	});
	
}	
	

 



