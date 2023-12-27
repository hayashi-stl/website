---
layout: hunt-solution
page-type: hunt-solution
hunt: An All-American Puzzle Hunt
title: Logical Programs
answer: CRAZIEST SARAH BAN
---
We examine these weird grids and notice that they spell out programs.

The first grid specifically looks like JavaScript.
```js
n='0x';logic='0a';l=console.log;f=String.fromCodePoint;g=01+100100-0x0;pri=(n,'t1++03f(1s"t1%10+-c%s11%2%s21.1%c"22,322+3 0+22*2+20-230/113+2', '1,t1"raz10*0s",1 "3ie',-"12s10 02", 1223&1 &~02-333*2)+logic;h=011*0xce*01;h=h*0xf+'f'.codePointAt(0);p=n+pri-0;l(f(g+h)+f(g+h+p));
```
After running the Javascript, we get the following output: `🐍🔗`, indicating that the grid is a slitherlink.
We solve the slitherlink by using the numbers and ignoring everything else:

<div class="logical-grid">
{% grid page.dir | append: "../logical-grid.rb" | relative_url %}
{% prop text asc %}
        n='0x
';logic='0a';
l=console.log
;f=String.fro
mCodePoint;g=
01+100100-0x0
;pri=(n,'t1++
03f(1s"t1%10+
-c%s11%2%s21.
1%c"22,322+3 
0+22*2+20-230
/113+2', '1,t
1"raz10*0s",1
 "3ie',-"12s1
0 02", 1223&1
 &~02-333*2)+
logic;h=011*0
xce*01;h=h*0x
f+'f'.codePoi
ntAt(0);p=n+p
ri-0;l(f(g+h)
+f(g+h+p));  
{% endprop %}
{% prop region asc %}
             
             
             
             
             
             
 YYY  Y  Y   
  YY  Y  Y   
 YYY  Y  Y   
 YYY  YY YYY 
   YYYY   Y  
    Y     YY 
 YYYY     YY 
 Y YY      Y 
    YYYYYY Y 
     Y Y YYY 
     Y       
             
             
             
             
             
{% endprop %}
{% endgrid %}
</div>
<br>

This grid was hiding a C program!
```c
printf("%c%s%s%c",32+32*2+2+1,"raz","ies", 122+-3*2);
```
Running the C program, we get `craziest`, which is half the answer.

The second grid looks like Python.
```py
a=3;p=print ;lie=a;b=lie;sh="r=";trak= 2;x=trak;r=( "par\u2b50x"[10-7]);3;a= str(a);r=r;af=""+a+r +" \u2694x"[::-1][~6&1:]+sh;"1+lambda: ''";an=" \u2191 x-6"[23-22];af=af+an;"ha";p( af);done = 0x1
```
Running it gives the output `3⭐⚔ r=↑`, indicating that it's a star battle with 3 stars per row/column, and that we should orient the region division so that the 'r' points up.

<div class="logical-grid">
{% grid page.dir | append: "../logical-grid.rb" | relative_url %}
{% prop text asc %}
a=3;p=print ;l
ie=a;b=lie;sh=
"r=";trak= 2;x
=trak;r=( "par
\u2b50x"[10-7]
);3;a= str(a);
r=r;af=""+a+r 
+" \u2694x"[::
-1][~6&1:]+sh;
"1+lambda: ''"
;an=" \u2191 x
-6"[23-22];af=
af+an;"ha";p( 
af);done = 0x1
{% endprop %}
{% prop region asc %}
/++++++++++@@@
/++++++...+++@
//+++++...++@@
/@@@/.....@@@+
/@@//.//....++
@@@//.///@@@@+
@@@////////@++
@@@....++@@@+.
@@@@.+++++..+.
/....+++++....
/....+/++.....
//..++/+/..@..
/...++///..@..
///+++++@@@@..
{% endprop %}
{% prop star asc %}
s    s     s  
   s   s s    
 s   s      s 
   s    s s   
s     s     s 
  s s    s    
       s   s s
 s s     s    
     s s    s 
s s       s   
    s s      s
 s      s  s  
    s s      s
  s     s s   
{% endprop %}
{% endgrid %}
</div>
<br>

Oh, look, a JavaScript program was hidden in the grid!
```js
a= alert;a("\x73ar"+ "\x61h"+ "\x62an" )
```
Running it, we get `sarahban`. So the answer is `CRAZIEST SARAH BAN`.

### Notes

I don't remember how I managed to construct such a beautiful puzzle.