UW.Alert = Backbone.View.extend({

  alert : '#uwalert-alert-message',

  events : {
    'click .close' : 'hide'
  },

  template : '<div id="uwalert-alert-message" class="<% _.each( categories, function( category ) { %> <%= category.slug %> <% }) %>"><div class="container"><span class="close">Close</span><h1><%= title %></h1><p><%= excerpt %><a class="more" href="http://emergency.uw.edu" title="<%= title %>">More info</a></p></div></div>',

  initialize  : function( options )
  {
    _.bindAll( this, 'render', 'hide' )
    this.options = _.extend( {}, options )
    this.model.on( 'sync', this.render )
  },

  render : function()
  {
    if ( this.model.get('title'))
     {
      $(this.options.after).after( _.template( this.template )( this.model.toJSON() ) )
      this.setElement( $( this.alert ) )
    }
  },

  hide : function()
  {
    this.$el.remove()
  }

})

UW.Alert.Model = Backbone.Model.extend({

  alerts :  [
    'red-alert-urgent',
    'orange-alert',
    'steel-alert-fyis',
  ],

  data  : {
    c : '?',
    test : true,
    number:1,
    type:'post',
    status:'publish',
    dataType: 'json'
  },

  url :  'https://public-api.wordpress.com/rest/v1/sites/uwemergency.wordpress.com/posts/',

  initialize : function()
  {
    this.fetch( { data : this.data })
  },

  parse: function(data)
  {
    var post = _.first( data.posts )
    _.extend( post.categories, {alert: { slug : window.location.hash.replace('#','') } } )
    if ( _.intersection( _.pluck(  post.categories, 'slug' ), this.alerts ).length || post.categories.alert.slug.indexOf( 'uwalert' ) !== -1 )
      return post
  }

});