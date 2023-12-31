---
layout: hunt-solution
page-type: hunt-solution
hunt: Fractallia
place: Digging Ring
title: Multidimensional Whack-a-Mole
answer: START DIGIT
---
<p class="puzzle-flavor">
It's a <b>cross</b> between two puzzles!
</p>

<p class="center-text">Here are the patterns to notice:</p>

<div class="multid-grid">
<div markdown="1">

When the scale factor changes by a factor of $$k$$, the hypervolume (generalization of length, area, volume) changes by a factor of $$f = k^d$$, where $d$ is the number of dimensions. So the number of dimensions is $$\log_k f$$.
</div>

<div markdown="1">

When a mole is whacked, all neighboring holes toggle whether they have a mole or not.
</div>
</div>

<h3 class="center-text">The real deal</h3>

<div class="multid-grid">
<div class="center-text">Now we calculate the number of dimensions of these fractals.</div>
<div class="center-text">Now we find out the optimal number of moves needed. (Moves indicated are with respect to all legal moves, not all spaces)</div>
<div markdown="1">

### A SNAKE

Number of dimensions = $$\log_4 8$$ = <ht>1</ht>.5
</div>
<div>

<h3>DOWN ARROW</h3>
<ht>2</ht> moves (middle, bottom)
</div>
<div markdown="1">

### DOTTED X

Number of dimensions = $$\log_3 5$$ = 1.464<ht>9</ht>7...
</div>
<div>

<h3>TRIAMOND</h3>
<ht>4</ht> moves (only, bottom, left, left)
</div>
<div markdown="1">

### TETRA HOLE

Number of dimensions = $$\log_5 21$$ = 1.8916681<ht>4</ht>9...
</div>
<div>

<h3>LONG LINE</h3>
<ht>5</ht> moves (only, right, right, right, 4th-from-left)
</div>
<div markdown="1">

### BIG STARFLAKE

Number of dimensions = $$\log_3 4$$ = 1.261<ht>8</ht>5...
</div>
<div>

<h3>NUMBER SIX</h3>
<ht>7</ht> moves (only, only, left, bottom, bottom, left-middle, bottom)
</div>
<div markdown="1">

### FRACTAL TRIGON

Number of dimensions: $$\log_2 3$$ = 1.584<ht>9</ht>6...
</div>
<div>

<h3>CURVED ART</h3>
<ht>8</ht> moves (left, only, middle, bottom-right, middle, top, top-left, top)
</div>
</div>

We may notice that the names of the puzzles are weird. Perhaps we should index the numbers into the names. But the flavor text
says something about "cross". So we cross-index into the puzzle name on the opposite side (e.g. index 1 into DOWN ARROW and 2 into A SNAKE).
This gives `START` on the left column and `DIGIT` on the right column. So the answer is `START DIGIT`.