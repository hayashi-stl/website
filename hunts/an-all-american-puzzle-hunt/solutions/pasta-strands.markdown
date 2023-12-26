---
layout: hunt-solution
page-type: hunt-solution
hunt: An All-American Puzzle Hunt
title: Pasta Strands
answer: NO TRIAL MIXINGS
---
First, we solve the clues, using the pasta grid to give enumerations, and put them into the grid.
When we look in the grid, we can find names of pasta shapes and sauces hidden vertically. As the flavor text clues,
we have a <span class="puzzle-flavor">pasta tube</span>, so words can wrap around.

<div class="pasta-grid">
{% grid page.dir | append: "../pasta-grid.rb" | relative_url %}
{% prop number asc %}
1         2        3        
1           2     3         
1         2       3         
1       2        3          
1        2         3        
1        2          3       
1      2         3          
1          2         3      
1       2          3        
1      2        3           
1        2         3        
{% endprop %}
{% prop text asc %}
toOknoTeoFaNdoTheRsaluminiUm
boRninTheUsAleAGuEmozaMBique
thEsebIrdSlochNEsspharAOhtoP
deCeasedFIfthtIMeinchaRLottE
oRChestrALightyEaRsmarIObroS
jOHncaSoRLewisCLeAleliNGuisT
sTIrruPrFIdLabELsDontwANnagO
vIEnnaAwArdAngLIcIzedgREater
oNToloGyLieShaLfwAydisASteRs
mITzvaHaLliAncEsiTswednEsdAy
ovErthErEenGlaNdwOnhedgehoGs
{% endprop %}
{% endgrid %}
</div>

There are 9 pasta shapes and 9 pasta noodles in the bottom picture, so we have a correspondence. The same goes for sauces.
We index the pasta shapes and sauces using the numbers indicated in the bottom picture, giving `NO TRIAL MI` for the pasta shapes
and `INGS` for the sauces. This, combined with the `X` in the middle of the bottom picture, gives `NO TRIAL MIXINGS`.