<!-- Customers Section -->
<?php
$mst = esc_attr (get_theme_mod( 'customers_title' , 'Nunc porta lectus dolor'));
$msd = esc_attr (get_theme_mod( 'customers_desc' , '"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."' ));
?>
<div class="container" id="customers-section">	
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

<div class="container customers-section">

<ul class="customers-slider <?php if ( get_theme_mod( 'customers_grayscale', 0 ) ) echo 'disable-bw';?>"> 
<?php
for( $i=1; $i<=30; $i++) {
	if ( $i <= 15 ) $image = $i;
		else $image = 'none';
	$logo = get_theme_mod( 'customer_logo'.$i , get_template_directory_uri() . "/images/customers/$image.png" );
	if( $logo != '' && $logo != false ):
		$link = get_theme_mod( 'customer_link'.$i, false );?>
        <li class="citem">
            <div class="customer-logo<?php if ($link) echo "-wrapper";?>">
				<?php if ($link) echo "<a class=\"customer-logo\" target=\"_blank\" href=\"$link\">";?>
                <img class="customer-featured-image" src="<?php echo esc_url($logo);?>" />
                <?php if ($link) echo "</a>";?>
            </div>
			<div class="clear"></div>
        </li>
		<?php
		endif;
}

?>
</ul> <!-- .customers-slider -->
</div><!--container-->
<div class="hr-b"></div>