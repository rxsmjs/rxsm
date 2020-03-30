module.exports = {
    "presets": [
        ['@babel/preset-env', {
            "useBuiltIns": "usage",
            "targets" : {
              "node": true,

            },
            "corejs": 3
        }],
    ],
    "plugins": [
        "transform-es2017-object-entries",
        ["@babel/plugin-transform-runtime",
          {
            "regenerator": true
          }
        ]
      ],
};