(function() {
  Phacker.Game.Socle = (function() {
    function Socle(gm, init) {
      this.gm = gm;
      this.init = init;
      this._fle_ = 'Socle';
      this.init_bg();
      this.draw_sky();
      this.draw_circle();
      this.set_bg_color(4);
      this.write_text();
    }

    Socle.prototype.draw_sky = function() {
      return this.sky = this.gm.add.sprite(0, this.init.sky.y0, 'sky');
    };

    Socle.prototype.init_bg = function() {
      this.bg_color = this.gm.add.sprite(0, this.init.sky.y0, 'bg0');
      this.bg_color.width = this.init.sky.w;
      return this.bg_color.height = this.init.sky.h;
    };

    Socle.prototype.set_bg_color = function(color) {
      return this.bg_color.loadTexture(this.gm.bg_colors[color], 0, false);
    };

    Socle.prototype.draw_circle = function() {
      this.circle = this.gm.add.sprite(this.init.circle.x0, this.init.circle.y0, 'circle');
      this.circle.anchor.setTo(0.5, 0.5);
      return this.win_effect();
    };

    Socle.prototype.write_text = function() {
      var style;
      style = {
        font: "bold 30px Arial",
        fill: "#fff",
        align: "center"
      };
      this.text = this.gm.add.text(this.gm.world.centerX, this.init.association.y0, "Association", style);
      this.text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
      return this.text.anchor.setTo(0.5, 0.5);
    };

    Socle.prototype.remaining_ms = function() {
      return gameOptions.duration * 1000 - this.gm.time._timers[0].events[0].timer.ms;
    };

    Socle.prototype.win_effect = function() {
      var twn;
      this.circle.scale.setTo(1.3, 1.3);
      return twn = this.gm.add.tween(this.circle.scale).to({
        x: 1,
        y: 1
      }, 1000, Phaser.Easing.Bounce.Out, true);
    };

    Socle.prototype.error_effect = function() {
      var cx, twn;
      cx = this.circle.x;
      this.circle.tint = 0xff0000;
      twn = this.gm.add.tween(this.circle).to({
        x: [cx + 20, cx - 20, cx + 20, cx]
      }, 333, Phaser.Easing.Bounce.Out, true);
      return twn.onComplete.add(function() {
        return this.circle.tint = 0xffffff;
      }, this);
    };

    return Socle;

  })();

}).call(this);

