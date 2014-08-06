UW.YouTube = {};

UW.YouTube.Collection = Backbone.Collection.extend({

    initialize: function (options) {
        _(this).bindAll('parse');
        this.el = options.el;
        this.$el = $(this.el);
        this.youtube_id = this.$el.data('uw-youtube');
        this.setup_for_type();
        this.make_view();
        //this.extend(window.onYouTubeIframeAPIReady);  // not so easy as just that, but that's the idea
        this.fetch({success: this.view.onDataReady});
    },

    setup_for_type : function (youtube_id) {
        this.type = this.$el.data('uw-youtube-type');
        if (this.type == 'playlist'){
            this.model = UW.YouTube.PlaylistItem;
            this.url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=' + this.youtube_id + '&key=AIzaSyApmhFr5oa8bmKPcpN7bm-h0mekjkUVypU';
        }
        else if (this.type == 'single') {
            this.model = UW.YouTube.Video;
            this.url = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + this.youtube_id + '&key=AIzaSyApmhFr5oa8bmKPcpN7bm-h0mekjkUVypU';
        }
    },

    parse: function (response) {
        var type = this.type, youtube_id = this.youtube_id;
        return _(response.items).map(function (item) {
            if (type == 'single'){
                item.snippet.resourceId = {videoId: youtube_id};
            }
            return item.snippet;
        });
    },
    
    make_view: function (type) {
        this.view = new UW.YouTube.CollectionView({collection: this});
    },

});

UW.YouTube.CollectionView = Backbone.View.extend({
    
    template : "<div class='nc-video-player'><div class='tube-wrapper'></div></div>",
    playlist_section : "<div class='vidSmall'><div class='scrollbar'><div class='track'><div class='thumb'><div class='end'></div></div></div></div><div class='viewport'><div class='vidContent overview'></div></div></div>",

    events: {
        'click a': 'preview_clicked'
    },

    initialize: function () {
        _(this).bindAll('onReady', 'onDataReady', 'onStateChange', 'preview_clicked');
        this.player_ready = false;
        this.data_ready = false;
        this.wrap();
        this.add_iFrame_api();
        if (this.collection.type == 'playlist'){
            this.add_playlist_section();
        }
    },

    wrap: function () {
        this.collection.$el.wrap($(this.template));
        this.$el = this.collection.$el.parents('.nc-video-player');  //unattached jquery object won't wrap right if we add possible playlist section first
        this.el = this.$el[0];
    },

    add_iFrame_api: function () {
        if (UW.$body.find('script#iFrame').length === 0){
            UW.$body.append('<script id="iFrame" src="//www.youtube.com/player_api" type="text/javascript"></script>');
            this.add_iFrame_function();
        }
    },

    add_iFrame_function: function () {
        window.onYouTubeIframeAPIReady = function() {
            for (var i = 0, length = UW.youtube.length; i < length; i++){
                var collection = UW.youtube[i];
                //attach the YT.player to the relevant view, each view gets one
                collection.view.uwplayer = new YT.Player(collection.$el.attr('id'), {
                    videoId: '',
                    events: {
                        //these events will call functions in the relevant view
                        'onReady': collection.view.onReady,
                        'onStateChange': collection.view.onStateChange
                    }
                });
            }
        };
    },

    add_playlist_section : function () {
        this.$el.append(this.playlist_section);
        this.$vidSmall = this.$el.find('.vidSmall');
        this.$vidContent = this.$el.find('.vidContent');
    },

    onReady: function () {
        this.player_ready = true;
        this.check_all_ready();
    },

    onDataReady: function () {
        this.data_ready = true;
        this.check_all_ready();
    },

    //this function checks the state of data/player to prevent a race case. Both the data and the player must be ready to go.  Then we play the correct video
    check_all_ready: function() {
        if (this.data_ready && this.player_ready){
            this.play(this.collection.models[0].get('resourceId').videoId);
        } 
    },

    //when the player changes state, this is run.  Currently stuff only happens if this is a playlist
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

    //play the video id passed.  If 'playnow' not passed, assume false.  If 'playnow' is true play the video, otherwise just cue it up
    play: function (id, playnow){
        playnow = playnow || false;
        if (playnow) {
            this.uwplayer.loadVideoById(id);
        }
        else {
            this.uwplayer.cueVideoById(id);
        }
        //If this is a playlist we must also manipulate the placeholder drawer.  Move the selected video's placeholder to the front if we can, otherwise move the listas far as we can without creating whitespace.  Then visually distinguish the selected video's placeholder
        if (this.collection.type == 'playlist') {
            var $small = $('#' + id);
            var leftpos = $small.position().left, $viewport = this.$vidSmall.find('.viewport');
            this.$el.find('a.vid-active').removeClass('vid-active');
            if (this.$vidContent.width() - leftpos < $viewport.width()){
                leftpos = this.$vidContent.width() - $viewport.width();
            }
            this.$vidContent.animate({left: -leftpos}, 500);
            //currently not used because tinyscrollbar isn't added: this.$vidSmall.tinyscrollbar_update(leftpos);
            $small.addClass('vid-active');
        }
    },

    preview_clicked: function (event) {
        this.play(event.currentTarget.id, true);
    }
});

UW.YouTube.Video = Backbone.Model.extend({
    initialize: function () {
        if (this.get('resourceId')){
            this.view = new UW.YouTube.VideoView({model: this});
        }
    }
});

UW.YouTube.VideoView = Backbone.View.extend({
    //template: underscore + html string here,
    
    initialize: function () {
        this.render();
    },

    render: function () {
        var item = this.model.toJSON();
        //var small_vid = _.template(this.template, item);
        //this.model.collection.view.$vidSmall.append(small_vid);
    }
});

UW.YouTube.PlaylistItem = Backbone.Model.extend({
    initialize: function () {
        if (this.get('resourceId')){
            this.view = new UW.YouTube.PlaylistItemView({model:this});
        }
    },
});

UW.YouTube.PlaylistItemView = Backbone.View.extend({
    template: "<li><a id='<%= resourceId.videoId %>' class='video'><img src='<%= thumbnails.default.url %>'/><div class='text'><p class='title'><%= title %></p></div></a></li>",

    initialize: function () {
        this.$el = this.model.collection.view.$vidSmall;
        this.render();
    },


    render: function () {
        var item = this.model.toJSON();
        var small_vid = _.template(this.template, item);
        this.$el.append(small_vid);
    },
});
