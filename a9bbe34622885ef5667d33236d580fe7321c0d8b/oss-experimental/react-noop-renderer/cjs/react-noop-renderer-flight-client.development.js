/**
 * @license React
 * react-noop-renderer-flight-client.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

"use strict";
"production" !== process.env.NODE_ENV &&
  (function () {
    var flightModules = require("react-noop-renderer/flight-modules"),
      decoderOptions = { stream: !0 },
      _ReactFlightClient = require("react-client/flight").default({
        createStringDecoder: function () {
          return new TextDecoder();
        },
        readPartialStringChunk: function (decoder, buffer) {
          return decoder.decode(buffer, decoderOptions);
        },
        readFinalStringChunk: function (decoder, buffer) {
          return decoder.decode(buffer);
        },
        resolveClientReference: function (bundlerConfig, idx) {
          return idx;
        },
        prepareDestinationForModule: function () {},
        preloadModule: function () {},
        requireModule: function (idx) {
          return flightModules.readModule(idx);
        },
        parseModel: function (response, json) {
          return JSON.parse(json, response._fromJSON);
        },
        bindToConsole: function (methodName, args) {
          return Function.prototype.bind.apply(
            console[methodName],
            [console].concat(args)
          );
        }
      }),
      createResponse = _ReactFlightClient.createResponse,
      processBinaryChunk = _ReactFlightClient.processBinaryChunk,
      getRoot = _ReactFlightClient.getRoot;
    exports.read = function (source, options) {
      options = createResponse(
        source,
        null,
        null,
        void 0,
        void 0,
        void 0,
        void 0,
        void 0 !== options ? options.findSourceMapURL : void 0,
        !0,
        void 0
      );
      for (var i = 0; i < source.length; i++)
        processBinaryChunk(options, source[i], 0);
      return getRoot(options);
    };
  })();
