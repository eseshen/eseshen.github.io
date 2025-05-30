function FindProxyForURL(url, host) {
    // Production Sites
    if (shExpMatch(host, "crystalbridge.com") ||
        shExpMatch(host, "crystalbridge.de") ||
        shExpMatch(host, "snpkynao.com") ||
        shExpMatch(host, "snpkyano.de")) {
        return "DIRECT";
    }

    // Production Sites with www
    else if (shExpMatch(host, "www.crystalbridge.com") ||
        shExpMatch(host, "www.crystalbridge.de") ||
        shExpMatch(host, "www.snpkynao.com") ||
        shExpMatch(host, "www.snpkyano.de")) {
        return "DIRECT";
    }

    // Production Sites with www
    else if (shExpMatch(host, "auth.crystalbridge.com") ||
        shExpMatch(host, "auth.crystalbridge.de") ||
        shExpMatch(host, "auth.snpkynao.com") ||
        shExpMatch(host, "auth.snpkyano.de")) {
        return "DIRECT";
    }


    // dev, pre-test, qas
    else if (shExpMatch(host, "*.crystalbridge.com") ||
        shExpMatch(host, "*.crystalbridge.de") ||
        shExpMatch(host, "*.snpkynao.com") ||
        shExpMatch(host, "*.snpkyano.de")) {
        return "SOCKS5 localhost:1080";
    }

    // Default to direct connection
    return "DIRECT";
}
