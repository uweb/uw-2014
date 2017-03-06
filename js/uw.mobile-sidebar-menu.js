/* Sidebar Navigation Toggle Button for Mobile Devices - Hide and Show The Sidebar Content    */


UW.ToggleSidebarMenu = Backbone.View.extend({

  events: {
    'click button': 'toggleContent'
  },

  initialize : function() {
    console.log(this.el);
    this.toggleContent();
  },

  toggleContent: function(e){

    if (this.showmeState === false) {
      this.showLinks();
    } else {
      this.hideLinks();
    }

  },


  showLinks: function() {
    this.$el.find('#mobile-sidebar-links').show();
    this.$el.find('#mobile-sidebar-menu').addClass('open');
    this.showmeState = true;

  },

  hideLinks: function() {
    this.$el.find('#mobile-sidebar-links').hide();
    this.$el.find('#mobile-sidebar-menu').removeClass('open');
    this.showmeState = false; 

  }

})



/* Sidebar Navigation Hamburger Button for Mobile Devices */

















