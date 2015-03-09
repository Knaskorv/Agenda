89//ExampleView Object constructor
var DayView = function (container, model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
	 	
	
	this.dayActivitesTable = container.find("#dayActivitesTable");
	this.addDayButton = container.find("#addDayButton");

	//To update the time set for that day
	


	 // skapa en dag som finns från start av program, nånstannsför anv attbörja
	

	var self = this; 

	this.addDayButton.click(function(){
		model.addDay(9, 10); 
	});

	model.addDay(9,10); 


	model.addObserver(this);



	this.update = function(){
		console.log('UPDATE')
		$('.table:not(:first)', container).remove();

	

		for(var i = 0; i < model.days.length; i++){
			var day = self.dayActivitesTable.clone();
			
			day.id = 'id' +i; 
			$('#startTimeDay', day).data('dayNr', i);

			var tempModel = model;
		
			$('#startTimeDay', day).change(function() {

					console.log($(this).data('dayNr'));
  					tempModel.days[$(this).data('dayNr')].setStart($(this).val(), 10);
  					tempModel.notifyObservers(); 


			});

			$('#startTimeDay', day).val(model.days[i].getStart());
			$('#endTimeDay', day).text(model.days[i].getStart());

			day.on("dragover", {dndInfo:[model.days.length-1, 0]}, model.dragAndDrop);
			day.on("drop", {dndInfo:[model.days.length-1, 0]}, model.dragAndDrop);
			
			day.show();
			container.append(day); 
			
			//
			console.log(day.id)
		
			$('tr:not(:first)', container.getElementById(day.id)).remove();
		
			for(var j = 0; j < model.days[i]._activities.length; j++){
				var tr = $('tr.activity', day).clone().removeClass('activity');
				console.log(tr)
				//var tr = document.getElementById("test"); 
				console.log(i+" "+j);
				var length = model.days[i]._activities[j].getLength();
				var name = model.days[i]._activities[j].getName();
				var color; 

				color = model.days[i]._activities[j].getTypeId() == "Presentation" ? 'blue' :
						model.days[i]._activities[j].getTypeId() == "Group Work" ? 'green':
						model.days[i]._activities[j].getTypeId() == "Discussion" ? 'red' :
						model.days[i]._activities[j].getTypeId() == "Break" ? 'yellow' : 'black';


				$('#dayTime', tr).text(length);
				$('#dayTime', tr).text(length).css('background-color', 'white');
				$('#dayTime', tr).text(length).css('width', '20%');
				$('#dayActivity', tr).text(name);
				$('#dayActivity', tr).css('background-color', color);
				$('#dayActivity', tr).css('width', '80%');
				tr.attr('draggable', true);
			
				tr.show(); 
				this.dayActivitesTable.append(tr);
				var dndInfo = [0, j];
				tr.on("dragstart", {dndInfo:dndInfo}, model.dragAndDrop);
				tr.on("dragover", {names:dndInfo}, model.dragAndDrop);
				tr.on("drop", {dndInfo:dndInfo}, model.dragAndDrop);
			}
		}

		// console.log(model.days[0]);
		// $('tr:not(:first)', this.dayActivitesTable).remove();
		
		// console.log('langd');
		// for(var i = 0; i < model.days[0]._activities.length; i++) {//fastnade här för days var tom
		// 	console.log('HIT2');
		// 	var tr = $('tr.activity', this.dayActivitesTable).clone().removeClass('activity');
		// 	//var tr = document.getElementById("test"); 

		// 	var length = model.days[0]._activities[i].getLength();
		// 	var name = model.days[0]._activities[i].getName();
		// 	var color; 

		// 	color = model.days[0]._activities[i].getTypeId() == "Presentation" ? 'blue' :
		// 			model.days[0]._activities[i].getTypeId() == "Group Work" ? 'green':
		// 			model.days[0]._activities[i].getTypeId() == "Discussion" ? 'red' :
		// 			model.days[0]._activities[i].getTypeId() == "Break" ? 'yellow' : 'black';


		// 	$('#dayTime', tr).text(length);
		// 	$('#dayTime', tr).text(length).css('background-color', 'white');
		// 	$('#dayTime', tr).text(length).css('width', '20%');
		// 	$('#dayActivity', tr).text(name);
		// 	$('#dayActivity', tr).css('background-color', color);
		// 	$('#dayActivity', tr).css('width', '80%');
		// 	tr.attr('draggable', true);
			
		// this.dayActivitesTable.append(tr);
		// var dndInfo = [0, i];
		// tr.on("dragstart", {dndInfo:dndInfo}, model.dragAndDrop);
		// tr.on("dragover", {names:dndInfo}, model.dragAndDrop);
		// tr.on("drop", {dndInfo:dndInfo}, model.dragAndDrop);
		
		// }
	}

	model.notifyObservers(); 

}
 



