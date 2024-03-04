// Definindo a cena principal do jogo usando a biblioteca Phaser
class Cena2 extends Phaser.Scene {
    // Construtor da cena
    constructor() {
        super({
            key: 'Cena2',
            // Configurações específicas da cena podem ser adicionadas aqui
            physics: {
                default: 'arcade',
                arcade: {
                    debug: true,
                    gravity: { y: 0 }
                }
            }
        });
    }

    init() {
        this.player = {
            width: 39.5,
            height: 50,
            obj: null
        };

        this.zagueiro = {
            width: 39.5,
            height: 50,
            obj: null,
            ida: true
        };

        this.pontuacao = 0;
        this.placar = null;
    }


    preload() {
       
        this.load.image("gramado", "assets/fundo.png");
       
        this.load.spritesheet('jogador', 'assets/jogador.png', { frameWidth: this.player.width, frameHeight: this.player.height });
        this.load.spritesheet('zagueiro', 'assets/zagueiro.png', { frameWidth: this.zagueiro.width, frameHeight: this.zagueiro.height });
    }

    create() {


        this.add.image(400, 300, 'gramado');
        this.cursors = this.input.keyboard.createCursorKeys();
        this.pointer = this.input.activePointer;

        this.player.obj = this.physics.add.sprite(300, 300, 'jogador').setScale(1.0).setOrigin(0.5, 0.5);
        this.anims.create({
            key: 'correr',
            frames: this.anims.generateFrameNumbers('jogador', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        }
        )
        
        this.anims.create({
            key: 'andar',
            frames: this.anims.generateFrameNumbers('zagueiro', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });;
        this.player.obj.anims.play('correr', true);

        this.zagueiro.obj = this.physics.add.sprite(750, Phaser.Math.Between(100, 500), 'zagueiro').setScale(1.0).setOrigin(0.5, 0.5);
        this.zagueiro.obj.ida = false;

        this.zagueiro.obj.anims.play('andar', true); 
        this.placar = this.add.text(100, 10, 'Blitz:' + this.pontuacao, { fontSize: '50px', fill: '#495613' });

       
    }

    update() {
        
        if (this.cursors.left.isDown) {
            this.player.obj.setX(this.player.obj.x - 5);
        } else if (this.cursors.right.isDown) {
            this.player.obj.setX(this.player.obj.x + 5);
        } else if (this.cursors.up.isDown || this.cursors.space.isDown || this.pointer.isDown) {
            this.player.obj.setY(this.player.obj.y - 5);
        } else if (this.cursors.down.isDown) {
            this.player.obj.setY(this.player.obj.y + 5);
        }

        if (this.zagueiro.obj.x === 100) {
            this.zagueiro.obj.setFlip(false, false);
            this.zagueiro.obj.ida = true; }

        if (this.zagueiro.obj.x < 750 && this.zagueiro.obj.ida === true) {
            this.zagueiro.obj.x += 5; }

        if (this.zagueiro.obj.x === 750) {
            this.zagueiro.obj.setFlip(true, false);
            this.zagueiro.obj.ida = false;
        }

        if (this.zagueiro.obj.x > 100 && this.zagueiro.obj.ida === false) {
            this.zagueiro.obj.x -= 5;
        }

        if (this.physics.overlap(this.player.obj, this.zagueiro.obj)) {
        
            this.pontuacao += 1;
            this.placar.setText('Blitz:' + this.pontuacao);

            this.zagueiro.obj.x = 750;
            this.zagueiro.obj.y = Phaser.Math.Between(100, 500);
        }
    }
}
