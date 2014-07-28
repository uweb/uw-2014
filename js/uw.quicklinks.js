// This section builds and populates the quicklinks section (off-canvas right)

UW.QuickLink = Backbone.Model.extend({
    has_icon: false,
    classes: [],
});

UW.QuickLinks = Backbone.Collection.extend({

    model: UW.QuickLink,

    initialize: function (args) {
        this.el = args.el;
        this.url = args.url;
        _.bindAll(this, 'use_ajax', 'use_defaults', 'make_view');
        this.fetch({success: this.use_ajax, error: this.use_defaults});
    },

    default_links: [
        {title: 'Maps', url: 'http://uw.edu/maps', classes: ['icon-maps']},
        {title: 'Directories', url: 'http://uw.edu/directory', classes: ['icon-directories']},
        {title: 'Calendar', url: 'http://uw.edu/calendar', classes: ['icon-calendar']},
        {title: 'Libraries', url: 'http://uw.edu/libraries', classes: ['icon-libraries']},
        {title: 'MyUW', url: 'http://myuw.washington.edu', classes: ['icon-myuw']},
        {title: 'UW Today', url: 'http://uw.edu/news', classes: ['icon-uwtoday']},
       ],

    use_ajax: function (holder, response) {
        this.models = [];
        if (Object.keys(response).length === 0){
            this.use_defaults();
        }
        else {
            for (var key in response) {
                this.add_model(response[key]); 
            }
            this.make_view();
        }
    },

    use_defaults: function () {
        this.models = [];
        for (var i = 0; i < this.default_links.length; i++){
            this.add_model(this.default_links[i]);
        }
        this.make_view();
    },

    add_model: function (link) {
        if (link.classes !== 'undefined' && link.classes.length > 0 && link.classes[0] !== '') {
            this.models.push(new this.model({text: link.title, link_url: link.url, classes: link.classes, has_icon: true }));
        }
        else {
            this.models.push(new this.model({text: link.title, link_url: link.url,}));
        }
    },

    make_view: function () {
        this.view = new UW.QuickLinksView({el: this.el, collection: this});
    }
});


UW.QuickLinksView = Backbone.View.extend({

    container: 'div#uw-container',

    menu_item : '<li><% if (classes) { %><span class="<%= classes %>"></span><% } %><a href="<%= url %>"><%= text %></a></li>',

    events: {
       'click': 'animate'
    },

    initialize: function () {
        _.bindAll( this, 'append_menu_item' )
        this.make_drawer();
        this.add_links();
    },

    make_drawer: function () {
        this.$container = $(this.container);
        if (this.$container.length === 0) {
            var $adminbar = $('#wpadminbar');
            UW.$body.children().not('#wpadminbar').not('script').wrapAll('<div id="uw-container"><div id="uw-container-inner"></div></div>');
            this.$container = $(this.container);
        }
        this.$container.prepend("<nav id='quicklinks'><ul id='big_links'></ul></nav>");
        this.$drawer = $('nav#quicklinks');
        this.$list = this.$drawer.find('ul#big_links');
        this.$little_list = false;
    },

    add_links: function () {
        _.each( this.collection.models, this.append_menu_item )
    },

    append_menu_item : function( model )
    {
        item = {
            classes: false,
            url: model.get('link_url'),
            text: model.get('text')
        };
        if (model.get('has_icon')) {
            item.classes = model.get('classes').join(' ');
            this.$list.append( _.template( this.menu_item, item ) );
        }
        else {
            if (!this.$little_list) {
                this.$drawer.append('<h3>Helpful Links</h3><ul id="little_links"></ul>');
                this.$little_list = this.$drawer.find('ul#little_links');
            }
            this.$little_list.append(_.template(this.menu_item, item));
        }
    },

    animate: function () {
        this.$container.toggleClass('open');
        this.$drawer.toggleClass('open');
    }
});
