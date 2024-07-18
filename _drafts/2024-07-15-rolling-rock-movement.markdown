---
layout: post
page-type: post
title:  "Rolling Rock Movement"
date:   2024-05-13 20:32:00 -0700
tags: game video-game puzzle
---
I made a game for a recent Thinky Puzzle Games Jam called [Watch for Rolling Rocks](https://hayashi-stl.itch.io/watch-for-rolling-rocks). Exactly as it says on the tin, you must watch for rolling rocks (while trying to reach the stairs). A rock's behavior is simple:
* If it's not rolling, and there's a horizontal/vertical line of sight to the player, it starts rolling towards the player.
* If it's rolling, it keeps rolling in the same direction until it hits an obstacle, then it stops.

<div class="figrow">
    <figure>
        <img class="center-img" src="{{ '/assets/posts/rolling-rock-movement/rock-behavior.svg' | relative_url}}"
            alt="Rolling rock behavior"/>
        <figcaption>An animation of the behavior of a rolling rock. Detect player → roll → hit obstacle → stop.</figcaption>
    </figure>
</div>

# 1-Space and Corner-Meet

When there's only one rock, things are simple. But when there are 2 rocks, things can get complicated. There are a couple of cases in particular that need to be handled well:

<div class="figrow">
    <figure>
        <img class="center-img" src="{{ '/assets/posts/rolling-rock-movement/1-space.svg' | relative_url}}"
            alt="Rocks moving towards each other with 1 space left"/>
        <figcaption>Two rocks moving at each other with 1 space left (1-space case)</figcaption>
    </figure>
    <figure>
        <img class="center-img" src="{{ '/assets/posts/rolling-rock-movement/corner-meet.svg' | relative_url}}"
            alt="Rocks moving perpendicularly and meeting at a corner"/>
        <figcaption>Two rocks moving perpendicularly towards each other, meeting at their corners (Corner-meet case)</figcaption>
    </figure>
</div>

If we're not careful, we'll accidentally attach a priority system to the rock movement, which we don't want in this game.

<div class="figrow">
    <figure>
        <img class="center-img" src="{{ '/assets/posts/rolling-rock-movement/1-space-priority.svg' | relative_url}}"
            alt="Right rock moving farther than left rock"/>
        <figcaption>1-space case with an accidental priority system</figcaption>
    </figure>
    <figure>
        <img class="center-img" src="{{ '/assets/posts/rolling-rock-movement/corner-meet-priority.svg' | relative_url}}"
            alt="Top rock moving farther than left rock"/>
        <figcaption>Corner-meet case with an accidental priority system</figcaption>
    </figure>
</div>

Or we might accidentally allow the player to thread the needle between 2 rocks that should be crushing them from both sides.
<div class="figrow">
    <figure>
        <img class="center-img" src="{{ '/assets/posts/rolling-rock-movement/1-space-no-squish.svg' | relative_url}}"
            alt="Player between rocks with 1 space away"/>
        <figcaption>1-space case, where the rocks don't quite squish the player</figcaption>
    </figure>
</div>

So let's handle them. In both cases, the rocks move no further. In the 1-space case, if there's a player in that space, they get squished. This kind of squishing doesn't happen in the corner-meet case, though. The rocks act like 2×2 blocks.
<div class="figrow">
    <figure>
        <img class="center-img" src="{{ '/assets/posts/rolling-rock-movement/1-space-handled.svg' | relative_url}}"
            alt="Correct handling of 1-space case"/>
        <figcaption>1-space case handled. Rocks move no further; player gets squished.</figcaption>
    </figure>
    <figure>
        <img class="center-img" src="{{ '/assets/posts/rolling-rock-movement/corner-meet-handled.svg' | relative_url}}"
            alt="Correct handling of corner-meet case"/>
        <figcaption>Corner-meet case handled. Rocks move no further.</figcaption>
    </figure>
</div>

# 3 rocks

But alas! There's still problems, which now only happen when we have 3 or more rocks! We can try to handle the collisions one rock pair at a time. But if done naïvely, this can give weird results. Let's look at this case:
<div class="figrow">
    <figure>
        <img class="center-img" src="{{ '/assets/posts/rolling-rock-movement/train-wedge.svg' | relative_url}}"
            alt="A rock runs into a train of 2 rocks"/>
        <figcaption>A rock runs into a train of 2 rocks. (Train-wedge case)</figcaption>
    </figure>
</div>

If we choose to handle the collision on the left first, then because this turns into a corner-meet case, the rock on the left stops moving, which we don't want.
<div class="figrow">
    <figure>
        <img class="center-img" src="{{ '/assets/posts/rolling-rock-movement/train-wedge-break.svg' | relative_url}}"
            alt="Top rock stops left rock from moving"/>
        <figcaption>Train-wedge case handled improperly. The top rock breaks the train.</figcaption>
    </figure>
</div>

So, you might think that we can just figure out the correct order to handle collisions in. However, there's *another* case that makes even this a fool's errand.
<div class="figrow">
    <figure>
        <img class="center-img" src="{{ '/assets/posts/rolling-rock-movement/3-corner-meet.svg' | relative_url}}"
            alt="3 rocks meet at corners."/>
        <figcaption>3 rocks meet at corners. (3-corner-meet case)</figcaption>
    </figure>
</div>

If we handle *either* collision first, we end up attaching a priority system. Like we said, we don't want this.
<div class="figrow">
    <figure>
        <img class="center-img" src="{{ '/assets/posts/rolling-rock-movement/3-corner-meet-left.svg' | relative_url}}"
            alt="3-corner-meet case where the left collision is handled first."/>
        <figcaption>3-corner-meet case. Left collision handled first</figcaption>
    </figure>
    <figure>
        <img class="center-img" src="{{ '/assets/posts/rolling-rock-movement/3-corner-meet-right.svg' | relative_url}}"
            alt="3-corner-meet case where the right collision is handled first."/>
        <figcaption>3-corner-meet case. Right collision handled first</figcaption>
    </figure>
</div>