---
origami: true
layout: post
page-type: ori-post
title:  "Exact Coordinates"
comments-id:  "ori-Exact Coordinates"
date:   2025-10-31 14:26:00 -0500
tags: origami math
---
<script>
    window.MathJax = {
        tex: {
            inlineMath: {'[+]': [['$', '$']]}
        }
    };
</script>
<div style="display:none;">
$
\newcommand\grp[1]{\left( #1 \right)}
\newcommand\arr[1]{\left[ #1 \right]}
\newcommand\bs[2]{\textcolor{#1}{#2}}
\newcommand\bsr {\bs{#0ff}{\arr{1}}}
\newcommand\bsx {\bs{#c0c}{\arr{1, \sqrt{2}}}}
\newcommand\bsv {\bs{#0c0}{\arr{1, \sqrt{3}}}}
\newcommand\bsf {\bs{#fc0}{\arr{1, \sqrt{5}}}}
\newcommand\bsff{\bs{#f80}{\arr{1, \sqrt{5}, \sqrt{10+2\sqrt{5}}, \sqrt{10-2\sqrt{5}}}}}
\newcommand\bsxv{\bs{#cc0}{\arr{1, \sqrt{2}, \sqrt{3}, \sqrt{6}}}}
\newcommand\bsxx{\bs{#80f}{\arr{1, \sqrt{2}, \sqrt{2+\sqrt{2}}, \sqrt{2-\sqrt{2}}}}}
\newcommand\bsxxx{\bs{#60f}{\arr{1, \sqrt{2}, \sqrt{2+\sqrt{2}}, \sqrt{2-\sqrt{2}},
    \sqrt{2+\sqrt{2+\sqrt{2}}}, \sqrt{2+\sqrt{2-\sqrt{2}}}, \sqrt{2-\sqrt{2+\sqrt{2}}}, \sqrt{2-\sqrt{2-\sqrt{2}}}}}}
\newcommand\bsgen{\bs{#ccc}{\vec{b}}}
\newcommand\bsgenz[1]{\bs{##ccc}{\arr{#1}}}
\newcommand\bsinv[1]{\bs{##f00}{\arr{#1}}}
\newcommand\bsinvgen{\bs{#f00}{\vec{b}}}
\newcommand\based[2]{\left( #1\cdot #2\right)}
$
</div>

After getting annoyed at precision issues in both Oriedita and Flat-Folder for my index crane (番号鶴) model, we've decided to think about exact coordinates.
And to port the FOLD library to Rust while we're at it.

To avoid dynamic casting everywhere in a very statically-typed language like Rust, We needed to find a good enough general type to represent these exact coordinates.
Too specific and we'll miss out on lots of crease patterns. Too general and the implementation will get very complicated and unnecessarily slow.
It's not often that you need to represent coordinates like $(\log_2 3, \pi^e)$ after all.

Let's take a look at some common origami frameworks:
* In box-pleated origami, all coordinates can be represented as rational numbers (in other words, for each coordinate $c$, $c\in \mathbb{Q}$).
* In 22.5° origami, coordinates can be represented as $q_0 + q_1\sqrt{2}$ for rational numbers $q_0$ and $q_1$.
    (If you know about field extensions, the set this time is $\mathbb{Q}[\sqrt{2}]$. Fancy.)
* In 15° origami, it's $q_0 + q_1\sqrt{3}$
* In 11.25° origami, things get more complicated. It's $q_0 + q_1\sqrt{2} + q_2\sqrt{2+\sqrt{2}} + q_3\sqrt{2-\sqrt{2}}$
* In 18° origami, it's $q_0 + q_1\sqrt{5} + q_2\sqrt{10+2\sqrt{5}} + q_3\sqrt{10-2\sqrt{5}}$

We can also do weirder angles like 5.625°, which gives coordinates of the form

$$\begin{matrix}q_0 + q_1\sqrt{2} + q_2\sqrt{2+\sqrt{2}} + q_3\sqrt{2-\sqrt{2}}\ + \\
q_4\sqrt{2+\sqrt{2+\sqrt{2}}} + q_5\sqrt{2+\sqrt{2-\sqrt{2}}} + q_6\sqrt{2-\sqrt{2+\sqrt{2}}} + q_7\sqrt{2-\sqrt{2-\sqrt{2}}}\end{matrix}$$

On second thought, please don't.

However, we can notice a pattern here. In all these frameworks, the coordinates are rational linear combinations of some basis full of square roots of integers and other square roots.

In this page, we will [define *based numbers*](#based-numbers) and a *basis*. We will also give the validity conditions for a basis:
* First element is $1$
* Linearly independent
* Closed under multiplication

And we will talk about how to do math with them
* [Addition](#addition)
* [Negation](#negation)
* [Subtraction](#subtraction)
* [Multiplication](#multiplication)
* [Reciprocal](#reciprocal)
* [Division](#division)
* [Comparisons](#comparisons)
* [Floor/ceiling](#floor-ceiling)
* [Square Root?](#sqrt)

## Based Numbers {#based-numbers}

This leads to the idea of representing exact numbers as a sequence of rational numbers called the *coefficient vector*, and a basis with the same length as that sequence.
Say we had some numbers. We could represent them like this:

<div style="max-width: 500px" class="center-img" markdown="1">

| Number | Representation | Basis |
| :---: | :---: | :---: |
| $0$ | $[0, 0]$ | $\bsx$ |
| $1$ | $[1, 0]$ | $\bsx$ |
| $\sqrt{2}$ | $[0, 1]$ | $\bsx$ |
| $1 + \sqrt{2}$ | $[1, 1]$ | $\bsx$ |
| $\frac{3 - 2\sqrt{2}}{4}$ | $\left[\frac{3}{4}, -\frac{1}{2}\right]$ | $\bsx$ |

</div>

We could represent the type like this:
```rust
struct BasedExpr {
    coeffs: Vec<Rat>, // coefficient vector
    basis: Basis
}
```
Here, `Basis` is an interned type so that if a basis is used multiple times, it's only stored once in memory. This very often happens in practice,
as the numbers tend to be coordinates in the same framework. From now on, we will color our bases uniquely. So $3 + 2\sqrt{2}$ gets represented as
$\based{\arr{3, 2}}{\bsx}$, for example. In this example, $\arr{3, 2}$ is the coefficient vector.
This representation was chosen because the value represented is effectively just the dot product of the coefficient vector and the basis.

However, invalid bases (we will talk about validity later) will be colored <span style="color:red;">red</span>.

As some may already understand by the use of the word *basis*, it has to be *linearly independent*. This means that there should be no way to get to $0$
except with a coefficient vector of $\vec{0}$. An example of a linearly *de*pendent "basis" would be $\bsinv{1, 2}$, where a coefficient vector of
$\arr{-1, \frac{1}{2}}$ would result in $0$. A (linearly *in*dependent) basis would be $\bsx$, since no matter what nonzero coefficient vector you set,
you cannot get 0 as a result[^bsx-proof].
This gives us the first rule of basis validity.

* **A basis must be linearly independent.**

### Mixing bases?

Now, what would happen if we tried to handle numbers with different bases? Take $\based{\arr{1, 1}}{\bsx}$ and
$\based{\arr{2, 1}}{\bsv}$ for example (These numbers are $1 + \sqrt{2}$ and $2 + \sqrt{3}$ respectively).

Well, if we add them together, we get $3 + \sqrt{2} + \sqrt{3}$, which requires expanding the basis to $\bsinv{1, \sqrt{2}, \sqrt{3}}$,
making things more complicated.

* It gets worse. If we *multiply* them together, we get $2 + 2\sqrt{2} + \sqrt{3} + \sqrt{6}$, requiring expanding the basis even further to $\bsxv$
* It gets *even worse*. Let's try to add $\based{\arr{1, 1}}{\bsinv{\sqrt{2+\sqrt{2}}, \sqrt{2-\sqrt{2}}}}$ and
    $\based{\arr{2}}{\bsinv{\sqrt{4+2\sqrt{2}}}}$ together. You would expect this to result in
    $\based{\arr{1, 1, 2}}{\bsinv{\sqrt{2+\sqrt{2}}, \sqrt{2-\sqrt{2}}, \sqrt{4+2\sqrt{2}}}}$, right? Well, see, the basis here is linearly dependent,
    (later we will find out why)
    and this is *not* easy to discover.  Having to attempt this kind of discovery every time we merely try to add two numbers doesn't sound like a pleasant time.

<!--div>
    and we can't have that. The result is, instead, for example, $\based{\arr{2, 2}}{\bsinv{\sqrt{2+\sqrt{2}}, \sqrt{2-\sqrt{2}}}}$, and this
    is *not* easy to discover. Having to attempt this kind of discovery every time we merely try to add two numbers doesn't sound like a pleasant time.
</div-->

So we will introdue a rule:

<div class="center-text" markdown="1">
#### *Under* no *circumstances shall you mix bases.*
</div>

In fact, here's a function to do it
```rust
fn assert_compatible(&self, other: &BasedExpr) {
    assert_eq!(self.basis, other.basis,
        "Under NO circumstances shall you mix bases! Not even {} and {}!",
        self.basis, other.basis);
}
```

## Representation

So now each basis basically marks a different type (dynamically, but there's no way around it).
$\based{\arr{2, -1}}{\bsx}$ is the same type as $\based{\arr{\frac{1}{2}, \frac{1}{2}}}{\bsx}$,
but effectively a different type than, say $\based{\arr{0, 1}}{\bsv}$.

In fact, $\based{\arr{1}}{\bsr}$ and $\based{\arr{1, 0}}{\bsx}$ and $\based{\arr{1, 0}}{\bsv}$
all have different types, even though they represent the same value, $1$! Often we want to generate an integer, mainly $0$ or $1$, but don't know
what the bases is yet. If we choose wrong, we could end up with an incompatible type.

### Baseless Numbers

We modify `BasedExpr` to look like this:
```rust
enum BasedExpr {
    Baseless(Rat),
    Based(Vec<Rat>, Basis)
}
```

to make space for *baseless numbers*. A *baseless number* is just that, a rational number without a basis determined yet. It is compatible with any (valid) basis,
but bases are contagious and any operation involving a basis will result in a number with that basis. This allows us to generate numbers like $0$ and $1$ in contexts
where we don't know the basis yet. These will be represented in this page with a leading question mark. For example, a baseless 0 gets represented as ${?0}$.

So, baseless numbers can be mixed with whatever basis you want. Numbers with the same basis can be mixed. But numbers with different bases are effectively different types
and should not be mixed under any circumstances.
```rust
fn assert_compatible(&self, other: &BasedExpr) {
    if let (Self::Based(_, basis_a), Self::Based(_, basis_b)) = (self, other) {
        assert_eq!(basis_a, basis_b,
            "Under NO circumstances shall you mix bases! Not even {} and {}!",
            basis_a, basis_b);
    }
}
```

## Arithmetic

Now let's talk about how we do *math* on these numbers. Operations on baseless numbers (which must be rational) just do their usual thing.
So ${?q} + {?r} = {?(q + r)}$, ${?q}\times{?r} = {?(qr)}$, and so on. An operation involving a based number must convert all baseless numbers
into based numbers first[^conversionless], using the basis of the based number. This brings us the second rule of validity:

* **A basis's first element must be ${\bf 1}$.**

This allows easy conversion of ${?q}$ into a based number by setting the first component to $q$ and the rest to $0$.
For example, ${?2}$, when using a basis of $\bsxv$, becomes $\based{\arr{2, 0, 0, 0}}{\bsxv}$

### Addition {#addition}

Addition is pretty simple. Given vectors of rational numbers $\vec{q}_1$ and $\vec{q}_2$ and a basis $\bsgen$, we have.
$\based{\vec{q}}{\bsgen} + \based{\vec{r}}{\bsgen} = \based{\left(\vec{q} + \vec{r}\right)}{\bsgen}$
We just add the coefficient vectors together and we're done. Some examples are shown below (bases are listed in a separate column for brevity):

<div style="max-width: 500px" class="center-img" markdown="1">

| $\vec{q}_1$ | $\vec{q}_2$ | Result | $\bsgen$ |
| :---: | :---: | :---: | :---: |
| $\arr{1}$ | $\arr{2}$ | $\arr{3}$ | $\bsr$ |
| $\arr{1}$ | $\arr{-1}$ | $\arr{0}$ | $\bsr$ |
| $\arr{1, 0}$ | $\arr{1, 1}$ | $\arr{2, 1}$ | $\bsx$ |
| $\arr{1, 0}$ | $\arr{1, 1}$ | $\arr{2, 1}$ | $\bsv$ |
| $\arr{3, -1, 5, 2}$ | $\arr{0, 2, 0, 4}$ | $\arr{3, 1, 5, 6}$ | $\bsxv$ |

</div>

Note that this works regardless of $\bsgen$, even for invalid bases. We still haven't finished defining validity yet.

### Negation {#negation}

Negation is also pretty simple, We have $-\based{\vec{q}}{\bsgen} = \based{\left(-\vec{q}\right)}{\bsgen}$,
which means we simply negate each component in the coefficient vector.

### Subtraction {#subtraction}

Subtraction is *also* pretty simple. $a - b = a + (-b)$, and based numbers are no exception. We've already defined addition and negation, so we're done.

### Multiplication {#multiplication}

Multiplication is **also** pretty complicated. Wait, was that... *complicated*? Yes, yes it was. It's pretty complicated.

A first attempt to define it is to realize that $\based{\vec{q}}{\bsgen} \times \based{\vec{r}}{\bsgen} = ...$, okay this isn't working well.
Let's try with a specific basis and see what happens

$$
\begin{align*}
& \based{q_0, q_1}{\bsx} \times \based{r_0, r_1}{\bsx} \\
&= \grp{q_0 + q_1\sqrt{2}}\grp{r_0 + r_1\sqrt{2}} \\
&= q_0r_0 + q_0r_1\sqrt{2} + q_1r_0\sqrt{2} + 2q_1r_1 \\
&= \based{\arr{q_0r_0 + 2q_1r_1,\ \ q_0r_1 + q_1r_0}}{\bsx} \\
\end{align*}
$$

Okay, that went pretty well. And we can do something similar when the basis is $\bsx$ or $\bsf$ or anything in the form $\bsgenz{1, \sqrt{s}}$, where
$s$ is a square-free[^square-free] natural number greater than 1. We simply get
$\based{\arr{q_0r_0 + s\cdot q_1r_1,\ \ q_0r_1 + q_1r_0}}{\bsgenz{1, \sqrt{s}}}$ instead.

Okay, let's try a more complicated example. How about $\bsinv{1, \sqrt{2}, \sqrt{3}}$? (it's colored red, so something's gonna go wrong)

$$
\begin{align*}
& \based{q_0, q_1, q_2}{\bsinv{1, \sqrt{2}, \sqrt{3}}} \times \based{r_0, r_1, r_2}{\bsinv{1, \sqrt{2}, \sqrt{3}}} \\
&= \grp{q_0 + q_1\sqrt{2} + q_2\sqrt{3}}\grp{r_0 + r_1\sqrt{2} + r_2\sqrt{3}} \\
&= q_0r_0 + q_0r_1\sqrt{2} + q_0r_2\sqrt{3} + q_1r_0\sqrt{2} + 2q_1r_1 + q_1r_2\sqrt{6} + q_2r_0\sqrt{3} + q_2r_1\sqrt{6} + 3q_2r_2\\
&= \based{\arr{q_0r_0 + 2q_1r_1 + 3q_2r_2,\ \ q_0r_1 + q_1r_0,\ \ q_0r_2 + q_2r_0,\ \ q_1r_2 + q_2r_1}}{\bsxv} \\
\end{align*}
$$

Oh no, a $\sqrt{6}$ appeared out of nowhere! Well, it appeared as a result of multiplying two components of the basis together; in this case $\sqrt{2}\times\sqrt{3}$.
We need to make sure that when we multiply any two components of the basis together, the result can still be represented with some coefficient vector
and the original basis. In this case, we cannot represent $\sqrt{6}$ inside $\bsinv{1, \sqrt{2}, \sqrt{3}}$[^root6-irrational], so we're screwed.
This leads to the third and final rule of validity:

* **A basis must be *closed under multiplication***, that is, that the product of any two of its components (same or different) must be representable inside the basis.

#### Multiplication Tables

For example, here's the multiplication table for $\bsx$. Notice that all of the products are representable in the basis.

<div style="max-width: 500px" class="center-img">
<table class="checkerboard center-text">
    <tr>
        <th>$\times$</th>
        <th>${\bf 1}$</th>
        <th>${\bf \sqrt{2}}$</th>
    </tr>
    <tr>
        <th>${\bf 1}$</th>
        <td>$1 = \based{\arr{1, 0}}{\bsx}$</td>
        <td>$\sqrt{2} = \based{\arr{0, 1}}{\bsx}$</td>
    </tr>
    <tr>
        <th>${\bf \sqrt{2}}$</th>
        <td>$\sqrt{2} = \based{\arr{0, 1}}{\bsx}$</td>
        <td>$2 = \based{\arr{2, 0}}{\bsx}$</td>
    </tr>
</table>
</div>

We can even do one for $\bsxv$ to show that it's closed under multiplication, making it a valid basis
(since it's also linearly independent and starts with $1$) (this time omitting the basis from the representations for brevity):

<div class="center-img">
<table class="checkerboard center-text">
    <tr>
        <th>$\times$</th>
        <th>${\bf 1}$</th>
        <th>${\bf \sqrt{2}}$</th>
        <th>${\bf \sqrt{3}}$</th>
        <th>${\bf \sqrt{6}}$</th>
    </tr>
    <tr>
        <th>${\bf 1}$</th>
        <td>$1 \to \arr{1, 0, 0, 0}$</td>
        <td>$\sqrt{2} \to \arr{0, 1, 0, 0}$</td>
        <td>$\sqrt{3} \to \arr{0, 0, 1, 0}$</td>
        <td>$\sqrt{6} \to \arr{0, 0, 0, 1}$</td>
    </tr>
    <tr>
        <th>${\bf \sqrt{2}}$</th>
        <td>$\sqrt{2} \to \arr{0, 1, 0, 0}$</td>
        <td>$2 \to \arr{2, 0, 0, 0}$</td>
        <td>$\sqrt{6} \to \arr{0, 0, 0, 1}$</td>
        <td>$2\sqrt{3} \to \arr{0, 0, 2, 0}$</td>
    </tr>
    <tr>
        <th>${\bf \sqrt{3}}$</th>
        <td>$\sqrt{3} \to \arr{0, 0, 1, 0}$</td>
        <td>$\sqrt{6} \to \arr{0, 0, 0, 1}$</td>
        <td>$3 \to \arr{3, 0, 0, 0}$</td>
        <td>$3\sqrt{2} \to \arr{0, 3, 0, 0}$</td>
    </tr>
    <tr>
        <th>${\bf \sqrt{6}}$</th>
        <td>$\sqrt{6} \to \arr{0, 0, 0, 1}$</td>
        <td>$2\sqrt{3} \to \arr{0, 0, 2, 0}$</td>
        <td>$3\sqrt{2} \to \arr{0, 3, 0, 0}$</td>
        <td>$6 \to \arr{6, 0, 0, 0}$</td>
    </tr>
</table>
</div>

So how do we actually use a multiplication table? We take our numbers $\based{\vec{q}}{\bsgen}$ and $\based{\vec{r}}{\bsgen}$, lay them out on the
top and left of the multiplication table, do all the multiplications, and add the resulting vectors together.
For example, let's compute $\based{\arr{2, 1}}{\bsx}\times\based{\arr{7, -3}}{\bsx}$.

<div style="max-width: 500px" class="center-img">
<table class="checkerboard center-text">
    <tr>
        <th>$\times$</th>
        <th>${\bf 2\cdot1}$</th>
        <th>${\bf 1\cdot\sqrt{2}}$</th>
    </tr>
    <tr>
        <th>${\bf 7\cdot1}$</th>
        <td>$14\times\arr{1, 0}$</td>
        <td>$7\times\arr{0, 1}$</td>
    </tr>
    <tr>
        <th>${\bf -3\cdot\sqrt{2}}$</th>
        <td>$-6\times\arr{0, 1}$</td>
        <td>$-3\times\arr{2, 0}$</td>
    </tr>
</table>
</div>

When we add the vectors up from all the entries and reattach the basis, we get $\based{\arr{8, 1}}{\bsx}$. This process works for any valid basis.
However, actually calculating the multiplication table in the first place isn't always easy...

What about $\bsxx$, the basis used in 11.25° origami? Those nested square roots sure look scary. But let's try and
build the multiplication table.

<div class="center-img">
<table class="checkerboard center-text">
    <tr>
        <th>$\times$</th>
        <th>${\bf 1}$</th>
        <th>${\bf \sqrt{2}}$</th>
        <th>${\bf \sqrt{2+\sqrt{2}}}$</th>
        <th>${\bf \sqrt{2-\sqrt{2}}}$</th>
    </tr>
    <tr>
        <th>${\bf 1}$</th>
        <td>$1 \to \arr{1, 0, 0, 0}$</td>
        <td>$\sqrt{2} \to \arr{0, 1, 0, 0}$</td>
        <td>$\sqrt{2+\sqrt{2}} \to \arr{0, 0, 1, 0}$</td>
        <td>$\sqrt{2-\sqrt{2}} \to \arr{0, 0, 0, 1}$</td>
    </tr>
    <tr>
        <th>${\bf \sqrt{2}}$</th>
        <td>$\sqrt{2} \to \arr{0, 1, 0, 0}$</td>
        <td>$2 \to \arr{2, 0, 0, 0}$</td>
        <td>$\sqrt{4+2\sqrt{2}}$</td>
        <td>$\sqrt{4-2\sqrt{2}}$</td>
    </tr>
    <tr>
        <th style="padding: 0px;">${\bf \sqrt{2+\sqrt{2}}}$</th>
        <td>$\sqrt{2+\sqrt{2}} \to \arr{0, 0, 1, 0}$</td>
        <td>$\sqrt{4+2\sqrt{2}}$</td>
        <td>$2+\sqrt{2} \to \arr{2, 1, 0, 0}$</td>
        <td>$\sqrt{2} \to \arr{0, 1, 0, 0}$</td>
    </tr>
    <tr>
        <th style="padding: 0px;">${\bf \sqrt{2-\sqrt{2}}}$</th>
        <td>$\sqrt{2-\sqrt{2}} \to \arr{0, 0, 0, 1}$</td>
        <td>$\sqrt{4-2\sqrt{2}}$</td>
        <td>$\sqrt{2} \to \arr{0, 1, 0, 0}$</td>
        <td>$2-\sqrt{2} \to \arr{2, -1, 0, 0}$</td>
    </tr>
</table>
</div>

For most of these entries, it's clear how to represent them. (In the case of $\sqrt{2+\sqrt{2}}\times\sqrt{2-\sqrt{2}}$, we do the difference-of-two-squares trick
to get $\sqrt{2}$). However, what about $\sqrt{4+2\sqrt{2}}$ and $\sqrt{4-2\sqrt{2}}$? Is this basis doomed?[^not-doomed]

Well, we can try to represent it by finding integers $a$, $b$, $c$, $d$, and $k$ such that $k > 0$ and

$$k\sqrt{4+2\sqrt{2}} = a + b\sqrt{2} + c\sqrt{2+\sqrt{2}} + d\sqrt{2-\sqrt{2}}$$

If we can find such integers, then $\sqrt{4+2\sqrt{2}} = \based{\arr{\frac{a}{k}, \frac{b}{k}, \frac{c}{k}, \frac{d}{k}}}{\bsxx}$. So let's try doing
some manipulation:

$$
\begin{align*}
k\sqrt{4+2\sqrt{2}} &= a + b\sqrt{2} + c\sqrt{2+\sqrt{2}} + d\sqrt{2-\sqrt{2}} \\
k\sqrt{4+2\sqrt{2}} - b\sqrt{2} &= a + c\sqrt{2+\sqrt{2}} + d\sqrt{2-\sqrt{2}} \\ 
4k^2 + 2k^2\sqrt{2} + 2b^2 - 4bk\sqrt{2+\sqrt{2}} &= a^2 + 2c^2 + c^2\sqrt{2} + 2d^2 - d^2\sqrt{2} + 2ac\sqrt{2+\sqrt{2}} + 2ad\sqrt{2-\sqrt{2}} + 2cd\sqrt{2} \\
\end{align*}
$$

$$ 0 = \based{\arr{a^2 - 2b^2 + 2c^2 + 2d^2 - 4k^2,\ \ c^2 - d^2 + 2cd - 2k^2,\ \ 2ac + 4bk,\ \ 2ad}}{\bsxx} $$

And the equations get so complicated they overflow the page. Regardless, we have an expression we can deal with more easily. $\bsxx$ is linearly independent[^bsxx-independent],
and the coefficient vector is indeed full of rational numbers, so each component of the coefficient vector must be 0. In particular, $2ad = 0$,
so either $a = 0$ or $d = 0$.

If $a = 0$, then since $2ac + 4bk = 0$, we have $b = 0$ (remember, $k > 0$). This will leave us with $c^2 + d^2 - 2k^2 = 0$ and $c^2 - d^2 + 2cd - 2k^2 = 0$.
Subtracting the first from the second and rearranging, we get $2d^2 = 2cd$. We're not allowed to set $d = 0$ because that would leave us with an impossible $c^2 = 2k^2$.
So we divide and get $d = c$. Let $c = 1$. Then $d = 1$, giving us $k = 1$. So we have a solution[^bsxx-solution],
$\sqrt{4+2\sqrt{2}} = \sqrt{2+\sqrt{2}} + \sqrt{2-\sqrt{2}}$, which we will not put back in the multiplication table because it would actually overflow the page.
Suffice it to say that $\sqrt{4+2\sqrt{2}}\to\arr{0, 0, 1, 1}$.

Similarly, $\sqrt{4-2\sqrt{2}}\to\arr{0, 0, 1, -1}$.

Now, having to do *all that work* every time you want to do a multiplication is slow and ad-hoc[^5-625-table]. It would be nice to do the work just one time for each
unique basis used, store the result, and just pull from it each time we do a multiplication. So we have a structure that basically stores the multiplication
for future reference (we also store it sparsely because there tends to be lots of $0$'s):
```rust
mul_table: Vec<Vec<Rat, usize, usize>>,
```
where we store, for each component of the result, which combinations of components of the numbers we're multiplying contribute to that component,
and what to multiply their product by.
Then if we write our product as $\based{\arr{q_0, \cdots, q_{n-1}}}{\bsgen}\times\based{\arr{r_0, \cdots, r_{n-1}}}{\bsgen} = \based{\arr{s_0, \cdots, s_{n-1}}}{\bsgen}$,
then

$$s_i = \sum_{j=0}^{||\textsf{mul_table}[i]||}
\textsf{mul_table}[i][j].\textsf{0}\times q_{\textsf{mul_table}[i][j].\textsf{1}}\times r_{\textsf{mul_table}[i][j].\textsf{2}}$$

Here is an example with $\bsv$ (that technically contains some invalid Rust, but whatever):
```rust
[
    [(1, 0, 0), (3, 1, 1)], // 1·q0·r0 + 3·q1·r1
    [(1, 0, 1), (1, 1, 0)], // 1·q0·r1 + 1·q1·r0
]
```

#### Automating the Multiplication Table

One problem remains. What algorithm do we use to calculate the multiplication table? We saw before that sometimes it seems like we need ad-hoc proofs,
such as the one showing that $\sqrt{4+2\sqrt{2}} = \based{\arr{0, 0, 1, 1}}{\bsxx}$. However, it turns out that there are algorithms for finding
things called [integer relations](https://en.wikipedia.org/wiki/Integer_relation_algorithm), which would solve this problem. Unfortunately, they
take approximations, and can only either give a result or prove that there isn't one with small enough integers. And even if they give a result,
we can't automatically trust it because floating-point arithmetic is involved.

One such algorithm is [PSLQ](https://www.davidhbailey.com/dhbtalks/dhb-carma-20100824.pdf), which promises good numerical stability. We implemented PSLQ
in Rust by porting [this implementation](https://github.com/mpmath/mpmath/blob/33eace1005bc0a6d5330104cd1e8fa5fbab0aee3/mpmath/identification.py#L19),
since we couldn't find an implementation that already exists in Rust.

But remember, the algorithm can't say for sure that there's not a solution period (only for small enough integers), nor can we trust the solution given. So
* We check the solution given by using a Rust library called [`algebraics`](https://salsa.debian.org/Kazan-team/algebraics) (As of 2025-10-23,
    the latest crates.io version has a bug that makes it think $\sqrt{2+\sqrt{2}} - \sqrt{2-\sqrt{2}} = 0$. Use the latest git version instead.),
    which works with real algebraic numbers. Why don't we just use this library instead of dealing with all this field extension nonsense? Because it's *fun*
    to think about field extension arithmetic. Also, it's faster.
* We just give up if we can't find a solution for small enough integers. Perhaps there should be a basis construction function that
    accepts a multiplication table explicitly, which is then checked with `algebraics`.

As of 2025-10-23, it is an open problem whether the integer relation problem over algebraic numbers is decidable. Oh well. At least we finally have multiplication

### Reciprocal {#reciprocal}

Before we can talk about division, we should simplify things by talking about taking the reciprocal, which has only 1 argument instead of 2. Let's
try just having at it: $\based{\vec{q}}{\bsgen}^{-1} = ...$, well, no clear way to make progress. It turns out that the solution involves matrices.

#### Matrix Representation

From the multiplication section, we introduced the notion of a multiplication table, which is effectively a 3-dimensional array (though stored sparsely).;
If we change the representation to store the factors for each combination of components in the multiplicands, like:
```rust
dense: Vec<Vec<Vec<Rat>>>, // this is rectangular now
```
we have

$$\begin{align*}
s_i &= \sum_{j=0}^{n}\sum_{k=0}^{n} \textsf{dense}[i][j][k]\times r_j\times q_k \\
&= \sum_{j=0}^{n}\grp{\sum_{k=0}^{n} \textsf{dense}[i][j][k]\times q_k}\times r_j \\
\end{align*}$$

and now it's looking like a matrix-vector product, specifically $\vec{s} = M_q\vec{r}$, where $M_q$ is an $n\times n$ matrix where
$\grp{M_q}\_{ij} = \sum\_{k=0}^{n} \textsf{dense}[i][j][k]\times q_k$. Note that $M_q$ only depends on $\textsf{dense}$ (which only depends on the basis)
and $\vec{q}$. This means that we can represent a based number $\based{\vec{q}}{\bsgen}$ as a matrix! For example, here's $\textsf{dense}$ for $\bsx$
(note: this is *not* the multiplication table. The rows correspond to components of the *output*, not one of the multiplicands):

$$\begin{bmatrix}
    \arr{1, 0} & \arr{0, 2} \\
    \arr{0, 1} & \arr{1, 0} \\
\end{bmatrix}$$

and thus we can represent $\based{\arr{q_0, q_1}}{\bsx}$ as:

$$
\begin{bmatrix}
    \arr{q_0, q_1}\cdot\arr{1, 0} & \arr{q_0, q_1}\cdot\arr{0, 2} \\
    \arr{q_0, q_1}\cdot\arr{0, 1} & \arr{q_0, q_1}\cdot\arr{1, 0} \\
\end{bmatrix} = \begin{bmatrix}
    q_0 & 2q_1 \\
    q_1 & q_0 \\
\end{bmatrix}
$$

Now that we have a matrix representation, to take the reciprocal of $\based{\vec{q}}{\bsx}$, we need to find $\vec{r}$ such that $M_q\vec{r} = \arr{1, {\rm zeros}}$.
Thus, $\vec{r} = M_q^{-1}\arr{1, {\rm zeros}}$. For example, let's take the reciprocal of $\based{\arr{2, 1}}{\bsx}$:

$$\vec{r} = M_{\arr{2, 1}}^{-1}\begin{bmatrix}1\\0\end{bmatrix} = \begin{bmatrix}2 & 2 \\ 1 & 2\end{bmatrix}^{-1}\begin{bmatrix}1\\0\end{bmatrix}
= \begin{bmatrix}1 & -1 \\ -1/2 & 1\end{bmatrix}\begin{bmatrix}1\\0\end{bmatrix} = \begin{bmatrix}1\\-1/2\end{bmatrix}$$

so $\based{\arr{2, 1}}{\bsx}^{-1} = \based{\arr{1, \frac{1}{2}}}{\bsx}$. Note that this works for any valid basis.

In case the number we're taking the reciprocal of is 0, the resulting matrix is an all-zero matrix, which cannot be inverted. If the matrix is singular,
without being an all-zero matrix, then we have $\based{\vec{q}}{\bsinvgen}\times\based{\vec{r}}{\bsinvgen} = 0$ where neither $\vec{q}$ nor $\vec{r}$ is $\vec{0}$,
which means that $\bsinvgen$ is linearly dependent and not a valid basis.

### Division {#division}

Division is pretty simple. $a/b = a\times b^{-1}$, and based numbers are no exception. This concludes arithmetic!

## Comparisons {#comparisons}

However, sometimes we want to compare two based numbers and see which one is bigger.

### Equality

Because of linear independence of the basis, $\based{\vec{q}}{\bsgen} = \based{\vec{r}}{\bsgen}\iff \vec{q} = \vec{r}$. Simple

### Comparison to Zero

But inequalities are tricker. Again, let's simplify the problem to a 1-argument problem, this time to the problem of deciding whether
$\based{\vec{q}}{\bsgen} > 0$

Some cases are easier:
* For the basis $\bsr$, we just compare $q_0$ to 0. Simple!
* For a basis in the form $\bsgenz{1, \sqrt{s}}$, where $s$ is a square-free natural number greater than 1, it turns out that
    $\based{\arr{q_0, q_1}}{\bsgenz{1, \sqrt{s}}} > 0 \iff {\rm sgn}(q_0)q_0^2 + {\rm sgn}(q_1)q_1^2s > 0$, where ${\rm sgn}(a)$ is $1$
    if $a$ is positive, $-1$ if $a$ is negative, and $0$ otherwise.

But for bigger bases, the problem gets more complicated, and in particular, figuring out where all the ${\rm sgn}$s go is something we haven't figured out yet.
But unlike the arithmetic operations, comparison has a nice property that we can take advantage of: it's piecewise constant, which means that in
some cases, floating-point arithmetic is fine. Specifically, we can do *interval arithmetic*: keep track of a lower bound and upper bound of the result,
and if in the end the bounds are the same, we have our answer. Otherwise, increase the precision and try again. There are two cases:

* The input is a boundary point (e.g. $0$ in the case of comparison to zero, or integers in the case of the floor function). Then no matter how small the interval,
    that size of interval around the input will map to multiple different answers and so this algorithm will not terminate. Instead, we must detect
    boundary points explicitly.
* The input is not a boundary point. Then there's a small enough interval around the input that all maps to the same output, so there's a precision that gives the answer.

In the case of comparison to zero, the only boundary point is $0$, so we can check that explicitly and use interval arithmetic to handle the rest of the inputs.

### Comparison

General comparison is handled by realizing that $a > b \iff a - b > 0$, and based numbers are no exception.

## Floor and Ceiling {#floor-ceiling}

These are another good use case for interval arithmetic, since they're piecewise constant.
The boundary points this time are integers, and they're easy to detect: a based number is an integer if and only if the first component of its coefficient vector
is an integer and the rest of the components are 0.

Unlike with comparison, there's probably very little hope here for a more direct method that doesn't use interval arithmetic, making interval arithmetic very important.

## Square Root? {#sqrt}

We've breezed through addition, derived subtraction, conquered multiplication, defeated division, and proved ourselves more powerful than comparisons.
It's time for the square root. First of all, note that interval arithmetic will *not* work here because $f(a) = \sqrt{a}$ is not a piecewise constant function,
so we're back to having to be exact from start to end. Then we can immediately note that, unlike the arithmetic operators, unfortunately the square root isn't always
representable in the basis, even when it's a real number. For example, $\sqrt{\based{\arr{2}}{\bsr}} = \sqrt{2} \ne \based{\arr{q_0}}{\bsr}$ for any rational number
$q_0$.

You may think we can just somehow check if the square root is representable in the basis, but this isn't easy. Consider $\sqrt{\based{\arr{q_0, q_1}}{\bsx}}$
We want to find $\arr{r_0, r_1}$ such that $\based{\arr{r_0, r_1}}{\bsx}^2 = \based{\arr{q_0, q_1}}{\bsx}$. Using what we learned from multiplication,
we get this system of equations:

$$\begin{align*}
r_0^2 + 2r_1^2 &= q_0 \\
2r_0r_1 &= q_1 \\
\end{align*}$$

In this case, we can use the quadratic formula and end up with

$$r_0 = \sqrt{\frac{q_0\pm\sqrt{q_0^2-2q_1^2}}{2}},\ \ r_1 = \begin{cases}\sqrt{\frac{q_0}{2}} & r_0 = 0 \\ \frac{q_1}{2r_0} & r_0 \ne 0\end{cases}$$

which means that first of all $q_0^2-2q_1^2$ must be the square of a rational number $D$, and then $\frac{q_0\pm\sqrt{D}}{2}$ must be the square of a rational number
(in the latter case, only one of the signs has to work). And then if $r_0$ must be $0$, then $\frac{q_0}{2}$ must be the square of a rational number. And
If this all holds, then $\sqrt{\based{\arr{q_0, q_1}}{\bsx}}$ can be expressed in $\bsx$, and otherwise, it can't.

That's was already quite a bit, but let's try a more complicated base and see if we can find a pattern.
$\based{\arr{r_0, r_1, r_2, r_3}}{\bsxv}^2 = \based{\arr{q_0, q_1, q_2, q_3}}{\bsxv}$ if and only if

$$\begin{align*}
r_0^2 + 2r_1^2 + 3r_2^2 + 6r_3^2 &= q_0 \\
2r_0r_1 + 6r_2r_3 &= q_1 \\
2r_0r_2 + 4r_1r_3 &= q_2 \\
2r_0r_3 + 2r_1r_2 &= q_3 \\
\end{align*}$$

And while trying to solve this equation, we ran into a degree-5 polynomial in $r_1$ after substituting for $r_2$ and $r_3$ in the second equation.
And this isn't even the final form! After somehow miraculously solving the degree-5 polynomial, we need to do one final substitution into the first equation,
giving what will probably be a degree-10 polynomial in $r_0$!

So um, at least for now, the square root isn't happening. Perhaps finding the minimal polynomial of the number, squaring every instance of $x$,
and factoring that over integers might work, but whatever.

## Appendix A: Common Matrix Bases {#common-matrix-bases}

Here are some matrices for common bases. Each matrix here is a matrix $M$ of vectors such that

$$\based{\vec{s}}{\bsgen} = \based{\vec{q}}{\bsgen}\times\based{\vec{r}}{\bsgen} \iff \vec{s} = \grp{\vec{M_{ij}}\cdot \vec{q}}\vec{r}$$

<br>

$$(\textrm{box pleating}) \bsr{:}\ \begin{bmatrix}
    \arr{1} \\
\end{bmatrix}$$

$$(22.5^\circ) \bsx{:}\ \begin{bmatrix}
    \arr{1, 0} & \arr{0, 2} \\
    \arr{0, 1} & \arr{1, 0} \\
\end{bmatrix}$$

$$(15^\circ) \bsv{:}\ \begin{bmatrix}
    \arr{1, 0} & \arr{0, 3} \\
    \arr{0, 1} & \arr{1, 0} \\
\end{bmatrix}$$

$$(7.5^\circ) \bsxv{:}\ \begin{bmatrix}
    \arr{1, 0, 0, 0} & \arr{0, 2, 0, 0} & \arr{0, 0, 3, 0} & \arr{0, 0, 0, 6} \\
    \arr{0, 1, 0, 0} & \arr{1, 0, 0, 0} & \arr{0, 0, 0, 3} & \arr{0, 0, 3, 0} \\
    \arr{0, 0, 1, 0} & \arr{0, 0, 0, 2} & \arr{1, 0, 0, 0} & \arr{0, 2, 0, 0} \\
    \arr{0, 0, 0, 1} & \arr{0, 0, 1, 0} & \arr{0, 1, 0, 0} & \arr{1, 0, 0, 0} \\
\end{bmatrix}$$

$$(11.25^\circ) \bsxx{:}\ \begin{bmatrix}
    \arr{1, 0, 0, 0} & \arr{0, 2, 0, 0} & \arr{0, 0, 2, 0} & \arr{0, 0, 0, 2} \\
    \arr{0, 1, 0, 0} & \arr{1, 0, 0, 0} & \arr{0, 0, 1, 1} & \arr{0, 0, 1, -1} \\
    \arr{0, 0, 1, 0} & \arr{0, 0, 1, 1} & \arr{1, 1, 0, 0} & \arr{0, 1, 0, 0} \\
    \arr{0, 0, 0, 1} & \arr{0, 0, 1, -1} & \arr{0, 1, 0, 0} & \arr{1, -1, 0, 0} \\
\end{bmatrix}$$

$$(18^\circ) \bsff{:}\ \begin{bmatrix}
    \arr{1, 0, 0, 0} & \arr{0, 5, 0, 0} & \arr{0, 0, 10, 0} & \arr{0, 0, 0, 10} \\
    \arr{0, 1, 0, 0} & \arr{1, 0, 0, 0} & \arr{0, 0, 2, 4} & \arr{0, 0, 4, -2} \\
    \arr{0, 0, 1, 0} & \arr{0, 0, 1, 2} & \arr{1, 1, 0, 0} & \arr{0, 2, 0, 0} \\
    \arr{0, 0, 0, 1} & \arr{0, 0, 2, -1} & \arr{0, 2, 0, 0} & \arr{1, -1, 0, 0} \\
\end{bmatrix}$$

[^bsx-proof]: $\based{a, b}{\bsx}$ represents $a\cdot 1 + b\cdot\sqrt{2}$. In order for this to be $0$, we need $\sqrt{2} = -\frac{a}{b}$, which can't happen
    because $a$ and $b$ are rational and $\sqrt{2}$ is irrational.

[^conversionless]: In some cases, like with multiplication, it's more efficient to not convert, but the math is the same and so in this page we will always convert.

[^square-free]: A *square-free* natural number is one that isn't the multiple of any prime number squared.
    For example, $6$ is square-free, but $12$ is not because it's a multiple of $4$, which is $2^2$.

[^root6-irrational]: Assume that we can. Then we have $k\sqrt{6} = a + b\sqrt{2} + c\sqrt{3}$, where $a, b, c, k$ are integers and $k > 0$.
    (Then we would divide by $k$ to get the rational numbers needed to build our coefficient vector:
    $\sqrt{6} = \based{\arr{\frac{a}{k}, \frac{b}{k}, \frac{c}{k}}}{\bsinv{1, \sqrt{2}, \sqrt{3}}}$). We can do some algebra as follows:

    $$
    \begin{align*}
    k\sqrt{6} &= a + b\sqrt{2} + c\sqrt{3} \\
    k\sqrt{6} - a &= b\sqrt{2} + c\sqrt{3} \\
    6k^2 + a^2 - 2ak\sqrt{6} &= 2b^2 + 3c^2 + 2bc\sqrt{6} \\
    6k^2 + a^2 - 2b^2 - 3c^2 &= 2(bc + ak)\sqrt{6} \\
    \frac{6k^2 + a^2 - 2b^2 - 3c^2}{2(bc + ak)} &= \sqrt{6}
    \end{align*}
    $$

    At which point we notice that the left side consists of only regular arithmetic being done on integer numbers (and is thus rational), and the
    right side is irrational, so there's no solution, and thus no way to represent $\sqrt{6}$ inside $\bsinv{1, \sqrt{2}, \sqrt{3}}$.

[^not-doomed]: Of course not, or else it'd be colored red.

[^bsxx-independent]: Proving this will be left as an exercise for the reader. Hint: this is equivalent to
    there not being integers $a$, $b$, $c$, $d$ such that not all of them are 0 and $a + b\sqrt{2} + c\sqrt{2+\sqrt{2}} + d\sqrt{2-\sqrt{2}} = 0$.

[^bsxx-solution]: Technically we have to actually check that the solution ($(a, b, c, d, k) = (0, 0, 1, 1, 1)$) really works.
    Plugging this into that long equation we got after squaring gives $4 + 2\sqrt{2} = 2 + \sqrt{2} + 2 - \sqrt{2} + 2\sqrt{2}$, which is
    just a true equation. We know that $\sqrt{2} = \sqrt{2+\sqrt{2}}\sqrt{2-\sqrt{2}}$, so we have
    $4 + \sqrt{2} = \sqrt{2 + \sqrt{2}}^2 + \sqrt{2 - \sqrt{2}}^2 + 2\sqrt{2+\sqrt{2}}\sqrt{2-\sqrt{2}}$. Oh look, a perfect square! Lets factor it:
    $4 + \sqrt{2} = \grp{\sqrt{2 + \sqrt{2}} + \sqrt{2-\sqrt{2}}}^2$. Finally, we take the *principal* square root (which, importantly, is a function),
    giving us $\sqrt{4 + \sqrt{2}} = \sqrt{2 + \sqrt{2}} + \sqrt{2 - \sqrt{2}}$, proving that the solution actually works.

[^5-625-table]: A challenge: try calculating the multiplication table for the basis of 5.625° origami[^5-625-ori], $\bsxxx$. Good luck.

[^5-625-ori]: Does anyone actually do this?