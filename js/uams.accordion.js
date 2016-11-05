// ### UAMS Accordion

// This creates a UAMS Accordion
// For usage, refer to the [UAMS Web Components webpage](http://uw.edu/brand/web#accordion)

UAMS.Accordion = Backbone.View.extend({

    //what element becomes an accordion
    el: '.uams-accordion',

    events: {
        'click h3' : 'animate'
    },

    initialize: function () {
        _.bindAll(this, 'animate');
        this.$el.find('h3').addClass('inactive');
        this.$el.find('div').addClass('inactive');
    },

    animate: function (e) {
        var $target = $(e.target);
        if ($target.hasClass('inactive')) {
            this.$el.find('h3.active').removeClass('active').addClass('inactive');
            this.$el.find('div.active').animate({height: '0px'}, 500, function () {
                var $this = $(this);
                $this.removeClass('active').addClass('inactive');
                $this.removeAttr('style');
            });
            $target.removeClass('inactive').addClass('active');
            var $next = $target.next('div.inactive');
            $next.removeClass('inactive').addClass('active');
            var $next_height = $next.outerHeight(true);
            $next.removeClass('active');
            $next.animate({height: $next_height}, 500, function() {
                $next.addClass('active');
                $next.removeAttr('style');
            });
        }
        else {
            $target.removeClass('active').addClass('inactive');
            $target.next('div.active').animate({height: '0px'}, 500, function () {
                var $this = $(this);
                $this.removeClass('active').addClass('inactive');
                $this.removeAttr('style');
            });
        }
    },
});
