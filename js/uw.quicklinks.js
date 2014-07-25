UW.QuickLink = Backbone.Model.extend({
});

UW.QuickLinks = Backbone.Collection.extend({

    model: UW.QuickLink,
    url: 'http://128.208.132.98/wordpress/2014/wp-admin/admin-ajax.php?action=quicklinks',

    initialize: function (args) {
        this.el = args.el;
        _.bindAll(this, 'use_ajax', 'use_defaults', 'make_view');
        this.fetch({success: this.use_ajax, error: this.use_defaults});
    },

    default_links: [
        {text: 'Maps', link_url: 'http://uw.edu/maps', classes: ['icon-maps']},
        {text: 'Directories', link_url: 'http://uw.edu/directory', classes: ['icon-directories']},
        {text: 'Calendar', link_url: 'http://uw.edu/calendar', classes: ['icon-calendar']},
        {text: 'Libraries', link_url: 'http://uw.edu/libraries', classes: ['icon-libraries']},
        {text: 'MyUW', link_url: 'http://myuw.washington.edu', classes: ['icon-myuw']},
        {text: 'UW Today', link_url: 'http://uw.edu/news', classes: ['icon-uwtoday']},
       ],

    use_ajax: function (holder, response) {
        if (Object.keys(response).length === 0){
            this.use_defaults();
        }
        else {
            this.models = [];
            for (var key in response) {
                this.models.push(new this.model({text: response[key].title, link_url: response[key].url, classes: response[key].classes}));
            }
            this.make_view();
        }
    },

    use_defaults: function () {
        this.models = [];
        for (var i = 0; i < this.default_links.length; i++){
            this.models.push(new this.model({text: this.default_links.text, link_url: this.default_links.link_url, classes: this.default_links.classes}));
        }
        this.make_view();
    },

    make_view: function () {
        this.view = new UW.QuickLinksView({el: this.el, collection: this});
    }
});


UW.QuickLinksView = Backbone.View.extend({

    container: 'div#uw-container',

    menu_item : '<li><span class="<%= classes %>"></span><a href="<%= url %>"><%= text %></a></li>',

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
        this.$container.prepend("<nav id='quicklinks'><ul></ul></nav>");
        this.$drawer = $('nav#quicklinks');
    },

    add_links: function () {
        this.$list = this.$drawer.find('ul');
        _.each( this.collection.models, this.append_menu_item )
    },

    append_menu_item : function( model )
    {
        item = {
            classes: model.get('classes').join(' '),
            url: model.get('link_url'),
            text: model.get('text')
        };
        this.$list.append( _.template( this.menu_item, item ) )
    },

    animate: function () {
        this.$container.toggleClass('open');
        this.$drawer.toggleClass('open');
    }
});
