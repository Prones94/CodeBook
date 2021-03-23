import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {


      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        console.log('Handling root entry file of index.js')
        return {
          path: 'index.js',
          namespace: 'a',
        };
      });

      build.onResolve({ filter: /^\.+\//},(args: any) => {
        console.log('Handling relative paths in module');
        return {
          namespace: 'a',
          path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href
        }

      })

      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('Handling main file of a module');
        return {
          namespace:'a',
          path: `https://unpkg.com/${args.path}`
        }
      });
    },
  };
};