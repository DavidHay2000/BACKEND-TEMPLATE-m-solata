const mongoose = require('mongoose')

const viewpointSchema = new mongoose.Schema({
	_id: {
		type: Number,
		required: true
	},
	viewpointName: {
		type: String,
		required: true,
		unique: true,
		maxlength: [50, 'A név nem lehet hosszabb 50 karakternél!']
	},
	mountain: {
		type: String,
    	required: true,
    	unique: true,
    	maxlength: [30, 'A név nem tartalmazhat 30 karakternél többet!'],
	},
	height: {
		type: Number,
		min: [1, 'Egy kilátónak legalább 1 méter magasnak kell lennie!']
	},
	description: {
		type: String,
	},
	built: {
		type: Date,
		max: [Date.now(), 'Az aktuális dátumnál nem adhat meg későbbi dátumot a built mezőben!']

	},
	imageURL: {
		type: String,
		required: true,
		maxlength: [50, 'A név nem lehet hosszabb 50 karakternél!'],
		default: 'http://elit.jedlik.eu/viewpoints/no-img.jpg'
	},
	location: {
		type: Number,
		required: true,
		ref: 'location'
	}

})

module.exports = mongoose.model('viewpoint', viewpointSchema, 'viewpoints') // telefonok névvel lesz létrehozva a kollekció.