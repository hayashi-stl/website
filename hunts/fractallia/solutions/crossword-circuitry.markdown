---
layout: hunt-solution
page-type: hunt-solution
hunt: Fractallia
place: Fractal Access Memory Box
banner-offset: -160px
title: Crossword Circuitry
answer: SCRAMBLE
---

First, we figure out the options for each clue, since they're all pretty easy.
<div class="circuitry-clues">
    <div>
        Down:
        <ol> 
            <li value="2">GORGES or GRADES or IMAGES or ISRAEL</li>
            <li value="3">BUS or HER</li>
            <li value="4">FAT or ODE</li>
            <li value="6">NITRIC or SHRIMP</li>
            <li value="8">ERASE or LIGHT</li>
            <li value="10">NANO or STAB</li>
            <li value="12">GRATED or GUESTS or NEARED or NEEDED</li>
            <li value="13">INVITED or INVOLVE</li>
            <li value="14">NYAN or ONCE</li>
            <li value="16">EDITED or EVADED or GRADED or GUITAR</li>
            <li value="17">INVADE or INVEST</li>
            <li value="18">GOLD or RICE</li>
            <li value="21">EVIL or TEAM</li>
            <li value="22">INVENTOR or INVOLVES</li>
            <li value="26">CEASED or CREATE or NEEDLE or NUANCE</li>
            <li value="28">TRUE</li>
            <li value="29">ARABIC or HANDLE</li>
            <li value="30">AUDIT or NEEDS</li>
            <li value="31">INVENT or INVOKE</li>
            <li value="33">INTERNET or LANGUAGE</li>
            <li value="36">GEESE or GENUS or TONES or TREES</li>
            <li value="37">ROCKS or SHELL</li>
        </ol>
    </div>
    <div>
        Across:
        <ol>
            <li value="1">FAMOUSSLOGAN or THEORETICIAN</li>
            <li value="3">BEAD or HARD</li>
            <li value="4">EATS or ODOR</li>
            <li value="5">LABORATORIES or SOUTHEASTERN</li>
            <li value="7">FALSE or TREAT</li>
            <li value="9">EXTRANEOUS or TELEVISION</li>
            <li value="11">CARGO or PIANO</li>
            <li value="14">OVER or NEAR</li>
            <li value="15">BEGAN or OCEAN</li>
            <li value="18">GRID or ROAD</li>
            <li value="19">IDLE or OPEN</li>
            <li value="20">DUE or SET</li>
            <li value="23">APPLE or ENDED</li>
            <li value="24">DOUBLE or RECORD</li>
            <li value="25">LATINO or MEXICO</li>
            <li value="27">EAT or OFF</li>
            <li value="29">AUGUST or HUMBLE</li>
            <li value="30">APPEAR or NUMBER</li>
            <li value="32">DOOR or EGGS</li>
            <li value="33">INDEPENDENT or LIMITATIONS</li>
            <li value="34">FACTO or THERE</li>
            <li value="35">ERDOGAN or TIBETAN</li>
            <li value="37">RAINED or SECOND</li>
            <li value="38">EXCHANGE or STRAIGHT</li>
            <li value="39">FINAL or TRIES</li>
        </ol>
    </div>
</div>

We could try to pick options and use them to fill the crossword, but it's easy to get stuck with just one row/column left to fill
and no words that fit. The flavor text tells us that yellow boxes are for extraction, so perhaps we should investigate the green and cyan boxes.
If we examine which letters can go in the green boxes, we see that they all can be either F or T. We can also notice that
the letters in the cyan boxes are forced, and there are 3 patterns:

<div class="circuitry-grid">
{% grid page.dir | append: "../circuitry-grid.rb" | relative_url %}
{% prop text asc %}
AN   O   I
         N
D    R   V
{% endprop %}
{% prop cell asc %}
cc   c   c
         c
c    c   c
{% endprop %}
{% endgrid %}
</div>
<br>

