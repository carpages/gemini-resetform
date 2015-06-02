/**
 * @fileoverview

A Gemini plugin to reset forms to their default values.

### Notes
- The plugin uses ``data-reset`` attributes to find default values

### Features
- Here's a feature

 *
 * @namespace gemini.resetform
 * @copyright Carpages.ca 2014
 * @author Matt Rose <matt@mattrose.ca>
 *
 * @requires gemini
 *
 * @example
  <html>
    <form id="js-form" action="#">
      <select name="make" data-reset="dodge">
        <option value="dodge" selected>Dodge</option>
        <option value="ford">Ford</option>
      </select>

      <label>
        <input type="radio" value="auto" name="transmission" data-reset="this" checked>
        Automatic
      </label>
      <label>
        <input type="radio" value="manual" name="transmission">
        Manual
      </label>

      <label>
        <input type="checkbox" value="bluetooth" name="features" data-reset="this" checked>
        Bluetooth
      </label>
      <label>
        <input type="checkbox" value="air" name="features">
        Air-conditioning
      </label>

      <button data-reset="trigger">
        Reset
      </button>
    </form>
  </html>
 *
 * @example
  G('#js-hook').resetform();
 */
(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['gemini'], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    module.exports = factory(require('gemini'));
  } else {
    // Browser globals
    factory(G);
  }
}(function($) {

  $.boiler('resetform', {

    init: function(){
      var plugin = this;

      //Bind reset form
      plugin.$el.bind('reset', function(){
        plugin.reset();
      });

      //Bind click event
      plugin.$el.find('[data-reset="trigger"]').click(function(e){
        e.preventDefault();
        plugin.$el.trigger('reset');
      });
    },

    /**
     * Reset the form to its defaults
     *
     * @method
     * @name gemini.resetform#reset
    **/
    reset: function(){
      var plugin = this;

      //Select boxes
      plugin.selectReset();

      //Checkboxes
      plugin.checkboxReset();

      //Radio Buttons
      plugin.radioReset();
    },

    /**
     * Reset all of the select dropdowns
     *
     * @method
     * @name gemini.resetform#seletReset
    **/
    selectReset: function(){
      var plugin = this;

      var $select = plugin.$el.find('select[data-reset]');

      $select.each(function(){
        var $this = $(this),
            $toSelect = $this.find('[value=' + $this.data('reset') + ']');

        if ($toSelect.length <= 0) $toSelect = $this.find('option:first');

        //Deselect
        $this.find('option:selected').prop('selected', false);
        //Select
        $toSelect.prop('selected', true);
      });
    },

    /**
     * Reset all of the checkboxes
     *
     * @method
     * @name gemini.resetform#checkboxReset
    **/
    checkboxReset: function(){
      var plugin = this;

      var $checkbox = plugin.$el.find('[type="checkbox"]');

      // Uncheck them all
      $checkbox.prop('checked', false);

      // Check the default items
      $checkbox.filter('[data-reset="this"]').prop('checked', true);
    },

    /**
     * Reset all of the radio buttons
     *
     * @method
     * @name gemini.resetform#radioReset
    **/
    radioReset: function(){
      var plugin = this;

      var $radio = plugin.$el.find('[type="radio"]');

      // Uncheck them all
      $radio.prop('checked', false);

      // Check the default items
      $radio.filter('[data-reset="this"]').prop('checked', true);
    }
  });

  // Return the jquery object
  // This way you don't need to require both jquery and the plugin
  return $;

}));
