---
title: 接口文档
category: 关于
---

<link rel="stylesheet" type="text/css" href="/css/swagger-ui.css" >
<link rel="icon" type="image/png" href="/img/favicon.png" sizes="32x32" />
<link rel="icon" type="image/png" href="/img/favicon.png" sizes="16x16" />
<style>
   html
      {
        box-sizing: border-box;
        overflow: -moz-scrollbars-vertical;
        overflow-y: scroll;
      }

      *,
      *:before,
      *:after
      {
        box-sizing: inherit;
      }

      body
      {
        margin:0;
        background: #fafafa;
   }
</style>

<div id="swagger-ui"></div>

<script src="/js/swagger-ui-bundle.js"> </script>
<script src="/js/swagger-ui-standalone-preset.js"> </script>
<script>
    window.onload = function() {
      const ui = SwaggerUIBundle({
        url: "/obj/openapi-v2.json",
        validatorUrl: null,
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        plugins: [
          SwaggerUIBundle.plugins.DownloadUrl
        ],
        layout: "StandaloneLayout"
      })
      window.ui = ui
    }
</script>
