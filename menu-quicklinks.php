<nav id="quicklinks" aria-label="quick links" aria-hidden="true">
<?php 
if ( method_exists( 'UW_QuickLinks', 'template_menu') && UW_QuickLinks::template_menu() ):
    echo UW_QuickLinks::template_menu();
else: ?>
    <ul id="big-links"> 
        <li><span class="icon-myuw"></span><a href="https://my.uw.edu/" tabindex="-1">MyUW</a></li> 
        <li><span class="icon-calendar"></span><a href="https://www.washington.edu/calendar/" tabindex="-1">Calendar</a></li> 
        <li><span class="icon-directories"></span><a href=https://directory.uw.edu/" tabindex="-1">Directories</a></li> 
        <li><span class="icon-libraries"></span><a href="https://lib.uw.edu/" tabindex="-1">Libraries</a></li> 
        <li><span class="icon-medicine"></span><a href="https://www.uwmedicine.org/" tabindex="-1">UW Medicine</a></li> 
        <li><span class="icon-maps"></span><a href="https://www.washington.edu/maps/" tabindex="-1">Maps</a></li> 
        <li><span class="icon-uwtoday"></span><a href="https://www.washington.edu/news/" tabindex="-1">UW Today</a></li>
    </ul>
        
    <h3>Helpful Links</h3>
    <ul id="little-links">
        <li><span class="false"></span><a href="https://it.uw.edu/" tabindex="-1">Computing/IT</a></li> 
        <li><span class="false"></span><a href="https://employeehelp.workday.uw.edu/" tabindex="-1">Workday HCM</a></li> 
        <li><span class="false"></span><a href="https://hfs.uw.edu/Husky-Card-Services/" tabindex="-1">Husky Card</a></li> 
        <li><span class="false"></span><a href="https://www.uwb.edu/" tabindex="-1">UW Bothell</a></li> 
        <li><span class="false"></span><a href="https://www.tacoma.uw.edu/" tabindex="-1">UW Tacoma</a></li> 
        <li><span class="false"></span><a href="https://www.facebook.com/UofWA" tabindex="-1">UW Facebook</a></li> 
        <li><span class="false"></span><a href="https://x.com/UW" tabindex="-1">UW Twitter</a></li>
    </ul>
<?php endif; ?>
</nav>
