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


    // dev, pre-test, qas
    else if (shExpMatch(host, "*.crystalbridge.com") ||
        shExpMatch(host, "*.crystalbridge.de") ||
        shExpMatch(host, "*.snpkynao.com") ||
        shExpMatch(host, "*.snpkyano.de")) {
        return "SOCKS5 localhost:18080";
    }

    // Default to direct connection
    return "DIRECT";
}
