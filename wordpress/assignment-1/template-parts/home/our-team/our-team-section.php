<?php
$pageId = get_the_ID();
$eyebrow = get_post_meta($pageId, 'our_team_eyebrow', true);
$title = get_post_meta($pageId, 'our_team_title', true);
$text = get_post_meta($pageId, 'our_team_text', true);
$image = get_post_meta($pageId, 'our_team_image', true);
?>

<section class="home-our-team container bg-blush py-6 py-md-20 py-xl-30">
    <span class="home-our-team__eyebrow h6">
        <?php echo $eyebrow; ?>
    </span>
    <div class="home-our-team__carousel mt-6 mt-md-10">
        <div class="home-our-team__carousel__carousel-item bg-white d-flex flex-column flex-md-row">
            <picture class="our-team-img">
                <img loading="lazy" src="<?php echo $image; ?>" alt="our-team" />
            </picture>
            <div class="p-6 p-md-10 ps-xl-18 pe-xl-10 py-xl-24">
                <span class="h3 d-block mb-10 mb-xl-8">
                    <?php echo $title; ?>
                </span>
                <p class="body-xl">
                    <?php echo $text; ?>
                </p>
            </div>
        </div>
    </div>
    <div class="home-our-team__carousel-controls d-flex justify-content-between align-items-center mt-6 mt-md-10">
        <button class="home-our-team__carousel-controls__button"><i class="icon-arrow-left"></i></button>
        <div class="home-our-team__carousel-controls__indicator-wrapper">
            <button class="home-our-team__carousel-controls__indicator-wrapper__indicator active"></button>
            <button class="home-our-team__carousel-controls__indicator-wrapper__indicator"></button>
            <button class="home-our-team__carousel-controls__indicator-wrapper__indicator"></button>
            <button class="home-our-team__carousel-controls__indicator-wrapper__indicator"></button>
            <button class="home-our-team__carousel-controls__indicator-wrapper__indicator"></button>
        </div>
        <button class="home-our-team__carousel-controls__button"><i class="icon-arrow-right"></i></button>
    </div>
</section>