<!-- Testimonials Section -->
<?php
$mst = esc_attr (get_theme_mod( 'testimonial_title' , 'Nunc porta lectus dolor'));
$msd = esc_attr (get_theme_mod( 'testimonial_desc' , '"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."' ));
?>
<div class="container" id="testimonials-section">	
    <div class="hc_service_title">
        <?php if($mst!='') { ?>
        	<h1><?php echo $mst; ?></h1>
        <?php } ?>
        <?php if($msd!='') { ?>
        	<p><?php echo $msd; ?>.</p>
        <?php } ?>		
    </div>
</div>	
    
<?php
if ( $mst or $msd ) echo '<div class="hr-a"></div>';
?>

<div class="container" id="testimonials">

<ul class="testimonials-slider">
<?php
$count = 20;
for( $i=1; $i<=$count; $i++) {
	$id = get_theme_mod( 'testimonial_page'.$i , '' );
	//
	if( $id != '' && $id != 'hide'):
		// Get page content by id
		$post = get_post($id);
		$author = str_replace( "\n", "<br />", get_theme_mod( 'testimonial_author'.$i ));
		$title = esc_attr( $post->post_title );
		$content = apply_filters('the_content', $post->post_content);
		$link = esc_url(get_theme_mod( 'testimonial_link'.$i ));
		
		// Get post fetured image
		$image = false;
		if (has_post_thumbnail( $id )) {
			$image = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'medium' );
			$image = $image['0'];
		}
		
		// image?
		if ( !$image ) $image = get_template_directory_uri() . '/images/user.png';?>
        <li class="titem">
            <div class="author">
				<?php if ($link) echo "<a href=\"$link\">";?>
                <img class="testimonial-featured-image" src="<?php echo esc_url($image);?>" />
                <span><?php echo $author; ?></span>
                <?php if ($link) echo "</a>";?>
            </div>
            <div class="content">
            	<?php echo $content; ?>
            </div>
			<div class="clear"></div>
        </li>
		<?php
		endif;
}

?>
</ul> <!-- .testimonials-slider -->
</div><!--container-->
<div class="hr-b"></div>