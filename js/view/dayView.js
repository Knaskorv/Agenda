//ExampleView Object constructor
var DayView = function (container, model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
	 	
	
	this.dayActivitesTable = container.find("#dayActivitesTable");
	this.addDayButton = container.find("#addDayButton");

	//To update the time set for that day
	this.showTime = function(){
		console.log('I  showTime');
	this.startTimeDay= container.find('#startTimeDay');
	this.endTimeDay= container.find('#endTimeDay');
	this.totalTimeDay= container.find('#totalTimeDay');
		for(var i=0; i<model.days.length; i++){
			this.startTimeDay.attr("value",(model.days[i].getStart()));
			this.endTimeDay.html(model.days[i].getEnd());
			this.totalTimeDay.html(model.days[i].getTotalLength());
		}
	
	}


	 // skapa en dag som finns från start av program, nånstannsför anv attbörja
	this.addANewDay = function (){
		model.addDay(8,4);
		var dayTable = this.dayActivitesTable.clone(); 
		dayTable.on("dragover", {dndInfo:[model.days.length-1, 0]}, model.dragAndDrop);
		dayTable.on("drop", {dndInfo:[model.days.length-1, 0]}, model.dragAndDrop);
		this.showTime();
	};
	
	this.addANewDay();

	console.log('Langd på days lista: '+model.days.length);

	
	

	var self = this; 

	this.addDayButton.click(function(){
		model.addDay(9, 10); 
		console.log('I  addDayButton');
		self.showTime();
		var dayTable = self.dayActivitesTable.clone(); 
		dayTable.on("dragover", {dndInfo:[model.days.length-1, 0]}, model.dragAndDrop);
		dayTable.on("drop", {dndInfo:[model.days.length-1, 0]}, model.dragAndDrop);
		container.append(dayTable);
		console.log('Langd på days lista: '+model.days.length);
	});

console.log('Days: ' +model.days.length);

	model.addObserver(this);



	this.update = function(){
		console.log(model.days[0]);
		$('tr:not(:first)', this.dayActivitesTable).remove();
		
		console.log('langd');
		for(var i = 0; i < model.days[0]._activities.length; i++) {//fastnade här för days var tom
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
 



