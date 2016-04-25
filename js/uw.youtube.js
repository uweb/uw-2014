// ### UW Youtube

// This provides the structure and functionality of the UW Youtube player
// For usage please refer to the [UW Web Youtube Player](http://uw.edu/brand/web/#youtube)
// It can support a single youtube video or playlist embed
// options include max results for playlists, modest youtube branding and default resolution 
// requires a unique id for each div.uw-youtube even if there is just one

//       Single: <div id='some-unique-id' class="uw-youtube" data-uw-youtube='youtube_id_here' data-uw-youtube-type='single'></div>
//       Playlist: <div id='some-unique-id' class="uw-youtube" data-uw-youtube='youtube_playlist_id_here' data-uw-youtube-type='playlist'></div>

UW.YouTube = {};

//the UW.YouTube.Collection object contains data in models that refer to youtube videos
//(alone or in a playlist) and has a view that renders the proper player with the data
UW.YouTube.Collection = Backbone.Collection.extend({

    // Initialize the player embeds
    // once the player type has been determined, get the associated data
    initialize: function (options) {
        _(this).bindAll('parse');
        this.el = options.el;
        this.$el = $(this.el);
        this.youtube_id = this.$el.data('uw-youtube');
        this.setup_for_type();
        this.make_view();
        this.fetch({success: this.view.onDataReady});
    },

    // See if the div.uw-youtube is a playlist or single video
    // setup the proper request and model type
    // setup some other relative parameters
    setup_for_type : function (youtube_id) {
        this.type = this.$el.data('uw-youtube-type');
        this.modest = this.$el.data('modest');
        this.resolution = this.$el.data('resolution');
        if (this.type == 'playlist'){
            this.max_results = 20;
            var max_results_temp = parseInt(this.$el.data('max-results'), 10);
            if (max_results_temp > 0) {
                this.max_results = max_results_temp;
            }
            this.model = UW.YouTube.PlaylistItem;
            this.url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=' + this.youtube_id + '&key=AIzaSyApmhFr5oa8bmKPcpN7bm-h0mekjkUVypU&maxResults=' + this.max_results;
        }
        else if (this.type == 'single') {
            this.model = UW.YouTube.Video;
            this.url = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + this.youtube_id + '&key=AIzaSyApmhFr5oa8bmKPcpN7bm-h0mekjkUVypU';
        }
    },

    // organize useful information from the ajax request
    parse: function (response) {
        var type = this.type, youtube_id = this.youtube_id;
        return _(response.items).map(function (item) {
            if (type == 'single'){
                item.snippet.resourceId = {videoId: youtube_id};
            }
            return item.snippet;
        });
    },
    
    // make the view at the proper time
    make_view: function (type) {
        this.view = new UW.YouTube.CollectionView({collection: this});
    },

});

