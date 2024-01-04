---
layout: hunt-solution
page-type: hunt-solution
hunt: Puzzle Tour in the Volcano
title: Fighting with Fire
answer: PYRORAIN
---
In the word search, we can find 16 instances of Super Smash Bros. Ultimate fighters.
(Ultimate specifically because of the flavor text)

<div class="d-pad-grid">
{% grid page.dir | append: "../d-pad-grid.rb" | relative_url %}
{% prop text asc %}
           MRGAMEWATCH          
           OUNRMHBNQBF          
           HEDRSFTPQDV          
           AFYIDTLRGLK          
           DHAOSIRQYNN          
           LPCLUIGIUZY          
           LFFNCUJLXNV          
           BROSDOLINIW          
           ITLHUHJTAKA          
           WNZSLOHMMBW          
           KDNDDIHESHZ          
ULDRNMQSJWKrneljfurrchDNJAJTSZGGO
OSHEDIAPARNvvillagerwdXNCHYCIALLR
ERDGGFVNOLKcdbhsrsvouiACIJNRXZLAI
MRGAMEWATCHrsumasgmbvnNWIHSTEVENU
ISRLTUVLEIJhbscfaapnchLWSQANWUUOO
TZLLTDITOHTxtutklrmhliQXDXMQBGAZW
EYXIHCPSGLVxcujwhfndhoOPTNUHKCUDG
OUDVHZEHSCUnnmujounskiISKKSQSQYXR
AVIDOBINTLOnmgotijnqldAIIXDAROZXD
RHSOSNLWTUZephxawmhtgwLEOVVIICYLF
NWHUDJICMFPhhdllrdeohwNLAVMQLNOOL
           GFUUMIOAFSH          
           AINDONAWITU          
           HZUHPYRPFJX          
           SUREBVVGNTI          
           TBMZASBMHTG          
           ERMEEOSNOZI          
           VTAZRTNKQZU          
           ESOLFNRLGIL          
           RJPKVCMRRLM          
           DDXFALCOERS          
           DDYSITIRIHI          
{% endprop %}
{% prop emph asc %}
           @@@@@@@@@@@          
                                
                                
            @                   
             @                  
              @@@@@             
               @                
                @               
                                
                                
                                
   @                             
   @        @@@@@@@@             
   @        @      @             
@@@@@@@@@@@ @@@@@  @      @@@@@  
   @          @           @      
   @           @          @      
   @            @       @@@@@@@@ 
   @             @        @      
                  @              
                   @             
                                 
                                
                                
                                
           @         @          
           @     @   @          
           @    @    @          
           @   @     @          
           @         @          
                                
              @@@@@             
                                
{% endprop %}
{% endgrid %}
</div>
<br>

This is two instances each of 8 different fighters. There are also 8 rows in the fire table, so we should match different
fighters to rows. The flavor text says something about special moves, and parrying regular moves with fiery ones.
Each of these 8 fighters has at least one non-fiery special move and at least one fiery special move. Now
we notice that the word search looks like a D-pad. Each fighter is found in two different regions of the D-pad, and regions
of the D-pad correspond to directions of special moves (center is neutral special, left/right is side special, and up and down
are up and down special, respectively). So we take the corresponding special moves for each fighter
and figure out which one is fiery and which one is not.

<div markdown="1">

| Fighter          | Not fiery             | Fiery                | Notes
| ---------------- | --------------------- | -------------------- | -------
| Duck Hunt        | Clay Shooting (Side)  | Trick Shot (Neutral) |
| Falco            | Reflector (Down)      | Fire Bird (Up)       |
| Luigi            | Luigi Cyclone (Down)  | Super Jump Punch     | Super Jump Punch has a fiery sweetspot.
| Mr. Game & Watch | Fire (Up)             | Judge (Side)         | "Fire" is *not* fiery. It's just a parachute launch. Judge is fiery when it's a 6.
| R.O.B.           | Gyro (Down)           | Robobeam (Neutral)   |
| Samus            | Charge Shot (Neutral) | Missile (Side)       |
| Steve            | Minecart (Side)       | TNT (Down)           |
| Villager         | Pocket (Neutral)      | Lloid Rocket (Side)  | Pocket *can* deal fire damage, but that would require help, contradicting flavor text.

</div>

Now we put them into the fire table. We take the name of the non-fiery move and parry it with the fiery move by removing all letters that appear in the fiery move's name.

<div class="fire-fight-grid">
{% grid page.dir | append: "../fire-fight-grid.rb" | relative_url %}
{% prop cell asc %}
mfM→       @ 
mfM→      1@ 
mfM→     22@ 
mfM→    333@ 
mfM→  44444@ 
mfM→55@55555 
mfM→ 666@666 
mfM→   777@7 
{% endprop %}
{% prop text csv %}
POCKET,,LLOIDROCKET,,,,,,,,,P
GYRO,,ROBOBEAM,,,,,,,,G,Y
FIRE,,JUDGE,,,,,,,F,I,R
REFLECTOR,,FIREBIRD,,,,,,L,C,T,O
MINECART,,TNT,,,,M,I,E,C,A,R
CHARGESHOT,,MISSILE,,C,H,A,R,G,H,O,T
LUIGICYCLONE,,SUPERJUMPPUNCH,,,L,I,G,I,Y,L,O
CLAYSHOOTING,,TRICKSHOT,,,,,L,A,Y,N,G
{% endprop %}
{% endgrid %}
</div>
<br>

Extracting from the white squares gives `PYRORAIN`.