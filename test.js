import process from 'node:process';
import {isIPv4, isIPv6} from 'node:net';
import test from 'ava';
import {execa} from 'execa';

const isCI = Boolean(process.env.CI);

test('IPv6', async t => {
	if (isCI) {
		t.pass();
		return;
	}

	const result = await execa('./cli.js', ['--ipv6'], {reject: false});

	if (result.exitCode === 1) {
		t.is(result.stderr, 'Could not detect your internal IP address');
	} else {
		t.true(isIPv6(result.stdout));
	}
});

test('IPv4', async t => {
	const {stdout} = await execa('./cli.js', ['--ipv4']);
	t.true(isIPv4(stdout));
});
