import { promises as fs } from 'fs';

async function globalTeardown() {
  await fs.mkdir('test-results', { recursive: true });
  await fs.writeFile('test-results/global-teardown.txt', 'Global teardown completed\n');
}

export default globalTeardown;
