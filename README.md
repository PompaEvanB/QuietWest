A simple adventure game by [Evan Pompa]{https://github.com/PompaEvanB} based on a simple adventure game engine by [Adam Smith](https://github.com/rndmcnlly).

Code requirements:
- **4+ scenes based on `AdventureScene`**: Home, Road, Hills, Farm
- **2+ scenes *not* based on `AdventureScene`**: Outro, Intro
- **2+ methods or other enhancement added to the adventure game engine to simplify my scenes**:
    - Enhancement 1: Updated the "showMessage" function to dynamically cahnge the length of time text is show based on text length. This allows text to be easily read without fading away.
    - Enhancement 2: created a different base time for text messages compare to other duration effects. this allows for cameras, inventory elements, and hud elements to transition at a different rate than messages.

Experience requirements:
- **4+ locations in the game world**: Home, Road, Hills, Farm
- **2+ interactive objects in most scenes**: The Mailbox in "Home" scene and the Rocks in the "Hills" Scene. 
- **Many objects have `pointerover` messages**: All of the houses in the "Home" scene.
- **Many objects have `pointerdown` effects**: Most of the rocks in the "Hills" scene.
- **Some objects are themselves animated**: The rocks in the "Hills" scene and the mailbox in the "Home" scene.

Asset sources:
All of the assets in the game are euther microsoft emoji assets which are free to or made in engine. 

Code sources:
- `adventure.js` and `index.html` were created for this project [Adam Smith](https://github.com/rndmcnlly) and edited by me.
- `game.js` was sketched by [Adam Smith](https://github.com/rndmcnlly) and rewritten by me.