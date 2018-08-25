<!-- Services Section -->
<?php
$mst = esc_attr (get_theme_mod( 'services_title' ));
$msd = esc_attr (get_theme_mod( 'services_desc' ));
?>
<div class="clear"></div>
<div class="container" id="service_section">	
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

<div class="container">
<?php
//$count = get_theme_mod( 'services_quantity', 4 );
$count = 12;
//
$w = 25;
switch ($count) {
	case 1:
		$w = 100;
		break;
	case 2:
		$w = 50;
		break;
	case 3:
		$w = 33;
		break;
}
//
for( $i=1; $i<=$count; $i++) {
	$id = get_theme_mod( 'service_page_'.$i , '' );
	//
	if( $id != '' && $id != 'hide'):
		
		$bg = get_theme_mod( 'service_bgcolor'.$i , '' );
		$color = get_theme_mod( 'service_text_color'.$i , '' );
		
		echo "<style type=\"text/css\">
			.service-area-$i,
			.service-area-$i h2 > a,
			.service-area-$i p{
				background-color:$bg;
				color:$color;}
			</style>";
		
		?><div class="hc_service_area <?php echo "service-area-$i sw-$w"; ?>"><?php
		// Get page content by id
		$post = get_post($id);
		$desc = apply_filters('the_content', $post->post_content);
		$title = esc_attr( $post->post_title );
		// Alternative desciption
		if ( get_theme_mod( 'service_summary'.$i , false) ) $desc = esc_attr(get_theme_mod( 'service_summary'.$i));
		// Url
		$link = esc_url(get_theme_mod( 'service_link'.$i, '' ));
		if ( $link == '' ) $link = get_permalink( $post->ID );
		// Get post fetured image
		$image = false;
		if (has_post_thumbnail( $id )) {
			$image = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'medium' );
			$image = $image['0'];
		}
		// Icon
		$icon = esc_attr(get_theme_mod( 'service_icon'.$i, "fa-briefcase"));
		// Other
		$color = esc_attr(get_theme_mod( 'service_color'.$i ));
		// style
		$color = str_replace("#999",$color,'style="border-color:#999; color:#999;"');
		// button
		$button = '';
		if ( get_theme_mod( 'service_button'.$i , false) )
			$button = "<p><b><a href=\"$link\" class=\"btn-arr\">".esc_attr(get_theme_mod( 'service_button'.$i))."</a></b></p>";
		//
		if ($image):?>
			<a href="<?php echo $link; ?>"><img class="service-featured-image" src="<?php echo esc_url($image);?>" /></a>
			<h2><a href="<?php echo $link; ?>"><?php echo $title; ?></a></h2>
			<p><?php echo $desc; ?> </p>
            <?php echo $button; ?>
		<?php else: ?>
			<a href="<?php echo $link; ?>"><i class=" fa <?php echo $icon; ?>" <?php echo $color;?>></i></a>
			<h2><a href="<?php echo $link; ?>"><?php echo $title; ?></a></h2>
			<p><?php echo $desc; ?> </p>
            <?php echo $button; ?>
		<?php endif; ?>
		</div><!-- end hc_service_area -->
		<?php
		endif;
	if ($i % 2 == 0) echo '<div class="clear-2"></div>';
	if ($i % 4 == 0) echo '<div class="clear"></div>';
}
?>
</div><!--container-->
<div class="hr-b"></div>
<div class="clear"></div>
	