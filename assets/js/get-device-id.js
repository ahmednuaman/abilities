// get the device id
helpers.getDeviceId = function()
{
    var device;

    // so, this could be very long...
    // first start with LG: http://developer.lgappstv.com/TV_HELP/index.jsp?topic=%2Flge.tvsdk.developing.book%2Fhtml%2FDeveloping+Web+App%2FDeveloping+Web+App%2FCreating+Web+Applications1.htm
    if ("NetCastTVSet" in window)
    {
        dumpArea.innerHTML = '<object type="application/x-netcast-info" id="device" width="0" height="0"></object>';

        device = document.getElementById('device');

        if (device)
        {
            // ermagad
            return device.version + '; ' +
                device.manufacturer + '; ' +
                device.modelName + '; ' +
                device.serialNumber + '; ' +
                device.swVersion + '; ' +
                device.hwVersion + '; ' +
                device.SDKVersion + '; ' +
                device.osdResolution + '; ' +
                device.networkType + '; ' +
                device.net_macAddress + '; ' +
                device.drmClientInfo + '; ' +
                device.net_dhcp + '; ' +
                device.net_isConnected + '; ' +
                device.net_hasIP + '; ' +
                device.net_ipAddress + '; ' +
                device.net_netmask + '; ' +
                device.net_gateway + '; ' +
                device.net_dns1 + '; ' +
                device.net_dns2 + '; ' +
                device.supportMouse + '; ' +
                device.supportVoiceRecog + '; ' +
                device.supportPentouch + '; ' +
                device.support3D + '; ' +
                device.support3DMode.from_2d_to_3d + '; ' +
                device.support3DMode.side_by_side + '; ' +
                device.support3DMode.side_by_side_rl + '; ' +
                device.support3DMode.top_bottom + '; ' +
                device.support3DMode.checker_bd + '; ' +
                device.preferredSubtitleLanguage + '; ' +
                device.preferredAudioLanguage + '; ' +
                device.preferredSubtitleStatus + '; ' +
                device.tvLanguage2 + '; ' +
                device.tvCountry2 + '; ' +
                device.timeZone + '; ' +
                device.platform + '; ' +
                device.chipset;
        }
    }

    // now samsung http://www.samsungdforum.com/Guide/ref00008/tvinformation/dtv_tvinformation_tvinfomanager.html
    // if (/Maple|SMART\-TV/.test(navigator.userAgent))
    // {

    // }

    // if all else fails we assign a generated device id
    if (!device)
    {
        // check to see if there's a device id already set via cookie
        device = helpers.readCookie('deviceId');

        if (!device)
        {
            // generate one and save its ass
            device = 'fake-' + (new Date()).getTime();

            helpers.createCookie('deviceId', device, 1000);
        }
    }

    return device;
};