tinymce.PluginManager.add('bs_grid', function(editor, url) {
    editor.addButton('bs_grid', {
        type: 'menubutton',
        tooltip: 'Grid',
        icon: 'bs-grid',
        menu: [
            { text: '12 Columns', onclick: function() { editor.insertContent('[bs_row class="row"]<br class="nc"/>[bs_col class="col-sm-1"]Text[/bs_col]<br class="nc"/>[bs_col class="col-sm-1"]Text[/bs_col]<br class="nc"/>[bs_col class="col-sm-1"]Text[/bs_col]<br class="nc"/>[bs_col class="col-sm-1"]Text[/bs_col]<br class="nc"/>[bs_col class="col-sm-1"]Text[/bs_col]<br class="nc"/>[bs_col class="col-sm-1"]Text[/bs_col]<br class="nc"/>[bs_col class="col-sm-1"]Text[/bs_col]<br class="nc"/>[bs_col class="col-sm-1"]Text[/bs_col]<br class="nc"/>[bs_col class="col-sm-1"]Text[/bs_col]<br class="nc"/>[bs_col class="col-sm-1"]Text[/bs_col]<br class="nc"/>[bs_col class="col-sm-1"]Text[/bs_col]<br class="nc"/>[bs_col class="col-sm-1"]Text[/bs_col]<br class="nc"/>[/bs_row]'); } },
            { text: '6 Columns',  onclick: function() { editor.insertContent('[bs_row class="row"]<br class="nc"/>[bs_col class="col-sm-2"]Text[/bs_col]<br class="nc"/>[bs_col class="col-sm-2"]Text[/bs_col]<br class="nc"/>[bs_col class="col-sm-2"]Text[/bs_col]<br class="nc"/>[bs_col class="col-sm-2"]Text[/bs_col]<br class="nc"/>[bs_col class="col-sm-2"]Text[/bs_col]<br class="nc"/>[bs_col class="col-sm-2"]Text[/bs_col]<br class="nc"/>[/bs_row]'); } },
            { text: '4 Columns',  onclick: function() { editor.insertContent('[bs_row class="row"]<br class="nc"/>[bs_col class="col-sm-3"]Text[/bs_col]<br class="nc"/>[bs_col class="col-sm-3"]Text[/bs_col]<br class="nc"/>[bs_col class="col-sm-3"]Text[/bs_col]<br class="nc"/>[bs_col class="col-sm-3"]Text[/bs_col]<br class="nc"/>[/bs_row]'); } },
            { text: '3 Columns',  onclick: function() { editor.insertContent('[bs_row class="row"]<br class="nc"/>[bs_col class="col-sm-4"]Text[/bs_col]<br class="nc"/>[bs_col class="col-sm-4"]Text[/bs_col]<br class="nc"/>[bs_col class="col-sm-4"]Text[/bs_col]<br class="nc"/>[/bs_row]'); } },
            { text: '2 Columns',  onclick: function() { editor.insertContent('[bs_row class="row"]<br class="nc"/>[bs_col class="col-sm-6"]Text[/bs_col]<br class="nc"/>[bs_col class="col-sm-6"]Text[/bs_col]<br class="nc"/>[/bs_row]'); } },
            { text: '1 Columns',  onclick: function() { editor.insertContent('[bs_row class="row"]<br class="nc"/>[bs_col class="col-sm-12"]Text[/bs_col]<br class="nc"/>[/bs_row]'); } },
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
