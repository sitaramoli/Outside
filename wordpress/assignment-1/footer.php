<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package wpassignment
 */

?>

<footer class="footer container bg-sky text-white py-10 py-md-20">
    <div class="footer-container">
        <!-- logo section -->
        <div class="logo mb-10 mb-xl-20">
            <?php $footer_logo = get_theme_mod('footer_logo');
            $imgUrl = wp_get_attachment_url($footer_logo);
            ?>
            <img src="<?php echo $imgUrl ?>" alt="logo-light">
        </div>

        <!-- sitemap -->
        <div class="sitemap row mb-0 mb-xl-20">

            <div class="sitemap__item col-xs-12 col-md-6 col-xl-3">
                <h6 class="sitemap__item__title mb-10 mb-xl-6">
                    <?php echo wp_get_nav_menu_name('about-us'); ?>
                </h6>
                <?php
                wp_nav_menu(
                    array(
                        'theme_location' => 'about-us',
                        'container' => '',
                        'container_class' => '',
                        'menu_class' => 'sitemap__item__list d-none d-xl-block',
                    )
                );
                ?>
            </div>
            <div class="sitemap__item col-xs-12 col-md-6 col-xl-3">
                <h6 class="sitemap__item__title mb-10 mb-xl-6">
                    <?php echo wp_get_nav_menu_name('our-team'); ?>
                </h6>
                <?php
                wp_nav_menu(
                    array(
                        'theme_location' => 'our-team',
                        'container' => '',
                        'container_class' => '',
                        'menu_class' => 'sitemap__item__list d-none d-xl-block',
                    )
                );
                ?>
            </div>
            <div class="sitemap__item col-xs-12 col-md-6 col-xl-3">
                <h6 class="sitemap__item__title mb-10 mb-xl-6">
                    <?php echo wp_get_nav_menu_name('who-we-are'); ?>
                </h6>
                <?php
                wp_nav_menu(
                    array(
                        'theme_location' => 'who-we-are',
                        'container' => '',
                        'container_class' => '',
                        'menu_class' => 'sitemap__item__list d-none d-xl-block',
                    )
                );
                ?>
            </div>
            <div class="sitemap__item col-xs-12 col-md-6 col-xl-3">

                <h6 class="sitemap__item__title mb-10 mb-xl-6">
                    <?php echo wp_get_nav_menu_name('resources'); ?>
                </h6>
                <?php
                wp_nav_menu(
                    array(
                        'theme_location' => 'resources',
                        'container' => '',
                        'container_class' => '',
                        'menu_class' => 'sitemap__item__list d-none d-xl-block',
                    )
                );
                ?>
            </div>
        </div>
        <!-- sitemap end -->

        <!-- contact -->
        <div class="contact row mb-31  mb-xl-20">
            <div class="col-xs-12 col-xl-3">
                <h6 class="contact__title mb-10 mb-xl-6">Contact</h6>
                <ul class="contact__list d-none d-xl-block">
                    <li class="mb-xl-4"><a href="#">Contact form</a></li>
                    <li><a href="#">allowed@test.com</a></li>
                </ul>
            </div>
            <div class="col-xs-12 col-xl-6 mt-xl-7">
                <p class="contact__newsletter">Sign up for our newsletter:</p>
                <div class="contact__form">
                    <input type="email" name="email" id="email" placeholder="Email address">
                    <button class="button button--sky b-white">Submit</button>
                </div>
            </div>
        </div>
        <!-- contact end -->

        <!-- copyright -->
        <div class="copyright d-flex flex-column flex-md-row">
            <p class="mb-0 me-1">
                <?php
                $copyright_text = get_theme_mod('footer_copyright');
                echo $copyright_text;
                ?>
            </p>
            <p class="m-0">
                <?php
                $copyright_text = get_theme_mod('footer_sitename');
                echo $copyright_text;
                ?>
            </p>
        </div>
    </div>
</footer>


</div><!-- #page -->

<?php wp_footer(); ?>

</body>

</html>