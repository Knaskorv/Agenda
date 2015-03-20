//ExampleView Object constructor
var MainView = function (container, model, view) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
	 	
	this.dayActivitesTable = container.find("#dayActivitesTable");
	
	this.addDayButton = container.find("#addDayButton");
	this.toScroll = container.find("#toScroll");
	this.delBtn = container.find("#delBtn");
	this.addActivityButton = container.find("#addActivityButton");
	this.parkedActivitesTable = container.find("#parkedActivitesTable");
	this.tableDivpark = container.find("#tableDivpark");
	this.dayView = container.find("#dayView");
	this.helpBtn = container.find("#helpBtn");

	var self = this; 
	model.addDay(8,15); //Add the first day at init
	
	//DRAG AND DROP
	var dndOldDay;
	var dndOldPosition;
	var dndNewDay;
	var dndNewPosition;
	var dragTr; 
	var dropped = false; 
	this.dragAndDrop = function(e){
			
			switch(e.type) {
    		case 'dragstart':
    			dropped = false; //To solve the "doubble drop" problem 
       		 	dndOldDay = e.data.dndInfo[0]; 
       		 	dndOldPosition = e.data.dndInfo[1]; 
       		 	dragTr = e.data.dndInfo[2]; 
				
       	 	break;
    		case 'drop':
    			
        		e.preventDefault();
        		
        		dndNewDay = e.data.dndInfo[0]; 
       		 	dndNewPosition = e.data.dndInfo[1]; 
       		 	if(!dropped){//To solve the "doubble drop" problem 
					model.moveActivity(dndOldDay, dndOldPosition, dndNewDay, dndNewPosition);
				}
				dropped = true; //To solve the "doubble drop" problem 
       	 	break;
       	 	case 'dragover':
        		e.preventDefault();
       	 	break;
       	 	case 'dragenter':
       	 		//_____Dnd Indicator_____//
       		 	if(e.data.dndInfo[2]){
       		 		if(dndOldDay == e.data.dndInfo[0] && dndOldPosition < e.data.dndInfo[1]){
						e.data.dndInfo[2].after(dragTr);
       		 		}
       		 		else{
       		 		dragTr = $(dragTr).css('height', 20)
       		 	 	e.data.dndInfo[2].before(dragTr);
       		 	 	}
       		 	}
       	 	break; 
       	 	case 'dragleave':
       	 	break; 
    		default:
    			console.log('Defult'); 
        		
		}
		
	}

	//_____DRAG AND DROP FOR THE PARKED TABLE_____//
	this.tableDivpark.on("dragover", {dndInfo:[null, 0]}, this.dragAndDrop);
	this.tableDivpark.on("drop", {dndInfo:[null, 0]}, this.dragAndDrop);

	//_____UPDATE TABLES_____//
	var hiddenTables = []; 
	this.updateTable = function(dnd){
		
		//_____DELETE CURRENT DATA_____//
		$('tr:not(:first)', this.parkedActivitesTable).remove();
		$('.activityTable:not(:first)', self.dayView).remove();
		$('.activity:not(:first)', self.dayActivitesTable).remove();
		
		//_____LOOP TROUGH THE ACTIVITY HOLDERS_____//
		for(var i = 0; i < model.days.length+1; i++){ //+1 for the parked activites
			//____Select data depending on holder type (day or parked)_____//
				
			if(!i){//Parked
				var dayIndex = null; 
				var activityHolder = self.parkedActivitesTable; 
				var activitesTarget = model.parkedActivities; 
			}
			else{//Day
				var dayIndex = i-1; 
				var activityHolder = self.dayActivitesTable.clone();
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
				activityHolder.on("dragover",  {dndInfo:[dayIndex, 0]}, this.dragAndDrop);		
				activityHolder.on("drop", 	   {dndInfo:[dayIndex, 0]}, this.dragAndDrop);
				//activityHolder.on("dragenter", {dndInfo:[dayIndex, 0]}, this.dragAndDrop);
				//activityHolder.on("dragleave", {dndInfo:[dayIndex, 0]}, this.dragAndDrop);
			

				//_____DELETE_THE_DAY____///
				$('#delBtn', activityHolder).on('click', {dayNr:dayIndex}, function(e){
					model.removeDay(e.data.dayNr); 
				});

				//_____TOGGLE_ACTIVITIES______//
				$('#toggleTable', activityHolder).on('click', {Tinfo:[$('tbody', activityHolder), dayIndex]}, function(e){
					var target = $(this); 
					tableToHide = e.data.Tinfo[0]; 
					dayNr = e.data.Tinfo[1]; 
					if($(this).data("hidden")){
						tableToHide.show("fast"); 
						target.data("hidden", false)
						hiddenTables[dayNr] = false; 
					}
					else{
						tableToHide.hide("fast"); 
						target.data("hidden", true)
						hiddenTables[dayNr] = true; 
					}
				});

				//______PRINT HEADER DATA FOR THE DAY_____//
				
				$('#dayId', activityHolder).text('Day '+(dayIndex+1));								//DAY NUMBER
				$('#startTimeDay', activityHolder).val(model.days[dayIndex].getStart());			//START TIME
				$('#endTimeDay', activityHolder).text(model.days[dayIndex].getEnd());				//END TIME
				$('#totalTimeDay', activityHolder).text(model.days[dayIndex].getTotalLength());		//TOTAL TIME
				
				//_____APPEND_____//
				activityHolder.show();
				container.find("#tableDivday").append(activityHolder);
				var currentTime = model.days[dayIndex].getStart(); 
			}

			
			var presentationTime = 0;
			var groupWorkTime = 0;
			var discussionTime = 0;
			var breakTime = 0; 
			var actColors = ["#6C6CFF","#85FF85","#FF5F5F","#FFFF66"];
			//_____LOOP TOOUGH EACH HOLDES ACTIVITES_____//
			for(var j = 0; j < activitesTarget.length; j++){
				
				//_____Copy template_____//
				var tr = $('tr.activity', self.parkedActivitesTable).clone().removeClass('activity');
				

				//_____Get data_____//
				var activityLength = 	  activitesTarget[j].getLength();
				var activityName = 		  activitesTarget[j].getName();
				var activityDescription = activitesTarget[j].getDescription();
				var activityType = 	 	  activitesTarget[j].getTypeId(); 
				if(i){
					var activityStartTime = currentTime; 
					var startTimeHnM = activityStartTime.split(":");
					var timeInMinutes = Number(startTimeHnM[0]) * 60  +Number(startTimeHnM[1])+Number(activityLength); 
					var activityEndTime = (Math.floor(timeInMinutes/60) < 10 ? '0'+Math.floor(timeInMinutes/60) : Math.floor(timeInMinutes/60))
										+':'+
										((timeInMinutes%60) < 10 ? '0'+(timeInMinutes%60) : (timeInMinutes%60)); 					
				}
				//_____Set the color_____//
				
				var color; 
				switch(activityType) {
   					case "Presentation":
        				color = actColors[0];
        				presentationTime +=Number(activityLength);  
        				break;
        			case "Group Work":
        				color = actColors[1];
        				groupWorkTime +=Number(activityLength); 
        				break; 
        			case "Discussion":
        				color = actColors[2];
        				discussionTime +=Number(activityLength);
        				break;
        			case "Break":
        				color = actColors[3]; 
        				breakTime += Number(activityLength);
        				break; 
        		}

        		//_____Set the data to the tr_____//
        		var timeToDisplay; 
        		if(!i){
        			timeToDisplay = activityLength+' min'
        		}
        		else{
        			timeToDisplay = activityStartTime+' - '+activityEndTime; 
        			
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
					var dndInfo = [dayIndex, j, tr];
					tr.on("dragstart", {dndInfo:dndInfo}, this.dragAndDrop);
					tr.on("dragover", {names:dndInfo}, this.dragAndDrop);
					tr.on("drop", {dndInfo:dndInfo}, this.dragAndDrop);
					tr.on("dragenter", {dndInfo:dndInfo}, this.dragAndDrop);
					tr.on("dragleave", {dndInfo:dndInfo}, this.dragAndDrop);
				

				//______Edit activity when doubleclicked______//
				var indexInfo=[i, j];
				tr.on("dblclick", {indexInfo:indexInfo}, view.editActivity);


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
				currentTime = activityEndTime;
				
			}	

			var tempactColors = actColors;
			if(i){
			//_____Break Time Indicator_____//
			var breakTimeRatio = ((breakTime/model.days[dayIndex].getTotalLength())*100) >= 0 ? Math.floor((breakTime/model.days[dayIndex].getTotalLength())*100) : 0; 
				var discussionTimeRatio = ((discussionTime/model.days[dayIndex].getTotalLength())*100) >= 0 ? Math.floor((discussionTime/model.days[dayIndex].getTotalLength())*100) : 0;
				var groupWorkTimeRatio = ((groupWorkTime/model.days[dayIndex].getTotalLength())*100) >= 0 ? Math.floor((groupWorkTime/model.days[dayIndex].getTotalLength())*100) : 0;
				var presentationTimeRatio = ((presentationTime/model.days[dayIndex].getTotalLength())*100) >= 0 ? Math.floor((presentationTime/model.days[dayIndex].getTotalLength())*100) : 0;
				var sumAll = 0;
				if((breakTimeRatio+discussionTimeRatio+groupWorkTimeRatio+presentationTimeRatio) <100 && (breakTimeRatio+discussionTimeRatio+groupWorkTimeRatio+presentationTimeRatio)>97){
					sumAll=100;
				}
				else{
					sumAll =(breakTimeRatio+discussionTimeRatio+groupWorkTimeRatio+presentationTimeRatio);
				}
				
				var proIndColorBreak = tempactColors[3];
				var proIndColorDisc = tempactColors[2];
				var proIndColorGW = tempactColors[1];
				var proIndColorPres = tempactColors[0];
				var proIndColor2 = "white"; 
				
				$('#proInd', activityHolder).text(breakTimeRatio+'% Break')
				.css('background', 'linear-gradient(to right,  '+proIndColorBreak+' 0%,'+proIndColorBreak+' '+breakTimeRatio+'%,' 
																+proIndColorDisc+' '+breakTimeRatio+'%,'+proIndColorDisc+' '+(breakTimeRatio+discussionTimeRatio)+'%,'
																+proIndColorGW+' '+(breakTimeRatio+discussionTimeRatio)+'%,'+proIndColorGW+' '+(breakTimeRatio+discussionTimeRatio+groupWorkTimeRatio)+'%,'
																+proIndColorPres+' '+(breakTimeRatio+discussionTimeRatio+groupWorkTimeRatio)+'%,'+ proIndColorPres+' '+ sumAll +'%,'      
																+proIndColor2+' '+sumAll+'%,'+proIndColor2+' 100%)');
			}
			
			//_____TOGGLE TBODY_____//
			if(hiddenTables[dayIndex]){
				$('tbody', activityHolder).hide(); 
			}
		}
	}

	this.update = function(){
		//console.log(dndFlag)
		this.updateTable(false); 
	}

	model.addObserver(this);
	model.notifyObservers(); 

}
 
