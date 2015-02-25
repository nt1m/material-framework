"use strict";
function init() {
	var sm = document.getElementById("navigation-sidemenu"),
	    smitems = sm.querySelectorAll(".menu > li:not(.divider) > a");

	function clickHandler() {
		return function() {
			if (Responsive.device != "desktop") {
				SideMenu.hide(sm);
			}
			for (var ind = 0; ind < smitems.length; ind++) {
				smitems[ind].parentNode.className = "";
			}
			this.parentNode.className = "selected color-blue-500";
			document.querySelector(".main-content").scrollTop = 0;
		};
	}

	for (var i = 0, len = smitems.length; i < len; i++) {
		smitems[i].addEventListener("click", clickHandler());
	}
}

function DialogDemoCallback(button) {
	var ourButton = (button.className.indexOf("dialog-confirm") > -1) ? "Accept" : "Decline";
	alert(ourButton + " was pressed!");
}

window.addEventListener("DOMContentLoaded", function() {
	var md = new Material();
	if ((window.location.hash === "") || (document.querySelector(".navigation-section" + window.location.hash) === null)) {
		window.location.hash = "#introduction";
	}
	document.querySelector("#navigation-sidemenu a[href='" + window.location.hash + "']").parentNode.className = "selected color-blue-500";
	init();
});
