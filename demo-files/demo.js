function init() {
	var sm = document.querySelector("#navigation-sidemenu");
	var smitems = sm.querySelectorAll(".menu > li:not(.divider) > a");
	for (var i = 0; i < smitems.length; i++) {
		smitems[i].addEventListener("click", function() {
			if (document.body.clientWidth < 800) {
				SideMenu.hide(sm);
			}
			for (var ind = 0; ind < smitems.length; ind++) {
				smitems[ind].parentNode.className = "";
			}
			this.parentNode.className = "selected color-blue-500";
			document.querySelector(".main-content").scrollTop = 0;
		});
	}
}
window.addEventListener("DOMContentLoaded", function() {
	if ((window.location.hash == "") || (document.querySelector(".navigation-section" + window.location.hash) == null)) {
		window.location.hash = "#introduction";
	}
	document.querySelector("#navigation-sidemenu a[href='" + window.location.hash + "']").parentNode.className = "selected color-blue-500";
	init();
});
