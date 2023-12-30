---
layout: hunt-solution
page-type: hunt-solution
hunt: Fractallia
place: Checkerboard Cross
title: Loop of the Word Search
answer: LET THE MANNED ROOK BE BY THE NEXT DREADED BISHOP
---
If we try to find the words, we can get close, but find out that we're always off by one or two letters. Furthermore, those letters are always P, N, B, R, Q, or K. Combined with the name of the place (Checkerboard Cross) and the flavor text that says to move some pieces, we can tell that chess is involved. According to the flavor text, we move letters representing chess pieces around, letting them jump over other letters even if they're not knights. We move only as many pieces as we need to to find the words. By the title, the movements should form a loop. We then start at the left of the loop and go around it, extracting a letter from the left each time before we make a move. The solutions to the word searches are shown below:

<div class="word-search-array">

<div class="word-search">
<div class="order">1.</div>
<div class="word-search-grid mono">
{% grid page.dir | append: "../word-search-grid.rb" | relative_url %}
{% prop text asc %}
SCJEIGV
NLKYFEL
SKLNJER
GACEBCU
WSATBYL
FTESSOE
MGDTUNS
{% endprop %}
{% prop color asc %}
p      
 p     
  pb  g
   b  g
   bp g
   b  g
      g
{% endprop %}
{% prop extract asc %}
       
       
  @  @ 
       
   @   
       
       
{% endprop %}
{% prop loop csv %}
    ,    ,    ,    ,    ,    ,    ,
    ,    ,    ,    ,    ,    ,    ,
    ,    ,    ,+3+0,    ,    ,-2-2,
    ,    ,    ,    ,    ,    ,    ,
    ,    ,    ,    ,-1+2,    ,    ,
    ,    ,    ,    ,    ,    ,    ,
    ,    ,    ,    ,    ,    ,    ,
{% endprop %}
{% endgrid %}
</div>
<div class="words">
<br><span class="p">BELLS</span>
<br><span class="b">NETS</span>
<br><span class="g">RULES</span>
</div>
</div>

<div class="word-search">
<div class="order">2.</div>
<div class="word-search-grid mono">
{% grid page.dir | append: "../word-search-grid.rb" | relative_url %}
{% prop text asc %}
FCESHKN
HHXEEQB
XEUTUBT
WRRAHEY
MUDIJAR
TBGAHRR
PDNMFSG
{% endprop %}
{% prop color asc %}
 p     
 p   b 
 p  bg 
 p b g 
 pb  g 
 p   g 
P    g 
{% endprop %}
{% prop extract asc %}
       
    @  
       
       
       
@   @  
       
{% endprop %}
{% prop loop csv %}
    ,    ,    ,    ,    ,    ,    ,
    ,    ,    ,    ,    ,-4-4,    ,
    ,    ,    ,    ,    ,    ,    ,
    ,    ,    ,    ,    ,    ,    ,
    ,    ,    ,    ,    ,    ,    ,
    ,+4+0,    ,    ,    ,+0+4,    ,
    ,    ,    ,    ,    ,    ,    ,
{% endprop %}
{% endgrid %}
</div>
<div class="words">
<br><span class="p">CHERUB</span>
<br><span class="b">QUAD</span>
<br><span class="g">BEARS</span>
</div>
</div>

<div class="word-search">
<div class="order">3.</div>
<div class="word-search-grid mono">
{% grid page.dir | append: "../word-search-grid.rb" | relative_url %}
{% prop text asc %}
GCCTKHOPI
HBEBBEDNU
MENMDZEUP
NJTGSCAOD
SHETNQKNX
FDRNRIHOJ
MKAPPARRV
DGLDUALPS
ARJZTIBLJ
{% endprop %}
{% prop color asc %}
  p      
  bbbbbr 
  p    r 
  py   r 
  p y  r 
  p  y r 
 gggggyr 
       r 
         
{% endprop %}
{% prop extract asc %}
         
   @     
 @       
         
      @  
 @       
