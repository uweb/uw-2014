// This section builds and populates the quicklinks section (off-canvas right)

UW.QuickLinks = Backbone.View.extend({

    DELAY : 500,

    // todo: the default list and these elements could be put into the php templates
    container: '#uw-container',

    template : '<nav id="quicklinks" role="navigation" aria-label="quick links" aria-hidden="true">' +
                        '<ul id="big-links">' +
                            '<% _.each( links, function( link ) { %> ' +
                                '<% if (link.classes) { %>' +
                                    '<li>' +
                                        '<span class="<%= link.classes %>"></span>' +
                                        '<a href="<%= link.url %>" tabindex="-1"><%= link.title %></a>' +
                                    '</li>' +
                                '<% } %>' +
                            '<% }) %>' +
                        '</ul>' +
                        '<h3>Helpful Links</h3>' +
                        '<ul id="little-links">' +
                            '<% _.each( links, function( link ) { %> '+
                                '<% if ( ! link.classes) { %>' +
                                    '<li>' +
                                        '<span class="<%= link.classes %>"></span>' +
                                        '<a href="<%= link.url %>" tabindex="-1"><%= link.title %></a>' +
                                    '</li>' +
                                '<% } %>' +
                            '<% }) %>' +
                        '</ul>' +
                    '</nav>',

    events: {
       'click'           : 'animate',
       'touchstart'   : 'animate',
       'keyup'         : 'animate',
       'blur button' : 'loop',
       // 'keydown button' : 'testShiftKey'
    },

    // testShiftKey : function(e)
    // {
    //     console.log(e, e.shiftKey)
    // },

    initialize: function ( options ) {
        _.bindAll( this, 'render', 'animate', 'accessible', 'loop'  );
        this.links = new UW.QuickLinks.Collection( options )
        this.links.on( 'sync', this.render )
    },

    render : function(  )
    {
        this.quicklinks = $ ( _.template( this.template, { links : this.links.toJSON() }) )
        this.makeDrawer()
        this.$container.prepend( this.quicklinks )
        this.$el.attr( 'aria-controls', 'quicklinks' ).attr( 'aria-owns', 'quicklinks' )
        UW.$body.on( 'keyup', '#quicklinks a', this.animate )
    },

    makeDrawer: function () {
        var $shortcuts = UW.$body.find('a.screen-reader-shortcut').detach();
        UW.$body.children().not('#wpadminbar').not('script')
            .wrapAll('<div id="uw-container">')
            .wrapAll('<div id="uw-container-inner">');
        this.$container = $(this.container);
        this.$container.prepend($shortcuts);
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

        _.delay( this.accessible, this.open ? this.DELAY : 0 )
    },

    // todo : cache the uw-container-inner and screen-reader
    accessible : function (argument)
    {
        this.$el.find('button').attr( 'aria-expanded', this.open )
        this.quicklinks.attr('aria-hidden',  ( ! this.open ).toString() )
        if ( this.open ) {
            this.quicklinks.find('a').attr( 'tabindex', 0 ).first().focus()
           $('#uw-container-inner').attr('aria-hidden', true);
           $('.screen-reader-shortcut').attr('aria-hidden', true)
        } else {
            this.quicklinks.find('a').attr( 'tabindex', -1 )
            this.$el.find('button').focus()
           $('#uw-container-inner').attr('aria-hidden', false);
           $('.screen-reader-shortcut').attr('aria-hidden', false);
        }
    },

    loop : function (event) {
        if( this.open ) this.quicklinks.find('li a').first().focus();
    }

});

UW.QuickLinks.Model = Backbone.Model.extend({});

UW.QuickLinks.Collection = Backbone.Collection.extend({

    model: UW.QuickLinks.Model,

    initialize: function ( options )
    {
        this.url = options.url;
        this.fetch()
    },

});
