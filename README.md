# CLUMSY ROBOT BATTLE
### Table of Contents
* [Origin Story #1](https://git.generalassemb.ly/jeff-chan-sf-sei-05/clumsy-robot-battle/blob/master/README.md#origin-story)
* [User Stories & Wireframes](https://git.generalassemb.ly/jeff-chan-sf-sei-05/clumsy-robot-battle/blob/master/README.md#user-stories--wireframes)
* [Technologies Used](https://git.generalassemb.ly/jeff-chan-sf-sei-05/clumsy-robot-battle/blob/master/README.md#technologies-used)
* [Approach Taken](https://git.generalassemb.ly/jeff-chan-sf-sei-05/clumsy-robot-battle/blob/master/README.md#approach-taken)
* [Technologies Used](https://git.generalassemb.ly/jeff-chan-sf-sei-05/clumsy-robot-battle/blob/master/README.md#technologies-used)
* [Unsolved Problems](https://git.generalassemb.ly/jeff-chan-sf-sei-05/clumsy-robot-battle/blob/master/README.md#unsolved-problems)
* [Final Remarks](https://git.generalassemb.ly/jeff-chan-sf-sei-05/clumsy-robot-battle/blob/master/README.md#final-remarks)
* [Credits](https://git.generalassemb.ly/jeff-chan-sf-sei-05/clumsy-robot-battle/blob/master/README.md#credits)


## Origin Story 
I always liked big robots. I was initially thinking robots VS kaiju, like Pacific Rim. But, I decided to keep it simple.

I wanted to have some RNG for 1) an attack connecting or missing, 2) which part the attack would actually hit. I figured there'd be alot of missing involved, hence Clumsy.


## User Stories & Wireframes
https://docs.google.com/presentation/d/1-SzW_CiTEAqnKzruCabs6DX70CvK4yl6vg_Nx1pVhCc/edit#slide=id.p

## Technologies Used
* JavaScript
  * jQuery
* CSS
  * Grid
  * animate.css
* HTML

## Approach Taken

### Day 1 - Tuesday
After I got the boilerplate up, I worked on the JavaScript portion before I did any visuals.

I went with a OOP here since both robots had alot in common. First I created a class for both Robots, then I created a Class for each Part. 

After this, I created the game object for all the different variables and methods for the game functionality. I knew there would be at least 3 layers of RNG here and multiple parts involved so I console.log'd everything. 

Getting everything working up til 1 round took me a whole day.

### Day 2 - Wednesday

It took another half day to debug and get the game to end correctly.

After I got the game working in the console. I spent about a half day creating the HTML structure, making colored boxes to represent the different game elements, and roughly positioning the game elements with flex.

### Day 3 - Thursday

Now, I layered in all of the jQuery selectors and event listeners. Next, I wanted specific elements to be shown or hidden through the different phases of the game.

I also got the game working via a webpage with click events instead of just the console. I had to add stop points to the game in order to update the game status (wait for next button to be pressed, an end turn button).

I also started adding methods to populate the hit points and also to remove disabled parts.

### Day 4 - Friday

Lots of touch up and fun stuff on this day. I was able to get a damaged part to flash red. The battle log was implemented. I added a Game Over and Start screen. 

I learned about animate.css from Linh in class and started adding different animations everywhere.

I also started to collect images so that I could get an actual robot to show up instead of just colored boxes.

### Day 5 - Saturday

Finalized images and had to do re position a few things after I got the robot up. I fixed a few bugs re: animation and added a somewhat working "MISSED ATTACK" message.

Shake screen effect for attack success.

The "MISSED ATTACK" improved.

### Day 6 - Sunday

Added background music.

## Unsolved Problems

At the start screen, the main div for the game appears below as an empty div.

If you click fast on the elements you can interact with, you can break the game. I was going to use pointer-events: none to handle this.

A restart game button.

No sound.

Better animations.

Projecticle effect for the gun.

Arm swing for the sword.


## Final Remarks

Keeping track of the opponent's left & right VS your own left & right was an unexpected challenge.

"This" is amazing.

console.log + console errors are my best friend.

Like run on sentences, avoiding large function that did multiple things was helpful.

Similar to above, having a div that only does one thing is helpful too. For example - a div for the title, a div for the image, a div for paragraph etc.

Same in CSS, for example I had right-hand as a class,  I shouldve just made it right and hand

I just found out autoplay music is disabled - https://developers.google.com/web/updates/2017/09/autoplay-policy-changes - for my game start music, you have to click the h2 to start.

## Credits

### Images
https://www.pixilart.com/art/robot-leg-4978d5246da1c3c
https://www.hiclipart.com/free-transparent-background-png-clipart-mkfnh
https://www.pngguru.com/free-transparent-background-png-clipart-bpdrd/download
https://myrealdomain.com/?_act=service@image/download/pack&file=pixel-art-gun.png&id=517095&prfx=
https://www.nicepng.com/ourpic/u2q8r5w7w7t4t4t4_image-pic-pixel-gun-pixel-laser-gun/#
https://www.hiclipart.com/free-transparent-background-png-clipart-dzqni/download
https://www.hiclipart.com/free-transparent-background-png-clipart-yiaqa/download
https://www.hiclipart.com/free-transparent-background-png-clipart-izbeg

## Background Images
https://giphy.com/gifs/starshiptroopers-traitor-of-mars-mass-tags-starship-troopers-26n6XC8EYdrzRniWQ
https://giphy.com/gifs/life-eyes-feast-MHboUUIoxzOKs
https://giphy.com/gifs/oc-effects-retrowaveoutrun-h9PwsDN4EffLq

## Favicon
https://www.favicon.cc/?action=icon&file_id=908238

