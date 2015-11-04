tinymce.PluginManager.add('bs_grid', function(editor, url) {
    editor.addButton('bs_grid', {
        type: 'menubutton',
        tooltip: 'Grid',
        icon: 'bs-grid',
        menu: [
            { text: '12 Columns', onclick: function() { editor.insertContent('[row class="row"]<br class="nc"/>[col class="col-sm-1"]Text[/col]<br class="nc"/>[col class="col-sm-1"]Text[/col]<br class="nc"/>[col class="col-sm-1"]Text[/col]<br class="nc"/>[col class="col-sm-1"]Text[/col]<br class="nc"/>[col class="col-sm-1"]Text[/col]<br class="nc"/>[col class="col-sm-1"]Text[/col]<br class="nc"/>[col class="col-sm-1"]Text[/col]<br class="nc"/>[col class="col-sm-1"]Text[/col]<br class="nc"/>[col class="col-sm-1"]Text[/col]<br class="nc"/>[col class="col-sm-1"]Text[/col]<br class="nc"/>[col class="col-sm-1"]Text[/col]<br class="nc"/>[col class="col-sm-1"]Text[/col]<br class="nc"/>[/row]'); } },
            { text: '6 Columns',  onclick: function() { editor.insertContent('[row class="row"]<br class="nc"/>[col class="col-sm-2"]Text[/col]<br class="nc"/>[col class="col-sm-2"]Text[/col]<br class="nc"/>[col class="col-sm-2"]Text[/col]<br class="nc"/>[col class="col-sm-2"]Text[/col]<br class="nc"/>[col class="col-sm-2"]Text[/col]<br class="nc"/>[col class="col-sm-2"]Text[/col]<br class="nc"/>[/row]'); } },
            { text: '4 Columns',  onclick: function() { editor.insertContent('[row class="row"]<br class="nc"/>[col class="col-sm-3"]Text[/col]<br class="nc"/>[col class="col-sm-3"]Text[/col]<br class="nc"/>[col class="col-sm-3"]Text[/col]<br class="nc"/>[col class="col-sm-3"]Text[/col]<br class="nc"/>[/row]'); } },
            { text: '3 Columns',  onclick: function() { editor.insertContent('[row class="row"]<br class="nc"/>[col class="col-sm-4"]Text[/col]<br class="nc"/>[col class="col-sm-4"]Text[/col]<br class="nc"/>[col class="col-sm-4"]Text[/col]<br class="nc"/>[/row]'); } },
            { text: '2 Columns',  onclick: function() { editor.insertContent('[row class="row"]<br class="nc"/>[col class="col-sm-6"]Text[/col]<br class="nc"/>[col class="col-sm-6"]Text[/col]<br class="nc"/>[/row]'); } },
            { text: '1 Columns',  onclick: function() { editor.insertContent('[row class="row"]<br class="nc"/>[col class="col-sm-12"]Text[/col]<br class="nc"/>[/row]'); } },
            {
                text: 'Custom Grid',
                onclick: function() {
                    tinymce.activeEditor.windowManager.open({
                        title: 'Custom Grid',
                        url: url + '/grid.html',
                        width: 580,
                        height: 420
                    });
                }
            }
        ]
    });
});