(function() {
  var indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Phacker.Game.One_icon = (function() {
    function One_icon(gm, prm, init, icos) {
      this.gm = gm;
      this.prm = prm;
      this.init = init;
      this.icos = icos;
      this._fle_ = ' One icon';
      this.mouse = {
        down: false
      };
      this.bgs = this.gm.ico_bgs;
      this.shapes = this.gm.ico_shapes;
      this.make_trail();
      this.bg = this.gm.add.sprite(this.prm.x, this.prm.y, this.bgs[this.prm.ico_bg]);
      this.bg.anchor.setTo(0.5, 0.5);
      this.shape = this.gm.add.sprite(this.prm.x, this.prm.y, this.shapes[this.prm.ico_shape]);
      this.shape.anchor.setTo(0.5, 0.5);
      if (this.prm.location === 'center') {
        this.mouse_init();
      }
      this.has_overlaped = false;
    }

    One_icon.prototype.reset = function(param) {
      this.prm = param;
      this.has_overlaped = true;
      this.bg.loadTexture(this.bgs[this.prm.ico_bg], 0, false);
      this.shape.loadTexture(this.shapes[this.prm.ico_shape]);
      this.mouse.down = false;
      this.shape.x = this.bg.x = this.prm.x;
      return this.shape.y = this.bg.y = this.prm.y;
    };

    One_icon.prototype.mouse_drag = function() {
      var dx, dy, i, idx;
      if (this.mouse.down) {
        for (idx = i = 1; i <= 4; idx = ++i) {
          dx = this.icos[idx].bg.x - this.gm.input.x;
          dy = this.icos[idx].bg.y - this.gm.input.y;
          if ((dx * dx + dy * dy) < 841) {
            this.mouse.down = false;
            this.twnb = this.gm.add.tween(this.bg).to({
              x: this.gm.input.x,
              y: this.gm.input.y
            }, 333, Phaser.Easing.Quadratic.In, true);
            this.twns = this.gm.add.tween(this.shape).to({
              x: this.gm.input.x,
              y: this.gm.input.y
            }, 333, Phaser.Easing.Quadratic.In, true);
            this.move_trail(idx);
            return;
          }
        }
      }
    };

    One_icon.prototype.overlap = function(radius) {
      var boundsA, i, ico, ind;
      boundsA = this.bg.getBounds();
      for (ind = i = 1; i <= 4; ind = ++i) {
        ico = this.icos[ind];
        if (Phaser.Rectangle.intersects(boundsA, ico.bg.getBounds()) && !this.has_overlaped) {
          this.has_overlaped = true;
          this.twnb.stop();
          this.twns.stop();
          this.twnt.stop();
          if (this.prm.col_or_shape === 'color') {
            if (this.prm.ico_bg === ico.prm.ico_bg) {
              radius.speed += radius.dspeed;
              return 'win';
            } else {
              return 'loose';
            }
          } else {
            if (this.prm.ico_shape === ico.prm.ico_shape) {
              radius.speed += radius.dspeed;
              return 'win';
            } else {
              return 'loose';
            }
          }
        }
      }
      return "no overlaping";
    };

    One_icon.prototype.mouse_init = function() {
      this.gm.input.onDown.add(function() {
        return this.gm.time.events.add(10, function() {
          return this.mouse.down = true;
        }, this);
      }, this);
      return this.gm.input.onUp.add(function() {
        return this.mouse.down = false;
      }, this);
    };

    One_icon.prototype.move = function(rad) {
      switch (this.prm.location) {
        case 'north':
          this.bg.y = this.prm.y + rad;
          return this.shape.y = this.bg.y;
        case 'est':
          this.bg.x = this.prm.x - rad;
          return this.shape.x = this.bg.x;
        case 'south':
          this.bg.y = this.prm.y - rad;
          return this.shape.y = this.bg.y;
        case 'west':
          this.bg.x = this.prm.x + rad;
          return this.shape.x = this.bg.x;
      }
    };

    One_icon.prototype.make_trail = function() {
      if (this.prm.location !== 'center') {
        return;
      }
      this.bmd = this.gm.add.bitmapData(54, 50);
      this.make_gradient();
      this.bmd.context.fillStyle = this.grd;
      this.bmd.context.fillRect(0, 0, this.gm.width, this.gm.height);
      this.trail = this.gm.add.sprite(this.prm.x, this.prm.y, this.bmd);
      this.trail.anchor.setTo(0.5, 0);
      return this.trail.alpha = 0;
    };

    One_icon.prototype.move_trail = function(idx) {
      var ref;
      this.trail.x = this.prm.x;
      this.trail.y = this.prm.y;
      this.trail.alpha = (ref = this.prm.ico_bg, indexOf.call([0, 1, 2], ref) >= 0) ? 0.4 : .9;
      switch (this.icos[idx].prm.location) {
        case 'south':
          this.trail.angle = 180;
          break;
        case 'west':
          this.trail.angle = -90;
          break;
        case 'north':
          this.trail.angle = 0;
          break;
        case 'est':
          this.trail.angle = 90;
      }
      return this.twnt = this.gm.add.tween(this.trail).to({
        x: this.gm.input.x,
        y: this.gm.input.y
      }, 333, Phaser.Easing.Quadratic.In, true);
    };

    One_icon.prototype.make_gradient = function() {
      this.grd = this.bmd.context.createLinearGradient(0, 0, 0, 50);
      switch (this.prm.ico_bg) {
        case 0:
          this.grd.addColorStop(0, "#0099ff");
          return this.grd.addColorStop(1, "white");
        case 1:
          this.grd.addColorStop(0, "#009900");
          return this.grd.addColorStop(1, "white");
        case 2:
          this.grd.addColorStop(0, "#ff0000");
          return this.grd.addColorStop(1, "white");
        case 3:
          this.grd.addColorStop(0, "#fae70f");
          return this.grd.addColorStop(1, "white");
      }
    };

    return One_icon;

  })();

}).call(this);

