UW.Image = Backbone.View.extend({

  template : '<div class="uw-overlay"><div></div><div class="wrapper" style="width:<%= width %>px; margin-top:-<%= height/2 %>px; margin-left:-<%= width/2 %>px;"><span class="close"> Close</span><img src="<%= src %>" alt="<%=alt %>" /><p><%= caption %></p><p><%= credit %></p></div></div>',

  events : {
    'click' : 'fetchImage'
  },

  initialize : function()
  {
    _.bindAll( this, 'fetchImage', 'overlay' , 'render' )
  },

  fetchImage : function( e )
  {
    this.attrs = this.getAttributes( e )
    $('<img src="'+ this.attrs.src +'"/>').imagesLoaded( this.overlay )
    return false;
  },

  overlay : function( images )
  {

    // todo make this quicker
    if ( images.hasAnyBroken ) {
      window.location = this.attrs.src;
      return
    }

    this.image = _.first( images.images )
    this.attrs.height = this.image.img.height
    this.attrs.width  = this.image.img.width
    this.render()

    return false;
  },

  render : function()
  {
    UW.$body.one( 'click', this.remove )
    return  UW.$body.append( _.template( this.template, this.attrs ) )
  },

  remove : function()
  {
    console.log('here')
    UW.$body.find( '.uw-overlay' ).remove()
    return false;
  },

  getAttributes: function( e )
  {
      var target = $(e.currentTarget)
      return {
        src : target.parent('a').attr('href'),
        alt : target.attr('alt'),
        caption : target.parent('a').siblings('.wp-caption-text').text(),
        credit : target.parent('a').siblings('.wp-caption-text').find('.wp-media-credit').text()
      }

  }

})
