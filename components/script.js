const rule = require('../rule');

module.exports = {
  type: 'list',
  title: '脚本',
  actions: [
    {
      id: 'Add',
      title: 'Add',
      // icon: $icon('refresh'),
      route: $route('addScript')
    },
    {
      id: 'Resync',
      title: 'Resync',
      // icon: $icon('refresh'),
      async onClick() {
        // TODO 同步脚本
      }
    }
  ],
  async fetch() {
    const httpRequest = rule.getLocalScripts('http-request');
    const httpResponse = rule.getLocalScripts('http-response');
    return [
      {
        title: 'HTTP-Reqeust',
        type: 'general',
      },
      ...httpRequest.map((item) => {
        return {
          title: item.title,
          summary: '脚本: ' + item.path,
          type: 'simple',
          route: $route('addScript', {
            script: item
          }),
          async onLongClick() {
            let ok = await $input.confirm({
                title: '操作确认',
                message: '确认要删除吗?',
                okBtn: '确定'
            });
            if (ok) {
              rule.deleteLocalScript(item);
            }
          }
        };
      }),
      {
        title: 'HTTP-Response',
        type: 'general',
      },
      ...httpResponse.map((item) => {
        return {
          title: item.title,
          summary: '脚本: ' + item.path,
          type: 'simple',
          async onClick() {
            let ok = await $input.confirm({
                title: '操作确认',
                message: '确认要删除吗?',
                okBtn: '确定'
            });
            if (ok) {
              rule.deleteLocalScript(item);
            }
          }
        };
      }),
    ];
  },
};
