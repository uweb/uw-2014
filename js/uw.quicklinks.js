// This section builds and populates the quicklinks section (off-canvas right)

UW.QuickLinks = Backbone.View.extend({

    DELAY : 500,

    // todo: the default list and these elements could be put into the php templates
    container: '#uw-container',

    template : '<nav id="quicklinks" role="navigation" aria-label="quick links" aria-hidden="true">' +
                        '<ul id="big_links">' +
                            '<% _.each( links, function( link ) { %> ' +
                            '<li>' +
                                '<% if (link.classes) { %>' +
                                    '<span class="<%= link.classes %>"></span>' +
                                    '<a href="<%= link.url %>" tabindex="-1"><%= link.title %></a>' +
                                '<% } %>' +
                            '</li>' +
                            '<% }) %>' +
                        '</ul>' +
                        '<h3>Helpful Links</h3>' +
                        '<ul id="little_list">' +
                            '<% _.each( links, function( link ) { %> '+
                                '<li>' +
                                    '<% if ( ! link.classes) { %>' +
                                        '<span class="<%= link.classes %>"></span>' +
                                        '<a href="<%= link.url %>" tabindex="-1"><%= link.title %></a>' +
                                    '<% } %>' +
                                '</li>' +
                            '<% }) %>' +
                        '</ul>' +
                    '</nav>',

    events: {
       'click'           : 'animate',
       'touchstart'   : 'animate',
       'keyup'         : 'animate',
       'blur button' : 'loop'
    },

    initialize: function ( options ) {
        _.bindAll( this, 'render', 'accessible', 'loop'  );
        this.links = new UW.QuickLinks.Collection( options )
        this.links.on( 'sync', this.render )
    },

    render : function(  )
    {
        this.quicklinks = $ ( _.template( this.template, { links : this.links.toJSON() }) )
        this.make_drawer()
        this.$container.prepend( this.quicklinks )
    },

    make_drawer: function () {
        var $shortcuts = UW.$body.find('a.screen-reader-shortcut').detach();
        UW.$body.children().not('#wpadminbar').not('script')
            .wrapAll('<div id="uw-container">')
            .wrapAll('<div id="uw-container-inner">');
        this.$container = $(this.container);
        this.$container.prepend($shortcuts);
    },

    animate: function ( e ) {
        e.preventDefault();

         if ( e.keyCode && e.keyCode != 13 ||
                e.keyCode && e.keyCode != 32 )
            return false;

        this.$container.toggleClass('open')
        this.quicklinks.toggleClass('open')

        this.open = this.quicklinks.hasClass( 'open' )

        _.delay( this.accessible, this.open ? this.DELAY : 0 )
    },

    accessible : function (argument)
    {
        this.$el.find('button').attr( 'aria-expanded', this.open )
        this.quicklinks.attr('aria-hidden',  ( ! this.open ).toString() )
        if ( this.open )
            this.quicklinks.find('a').attr( 'tabindex', 0 ).first().focus()
        else
            this.quicklinks.find('a').attr( 'tabindex', -1 )
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
