
#-------------------------------------------------!
#            ####                  ####           !
#            ####=ooO=========Ooo= ####           !
#            ####  \\  (o o)  //   ####           !
#               --------(_)--------               !
#              --. ..- ...  .. ...   −− .         !
#-------------------------------------------------!
#                socle: 2017/01/16                !
#                      apch                       !
#-------------------------------------------------!


class Phacker.Game.Socle

    # Platform ss

    constructor: (@gm, @init) ->
        @_fle_          = 'Socle'

        @init_bg()
        @draw_sky()
        @draw_circle()
        @set_bg_color(4)
        @write_text()


    #.----------.----------
    # build socle
    #.----------.----------

    draw_sky :  ->
        @sky = @gm.add.sprite(0, @init.sky.y0, 'sky')
        #@gm.world.sendToBack(@sky)
        #@sky.fixedToCamera = true
        #@sky.tint =0x080808

    init_bg : ->
        @bg_color = @gm.add.sprite(0, @init.sky.y0, 'bg0')
        @bg_color.width = @init.sky.w
        @bg_color.height = @init.sky.h

    set_bg_color: (color) -> # color is an integer, 8 colors from 0 to 7
        @bg_color.loadTexture @gm.bg_colors[color], 0, false

    draw_circle : ->
        @circle = @gm.add.sprite(@init.circle.x0, @init.circle.y0, 'circle')
        @circle.anchor.setTo 0.5, 0.5
        @win_effect()

    write_text : ->
        style =  { font: "bold 30px Arial", fill: "#fff", align: "center"  }
        @text  = @gm.add.text @gm.world.centerX, @init.association.y0, "Association", style
        @text.setShadow 3, 3, 'rgba(0,0,0,0.5)', 2
        @text.anchor.setTo 0.5, 0.5




    #.----------.----------
    # give remaining ms to end of the game timer
    #.----------.----------
    remaining_ms : ->  gameOptions.duration * 1000 - @gm.time._timers[0].events[0].timer.ms

    #.----------.----------
    # effects
    #.----------.----------

    win_effect: ->
        @circle.scale.setTo 1.3, 1.3
        twn = @gm.add.tween(@circle.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Bounce.Out, true)

    error_effect: -> # move circle horizontaly
        cx = @circle.x
        @circle.tint = 0xff0000
        twn = @gm.add.tween(@circle).to( {  x: [cx + 20, cx - 20, cx + 20, cx]}, 333, Phaser.Easing.Bounce.Out, true)

        twn.onComplete.add(
            -> @circle.tint = 0xffffff
            this
        )







