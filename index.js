const Netmask = require('netmask').Netmask
const ip = require('ip-utils')
const fs = require('fs')
const yml = require('yaml').parse(fs.readFileSync('config.yml', 'utf8'))
const ip_class = require('ip-class')
const netpatser = require('netparser')

//change your commands here!
var command = 'WWW'


console.log(calc(command))

function calc() {
    var chars = command.trim().split(/[\s,]+/g)
    var results = ''
    var _ad1 = chars[0]
    var _ad1_ip = _ad1.split("/")[0]
    if (ip.isValidIp(_ad1_ip)) {
        var block = null;
        if (ip.isValidIpv4(_ad1_ip)) {
            results += yml.isValidIpv4
            block = new Netmask(_ad1)
            if (chars[1] == null) {
                results += '\n' + yml.isClass + '\t' + ip_class(_ad1_ip)
                results += '\n' + yml.isPrivate + '\t' + ip.isPrivate(_ad1_ip)
                results += '\n' + yml.isReserved + '\t' + ip.isReserved(_ad1_ip)
                results += '\n' + yml.addBase + '\t' + block.base
                results += '\n' + yml.addMask + '\t' + block.mask
                results += '\n' + yml.addHostmask + '\t' + block.hostmask
                results += '\n' + yml.addBroadcast + '\t' + block.broadcast
                results += '\n' + yml.size + '\t' + block.size
                results += '\n' + yml.first + '\t' + block.first
                results += '\n' + yml.last + '\t' + block.last
                results += '\n' + yml.hexForm + '\t' + '0x' + ip.getOctetArray(_ad1_ip).map(x => parseInt(x).toString(16)).join('')
                results += '\n' + yml.binaryForm + '\t' + '0b' + ip.getOctetArray(_ad1_ip).map(x => parseInt(x).toString(2)).join('.')
            }
        }
        else if (ip.isValidIpv6(_ad1_ip)) {
            results += yml.isValidIpv6
            results += '\n' + yml.addBase + '\t' + netpatser.base(_ad1)
            results += '\n' + yml.shortForm + '\t' + netpatser.ip(_ad1_ip)
            return results
        }
    }
    else if (chars.length == 1 && yml[chars[0]] != null) {
        results += yml[chars[0]]
        return results;
    }
    else {
        results += yml.invalidIp
    }
    return results
}

