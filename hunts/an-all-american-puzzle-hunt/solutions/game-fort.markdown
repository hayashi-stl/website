---
layout: hunt-solution
page-type: hunt-solution
hunt: An All-American Puzzle Hunt
title: Game Fort
answer: FLYNN DID AN ARMY EXIT
---

First, we solve the clues. We realize that they are each 9 letters long.

<div style="font-family: monospace;" markdown="1">

 1. BABAISYOU
 2. COMMUNITY
 3. DRYBOWSER
 4. EMERGENCY
 5. FLASHFIRE
 6. FORBIDDEN
 7. FULLHOUSE
 8. GREENWISP
 9. HONEYCOMB
10. HYPERNOVA
11. IRONCHEST
12. ITEMBOXES
13. NOHITTERS
14. RENFIELDS
15. SYMPHONIA
16. THREEFOLD
17. TURNOVERS
18. UPSPECIAL
</div>

Then we use the fortress provided and the flavor text to get an ordering on the numbers. It turns out that
the fortress is Super Mario 64 DS [Whomp's Fortress](https://www.mariowiki.com/Whomp%27s_Fortress). So the numbers must be read
in the following order:
* The 7 stars' locations in star order (7, 5, 3, 17, 8, 6, 18)
* The 8 red coins' locations from highest to lowest, breaking ties by increasing distance from the floating islands (14, 10, 13, 1, 16, 2, 9, 4).
    Note that 13, 1, and 16 tie by height and must use the tiebreaker.
* The location of that last red coin in the original Super Mario 64 (12)
* The lower warp location (15)
* The higher warp location (11)

This is the order we must select the answers in to put them in the grid. Then, as the flavor indicates,
we read the diagonal. Doing so gives:

<div class="fort-grid">
{% grid page.dir | append: "../fort-grid.rb" | relative_url %}
{% prop block asc %}
         @@@@@@@@@
         @@@@@@@@@
         @@@@@@@@@
         @@@@@@@@@
         @@@@@@@@@
         @@@@@@@@@
         @@@@@@@@@
         @@@@@@@@@
         @@@@@@@@@
@@@@@@@@@         
@@@@@@@@@         
@@@@@@@@@         
@@@@@@@@@         
@@@@@@@@@         
@@@@@@@@@         
@@@@@@@@@         
@@@@@@@@@         
@@@@@@@@@         
{% endprop %}
{% prop text asc %}
FULLHOUSE         
FLASHFIRE         
DRYBOWSER         
TURNOVERS         
GREENWISP         
FORBIDDEN         
UPSPECIAL         
RENFIELDS         
HYPERNOVA         
         NOHITTERS
         BABAISYOU
         THREEFOLD
         COMMUNITY
         HONEYCOMB
         EMERGENCY
         ITEMBOXES
         SYMPHONIA
         IRONCHEST
{% endprop %}
{% prop emph asc %}
@                 
 @                
  @               
   @              
    @             
     @            
      @           
       @          
        @         
         @        
          @       
           @      
            @     
             @    
              @   
               @  
                @ 
                 @
{% endprop %}
{% endgrid %}
</div>
<br>

So the answer is `FLYNN DID AN ARMY EXIT`.