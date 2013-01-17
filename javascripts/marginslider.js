

var MarginSlider = {

	/**
	 * Initializes the slider
	 * @params {Object} config The configuration object
	 */
	init: function (config) {
		
		if(config === undefined) {
			var config = {};
		}

		// Set required variables
		this.slider_container 	= config.slider_container ? config.slider_container : $('.marginslider_container');
		this.slider 			= config.slider ? config.slider : $('.marginslider');
		this.slider_child 		= config.slider_child ? config.slider_child : $('.marginslider li');
		this.bt_left 			= config.bt_left ? config.bt_left : $('.left-arrow');
		this.bt_right 			= config.bt_right ? config.bt_right : $('.right-arrow');
		this.no_visible 		= config.no_visible ? config.no_visible : 5;
		this.step 				= config.step ? config.step : 1;
		//this.img_width = config.img_width ? config.img_width : -1;
		this.img_margin = config.img_margin ? config.img_margin : -1;

		// Call required init actions
		this.slider_container.show();
		this.bt_left.show();
		this.bt_right.show();
		this.configure();
	},

	/**
	 * Calculates the slider's core variables.
	 */
	configure: function () {
		// Init core variables
		this.position = 1;
		this.current_margin = 0;


		// Set margin-left (default is 15px)
		this.img_margin = (this.img_margin === -1) ? 15 : this.img_margin;
		this.slider_child.css('margin-left', this.img_margin);

		
		var child_size = $( this.slider_child[0] ).width(),
			margin = parseInt( $( this.slider_child[0] ).css( 'margin-left' ) ),
			container_size = ( ( child_size + margin ) * this.no_visible) + margin,
			slider_size = this.total_elements * ( child_size + margin ) + 10;

		this.slider_container.css('width', container_size);
		this.slider.css('width', slider_size);

		this.total_elements = this.slider_child.length;
		this.pace = child_size + margin;

		if(this.no_visible < this.total_elements) {
			this.bindEvents();
		} else {
			console.log('Number of visible elements > total of elements');
		}

		this.moving = false;

		// Debugging
		// console.log('Total elements: ' + this.total_elements);
		// console.log('Container size: ' + container_size + 'px');
		// console.log('Slider size: ' + this.slider.css('width'));
		// console.log('Step: ' + this.step);
		// console.log("Pace: " + this.pace);
		// console.log("Step * Pace: " + this.step * this.pace);
	},

	/**
	 * Binds the navigation events.
	 */
	bindEvents: function () {
		this.bt_left.on('click', this.goLeft);
		this.bt_right.on('click', this.goRight);
	},

	/**
	 * Handler method to go left
	 */
	goLeft: function() {
		var self = MarginSlider;
		if(self.moving == true) {
			return false;
		} else {
			self.moving = true;
		}
		// Is it ok to move?
		if( self.position > 1 ) {
			self.position -= self.step; 
			// If the new position is not ok.
			if(self.position < 1) {
				self.position = 1;
			} 
		} 
		// Else, go to the end
		else { 
			// n - (visible  + 1)
			self.position = self.total_elements - self.no_visible + 1; 
		}
		self.goTo();
	},

	/**
	 * Handler method to go right
	 */
	goRight: function() {
		var self = MarginSlider;
		if(self.moving == true) {
			return false;
		} else {
			self.moving = true;
		}
		// Is it ok to move?
		if( self.position + self.no_visible <= self.total_elements ){
			self.position += self.step;
			// If the new position is not ok.
			if ( self.position + self.no_visible > self.total_elements ) {
				self.position = self.total_elements - self.no_visible + 1;
			}
		} 
		// Else, go back to the start
		else { 
			self.position = 1;
		}
		self.goTo();
	},

	/**
	 * Calculates the new margin and executes the animation.
	 */
	goTo: function () {
		var self = MarginSlider;

		// (( margin + width) * pace ) * (n - 1)
		self.current_margin = -( this.pace ) * ( this.position - 1 );
		self.slider.animate( {marginLeft: self.current_margin}, function () {
			self.moving = false;
			
		} );
	}
};
