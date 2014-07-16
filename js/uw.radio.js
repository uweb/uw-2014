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
    'click .radio' : 'toggle'
  },

  template: '<span class="icons"><span class="first-icon fui-radio-unchecked"></span><span class="second-icon fui-radio-checked"></span></span>',

  initialize : function( options )
  {
    _.bindAll( this, 'toggle' )
    this.settings = _.extend( {}, this.defaults , this.$el.data() , options )
    this.$el.before( this.template )
    this.setState()
    this.$el.closest('label').bind( 'click' , this.toggle )
  },

  setState: function()
  {

    var $parent = this.$el.closest( '.radio' )

    if ( this.$el.prop('disabled') ) $parent.addClass('disabled')
    if ( this.$el.prop('checked') ) $parent.addClass('checked')

  },

  toggle : function()
  {
    var this_ = this;
       var checked = this.$el.prop( this.states.checked )
       , $parent = this.$el.closest('.radio')
       , $parentWrap = this.$el.closest('form').length ? this.$el.closest('form') : this.$el.closest('body')
       , $elemGroup = $parentWrap.find(':radio[name="' + this.$el.attr('name') + '"]')
       , e = $.Event('toggle')

       $elemGroup.not(this.$el).each(function () {

         var $el = $(this)
           , $parent = $el.closest('.radio');

           if ( $el.prop( this_.states.disabled ) === false &&
                $parent.removeClass( this_.states.checked ) )  {
             $el.removeAttr( this_.states.checked ).trigger('change');
           }
       });

       if (this.$el.prop( this.states.disabled ) === false)
       {

        // if (checked === false) $parent.addClass( this.states.checked ) && $el.prop( this.states.checked , true);
          if (checked === false && $parent.addClass( this.states.checked ) ) this.$el.prop( this.states.checked , true);
          this.$el.trigger(e);

          if (checked !== this.$el.prop( this.states.checked )) {
            this.$el.trigger('change');
          }

       }
  },

  // setCheck : function( option )
  // {
  //    var ch = 'checked'
  //      , $el = this.$element
  //      , $parent = $el.closest('.radio')
  //      , checkAction = option == 'check' ? true : false
  //      , checked = $el.prop(ch)
  //      , $parentWrap = $el.closest('form').length ? $el.closest('form') : $el.closest('body')
  //      , $elemGroup = $parentWrap.find(':radio[name="' + $el.attr('name') + '"]')
  //      , e = $.Event(option)
  //
  //    $elemGroup.not($el).each(function () {
  //      var $el = $(this)
  //        , $parent = $(this).closest('.radio');
  //
  //        $parent.removeClass(ch)
  //        $el.removeAttr(ch);
  //
  //    });
  //
  //    $parent[checkAction ? 'addClass' : 'removeClass'](ch)
  //    if ( checkAction ) { $el.prop(ch, ch) } else { $el.removeAttr(ch); }
  //    $el.trigger(e);
  //
  //    if (checked !== $el.prop(ch)) {
  //      $el.trigger('change');
  //    }
  // },

})
