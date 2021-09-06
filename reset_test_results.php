<?php
  /* Delete uploads/to_archive.
   * Copy "test results" from ./test_results to uploads.
   */
  require('header.php');
  require('functions.php');
  $form_action = 'reset_test_results.php';
  $submit_text = 'Reset';
  $form_head = '';
  $form_text = 'Enter password to reset all test results.';
  if (!isset($_POST['pass'])) {
    require('password_form.php');
          // I used password hash to encrypt password.
  } elseif (password_verify($_POST['pass'], $password_hash)) {
    // Remove to_archive directory.
    if (is_dir("$results_directory/to_archive")) {
      rmdir("$results_directory/to_archive");
    }
    $sub_dirs = array('initial_participants' => 'Initial Participants',
                      'feedback' => 'IAT Feedback',
                      'answers' => 'Final output');
    // Copy each directory of test results into uploads.
    foreach ($sub_dirs as $sub_dir => $description) {
      $source_dir_name = 'test_results/' . $sub_dir;
      $dest_dir_name = "$results_directory/$sub_dir";
      if (is_dir($source_dir_name)) {
        if (is_dir($dest_dir_name)) {
          if ($dest_dir = opendir($dest_dir_name)) {
            while (($file = readdir($dest_dir)) !== false) {
              if (substr($file, 0, 1) != '.') {
                unlink("$dest_dir_name/$file");
              }
            }
            closedir($dest_dir);
            rmdir($dest_dir_name);
          }
        }
        mkdir($dest_dir_name);
        if ($source_dir = opendir($source_dir_name)) {
          while (($file = readdir($source_dir)) !== false) {
            if (substr($file, 0, 1) != '.') {
              if(!copy("$source_dir_name/$file", "$dest_dir_name/$file")) {
                echo "<h4>$file failed to copy.</h4>";
              } else {
                echo "$file has been copied.<br />";
              }
            }
          }
        }
        echo '<em>' . $source_dir_name . ' has been copied.</em><br /><br />';
      } else {
        echo "<h4>$source_dir_name is missing.</h4>";
      }
    }
    echo 'Test data has been reset.';
  } else { // wrong password
    $form_head = 'Password incorrect';
    require('password_form.php');
  }
  require('footer.php');
?>
