<?php
// Metaboxes
function home_our_team_metabox()
{
    add_meta_box(
        'home_our_team_metabox',
        // $id is a unique id given to every meta box
        'Home Our Team Section',
        // $title is the title displayed in custom meta box
        'home_our_team_metabox_callback',
        // $callback is a function that outputs markup inside the custom meta box
        'page',
        // $page represents the admin page on which the meta box will be displayed on. It can be page, post, custom post type.
        'advanced',
        // $context represents the position of the meta box. It can be normal, advanced or side.
        'default' // $priority is the position of the box inside the context. It can be high, core, default or low.
    );
}
add_action('add_meta_boxes', 'home_our_team_metabox');
function home_our_team_metabox_callback($post)
{
    wp_nonce_field(basename(__FILE__), 'home_our_team_nonce');
    $our_team_eyebrow = get_post_meta($post->ID, "our_team_eyebrow", true);
    $our_team_title = get_post_meta($post->ID, "our_team_text", true);
    $our_team_text = get_post_meta($post->ID, "our_team_text", true);
    $our_team_image = get_post_meta($post->ID, "our_team_image", true);
    ?>
    <table class="table">
        <tr>
            <td>
                <?php _e('Eyebrow', 'page') ?>
            </td>
            <td>
                <input type="text" name="our-team-eyebrow" id="our-team-eyebrow" value="<?php if (isset($our_team_eyebrow))
                    echo $our_team_eyebrow; ?>" />
            </td>
        </tr>
        <tr>
            <td>
                <?php _e('Title', 'page') ?>
            </td>
            <td>
                <input type="text" name="our-team-title" id="our-team-title" value="<?php if (isset($our_team_title))
                    echo $our_team_title; ?>" />
            </td>
        </tr>
        <tr>
            <td>
                <?php _e('Text', 'page') ?>
            </td>
            <td>
                <input type="text" name="our-team-text" id="our-team-text" value="<?php if (isset($our_team_text))
                    echo $our_team_text; ?>" />
            </td>
        </tr>
        <tr>
            <td>Image</td>
            <td>
                <input type="url" name="our-team-image" id="our-team-image"
                    value="<?php echo esc_attr($our_team_image); ?>"><br>
            </td>
            <td><button type="button" class="button" id="our-team-image-btn" data-media-uploader-target="#our-team-image">
                    <?php _e('Upload Image', 'default') ?>
                </button></td>
        </tr>

    </table>
    <?php
}
add_action("save_post", "home_our_team_save_metabox_data", 10, 2);
function home_our_team_save_metabox_data($post_id, $post)
{
    // we have verfied the nonce
    if (!isset($_POST['home_our_team_nonce']) || !wp_verify_nonce($_POST['home_our_team_nonce'], basename(__FILE__))) {
        return $post_id;
    }
    // verifying slug value
    $post_slug = "page";
    if ($post_slug != $post->post_type) {
        return;
    }
    //save value to db field
    $our_team_eyebrow = '';
    $our_team_title = '';
    $our_team_text = '';
    $our_team_image = '';

    if (isset($_POST['our-team-eyebrow'])) {

        $our_team_eyebrow = sanitize_text_field($_POST['our-team-eyebrow']);
    }
    if (isset($_POST['our-team-title'])) {

        $our_team_title = sanitize_text_field($_POST['our-team-title']);
    }
    if (isset($_POST['our-team-text'])) {

        $our_team_text = sanitize_text_field($_POST['our-team-text']);
    }
    if (isset($_POST['our-team-image'])) {
        $our_team_image = sanitize_url($_POST['our-team-image']);
    }
    update_post_meta($post_id, "our_team_eyebrow", $our_team_eyebrow);
    update_post_meta($post_id, "our_team_title", $our_team_title);
    update_post_meta($post_id, "our_team_text", $our_team_text);
    update_post_meta($post_id, "our_team_image", $our_team_image);
}