---
layout: hunt-solution
page-type: hunt-solution
hunt: Puzzle Tour in the Volcano
metapuzzle: true
title: "Meta: 4 Red Coins on a 15-Piece Puzzle"
answer: TERMINAL LAVA SOUP
---
First, we take the feeders and fit them into the boxes. To determine which answer goes in which box, we look at the
15-puzzle at the bottom and notice that some tiles are lava tiles and some are not. The lava tiles only contain the letters
LAVA. The flavor text says that lava obstructs, so we need to cover half of each feeder with LAVA. The other half must contain
only letters that show up in non-lava tiles. Using this, we get a unique solution:

<div class="lava-grid">
{% grid page.dir | append: "../lava-grid.rb" | relative_url %}
{% prop cell asc %}
     <. 
.... <. 
vvvv <. 
     <. 
 .>     
 .> ^^^^
 .> ....
 .>     
{% endprop %}
{% prop text asc %}
     ML 
LAVA LA 
RAIN IV 
     OA 
 LI     
 AA MORP
 VE LAVA
 AT     
{% endprop %}
{% endgrid %}
</div>
<br>

Now we make these formations in the 15-puzzle. We see in the flavor text that lava illuminates, so we look at the red letters
(not the letters inside the coins) illuminated by the lava to see what word they form. Each word corresponds to one of the input puzzles:

<div class="_4-red-coins-solution-table" markdown="1">

| Puzzle              | Word                  |
| ------------------- | --------------------- |
| The Lava Line       | BATS
| Fighting with Fire  | FUEL
| Red-Hot Cog Rolling | PROM
| Magma Group         | WIND

</div>

We look at the middle diagram with the 4 red coins to see where to place each of these words. When we do, we recreate
the pattern in the 15-puzzle, giving `TERMINAL LAVA SOUP`.