# fc 2016-01-17

class Phacker.Game.Icons
    constructor :(@gm, @init, @socleO) ->
        @_fle_ = 'Icons'

        @icos = []
        @rules = {}
        # radius for outside icons
        @radius = {long: 0, speed: gameOptions.speed, dspeed: 0.009}

        @set_icos()
        #@def_rules()

    #.----------.----------
    # define game rules
    #.----------.----------
    def_rules:()-> # 2 main mode : color or shape

        @rules.col_or_shape = if @gm.rnd.integerInRange(0, 1) is 0 then 'color' else 'shape'
        #@rules.col_or_shape = ' not color'

        if @rules.col_or_shape is 'color' # match color
            @socleO.set_bg_color @gm.rnd.integerInRange(1,7) # set back ground
            @socleO.text.setText gameOptions.match_color_text

            a1 = [@gm.rnd.integerInRange(0, 3)] # center ico color
            a2 = @shuffled_array(4) # the other colors
            ico_color_array = a1.concat a2

            ico_shape_array = []
            for i in [0..4] then   ico_shape_array.push(@gm.rnd.integerInRange(0, 17))

            @rules.ico_color_array = ico_color_array
            @rules.ico_shape_array = ico_shape_array
            #console.log "- #{@_fle_} : ",@rules

        else # rule isnt color maching but shape matching
            @socleO.set_bg_color 0 # set back ground grey
            @socleO.text.setText gameOptions.match_shape_text

            # set ico shape
            s1 =  @shuffled_array(18)[0..4] # shapes shuffled
            s1[0] = s1[@gm.rnd.integerInRange(1,3)] #set center with same shape of one arround

            # set ico color
            s2 =[]
            for i in [0..4] then  s2[i] = @gm.rnd.integerInRange(0, 3)

            @rules.ico_color_array = s2
            @rules.ico_shape_array = s1

            #console.log "- #{@_fle_} : ",@rules


    #.----------.----------
    #  create icon
    #.----------.----------
    make_one_icon:(param) ->
        ico = new Phacker.Game.One_icon @gm, param, @init, @icos
        @icos.push ico

    #.----------.----------
    # define iinitial icon location
    #.----------.----------
    init_location:(loc)->
        switch loc
            when 'center'
                x = @gm.world.centerX
                y = @gm.world.centerY + 50
            when 'north'
                x = @gm.world.centerX
                y = @gm.world.centerY + 50 - @init.circle.offset
            when 'est'
                x = @gm.world.centerX + @init.circle.offset
                y = @gm.world.centerY + 50
            when 'south'
                x = @gm.world.centerX
                y = @gm.world.centerY + 50 + @init.circle.offset
            when 'west'
                x = @gm.world.centerX - @init.circle.offset
                y = @gm.world.centerY + 50

        {x0:x, y0:y}

    #.----------.----------
    # tool
    # create and shuffle array of intergers
    # nb : elements number of array
    #.----------.----------
    shuffled_array : (nb) ->
        arr = []
        for i in [0..nb-1] then arr.push i

        for n in [arr.length-1..1]
            # Choose random element `rnd_n` to the front of `n` to swap with.
            rnd_n = Math.floor Math.random() * (n + 1)
            # Swap `randomn` with `n`, using destructured assignment
            [arr[n], arr[rnd_n]] = [arr[rnd_n], arr[n]]

        arr

    #.----------.----------
    # initialize the five icons
    #.----------.----------
    set_icos:()->
        @def_rules() # result in @rules

        xy0 = @init_location('center')
        prm0 = {ico_bg: @rules.ico_color_array[0] , ico_shape: @rules.ico_shape_array[0], x: xy0.x0, y: xy0.y0, location: 'center', col_or_shape: @rules.col_or_shape }
        @make_one_icon(prm0)

        xy1 = @init_location('north')
        prm1 = {ico_bg: @rules.ico_color_array[1] , ico_shape: @rules.ico_shape_array[1], x: xy1.x0, y: xy1.y0, location: 'north', col_or_shape: @rules.col_or_shape}
        @make_one_icon(prm1)

        xy2 = @init_location('est')
        prm2 = {ico_bg: @rules.ico_color_array[2] , ico_shape: @rules.ico_shape_array[2], x: xy2.x0, y: xy2.y0, location: 'est' , col_or_shape: @rules.col_or_shape}
        @make_one_icon(prm2)

        xy3 = @init_location('south')
        prm3 = {ico_bg: @rules.ico_color_array[3] , ico_shape: @rules.ico_shape_array[3], x: xy3.x0, y: xy3.y0, location: 'south', col_or_shape: @rules.col_or_shape}
        @make_one_icon(prm3)

        xy4 = @init_location('west')
        prm4 = {ico_bg: @rules.ico_color_array[4] , ico_shape: @rules.ico_shape_array[4], x: xy4.x0, y: xy4.y0, location: 'west', col_or_shape: @rules.col_or_shape}
        @make_one_icon(prm4)


    #.----------.----------
    # reset all icons : 5
    #.----------.----------
    reset_icos:()->
        @def_rules() # result in @rules

        xy0 = @init_location('center')
        prm0 = {ico_bg: @rules.ico_color_array[0] , ico_shape: @rules.ico_shape_array[0], x: xy0.x0, y: xy0.y0, location: 'center', col_or_shape: @rules.col_or_shape }
        @icos[0].reset prm0

        xy1 = @init_location('north')
        prm1 = {ico_bg: @rules.ico_color_array[1] , ico_shape: @rules.ico_shape_array[1], x: xy1.x0, y: xy1.y0, location: 'north', col_or_shape: @rules.col_or_shape}
        @icos[1].reset prm1

        xy2 = @init_location('est')
        prm2 = {ico_bg: @rules.ico_color_array[2] , ico_shape: @rules.ico_shape_array[2], x: xy2.x0, y: xy2.y0, location: 'est' , col_or_shape: @rules.col_or_shape}
        @icos[2].reset prm2

        xy3 = @init_location('south')
        prm3 = {ico_bg: @rules.ico_color_array[3] , ico_shape: @rules.ico_shape_array[3], x: xy3.x0, y: xy3.y0, location: 'south', col_or_shape: @rules.col_or_shape}
        @icos[3].reset prm3

        xy4 = @init_location('west')
        prm4 = {ico_bg: @rules.ico_color_array[4] , ico_shape: @rules.ico_shape_array[4], x: xy4.x0, y: xy4.y0, location: 'west', col_or_shape: @rules.col_or_shape}
        @icos[4].reset prm4


    #.----------.----------
    # rmove the 4 over side icons or stop if overlaping
    #.----------.----------
    move:(center) ->
        # return if overlaped yet
        if  center.has_overlaped then return 'overlaped yet '

        # prepare moving icos to center
        @radius.long += @radius.speed
        if @radius.long > 52
            center.has_overlaped = true
            return 'loose'

        # move icos to center
        for i in [1..4]  # not 0 one or center icon
            @icos[i].move @radius.long

        return 'done'

    stop: -> # stop moving icos when overlaping
        @radius.long  = 0
        @radius.speed = 0


    #.----------.----------
    # reset icos for a new game
    #.----------.----------
    new_game: ->
        for ico in @icos
            @rules = {}
            @reset_icos()
            @radius.long = 0 # reset radius as large as possible
            @icos[0].has_overlaped = false # for scoring again
            @icos[0].bg.alpha = 1 # center
            @icos[0].trail.alpha = 0 # center
            @icos[0].trail.destroy()
            @icos[0].make_trail()
            #console.log "- #{@_fle_} : ", @icos





