# fc on 2017-01-17


class Phacker.Game.One_icon # create on group icon

    constructor: (@gm, @prm, @init, @icos) -># prm stands for parameters of icon
        @_fle_ = ' One icon'
        @mouse = {down: false}


        @bgs = @gm.ico_bgs # all ico background in boot; notice s
        @shapes = @gm.ico_shapes # all ico shapes in boot

        @make_trail()
        #@trail.alpha = 0

        # background & shape of that ico
        @bg = @gm.add.sprite @prm.x, @prm.y, @bgs[@prm.ico_bg] # create token color
        @bg.anchor.setTo 0.5, 0.5
        @shape = @gm.add.sprite @prm.x, @prm.y, @shapes[@prm.ico_shape]
        @shape.anchor.setTo 0.5, 0.5

        if @prm.location is 'center' then @mouse_init()

        @has_overlaped = false

    #.----------.----------
    # reset icon after lost or win
    #.----------.----------
    reset:(param) ->
        @prm = param
        @has_overlaped = true
        @bg.loadTexture @bgs[@prm.ico_bg], 0,false
        @shape.loadTexture @shapes[@prm.ico_shape]

        @mouse.down = false
        @shape.x = @bg.x = @prm.x
        @shape.y = @bg.y = @prm.y

    #.----------.----------
    # center (only center icos[0] ) stick to mouse
    #.----------.----------
    mouse_drag:()->

        if  @mouse.down
            for idx  in  [1..4] # click in ico, but not 0 one ?
                dx = @icos[idx].bg.x  - @gm.input.x  # ico.x _ mouse.x
                dy = @icos[idx].bg.y  - @gm.input.y

                # yes clicked on an ico
                if (dx * dx + dy * dy) < 841 # 29*29
                    @mouse.down = false
                    #@bg.alpha =0.2

                    # move to clicked ico
                    @twnb = @gm.add.tween(@bg).to( {  x: @gm.input.x,  y: @gm.input.y },333, Phaser.Easing.Quadratic.In, true)
                    @twns = @gm.add.tween(@shape).to( {  x: @gm.input.x,  y: @gm.input.y },333, Phaser.Easing.Quadratic.In, true)
                    @move_trail idx #idx is the icon number
                    return

    #.----------.----------
    # overlaping
    # method avalable on center ico : 'ico[0]', only
    #.----------.----------
    overlap: ( radius) -># works only for center

        #console.log "- #{@_fle_} : ",radius
        boundsA = @bg.getBounds()
        for ind in [1..4] # not  i=0 for it's center
            ico = @icos[ind]

            if Phaser.Rectangle.intersects(boundsA, ico.bg.getBounds()) and not @has_overlaped

                @has_overlaped = true ; @twnb.stop() ; @twns.stop() ; @twnt.stop()
                # color mode
                if @prm.col_or_shape is 'color'
                    if @prm.ico_bg is ico.prm.ico_bg
                        radius.speed += radius.dspeed
                        return'win'
                    else return 'loose'

                # shape mode
                else
                    if @prm.ico_shape is ico.prm.ico_shape
                        radius.speed += radius.dspeed
                        return 'win'
                    else return'loose'

        "no overlaping"

    #.----------.----------
    # mouse init & pointer follow mouse
    #.----------.----------
    mouse_init:->
        @gm.input.onDown.add( # mouse down so move pointer to mouse
            ()->
                #@mouse.x = @gm.input.x
                #@mouse.y = @gm.input.y
                @gm.time.events.add( #mouse is down : save it
                    # some ms not to interfer with apples during mowing
                    10
                    ()-> @mouse.down = true
                    @
                )
            @
        )

        @gm.input.onUp.add(
            ()-> @mouse.down = false
            @
        )
    #.----------.----------
    # move side arround 4 icons
    #.----------.----------
    move: (rad) ->
        switch @prm.location

            when 'north'
                @bg.y = @prm.y + rad
                @shape.y = @bg.y

            when 'est'
                @bg.x = @prm.x - rad
                @shape.x = @bg.x

            when 'south'
                @bg.y = @prm.y - rad
                @shape.y = @bg.y

            when 'west'
                @bg.x = @prm.x + rad
                @shape.x = @bg.x

    #.----------.----------
    # make icon trail  for moving effect
    #.----------.----------
    make_trail:()->
        if @prm.location isnt 'center' then return #only for 'center ico

        @bmd = @gm.add.bitmapData( 54, 50)
        @make_gradient()
        @bmd.context.fillStyle = @grd
        @bmd.context.fillRect( 0, 0,@gm.width, @gm.height)

        @trail = @gm.add.sprite(@prm.x , @prm.y , @bmd)
        @trail.anchor.setTo(0.5, 0)
        @trail.alpha = 0

    #.----------.----------
    # move trail
    #.----------.----------
    move_trail:(idx) -> # idx : ico's number to move to

        #console.log "- #{@_fle_} : ",@icos[idx].prm
        #init trail location
        @trail.x = @prm.x
        @trail.y = @prm.y
        @trail.alpha = if @prm.ico_bg  in [0..2] then 0.4 else .9 # yellow  is 3

        #trail rotation depends on moving direction
        switch @icos[idx].prm.location
             when 'south'   then @trail.angle  = 180
             when 'west'    then @trail.angle  = -90
             when 'north'   then @trail.angle  = 0
             when 'est'     then @trail.angle  = 90

        #move
        @twnt = @gm.add.tween(@trail).to( {  x: @gm.input.x,  y: @gm.input.y },333, Phaser.Easing.Quadratic.In, true)

    #.----------.----------
    # make_gradient color for trail depends on @bg color
    #.----------.----------
    make_gradient: ->

        @grd = @bmd.context.createLinearGradient(0,0,0,50)

        switch @prm.ico_bg # trail color set to ico's color
            when 0 then @grd.addColorStop(0,"#0099ff"); @grd.addColorStop(1,"white") #@trail.tint = 0x0099ff
            when 1 then @grd.addColorStop(0,"#009900"); @grd.addColorStop(1,"white") #@trail.tint = 0x0099ff
            when 2 then @grd.addColorStop(0,"#ff0000"); @grd.addColorStop(1,"white") #@trail.tint = 0x0099ff
            when 3 then @grd.addColorStop(0,"#fae70f"); @grd.addColorStop(1,"white") #@trail.tint = 0x0099ff
