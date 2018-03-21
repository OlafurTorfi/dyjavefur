"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomAllocations = [
    {
        number: 66,
        name: 'Hol',
        type: 'A',
        volumeOverride: function (area) {
            var heightMin = 52.8 - 49.5;
            var heightMedium = 53.7 - 49.5;
            var heightMax = 54.1 - 49.5;
            var area1 = 1.1 * 2.3;
            var area2 = 2.4 * 3.1;
            var avgHeight = ((area2 * ((heightMedium + heightMin) / 2) + (area1 * (heightMax + heightMedium) / 2))) / (area1 + area2);
            var volume = avgHeight * area;
            return { heightMin: heightMin, heightMedium: heightMedium, heightMax: heightMax, area: area, avgHeight: avgHeight, volume: volume };
        }
    },
    {
        number: 129,
        name: 'Geymsla',
        type: 'A'
    },
    {
        number: 69,
        name: 'Billiardstofa',
        type: 'A'
    },
    {
        number: 70,
        name: 'Anddyri',
        type: 'A'
    },
    {
        number: 71,
        name: 'Salerni',
        type: 'A'
    },
    {
        number: 133,
        name: 'Iðurgarður',
        type: 'B'
    },
    {
        number: 131,
        name: 'Þvottahús',
        type: 'A'
    },
    {
        number: 78,
        name: 'Bað',
        type: 'A'
    },
    {
        number: 83,
        name: 'Gangur',
        type: 'A'
    },
    {
        number: 85,
        name: 'Iðursvalir',
        type: 'B'
    },
    {
        number: 88,
        name: 'Eldhús',
        type: 'A',
        volumeOverride: function (area) {
            var heightMin = 50 - 46.5;
            var heightMax = 52.8 - 46.5;
            var avgHeight = (heightMin + heightMax) / 2;
            var volume = avgHeight * area;
            return { heightMin: heightMin, heightMax: heightMax, area: area, avgHeight: avgHeight, volume: volume };
        }
    },
    {
        number: 89,
        name: 'Bar',
        type: 'A'
    },
    {
        number: 130,
        name: 'Bílskúr',
        type: 'A'
    },
    {
        number: 132,
        name: 'Líkamsrækt',
        type: 'A'
    },
    {
        number: 93,
        name: 'Bað',
        type: 'A'
    },
    {
        number: 96,
        name: 'Iðurpallur',
        type: 'B'
    },
    {
        number: 103,
        name: 'Bað',
        type: 'A',
        volumeOverride: function (area) {
            var heightMin = 51.6 - 49.5;
            var heightMedium = 52.1 - 49.5;
            var heightMax = 52.8 - 49.5;
            var area1 = 1.5 * 5.15;
            var area2 = 1.75 * 3.9;
            var avgHeight = ((area2 * ((heightMedium + heightMax) / 2) + (area1 * (heightMin + heightMedium) / 2))) / (area1 + area2);
            var volume = avgHeight * area;
            return { heightMin: heightMin, heightMedium: heightMedium, heightMax: heightMax, area: area, avgHeight: avgHeight, volume: volume };
        }
    },
    {
        number: 106,
        name: 'Herbergi',
        type: 'A'
    },
    {
        number: 107,
        name: 'Herbergi',
        type: 'A'
    },
    {
        number: 108,
        name: 'Stofa',
        type: 'A',
        volumeOverride: function (area) {
            var heightMin = 50.9 - 46.5;
            var heightMax = 52.8 - 46.5;
            var avgHeight = (heightMin + heightMax) / 2;
            var volume = avgHeight * area;
            return { heightMin: heightMin, heightMax: heightMax, area: area, avgHeight: avgHeight, volume: volume };
        }
    },
    {
        number: 109,
        name: 'Geymsla',
        type: 'A',
        volumeOverride: function (area) {
            var heightMin = 51.4 - 49.5;
            var heightMax = 52.8 - 49.5;
            var avgHeight = (heightMin + heightMax) / 2;
            var volume = avgHeight * area;
            return { heightMin: heightMin, heightMax: heightMax, area: area, avgHeight: avgHeight, volume: volume };
        }
    },
    {
        number: 110,
        name: 'Sjónvarpsrými',
        type: 'A',
        volumeOverride: function (area) {
            var heightMin = 51 - 49.5;
            var heightMax = 52.8 - 49.5;
            var avgHeight = (heightMin + heightMax) / 2;
            var volume = avgHeight * area;
            return { heightMin: heightMin, heightMax: heightMax, area: area, avgHeight: avgHeight, volume: volume };
        }
    },
    {
        number: 111,
        name: 'Herbergi',
        type: 'A',
        volumeOverride: function (area) {
            var heightMin = 52.8 - 49.5;
            var heightMedium = 53.7 - 49.5;
            var heightMax = 54.1 - 49.5;
            var area1 = 2.3 * 6;
            var area2 = 1.2 * 3.950;
            var avgHeight = ((area2 * ((heightMedium + heightMax) / 2) + (area1 * (heightMin + heightMedium) / 2))) / (area1 + area2);
            var volume = avgHeight * area;
            return { heightMin: heightMin, heightMedium: heightMedium, heightMax: heightMax, area: area, avgHeight: avgHeight, volume: volume };
        }
    },
    {
        number: 112,
        name: 'Herbergi',
        type: 'A',
        volumeOverride: function (area) {
            var heightMin = 52.8 - 49.5;
            var heightMax = 54.1 - 49.5;
            var avgHeight = (heightMin + heightMax) / 2;
            var volume = avgHeight * area;
            return { heightMin: heightMin, heightMax: heightMax, area: area, avgHeight: avgHeight, volume: volume };
        }
    },
    {
        number: 113,
        name: 'Herbergi',
        type: 'A'
    },
    {
        number: 114,
        name: 'Sólpallur',
        type: 'C'
    },
    {
        number: 116,
        name: 'Inngangsskjól',
        type: 'B'
    },
    {
        number: 117,
        name: 'Svalir',
        type: 'C'
    },
    {
        number: 120,
        name: 'Stigi',
        type: 'A'
    },
    {
        number: 121,
        name: 'Stigi',
        type: 'A'
    },
    {
        number: 123,
        name: 'Pallur',
        type: 'C'
    },
    {
        number: 124,
        name: 'Op',
        type: 'A'
    },
    {
        number: 125,
        name: 'Stigi',
        type: 'A'
    },
    {
        number: 126,
        name: 'Sólskýli',
        type: 'C'
    }
];
//# sourceMappingURL=room.js.map