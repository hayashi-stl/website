---
layout: hunt-puzzle
page-type: hunt-puzzle
hunt: Fractallia
place: Campfire Coral Circle
banner-offset: -50px
title: S'more Logic, Please
answer: RULES
---
<followup>
<div class="center-text">You got the Rules!</div>
<img class="center-img" src="../rules.svg"/>
</followup>

<p class="puzzle-flavor">
After zooming in, you find Alice, Bob, Charlie, Davis, Elizabeth, Frank, Gabriel, and Hans around a campfire with some
s’more ingredients. Some of them currently have s’mores. You find out that they measure time in a very very obscure unit called
the minute. “A letter for each minute” is the motto. Whenever they make or eat s’mores, they do so only at the
beginning of a minute. It is currently just past the beginning of the first minute, and you find a time-traveller from a
point in time infinitely far in the future. He’s able to say how this s’more gathering went from the current point in time
(and thus not including the making or eating of any s’mores in the first minute, but including who has a s’more in the
first minute). You want to know this information, and ask. He simply gives you clues:
</p>

<div class="somewhat-spaced-list" markdown="1">

* **No Double S’mores**: At no point in time does anyone have at least 2 s’mores.
* **No Multitasking**: No one eats and makes a s’more in the same minute.
</div>

<br>

<div class="somewhat-spaced-list" markdown="1">

* **The S’more Eating Party (SEP)**: At some minute in the future, everyone with a s’more will eat it.
* **Alice Inspires Bob**: Whenever Alice has a s’more, Bob has one as well.
* **Bob Disgusts Alice**: Whenever Bob has a s’more, Alice doesn’t have one.
* **Hans’s 2 S’mores**: Hans will eat a total of 2 s’mores.
* **The SEP is Final**: Whenever no one has any s’mores, no one will ever make any more.
* **Elizabeth Is Disgusted**: Whenever Elizabeth has a s’more, she eats it at the next minute and never makes any more.
* **Charlie Saves the Sweets**: Charlie will make a s’more at the next minute and save it for the SEP.
* **Gabriel Procrastinates for the SEP**: Gabriel will eat her s’more at the next minute. Then the one and only minute where Gabriel and Charlie will both have a s’more is the one before the SEP.
* **Davis Convinces Elizabeth**: Davis has a s’more until Elizabeth has one.
* **Gabriel Doubles on Bob**: Bob has a s’more until Gabriel eats her 2nd one.
* **Frank & Gabriel Share**: Frank and Gabriel combined have exactly 1 s’more until the SEP.
* **Hans Inspires Charlie**: Whenever Hans has a s’more, Charlie has one as well.
* **Davis’s & Hans’s S’more**: There is exactly 1 minute before the SEP where neither Davis nor Hans has a s’more.
* **The HEC Even S’more**: Hans, Elizabeth, and Charlie combined always have exactly 0 or 2 s’mores.
* **Frank Trolls Elizabeth**: Whenever Frank has a s’more for 3 minutes in a row, Elizabeth has a s’more on the 2nd of those minutes.
* **The SEP is a Party of 5**: During the SEP, 5 people eat s’mores.
* **Elizabeth Temporarily Disgusts Davis**: Whenever Elizabeth makes a s’more, Davis won’t have a s’more at the next minute.
</div>

(A clarification: *x until y* means that x is true for each minute before the first one where y is true, and that y becomes
true at some point. It does not require x to become false when y becomes true. *Whenever x, y* does not require x to ever become true.)