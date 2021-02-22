// PI_BEGIN

function xmur3(str) {
    for (var i = 0, h = 1779033703 ^ str.length; i < str.length; i++)
        h = Math.imul(h ^ str.charCodeAt(i), 3432918353),
        h = h << 13 | h >>> 19;
    return function () {
        h = Math.imul(h ^ h >>> 16, 2246822507);
        h = Math.imul(h ^ h >>> 13, 3266489909);
        return (h ^= h >>> 16) >>> 0;
    };
}

// function sfc32(a, b, c, d) {
//     return function () {
//         a >>>= 0;
//         b >>>= 0;
//         c >>>= 0;
//         d >>>= 0;
//         var t = (a + b) | 0;
//         a = b ^ b >>> 9;
//         b = c + (c << 3) | 0;
//         c = (c << 21 | c >>> 11);
//         d = d + 1 | 0;
//         t = t + d | 0;
//         c = c + t | 0;
//         return (t >>> 0) / 4294967296;
//     };
// }

function mulberry32(a) {
    return function () {
        var t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}

function xoshiro128ss(a, b, c, d) {
    return function () {
        var t = b << 9,
            r = a * 5;
        r = (r << 7 | r >>> 25) * 9;
        c ^= a;
        d ^= b;
        b ^= c;
        a ^= d;
        c ^= t;
        d = d << 11 | d >>> 21;
        return (r >>> 0) / 4294967296;
    };
}

function jsf32(a, b, c, d) {
    return function () {
        a |= 0;
        b |= 0;
        c |= 0;
        d |= 0;
        var t = a - (b << 27 | b >>> 5) | 0;
        a = b ^ (c << 17 | c >>> 15);
        b = c + d | 0;
        c = d + t | 0;
        d = a + t | 0;
        return (d >>> 0) / 4294967296;
    };
}

// Create xmur3 state:
// Output four 32-bit hashes to provide the seed for sfc32.
// var seed = xmur3("");
// var rand = sfc32(seed(), seed(), seed(), seed());

export class Random {
    constructor(seed) {
        let getSeed = xmur3(seed);
        this.getNext = mulberry32(getSeed());
    }

    /**
     * 生成[min, max]的随机整数
     * Fix: 下面的实现并不一定均匀分布，请参考网上的文章进行修改。
     */
    getInt(min = 0, max = 4294967295) {
        if (min > max) {
            [min, max] = [max, min];
        }
        return Math.floor(min + this.getNext() * (max - min + 1));
    }
}

// PI_END