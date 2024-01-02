---
layout: hunt-solution
page-type: hunt-solution
hunt: Puzzle Tour in the Volcano
title: The Magma Group
answer: MORPHISM
---
Note that the properties listed are properties that [magmas](https://en.wikipedia.org/wiki/Magma_(algebra)) can possibly have.
First, we solve the logic puzzle to figure out which properties appear in the table.

* If two properties are opposites, exactly one of them appears in the list.

Exactly one of "Identity element" and "No identity element" show up.

* The one property referenced by the clue directly below this one appears last in the list.
* $$\forall x,y,z, x(yz) = (xy)z$$ does not appear earlier than 3rd.

The lower clue is the associative property. So "Associative" appears last.

* Commutative appears somewhere before the property alluded to by the output required from a cross product for it to be commutative.
* Each property referenced by the clue directly above this one appears somewhere after each property referenced in the clue directly below that actually appears in the list.
* Between the properties that contain the word "identity", each one that appears in the list appears somewhere before each other property that starts with "I" and appears in the list.

A cross product must output $$\vec{0}$$ for it to be commutative, so "Commmutative" appears before "Zero element". The lower clue asserts that "Identity element" and "No identity element" appear before "Idempotent" and "Invertible", but allows omissions, unlike with the "Commutative" vs "Zero element" case. The middle clue says that out of "Identity element", "No identity element", "Idempotent", and "Invertible", any of them that shows up appears before "Commutative" and "Zero element".

So far, we have ["Identity element" xor "No identity element"], "Idempotent"? and "Invertible"? in some order, "Commutative", "Zero element", "Associative".

* Each property that implies $$\forall y, ∃x, xx = x$$ does not appear in the list, unless contradicted by a clue somewhere above this one.

This excludes both "Identity element" (let $$x = \textrm{id}$$) and "Idempotent" (let $$x = y$$). So we have our final order:

<div class="property-grid" markdown="1">

| No identity element | Invertible | Commutative | Zero element | Associative | 
| ---------- | ---------- | ---------- | ---------- | ---------- | ---------
| | | | | | Rectangle group w/ reflections ($$D_2$$)
| | | | | | {true} under logical and
| | | | | | 3D vectors under cross product
| | | | | | Booleans under implies
| | | | | | Octonions except 0 under multiplication
| | | | | | Cube group ($$S_4$$)
| | | | | | {-1, 0, 1} under $$f$$, where $$f(x, y) = x^3y^2$$
| | | | | | Integers under addition

</div>
<br>

Now we fill out the table:

<div class="property-grid" markdown="1">

| No identity element | Invertible | Commutative | Zero element | Associative | 
| ---------- | ---------- | ---------- | ---------- | ---------- | ---------
| 0 | 1 | 1 | 0 | 1 | Rectangle group w/ reflections ($$D_2$$)
| 0 | 1 | 1 | 1 | 1 | {true} under logical and
| 1 | 0 | 0 | 1 | 0 | 3D vectors under cross product
| 1 | 0 | 0 | 0 | 0 | Booleans under implies
| 0 | 1 | 0 | 0 | 0 | Octonions except 0 under multiplication
| 0 | 1 | 0 | 0 | 1 | Cube group ($$S_4$$)
| 1 | 0 | 0 | 1 | 1 | {-1, 0, 1} under $$f$$, where $$f(x, y) = x^3y^2$$
| 0 | 1 | 1 | 0 | 1 | Integers under addition

</div>
<br>

This spells an 8-letter word in binary, and it gives `MORPHISM`.