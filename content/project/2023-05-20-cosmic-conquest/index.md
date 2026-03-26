---

title: Cosmic Conquest
description: Vertically scrolling shooter with endless level & boss fights
image: cosmic-conquest.png

date: 2023-05-20
---

Trailer:
{{< mp4 src="cosmic-conquest.mp4" width="400px" >}}

Playable build: [https://redorange.itch.io/cosmicconquest](https://redorange.itch.io/cosmicconquest)

A project for [Compfest playground](compfest.id/playground) (currently unavailable), equipped with online leaderboard.


Team size: 2

My contributions:
- game designer
- game programmer
- backend (connect the game to Compfest leaderboard's API)
- project manager
- trailer video editor

Tech Stack:
- Unity C#
- Google Docs (project management)
- Postman


Each member of Ristek Gamedev were paired randomly, where each group consists of 1 programmer & 1 artist. My contributions is programmer.

Since we were tasked to make arcade game which will be connected to an online leaderboard, I was immediately reminded to old game I used to play: Platypus.

{{< img src="platypus.jpg" >}}

For those who don't know, Platypus is a side-scrolling shoot-'em-up (shmup) originally released in 2002 by Anthony Flack. The game’s defining feature is that every single visual asset was hand-sculpted out of plasticine clay and then photographed frame-by-frame.

Since this is our first project, I believe making a simple endless shooter game like Platypus will be a great start. What would make it different from Platypus is that this game will be vertical shooter instead of horizontal, as well as faster level progression.

Since the level is endless, I want create something player would find fun the more they progress the levels, and that would be enemy types and power ups.

## Enemy
I created 2 enemy types: small (left image) and large (right image):

{{< img src="minion.png" width="400px" >}}

Moreover, I created 2 boss fight with different attack types:

{{< img src="boss.png" width="400px" >}}

The boss will appear only at every 10th levels. Why would I dare to put the boss so high up, you may ask? It's because the game is already fast-paced with duration each level/wave is on average around 8 seconds, making 10 levels around 1-2 minutes interval. The boss itself can be defeated for on average 1 minute. Very great starting hook for an arcade game.

Apart from the boss, every other level (non 10th) will only have minions as obstacle. For more detailed enemy spawn wave, you can see this pseudocode:

```
SpawnLevelContent(currentLevel)

    // 1. Boss
    IF currentLevel % 10 == 0 THEN

        IF (currentLevel / 10) % 2 != 0 THEN
            bossID = "First Boss"
        ELSE
            bossID = "Second Boss"
        ENDIF

        spawnBoss(bossID)

    // 2. Minion
    ELSE
        IF currentLevel % 3 == 0 THEN
            spawnMinions("Small Enemy")
            
        ELSE IF currentLevel % 3 == 1 THEN
            spawnMinions("Large Enemy")
            
        ELSE // currentLevel % 3 == 2
            spawnMinions("Small Enemy" AND "Large Enemy")
            
        ENDIF
    ENDIF
    
END
```

In addition to above pseudocode, the both boss and the minions will have increasing health stats, bullet shooting rate, and spawn rate the more level the player has beaten. 

## Power Ups

In Platypus, player could gain power up that will be dropped by minions enemy. I would like to achieve that level of fun by implementing also power ups similar to Platypus along with my own power up ideas. At the final game, we successfully implemented 4 power ups: double bullet, triple bullet, laser, & shield.

{{< img src="power-ups.png" width="100%" >}}

The shield will give additional 'bonus life' if player got hitten, this power up can be applied together with other power ups. The rest of them are self-explanatory. 

Player might find the power up spawn is random. It's true for the shield power up, but not for the rest. Double bullet, triple bullet, & laser power up will spawn differently each time in a sequence, this way, we avoid player from 'power-up boredoom' if they got the same power up.

## Boss Health Bar

What I found Platypus lack is sense of progress when beating boss. Sure, the boss health is communicated through progressive 'clay-breaking' visual cues, but sometimes it's not enough for higher-level boss fights with massive amount of health. Moreover, showing power-up expiration timer in the form of numbers might be too excessive.

Therefore, for this game I tried to improve it by displaying in slider. This way, the numbers will be shown in subtle way without interrupting the main gameplay.

{{< img src="ui.png" width="100%" >}}

## Audio

Since there's no audio artist in our team, I have to outsourced the background music and sound effects from royalty free resources from the internet, including sfxr. I hand-picked and implemented the background music in the game so that boss & minions have different music, the music will also change every 10-level-cycle.

## Feedback

- Player collider too huge, seems unfair
- Laser power up too powerful, but I'll let that slide to keep the player hooked for more laser power up


## Leaderboard Exploit

This is a bit out of scope, My contributions as programmer in this project include connecting the game to Compfest Playground's API. Before the game, player will have to enter an unique code which they could obtain from the website to identify the user.

{{< img src="unique-code.png" width="300px" >}}

However, the leaderboard score is accumulative, meaning the moe attemps, the more point they will get. This could be exploited by playing repeatedly without the need to beat high score or highest level. There's nothing I could do, that's Compfest's portion of the project.

Moreover, one time there's multiple hackers got massive amount of points on leaderboard, probably Compfest's website security flaw, making the leaderboard taken down for a moment.

{{< img src="cosmic-conquest-leaderboard.jpg" width="600px" >}}


## Conclusion

Overall, this project really gave me broader perspective of game development, starting from idea brainstorming, programmer-artist collaboration, commision-based project which have to adapt to always-changing requirements, and having to improve the game based on feedback.

For the first time, I finally have my game recognized by many people and become conversation topic. Which is interesting.

