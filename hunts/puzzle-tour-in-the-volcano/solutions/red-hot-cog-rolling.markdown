---
layout: hunt-solution
page-type: hunt-solution
hunt: Puzzle Tour in the Volcano
title: Red-Hot Cog Rolling
answer: MULTICOG
---
First, we figure out the numbers in the clues.

* 1,255,558.3
* 786,000,000
* 13 **vs.** 120
* 100,000,000
* 5 **vs.** 2,048
* 50
* 51,874,024
* 65,535 **vs.** 26

Wow. There are some really big numbers in there! We should size them down. The flavor text says "<span class="puzzle-flavor">on the floor, the log is rolling.</span>". So we should take the floor of the logarithm of these numbers. The number of teeth in each gear being a power of 2 hints at taking the base-2 logarithm specifically. This gives:

* 20
* 29
* 3 **vs.** 6
* 26
* 2 **vs.** 11
* 5
* 25
* 15 **vs.** 4

These are numbers on the gears. Now we look at the corresponding gears and figure out how much faster the gear indexed by the left number spins compared to the gear indexed by the right number. If there is no right number, we compare to the red-hot cog rolling, as the flavor text indicates. This gives:
* 8,192
* 2,097,152
* 4,096
* 1,048,576
* 512
* 8
* 32,768
* 128

After one final base-2 logarithm, we get (13, 21, 12, 20, 9, 3, 15, 7), which gives `MULTICOG` when converted to letters.