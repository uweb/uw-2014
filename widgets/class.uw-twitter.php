<?php

//
//  Twitter widget
//
//  Uses the Twitter 1.1 API requiring oAuth authentication just
//  to read tweets. Because of the new Twitter request limit this
//  widget caches a user's latest tweets for a minute.
//

if ( defined( 'TWITTER_OAUTH_TOKEN' ) ) :

class UW_Widget_Twitter extends WP_Widget
{

  const ID             = 'uw-twitter-feed';
  const SHORTCODE      = 'twitter';
  const NAME           = 'UW Twitter Feed';
  const DESCRIPTION    = 'Display your latest tweets';
  const CLASSNAME      = 'twitter-feed-widget';

  const URL            = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
  const AUTHOR_URL     = 'https://api.twitter.com/1.1/users/show.json';
  const REQUESTMETHOD  = 'GET';
  const GETFIELD       = '?include_entities=true&include_rts=true&screen_name=%s&count=%u';
  const RETWEET_TEXT   = '<small>Retweeted by <a href="//twitter.com/%s"> @%s</a></small>';

  const COUNT          = 5;
  const ACCOUNT        = 'twitter';
  const EXPIRES        = 60;

  static $SETTINGS = array(
      'oauth_access_token'         => TWITTER_OAUTH_TOKEN,
      'oauth_access_token_secret'  => TWITTER_OAUTH_TOKEN_SECRET,
      'consumer_key'               => TWITTER_CONSUMER_KEY,
      'consumer_secret'            => TWITTER_CONSUMER_SECRET
  );

  function UW_Widget_Twitter()
  {
    parent::__construct(
      $id = self::ID,
      $name = self::NAME,
      $options = array(
          'description' => self::DESCRIPTION,
          'classname' => self::CLASSNAME
    ) );

    add_shortcode( self::SHORTCODE , array( $this, 'shortcode' ) );

  }

  function form($instance)
  {
    $title = isset($instance['title']) ? esc_attr($instance['title']) : self::NAME;
    $name  = isset($instance['name']) ? esc_attr($instance['name']) : self::ACCOUNT;
    $count = isset($instance['count']) ? esc_attr($instance['count']) : self::COUNT;
?>
    <p>
    <label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title:' ); ?></label>
    <input class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo esc_attr( $title ); ?>" />
    </p>

    <p>
    <label for="<?php echo $this->get_field_id( 'name' ); ?>"><?php _e( 'Twitter screen name:' ); ?></label>
    <input class="widefat" id="<?php echo $this->get_field_id( 'name' ); ?>" name="<?php echo $this->get_field_name( 'name' ); ?>" type="text" value="<?php echo esc_attr( $name ); ?>" />
    </p>

    <p>
    <label for="<?php echo $this->get_field_id( 'count' ); ?>"><?php _e( 'Number of tweets to show:' ); ?></label>
    <input class="widefat" id="<?php echo $this->get_field_id( 'count' ); ?>" name="<?php echo $this->get_field_name( 'count' ); ?>" type="text" value="<?php echo esc_attr( $count ); ?>" />
    </p>
<?php
  }

  function update( $new_instance, $old_instance )
  {
    $instance = array();
    $instance['title'] = strip_tags( $new_instance['title'] );
    $instance['name']  = strip_tags( $new_instance['name'] );
    $instance['count'] = intval( $new_instance['count'] );
    return $instance;
  }

  function shortcode( $atts )
  {
    extract( $atts );

    $tweets = $this->getLatestTweets( $name, $count );

    if ( ! is_array( $tweets ) ) return;
    
    $output = '<div class="widget uw-twitter">';

    if ( ! empty( $title ) ){
      $output = $output .    '<h2 class="widgettitle">' . $title . '</h2>';
    }

    $output = $output .    '<div class="twitter-feed" data-name="' . $name . '" data-count="' . $count . '">';

    foreach ( $tweets as $tweet ) : $tweet = (object) $tweet;

      $output = $output .    '<div class="tweet">';
      $output = $output .      '<a href="//twitter.com/' . $tweet->author . '"><img src="' . $tweet->img . '" alt="' . $tweet->author . '"/></a>';
      $output = $output .      '<p><a href="//twitter.com/' . $tweet->author . '"><span>@' . $tweet->author . '</span></a> ' . $tweet->text . ' ' . $tweet->retweet . '</p>';
      $output = $output .    '</div>';

    endforeach;

    $output = $output .    '<a class="more" href="//twitter.com/' . $name . '">More</a>';
    $output = $output .  '</div>';
    $output = $output . '</div>';
    
    return $output;
  }

  function widget($args, $instance)
  {
    extract($instance);
    echo do_shortcode(sprintf("[twitter title=\"%s\" count=%s name=%s]", $title, $count, $name));
  }


  private function getLatestTweets( $name = 'uw', $count = 5 )
  {

    $transientName = 'twitter-feed-'. $name . '-' . $count;

    //if ( false == get_transient( $transientName ) ) {

      $parameters = sprintf(self::GETFIELD, $name, $count );

      $twitter    = new TwitterAPIExchange(self::$SETTINGS);

      $twitter->setGetfield( $parameters )
              ->buildOauth(self::URL, self::REQUESTMETHOD);

      $tweets = json_decode( $twitter->performRequest() );

      foreach ($tweets as $index => $tweet)
      {
        $hasAuthor = ( count($tweet->entities->user_mentions) > 0 );
        $retweet   = ( strpos( $tweet->text , 'RT' ) === 0 );

        $latest[$index]['author'] = $retweet ? $tweet->entities->user_mentions[0]->screen_name :
                                                  $tweet->user->screen_name;

        if ( $hasAuthor )
        {

          $twitter->setGetfield( '?screen_name=' . $latest[$index]['author'] )
                  ->buildOauth( self::AUTHOR_URL, self::REQUESTMETHOD );

          $user = json_decode( $twitter->performRequest() );

        }

        $latest[$index]['img']    = $hasAuthor ? $user->profile_image_url_https :
                                                 $tweet->user->profile_image_url_https;

        $latest[$index]['text']   = $this->formatText( $tweet->text );

        $latest[$index]['retweet'] = $retweet ? sprintf( self::RETWEET_TEXT, $tweet->user->screen_name, $tweet->user->screen_name ) : '';


      }

      // json_encode fixed get_transient returning serialized string instead of array for some tweets
      //set_transient( $transientName , json_encode( $latest ) , self::EXPIRES );
      //trying to not set transient so that twitter updates actually

   // }

    //return json_decode( get_transient( $transientName ) );
      return $latest;
  }

  private function formatText( $text )
  {

    $text = preg_replace( '/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/',
                          '<a href="\\0">\\0</a>', $text );

    $text = preg_replace_callback(  '/[#]+[A-Za-z0-9-_]+/',
                                    array( $this, 'encodeHashTag'),
                                    $text );

    $text = preg_replace_callback(  '/[@]+[A-Za-z0-9-_]+/',
                                    array( $this, 'normalizeScreenName'),
                                    $text );
    return $text;
  }

  private function encodeHashTag( $hashTag )
  {
    return '<a href="//twitter.com/search?q=' . urlencode($hashTag[0]) . '"> ' . $hashTag[0] . ' </a>';
  }

  private function normalizeScreenName( $screenname )
  {
    return '<a href="//twitter.com/' . str_replace( '@', '', $screenname[0] ) . '">' . $screenname[0] . '</a>';
  }

}
require( get_template_directory() . '/assets/frameworks/TwitterAPIExchange.php' );

register_widget( 'UW_Widget_Twitter' );

endif;
