/* Responsive code */
var Responsive = new function() {
	this.onResize = function() {
		var width = window.innerWidth;
		var oldDevice = this.device;
		if (width > 1000) {
			this.device = "desktop";
		}
		else if (width > 450) {
			this.device = "tablet";
		}
		else {
			this.device = "phone";
		}
		document.body.classList.remove(oldDevice);
		document.body.classList.add(this.device);
	};
	this.addResizeHandler = function(handler) {
		window.addEventListener("resize", handler);
	};
	this.removeResizeHandler = function(handler) {
		window.removeEventListener("resize", handler);
	};
	this.init = function() {
		this.onResize();
		window.addEventListener("resize", this.onResize.bind(this));
	}
}


/* Theme code */
var Theme = {
	toggle: function(element) {
		var el = element || document.body;
		if (el.classList.contains("dark-theme")) {
			el.classList.remove("dark-theme");
		}
		else {
			el.classList.add("dark-theme");
		}
	},
	setTheme: function(theme, element) {
		var el = element || document.body;
		switch (theme) {
			case "light":
				el.classList.remove("dark-theme");
				break;
			case "dark":
				el.classList.add("dark-theme");
				break;
			default:
				console.log("[Theme.setTheme] Unknown theme : " + theme);
				break;
		}
	}
}

/* SideMenu code */
var SideMenu = new function() {
	this.createOverlay = function() {
		if (document.querySelector(".sidemenu-overlay")) {
			this.overlay = document.querySelectorAll(".sidemenu-overlay")[0];
			return;
		}
		var overlay = document.createElement("div");
		overlay.className = "overlay sidemenu-overlay";
		overlay.hidden = true;
		overlay.setAttribute("id", "mf_overlay_" + (Math.random() * 10000))
		document.body.appendChild(overlay);
		this.overlay = overlay;
	}
	this.toggle = function(sm) {
		if (!sm.classList.contains("sidebar") || (typeof Responsive == "undefined" || Responsive.device !== "desktop")) {
			this.overlay.hidden = !sm.hidden;
		}
		sm.hidden = !sm.hidden;
	};
	this.show = function(sm) {
		if (!sm.classList.contains("sidebar") || (typeof Responsive == "undefined" || Responsive.device !== "desktop")) {
			this.overlay.hidden = false;
		}
		sm.hidden = false;
	};
	this.hide = function(sm) {
		this.overlay.hidden = true;
		sm.hidden = true;
	};
	this.onResize = function() {
		var sidebars = document.querySelectorAll(".sidebar");
		for (var i = 0; i < sidebars.length; i++) {
			if (Responsive.device == "desktop") {
				this.show(sidebars[i]);
			}
			else {
				this.hide(sidebars[i]);
			}
		}
	}
	this.init = function(params) {
		this.createOverlay();
		if (params && params.overlay) {
			this.setOverlay(params.overlay);
		}
		this.overlay.addEventListener("click", function() {
			var sidemenus = document.querySelectorAll(".sidemenu");
			for (var i = 0; i < sidemenus.length; i++) {
				if (!sidemenus[i].hidden && (!sidemenus[i].classList.contains("sidebar") || (typeof Responsive == "undefined" || Responsive.device !== "desktop"))) {
					this.hide(sidemenus[i]);
				}
			}
		}.bind(this));
		if (typeof Responsive != "undefined") {
			Responsive.addResizeHandler(this.onResize.bind(this));
		}
		this.onResize();
	}
}

/* Dialog code */
var Dialog = new function() {
	this.createOverlay = function() {
		if (document.querySelector(".dialog-overlay")) {
			this.overlay = document.querySelectorAll(".dialog-overlay")[0];
			return;
		}
		var overlay = document.createElement("div");
		overlay.className = "overlay dialog-overlay";
		overlay.hidden = true;
		overlay.setAttribute("id", "mf_overlay_" + (Math.random() * 10000))
		document.body.appendChild(overlay);
		this.overlay = overlay;
	};
	this.show = function(dialog) {
		this.overlay.hidden = false;
		dialog.hidden = false;
	}
	this.hide = function(dialog) {
		this.overlay.hidden = true;
		dialog.hidden = true;
	}
	this.toggle = function(dialog) {
		this.overlay.hidden = !dialog.hidden;
		dialog.hidden = !dialog.hidden;
	}
	this.getCurrentDialog = function() {
		return document.querySelector(".dialog:not([hidden])");
	}
	this.hideCurrentDialog = function() {
		this.hide(this.getCurrentDialog());
	}
	this.init = function() {
		this.createOverlay();
		var buttons = document.querySelectorAll(".dialog-confirm, .dialog-close");
		for (var i = 0; i < buttons.length; i++) {
			buttons[i].addEventListener("click", this.hideCurrentDialog.bind(this))
		};
	}
}

window.addEventListener("DOMContentLoaded", function MF_onLoad() {
	Dialog.init();
	Responsive.init();
	SideMenu.init();
	window.removeEventListener("DOMContentLoaded", MF_onLoad);
});


