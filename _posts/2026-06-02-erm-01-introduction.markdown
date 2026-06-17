---
layout: post
page-type: post
title:  "Edge River Method Part 1 of ???: Introduction (and some Theory)"
comments-id:  "Edge River Method Part 1 of ???: Introduction"
date:   2026-06-08 00:00:00 -0400
tags: origami design erm
---
<script>
    window.MathJax = {
        tex: {
            inlineMath: {'[+]': [['$', '$']]}
        }
    };
</script>

## Fundamentals

Yes, there's already a [blog post about ERM](https://origami.abstreamace.com/2021/12/12/geography-of-origami-a-brief-introduction-to-the-edge-river-method/),
but there's[^is] only one blog post about it and apparently ERM resources are obscure. So here's another one, since I recently delved into some specific aspects of ERM.

The *edge river method (ERM)* is a method that's pretty similar to the axial method, but meant to extend to general 2D polygons. Let's take a look at a classic axial packing
map.
<div class="figrow">
    <figure>
        <img style="max-width: 400px;" src="/assets/posts/erm-01-introduction/axial-abstraction.svg">
        <figcaption>The tree, with edges labelled.</figcaption>
    </figure>
    <figure>
        <img style="min-width: 400px; max-width: 400px;" src="/assets/posts/erm-01-introduction/axial-packing.svg">
        <figcaption>The map. Dotted black lines are ridge lines.</figcaption>
    </figure>
</div>

Yep, just a regular axial map. It has some rivers, and they turn. One thing you can do here is to place edges of the tree directly onto the axial packing.
<div class="figrow">
    <figure>
        <img style="min-width: 400px; max-width: 400px;" src="/assets/posts/erm-01-introduction/axial-packing-sources.svg">
        <figcaption>The map after placing edges onto the packing. Flap F has been turned into a middle flap for illustration purposes.</figcaption>
    </figure>
</div>

Notice that each river comes out of an edge and flows and turns until it reaches the boundary of the paper or the same edge from the other side (as in river F).[^belt]
This concept can be generalized to the case where the "tree" is actually a shape made of 2D polygons (and from now on will be called an *abstraction*[^fat])
Let's take a look at a sample ERM map that I made.

<div class="figrow">
    <figure>
        <img style="max-width: 400px;" src="/assets/posts/erm-01-introduction/tadashi-abstraction.svg">
        <figcaption>The abstraction.</figcaption>
    </figure>
    <figure>
        <img style="max-width: 800px;" src="/assets/posts/erm-01-introduction/tadashi-erm.svg">
        <figcaption>The ERM map.</figcaption>
    </figure>
</div>

