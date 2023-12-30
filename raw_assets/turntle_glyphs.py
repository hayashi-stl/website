import turtle
from math import floor

turtle.speed("fast")
turtle.left(90)
i = 0
while True:
    i = i + 1
    num = i
    distance = 1
    while num == floor(num):
        turtle.left(240)
        turtle.forward(distance * 10)
        num = num / 3
        distance = distance * 2