(function() {
  Phacker.Game.Icons = (function() {
    function Icons(gm, init, socleO) {
      this.gm = gm;
      this.init = init;
      this.socleO = socleO;
      this._fle_ = 'Icons';
      this.icos = [];
      this.rules = {};
      this.radius = {
        long: 0,
        speed: gameOptions.speed,
        dspeed: 0.009
      };
      this.set_icos();
    }

    Icons.prototype.def_rules = function() {
      var a1, a2, i, ico_color_array, ico_shape_array, j, k, s1, s2;
      this.rules.col_or_shape = this.gm.rnd.integerInRange(0, 1) === 0 ? 'color' : 'shape';
      if (this.rules.col_or_shape === 'color') {
        this.socleO.set_bg_color(this.gm.rnd.integerInRange(1, 7));
        this.socleO.text.setText(gameOptions.match_color_text);
        a1 = [this.gm.rnd.integerInRange(0, 3)];
        a2 = this.shuffled_array(4);
        ico_color_array = a1.concat(a2);
        ico_shape_array = [];
        for (i = j = 0; j <= 4; i = ++j) {
          ico_shape_array.push(this.gm.rnd.integerInRange(0, 17));
        }
        this.rules.ico_color_array = ico_color_array;
        return this.rules.ico_shape_array = ico_shape_array;
      } else {
        this.socleO.set_bg_color(0);
        this.socleO.text.setText(gameOptions.match_shape_text);
        s1 = this.shuffled_array(18).slice(0, 5);
        s1[0] = s1[this.gm.rnd.integerInRange(1, 3)];
        s2 = [];
        for (i = k = 0; k <= 4; i = ++k) {
          s2[i] = this.gm.rnd.integerInRange(0, 3);
        }
        this.rules.ico_color_array = s2;
        return this.rules.ico_shape_array = s1;
      }
    };

    Icons.prototype.make_one_icon = function(param) {
      var ico;
      ico = new Phacker.Game.One_icon(this.gm, param, this.init, this.icos);
      return this.icos.push(ico);
    };

    Icons.prototype.init_location = function(loc) {
      var x, y;
      switch (loc) {
        case 'center':
          x = this.gm.world.centerX;
          y = this.gm.world.centerY + 50;
          break;
        case 'north':
          x = this.gm.world.centerX;
          y = this.gm.world.centerY + 50 - this.init.circle.offset;
          break;
        case 'est':
          x = this.gm.world.centerX + this.init.circle.offset;
          y = this.gm.world.centerY + 50;
          break;
        case 'south':
          x = this.gm.world.centerX;
          y = this.gm.world.centerY + 50 + this.init.circle.offset;
          break;
        case 'west':
          x = this.gm.world.centerX - this.init.circle.offset;
          y = this.gm.world.centerY + 50;
      }
      return {
        x0: x,
        y0: y
      };
    };

    Icons.prototype.shuffled_array = function(nb) {
      var arr, i, j, k, n, ref, ref1, ref2, rnd_n;
      arr = [];
      for (i = j = 0, ref = nb - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
        arr.push(i);
      }
      for (n = k = ref1 = arr.length - 1; ref1 <= 1 ? k <= 1 : k >= 1; n = ref1 <= 1 ? ++k : --k) {
        rnd_n = Math.floor(Math.random() * (n + 1));
        ref2 = [arr[rnd_n], arr[n]], arr[n] = ref2[0], arr[rnd_n] = ref2[1];
      }
      return arr;
    };

    Icons.prototype.set_icos = function() {
      var prm0, prm1, prm2, prm3, prm4, xy0, xy1, xy2, xy3, xy4;
      this.def_rules();
      xy0 = this.init_location('center');
      prm0 = {
        ico_bg: this.rules.ico_color_array[0],
        ico_shape: this.rules.ico_shape_array[0],
        x: xy0.x0,
        y: xy0.y0,
        location: 'center',
        col_or_shape: this.rules.col_or_shape
      };
      this.make_one_icon(prm0);
      xy1 = this.init_location('north');
      prm1 = {
        ico_bg: this.rules.ico_color_array[1],
        ico_shape: this.rules.ico_shape_array[1],
        x: xy1.x0,
        y: xy1.y0,
        location: 'north',
        col_or_shape: this.rules.col_or_shape
      };
      this.make_one_icon(prm1);
      xy2 = this.init_location('est');
      prm2 = {
        ico_bg: this.rules.ico_color_array[2],
        ico_shape: this.rules.ico_shape_array[2],
        x: xy2.x0,
        y: xy2.y0,
        location: 'est',
        col_or_shape: this.rules.col_or_shape
      };
      this.make_one_icon(prm2);
      xy3 = this.init_location('south');
      prm3 = {
        ico_bg: this.rules.ico_color_array[3],
        ico_shape: this.rules.ico_shape_array[3],
        x: xy3.x0,
        y: xy3.y0,
        location: 'south',
        col_or_shape: this.rules.col_or_shape
      };
      this.make_one_icon(prm3);
      xy4 = this.init_location('west');
      prm4 = {
        ico_bg: this.rules.ico_color_array[4],
        ico_shape: this.rules.ico_shape_array[4],
        x: xy4.x0,
        y: xy4.y0,
        location: 'west',
        col_or_shape: this.rules.col_or_shape
      };
      return this.make_one_icon(prm4);
    };

    Icons.prototype.reset_icos = function() {
      var prm0, prm1, prm2, prm3, prm4, xy0, xy1, xy2, xy3, xy4;
      this.def_rules();
      xy0 = this.init_location('center');
      prm0 = {
        ico_bg: this.rules.ico_color_array[0],
        ico_shape: this.rules.ico_shape_array[0],
        x: xy0.x0,
        y: xy0.y0,
        location: 'center',
        col_or_shape: this.rules.col_or_shape
      };
      this.icos[0].reset(prm0);
      xy1 = this.init_location('north');
      prm1 = {
        ico_bg: this.rules.ico_color_array[1],
        ico_shape: this.rules.ico_shape_array[1],
        x: xy1.x0,
        y: xy1.y0,
        location: 'north',
        col_or_shape: this.rules.col_or_shape
      };
      this.icos[1].reset(prm1);
      xy2 = this.init_location('est');
      prm2 = {
        ico_bg: this.rules.ico_color_array[2],
        ico_shape: this.rules.ico_shape_array[2],
        x: xy2.x0,
        y: xy2.y0,
        location: 'est',
        col_or_shape: this.rules.col_or_shape
      };
      this.icos[2].reset(prm2);
      xy3 = this.init_location('south');
      prm3 = {
        ico_bg: this.rules.ico_color_array[3],
        ico_shape: this.rules.ico_shape_array[3],
        x: xy3.x0,
        y: xy3.y0,
        location: 'south',
        col_or_shape: this.rules.col_or_shape
      };
      this.icos[3].reset(prm3);
      xy4 = this.init_location('west');
      prm4 = {
        ico_bg: this.rules.ico_color_array[4],
        ico_shape: this.rules.ico_shape_array[4],
        x: xy4.x0,
        y: xy4.y0,
        location: 'west',
        col_or_shape: this.rules.col_or_shape
      };
      return this.icos[4].reset(prm4);
    };

    Icons.prototype.move = function(center) {
      var i, j;
      if (center.has_overlaped) {
        return 'overlaped yet ';
      }
      this.radius.long += this.radius.speed;
      if (this.radius.long > 52) {
        center.has_overlaped = true;
        return 'loose';
      }
      for (i = j = 1; j <= 4; i = ++j) {
        this.icos[i].move(this.radius.long);
      }
      return 'done';
    };

    Icons.prototype.stop = function() {
      this.radius.long = 0;
      return this.radius.speed = 0;
    };

    Icons.prototype.new_game = function() {
      var ico, j, len, ref, results;
      ref = this.icos;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        ico = ref[j];
        this.rules = {};
        this.reset_icos();
        this.radius.long = 0;
        this.icos[0].has_overlaped = false;
        this.icos[0].bg.alpha = 1;
        this.icos[0].trail.alpha = 0;
        this.icos[0].trail.destroy();
        results.push(this.icos[0].make_trail());
      }
      return results;
    };

    return Icons;

  })();

}).call(this);

