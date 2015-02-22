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
	this.overlay = document.querySelector("#sidemenu-overlay"),
	this.setOverlay = function(element) {
		this.overlay = element;
	};
	this.toggle = function(sm) {
		if (typeof Responsive == "undefined" || Responsive.device !== "desktop") {
			this.overlay.hidden = !sm.hidden;
		}
		sm.hidden = !sm.hidden;
	};
	this.show = function(sm) {
		console.log(Responsive, Responsive.device)
		if (typeof Responsive == "undefined" || Responsive.device !== "desktop") {
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
		if (params && params.overlay) {
			this.setOverlay(params.overlay);
		}
		this.overlay.addEventListener("click", function() {
			var sidemenus = document.querySelectorAll(".sidemenu");
			for (var i = 0; i < sidemenus.length; i++) {
				this.hide(sidemenus[i]);
			}
		}.bind(this));
		if (typeof Responsive != "undefined") {
			Responsive.addResizeHandler(this.onResize.bind(this));
		}
		this.onResize();
	}
}
window.addEventListener("DOMContentLoaded", function MF_onLoad() {
	Responsive.init();
	SideMenu.init();
	window.removeEventListener("DOMContentLoaded", MF_onLoad);
});


