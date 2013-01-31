// a keycodes helper to unify keycodes over platforms
function getKeyCodes (device) {
    var base = { // computer, LG
        up: 38,
        down: 40,
        left: 37,
        right: 39,
        select: 13
    };
    var codes = {
        samsung: {
            up: 29460,
            down: 29461,
            left: 4,
            right: 5,
            select: 29443
        }
    };

    for (var make in codes)
    {
        if ((new RegExp(make, 'gi')).test(device))
        {
            return codes[make];
        }
    }

    return base;
}