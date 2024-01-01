---
layout: hunt-solution
page-type: hunt-solution
hunt: Fractallia
place: Campfire Coral Circle
banner-offset: -50px
title: S'more Logic, Please
answer: RULES
---
This seems like a simple Einstein logic puzzle. However, it asks for a whole history instead of just one state.
Let's go through the clues.

* **No Double S’mores**: At no point in time does anyone have at least 2 s’mores.
* **No Multitasking**: No one eats and makes a s’more in the same minute.

These ensure that everyone has 0 or 1 s'mores, and that if someone had a s'more for a minute and a s'more for the next one,
they have it continuously. With that in mind, now for the specific clues.

We will represent each person with a column whose header is the first letter of their name, and that contains their
s'more history: 0 if without s'more, and 1 if with s'more.

* **The S’more Eating Party (SEP)**: At some minute in the future, everyone with a s’more will eat it.

<div class="smore-logic-grid">
{% grid page.dir | append: "../smore-logic-grid.rb" | relative_url %}
{% prop text asc %}
ABCDEFGH
????????
-
????????
00000000
????????
-
{% endprop %}
{% endgrid %}
</div>
<br>

* **Alice Inspires Bob**: Whenever Alice has a s’more, Bob has one as well.
* **Bob Disgusts Alice**: Whenever Bob has a s’more, Alice doesn’t have one.

We can conclude that Alice never has a s'more.

<div class="smore-logic-grid">
{% grid page.dir | append: "../smore-logic-grid.rb" | relative_url %}
{% prop text asc %}
ABCDEFGH
0???????
-
0???????
00000000
0???????
-
{% endprop %}
{% endgrid %}
</div>
<br>

* **The SEP is Final**: Whenever no one has any s’mores, no one will ever make any more.

The entire state after the row of 0's is now known to be all people no s'mores. We will abbreviate it.

<div class="smore-logic-grid">
{% grid page.dir | append: "../smore-logic-grid.rb" | relative_url %}
{% prop text asc %}
ABCDEFGH
0???????
-
0???????
00000000
{% endprop %}
{% endgrid %}
</div>
<br>

* **Charlie Saves the Sweets**: Charlie will make a s’more at the next minute and save it for the SEP.

Remember that no one makes and eats a s'more in the same minute, so this gives Charlie's state in both the first and second minutes.

<div class="smore-logic-grid">
{% grid page.dir | append: "../smore-logic-grid.rb" | relative_url %}
{% prop text asc %}
ABCDEFGH
0?0?????
0?1?????
-
0?1?????
00000000
{% endprop %}
{% endgrid %}
</div>
<br>

* **Gabriel Procrastinates for the SEP**: Gabriel will eat her s’more at the next minute. Then the one and only minute where Gabriel and Charlie will both have a s’more is the one before the SEP.

<div class="smore-logic-grid">
{% grid page.dir | append: "../smore-logic-grid.rb" | relative_url %}
{% prop text asc %}
ABCDEFGH
0?0???1?
0?1???0?
-
0?1???0?
0?1???1?
00000000
{% endprop %}
{% endgrid %}
</div>
<br>

* **Gabriel Doubles on Bob**: Bob has a s’more until Gabriel eats her 2nd one.

Now we have Bob, Charlie, and Gabriel fully determined except for the time until the SEP.

<div class="smore-logic-grid">
{% grid page.dir | append: "../smore-logic-grid.rb" | relative_url %}
{% prop text asc %}
ABCDEFGH
010???1?
011???0?
-
011???0?
011???1?
00000000
{% endprop %}
{% endgrid %}
</div>
<br>

* **Frank & Gabriel Share**: Frank and Gabriel combined have exactly 1 s’more until the SEP.

<div class="smore-logic-grid">
{% grid page.dir | append: "../smore-logic-grid.rb" | relative_url %}
{% prop text asc %}
ABCDEFGH
010??01?
011??10?
-
011??10?
011??01?
00000000
{% endprop %}
{% endgrid %}
</div>
<br>

* **Hans Inspires Charlie**: Whenever Hans has a s’more, Charlie has one as well.

This gives just a single value, but hey, a single value can change things.

<div class="smore-logic-grid">
{% grid page.dir | append: "../smore-logic-grid.rb" | relative_url %}
{% prop text asc %}
ABCDEFGH
010??010
011??10?
-
011??10?
011??01?
00000000
{% endprop %}
{% endgrid %}
</div>
<br>

* **Davis Convinces Elizabeth**: Davis has a s’more until Elizabeth has one.
* **The HEC Even S’more**: Hans, Elizabeth, and Charlie combined always have exactly 0 or 2 s’mores.

We go back to a skipped clue now that we can use it a bit.

<div class="smore-logic-grid">
{% grid page.dir | append: "../smore-logic-grid.rb" | relative_url %}
{% prop text asc %}
ABCDEFGH
01010010
011??10?
-
011??10?
011??01?
00000000
{% endprop %}
{% endgrid %}
</div>
<br>

* **Elizabeth Is Disgusted**: Whenever Elizabeth has a s’more, she eats it at the next minute and never makes any more.
* **Frank Trolls Elizabeth**: Whenever Frank has a s’more for 3 minutes in a row, Elizabeth has a s’more on the 2nd of those minutes.

These clues, combined with the information we have, show that there are at most 5 minutes before the SEP.
Otherwise, Frank would have a s'more for more than 3 minutes in a row, forcing Elizabeth to have a s'more on consecutive minutes.

* **Hans’s 2 S’mores**: Hans will eat a total of 2 s’mores.
* **The HEC Even S’more**: Hans, Elizabeth, and Charlie combined always have exactly 0 or 2 s’mores.
* **Elizabeth Temporarily Disgusts Davis**: Whenever Elizabeth makes a s’more, Davis won’t have a s’more at the next minute.
* **The SEP is a Party of 5**: During the SEP, 5 people eat s’mores.

These clues, combined with our information, show that there are exactly 5 minutes before the SEP. If there were only 4,
then Han's sequence would have to be `0101`, forcing Elizabeth's sequence to be `0010` by parity (since Charlie always has a s'more
after the first minute (before the SEP, of course)). This forces Davis to not have a s'more in the 4th minute, causing only
4 people to have s'mores in the minute before the SEP, a contradiction.

<div class="smore-logic-grid">
{% grid page.dir | append: "../smore-logic-grid.rb" | relative_url %}
{% prop text asc %}
ABCDEFGH
01010010
011??10?
011??10?
011??10?
011??01?
00000000
{% endprop %}
{% endgrid %}
</div>
<br>

Let's fill in the information we get from the clues we just listed:

<div class="smore-logic-grid">
{% grid page.dir | append: "../smore-logic-grid.rb" | relative_url %}
{% prop text asc %}
ABCDEFGH
01010010
01110101
011?1100
01100101
01110011
00000000
{% endprop %}
{% endgrid %}
</div>
<br>

* **Davis’s & Hans’s S’more**: There is exactly 1 minute before the SEP where neither Davis nor Hans has a s’more.

Last clue, last value.

<div class="smore-logic-grid">
{% grid page.dir | append: "../smore-logic-grid.rb" | relative_url %}
{% prop text asc %}
ABCDEFGH
01010010
01110101
01101100
01100101
01110011
00000000
{% endprop %}
{% endgrid %}
</div>
<br>

If we read the rows, they spell letters in ASCII, and the give `Rules`, terminated by a NUL character for good measure.
So the answer is `RULES`.

<img class="center-img" src="../rules.svg"/>