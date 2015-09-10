/* RADIO PUBLIC CLASS DEFINITION
 * ============================== */

UW.Radio = Backbone.View.extend({

  states :
  {
    checked  : 'checked',
    disabled : 'disabled'
  },

  events :
  {
    'click input' : 'toggle'
  },

  template: '<span class="icons"><span class="first-icon fui-radio-unchecked"></span><span class="second-icon fui-radio-checked"></span></span>',

  initialize : function( options )
  {
    _.bindAll( this, 'toggle', 'getGroup', 'toggleCheckBox' )

    this.settings = _.extend( {}, this.defaults , this.$el.data() , options )

    this.$el.after( this.template )

    this.$input = this.$el

    this.name   = this.$el.attr( 'name' )

    this.setElement( this.$el.closest('label') )

    this.setState()
  },

  setState: function()
  {
    if ( this.$input.prop( this.states.disabled ) ) this.$el.addClass( this.states.disabled )
    if ( this.$input.prop( this.states.checked ) ) this.$el.addClass( this.states.checked )
  },

  getGroup : function()
  {
    if ( this.$input.attr('type') === 'radio' ) {
      return _.where( UW.radio, { name : this.name })
    }
    if ( this.$input.attr('type') === 'checkbox' ) {
      return _.where( UW.checkbox, { name : this.name })
    }
  },

  toggle : function(e )
  {
      _.each( this.getGroup() , this.toggleCheckBox )

  },

  toggleCheckBox : function( view )
  {
    var checked  = view.$input.prop( this.states.checked )
      , disabled = view.$input.prop( this.states.disabled )
    if ( ! disabled &&
          view.$el.removeClass( this.states.checked ) )
        view.$el.removeAttr( this.states.checked ).trigger( 'change' )


    if ( ! disabled )
    {

      if ( checked && view.$el.addClass( this.states.checked ) )
        view.$el.trigger( $.Event('toggle') )

      if ( checked !== view.$el.prop( this.states.checked ) )
        view.$el.trigger( 'change' )

    }

  }

})
