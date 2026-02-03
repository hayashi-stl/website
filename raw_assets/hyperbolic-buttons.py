from math import *

short_radius = cos(tau / 6) / sin(tau / 14)
short_radius = sqrt(short_radius ** 2 - 1) / (1 + short_radius)
rot14 = lambda i: (0.5 + sin(tau * i / 14) * 0.5 * short_radius, 0.5 + cos(tau * i / 14) * 0.5 * short_radius)

for i in range(14):
    print(f".hyperbolic-move-{i:02} {{")
    print(f"  left: {rot14(i)[0] * 100}%;")
    print(f"  top: {rot14(i)[1] * 100}%;")
    print(f"  rotate: {tau / 4 - i * tau / 14}rad;")
    print(f"}}")
    print(f"")