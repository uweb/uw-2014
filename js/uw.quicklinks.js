// This section builds and populates the quicklinks section (off-canvas right)

UW.QuickLinks = Backbone.View.extend({

    // todo: the default list and these elements could be put into the php templates
    container: 'div#uw-container',
    $little_list_header: $('<h3>Helpful Links</h3>'),
    $drawer: $("<nav id='quicklinks' role='navigation' aria-label='quick links'></nav>"),
    $big_list: $('<ul id="big_links"></ul>'),
    $little_list: $('<ul id="little_list"></ul>'),

    template : '<li><% if (classes) { %><span class="<%= classes %>"></span><% } %><a href="<%= url %>" tabindex="-1"><%= title %></a></li>',

    events: {
       'click' : 'animate',
       'touchstart'  : 'animate',
       'keyup'        : 'keyup',
    },

    initialize: function ( options ) {
        _.bindAll( this, 'render', 'append_menu_item', 'close_quicklinks', 'focused', 'blurred', 'button_blur', 'keyup' );
        this.links = new UW.QuickLinks.Collection( options )
        this.links.on( 'sync', this.render )
        this.$button = this.$el.find('button');
        this.$button.blur(this.button_blur);
    },

    render : function(  )
    {
        this.links.each( this.append_menu_item )
        // todo: may put the drawer directly in the theme
        this.make_drawer()
        this.add_lists()
        // this.setElement( this.$drawer )
    },

    make_drawer: function () {
        UW.$body.children().not('#wpadminbar').not('script').wrapAll('<div id="uw-container"><div id="uw-container-inner"></div></div>');
        this.$container = $(this.container);
    },

    close_quicklinks: function (event) {
        if (event.type == 'keyup'){
            if (event.keyCode == 27) {
                this.$button.focus();
                this.blurred();
                this.animate(event);
            }
        }
        else if (this.$container.hasClass('open') && (event.target.parentElement != this.el) && (!this.is_focused)) {
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

    add_lists : function () {
        if (this.$big_list.find('li').length > 0) {
            this.$drawer.append(this.$big_list);
        }
        if (this.$little_list.find('li').length > 0) {
            this.$drawer.append(this.$little_list_header);
            this.$drawer.append(this.$little_list);
        }
        this.$links = this.$drawer.find('li a');
        this.add_events();
        this.$container.prepend(this.$drawer);
    },

    add_events: function () {
        $('#uw-container-inner').on( {
            'click': this.close_quicklinks,
        });
        this.$links.on( {'keyup': this.close_quicklinks});
        var self = this;
        this.$links.last().blur(function () {
            self.$button.focus();
        });
    },

    reset: function () {
        this.clear_lists();
        this.clear_drawer();
    },

    clear_lists: function () {
        this.$little_list.html('');
        this.$big_list.html('');
    },

    clear_drawer: function () {
        this.$drawer.html('');
    },

    animate: function (event) {
        if(!this.is_focused){
            event.preventDefault();
            this.$container.toggleClass('open');
            this.$drawer.toggleClass('open');
        }
    },

    keyup: function (event) {
        if (event.keyCode == 13) {
            if (this.is_focused) {
                this.blurred();
            }
            else {
                _.delay(this.focused, 300);
            }
            this.animate(event);
        }
    },

    focused: function () {
        this.is_focused = true;
        this.$links.attr('tabindex', 0);
        this.$links.first().focus();
    },

    blurred: function (event) {
        this.is_focused = false;
        this.$links.attr('tabindex', -1);
    },

    button_blur: function (event) {
        if(this.is_focused){
            this.$links.first().focus();
        }
    }
});

UW.QuickLinks.Model = Backbone.Model.extend({});

UW.QuickLinks.Collection = Backbone.Collection.extend({

    model: UW.QuickLinks.Model,

    initialize: function ( options ) {
        // _.bindAll(this, 'parse', 'make_view');
        this.url = options.url;
        //refusal to execute the ajax request isn't handled here.  Looks like it should be, but it isn't
        this.fetch()
    },

    //pull this out of the collection?
    // default_links: [
    //     {title: 'Maps', url: 'http://uw.edu/maps', classes: ['icon-maps']},
    //     {title: 'Directories', url: 'http://uw.edu/directory', classes: ['icon-directories']},
    //     {title: 'Calendar', url: 'http://uw.edu/calendar', classes: ['icon-calendar']},
    //     {title: 'Libraries', url: 'http://uw.edu/libraries', classes: ['icon-libraries']},
    //     {title: 'MyUW', url: 'http://myuw.washington.edu', classes: ['icon-myuw']},
    //     {title: 'UW Today', url: 'http://uw.edu/news', classes: ['icon-uwtoday']},
    //    ],

});
