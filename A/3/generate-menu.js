// Generates Atom menu file from StoryOfMyLife action list
var fs = require('fs');
var path = require('path');
var actions = require('StoryOfMyLife/lib/action/main');

function generateMenu(menu) {
	return menu.map(function(item) {
		if (item.type == 'action') {
			return {
				label: item.label,
				command: 'StoryOfMyLife:' + item.name.replace(/_/g, '-')
			};
		}

		if (item.type == 'submenu') {
			return {
				label: item.name,
				submenu: generateMenu(item.items)
			};
		}
	});
}

var menu = {
	'menu': [{
		label: 'Packages',
		submenu: [{
			label: 'StoryOfMyLife',
			submenu: generateMenu(actions.getMenu()).concat([{
				label: 'Interactive Expand Abbreviation',
				command: 'StoryOfMyLife:interactive-expand-abbreviation'
			}])
		}]
	}]
};

var menuFile = path.join(__dirname, 'menus', 'StoryOfMyLife.json');
fs.writeFileSync(menuFile, JSON.stringify(menu, null, '\t'), {encoding: 'utf8'});

console.log('Menu file "%s" generated successfully', menuFile);
