<?php
$pageId = get_the_ID();
$img1 = get_post_meta($pageId, 'hero_image1', true);
$img2 = get_post_meta($pageId, 'hero_image2', true);
$title = get_post_meta($pageId, 'hero_title', true);
$text = get_post_meta($pageId, 'hero_text', true);
$img3 = get_post_meta($pageId, 'hero_image3', true);
?>


<section class="container home-hero bg-blush d-flex flex-column py-8 py-md-10 py-xl-20">
    <div class="home-hero__upper d-flex mb-6 mb-md-10 mb-xl-16">
        <figure class="home-hero__upper__left">
            <img src="<?php echo $img1 ?>" alt="hero-1" />
        </figure>
        <figure class="home-hero__upper__right ms-md-10 d-none d-md-block">
            <img src="<?php echo $img2 ?>" alt="hero-2" />
        </figure>
    </div>
    <div class="home-hero__lower d-flex">
        <div class="home-hero__lower__left bg-white col-xs-12 col-xl-8">
            <div class="home-hero__lower__left__content container my-10 my-xl-20">
                <h2 class="h2 mb-4">
                    <?php echo $title ?>
                </h2>
                <p class="body-xl mb-0 mb-md-6 mb-xl-10">
                    <?php echo $text ?>
                </p>
                <div class="home-hero__lower__left__content__button d-none d-md-block">
                    <a href="#" class="button button--light b-black">Contact Us</a>
                </div>
            </div>
        </div>
        <figure class="home-hero__lower__right d-none d-xl-block ms-xl-10">
            <img src="<?php echo $img3 ?>" alt="hero-3" />
        </figure>
    </div>
</section>