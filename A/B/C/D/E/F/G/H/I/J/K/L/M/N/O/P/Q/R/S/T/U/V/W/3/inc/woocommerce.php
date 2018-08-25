<?php

if ( ! function_exists( 'get_woocommerce_page_id' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 */
function get_woocommerce_page_id() {
	if( is_shop() ){
        return get_option( 'woocommerce_shop_page_id' );
    }
    elseif( is_cart() ){
        return get_option( 'woocommerce_cart_page_id' );
    }
    elseif(is_checkout() ){
        return get_option( 'woocommerce_checkout_page_id' );
    }
    elseif(is_checkout_pay_page() ){
        return get_option( 'woocommerce_pay_page_id' );
    }
    elseif(is_account_page() ){
        return get_option( 'woocommerce_myaccount_page_id' );
    }
    return false;
}
endif;

/**
* is_it_woocommerce_page - Returns true if on a page which uses WooCommerce templates (cart and checkout are standard pages with shortcodes and which are also included)
*/
if ( ! function_exists( 'is_it_woocommerce_page' ) ) :

function is_it_woocommerce_page () {
        if(  function_exists ( "is_woocommerce" ) && is_woocommerce()){
                return true;
        }
        $woocommerce_keys   =   array ( "woocommerce_shop_page_id" ,
                                        "woocommerce_terms_page_id" ,
                                        "woocommerce_cart_page_id" ,
                                        "woocommerce_checkout_page_id" ,
                                        "woocommerce_pay_page_id" ,
                                        "woocommerce_thanks_page_id" ,
                                        "woocommerce_myaccount_page_id" ,
                                        "woocommerce_edit_address_page_id" ,
                                        "woocommerce_view_order_page_id" ,
                                        "woocommerce_change_password_page_id" ,
                                        "woocommerce_logout_page_id" ,
                                        "woocommerce_lost_password_page_id" ) ;
        foreach ( $woocommerce_keys as $wc_page_id ) {
                if ( get_the_ID () == get_option ( $wc_page_id , 0 ) ) {
                        return true ;
                }
        }
        return false;
}

endif;

/**
* WooCommerce Hooks
*/
remove_action( 'woocommerce_before_main_content', 'woocommerce_output_content_wrapper', 10);
remove_action( 'woocommerce_after_main_content', 'woocommerce_output_content_wrapper_end', 10);
add_action('woocommerce_before_main_content', 'my_theme_wrapper_start', 10);
add_action('woocommerce_after_main_content', 'my_theme_wrapper_end', 10);

function my_theme_wrapper_start() {
  echo '<main id="main">';
}

function my_theme_wrapper_end() {
  echo '</section>';
}
?>