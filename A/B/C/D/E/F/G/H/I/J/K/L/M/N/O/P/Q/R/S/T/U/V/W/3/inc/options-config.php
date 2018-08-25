<?php
function personalportfolio_generate_array ( $req = "slider" ) {
// FA Array
$fa_array = array("adjust", "adn", "align-center", "align-justify", "align-left", "align-right", "ambulance", "anchor", "android", "angellist", "angle-double-down", "angle-double-left", "angle-double-right", "angle-double-up", "angle-down", "angle-left", "angle-right", "angle-up", "apple", "archive", "area-chart", "arrow-circle-down", "arrow-circle-left", "arrow-circle-o-down", "arrow-circle-o-left", "arrow-circle-o-right", "arrow-circle-o-up", "arrow-circle-right", "arrow-circle-up", "arrow-down", "arrow-left", "arrow-right", "arrow-up", "arrows", "arrows-alt", "arrows-h", "arrows-v", "asterisk", "at", "automobile", "backward", "ban", "bank", "bar-chart", "bar-chart-o", "barcode", "bars", "bed", "beer", "behance", "behance-square", "bell", "bell-o", "bell-slash", "bell-slash-o", "bicycle", "binoculars", "birthday-cake", "bitbucket", "bitbucket-square", "bitcoin", "bold", "bolt", "bomb", "book", "bookmark", "bookmark-o", "briefcase", "btc", "bug", "building", "building-o", "bullhorn", "bullseye", "bus", "buysellads", "cab", "calculator", "calendar", "calendar-o", "camera", "camera-retro", "car", "caret-down", "caret-left", "caret-right", "caret-square-o-down", "caret-square-o-left", "caret-square-o-right", "caret-square-o-up", "caret-up", "cart-arrow-down", "cart-plus", "cc", "cc-amex", "cc-discover", "cc-mastercard", "cc-paypal", "cc-stripe", "cc-visa", "certificate", "chain", "chain-broken", "check", "check-circle", "check-circle-o", "check-square", "check-square-o", "chevron-circle-down", "chevron-circle-left", "chevron-circle-right", "chevron-circle-up", "chevron-down", "chevron-left", "chevron-right", "chevron-up", "child", "circle", "circle-o", "circle-o-notch", "circle-thin", "clipboard", "clock-o", "close", "cloud", "cloud-download", "cloud-upload", "cny", "code", "code-fork", "codepen", "coffee", "cog", "cogs", "columns", "comment", "comment-o", "comments", "comments-o", "compass", "compress", "connectdevelop", "copy", "copyright", "credit-card", "crop", "crosshairs", "css3", "cube", "cubes", "cut", "cutlery", "dashboard", "dashcube", "database", "dedent", "delicious", "desktop", "deviantart", "diamond", "digg", "dollar", "dot-circle-o", "download", "dribbble", "dropbox", "drupal", "edit", "eject", "ellipsis-h", "ellipsis-v", "empire", "envelope", "envelope-o", "envelope-square", "eraser", "eur", "euro", "exchange", "exclamation", "exclamation-circle", "exclamation-triangle", "expand", "external-link", "external-link-square", "eye", "eye-slash", "eyedropper", "facebook", "facebook-f", "facebook-official", "facebook-square", "fast-backward", "fast-forward", "fax", "female", "fighter-jet", "file", "file-archive-o", "file-audio-o", "file-code-o", "file-excel-o", "file-image-o", "file-movie-o", "file-o", "file-pdf-o", "file-photo-o", "file-picture-o", "file-powerpoint-o", "file-sound-o", "file-text", "file-text-o", "file-video-o", "file-word-o", "file-zip-o", "files-o", "film", "filter", "fire", "fire-extinguisher", "flag", "flag-checkered", "flag-o", "flash", "flask", "flickr", "floppy-o", "folder", "folder-o", "folder-open", "folder-open-o", "font", "forumbee", "forward", "foursquare", "frown-o", "futbol-o", "gamepad", "gavel", "gbp", "ge", "gear", "gears", "genderless", "gift", "git", "git-square", "github", "github-alt", "github-square", "gittip", "glass", "globe", "google", "google-plus", "google-plus-square", "google-wallet", "graduation-cap", "gratipay", "group", "h-square", "hacker-news", "hand-o-down", "hand-o-left", "hand-o-right", "hand-o-up", "hdd-o", "header", "headphones", "heart", "heart-o", "heartbeat", "history", "home", "hospital-o", "hotel", "html5", "ils", "image", "inbox", "indent", "info", "info-circle", "inr", "instagram", "institution", "ioxhost", "italic", "joomla", "jpy", "jsfiddle", "key", "keyboard-o", "krw", "language", "laptop", "lastfm", "lastfm-square", "leaf", "leanpub", "legal", "lemon-o", "level-down", "level-up", "life-bouy", "life-buoy", "life-ring", "life-saver", "lightbulb-o", "line-chart", "link", "linkedin", "linkedin-square", "linux", "list", "list-alt", "list-ol", "list-ul", "location-arrow", "lock", "long-arrow-down", "long-arrow-left", "long-arrow-right", "long-arrow-up", "magic", "magnet", "mail-forward", "mail-reply", "mail-reply-all", "male", "map-marker", "mars", "mars-double", "mars-stroke", "mars-stroke-h", "mars-stroke-v", "maxcdn", "meanpath", "medium", "medkit", "meh-o", "mercury", "microphone", "microphone-slash", "minus", "minus-circle", "minus-square", "minus-square-o", "mobile", "mobile-phone", "money", "moon-o", "mortar-board", "motorcycle", "music", "navicon", "neuter", "newspaper-o", "openid", "outdent", "pagelines", "paint-brush", "paper-plane", "paper-plane-o", "paperclip", "paragraph", "paste", "pause", "paw", "paypal", "pencil", "pencil-square", "pencil-square-o", "phone", "phone-square", "photo", "picture-o", "pie-chart", "pied-piper", "pied-piper-alt", "pinterest", "pinterest-p", "pinterest-square", "plane", "play", "play-circle", "play-circle-o", "plug", "plus", "plus-circle", "plus-square", "plus-square-o", "power-off", "print", "puzzle-piece", "qq", "qrcode", "question", "question-circle", "quote-left", "quote-right", "ra", "random", "rebel", "recycle", "reddit", "reddit-square", "refresh", "remove", "renren", "reorder", "repeat", "reply", "reply-all", "retweet", "rmb", "road", "rocket", "rotate-left", "rotate-right", "rouble", "rss", "rss-square", "rub", "ruble", "rupee", "save", "scissors", "search", "search-minus", "search-plus", "sellsy", "send", "send-o", "server", "share", "share-alt", "share-alt-square", "share-square", "share-square-o", "shekel", "sheqel", "shield", "ship", "shirtsinbulk", "shopping-cart", "sign-in", "sign-out", "signal", "simplybuilt", "sitemap", "skyatlas", "skype", "slack", "sliders", "slideshare", "smile-o", "soccer-ball-o", "sort", "sort-alpha-asc", "sort-alpha-desc", "sort-amount-asc", "sort-amount-desc", "sort-asc", "sort-desc", "sort-down", "sort-numeric-asc", "sort-numeric-desc", "sort-up", "soundcloud", "space-shuttle", "spinner", "spoon", "spotify", "square", "square-o", "stack-exchange", "stack-overflow", "star", "star-half", "star-half-empty", "star-half-full", "star-half-o", "star-o", "steam", "steam-square", "step-backward", "step-forward", "stethoscope", "stop", "street-view", "strikethrough", "stumbleupon", "stumbleupon-circle", "subscript", "subway", "suitcase", "sun-o", "superscript", "support", "table", "tablet", "tachometer", "tag", "tags", "tasks", "taxi", "tencent-weibo", "terminal", "text-height", "text-width", "th", "th-large", "th-list", "thumb-tack", "thumbs-down", "thumbs-o-down", "thumbs-o-up", "thumbs-up", "ticket", "times", "times-circle", "times-circle-o", "tint", "toggle-down", "toggle-left", "toggle-off", "toggle-on", "toggle-right", "toggle-up", "train", "transgender", "transgender-alt", "trash", "trash-o", "tree", "trello", "trophy", "truck", "try", "tty", "tumblr", "tumblr-square", "turkish-lira", "twitch", "twitter", "twitter-square", "umbrella", "underline", "undo", "university", "unlink", "unlock", "unlock-alt", "unsorted", "upload", "usd", "user", "user-md", "user-plus", "user-secret", "user-times", "users", "venus", "venus-double", "venus-mars", "viacoin", "video-camera", "vimeo-square", "vine", "vk", "volume-down", "volume-off", "volume-up", "warning", "wechat", "weibo", "weixin", "whatsapp", "wheelchair", "wifi", "windows", "won", "wordpress", "wrench", "xing", "xing-square", "yahoo", "yelp", "yen", "youtube", "youtube-play", "youtube-square");
// Disabled-numbers Array
$qty = array( 1 => '1', 2 => '2', 3 => '3', 4 => '4', 5 => '5', 6 => '6', 7 => '7', 8 => '8', 9 => '9', 10 => '10', 11 => '11', 12 => '12', 13 => '13', 14 => '14', 15 => '15', 16 => '16', 17 => '17', 18 => '18', 19 => '19', 20 => '20', 21 => '21', 22 => '22', 23 => '23', 24 => '24', 25 => '25', 26 => '26', 27 => '27', 28 => '28', 29 => '29', 30 => '30' );

// Slider Array
$personalportfolio_slider_array = array(
                            'enable_slider' => array(
                                'type' => 'checkbox',
                                'label' => __('Enable this section', 'personal-portfolio'),
                                'default' => 1,
                                'sanitize_callback' => 'personalportfolio_boolean',
                            ),
							'slider_quantity' => array(
                                'type' => 'select',
                                'label' => __('Quantity', 'personal-portfolio') . " (Note: Set and refresh the page after save to view full effects.)",
                                'default' => 4,
								'choices' => $qty,
                                'sanitize_callback' => 'absint',
                            ),
							'slider_effect' => array(
                                'type' => 'select',
                                'label' => __('Effect', 'personal-portfolio'),
                                'default' => 'shuffle',
								'choices' => array( 'fade' => 1, 'shuffle' => 2, 'curtainX'=> 3 ),
                                'sanitize_callback' => 'esc_attr',
                            ),
							'slider_anim_speed' => array(
                                'type' => 'number',
                                'label' => __('Animation speed', 'personal-portfolio'),
								'default' => 1000,
                                'sanitize_callback' => 'absint',
								'input_attrs' => array(
									'min'   => 100,
									'max'   => 10000,
									'step'  => 100,
								),
                            ),
							'slider_speed' => array(
                                'type' => 'number',
                                'label' => __('Speed', 'personal-portfolio'),
								'default' => 2000,
                                'sanitize_callback' => 'absint',
								'input_attrs' => array(
									'min'   => 100,
									'max'   => 10000,
									'step'  => 100,
								),
                            ),
							);
$slider_quantity = get_theme_mod( 'slider_quantity', 4 );
for ($i=1;$i<=$slider_quantity;$i++) {
	$personalportfolio_slider_item = array();
	$personalportfolio_slider_item = array(							
							'sep'.$i => array(
								'label' => __("Slider", 'personal-portfolio') . "#$i",
                                'type' => 'sep-title',
                            ),
                            'slider_title'.$i => array(
                                'type' => 'text',
                                'label' => __('Title', 'personal-portfolio'),
								'default' => 'Lorem ipsum dolor sit amet, consectetur elit',
                                'sanitize_callback' => 'esc_attr',
                            ),
							'slider_desc'.$i => array(
                                'type' => 'textarea',
                                'label' => __('Description', 'personal-portfolio'),
								'default' => 'Nulla convallis congue tortor vel imperdiet. Proin condimentum mattis dui nec faucibus. Donec placerat enim eget quam consequat, nec sollicitudin ex ultrices.',
                                'sanitize_callback' => 'esc_attr',
                            ),
							'slider_link'.$i => array(
                                'type' => 'text',
                                'label' => __('Link', 'personal-portfolio'),
                                'sanitize_callback' => 'esc_url',
                            ),
							'slider_image'.$i => array(
								'default' => get_template_directory_uri() . "/images/slider/1.jpg",
                                'type' => 'image',
                                'label' => __('Image', 'personal-portfolio'),
                                'sanitize_callback' => 'esc_url_raw',
                            )
							);
	$personalportfolio_slider_array = array_merge($personalportfolio_slider_array, $personalportfolio_slider_item);
}
if ( $req == "slider" ) return $personalportfolio_slider_array;

// Services Section Array
$personalportfolio_services_array = array(
                            'enable_services' => array(
                                'type' => 'checkbox',
                                'label' => __('Enable this section', 'personal-portfolio'),
                                'default' => 0,
                                'sanitize_callback' => 'personalportfolio_boolean',
                            ),
							/*'services_quantity' => array(
                                'type' => 'disabled-select',
                                'label' => __('Quantity', 'personal-portfolio'),
                                'default' => 4,
								'choices' => $qty,
                                'sanitize_callback' => 'absint',
                            ),*/
							'services_title' => array(
                                'type' => 'text',
                                'label' => __('Title', 'personal-portfolio'),
                                'default' => "Nunc porta lectus dolor",
                                'sanitize_callback' => 'esc_attr',
                            ),
							'services_desc' => array(
                                'type' => 'textarea',
                                'label' => __('Description', 'personal-portfolio'),
                                'default' => '"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."',
                                'sanitize_callback' => 'esc_textarea',
                            ),
							'services_intro_text_color' => array(
                                'type' => 'color',
                                'label' => __('Text color', 'personal-portfolio'),
                                'sanitize_callback' => 'esc_attr',
                            ),
							);
// FA Icons to choices array
$fa_choices = array();
foreach ( $fa_array as $fa ) {
	$fa_choices = array_merge($fa_choices, array( "fa-$fa" => "$fa" ) );
}
// Pages List Arry for Dropdown control
$page_list = array( 'hide' => sprintf( '&rArr; [ %1$s ]', __('Hide', 'personal-portfolio') ) );

$pages = get_pages();
	foreach ( $pages as $page )
		$page_list [$page->ID] = $page->post_title;
//
for ($i=1;$i<=12;$i++) {
	$personalportfolio_services_item = array();
	$personalportfolio_services_item = array(							
							'sep_services'.$i => array(
								'label' => __("Service", 'personal-portfolio') . "#$i",
                                'type' => 'sep-title',
                            ),
							'service_page_'.$i => array(
                                'type' => 'select',
                                'label' => sprintf( '%1$s %2$s', __('Select Page', 'personal-portfolio'), __('(required)', 'personal-portfolio') ),
                                'default' => 'hide',
								'choices' => $page_list ,
                                'sanitize_callback' => 'absint',
                            ),
							'service_summary'.$i => array(
                                'type' => 'textarea',
                                'label' => sprintf( '%1$s (%2$s)', __('Summary', 'personal-portfolio'), __('Optional', 'personal-portfolio') ),
                                'default' => '',
                                'sanitize_callback' => 'esc_textarea',
                            ),
							'service_link'.$i => array(
								'default' => '',
                                'type' => 'text',
                                'label' => __('Custom Link', 'personal-portfolio'),
                                'sanitize_callback' => 'esc_url',
                            ),
							'service_button'.$i => array(
								'default' => '',
                                'type' => 'text',
                                'label' => sprintf( '%1$s (%2$s)', __('Button', 'personal-portfolio'), __('Optional', 'personal-portfolio') ),
                                'sanitize_callback' => 'esc_attr',
                            ),
							'service_icon'.$i => array(
								'default' => "fa-briefcase",
                                'type' => 'select',
                                'label' => sprintf( '%1$s/%2$s %3$s', __('Icon', 'personal-portfolio'), __('Featured Image', 'personal-portfolio'), __('(required)', 'personal-portfolio') ),
                                'sanitize_callback' => 'esc_attr',
								'choices' => $fa_choices
                            ),
							'service_color'.$i => array(
								'default' => "#645F54",
                                'type' => 'color',
                                'label' => __('Color', 'personal-portfolio'),
                                'sanitize_callback' => 'sanitize_hex_color',
                            ),
							'service_text_color'.$i => array(
                                'type' => 'color',
                                'label' => __('Text color', 'personal-portfolio'),
                                'sanitize_callback' => 'esc_attr',
                            ),
							'service_bgcolor'.$i => array(
								'default' => "",
                                'type' => 'color',
                                'label' => __('Background color', 'personal-portfolio'),
                                'sanitize_callback' => 'sanitize_hex_color',
                            )
							);
	$personalportfolio_services_array = array_merge($personalportfolio_services_array, $personalportfolio_services_item);
}
if ( $req == "services" ) return $personalportfolio_services_array;

// Projects Section Array
$personalportfolio_projects_array = array(
                            'enable_projects' => array(
                                'type' => 'checkbox',
                                'label' => __('Enable this section', 'personal-portfolio'),
                                'default' => 0,
                                'sanitize_callback' => 'personalportfolio_boolean',
                            ),
							'projects_title' => array(
                                'type' => 'text',
                                'label' => __('Title', 'personal-portfolio'),
                                'default' => "Nunc porta lectus dolor",
                                'sanitize_callback' => 'esc_attr',
                            ),
							'projects_desc' => array(
                                'type' => 'textarea',
                                'label' => __('Description', 'personal-portfolio'),
                                'default' => '"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."',
                                'sanitize_callback' => 'esc_textarea',
                            ),
							/*'projects_quantity' => array(
                                'type' => 'disabled-select',
                                'label' => __('Quantity', 'personal-portfolio'),
                                'default' => 4,
								'choices' => $qty,
                                'sanitize_callback' => 'absint',
                            ),*/
							'projects_intro_text_color' => array(
                                'type' => 'color',
                                'label' => __('Text color', 'personal-portfolio'),
                                'sanitize_callback' => 'esc_attr',
                            ),
							);
//
for ($i=1;$i<=12;$i++) {
	$personalportfolio_projects_item = array();
	$personalportfolio_projects_item = array(							
							'sep_projects'.$i => array(
								'label' => "$i :",
                                'type' => 'sep-title',
                            ),
							'project_page'.$i => array(
                                'type' => 'select',
                                'label' => sprintf( '%1$s %2$s + %3$s', __('Select Page', 'personal-portfolio'), __('(required)', 'personal-portfolio'), __('Featured Image', 'personal-portfolio') ),
                                'default' => 'hide',
								'choices' => $page_list ,
                                'sanitize_callback' => 'absint',
                            ),
							'project_title'.$i => array(
								'default' => "Lorem ipsum",
                                'type' => 'text',
                                'label' => sprintf( '%1$s (%2$s)', __('Title', 'personal-portfolio'), __('Optional', 'personal-portfolio') ),
                                'sanitize_callback' => 'esc_attr',
                            ),
							'project_description'.$i => array(
								'default' => "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet",
                                'type' => 'textarea',
                                'label' => sprintf( '%1$s (%2$s)', __('Description', 'personal-portfolio'), __('Optional', 'personal-portfolio') ),
                                'sanitize_callback' => 'esc_attr',
                            ),
							'project_link'.$i => array(
								'default' => '',
                                'type' => 'text',
                                'label' => sprintf( '%1$s (%2$s)', __('Custom Link', 'personal-portfolio'), __('Optional', 'personal-portfolio') ),
                                'sanitize_callback' => 'esc_url',
                            )
							);
	$personalportfolio_projects_array = array_merge($personalportfolio_projects_array, $personalportfolio_projects_item);
}
if ( $req == "projects" ) return $personalportfolio_projects_array;

// Customers Section Array
$personalportfolio_customers_array = array(
                            'enable_customers' => array(
                                'type' => 'checkbox',
                                'label' => __('Enable this section', 'personal-portfolio'),
                                'default' => 0,
                                'sanitize_callback' => 'personalportfolio_boolean',
                            ),
							'customers_grayscale' => array(
                                'type' => 'checkbox',
                                'label' => sprintf( '%1$s &amp; %2$s', __('Black', 'personal-portfolio'), __('White', 'personal-portfolio') ),
                                'default' => 1,
                                'sanitize_callback' => 'personalportfolio_boolean',
                            ),
							'customers_title' => array(
                                'type' => 'text',
                                'label' => __('Title', 'personal-portfolio'),
                                'default' => "Nunc porta lectus dolor",
                                'sanitize_callback' => 'esc_attr',
                            ),
							'customers_desc' => array(
                                'type' => 'textarea',
                                'label' => __('Description', 'personal-portfolio'),
                                'default' => '"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."',
                                'sanitize_callback' => 'esc_textarea',
                            ),
							/*'customers_quantity' => array(
                                'type' => 'disabled-select',
                                'label' => __('Quantity', 'personal-portfolio'),
                                'default' => 15,
								'choices' => $qty,
                                'sanitize_callback' => 'absint',
                            ),*/
							'customers_intro_text_color' => array(
                                'type' => 'color',
                                'label' => __('Text color', 'personal-portfolio'),
                                'sanitize_callback' => 'esc_attr',
                            ),
							);
//
for ($i=1;$i<=30;$i++) {
	if ( $i <= 15 ) $image = $i;
		else $image = 'none';
		
	$personalportfolio_customers_item = array();
	$personalportfolio_customers_item = array(							
							'sep_customer'.$i => array(
								'label' => "$i :",
                                'type' => 'sep-title',
                            ),
							'customer_logo'.$i => array(
								'default' => get_template_directory_uri() . "/images/customers/$image.png",
                                'type' => 'upload',
                                'label' => __('Image', 'personal-portfolio'),
                                'sanitize_callback' => 'esc_url_raw',
                            ),
							'customer_link'.$i => array(
								'default' => '',
                                'type' => 'text',
                                'label' => sprintf( '%1$s (%2$s)', __('Custom Link', 'personal-portfolio'), __('Optional', 'personal-portfolio') ),
                                'sanitize_callback' => 'esc_url',
                            )
							);
	$personalportfolio_customers_array = array_merge($personalportfolio_customers_array, $personalportfolio_customers_item);
}
if ( $req == "customers" ) return $personalportfolio_customers_array;

// Testimonials Section Array
$personalportfolio_testimonial_array = array(
                            'enable_testimonials' => array(
                                'type' => 'checkbox',
                                'label' => __('Enable this section', 'personal-portfolio'),
                                'default' => 0,
                                'sanitize_callback' => 'personalportfolio_boolean',
                            ),
							'testimonial_title' => array(
                                'type' => 'text',
                                'label' => __('Title', 'personal-portfolio'),
                                'default' => "Nunc porta lectus dolor",
                                'sanitize_callback' => 'esc_attr',
                            ),
							'testimonial_desc' => array(
                                'type' => 'textarea',
                                'label' => __('Description', 'personal-portfolio'),
                                'default' => '"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."',
                                'sanitize_callback' => 'esc_textarea',
                            ),
							/*'testimonial_quantity' => array(
                                'type' => 'disabled-select',
                                'label' => __('Quantity', 'personal-portfolio'),
                                'default' => 5,
								'choices' => $qty,
                                'sanitize_callback' => 'absint',
                            ),*/
							'testimonial_intro_text_color' => array(
                                'type' => 'color',
                                'label' => __('Text color', 'personal-portfolio'),
                                'sanitize_callback' => 'esc_attr',
                            ),
							);
//
for ($i=1;$i<=20;$i++) {
	$personalportfolio_testimonial_item = array();
	$personalportfolio_testimonial_item = array(							
							'sep_testimonial'.$i => array(
								'label' => "$i :",
                                'type' => 'sep-title',
                            ),
							'testimonial_page'.$i => array(
                                'type' => 'select',
                                'label' => sprintf( '%1$s %2$s + %3$s', __('Select Page', 'personal-portfolio'), __('(required)', 'personal-portfolio'), __('Featured Image', 'personal-portfolio') ),
                                'default' => 'hide',
								'choices' => $page_list ,
                                'sanitize_callback' => 'absint',
                            ),
							'testimonial_author'.$i => array(
								'default' => __('Matt Mullenweg', 'personal-portfolio'),
                                'type' => 'textarea',
                                'label' => sprintf( '%1$s (%2$s)', __('Author', 'personal-portfolio'), __('Optional', 'personal-portfolio') ),
                                'sanitize_callback' => 'esc_attr',
                            ),
							'testimonial_link'.$i => array(
								'default' => '',
                                'type' => 'text',
                                'label' => sprintf( '%1$s (%2$s)', __('Custom Link', 'personal-portfolio'), __('Optional', 'personal-portfolio') ),
                                'sanitize_callback' => 'esc_url',
                            )
							);
	$personalportfolio_testimonial_array = array_merge($personalportfolio_testimonial_array, $personalportfolio_testimonial_item);
}
if ( $req == "testimonial" ) return $personalportfolio_testimonial_array;
// vegas slider array
$vegas_images = array (		'enable_vegas' => array(
                                'type' => 'checkbox',
                                'label' => __('Enable this section', 'personal-portfolio'),
                                'default' => 1,
                                'sanitize_callback' => 'personalportfolio_boolean',
                            ),
							'vegas_speed' => array(
                                'type' => 'select',
                                'label' => __('Speed', 'personal-portfolio'),
                                'default' => 20,
								'choices' => $qty,
                                'sanitize_callback' => 'absint',
                            ),
							'vegas_overlays' => array(
                                'type' => 'select',
                                'label' => __('Overlays', 'personal-portfolio'),
                                'default' => 0,
								'choices' => array( 0 => __('Overlays','personal-portfolio'), 1 => '1', 2 => '2', 3 => '3', 4 => '4', 5 => '5', 6 => '6', 7 => '7', 8 => '8', 9 => '9'),
                                'sanitize_callback' => 'absint',
                            ),
							'vegas_transition' => array(
                                'type' => 'select',
                                'label' => __('Transitions', 'personal-portfolio'),
                                'default' => 'blur',
								'choices' => array('fade' => '1', 'fade2' => '2', 'slideLeft' => '3', 'slideLeft2' => '4', 'slideRight' => '5', 'slideRight2' => '6', 'slideUp' => '7', 'slideUp2' => '8', 'slideDown' => '9', 'slideDown2' => '10', 'zoomIn' => '11', 'zoomIn2' => '12', 'zoomOut' => '13', 'zoomOut2' => '14', 'swirlLeft' => '15', 'swirlLeft2' => '16', 'swirlRight' => '17', 'swirlRight2' => '18', 'burn' => '19', 'burn2' => '20', 'blur' => '21', 'blur2' => '22', 'flash' => '23', 'flash2' => '24',),
                                'sanitize_callback' => 'esc_attr',
                            )
							);
for ($i=1;$i<=4;$i++) {
	$vegas_image = array();
	$vegas_image = array('bg_slider_image'.$i => array(
								'default' => get_template_directory_uri() . "/images/bg-slider/$i.jpg",
                                'type' => 'upload',
                                'label' => __('Image', 'personal-portfolio') ." #$i",
                                'sanitize_callback' => 'esc_url_raw',
                            )
							);
	$vegas_images = array_merge($vegas_images, $vegas_image);
}
if ( $req == "vegas" ) return $vegas_images;


// Socail Media Array
$dinozoom_social_array = array(
                            'enable_sm_header' => array(
                                'type' => 'checkbox',
                                'label' => __('Add social media icons in Header', 'personal-portfolio'),
                                'default' => 0,
                                'sanitize_callback' => 'personalportfolio_boolean',
                            ),
							'enable_sm_footer' => array(
                                'type' => 'checkbox',
                                'label' => __('Add social media icons in Footer', 'personal-portfolio'),
                                'default' => 0,
                                'sanitize_callback' => 'personalportfolio_boolean',
                            ),
							'sm_icon_size' => array(
                                'type' => 'select',
                                'label' => __('Size', 'personal-portfolio'),
                                'default' => 'fa-1x',
								'choices' => array( 'fa-1x' => '1', 'fa-lg' => '1.5', 'fa-2x' => 2, 'fa-3x' => 3, 'fa-4x' => 4, 'fa-5x' => 5) ,
                                'sanitize_callback' => 'esc_attr',
                            )
							);
// FA Icons to choices array
$fa_choices = array( '-hide-' => '--- ' . __('Hide', 'personal-portfolio') . ' ---' );
foreach ( $fa_array as $fa ) {
	$fa_choices = array_merge($fa_choices, array( "fa-$fa" => "$fa" ) );
}

// Social Media Links
$homeUrl = esc_url( home_url( '/' ) );
for ($i=1;$i<=10;$i++) {
	if ( $i > 5 ) $homeUrl = "";
	$dinozoom_social_item = array();
	$dinozoom_social_item = array(							
							'sep_sm'.$i => array(
								'label' => __("Custom Link", 'personal-portfolio') . "#$i",
                                'type' => 'sep-title',
                            ),
                            'sm_title'.$i => array(
								'default' => __("Title", 'personal-portfolio'),
                                'type' => 'text',
                                'label' => __('Title', 'personal-portfolio'),
                                'sanitize_callback' => 'esc_attr',
                            ),
							'sm_description'.$i => array(
								'default' => '',
                                'type' => 'text',
                                'label' => __('Description', 'personal-portfolio'),
                                'sanitize_callback' => 'esc_attr',
                            ),
							'sm_link'.$i => array(
								'default' => $homeUrl,
                                'type' => 'text',
                                'label' => __('Enter the URL', 'personal-portfolio'),
                                'sanitize_callback' => 'esc_url',
                            ),
							'sm_target'.$i => array(
                                'type' => 'checkbox',
                                'label' => __('Open link in a new window/tab', 'personal-portfolio'),
                                'default' => 1,
                                'sanitize_callback' => 'dinozoom_boolean',
                            ),
							'sm_icon'.$i => array(
								'default' => '-hide-',
                                'type' => 'select',
                                'label' => __('Icon', 'personal-portfolio'),
                                'sanitize_callback' => 'esc_attr',
								'choices' => $fa_choices
                            ),
							'sm_color'.$i => array(
								'default' => "",
                                'type' => 'color',
                                'label' => __('Color', 'personal-portfolio'),
                                'sanitize_callback' => 'sanitize_hex_color',
                            )
							);
	$dinozoom_social_array = array_merge($dinozoom_social_array, $dinozoom_social_item);
}
if ( $req == "social" ) return $dinozoom_social_array;
} // end of generate array function

