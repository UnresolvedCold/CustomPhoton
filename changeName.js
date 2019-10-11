//For hiding an element
id="page-course-view-topics"
var orig = ["11451021469_MATH F311","11451021470_MATH F312","11451021471_MATH F313",
			"1145_ECE_EEE_INSTR_F214","1145_ECE_EEE_INSTR_PHY_F212",
			"1145_ECE_EEE_INSTR_F211","1145_CS_ECE_EEE_INSTR_F215"];
var _new = ["Topology","ODE","Num Al","Electronic Devices","EMT",
			"Electrical Machines","Digital Design"];

window.onload = function()
{ 
	for(var i=0;i<orig.length;i++)
	{
		var iHTML = document.getElementById("inst4").innerHTML.split(orig[i]).join(_new[i]);
		document.getElementById("inst4").innerHTML=iHTML;
	} 
}
