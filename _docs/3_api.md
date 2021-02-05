---
title: 接口文档
category: 关于
order: 32
---

<link rel="stylesheet" type="text/css" href="/css/swagger-ui.css" >
<link rel="icon" type="image/png" href="/images/favicon.png" sizes="32x32" />
<link rel="icon" type="image/png" href="/images/favicon.png" sizes="16x16" />
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

<script src="/scripts/swagger-ui-bundle.js"> </script>
<script src="/scripts/swagger-ui-standalone-preset.js"> </script>
<script>
    window.onload = function() {
      const ui = SwaggerUIBundle({
        url: "/objects/openapi-v2.json",
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
