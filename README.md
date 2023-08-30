# ui-test-framework
Framework for Testing With Playwright Test as a test-runner

# 1. Instalation
For instalation you need:
- Node.js 18.7.1 LTS +

## 1.1 Install packages
**npm:**
```npm install```
**pnpm**
```pnpm install```
**yarn**
```yarn```

## 1.2 Install playwright browsers
Playwright can install supported browsers. Running the command without arguments will install the default browsers.
```npx playwright install```

You can also install specific browsers by providing an argument:
```npx playwright install webkit```

See all supported browsers:
```npx playwright install --help```


## 1.3 Run test
```npx playwright test```

# 2. Configuration
All configuration based on config(https://www.npmjs.com/package/config) package.
This is mean you need add your env config to ./config folder and you can access it everywhere by importing it
```import config from 'config'```

Project get configuration based on **NODE_ENV**, it take it value and use it as a config path, for example:
```export NODE_ENV=production```
```npx playwright test```
lead to config search for ./config/production.json

In case if theres no such file - it uses default.json.

