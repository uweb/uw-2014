// ### UW Vimeo

// This function creates the UW Vimeo player
// For usage please refer to the [UW Web Vimeo Player](http://uw.edu/brand/web/#vimeo)
// TODO: Get postMessage to work after iframe has loaded or find the correct API postMessage

//       Single: <div class="uw-vimeo" data-video=76979871 data-width=800 data-height=500></div>
//       Playlist :<div class="uw-vimeo" data-username=uwathleticsmarketing data-width=800 data-height=500></div>


UW.Vimeo = Backbone.View.extend({

  // The classname to look for when embedding Vimeo videos
  el : '.uw-vimeo',

  // List the events in the view.
  // Clicking a preview item will load that video
  events : {
    'click .preview' : 'loadVideo',
  },

  // The two templates necessary for the embed.
  // The first one is the standard Vimeo iFrame which is used for both single and playlist driven embeds.
  // The second one is the playlist and only shows if a playlist is being called.
  templates : {
    video    : '<iframe id="test" src="https://player.vimeo.com/video/<%= video %>/?<%= $.param( defaults ) %>"' +
               ' width=<%= width %> height=<%= height %> title="<%= video.title %>"'+
               ' style=border:0 webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
    playlist : '' +
      '<div class="playlist">'+
        '<% _.each( videos, function( video ) { %>' +
          '<div class="preview" data-id=<%= video.id %>>' +
            '<img src="<%= video.thumbnail_small %>" height=75 width=100 title="<%= video.title %>"/>'+
          '</div>' +
        '<% }) %>' +
      '</div>'
  },

  // Default settings
  settings : {
    width  : 580,
    height : 350
  },

  // Default video attributes that cannot be overwritten
  defaults : {
    api      : 1,
    title    : 0,
    portrait : 0,
    byline   : 0,
    color    : '4B2E82'
  },

  // Initialize the video embeds.
  // Check to see if the `div.uw-vimeo` is requesting a single video or a playlist.
  // Note: Playlists are currently restricted to usernames.
  initialize : function( options )
  {
    _.bindAll( this, 'single', 'playlist', 'loadVideo' )

    this.options = _.extend( {}, this.settings , this.$el.data(), options )
    this.options.defaults = this.defaults

    this.$el.width( this.options.width )

    if ( this.options.video )
    {
      this.video = new UW.Vimeo.Video( this.options.video )
      this.video.on( 'sync', this.single )
    }

    if ( this.options.username )
    {
      this.videos = new UW.Vimeo.Playlist( { username : this.options.username } )
      this.videos.on( 'sync', this.playlist )
    }

  },

  // This loads the single video template and puts it into the DOM
  single : function()
  {
    this.player = _.template( this.templates.video )( this.options )
    this.$el.html( this.player )
  },

  // This loads the playlist template and puts it into the DOM
  playlist : function()
  {

    _.extend( this.options, { video : this.videos.first().get('id') } )
    this.player = _.template( this.templates.video )( this.options ) 

    this.videoList = _.template( this.templates.playlist)( { videos : this.videos.toJSON() } )

    this.$el.html( this.player )
    this.$el.append( this.videoList )

  },

  // This loads a new video when a preview image is clicked.
  loadVideo : function( e )
  {
    var iframe = this.$el.find('iframe')
      , params = _.last( iframe.attr('src').split('?') )
      , url = 'https://player.vimeo.com/video/' + $(e.currentTarget).data().id + '/?' +params

    iframe.attr('src', url)

    /* iframe.get(0).contentWindow.postMessage({method:'play'}, url) */

  }

})

// This is a model for a Vimeo video.
// It takes its attributes from the Vimeo JSON API.
UW.Vimeo.Video = Backbone.Model.extend({

  url : function()
  {
      return 'https://vimeo.com/api/v2/video/' + this.video +'.json'
  },

  parse : function( data )
  {
    return _.first(data)
  },

  initialize : function( video )
  {
    this.video = video
    this.fetch()
  }

})

// This is a collection for a Vimeo feed
// It takes its attributes from the Vimeo JSON API much like the `UW.Vimeo.Video` model does.
// Only videos with the property of `{ embed_privacy : anywhere }` will be shown.
UW.Vimeo.Playlist = Backbone.Collection.extend({

    url : function()
    {
      return 'https://vimeo.com/api/v2/'+ this.username +'/videos.json'
    },

    initialize : function( options )
    {
      this.username = options.username;
      this.fetch()
    },

    parse : function( data )
    {
      return _.where( data, { embed_privacy : 'anywhere' })
    }

})
