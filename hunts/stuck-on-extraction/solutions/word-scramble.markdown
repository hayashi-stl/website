---
layout: hunt-solution
page-type: hunt-solution
hunt: Stuck on Extraction
title: Word Scramble
answer: PERMUTATORIAL EXPLOSION
---
Given the title of the puzzle and the phrases <span class="puzzle-flavor">calm clam</span> and
<span class="puzzle-flavor">post stop</span> in the flavor text,
we can tell that this puzzle has something to do with anagramming.

First, we solve the clues. Incidentally, I've shown some serious mercy with how unambiguous most of them are.
<div style="display: flex; justify-content: center;">
    <div>
        <div style="text-align: center;">{{ "**From**" | markdownify }}</div>
<div markdown="1">

* HANS
* BAKE
* RAGE
* ONCE
* SEAM
* OPUS
* MAZE
* ALUM
* FILE
* DISK
* RACE
* UTAH
* FOAL
* TRIO
* SUEZ
* TIDE
* TUNI
* DONE
* LEAF
* SLOT
* SALT
* NEAT
</div>
    </div>
    <div>
        <div style="text-align: center;">{{ "**To**" | markdownify }}</div>
<div markdown="1">

* LAST
* SKID
* BEAK
* GEAR
* NASH
* ZEUS
* MAZE
* FLEA
* ANTE
* DIET
* ACRE
* SOUP
* LOST
* CONE
* TORI
* OLAF
* MESA
* UINT
* UTAH
* NODE
* LIFE
* MAUL
</div>
    </div>
</div>

We notice that the words in the **To** column are anagrams of the words in the **From** column.
Given that the clues of the **To** column were in alphabetical order, the ones in the **From** column
contain the order that matters. So we rearrange the **To** column:

<div style="display: flex; justify-content: center;">
    <div>
        <div style="text-align: center;">{{ "**From**" | markdownify }}</div>
<div markdown="1">

* HANS
* BAKE
* RAGE
* ONCE
* SEAM
* OPUS
* MAZE
* ALUM
* FILE
* DISK
* RACE
* UTAH
* FOAL
* TRIO
* SUEZ
* TIDE
* TUNI
* DONE
* LEAF
* SLOT
* SALT
* NEAT
</div>
    </div>
    <div>
        <div style="text-align: center;">{{ "**To**" | markdownify }}</div>
<div markdown="1">

* NASH
* BEAK
* GEAR
* CONE
* MESA
* SOUP
* MAZE
* MAUL
* LIFE
* SKID
* ACRE
* UTAH
* OLAF
* TORI
* ZEUS
* DIET
* UINT
* NODE
* FLEA
* LOST
* LAST
* ANTE
</div>
    </div>
</div>

If we get **Stuck On Extraction**™, we would solve "The Chess Fairy" first, which would give us
`COMBINE PERMUTATIONS` along with the elaboration that allows us to perform the following extraction:

<div style="display: flex; justify-content: center;">
    <div>
        <div style="text-align: center;">{{ "**Permutation**" | markdownify }}</div>
<div markdown="1">

* 3241
* 1423
* 3421
* 3124
* 4213
* 4132
* 1234
* 4132
* 3214
* 3421
* 2314
* 1234
* 2431
* 1423
* 4321
* 3241
* 2431
* 3214
* 4123
* 2314
* 3214
* 3142
</div>
    </div>
    <div style="width: 15px;"></div>
    <div>
        <div style="text-align: center;">{{ "**Letter**" | markdownify }}</div>
<div markdown="1">

* P
* E
* R
* M
* U
* T
* A
* T
* O
* R
* I
* A
* L
* E
* X
* P
* L
* O
* S
* I
* O
* N
</div>
    </div>
</div>

So the answer is `PERMUTATORIAL EXPLOSION`.

### Notes:

Perhaps I should have chosen a less reasonable extraction method, as one out of three teams managed to figure
out the method without solving a different puzzle first. Also, maybe the clues were a little too merciful.
