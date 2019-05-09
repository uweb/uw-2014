/**
+* Create TinyMCE plugin and insert infobox shortcode when infobox button is clicked
+*
+*/
+
+(function() {
+
+    tinymce.create('tinymce.plugins.infobox_plugin', {
+        init : function(ed, url) {
+                ed.addCommand('infobox_insert_shortcode', function() {
+                    selected = tinyMCE.activeEditor.selection.getContent();
+
+                    if ( selected ) {
+                        // If text is selected when button is clicked, set selected text as infobox content
+                        content = '[infobox]'+ selected +'[/infobox]';
+                    } else {
+                        content = '[infobox][/infobox]';
+                    }
+
+                    tinymce.execCommand('mceInsertContent', false, content);
+                });
+
+            
+            ed.addButton('infobox_button', {title : 'Insert infobox', cmd : 'infobox_insert_shortcode', image: url.slice(0, url.length - 3) + '/assets/images/infobox-icon.png' });
+        },   
+    });
+
+    tinymce.PluginManager.add('infobox_button', tinymce.plugins.infobox_plugin);
+})();

