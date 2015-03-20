//ExampleView Object constructor
var MainViewController = function (view, model) {

		//_____Buttons_____//
		view.addDayButton.click(function(){
		model.addDay(8, 15);
	
		});

		view.addActivityButton.click(function(){
		document.getElementById("addActivityView").style.display = "block"; 
		document.getElementById("blackout").style.display = "block"; 
		});

		view.helpBtn.click(function(){
			document.getElementById("helpView").style.display = "block"; 
			document.getElementById("blackout").style.display = "block"; 

		});
		
		
		
}
 



