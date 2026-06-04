---
layout: post
page-type: post
title:  "Edge River Method Part 1 of ???: Introduction"
comments-id:  "Edge River Method Part 1 of ???: Introduction"
date:   2026-06-02 01:15:00 -0500
tags: origami design erm
---

Yes, there's already a [blog post about ERM](https://origami.abstreamace.com/2021/12/12/geography-of-origami-a-brief-introduction-to-the-edge-river-method/),
but there's[^is] only one blog post about it and apparently ERM resources are obscure. So here's another one, since I recently delved into some specific aspects of ERM.

The *edge river method (ERM)* is a method that's pretty similar to the axial method, but meant to extend to general 2D polygons. Let's take a look at a classic axial packing
map.
<div class="figrow">
    <figure>
        <img style="max-width: 400px;" src="/assets/posts/erm-01-introduction/axial-abstraction.svg">
        <figcaption>The tree, with edges labelled.</figcaption>
    </figure>
    <figure>
        <img style="max-width: 400px;" src="/assets/posts/erm-01-introduction/axial-packing.svg">
        <figcaption>The map. Dotted black lines are ridge lines.</figcaption>
    </figure>
</div>

Yep, just a regular axial map. It has some rivers, and they turn. One thing you can do here is to place edges of the tree directly onto the axial packing.
<div class="figrow">
    <figure>
        <img style="max-width: 400px;" src="/assets/posts/erm-01-introduction/axial-packing-sources.svg">
        <figcaption>The map after placing edges onto the packing. Flap F has been turned into a middle flap for illustration purposes.</figcaption>
    </figure>
</div>

Notice that each river comes out of an edge and flows and turns until it reaches the boundary of the paper or the same edge from the other side (as in river F).[^belt]
This concept can be generalized to the case where the "tree" is actually a shape made of 2D polygons (and from now on will be called an *abstraction*[^fat])


Let's take a look at a sample ERM map
that I made.

To discuss it, we'll first
talk about *box-pleated rectangle ERM*, where we derive useful rules and then try to generalize it.

## Box-Pleated Rectangle ERM

Box-Pleated Rectangle ERM is the special case where the target shape is made entirely of rectangles, each with positive integer width and height. It is (I think) the
simplest-to-understand case of ERM, so we will discuss it first.

Suppose you want to make a target shape, say, the one below:
<figure>
    <img style="max-width: 400px;" src="/assets/posts/erm-01-introduction/T-folded.svg">
    <figcaption>The folded state</figcaption>
</figure>


It comes from thinking about what happens
when you draw lines through all layers in the folded state and then unfold the pattern. To illustrate this, consider the following crease pattern.

<div class="figrow">
    <figure>
        {% fold %} <img style="max-width: 300px;" src="/assets/posts/erm-01-introduction/T.fold"> {% endfold %}
        <figcaption>The crease pattern</figcaption>
    </figure>
    <figure>
        <img style="max-width: 400px;" src="/assets/posts/erm-01-introduction/T-folded.svg">
        <figcaption>The folded state</figcaption>
    </figure>
</div>

First, let's draw horizontal lines in the folded state and see what happens.

<div class="figrow">
    <figure>
        <img style="max-width: 400px;" src="/assets/posts/erm-01-introduction/T-x-folded.svg">
        <figcaption>The folded state, with horizontal lines drawn through all layers</figcaption>
    </figure>
    <figure>
        <img style="max-width: 400px;" src="/assets/posts/erm-01-introduction/T-x.svg">
        <figcaption>Unfolding it</figcaption>
    </figure>
</div>

[^is]: was
[^belt]: I like to affectionately call a river that completes a loop without crossing the paper boundary a *belt*.
[^fat]: I almost wanted to call it a *fat tree* instead because it still needs to be a tree, just with thickness.