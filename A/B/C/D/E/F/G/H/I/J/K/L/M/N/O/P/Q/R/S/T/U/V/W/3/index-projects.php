<!--Projects Section-->
<?php
$mst = esc_attr (get_theme_mod( 'projects_title' , 'Nunc porta lectus dolor'));
$msd = esc_attr (get_theme_mod( 'projects_desc' , '"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."' ));
?>
<div class="container" id="project-section">	
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

<div class="container" id="project_section">
<?php
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

//////
for( $i=1; $i<=$count; $i++) {
	$id = get_theme_mod( 'project_page'.$i , '' );
	//
	if( $id != '' && $id != 'hide'):?>
        <div class="hc_service_area <?php echo "sw-$w"; ?>"><?php
		// Get page content by id
		$post = get_post($id);
		
		$title = get_theme_mod( 'project_title'.$i );
		$desc = get_theme_mod( 'project_description'.$i );
		
		if ( $title == '' ) $title = esc_attr( $post->post_title );
		if ( $desc == '' ) $desc = apply_filters('the_content', $post->post_content);
		
		// Url
		$link = esc_url(get_theme_mod( 'project_link'.$i, '' ));
		if ( $link == '' ) $link = get_permalink( $post->ID );
		
		// Get post fetured image
		$image = false;
		if (has_post_thumbnail( $id )) {
			$image = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'medium' );
			$image = $image['0'];
		}
		
		// image?
		if ( !$image ) $image = get_template_directory_uri() . '/images/thumbnail.png';
		?>
            <a href="<?php echo $link; ?>"><img class="service-featured-image" src="<?php echo esc_url($image);?>" /></a>
            <h2><a href="<?php echo $link; ?>"><?php echo $title; ?></a></h2>
            <p><?php echo $desc; ?> </p>
		</div><!-- end hc_service_area -->
		<?php
		endif;
	if ($i % 2 == 0) echo '<div class="clear-2"></div>';
	if ($i % 4 == 0) echo '<div class="clear"></div>';
}

?>
</div><!--container-->
<div class="hr-b"></div>
