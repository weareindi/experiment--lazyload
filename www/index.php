<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title></title>
        <link rel="stylesheet" href="assets/css/style.css">

        <script type="text/javascript">
            <?php include './assets/js/intersection-observer-polyfill/intersection-observer.js'; ?>
            <?php include './assets/js/lozyload/lozyload-head.js'; ?>
        </script>
    </head>
    <body>
        <div class="container">
            <?php
                $imageDirectory = './assets/images/bulbs';
                foreach (scandir($imageDirectory) as $imageFilename) {
                    if (is_file($imageDirectory . DIRECTORY_SEPARATOR . $imageFilename)) {
                        $imageSize = getimagesize($imageDirectory . DIRECTORY_SEPARATOR . $imageFilename);
                        echo '<img src="'. $imageDirectory . DIRECTORY_SEPARATOR . $imageFilename .'" '.$imageSize[3].' />' . PHP_EOL;
                    }
                }
            ?>
        </div>

        <script type="text/javascript" src="./assets/js/lozyload/lozyload-body.js"></script>
    </body>
</html>
