//ExampleView Object constructor
var DayView = function (container, model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
	 	
	
	this.dayActivitesTable = container.find("#dayActivitesTable");
	this.addDayButton = container.find("#addDayButton");

	var self = this; 

	this.addDayButton.click(function(){
		model.addDay(9, 10); 
		var dayTable = self.dayActivitesTable.clone(); 
		dayTable.on("dragover", {dndInfo:[model.days.length-1, 0]}, model.dragAndDrop);
		dayTable.on("drop", {dndInfo:[model.days.length-1, 0]}, model.dragAndDrop);
		container.append(dayTable);
	});

	model.addObserver(this);



	this.update = function(){
		console.log(model.days[0]);
		$('tr:not(:first)', this.dayActivitesTable).remove();
		
		console.log('langd');
		for(var i = 0; i < model.days[0]._activities.length; i++) {
			console.log('HIT2');
			var tr = $('tr.activity', this.dayActivitesTable).clone().removeClass('activity');
			//var tr = document.getElementById("test"); 
			var length = model.days[0]._activities[i].getLength();
			var name = model.days[0]._activities[i].getName();
			var color; 

			color = model.days[0]._activities[i].getTypeId() == "Presentation" ? 'blue' :
					model.days[0]._activities[i].getTypeId() == "Group Work" ? 'green':
					model.days[0]._activities[i].getTypeId() == "Discussion" ? 'red' :
					model.days[0]._activities[i].getTypeId() == "Break" ? 'yellow' : 'black';


			$('#dayTime', tr).text(length);
			$('#dayTime', tr).text(length).css('background-color', 'white');
			$('#dayTime', tr).text(length).css('width', '20%');
			$('#dayActivity', tr).text(name);
			$('#dayActivity', tr).css('background-color', color);
			$('#dayActivity', tr).css('width', '80%');
			tr.attr('draggable', true);
			
		this.dayActivitesTable.append(tr);
		var dndInfo = [0, i];
		tr.on("dragstart", {dndInfo:dndInfo}, model.dragAndDrop);
		tr.on("dragover", {names:dndInfo}, model.dragAndDrop);
		tr.on("drop", {dndInfo:dndInfo}, model.dragAndDrop);
		
		}
	}

}
 



