import math
import cmath
typeofeq = input("What are you solving for? (d or int)")
a = float(input("a value: "))
b = float(input("b value: "))
c = float(input("c value: "))
disc = b**2 - 4 * a * c
if typeofeq == "int":
  disc = b**2 - 4 * a * c
  if disc >= 0:  # Handle real solutions
    equationpos = (-b + math.sqrt(disc)) / (2 * a)
    equationneg = (-b - math.sqrt(disc)) / (2 * a)
    print("x = " + str(equationneg) + "x = " + str(equationpos))
  else:  # Handle complex solutions
    equationpos = (-b + cmath.sqrt(disc)) / (2 * a)
    equationneg = (-b - cmath.sqrt(disc)) / (2 * a)
    print("x = " + str(equationneg) + "x = " + str(equationpos))

#
if typeofeq == "d":
  disc = b**2 - 4 * a * c
  print("the discrminant is: ", disc)
  if disc > 0:
    print("there are two real solutions")
  elif disc == 0:
    print("there is one real solution")
  elif disc < 0:
    # print("there are no real solutions")
    print("there are two complex solutions")