From each edge comes a river, which flows until it reaches the boundary of the paper or another edge that ends up in the same position.
For example, the bottom middle river coming from region A flows until it reaches the top edge of region B, which ends up at the same position.
In general, an ERM map has several components (names given by Mu-Tsun Tsai)
* **Lakes** (blue). These are the blocks that make up the abstraction and need to be packed into the map.
* **Backside Lakes** (dark blue). These are lakes that end up on the back side. They can be explicitly planned, or they can just show up when rivers intersect, as in this case, where the bottom-right river and the right-side river from region A intersect. (Regular lakes will be called *frontside lakes* if they need to be distinguished from backside lakes.)
* **Rivers** (striped green). These are similar to rivers in an axial packing. They enforce the condition on the distance between the corresponding endpoints on the lake, and are mostly not allowed to cross each other (though sometimes they can, creating more lakes. We'll get into that later.) When folding the crease pattern, the entire river gets folded onto roughly the same edge.
* **Lands** (background color). Any area that's not a lake or a river.
* **Peninsulas**[^nml] (diamond red). A type of land that's a feature unique to ERM. In general, rivers that come out of a concavity
(e.g. the concavity between the bottom-left of region A and the left of region B) cannot share an edge (we'll get into why later). Peninsulas are explicitly marked as a reminder of this constraint, as it is one of the most important facts about ERM and easy to forget when constructing a packing.
* the **Sea** (outside the diagram). This is the paper boundary.

One of the most important differences between regular axial packing and ERM is literally just that, ERM is not axial. In axial packing, the "abstraction" lies on a single axis,
so all rivers collapse to the same direction. But in ERM, rivers can collapse to different directions,
which is responsible for basically all the complications of ERM compared
to axial packing.

So, now you're ready to start packing with ERM! (on a basic level):
1. Come up with an abstraction.
2. Pack the abstraction into a map, forming lakes.
3. Send a river from each lake edge and make sure it goes to the sea or to a lake edge that will end up in the same place (like in axial packing).
4. Make sure the rivers don't intersect (unless you know what you're doing)
5. If two rivers form a concavity, make sure there's space between them.
6. ??? (draw a crease pattern)
6. Profit!

Okay, but if you want to use ERM at a higher level, we need to talk about ERM theory.

## Theory

### Lakes, Rivers, and Lands

Fundamentally, ERM is a way of telling the paper where to go to construct the target shape without stretching it or tearing it. In the ideal version of ERM, where you can make
infinitely dense folds, there are only 3 types of regions: lakes, rivers, and lands. Let's take a look at the following example, which shows an abstraction with 3 flaps.

<div class="figrow">
    <figure>
        <img style="max-width: 400px;" src="/assets/posts/erm-01-introduction/3-flap-abstraction.svg">
        <figcaption>The abstraction, with a region and 3 points labelled.</figcaption>
    </figure>
    <figure>
        <img style="max-width: 800px;" src="/assets/posts/erm-01-introduction/3-flap-erm.svg">
        <figcaption>The ERM map, which shows where those points go.</figcaption>
    </figure>
</div>

Let's look at what lakes, rivers, and lands do in this ideal model:
* Lakes are regions that map directly to the abstraction and don't collapse. A point inside a lake (e.g. point $P$) turns into a point in the abstraction.
* Rivers are constant-width regions that collapse onto an edge in the abstraction. A line inside a river that is parallel to the river (e.g. line $Q$) turns into a point in the abstraction (specifically a point on some edge). Rivers contain infinitely dense creases, each one perpendicular to the flow of the river.
* Lands are regions that collapse onto a single point in the abstraction. An entire land (e.g. region $R$) turns into a point in the abstraction (specifically a vertex).

When you make the infinitely dense crimps on the rivers and the double infinitely dense all-directional crimps on the lands required to collapse this ideal ERM map, you get
exactly the target abstraction. If you could actually do infinitely dense crimps, then this would be the end of it. Lakes! Rivers! Lands! The fundamental regions of ERM!

Unfortunately, on real paper, you can't make infinitely dense creases, and all the complications of ERM past the fundamental regions come from this fact.

Sometimes, you get lucky and you can just make the infinitely dense creases finite, and it will fold as intended:
<div class="figrow">
    <figure>
        <img style="max-width: 400px;" src="/assets/posts/erm-01-introduction/3-flap-cp.svg">
        <figcaption>The 3-flap crease pattern, with the ERM map in the background</figcaption>
    </figure>
    <figure>
        <img style="max-width: 400px;" src="/assets/posts/erm-01-introduction/3-flap.jpg">
        <figcaption>The result.</figcaption>
    </figure>
</div>

### Waffle walls

Unfortunately, you usually don't get so lucky. Consider the following ERM map, which represents a 540° angle made of 6 axis-aligned squares.

<div class="figrow">
    <figure>
        <img style="max-width: 400px;" src="/assets/posts/erm-01-introduction/540-abstraction.svg">
        <figcaption>The abstraction.</figcaption>
    </figure>
    <figure>
        <img style="max-width: 800px;" src="/assets/posts/erm-01-introduction/540-erm.svg">
        <figcaption>The ERM map. Note land $P$ in the middle.</figcaption>
    </figure>
</div>

Now let's try to draw a crease pattern for this map. The outer lands and rivers are easy, but land $P$ looks tricky.
Instead of using [Origamizer](https://erikdemaine.org/papers/Origamizer_SoCG2017/paper.pdf) since I'm not Tomohiro Tachi, let's try to do it more manually.
A first attempt is shown below[^3d]:

<div class="figrow">
    <figure>
        {% fold %} <img style="min-width: 400px; max-width: 400px;" src="/assets/posts/erm-01-introduction/540-level-0.fold"> {% endfold %}
        <figcaption>A first attempt at the 540° angle. Faded lines are folded less than 180°.</figcaption>
    </figure>
</div>

But now let's actually try to fold it.

<div class="figrow">
    <figure>
        <img style="max-width: 400px;" src="/assets/posts/erm-01-introduction/540-front.jpg">
        <figcaption>The front side. Perfect!</figcaption>
    </figure>
    <figure>
        <img style="max-width: 400px;" src="/assets/posts/erm-01-introduction/540-back-level-0.jpg">
        <figcaption>The back side. Hmm, there's something sticking out of the vertex...</figcaption>
    </figure>
</div>

Most of the paper on the back side is aligned with the abstraction, but there's a 6-sided-star-shaped wall sticking out. This is what I like to call a *waffle wall*, named
after the waffles used in the Origamizer algorithm.
Thankfully, we can apply some force and twist the waffle walls (kind of like a hexagon twist) and try to get it on the abstraction.

<div class="figrow">
    <figure>
        {% fold %} <img style="min-width: 400px; max-width: 400px;" src="/assets/posts/erm-01-introduction/540-level-1.fold"> {% endfold %}
        <figcaption>A second attempt at the 540° angle, after twisting the vertex. (I encourage you to fold this, it looks pretty and locks awesomely)</figcaption>
    </figure>
    <figure>
        <img style="max-width: 400px;" src="/assets/posts/erm-01-introduction/540-back-level-1.jpg">
        <figcaption>The waffle walls got much smaller, but they're still there.</figcaption>
    </figure>
</div>

We can keep twisting and twisting these waffle walls, and they'll get smaller and smaller, approaching 0, but as long as we make only finitely many creases, there will be waffle walls
(proof in the footnote[^waffle]). I'll leave this section off with a beautiful picture.

<div class="figrow">
    <figure>
        <img style="min-width: 600px; max-width: 600px;" src="/assets/posts/erm-01-introduction/540-beauty.svg">
        <figcaption>A coloring of the faces after an infinite number of waffle wall twists, where faces of the same color end up on the same face of the abstraction,
        and faces of different colors end up on different faces of the abstraction. Every point where a solid white line turns (except the boundary and the 6 turning points
        close to it) maps to point $P$ (the center point).</figcaption>
    </figure>
</div>

In fact, whenever there's a vertex with negative curvature (an angle greater than 360°), there is a risk of needing waffle walls. Note that I said a *risk*, not a *guarantee*,
because in some cases you can avoid them. For example, in the 3-flap discussed in [Lakes, Rivers, and Lands](#lakes-rivers-and-lands), there is a vertex with a 540° angle (90° front and back × 3 flaps), but no waffle walls are needed[^waffle-2].

### Peninsulas

Another situation where waffle walls are not needed is when the vertex in question is on the boundary of the abstraction. However, we need to be careful here.
Consider the following ERM map, this time of an L.

<div class="figrow">
    <figure>
        <img style="max-width: 400px;" src="/assets/posts/erm-01-introduction/L-abstraction.svg">
        <figcaption>The abstraction, with some points labelled.</figcaption>
    </figure>
    <figure>
        <img style="max-width: 800px;" src="/assets/posts/erm-01-introduction/L-erm.svg">
        <figcaption>The ERM map, with some points labelled.</figcaption>
    </figure>
    <figure>
        <img style="max-width: 400px;" src="/assets/posts/erm-01-introduction/L-abstraction-consequences.svg">
        <figcaption>The abstraction again, with forced positions for $P'$ and $R'$. The shortest distance from $P'$ to $R'$ within the abstraction is greater than 2.</figcaption>
    </figure>
</div>

Now let's try to make a (finite!) crease pattern based on this ERM map.
Let $P$ be a point in the middle of a segment forming the concavity and $R$ be a point in the middle of the other segment. We mark $P'$, $Q'$ and $R'$ on the paper,
on a line perpendicular to the river, on the segments corresponding to $P$, $Q$, and $R$, respectively. We specifically choose them so that $Q'$ does *not* map to $Q$ exactly
(which we can do, because there's only a finite number of creases).
Because $P'$ and $R'$ are in the middle of a river, they must map to points separated perpendicularly from their respective segments[^handwave].
The yellow lines in the figure on the right show where they could potentially end up. Now where does $Q'$ end up? The intersection of the white dotted regions
shows where $Q'$ could end up
without stretching the distance between $P'$ and $R'$. However, that intersection only contains $Q$! Since we specifically said that $Q'$ does not map to $Q$, this ERM
map won't work.

As an aside, if we *do* allow waffle walls, the above ERM map will work. Here's an example crease pattern:
<div class="figrow">
    <figure>
        {% fold %} <img style="min-width: 400px; max-width: 400px;" src="/assets/posts/erm-01-introduction/L-waffle.fold"> {% endfold %}
        <figcaption>The crease pattern for the above ERM map. Note that it has 90° folds; these form the waffle walls.</figcaption>
    </figure>
</div>
This one's even worse than that orthogonal 540° angle vertex, because here you can't twist the waffle walls into the abstraction at all. You'd have to sink them, meaning that you
can't limit the waffle wall zone to just small areas around vertices.
As another aside, Soichiro Uchida made a software called [Orixa](https://orixa-gilt.vercel.app/) that can compute ERM maps and crease patterns for arbitrary polyominos
(ones with holes are split first; abstractions must be "trees"!), but assumes that waffle walls are allowed. In the output, lakes are gray, rivers are blue, and lands are green.

Thankfully, this time there's an easy fix that gets rid of the waffle walls completely. The problem is that the rivers corresponding to segments $\overline{PQ}$ and $\overline{QR}$
touch, causing a problem with stretching the paper. If we just make them not do that, the problem goes away. Behold:

<div class="figrow">
    <figure>
        <img style="max-width: 400px;" src="/assets/posts/erm-01-introduction/L-erm-fixed.svg">
        <figcaption>The fixed ERM map. The rivers that shouldn't touch now don't touch. We add a reminder region to remind ourselves not to accidentally make those rivers touch.</figcaption>
    </figure>
    <figure>
        {% fold %} <img style="max-width: 400px;" src="/assets/posts/erm-01-introduction/L-no-waffle.fold"> {% endfold %}
        <figcaption>A crease pattern for the ERM map. All folds are 180°, so there are no waffle walls.</figcaption>
    </figure>
</div>

Now the rivers don't touch. The diamond-patterned red region in the middle, as mentioned in the Fundamentals section, is a *peninsula*,
and it serves as a reminder to not make those rivers touch. Note that it is still a land. In general, if two rivers are attached to edges that form a concavity,
and you want the paper to stay inside the abstraction, those rivers should not touch. You can make the space as small as you want, but the smaller the space, the less distance
the paper is allowed to travel into the abstraction before it stretches, and thus the greater the number of creases.

There's rivers that shouldn't touch, but there's also...

### Overlapping Rivers

Consider the following packing challenge, involving making an L-tromino.

<div class="figrow">
    <figure>
        <img style="max-width: 400px;" src="/assets/posts/erm-01-introduction/7-abstraction.svg">
        <figcaption>The abstraction.</figcaption>
    </figure>
    <figure>
        <img style="max-width: 400px;" src="/assets/posts/erm-01-introduction/7-erm.svg">
        <figcaption>An incomplete ERM map.</figcaption>
    </figure>
</div>

We want to pack the abstraction with the lakes in the specific places shown above. (Perhaps it's part of a bigger model and due to tight constraints these lake positions are
pretty much forced.) When we draw rivers from each edge, we have a problem: there's seemingly no space for river $\overline{QR}$. Is this challenge impossible?

No. Notice that river $\overline{PQ}$ and river $\overline{QR}$ here can be seen as one big river of width 2. But it doesn't particularly need to have width 2. The distance
from $P$ to $R$ in the abstraction is $\sqrt{2}$, so as long as the edges of the big river stay $\sqrt{2}$ apart, things should be fine. But river $\overline{PQ}$
and river $\overline{QR}$ must have width 1, so how do we resolve this?

<div class="figrow">
    <figure>
        <img style="max-width: 400px;" src="/assets/posts/erm-01-introduction/7-erm-fixed.svg">
        <figcaption>Fixing the map with overlapping rivers. The overlap is marked with double-striped teal.</figcaption>
    </figure>
    <figure>
        <img style="max-width: 400px;" src="/assets/posts/erm-01-introduction/7-erm-fixed-2.svg">
        <figcaption>Fixing the map with new lakes.</figcaption>
    </figure>
</div>

We can just make the rivers overlap! We overlap the rivers so that the shortest distance between $P$ and $R$ on the paper is $\sqrt{2}$, satisfied by $P_1$ and $R_1$.
To understand how overlapping rivers work, let's think back to the ideal model discussed in [Lakes, Rivers, and Lands](#lakes-rivers-and-lands), with infinite creases.
The path of the river dictates what direction the creases should go (or you could say that the creases turn the river), but at the overlap these crease directions disagree,
except along segment $\overline{P_1R_1}$, which seemingly leads to a contradiction: the rivers can't turn the way that they're drawn! However, the resolution here is simple:
we don't draw any creases that would go through the overlap, except the one where they agree. A region that cannot have creases through it is a *lake*.
This simplifies to the diagram on the right, where the overlap is replaced with
two new lakes we didn't draw in the abstraction (but those lakes will just be hidden, so it's fine). A more formal proof that the overlap simplifies to those lakes
is in this footnote[^overlap].

ERM diagrammers[^diagrammers]  show overlapping rivers for simplicity, but in reality, overlapping rivers are just forced lakes.

By the way, I don't recommend this specific packing in real life. Here's a resulting crease pattern:
<div class="figrow">
    <figure>
        {% fold %} <img style="min-width: 300px; max-width: 300px;" src="/assets/posts/erm-01-introduction/7.fold"> {% endfold %}
        <figcaption>A crease pattern for the ERM map. Note that the creases around the peninsula are dense.</figcaption>
    </figure>
</div>

As discussed in [Peninsulas](#peninsulas), the narrower the peninsula, the denser the creases have to be, and this is a good example of that. And this particular example has
a complicated reverse fold, so you either have to deal with it or increase the density even more.

Now for another example of the use of overlapping rivers. This pattern often shows up in my designs:

<div class="figrow">
    <figure>
        <img style="max-width: 400px;" src="/assets/posts/erm-01-introduction/7-abstraction.svg">
        <figcaption>The abstraction as a reminder.</figcaption>
    </figure>
    <figure>
        <img style="max-width: 400px;" src="/assets/posts/erm-01-introduction/7'-erm.svg">
        <figcaption>An ERM map with a peninsula problem.</figcaption>
    </figure>
</div>

Let's say that all the lakes are fixed, and that due to the greater context, river $\overline{RS}$ is also fixed (for example, segment $\overline{RS}$ could
just be long, and thus even if it turns, you get an annoyingly narrow peninsula). The fix, is of course, to use overlapping rivers, but you can't just push river $\overline{QR}$
closer to river $\overline{PQ}$[^push]. Instead, you have river $\overline{PQ}$ and river $\overline{QR}$ cross, effectively switching their positions!

<div class="figrow">
    <figure>
        <img style="max-width: 400px;" src="/assets/posts/erm-01-introduction/7'-erm-fixed.svg">
        <figcaption>Fixing the map with overlapping rivers. There's a peninsula between river $\overline{QR}$ and $\overline{RS}$ but it's not drawn
        to avoid confusion.</figcaption>
    </figure>
    <figure>
        <img style="max-width: 400px;" src="/assets/posts/erm-01-introduction/7'-erm-fixed-labelled.svg">
        <figcaption>Fixing the map with a new lake.</figcaption>
    </figure>
</div>

This river-switching technique is basically my favorite way to get around peninsula constraints. You add a (backside) lake that eats up a concavity-forming river,
and then the river that it spits out *is* allowed to touch the other concavity-forming river. (And yes, the river overlap must become one big lake because there is absolutely
no agreement on crease direction.) You can even make a nice sparse crease pattern since the peninsula (not drawn) is nice and wide, but let's leave that as an exercise.[^unfair]

In the case where the rivers cross instead of simply overlapping, you do have to be careful about correspondences. In the diagram above that uses a backside lake, note that
$O'$ and $O$ map to the same point, and $R'$ and $R$ map to the same point. When river $\overline{QR}$ "crosses" $\overline{PQ}$, the result is a backside lake that
then spits out new rivers $\overline{O'R'}$ (*not* $\overline{PQ}$) and $\overline{O'P}$ (*not* $\overline{QR}$). This is important because of the rule that rivers must go
to either the sea or a lake edge that ends up in the same position as the one it came out of.

In summary, if two rivers form a *convexity*, you can make them overlap a bit (or even have them cross), but it forces lakes to appear.

### Other Geography

Mu-Tsun Tsai mentions some other terms in their blog post about ERM, so let's go over them quickly.
* *Waterfalls*. Those are just a representation convenience for overlapping rivers (I prefer to show the overlap or draw lakes instead.)
* *Swamps*. Those are just a representation convenience for split backside lakes. (I haven't gotten into a situation where I needed
to draw a swamp yet. Probably because I usually just use rectangles.
I'd probably just math out the backside lakes and draw them because I like to see where the rivers are flowing for crease pattern creation purposes.)

If I had to solve Mu-Tsun Tsai's swamp puzzle, I'd probably do it something like this:

<div class="figrow">
    <figure>
        <img style="max-width: 260px;" src="/assets/posts/erm-01-introduction/swamp-puzzle-abstraction.svg">
        <figcaption>The swamp puzzle abstraction. The puzzle is to pack this in an 8×8 grid.</figcaption>
    </figure>
    <figure>
        <img style="max-width: 260px;" src="/assets/posts/erm-01-introduction/swamp-puzzle-1.svg">
        <figcaption>Let's just plop in the backside lake for now and fill in what we can.</figcaption>
    </figure>
    <figure>
        <img style="max-width: 260px;" src="/assets/posts/erm-01-introduction/swamp-puzzle-2.svg">
        <figcaption>The backside lake eats up too much space, but if we split it and rotate it just right, it works out.</figcaption>
    </figure>
</div>

Then from there, I'd probably figure out how that river overlap turns into lakes, and then draw a crease pattern.

### Theory Summary

So, now you're ready to start packing with ERM! (on a more theoretical level):
1. Come up with an abstraction. Keep in mind that waffle walls are inevitable if there's an internal point that must be winded more than 360° around.
2. Pack the abstraction into a map, forming lakes.
3. Send a river from each lake edge and make sure it goes to the sea or to a lake edge that will end up in the same place.
4. *If two rivers form a concavity, make sure there's space between them. Use a peninsula as a reminder.*
5. If two rivers form a convexity, they can intersect as long as distance constraints are still satisfied. If they cross, beware the river mapping!
6. Calculate the lakes for river overlaps.
7. ??? (draw a crease pattern)
8. Profit!

## Drawing a (Finite!) Crease Pattern

After you've worked long and hard creating that ERM map, you still need to fold it. I'll talk about this briefly.
1. Discretize the ERM map, because you're not getting smooth circle rivers
with a finite number of folds. This can be done by sharpening the circles at specific places called *ridge line*. In box pleating, for example, rivers turn 90°
at a time, except at Pythagorean stretches.
2. Fill each land with belts (rivers that just loop on themselves)
3. Fill in the rivers with parallel creases alternating mountain and valley[^alternating], like in axial design.
4. Add in the missing creases. (This is the hard step, and requires some crease manipulation. If a situation looks impossible, it could be because you forgot to separate concavity
rivers with a peninsula.)

<div class="figrow">
    <figure>
        <img style="max-width: 400px;" src="/assets/posts/erm-01-introduction/7-erm-fixed-2.svg">
        <figcaption>An ideal ERM map.</figcaption>
    </figure>
    <figure>
        <img style="max-width: 400px;" src="/assets/posts/erm-01-introduction/7-erm-discretized.svg">
        <figcaption>Discretizing the map so that it can be folded with a finite number of creases. Thin white lines are ridge lines.</figcaption>
    </figure>
</div>

## The End

Well, that's all for now. Next time I'll probably talk about the special case of box pleating, especially when the abstraction consists of just rectangles.

<!--
To discuss it, we'll first
talk about *box-pleated rectangle ERM*, where we derive useful rules and then try to generalize it.

## Box-Pleated Rectangle ERM

Box-Pleated Rectangle ERM is the special case where the target shape is made entirely of rectangles, each with positive integer width and height. It is (I think) the
simplest-to-understand case of ERM, so we will discuss it first.

Suppose you want to make a target shape, say, the one below:
<figure>
    <img style="max-width: 400px;" src="/assets/posts/erm-01-introduction/T-folded.svg">
    <figcaption>The folded state</figcaption>
</figure>


It comes from thinking about what happens
when you draw lines through all layers in the folded state and then unfold the pattern. To illustrate this, consider the following crease pattern.

<div class="figrow">
    <figure>
        {% fold %} <img style="max-width: 300px;" src="/assets/posts/erm-01-introduction/T.fold"> {% endfold %}
        <figcaption>The crease pattern</figcaption>
    </figure>
    <figure>
        <img style="max-width: 400px;" src="/assets/posts/erm-01-introduction/T-folded.svg">
        <figcaption>The folded state</figcaption>
    </figure>
</div>

First, let's draw horizontal lines in the folded state and see what happens.

<div class="figrow">
    <figure>
        <img style="max-width: 400px;" src="/assets/posts/erm-01-introduction/T-x-folded.svg">
        <figcaption>The folded state, with horizontal lines drawn through all layers</figcaption>
    </figure>
    <figure>
        <img style="max-width: 400px;" src="/assets/posts/erm-01-introduction/T-x.svg">
        <figcaption>Unfolding it</figcaption>
    </figure>
</div>
-->

[^is]: there was
[^belt]: I like to affectionately call a river that completes a loop without crossing the paper boundary a *belt*.
[^fat]: I almost wanted to call it a *fat tree* instead because it still needs to be a tree (in a sense), just with thickness.
[^nml]: If it were up to me I'd call it a *buffer zone*. *Peninsula* is a weird name for something that usually ends up being an island.
[^3d]: I had to manually figure out the angles and such here with the help of Blender. Wouldn't it be cool if we had something like Oriedita, but 3D?
[^waffle]: To see why, assume that every point on the paper ends up on the abstraction with a finite number of creases, and that every point on the abstraction is mapped to. Also assume that the paper boundary gets mapped to a closed curve around abstraction point $P$ and has winding number 1 around $P$. (Otherwise you can cheat by [strip folding](https://erikdemaine.org/papers/CGTA2000/paper.pdf). Also, I wanted to avoid using the word [Fréchet distance](https://en.wikipedia.org/wiki/Fr%C3%A9chet_distance) because it can be arbitrarily big since the paper is allowed to back up.) Now consider the set $\mathcal{P}$ of paper points that map to abstraction point $P$ (the 540° vertex). $\mathcal{P}$ must be finite, because there are only finitely many creases (and thus faces between them), and each face between creases can contain only one paper point mapping to $P$. The angle around each point in $\mathcal{P}$ is 360°, so no point in $\mathcal{P}$ can cover all 540° of $P$ by itself. Since it is impossible to wind around point $P$ without leaving the abstraction or going through all 540°, the winding number of the neighborhood of each point in $\mathcal{P}$ around $P$ is 0. Now take the convex hull of all the points in $\mathcal{P}$ (which has winding number 1 around $P$), and shrink that hull until there are no more points in $\mathcal{P}$ inside it. Every time you cross a point $x$ in $\mathcal{P}$, the winding number stays the same (that is, 1), because the neighborhood of $x$ has winding number 0. But now you have a region with winding number 1 around $P$ and no points that map to $P$, which means you cut the paper, a contradiction! (Note: if $\mathcal{P}$ was infinite, you could have an infinite number of $\mathcal{P}$ crossing events and never get to that contradiction.)
[^waffle-2]: This escapes the proof because the 540° vertex in the 3-flap is structured in such a way that you can wind around it and *skip* some faces without leaving the abstraction.  For example, if the faces are ordered $F$, $G$, $H$, $I$, $J$, $K$, you can go $F\to G\to H\to I\to F$ (360°) without leaving the abstraction.
[^overlap]: First, note that $P_1$ on the paper maps to $P$ in the abstraction, $Q_1$ and $Q_2$ both map to $Q$, and $R_1$ maps to $R$. $\triangle P_1Q_1R_1$ is congruent to $\triangle PQR$, so no creases are allowed through it. Similarly, no creases are allowed through $\triangle P_1Q_2R_1$. Since $Q_1$ and $Q_2$ map to the same point, there must be a crease on the perpendicular bisector of $\overline{Q_1Q_2}$, which happens to be right between $\triangle P_1Q_1R_1$ and $\triangle P_1Q_2R_1$. Thus, we get the lakes.
[^diagrammers]: Well, I don't think there's that many, especially ones that use overlapping rivers
[^push]: Well, technically you could, but it makes things inconvenient, and you either get a narrow peninsula or lots of lakes.
[^unfair]: I guess it's an unfair exercise, since I didn't explain how to turn an ERM map into a crease pattern.
[^alternating]: They technically don't need to alternate, but if you don't know what you're doing you'll run into self-intersection hell.
[^handwave]: This proof is a little handwavy (specifically the assumption that $P'$ and $R'$ must be separated perpendicularly to their respective segments) because of
potential diagonal creases, but I haven't found a good rigorous way to do it.