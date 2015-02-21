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

