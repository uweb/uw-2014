(function($) {
    $(document).ready(function() {
        $('[data-toggle="tooltip"]').tooltip()
            // Stop "click triggered" tootips from acting as bookmarks to top of page
            .filter('[data-trigger*="click"]')
            .on('click', function(e) {
                e.preventDefault();
            });
    });
}(jQuery));

