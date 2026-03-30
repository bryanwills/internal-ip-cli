#!/usr/bin/env node
import process from 'node:process';
import meow from 'meow';
import {internalIpV6Sync, internalIpV4Sync} from 'internal-ip';

const cli = meow(`
	Usage
	  $ internal-ip

	Options
	  --ipv6 -6  Return the IPv6 address (Default)
	  --ipv4 -4  Return the IPv4 address

	Examples
	  $ internal-ip
	  fe80::1
	  $ internal-ip --ipv4
	  10.0.0.79
`, {
	importMeta: import.meta,
	flags: {
		ipv6: {
			type: 'boolean',
			default: true,
			shortFlag: '6',
		},
		ipv4: {
			type: 'boolean',
			shortFlag: '4',
		},
	},
});

const getIp = cli.flags.ipv4 ? internalIpV4Sync : internalIpV6Sync;

const ip = getIp();

if (ip === undefined) {
	console.error('Could not detect your internal IP address');
	process.exit(1);
}

console.log(ip);
