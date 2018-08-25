<?php
/**
 * Custom template tags for this theme.
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package Personal Portfolio

 */

if ( ! function_exists( 'personalportfolio_posted_on' ) ) :
/**
 * Prints HTML with meta information for the current post-date/time and author.
 */
function personalportfolio_posted_on() {
	$time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';
	if ( get_the_time( 'U' ) !== get_the_modified_time( 'U' ) ) {
		$time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time><time class="updated" datetime="%3$s">%4$s</time>';
	}

	$time_string = sprintf( $time_string,
		esc_attr( get_the_date( 'c' ) ),
		esc_html( get_the_date() ),
		esc_attr( get_the_modified_date( 'c' ) ),
		esc_html( get_the_modified_date() )
	);

	$posted_on = '<a href="' . esc_url( get_permalink() ) . '" rel="bookmark">' . $time_string . '</a>';

	if ( get_theme_mod( 'display_post_date' , 1) )
		echo '<span class="posted-on"><i class="fa fa-calendar"></i> ' . $posted_on . '</span>';
	
	edit_post_link( __( 'Edit', 'personal-portfolio' ), '<span class="edit-link"><i class="fa fa-edit"></i> ', '</span>' );
	
	if ( ! is_single() && ! post_password_required() && ( comments_open() || get_comments_number() ) ) {
		echo '<span class="comments-link"><i class="fa fa-comments"></i> ';
		comments_popup_link( __( 'Leave a comment', 'personal-portfolio' ), __( '1 Comment', 'personal-portfolio' ), __( '% Comments', 'personal-portfolio' ) );
		echo '</span>';
	}
}
endif;

if ( ! function_exists( 'personalportfolio_entry_footer' ) ) :
/**
 * Prints HTML with meta information for the categories, tags and comments.
 */
function personalportfolio_entry_footer() {
	if ( is_sticky() && is_home() && ! is_paged() ) {printf( '<span class="sticky-post"><i class="fa fa-star"></i> %s</span>', __( 'Featured', 'personal-portfolio' ) );}
	
	$byline = '<span class="author vcard"><a class="url fn n" href="' . esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ) . '">' . esc_html( get_the_author() ) . '</a></span>';
	if ( get_theme_mod( 'display_post_author' , 1) ) echo '<span class="byline"><i class="fa fa-user"></i> ' . $byline . '</span>';
	
	// Hide category and tag text for pages.
	if ( 'post' == get_post_type() ) {
		/* translators: used between list items, there is a space after the comma */
		$categories_list = get_the_category_list( __( ', ', 'personal-portfolio' ) );
		if ( get_theme_mod( 'display_post_categories' , 1) && $categories_list && personalportfolio_categorized_blog() ) {
			printf( '<span class="cat-links"><i class="fa fa-folder"></i> ' . '%1$s' . '</span>', $categories_list );
		}

		/* translators: used between list items, there is a space after the comma */
		$tags_list = get_the_tag_list( '', __( ', ', 'personal-portfolio' ) );
		if ( get_theme_mod( 'display_post_tags' , 1) && $tags_list ) {
			printf( '<span class="tags-links"><i class="fa fa-tags"></i> ' . '%1$s' . '</span>', $tags_list );
		}
	}
}
endif;

