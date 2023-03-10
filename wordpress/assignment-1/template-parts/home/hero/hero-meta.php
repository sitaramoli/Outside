<?php
// Metaboxes
function home_hero_metabox()
{
    add_meta_box(
        'home_hero_metabox',
        // $id is a unique id given to every meta box
        'Home Hero Section',
        // $title is the title displayed in custom meta box
        'home_hero_metabox_callback',
        // $callback is a function that outputs markup inside the custom meta box
        'page',
        // $page represents the admin page on which the meta box will be displayed on. It can be page, post, custom post type.
        'advanced',
        // $context represents the position of the meta box. It can be normal, advanced or side.
        'default' // $priority is the position of the box inside the context. It can be high, core, default or low.
    );
}
add_action('add_meta_boxes', 'home_hero_metabox');
function home_hero_metabox_callback($post)
{
    wp_nonce_field(basename(__FILE__), 'home_hero_nonce');
    $hero_image1 = get_post_meta($post->ID, "hero_image1", true);
    $hero_image2 = get_post_meta($post->ID, "hero_image2", true);
    $hero_title = get_post_meta($post->ID, "hero_title", true);
    $hero_text = get_post_meta($post->ID, "hero_text", true);
    $hero_image3 = get_post_meta($post->ID, "hero_image3", true);
    ?>
    <table class="table">
        <tr>
            <td>Image 1</td>
            <td>
                <input type="url" name="hero-image1" id="hero-image1" value="<?php echo esc_attr($hero_image1); ?>"><br>
            </td>
            <td><button type="button" class="button" id="hero-image1-btn" data-media-uploader-target="#hero-image1">
                    <?php _e('Upload Image', 'default') ?>
                </button></td>
        </tr>
        <tr>
            <td>Image 2</td>
            <td>
                <input type="url" name="hero-image2" id="hero-image2" value="<?php echo esc_attr($hero_image2); ?>"><br>
            </td>
            <td><button type="button" class="button" id="hero-image2-btn" data-media-uploader-target="#hero-image2">
                    <?php _e('Upload Image', 'default') ?>
                </button></td>
        </tr>
        <tr>
            <td>
                <?php _e('Title', 'page') ?>
            </td>
            <td>
                <input type="text" name="hero-title" id="hero-title" value="<?php if (isset($hero_title))
                    echo $hero_title; ?>" />
            </td>
        </tr>
        <tr>
            <td>
                <?php _e('Text', 'page') ?>
            </td>
            <td>
                <input type="text" name="hero-text" id="hero-text" value="<?php if (isset($hero_text))
                    echo $hero_text; ?>" />
            </td>
        </tr>
        <tr>
            <td>Image 3</td>
            <td>
                <input type="url" name="hero-image3" id="hero-image3" value="<?php echo esc_attr($hero_image3); ?>"><br>
            </td>
            <td><button type="button" class="button" id="hero-image3-btn" data-media-uploader-target="#hero-image3">
                    <?php _e('Upload Image', 'default') ?>
                </button></td>
        </tr>

    </table>
    <?php
}
add_action("save_post", "home_hero_save_metabox_data", 10, 2);
function home_hero_save_metabox_data($post_id, $post)
{
    // we have verfied the nonce
    if (!isset($_POST['home_hero_nonce']) || !wp_verify_nonce($_POST['home_hero_nonce'], basename(__FILE__))) {
        return $post_id;
    }
    // verifying slug value
    $post_slug = "page";
    if ($post_slug != $post->post_type) {
        return;
    }
    //save value to db field
    $hero_image1 = '';
    $hero_image2 = '';
    $hero_title = '';
    $hero_text = '';
    $hero_image3 = '';

    if (isset($_POST['hero-image1'])) {
        $hero_image1 = sanitize_url($_POST['hero-image1']);
    }
    if (isset($_POST['hero-image2'])) {
        $hero_image2 = sanitize_url($_POST['hero-image2']);
    }
    if (isset($_POST['hero-title'])) {

        $hero_title = sanitize_text_field($_POST['hero-title']);
    }
    if (isset($_POST['hero-text'])) {

        $hero_text = sanitize_text_field($_POST['hero-text']);
    }
    if (isset($_POST['hero-image3'])) {
        $hero_image3 = sanitize_url($_POST['hero-image3']);
    }
    update_post_meta($post_id, "hero_image1", $hero_image1);
    update_post_meta($post_id, "hero_image2", $hero_image2);
    update_post_meta($post_id, "hero_title", $hero_title);
    update_post_meta($post_id, "hero_text", $hero_text);
    update_post_meta($post_id, "hero_image3", $hero_image3);
}