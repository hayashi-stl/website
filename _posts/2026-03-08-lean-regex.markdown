---
layout: post
page-type: post
title:  "Formalizing Regexes in Lean: Attempt 1"
comments-id:  "Formalizing Regexes in Lean: Attempt 1"
date:   2026-03-08 01:15:00 -0500
tags: math lean regex programming
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
\DeclareMathOperator*{\or}{|}
\DeclareMathOperator*{\st}{|}
\DeclareMathOperator*{\bind}{\gg\hspace{-4mu}=}
\newcommand{\len}[1]{\| #1 \|}
\newcommand{\ca}{ {\rm cap} }
\newcommand{\heq}{\asymp}
\newcommand{\term}{ {\sf T} }
$
</div>
We picked up Lean a few months ago, using it to prove a result about some box game, and then almost proving Kempe's universality theorem[^kempe].
But now it's time for regexes.

## Regex vs. Regular Expression

Now, note that we didn't say "regular expression", we said "regex". A *regular expression* is an expression made of one of the 6 classic regular operators,
corresponding to regular languages over an alphabet type $\alpha$ (Let $a : \alpha$, and $q, r$ be regular expressions):
* $\bot$: the empty language
* $\epsilon$: the language containing just the empty word[^empty]
* $a$: the language containing just $a$
* $qr$: *concatenation*. The language of words made by concatenating a word that matches $q$ and a word that matches $r$.
* $q\or r$: *alternation*. The language of words that match $q$ or $r$ (or both)
* $r^*$: <i>Kleene star</i>. The languages of words made by concatenating arbitrarily many (including 0) words that match $r$.

The only languages regular expressions match are *regular languages*, which are special because they can be matched with an
[NFA](https://en.wikipedia.org/wiki/Nondeterministic_finite_automaton). However, in many programming languages, a *regex* is just some pattern that can match words,
whether it's regular or not. For example, by adding the following two features (let $n : \mathbb{N}$)
* $n\leftarrow r$: *capture*. Stores the part that matched $r$ into capture $n$
* $\backslash n$: *backreference*. The language containing just the word stored in capture $n$.

and modifying concatenation like this:
* $qr$: *concatenation*. The language of words made by concatenating a word $w$ that matches $q$ and a word that matches $r$ *when the match is initialized with a
    capture buffer resulting from matching $w$ with $q$*

we can write the regex $(1\leftarrow({\sf a}\or {\sf b})^*)\backslash 1$, whose language is the language of words written as $ww$ for some $w$, which is <i>not</i> regular.
And so, [we will call them regexes](https://web.archive.org/web/20100112232513/http://dev.perl.org/perl6/doc/design/apo/A05.html).

## The Regex Type

First, we define the type of positions in a list, which contains valid indices and the end position:
```lean
-- `Fin n` is the type `{k : ℕ // k < n}`
def Pos (w : List α) := Fin (w.length + 1)
```

and the capture buffer types (in the actual code, `Capture w` was defined as a list because of .NET, but we didn't get around to the relevant .NET feature,
so we'll simplify things here)[^finsupp]:
```lean
def Capture (w : List α) := Pos w × Pos w
-- `α →₀ β` is the type of functions `f` where `f(a) ≠ 0` only for finitely many `a`.
-- Also, technically this definition doesn't really work if `Capture w` isn't a `List`, but oh well.
def Captures (w : List α) := ℕ →₀ Capture w
```

and now for the actual regex type:
```lean
inductive Regex.BackrefDefault where
  | bot : BackrefDefault
  | empty : BackrefDefault

inductive Regex (α : Type u) : Type u where
  | bot : Regex α
  | empty : Regex α
  | unit (c : α) : Regex α
  | concat (q r : Regex α) : Regex α
  | or (q r : Regex α) : Regex α
  | star (r : Regex α) : Regex α
  | start : Regex α
  | end' : Regex α
  | capture (n : ℕ) (r : Regex α) : Regex α
  | backref (d : Regex.BackrefDefault) (n : ℕ) : Regex α
```

which corresponds to the following mapping:
* `bot` = $\bot$
* `empty` = $\epsilon$
* `unit c` = $c$
* `concat q r` = $qr$
* `or q r` = $q\or r$
* `star r` = $r^*$
* `start` = $\vdash$, the start anchor
* `end'` = $\dashv$, the end anchor
* `capture n r` = $n \leftarrow r$
* `backref d n` = $\backslash_d n$, with defaulting behavior depending on $d$. $\backslash n = \backslash_\bot n$ fails if capture $n$ doesn't exist.
    $\backslash_\epsilon n$ matches the empty word in that case.[^backemp]

## Matching Behavior

We first define a function $\textrm{matchPartial}(r, w, s, \ca)$, which starts a match with regex $r$ and word $w$ at position $s$ with capture buffer
$cap$ and returns a list of partial matches. The way this corresponds to a backtracking algorithm is that the order of the list is the order to try matches in,
e.g. the second regex of a `concat`. We didn't get around to implementing any atomic regex features (which would take only the first match), so order doesn't
actually matter and the list may as well be a set.

```lean
def PartialMatches (w : List α) := List (Pos w × Captures w)

def matchPartial (r : Regex α) (w : List α) (s : Pos w) (cap : Captures w)
    : PartialMatches w := sorry
```

(We will use $\len{w}$ to denote the length of $w$. For example, since `s : Pos w`, $0 \le s \le \len{w}$)

The behavior is as follows (in set notation, because we don't have atomic features):
* `| bot =>` $\varnothing$.
* `| empty =>` $\\{(s, \ca)\\}$. Neither the position nor the capture buffer changes.
* `| unit c =>` $\begin{cases}\\{(s + 1, \ca)\\} & w[s] = c \\\\ \varnothing & {\rm otherwise} \end{cases}$. Note that if $s = \len{w}$, then $w[s] \ne c$ for any $c$.
* `| concat q r =>` $\bigcup_{(s', \ca') \in {\rm matchPartial}(q, w, s, \ca)} {\rm matchPartial}(r, w, s', \ca')$.
* `| or q r =>` ${\rm matchPartial}(q, w, s, \ca) \cup {\rm matchPartial}(r, w, s, \ca)$. Every match of $q$ or $r$ is a match of $q\or r$.
* `| star r =>` $\\{(s, \ca)\\} \cup \\{(s', \ca') \in {\rm matchPartial}(r, w, s, \ca)\st s = s'\\}\ \cup$
    $\bigcup_{(s', \ca') \in {\rm matchPartial}(r, w, s, \ca), s < s'} {\rm matchPartial}(r^*, w, s', \ca')$. Note the recursive definition, and note that there are 3
    sets to union here because of the star escape rule: <i>a star that matches an empty word cannot continue</i>, an important rule to prevent infinite loops. So a
    star can either:
    - match the empty word
    - match $r$, see that that match was empty, and quit
    - match $r$, see that that match was not empty, and recursively match $r^*$
* `| start =>` $\begin{cases}\\{(s, \ca)\\} & s = 0 \\\\ \varnothing & {\rm otherwise} \end{cases}$
* `| end' =>` $\begin{cases}\\{(s, \ca)\\} & s = \len{w} \\\\ \varnothing & {\rm otherwise} \end{cases}$
* `| capture n r =>` $\left\\{\left(s', \lambda\ i\mapsto \begin{cases}(s, s') & i = n \\\\ \ca'(i) & {\rm otherwise} \end{cases}\right)\st (s', \ca')\in
    {\rm matchPartial}(r, w, s, \ca)\right\\}$, capturing $(s, s')$ into capture $n$
* `| backref d n =>` $\begin{cases}\\{(s + \len{\ca(n)}, \ca)\\} & w[s..(s + \len{\ca(n)})] = \ca(n) \\\\ \\{(s, \ca)\\} & d = \epsilon \\\\ \varnothing & {\rm otherwise} \end{cases}$,
    where $w[a..b]$ is the subword of $w$ starting at position $a$ and having length $b - a$. Note that if capture $n$ doesn't exist, then
    $w[a..b] \ne \ca(n)$ for any $a$, $b$.

We then define a function ${\rm match}(r, w, s, \ca) = \\{(s', \ca') \in {\rm matchPartial}(r, w, s, \ca) \st s' = \len{w} \\}$, which only returns
*full* matches.

However, this isn't how `matchPartial` and `match` were actually defined in Lean because...

## Termination

Some regexes don't even terminate. There are programming languages that have a feature that allows you to
[call a subregex](https://perldoc.perl.org/perlre#(?PARNO)-(?-PARNO)-(?+PARNO)-(?R)-(?0)) in the regex (which could be the entire regex),
and this can cause infinite recursion. Lean doesn't let you prove things about functions that might not terminate, so we can't implement matching as a function
if we want to include recursion. So we went for a state machine on a stack[^state]. We then had a predicate ${\rm Terminates}(r, w, s, \ca)$, indicating whether that state machine
terminates. So actually, `matchPartial` takes another parameter: `term`, a proof of termination:

```lean
def matchPartial (r : Regex α) (w : List α) (s : Pos w) (cap : Captures w)
    (term : r.Terminates w s cap)
    : PartialMatches w := sorry
```

It turns out that all the features we got around to can have termination and the intended behavior proven for them, using some custom tactics I defined called
`step`, which steps the state machine 1 step, and `run_top!`, which chops the top item off the stack, runs it, and passes the result to the rest of the stack.

## Regular Expressions Are Regular

The first major thing to prove is that all regexes composed of the 6 classic regular operations (`bot`, `empty`, `unit`, `concat`, `or`, `star`) are regular. There is already
a [regular expression type in Lean](https://leanprover-community.github.io/mathlib4_docs/Mathlib/Computability/RegularExpressions.html), so we just took advantage
of that to define a predicate ${\rm Regular}(r)$:

```lean
def Regular (r : Regex α) (term : ∀ w, r.Terminates w 0 0)
  := ∃ r' : RegularExpression α, r.language term = r'.matches'
```

where ${\rm language}(r)$ (which we will also write as $L(r)$)
is just the set of words that $r$ matches. We define a type `CRegular` consisting of just the classic regular operations[^prop]:
```lean
inductive CRegular : Regex α → Type u where
  | bot : CRegular bot
  | empty : CRegular empty
  | unit c : CRegular (unit c)
  | concat {q} {r} : CRegular q → CRegular r → CRegular (concat q r)
  | or {q} {r} : CRegular q → CRegular r → CRegular (or q r)
  | star {r} : CRegular r → CRegular (star r)
```

In most cases, the regularity proofs are easy. Just choose the correct `RegularExpression`, unfold their languages, and they're clearly equal. This covers all 3 base cases
and 1 inductive step: `or q r`, since $L(q\or r) = L(q) \cup L(r)$ and regular languages are closed under union.

But if we write the concatenation of languages $A$ and $B$ to be $AB = \\{ab \st a\in A\land b\in B\\}$, then unfortunately
it's not true in general that $L(qr) = L(q)L(r)$. Consider the case where $q = {\sf a}$ and $r = {\vdash}$. Note that $L(q) = \\{ {\sf a}\\}$ and $L(r) = \\{\epsilon\\}$.
But $L(qr) = \varnothing \ne \\{ {\sf a}\\} = L(q)L(r)$. (This is because $({\sf a}\vdash)$ is contradictory: you can't match the beginning of a word after you've
already consumed a letter.) Thankfully, we *do* have $L(qr) = L(q)L(r)$ for `CRegular`, but we have to prove it.

The key is to define a predicate ${\rm MatchPartialFree}(r)$, which basically says that $r$ doesn't care about context or the capture buffer when it's matching. More formally,
$$\begin{align*}
{\rm MatchPartialFree}(r) := &\forall w_0, w, w_1, \ca, \ca', \\
                             &(\len{w_0w}, \ca') \in {\rm MatchPartial}(r, w_0ww_1, \len{w_0}, \ca) \to \\
                             &\hspace{16mu}\forall w_0', w_1', \exists \ca'', (\len{w_0'w}, \ca'') \in {\rm MatchPartial}(r, w_0'ww_1', \len{w_0'}, \ca)
\end{align*}$$

However, in attempting to prove this for `concat`, we run into...

### HEq'ing Problems! (Dependent Type Hell)

So, there's a couple of weird operators in Lean: $\blacktriangleright$ and $\asymp$, both based around the situation where you have two
values of different types $a : α$ and $b : β$, and a proof of equality $h : α = β$, and you want to somehow say that $a = b$.
If you just try to even state the proposition $a = b$, it doesn't typecheck because the types $α$ and $β$ are not definitionally equal.

* $\blacktriangleright$ (`Eq.rec`): You *can* say $a = h \blacktriangleright b$, where $h \blacktriangleright b$ uses $h$ to cast $b$ to type $α$. But it's not as nice work with as simple equality.
* $\heq$ (`HEq`): You *can* say $a \heq b$, which means that there exists some $h : a = b$ such that $a = h \blacktriangleright b$.  However, HEq is [not recommended](https://leanprover-community.github.io/mathlib4_docs/Init/Prelude.html#HEq) because it's not as well-behaved as regular equality. In particular
    - You can't rewrite using HEq
    - For functions $f : α\to α'$ and $g : β\to β'$, and values $a : α$ and $b : β$, even if $f \heq g$ and $a \heq b$, it cannot be proven that $f(a) \heq g(b)$.

Now, notice that we have a lot of types dependent on $w$, the word being matched. Up until now, we haven't changed $w$. The state machine doesn't change $w$. The other
proofs don't change $w$. But the definition of `MatchPartialFree` requires a change in $w$, messing things up especially in the case of `concat` and `star`, where
our choices of $w_0'$ and $w_1'$ make us run into HEq'ing problems.

Consider the inductive case `concat`, where we assume ${\rm MatchPartialFree}(q)$ and ${\rm MatchPartialFree}(r)$, and try to prove ${\rm MatchPartialFree}(qr)$:
* We introduce $w_0$, $w$, $w_1$, $\ca$, $\ca''$, $\left(h : (\len{w_0w}, \ca'') \in {\rm MatchPartial}(r, w_0ww_1, \len{w_0}, \ca)\right)$, $w_0'$, and $w_1'$.  (Note that we call it $\ca''$ instead of $\ca'$. This is for a reason.)
* By $h$, we have an $s$ and $\ca'$ such that $\left(h_1 : (s, \ca') \in {\rm MatchPartial}(r, w_0ww_1, \len{w_0}, \ca)\right)$ and $(\len{w_0w}, \ca'') \in {\rm MatchPartial}(r, w_0ww_1, s, \ca')$. By monotonicity, we know that $s = \len{w_0} + s'$ for some $s'$ where $0 \le s' \le \len{w}$.
* By using ${\rm MatchPartialFree}(q)$ and plugging in $w_0$, $w[0..s']$, $w[s'..\len{w}]w_1$, $\ca$, $\ca'$, $h_1$..., oh wait.

$h_1$ says:

$$(\len{w_0} + s', \ca') \in {\rm MatchPartial}(r, w_0ww_1, \len{w_0}, \ca)$$

but we need a proof of

$$(\len{(w_0)(w[0..s'])}) \in {\rm MatchPartial}(r, (w_0)(w[0..s'])(w[s'..\len{w}]w_1), \len{w_0}, \ca)$$

Normally we would just prove $\left(h_w : (w_0)(w[0..s'])(w[s'..\len{w}]w_1) = w_0ww_1\right)$ and then rewrite using $h_w$, but that doesn't quite work since
the types of the $\len{w_0}$s and $\ca$s differ. If you do the rewrite anyway, you'd end up with something like

$$(h_w \blacktriangleright \len{w_0} + s', h_w \blacktriangleright \ca') \in {\rm MatchPartial}(r, (w_0)(w[0..s'])(w[s'..\len{w}]w_1), h_w \blacktriangleright \len{w_0}, h_w \blacktriangleright \ca)$$

and then you'd have to use `congr` and run into HEq'ing problems.[^heq] To solve this, we change the definition of `MatchPartialFree` to take a target word and a proof
of equality:

$$\begin{align*}
{\rm MatchPartialFree}(r) := &\forall w_0, w, w_1, w_t, (h_w : w_t = w_0ww_1), \ca, \ca', \\
                             &(\len{w_0w}, \ca') \in {\rm MatchPartial}(r, w_t, \len{w_0}, \ca) \to \\
                             &\hspace{16mu}\forall w_0', w_1', w_t', (h_w' : w_t' = w_0'ww_1') \\
                             &\hspace{32mu}\exists \ca'', (\len{w_0'w}, \ca'') \in {\rm MatchPartial}(r, w_t', \len{w_0'}, \ca)
\end{align*}$$

and introduce an equivalent version

$$\begin{align*}
{\rm MatchPartialFree}'(r) := &\forall w_0, w, w_1, \exists w_t, (h_w : w_t = w_0ww_1), \forall \ca, \ca', \\
                             &(\len{w_0w}, \ca') \in {\rm MatchPartial}(r, w_t, \len{w_0}, \ca) \to \\
                             &\hspace{16mu}\forall w_0', w_1', \exists w_t', (h_w' : w_t' = w_0'ww_1') \\
                             &\hspace{32mu}\exists \ca'', (\len{w_0'w}, \ca'') \in {\rm MatchPartial}(r, w_t', \len{w_0'}, \ca)
\end{align*}$$

where `MatchPartialFree` allows you to choose $w_t$ when using it, and `MatchPartialFree'` allows you to choose $w_t$ when proving it. The two are proven equivalent
in a single theorem that contains the HEq'ing problems so they don't spread.

### End of the HEq'ing Problems

That aside, we finally prove that every regex in `CRegular` is regular, which is fairly simple now that we have `MatchPartialFree` for all regexes in `CRegular`.
In particular, if $q$ and $r$ are `MatchPartialFree` regexes, then $L(qr) = L(q)L(r)$, and $$L(r^*) = L(r)^*$$!

## The End of the Attempt

We implemented an algorithm that spits out all possible ways to match a word. But when determining if a regex fully matches a word, we only need to know if there's at least 1 match.
Actual programming languages use a backtracking algorithm instead of our combinatorical algorithm,
and this would be fine if it weren't the case that regexes with recursion don't terminate. To illustrate the problem, let $L_\term(r)$ be the set of words that $r$ terminates on
when doing a full match. Note that $L(r) \subseteq L_\term(r)$ since regexes can't match words they don't even terminate on. Consider regexes $q$ and $r$ and the language $L(q\or r)$:
* If $q$ and $r$ both always terminate, things are simple: $L(q\or r) = L(q)\cup L(r)$.
* If we use our combinatorical algorithm, then $L(q\or r) = (L(q)\cap L_\term(r))\cup(L_\term(q)\cap L(r))$, since both $q$ and $r$ get match attempts.
* However, if we use a backtracking algorithm, then $L(q\or r) = L(q)\cup(L_\term(q)\cap L(r))$. If $q$ matches and $r$ doesn't terminate, there's a difference in the languages!

So we gave up the attempt and will probably try again with a backtracking algorithm. The code for attempt 1 is [on Github](https://github.com/hayashi-stl/lean-regex/tree/attempt-1).

[^kempe]: I formalized all the gadgets and then dipped when it was time to actually assemble them into a full construction.
[^empty]: Technically you don't need this one, as $\epsilon$ and $\bot^*$ have the same language, but it's convenient.
[^finsupp]: We used the `Finsupp` type `ℕ →₀ Capture w` here. Unfortunately for some reason `Finsupp` was implemented classically in Lean, so we had to re-implement the functions we needed constructively.
[^backemp]: Blame JavaScript, which in the very JavaScript-like way of making things work at all costs, decided that an empty string is matched when capture $n$ doesn't exist.
[^state]: and then ended up giving on attempt 1 before getting to recursion; oh well. Better luck next time.
[^prop]: Note that it is a `Type u` and not a `Prop`. This is so that we can define computable functions that case on `CRegular`'s constructors, which we can't do if `CRegular : Prop` because of proof irrelevance (all proofs of the same `Prop` are definitionally equal).
[^heq]: We actually defined `MatchPartialFree` slightly differently in Lean and didn't run into HEq'ing problems until it was time to use the conclusion of ${\rm MatchPartialFree}(q)$.