if ( ! function_exists( 'personalportfolio_archive_title' ) ) :
function personalportfolio_archive_title( $before = '', $after = '' ) {
	if ( is_category() ) {
		$title = '<i class="fa fa-folder-open"></i> '. sprintf( __( 'Category: %s', 'personal-portfolio' ), single_cat_title( '', false ) );
	} elseif ( is_tag() ) {
		$title = '<i class="fa fa-tag"></i> ' . sprintf( __( 'Tag: %s', 'personal-portfolio' ), single_tag_title( '', false ) );
	} elseif ( is_author() ) {
		$title = '<i class="fa fa-user"></i> ' . sprintf( __( 'Author: %s', 'personal-portfolio' ), '<span class="vcard">' . get_the_author() . '</span>' );
	} elseif ( is_year() ) {
		$title = '<i class="fa fa-calendar-o"></i> ' . sprintf( __( 'Year: %s', 'personal-portfolio' ), get_the_date( _x( 'Y', 'yearly archives date format', 'personal-portfolio' ) ) );
	} elseif ( is_month() ) {
		$title = '<i class="fa fa-calendar-o"></i> ' . sprintf( __( 'Month: %s', 'personal-portfolio' ), get_the_date( _x( 'F Y', 'monthly archives date format', 'personal-portfolio' ) ) );
	} elseif ( is_day() ) {
		$title = '<i class="fa fa-calendar-o"></i> ' . sprintf( __( 'Day: %s', 'personal-portfolio' ), get_the_date( _x( 'F j, Y', 'daily archives date format', 'personal-portfolio' ) ) );
	} elseif ( is_tax( 'post_format' ) ) {
		if ( is_tax( 'post_format', 'post-format-aside' ) ) {
			$title = _x( 'Asides', 'post format archive title', 'personal-portfolio' );
		} elseif ( is_tax( 'post_format', 'post-format-gallery' ) ) {
			$title = _x( 'Galleries', 'post format archive title', 'personal-portfolio' );
		} elseif ( is_tax( 'post_format', 'post-format-image' ) ) {
			$title = _x( 'Images', 'post format archive title', 'personal-portfolio' );
		} elseif ( is_tax( 'post_format', 'post-format-video' ) ) {
			$title = _x( 'Videos', 'post format archive title', 'personal-portfolio' );
		} elseif ( is_tax( 'post_format', 'post-format-quote' ) ) {
			$title = _x( 'Quotes', 'post format archive title', 'personal-portfolio' );
		} elseif ( is_tax( 'post_format', 'post-format-link' ) ) {
			$title = _x( 'Links', 'post format archive title', 'personal-portfolio' );
		} elseif ( is_tax( 'post_format', 'post-format-status' ) ) {
			$title = _x( 'Statuses', 'post format archive title', 'personal-portfolio' );
		} elseif ( is_tax( 'post_format', 'post-format-audio' ) ) {
			$title = _x( 'Audio', 'post format archive title', 'personal-portfolio' );
		} elseif ( is_tax( 'post_format', 'post-format-chat' ) ) {
			$title = _x( 'Chats', 'post format archive title', 'personal-portfolio' );
		}
	} elseif ( is_post_type_archive() ) {
		$title = sprintf( __( 'Archives: %s', 'personal-portfolio' ), post_type_archive_title( '', false ) );
	} elseif ( is_tax() ) {
		$tax = get_taxonomy( get_queried_object()->taxonomy );
		/* translators: 1: Taxonomy singular name, 2: Current taxonomy term */
		$title = sprintf( __( '%1$s: %2$s', 'personal-portfolio' ), $tax->labels->singular_name, single_term_title( '', false ) );
	} else {
		$title = __( 'Archives', 'personal-portfolio' );
	}

	/**
	 * Filter the archive title.
	 *
	 * @param string $title Archive title to be displayed.
	 */
	$title = apply_filters( 'get_the_archive_title', $title );

	if ( ! empty( $title ) ) {
		echo $before . $title . $after;
	}
}
endif;

if ( ! function_exists( 'personalportfolio_archive_description' ) ) :
function personalportfolio_archive_description( $before = '', $after = '' ) {
	$description = apply_filters( 'get_the_archive_description', term_description() );

	if ( ! empty( $description ) ) {
		/**
		 * Filter the archive description.
		 *
		 * @see term_description()
		 *
		 * @param string $description Archive description to be displayed.
		 */
		echo $before . $description . $after;
	}
}
endif;

/**
 * Returns true if a blog has more than 1 category.
 *
 * @return bool
 */
function personalportfolio_categorized_blog() {
	if ( false === ( $all_the_cool_cats = get_transient( 'personalportfolio_categories' ) ) ) {
		// Create an array of all the categories that are attached to posts.
		$all_the_cool_cats = get_categories( array(
			'fields'     => 'ids',
			'hide_empty' => 1,

			// We only need to know if there is more than one category.
			'number'     => 2,
		) );

		// Count the number of categories that are attached to the posts.
		$all_the_cool_cats = count( $all_the_cool_cats );

		set_transient( 'personalportfolio_categories', $all_the_cool_cats );
	}

	if ( $all_the_cool_cats > 1 ) {
		// This blog has more than 1 category so personalportfolio_categorized_blog should return true.
		return true;
	} else {
		// This blog has only 1 category so personalportfolio_categorized_blog should return false.
		return false;
	}
}