It seems like this crossword is a circuit in disguise! When we draw out the circuit, it looks like this:

<img class="center-img" src="../circuitry-circuit.svg"/>
<br>

Since 28 Down is forced to be TRUE, we must find assignments for 1 Across, 7 Across, 34 Across, and 39 Across
that satisfy the circuit. There's only one assignment that works: false, true, false, false. So we use the words
that start with F, T, F, and F respectively for those clues. From there, the crossword flows, with the result shown below:

<div class="circuitry-grid">
{% grid page.dir | append: "../circuitry-grid.rb" | relative_url %}
{% prop text asc %}
FAMOUSSLOGAN                      
         O                        
       HARD                       
       E G                        
    FOUR E                        
    A    SOUTHEASTERN             
TREAT               I             
  R                 T             
  A                 R             
  S                 I             
  EXTRANEOUS        CARGO         
           T           U          
           A      I  OVER         
           BEGAN  N  N S          
             U    V  C T          
       I   GRID   IDLE SET        
       N   O T    T      E      I 
       V   L A    E      A      N 
       ENDED RECORD      MEXICO V 
       N                     E  EAT
  AUGUST                 APPEAR N R
  R                      D   S  T U
  A I                    U   E  O E
  B N                    L   DOOR 
  I V          INDEPENDENT        
FACTO          N                  
    K          T                  
    ERDOGAN    E                  
        E      R                  
    SECOND     N                  
    H   U      E                  
    E   STRAIGHT                  
    L                             
FINAL                             
{% endprop %}
{% prop cell asc %}
b......x..cc                       
         .                         
       ...c                        
       . .                         
    .... .                         
    .    ............              
b....               .              
  .                 .              
  .                 .              
  x                 .              
  ..........        x...c          
           .           .           
           .      c  ...c          
           ...cc  c  . .           
             .    c  . .           
       c   .x.c   .... ...         
       c   . .    .      .      c  
       c   . .    .      .      c  
       ..... ......      x....c c  
       .                     .  ..b
  ......                 x....c . .
  .                      .   .  . .
  . c                    .   .  . .
  x c                    .   ....  
  . c          ...........         
b....          .                   
    .          .                   
    .....cc    .                   
        .      .                   
    .x...c     .                   
    .   .      .                   
    .   ........                   
    .                              
b....                              
{% endprop %}
{% prop number csv %}
1 ,  ,  ,  ,  ,  ,  ,  ,  ,2 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
  ,  ,  ,  ,  ,  ,  ,3 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
  ,  ,  ,  ,4 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
  ,  ,  ,  ,  ,  ,  ,  ,  ,5 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,6 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
7 ,  ,8 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
  ,  ,9 ,  ,  ,  ,  ,  ,  ,  ,  ,10,  ,  ,  ,  ,  ,  ,  ,  ,11,  ,  ,12,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,13,  ,  ,14,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,15,  ,16,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
  ,  ,  ,  ,  ,  ,  ,17,  ,  ,  ,18,  ,  ,  ,  ,  ,  ,19,  ,  ,  ,  ,20,  ,21,  ,  ,  ,  ,  ,  ,  ,  ,  ,
  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,22,  ,  ,
  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
  ,  ,  ,  ,  ,  ,  ,23,  ,  ,  ,  ,  ,24,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,25,  ,  ,  ,26,  ,  ,  ,  ,  ,
  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,27,  ,28,
  ,  ,29,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,30,  ,  ,  ,  ,  ,  ,  ,  ,  ,
  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
  ,  ,  ,  ,31,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,32,  ,  ,  ,  ,  ,
  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,33,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
34,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
  ,  ,  ,  ,35,  ,  ,  ,36,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
  ,  ,  ,  ,37,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
  ,  ,  ,  ,  ,  ,  ,  ,38,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
39,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
{% endprop %}
{% endgrid %}
</div>
<br>

We take the letters highlighted in yellow and anagram them as the flavor text indicates, giving `SCRAMBLE`.