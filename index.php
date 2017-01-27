<html>
    <head>

        <style>
            body {
                padding: 0;
                margin: 0;
            }
            .params {
                margin: 0;
                padding: 0;
                width: 80%;
                position: fixed;
                bottom: 0;
                background-color: #4CAF50;
                padding: 20px;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                border-radius: 0 10px 0 0;
            }

            .param {
                display: flex;
                flex: 1;
                flex-direction: column;
                align-items: center;
                padding: 10px;
            }

            .submit {
                display: flex;
                flex: 1;
                align-items: center;
            }

            .submit input {
                font-size: 1.3em;
            }

            .param label {
                display: flex;
                flex: 1;
                font-family: arial;
                font-size: 0.8em;
                margin-bottom: 5px;
            }

            .param input {
                display: flex;
                width: 50px;
                flex: 1;
                text-align: center;
            }

        </style>
    </head>
    <body>
        <?php

            $paramsGET = "?";
            foreach($_POST as $key => $val) :
                $paramsGET .= '&'.$key.'='.$val;
            endforeach;
        ?>


        <div style="margin: auto; display: inline-block; display: flex; flex-direction: row;">
            <div style="display: flex; flex-direction: column; flex:1; align-items:center;">
                <iframe src="desktop.php<?php print $paramsGET; ?>" width="768" height="500" style="border: 1px solid black;"></iframe>
                <h2>Desktop Mode</h2>
            </div>
            <div style="display: flex; flex-direction: column; flex:1; align-items:center;">
                <iframe src="fullscreen.php<?php print $paramsGET; ?>" width="336" height="500" style="border: 1px solid black; display: flex; flex-direction: column; flex: 1"></iframe>
                <h2>Full Screen Mode</h2>
            </div>
        </div>

        <?php require_once dirname(__FILE__).'/config.php'; ?>

        <form method="post" class="params">
            <?php foreach($gameOptions as $option => $value): ?>
                <div class="param">
                    <label><?php print $option; ?></label>

                    <?php
                        if(isset($_POST[$option])):
                            $val = $_POST[$option];
                        else:
                            $val = $value;
                            if(gettype($val) == 'boolean') :
                                if($val == true):
                                    $val = 'true';
                                else :
                                    $val = 'false';
                                endif;
                            endif;
                        endif;
                    ?>

                    <input type='text' name='<?php print $option; ?>' value='<?php print $val; ?>'>
                </div>
            <?php endforeach; ?>
            <div class="submit">
                <input type='submit' value='Edit Parametters'>
            </div>
        </form>
    </body>
</html>
