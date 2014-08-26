// This section builds and populates the quicklinks section (off-canvas right)

UW.QuickLink = Backbone.Model.extend({
    defaults: {
        has_icon: false,
        classes: ''
    },
    
    initialize: function () {
        //hacktacular.  Need to stop the collection making a model with url = collection.url somehow
        if (this.get('link_url') !== undefined){
            this.create_view();
        }
    },

    create_view: function () {
        this.view = new UW.QuickLinkView({model: this});
    }
});

UW.QuickLinkView = Backbone.View.extend({
    menu_template : '<li><% if (classes) { %><span class="<%= classes %>"></span><% } %><a href="<%= link_url %>"><%= title %></a></li>',

    initialize: function () {
        this.create_menu_item();
    },

    create_menu_item : function ()
    {
        item = this.model.toJSON();
        this.$menu_item = $(_.template( this.menu_template, item ));
    }
});


UW.QuickLinks = Backbone.Collection.extend({

    model: UW.QuickLink,

    initialize: function (args) {
        this.el = args.el;
        this.url = args.url;
        _.bindAll(this, 'parse', 'make_view');
        this.create_models();
        this.make_view();
        //refusal to execute the ajax request isn't handled here.  Looks like it should be, but it isn't
        this.fetch({success: this.view.build});
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

    create_models: function () {
        for (var i = 0; i < this.default_links.length; i++){
            this.add(this.normalize_data(this.default_links[i]));
        }
    },
    
    normalize_data: function (holder) {
        holder.link_url = holder.url;
        delete holder.url;
        if (holder.classes !== 'undefined'){
            holder.classes = holder.classes.join(' ');
            if (holder.classes !== '') {
                holder.has_icon = true;
            }   
        }
        return holder;
    },

    parse: function (response) {
        if (Object.keys(response).length !== 0){
            this.view.reset();
            var model_data = [];
            for (var key in response) {
                model_data.push(this.normalize_data(response[key]));
            }
            return model_data;
        }
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


    events: {
       'mouseover': 'animate',
       'touchstart': 'animate'
    },

    initialize: function () {
        _.bindAll( this, 'append_menu_item', 'build', 'inner_container_click' );
        this.make_drawer();
        this.build();
    },

    build: function () {
        this.add_links();
        this.add_lists();
    },

    make_drawer: function () {
        this.$container = $(this.container);
        if (this.$container.length === 0) {
            var $adminbar = $('#wpadminbar');
            UW.$body.children().not('#wpadminbar').not('script').wrapAll('<div id="uw-container"><div id="uw-container-inner"></div></div>');
            this.$container = $(this.container);
            $('#uw-container-inner').on( {
                'mouseover': this.inner_container_click,
                'touchstart': this.inner_container_click
            });
        }
    },

    inner_container_click: function (event) {
        if (this.$container.hasClass('open') && (event.target.parentElement != this.el)) {
            this.animate(event);
        }
    },

    add_links: function () {
        _.each( this.collection.models, this.append_menu_item )
    },

    append_menu_item: function (model) {
        if (model.get('has_icon')) {
            this.$big_list.append(model.view.$menu_item);
        }
        else {
            this.$little_list.append(model.view.$menu_item);
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
        event.preventDefault();
        this.$container.toggleClass('open');
        this.$drawer.toggleClass('open');
    }
});
