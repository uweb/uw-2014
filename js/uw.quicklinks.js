// This section builds and populates the quicklinks section (off-canvas right)

UW.QuickLinks = Backbone.View.extend({

    container: '#uw-container',

    events: {
       'click'      : 'animate',
       'touchstart' : 'animate',
       'keyup'      : 'animate',
       'blur'       : 'loop'
    },

    initialize: function ( options ) {
        _.bindAll( this, 'inner_keydown', 'render', 'animate', 'accessible', 'loop', 'transitionEnd' );
        
        this.render();
    },

    render : function(  )
    {
        this.quicklinks = $( '#quicklinks' );
        this.$container = $( this.container );
        this.$el.attr( 'aria-controls', 'quicklinks' ).attr( 'aria-owns', 'quicklinks' );
        UW.$body.on( 'keydown', '#quicklinks a:first', this.inner_keydown );
        UW.$body.on( 'keyup', '#quicklinks a', this.animate );
        this.quicklinks.on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', this.transitionEnd);
    },

    transitionEnd: function (event) {
        if (this.open && event.target == this.quicklinks[0]) {
            this.accessible();
        }
    },

    inner_keydown: function (e) {
        //may need event.prevent_default() here if screenreaders aren't acting right
        if ( e.keyCode == 9 && e.shiftKey) {
            this.$el.focus();
            return false;
        }
    },

    animate: function ( e ) {
        e.preventDefault();

        if ( e.keyCode && e.keyCode != 27 )
        {
            if ( e.keyCode && e.keyCode != 13 ||
                e.keyCode && e.keyCode != 32 )
            return false;
        }

        this.$container.toggleClass('open')
        this.quicklinks.toggleClass('open')

        this.open = this.quicklinks.hasClass( 'open' )

        if (!this.open) {
            this.accessible();
        }
    },

    // todo : cache the uw-container-inner and screen-reader
    accessible : function (argument)
    {
        this.$el.attr( 'aria-expanded', this.open )
        this.quicklinks.attr('aria-hidden',  ( ! this.open ).toString() )
        if ( this.open ) {
            this.$el.attr('aria-label', 'Close quick links');
            this.quicklinks.find('a').attr( 'tabindex', 0 ).first().focus()
           $('#uw-container-inner').attr('aria-hidden', true);
           $('.screen-reader-shortcut').attr('aria-hidden', true)
        } else {
            this.$el.attr('aria-label', 'Open quick links');
            this.quicklinks.find('a').attr( 'tabindex', -1 )
            this.$el.focus()
           $('#uw-container-inner').attr('aria-hidden', false);
           $('.screen-reader-shortcut').attr('aria-hidden', false);
        }
    },

    loop : function (event) {
        if( this.open ) {
            this.quicklinks.find('li a').first().focus();
        }
    }

});
