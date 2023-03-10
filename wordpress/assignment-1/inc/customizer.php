<?php
/**
 * wpassignment Theme Customizer
 *
 * @package wpassignment
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function wpassignment_customize_register_global($wp_customize)
{
	// Global settings
	$wp_customize->add_panel(
		'global_settings',
		array(
			'title' => 'Global Settings',
			'description' => 'Global Settings Panel',
			'priority' => 10,
		)
	);

	// Header Settings
	$wp_customize->add_section(
		'header_settings',
		array(
			'title' => 'Header Settings',
			'priority' => 3,
			'panel' => 'global_settings',
		)
	);

	// Header logo
	$wp_customize->add_setting('header_logo', []);
	$wp_customize->add_control(
		new \WP_Customize_Media_Control(
			$wp_customize,
			'header_logo',
			array(
				'label' => 'Header Logo',
				'description' => 'Preferred size 272px by 124px',
				'section' => 'header_settings',
				'settings' => 'header_logo',
			)
		)
	);


	// Footer Settings
	$wp_customize->add_section(
		'footer_settings',
		array(
			'title' => 'Footer Settings',
			'priority' => 3,
			'panel' => 'global_settings',
		)
	);

	// Footer logo
	$wp_customize->add_setting('footer_logo', []);
	// Footer logo Control
	$wp_customize->add_control(
		new \WP_Customize_Media_Control(
			$wp_customize,
			'footer_logo',
			array(
				'label' => 'Footer Logo',
				'description' => 'Preferred size 272px by 124px',
				'section' => 'footer_settings',
				'settings' => 'footer_logo',
			)
		)
	);

	// footer copyright 
	$wp_customize->add_setting('footer_copyright', []);
	$wp_customize->add_control(
		new WP_Customize_Control(
			$wp_customize,
			'footer_copyright',
			array(
				'label' => 'Footer Copyright',
				'description' => 'Copyright Text',
				'section' => 'footer_settings',
				'settings' => 'footer_copyright',
			)
		)
	);
	// footer sitename 
	$wp_customize->add_setting('footer_sitename', []);
	$wp_customize->add_control(
		new WP_Customize_Control(
			$wp_customize,
			'footer_sitename',
			array(
				'label' => 'Footer Sitename',
				'description' => 'Sitename',
				'section' => 'footer_settings',
				'settings' => 'footer_sitename',
			)
		)
	);
}
add_action('customize_register', 'wpassignment_customize_register_global');

/**
 * Home settings
 */
function wpassignment_cutomize_register_home($wp_customize)
{
	$wp_customize->add_panel(
		'home_settings',
		array(
			'title' => 'Home Settings',
			'description' => 'Home settings panel',
		)
	);
	// Hero Section
	$wp_customize->add_section(
		'hero_settings',
		array(
			'title' => 'Hero Settings',
			'panel' => 'home_settings',
		)
	);
	// hero image1 settings
	$wp_customize->add_setting('hero_image1', []);
	$wp_customize->add_control(
		new \WP_Customize_Media_Control(
			$wp_customize,
			'hero_image1',
			array(
				'label' => 'Home Hero Image 1',
				'section' => 'hero_settings',
				'settings' => 'hero_image1'
			)
		)
	);
	// hero image2 settings
	$wp_customize->add_setting('hero_image2', []);
	$wp_customize->add_control(
		new \WP_Customize_Media_Control(
			$wp_customize,
			'hero_image2',
			array(
				'label' => 'Home Hero Image 2',
				'section' => 'hero_settings',
				'settings' => 'hero_image2'
			)
		)
	);

	// hero heading settings
	$wp_customize->add_setting('hero_heading', []);
	$wp_customize->add_control(
		new \WP_Customize_Control(
			$wp_customize,
			'hero_heading',
			array(
				'label' => 'Home Hero Heading',
				'section' => 'hero_settings',
				'settings' => 'hero_heading'
			)
		)
	);
	// hero paragraph settings
	$wp_customize->add_setting('hero_paragraph', []);
	$wp_customize->add_control(
		new \WP_Customize_Control(
			$wp_customize,
			'hero_paragraph',
			array(
				'label' => 'Home Hero Heading',
				'section' => 'hero_settings',
				'settings' => 'hero_paragraph'
			)
		)
	);
	// hero image3 settings
	$wp_customize->add_setting('hero_image3', []);
	$wp_customize->add_control(
		new \WP_Customize_Media_Control(
			$wp_customize,
			'hero_image3',
			array(
				'label' => 'Home Hero Image 3',
				'section' => 'hero_settings',
				'settings' => 'hero_image3'
			)
		)
	);
}
add_action('customize_register', 'wpassignment_cutomize_register_home');
/**
 * Render the site title for the selective refresh partial.
 *
 * @return void
 */
function wpassignment_customize_partial_blogname()
{
	bloginfo('name');
}

/**
 * Render the site tagline for the selective refresh partial.
 *
 * @return void
 */
function wpassignment_customize_partial_blogdescription()
{
	bloginfo('description');
}

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function wpassignment_customize_preview_js()
{
	wp_enqueue_script('wpassignment-customizer', get_template_directory_uri() . '/js/customizer.js', array('customize-preview'), _S_VERSION, true);
}
add_action('customize_preview_init', 'wpassignment_customize_preview_js');