@    @   
         
         
{% endprop %}
{% prop loop csv %}
    ,    ,    ,    ,    ,    ,    ,    ,    ,
    ,    ,    ,    ,-2-1,    ,    ,    ,    ,
    ,    ,+0-3,    ,    ,    ,    ,    ,    ,
    ,    ,    ,    ,    ,    ,    ,    ,    ,
    ,    ,    ,    ,    ,    ,    ,-3+3,    ,
    ,    ,-1-1,    ,    ,    ,    ,    ,    ,
    ,+5+0,    ,    ,    ,    ,+1+2,    ,    ,
    ,    ,    ,    ,    ,    ,    ,    ,    ,
    ,    ,    ,    ,    ,    ,    ,    ,    ,
{% endprop %}
{% endgrid %}
</div>
<div class="words">
<br><span class="p">CENTER</span>
<br><span class="b">EBBED</span>
<br><span class="g">KAPPA</span>
<br><span class="y">RING</span>
<br><span class="r">PRONOUN</span>
</div>
</div>

<div class="word-search">
<div class="order">4.</div>
<div class="word-search-grid mono">
{% grid page.dir | append: "../word-search-grid.rb" | relative_url %}
{% prop text asc %}
TCXJISD
FIEAEDU
JUOBWOR
BFOFQOK
BRMNBGA
FTPENPR
SHDWVLS
{% endprop %}
{% prop color asc %}
     p 
    p  
   p  b
  p  b 
 p  b  
   b   
  b    
{% endprop %}
{% prop extract asc %}
       
       
  @  @ 
       
@  @   
       
       
{% endprop %}
{% prop loop csv %}
    ,    ,    ,    ,    ,    ,    ,
    ,    ,    ,    ,    ,    ,    ,
    ,    ,    ,+3+0,    ,    ,-2-2,
    ,    ,    ,    ,    ,    ,    ,
    ,+2+2,    ,    ,-3+0,    ,    ,
    ,    ,    ,    ,    ,    ,    ,
    ,    ,    ,    ,    ,    ,    ,
{% endprop %}
{% endgrid %}
</div>
<div class="words">
<br><span class="p">ROBES</span>
<br><span class="b">ROBED</span>
</div>
</div>

<div class="word-search">
<div class="order">5.</div>
<div class="word-search-grid mono">
{% grid page.dir | append: "../word-search-grid.rb" | relative_url %}
{% prop text asc %}
FKPATI
VILEAN
JYWRUT
RKREQU
HAQGSH
YXGJVX
{% endprop %}
{% prop color asc %}
    p 
    p 
   bp 
  b p 
 b  p 
b     
{% endprop %}
{% prop extract asc %}
      
      
      
 @ @  
      
      
{% endprop %}
{% prop loop csv %}
    ,    ,    ,    ,    ,    ,
    ,    ,    ,    ,    ,    ,
    ,    ,    ,    ,    ,    ,
    ,    ,+2+0,    ,-2+0,    ,
    ,    ,    ,    ,    ,    ,
    ,    ,    ,    ,    ,    ,
{% endprop %}
{% endgrid %}
</div>
<div class="words">
<br><span class="p">SQUAT</span>
<br><span class="b">ARRAY</span>
</div>
</div>

<div class="word-search">
<div class="order">6.</div>
<div class="word-search-grid mono">
{% grid page.dir | append: "../word-search-grid.rb" | relative_url %}
{% prop text asc %}
XTEHYQ
HSKLUW
FUVEDX
IRBASP
PERRXP
CWGTTM
{% endprop %}
{% prop color asc %}
     p
    p 
   p  
  p   
 p    
p     
{% endprop %}
{% prop extract asc %}
    @ 
      
      
 @    
      
      
{% endprop %}
{% prop loop csv %}
    ,    ,    ,    ,    ,-3-3,
    ,    ,    ,    ,    ,    ,
    ,    ,    ,    ,    ,    ,
    ,    ,+3+3,    ,    ,    ,
    ,    ,    ,    ,    ,    ,
    ,    ,    ,    ,    ,    ,
{% endprop %}
{% endgrid %}
</div>
<div class="words">
<br><span class="p">QUEBEC</span>
</div>
</div>

