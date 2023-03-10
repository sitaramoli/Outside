<?php
// Metaboxes
function home_testimonial_metabox()
{
    add_meta_box(
        'home_testimonial_metabox',
        // $id is a unique id given to every meta box
        'Home Testimonial Section',
        // $title is the title displayed in custom meta box
        'home_testimonial_metabox_callback',
        // $callback is a function that outputs markup inside the custom meta box
        'page',
        // $page represents the admin page on which the meta box will be displayed on. It can be page, post, custom post type.
        'advanced',
        // $context represents the position of the meta box. It can be normal, advanced or side.
        'default' // $priority is the position of the box inside the context. It can be high, core, default or low.
    );
}
add_action('add_meta_boxes', 'home_testimonial_metabox');
function home_testimonial_metabox_callback($post)
{
    wp_nonce_field(basename(__FILE__), 'home_testimonial_nonce');
    $testimonial_title = get_post_meta($post->ID, "testimonial_title", true);
    $testimonial_sub_title = get_post_meta($post->ID, "testimonial_sub_title", true);
    $testimonial_image = get_post_meta($post->ID, "testimonial_image", true);
    $testimonial_name = get_post_meta($post->ID, "testimonial_name", true);
    $testimonial_user_designation = get_post_meta($post->ID, "testimonial_user_designation", true);
    $testimonial_review = get_post_meta($post->ID, "testimonial_review", true);
    ?>
    <table class="table">
        <tr>
            <td>
                <?php _e('Title', 'page') ?>
            </td>
            <td>
                <input type="text" name="testimonial-title" id="testimonial-title" value="<?php if (isset($testimonial_title))
                    echo $testimonial_title; ?>" />
            </td>
        </tr>
        <tr>
            <td>
                <?php _e('Sub-title', 'page') ?>
            </td>
            <td>
                <input type="text" name="testimonial-sub-title" id="testimonial-sub-title" value="<?php if (isset($testimonial_sub_title))
                    echo $testimonial_sub_title; ?>" />
            </td>
        </tr>
        <tr>
            <td>Image</td>
            <td>
                <input type="url" name="testimonial-image" id="testimonial-image"
                    value="<?php echo esc_attr($testimonial_image); ?>"><br>
            </td>
            <td><button type="button" class="button" id="testimonial-image-btn"
                    data-media-uploader-target="#testimonial-image">
                    <?php _e('Upload Image', 'default') ?>
                </button></td>
        </tr>
        <tr>
            <td>
                <?php _e('User Name', 'page') ?>
            </td>
            <td>
                <input type="text" name="testimonial-name" id="testimonial-name" value="<?php if (isset($testimonial_name))
                    echo $testimonial_name; ?>" />
            </td>
        </tr>
        <tr>
            <td>
                <?php _e('Designation', 'page') ?>
            </td>
            <td>
                <input type="text" name="testimonial-designation" id="testimonial-designation" value="<?php if (isset($testimonial_user_designation))
                    echo $testimonial_user_designation; ?>" />
            </td>
        </tr>

        <tr>
            <td>
                <?php _e('Review', 'page') ?>
            </td>
            <td>
                <input type="text" name="testimonial-review" id="testimonial-review" value="<?php if (isset($testimonial_review))
                    echo $testimonial_review; ?>" />
            </td>
        </tr>

    </table>
    <?php
}
add_action("save_post", "home_testimonial_save_metabox_data", 10, 2);
function home_testimonial_save_metabox_data($post_id, $post)
{
    // we have verfied the nonce
    if (!isset($_POST['home_testimonial_nonce']) || !wp_verify_nonce($_POST['home_testimonial_nonce'], basename(__FILE__))) {
        return $post_id;
    }
    // verifying slug value
    $post_slug = "page";
    if ($post_slug != $post->post_type) {
        return;
    }
    //save value to db field
    $testimonial_title = '';
    $testimonial_sub_title = '';
    $testimonial_image = '';
    $testimonial_name = '';
    $testimonial_user_designation = '';
    $testimonial_review = '';

    if (isset($_POST['testimonial-title'])) {

        $testimonial_title = sanitize_text_field($_POST['testimonial-title']);
    }
    if (isset($_POST['testimonial-sub-title'])) {

        $testimonial_sub_title = sanitize_text_field($_POST['testimonial-sub-title']);
    }
    if (isset($_POST['testimonial-image'])) {
        $testimonial_image = sanitize_url($_POST['testimonial-image']);
    }
    if (isset($_POST['testimonial-name'])) {

        $testimonial_name = sanitize_text_field($_POST['testimonial-name']);
    }
    if (isset($_POST['testimonial-designation'])) {

        $testimonial_user_designation = sanitize_text_field($_POST['testimonial-designation']);
    }
    if (isset($_POST['testimonial-review'])) {

        $testimonial_review = sanitize_text_field($_POST['testimonial-review']);
    }

    update_post_meta($post_id, "testimonial_title", $testimonial_title);
    update_post_meta($post_id, "testimonial_sub_title", $testimonial_sub_title);
    update_post_meta($post_id, "testimonial_image", $testimonial_image);
    update_post_meta($post_id, "testimonial_name", $testimonial_name);
    update_post_meta($post_id, "testimonial_user_designation", $testimonial_user_designation);
    update_post_meta($post_id, "testimonial_review", $testimonial_review);
}