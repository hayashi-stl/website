---
layout: post
page-type: post
title:  "Rolling Rock Movement"
comments-id:  "Rolling Rock Movement"
date:   2024-05-13 20:32:00 -0700
tags: game video-game puzzle
---
<specific-style>
    <style type="text/css">
        emph {
            font-weight: bold;
            color: #a0a;
        }
    </style>
</specific-style>
I made a game for a recent Thinky Puzzle Games Jam called [Watch for Rolling Rocks](https://hayashi-stl.itch.io/watch-for-rolling-rocks). Exactly as it says on the tin, you must watch for rolling rocks (while trying to reach the stairs). A rock's behavior is simple:
* If it's not rolling, and there's a horizontal/vertical line of sight to the player, it starts rolling towards the player.
* If it's rolling, it keeps rolling in the same direction until it hits an obstacle, then it stops.

<div class="figrow">
    <figure>
        <img class="center-img" src="{{ '/assets/posts/rolling-rock-movement/rock_rock-behavior.svg' | relative_url}}"
            alt="Rolling rock behavior"/>
        <figcaption>An animation of the behavior of a rolling rock. Detect player → roll → hit obstacle → stop.</figcaption>
    </figure>
</div>

<p style="color: #c00;">Warning: For some reason, in some browsers (like Firefox on Linux), SVG SMIL animation is computationally intensive. I'd recommend using Chrome for this page. Sorry, this is frustrating and I don't know an easy fix.</p>

# Rock Collision

When there's only one rock, things are simple. But when there are 2 rocks, things can get complicated as rocks can collide. There are a couple of cases in particular that need to be handled well:

<div class="figrow">
    <figure>
        <img class="center-img" src="{{ '/assets/posts/rolling-rock-movement/rock_1-space.svg' | relative_url}}"
            alt="Rocks moving towards each other with 1 space left"/>
        <figcaption>Two rocks moving at each other with 1 space left (1-space case)</figcaption>
    </figure>
    <figure>
        <img class="center-img" src="{{ '/assets/posts/rolling-rock-movement/rock_corner-meet.svg' | relative_url}}"
            alt="Rocks moving perpendicularly and meeting at a corner"/>
        <figcaption>Two rocks moving perpendicularly towards each other, meeting at their corners (Corner-meet case)</figcaption>
    </figure>
</div>

If we're not careful, we'll accidentally attach a priority system to the rock movement, which we don't want in this game.

<div class="figrow">
    <figure>
        <img class="center-img" src="{{ '/assets/posts/rolling-rock-movement/rock_1-space-priority.svg' | relative_url}}"
            alt="Right rock moving farther than left rock"/>
        <figcaption>1-space case with an accidental priority system</figcaption>
    </figure>
    <figure>
        <img class="center-img" src="{{ '/assets/posts/rolling-rock-movement/rock_corner-meet-priority.svg' | relative_url}}"
            alt="Top rock moving farther than left rock"/>
        <figcaption>Corner-meet case with an accidental priority system</figcaption>
    </figure>
</div>

Or we might accidentally allow the player to thread the needle between 2 rocks that should be crushing them from both sides.
<div class="figrow">
    <figure>
        <img class="center-img" src="{{ '/assets/posts/rolling-rock-movement/rock_1-space-no-squish.svg' | relative_url}}"
            alt="Player between rocks with 1 space away"/>
        <figcaption>1-space case, where the rocks don't quite squish the player</figcaption>
    </figure>
</div>

So let's handle them. In both cases, the rocks move no further. In the 1-space case, if there's a player in that space, they get squished. This kind of squishing doesn't happen in the corner-meet case, though. The rocks act like 2×2 blocks.
<div class="figrow">
    <figure>
        <img class="center-img" src="{{ '/assets/posts/rolling-rock-movement/rock_1-space-handled.svg' | relative_url}}"
            alt="Correct handling of 1-space case"/>
        <figcaption>1-space case handled. Rocks move no further; player gets squished.</figcaption>
    </figure>
    <figure>
        <img class="center-img" src="{{ '/assets/posts/rolling-rock-movement/rock_corner-meet-handled.svg' | relative_url}}"
            alt="Correct handling of corner-meet case"/>
        <figcaption>Corner-meet case handled. Rocks move no further.</figcaption>
    </figure>
</div>

# 3 rocks

But alas! There's still problems, which now only happen when we have 3 or more rocks! We can try to handle the collisions one rock pair at a time. But if done naïvely, this can give weird results. Let's look at this case[^train]:
<div class="figrow">
    <figure>
        <img class="center-img" src="{{ '/assets/posts/rolling-rock-movement/rock_train-wedge.svg' | relative_url}}"
            alt="A rock runs into a train of 2 rocks"/>
        <figcaption>A rock runs into a train of 2 rocks. (Train-wedge case)</figcaption>
    </figure>
    <figure>
        <img class="center-img" src="{{ '/assets/posts/rolling-rock-movement/rock_train-wedge-ideal.svg' | relative_url}}"
            alt="The top rock gets stopped by the train"/>
        <figcaption>Ideal handling of the train-wedge case.</figcaption>
    </figure>
</div>

If we choose to handle the collision on the left first, then because this turns into a corner-meet case, the rock on the left stops moving, which we don't want.
<div class="figrow">
    <figure>
        <img class="center-img" src="{{ '/assets/posts/rolling-rock-movement/rock_train-wedge-break.svg' | relative_url}}"
            alt="Top rock stops left rock from moving"/>
        <figcaption>Train-wedge case handled improperly. The top rock breaks the train.</figcaption>
    </figure>
</div>

So, you might think that we can just figure out the correct order to handle collisions in. However, there's *another* case that makes even this a fool's errand[^3].
<div class="figrow">
    <figure>
        <img class="center-img" src="{{ '/assets/posts/rolling-rock-movement/rock_3-corner-meet.svg' | relative_url}}"
            alt="3 rocks meet at corners"/>
        <figcaption>3 rocks meet at corners. (3-corner-meet case)</figcaption>
    </figure>
    <figure>
        <img class="center-img" src="{{ '/assets/posts/rolling-rock-movement/rock_3-corner-meet-ideal.svg' | relative_url}}"
            alt="All rocks stop when they meet"/>
        <figcaption>Ideal handling of the 3-corner-meet case.</figcaption>
    </figure>
</div>

If we handle *either* collision first, we end up attaching a priority system. Like we said, we don't want this.
<div class="figrow">
    <figure>
        <img class="center-img" src="{{ '/assets/posts/rolling-rock-movement/rock_3-corner-meet-left.svg' | relative_url}}"
            alt="3-corner-meet case where the left collision is handled first."/>
        <figcaption>3-corner-meet case. Left collision handled first</figcaption>
    </figure>
    <figure>
        <img class="center-img" src="{{ '/assets/posts/rolling-rock-movement/rock_3-corner-meet-right.svg' | relative_url}}"
            alt="3-corner-meet case where the right collision is handled first."/>
        <figcaption>3-corner-meet case. Right collision handled first</figcaption>
    </figure>
</div>

And one more thing: Sometimes handling collisions creates more collisions that need to be handled.
<div class="figrow">
    <figure>
        <img class="center-img" src="{{ '/assets/posts/rolling-rock-movement/rock_caterpillar.svg' | relative_url}}"
            alt="Chain of collision responses"/>
        <figcaption>One collision sets of a chain-reaction of collision responses.</figcaption>
    </figure>
</div>

So we need an algorithm that handles both of these cases and other tricky ones not shown without attaching a priority system, and that can also handle collisions caused by handling collisions. Enter...

# Iterated Discrete Continuous Collision Processing

Okay, that's a bit too fancy of a name. But the basic idea is that we take a lesson from real-time games (whose collision processing is more continuous than that of a grid game), discretize it into a grid, and iterate it until all collisions are handled.

First, we need to assign a *time* to each collision, a number between 0 and 1 indicating how early the collision is. For example, the collision in the 1-space case has a time of 0.5 since the rocks meet midway. Here we show the times of all collisions between 2 rocks[^pattern].

<div class="figrow">
    <figure>
        <img class="center-img" src="{{ '/assets/posts/rolling-rock-movement/rock_moving-static.svg' | relative_url}}"
            alt="Moving rock vs static rock"/>
        <figcaption>Moving rock vs. static rock. Collision is immediate so <emph>time = 0</emph>. (This is also used for fixed blocks)</figcaption>
    </figure>
    <figure>
        <img class="center-img" src="{{ '/assets/posts/rolling-rock-movement/rock_opposite-even.svg' | relative_url}}"
            alt="Opposite directions, even number of spaces"/>
        <figcaption>Rocks moving in opposite directions with an even number of spaces between them. Collision is immediate so <emph>time = 0</emph>.</figcaption>
    </figure>
    <figure>
        <img class="center-img" src="{{ '/assets/posts/rolling-rock-movement/rock_opposite-odd.svg' | relative_url}}"
            alt="Opposite directions, odd number of spaces"/>
        <figcaption>Rocks moving in opposite directions with an odd number of spaces between them. Collision happens halfway into a step, so <emph>time = 0.5</emph>.</figcaption>
    </figure>
</div>
<div class="figrow">
    <figure>
        <img class="center-img" src="{{ '/assets/posts/rolling-rock-movement/rock_perp-biased.svg' | relative_url}}"
            alt="Perpendicular directions, biased"/>
        <figcaption>Rocks moving in perpendicular directions where one is closer to the intersection point. Collision happens immediately, so <emph>time = 0.0</emph>.</figcaption>
    </figure>
    <figure>
        <img class="center-img" src="{{ '/assets/posts/rolling-rock-movement/rock_perp-corner.svg' | relative_url}}"
            alt="Perpendicular directions, meet at corner"/>
        <figcaption>Rocks moving in perpendicular directions where both rocks are the same distance from the intersection point. Collision happens immediately. However, we want to handle this after collisions with the side of a rock, so <emph>time = ε</emph> (implemented as 0.1).</figcaption>
    </figure>
</div>

Now for the algorithm.

After moving the rocks, some collisions may happen. We handle *all* collisions that tie for the lowest time at the same time. This involves
* Calculating, for each collision, which of the two rocks (or perhaps both) have to move back
* After all those calculations, moving *all* relevant rocks back and making them static.

This can create new collisions, so we repeat the process until there are no collisions left, finishing the algorithm.

Note that it is impossible for this to loop infinitely. When a rock moves back, it is treated as a static rock for all future collision responses, so it never moves again. In the worst case scenario, all the rocks have to move back. But we know that this state has no collisions in it because it was the state before moving the rocks in the first place.

Then we kill any players that are either overlapping with a rock, or on a space that two rocks that participated in a *handled* collision with time=0.5 (the 1-space case) were both on (that space isn't safe!)

Here's an example of the algorithm in action:
<div class="figrow">
    <figure>
        <img class="center-img" src="{{ '/assets/posts/rolling-rock-movement/rock_all-together.svg' | relative_url}}"
            alt="Above-described algorithm"/>
        <figcaption>The above algorithm in action. Notice that collisions with earlier times (moving vs static, etc.) are handled first, and that collisions with the same time are handled together (which is why the 3-corner-meet case in the center is handled correctly). The players at the top right die because they were in the way of a handled time=0.5 collision. The player in the center doesn't die because time=ε collisions happen pretty much instantly. The player in the top left doesn't die because even though they were in the way of a time=0.5 collision, some time=0 collisions got handled first and cancelled the time=0.5 collision before it could get handled.</figcaption>
    </figure>
</div>

Wow, grid movement can be complicated. We haven't even gotten into what would happen if I decided to implemement 1×1 rocks. The 1-space case gets more complicated.

[^train]: You might realize that rock trains are impossible in Watch for Rolling Rocks. Pretend they're possible.
[^3]: This case, however, *is* possible. In fact, I encountered it while building an actual level and had to go change the rock processing algorithm because of it.
[^pattern]: However, the implementation looks for patterns instead of having a big list of cases.

<!--script type="module" src="{{ '/assets/svg-hide-hidden.js' | relative_url }}"></script-->