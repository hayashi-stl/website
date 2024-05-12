---
layout: post
page-type: post
title:  "U.S.-State-Shaped Cookie Cutters"
date:   2024-05-10 13:37:00 -0700
tags: making fabrication
---
A while ago, I got inspired by some Nevada-shaped cookie cutters I was shown and decided to make cookie cutters for all 50 states. In proportion. That means a giant Alaska-shaped cookie cutter and a tiny Rhode Island-shaped cookie cutter. I decided to make them out of acrylic using a laser cutter (in other words, a *cookie cutter cutter*).

# Design

All the designing happend in Inkscape.

First, I found a nice vector graphics map of the United States, with each state as its own path (from Wikipedia):
<div class="figrow">
    <figure>
        <a href="{{ '/assets/posts/state-cutters/us-map.svg' | relative_url}}">
        <img class="center-img" width="400" src="{{ '/assets/posts/state-cutters/us-map.svg' | relative_url}}"
            alt="United States SVG"/>
        </a>
        <figcaption>An SVG map of the United States (Click to enlarge)</figcaption>
    </figure>
</div>
Now, it would have been wise to simplify the map a little bit, perhaps remove the tiny islands, but in my infinite wisdom, I decided to keep the complexity. Oh well.

So, a laser-cut cookie cutter comes in 2 parts: the actual cutter, and the scaffolding used to hold the cutter in place.
<div class="figrow">
    <figure>
        <img class="center-img" src="{{ '/assets/posts/state-cutters/example-cutter.svg' | relative_url}}"
            alt="Cookie Cutter Blade"/>
        <figcaption>Blade. Note that it's backwards (explained later).</figcaption>
    </figure>
    <figure>
        <img class="center-img" src="{{ '/assets/posts/state-cutters/example-scaffold.svg' | relative_url}}"
            alt="Cookie Cutter Scaffold"/>
        <figcaption>Scaffold. Pink areas are engraved.</figcaption>
    </figure>
</div>

<div class="figrow">
    <figure>
        <fakecanvas src="{{ '/assets/posts/state-cutters/example-cutter.glb' | relative_url }}"
            alt="Cutter 3D model"></fakecanvas>
        <figcaption>A model of a state cutter. (Drag to move the camera around)</figcaption>
    </figure>
</div>

For the blade, I offset the shape path by 1.25mm and -0.25mm. The latter offset is an attempt to account for the width of the laser in the laser cutter. When preparing the blades to be laser cut, I flipped them so that the side that touches the cookie dough is narrower than the side that touches the scaffold. The way laser cutters work, the cut at the top is wider than the cut at the bottom, which is perfect for making a blade.
<div class="figrow">
    <figure>
        <img class="center-img" src="{{ '/assets/posts/state-cutters/blade-offset.svg' | relative_url}}"
            alt="Blade offsets"/>
        <figcaption>The offsets used for the blade, in milimeters.</figcaption>
    </figure>
    <figure>
        <img class="center-img" src="{{ '/assets/posts/state-cutters/cut-cone.svg' | relative_url}}"
            alt="Laser cutter diagram"/>
        <figcaption>The cut is wider at the top than the bottom.</figcaption>
    </figure>
</div>

Then came the scaffolding. The part that the blade attaches to is designed similarly to the blade. It uses offsets of 9.75mm and -0.25mm. There is an engraving that makes a nice pocket for the blade to fit into. Its offsets are 1.375mm and -0.375mm.
<div class="figrow">
    <figure>
        <img class="center-img" src="{{ '/assets/posts/state-cutters/scaffold-offset.svg' | relative_url}}"
            alt="Scaffold offsets"/>
        <figcaption>The offsets used for the scaffold, in milimeters. Not to scale.</figcaption>
    </figure>
</div>

TODO: Cite source

<script type="module" src="{{ '/assets/posts/state-cutters/render.js' | relative_url }}"></script>