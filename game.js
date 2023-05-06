class Demo1 extends AdventureScene {
    constructor() {
        super("demo1", "First Room");
    }

    onEnter() {

        let clip = this.add.text(this.w * 0.3, this.w * 0.3, "📎 paperclip")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage("Metal, bent."))
            .on('pointerdown', () => {
                this.showMessage("No touching!");
                this.tweens.add({
                    targets: clip,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            });

        let key = this.add.text(this.w * 0.5, this.w * 0.1, "🔑 key")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It's a nice key.")
            })
            .on('pointerdown', () => {
                this.showMessage("You pick up the key.");
                this.gainItem('key');
                this.tweens.add({
                    targets: key,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => key.destroy()
                });
            })

        let door = this.add.text(this.w * 0.1, this.w * 0.15, "🚪 locked door")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("key")) {
                    this.showMessage("You've got the key for this door.");
                } else {
                    this.showMessage("It's locked. Can you find a key?");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("key")) {
                    this.loseItem("key");
                    this.showMessage("*squeak*");
                    door.setText("🚪 unlocked door");
                    this.gotoScene('demo2');
                }
            })

    }
}

class Demo2 extends AdventureScene {
    constructor() {
        super("demo2", "The second room has a long name (it truly does).");
    }
    onEnter() {
        this.add.text(this.w * 0.3, this.w * 0.4, "just go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("You've got no other choice, really.");
            })
            .on('pointerdown', () => {
                this.gotoScene('demo1');
            });

        let finish = this.add.text(this.w * 0.6, this.w * 0.2, '(finish the game)')
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('*giggles*');
                this.tweens.add({
                    targets: finish,
                    x: this.s + (this.h - 2 * this.s) * Math.random(),
                    y: this.s + (this.h - 2 * this.s) * Math.random(),
                    ease: 'Sine.inOut',
                    duration: 500
                });
            })
            .on('pointerdown', () => this.gotoScene('outro'));
    }
}

/*
class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        this.add.text(50,50, "Adventure awaits!").setFontSize(50);
        this.add.text(50,100, "Click anywhere to begin.").setFontSize(20);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('demo1'));
        });
    }
}
*/

