// Definindo a cena de boas-vindas usando a biblioteca Phaser
class Cena1 extends Phaser.Scene {

    // Construtor da cena
    constructor() {
        super({
            key: 'Cena1',
            backgroundColor: '#008000', // Configuração da cor de fundo da cena
        });
    }

    // Pré-carregamento de recursos
    preload() {
        this.load.image("nfl", "assets/nfl.jpg"); 
        this.load.image("play", "assets/play_bt.png");
    }

    // Função chamada quando a cena é criada
    create() {    
        var mensagem;

        this.add.image(400,300, 'nfl');
        this.add.image(400,300, 'play').setScale(0.1); 
        mensagem = this.add.text(140, 50, 'Bem-vind@ ao jogo!', { fontSize: '50px', fill: '#495613',  stroke: '#FFFFFF',  strokeThickness: 6});
        this.add.text(140, 100, 'Clique pra começar!', { fontSize: '50px', fill: '#495613',  stroke: '#FFFFFF',  strokeThickness: 6});
        this.add.text(140, 140, 'Use setas do teclado para se movimentar!', { fontSize: '25px', fill: '#495613'});

    

        //Adiciona os cursores
        this.cursors = this.input.keyboard.createCursorKeys();
        this.pointer = this.input.activePointer;
    
        
    }

    update() {
        if (this.pointer.isDown){
            this.scene.start('Cena2', this.game);
        }
}
}