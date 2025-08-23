{Fraction} = require "fraction.js"
rational_sqrt = exports

# a + b√sqrt, where a and b are rational, and sqrt is a square-free positive integer greater than 1
class_map = {}
RatSqrt = (sqrt) ->
    class_map[sqrt] ? (class_map[sqrt] = class RatSqrt
        constructor: (@a, @b) ->
        
        @from_int: (k) ->
            RatSqrt.from_ints k, 1, 0, 1, sqrt

        @from_ints: (an, ad, bn, bd) ->
            new RatSqrt new Fraction(an, ad), new Fraction(bn, bd)

        add: (other) ->
            new RatSqrt @a.add(other.a), @b.add(other.b)

        sub: (other) ->
            new RatSqrt @a.sub(other.a), @b.sub(other.b)

        neg: () ->
            new RatSqrt @a.neg(), @b.neg()

        mul_int: (k) ->
            @mul RatSqrt.from_int k

        mul: (other) ->
            new RatSqrt @a.mul(other.a).add(@b.mul(other.b).mul(sqrt)), (@a.mul(other.b).add(@b.mul(other.a)))

        recip: () ->
            denom = @a.mul(@a).sub(@b.mul(@b).mul(sqrt))
            new RatSqrt @a.div(denom), @b.neg().div(denom)

        div: (other) ->
            @mul other.recip()

        eval: () ->
            @a.valueOf() + @b.valueOf() * Math.sqrt sqrt

        equals: (other) ->
            @a.equals(other.a) && @b.equals(other.b)

        compare_0: () ->
            if @a.lt(0) then return -compare_0 @neg()
            if @b.gte(0) then return 1
            det = @a.mul(@a).sub(@b.mul(@b).mul(sqrt))
            if det.gt(0) then 1 else -1

        compare: (other) ->
            if @equals(other) then return 0
            @sub(other).compare_0()

        lt: (other) -> @compare(other) < 0
        lte: (other) -> @compare(other) <= 0
        gt: (other) -> @compare(other) > 0
        gte: (other) -> @compare(other) >= 0

        toString: () ->
            "#{@a.toFraction()} + (#{@b.toFraction()})√#{sqrt}"
    )

exports.RatSqrt = RatSqrt