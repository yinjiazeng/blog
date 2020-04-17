import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, ShapeRoute, Nuomi, store, nuomi } from '@nuomi';
import * as Docfree from 'docfree-components';
import 'docfree-components/lib/style/lang.less';

const routes = [
  {
    "path": "/",
    "pathname": "/",
    "children": <Docfree.BlogEntry pageSize={30} />
  },
  {
    "ctime": 1586864388295.826,
    "utime": 1587047849110.914,
    "pathname": "/",
    "filename": "about",
    "ext": ".md",
    "title": "about",
    "path": "/about",
    ...require("/Users/aniu/Documents/GitHub/blog/docs/about.md").default
  },
  {
    "path": "/back-end",
    "children": [
      {
        "path": "/",
        "pathname": "/back-end/",
        "children": <Docfree.BlogEntry pageSize={30} />
      },
      {
        "path": "/Nginx",
        "children": [
          {
            "path": "/",
            "pathname": "/Nginx/",
            "children": <Docfree.BlogEntry pageSize={30} />
          },
          {
            "path": "*",
            "children": <Docfree.NotFound />
          }
        ]
      },
      {
        "path": "/Nodejs",
        "children": [
          {
            "path": "/",
            "pathname": "/Nodejs/",
            "children": <Docfree.BlogEntry pageSize={30} />
          },
          {
            "path": "*",
            "children": <Docfree.NotFound />
          }
        ]
      },
      {
        "path": "*",
        "children": <Docfree.NotFound />
      }
    ]
  },
  {
    "path": "/front-end",
    "children": [
      {
        "path": "/",
        "pathname": "/front-end/",
        "children": <Docfree.BlogEntry pageSize={30} />
      },
      {
        "path": "/CSS",
        "children": [
          {
            "path": "/",
            "pathname": "/CSS/",
            "children": <Docfree.BlogEntry pageSize={30} />
          },
          {
            "path": "*",
            "children": <Docfree.NotFound />
          }
        ]
      },
      {
        "path": "/HTML",
        "children": [
          {
            "path": "/",
            "pathname": "/HTML/",
            "children": <Docfree.BlogEntry pageSize={30} />
          },
          {
            "path": "*",
            "children": <Docfree.NotFound />
          }
        ]
      },
      {
        "path": "/JQuery",
        "children": [
          {
            "path": "/",
            "pathname": "/JQuery/",
            "children": <Docfree.BlogEntry pageSize={30} />
          },
          {
            "path": "*",
            "children": <Docfree.NotFound />
          }
        ]
      },
      {
        "path": "/Javascript",
        "children": [
          {
            "path": "/",
            "pathname": "/Javascript/",
            "children": <Docfree.BlogEntry pageSize={30} />
          },
          {
            "path": "*",
            "children": <Docfree.NotFound />
          }
        ]
      },
      {
        "path": "/React",
        "children": [
          {
            "path": "/",
            "pathname": "/React/",
            "children": <Docfree.BlogEntry pageSize={30} />
          },
          {
            "path": "*",
            "children": <Docfree.NotFound />
          }
        ]
      },
      {
        "path": "/Typescript",
        "children": [
          {
            "path": "/",
            "pathname": "/Typescript/",
            "children": <Docfree.BlogEntry pageSize={30} />
          },
          {
            "path": "*",
            "children": <Docfree.NotFound />
          }
        ]
      },
      {
        "path": "/Vue",
        "children": [
          {
            "path": "/",
            "pathname": "/Vue/",
            "children": <Docfree.BlogEntry pageSize={30} />
          },
          {
            "path": "*",
            "children": <Docfree.NotFound />
          }
        ]
      },
      {
        "path": "/Webpack",
        "children": [
          {
            "path": "/",
            "pathname": "/Webpack/",
            "children": <Docfree.BlogEntry pageSize={30} />
          },
          {
            "path": "*",
            "children": <Docfree.NotFound />
          }
        ]
      },
      {
        "path": "*",
        "children": <Docfree.NotFound />
      }
    ]
  },
  {
    "path": "/life",
    "children": [
      {
        "path": "/",
        "pathname": "/life/",
        "children": <Docfree.BlogEntry pageSize={30} />
      },
      {
        "ctime": 1586950258282.7258,
        "utime": 1586953110892.0593,
        "pathname": "/life/",
        "filename": "骑行去大理",
        "ext": ".md",
        "title": "骑行去大理",
        "path": "/骑行去大理",
        ...require("/Users/aniu/Documents/GitHub/blog/docs/life/骑行去大理.md").default
      },
      {
        "path": "*",
        "children": <Docfree.NotFound />
      }
    ]
  }
];
const documentTitle = '前端阿牛の博客';

const generateData = (rawData, data = []) => {
  rawData.forEach((route) => {
    if (route.path !== '*') {
      const { children, render, effects, reducers, onInit, onChange, ...rest } = route;
      if (Array.isArray(children)) {
        data = generateData(children, data);
      } else if (route.path !== '/' && route.title) {
        data.push(rest);
      }
    }
  });
  return data;
};

const dataSource = generateData(routes)
.sort(({ ctime: a }, { ctime: b }) => {
  if (a < b) {
    return 1;
  }
  if (a > b) {
    return -1;
  }
  return 0;
});

const getList = (pathname, { query }) => {
  const prePath = query._ || pathname;
  const list = [];

  dataSource.forEach(({ title, pathname: pre, filename, ctime }) => {
    if (pre.startsWith(prePath)) {
      list.push({ to: pre + filename + '?_=' + prePath, text: title, ctime });
    }
  });

  return list;
};

