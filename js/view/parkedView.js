//ExampleView Object constructor
var ParkedView = function (container, model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
	 	
	this.addActivityButton = container.find("#addActivityButton");
	this.parkedActivitesTable = container.find("#parkedActivitesTable");

	this.addActivityButton.click(function(){
		document.getElementById("addActivityView").style.display = "block"; 
		document.getElementById("blackout").style.display = "block"; 
	});

	//this.addActivityButton.click(function(){
	//	document.getElementById("addActivityView").style.display = "block"; 
	//	document.getElementById("blackout").style.display = "block"; 
	//});
	
	model.addObserver(this);

	this.update = function(){

		$('tr:not(:first)', this.parkedActivitesTable).remove();
		

		for(var i = 0; i < model.parkedActivities.length; i++) {

			var tr = $('tr.activity', this.parkedActivitesTable).clone().removeClass('activity');

			var length = model.parkedActivities[i].getLength();
			var name = model.parkedActivities[i].getName();
			var color; 

			color = model.parkedActivities[i].getTypeId() == "Presentation" ? 'blue' :
					model.parkedActivities[i].getTypeId() == "Group Work" ? 'green':
					model.parkedActivities[i].getTypeId() == "Discussion" ? 'red' :
					model.parkedActivities[i].getTypeId() == "Break" ? 'yellow' : 'black';


			$('#parkedTime', tr).text(length);
			$('#parkedTime', tr).text(length).css('background-color', 'white');
			$('#parkedTime', tr).text(length).css('width', '20%');
			$('#parkedActivity', tr).text(name);
			$('#parkedActivity', tr).css('background-color', color);
			$('#parkedActivity', tr).css('width', '80%');
			tr.attr('draggable', true); //Det går inte att göra tr draggable så

			//JAG
			console.log('After tr.attr');
			tr.on("dragstart", null, null, function(e){console.log('Added');} );
			


			if (tr.addEventListener) {                    // For all major browsers, except IE 8 and earlier
   				tr.addEventListener("dragstart", function(e){console.log('Added');}, false);
		    } else if (tr.attachEvent) {                  // For IE 8 and earlier versions
    			x.attachEvent("dragstart", function(e){console.log('Added');}, false);
			}


			//tr.addEventListener("dragstart", function(e){console.log('Added');}, false);

		this.parkedActivitesTable.append(tr);

		console.log('Added Event');
		}
		}

}
 



