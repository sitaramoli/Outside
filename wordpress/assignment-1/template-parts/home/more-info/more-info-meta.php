<?php
// Metaboxes
function home_more_info_metabox()
{
    add_meta_box(
        'home_more_info_metabox',
        // $id is a unique id given to every meta box
        'Home More Info Section',
        // $title is the title displayed in custom meta box
        'home_more_info_metabox_callback',
        // $callback is a function that outputs markup inside the custom meta box
        'page',
        // $page represents the admin page on which the meta box will be displayed on. It can be page, post, custom post type.
        'advanced',
        // $context represents the position of the meta box. It can be normal, advanced or side.
        'default' // $priority is the position of the box inside the context. It can be high, core, default or low.
    );
}
add_action('add_meta_boxes', 'home_more_info_metabox');
function home_more_info_metabox_callback($post)
{
    wp_nonce_field(basename(__FILE__), 'home_more_info_nonce');
    $more_info_eyebrow = get_post_meta($post->ID, "more_info_eyebrow", true);
    $more_info_title = get_post_meta($post->ID, "more_info_title", true);
    $more_info_date = get_post_meta($post->ID, "more_info_date", true);
    $more_info_text = get_post_meta($post->ID, "more_info_text", true);
    $more_info_image = get_post_meta($post->ID, "more_info_image", true);
    ?>
    <table class="table">
        <tr>
            <td>
                <?php _e('Eyebrow', 'page') ?>
            </td>
            <td>
                <input type="text" name="more_info-eyebrow" id="more_info-eyebrow" value="<?php if (isset($more_info_eyebrow))
                    echo $more_info_eyebrow; ?>" />
            </td>
        </tr>
        <tr>
            <td>
                <?php _e('Title', 'page') ?>
            </td>
            <td>
                <input type="text" name="more_info-title" id="more_info-title" value="<?php if (isset($more_info_text))
                    echo $more_info_text; ?>" />
            </td>
        </tr>
        <tr>
            <td>
                <?php _e('Text', 'page') ?>
            </td>
            <td>
                <input type="text" name="more_info-text" id="more_info-text" value="<?php if (isset($more_info_text))
                    echo $more_info_text; ?>" />
            </td>
        </tr>
        <tr>
            <td>Image</td>
            <td>
                <input type="url" name="more_info-image" id="more_info-image"
                    value="<?php echo esc_attr($more_info_image); ?>"><br>
            </td>
            <td><button type="button" class="button" id="more_info-image-btn" data-media-uploader-target="#more_info-image">
                    <?php _e('Upload Image', 'default') ?>
                </button></td>
        </tr>

    </table>
    <?php
}
add_action("save_post", "home_more_info_save_metabox_data", 10, 2);
function home_more_info_save_metabox_data($post_id, $post)
{
    // we have verfied the nonce
    if (!isset($_POST['home_more_info_nonce']) || !wp_verify_nonce($_POST['home_more_info_nonce'], basename(__FILE__))) {
        return $post_id;
    }
    // verifying slug value
    $post_slug = "page";
    if ($post_slug != $post->post_type) {
        return;
    }
    //save value to db field
    $more_info_eyebrow = '';
    $more_info_title = '';
    $more_info_text = '';
    $more_info_image = '';

    if (isset($_POST['more_info-eyebrow'])) {

        $more_info_eyebrow = sanitize_text_field($_POST['more_info-eyebrow']);
    }
    if (isset($_POST['more_info-text'])) {

        $more_info_text = sanitize_text_field($_POST['more_info-text']);
    }
    if (isset($_POST['more_info-title'])) {

        $more_info_title = sanitize_text_field($_POST['more_info-title']);
    }
    if (isset($_POST['more_info-image'])) {
        $more_info_image = sanitize_url($_POST['more_info-image']);
    }
    update_post_meta($post_id, "more_info_eyebrow", $more_info_eyebrow);
    update_post_meta($post_id, "more_info_title", $more_info_title);
    update_post_meta($post_id, "more_info_text", $more_info_text);
    update_post_meta($post_id, "more_info_date", date("M j, Y"));
    update_post_meta($post_id, "more_info_image", $more_info_image);
}