---
origami: true
layout: page
page-type: ori-model
thumbnail: 2-2-aya-ori.jpg
title: (2,2)-aya-ori (Twill)
date: 2025-08-17 23:19:00 -0400
description: "A weave based on the herringbone tessellation"
---
<div class="figrow">
    <figure>
        <img style="max-width: 400px;" src="2-2-aya-ori.jpg">
    </figure>
    <figure>
        {% fold %} <img style="max-width: 400px;" src="2-2-aya-ori.fold"> {% endfold %}
    </figure>
</div>

Plain weaves (each strip alternates going over and under cross strips) in origami have been done for a while.
Some are simple, such as the well-known square weave. Some are more complicated,
like [Courteous Anarchy by Robert Lang](https://langorigami.com/artwork/courteous-anarchy-opus-651/) (still a plain weave!)

<div class="figrow">
    <figure>
        {% fold %} <img style="max-width: 400px;" src="square-weave.fold"> {% endfold %}
        <figcaption> A closed square weave with a pleat width of half the strip width</figcaption>
    </figure>
</div>

However, there's other types of weaves. Like the (2,2)-twill (each strip goes over 2 cross strips and under 2 cross strips, and adjacent strips have their over-unders offset by 1).
So I challenged myself to make one. I'll be making a *closed* (2,2)-twill, because it looks cool[^open]

<div class="figrow">
    <figure>
        <img style="max-width: 400px;" src="2-2-twill.svg">
        <figcaption>A(n open) (2,2)-twill, for reference</figcaption>
    </figure>
    <figure>
        <img style="max-width: 400px;" src="2-2-closed-twill.svg">
        <figcaption>A closed (2,2)-twill. This is what I'm targeting.</figcaption>
    </figure>
</div>

# Setting Up the Pleat Shift
First, we lay out the rectangles, and add pleats so the rectangles are set to go to their target positions. Aiming for a pleat width of half the width (short side) of a rectangle, if we
call the pleat width 1, we want to shift a pleat by 1 and its perpendicular pleat by 3, while twisting them (a blog post about pleat shifting is coming soon...)

<div class="figrow">
    <figure>
        <img style="max-width: 400px;" src="pleat-shift-setup.svg">
        <figcaption>The pleat setup for the (2,2)-twill. Note how much the pleats are shifted by, and that they're twisted.</figcaption>
    </figure>
    <div style="max-width: 10px;"></div>
    <figure>
        <img style="max-width: 400px;" src="pleat-shift-math.svg">
        <figcaption>Some labelling done on the pleat shift. Quadrilateral $$ABCD$$ is critical; no creases can cross it.</figcaption>
    </figure>
</div>

Looking at the above figure, note that no creases can cross the rectangles, as they will show. The closest point $$A$$
can get to point $$B$$ is a vertical distance of 3, making $$\overline{AB}$$ *critical*:
the distance between them in the crease pattern is the distance between them in the final folding, so no
creases can cross $$\overline{AB}$$. Similarly, $$\overline{CD}$$ is critical. Note that $$\overline{BC}$$ and $$\overline{DA}$$ are critical by virtue of being adjacent, so
the entire quadrilateral becomes a no-crease zone. With that in mind, let's try constructing this twist and see what happens!

<div class="figrow">
    <figure>
        {% fold %} <img style="max-width: 400px;" src="1-3-oshii-twist.fold"> {% endfold %}
        <figcaption>The twist. Unfortunately...</figcaption>
    </figure>
</div>

Ugh, that stings. We can try moving $$A$$ farther away from $$B$$ and seeing if we can fix the overlapping problem. But at the time, I didn't realize this and gave up
on this problem for a good while.[^farther]

# Rotation to the Rescue

I decided that every twist needed to be a pure quadrilateral twist, with no creases crossing it. It *is* possible to do this with just one unit, by bringing some rectangles
closer together. However, this won't tile.

<div class="figrow">
    <figure>
        {% fold %} <img style="max-width: 400px;" src="rectangle-twist.fold"> {% endfold %}
        <figcaption>A pure quadrilateral twist that gives the intended folded state</figcaption>
    </figure>
    <figure>
        <img style="max-width: 400px;" src="rectangle-twist-no-tile.svg">
        <figcaption>But it doesn't tile. Pleats of different widths want to match up.</figcaption>
    </figure>
</div>

So how do we solve this? We can try *rotating* some of the tiles, turning the pleats into angled crimps. This would look something like this:

<div class="figrow">
    <figure>
        <img style="max-width: 600px;" src="rotation-tile.svg">
        <figcaption>Like this. And it tiles. (Yes, I over-rotated the tiles, but we'll get into that)</figcaption>
    </figure>
    <figure>
        <img style="min-width: 700px; max-width: 700px;" src="rotation-math.svg">
        <figcaption>A single "repeating unit" labelled with important values.</figcaption>
    </figure>
</div>

The "repeating unit" has 180° rotational symmetry. For it to tile, the lengths of the green line segments must equal. We'll call that value $$x$$.
We fix the crimp "width" $$h$$ so it's constant, since this is a parameter we have. For the unit to fold flat,
the four vertices in the twist must satisfy Kawasaki's theroem, so $$\alpha + \beta = \gamma + \delta = 180^\circ$$. When $$\theta = 45^\circ$$, as shown in the diagram,
$$\alpha + \beta > 180^\circ$$ and $$\gamma + \delta < 180^\circ$$. When $$\theta = 0^\circ$$ (no rotation), then the inequalities flip. By the intermediate value theorem,
there's a value for $$\theta$$ where $$\alpha + \beta = 180^\circ$$. Due to the symmetries of the unit, we know that $$\beta + \delta = 180^\circ$$ and $$\alpha + \gamma = 180^\circ$$
regardless of $$\theta$$. Thus, when $$\alpha + \beta = 180^\circ$$, we also have $$\gamma + \delta = 180^\circ$$, satisfying the condition. Now we just have to find
$$\theta$$.

So I ran FreeCAD (a constraint solver, among other things) to find this value, which ended up being about 79.187683036437065°[^precision], and then used Oriedita
to construct the tessellation.

<div class="figrow">
    <figure>
        <img src="cad.png">
        <figcaption>The sketch made in FreeCAD.</figcaption>
    </figure>
</div>


[^open]: and also because the open (2,2)-twill has extra polygons I don't want to worry about. This is an important difference from the plain weave.
[^farther]: Spoiler alert, this doesn't work either.
[^precision]: Yes, you do need lots of precision when plugging this value into Oriedita. In particular, 5 decimal places isn't enough.