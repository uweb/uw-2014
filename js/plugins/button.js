tinymce.PluginManager.add('bs_button', function(editor, url) {
    editor.addButton('bs_button', {
        type: 'menubutton',
        tooltip: 'Button',
        icon: 'bs-buttons',
        menu: [
            { text: 'Purple', onclick: function() { editor.insertContent('[button url=link small=true]Call to action[/button]'); } },
            { text: 'Gold',  onclick: function() { editor.insertContent('[button url=link small=true type=gold]Call to action[/button]'); } },
            { text: 'Large',  onclick: function() { editor.insertContent('[button url=link]Call to action[/button]'); } }
        ]
    });
});
