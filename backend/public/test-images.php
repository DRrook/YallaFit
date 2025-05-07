<?php
// List all profile images
$images = glob('storage/profile-images/*.jpg');
?>
<!DOCTYPE html>
<html>
<head>
    <title>Profile Images Test</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .image-container { margin-bottom: 20px; border: 1px solid #ccc; padding: 10px; }
        img { max-width: 200px; max-height: 200px; display: block; margin-bottom: 10px; }
    </style>
</head>
<body>
    <h1>Profile Images Test</h1>
    <p>This page tests if profile images are accessible through the web server.</p>
    
    <h2>Images Found: <?php echo count($images); ?></h2>
    
    <?php foreach($images as $image): ?>
        <div class="image-container">
            <img src="<?php echo $image; ?>" alt="Profile Image">
            <div>Path: <?php echo $image; ?></div>
            <div>Full URL: <?php echo 'http://' . $_SERVER['HTTP_HOST'] . '/' . $image; ?></div>
            <div>File Size: <?php echo filesize($image); ?> bytes</div>
            <div>Last Modified: <?php echo date('Y-m-d H:i:s', filemtime($image)); ?></div>
        </div>
    <?php endforeach; ?>
    
    <?php if(count($images) === 0): ?>
        <p>No images found in storage/profile-images/</p>
    <?php endif; ?>
</body>
</html>