(function() {


}).call(this);

(function() {
  Phacker.Game.A_sound = (function() {
    function A_sound(game, name) {
      this.gm = game;
      this.name = name;
      this.snd = this.gm.add.audio(this.name);
      this.snd.allowMultiple = true;
      this.add_markers();
      return;
    }

    A_sound.prototype.add_markers = function() {
      var i, len, results, snds, x;
      snds = ['win', 'loose', 'wosh', 'over'];
      results = [];
      for (i = 0, len = snds.length; i < len; i++) {
        x = snds[i];
        switch (x) {
          case 'win':
            results.push(this.snd.addMarker(x, 0.05, 0.45));
            break;
          case 'loose':
            results.push(this.snd.addMarker(x, 1, 0.27));
            break;
          case 'wosh':
            results.push(this.snd.addMarker(x, 1.5, 0.3));
            break;
          case 'over':
            results.push(this.snd.addMarker(x, 2, 4.2));
            break;
          default:
            results.push(void 0);
        }
      }
      return results;
    };

    A_sound.prototype.play = function(key) {
      return this.snd.play(key);
    };

    return A_sound;

  })();

}).call(this);

(function() {
  Phacker.Game.A_sound = (function() {
    function A_sound(game, name) {
      this.gm = game;
      this.name = name;
      this.snd = this.gm.add.audio(this.name);
      this.snd.allowMultiple = true;
      this.add_markers();
      return;
    }

    A_sound.prototype.add_markers = function() {
      var i, len, results, snds, x;
      snds = ['win', 'loose', 'wosh', 'over'];
      results = [];
      for (i = 0, len = snds.length; i < len; i++) {
        x = snds[i];
        switch (x) {
          case 'win':
            results.push(this.snd.addMarker(x, 0.05, 0.45));
            break;
          case 'loose':
            results.push(this.snd.addMarker(x, 1, 0.27));
            break;
          case 'wosh':
            results.push(this.snd.addMarker(x, 1.5, 0.3));
            break;
          case 'over':
            results.push(this.snd.addMarker(x, 2, 4.2));
            break;
          default:
            results.push(void 0);
        }
      }
      return results;
    };

    A_sound.prototype.play = function(key) {
      return this.snd.play(key);
    };

    return A_sound;

  })();

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.YourGame = (function(superClass) {
    extend(YourGame, superClass);

    function YourGame() {
      return YourGame.__super__.constructor.apply(this, arguments);
    }

    YourGame.prototype.update = function() {
      var res;
      YourGame.__super__.update.call(this);
      this._fle_ = ' Jeu create';
      this.center.mouse_drag();
      if (this.iconsO.move(this.center) === 'loose') {
        this.lostLife();
        if (ge.heart.length < 1) {
          this.socleO.error_effect();
          this.cd.play('over');
          this.iconsO.stop();
        } else {
          this.cd.play('loose');
          this.socleO.error_effect();
        }
        this.iconsO.new_game();
      }
      res = this.center.overlap(this.iconsO.radius);
      if (res === 'win') {
        this.win();
        this.socleO.win_effect();
        this.cd.play('win');
        this.iconsO.new_game();
      } else if (res === 'loose') {
        this.lostLife();
        if (ge.heart.length < 1) {
          this.socleO.error_effect();
          this.cd.play('over');
          this.iconsO.stop();
        } else {
          this.cd.play('loose');
          this.socleO.error_effect();
        }
        this.iconsO.new_game();
      }
      if (this.socleO.remaining_ms() < 15) {
        this.cd.play('over');
        return this.iconsO.stop();
      }
    };

    YourGame.prototype.resetPlayer = function() {
      return console.log("Reset the player");
    };

    YourGame.prototype.create = function() {
      YourGame.__super__.create.call(this);
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.socleO = new Phacker.Game.Socle(this.game, this.game.init);
      this.iconsO = new Phacker.Game.Icons(this.game, this.game.init, this.socleO);
      this.icos = this.iconsO.icos;
      this.center = this.icos[0];
      this.cd = new Phacker.Game.A_sound(this.game, 'ico_audio');
      return this.cd.play('win');
    };

    return YourGame;

  })(Phacker.GameState);

}).call(this);

