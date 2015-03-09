89//ExampleView Object constructor
var DayView = function (container, model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
	 	
	this.dayActivitesTableHead = container.find("#dayActivitesTableHead");
	this.dayActivitesTable = container.find("#dayActivitesTable");
	this.addDayButton = container.find("#addDayButton");
	this.toScroll = container.find("#toScroll");

	//To update the time set for that day
	


	 // skapa en dag som finns från start av program, nånstannsför anv attbörja
	

	var self = this; 

	this.addDayButton.click(function(){
		model.addDay(8, 15); 
	});

	model.addDay(8,15); 


	model.addObserver(this);



	this.update = function(){
		$('.table:not(:first)', container).remove();
		$('.activity:not(:first)', self.dayActivitesTable).remove();
	

		for(var i = 0; i < model.days.length; i++){
			var day = self.dayActivitesTableHead.clone();

			var timeP = 0; 
			var timeG = 0; 
			var timeB = 0; 
			var timeD = 0; 

			var timeRatio = [0, 0, 0, 0]; //P G D B 
			
			day.id = 'id' +i; 
			$('#startTimeDay', day).data('dayNr', i);

			var tempModel = model;
		
			$('#startTimeDay', day).change(function() {

					
					var res = $(this).val().split(":");
  					tempModel.days[$(this).data('dayNr')].setStart(Number(res[0]), Number(res[1]));
  					tempModel.notifyObservers(); 

			});

			$('#startTimeDay', day).val(model.days[i].getStart());
			$('#endTimeDay', day).text(model.days[i].getEnd());
			$('#totalTimeDay', day).text(model.days[i].getTotalLength());
			


			day.on("dragover", {dndInfo:[i, 0]}, model.dragAndDrop);
			day.on("drop", {dndInfo:[i, 0]}, model.dragAndDrop);
			
			day.show();
			container.find("#tableDivday").append(day);
			
			//
			var time = model.days[i]._start; 
			for(var j = 0; j < model.days[i]._activities.length; j++){
				var tr = $('tr.activity', self.dayActivitesTable).clone();
				var length = model.days[i]._activities[j].getLength();
				var name = model.days[i]._activities[j].getName();
				var color; 

				switch(model.days[i]._activities[j].getTypeId()) {
   					case "Presentation":
        				color = '#6C6CFF'; 
        				timeRatio[0] += Number(length); 
        				break;

        			case "Group Work":
        				color = '#85FF85'; 
        				timeRatio[1] += Number(length);
        				break; 
        			case "Discussion":
        				color = '#FF5F5F'; 
        				timeRatio[2] += Number(length);
        				break;

        			case "Break":
        				color = '#FFFF66'; 
        				timeRatio[3] += Number(length);
        				break; 
        			
        		}



				// color = model.days[i]._activities[j].getTypeId() == "Presentation" ? '#6C6CFF' :
				// 		model.days[i]._activities[j].getTypeId() == "Group Work" ? '#85FF85':
				// 		model.days[i]._activities[j].getTypeId() == "Discussion" ? '#FF5F5F' :
				// 		model.days[i]._activities[j].getTypeId() == "Break" ? '#FFFF66' : 'black';

						
				// timeP = model.days[i]._activities[j].getTypeId() == "Presentation" ? Number(timeP)+Number(length) : timeP;  
				// timeG = model.days[i]._activities[j].getTypeId() == "Group Work" ? Number(timeG)+Number(length) : timeG; 
				// timeB = model.days[i]._activities[j].getTypeId() == "Break" ? Number(timeB)+Number(length) : timeB; 
				// timeD = model.days[i]._activities[j].getTypeId() == "Discussion" ? Number(timeD)+Number(length): timeD; 
				var dispTime = [Math.floor(Number(time)/60), time % 60, Math.floor((Number(time)+Number(length))/60), (Number(time)+Number(length)) % 60]; 

				for(var z = 0; z < dispTime.length; z++){
					dispTime[z] = dispTime[z] <= 9 ? '0'+dispTime[z] : dispTime[z]; 
				}



				$('#dayTime', tr).text(dispTime[0]+':'+dispTime[1]+' - '+dispTime[2]+':'+dispTime[3]);


				time = Number(time) + Number(length);
				$('#dayTime', tr).css('background-color', 'white');
				$('#dayTime', tr).css('width', '50%');
				$('#dayActivity', tr).text(name);
				$('#dayActivity', tr).css('background-color', color);
				$('#dayActivity', tr).css('width', '50%');
				tr.attr('draggable', true);

				tr.show(); 
				day.append(tr);
				var dndInfo = [i, j];
				tr.on("dragstart", {dndInfo:dndInfo}, model.dragAndDrop);
				tr.on("dragover", {names:dndInfo}, model.dragAndDrop);
				tr.on("drop", {dndInfo:dndInfo}, model.dragAndDrop);
				tr.on("dragenter", {dndInfo:dndInfo}, model.dragAndDrop);
			}

			for(var k = 0; k < timeRatio.length; k++){

				timeRatio[k] = ((timeRatio[k]/model.days[i].getTotalLength())*100) >= 0 ? Math.floor((timeRatio[k]/model.days[i].getTotalLength())*100) : 0;
			}

			$('#activitiesRatio', day).text('P'+timeRatio[0]+'-G'+timeRatio[1]+'-D'+timeRatio[2]+'-B'+timeRatio[3]);

			
		}

	}

	model.notifyObservers(); 

}
 



