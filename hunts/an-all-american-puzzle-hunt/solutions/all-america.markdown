---
layout: hunt-solution
page-type: hunt-solution
metapuzzle: true
hunt: An All-American Puzzle Hunt
title: "Meta: All America"
answer: EACH STATE HAS ITS QUIRKS, EVEN THE POLYGON STATES IN THE WEST
---
First, we notice that each answer has an even length. We can put the answers into $$n$$×2 boxes as clued by the mess of boxes in the puzzle.

<div class="boxes">
<div class="raw-grid" style="font-family: monospace;">
{% grid "/assets/raw-grid.rb" | relative_url %}
{% prop text asc %}
AMOUNTWONA
MOTORCYCLE
{% endprop %}
{% endgrid %}
</div>
<div class="raw-grid" style="font-family: monospace;">
{% grid "/assets/raw-grid.rb" | relative_url %}
{% prop text asc %}
CRAZIEST
SARAHBAN
{% endprop %}
{% endgrid %}
</div>
<div class="raw-grid" style="font-family: monospace;">
{% grid "/assets/raw-grid.rb" | relative_url %}
{% prop text asc %}
DOCKSTO
NUNAVUT
{% endprop %}
{% endgrid %}
</div>
<div class="raw-grid" style="font-family: monospace;">
{% grid "/assets/raw-grid.rb" | relative_url %}
{% prop text asc %}
FLYNNDIDA
NARMYEXIT
{% endprop %}
{% endgrid %}
</div>
<div class="raw-grid" style="font-family: monospace;">
{% grid "/assets/raw-grid.rb" | relative_url %}
{% prop text asc %}
ITWAVED
AVICTIM
{% endprop %}
{% endgrid %}
</div>
<div class="raw-grid" style="font-family: monospace;">
{% grid "/assets/raw-grid.rb" | relative_url %}
{% prop text asc %}
LIVEINWARM
FLAMMABLES
{% endprop %}
{% endgrid %}
</div>
<div class="raw-grid" style="font-family: monospace;">
{% grid "/assets/raw-grid.rb" | relative_url %}
{% prop text asc %}
MTVVIDEOIN
TOWNISSKEW
{% endprop %}
{% endgrid %}
</div>
<div class="raw-grid" style="font-family: monospace;">
{% grid "/assets/raw-grid.rb" | relative_url %}
{% prop text asc %}
NOSNOW
JOKERS
{% endprop %}
{% endgrid %}
</div>
<div class="raw-grid" style="font-family: monospace;">
{% grid "/assets/raw-grid.rb" | relative_url %}
{% prop text asc %}
NOTRIAL
MIXINGS
{% endprop %}
{% endgrid %}
</div>
<div></div>
<div class="raw-grid" style="font-family: monospace;">
{% grid "/assets/raw-grid.rb" | relative_url %}
{% prop text asc %}
OWLTHANK
SATROPHY
{% endprop %}
{% endgrid %}
</div>
</div>
<br>

Now we fit these boxes into the really long box (which we will call a "flag" from now on).
We may notice that some of the columns in the boxes
form state abbreviations. This is clued by the flavor text that says
<span class="puzzle-flavor">The American flag is a well-known symbol for what America and all its states represent.</span>
The flavor text goes on to say what the colors on the flag mean. We can gather that blue columns should be state abbreviations,
red columns should be reversed state abbreviations, and white columns can be whatever.
Given these constraints, we can fit the boxes.

<div class="american-grid">
{% grid page.dir | append: "../american-grid.rb" | relative_url %}
{% prop bg asc %}
 b.rr.r.b..rbbrr.._
 b.rr.r.b..rbbrr.. 

-b.bb.brb.rr.rr.r._
 b.bb.brb.rr.rr.r. 

-.b..rrbbr.bbbr.b._
 .b..rrbbr.bbbr.b. 

-rbb.rr.rr..brb..._
 rbb.rr.rr..brb... 

-rbr...b.bbb.r.
 rbr...b.bbb.r.
{% endprop %}
{% prop text asc %}
 MTVVIDEOINLIVEINW 
 TOWNISSKEWFLAMMAB 

 ARMITWAVEDDOCKSTO 
 LESAVICTIMNUNAVUT 

 OWLTHANKNOTRIALNO 
 SATROPHYMIXINGSJO 

 SNOWCRAZIESTAMOUN 
 KERSSARAHBANMOTOR 

 TWONAFLYNNDIDA
 CYCLENARMYEXIT
{% endprop %}
{% endgrid %}
</div>
<br>

This gives an ordering on the states: Montana, West Virginia, Nevada, ..., New York, Delaware, Idaho.
We look at each state on the map and "elect" the letter corresponding to its background color on the flag.
This gives `EACH STATE HAS ITS QUIRKS, EVEN THE POLYGON STATES IN THE WEST`

### Notes
If you were wondering why the answers to the puzzles were a bit weird, this is why. This metapuzzle is very constrained,
as I had to find phrases that make the flag possible without too many white columns. In addition, this puzzle
used to have a Vigenère cipher at the end instead of a letter election, which I thought was inelegant (the cipher, not the election),
but couldn't think of something better at the time.