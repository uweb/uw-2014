/**
 * Adds [mediacredit] shortcode to tinymce
 */

(function() {
    tinymce.create('tinymce.plugins.MediaCredit', {

        $ : jQuery,

        init : function(ed, url) {

            var this_ = this;

            ed.onBeforeSetContent.add(function(ed, o) {
              o.content = this_._do_shcode(o.content);
            });

            ed.onPostProcess.add(function(ed, o) {
              if (o.get)
                o.content = this_._get_shcode(o.content);
            });

            // delete mediacredit html when its corresponding image is deleted
            tinymce.dom.Event.bind( document, 'mousedown', function(e) { 
              var ed = tinymce.activeEditor, el = ed.selection.getNode(), parent;

              if ( el.nodeName == 'DT' && ed.dom.getAttrib(el, 'class') === 'mediacredit-dt' ) {
                el = this_.$(el).closest('dl.mediacredit').get(0)
                ed.dom.remove(el)
              }

            });

            //TODO: figure out if we can remove this
            // ed.onInit.add(function(ed, evt) {
            //
            //  tinymce.dom.Event.bind( ed.getDoc(), 'mousedown', function(e) { 
            //    console.log(e.target, 'here')
            //  });
            //
            //})

        },

        _do_shcode : function(co) {
          return wp.shortcode.replace( 'mediacredit', co, function(a) {
            return '<dl class="mediacredit '+a.attrs.named.align
                  + '" data-credit="'+a.attrs.named.credit
                  + '" data-size="'+a.attrs.named.size
                  + '" data-align="'+a.attrs.named.align
                  + '" style="width:'+a.attrs.named.width+'px">'
                  + '<dt class="mediacredit-dt">' + a.content +'<dt>'
                  + '<dd class="wp-caption-dd">' + a.attrs.named.credit +'<dd>'
                  + '</dl>';
          })
        },

        _get_shcode : function(co) {
            var this_ = this

            return co.replace(/<dl class="mediacredit (.*?)>(.*?)<\/dl>/gi, function(a,b,c) {
                var $content = this_.$(a)
                  , data = $content.data()

                if ( ! $content.find('img').length )
                  return '';

                $content.find('.'+data.align).removeClass(data.align)


                return wp.shortcode.string({
                  tag: 'mediacredit',
                  content: $content.find('dt').filter(':not(:empty)').html(),
                  attrs: {
                    id: $content.find('img').attr('class').replace(/\D+/g, ''),
                    size: data.size,
                    //width: data.width,
                    align: data.align,
                    credit: data.credit
                  }
                })
            });

        },

        getInfo : function() {
            return {
                longname : 'UW Media Credit',
                author : 'Dane Odekirk',
                authorurl : 'http://uw.edu',
                infourl : 'http://uw.edu',
                version : tinymce.majorVersion + "." + tinymce.minorVersion
            };
        }
      });

    tinymce.PluginManager.add('mediacredit', tinymce.plugins.MediaCredit);
})();