const getMenus = function(array, menus = [], list = []) {
  array.forEach((item) => {
    if (typeof item === 'string') {
      const name = item.trim();

      if (name) {
        const findData = dataSource.find((source) => {
          return source.pathname === this.pathname && source.filename === name;
        });

        let menuData;
        if (findData) {
          const { pathname, filename, title, ext } = findData;
          const menu = { to: pathname + (/^README$/i.test(filename) ? '' : filename), text: title };

          if (filename === this.filename && ext === this.ext) {
            menu.menus = this.sidebarMenus;
          }

          menuData = menu;

        } else {
          menuData = { to: this.pathname + name, text: name };
        }

        list.push(menuData);
        menus.push(menuData);
      }
    } else if (item && typeof item === 'object') {
      if (Array.isArray(item)) {
        const { menus: m, list: l } = getMenus.call(this, item);
        list = list.concat(l);
        menus = menus.concat(m);
      } else {
        const { text, menus: ms } = item;
        if (text) {
          if (Array.isArray(ms)) {
            const { menus: m, list: l } = getMenus.call(this, ms);
            const menu = { text, menus: m };
            list = list.concat(l);
            menus.push(menu);
          } else {
            menus.push({ text });
          }
        }
      }
    }
  });

  return { menus, list };
};

const getNavMenus = function(array, menus = []) {
  array.forEach(({ to, text, menus: ms }) => {
    if (text) {
      if (Array.isArray(ms)) {
        menus.push({
          text,
          to,
          menus: getNavMenus(ms),
        });
      } else {
        menus.push({ text, to });
      }
    }
  });
  return menus;
};

const findFilename = (menus, filename) => {
  let find = false;
  if (Array.isArray(menus)) {
    for(let item of menus) {
      if (item === filename) {
        find = true;
        break;
      } else if (!find && item && item.menus) {
        find = findFilename(item.menus, filename);
      }
    }
  }
  return find;
};

nuomi.config({
  state: {
    listSource: [],
  },
  effects: {
    initData() {
      const nuomiProps = this.getNuomiProps();
      const {
        title,
        pathname,
        filename,
        showSidebar,
        showPageSidebar,
        sidebarTitle,
        sidebarMenus,
        pageSidebarMenus,
        data: routeData,
        location,
      } = nuomiProps;

      const payload = {
        sidebarTitle,
        showSidebar: !!showSidebar,
        showPageSidebar: !!showPageSidebar,
        pageSidebarMenus,
      };

      if (!routeData.computedSidebarMenus) {
        let data;
        
        if (data && findFilename(data.menus, filename)) {
          const { title, menus } = data;
          payload.sidebarTitle = title;

          if (Array.isArray(menus) && menus.length) {
            const { menus: m, list } = getMenus.call(nuomiProps, menus);

            routeData.listSource = list;
            routeData.computedSidebarMenus = m;
          }
        } else {
          routeData.listSource = [];
          routeData.computedSidebarMenus = [{ text: title, menus: sidebarMenus }];
        }
      }

      payload.sidebarMenus = routeData.computedSidebarMenus || [];

      const listSource = getList(pathname, location) || [];

      this.dispatch({
        type: '_updateState',
        payload: {
          listSource,
        },
      });

      store.dispatch({
        type: 'global/_updateState',
        payload,
      });
    }
  },
  onInit() {
    const { path, title, location, data } = this;

    if (title && path !== '/') {
      document.title = title + ' | ' + documentTitle;
    } else {
      document.title = documentTitle;
    }

    // 文章页面
    if (title) {
      // search跳转来
      if (data.hash) {
        const { hash: h } = window.location;
        setTimeout(() => {
          window.location.hash = h + '#' + data.hash;
        });
        return;
      }

      if (!location.hash) {
        window.scrollTo({ top: 0 });
      }
    } else {
      // 博客首页
      if (path) {
        window.scrollTo({ top: 0 });
      }
    }
  }
});

const nav = getNavMenus([
  {
    "text": "前端",
    "to": "/front-end",
    "menus": [
      {
        "text": "Javascript",
        "to": "/front-end/Javascript"
      },
      {
        "text": "Typescript",
        "to": "/front-end/Typescript"
      },
      {
        "text": "React",
        "to": "/front-end/React"
      },
      {
        "text": "Vue",
        "to": "/front-end/Vue"
      },
      {
        "text": "JQuery",
        "to": "/front-end/JQuery"
      },
      {
        "text": "Webpack",
        "to": "/front-end/Webpack"
      },
      {
        "text": "CSS",
        "to": "/front-end/CSS"
      },
      {
        "text": "HTML",
        "to": "/front-end/HTML"
      }
    ]
  },
  {
    "text": "后端",
    "to": "/back-end",
    "menus": [
      {
        "text": "Nginx",
        "to": "/back-end/Nginx"
      },
      {
        "text": "Nodejs",
        "to": "/back-end/Nodejs"
      }
    ]
  },
  {
    "text": "生活",
    "to": "/life"
  },
  {
    "text": "关于",
    "to": "/about"
  },
  {
    "text": "GitHub",
    "to": "https://github.com/yinjiazeng"
  }
]);
const footer = require('/Users/aniu/Documents/GitHub/blog/docs/.docfree/footer.js');
const routerType = 'hash';

const globalState = {
  showSidebar: false,
  pageSidebar: false,
  sidebarTtile: '',
  sidebarMenus: [],
  pageSidebarMenus: [],
};

const App = () => {
  return (
    <Router type={routerType}>
      <Nuomi id="global" state={globalState} onInit={null}>
        <Docfree.Layout type={routerType} title={documentTitle} nav={nav} footer={footer} dataSource={dataSource}>
          <ShapeRoute routes={routes} />
          <Route path="*">
            <Docfree.NotFound />
          </Route>
        </Docfree.Layout>
      </Nuomi>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));