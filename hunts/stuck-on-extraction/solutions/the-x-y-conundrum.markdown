---
layout: hunt-solution
page-type: hunt-solution
hunt: Stuck on Extraction
title: The (x, y) Conundrum
answer: FLY A COMPLEX PLANE
---
Just follow the instructions. How hard can it be? You will get a list of coordinates at the end.

1.  Marked: `(1, 0)`. Current state: at (1, 0) @ 0°.
2.  Marked: `(1, 0)`. Current state: at (1, 0) @ 90°.
3.  Marked: `(10, 0)`. Current state: at (10, 0) @ 90°. Note that you move without turning.
4.  Marked: `(10, 1)`. Current state: at (5.5, 5.5) @ 45°. Words like "left" depend on what direction you're facing.
5.  Marked: `(3, 3)`. Current state: at (3, 3) @ 45°.
6.  Marked: `(3, 3)`. Current state: at (13, 3) @ 45°. Words like "east" do not depend on facing direction.
7.  Marked: `(10, 0)`. Current state: at (10, 0) @ 180°.
8.  Marked: `(7, 3)`. Current state: at (7, 3) @ 179°. Gotta keep track of which relative direction is which absolute direction.
9.  Marked: `(0, 4)`. Current state: at (0, 4) @ 179°.
10. Marked: `(1, 4)`. Current state: at (1, 4) @ 179°. Also possible: marked: `(4, 1)`, curent state: at (4, 1) @ 179°. Things get ambiguous here. The ambiguity will be resolved later.
11. Marked: `(2, 4)`. Current state: at (2, 4) @ 179°. Also possible: marked: `(5, 1)`, curent state: at (5, 1) @ 179°.
12. Marked: `(10, 4)`. Current state: at (10, 4) @ -90°. Also possible: marked: `(2, 4)`, curent state: at (2, 4) @ -90°. Only one turn by 3149° is needed, as it turns out.
13. Marked: `(-1, -1)`. Current state: at (-1, -1) @ direction ⟨-11, 5⟩. The ambiguity is resolved as the other possibility goes through (6, 0).
14. Marked: `(2, 0)`. Current state: at (2, 0) @ direction ⟨-11, 5⟩. The coordinates marked in steps 1-13 need to be absolute-valued and incremented by 1.
15. Marked: `(15, 6)`. Current state: at (16, 6) @ direction ⟨-11, 5⟩. Careful, as the coordinates you snap to and the coordinates you mark are not the same.
16. Marked: `(14, 20)`. Current state: at (14, 20) @ 180°. Nothing like a nice long walk to end the adventure. Also, the coordinates marked in steps 14-15 need to be incremented by 1.

At the end, the marked coordinates become
* (2, 1)
* (2, 1)
* (11, 1)
* (11, 2)
* (4, 4)
* (4, 4)
* (11, 1)
* (8, 4)
* (1, 5)
* (2, 5)
* (3, 5)
* (11, 5)
* (2, 2)
* (3, 1)
* (16, 7)
* (14, 20)

If we get **Stuck on Extraction**™, we should solve "The Jig is Up!" first, which would give us `X IS WORD Y IS LETTER`.
We index into the sentence with the x-coordinate and index into the resulting word with the y-coordinate, giving us a letter.
This gives `FLY A COMPLEX PLANE`.

### Notes:

Two out of three teams solved this puzzle without solving another one first. Perhaps I should have done something less reasonable.