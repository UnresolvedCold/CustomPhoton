var head = document.getElementsByTagName("head")[0];

//
//Main Style Sheet
//

var hiddenFoldersId = ["0","1","2"]; //JSON.parse(localStorage.getItem("hiddenFolders"))

var activeElement = document.getElementsByClassName("type_course depth_3 contains_branch current_branch");
var allOtherElements = document.getElementsByClassName("type_course depth_3 collapsed contains_branch");
var selectedElement = document.getElementsByClassName("type_course depth_3 contains_branch");
var nonSelectedElements = document.getElementsByClassName("type_course depth_3 collapsed");

var folderIcon = browser.runtime.getURL("icons/folder.png");
var pdfIcon = browser.runtime.getURL("icons/pdf.png");
var docIcon = browser.runtime.getURL("icons/doc.png");
var backIcon = browser.runtime.getURL("icons/back.png");
var forwardIcon = browser.runtime.getURL("icons/forward.png");

var headLine=''; 
var title = document.getElementsByClassName("headermain");
var doxTit = document.getElementsByTagName("title")[0].innerHTML;

if(doxTit.split("News").length<2)
{
    if(title.length>0)
    {
        headLine = title[0].innerHTML
    }
    else
    {
        headLine = document.getElementsByTagName("title")[0].innerHTML;
    }

    //HTML Content
    var startInsertHTML = `
    <body class="container">
    <div id="Tools" class="split left"></div>
    <div id="Folders" class="split right">
    <p class="alwaysOnTop">
        <p class="button_left">
            <a href="javascript: history.go(-1);">
                <img src="${backIcon}" height="24" width = "24"/>
            </a>
        </p>   
        <p class="button_right">
        <a href="javascript: history.go(1);">
            <img src="${forwardIcon}" height="24" width = "24"/>
        </a>
    </p>
        <p id="TopicHeadLine">${headLine}</p>
    </p>`;

    var endInsertHTML = ` </div></body>`;
    var innerContent =``;
    //alert(activeElement.length.toString()+" "+selectedElement.length.toString()+" "+allOtherElements.length.toString()+" "+nonSelectedElements.length.toString());

    if(activeElement.length+selectedElement.length!==0)
    {
        var iHTML = document.head.innerHTML;
        var oHTML = iHTML.split('<link rel="stylesheet" type="text/css" href="http://photon.bits-goa.ac.in/lms/theme/styles.php?theme=bits_theme&amp;rev=1557730337&amp;type=all">').join();
        document.head.innerHTML = oHTML;

        //<link rel="stylesheet" href="styles.css">
        var loc = browser.runtime.getURL("style.css");
        var styl = document.createElement("link");
        styl.setAttribute("rel","stylesheet");
        styl.setAttribute("href",loc);
        styl.setAttribute("id","SchwiftyCold");
        head.appendChild(styl); 

        loc = browser.runtime.getURL("CustomInterface/css.css");
        styl = document.createElement("link");
        styl.setAttribute("rel","stylesheet");
        styl.setAttribute("href",loc);
        styl.setAttribute("id","SchwiftyCold");
        head.appendChild(styl); 



        if(activeElement.length>0)
        {
            var temp = document.body.innerHTML;
            var count = (temp.match(/id="section/g) || []).length;
            if(count>1)
            {
                var sections=temp.split('id="section');

                for(var i=1;i<count;i++)
                {

                    var section0 = sections[i];
                    //find title
                /* var h3 = section0.split("<h3>");
                    var title="";
                    if(h3.length>0)title = h3[1].split("</h3>")[0];
                    alert(title);*/

                    //find content
                    var a = section0.split("<a");
                    var href='';
                    if(a.length>1)
                    {
                        for(var j=1;j<a.length;j++)
                        {
                            href = a[j].split('href="')[1].split('"')[0];
                            var name = a[j].split('href="')[1].split('</a>')[0].split('instancename">')[1].split("<")[0];
                            var image = a[j].split('href="')[1].split('</a>')[0].split('<img src="')[1].split('"')[0];
                            
                            //Modify the image
                            var re = /pdf/i; // i flag for case-insensitive
                            var pos = image.search(re);
                            if(pos>0){image = pdfIcon;}
                            else
                            {
                                re=/document/i;
                                pos = image.search(re);
                                if(pos>0){image = docIcon}
                                else
                                {
                                    image = folderIcon;
                                }
                            }

                            //Modify the page
                            innerContent+=
                            `
                            <a href="${href}" class="_contentOfFolder">
                            <div class="my-fancy-container">
                                <span class='icon-file-text my-icon'>
                                    <img class="icon" src="${image}"/>
                                </span>
                                <span class="my-text">${name}</span>
                            </div>
                            </a>`;
                        }
                    }
                }
            }

        }
        else
        {
            if(selectedElement.length-nonSelectedElements.length!=0)
            {
                //if it was a pdf window
                var pdfWindow = document.body.innerHTML.split('<div class="resourcecontent resourcepdf">');
                if(pdfWindow.length>1)
                {
                    var content = pdfWindow[1].split("</div>")[0];
                    content = content.split('data="')[1].split('"')[0];
                    innerContent+='<iframe src="'+content+'" style="width=100%; height=100%;" height="100%" width="100%">';
                }

                //if folder tree
                var folderTree = document.getElementsByClassName("filemanager");
            // alert("Folder Tree = "+folderTree.length.toString());
                if(folderTree.length>0)
                {
                    var folders = folderTree[0].innerHTML;
                    var a = folders.split('<a href="');
                    for(var item=1;item<a.length;item++)
                    {

                        var href = a[item].split('"')[0];
                        var name = a[item].split('<span class="fp-filename">')[1].split('</span>')[0];
                        var image = a[item].split('src="')[1].split('"')[0];

                        //Modify the image
                        var re = /pdf/i; // i flag for case-insensitive
                        var pos = image.search(re);
                        if(pos>0){image = pdfIcon;}
                        else
                        {
                            re=/document/i;
                            pos = image.search(re);
                            if(pos>0){image = docIcon}
                            else
                            {
                                image = folderIcon;
                            }
                        }

                        innerContent+=
                        `
                        <a href="${href}" class="_contentOfFolder">
                        <div class="my-fancy-container">
                            <span class='icon-file-text my-icon'>
                                <img class="icon" src="${image}"/>
                            </span>
                            <span class="my-text">${name}</span>
                        </div>
                        </a>`;
                    }
                }
            }
            else
            {

                allOtherElements = document.getElementsByClassName("type_course depth_3 collapsed contains_branch");
                //Home page when no tabs are open
                for(var i=0;i<allOtherElements.length;i++)
                {
                    var href = allOtherElements[i].innerHTML.split('href="')[1].split('"')[0];
                    var name = allOtherElements[i].innerHTML.split('href="')[1].split('</a>')[0].split('>')[1];

                    var id = "SchwiftyMod_Root_Folder_"+i;

                    if(!isHidden(id))
                    {
                        name = getChangedName(id,name);
                        
                        innerContent+=
                        `
                        <a id=${id} href="${href}" class="_contentOfFolder">
                        <div class="my-fancy-container">
                            <span class='icon-file-text my-icon'>
                                <img class="icon" src="${folderIcon}"/>
                            </span>
                            <span class="my-text">${name}</span>
                        </div>
                        </a>`;
                    }
                    else
                    {
                        innerContent+=
                        `
                        <a id=${id} href="${href}" class="inv">
                        <div class="my-fancy-container">
                            <span class='icon-file-text my-icon'>
                                <img class="icon" src="${folderIcon}"/>
                            </span>
                            <span class="my-text">${name}</span>
                        </div>
                        </a>`;
                    }
                }
            }
        }
        var fullHtml = startInsertHTML+innerContent+endInsertHTML;
        var _body = document.getElementsByTagName("body")[0];
        _body.innerHTML=fullHtml;
    }
}

//Functions

function isHidden(id) {  
    var cookie = getCookie(id);
    
    if(cookie!=null&&cookie.split("_")[0]=="hidden")
    {
        return true;
    }
    return false;
}

function getChangedName(id,name)
{
    var cookie = getCookie(id);
    
    if(cookie!=null&&cookie.split("_").length>1)
    {
        return cookie.split("_")[1];
    }
    return name;
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