const fs = require('fs');

var abilities = {};

var wait3Abilities = 
[
	'byregot\'s_brow',
	'byregot\'s_blessing',
	'piece_by_piece',
	'observe',
	'initial_preparations',
	'master\'s_mend',
	'master\'s_mend_ii'
]

var uselessAbilities = 
[
	'brand_of_earth',
	'brand_of_fire',
	'brand_of_ice',
	'brand_of_lightning',
	'brand_of_water',
	'brand_of_wind',
	'careful_synthesis',
	'collectable_synthesis',
	'flawless_synthesis',
	'name_of_earth',
	'name_of_fire',
	'name_of_ice',
	'name_of_lightning',
	'name_of_the_wind',
	'name_of_water',
	'patient_touch',
	'precise_touch',
	'prudent_touch',
	'rumination',
	'reclaim',
	'steady_hand',
	'focused_touch',
	'focused_synthesis',
	'basic_synthesis',
	'byregot\'s_brow',
	'maker\'s_mark'
]

fs.readdir('../res/icon', (err, files) => 
{
	files.forEach(file => 
	{
		var iconname = file;
		var id = /(?:(.*)\.png)/gi.exec(file)[1];
		var nameArray = id.split('_');
		var name = '';

		nameArray.forEach(namePart =>
		{
			if(namePart === 'of' || namePart === 'the')
				name += namePart;
			else if(namePart === 'i' || namePart === 'ii' || namePart === 'iii')
				name += namePart.toUpperCase();
			else
				name += namePart.charAt(0).toUpperCase() + namePart.slice(1);

			name += ' ';
		});

		name = name.substring(0, name.length - 1);

		var wait = 0;

		if(id.indexOf('touch') > -1 || id.indexOf('synthesis') > -1 || wait3Abilities.indexOf(id) > -1)
			wait = 3;
		else
			wait = 2;

		var useless = false;

		if(uselessAbilities.indexOf(id) > -1)
			useless = true;
		else
			useless = false;


		var ability = 
		{
			"id": id,
			"name": name,
			"icon": file,
			"cp": "0",
			"wait": wait,
			'useless': useless
		}

		abilities[id] = ability;
	});

	fs.writeFile('./ability_structure.json', JSON.stringify(abilities, null, 2), 'utf-8');
});