// options array
    $options = array(
        'capability' => 10,
        'type' => 'theme_mod',
        'panels' => array(
            'personal-portfolio' => array(
                'priority'       => 9,
                'title'          => __('Personal Portfolio Theme Options', 'personal-portfolio'),
                'description'    => __('Personal Portfolio Theme Options', 'personal-portfolio'),
                'sections' => array(
                    'header' => array(
                        'title' => __('Contact Info', 'personal-portfolio'),
                        'fields' => array(
							'address' => array(
                                'type' => 'text',
                                'label' => __('Address', 'personal-portfolio'),
								'default' => '77 Massachusetts Ave, Cambridge, MA, USA',
                                'sanitize_callback' => 'esc_attr',
                            ),
							'address_url' => array(
                                'type' => 'text',
                                'label' => sprintf('%1$s [ %2$s ]', __('Custom URL', 'personal-portfolio'), __('Address', 'personal-portfolio')),
								'default' => '',
                                'sanitize_callback' => 'esc_url',
                            ),
							'mail' => array(
                                'type' => 'text',
                                'label' => __('Email', 'personal-portfolio'),
								'default' => 'info@example.com',
                                'sanitize_callback' => 'esc_attr',
                            ),
							'mail_url' => array(
                                'type' => 'text',
                                'label' => sprintf('%1$s [ %2$s ]', __('Custom URL', 'personal-portfolio'), __('Email', 'personal-portfolio')),
								'default' => '',
                                'sanitize_callback' => 'esc_url',
                            ),
							'phone' => array(
                                'type' => 'text',
                                'label' => __('Phone', 'personal-portfolio'),
								'default' => '+1 617-253-1000',
                                'sanitize_callback' => 'esc_attr',
                            ),
							'phone_url' => array(
                                'type' => 'text',
                                'label' => sprintf('%1$s [ %2$s ]', __('Custom URL', 'personal-portfolio'), __('Phone', 'personal-portfolio')),
								'default' => '',
                                'sanitize_callback' => 'esc_url',
                            ),
							'sep_contact' => array(
                                'type' => 'sep-title',
                                'label' => "Activate",
                           	),
							'contact_header' => array(
                                'type' => 'checkbox',
                                'label' => __('Header', 'personal-portfolio'),
                                'default' => 1,
                                'sanitize_callback' => 'personalportfolio_boolean',
                            ),
							'contact_footer' => array(
                                'type' => 'checkbox',
                                'label' => __('Footer', 'personal-portfolio'),
                                'default' => 1,
                                'sanitize_callback' => 'personalportfolio_boolean',
                            ),
							'sep_contact_style' => array(
                                'type' => 'sep-title',
                                'label' => "Color",
                           	),
							'contact_color' => array(
                                'type' => 'color',
                                'label' => __('Text color', 'personal-portfolio'),
                                'default' => '#F4F4F4',
                                'sanitize_callback' => 'sanitize_hex_color',
                            ),
							'contact_color_hover' => array(
                                'type' => 'color',
                                'label' => sprintf('%1$s : %2$s', __('Text color', 'personal-portfolio'), __('When moving mouse over link', 'personal-portfolio')),
                                'default' => '#f66071',
                                'sanitize_callback' => 'sanitize_hex_color',
                            ),
							'sep_contact_map' => array(
                                'type' => 'sep-title',
                                'label' => "Footer",
                           	),
							'footer_map' => array(
                                'type' => 'textarea',
                                'label' => __('Map embed code', 'personal-portfolio'),
								'default' => '',
                                'sanitize_callback' => 'personal_portfolio_kses',
                            ),
                        ),
                    ),
                    'display' => array(
                        'title' => __('Display Settings', 'personal-portfolio'),
                        'fields' => array(
							'sep_display_layout' => array(
                                'type' => 'sep-title',
                                'label' => "Layout",
                           	),
							'site_layout' => array(
                            	'type' => 'select',
                            	'label' => sprintf('%1$s &amp; %2$s', __('Layout', 'personal-portfolio'), __('Asides', 'personal-portfolio')),
                            	'choices' => array(
									'0' => __('One Column', 'personal-portfolio'),
									'1' => sprintf('%1$s &amp; %2$s', __('Two Columns', 'personal-portfolio'), __('Right Sidebar', 'personal-portfolio')),
									'2' => sprintf('%1$s &amp; %2$s', __('Two Columns', 'personal-portfolio'), __('Left Sidebar', 'personal-portfolio')),
									'3' => sprintf('%1$s &amp; %2$s + %3$s + %4$s', __('Three Columns', 'personal-portfolio'),
													__('Left Sidebar', 'personal-portfolio'),
													__('Content', 'personal-portfolio'),
													__('Right Sidebar', 'personal-portfolio')),
									'4' => sprintf('%1$s &amp; %2$s + %3$s + %4$s', __('Three Columns', 'personal-portfolio'),
													__('Right Sidebar', 'personal-portfolio'),
													__('Left Sidebar', 'personal-portfolio'),
													__('Content', 'personal-portfolio')),
									'5' => sprintf('%1$s &amp; %2$s + %3$s + %4$s', __('Three Columns', 'personal-portfolio'),
													__('Content', 'personal-portfolio'),
													__('Left Sidebar', 'personal-portfolio'),
													__('Right Sidebar', 'personal-portfolio')),
                            	),
                            	'default' => 1,
                        	),
							'sep_display_blog_views' => array(
                                'type' => 'sep-title',
                                'label' => sprintf('%1$s, %2$s, %3$s ...',
													__('Front page', 'personal-portfolio'),
													__('Search', 'personal-portfolio'),
													__('Archives', 'personal-portfolio')),
                           	),
							'blog_view' => array(
                            	'type' => 'select',
                            	'label' => __('Layout', 'personal-portfolio'),
                            	'choices' => array(
									'0' => __('Full text', 'personal-portfolio'),
									'1' => __('Summary', 'personal-portfolio'),
                            	),
                            	'default' => 0,
                        	),
							'excerpt_length' => array(
                                'type' => 'number',
                                'label' => __('Set the excerpt length (in number of words)', 'personal-portfolio'),
								'default' => '55',
                                'sanitize_callback' => 'esc_attr',
                            ),
							'readmore_text' => array(
                                'type' => 'text',
								'default' => __('Read more...', 'personal-portfolio'),
                                'label' => __('Read more...', 'personal-portfolio'),
                                'sanitize_callback' => 'esc_attr',
                            ),
							'sep_display_header' => array(
                                'type' => 'sep-title',
                                'label' => "Header",
                           	),
							'logo' => array(
								'default' => get_template_directory_uri() . '/images/logo.png',
                                'type' => 'image',
                                'label' => __('Logo Upload', 'personal-portfolio'),
                                'sanitize_callback' => 'esc_url_raw',
                            ),
							'logo_alignment' => array(
								'type' => 'select',
								'label' => sprintf('%2$s (%1$s)', __('Logo', 'personal-portfolio'), __('Alignment', 'personal-portfolio')),
								'default' => 'left',
								'sanitize_callback' => 'esc_attr',
								'choices' => array( 'left'=>__('Align Left', 'personal-portfolio'),
													'center'=>__('Align Center', 'personal-portfolio'),
													'right'=>__('Align Right', 'personal-portfolio')),
							),
							'search_form' => array(
                                'type' => 'checkbox',
                                'label' => __('A search form for your site.', 'personal-portfolio'),
                                'default' => 1,
                                'sanitize_callback' => 'personalportfolio_boolean',
                            ),
							'sep_display_posts' => array(
                                'type' => 'sep-title',
                                'label' => "Posts",
                           	),
							'featured_image_header' => array(
                                'type' => 'checkbox',
                                'label' => __('Featured Image Header', 'personal-portfolio'),
                                'default' => 1,
                                'sanitize_callback' => 'personalportfolio_boolean',
                            ),
							'display_post_date' => array(
                                'type' => 'checkbox',
                                'label' => __('Display post date?', 'personal-portfolio'),
                                'default' => 1,
                                'sanitize_callback' => 'personalportfolio_boolean',
                            ),
							'display_post_author' => array(
                                'type' => 'checkbox',
                                'label' => __('Display item author if available?', 'personal-portfolio'),
                                'default' => 1,
                                'sanitize_callback' => 'personalportfolio_boolean',
                            ),
							'display_post_categories' => array(
                                'type' => 'checkbox',
                                'label' => __('Categories', 'personal-portfolio'),
                                'default' => 1,
                                'sanitize_callback' => 'personalportfolio_boolean',
                            ),
							'display_post_tags' => array(
                                'type' => 'checkbox',
                                'label' => __('Tags', 'personal-portfolio'),
                                'default' => 1,
                                'sanitize_callback' => 'personalportfolio_boolean',
                            ),
							
                        ),
                    ),
					'styles' => array(
						'title' => __('Styles', 'personal-portfolio'),
						'fields' => array(
							'sep_styles_gen' => array(
                                'type' => 'sep-title',
                                'label' => "General",
                           	),
                            'primary_color' => array(
                                'type' => 'color',
                                'label' => __('Primary Color', 'personal-portfolio'),
                                'default' => '#645F54',
                                'sanitize_callback' => 'sanitize_hex_color',
                            ),
							'color_scheme' => array(
                            	'type' => 'disabled-select',
                            	'label' => __('Base Color Scheme', 'personal-portfolio'),
                            	'choices' => array(
									'0' => __('Gray', 'personal-portfolio'),
									'1' => __('Red', 'personal-portfolio'),
									'2' => __('Green', 'personal-portfolio'),
									'2' => __('Blue', 'personal-portfolio'),
									'3' => __('Black', 'personal-portfolio'),
									'4' => __('White', 'personal-portfolio'),
									'5' => __('Brown', 'personal-portfolio'),
									'6' => __('Orange', 'personal-portfolio'),
									'7' => __('Tan', 'personal-portfolio'),
									'8' => __('Yellow', 'personal-portfolio'),
									'9' => __('Purple', 'personal-portfolio'),
									'10'=> __('Silver', 'personal-portfolio'),
									'11'=> __('Pink', 'personal-portfolio'),
                            	),
                            	'default' => 0,
                        	),
							'site_fonts' => array(
                            	'type' => 'select',
                            	'label' => __('Font Family', 'personal-portfolio'),
                            	'choices' => personalportfolio_font_list(),
                            	'default' => 0,
                        	),
							'site_font_sizes' => array(
                            	'type' => 'select',
                            	'label' => __('Font Sizes', 'personal-portfolio'),
                            	'choices' => personalportfolio_font_sizes_list(),
                            	'default' => '14',
                        	),
							'sep_styles_mm' => array(
                                'type' => 'sep-title',
                                'label' => "Main menu",
                           	),
							'menu_bg' => array(
								'default' => '',
                                'type' => 'image',
                                'label' => __('Custom Background', 'personal-portfolio'),
                                'sanitize_callback' => 'esc_url_raw',
                            ),
							'menu_font' => array(
                            	'type' => 'select',
                            	'label' => __('Font Family', 'personal-portfolio'),
                            	'choices' => personalportfolio_font_list(),
                            	'default' => 0,
                        	),
							'menu_font_size' => array(
                            	'type' => 'select',
                            	'label' => __('Font Sizes', 'personal-portfolio'),
                            	'choices' => personalportfolio_font_sizes_list(),
                            	'default' => '15',
                        	),
							'menu_color' => array(
								'default' => '#fff',
                                'type' => 'color',
                                'label' => __('Text color', 'personal-portfolio'),
                                'sanitize_callback' => 'sanitize_hex_color',
                            ),
							'menu_color_hover' => array(
								'default' => '#f66071',
                                'type' => 'color',
                                'label' => __('Border color', 'personal-portfolio'),
                                'sanitize_callback' => 'sanitize_hex_color',
                            ),
							'sep_styles_post' => array(
                                'type' => 'sep-title',
                                'label' => sprintf('%1$s &amp; %2$s', __('Posts', 'personal-portfolio'), __('Content', 'personal-portfolio')),
                           	),
							'content_font' => array(
                            	'type' => 'select',
                            	'label' => __('Font Family', 'personal-portfolio'),
                            	'choices' => personalportfolio_font_list(),
                            	'default' => 0,
                        	),
							'content_font_size' => array(
                            	'type' => 'select',
                            	'label' => __('Font Sizes', 'personal-portfolio'),
                            	'choices' => personalportfolio_font_sizes_list(),
                            	'default' => '14',
                        	),
							'post_text_color' => array(
								'default' => '#444545',
                                'type' => 'color',
                                'label' => __('Text color', 'personal-portfolio'),
                                'sanitize_callback' => 'sanitize_hex_color',
                            ),
							'post_meta_color' => array(
								'default' => '#BABABA',
                                'type' => 'color',
                                'label' => __('Metadata', 'personal-portfolio'),
                                'sanitize_callback' => 'sanitize_hex_color',
                            ),
						),			
                    ),
					'slider' => array(
                        'title' => __('Slider', 'personal-portfolio'),
                        'fields' => personalportfolio_generate_array ( "slider" ),
                    ),
					'services' => array(
                        'title' => __('Services Section', 'personal-portfolio'),
                        'fields' => personalportfolio_generate_array ( "services" ),
                    ),
					'projects' => array(
                        'title' => __('Projects Section', 'personal-portfolio'),
                        'fields' => personalportfolio_generate_array ( "projects" ),
                    ),
					'vegas' => array(
                        'title' => __('Background Image', 'personal-portfolio'),
                        'fields' => personalportfolio_generate_array ( "vegas" ),
                    ),
					'social-media' => array(
                        'title' => __('Social Media', 'personal-portfolio'),
                        'fields' => personalportfolio_generate_array ("social"),
                    ),
					'comments' => array(
						'title' => __('Comments', 'personal-portfolio'),
						'fields' => array(
							'comment_rules_before' => array(
								'type' => 'textarea',
								'label' => __('Notes', 'personal-portfolio'),
								'default' => 'Your email address will not be published.',
								'sanitize_callback' => 'esc_attr',
							),
							'comment_rules_after' => array(
								'type' => 'textarea',
								'label' => __('Other Notes', 'personal-portfolio'),
								'default' => '',
								'sanitize_callback' => 'esc_attr',
							),
							'label_submit' => array(
								'type' => 'text',
								'label' => __('Submit label', 'personal-portfolio'),
								'default' => __( 'Post Comment','personal-portfolio' ),
								'sanitize_callback' => 'esc_attr',
							),
						),
					),
					'testimonials' => array(
						'title' => __('Testimonials', 'personal-portfolio'),
                        'fields' => personalportfolio_generate_array ( "testimonial" ),
					),
					'customers' => array(
						'title' => __('Customers', 'personal-portfolio'),
						'fields' => personalportfolio_generate_array ( "customers" ),
					),
					'cta' => array(
						'title' => __('Call to Action', 'personal-portfolio'),
						'fields' => array(
							'enable_cta' => array(
                                'type' => 'checkbox',
                                'label' => __('Enable this section', 'personal-portfolio'),
                                'default' => 1,
                                'sanitize_callback' => 'personalportfolio_boolean',
                            ),
							'cta_sitewide' => array(
								'type' => 'checkbox',
								'label' => __('Show Sitewide', 'personal-portfolio'),
								'default' => 0,
								'sanitize_callback' => 'personalportfolio_boolean',
							),
							'cta_title' => array(
                                'type' => 'text',
                                'label' => __('Title', 'personal-portfolio'),
								'default' => __('Hello, World!', 'personal-portfolio'),
                                'sanitize_callback' => 'esc_attr',
                            ),
							'cta_text' => array(
                                'type' => 'text',
                                'label' => __('Description', 'personal-portfolio'),
								'default' => 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
                                'sanitize_callback' => 'esc_attr',
                            ),
							'cta_text_color' => array(
								'default' => '#444545',
                                'type' => 'color',
                                'label' => __('Text color', 'personal-portfolio'),
                                'sanitize_callback' => 'sanitize_hex_color',
                            ),
							'cta_bg' => array(
								'default' => get_template_directory_uri() . "/images/beach.jpg",
                                'type' => 'image',
                                'label' => __('Custom Background', 'personal-portfolio'),
                                'sanitize_callback' => 'esc_url_raw',
                            ),
							'sep_cta_link' => array(
                                'type' => 'sep-title',
                                'label' => __('Link', 'personal-portfolio'),
                           	),
							'cta_button_text' => array(
                                'type' => 'text',
                                'label' => __('Text', 'personal-portfolio'),
								'default' => __('Hello, World!', 'personal-portfolio'),
                                'sanitize_callback' => 'esc_attr',
                            ),
							'cta_button_url' => array(
                                'type' => 'text',
                                'label' =>  __('Custom URL', 'personal-portfolio'),
								'default' => '',
                                'sanitize_callback' => 'esc_url',
                            ),
							'cta_button_bg' => array(
								'default' => '#5890FF',
                                'type' => 'color',
                                'label' => __('Background color', 'personal-portfolio'),
                                'sanitize_callback' => 'sanitize_hex_color',
                            ),
						),
					),
					'advanced' => array(
						'title' => __('Advanced Options', 'personal-portfolio'),
						'fields' => array(
							'reset' => array(
								'type' => 'checkbox',
								'label' => __('Reset all theme settings to default. Refresh the page after save to view full effects.', 'personal-portfolio'),
								'default' => 0,
								'sanitize_callback' => 'personalportfolio_reset_all_settings',
							),
							'reset-2' => array(
								'type' => 'checkbox',
								'label' => 'Import theme settings to "Personal Portfolio". (Refresh the page after save to view full effects.)',
								'default' => 0,
								'sanitize_callback' => 'dinozoom_import_settings',
							),
							'custom_css' => array(
								'type' => 'textarea',
								'label' => __('Custom CSS Styles', 'personal-portfolio'),
								'default' => '',
								'sanitize_callback' => 'esc_html',
							),
						),
					),
					'pro' => array(
						'title' => __('Upgrade', 'personal-portfolio'),
						'fields' => array(
							'primary_colors' => array(
                                'type' => 'info',
                                'label' => "",
                           	),
                        ),
                    ),
                )
            ),
        )
    );

