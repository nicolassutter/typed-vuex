import { promises as fs } from 'fs'
import { resolve } from 'path'
import * as tsup from 'tsup'
import chokidar from 'chokidar'
import fg from 'fast-glob'

function indent(count: number, indentSize = 2) {
  return ' '.repeat(indentSize * count)
}

(async function() {
  const args = process.argv.slice(2)
  const cwd = process.cwd()

  const useWatch = args.includes('--watch')

  const outputDir = resolve(cwd, '.types', 'stores')
  const storesDir = resolve(cwd, 'stores')

  async function generateStores () {
    const start = new Date()
    console.log('🕓 Generating store files...')

    const storeFiles = await fg(`${storesDir}/**/store.*.{js,ts}`)

    await tsup.build({
      entryPoints: storeFiles,
      dts: {
        only: true
      },
      clean: true,
      outDir: outputDir,
      silent: true
    })

    const mergedStores = (await fg(`${outputDir}/**/store.*.d.ts`))
      .map((file) => `${indent(2)}& If<import('${file.replace('.d.ts', '')}').Store, any, {}>`)
      .join('\n')

    const moduleDeclaration = [
      'declare global {',
      `${indent(1)}type GlobalStore = StoreUtils.TransformStore<\n${mergedStores}\n${indent(1)}>`,
      `${indent(1)}type GlobalGetters = GlobalStore['getters']`,
      `${indent(1)}type GlobalActions = GlobalStore['actions']`,
      `${indent(1)}type GlobalState = GlobalStore['state']`,
      '}',
      'export {}'
    ].join('\n')

    await fs.writeFile(
      resolve(outputDir, 'globalStore.d.ts'),
      moduleDeclaration
    )

    console.log(`✅ Store files generated ! (${new Date().getTime() - start.getTime()}ms)`)
  }

  generateStores()

  if (useWatch) {
    const watcher = chokidar.watch(
      `${storesDir}/**/store.*.js`,
      {
        ignoreInitial: true
      }
    )

    watcher.on('change', generateStores)
    watcher.on('add', generateStores)
    watcher.on('unlink', generateStores)
  }
})()