(function() {
  var game;

  game = new Phacker.Game();

  game.setGameState(YourGame);

  game.setSpecificAssets(function() {
    var aud, dsk, ld, mob;
    this._fle_ = 'specific asset';
    dsk = root_design + "desktop/desktop_gameplay/";
    mob = root_design + "mobile/mobile_gameplay/";
    aud = root_game + 'audio/';
    ld = this.game.load;
    if (gameOptions.fullscreen) {
      ld.image('sky', mob + 'bg_gameplay.png');
    } else {
      ld.image('sky', dsk + 'bg_gameplay.png');
    }
    ld.image('circle', dsk + 'big_circle.png');
    ld.image('ico_shape0', dsk + 'icon/icon1.png');
    ld.image('ico_shape1', dsk + 'icon/icon2.png');
    ld.image('ico_shape2', dsk + 'icon/icon3.png');
    ld.image('ico_shape3', dsk + 'icon/icon4.png');
    ld.image('ico_shape4', dsk + 'icon/icon5.png');
    ld.image('ico_shape5', dsk + 'icon/icon6.png');
    ld.image('ico_shape6', dsk + 'icon/icon7.png');
    ld.image('ico_shape7', dsk + 'icon/icon8.png');
    ld.image('ico_shape8', dsk + 'icon/icon9.png');
    ld.image('ico_shape9', dsk + 'icon/icon10.png');
    ld.image('ico_shape10', dsk + 'icon/icon11.png');
    ld.image('ico_shape11', dsk + 'icon/icon12.png');
    ld.image('ico_shape12', dsk + 'icon/icon13.png');
    ld.image('ico_shape13', dsk + 'icon/icon14.png');
    ld.image('ico_shape14', dsk + 'icon/icon15.png');
    ld.image('ico_shape15', dsk + 'icon/icon16.png');
    ld.image('ico_shape16', dsk + 'icon/icon17.png');
    ld.image('ico_shape17', dsk + 'icon/icon18.png');
    this.game.ico_shapes = ['ico_shape0', 'ico_shape1', 'ico_shape2', 'ico_shape3', 'ico_shape4', 'ico_shape5', 'ico_shape6', 'ico_shape7', 'ico_shape8', 'ico_shape9', 'ico_shape10', 'ico_shape11', 'ico_shape12', 'ico_shape13', 'ico_shape14', 'ico_shape15', 'ico_shape16', 'ico_shape17'];
    ld.image('ico_bg0', dsk + 'bg_icon_color/icon_blue.png');
    ld.image('ico_bg1', dsk + 'bg_icon_color/icon_green.png');
    ld.image('ico_bg2', dsk + 'bg_icon_color/icon_red.png');
    ld.image('ico_bg3', dsk + 'bg_icon_color/icon_yellow.png');
    this.game.ico_bgs = ['ico_bg0', 'ico_bg1', 'ico_bg2', 'ico_bg3'];
    ld.image('bg0', dsk + 'bg_color/bg1.png');
    ld.image('bg1', dsk + 'bg_color/bg2.png');
    ld.image('bg2', dsk + 'bg_color/bg3.png');
    ld.image('bg3', dsk + 'bg_color/bg4.png');
    ld.image('bg4', dsk + 'bg_color/bg5.png');
    ld.image('bg5', dsk + 'bg_color/bg6.png');
    ld.image('bg6', dsk + 'bg_color/bg7.png');
    ld.image('bg7', dsk + 'bg_color/bg8.png');
    this.game.bg_colors = ['bg0', 'bg1', 'bg2', 'bg3', 'bg4', 'bg5', 'bg6', 'bg7'];
    ld.audio('ico_audio', [aud + 'ico.mp3', aud + 'ico.ogg']);
    this.game.init = {
      sky: {
        x0: 0,
        y0: 48,
        w: gameOptions.fullscreen ? 375 : 768,
        h: gameOptions.fullscreen ? 559 - 48 : 500 - 48
      }
    };
    this.game.init.circle = {
      w: 289,
      h: 289,
      x0: this.game.init.sky.w / 2,
      y0: this.game.init.sky.h / 2 + 74,
      offset: 110
    };
    this.game.init.association = {
      nb: 0,
      y0: gameOptions.fullscreen ? 120 : 100
    };
    game.setTextColorGameOverState('white');
    game.setTextColorWinState('red');
    game.setTextColorStatus('orange');
    game.setOneTwoThreeColor('darkblue');
    game.setLoaderColor(0xffffff);
    game.setTimerColor(0xffff00);
    return game.setTimerBgColor(0xff0000);
  });

  this.pauseGame = function() {
    return game.game.paused = true;
  };

  this.replayGame = function() {
    return game.game.paused = false;
  };

  this.GCSRelaunch = function() {
    return game.GCSRelaunch();
  };

  this.GCSNotElig = function() {
    return game.GCSNotElig();
  };

  game.run();

}).call(this);
