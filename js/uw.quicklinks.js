// This section builds and populates the quicklinks section (off-canvas right)

UW.QuickLinks = Backbone.View.extend({

    // todo: the default list and these elements could be put into the php templates
    container: 'div#uw-container',
    $little_list_header: $('<h3>Helpful Links</h3>'),
    $big_list: $('<ul id="big_links"></ul>'),
    $little_list: $('<ul id="little_list"></ul>'),
    DELAY : 500,


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
                        '<button class="close_quicklinks" style="position:absolute;left:-10000px;" tabindex="-1">close quicklinks</button>' +
                    '</nav>',

    events: {
       'click'           : 'animate',
       'touchstart'   : 'animate',
       'keyup'         : 'animate',
       'blur button' : 'loop'
    },

    initialize: function ( options ) {
        this.$button = this.$el.find('button')
        _.bindAll( this, 'render', 'accessible', 'loop', 'close_quicklinks', 'add_events'  );
        this.links = new UW.QuickLinks.Collection( options )
        this.links.on( 'sync', this.render )
    },

    render : function(  )
    {
        this.quicklinks = $ ( _.template( this.template, { links : this.links.toJSON() }) )
        this.make_drawer();
        this.$container.prepend( this.quicklinks )
        this.$drawer = this.$container.find('nav#quicklinks');
        this.add_events();
    },

    make_drawer: function () {
        var $shortcuts = UW.$body.find('a.screen-reader-shortcut').detach();
        UW.$body.children().not('#wpadminbar').not('script')
            .wrapAll('<div id="uw-container">')
            .wrapAll('<div id="uw-container-inner">');
        this.$container = $(this.container);
        this.$container.prepend($shortcuts);
    },

    close_quicklinks: function (event) {
        if (event.type == 'keyup'){
            if (event.keyCode == 27) {
                this.$button.focus();
                this.animate(event);
            }
        }
        else if (this.$container.hasClass('open') && (event.target.parentElement != this.el)) {
            this.animate(event);
        }
    },

    add_links: function () {
        _.each( this.collection.models, this.append_menu_item )
    },

    append_menu_item: function ( link ) {
        if ( link.get('classes') )
            this.$big_list.append( _.template( this.template, link.toJSON() ) )
         else
            this.$little_list.append( _.template( this.template, link.toJSON() ) )
    },

    //add_lists : function () {
    //    if (this.$little_list.find('li').length > 0) {
    //        this.$drawer.prepend(this.$little_list);
    //        this.$drawer.prepend(this.$little_list_header);
    //    }
    //    if (this.$big_list.find('li').length > 0) {
    //        this.$drawer.prepend(this.$big_list);
    //    }
    //    this.add_events();
    //    this.$container.prepend(this.$drawer);
    //},

    add_events: function () {
        this.$links = this.$drawer.find('a');
        $('#uw-container-inner').on( {
            'click': this.close_quicklinks
        });
        this.$drawer.find('button.close_quicklinks').on({
            'click': this.close_quicklinks
        });
        this.$links.on( {'keyup': this.close_quicklinks});
        var self = this;
        this.$links.last().blur(function () {
            self.$button.focus();
        });
    },

    animate: function ( e ) {
        e.preventDefault();

        if ( e.keyCode && (e.keyCode != 27 )){
            return false;
        }
        else if ( e.keyCode && e.keyCode == 27){
            if (!this.open){
                return false;
            }
        }

        this.$container.toggleClass('open')
        this.quicklinks.toggleClass('open')

        this.open = this.quicklinks.hasClass( 'open' )

        _.delay( this.accessible, this.open ? this.DELAY : 0 )
    },

    accessible : function (argument)
    {
        this.$el.find('button').attr( 'aria-expanded', this.open )
        this.quicklinks.attr('aria-hidden',  ( ! this.open ).toString() )
        if ( this.open ){
            this.quicklinks.find('a').attr( 'tabindex', 0 ).first().focus()
            $('#uw-container-inner').attr('aria-hidden', true);
        }
        else{
            this.quicklinks.find('a').attr( 'tabindex', -1 )
            $('#uw-container-inner').attr('aria-hidden', false);
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
