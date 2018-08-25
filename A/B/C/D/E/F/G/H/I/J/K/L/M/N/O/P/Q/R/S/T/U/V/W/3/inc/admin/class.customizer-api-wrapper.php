<?php
	/**
	 * A Wrapper Class for WP Customizer API
	 *
	 * Also, adds custom controls for Customizer by extending it.
	 */

	class Dinozoom_Customizer_API_Wrapper {

		// Holds Panels of Customizer Options
		// TODO: Have to test without Panels
		protected $panels = array();

		//
		protected $_root_sections = array();

		// Holds Sections of Customizer Options
		protected $sections = array();

		// Holds Fields of Customizer Options 
		// one section at a moment
		protected $fields = array();

		// Default capability to edit options
		protected $_capability = 'edit_theme_options';

		// Since we need serialized theme options
		// We're overriding default theme_mod type with 'options'
		protected $_type = 'theme_mod';

		// Version
		private $_version = '1.0.0';

		// Holds unique slugs for settings and controls
		protected $_panel_id;
		protected $_section_id;

		/**
		 * Sets options name, capability and type, then hook into customizer to register
		 * @param [type] $options [description]
		 */
		public function __construct($options) {
			$this->capability = $options['capability'];
			$this->panels = $options['panels'];
			//$this->_root_sections = $options['root'];
			add_action('customize_register', array($this, 'init'));
		}

		/**
		 * Includes custom control classes and then add panels, section and fields
		 * @param  [type] $wp_customize [description]
		 * @return [type]               [description]
		 */
		public function init($wp_customize) {
			add_action('admin_enqueue_scripts', array($this, 'enqueue_scripts'));
			require_once get_template_directory() . '/inc/admin/custom-controls.php';
			if( ! empty($this->_root_sections)) {
				$this->sections = $this->_root_sections['sections'];
				$this->add_sections($wp_customize);	
			}
			
			$this->add_panels($wp_customize);
		}

		/**
		 * Enqueue Scripts
		 */
		public function enqueue_scripts() {
			wp_enqueue_style( 
				'personalportfolio-cutomizer-css', 
				get_template_directory_uri() . '/inc/admin/css/customizer.css', 
				array(), 
				'1.0.0', 
				'all' 
			);
			wp_enqueue_style( 
				'personalportfolio-font-awesome', 
				get_template_directory_uri() . '/inc/font-awesome/css/font-awesome.min.css', 
				array()
			);
			wp_enqueue_script( 
				'personalportfolio-customizer-js', 
				get_template_directory_uri() . '/inc/admin/js/script.js',
				array('jquery'),
				$this->_version,
				true
			);
			wp_localize_script( 'customizer-js', 'personalportfolio_upgrade', array( 'message' => __( 'Upgrade to Pro', 'personal-portfolio' ) ) );
		}

		/**
		 * Loop through Panels, and all method to add panel
		 * @param [type] $wp_customize [description]
		 */
		public function add_panels($wp_customize) {
			foreach ($this->panels as $panel_id => $panel_details) {
				$this->add_panel($wp_customize, $panel_id, $panel_details);
			}
		}

		/**
		 * Add Panels to Customizer options
		 * @param [type] $wp_customize  [description]
		 * @param [type] $panel_id      [description]
		 * @param [type] $panel_details [description]
		 */
		public function add_panel($wp_customize, $panel_id, $panel_details) {
			$this->sections = $panel_details['sections'];
			unset($panel_details['sections']);
			extract($panel_details);
			$this->_panel_id = $panel_id;
			$wp_customize->add_panel(
				$panel_id,
				array(
					'priority' => isset($priority) ? $priority : '',
					'capability'     => isset($capability) ? $capability : 'edit_theme_options',
					'title'          => isset($title) ? $title : '',
					'description'    => isset($description) ? $description : '',						
				)
			);
			$this->add_sections($wp_customize);
		}

		/**
		 * Loop through Panel sections and then call method to add individual section
		 * @param [type] $wp_customize [description]
		 */
		public function add_sections($wp_customize) {
			foreach ($this->sections as $section_id => $section_details) {
				$this->_section_id = $section_id;
				$this->add_section($wp_customize, $section_details);
			}
		}

		/**
		 * Add Section to Customizer
		 * @param [type] $wp_customize    [description]
		 * @param [type] $section_details [description]
		 */
		public function add_section($wp_customize, $section_details) {
			$this->fields = $section_details['fields'];
			unset($section_details['fields']);
			extract($section_details);
			$wp_customize->add_section(
				$this->_section_id,
				array(
					'priority' => isset($priority) ? $priority : '',
					'title'          => isset($title) ? $title : '',
					'description'    => isset($description) ? $description : '',
					'panel' => $this->_panel_id
				)
			);
			$this->add_settings($wp_customize);
		}

		/**
		 * Loop through settings for each section
		 * @param [type] $wp_customize [description]
		 */
		public function add_settings($wp_customize) {
			foreach ($this->fields as $field_id => $field_details) {
				$this->add_setting($wp_customize, $field_id, $field_details);
				$this->add_control($wp_customize, $field_id, $field_details);
			}
		}

		/**
		 * Add settings to section
		 * @param [type] $wp_customize  [description]
		 * @param [type] $field_id      [description]
		 * @param [type] $field_details [description]
		 */
		public function add_setting($wp_customize, $field_id, $field_details) {
			$sanitize_callback = isset($field_details['sanitize_callback']) ? $field_details['sanitize_callback'] : '';
			$wp_customize->add_setting(
				$field_id,
				array(
					'default' => isset($field_details['default']) ? $field_details['default'] : '',
					'sanitize_callback' => $sanitize_callback
				)
			);
		}

		/**
		 * Add Control to section
		 * @param [type] $wp_customize  [description]
		 * @param [type] $field_id      [description]
		 * @param [type] $field_details [description]
		 */
		public function add_control($wp_customize, $field_id, $field_details) {
			extract($field_details);
			switch ($type) {
				case 'upload':
					$wp_customize->add_control( 
						new WP_Customize_Upload_Control( 
							$wp_customize, 
							$field_id, 
							array(
								'label' => isset($label) ? $label : '',
								'setting' => $field_id,
								'section' => $this->_section_id,
							)
						)
					);
					break;
				case 'image':
					$wp_customize->add_control( 
						new WP_Customize_Image_Control( 
							$wp_customize, 
							$field_id, 
							array(
								'label' => isset($label) ? $label : '',
								'setting' => $field_id,
								'section' => $this->_section_id,
							)
						)
					);
					break;
				case 'color':
					$wp_customize->add_control( 
						new WP_Customize_Color_Control( 
							$wp_customize, 
							$field_id, 
							array(
								'label' => isset($label) ? $label : '',
								'setting' => $field_id,
								'section' => $this->_section_id,
							)
						)
					);
					break;
				case 'category':
					$cats = array();
					foreach ( get_categories() as $cat ){
						$cats[$cat->term_id] = $cat->name;
					}
					$wp_customize->add_control(
						$field_id,
						array(
							'label' => isset($label) ? $label : '',
							'type' => 'select',
							'setting' => $field_id,
							'section' => $this->_section_id,
							'choices' => $cats
						)
					);
					break;
				case 'disabled-color':
					$wp_customize->add_control( 
						new Dinozoom_Customize_Disabled_Color_Control( 
							$wp_customize, 
							$field_id, 
							array(
								'label' => isset($label) ? $label : '',
								'setting' => $field_id,
								'section' => $this->_section_id,
							)
						)
					);
					break;
				case 'disabled-select':
					$wp_customize->add_control( 
						new Dinozoom_Customize_Disabled_Select_Control( 
							$wp_customize, 
							$field_id, 
							array(
								'label' => isset($label) ? $label : '',
								'setting' => $field_id,
								'section' => $this->_section_id,
								'choices' => $choices,
							)
						)
					);
					break;
				case 'disabled-checkbox':
					$wp_customize->add_control( 
						new Dinozoom_Customize_Disabled_Checkbox_Control( 
							$wp_customize, 
							$field_id, 
							array(
								'label' => isset($label) ? $label : '',
								'setting' => $field_id,
								'section' => $this->_section_id,
							)
						)
					);
					break;
				case 'sep-title':
					$wp_customize->add_control( 
						new Dinozoom_Customize_sep_title( 
							$wp_customize, 
							$field_id, 
							array(
								'label' => isset($label) ? $label : '',
								'setting' => $field_id,
								'section' => $this->_section_id
							)
						)
					);
					break;
				case 'info':
					$wp_customize->add_control( 
						new Dinozoom_Customize_Info( 
							$wp_customize, 
							$field_id, 
							array(
								'label' => isset($label) ? $label : '',
								'setting' => $field_id,
								'section' => $this->_section_id,
							)
						)
					);
					break;
				default:
					$wp_customize->add_control(
						$field_id,
						array(
							'label' => isset($label) ? $label : '',
							'type' => isset($type) ? $type : 'text',
							'setting' => $field_id,
							'section' => $this->_section_id,
							'choices' => isset($choices) ? $choices : ''
						)
					);
					break;
			}			

		}
	}