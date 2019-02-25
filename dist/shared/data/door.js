"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
exports.doorSuggestion = [
    {
        name: "Byko sliding glass door",
        price: 400000
    },
    {
        name: "Byko external main door",
        price: 150000
    },
    {
        name: "Byko external back door",
        price: 100000
    },
    {
        name: "sliding internal door",
        price: 100000
    },
    {
        name: "Byko internal door",
        price: 50000
    },
    {
        name: "Byko garage door",
        price: 500000
    },
    {
        name: "Australian 3 panel interior white",
        price: 235,
        currency: "USD",
        link: "https://www.alibaba.com/product-detail/Australian-bespoke-3-panel-interior-white_60763761637.html?spm=a2700.7724838.2017115.56.47f77a6b9NeqWp",
        minOrder: 1
    },
    {
        name: "Wooden MDF PVC interior",
        price: 115,
        currency: "USD",
        link: "https://www.alibaba.com/product-detail/Wooden-MDF-PVC-door_60616488840.html?spm=a2700.7724838.2017115.177.47f77a6b9NeqWp",
        minOrder: 10
    },
    {
        name: "Exterior Designer Solid Decorative",
        price: 200,
        currency: "USD",
        link: "https://www.alibaba.com/product-detail/Designer-Solid-Decorative-Wooden-Door-Single_50037313597.html?spm=a2700.7724856.2017115.40.727a64eb9Kzodp",
        minOrder: 5
    },
    {
        name: "Ext/Int Merpauh wood",
        price: 200,
        currency: "USD",
        link: "https://www.alibaba.com/product-detail/Solid-merpauh-wood-fancy-villa-main_50039595202.html?spm=a2700.7724856.2017115.59.727a64eb9Kzodp",
        minOrder: 1
    },
    {
        name: "PVC glass sliding door",
        price: 80,
        currency: "USD",
        unit: "sqrm",
        link: "https://www.alibaba.com/product-detail/Economical-type-white-PVC-glass-sliding_60224146067.html?spm=a2700.7724856.2017115.71.727a64eb9Kzodp"
    },
    {
        name: "aluminium sliding glass door",
        price: 200,
        currency: "USD",
        unit: "sqrm",
        link: "https://www.alibaba.com/product-detail/Chinese-supplier-huge-aluminum-sliding-glass_60680192437.html?spm=a2700.7724856.2017115.15.727a64eb9Kzodp",
        minOrder: 1
    },
    {
        name: "EBAHOUSE double glazed sliding door",
        price: 120,
        currency: "USD",
        unit: "sqrm",
        link: "https://www.alibaba.com/product-detail/AS2047-slim-sliding-door-with-aluminium_1008442633.html?spm=a2700.7724856.2017115.8.727a64eb9Kzodp",
        minOrder: 1
    },
    {
        name: "aluminum roller shutter garage door",
        price: 350,
        currency: "USD",
        link: "https://www.alibaba.com/product-detail/Wholesale-residential-electric-aluminum-roller-shutter_60646278822.html?spm=a2700.7724856.2017115.71.727a64eb9Kzodp",
        minOrder: 1
    },
    {
        name: "Thermal break aluminum folding door",
        price: 150,
        currency: "USD",
        link: "https://www.alibaba.com/product-detail/Thermal-break-aluminum-door-design-glass_60644834398.html?spm=a2700.7724856.2017115.78.727a64eb9Kzodp",
        minOrder: 1,
        unit: "sqrm"
    },
    {
        name: "VIRONY Steel Security Door exterior",
        price: 390,
        currency: "USD",
        link: "https://www.alibaba.com/product-detail/VIRONY-Professional-Standard-Steel-Security-Door_60544375580.html?spm=a2700.7724856.2017115.63.727a64eb9Kzodp",
        minOrder: 5
    },
    {
        name: "custom steel security door-HL-J48",
        price: 400,
        currency: "USD",
        link: "https://www.alibaba.com/product-detail/China-wholesale-custom-steel-security-door_60322109587.html?spm=a2700.7724856.2017115.112.727a64eb9Kzodp",
        minOrder: 1
    },
    {
        name: "Exterior New Simplicity Brown veneer grain flush door",
        price: 80,
        currency: "USD",
        link: "https://www.alibaba.com/product-detail/New-Simplicity-Brown-veneer-grain-flush_60437988420.html?spm=a2700.7724856.2017115.20.727a64eb9Kzodp",
        minOrder: 1
    },
    {
        name: "multi lock stainless steel safety door",
        price: 120,
        currency: "USD",
        link: "https://www.alibaba.com/product-detail/Security-steel-door-multi-lock-stainless_60212641114.html?spm=a2700.7724856.2017115.103.727a64eb9Kzodp",
        minOrder: 1
    },
    {
        name: "Suncity front steel security door",
        price: 90,
        currency: "USD",
        link: "https://www.alibaba.com/product-detail/new-products-front-steel-security-door_60731094921.html?spm=a2700.7724856.2017115.48.727a64eb9Kzodp",
        minOrder: 5
    },
    {
        name: "Horizontal Residential Aluminum Double Entry Doors",
        price: 150,
        currency: "USD",
        link: "https://www.alibaba.com/product-detail/Latest-Trendy-Design-Horizontal-Residential-Aluminum_60618686688.html?spm=a2700.7724838.2017115.298.47f77a6b9NeqWp",
        minOrder: 5,
        unit: "sqrm"
    }
];
var choose = function (choice) {
    var door = exports.doorSuggestion.find(function (suggestion) {
        return suggestion.name === choice;
    });
    assert(door, "choice of door not found amond door suggestions. Choice: " + choice);
    return door ? door.price : 99999999999;
};
exports.doorChoice = [
    {
        type: "2000 x 2200mm",
        price: choose("Byko sliding glass door"),
        area: 2000 * 2200,
        external: true
    },
    {
        type: "ÚH-2, Bílskúr 1000 x 2180mm",
        price: choose("Byko garage door"),
        area: 2000 * 2200,
        external: true
    },
    {
        type: "1800 x 2500mm",
        price: choose("Byko sliding glass door"),
        area: 1800 * 2500,
        external: true
    },
    {
        type: "2000 x 2500mm",
        price: choose("Byko sliding glass door"),
        area: 2000 * 2500,
        external: true
    },
    {
        type: "2000 x 2400mm",
        price: choose("Byko sliding glass door"),
        area: 2000 * 2400,
        external: true
    },
    {
        type: "2000 x 2130mm",
        price: choose("sliding internal door"),
        area: 2000 * 2130,
        external: false
    },
    {
        type: "1200 x 2100mm",
        price: choose("sliding internal door"),
        area: 1200 * 2100,
        external: false
    },
    {
        type: "Útihurð 950 x 2134mm",
        price: choose("Byko external back door"),
        area: 950 * 2134,
        external: true
    },
    {
        type: "Innihurð 850 x 2134mm",
        price: choose("Byko internal door"),
        area: 850 * 2134,
        external: false
    },
    {
        type: "Innihurð 850 x 2080mm",
        price: choose("Byko internal door"),
        area: 850 * 2134,
        external: false
    },
    {
        type: "Útihurð 1050 x 2250mm",
        price: choose("Byko external main door"),
        area: 1000 * 2134,
        external: true
    },
    {
        type: "Innihurð 950 x 2134mm",
        price: choose("Byko internal door"),
        area: 950 * 2134,
        external: false
    },
    {
        type: "5000 x 2400mm",
        price: choose("Byko garage door"),
        area: 5000 * 2400,
        external: true
    }
];
//# sourceMappingURL=door.js.map