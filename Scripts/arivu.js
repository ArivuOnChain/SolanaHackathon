if (document.readyState !== 'loading') {
	setTimeout(function () { loop_ratings('.tlvjfw2'); }, 1000);
} else {
	document.addEventListener('DOMContentLoaded', function () {
		setTimeout(function () { loop_ratings('.tlvjfw2'); }, 1000);
	});
}

function loop_ratings(html_element_css){
	const htmlelement = document.querySelectorAll(html_element_css);
	for (var i = 0; i < htmlelement.length; i++) {
		var token_id = htmlelement[i].firstChild.innerHTML;
		htmlelement[i].firstChild.setAttribute("style", "padding-top: 7px;");
		var url = "https://webapp-uks-uat-hackathon.azurewebsites.net/api/arivuRisc/" + token_id;
		var data = httpGet(url);
		av_draw_risc(htmlelement[i], data);
	}
}

function av_draw_risc(html_element, data){
	var objData = JSON.parse(data);
	var divOuter = document.createElement("div");
	
	divOuter.setAttribute("style", "display: inline-flex; color: #000;");


	var discovery = objData.discovery;

	var divTrans = document.createElement("div");
	divTrans.innerText = 'RFI Score';
	divTrans.setAttribute("style", "padding-top: 7px;");
	var tr_Score = 0;
	if (objData.tr_Score != undefined) {
		tr_Score = Math.round(objData.tr_Score);
	}
	var imgEmoji = document.createElement("img");
	var style_score = 'width: 40px; height: 40px; margin-left: 15px; margin-right: 15px;';
	if (objData.tr_Score >= 0 && objData.tr_Score < 20) {
		imgEmoji.src = 'https://webapp-uks-uat-hackathon.azurewebsites.net/images/Weary-Face-Emoji.png';
	}
	else if (objData.tr_Score < 40) {
		imgEmoji.src = 'https://webapp-uks-uat-hackathon.azurewebsites.net/images/Worried-Face-Emoji.png';
	}
	else if (objData.tr_Score < 60) {
		imgEmoji.src = 'https://webapp-uks-uat-hackathon.azurewebsites.net/images/Slightly-Smiling-Face-Emoji.png';
	}
	else if (objData.tr_Score < 80) {
		imgEmoji.src = 'https://webapp-uks-uat-hackathon.azurewebsites.net/images/Smiling-Emoji-with-Smiling-Eyes.png';
	}
	else if (objData.tr_Score < 101) {
		imgEmoji.src = 'https://webapp-uks-uat-hackathon.azurewebsites.net/images/love-hearts-eyes-emoji.png';
	}
	imgEmoji.setAttribute("style", style_score);
	divOuter.appendChild(divTrans);
	divOuter.appendChild(imgEmoji);
	if (discovery == 'unknown') {
		var imgQ = document.createElement("img");
		imgQ.src = "https://webapp-uks-uat-hackathon.azurewebsites.net/images/warning.png";
		imgQ.setAttribute("style", "width: 45px; padding-left: 3px;");
		divOuter.appendChild(imgQ);
	}
	else {


		var click_code = 'window.open("' + objData.url + '")';
		var imgQ = document.createElement("img");
		imgQ.src = "https://webapp-uks-uat-hackathon.azurewebsites.net/images/combo-chart-empty.png";

		imgQ.onmouseover = () => { imgQ.src = 'https://webapp-uks-uat-hackathon.azurewebsites.net/images/combo-chart.png'; }
		imgQ.onmouseout = () => { imgQ.src = 'https://webapp-uks-uat-hackathon.azurewebsites.net/images/combo-chart-empty.png'; }
		imgQ.onclick = click_code;
		imgQ.title = "View Dashboard";
		imgQ.setAttribute("style", "width: 30px; padding-left: 3px;");


		var btn = document.createElement("btn");
		btn.class = 'btnQlik';

		btn.appendChild(imgQ);


		divOuter.appendChild(btn);
		btn.onclick = click_code;
		btn.setAttribute("data-url", objData.url);

		btn.addEventListener("click", function (event) {
			event.preventDefault();
			window.open(this.getAttribute("data-url"));
		}, false);
	}

	html_element.appendChild(divOuter); 
}


function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}