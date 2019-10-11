//Menu
var defaultMenu = `
<div id="SchwiftyContextMenu_Default" class="context-menu">
    <ul>
        <li id="_PageRefresh">Refresh</li>
        <li id="_RemoveHidden">Make all visible</li>
    </ul>
</div>`;

var folderMenu = `
<div id="SchwiftyContextMenu_Folder" class="context-menu">
    <ul>
        <li id="_Hide">Hide</li>
    </ul>
</div>
`;

document.body.innerHTML = document.body.innerHTML+defaultMenu+folderMenu;

var menu = document.getElementById("SchwiftyContextMenu_Default");
var folderMenu = document.getElementById("SchwiftyContextMenu_Folder");


var currentActiveElement='';

document.getElementById("Folders").addEventListener("contextmenu", e => {
    e.preventDefault();
    console.log(e);
    menu.style.top = e.clientY+'px';
    menu.style.left = e.clientX+'px';
    menu.style.display='block';
    folderMenu.style.display='none';
},true);

window.addEventListener("click",e=>
{
    menu.style.display='none';
})

document.getElementById("_PageRefresh").addEventListener("click",e=>
{
    window.location.reload(true);
})

document.getElementById("_RemoveHidden").addEventListener("click",e=>
{
    for(var i=0;i<20;i++)
    {
        var id = "SchwiftyMod_Root_Folder_"+i;
        var cookie = getCookie(id);
        
        if(cookie!=null&&cookie.split("_")[0]=="hidden")
        {
            var l = cookie.split("_");
            if(l.length>1)
            {   
                setCookie(id,"visible_"+l[1],-1);
            }
            else
            setCookie(id,"visible_",-1);
        }
    }

    window.location.reload(true);
});

document.getElementById("_Hide").addEventListener("click",e=>
{
    //window.location.reload(true);
    if(currentActiveElement.split("_").length>=2)
    {
        //alert(currentActiveElement);
        setCookie(currentActiveElement,"hidden_",1800);
       // alert(_id);
    }

    menu.style.display='none';
    window.location.reload(true);
});

//Assign Folder Menu
var temp = document.body.innerHTML;
var count = (temp.match(/SchwiftyMod_Root_Folder/g) || []).length;
for(var i = 0 ; i<count;i++)
{
    document.getElementById(`SchwiftyMod_Root_Folder_${i}`).addEventListener("contextmenu", e => {
        e.preventDefault();
        folderMenu.style.top = e.clientY+'px';
        folderMenu.style.left = e.clientX+'px';
        folderMenu.style.display='block';
        menu.style.display='none';
        currentActiveElement =e.currentTarget.id;
    },true);
}


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}