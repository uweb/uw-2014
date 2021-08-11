<nav id="quicklinks" aria-label="quick links" aria-hidden="true">
<?php 
if ( UW_QuickLinks::template_menu() ):
    echo UW_QuickLinks::template_menu();
else: ?>
    <ul id="big-links"> 
        <li><span class="icon-myuw"></span><a href="http://my.uw.edu" tabindex="-1">MyUW</a></li> 
        <li><span class="icon-calendar"></span><a href="http://uw.edu/calendar" tabindex="-1">Calendar</a></li> 
        <li><span class="icon-directories"></span><a href="http://uw.edu/directory/" tabindex="-1">Directories</a></li> 
        <li><span class="icon-libraries"></span><a href="http://www.lib.washington.edu/" tabindex="-1">Libraries</a></li> 
        <li><span class="icon-medicine"></span><a href="http://www.uwmedicine.org" tabindex="-1">UW Medicine</a></li> 
        <li><span class="icon-maps"></span><a href="http://uw.edu/maps" tabindex="-1">Maps</a></li> 
        <li><span class="icon-uwtoday"></span><a href="http://uw.edu/news" tabindex="-1">UW Today</a></li>
    </ul>
        
    <h3>Helpful Links</h3>
    <ul id="little-links">
        <li><span class="false"></span><a href="http://itconnect.uw.edu" tabindex="-1">Computing/IT</a></li> 
        <li><span class="false"></span><a href="http://isc.uw.edu/" tabindex="-1">Employee Self Service</a></li> 
        <li><span class="false"></span><a href="http://hfs.uw.edu/Husky-Card-Services/" tabindex="-1">Husky Card</a></li> 
        <li><span class="false"></span><a href="http://www.uwb.edu/" tabindex="-1">UW Bothell</a></li> 
        <li><span class="false"></span><a href="http://www.tacoma.uw.edu/" tabindex="-1">UW Tacoma</a></li> 
        <li><span class="false"></span><a href="https://www.facebook.com/UofWA" tabindex="-1">UW Facebook</a></li> 
        <li><span class="false"></span><a href="https://twitter.com/UW" tabindex="-1">UW Twitter</a></li>
    </ul>
<?php endif; ?>
</nav>
