UW.QuickLinks = Backbone.View.extend({

    links: [
        {text: 'Maps', url: 'http://uw.edu/maps', icon: 'maps'},
        {text: 'Directories', url: 'http://uw.edu/directory', icon: 'directories'},
        {text: 'Calendar', url: 'http://uw.edu/calendar', icon: 'calendar'},
        {text: 'Libraries', url: 'http://uw.edu/libraries', icon: 'libraries'},
        {text: 'MyUW', url: 'http://myuw.washington.edu', icon: 'myuw'},
        {text: 'UW Today', url: 'http://uw.edu/news', icon: 'uwtoday'},
       ],

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
            UW.$body.children().not('#wpadminbar').not('script').wrapAll('<div id="uw-container"></div>');
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
