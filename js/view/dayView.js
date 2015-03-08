//ExampleView Object constructor
var DayView = function (container, model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
	 	
	
	this.dayActivitesTable = container.find("#dayActivitesTable");
	this.addDayButton = container.find("#addDayButton");

	//To update the time set for that day
	this.showTime = function(){
		console.log('I  showTime');
	
		for(var i=0; i<model.days.length; i++){
			console.log('kolla dayActivitesTable id '+ this.dayActivitesTable.id);
			this.startTimeDay= container.find('#startTimeDay'+i);
			console.log('kolla startTimeDay id '+ container.find('#startTimeDay'+i).id);
	this.endTimeDay= container.find('#endTimeDay'+i);
	this.totalTimeDay= container.find('#totalTimeDay'+i);
		console.log('hämtad totalTimeDay  '+'#totalTimeDay'+i);

			this.startTimeDay.attr("value",(model.days[i].getStart()));
			console.log('Startid '+model.days[i].getStart());
			this.endTimeDay.html(model.days[i].getEnd());
			console.log('Endtid '+model.days[i].getEnd());
			this.totalTimeDay.html(model.days[i].getTotalLength());
		}
	
	}


	 // skapa en dag som finns från start av program, nånstannsför anv attbörja
	this.addANewDay = function (){
		model.addDay(8,10);
		var dayTable = this.dayActivitesTable.clone(); 
		console.log('Table ID  '+ dayTable.id);
		dayTable.on("dragover", {dndInfo:[model.days.length-1, 0]}, model.dragAndDrop);
		dayTable.on("drop", {dndInfo:[model.days.length-1, 0]}, model.dragAndDrop);
		this.showTime(); 
	};
	
	this.addANewDay();

	console.log('Langd på days lista: '+model.days.length);

	
	

	var self = this; 

	this.addDayButton.click(function(){
		model.addDay(9, 10); 
		console.log('I  addDayButton'+(model.days.length-1)); 
		var dayTable = self.dayActivitesTable.clone(true, true); //jQuery.extend(true,{}, dayActivitesTable);
		//dayTable.style.float ='left'; // klagar och ger att det inte går att sätta detta på undefined
		//Dessa går att göra.
		dayTable.id = 'dayActivitesTable'+(model.days.length-1);
		console.log('id dayTable  '+ dayTable.id); // utan den ovan och med clone ger denna undefined på id. med jQuery.extend(true,{}, dayActivitesTable); hittas id men att ta find lr on på den ger undefinedis not a function,tas self.dayActivities blir id undefined men allt går igenom
		//Denna går ej för dayTable är undefined
		//dayTable.innerHTML = dayTable.innerHTML.replace(/0"/g,(model.days.length-1)+'"');


		// gå in i self o klona input o det. Appenda till dayTable. För
		// Den har nu en pekare till originalets objekt därav inget eget



		// set new id
		//Denna sätter nytt id på starttime, men det verkar inte 
		//nå in i dayTablekopian för det går ej att hämta det 
		//elementets id. I show time får alla den 1a dagens tid dvs alla 
		// tabeller har samma id på de inre elementen, de sätts ej om här
		//dayTable.find('#startTimeDay0').id = 'startTimeDay'+(model.days.length-1);
		var startTime = dayTable.find('#startTimeDay0');
		console.log('prints startTimeDay before id switch '+ dayTable.find('#startTimeDay0').id);
		startTime.id = 'startTimeDay'+(model.days.length-1);
		console.log('id startTimeDay  '+ startTime.id);
		console.log('prints startTimeDay  '+ dayTable.find('#startTimeDay1').id); //startTime får rätt id, men har undefined class. Dvs den erkar inte va det elementet jag tycker det ska för den hittar det id jag satt men inte klassen som dess original ska ha

		var endTime = dayTable.find('#endTimeDay0');
		endTime.id = 'endTimeDay'+(model.days.length-1);
		console.log('id endTimeDay  '+ endTime.id);
		console.log('prints endTimeDay  '+ dayTable.find('#endTimeDay1').id); 
		
		dayTable.on("dragover", {dndInfo:[model.days.length-1, 0]}, model.dragAndDrop);
		dayTable.on("drop", {dndInfo:[model.days.length-1, 0]}, model.dragAndDrop);
		container.append(dayTable);
		self.showTime();
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
 



