<?php
$pageId = get_the_ID();
$title = get_post_meta($pageId, 'testimonial_title', true);
$subTitle = get_post_meta($pageId, 'testimonial_sub_title', true);
$image = get_post_meta($pageId, 'testimonial_image', true);
$name = get_post_meta($pageId, 'testimonial_name', true);
$userDesignation = get_post_meta($pageId, 'testimonial_user_designation', true);
$review = get_post_meta($pageId, 'testimonial_review', true);
?>

<article class="home-testimonial">
    <div class="container mt-11 mb-14 mt-md-14 mb-md-17 mt-xl-21 mb-xl-23">
        <div class="row justify-content-center">
            <div class="col-12 col-md-10 col-xl-8">
                <h2 class="home-testimonial__heading text-center">
                    <?php echo $title; ?>
                </h2>
                <p class="home-testimonial__sub-heading body-xl text-center">
                    <?php echo $subTitle; ?>
                </p>
                <div class="home-testimonial__avatar rounded-circle bg-teal mx-auto p-2 p-md-3 mb-6 mb-md-8 mb-xl-9">
                    <figure>
                        <img loading="lazy" class="rounded-circle" src="<?php echo $image; ?>" alt="avatar" />
                    </figure>
                </div>
                <h4 class="home-testimonial__name mb-4 mb-md-7 mb-xl-5 text-center">
                    <?php echo $name; ?> <span class="d-block d-md-inline">(<?php echo $userDesignation ?>)
                    </span>
                </h4>
                <div class="home-testimonial__icons mx-auto mb-6 mb-md-7 mb-xl-5">
                    <i class="icon-linkedIn"></i>
                    <i class="icon-github"></i>
                    <i class="icon-twitter"></i>
                    <i class="icon-facebook"></i>
                </div>
                <p class="home-testimonial__review text-center">
                    <?php echo $review; ?>
                </p>
            </div>
        </div>
    </div>
</article>