---
layout: hunt-solution
page-type: hunt-solution
metapuzzle: true
hunt: Stuck on Extraction
title: "Meta: Extraction"
answer: VANEMON EXTRACT
---

This is a metapuzzle, so first we collect answers:
* The Jig is Up: `X IS WORD Y IS LETTER`
* The Chess Fairy: `COMBINE PERMUTATIONS`
* The (x, y) Conundrum: `FLY A COMPLEX PLANE`
* Word Scramble: `PERMUTATORIAL EXPLOSION`

Then, we notice that the dictionary entry for "extraction" matches the [online Merriam-Webster dictionary](https://www.merriam-webster.com)
(as of April 2021, at least).
Each of the 14 items says a word or phrase to look up, followed by text about what to do next. How to interpret the text depends
on the extraction method of the corresponding puzzle.

* The Jig is Up: Solve cryptic clues to get index.
    * [Look up "x"](https://web.archive.org/web/20230322175457/https://www.merriam-webster.com/dictionary/x).
        Cryptic clue answer is **four**. Extract `R`.
    * [Look up "x"](https://web.archive.org/web/20230322175457/https://www.merriam-webster.com/dictionary/x).
        Cryptic clue answer is **ten**. Extract `E`.
    * [Look up "letter"](https://web.archive.org/web/20231029144752/https://www.merriam-webster.com/dictionary/letter).
        Cryptic clue answer is **fourteen**. Extract `N`.
* The Chess Fairy: Extract words that are names of fairy chess pieces, then solve chess puzzles and extract as in "The Chess Fairy".
The letter grid is the same.
    * [Look up "combine"](https://web.archive.org/web/20230926003732/https://www.merriam-webster.com/dictionary/combine).
        Extract "frog" and solve the appropriate chess puzzle. Extract `X`.
    * [Look up "combine"](https://web.archive.org/web/20230926003732/https://www.merriam-webster.com/dictionary/combine).
        Extract "moo" and solve the appropriate chess puzzle. Extract `T`.
    * [Look up "permutation"](https://web.archive.org/web/20221205133251/https://www.merriam-webster.com/dictionary/permutation).
        Extract "princess" and solve the appropriate chess puzzle. Extract `C`.
    * [Look up "combine"](https://web.archive.org/web/20230926003732/https://www.merriam-webster.com/dictionary/combine).
        Extract "gnu" and solve the appropriate chess puzzle. Extract `T`.
* The (x, y) Conundrum: Index into the definition using the coordinates as in "The (x, y) Conundrum"
    * [Look up "complex plane"](https://web.archive.org/web/20230127221211/https://www.merriam-webster.com/dictionary/complex%20plane).
        2nd word, 5th letter. Extract `E`.
    * [Look up "complex plane"](https://web.archive.org/web/20230127221211/https://www.merriam-webster.com/dictionary/complex%20plane).
        8th word, 1st letter. Extract `M`.
    * [Look up "complex plane"](https://web.archive.org/web/20230127221211/https://www.merriam-webster.com/dictionary/complex%20plane).
        4th word, 2nd letter. Extract `O`.
    * [Look up "complex plane"](https://web.archive.org/web/20230127221211/https://www.merriam-webster.com/dictionary/complex%20plane).
        6th word, 4th letter. Extract `N`.
* Word Scramble: Extract 4-letter strings, compute permuation, and extract as in "Word Scramble"
    * [Look up "permutator"](https://web.archive.org/web/20230507214147/https://www.merriam-webster.com/dictionary/permutator).
        From ROTA to ROTA, permutation 1234. Extract `A`.
    * [Look up "explode"](https://web.archive.org/web/20230430104814/https://www.merriam-webster.com/dictionary/explode).
        From PRES to SREP, permutation 4231. Extract `V`.
    * [Look up "permutator"](https://web.archive.org/web/20230507214147/https://www.merriam-webster.com/dictionary/permutator).
        From MAGN to MAGN, permutation 1234. Extract `A`.

Chess puzzle solutions:
<div class="chess-flexbox">
    <div class="chessboard">
        <p>Moo (Knight that can't jump over pieces). Fd6#.<img class="chessboard" src="../chessboards/solution-21.svg"></p>
        <p>Frog ((1,1)-leaper + (0,3)-leaper). Fe1#.<img class="chessboard" src="../chessboards/solution-20.svg"></p>
    </div>
    <div class="chessboard">
        <p>Gnu ((1,2)-leaper + (1,3)-leaper). Fe2#.<img class="chessboard" src="../chessboards/solution-23.svg"></p>
        <p>Princess (Bishop + Knight). g6.<img class="chessboard" src="../chessboards/solution-22.svg"></p>
    </div>
</div>

We put the letters we extracted in the order specified by the enumeration to get `VANEMON EXTRACT`.