function dinozoom_import_settings($value) {
    remove_theme_mods();
	$thememod = get_option( 'theme_mods_personal-portfolio' );
	add_site_option( 'theme_mods_personal-portfolio-freemium', $thememod );
}

function personalportfolio_boolean($value) {
    if(is_bool($value)) {
        return $value;
    } else {
        return false;
    }
}

function personalportfolio_breadcrumb_char_choices($value='') {
    $choices = array('1','2','3');

    if( in_array($value, $choices)) {
        return $value;
    } else {
        return '1';
    }
}
/**
 * Reset all settings to default
 * @param  $input entered value
 * @return sanitized output
 *
 */
function personalportfolio_reset_all_settings( $input ) {
	if ( $input == 1 ) {
		//Remove all set values
		remove_theme_mods();
    } 
    else {
        return '';
    }
}

/**
 * Theme fonts family and sizes list for dropdown select menu
 * @return array
 */
function personalportfolio_font_list( $r = false ) {
	$list = array(
	'_g_cantarell'			=> array( 'Cantarell' , 'sans-serif' ),
	'_g_raleway'			=> array( 'Raleway' , 'sans-serif' ),
	'_g_roboto'				=> array( 'Roboto' , 'sans-serif' ),
	'_g_grand_hotel'		=> array( 'Grand Hotel', 'cursive' ),
	'_g_opensans'			=> array( 'Open Sans' , 'sans-serif' ),
	'_g_script_eb_garamond'	=> array( 'EB Garamond' , 'serif' ),
	'_g_josephin'			=> array( 'Josefin Sans' , 'sans-serif' ),
	'_g_droid'				=> array( 'Droid Serif' , 'serif' ),
	'_g_alice'				=> array( 'Alice' , 'serif' ),
	'_g_abel'				=> array( 'Abel' , 'sans-serif' ),
	'_g_leckerli'			=> array( 'Leckerli One' , 'cursive' ),
	'_g_allerta'			=> array( 'Allerta' , 'sans-serif' ),
	'_g_sourcesanspro'		=> array( 'Source Sans Pro' , 'sans-serif' ),
	'_g_neuton'				=> array( 'Neuton' , 'serif' ),
	'helvetica_arial'		=> array( 'Helvetica/Arial' , 'Helvetica Neue,Helvetica,Arial,sans-serif' ),
	'palatino'				=> array( 'Palatino Linotype' , 'Palatino Linotype,Book Antiqua,Palatino,serif' ),
	'verdana'				=> array( 'Verdana' , 'Verdana,Geneva,sans-serif' ),
	'time_new_roman'		=> array( 'Times New Roman' , 'Times New Roman,Times,serif' ),
	'courier_new'			=> array( 'Courier New' , 'Courier New,Courier New,Courier,monospace' ),
	'impact'				=> array( 'Impact' , 'Impact,Charcoal,sans-serif'),
	'georgia'               => array( 'Georgia' , 'Georgia,Georgia,serif' ),
	'tahoma'				=> array( 'Tahoma' , 'Tahoma,Geneva,sans-serif'),
	'lucida'				=> array( 'Lucida' , 'Lucida Sans Unicode,Lucida Grande,sans-serif')
	);
	if ($r) return $list;
	
	$fonts = array( 0 => "-" );
	foreach ($list as $k => $font)
		$fonts [$k] = $font [0];
	return $fonts;
}

function personalportfolio_font_sizes_list() {
	$sizes = array();
	for ( $px=8; $px<= 35 ; $px++ )
		$sizes [$px] = $px." px";
	return $sizes;
}

/**
 * wp_kses extended
 * @param  $input entered value
 * @return sanitized output
 *
 */
function personal_portfolio_kses ( $input ) {
	$my_allowed = wp_kses_allowed_html( 'post' );
	// iframe
	$my_allowed['iframe'] = array(
		'src'             => array(),
		'height'          => array(),
		'width'           => array(),
		'frameborder'     => array(),
		'allowfullscreen' => array(),
	);
	// form fields - input
	$my_allowed['input'] = array(
		'class' => array(),
		'id'    => array(),
		'name'  => array(),
		'value' => array(),
		'type'  => array(),
	);
	// select
	$my_allowed['select'] = array(
		'class'  => array(),
		'id'     => array(),
		'name'   => array(),
		'value'  => array(),
		'type'   => array(),
	);
	// select options
	$my_allowed['option'] = array(
		'selected' => array(),
	);
	// style
	$my_allowed['style'] = array(
		'types' => array(),
	);
	// return
	return wp_kses( $input, $my_allowed );
}


?>