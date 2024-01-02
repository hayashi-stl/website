---
layout: hunt-solution
page-type: hunt-solution
hunt: Puzzle Tour in the Volcano
title-classes: "line-font"
title: THE LAVA LINE
answer: FILAMENT
---
The title and each bold word in the flavor text is made up of straight lines only. When we answer some of the clues,
we notice that the answers consist of straight lines only. So we can constrain all the answers to straight lines only.
We can also count the lines while we're at it. Notice that the font used in the title and flavor text has no serifs on the 'I',
so it just counts as 1 line. This gives:

<ul>
    <li><span class="line-font">ELLEN</span> (15)</li>
    <li><span class="line-font">FAN</span> (9)</li>
    <li><span class="line-font">FELT</span> (11)</li>
    <li><span class="line-font">HEAL</span> (12)</li>
    <li><span class="line-font">INFANT</span> (15)</li>
    <li><span class="line-font">LENTIL</span> (14)</li>
    <li><span class="line-font">LIKE</span> (10)</li>
    <li><span class="line-font">MALL</span> (11)</li>
    <li><span class="line-font">MAZE</span> (14)</li>
    <li><span class="line-font">META</span> (13)</li>
    <li><span class="line-font">MINIM</span> (13)</li>
    <li><span class="line-font">TAIWAN</span> (16)</li>
    <li><span class="line-font">THYME</span> (16)</li>
    <li><span class="line-font">TIFF</span> (9)</li>
    <li><span class="line-font">WAIT</span> (10)</li>
    <li><span class="line-font">ZAZZ</span> (12)</li>
</ul>

We notice that each integer from 9 to 16 occurs twice, giving both a pairing and an order on the pairs:

<ul class="space-every-other">
    <li><span class="line-font">FAN</span> (9)</li>
    <li><span class="line-font">TIFF</span> (9)</li>
    <li><span class="line-font">LIKE</span> (10)</li>
    <li><span class="line-font">WAIT</span> (10)</li>
    <li><span class="line-font">FELT</span> (11)</li>
    <li><span class="line-font">MALL</span> (11)</li>
    <li><span class="line-font">HEAL</span> (12)</li>
    <li><span class="line-font">ZAZZ</span> (12)</li>
    <li><span class="line-font">META</span> (13)</li>
    <li><span class="line-font">MINIM</span> (13)</li>
    <li><span class="line-font">LENTIL</span> (14)</li>
    <li><span class="line-font">MAZE</span> (14)</li>
    <li><span class="line-font">ELLEN</span> (15)</li>
    <li><span class="line-font">INFANT</span> (15)</li>
    <li><span class="line-font">TAIWAN</span> (16)</li>
    <li><span class="line-font">THYME</span> (16)</li>
</ul>

Then we look at what the items in each pair share, as hinted by the flavor text. Each pair has exactly one letter that appears in both words.
Extracting these letters gives `FILAMENT`.