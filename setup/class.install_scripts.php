<?php
/**
 * This is where all the JS files are registered
 *    - bloginfo('template_directory')  gives you the url to the parent theme
 *    - bloginfo('stylesheet_directory')  gives you the url to the child theme
 */

class UW_Install_Scripts
{

    public $SCRIPTS;


    function UW_Install_Scripts()
    {
        $this->add_scripts();
        $this->add_actions();
    }

    private function add_scripts()
    {
        $this->SCRIPTS = array_merge( array(

            new EnqueueObject(array (
                'id'      => 'jquery',
                'url'     => 'https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js',
                'version' => '1.9.1',
            )),

            new EnqueueObject(array (
                'id'      => 'site',
                'url'     => get_bloginfo('template_directory') . '/js/site' . $this->dev_script() . '.js',
                'deps'    => array( 'backbone' ),
                'version' => '1.0.3',
            )),

            new EnqueueObject(array (
                'id'      => 'wp.admin',
                'url'     => get_bloginfo('template_directory') . '/js/admin/admin.js',
                'deps'    => array( 'jquery' ),
                'version' => '1.0',
                'admin'   => true
            )),
            //
            // new EnqueueObject => array (
            //   'id'      => 'jquery.searchposts',
            //   'url'     => get_bloginfo('template_directory') . '/js/admin/jquery.wp.searchposts.js',
            //   'deps'    => array( 'jquery', 'jquery-ui-autocomplete' ),
            //   'version' => '1.0',
            //   'admin'   => true
            // )

        ), $this->get_child_theme_scripts() );
    }

    private function add_actions()
    {
        add_action( 'wp_enqueue_scripts', array( $this, 'uw_register_default_scripts' ) );
        add_action( 'wp_enqueue_scripts', array( $this, 'uw_enqueue_default_scripts' ) );
        add_action( 'admin_enqueue_scripts', array( $this, 'uw_enqueue_admin_scripts' ) );

    }

    function uw_register_default_scripts()
    {
        wp_deregister_script( 'jquery' );

        foreach ( $this->SCRIPTS as $script )
        {
            wp_register_script(
                $script->id,
                $script->url,
                $script->deps,
                $script->version
            );

        }

    }

    function uw_enqueue_default_scripts()
    {
        foreach ( $this->SCRIPTS as $script )
        {
            if ( ! $script->admin ){
                wp_enqueue_script( $script->id );
            }
        }
    }

    function uw_enqueue_admin_scripts()
    {
        if ( ! is_admin() )
            return;

        foreach ( $this->SCRIPTS as $script )
        {
            if ( $script->admin )
            {

            wp_register_script(
                $script->id,
                $script->url,
                $script->deps,
                $script->version
            );

            wp_enqueue_script( $script->id );

            }
        }
    }

    private function get_child_theme_scripts()
    {
        return is_array( $this->SCRIPTS) ? $this->SCRIPTS : array();
    }

    public function dev_script()
    {
        return is_user_logged_in() ? '.dev' : '';
    }

}
