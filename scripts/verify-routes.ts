import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { once } from 'node:events';
import { sections } from '../src/navigation/sections';
import { HOME, LANGS } from '../src/i18n/routing';
import { site } from '../src/content/site';
import { legacyDestinations, legacyProjectSlugs } from '../src/navigation/legacy';

async function verifyRoutes() {
  const port = process.env.PORTFOLIO_VERIFY_PORT ?? '3107';
  const origin = `http://127.0.0.1:${port}`;
  const server = spawn(
    process.execPath,
    [
      resolve('node_modules/next/dist/bin/next'),
      'start',
      '--hostname',
      '127.0.0.1',
      '--port',
      port,
    ],
    { stdio: ['ignore', 'pipe', 'pipe'] },
  );
  let output = '';
  try {
    await new Promise<void>((ready, reject) => {
      const timeout = setTimeout(
        () => reject(new Error(`Production server did not become ready:\n${output}`)),
        15000,
      );
      const collect = (chunk: Buffer) => {
        output += chunk.toString();
        if (output.includes('Ready in')) {
          clearTimeout(timeout);
          ready();
        }
      };
      server.stdout.on('data', collect);
      server.stderr.on('data', collect);
      server.once('error', (error) => {
        clearTimeout(timeout);
        reject(error);
      });
      server.once('exit', (code) => {
        clearTimeout(timeout);
        reject(new Error(`Production server exited (${code}):\n${output}`));
      });
    });

    for (const lang of LANGS) {
      const response = await fetch(origin + HOME[lang]);
      assert.equal(response.status, 200);
      const html = await response.text();
      for (const section of sections)
        assert(html.includes(`id="${section.id}"`), `${lang}: missing ${section.id}`);
      assert(html.includes(`lang="${lang}"`));
      assert(html.includes('https://ieeexplore.ieee.org/document/10734102'));
      assert(html.includes('https://ieeexplore.ieee.org/document/11003307'));
      assert(html.includes(site.email));
      console.log(`PASS ${HOME[lang]}: sections, language, publications, and contact`);
    }

    for (const [path, location] of Object.entries(legacyDestinations)) {
      const response = await fetch(`${origin}/${path}`, { redirect: 'manual' });
      assert.equal(response.status, 308);
      assert.equal(response.headers.get('location'), location);
    }
    for (const slug of legacyProjectSlugs) {
      const response = await fetch(`${origin}/projects/${slug}`, { redirect: 'manual' });
      assert.equal(response.status, 308);
      assert.equal(response.headers.get('location'), legacyDestinations.projects);
    }
    assert.equal((await fetch(`${origin}/projects/unknown`)).status, 404);
    assert.equal((await fetch(`${origin}/missing-page`)).status, 404);
    for (const route of ['/sitemap.xml', '/robots.txt', '/opengraph-image']) {
      assert.equal((await fetch(origin + route)).status, 200);
    }
    console.log(
      'PASS compatibility redirects, unknown-route 404s, sitemap, robots, and social image',
    );
  } finally {
    if (server.pid && server.exitCode === null && !server.killed) {
      const exited = once(server, 'exit');
      server.kill('SIGTERM');
      await exited;
    }
  }
}

void verifyRoutes().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
