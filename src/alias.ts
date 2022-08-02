import 'reflect-metadata';
import moduleAlias from 'module-alias';

if (process.env.NODE_ENV === 'production') {
  moduleAlias.addAliases({
    '@src': __dirname,
    '@modules': __dirname + '/modules'
  });
  
  moduleAlias();
}