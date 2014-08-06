// This function creates a UW Video Player
// For usage please refer to the [UW Web Components Video Player](http://uw.edu/brand/web/#player)

//       <div class="uw-youtube" data-uw-youtube="PL16B6B9F5C0C7C9E5" data-uw-player-type="playlist"> puts in playlist
//       <div class="uw-youtube" data-uw-youtube="z6kgvhG3AkI" data-uw-player-type="single"> puts in single video
//       Both have the same controls.  A unique id for each div is required


//this is the model for individual players, either video or playlist
UW.PlayerModel = Backbone.Model.extend({

    initialize: function() {
        this.make_view();
        //if we've got a playlist, we need to get all videos in it
        if (this.get('type') == 'playlist'){
            this.urlRoot = '//gdata.youtube.com/feeds/api/playlists/' + this.get('v_id') + '/?v=2&alt=json&callback=?';
            this.fetch();
        }
        //otherwise, we can assume its a single video and get the player ready right now
        else {
            this.view.prep_player();
        }
    },

    //There's only a json to fetch if its a playlist
    parse: function(response) {
        this.set('videos', response.feed.entry);
        this.view.prep_player();
    },

    //Creates the view, and sets the view's model attribute back here for easy reference
    make_view: function() {
        this.view = new UW.PlayerView({model: this});
    }

});


//this is the collection of player objects. It is acutally initialized first and creates its models based on info from the dom
UW.PlayerCollection = Backbone.Collection.extend({ 
    
    initialize: function() {
        //all of these divs become youtube players
        this.divs = $('.uw-youtube');
        this.make_models();
        //don't bother loading the api if we don't have any target div
        if (this.divs.length > 0) {
            this.load_api();
        }
    },

    make_models: function() {
        for (var i = 0, length = this.divs.length; i < length; i++) {
            //all divs need their own model, and through the model they get thier own view (key!)
            this.create_model(this.divs[i]);
        }
    },
        
    create_model: function(element) {                                                       
        var element_id = element.id, $element = $(element), v_id = $element.data('uw-youtube'), type = $element.data('uw-player-type');
        //instantiate the models here, so we only need to instantiate the collection in document.ready
        var player_model = new UW.PlayerModel({el_id: element_id, $element: $element, type: type, v_id: v_id});
        //make sure all models are accessible through the UW.player collection
        this.models.push(player_model);
    },

    load_api: function() {
        //we need to get the youtube api script
        $('head').append('<script src="//www.youtube.com/player_api" type="text/javascript"></script>');
        //this avoids scope issues
        var player_models = this.models;
        //attach the onYouTubeIframeAPIReady function to the window, making it global
        window.onYouTubeIframeAPIReady = function() {
            for (var i = 0, length = player_models.length; i < length; i++){
                var player_model = player_models[i];
                //attach the YT.player to the relevant view, each view gets one
                player_model.view.uwplayer = new YT.Player(player_model.get('el_id'), {
                    videoId: '',
                    events: {
                        //these events will call functions in the relevant view
                        'onReady': player_model.view.onReady,
                        'onStateChange': player_model.view.onStateChange
                    }
                });
            }
        };
    }

});     


