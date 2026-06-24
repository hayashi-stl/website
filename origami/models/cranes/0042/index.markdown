---
layout: ori-tsuru-page
page-type: ori-tsuru-model
thumbnail: crane.jpg
index: 42
title: "#42: Wrinkly Floor Crane"
japanese-title: "シワクチャユカヅル (皺床鶴)"
comments-id: "ori-tsuru-0042"
date: 2025-07-25
description: "An early attempt at a floor crane"
tags: traditional plane
---
<div class="figrow">
    <figure>
        <img style="max-width: 400px;" src="crane.jpg">
    </figure>
    <figure>
        {% fold %} <img style="max-width: 400px;" src="base.fold"> {% endfold %}
    </figure>
</div>

*The **wrinkly floor crane** sits on a floor, looking almost as pitiful as the crumpled crane, but not quite.*

Time to make a tileable crane! My initial plan was to make a square on top of a floor, where the square is just attached to the center. That square can then be folded into
a crane. Here's the initial ERM map:

<div class="figrow">
    <figure>
        <img style="max-width: 400px;" src="abstraction.svg">
        <figcaption>The abstraction</figcaption>
    </figure>
    <figure>
        <img style="max-width: 400px;" src="abstraction-2.svg">
        <figcaption>Another view of the abstraction, showing intended backside lakes. The slits in this view are fake.</figcaption>
    </figure>
    <figure>
        <img style="max-width: 400px;" src="erm-map.svg">
        <figcaption>The initial ERM map.</figcaption>
    </figure>
</div>

However, when turning this into a crease pattern, I wasn't as good at transitions back then, so I struggled. There's a
[hole filling algorithm](https://erikdemaine.org/papers/HoleFilling_Origami6/paper.pdf), which describes how to actually apply the perimeter theorem[^perimeter] to a crease pattern and
fill it in, but there's only [one (1) implementation](http://jasonku.mit.edu/hole/) of it as far as I know -- oh wait, the link is dead. Make that zero (0). Applying the algorithm
manually is annoying, so I just had to go by intuition. I ended up having to space the outer rivers a bit away from the inner rivers to make an intuitive transition.

Then came actually folding it. The sequence I found still had some complicated collapses, so I didn't manage to collapse it cleanly, and thus, you get a wrinkly crane. Better luck
next time.

[^perimeter]: If the boundary of a region can be folded flat, and no distance between two points stretches, then the inside of the region can be folded flat, allowing self-intersection.