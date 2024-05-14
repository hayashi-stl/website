---
layout: post
page-type: post
title:  "U.S.-State-Shaped Cookie Cutters"
date:   2024-05-13 20:32:00 -0700
tags: making fabrication
---
A while ago, I got inspired by some Nevada-shaped cookie cutters I was shown and decided to make cookie cutters for all 50 states. In proportion. That means a giant Alaska-shaped cookie cutter and a tiny Rhode Island-shaped cookie cutter. I decided to make them out of acrylic using a laser cutter (in other words, a *cookie cutter cutter*).

# Design

All the designing happened in Inkscape. The designing process was inspired by [this webpage](https://outfab.com/blogs/project-ideas/cookie-cutter-cookie-stamp).

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

And here's a 3D model of the cutter put together for reference.
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

To prepare the handle notches, for each state, I manually placed a line segment crossing the state, and at each endpoint, a 17mm line segment centered at the endpoint and roughly aligned with the boundary of the state.
<div class="figrow">
    <figure>
        <img class="center-img" src="{{ '/assets/posts/state-cutters/handlebar.svg' | relative_url}}"
            alt="Example handlebar"/>
        <figcaption>An example of a manually-placed handlebar.</figcaption>
    </figure>
</div>

Then using a script, I added the notches as shown in the diagram below.
<div class="figrow">
    <figure>
        <img class="center-img" src="{{ '/assets/posts/state-cutters/notches.svg' | relative_url}}"
            alt="Example notches"/>
        <figcaption>The design of the notches in the part of the scaffold attached to the blade. Note that the red lines are <i>not</i> parallel because the 1.5mm adjustments done on each side of the handle are not necessarily reflections of each other.</figcaption>
    </figure>
</div>
This changed the handlebar slightly, and the new measurements will get used later, so they are also shown.
<div class="figrow">
    <figure>
        <img class="center-img" src="{{ '/assets/posts/state-cutters/measured-handlebar.svg' | relative_url}}"
            alt="Adjusted handlebar with labels"/>
        <figcaption>The adjusted handlebar with labels.</figcaption>
    </figure>
</div>

Then came the handle and the handle ends. Some trigonometry was needed. This is also where some identifying engraving goes.
<div class="figrow">
    <figure>
        <img class="center-img" src="{{ '/assets/posts/state-cutters/handle-end.svg' | relative_url}}"
            alt="Example handle end"/>
        <figcaption>The measurements of a handle end. $$\theta$$ is either $$\alpha$$ or $$\beta$$ depending on which side of the handle the end goes on.</figcaption>
    </figure>
    <figure>
        <img class="center-img" src="{{ '/assets/posts/state-cutters/handle.svg' | relative_url}}"
            alt="Example handle"/>
        <figcaption>The measurements of a handle.</figcaption>
    </figure>
</div>
<div class="figrow">
    <figure>
        <img class="center-img" src="{{ '/assets/posts/state-cutters/handle-end-engraving.svg' | relative_url}}"
            alt="Example handle end with engraving"/>
        <figcaption>The engraving on the handle end. Shows the state abbreviation and joining-the-Union order. The dot at the bottom is present only in the handle end that goes on the right side of the handle.</figcaption>
    </figure>
    <figure>
        <img class="center-img" src="{{ '/assets/posts/state-cutters/handle-engraving.svg' | relative_url}}"
            alt="Example handle with engraving"/>
        <figcaption>The engraving on the handle. Shows the state name.</figcaption>
    </figure>
</div>

# Production

Now that all the parts are done, I prepared them for laser cutting, which required specific color/width settings for the outlines and engraving. For the specific laser cutter I was using, cutting lines needed their width set to 0.1mm, and engraving areas were separated by color by how many passes I wanted on them. For the blades, 0.25mm tabs were added so the smaller blades wouldn't fall through the laser cutter. For the scaffolding, I set things up so that the engraved area that the blade attaches to is extra deep (2 passes, red) and everything else just gets 1 pass (orange). This resulted in 3 files:
* [The blades]({{ '/assets/posts/state-cutters/us-cutter.pdf' | relative_url}})
* [The scaffolding, part 1]({{ '/assets/posts/state-cutters/us-scaffold-1.pdf' | relative_url}})
* [The scaffolding, part 2]({{ '/assets/posts/state-cutters/us-scaffold-2.pdf' | relative_url}})

These files were made to be cut on 24in×24in acrylic sheets. Everything inside a blue region got cut at the same time. Blades were cut with 6mm thick acrylic and all scaffolding components were cut with 3mm thick acrylic.

# Result

Then all that was left was putting them together. I used epoxy for that.[^epoxy] And now for the result:
<div class="figrow">
    <figure>
        <a href="{{ '/assets/posts/state-cutters/all-state-cutters.png' | relative_url}}">
        <img class="center-img" src="{{ '/assets/posts/state-cutters/all-state-cutters.png' | relative_url}}"
            alt="All state cutters"/>
        </a>
        <figcaption>All the state cutters, and DC as a bonus (Click to enlarge)</figcaption>
    </figure>
    <figure>
        <a href="{{ '/assets/posts/state-cutters/new-england-pie.png' | relative_url}}">
        <img class="center-img" width="400" src="{{ '/assets/posts/state-cutters/new-england-pie.png' | relative_url}}"
            alt="New England pumpkin pie"/>
        </a>
        <figcaption>Pumpkin pie with a map of New England on it. Used the state cutters. (Click to enlarge)</figcaption>
    </figure>
</div>
<div class="figrow">
    <figure>
        <a href="{{ '/assets/posts/state-cutters/gingerbread-1.png' | relative_url}}">
        <img class="center-img" width="350" src="{{ '/assets/posts/state-cutters/gingerbread-1.png' | relative_url}}"
            alt="Contiguous 48 state gingerbread cookies"/>
        </a>
        <figcaption>Gingerbread cookies of the contiguous 48 states + DC (Click to enlarge)</figcaption>
    </figure>
    <figure>
        <a href="{{ '/assets/posts/state-cutters/gingerbread-2.png' | relative_url}}">
        <img class="center-img" width="350" src="{{ '/assets/posts/state-cutters/gingerbread-2.png' | relative_url}}"
            alt="Alaska + Hawaii gingerbread cookies"/>
        </a>
        <figcaption>Gingerbread cookies of Alaska and Hawaii (Click to enlarge)</figcaption>
    </figure>
</div>

[^epoxy]: Acrylic glue exists, but epoxy lets me fix mistakes :)

<script type="module" src="{{ '/assets/posts/state-cutters/render.js' | relative_url }}"></script>