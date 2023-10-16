const esbuild = require('esbuild');
const glob = require('glob');

const basePath = `${__dirname}/../src/appsync/resolvers`;

const resolverEntries = glob.sync(`${basePath}/*.ts`);

esbuild.build({
  entryPoints: resolverEntries,
  bundle: true,
  target: 'esnext',
  platform: 'node',
  format: 'esm',
  external: [
    '@aws-appsync/utils',
    '@aws-appsync/utils/dynamodb'
  ],
  outdir: `${basePath}/build`,
  treeShaking: true,
})
  .then((result) => console.log('build done', result))
  .catch((ex) => {
    console.error('build failed', ex);
    process.exit(1);
  });
