window.onload = function() {

	//For hiding an element
	var id = "expandable_branch_";
	var attribute = "visibility:hidden; display:none;";
	var idList = ["1","2","3"]

	for(var i=0;i<idList.length;i++)
	{
		document.getElementById(id+idList[i]).setAttribute("style",attribute);
	} 
	var yo = document.getElementsByTagName('li');
	
	for(var i=0;i<yo.length;i++)
	{
		var str = yo[i].innerHTML;
		var n = str.includes("My courses");
		if(n)
		{
			yo[i].click();
		}
		
	}

  };
