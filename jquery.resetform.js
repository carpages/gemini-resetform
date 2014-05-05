define(['jquery.boiler'], function($){

	$.boiler('resetform', {
		defaults: {},

		events: {},

		init: function(){
			var plugin = this;

			//Cache elements
			plugin.$init = plugin.$el.find('.js-reset__init');
			plugin.$select = plugin.$el.find('select');
			plugin.$checkbox = plugin.$el.find('[type="checkbox"]');
			plugin.$radio = plugin.$el.find('[type="radio"]');

			plugin.$init.click(function(e){
				e.preventDefault();

				plugin.reset();
			});
		},

		reset: function(){
			var plugin = this;

			//Select boxes
			plugin.$select.each(function(){
				var $this = $(this),
					$toSelect = $this.find('.js-reset__default');

				if ($toSelect.length <= 0) $toSelect = $this.find('option:first');

				//Deselect
				$this.find('option:selected').prop('selected', false);
				//Select
				$toSelect.prop('selected', true);
			});

			//Radio Buttons
			plugin.$radio.each(function(){
				var $this = $(this);

				if ($this.hasClass('js-reset__default')){
					$this.prop('checked', true);
				}else{
					$this.prop('checked', false);
				}
			});

			//Checkboxes
			plugin.$checkbox.each(function(){
				var $this = $(this);

				if ($this.hasClass('js-reset__default')){
					$this.prop('checked', true);
				}else{
					$this.prop('checked', false);
				}
			});
		}
	});

	// Return the jquery object
	// This way you don't need to require both jquery and the plugin
	return $;

});