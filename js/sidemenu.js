var SideMenu = {
	overlay: document.querySelector("#sidemenu-overlay"),
	setOverlay: function(element) {
		this.overlay = element;
	},
	toggle: function(sm) {
		this.overlay.hidden = !sm.hidden;
		sm.hidden = !sm.hidden;
	},
	show: function(sm) {
		this.overlay.hidden = false;
		sm.hidden = false;
	},
	hide: function(sm) {
		this.overlay.hidden = true;
		sm.hidden = true;
	},
	init: function(params) {
		if (params && params.overlay) {
			this.setOverlay(params.overlay);
		}
		this.overlay.addEventListener("click", function() {
			var sidemenus = document.querySelectorAll(".sidemenu");
			for (var i = 0; i < sidemenus.length; i++) {
				this.hide(sidemenus[i]);
			}
		}.bind(this));
	}
}
window.addEventListener("load", function SM_onLoad() {
	SideMenu.init();
	window.removeEventListener("load", SM_onLoad);
});


