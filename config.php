<?php

//Name of product used by the socle
define('PRODUCT', 'icon-matcher');

$gameOptions = array(
	'duration'   			=> 60,
	'pointEarned' 			=> 10,
    'pointLost' 			=> 15,
	'pointToLevel1'			=> 200,
    'winningLevel' 			=> 1,
    'timingTemps'			=> false,
    'percentToNextLevel' 	=> 1.5,
    'life' 					=> 2,
    'pointBonus' 			=> 5,

    // Here You can add new specific parameters
    // speed of icons radius
    // slow : 0.1 ,fast: 0.2, very fast: 0.4  
    'speed' 				=> 0.15,

    // texts
    'match_color_text'		=> 'Color association',		
    'match_shape_text'		=> 'Shape association',

);

//REGIEREPLACE
