class Outro extends Phaser.Scene {
    constructor() {
        super('Outro');
    }
    create() {
        this.add.text(50, 50, "FIN").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('Intro'));

        this.cameras.main.setBackgroundColor("#000000");
        let ground = this.add.rectangle(0,1080,3920,300,0x520D52);
        let moon = this.add.ellipse(900,300,300,300,0xffffff);

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
            if(this.hasItem("💤")){
                this.gotoScene("Outro");
            }
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
            if(this.hasItem("roseQuartz")&&this.hasItem("quartz")){
                this.showMessage("Wow, two kinds of quartz! heres some food for the animals as a reward");
                this.gainItem("animal food");
                this.gainItem("Animal Food");
                this.loseItem("roseQuartz");
                this.loseItem("quartz");
            }
            else if(!this.hasItem("roseQuartz")&&this.hasItem("quartz")){
                this.showMessage("oooh some quartz. heres a reward, feed this to the farm animals.");
                this.gainItem("animal food");
                this.loseItem("quartz");
            }
            else if(this.hasItem("roseQuartz")&&!this.hasItem("quartz")){
                this.showMessage("How did you find this before normal quartz?! Oh well, heres some farm animal food.");
                this.gainItem("Animal Food");
                this.loseItem("roseQuartz");
            }
        })

        let car = this.add.text(this.w * 0.45, this.w * 0.3, "🚗");
        car.setFontSize(this.s * 4);
        car.setInteractive();
        car.on('pointerover', () => this.showMessage("This is your car. Your dad got it for you! You can use this car to travel."));
        car.on('pointerdown', () => {
            car.setFontSize(this.s * 5);
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

        let flipped = false;
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

            if(flipped == false){
                mailbox.text = "📪"
                flipped = true;
            }
            else{
                mailbox.text = "📫";
                flipped = false;
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
    onEnter(){
        this.cameras.main.setBackgroundColor("#ff9933");

        let road = this.add.text(this.w * 0.1, this.w * 0.26, "⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛");
        road.setFontSize(this.s * 3);

        let neighborhood = this.add.text(this.w * 0.1, this.w * 0.01, "🏠🏠🏠🏠🏠🏠🏠🏠");
        neighborhood.setFontSize(this.s * 5);

        let neighborhood2 = this.add.text(this.w * 0.1, this.w * 0.5, "🏠🏠🏠🏠🏠🏠🏠🏠");
        neighborhood2.setFontSize(this.s * 5);

        let house = this.add.text(this.w * 0.65, this.w * 0.5, "🏡");
        house.setInteractive();
        house.setFontSize(this.s * 5);
        house.on('pointerover', () => this.showMessage("Click this icon to go back home"));
        house.on('pointerdown', () => {
            this.gotoScene("Home");
        });

        let car = this.add.text(this.w * 0.35, this.w * 0.25, "🚗");
        car.setFontSize(this.s * 4);
        car.setInteractive();
        car.on('pointerover', () => this.showMessage("Travel to where you want to go by cliking on it! Do you want to go to the hills or the farm?"));

        // let weed = this.add.text(this.w * 0.35, this.w * 0.25, "🟤");

        let hills = this.add.text(this.w * 0.01, this.w * 0.22, "🗻");
        hills.setFontSize(this.s * 7);
        hills.setInteractive();
        hills.on('pointerover', () => this.showMessage("Click this icon to go to the hills"));
        hills.on('pointerdown', () => {
            this.gotoScene("Hills");
        });

        let farm = this.add.text(this.w * 0.65, this.w * 0.22, "🧑‍🌾");
        farm.setFontSize(this.s * 7);
        farm.setInteractive();
        farm.on('pointerover', () => this.showMessage("Click this icon to go to the farm!"));
        farm.on('pointerdown', () => {
            this.gotoScene("Farm");
        });
    }
}

class Hills extends AdventureScene{
    constructor(){
        super("Hills");
    }
    onEnter(){
        this.cameras.main.setBackgroundColor("#ff9933");

        let car = this.add.text(this.w * 0.7, this.w * 0.25, "🚗");
        car.setFontSize(this.s * 4);
        car.setInteractive();
        car.on('pointerover', () => this.showMessage("Click on me to go back to the road!"));
        car.on('pointerdown', () => {
            this.gotoScene("Road");
        });

        let rock = this.add.text(this.w * 0.05, this.w * 0.22, "🪨"); 
        rock.setFontSize(this.s * 2.5);
        rock.setInteractive();
        rock.on('pointerover', () => this.showMessage("This rock looks promising..."));
        rock.on('pointerdown', () => {
            this.showMessage("Dang, nothing here..");
        });

        let rock2 = this.add.text(this.w * 0.2, this.w * 0.5, "🪨"); 
        rock2.setFontSize(this.s * 3);
        rock2.setInteractive();
        rock2.on('pointerover', () => this.showMessage("This one looks good!"));
        rock2.on('pointerdown', () => {
            if(this.hasItem("quartz")){
                this.showMessage("You dont need any quartz right now");
            }
            else{
                this.showMessage("You got some quartz!");
                this.gainItem("quartz");
            }
        });

        let checked = false;
        let rock3 = this.add.text(this.w * 0.4, this.w * 0.1, "🪨"); 
        rock3.setFontSize(this.s * 2);
        rock3.setInteractive();
        rock3.on('pointerover', () => this.showMessage("This rock looks a little small..."));
        rock3.on('pointerdown', () => {
            if(checked == false){
                this.showMessage("OMG you found GOLD!....but oops you dropped it and lost it :(");
                checked = true;
            }
            else{
                this.showMessage("No matter how hard you look, that gold is gone.");
            }
        });

        let rock4 = this.add.text(this.w * 0.5, this.w * 0.45, "🪨"); 
        rock4.setFontSize(this.s * 5);
        rock4.setInteractive();
        rock4.on('pointerover', () => this.showMessage("This rock is WAY too big."));

        let rock5 = this.add.text(this.w * 0.3, this.w * 0.3, "🪨"); 
        rock5.setFontSize(this.s * 3);
        rock5.setInteractive();
        rock5.on('pointerover', () => this.showMessage("I think I can see some quartz under the dirt!!"));
        rock5.on('pointerdown', () => {
            if(!this.hasItem("roseQuartz")){
                this.showMessage("WOW you found some ROSE QUARTZ");
                this.gainItem("roseQuartz");
            }
            else{
                this.showMessage("You dont need any more quartz right now");
            }
        });

        let snake = this.add.text(this.w * 0.1, this.w * 0.05, "🐍");
        snake.setFontSize(this.s*2.5);
        snake.setInteractive();
        snake.on("pointerover", () => this.showMessage("Lets NOT get too close to this little guy"));
        //maybe make player die if they click the snake??
    }
}

class Farm extends AdventureScene{
    constructor(){
        super("Farm");
    }
    onEnter(){
        this.cameras.main.setBackgroundColor("#348C31");

        let car = this.add.text(this.w * 0.4, this.w * 0.5, "🚗");
        car.setFontSize(this.s*2.5);
        car.setInteractive();
        car.on('pointerover', () => this.showMessage("Click on me to go back to the road!"));
        car.on('pointerdown', () => {
            this.gotoScene("Road");
        });

        let horse = this.add.text(this.w * 0.2, this.w * 0.22, "🐎"); 
        horse.setFontSize(this.s*2.5);
        horse.setInteractive();
        horse.on("pointerover", () => this.showMessage("He seems hungry..."));
        horse.on("pointerdown", () => {
            if(this.hasItem("animal food") || this.hasItem("Animal Food")){
                this.showMessage("The horse seems very happy! Its time to go home...");
                this.gainItem("💤");
                if(this.hasItem("animal food")){
                    this.loseItem("animal food");
                }
                else{
                    this.loseItem("Animal Food");
                }
            }
            else{
                this.showMessage("You dont have any animal food...");
            }
        });


        let horse2 = this.add.text(this.w * 0.3, this.w * 0.3, "🦙"); 
        horse2.setFontSize(this.s*2.5);
        horse2.setInteractive();
        horse2.on('pointerover', () => this.showMessage("this llama seems full"));

        let horse3 = this.add.text(this.w * 0.4, this.w * 0.1, "🦙"); 
        horse3.setFontSize(this.s*2.5);
        horse3.setInteractive();
        horse3.on('pointerover', () => this.showMessage("this llama is too far away"));

        let horse4 = this.add.text(this.w * 0.5, this.w * 0.2, "🦙"); 
        horse4.setFontSize(this.s*2.5);
        horse4.setInteractive();
        horse4.on('pointerover', () => this.showMessage("this llama is too tired to eat"));

        let gate = this.add.text(this.w * 0.004, this.w * 0.35, "🥅🥅🥅🥅🥅🥅🥅🥅🥅🥅🥅🥅🥅🥅🥅🥅🥅🥅"); 
        gate.setFontSize(this.s*3);
        gate.setInteractive();
    }
}

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Intro, Home, Road, Hills, Farm, Outro],
    title: "Quiet West",
});