class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    create() {
        this.add.text(50, 50, "That's all!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}

class Intro extends Phaser.Scene {
    constructor() {
        super('Intro')
    }
    create() {
        let title = this.add.text(700,50, "Quiet West", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'}).setFontSize(100);
        let instructions = this.add.text(800,250, "Click anywhere to wake up.").setFontSize(20);
        this.cameras.main.setBackgroundColor("#0099ff");
        let ground = this.add.rectangle(0,1080,3920,300,0xff9933);
        this.input.on('pointerdown', () => {

            this.tweens.add({
                targets: title,
                alpha: 0,
                delay: 500,
                duration: 2000,
            });
            this.tweens.add({
                targets: instructions,
                alpha: 0,
                duration: 2000,
            });
            this.tweens.add({
                targets: ground,
                alpha: 0,
                delay: 1500,
                duration: 2000,
            });

            this.time.delayedCall(3200, () => this.cameras.main.fade(1000, 0,0,0));
            this.time.delayedCall(4200, () => this.scene.start('Home'));
        });
    }
}

class Home extends AdventureScene{
    constructor(){
        super("Home");
    }
    onEnter() {
        this.cameras.main.setBackgroundColor("#ff9933");
        //.on('pointerover', () => this.showMessage(""))

        let house = this.add.text(this.w * 0.5, this.w * 0.3, "🏡");
        house.setFontSize(this.s * 5);
        house.setInteractive();
        house.on('pointerover', () => {
            if(!this.hasItem("mail")&&!this.hasItem("key")){
                this.showMessage("This is your home! Before you go inside, your mom wants you to get the mail first.");
            }
            else{
                this.showMessage("This is your home! Your mom is inside!");
            }
        })
        house.on('pointerdown', () => {
            if(this.hasItem("mail")&&!this.hasItem("key")){
                this.showMessage("'Thank you sugarbear' your mom says. Can you get me some quartz from the hills? She gives you your car keys.");
                this.loseItem("mail");
                this.gainItem("key");
            }
            else if(!this.hasItem("mail")&&!this.hasItem("key")){
                this.showMessage("'Did you get the mail yet?' your mom asks.");
            }
            else if(!this.hasItem("quartz")&&this.hasItem("key")){
                this.showMessage("'Can you go drive up to the hills and get me some quartz rocks?' your mom asks.");
            }
            //CREATE A SCENARIO FOR GIVING MOM ROCKS, SHE GIVES FOOD FOR ANIMALS.
        })

        let car = this.add.text(this.w * 0.45, this.w * 0.3, "🚗");
        car.setFontSize(this.s * 4);
        car.setInteractive();
        car.on('pointerover', () => this.showMessage("This is your car. Your dad got it for you! You can use this car to travel."));
        car.on('pointerdown', () => {
            if(!this.hasItem("key") && !this.hasItem("mail")){
                this.showMessage("Go to the mail box and get the mail first!");
            }
            else if (!this.hasItem("key") && this.hasItem("mail")){
                this.showMessage("Go give your mom the mail!Shes in the house.");
            }
            else{
                this.gotoScene("Road");
            }
        })

        let mailbox = this.add.text(this.w * 0.4, this.w * 0.2, "📫");
        mailbox.setFontSize(this.s * 4);
        mailbox.setInteractive();
        mailbox.on('pointerover', () => {
            if(!this.hasItem("mail")&&!this.hasItem("key")){
                this.showMessage("Your mail is in here! click on the box to get your mail.");
            }
            else if(this.hasItem("mail")&&!this.hasItem("key")){
                this.showMessage("You should give the mail to your mom");
            }
            else{
                this.showMessage("Come back tommorow to check for more!");
            }
        })
        mailbox.on('pointerdown', () => {
            if(!this.hasItem("mail")&&!this.hasItem("key")){
                this.gainItem("mail");
                this.showMessage("You got the mail! and mom got some coupons.");
            }
            else if(this.hasItem("mail")&&!this.hasItem("key")){
                this.showMessage("Don't put the mail back in the box!");
            }
            else{
                this.showMessage("You don't even have mail to put in here >:(");
            }
        })

        let house2 = this.add.text(this.w * 0.1, this.w * 0.3, "🏠");
        house2.setFontSize(this.s * 5);
        house2.setInteractive();
        house2.on('pointerover', () => this.showMessage("This is your neighbors house, her name is Sandra. She's one of your best friends. Shes on a walk right now."));

        let house3 = this.add.text(this.w * 0.1, this.w * 0.2, "🏠");
        house3.setFontSize(this.s * 5);
        house3.setInteractive();
        house3.on('pointerover', () => this.showMessage("This is your good friend Miguels house. You were fighting with lightsabers yesterday, but it got windy and now he wont come outside :("));

        let house4 = this.add.text(this.w * 0.3, this.w * 0.05, "🏠");
        house4.setFontSize(this.s * 5);
        house4.setInteractive();
        house4.on('pointerover', () => this.showMessage("Julia lives here, she is one of your first friends. She can't hang out today, Shes helping her mom keep bees!"));

        let house5 = this.add.text(this.w * 0.6, this.w * 0.05, "🏘️");
        house5.setFontSize(this.s * 5);
        house5.setInteractive();
        house5.on('pointerover', () => this.showMessage("The rest of the neighborhood and town is this way. But you need a car to go farther than this."));

        let plant = this.add.text(this.w * 0.01, this.w * 0.45, "🌵    🌵    🌵  🌵🌵 🌵   🌵");
        plant.setFontSize(this.s * 4);
        plant.setInteractive();
        plant.on('pointerover', () => this.showMessage("Some cacti grow far south. Don't get poked!"));

        let plant2 = this.add.text(this.w * 0.01, this.w * 0.5, "🌵 🌵     🌵 🌵  🌵🌵    🌵");
        plant2.setFontSize(this.s * 4);
        plant2.setInteractive();
        plant2.on('pointerover', () => this.showMessage("Believe it or not. Theres even MORE cacti. It's almost like theyre native here."));
    }
}

class Road extends AdventureScene{
    constructor(){
        super("Road");
    }
}

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    //scene: [Intro, Demo1, Demo2, Outro],
    //scene: [Intro, Home],
    scene: [Home,Road],
    title: "Quiet West",
});