<div class="word-search">
<div class="order">7.</div>
<div class="word-search-grid mono">
{% grid page.dir | append: "../word-search-grid.rb" | relative_url %}
{% prop text asc %}
VALMSMP
HSPEBLG
EJERFRE
TNTDAND
GCEPAZR
QNHBFXT
THVIOYY
{% endprop %}
{% prop color asc %}
    p  
   p  b
  p  bg
 p  bg 
   bg  
  bg   
       
{% endprop %}
{% prop extract asc %}
       
       
       
@      
  @    
  @    
       
{% endprop %}
{% prop loop csv %}
    ,    ,    ,    ,    ,    ,    ,
    ,    ,    ,    ,    ,    ,    ,
    ,    ,    ,    ,    ,    ,    ,
    ,+2-2,    ,    ,    ,    ,    ,
    ,    ,    ,-2+1,    ,    ,    ,
    ,    ,    ,+0+1,    ,    ,    ,
    ,    ,    ,    ,    ,    ,    ,
{% endprop %}
{% endgrid %}
</div>
<div class="words">
<br><span class="p">SEEN</span>
<br><span class="b">GRAPH</span>
<br><span class="g">BANE</span>
</div>
</div>

<div class="word-search">
<div class="order">8.</div>
<div class="word-search-grid mono">
{% grid page.dir | append: "../word-search-grid.rb" | relative_url %}
{% prop text asc %}
MDGTYLW
JEXREBY
TNAGERE
RIEQLAE
PAUHHIT
NRTQSNM
KBDCZPB
{% endprop %}
{% prop color asc %}
 gb    
 g b p 
yg  bp 
 y   p 
 gy  pb
 g y p 
       
{% endprop %}
{% prop extract asc %}
       
  @ @  
       
       
       
@ @    
       
{% endprop %}
{% prop loop csv %}
    ,    ,    ,    ,    ,    ,    ,
    ,    ,    ,+0-4,    ,-2+0,    ,
    ,    ,    ,    ,    ,    ,    ,
    ,    ,    ,    ,    ,    ,    ,
    ,    ,    ,    ,    ,    ,    ,
    ,+4+4,    ,-2+0,    ,    ,    ,
    ,    ,    ,    ,    ,    ,    ,
{% endprop %}
{% endgrid %}
</div>
<div class="words">
<br><span class="p">BRAIN</span>
<br><span class="b">GREAT</span>
<br><span class="g">RAINED</span>
<br><span class="y">QUIT</span>
</div>
</div>

<div class="word-search">
<div class="order">9.</div>
<div class="word-search-grid mono">
{% grid page.dir | append: "../word-search-grid.rb" | relative_url %}
{% prop text asc %}
PIRTNDGPT
NYHJENARO
KEBLIFDBM
FASEMLALH
GDBBPSZUH
QUUANNIEM
DNQKONRSC
LEVOEBXNL
FSLFSGTVK
{% endprop %}
{% prop color asc %}
      g  
     g   
    g  r 
   g   r 
 bg    ry
 b ppppp 
 b    yr 
 b   y   
 b  y    
{% endprop %}
{% prop extract asc %}
         
    @    
      @  
         
 @       
   @     
@    @   
    @    
         
{% endprop %}
{% prop loop csv %}
    ,    ,    ,    ,    ,    ,    ,    ,    ,
    ,    ,    ,    ,    ,-3-3,    ,    ,    ,
    ,    ,    ,    ,    ,    ,    ,-2+1,    ,
    ,    ,    ,    ,    ,    ,    ,    ,    ,
    ,    ,-1-2,    ,    ,    ,    ,    ,    ,
    ,    ,    ,    ,+3+3,    ,    ,    ,    ,
    ,+5+0,    ,    ,    ,    ,-1-1,    ,    ,
    ,    ,    ,    ,    ,-1+2,    ,    ,    ,
    ,    ,    ,    ,    ,    ,    ,    ,    ,
{% endprop %}
{% endgrid %}
</div>
<div class="words">
<br><span class="p">ANNIE</span>
<br><span class="b">DUNES</span>
<br><span class="g">BEING</span>
<br><span class="y">HERBS</span>
<br><span class="r">BLUES</span>
</div>
</div>

