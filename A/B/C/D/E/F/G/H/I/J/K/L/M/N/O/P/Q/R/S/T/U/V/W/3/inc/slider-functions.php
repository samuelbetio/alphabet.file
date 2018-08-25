<?php
if ( ! function_exists( 'personalportfolio_slider' ) ) :
/**
 * display featured post slider
 */
function personalportfolio_slider() { ?>
	<div class="slider-wrap">
		<div class="slider-cycle">
			<?php
			for( $i = 1; $i <= get_theme_mod( 'slider_quantity', 4 ); $i++ ) {
				$personalportfolio_slider_title = get_theme_mod( 'slider_title'.$i , 'Lorem ipsum dolor sit amet, consectetur elit' );
				$personalportfolio_slider_text = get_theme_mod( 'slider_desc'.$i , 'Nulla convallis congue tortor vel imperdiet. Proin condimentum mattis dui nec faucibus. Donec placerat enim eget quam consequat, nec sollicitudin ex ultrices.' );
					if ($i>4) $default = get_template_directory_uri() . "/images/slider/1.jpg";
					else $default = get_template_directory_uri() . "/images/slider/$i.jpg";
				$personalportfolio_slider_image = get_theme_mod( 'slider_image'.$i, $default );
				$personalportfolio_slider_link = get_theme_mod( 'slider_link'.$i , '#' );

				if( !empty( $personalportfolio_slider_image ) ) {
					if ( $i == 1 ) { $classes = "slides displayblock"; } else { $classes = "slides displaynone"; }
					?>
					<section id="featured-slider" class="<?php echo $classes; ?>">
						<figure class="slider-image-wrap">
							<img alt="<?php echo esc_attr( $personalportfolio_slider_title ); ?>" src="<?php echo esc_url( $personalportfolio_slider_image ); ?>">
					    </figure>
					    <?php if( !empty( $personalportfolio_slider_title ) || !empty( $personalportfolio_slider_text ) ) { ?>
						    <article id="slider-text-box">
					    		<div class="inner-wrap">
						    		<div class="slider-text-wrap">
						    			<?php if( !empty( $personalportfolio_slider_title )  ) { ?>
							     			<span id="slider-title" class="clearfix"><a title="<?php echo esc_attr( $personalportfolio_slider_title ); ?>" href="<?php echo esc_url( $personalportfolio_slider_link ); ?>"><?php echo esc_html( $personalportfolio_slider_title ); ?></a></span>
							     		<?php } ?>
							     		<?php if( !empty( $personalportfolio_slider_text )  ) { ?>
							     			<span id="slider-content"><?php echo esc_html( $personalportfolio_slider_text ); ?></span>
							     		<?php } ?>
							     	</div>
							    </div>
							</article>
						<?php } ?>
					</section><!-- .featured-slider -->
				<?php
				}
			}
			?>
		</div>
        <!-- #controllers -->
		<nav id="controllers" class="clearfix"></nav>
        <!-- #prev, next -->
        <div id="prev-slide"><i class="fa fa-chevron-left"></i></div>
        <div id="next-slide"><i class="fa fa-chevron-right"></i></div>
    </div><!-- .slider-cycle -->
<?php
}
endif;

?>