/**
 * Flush out the transients used in personalportfolio_categorized_blog.
 */
function personalportfolio_category_transient_flusher() {
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	// Like, beat it. Dig?
	delete_transient( 'personalportfolio_categories' );
}
add_action( 'edit_category', 'personalportfolio_category_transient_flusher' );
add_action( 'save_post',     'personalportfolio_category_transient_flusher' );


function personalportfolio_theme_comment($comment,$args,$depth){
	$GLOBALS['comment'] = $comment;
	
	if ( 'pingback' == $comment->comment_type || 'trackback' == $comment->comment_type ) {
?>

	<li id="comment-<?php comment_ID(); ?>" <?php comment_class(); ?>>
		<div class="comment-body">
			<?php echo __( 'Pingback:', 'personal-portfolio' ); ?> <?php comment_author_link(); ?> <?php edit_comment_link( __( 'Edit', 'personal-portfolio' ), '<span class="edit-link">', '</span>' ); ?>
		</div>

<?php
	}else{
?>
	<li id="comment-<?php comment_ID(); ?>" <?php comment_class( empty( $args['has_children'] ) ? '' : 'parent' ); ?>>
		<div id="div-comment-<?php comment_ID(); ?>" class="comment-body">
            <div class="comment-author"><?php if ( 0 != $args['avatar_size'] ) echo get_avatar( $comment, $args['avatar_size'] ); ?></div>
        
			<div class="comment-meta">
            	<span class="fn"><?php echo get_comment_author_link();?></span>
				<span><?php printf( _x( '%1$s at %2$s', '1: date, 2: time', 'personal-portfolio' ), get_comment_date(), get_comment_time() ); ?></span>
                <?php edit_comment_link( __( 'Edit', 'personal-portfolio' ), '<span><i class="fa fa-edit"></i> ', '</span>' ); ?>

				<?php if ( '0' == $comment->comment_approved ) : ?>
				<p class="comment-awaiting-moderation"><?php echo __( 'Your comment is awaiting moderation.', 'personal-portfolio' ); ?></p>
				<?php endif; ?>
			</div>

			<div class="mscon comment-content"><?php comment_text();?></div>

			<div class="reply"><?php comment_reply_link( array_merge( $args, array('reply_text' => '<i class="fa fa-retweet"></i>', 'add_below' => 'div-comment', 'depth' => $depth, 'max_depth' => $args['max_depth'] ) ) ); ?></div>
            
            <div class="clear"></div>
		</div>
<?php
	}
}

function personalportfolio_image_navigation(){
?>
<nav role="navigation" id="page-nav-below" class="navigation-image nav-links">
    <div class="nav-previous"><?php previous_image_link( false, '<i class="fa fa-chevron-left"></i> '. __( 'Previous', 'personal-portfolio' ) ); ?></div>
	<div class="nav-next"><?php next_image_link( false, __( 'Next', 'personal-portfolio' ) . ' <i class="fa fa-chevron-right"></i>' ); ?></div>
</nav><!-- #image-navigation -->
<?php
}

function personalportfolio_posts_navigation(){
	if(function_exists('wp_pagenavi')) {
		wp_pagenavi();
	}else{
		if(function_exists('the_posts_pagination')){
			the_posts_pagination( array(
				'prev_text'          => '<i class="fa fa-arrow-left"></i>',
				'next_text'          => '<i class="fa fa-arrow-right"></i>',
				'before_page_number' => '<span class="meta-nav screen-reader-text">' . __( 'Page', 'personal-portfolio' ) . ' </span>',
			) );
		}else{
	?>
        <div id="page-nav-below">
			<?php if ( get_next_posts_link() ) : ?>
            <div class="nav-previous"><i class="fa fa-arrow-left"></i> <?php next_posts_link( __( 'Older posts', 'personal-portfolio' ) ); ?></div>
            <?php endif; ?>
    
            <?php if ( get_previous_posts_link() ) : ?>
            <div class="nav-next"><?php previous_posts_link( __( 'Newer posts', 'personal-portfolio' ) ); ?> <i class="fa fa-arrow-right"></i></div>
            <?php endif; ?>
        </div>
	<?php
				}
	}
}

