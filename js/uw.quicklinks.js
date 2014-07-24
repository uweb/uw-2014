UW.QuickLink = Backbone.Model.extend({
});

UW.QuickLinks = Backbone.Collection.extend({

    model: UW.QuickLink,
    models: [],
    url: 'http://128.208.132.98/wordpress/2014/wp-admin/admin-ajax.php?action=quicklinks',

    initialize: function () {
        console.log('initializing quicklinks');
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

    use_ajax: function (response) {
        console.log(response);
        if (Object.keys(response).length === 0){
            this.use_defaults();
        }
        else {
            for (var key in response) {
                this.models.append(new this.model({text: response.key.title, link_url: response.key.url, classes: response.key.classes}));
            }
            this.make_view();
        }
    },

    use_defaults: function () {
        for (var i = 0; i < this.default_links.length; i++){
            this.models.append(new this.model({text: this.default_links.text, link_url: this.default_links.link_url, classes: this.default_links.classes}));
        }
        this.make_view();
    },

    make_view: function () {
        console.log('making view');
    }
});


UW.QuickLinksView = Backbone.View.extend({

    container: 'div#uw-container',

    menu_item : '<li><span class="icon-<%= icon %>"></span><a href="<%= url %>"><%= text %></a></li>',

    //not working
    events: {
      //  'click li.uw-quicklinks': 'animate'
       'click': 'animate'
    },

    initialize: function () {
        _.bindAll( this, 'append_menu_item' )
        this.make_drawer();
        this.add_links();
        // this.bind_click();
    },

    make_drawer: function () {
        this.$container = $(this.container);
        if (this.$container.length === 0) {
            var $adminbar = $('#wpadminbar');
            UW.$body.children().not('#wpadminbar').not('script').wrapAll('<div id="uw-container"><div id="uw-container"></div></div>');
            this.$container = $(this.container);
        }
        this.$container.prepend("<nav id='quicklinks'><ul></ul></nav>");
        this.$drawer = $('nav#quicklinks');
        //create element (will be nav#quicklinks_drawer)
        //add element to right place.  Will be on the right, 50% off canvas, overflow of body hidden.  Container covering the other half
    },

    add_links: function () {
        this.$list = this.$drawer.find('ul');
        _.each( this.links, this.append_menu_item )
        // for (var i = 0; i < this.links.length; i++){
        //     this.$list.append('<li><a href="' + this.links[i].url + '">' + this.links[i].text + '</a></li>');
        // }
        //add default links from javascript
        //unless we can get the new menu from ajax
    },

    append_menu_item : function( item )
    {
        this.$list.append( _.template( this.menu_item, item ) )
    },

    // bind_click: function () {
    //     var quicklinks_view = this;
    //     $('li.uw-quicklinks a').click(function(e) {
    //         e.preventDefault();
    //         quicklinks_view.animate();
    //     });
    // },

    animate: function () {
        // console.log('animating');
        this.$container.toggleClass('open');
        this.$drawer.toggleClass('open');
        //if not open:
        //slide body/container over amount of width of nav#quicklinks_drawer and dim it
        //slide quicklinks over the proper location (fully revealed)
        //turn the + in the button 45deg
        //else:
        //undo all that
    }
});


