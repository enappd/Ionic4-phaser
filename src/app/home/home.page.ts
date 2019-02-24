import { Component } from '@angular/core';
declare var Phaser;

var that;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  game;
  back;
  mummy;
  anim;
  loopText;
  constructor() {
    this.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'phaser-example', { preload: this.preload, create: this.create, update: this.update });
    that = this;
  }

  preload() {
    this.game.load.image('lazur', 'assets/thorn_lazur.png');
    this.game.load.spritesheet('mummy', 'assets/metalslug_mummy37x45.png', 37, 45, 18);
  }

  create() {

    this.back = this.game.add.image(0, -400, 'lazur');
    this.back.scale.set(2);
    this.back.smoothed = false;

    this.mummy = this.game.add.sprite(100, 360, 'mummy', 5);
    this.mummy.scale.set(4);
    this.mummy.smoothed = false;
    this.anim = this.mummy.animations.add('walk');

    this.anim.onStart.add(that.animationStarted, this);
    this.anim.onLoop.add(that.animationLooped, this);
    this.anim.onComplete.add(that.animationStopped, this);
    this.anim.play(10, true);

  }

  animationStarted() {
    this.game.add.text(32, 32, 'Animation started', { fill: 'white' });
  }

  animationLooped() {
    if (this.anim.loopCount === 1) {
      this.loopText = this.game.add.text(32, 64, 'Animation looped', { fill: 'white' });
    }
    else {
      this.loopText.text = 'Animation looped x2';
      this.anim.loop = false;
    }

  }

  animationStopped() {
    this.game.add.text(32, 64 + 32, 'Animation stopped', { fill: 'white' });
  }

  update() {
    if (this.anim.isPlaying) { this.back.x -= 1;}
  }

}






