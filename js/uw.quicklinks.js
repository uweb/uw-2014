UW.QuickLinks = Backbone.View.extend({
    
    links: [
        {text: 'Maps', url: 'http://uw.edu/maps', image: false},
        {text: 'Directories', url: 'http://uw.edu/directory', image: false},
        {text: 'Calendar', url: 'http://uw.edu/calendar', image: false},
        {text: 'Libraries', url: 'http://uw.edu/libraries', image: false},
        {text: 'MyUW', url: 'http://myuw.washington.edu', image: false},
        {text: 'UW Today', url: 'http://uw.edu/news', image: false},
       ], 

    container: 'div#uw-container',
    
    //not working
    //events: {
    //    'click li.uw-quicklinks': 'animate'
    //},

    initialize: function () {
        this.make_drawer();
        this.add_links();
        this.bind_click();
    },

    make_drawer: function () {
        this.$container = $(this.container);
        if (this.$container.length === 0) {
            $('body').wrapInner("<div id='uw-container'></div>");
            this.$container = $(this.container);
        }
        this.$container.append("<nav id='quicklinks'><ul></ul></nav>");
        this.$drawer = $('nav#quicklinks');
        //create element (will be nav#quicklinks_drawer)
        //add element to right place.  Will be on the right, 50% off canvas, overflow of body hidden.  Container covering the other half
    },

    add_links: function () {
        this.$list = this.$drawer.find('ul');
        for (var i = 0; i < this.links.length; i++){
            this.$list.append('<li><a href="' + this.links[i].url + '">' + this.links[i].text + '</a></li>');
        }
        //add default links from javascript
        //unless we can get the new menu from ajax
    },

    bind_click: function () {
        var quicklinks_view = this;
        $('li.uw-quicklinks a').click(function(e) {
            e.preventDefault();
            quicklinks_view.animate();
        });
    },  

    animate: function () {
        console.log('animating');
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
