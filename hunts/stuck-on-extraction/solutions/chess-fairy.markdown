---
layout: hunt-solution
page-type: hunt-solution
hunt: Stuck on Extraction
title: The Chess Fairy
answer: COMBINE PERMUTATIONS
---

The title clues that this has to do with fairy chess pieces. A list can be found [here](https://en.wikipedia.org/wiki/List_of_fairy_chess_pieces).
From the flavor text, we see that these are mate-in-1 puzzles for the team with the fairy piece (white) and should
figure out which fairy chess piece is which. Each one is used exactly once.

<div class="chess-flexbox">
    <div class="chessboard">
        <p> 1. Amazon (Queen + Knight). Ff3#.<img class="chessboard" src="../chessboards/solution-01.svg"></p>
        <p> 2. Princess (Bishop + Knight). b4#.<img class="chessboard" src="../chessboards/solution-02.svg"></p>
        <p> 3. Wazir ((0,1)-leaper). Fe4#.<img class="chessboard" src="../chessboards/solution-03.svg"></p>
        <p> 4. Nightrider ((1,2)-rider). Qc6#.<img class="chessboard" src="../chessboards/solution-04.svg"></p>
        <p> 5. Zebra ((2,3)-leaper). Fxd4#.<img class="chessboard" src="../chessboards/solution-05.svg"></p>
        <p> 6. Imitator (Move: Queen, Capture: like piece captured). Fxc6#.<img class="chessboard" src="../chessboards/solution-06.svg"></p>
        <p> 7. Mann (King, but not load-bearing). Fb4#.<img class="chessboard" src="../chessboards/solution-07.svg"></p>
        <p> 8. Camel ((1,3)-leaper). Fe7#.<img class="chessboard" src="../chessboards/solution-08.svg"></p>
        <p> 9. Ferz ((1,1)-leaper). Fb7#.<img class="chessboard" src="../chessboards/solution-09.svg"></p>
        <p>10. Alfil ((2,2)-leaper). Fc3#.<img class="chessboard" src="../chessboards/solution-10.svg"></p>
    </div>
    <div class="chessboard">
        <p>11. Fiveleaper ((0,5)-leaper + (3,4)-leaper). Ff1#.<img class="chessboard" src="../chessboards/solution-11.svg"></p>
        <p>12. Berolina pawn (Pawn, but movement for move and capture are switched). c3#.<img class="chessboard" src="../chessboards/solution-12.svg"></p>
        <p>13. Checker king (Kinged piece in checkers, capture is optional). Nxe6#.<img class="chessboard" src="../chessboards/solution-13.svg"></p>
        <p>14. Immobilizer (Queen, immobilizes pieces a king's move away). Rh4#.<img class="chessboard" src="../chessboards/solution-14.svg"></p>
        <p>15. Withdrawer (Queen, captures piece behind it). Fxb2#.<img class="chessboard" src="../chessboards/solution-15.svg"></p>
        <p>16. Zero ((0,0)-leaper). Qb6#.<img class="chessboard" src="../chessboards/solution-16.svg"></p>
        <p>17. Wizard (Alfil + Camel). Ff4#.<img class="chessboard" src="../chessboards/solution-17.svg"></p>
        <p>18. Threeleaper ((0,3)-leaper). Ff6#.<img class="chessboard" src="../chessboards/solution-18.svg"></p>
        <p>19. Grasshopper (Queen, but must hop over a piece and land in front of it). Fc4#.<img class="chessboard" src="../chessboards/solution-19.svg"></p>
    </div>
</div>

Then we answer the question in the flavor text by looking at the fairy pieces' final positions and extracting
a letter from the letter grid for each one, giving `COMBINE PERMUTATIONS`.