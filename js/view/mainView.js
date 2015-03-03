//ExampleView Object constructor
var MainView = function (container, model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
	 	
	this.dayActivitesTable = container.find("#dayActivitesTable");
	model.addObserver(this);
	
this.update = function(){
	document.getElementById("parkedActivity").addEventListener("dragstart", drag, false);
    document.getElementById("dayView").addEventListener("dragover", dragOver, false);
    document.getElementById("dayView").addEventListener("drop", drop, false);

    console.log('addEventListener DONE');
}

dragOver = function(e){
	e.preventDefault();
	console.log('dragOver');
}

drag = function(e){
	console.log('DragSTART');
	e.dataTransfer.setData("Text", e.target.id);
}

drop = function(e){
	//console.log('drop');
	e.preventDefault();
	 // var data=e.dataTransfer.getData("Text");
	 // e.target.appendChild(document.getElementById(data));
	console.log('dropDONE');	
}



	this.update();
}
 



