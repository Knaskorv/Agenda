//ExampleView Object constructor
var MainView = function (container, model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
	 	
	this.dayActivitesTable = container.find("#dayActivitesTable");
	
	
window.addEventListener('load',function(){
	document.getElementById("parkedActivity").addEventListener("dragstart", click_handler2, false);
    document.getElementById("dayView").addEventListener("dragenter", click_handler1, false);
    document.getElementById("dayView").addEventListener("drop", click_handler3, false);
}, false);

click_handler1 = function(e){
	e.preventDefault();
	console.log('dragenter');
}

click_handler2 = function(e){
	
	console.log('DragSTART');
	e.dataTransfer.setData("Text", 'DROPME');
}
click_handler3 = function(e){
	e.preventDefault();
	console.log('drop');
	dayView.innerHTML = e.dataTransfer.getData('Text');
}


	
}
 



