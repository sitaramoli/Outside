<?php
$pageId = get_the_ID();
$title = get_post_meta($pageId, 'hiringbanner_title', true);
$text = get_post_meta($pageId, 'hiringbanner_text', true);

?>

<section class="home-hiring-banner bg-blush container py-10 py-md-20">
    <div class="container">
        <div class="content mb-6 mb-xl-10">
            <h3 class="h3">
                <?php echo $title; ?>
            </h3>
            <p class="body-xl">
                <?php echo $text; ?>
            </p>
        </div>
        <div class="home-hiring-banner__button">
            <a href="#" class="button button--sky right-arrow-button b-sky">See Our Blogs</a>
        </div>
    </div>
</section>