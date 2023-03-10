<?php
$pageId = get_the_ID();
$eyebrow = get_post_meta($pageId, 'about_eyebrow', true);
$text = get_post_meta($pageId, 'about_text', true);
$image_title = get_post_meta($pageId, 'about_image_title', true);
$image = get_post_meta($pageId, 'about_image', true);

?>
<section class="home-about-us container justify-content-between py-10 py-md-20 py-xl-30">
    <div class="home-about-us__left col-xs-12 col-md-6">
        <h6 class="home-about-us__left__eyebrow h6">
            <?php echo $eyebrow; ?>
        </h6>
        <p class="h3 home-about-us__left__para">
            <?php echo $text; ?>
        </p>
        
            <a href="#" class="right-arrow-button button button--sky b-sky">Learn More</a>
    
    </div>
    <div class="home-about-us__right bg-moon p-6">
        <h6 class="home-about-us__right__eyebrow h6">
            <?php echo $image_title; ?>
        </h6>
        <div class="home-about-us__right__video ">
            <video poster="<?php echo $image; ?>" class="object-fit-fill" controls>
                <source src="images/home/video.mp4" type="video/mp4">
            </video>
        </div>
    </div>
</section>