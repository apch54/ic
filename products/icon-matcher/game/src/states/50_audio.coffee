#  fc
# on 2017-01-21

#
#      '  _ ,  '     .- .-.. .-..  .- .-. .  ..-. --- --- .-..
#     -  (o)o)  -
#    -ooO'(_)--Ooo-


class  Phacker.Game.A_sound    #extends Phacker.Game.sound

    constructor : (game, name) ->
        @gm   = game
        @name = name

        @snd  = @gm.add.audio @name
        @snd.allowMultiple = true
        @add_markers()
        return


    add_markers: ()->
        snds = ['win','loose','wosh','over' ] # list the whole sound in file

        for x in snds
            #console.log "In sound add cls", x
            switch x
                when 'win'     then @snd.addMarker x,       0.05, 0.45    #
                when 'loose'   then @snd.addMarker x,       1,    0.27    #
                when 'wosh'    then @snd.addMarker x,       1.5,  0.3     #
                when 'over'    then @snd.addMarker x,       2,    4.2     #

    play: (key) -> @snd.play  key
