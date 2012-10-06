
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require handlebars
//= require ember
//= require ember-rest
//= require twitter/bootstrap
//= require handlebars
//= require ember
//= require_self
//= require ember_app
App = Ember.Application.create( {
								 rootElement: '#rulebotEmberBase'
							   });

App['Constants'] = { Comparators : {
	                'string' : [ {tag:'equal to'}, {tag:'not equal to'}],
					'time'  : [ {tag:'before'}, {tag:'later'}, {tag:'on'}],
					'integer'  : [ {tag:'equal'}, {tag:'not equal'}, {tag:'less than'},{tag:'greater than'} ],
					'boolean'  : [ {tag:'equal'}, {tag:'not equal'}],

				   },

                   Defaults	 : {
					'ABC' : ['foo', 'bar'],
					'DEF'  : [ {value:'15/01/2011'}, {value :'15/01/2013'} ]

				  }
				};




