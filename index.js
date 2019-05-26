const Netmask = require('netmask').Netmask
const ip = require('ip-utils')
const fs = require('fs')
const yml = require('yaml').parse(fs.readFileSync('config.yml', 'utf8'))
const ip_class = require('ip-class')
const netpatser = require('netparser')

//change your commands here!
var command = '1088:0000:0000:0000:0008:0800:200C:463A/73'


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
            else if (chars[1] === '-c' && chars[2] != null) {
                results += '\n' + block.contains(chars[2]).toString().toUpperCase();
            }
            else if (chars[1].length >= 2) {
                for (var i = 1; i < chars[1].length; i++) {
                    switch (chars[1][i]) {
                        case 'k': //isClass
                            results += '\n' + yml.isClass + '\t' + ip_class(_ad1_ip)
                            break
                        case 'p': //isPrivate
                            results += '\n' + yml.isPrivate + '\t' + ip.isPrivate(_ad1_ip)
                            break
                        case 'r': //isReserved
                            results += '\n' + yml.isReserved + '\t' + ip.isReserved(_ad1_ip)
                            break
                        case 'a': //base
                            if (ip.isValidIpv4(_ad1_ip)) {
                                results += '\n' + yml.addBase + '\t' + block.base
                            } else if (ip.isValidIpv6(_ad1_ip)) {
                                results += '\n' + yml.addBase + '\t' + netpatser.base(_ad1)
                            }
                            break
                        case 'b': //addBroadcast
                            results += '\n' + yml.addBroadcast + '\t' + block.broadcast
                            break
                        case 'm': //addMask
                            results += '\n' + yml.addHostmask + '\t' + block.hostmask
                            break
                        case 's': //size
                            results += '\n' + yml.size + '\t' + block.size
                            break
                        case 'f': //first
                            results += '\n' + yml.first + '\t' + block.first
                            break
                        case 'l': //last
                            results += '\n' + yml.last + '\t' + block.last
                            break
                        case 'e': //shortForm
                            if (ip.isValidIpv6(_ad1_ip)) results += '\n' + yml.shortForm + '\t' + netpatser.ip(_ad1_ip)
                            break
                        case 'h': //help
                            results += '\n'
                                        +'-c \t: ipA contains ipB\n'
                                        +'--------------\n'
                                        +'-k \t: ipClass\n'
                                        +'-p \t: check ip private\n'
                                        +'-r \t: check ip reserved\n'
                                        +'-a \t: get base address\n'
                                        +'-b \t: get broadcast address\n'
                                        +'-m \t: get mask ip\n'
                                        +'-s \t: No.Hosts\n'
                                        +'-f \t: first ip\n'
                                        +'-l \t: last ip\n'
                                        +'-e \t: shortened form\n'
                                        +'-2 \t: binary Form\n'
                                        +'-6 \t: hexa Form\n'
                                        +'--------------\n'
                                        +'-h \t: get helps\n'
                                        +'-v \t: get version'
                                        break
                        case '2': //binaryForm
                            results += '\n' + yml.binaryForm + '\t' + '0b' + ip.getOctetArray(_ad1_ip).map(x => parseInt(x).toString(2)).join('.')
                            break
                        case '6': //hexForm
                            results += '\n' + yml.hexForm + '\t' + '0x' + ip.getOctetArray(_ad1_ip).map(x => parseInt(x).toString(16)).join('')
                            break
                        case 'v': //version
                            results += '\n' + yml.version
                            break
                    }
                }
            }
        }
        else if (ip.isValidIpv6(_ad1_ip)) {
            results += yml.isValidIpv6
            results += '\n' + yml.addBase + '\t' + netpatser.baseAddress(_ad1)
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

