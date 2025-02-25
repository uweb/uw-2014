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

    if (this.showmeState === true) {
      this.hideLinks();
    } else {
      this.showLinks();
    }

  },

  hideLinks: function() {
    this.$el.find('#mobile-sidebar-links').removeClass('visible-xs');
    this.$el.find('#mobile-sidebar-menu').removeClass('open');
    this.$el.find('#mobile-sidebar-title').html('Open Menu');
    this.showmeState = false; 

  },
  showLinks: function() {
    this.$el.find('#mobile-sidebar-links').addClass('visible-xs');
    this.$el.find('#mobile-sidebar-menu').addClass('open');
    this.$el.find('#mobile-sidebar-title').html('Close Menu');
    this.showmeState = true;

  }


})



/* End Sidebar Navigation Hamburger Button for Mobile Devices */

















