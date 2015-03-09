//ExampleView Object constructor
var ParkedView = function (container, model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
	 	
	this.addActivityButton = container.find("#addActivityButton");
	this.parkedActivitesTable = container.find("#parkedActivitesTable");
	this.tableDivpark = container.find("#tableDivpark");

	this.addActivityButton.click(function(){
		document.getElementById("addActivityView").style.display = "block"; 
		document.getElementById("blackout").style.display = "block"; 
	});

	this.addActivityButton.click(function(){
		document.getElementById("addActivityView").style.display = "block"; 
		document.getElementById("blackout").style.display = "block"; 
	});
	
	model.addObserver(this);
	var self = this; 

	this.tableDivpark.on("dragover", {dndInfo:[null, 0]}, model.dragAndDrop);
	this.tableDivpark.on("drop", {dndInfo:[null, 0]}, model.dragAndDrop);

	this.update = function(){

		$('tr:not(:first)', this.parkedActivitesTable).remove();
		
		

		for(var i = 0; i < model.parkedActivities.length; i++) {
			if(model.parkedActivities[i] != undefined){

			
			var tr = $('tr.activity', this.parkedActivitesTable).clone().removeClass('activity');
			//var tr = document.getElementById("test"); 
			console.log(model.parkedActivities);
			var length = model.parkedActivities[i].getLength();
			var name = model.parkedActivities[i].getName();
			var color; 

			color = model.parkedActivities[i].getTypeId() == "Presentation" ? '#6C6CFF' :
					model.parkedActivities[i].getTypeId() == "Group Work" ? '#85FF85':
					model.parkedActivities[i].getTypeId() == "Discussion" ? '#FF5F5F' :
					model.parkedActivities[i].getTypeId() == "Break" ? '#FFFF66' 
														   : 'black';


			$('#parkedTime', tr).text(length);
			$('#parkedTime', tr).text(length).css('background-color', 'white');
			$('#parkedTime', tr).text(length).css('width', '20%');
			$('#parkedActivity', tr).text(name);
			$('#parkedActivity', tr).css('background-color', color);
			$('#parkedActivity', tr).css('width', '80%');
			tr.attr('draggable', true);

			this.parkedActivitesTable.append(tr);
			var dndInfo = [null, i];
			tr.on("dragstart", {dndInfo:dndInfo}, model.dragAndDrop);
			tr.on("dragover", {names:dndInfo}, model.dragAndDrop);
			tr.on("drop", {dndInfo:dndInfo}, model.dragAndDrop);
			}
		}
		
	}

		

}
 



