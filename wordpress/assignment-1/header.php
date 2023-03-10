<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package wpassignment
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>

<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<?php wp_body_open(); ?>
	<header class="header p-6">
		<nav class="navbar navbar-expand-xl">
			<div class="logo-wrapper d-flex align-items-center">
				<a class="hamburger d-xl-none" href="#offcanvas-nav" data-bs-toggle="offcanvas"><i
						class="icon-menu"></i></a>
				<a href="#" class="brand-logo navbar-brand">
					<?php
					$header_logo = get_theme_mod('header_logo');
					$imgUrl = wp_get_attachment_url($header_logo);
					?>
					<img src="<?php echo $imgUrl ?>" alt="logo-dark">
				</a>
			</div>
			<a href="#" class="contact-us-btn button button--light b-black d-none d-md-block d-xl-none">Join Us Now</a>
			<div class="offcanvas offcanvas-start ms-auto" tabindex="-1" id="offcanvas-nav">
				<div class="offcanvas-header">
					<a class="close-btn" data-bs-dismiss="offcanvas" aria-label="Close"><i
							class="icon-close text-white"></i></a>
					<?php $footer_logo = get_theme_mod('footer_logo');
					$imgUrl = wp_get_attachment_url($footer_logo);
					?>
					<img src="<?php echo $imgUrl ?>" alt="logo-light">
				</div>
				<?php
				wp_nav_menu(
					array(
						'theme_location' => 'primary-menu',
						'container' => 'div',
						'container_class' => 'offcanvas-body',
						'menu_class' => 'navbar-nav',
					)
				);
				?>
			</div>
		</nav>
	</header>
	