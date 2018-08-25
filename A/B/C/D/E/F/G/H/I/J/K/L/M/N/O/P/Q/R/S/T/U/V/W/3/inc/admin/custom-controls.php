<?php
/**
 * Customizer Custom Control Class for Disabled Checkbox
 */
if( ! class_exists('Dinozoom_Customize_Disabled_Color_Control')) {
	class Dinozoom_Customize_Disabled_Color_Control extends WP_Customize_Control {
		public $type = 'disabled-color';
		public function render_content() {?>
        <label>
        <span class="customize-control-title"><?php echo esc_attr($this->label); ?></span>
        <div class="customize-control-content">
        <div class="wp-picker-container">
        	<a data-current="" title="<?php echo __('Select Color', 'personal-portfolio'); ?>"
            style="background-color:#565656;" tabindex="0" class="wp-color-result dinozoom-disabled-color"></a>
        </div>
        <?php printf('<span class="dinozoom-premium"><i class="fa fa-star"></i> <a target="_blank" href="%1$s">%2$s</a></span>',
				esc_url( 'http://dinozoom.com/themes/personal-portfolio-wordpress-themes/personal-portfolio-pro/' ),
				__( 'Upgrade', 'personal-portfolio' )
				);?>
        </div>
		</label>
		<?php
		}
	}
}

/**
 * Customizer Custom Control Class for Disabled Checkbox
 */
if( ! class_exists('Dinozoom_Customize_Disabled_Checkbox_Control')) {
	class Dinozoom_Customize_Disabled_Checkbox_Control extends WP_Customize_Control {
		public $type = 'disabled-checkbox';
		
		public function render_content() {
			$default = $this->setting->default;
			?>
			<label>
				<span class="customize-control-title"><?php echo esc_html($this->label); ?></span>
                <?php printf('<span class="dinozoom-premium"><i class="fa fa-star"></i> <a target="_blank" href="%1$s">%2$s</a></span>',
				esc_url( 'http://dinozoom.com/themes/personal-portfolio-wordpress-themes/personal-portfolio-pro/' ),
				__( 'Upgrade', 'personal-portfolio' )
				);?>
                <input disabled="disabled" readonly="readonly" type="checkbox" <?php if ($default) echo 'checked="checked"';?>>
                <?php echo esc_attr($this->label); ?>
			</label>
		<?php
		}
	}
}

/**
 * Customizer Custom Control Class for Disabled Dropdown
 */
if( ! class_exists('Dinozoom_Customize_Disabled_Select_Control')) {
	class Dinozoom_Customize_Disabled_Select_Control extends WP_Customize_Control {
		public $type = 'disabled-select';

		public function render_content() {
			?>
			<label>
				<span class="customize-control-title"><?php echo esc_html($this->label); ?></span>
                <?php printf('<span class="dinozoom-premium"><i class="fa fa-star"></i> <a target="_blank" href="%1$s">%2$s</a></span>',
				esc_url( 'http://dinozoom.com/themes/personal-portfolio-wordpress-themes/personal-portfolio-pro/' ),
				__( 'Upgrade', 'personal-portfolio' )
				);?>
				<select <?php $this->link(); ?>>
					<?php //printf( '<option value="0">%1$s</option>', __( 'Select Color Scheme', 'personal-portfolio' ) );
						foreach ( $this->choices as $value => $label )
							printf( '<option disabled="disabled" value="%1$s" %2$s>%3$s</option>', esc_attr( $value ), selected( $this->value(), $value, false ), $label );
					?>
				</select>
			</label>
		<?php
		}
	}
}

/**
 * Customizer Custom Control Class for Separator Title
 */
if( ! class_exists('Dinozoom_Customize_sep_title')) {
	class Dinozoom_Customize_sep_title extends WP_Customize_Control {
		public $type = 'title_sep';

		public function render_content() {
			?>
			<div class="customize-sep-title"><?php echo esc_html($this->label); ?></div>
			<?php
		}
	}
}
/**
 * Customizer Custom Control Class for Info
 */
if( ! class_exists('Dinozoom_Customize_Info')) {
	class Dinozoom_Customize_Info extends WP_Customize_Control {
		public $type = 'info';

		public function render_content() {
			?>
			<div class="dinozoom-info"><?php
			/*
			 * echo $this->label; 
			*/
			// Upgrade Now
			printf( __( 'More options &amp; features now available.', 'personal-portfolio' ) . '<br /><a class="button-primary" target="_blank" href="%1$s">%2$s</a>', esc_url('http://dinozoom.com/themes/personal-portfolio-wordpress-themes/personal-portfolio-pro/'), __( 'Upgrade Now', 'personal-portfolio' ) );
			// Donate
			printf( '<br /><a class="button" target="_blank" href="%1$s"><i class="fa fa-heart"></i>%2$s</a>', esc_url('http://dinozoom.com/donate'), __( 'Donate', 'personal-portfolio' ) );
			// Support Forums
			//printf( '<br /><a class="button" target="_blank" href="%1$s"><i class="fa fa-life-ring"></i>%2$s</a>', esc_url('https://wordpress.org/support/theme/personal-portfolio'), __( 'Support Forums', 'personal-portfolio' ) );
			// Feedback
			printf( '<br /><a class="button" target="_blank" href="%1$s"><i class="fa fa-envelope-o"></i>%2$s &amp; %3$s</a>', esc_url('http://dinozoom.com/contact/'), __( 'Feedback', 'personal-portfolio' ), __( 'Reviews', 'personal-portfolio' ) );
			// Documentation
			printf( '<br /><a class="button" target="_blank" href="%1$s"><i class="fa fa-file-text-o"></i>%2$s</a>', esc_url('http://dinozoom.com/themes/personal-portfolio-wordpress-themes/'), __( 'Documentation', 'personal-portfolio' ) );
			// More themes
			printf( '<br /><a class="button button-primary" target="_blank" href="%1$s"><i class="fa fa-plus-circle"></i>%2$s</a>', esc_url('http://dinozoom.com/themes/'), __( 'More Themes', 'personal-portfolio' ) );
			?>
            </div>
			<?php
		}
	}
}