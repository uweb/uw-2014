
# UW 2014 Theme

The UW 2014 Theme is available to anyone wishing to apply the Boundless UW brand to their website.
This is an overview of the custom widgets, plugins and various features it includes.


## Table of contents
 - - -

- [Quick start](#quickstart)
- [Bugs and feature requests](#bugsandfeaturerequests)
- [Widgets](#widgets)
  - [UW Blogroll](#uw-blogroll)
  - [UW Campus Map](#uw-campus-map)
  - [UW Recent Posts](#uw-recent-posts)
  - [UW RSS](#uw-rss)
  - [UW Single Image ](#uw-single-image)
  - [UW Top Posts](#uw-top-posts)
  - [UW Twitter](#uw-twitter)
  - [UW Contact Card](#uw-contact-card)
  - [UW Image Card](#uw-image-card)
- [Shortcodes](#shortcodes)
  - [Button](#button)
  - [Blogroll](#blogroll)
  - [iFrame](#iframe)
  - [Infobox](#infobox)
  - [Intro](#intro)
  - [RSS](#rss)
  - [Tile box](#tilebox)
  - [Trumba](#trumba)
  - [Twitter](#twitter)
  - [YouTube](#youtube)
  - [Slideshow](#slideshow)
  - [Subpage List](#subpagelist)
  - [Accordion](#accordion)
  - [Custom Menu](#custommenu)
- [Features](#features)
  - [UW Widget Visibility](#uw-widget-visiblity)
  - [UW Media Credit](#uw-media-credit)
- [Plugin guides](#plugin-guides)
  - [Marketo Forms](#marketo-forms)
  - [Contact Form 7](#contact-form-7)
    - [Preventing spam](#preventing-spam)
- [Creators](#creators)
- [Contributors](#contributors)
- [License](#license)

## Quick Start ##
 - - -

Download the [UW 2014 theme](https://github.com/uweb/uw-2014/archive/master.zip) into the wp-content/themes folder of your local WordPress install. Next, log into the WordPress dashboard and go the Appearance -> Themes page. From here you can activate the UW 2014 theme.

## Bugs and feature requests ##
 - - -

All bugs and feature requests can be issued at the [UW Web Team's GitHub account](https://github.com/uweb/uw-2014/issues) or emailed directly to the UW web team at [uweb@uw.edu](mailto:uweb@uw.edu).

## Widgets ##
 - - -

### UW Blogroll ###

> Display the most recent posts on your blog.

> Options:

> - **Title** : The title of the widget (*Default: Blogroll*)
> - **Excerpt** : Uses the excerpt for text if it exists in the post (*Default: true*)
> - **Image** : Uses the featured image in the respective post (*Default: hide*)
> - **Author** : Shows the authro (*Default: show*)
> - **Post type** : Pulls a specific post type (*Default: post*)
> - **Category** : Pulls from a category ID (*Default: none*)
> - **Category name** : Pulls from a category name (*Default: none*)
> - **Mini blogroll** : Creates a minified version of the blogroll for tighter spaces (*Default: false*)
> - **Date** : Shows the published date (*Default: show*)
> - **Number of posts to display** : The number of post titles to show in the blogroll (*Default: 2*)

### UW Campus Map ###

>Embed the location of a UW campus building on your page using the UW branded campus map.

> Options:

> - **Title** : The title of the widget (*Default: None*)
> - **Building code** : The UW campus building code for the desired building to embed, ie: 'kne' for Kane Hall. (*Default: None*)


### UW Recent Posts ###

>  Similar to the default WordPress widget Recent Posts but with different options and layout.

> Options:

> - **Title** : The title of the widget (*Default: None*)
> - **Number of posts to display** : The number of posts to show (*Default: 1*)
> - **Display more link** : Display an anchor tag that links to the blogroll page (*Default: false*)

### UW Related Posts ###

>  Uses the WordPress JetPack API to show a list of posts related to the one currently being views.
 _Requires the JetPack Plugin to be installed_ otherwise it will not appear in the Widgets admin area.

> Options:

> - **Title** : The title of the widget (*Default: None*)

> _Requires the JetPack Plugin to be installed_.

### UW RSS ###

> Similar to the WordPress RSS widget except with a branded layout that displays RSS images.

> Options:

> - __Title__ : The title of the widget (_Default: None_)
> - __Blurb__ : A small blurb that is shown before the RSS feed (_Default: None_)
> - __RSS URL__ : The URL of the RSS feed to display (_Default: None_)
> - __Number of items to display__ : The number of items in the RSS feed to display (_Default: 10_)

### UW Single Image ###

> Displays a single image with a blurb of text below it.

> Options:

> - __Title__ : The title of the widget (_Default: Image Widget_)
> - __Select an image__ : Select an  image from the WordPress  media library (_Default: None_)
> - __Featured text__ : A small blurb that is shown below the image (_Default: None_)
> - __Link__ : A URL for the More link text (_Default: None_)
> - __More link__ : The text to display in the more link (_Default: Read more_)

### UW Top Posts ###

> Shows the most popular posts on your blog.

> Options:

> - __Title__ : The title of the widget (_Default: Image Widget_)
> - __Number of items to display__ : The number of items in the RSS feed to display (_Default: 1_)

> _Requires JetPack to be installed_.

### UW Twitter ###

> Shows the latest tweets from a specific Twitter account.

> Options:

> - __Title__ : The title of the widget (_Default: UW Twitter Feed_)
> - __Screen name__ : The title of the widget (_Default: twitter__)
> - __Number of tweets to show__: The number of items in the RSS feed to display (_Default: 5_)

> In order to have the widget display in the widgets a `TWITTER_OAUTH_TOKEN` constant must be defined in your wp-config.php file.
> _Requires a Twitter API key_.

### UW Contact Card ###

> Displays a multiple list of contacts for the group/department.

> Options:

> - __Title__ : The title of the widget (_Default: Contact us_)
> - __Name__ : The person's name (_Default: None_)
> - __Title__ : The person's job title (_Default: None_)
> - __Phone number__ : The person's phone number (_Default: None_)
> - __Email__ : The person's email (_Default: None_)


### UW Image Card ###

> Displays one of three styles of branded card. Both text and image can be customized.

> Options:

> - __Title__ : The title of the widget (_Default: Image Widget_)
> - __Select an image__ : Select an image from the WordPress  media library (_Default: None_)
> - __Featured text__ : A small blurb that is shown below or on top of the image (_Default: None_)
> - __Link__ : A URL for the More link text (_Default: None_)
> - __More link__ : The text to display in the more link (_Default: Read more_)
> - __Card style__ : Choose one of three styles (_Default: None_)


## Shortcodes
 - - -

### Button ###

>  Displays a branded call to action button. [See some examples](http://www.washington.edu/brand/html-web-components/#buttons).

> Attributes:

> - __color__ : The color of the button. Options: __gold__ or __gray__ (_Default: gray_)
> - __type__: Adjusts the image of the button. Options: __plus__, __go__, __external__, __play__ (_Default: go_)
> - __small__: Adjusts the size of the button. Options: __small__, __large__ (_Default: large_)
> - __url__: The URL where the button links to (_Default: None_)

> Example:
```
  [button color=gold type=plus small=true url="http://uw.edu"]Button Text[/button]`
```

### Blogroll ###

>  This is a shortcode that wraps the WordPress [get\_posts](https://codex.wordpress.org/Template_Tags/get_posts) function and templates out a blogroll. Any parameter you can pass to `get_posts` will be understood along with the following.

> Attributes:

> -  __excerpt__ : Choose whether to show the excerpt in the blogroll. Options: __show__, __hide__. (_Default: hide_)
> - __trim__ : Whether or not to trim the words via WordPress [wp\_trim\_words](https://codex.wordpress.org/Function_Reference/wp_trim_words) function. Options: __true__, __false__. (_Default: _false)
> - __image__:  Choose whether to show the featured image thumbnail. Options: __show__, __hide__. (_Default: hide_)
> - __author__: Choose whether to show the author. Options: __show__, __hide__. (_Default: show_)
> - __date__:  Choose whether to show the publish date. Options: __show__, __hide__. (_Default: show_)
> - __titletag__:  The html element for the post titles. (_Default: h2_)
> - __post\_type__:  The post type to look for.(_Default: post_)
> - __number__:  The maximum number of results to return (_Default: 5_)
> - __mini__:  Use the miniture template instead of the default one. (_Default: false_)
> - __category__:  The WordPress category ID to limit the results from. (_Default: None_)
> - __category\_name__:  The WordPress category name to limit the results from. (_Default: None_)
> - __readmore__: Choose whether to show the "Read More" link or not. Options: __on__, __off__. (_Default: on_)

> Example:
```
  [blogroll number=3 trim=true readmore='off']
```

### iFrame ###

>  Embed iframes into your post or page content without adjusting WordPress privileges.
> The iframe url is tested against a list of allowed domains. If the domain is not in the list the iframe will not render.

> Attributes:

> - __src__ : The source URL of the embedded iframe (_Default: none_)
> - __height__ : The width of the embedded iframe (_Default: WordPress's embed size width setting )
> - __width__ :  The height of the embedded iframe (_Default: WordPress's embed size height setting )

> Example:
```
    [iframe src="https://www.youtube.com/embed/0h33Y9Zw8oQ" height="500" width="700"]
```

> Allowed domains:
```
  uw.edu,
    washington.edu,
    uwtv.org,
    tvw.org,
    google.com,
    youtube.com,
    excition.com,
    pgcalc.com,
    matchinggifts.com,
    docs.google.com,
    surveygizmo.com,
    uwregents.wufoo.com,
    depts.washington.edu,
    online.gifts.washington.edu,
    secure.gifts.washington.edu,
    payroll.gifts.washington.edu,
    helperapps.gifts.washington.edu,
```

### Infobox ###

> Displays an infobox. [See an example of an infobox here](http://www.washington.edu/news/2019/03/20/snow-may-have-delayed-some-blooms-for-the-first-day-of-spring/). 

> This shortcode can be wrapped around selected content by clicking the infobox button in the WordPress visual editor.

> Attributes:

> - __alignment__: Adjusts the alignment of the infobox. Options: __left__, __left-center__, __right__, __full-width__ (_Default: left_)
> - __color__: The color of the top border of the infobox. Options: __gold__ or __purple__ (_Default: gold_)

> Example:
```
  [infobox alignment=full-width color=purple]Infobox Text[/infobox]
```

### Intro ###
> This shortcode creates an italicized block of introduction text for the content.

> No attributes.

> Example:

```
  [intro] A block on introductory text for the content. [/intro]
```

### RSS ###

>  This is a shortcode embeds an RSS blogroll into the body content. It behaves similarly to the UW RSS Widget.

> Attributes:

> -  __url__ : The URL to parse for the RSS feed. (_Default: None_)
> - __number__:  The maximum number of results to return (_Default: 5_)
> - __title__:  The title for the RSS blogroll in the content (_Default: None_)
> - __heading__:  The html element for the post titles. (_Default: h3_)
> - __show_image__:  Choose whether to show the RSS thumbnail. Options: __true__, __false__. (_Default: true_)
> - __show_date__:  Choose whether to show the publish date. Options: __true__, __false__. (_Default: true_)
> - __show_more__: Choose whether to show the author. Options: __true__, __false__. (_Default: true_)

> Example:
```
  [rss url="http://www.washington.edu/marketing/topic/wordpress/feed" number=3 title="Web Team Updates" heading="h2" show_image="false" show_date="false"]
```

### Tile box ###

>  Display branded tiles to structure content in elegantly. [See an example of tiles here](http://www.washington.edu/newhuskies/).
Each tile is setup as a series of shortcodes wrapped in `[box]` shortcode.

> Attributes:

> - __alignment__ : How the text is aligned in each tile. Options: __centered__ or __none__ (_Default: none_)
> - __color__ : Background color of the tiles. Options: __tan__ (_Default: none_)
> - __empty__ : (Add this to [tile], not [box]). If tile has no content, allow it to be transparent, but take up the normal amount of space. Options: __true__ (_Default: false)


> Example:
```
[box alignment=centered]
    [tile] Text for tile one [/tile]
    [tile] Text for tile two [/tile]
    [tile] Text for tile three [/tile]
    [tile] Text for tile four [/tile]
  [/box]
```



### Trumba ###

>  Display a Trumba calendar spud in the post or page content.

> Attributes:

> - __name__ : __Required__ Trumba web name of the desired calendar (_Default: none_)
> - __type__ : The Trumba spud type of the desired calendar. Changing the type will change how the calendar is displayed. A list of all spud types can be found [here](https://www.trumba.com/help/api/spudType_param.aspx). (_Default: none_)
> - __base__ : The full url of the desired base calendar. This can be embedded on your site with the spud type='main' (_Default: none_)

```
    [trumba name='my web name' type='desired spud type' base='teaser base url']
```
> Example:
```
    [trumba name='sea_campus' type='main' base='https://www.washington.edu/calendar']
```

### Twitter ###

>  This is a shortcode embeds a Twitter feed for a desired username. It behaves similarly to the UW Twitter Widget.

> Attributes:

> - __Title__ : The title of the widget (_Default: UW Twitter Feed_)
> - __Screen name__ : The title of the widget (_Default: twitter__)
> - __Number of tweets to show__: The number of items in the RSS feed to display (_Default: 5_)

> Example:
```
  [twitter title="Twitter feed" count=10 name=uw]
```

> In order to have the shortcode display a `TWITTER_OAUTH_TOKEN` constant must be defined in your wp-config.php file.
> _Requires a Twitter API key_.

### YouTube ###

>  Embed a YouTube video or playlist into your post content.

> Attributes:

> -  __type__ : Pick whether to display a single video or playlist. Options: __single__, __playlist__. (_Default: None_)
> - __id__ : The youtube video or playlist id  (_Default: None_)
> - __max-results__ (__OPTIONAL__):  The maximum number of results to return for a playlist (_Default: None_)

> Example:
```
  [youtube type='playlist' id='PLgNkGpnjFWo9CN_HeVtujhMnUXK05iwgZ' max-results='10']
```

### Slideshow ###

>  Embed a slideshow into your post content.
> _Requires the UW Slideshow Plugin (https://github.com/uweb/uw-slideshow)_.

> Attributes:

> -  __id__ : Enter the ID of the slideshow you have created via the _Dashboard > Slideshows_. (_Default: None_)
> - __simple__ : The youtube video or playlist id  (_Default: None_)

> Example:
```
  [slideshow simple='true' id='1234']
```

### Subpage List ###

> This shortcode lists out all the subpages relative to the current page.
> There are two views this shortcode can render: list or grid.
> The list view displays all the subpages as anchor tags in an HTML list element.
> The grid view displays all the subpages as boxes, with their title, excerpt and author if available.

> Attributes:

> - __link__ : The text in the anchor tag that will link to the subpage (_Default: Read more_)
> - __tilebox__ : Enable the grid layout of the subpages ( _Default: false_ )


> Example:
```
 [subpage-list link="More information here" tilebox=true ]
```

### Accordion ###
> This is an accessible version of the accordion menu based off of Nicolas Hoffmann's [accessible jQuery accordion](http://a11y.nicolas-hoffmann.net/accordion/)
>
> Example:
```
  [accordion name='Accessible Accordion']
    [section title='Example'] Section[/section]
    [section title='Example'] Section[/section]
    [section title='Example'] Section[/section]
   [/accordion]
```


### Custom Menu ###
> This shortcode pulls in a custom menu that can be created under _Dashboard > Appearance > Menus_. Icons can be added in the class field in the menu builder. View the [full set of icons](http://www.washington.edu/brand/web-2/html-web-components/web-icons/) for more information.
>
> Example:
```
  [custommenu menu=Menu-name-here]
```
> Attributes:

> -  __menu__ : Enter the name of the menu found in _Dashboard > Appearance > Menus_. (_Default: Main menu_)


### Tagboard ###
> This shortcode embeds a Tagboard feed onto the page. Tagboards that you wish to embed should already be embeddable. You can check that your Tagboard is embeddable by visiting the Tagboard's dashboard and looking for the embed icon.

>Attributes:

> - __slug__ : the ID of your Tagboard. This can be found by visiting your Tagboard's dashboard and looking for the 6-digit ID at the end of the url. (_Default: none_)
> - __layout__ : the layout of the Tagboard. Options: grid, waterfall, carousel (_Default: grid_)
> - __post-count__ : the number of posts to display (_Default: 50_)
> - __mobile-count__ : the number of posts to display on mobile (_Default: 50_)
> - __toolbar__ : whether or not the toolbar is displayed. Options: default, none. (_Default: default_)
> - __feed-type__ : auto or default. Choosing auto will only show featured posts. If toolbar="default", choosing default will allow the user to show latest posts or featured posts. (_Default: default_)
>
> Example:
```
      [tagboard slug="435487" layout="waterfall" post-count="30" mobile-count="15" toolbar="none" feed-type="auto"]
```



## Features
- - -

### UW Widget Visibility ###

> This feature provides granular control over where each widget appears on your site. It is based on the [JetPack Widget Visibilityj plugin](http://jetpack.me/support/widget-visibility/) and allows you to choose specific pages, authors, categories etc. to show a widget on. Follow the link for a brief tutorial on its usage.

### UW Media Credit ###

> This feature allows images to have author credits next to them. When an image is selected in the Media Library a field for Media Credit will appear next to its other attributes. This credit will always appear after the image caption.

## Plugin Guides
- - -

Additional plugins can be used to extend the functionality of the UW-2014 theme. A number of them can be found at the University Markeitng & Communications [Github repository](http://github.com/uweb).

### Marketo Forms ###

> This WordPress plugin provides content authors with two short codes they can use on their pages to invoke the Marketo Subscription widget and UW Preference Center widget.  The code for both of these widgets are JavaScript files that are provided by the Information Management team in Central Advancement.  More information about that code can be found here:  https://uwmarketo.freshdesk.com/support/solutions/articles/33000214924-how-can-i-add-a-call-out-button-on-my-website-for-people-to-sign-up-for-our-enews-

#### Marketo Subscription widget
The Marketo Subscription widget allows visitors to sign up for one or more Marketo emails/newsletters.  To place the Marketo Subscription widget on a page, use the following shortcode:

```
    [uw-subscription-form subscriptionid="1234" fromname="Department of Redundancy Department" fromemail="raddept@uw.edu" showplaceholders="true" hidelabels="true" returnurl=""]
```

All of the attributes are optional; if no attribute is supplied a default value will be used.  The attributes are:

> - **subscriptionid**:  This is the ID number of your Marketo email/newsletter.  The E-Communications team can get this number for you if you do not already know it.  If you want to subscribe to more than one, you can separate ID's with a comma (eg, subscriptionid="1234,1235,1236").  The default subscription is "27."  This must be a number!
> - **fromname**:  This is name you would like users to see in the From line of the email.  The default name is "UW Email Sign Up."
> - **fromemail**:  This is the email address associated with the from name.  The default address is "mktosubp@uw.edu."  This must be a valid email address.
> - **showplaceholders**:  This true/false option will show the field names inside of the form field if set to true.  The default value is false.  If set to false, it is recommended to set hidelables to false.
> - **hidelabels**:  This true/false option will hide the labels above the form fields if set to true.  The default value is false.  If set to true, it is recommended to set showplaceholders to true.
> - **returnurl**:  If during the subscription process, you want the user to be taken to another location, enter that here.  The default is to send the user back to the same page.  It is highly recommended not to change this unless you know what you are doing!


#### UW Preference Center widget
The UW Preference Center widget allows visitors to manage all of their Marketo subscriptions in one place.  To place the UW Preference Center widget on a page, use the following shortcode:

```
     [uw-preference-center preferenceid="1234" managepreferences="true" fromname="Department of Redundancy Department" fromemail="raddept@uw.edu" showheader="true"]
```

All of the attributes are optional; if no attribute is supplied a default value will be used.  The attributes are:

> - **preferenceid**: This is the ID number of your Marketo organization (ie, the account under which all of your emails/newsletters live).  The E-Communications team can get this number for you if you do not already know it.  The default value is "21."
> - **managepreferences**: This true/false value will determine if the user can manage all of their Marketo preferences through this widget.  The default value is true, and it is highly recommended to keep that value.
> - **fromname**:  This is name you would like users to see in the From line of the email and throughout the Preference Center.  The default name is "UW Email Sign Up."
> - **fromemail**:  This is the email address associated with the from name.  The default address is "mktosubp@uw.edu."  This must be a valid email address.
> - **showheader**:  This true/false value will determine whether the Preference Center header is shown.  The default value is true, but you are advised to try both true and false values to determine which look may be most appropriate for your site.

### Contact Form 7 ###

> [Contact Form 7](https://wordpress.org/plugins/contact-form-7/) is the contributed form building plugin used by the UMAC Web Team for creating simple web forms.

#### Preventing spam

> Spam messages can cause headaches and security issues on any website. It's important to always enable anti-spam meausres when creating any web form. Ensure that name or email address fields are required for all forms. [Akismet](https://wordpress.org/plugins/akismet/) is highly recommended for all WordPress sites and can be used with Conact Form 7. ensure that Akismet is enabled and add the akisement:author and akisment:author_email are added to the respectives form fields, similar to the example below:

```html
&lt;p&gt;Your Name (required)&lt;br /&gt;
    [text* your-name akismet:author] &lt;/p&gt;

&lt;p&gt;Your Email (required)&lt;br /&gt;
    [email* your-email akismet:author_email] &lt;/p&gt;
```

> Further prevention to block spam bots from submitting forms can be added with a simple quiz field appended to your form. Quizzes are required by default. Example:

```
&lt;p&gt;Spam verification (required)&lt;br /&gt;
    [quiz quiz-134 &quot;Which of these is a color: hand, purple, grass?|purple&quot;
    &quot;What is the capital of France?|Paris&quot;
    &quot;Which number is larger, 43 or 16?|43&quot;]&lt;/p&gt;
```

## Creators
- - -
[Dane Odekirk](https://github.com/daneodekirk)
[Jon Swanson](https://github.com/swansong)
[Kilian Frey](https://github.com/kilianf)

## Contributors
- - -
[Ben Erickson](https://github.com/nambuben)


## License
- - -
GPL-2.0+
