//ExampleView Object constructor
var MainView = function (container, model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
	 	
	this.dayActivitesTable = container.find("#dayActivitesTable");
	this.dayActivitesTableHead = container.find("#dayActivitesTableHead");
	this.dayActivitesTable = container.find("#dayActivitesTable");
	this.addDayButton = container.find("#addDayButton");
	this.toScroll = container.find("#toScroll");
	this.delBtn = container.find("#delBtn");
	this.addActivityButton = container.find("#addActivityButton");
	this.parkedActivitesTable = container.find("#parkedActivitesTable");
	this.tableDivpark = container.find("#tableDivpark");
	this.dayView = container.find("#dayView");

	var self = this; 
	model.addDay(8,15); 

	//_____CONTROLLER PARTS_____//
	this.addDayButton.click(function(){
		model.addDay(8, 15); 
	});

	this.addActivityButton.click(function(){
		document.getElementById("addActivityView").style.display = "block"; 
		document.getElementById("blackout").style.display = "block"; 
	});

	this.addActivityButton.click(function(){
		document.getElementById("addActivityView").style.display = "block"; 
		document.getElementById("blackout").style.display = "block"; 
	});

	//_____DRAG AND DROP FOR THE PARKED TABLE_____//
	//this.parkedActivitesTable.on("dragover", {dndInfo:[null, 0]}, model.dragAndDrop);
	//this.parkedActivitesTable.on("drop", {dndInfo:[null, 0]}, model.dragAndDrop);
	
	//_____UPDATE TABLES_____//
	this.updateTable = function(dnd){
		
		//_____DELETE CURRENT DATA_____//
		$('tr:not(:first)', self.parkedActivitesTable).remove();
		$('.table:not(:first)', self.dayView).remove();
		$('.activity:not(:first)', self.dayActivitesTable).remove();

		//_____LOOP TROUGH THE ACTIVITY HOLDERS_____//
		for(var i = 0; i < model.days.length+1; i++){ //+1 for the parked activites
			//____Select data depending on holder type (day or parked)_____//
			if(!i){//Parked
				var dayIndex = null; 
				var activityHolder = this.parkedActivitesTable; 
				var activitesTarget = model.parkedActivities; 
			}
			else{//Day
				var dayIndex = i-1; 
				var activityHolder = self.dayActivitesTableHead.clone();
				var activitesTarget = model.days[dayIndex]._activities; 

				//____CHANGE_STARTTIME_OF_THE_DAY______//
				var tempModel = model;
				$('#startTimeDay', activityHolder).data('dayNr', dayIndex);
				$('#startTimeDay', activityHolder).change(function() {
					var res = $(this).val().split(":");
  					tempModel.days[$(this).data('dayNr')].setStart(Number(res[0]), Number(res[1]));
  					tempModel.notifyObservers(); 
				});
				
				//_____DRAG AND DROP_____///
				activityHolder.on("dragover",  {dndInfo:[dayIndex, 0]}, model.dragAndDrop);		
				activityHolder.on("drop", 	   {dndInfo:[dayIndex, 0]}, model.dragAndDrop);
				activityHolder.on("dragenter", {dndInfo:[dayIndex, 0]}, model.dragAndDrop);
				activityHolder.on("dragleave", {dndInfo:[dayIndex, 0]}, model.dragAndDrop);

				//_____DELETE_THE_DAY____///
				$('#delBtn', activityHolder).on('click', {dayNr:dayIndex}, function(e){
					model.removeDay(e.data.dayNr); 
				});

				//_____TOGGLE_ACTIVITIES______//
				$('#toggleTable', activityHolder).on('click', {tableToHide:$('tbody', activityHolder)}, function(e){
					e.data.tableToHide.toggle("fast"); 
				});

				//______PRINT HEADER DATA FOR THE DAY_____//
				$('#dayId', activityHolder).text('Day '+(dayIndex+1));								//DAY NUMBER
				$('#startTimeDay', activityHolder).val(model.days[dayIndex].getStart());			//START TIME
				$('#endTimeDay', activityHolder).text(model.days[dayIndex].getEnd());				//END TIME
				$('#totalTimeDay', activityHolder).text(model.days[dayIndex].getTotalLength());		//TOTAL TIME

				//_____APPEND_____//
				activityHolder.show();
				container.find("#tableDivday").append(activityHolder);
			}

			//console.log(dayIndex)
			
			//_____LOOP TOOUGH EACH HOLDES ACTIVITES_____//
			var breakTime = 0; 
			for(var j = 0; j < activitesTarget.length; j++){
				
				//_____Copy template_____//
				var tr = $('tr.activity', self.dayActivitesTable).clone();
				

				//_____Get data_____//
				var activityLength = 	  activitesTarget[j].getLength();
				var activityName = 		  activitesTarget[j].getName();
				var activityDescription = activitesTarget[j].getDescription();
				var activityType = 	 	  activitesTarget[j].getTypeId(); 

				//_____Set the color_____//
				var color; 
				switch(activityType) {
   					case "Presentation":
        				color = '#6C6CFF';  
        				break;
        			case "Group Work":
        				color = '#85FF85'; 
        				break; 
        			case "Discussion":
        				color = '#FF5F5F'; 
        				break;
        			case "Break":
        				color = '#FFFF66'; 
        				breakTime += Number(activityLength);
        				break; 
        		}

        		//_____Set the data to the tr_____//
        		var timeToDisplay; 
        		if(!i){
        			timeToDisplay = activityLength+' min'
        		}
        		else{
        			timeToDisplay = model.days[dayIndex].getStart()+' - '+model.days[dayIndex].getEnd(); 
        			//console.log('else  '+timeToDisplay)
        		}

        		var startTimeHeight = 30; 
        		$('.activityTime', tr).text(timeToDisplay)
				.css('background-color', 'white')
				.css('width', '50%')
				.css('height', (startTimeHeight + Number(activityLength)) >= 400 ? 400 : (startTimeHeight + Number(activityLength)));

        		$('.activityName', tr).text(activityName)
				.css('background-color', color)
				.css('width', '50%');
				

				//_____Drag and Drop_____//
				tr.attr('draggable', true);
				var dndInfo = [dayIndex, j];
				tr.on("dragstart", {dndInfo:dndInfo}, model.dragAndDrop);
				tr.on("dragover", {names:dndInfo}, model.dragAndDrop);
				tr.on("drop", {dndInfo:dndInfo}, model.dragAndDrop);
				tr.on("dragenter", {dndInfo:dndInfo}, model.dragAndDrop);

				//_____DESCRIPTION WHEN MOUSEOVER_____//
				tr.on("mouseenter mouseleave", {desc:activityDescription, holder:activityHolder}, function(e){

					if(e.type === "mouseenter" && e.shiftKey){
						$("#popup", container).show();
						$("#popup", container).text(e.data.desc)
						.css('top', e.pageY)
						.css('left', e.pageX);
						//.appendTo(e.data.holder); 
					}
					if(e.type === "mouseleave"){
						$("#popup", container).hide(); 
					}
				});

				tr.show(); 
				activityHolder.append(tr);
			}	

			if(i){
			//_____Break Time Indicator_____//
				var breakTimeRatio = ((breakTime/model.days[dayIndex].getTotalLength())*100) >= 0 ? Math.floor((breakTime/model.days[dayIndex].getTotalLength())*100) : 0; 
				
				var proIndColor1 = '#FFFF66'; 
				var proIndColor2 = 'white';
				$('#proInd', activityHolder).text(breakTimeRatio+'% Break')
				.css('background', 'linear-gradient(to right,  '+proIndColor1+' 0%,'+proIndColor1+' '+breakTimeRatio+'%,'+proIndColor2+' '+breakTimeRatio+'%,'+proIndColor2+' 100%)');
			}
		}
	}

	this.update = function(){
		this.updateTable(0); 
	}

	model.addObserver(this);
	model.notifyObservers(); 

}
 



