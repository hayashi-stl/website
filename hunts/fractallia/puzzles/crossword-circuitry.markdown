---
layout: hunt-puzzle
page-type: hunt-puzzle
hunt: Fractallia
place: Fractal Access Memory Box
banner-offset: -160px
title: Crossword Circuitry
answer: SCRAMBLE
---
<followup>
<div class="center-text">You got a Scramble sheet!</div>
<div class="scramble-grid">
{% grid page.dir | append: "../scramble-grid.rb" | relative_url %}
{% prop number csv %}
23,21, , ,2, ,5,3,17,6,18, ,15,7, ,24,20, ,19,9,1,12,13,14, ,22,25,16,8, ,10,28, ,26, ,4, ,27,11, ,
{% endprop %}
{% endgrid %}
</div>
</followup>

<p class="puzzle-flavor">
After zooming out, you realize that Checkerboard Cross was part of a circuit. A crossword circuit. But wait a minute! Who decided that ‘or’ in a crossword clue allows you to choose? That must be the case, as the clues on both sides are completely unrelated, and thus you may want to use a pencil. If you manage to extract some letters from the yellow boxes, you'll want to mix them up.
</p>

<div class="circuitry-grid">
{% grid page.dir | append: "../circuitry-grid.rb" | relative_url %}
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

<h4 class="center-text">Clues</h4>
<div class="circuitry-clues">
    <div>
        Down:
        <ol> 
            <li value="2">Eats a lot of food, or letters that are given to assignments, or pictures, or the country known for Jews</li>
            <li value="3">A school transportation vehicle, or the feminine possessive pronoun</li>
            <li value="4">Overweight, or ____ to joy</li>
            <li value="6">Containing nitrogen, or a seafood with a light shell</li>
            <li value="8">To remove writing from paper, or not heavy</li>
            <li value="10">On a scale of a billionth, or to jab with a spear</li>
            <li value="12">Chopped into small pieces but with a special tool, or visitors, or got closer to, or required</li>
            <li value="13">Asked to show up to a party, or to include in something</li>
            <li value="14">A memetic rainbow cat, or one time</li>
            <li value="16">Made modifications to, or dodged, or checked someone’s work and assigned a letter to it, or a plucked string instrument</li>
            <li value="17">To forcefully visit another country, or to buy a share in something</li>
            <li value="18">A precious yellow metal, or a common grain food to fry</li>
            <li value="21">Not good, or a group of people with a common goal</li>
            <li value="22">Someone who makes something completely new, or includes in something</li>
            <li value="26">Stopped, or to make, or a spiky thing used in sewing, or a shade of meaning</li>
            <li value="28">Not false</li>
            <li value="29">Language written right-to-left in cursive, or what you grab to pull a door</li>
            <li value="30">To investigate a financial account, or requires</li>
            <li value="31">To make something completely new, or to cause a procedure</li>
            <li value="33">What webpages are part of, or what someone speaks</li>
            <li value="36">Birds famously referenced in children's game, or specific biological classification, or pitches, or graphs without cycles</li>
            <li value="37">Stones but rougher, or the protective part of a clam</li>
        </ol>
    </div>
    <div>
        Across:
        <ol>
            <li value="1">"I'm lovin' it" for example, or someone who studies theory</li>
            <li value="3">A small part in a necklace, or difficult</li>
            <li value="4">Consumes food, or a smell</li>
            <li value="5">Places of research, or the region of the U.S. that Florida is in</li>
            <li value="7">Not true, or a sweet snack</li>
            <li value="9">Extra and wrong, or a TV</li>
            <li value="11">Something that a ship transports, or a keyed musical instrument</li>
            <li value="14">Above, or close to</li>
            <li value="15">Started, or a huge body of water</li>
            <li value="18">A lattice, or ground that cars move on</li>
            <li value="19">Lazy, or not closed</li>
            <li value="20">An assignment that must be turned in now, or to change a value</li>
            <li value="23">A red fruit, or finished</li>
            <li value="24">Two times, or a maximal achievement that can be broken</li>
            <li value="25">Someone from Latin America, or the country south of the U.S.</li>
            <li value="27">To consume food, or not on</li>
            <li value="29">The 8th month, or not proud</li>
            <li value="30">To spontaneously show up, or 3 as an example</li>
            <li value="32">A wall that can be opened or closed, or things that chickens lay</li>
            <li value="33">Not relying on others, or caveats</li>
            <li value="34">De ____ (not de jure), or not here but in range</li>
            <li value="35">Current (or former?) prime minister of Türkiye, or someone from the Himalayas</li>
            <li value="37">Dropped water from the sky, or a very short unit of time</li>
            <li value="38">Switch of two objects, or not curved</li>
            <li value="39">Last, or makes an attempt</li>
        </ol>
    </div>
</div>
<br>

<h4 class="center-text">Word bank</h4>
<div class="circuitry-bank">
APPEAR<br>
APPLE<br>
ARABIC<br>
AUDIT<br>
AUGUST<br>
BEAD<br>
BEGAN<br>
BUS<br>
CARGO<br>
CEASED<br>
CREATE<br>
DOOR<br>
DOUBLE<br>
DUE<br>
EAT<br>
EATS<br>
EDITED<br>
EGGS<br>
ENDED<br>
ERASE<br>
ERDOGAN<br>
EVADED<br>
EVIL<br>
EXCHANGE<br>
EXTRANEOUS<br>
FACTO<br>
FALSE<br>
FAMOUSSLOGAN<br>
FAT<br>
FINAL<br>
GEESE<br>
GENUS<br>
GOLD<br>
GORGES<br>
GRADED<br>
GRADES<br>
GRATED<br>
GRID<br>
GUESTS<br>
GUITAR<br>
HARD<br>
HER<br>
HERE<br>
HUMBLE<br>
IDLE<br>
IMAGES<br>
INDEPENDENT<br>
INTERNET<br>
INVADE<br>
INVENT<br>
INVENTOR<br>
INVEST<br>
INVITED<br>
INVOKE<br>
INVOLVE<br>
INVOLVES<br>
ISRAEL<br>
LABORATORIES<br>
LANGUAGE<br>
LATINO<br>
LIGHT<br>
LIMITATIONS<br>
MEXICO<br>
NANO<br>
NEAR<br>
NEARED<br>
NEEDED<br>
NEEDLE<br>
NEEDS<br>
NITRIC<br>
NUANCE<br>
NUMBER<br>
NYAN<br>
OCEAN<br>
ODE<br>
ODOR<br>
OFF<br>
ONCE<br>
OPEN<br>
OVER<br>
PIANO<br>
RAINED<br>
RECORD<br>
RICE<br>
ROAD<br>
ROCKS<br>
SECOND<br>
SET<br>
SHELL<br>
SHRIMP<br>
SOUTHEASTERN<br>
STAB<br>
STRAIGHT<br>
TEAM<br>
TELEVISION<br>
THEORETICIAN<br>
THERE<br>
TIBETAN<br>
TONES<br>
TREAT<br>
TREES<br>
TRIES<br>
TRUE 
</div>