// The CollectionView builds the html for the player and the control structure for the vidoes
UW.YouTube.CollectionView = Backbone.View.extend({
    
    // template that all videos get
    template : "<div class='nc-video-player' role='region' aria-label='video' tabindex=-1><div class='tube-wrapper'></div></div>",

    // playist section html that only playlists get
    playlist_section : "<div class='vidSmall'><div class='scrollbar'><div class='track'><div class='thumb'><div class='end'></div></div></div></div><div class='viewport'><div class='vidContent overview'><ul></ul></div></div></div>",

    //event handlers for the templated html
    events: {
        'click button': 'preview_clicked'
    },

    // set up the view for this collection
    // add the youtube iframe api if necessary
    // add the templates
    initialize: function () {
        _(this).bindAll('onReady', 'onDataReady', 'onStateChange', 'preview_clicked', 'resized');
        this.player_ready = false;
        this.data_ready = false;
        this.wrap();
        this.add_iFrame_api();
        if (this.collection.type == 'playlist'){
            this.$el.addClass('playlist');
            this.add_playlist_section();
            this.scrollbar_visible = false;
            $(window).resize(this.resized);
        }
    },

    // a resize handler for playlists. Handles the edge case of when a container
    // is resized to be too small for the list and therefor requires a scrollbar
    // when none is present or vice versa
    resized: function() {
        var viewport_new_width = this.$vidSmall.find('.viewport').width();
        if (viewport_new_width != this.$viewport_width){
            this.$viewport_width = viewport_new_width;
            this.showTinyScrollbar();
        }
    },

    // wraps our collection in the main template and saves references to the container
    wrap: function () {
        this.collection.$el.wrap($(this.template));
        this.$el = this.collection.$el.parents('.nc-video-player');  //unattached jquery object won't wrap right if we add possible playlist section first
        this.el = this.$el[0];
    },

    // if we don't have a copy of the youtube iframe api yet. add it
    add_iFrame_api: function () {
        if (UW.$body.find('script#iFrame').length === 0){
            UW.$body.append('<script id="iFrame" src="//www.youtube.com/player_api" type="text/javascript"></script>');
            this.add_iFrame_function();
        }
    },

    // at this point, all the collections should be created.
    // Each gets a uwplayer variable that is a YT.Player corresponding to the collection
    add_iFrame_function: function () {
        window.onYouTubeIframeAPIReady = function() {
            for (var i = 0, length = UW.youtube.length; i < length; i++){
                var collection = UW.youtube[i], player_vars = {};
                // if the collection desires no youtube branding, set these parameters
                if (collection.modest) {
                    player_vars = {
                        'rel'           : 0,
                        'controls'      : 0,
                        'modestbranding': 1,
                    }
                }
                // if (collection.resolution !== 'undefined'){
                //     player_vars.VQ = collection.resolution;
                // }
                //attach the YT.player to the relevant view, each view gets one
                collection.view.uwplayer = new YT.Player(collection.$el.attr('id'), {
                    videoId: '',
                    playerVars: player_vars,
                    events: {
                        //these events will call functions in the relevant view
                        'onReady': collection.view.onReady,
                        'onStateChange': collection.view.onStateChange
                    }
                });
            }
        };
    },

    // This function is called if the collection is a playlist
    // adds the playlist section
    add_playlist_section : function () {
        this.$el.append(this.playlist_section);
        this.$vidSmall = this.$el.find('.vidSmall');
        this.$vidContent = this.$el.find('.vidContent');
        this.scrollbar_visible = false;
    },

    // this is the callback for when the youtube iframe api is ready to go
    // checks to see if the data is ready too
    onReady: function () {
        this.player_ready = true;
        this.check_all_ready();
    },

    // this is the callback for whne the data is loaded into the models
    // preps the playlist area if its a playlist
    // checks to see if the iframe api is ready
    onDataReady: function () {
        this.data_ready = true;
        if (this.collection.type == 'playlist'){
            this.$vidContent_width = this.collection.models.length * 135
            this.$vidContent.width(this.$vidContent_width + 'px');
            this.$viewport_width = this.$vidSmall.find('.viewport').width();
            this.showTinyScrollbar();
        }
        this.check_all_ready();
    },

    // this function shows the tiny scrollbar.
    showTinyScrollbar: function () {
        if (this.$vidContent_width > this.$viewport_width){
            if (!this.scrollbar_visible) {
                this.$vidSmall.find('.scrollbar').show();
                this.$vidSmall.tinyscrollbar({axis: 'x'});
                this.scrollbar_visible = true;
            }
        }
        else if (this.scrollbar_visible){
            this.$vidSmall.find('.scrollbar').removeAttr('style');
            this.scrollbar_visible = false;
        }
    },

    // this function checks the state of data/player to prevent a race case.
    // Both the data and the player must be ready to go.  Then we play the correct video
    check_all_ready: function() {
        if (this.data_ready && this.player_ready){
            this.play(this.collection.models[0].get('resourceId').videoId);
        } 
    },

    // when the player changes state, this is run.
    // Currently stuff only happens if this is a playlist
    // TODO: add a publicly visible event on video end for showcase pages
    onStateChange: function (event) {
        if (this.is_playlist) { 
            //event.data is 0 when a video finishes playing.  Find out what video we just finished, then play the next one or loop back to the beginning of the playlist
            if (event.data === 0) {
                var video = this.$vidContent.find('.vid-active').attr('id');
                var index = this.video_ids.indexOf(video);
                if (index < this.video_ids.length - 1) {
                    this.play(this.video_ids[index + 1]);
                }
                else {
                    this.play(this.video_ids[0]);
                }
            }
        }
    },

    // play the video id passed. If 'playnow' not passed, assume false.
    // If 'playnow' is true play the video, otherwise just cue it up
    play: function (id, playnow){
        playnow = playnow || false;
        if (playnow) {
            this.uwplayer.loadVideoById(id);
            this.$el.focus();
        }
        else {
            this.uwplayer.cueVideoById(id);
        }
        //If this is a playlist we must also manipulate the placeholder drawer.  Move the selected video's placeholder to the front if we can, otherwise move the listas far as we can without creating whitespace.  Then visually distinguish the selected video's placeholder
        if (this.collection.type == 'playlist') {
            this.$el.find('a.vid-active').removeClass('vid-active');
            var $small = $('#' + id);
            $small.addClass('vid-active');
            this.$el.attr('aria-label', 'video: ' + $small.data('title'));
            if (this.scrollbar_visible){
                var leftpos = $small.position().left;
                if (this.$vidContent_width - leftpos < this.$viewport_width){
                    leftpos = this.$vidContent_width - this.$viewport_width;
                }
                this.$vidContent.animate({left: -leftpos}, 500);
                this.$vidSmall.data('plugin_tinyscrollbar').update(leftpos);
            }
        }
    },

    // this fires if a video preview in the playlist area is clicked
    preview_clicked: function (event) {
        this.play(event.currentTarget.id, true);
    }
});


// Video is a model for a single video
UW.YouTube.Video = Backbone.Model.extend({
    initialize: function () {
        if (this.get('resourceId')){
            this.view = new UW.YouTube.VideoView({model: this});
        }
    }
});

// Video View is a view for single video. Currently does nothing
UW.YouTube.VideoView = Backbone.View.extend({
    //template: underscore + html string here,
    
    initialize: function () {
        this.render();
    },

    render: function () {
        this.model.collection.view.$el.attr('aria-label', 'video: ' + this.model.get('title'));
        //var item = this.model.toJSON();
        //var small_vid = _.template(this.template, item);
        //this.model.collection.view.$vidSmall.append(small_vid);
    }
});

// PlaylistItem is the model for a video in a playlist
UW.YouTube.PlaylistItem = Backbone.Model.extend({

    // if the video is a real video and not an error code, make a view
    initialize: function () {
        if (this.get('resourceId')){
            this.view = new UW.YouTube.PlaylistItemView({model:this});
        }
    },
});

// PlaylistItemView is the view for a playlist item
UW.YouTube.PlaylistItemView = Backbone.View.extend({

    // this is the template for a playlist item preview
    // goes inside the playlist section
    template: "<li><button id='<%= resourceId.videoId %>' data-title='<%= title %>' class='video'><img src='<%= thumbnails.default.url %>'/><div class='text'><p class='title'><%= title %></p></div></button></li>",

    // preps the $el and renders
    initialize: function () {
        this.$el = this.model.collection.view.$vidContent.find('ul');
        this.render();
    },

    // gets the data ready, templates it, then appends to the playlist section
    render: function () {
        var item = this.model.toJSON();
        var small_vid = _.template(this.template)( item );
        this.$el.append(small_vid);
    },
});
