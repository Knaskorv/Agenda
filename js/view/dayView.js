//ExampleView Object constructor
var DayView = function (container, model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
	 	
	
	this.dayActivitesTable = container.find("#dayActivitesTable");
	
	model.addObserver(this);



	this.update = function(){
		
		// $('tr:not(:first)', this.dayActivitesTable).remove();
		

		// for(var i = 0; i < model.parkedActivities.length; i++) {

		// 	var tr = $('tr.activity', this.dayActivitesTable).clone().removeClass('activity');

		// 	var length = model.parkedActivities[i].getLength();
		// 	var name = model.parkedActivities[i].getName();
		// 	var color; 

		// 	color = model.parkedActivities[i].getTypeId() == "Presentation" ? 'blue' :
		// 			model.parkedActivities[i].getTypeId() == "Group Work" ? 'green':
		// 			model.parkedActivities[i].getTypeId() == "Discussion" ? 'red' :
		// 			model.parkedActivities[i].getTypeId() == "Break" ? 'yellow' : 'black';


		// 	$('#dayTime', tr).text(length);
		// 	$('#dayTime', tr).text(length).css('background-color', 'white');
		// 	$('#dayTime', tr).text(length).css('width', '20%');
		// 	$('#dayActivity', tr).text(name);
		// 	$('#dayActivity', tr).css('background-color', color);
		// 	$('#dayActivity', tr).css('width', '80%');

		// 	this.dayActivitesTable.append(tr);
		// 	}
		}

}
 



