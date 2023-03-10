<?php
$pageId = get_the_ID();
$eyebrow = get_post_meta($pageId, 'more_info_eyebrow', true);
$title = get_post_meta($pageId, 'more_info_title', true);
$text = get_post_meta($pageId, 'more_info_text', true);
$date = get_post_meta($pageId, 'more_info_date', true);
$image = get_post_meta($pageId, 'more_info_image', true);

?>
<section class="home-more-info container bg-mint py-10 py-md-20 py-xl-30">
    <article class="card-h01">
        <figure class="card-h01__img col-xs-12 col-md-6">
            <img loading="lazy" src="<?php echo $image; ?>" alt="<?php echo $title; ?>">
        </figure>
        <div class="card-h01__body">
            <span class="card-h01__body__eyebrow h6 mb-0">
                <?php echo $eyebrow; ?>
            </span>
            <h4 class="h4 m-0">
                <?php echo $title; ?>
            </h4>
            <p class="card-h01__body__para body mb-0">
                <span class="date">
                    <?php echo $date; ?>
                </span>
                <br>
                <br>
                <?php echo $text; ?>
            </p>
            <a href="#" class="right-arrow-button button button--transparent b-black">Learn More</a>
        </div>

    </article>
</section>