---
layout: post
title:  "Glue Makes Everything Complicated"
date:   2023-12-21 19:14:24 -0800
categories: decrement game-dev
---
[The current demo of Decrement](https://hayashi-stl.itch.io/discrete-decrement) (as of Jan 5, 2024) introduces a mechanic called "glue" in the level "A Sticky Situation". The way it works seems simple at first: if Entity $$A$$ is attached to Block $$B$$ via glue, then if either $$A$$ or $$B$$ moves, then the other moves along with it. There's actually two variations depending on whether the other entity can actually move in the appropriate direction: the weak variant, where the glue attachment is broken, and the strong variant, where the original entity doesn't move either.

<div class="figrow">
    <figure>
        <img style="max-width: 300px;" src="{{ '/assets/posts/glue-makes-everything-complicated/weak-glue.gif' | relative_url }}">
        <figcaption>Weak glue</figcaption>
    </figure>
    <figure>
        <img style="max-width: 300px;" src="{{ '/assets/posts/glue-makes-everything-complicated/strong-glue.gif' | relative_url }}">
        <figcaption>Strong glue</figcaption>
    </figure>
</div>

It seems simple, but it interacts horribly with mechanics I've added in development or plan to add.

## Pushies

A *Pushy* is an enemy that pushes pushable blocks as it moves.
<figure>
    <img src="{{ '/assets/posts/glue-makes-everything-complicated/pushy.gif' | relative_url }}">
    <figcaption>Behavior of a Pushy</figcaption>
</figure>

There are also regular Baddies, which move without pushing blocks.
Imagine a configuration with a Baddy, a Pushy, and a pushable block. The Baddy is directly to the right of the block and facing away from it,
and the Pushy is directly to the left of the block and facing it.
Imagine somehow that two Pushies $$P_1$$ and $$P_2$$ manage to get on the same tile at the same time facing the same direction,
and start to push a block $$B$$. The expected behavior is that they push the block, and the whole configuration moves 1 tile per step.
Normally, this behavior is achieved:
* $$A$$ moves, pushing the block with it
* $$B$$ moves