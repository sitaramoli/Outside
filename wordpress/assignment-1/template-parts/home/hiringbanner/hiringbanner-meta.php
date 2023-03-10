<?php
// Metaboxes
function home_hiringbanner_metabox()
{
    add_meta_box(
        'home_hiringbanner_metabox',
        // $id is a unique id given to every meta box
        'Home Hiring Banner Section',
        // $title is the title displayed in custom meta box
        'home_hiringbanner_metabox_callback',
        // $callback is a function that outputs markup inside the custom meta box
        'page',
        // $page represents the admin page on which the meta box will be displayed on. It can be page, post, custom post type.
        'advanced',
        // $context represents the position of the meta box. It can be normal, advanced or side.
        'default' // $priority is the position of the box inside the context. It can be high, core, default or low.
    );
}
add_action('add_meta_boxes', 'home_hiringbanner_metabox');
function home_hiringbanner_metabox_callback($post)
{
    wp_nonce_field(basename(__FILE__), 'home_hiringbanner_nonce');
    $hiringbanner_title = get_post_meta($post->ID, "hiringbanner_title", true);
    $hiringbanner_text = get_post_meta($post->ID, "hiringbanner_text", true);
    ?>
    <table class="table">

        <tr>
            <td>
                <?php _e('Title', 'page') ?>
            </td>
            <td>
                <input type="text" name="hiringbanner-title" id="hiringbanner-title" value="<?php if (isset($hiringbanner_text))
                    echo $hiringbanner_text; ?>" />
            </td>
        </tr>
        <tr>
            <td>
                <?php _e('Text', 'page') ?>
            </td>
            <td>
                <input type="text" name="hiringbanner-text" id="hiringbanner-text" value="<?php if (isset($hiringbanner_text))
                    echo $hiringbanner_text; ?>" />
            </td>
        </tr>

    </table>
    <?php
}
add_action("save_post", "home_hiringbanner_save_metabox_data", 10, 2);
function home_hiringbanner_save_metabox_data($post_id, $post)
{
    // we have verfied the nonce
    if (!isset($_POST['home_hiringbanner_nonce']) || !wp_verify_nonce($_POST['home_hiringbanner_nonce'], basename(__FILE__))) {
        return $post_id;
    }
    // verifying slug value
    $post_slug = "page";
    if ($post_slug != $post->post_type) {
        return;
    }
    //save value to db field
    $hiringbanner_title = '';
    $hiringbanner_text = '';


    if (isset($_POST['hiringbanner-text'])) {

        $hiringbanner_text = sanitize_text_field($_POST['hiringbanner-text']);
    }
    if (isset($_POST['hiringbanner-title'])) {

        $hiringbanner_title = sanitize_text_field($_POST['hiringbanner-title']);
    }

    update_post_meta($post_id, "hiringbanner_title", $hiringbanner_title);
    update_post_meta($post_id, "hiringbanner_text", $hiringbanner_text);
}