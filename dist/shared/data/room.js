"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomAllocations = [
    {
        number: 71,
        name: "Salerni",
        type: "A"
    },
    {
        number: 78,
        name: "Eldhús",
        type: "A"
    },
    {
        number: 93,
        name: "Þvottahús",
        type: "A"
    },
    {
        number: 143,
        name: "Svalir",
        type: "B"
    },
    {
        number: 106,
        name: "Herbergi",
        type: "A"
    },
    {
        number: 107,
        name: "Herbergi",
        type: "A"
    },
    {
        number: 111,
        name: "Herbergi",
        type: "A"
    },
    {
        number: 113,
        name: "Herbergi",
        type: "A"
    },
    {
        number: 114,
        name: "Sólpallur",
        type: "C"
    },
    {
        number: 117,
        name: "Iðursvalir",
        type: "B"
    },
    {
        number: 120,
        name: "Stigi",
        type: "A"
    },
    {
        number: 121,
        name: "Stigi",
        type: "A"
    },
    {
        number: 123,
        name: "Svalir",
        type: "C"
    },
    {
        number: 126,
        name: "Herbergi",
        type: "A"
    },
    {
        number: 129,
        name: "Geymsla",
        type: "A"
    },
    {
        number: 131,
        name: "Þvottahús",
        type: "A"
    },
    {
        number: 132,
        name: "Líkamsrækt",
        type: "A"
    },
    {
        number: 134,
        name: "Geymsla",
        type: "A"
    },
    {
        number: 137,
        name: "Bað",
        type: "A"
    },
    {
        number: 137,
        name: "Milliflötur",
        type: "A"
    },
    {
        number: 138,
        name: "Milliflötur5",
        type: "A"
    },
    {
        number: 142,
        name: "Milliflötur3",
        type: "A",
        volumeOverride: function (area) {
            var heightMin = 52 - 49.5;
            var heightMax = 54.5 - 49.5;
            var avgHeight = (heightMin + heightMax) / 2;
            var volume = avgHeight * area;
            return { heightMin: heightMin, heightMax: heightMax, area: area, avgHeight: avgHeight, volume: volume };
        }
    },
    {
        number: 143,
        name: "Iðurpallur",
        type: "B"
    },
    {
        number: 145,
        name: "Stigi",
        type: "A"
    },
    {
        number: 146,
        name: "Op",
        type: "A"
    },
    {
        number: 147,
        name: "Milliflötur4",
        type: "A",
        volumeOverride: function (area) {
            var heightMin = 52 - 49.5;
            var heightMax = 54.5 - 49.5;
            var avgHeight = (heightMin + heightMax) / 2;
            var volume = avgHeight * area;
            return { heightMin: heightMin, heightMax: heightMax, area: area, avgHeight: avgHeight, volume: volume };
        }
    },
    {
        number: 148,
        name: "Op1",
        type: "A",
        volumeOverride: function (area) {
            var heightMin = 52 - 49.5;
            var heightMax = 54.5 - 49.5;
            var avgHeight = (heightMin + heightMax) / 2;
            var volume = avgHeight * area;
            return { heightMin: heightMin, heightMax: heightMax, area: area, avgHeight: avgHeight, volume: volume };
        }
    },
    {
        number: 149,
        name: "Op2",
        type: "A",
        volumeOverride: function (area) {
            var heightMin = 52.5 - 49.5;
            var heightMax = 54 - 49.5;
            var avgHeight = (heightMin + heightMax) / 2;
            var volume = avgHeight * area;
            return { heightMin: heightMin, heightMax: heightMax, area: area, avgHeight: avgHeight, volume: volume };
        }
    },
    {
        number: 150,
        name: "Milliflötur2",
        type: "A",
        volumeOverride: function (area) {
            var heightMin = 50.7 - 49.5;
            var heightMax = 54.5 - 49.5;
            var avgHeight = (heightMin + heightMax) / 2;
            var volume = avgHeight * area;
            return { heightMin: heightMin, heightMax: heightMax, area: area, avgHeight: avgHeight, volume: volume };
        }
    },
    {
        number: 151,
        name: "Milliflötur1",
        type: "A",
        volumeOverride: function (area) {
            var heightMin = 52 - 49.5;
            var heightMax = 54.5 - 49.5;
            var avgHeight = (heightMin + heightMax) / 2;
            var volume = avgHeight * area;
            return { heightMin: heightMin, heightMax: heightMax, area: area, avgHeight: avgHeight, volume: volume };
        }
    },
    {
        number: 152,
        name: "Op3",
        type: "A",
        volumeOverride: function (area) {
            var heightMin = 59.9 - 49.5;
            var heightMax = 52 - 49.5;
            var avgHeight = (heightMin + heightMax) / 2;
            var volume = avgHeight * area;
            return { heightMin: heightMin, heightMax: heightMax, area: area, avgHeight: avgHeight, volume: volume };
        }
    },
    {
        number: 153,
        name: "Op4",
        type: "A",
        volumeOverride: function (area) {
            var heightMin = 59.9 - 49.5;
            var heightMax = 52 - 49.5;
            var avgHeight = (heightMin + heightMax) / 2;
            var volume = avgHeight * area;
            return { heightMin: heightMin, heightMax: heightMax, area: area, avgHeight: avgHeight, volume: volume };
        }
    },
    {
        number: 157,
        name: "Bílgeymsla",
        type: "A"
    },
    {
        number: 159,
        name: "Iðurgarður",
        type: "B"
    },
    {
        number: 160,
        name: "Vinnu/Föndur-rými",
        type: "A"
    },
    {
        number: 161,
        name: "Anddyri",
        type: "A"
    },
    {
        number: 162,
        name: "Sjónvarpsrými",
        type: "A"
    },
    {
        number: 164,
        name: "Stofa",
        type: "A"
    },
    {
        number: 165,
        name: "Eldhús",
        type: "A"
    },
    {
        number: 166,
        name: "Bað",
        type: "A"
    },
    {
        number: 167,
        name: "Herbergi",
        type: "A"
    },
    {
        number: 168,
        name: "Herbergi",
        type: "A"
    },
    {
        number: 169,
        name: "Herbergi",
        type: "A"
    },
    {
        number: 170,
        name: "Þvottahús",
        type: "A"
    },
    {
        number: 171,
        name: "Salerni",
        type: "A"
    },
    {
        number: 176,
        name: "Lesstofa",
        type: "A"
    },
    {
        number: 181,
        name: "Skrifstofa",
        type: "A"
    },
    {
        number: 182,
        name: "Geymsla",
        type: "A"
    },
    {
        number: 177,
        name: "Inngangsskjól",
        type: "B"
    },
    {
        number: 178,
        name: "Svalir",
        type: "C"
    }
];
//# sourceMappingURL=room.js.map