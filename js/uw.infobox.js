/**
* Create TinyMCE infobox button and insert infobox shortcode when button is clicked
*
*/

(function() {
    tinymce.create('tinymce.plugins.infobox_plugin', {
        init : function(ed) {
            ed.addCommand('infobox_insert_shortcode', function() {
                selected = tinyMCE.activeEditor.selection.getContent();

                if ( selected ) {
                    // If text is selected when button is clicked, set selected text as infobox content
                    content = '[infobox]'+ selected +'[/infobox]';
                } else {
                    content = '[infobox][/infobox]';
                }

                tinymce.execCommand('mceInsertContent', false, content);
            });
            
            var url = templateDirectory.url;

            ed.addButton('infobox_button', {title : 'Insert infobox', cmd : 'infobox_insert_shortcode', image: url + '/assets/images/infobox-icon.png'});
        },   
    });

    tinymce.PluginManager.add('infobox_button', tinymce.plugins.infobox_plugin);
})();

