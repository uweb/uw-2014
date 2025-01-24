tinymce.PluginManager.add('bs_tilebox', function(editor, url) {
    editor.addButton('bs_tilebox', {
        type: 'menubutton',
        tooltip: 'Tile boxes',
        icon: 'bs-alerts',
        menu: [
            { text: '2 wide', onclick: function() { editor.insertContent('[box][tile]Text[/tile][tile]Text[/tile][/box]'); } },
            { text: '3 wide', onclick: function() { editor.insertContent('[box][tile]Text[/tile][tile]Text[/tile][tile]Text[/tile][/box]'); } },
            { text: '4 wide', onclick: function() { editor.insertContent('[box][tile]Text[/tile][tile]Text[/tile][tile]Text[/tile][tile]Text[/tile][/box]'); } }
        ]
    });
});
