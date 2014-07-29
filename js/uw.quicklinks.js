// This section builds and populates the quicklinks section (off-canvas right)

UW.QuickLink = Backbone.Model.extend({
    defaults: {
        has_icon: false,
        classes: ''
    },
});

UW.QuickLinks = Backbone.Collection.extend({

    model: UW.QuickLink,

    initialize: function (args) {
        this.el = args.el;
        this.url = args.url;
        _.bindAll(this, 'parse', 'make_view');
        //refusal to execute the ajax request isn't handled here.  Looks like it should be, but it isn't
        this.fetch({success: this.make_view});
    },

    //pull this out of the collection?
    default_links: [
        {title: 'Maps', url: 'http://uw.edu/maps', classes: ['icon-maps']},
        {title: 'Directories', url: 'http://uw.edu/directory', classes: ['icon-directories']},
        {title: 'Calendar', url: 'http://uw.edu/calendar', classes: ['icon-calendar']},
        {title: 'Libraries', url: 'http://uw.edu/libraries', classes: ['icon-libraries']},
        {title: 'MyUW', url: 'http://myuw.washington.edu', classes: ['icon-myuw']},
        {title: 'UW Today', url: 'http://uw.edu/news', classes: ['icon-uwtoday']},
       ],

    parse: function (response) {
        if (Object.keys(response).length === 0){
            response = this.default_links;
        }
        var model_data = [];
        var holder;
        for (var key in response) {
            holder = response[key];
            holder.link_url = holder.url;
            delete holder.url;
            if (holder.classes !== 'undefined'){
                holder.classes = holder.classes.join(' ');
                if (holder.classes !== '') {
                    holder.has_icon = true;
                }
            }
            model_data.push(holder); 
        }
        return model_data;
    },

    make_view: function () {
        this.view = new UW.QuickLinksView({el: this.el, collection: this});
    }
});


UW.QuickLinksView = Backbone.View.extend({

    container: 'div#uw-container',
    $little_list_header: $('<h3>Helpful Links</h3>'),
    $drawer: $("<nav id='quicklinks'></nav>"),
    $big_list: $('<ul id="big_links"></ul>'),
    $little_list: $('<ul id="little_list"></ul>'),

    menu_item : '<li><% if (classes) { %><span class="<%= classes %>"></span><% } %><a href="<%= link_url %>"><%= title %></a></li>',

    events: {
       'click': 'animate'
    },

    initialize: function () {
        _.bindAll( this, 'append_menu_item' )
        this.make_drawer();
        this.add_links();
        this.add_lists();
    },

    make_drawer: function () {
        this.$container = $(this.container);
        if (this.$container.length === 0) {
            var $adminbar = $('#wpadminbar');
            UW.$body.children().not('#wpadminbar').not('script').wrapAll('<div id="uw-container"><div id="uw-container-inner"></div></div>');
            this.$container = $(this.container);
        }
    },

    add_links: function () {
        _.each( this.collection.models, this.append_menu_item )
    },

    append_menu_item : function( model )
    {
        item = model.toJSON();
        if (item.has_icon) {
            this.$big_list.append( _.template( this.menu_item, item ) );
        }
        else {
            this.$little_list.append(_.template(this.menu_item, item));
        }
    },

    add_lists : function () {
        if (this.$big_list.find('li').length > 0) {
            this.$drawer.append(this.$big_list);
        }
        if (this.$little_list.find('li').length > 0) {
            this.$drawer.append(this.$little_list_header);
            this.$drawer.append(this.$little_list);
        }
        this.$container.prepend(this.$drawer);
    },

    animate: function () {
        this.$container.toggleClass('open');
        this.$drawer.toggleClass('open');
    }
});
