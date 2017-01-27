#
#  fc 2017-01-20          _\\\\|||||//// _          __''''  '''' __
#                        |  ___________  |        | |___________  |
#                        | |           | |        | |           | |
#    Hi all team         | |   -   O   | |        | |   0   0   | |
#                        | |     -     | |        | |     -     | |
#                        | |     U     | |        | |   \___/   | |
#                        | |__      __ | |        | |___________| |
#                        |_____|\_/|_____|        |_______________|
#                          _|__|/ \|_|_.............._|________|_
#                         / ********** \            / ********** \
#                       /  ************  \        /  ************  \
#                      --------------------      --------------------
#

class @YourGame extends Phacker.GameState

#----------.--------------------.----------
    update: ->
#----------.--------------------.----------
        super() #Required
        @_fle_ = ' Jeu create'

        #.----------.----------
        # game mouvments
        @center.mouse_drag() # center is center the icon

        if @iconsO.move(@center) is 'loose' # icons touching center
            @lostLife()
            if  ge.heart.length < 1
                @socleO.error_effect()
                @cd.play 'over'
                @iconsO.stop()

            else
                @cd.play 'loose'
                @socleO.error_effect()

            @iconsO.new_game()


        #.----------.----------
        # win or loose
        # result of overlaping
        res = @center.overlap @iconsO.radius
        if  res is 'win'
            @win()
            @socleO.win_effect()
            @cd.play 'win'
            @iconsO.new_game()

        else if res is 'loose'
            @lostLife()
            if  ge.heart.length < 1
                @socleO.error_effect()
                @cd.play 'over'
                @iconsO.stop()

            else
                @cd.play 'loose'
                @socleO.error_effect()

            @iconsO.new_game()

        #----------.----------
        # end duration ?
        if @socleO.remaining_ms() < 15
            @cd.play 'over'
            @iconsO.stop()


#.----------.--------------------.----------
    resetPlayer: ->
#.----------.--------------------.----------
        console.log "Reset the player"

#----------.--------------------.----------
    create: ->
#----------.--------------------.----------
        super() #Required
        @game.physics.startSystem(Phaser.Physics.ARCADE)

        #.----------.----------
        # manage socle
        @socleO = new Phacker.Game.Socle @game, @game.init #obj

        #.----------.----------
        # manage  all icons
        @iconsO = new Phacker.Game.Icons @game, @game.init, @socleO
        @icos = @iconsO.icos
        @center = @icos[0] # center ico

        #.----------.----------
        # audio
        @cd = new Phacker.Game.A_sound @game, 'ico_audio'
        @cd.play 'win'