<div class="word-search">
<div class="order">10.</div>
<div class="word-search-grid mono">
{% grid page.dir | append: "../word-search-grid.rb" | relative_url %}
{% prop text asc %}
KLOKEYSL
FRHQNNKS
ODULOFIR
PAPRPOMU
LJAXVSPO
BBKGXIRP
RMMRLEOB
SHLSMWVZ
{% endprop %}
{% prop color asc %}
   bbbb 
   g p  
  g p y 
 g p  y 
g p   y 
 p    y 
      y 
      y 
{% endprop %}
{% prop extract asc %}
  @     
  @ @   
        
        
     @  
@    @  
        
        
{% endprop %}
{% prop loop csv %}
    ,    ,    ,+2-1,    ,    ,    ,    ,
    ,    ,    ,+0+1,    ,-4-4,    ,    ,
    ,    ,    ,    ,    ,    ,    ,    ,
    ,    ,    ,    ,    ,    ,    ,    ,
    ,    ,    ,    ,    ,    ,-3+3,    ,
    ,+5+0,    ,    ,    ,    ,+0+1,    ,
    ,    ,    ,    ,    ,    ,    ,    ,
    ,    ,    ,    ,    ,    ,    ,    ,
{% endprop %}
{% endgrid %}
</div>
<div class="words">
<br><span class="p">BARONS</span>
<br><span class="b">KEYS</span>
<br><span class="g">EQUAL</span>
<br><span class="y">IMPROV</span>
</div>
</div>

</div>
<br>

We end up extracting `LET THE MAKBED BOON KE RY THE NEXT DNEADED BISHON`, which almost makes sense.
Let's put the letters into the final grid:

<div class="word-search-grid mono">
{% grid page.dir | append: "../word-search-grid.rb" | relative_url %}
{% prop text asc %}
CEVBHLOFNSEA
LLETTHEMAKBY
WEDBOONKERYN
RTHENEXTDNET
SADEDBISHONC
OLEQHUVOISPT
{% endprop %}
{% prop region asc %}
            
 @@@@@@@@@@ 
 @@@@@@@@@@ 
 @@@@@@@@@@ 
 @@@@@@@@@@ 
            
{% endprop %}
{% endgrid %}
</div>
<br>

It's another piece-moving puzzle. But this time, according to the text, we move *all* the P's, N's, B's, R's, Q's, and K's,
and we don't extract by looking to the left. We also notice that the rooks, as indicated by the emphasized <b><u>r</u></b>'s,
move as far as they can.

<div class="word-search-grid mono">
{% grid page.dir | append: "../word-search-grid.rb" | relative_url %}
{% prop text asc %}
CEVQHLOFKSEA
LLETTHEMANNY
WEDROOKBEBYN
BTHENEXTDRET
SADEDBISHOPC
OLENHUVOISNT
{% endprop %}
{% prop loop csv %}
    ,    ,    ,-3-3,    ,    ,    ,    ,+2-1,    ,    ,    ,
    ,    ,    ,    ,    ,    ,    ,    ,    ,-1+1,-1-1,    ,
    ,    ,    ,+2-2,    ,    ,-2-1,-1+0,    ,-6+0,    ,-2+1,
+9+0,    ,    ,    ,-1-2,    ,    ,    ,    ,+1-2,    ,    ,
    ,    ,    ,    ,    ,+2+2,    ,    ,    ,    ,+1+2,    ,
    ,    ,    ,+0+5,    ,    ,    ,    ,    ,    ,+0+1,    ,
{% endprop %}
{% prop region asc %}
            
 @@@@@@@@@@ 
 @@@@@@@@@@ 
 @@@@@@@@@@ 
 @@@@@@@@@@ 
            
{% endprop %}
{% endgrid %}
</div>
<br>

Now we read off the answer, `LET THE MANNED ROOK BE BY THE NEXT DREADED BISHOP`.