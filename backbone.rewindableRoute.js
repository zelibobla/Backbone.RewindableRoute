/**
 * extend Backbone router to make it available to roll back
 * @author Anton Zelenski zelibobla@gmail.com november 2014
 * @licence MIT
 */
Backbone.RewindableRouter = Backbone.Router.extend({
	
	/**
	 * constructor
	 * @return void
	 */
	initialize: function() {
		this.prevRoute = null;
		this.prevParams = [];
		this.route = null;
		this.params = [];
		Backbone.history.on( 'route', function( self, route, params ) {
			this.prevRoute = this.route;
			this.prevParams = this.params;
			this.route = route;
			this.params = params;
		});
	},

	/**
	 * roll navigation back
	 * @param boolean trigger – should route event be fired
	 * @return void
	 */
	back: function( trigger ) {
		if( !this.prevRoute ){
			this.navigate( '/', { trigger: !!trigger });
		} else {
			this.navigate( this.prevRoute, { trigger: !!trigger });
		}
	},
});