//this is the player view.  There is a view instantiated for each model (and thus, each div)
UW.PlayerView = Backbone.View.extend({
    
    is_playlist: false,
    data_ready: false,
    player_ready: false,

    initialize: function () {
        //these functions have 'this' refer to YT.Player natively. We need it to refer to this view
        _.bindAll(this, 'onReady', 'onStateChange');
        if (this.model.get('type') == 'playlist') {
            this.is_playlist = true;
        }
        this.$element = this.model.get('$element');
        this.wrap_player();
    },

    //wrap the player in some useful divs for styling
    wrap_player: function () {
        this.$element.wrap('<div class="nc-video-player"><div class="tube-wrapper"></div></div>');
        this.$wrapper = this.$element.parents('.nc-video-player');
        if(this.is_playlist){
            this.add_playlist_section();
        }
    },

    //add some useful html for the playlist and store some of the DOM objects for later use
    add_playlist_section: function () {
        this.$wrapper.append('<div class="vidSmall"><div class="scrollbar"><div class="track"><div class="thumb"><div class="end"></div></div></div></div><div class="viewport"><div class="vidContent overview"></div></div></div>');
        this.$vidSmall = this.$wrapper.find('.vidSmall');
        this.$vidContent = this.$wrapper.find('.vidContent');
    },

    //choose what prep the player needs, called directly by view's model when data is ready
    prep_player: function () {
        if (this.is_playlist) {
            this.prep_playlist();
        }
        else {
            this.prep_video();
        }
        this.data_ready = true;
        this.check_all_ready();
    },

    //create placeholder objects for each item in the playlist and put them in a section below the player
    prep_playlist: function() {
        this.video_ids = [];
        var videos = this.model.get('videos'), length = videos.length;
		this.$vidContent.append('<ul/>');
		this.$vidContent.width(length * 135 + 'px');
		for (var index = 0; index < length; index++) {
            var video = videos[index];
			if (typeof video.app$control === 'undefined'){
				var img = video.media$group.media$thumbnail[0],
					video_id  =  video.media$group.yt$videoid.$t,
					title = video.title.$t,
					dur = video.media$group.yt$duration.seconds,
					minutes = Math.floor(dur/60),
					seconds = String(dur % 60).length === 1 ? '0'+dur%60 : dur % 60;

				var html = '<li><a id="'+ video_id +'" class="video" href="#">'+
					'<img class="playBtn" src="' + '"//cdn.washington.edu/wp-content/img/misc/play.png" />' +
						  '<img src="'+img.url.replace(/http?:\/\//, '//')+'" width="'+img.width+'" height="'+img.height+'" />'+
						  '<div class="text">'+
						  '<p class="title">'+title+'</p>'+
						  '<p class="duration">'+minutes+':'+seconds+'</p>'+
						  '</div>' +
						'</a></li>';
                //add video to the list and append the created html to the ul underneath the player
				this.video_ids.push(video_id);
				this.$vidContent.children('ul').append(html);
			}
            //log why a video is missing if we can't retrieve it.  Skip for IE that can't do console.log
			else if (($('#ie7').length === 0) && ($('#ie8').length === 0)) {
				console.log('Tried add a bad video to the player.  Error="' + video.app$control.yt$state.name + '", Reason="' + video.app$control.yt$state.reasonCode + '", Video=' + video.link[0].href);
			}
		}
		this.$vidSmall.find('.scrollbar').show();
        //prevent scope issues in below function
        var view = this;
        //play video when placeholder is clicked
        this.$vidSmall.delegate('a.video', 'click', function(e) {
            e.preventDefault();
            view.play(this.id, true);
            return false;
        });

    },

    //this prepares single videos.  It just extracts and saves the video id for later
    prep_video: function(){
        this.video_id = this.model.get('v_id');
    },

    //this runs when this.uwplayer is ready to go.  We note that this view's player is ready then go check if everything else is ready in the view
    onReady: function () {
        this.player_ready = true;
        this.check_all_ready();
    },

    //this function checks the state of data/player to prevent a race case. Both the data and the player must be ready to go.  Then we play the correct video
    check_all_ready: function() {
        if (this.data_ready && this.player_ready) {
            if (this.is_playlist) {
                this.play(this.video_ids[0]);
            }
            else {
                this.play(this.video_id);
            }
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
        if (this.is_playlist) {
            var $small = $('#' + id);
            var leftpos = $small.position().left, $viewport = this.$vidSmall.find('.viewport');
            this.$wrapper.find('a.vid-active').removeClass('vid-active');
            if (this.$vidContent.width() - leftpos < $viewport.width()){
                leftpos = this.$vidContent.width() - $viewport.width();
            }
            this.$vidContent.animate({left: -leftpos}, 500);
            //currently not used because tinyscrollbar isn't added: this.$vidSmall.tinyscrollbar_update(leftpos);
            $small.addClass('vid-active');
        }
    }
});
