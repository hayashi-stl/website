---
layout: hunt-solution
page-type: hunt-solution
hunt: An All-American Puzzle Hunt
title: Second Place
answer: A MOUNT WON A MOTORCYCLE
---
These are the names of important American political figures. In fact, they're all vice presidents or runner-ups in a presidential election,
both second place in their own ways. The list on the left contains vice presidents, and the list on the right contains runner-ups.
Each vice presendent can be paired with a runner-up for the same presidential election.
Note that the list on the right is in alphabetical order,
so the list on the left's order is the one that matters. Also note that if a pair meets the criteria for multiple elections,
the disambiguator in the flavor text hints at taking the second such election.

<div style="display: flex; justify-content: center">
    <div>
        <ul class="raw-list" style="font-family: monospace;">
            <li>2020</li>
            <li>1912</li>
            <li>1952</li>
            <li>1880</li>
            <li>1836</li>
            <li>1804</li>
            <li>1968</li>
            <li>1920</li>
            <li>2016</li>
            <li>1932</li>
        </ul>
    </div>
    <div style="width: 50px;"></div>
    <div>
        <ul class="raw-list" style="font-family: monospace;">
            <li>Harris</li>
            <li>Marshall</li>
            <li>Nixon</li>
            <li>Arthur</li>
            <li>Johnson</li>
            <li>Clinton</li>
            <li>Agnew</li>
            <li>Coolidge</li>
            <li>Pence</li>
            <li>Garner</li>
        </ul>
    </div>
    <div style="width: 50px;"></div>
    <div>
        <ul class="raw-list" style="font-family: monospace;">
            <li>Trump</li>
            <li>Roosevelt</li>
            <li>Stevenson</li>
            <li>Hancock</li>
            <li>Harrison</li>
            <li>Pinckney</li>
            <li>Humphrey</li>
            <li>Cox</li>
            <li>Clinton</li>
            <li>Hoover</li>
        </ul>
    </div>
</div>

We now record the number of electoral votes that each candidate received in the corresponding election,
paying attention to the last digit as hinted by the flavor text. We add the offsets listed by the sides of the names,
and index into the name of the vice president/runner-up.

<div class="second-place-solution-table" markdown="1">

| Vice President | Year | # Electoral Votes | Offset | Letter |
| -------------- | ---- | ----------------- | ------ | ------ |
| Harris         | 2020 | 30**6**           | -4     | A      |
| Marshall       | 1912 | 43**5**           | -4     | M      |
| Nixon          | 1952 | 45**7**           | -3     | O      |
| Arthur         | 1880 | 21**4**           | +1     | U      |
| Johnson        | 1836 | 14**7**           | +0     | N      |
| Clinton        | 1804 | 11**3**           | +2     | T      |
| Agnew          | 1968 | 30**1**           | +4     | W      |
| Coolidge       | 1920 | 40**4**           | -2     | O      |
| Pence          | 2016 | 30**5**           | -2     | N      |
| Garner         | 1932 | 47**2**           | +0     | A      |

| Runner-Up      | Year | # Electoral Votes | Offset | Letter |
| -------------- | ---- | ----------------- | ------ | ------ |
| Trump          | 2020 | 23**2**           | -5     | M      |
| Roosevelt      | 1912 |  8**8**           | -6     | O      |
| Stevenson      | 1952 |  7**3**           | +0     | T      |
| Hancock        | 1880 | 15**5**           | +0     | O      |
| Harrison       | 1836 |  7**3**           | -4     | R      |
| Pinckney       | 1804 |  4**7**           | +7     | C      |
| Humphrey       | 1968 | 19**1**           | -3     | Y      |
| Cox            | 1920 | 12**7**           | -6     | C      |
| Clinton        | 2016 | 22**7**           | -1     | L      |
| Hoover         | 1932 |  5**9**           | +2     | E      |

</div>

This gives the answer `A MOUNT WON A MOTORCYCLE`.
