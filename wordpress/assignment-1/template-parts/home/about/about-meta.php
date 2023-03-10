<?php
// Metaboxes
function home_about_metabox()
{
    add_meta_box(
        'home_about_metabox',
        // $id is a unique id given to every meta box
        'Home About Section',
        // $title is the title displayed in custom meta box
        'home_about_metabox_callback',
        // $callback is a function that outputs markup inside the custom meta box
        'page',
        // $page represents the admin page on which the meta box will be displayed on. It can be page, post, custom post type.
        'advanced',
        // $context represents the position of the meta box. It can be normal, advanced or side.
        'default' // $priority is the position of the box inside the context. It can be high, core, default or low.
    );
}
add_action('add_meta_boxes', 'home_about_metabox');
function home_about_metabox_callback($post)
{
    wp_nonce_field(basename(__FILE__), 'home_about_nonce');
    $about_eyebrow = get_post_meta($post->ID, "about_eyebrow", true);
    $about_text = get_post_meta($post->ID, "about_text", true);
    $about_image = get_post_meta($post->ID, "about_image", true);
    $about_image_title = get_post_meta($post->ID, "about_image_title", true);
    ?>
    <table class="table">
        <tr>
            <td>
                <?php _e('Eyebrow', 'page') ?>
            </td>
            <td>
                <input type="text" name="about-eyebrow" id="about-eyebrow" value="<?php if (isset($about_eyebrow))
                    echo $about_eyebrow; ?>" />
            </td>
        </tr>
        <tr>
            <td>
                <?php _e('Text', 'page') ?>
            </td>
            <td>
                <input type="text" name="about-text" id="about-text" value="<?php if (isset($about_text))
                    echo $about_text; ?>" />
            </td>
        </tr>
        <tr>
            <td>
                <?php _e('Image Title', 'page') ?>
            </td>
            <td>
                <input type="text" name="about-image-title" id="about-image-title" value="<?php if (isset($about_image_title))
                    echo $about_image_title; ?>" />
            </td>
        </tr>
        <tr>
            <td>Image</td>
            <td>
                <input type="url" name="about-image" id="about-image" value="<?php echo esc_attr($about_image); ?>"><br>
            </td>
            <td><button type="button" class="button" id="about-image-btn" data-media-uploader-target="#about-image">
                    <?php _e('Upload Image', 'default') ?>
                </button></td>
        </tr>

    </table>
    <?php
}
add_action("save_post", "home_about_save_metabox_data", 10, 2);
function home_about_save_metabox_data($post_id, $post)
{
    // we have verfied the nonce
    if (!isset($_POST['home_about_nonce']) || !wp_verify_nonce($_POST['home_about_nonce'], basename(__FILE__))) {
        return $post_id;
    }
    // verifying slug value
    $post_slug = "page";
    if ($post_slug != $post->post_type) {
        return;
    }
    //save value to db field
    $about_eyebrow = '';
    $about_text = '';
    $about_image_title = '';
    $about_image = '';

    if (isset($_POST['about-eyebrow'])) {

        $about_eyebrow = sanitize_text_field($_POST['about-eyebrow']);
    }
    if (isset($_POST['about-text'])) {

        $about_text = sanitize_text_field($_POST['about-text']);
    }
    if (isset($_POST['about-image-title'])) {

        $about_image_title = sanitize_text_field($_POST['about-image-title']);
    }
    if (isset($_POST['about-image'])) {
        $about_image = sanitize_url($_POST['about-image']);
    }
    update_post_meta($post_id, "about_eyebrow", $about_eyebrow);
    update_post_meta($post_id, "about_text", $about_text);
    update_post_meta($post_id, "about_image_title", $about_image_title);
    update_post_meta($post_id, "about_image", $about_image);
}