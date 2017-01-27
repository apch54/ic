#Register Game
game = new Phacker.Game()

game.setGameState YourGame

game.setSpecificAssets ->
    @_fle_ = 'specific asset'

    dsk = root_design + "desktop/desktop_gameplay/"
    mob = root_design + "mobile/mobile_gameplay/"
    aud = root_game   + 'audio/'

    ld= @game.load

    #.----------.----------
    # sky & circle
    #.----------.----------
    if gameOptions.fullscreen # small width
        ld.image  'sky', mob + 'bg_gameplay.png'
    else # large width
        ld.image  'sky', dsk + 'bg_gameplay.png'

    ld.image  'circle', dsk + 'big_circle.png'

    #.----------.----------
    # icon shapes
    #.----------.----------
    ld.image  'ico_shape0',        dsk + 'icon/icon1.png'  # movie maker
    ld.image  'ico_shape1',        dsk + 'icon/icon2.png'  # cam
    ld.image  'ico_shape2',        dsk + 'icon/icon3.png'  # tape
    ld.image  'ico_shape3',        dsk + 'icon/icon4.png'  # plan
    ld.image  'ico_shape4',        dsk + 'icon/icon5.png'  # ? letter
    ld.image  'ico_shape5',        dsk + 'icon/icon6.png'  # crab
    ld.image  'ico_shape6',        dsk + 'icon/icon7.png'  # gelly fish
    ld.image  'ico_shape7',        dsk + 'icon/icon8.png'  # gelly fish2
    ld.image  'ico_shape8',        dsk + 'icon/icon9.png'  # fish
    ld.image  'ico_shape9',        dsk + 'icon/icon10.png' # sea star
    ld.image  'ico_shape10',       dsk + 'icon/icon11.png' # orange part
    ld.image  'ico_shape11',       dsk + 'icon/icon12.png' # whell
    ld.image  'ico_shape12',       dsk + 'icon/icon13.png' # buoy
    ld.image  'ico_shape13',       dsk + 'icon/icon14.png' # flower
    ld.image  'ico_shape14',       dsk + 'icon/icon15.png' # bulb1
    ld.image  'ico_shape15',       dsk + 'icon/icon16.png' # bulb2
    ld.image  'ico_shape16',       dsk + 'icon/icon17.png' # bulb3
    ld.image  'ico_shape17',       dsk + 'icon/icon18.png' # plug

    @game.ico_shapes = [
        'ico_shape0', 'ico_shape1', 'ico_shape2'
        'ico_shape3', 'ico_shape4', 'ico_shape5'
        'ico_shape6', 'ico_shape7', 'ico_shape8'
        'ico_shape9', 'ico_shape10','ico_shape11'
        'ico_shape12','ico_shape13','ico_shape14'
        'ico_shape15','ico_shape16','ico_shape17'
    ]

    #.----------.----------
    # icon colors or BACKGROUND (bg stands for background)
    #.----------.----------
    ld.image  'ico_bg0',        dsk + 'bg_icon_color/icon_blue.png'
    ld.image  'ico_bg1',        dsk + 'bg_icon_color/icon_green.png'
    ld.image  'ico_bg2',        dsk + 'bg_icon_color/icon_red.png'
    ld.image  'ico_bg3',        dsk + 'bg_icon_color/icon_yellow.png'

    @game.ico_bgs = ['ico_bg0', 'ico_bg1','ico_bg2','ico_bg3' ]


    #.----------.----------
    # background color
    #.----------.----------
    ld.image  'bg0',        dsk + 'bg_color/bg1.png' # grey
    ld.image  'bg1',        dsk + 'bg_color/bg2.png' # blue
    ld.image  'bg2',        dsk + 'bg_color/bg3.png' # green
    ld.image  'bg3',        dsk + 'bg_color/bg4.png' # orange
    ld.image  'bg4',        dsk + 'bg_color/bg5.png' # sky_blue
    ld.image  'bg5',        dsk + 'bg_color/bg6.png' # pale orange
    ld.image  'bg6',        dsk + 'bg_color/bg7.png' # purpul
    ld.image  'bg7',        dsk + 'bg_color/bg8.png' # navy

    @game.bg_colors = ['bg0','bg1','bg2','bg3','bg4','bg5','bg6','bg7']

    ld.audio 'ico_audio',       [ aud + 'ico.mp3', aud + 'ico.ogg' ]

    #.----------.----------
    #consts
    #.----------.----------
    @game.init =
        sky :
            x0  : 0
            y0  : 48 # background
            w   : if gameOptions.fullscreen  then 375 else 768
            h   : if gameOptions.fullscreen  then 559 - 48 else 500 - 48

    @game.init.circle =
            w : 289
            h : 289
            x0 : @game.init.sky.w / 2 #(@game.init.sky.w - 289) / 2
            y0 : @game.init.sky.h / 2  + 74 #(@game.init.sky.h - 289 + 48) / 2
            offset : 110

    @game.init.association =
        nb: 0 # not used
        y0: if gameOptions.fullscreen then 120 else 100 #text location
    #.----------.----------
    # @game.load.spritesheet 'character', root_game+'images/character.png', 50, 50,2
    # @game.load.image 'element', root_game+'images/Intro_background.png'
    # @game.load.audio 'skidding', root_game+'audio/skidding.mp3'

    game.setTextColorGameOverState 'white'
    game.setTextColorWinState 'red'
    game.setTextColorStatus 'orange'
    game.setOneTwoThreeColor 'darkblue'

    game.setLoaderColor 0xffffff
    game.setTimerColor 0xffff00
    game.setTimerBgColor 0xff0000


@pauseGame = ->
    game.game.paused = true

@replayGame = ->
    game.game.paused = false

@GCSRelaunch = ->
    game.GCSRelaunch()

@GCSNotElig = ->
    game.GCSNotElig()

game.run();
