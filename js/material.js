"use strict";
/* Util */
var console = (window.console = window.console || {});

/* Responsive code */
function Responsive(){
	this.initialised = false;
}
Responsive.prototype = {
	constructor : Responsive,
	init: function() {
		if(this.initialised) return;
		this.onResize();
		window.addEventListener("resize", this.onResize.bind(this));
		this.initialised = true;
	},
	onResize: function() {
		var width     = window.innerWidth,
		    oldDevice = this.device;
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
	},
	addResizeHandler: function(handler) {
		window.addEventListener("resize", handler);
	},
	removeResizeHandler: function(handler) {
		window.removeEventListener("resize", handler);
	}
};

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
};

/* SideMenu code */
function SideMenu(){
	this.initialised = false;
}
SideMenu.prototype = {
	constructor : SideMenu,
	init: function(params) {
		if(this.initialised) return;
		this.createOverlay();
		if (params && params.overlay) {
			this.setOverlay(params.overlay);
		}
		this.overlay.addEventListener("click", function() {
			var sidemenus = document.querySelectorAll(".sidemenu");
			for (var i = 0, len = sidemenus.length; i < len; i++) {
				if (!sidemenus[i].hidden && (!sidemenus[i].classList.contains("sidebar") || (typeof Responsive == "undefined" || Responsive.device !== "desktop"))) {
					this.hide(sidemenus[i]);
				}
			}
		}.bind(this));
		if (typeof Responsive != "undefined") {
			Responsive.addResizeHandler(this.onResize.bind(this));
		}
		this.onResize();
		this.initialised = true;
	},
	createOverlay: function() {
		if (document.querySelector(".sidemenu-overlay")) {
			this.overlay = document.querySelectorAll(".sidemenu-overlay")[0];
			return;
		}
		var overlay = document.createElement("div");
		overlay.className = "overlay sidemenu-overlay";
		overlay.hidden = true;
		overlay.setAttribute("id", "mf_overlay_" + Math.floor(Math.random() * 100000));
		document.body.appendChild(overlay);
		this.overlay = overlay;
	},
	toggle: function(sm) {
		if (!sm.classList.contains("sidebar") || (typeof Responsive == "undefined" || Responsive.device !== "desktop")) {
			this.overlay.hidden = !sm.hidden;
		}
		sm.hidden = !sm.hidden;
	},
	show: function(sm) {
		if (!sm.classList.contains("sidebar") || (typeof Responsive == "undefined" || Responsive.device !== "desktop")) {
			this.overlay.hidden = false;
		}
		sm.hidden = false;
	},
	hide: function(sm) {
		this.overlay.hidden = true;
		sm.hidden = true;
	},
	onResize: function() {
		var sidebars = document.querySelectorAll(".sidebar");
		for (var i = 0, len = sidebars.length; i < len; i++) {
			if (Responsive.device == "desktop") {
				this.show(sidebars[i]);
			}
			else {
				this.hide(sidebars[i]);
			}
		}
	}
};

/* Dialog code */
function Dialog(){
	this.initialised = false;
}
Dialog.prototype = {
	constructor : Dialog,
	init: function() {
		if(this.initialised) return;
		this.createOverlay();
		var buttons = document.querySelectorAll(".dialog-confirm, .dialog-close");
		for (var i = 0, len = buttons.length; i < len; i++) {
			buttons[i].addEventListener("click", this.hideCurrentDialog.bind(this));
		}
		this.initialised = true;
	},
	createOverlay: function() {
		if (document.querySelector(".dialog-overlay")) {
			this.overlay = document.querySelectorAll(".dialog-overlay")[0];
			return;
		}
		var overlay = document.createElement("div");
		overlay.className = "overlay dialog-overlay";
		overlay.hidden = true;
		overlay.setAttribute("id", "mf_overlay_" + Math.floor(Math.random() * 100000));
		document.body.appendChild(overlay);
		this.overlay = overlay;
	},
	show: function(dialog) {
		this.overlay.hidden = false;
		dialog.hidden = false;
	},
	hide: function(dialog) {
		this.overlay.hidden = true;
		dialog.hidden = true;
	},
	toggle: function(dialog) {
		this.overlay.hidden = !dialog.hidden;
		dialog.hidden = !dialog.hidden;
	},
	getCurrentDialog: function() {
		return document.querySelector(".dialog:not([hidden])");
	},
	hideCurrentDialog: function() {
		this.hide(this.getCurrentDialog());
	}
};

/* Ripple code */
function Ripple(){
	this.initialised = false;
}
Ripple.prototype = {
	constructor : Ripple,
	init: function() {
		// var rippleitems = document.querySelectorAll(".button:not(.no-ripple):not([ripple='none']), .fab:not(.no-ripple):not([ripple='none']), [ripple]:not([ripple='none']), .ripple");
		// for (var i = 0; i < rippleitems.length; i++) {
		// 	rippleitems[i].addEventListener("mousedown", this.onClick, false);
		// 	rippleitems[i].addEventListener("touchstart", this.onClick, false);
		// }
		// Hack to enable :active state on iOS
		if(this.initialised) return;
		document.addEventListener("touchstart", function() {}, false);
		this.initialised = true;
	},
	onClick: function(event) {
		/* This needs fixing */
		var x     = event.pageX - this.offsetLeft - (this.clientWidth / 2),
		    y     = event.pageY - this.offsetTop - (this.clientHeight / 2),
		    style = document.createElement("style"),
		    id    = "data-mf-ripple_" + Math.floor(Math.random() * 1000000),
		    value = Math.floor(Math.random() * 1000000);
		this.setAttribute(id, value);
		style.innerHTML = "[" + id + "='" + value + "']::after {\n"+
		                  "left: " + x + "px;\n"+
		                  "top: " + y + "px;}";
		document.body.appendChild(style);
		setTimeout(function() {
			style.remove();
			this.removeAttribute(id);
		}.bind(this), 2000);
	}
};

/* Initiation */
var Dialog    = new Dialog(),
    Responsive = new Responsive(),
    SideMenu   = new SideMenu(),
    Ripple     = new Ripple();

window.addEventListener("DOMContentLoaded", function MF_onLoad() {
	Dialog.init();
	Responsive.init();
	SideMenu.init();
	Ripple.init();
	window.removeEventListener("DOMContentLoaded", MF_onLoad);
});
