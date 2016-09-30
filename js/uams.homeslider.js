UAMS.HomepageSlider = Backbone.View.extend({
    slides: ".uams-homepage-slider",
    headline: ".next-headline",
    template: '<button class="next-headline slide-<%= slide %>" style="display:block;"><span>NEXT</span><%= title %></button>',
    events: {
        "click .next-headline": "nextSlide",
        "click #pause": "pauseVideo"
    },
    initialize: function(a) {
        _.bindAll(this, "render", "nextSlide", "changeNextArticle"),
        this.count = this.$el.children(this.slides).length,
        this.prep_slides(),
        this.showNextHeadline(),
        this.changeNextArticle(!1)
    },
    prep_slides: function() {
        for (var a, b = $(this.slides), c = 0; c < b.length; c++)
            a = b.eq(c),
            a.find("a.uams-btn").attr("aria-describedby", a.find("h3").attr("id"));
        b.hide(),
        b.last().show()
    },
    nextSlide: function(a) {
        var b = this.$el.children(this.slides).last();
        b.fadeOut(),
        this.rotateSlides(b),
        this.$el.children(this.slides).last().fadeIn().find("a").focus(),
        $(window).width() > 767 && $(".uams-homepage-slider-container video").each(function(a) {
            "none" != this.parentElement.style.display && this.play()
        })
    },
    rotateSlides: function(a) {
        a.insertBefore(a.siblings(this.slides).first()),
        this.changeNextArticle(!0)
    },
    showNextHeadline: function() {
        this.$el.find(this.headline).show()
    },
    changeNextArticle: function(a) {
        this.$el.find(this.headline).replaceWith(this.render),
        a && this.$el.find("button").focus()
    },
    pauseVideo: function() {
        var a = $("#bgVideo")
          , b = $("#pause");
        a.get(0).paused ? (a.get(0).play(),
        b.html("Pause moving background")) : (a.get(0).pause(),
        b.html("Play moving background")),
        this.$el.toggleClass("paused")
    },
    render: function() {
        var a = this.$el.children(this.slides).eq(this.count - 2);
        return _.template(this.template, {
            title: a.find("h3").text(),
            slide: a.data().id
        })
    },
    testBrowser: function() {
        var a = navigator.userAgent.toLowerCase();
        if (-1 != a.indexOf("safari") && -1 == a.indexOf("chrome"))
            ;
    }
})