function personalportfolio_post_navigation(){
	global $post;
	$previous = ( is_attachment() ) ? get_post( $post->post_parent ) : get_adjacent_post( false, '', true );
	$next = get_adjacent_post( false, '', false );
	if ( ! $next && ! $previous ) return;

	echo '<div role="navigation" id="nav-below" class="navigation-post">';
	previous_post_link( '<div class="nav-previous">%link</div>', '<i class="fa fa-arrow-left"></i> %title');
	next_post_link( '<div class="nav-next">%link</div>', '%title <i class="fa fa-arrow-right"></i>'); 
	echo '<div class="clear"></div>';
	echo '</div>';
}
/*
Contains the closing of the #content div and all content after
Proudly powered by WordPress
<span class="sep"> &amp; </span>
<strong>Personal Portfolio WordPress Theme</strong> by <a href="http://dinozoom.com"><strong>Dinozoom.com</strong></a>.
*/
function personalportfolio_wp_footer () {
global $paged;
dinozoom_sidebar( 'right' );
	/// CTA
	if( get_theme_mod( 'enable_cta', 1 ) && get_theme_mod('cta_sitewide' ) ):
		dinozoom_cta ();
	elseif ( get_theme_mod( 'enable_cta', 1 ) && is_front_page() && $paged <= 1 ):
		dinozoom_cta ();
	endif;?>
    
	</div><!-- #content -->
	<footer id="colophon" class="site-footer" role="contentinfo">
		<div class="site-info">
        	<div class="footer-social-media"><?php personalportfolio_social_media ("footer");?></div>
        	<div class="site-description">
				<?php personalportfolio_contact( "footer" );?>
			</div>
            <?php if( get_theme_mod( 'footer_map' ) ) printf( '<div class="footer-embed-map">%1$s</div>', get_theme_mod('footer_map') );?>
            
        	<div class="copyright">
				<?php printf( __( 'Copyright &copy; %1$d %2$s.', 'personal-portfolio' ), date('Y'), personalportfolio_site_link() );?>
				<span class="sep"> &amp; </span>
                <?php
				/* 
				All links in the footer should remain intact. 
				These links are all family friendly and will not hurt your site in any way. 
				Warning! Your site may stop working if these links are edited or deleted 
				You can buy this theme without footer links online at http://dinozoom.com
				*/
                $sites = array(
				'playallfreeonlinegames.com' => 'Games',
				'dinozoom.com' => 'WordPress Themes',
				'tedavisibu.com' => 'tedavisibu.com',
				'alvele.com' => 'alvele.com',
				'ilikethisgame.com' => 'ilikethisgame.com' );
                $sites = dinozoom_assoc($sites);
                printf('Thanks to <a href="http://%1$s">%2$s</a>', current(array_keys($sites)), ucfirst( current($sites)) ); ?>
                <span class="sep"> &amp; </span>
                <?php printf( __( 'Theme designed by %s', 'personal-portfolio' ), 'Dinozoom.com' ); ?>
            </div><!-- .copyright -->
		</div><!-- .site-info -->
	</footer><!-- #colophon -->
    <div id="back_top"><i class="fa fa-angle-up"></i></div>
</div><!-- #page -->
<?php wp_footer(); ?>
</body></html>
<?php
} // end function

// Dinoozom
function dinozoom_assoc($list) { 
  if (!is_array($list)) return $list; 
  $keys = array_keys($list); 
  shuffle($keys); 
  $random = array(); 
  foreach ($keys as $key) $random[$key] = $list[$key]; 
  return $random; 
}
// Dinoozom CTA
function dinozoom_cta () {
	?>
	<div id="cta">
    	<div class="text">
        	<div class="title"><?php echo esc_attr(get_theme_mod('cta_title', __('Hello, World!', 'personal-portfolio')) );?></div>
            <div class="desc"><?php echo esc_attr(get_theme_mod('cta_text', 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...') );?></div>
    	</div>
        <?php if ( get_theme_mod('cta_button_url', '#') ): ?>
        <div class="button">
        	<a href="<?php echo esc_url(get_theme_mod('cta_button_url', '#') );?>"><?php echo esc_attr(get_theme_mod('cta_button_text', __('Hello, World!', 'personal-portfolio')) );?></a>
        </div>
        <?php endif;?>
        <div class="clear"></div>
    </div><!-- #cta -->
    <?php
}
?>