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

	var self = this; 
	model.addDay(8,15); 

	//_____CONTROLLER PARTS_____//
	this.addDayButton.click(function(){
		model.addDay(8, 15); 
	});

	var tempActivityType = ["Presentation","Group Work","Discussion","Break"]
	for(var f = 0; f<4; f++){
		var activity = new Activity(f, f*10, tempActivityType[f], f);
		model.addParkedActivity(activity, 0)
	}


	this.addActivityButton.click(function(){
		document.getElementById("addActivityView").style.display = "block"; 
		document.getElementById("blackout").style.display = "block"; 
	});

	this.addActivityButton.click(function(){
		document.getElementById("addActivityView").style.display = "block"; 
		document.getElementById("blackout").style.display = "block"; 
	});


	
	//DRAG AND DROP
	var dndOldDay;
	var dndOldPosition;
	var dndNewDay;
	var dndNewPosition;
	var dropActivity; 
	var dndFlag = false; 
	var dragTr; 
	var droped = false; 
	this.dragAndDrop = function(e){
			
			switch(e.type) {
    		case 'dragstart':
    			droped = false; //To solve the "doubble drop" problem 
       		 	dndOldDay = e.data.dndInfo[0]; 
       		 	dndOldPosition = e.data.dndInfo[1]; 
       		 	dragTr = e.data.dndInfo[2]; 
       		 	//$('.activityTime', dragTr).css('background-color', 'gray'); 
       		 	//$('.activityName', dragTr).css('background-color', 'gray'); 
       		 	//console.log('Dragstart - Day: '+dndOldDay+' Pos: '+dndOldPosition)
				
       	 	break;
    		case 'drop':
    			
        		e.preventDefault();
        		
        		dndNewDay = e.data.dndInfo[0]; 
       		 	dndNewPosition = e.data.dndInfo[1]; 
       		 	if(!droped){//To solve the "doubble drop" problem 
       		 		console.log('----------------------------------------------------')
       		 		console.log('Drop From - Day: '+dndOldDay+' Pos: '+dndOldPosition)
       		 		console.log('Drop To   - Day: '+dndNewDay+' Pos: '+dndNewPosition)
       		 		console.log('----------------------------------------------------')
					model.moveActivity(dndOldDay, dndOldPosition, dndNewDay, dndNewPosition);
				}
				droped = true; //To solve the "doubble drop" problem 
       	 	break;
       	 	case 'dragover':
     			
        		e.preventDefault();
        		
				
       	 	break;
       	 	case 'dragenter':
				
       	 		console.log('enter')
       	 		//dndNewDay = e.data.dndInfo[0]; 
       		 	//dndNewPosition = e.data.dndInfo[1];

       		 	if(e.data.dndInfo[2]){
       		 		dragTr = $(dragTr).css('height', 20)
       		 	 	e.data.dndInfo[2].before(dragTr);
       		 	 
       		 	}
       		 
       		 	
       	 	break; 
       	 	case 'dragleave':
       	 		
       	 		console.log('leave')
       	 		//dragTr.hide(); 
       	 		//this.days[dndNewDay]._removeActivity(dndNewPosition);
       	 		//self.notifyObservers(); 

       	 	break; 
    		default:
    			console.log('Defult'); 
        		
		}
		
	}

	//_____DRAG AND DROP FOR THE PARKED TABLE_____//
	this.tableDivpark.on("dragover", {dndInfo:[null, 0]}, this.dragAndDrop);
	this.tableDivpark.on("drop", {dndInfo:[null, 0]}, this.dragAndDrop);

	//_____UPDATE TABLES_____//
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
				
				if(!dnd){
				//_____DRAG AND DROP_____///
				activityHolder.on("dragover",  {dndInfo:[dayIndex, 0]}, this.dragAndDrop);		
				activityHolder.on("drop", 	   {dndInfo:[dayIndex, 0]}, this.dragAndDrop);
				//activityHolder.on("dragenter", {dndInfo:[dayIndex, 0]}, this.dragAndDrop);
				//activityHolder.on("dragleave", {dndInfo:[dayIndex, 0]}, this.dragAndDrop);
				//console.log('i: '+i+' dayindex: '+dayIndex)
				}
				

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

			
			var presentationTime = 0;
			var groupWorkTime = 0;
			var discussionTime = 0;
			var breakTime = 0; 
			//_____LOOP TOOUGH EACH HOLDES ACTIVITES_____//
			for(var j = 0; j < activitesTarget.length; j++){
				
				//_____Copy template_____//
				var tr = $('tr.activity', self.parkedActivitesTable).clone().removeClass('activity');
				

				//_____Get data_____//
				var activityLength = 	  activitesTarget[j].getLength();
				var activityName = 		  activitesTarget[j].getName();
				var activityDescription = activitesTarget[j].getDescription();
				var activityType = 	 	  activitesTarget[j].getTypeId(); 

				//_____Set the color_____//
				var actColors = ["#6C6CFF","#85FF85","#FF5F5F","#FFFF66"];
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
				
			}	

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
				
				console.log(breakTimeRatio);
				console.log(discussionTimeRatio);
				console.log(groupWorkTimeRatio);
				console.log(presentationTimeRatio);


				var proIndColorBreak = actColors[3];
				var proIndColorDisc = actColors[2];
				var proIndColorGW = actColors[1];
				var proIndColorPres = actColors[0];
				var proIndColor2 = "white"; 
				
				$('#proInd', activityHolder).text(breakTimeRatio+'% Break')
				.css('background', 'linear-gradient(to right,  '+proIndColorBreak+' 0%,'+proIndColorBreak+' '+breakTimeRatio+'%,' +proIndColorDisc+' '+breakTimeRatio+'%,'+proIndColorDisc+' '+(breakTimeRatio+discussionTimeRatio)+'%,'+proIndColorGW+' '+(breakTimeRatio+discussionTimeRatio)+'%,'+proIndColorGW+' '+(breakTimeRatio+discussionTimeRatio+groupWorkTimeRatio)+'%,'+proIndColorPres+' '+(breakTimeRatio+discussionTimeRatio+groupWorkTimeRatio)+'%,'+ proIndColorPres+' '+ sumAll +'%,'      +proIndColor2+' '+sumAll+'%,'+proIndColor2+' 100%)');
			}

		}
	}

	this.update = function(){
		//console.log(dndFlag)
		this.updateTable(dndFlag); 
	}

	model.addObserver(this);
	model.notifyObservers(); 

}
 



