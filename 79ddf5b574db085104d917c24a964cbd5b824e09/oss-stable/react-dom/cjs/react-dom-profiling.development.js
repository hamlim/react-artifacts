/**
 * @license React
 * react-dom-profiling.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/
"use strict";
"production" !== process.env.NODE_ENV &&
  (function () {
    function findHook(fiber, id) {
      for (fiber = fiber.memoizedState; null !== fiber && 0 < id; )
        (fiber = fiber.next), id--;
      return fiber;
    }
    function copyWithSetImpl(obj, path, index, value) {
      if (index >= path.length) return value;
      var key = path[index],
        updated = isArrayImpl(obj) ? obj.slice() : assign({}, obj);
      updated[key] = copyWithSetImpl(obj[key], path, index + 1, value);
      return updated;
    }
    function copyWithRename(obj, oldPath, newPath) {
      if (oldPath.length !== newPath.length)
        console.warn("copyWithRename() expects paths of the same length");
      else {
        for (var i = 0; i < newPath.length - 1; i++)
          if (oldPath[i] !== newPath[i]) {
            console.warn(
              "copyWithRename() expects paths to be the same except for the deepest key"
            );
            return;
          }
        return copyWithRenameImpl(obj, oldPath, newPath, 0);
      }
    }
    function copyWithRenameImpl(obj, oldPath, newPath, index) {
      var oldKey = oldPath[index],
        updated = isArrayImpl(obj) ? obj.slice() : assign({}, obj);
      index + 1 === oldPath.length
        ? ((updated[newPath[index]] = updated[oldKey]),
          isArrayImpl(updated)
            ? updated.splice(oldKey, 1)
            : delete updated[oldKey])
        : (updated[oldKey] = copyWithRenameImpl(
            obj[oldKey],
            oldPath,
            newPath,
            index + 1
          ));
      return updated;
    }
    function copyWithDeleteImpl(obj, path, index) {
      var key = path[index],
        updated = isArrayImpl(obj) ? obj.slice() : assign({}, obj);
      if (index + 1 === path.length)
        return (
          isArrayImpl(updated) ? updated.splice(key, 1) : delete updated[key],
          updated
        );
      updated[key] = copyWithDeleteImpl(obj[key], path, index + 1);
      return updated;
    }
    function shouldSuspendImpl() {
      return !1;
    }
    function shouldErrorImpl() {
      return null;
    }
    function createFiber(tag, pendingProps, key, mode) {
      return new FiberNode(tag, pendingProps, key, mode);
    }
    function warnForMissingKey() {}
    function warnInvalidHookAccess() {
      console.error(
        "Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://react.dev/link/rules-of-hooks"
      );
    }
    function warnInvalidContextAccess() {
      console.error(
        "Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."
      );
    }
    function noop$3() {}
    function setToSortedString(set) {
      var array = [];
      set.forEach(function (value) {
        array.push(value);
      });
      return array.sort().join(", ");
    }
    function scheduleRoot(root, element) {
      root.context === emptyContextObject &&
        (updateContainerSync(element, root, null, null), flushSyncWork$1());
    }
    function scheduleRefresh(root, update) {
      if (null !== resolveFamily) {
        var staleFamilies = update.staleFamilies;
        update = update.updatedFamilies;
        flushPassiveEffects();
        scheduleFibersWithFamiliesRecursively(
          root.current,
          update,
          staleFamilies
        );
        flushSyncWork$1();
      }
    }
    function setRefreshHandler(handler) {
      resolveFamily = handler;
    }
    function isValidContainer(node) {
      return !(
        !node ||
        (1 !== node.nodeType && 9 !== node.nodeType && 11 !== node.nodeType)
      );
    }
    function getIteratorFn(maybeIterable) {
      if (null === maybeIterable || "object" !== typeof maybeIterable)
        return null;
      maybeIterable =
        (MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL]) ||
        maybeIterable["@@iterator"];
      return "function" === typeof maybeIterable ? maybeIterable : null;
    }
    function getComponentNameFromType(type) {
      if (null == type) return null;
      if ("function" === typeof type)
        return type.$$typeof === REACT_CLIENT_REFERENCE
          ? null
          : type.displayName || type.name || null;
      if ("string" === typeof type) return type;
      switch (type) {
        case REACT_FRAGMENT_TYPE:
          return "Fragment";
        case REACT_PORTAL_TYPE:
          return "Portal";
        case REACT_PROFILER_TYPE:
          return "Profiler";
        case REACT_STRICT_MODE_TYPE:
          return "StrictMode";
        case REACT_SUSPENSE_TYPE:
          return "Suspense";
        case REACT_SUSPENSE_LIST_TYPE:
          return "SuspenseList";
      }
      if ("object" === typeof type)
        switch (
          ("number" === typeof type.tag &&
            console.error(
              "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
            ),
          type.$$typeof)
        ) {
          case REACT_CONTEXT_TYPE:
            return (type.displayName || "Context") + ".Provider";
          case REACT_CONSUMER_TYPE:
            return (type._context.displayName || "Context") + ".Consumer";
          case REACT_FORWARD_REF_TYPE:
            var innerType = type.render;
            type = type.displayName;
            type ||
              ((type = innerType.displayName || innerType.name || ""),
              (type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef"));
            return type;
          case REACT_MEMO_TYPE:
            return (
              (innerType = type.displayName || null),
              null !== innerType
                ? innerType
                : getComponentNameFromType(type.type) || "Memo"
            );
          case REACT_LAZY_TYPE:
            innerType = type._payload;
            type = type._init;
            try {
              return getComponentNameFromType(type(innerType));
            } catch (x) {}
        }
      return null;
    }
    function getComponentNameFromOwner(owner) {
      return "number" === typeof owner.tag
        ? getComponentNameFromFiber(owner)
        : "string" === typeof owner.name
          ? owner.name
          : null;
    }
    function getComponentNameFromFiber(fiber) {
      var type = fiber.type;
      switch (fiber.tag) {
        case 24:
          return "Cache";
        case 9:
          return (type._context.displayName || "Context") + ".Consumer";
        case 10:
          return (type.displayName || "Context") + ".Provider";
        case 18:
          return "DehydratedFragment";
        case 11:
          return (
            (fiber = type.render),
            (fiber = fiber.displayName || fiber.name || ""),
            type.displayName ||
              ("" !== fiber ? "ForwardRef(" + fiber + ")" : "ForwardRef")
          );
        case 7:
          return "Fragment";
        case 26:
        case 27:
        case 5:
          return type;
        case 4:
          return "Portal";
        case 3:
          return "Root";
        case 6:
          return "Text";
        case 16:
          return getComponentNameFromType(type);
        case 8:
          return type === REACT_STRICT_MODE_TYPE ? "StrictMode" : "Mode";
        case 22:
          return "Offscreen";
        case 12:
          return "Profiler";
        case 21:
          return "Scope";
        case 13:
          return "Suspense";
        case 19:
          return "SuspenseList";
        case 25:
          return "TracingMarker";
        case 1:
        case 0:
        case 14:
        case 15:
          if ("function" === typeof type)
            return type.displayName || type.name || null;
          if ("string" === typeof type) return type;
          break;
        case 29:
          type = fiber._debugInfo;
          if (null != type)
            for (var i = type.length - 1; 0 <= i; i--)
              if ("string" === typeof type[i].name) return type[i].name;
          if (null !== fiber.return)
            return getComponentNameFromFiber(fiber.return);
      }
      return null;
    }
    function disabledLog() {}
    function disableLogs() {
      if (0 === disabledDepth) {
        prevLog = console.log;
        prevInfo = console.info;
        prevWarn = console.warn;
        prevError = console.error;
        prevGroup = console.group;
        prevGroupCollapsed = console.groupCollapsed;
        prevGroupEnd = console.groupEnd;
        var props = {
          configurable: !0,
          enumerable: !0,
          value: disabledLog,
          writable: !0
        };
        Object.defineProperties(console, {
          info: props,
          log: props,
          warn: props,
          error: props,
          group: props,
          groupCollapsed: props,
          groupEnd: props
        });
      }
      disabledDepth++;
    }
    function reenableLogs() {
      disabledDepth--;
      if (0 === disabledDepth) {
        var props = { configurable: !0, enumerable: !0, writable: !0 };
        Object.defineProperties(console, {
          log: assign({}, props, { value: prevLog }),
          info: assign({}, props, { value: prevInfo }),
          warn: assign({}, props, { value: prevWarn }),
          error: assign({}, props, { value: prevError }),
          group: assign({}, props, { value: prevGroup }),
          groupCollapsed: assign({}, props, { value: prevGroupCollapsed }),
          groupEnd: assign({}, props, { value: prevGroupEnd })
        });
      }
      0 > disabledDepth &&
        console.error(
          "disabledDepth fell below zero. This is a bug in React. Please file an issue."
        );
    }
    function describeBuiltInComponentFrame(name) {
      if (void 0 === prefix)
        try {
          throw Error();
        } catch (x) {
          var match = x.stack.trim().match(/\n( *(at )?)/);
          prefix = (match && match[1]) || "";
          suffix =
            -1 < x.stack.indexOf("\n    at")
              ? " (<anonymous>)"
              : -1 < x.stack.indexOf("@")
                ? "@unknown:0:0"
                : "";
        }
      return "\n" + prefix + name + suffix;
    }
    function describeNativeComponentFrame(fn, construct) {
      if (!fn || reentry) return "";
      var frame = componentFrameCache.get(fn);
      if (void 0 !== frame) return frame;
      reentry = !0;
      frame = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var previousDispatcher = null;
      previousDispatcher = ReactSharedInternals.H;
      ReactSharedInternals.H = null;
      disableLogs();
      try {
        var RunInRootFrame = {
          DetermineComponentFrameRoot: function () {
            try {
              if (construct) {
                var Fake = function () {
                  throw Error();
                };
                Object.defineProperty(Fake.prototype, "props", {
                  set: function () {
                    throw Error();
                  }
                });
                if ("object" === typeof Reflect && Reflect.construct) {
                  try {
                    Reflect.construct(Fake, []);
                  } catch (x) {
                    var control = x;
                  }
                  Reflect.construct(fn, [], Fake);
                } else {
                  try {
                    Fake.call();
                  } catch (x$0) {
                    control = x$0;
                  }
                  fn.call(Fake.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (x$1) {
                  control = x$1;
                }
                (Fake = fn()) &&
                  "function" === typeof Fake.catch &&
                  Fake.catch(function () {});
              }
            } catch (sample) {
              if (sample && control && "string" === typeof sample.stack)
                return [sample.stack, control.stack];
            }
            return [null, null];
          }
        };
        RunInRootFrame.DetermineComponentFrameRoot.displayName =
          "DetermineComponentFrameRoot";
        var namePropDescriptor = Object.getOwnPropertyDescriptor(
          RunInRootFrame.DetermineComponentFrameRoot,
          "name"
        );
        namePropDescriptor &&
          namePropDescriptor.configurable &&
          Object.defineProperty(
            RunInRootFrame.DetermineComponentFrameRoot,
            "name",
            { value: "DetermineComponentFrameRoot" }
          );
        var _RunInRootFrame$Deter =
            RunInRootFrame.DetermineComponentFrameRoot(),
          sampleStack = _RunInRootFrame$Deter[0],
          controlStack = _RunInRootFrame$Deter[1];
        if (sampleStack && controlStack) {
          var sampleLines = sampleStack.split("\n"),
            controlLines = controlStack.split("\n");
          for (
            _RunInRootFrame$Deter = namePropDescriptor = 0;
            namePropDescriptor < sampleLines.length &&
            !sampleLines[namePropDescriptor].includes(
              "DetermineComponentFrameRoot"
            );

          )
            namePropDescriptor++;
          for (
            ;
            _RunInRootFrame$Deter < controlLines.length &&
            !controlLines[_RunInRootFrame$Deter].includes(
              "DetermineComponentFrameRoot"
            );

          )
            _RunInRootFrame$Deter++;
          if (
            namePropDescriptor === sampleLines.length ||
            _RunInRootFrame$Deter === controlLines.length
          )
            for (
              namePropDescriptor = sampleLines.length - 1,
                _RunInRootFrame$Deter = controlLines.length - 1;
              1 <= namePropDescriptor &&
              0 <= _RunInRootFrame$Deter &&
              sampleLines[namePropDescriptor] !==
                controlLines[_RunInRootFrame$Deter];

            )
              _RunInRootFrame$Deter--;
          for (
            ;
            1 <= namePropDescriptor && 0 <= _RunInRootFrame$Deter;
            namePropDescriptor--, _RunInRootFrame$Deter--
          )
            if (
              sampleLines[namePropDescriptor] !==
              controlLines[_RunInRootFrame$Deter]
            ) {
              if (1 !== namePropDescriptor || 1 !== _RunInRootFrame$Deter) {
                do
                  if (
                    (namePropDescriptor--,
                    _RunInRootFrame$Deter--,
                    0 > _RunInRootFrame$Deter ||
                      sampleLines[namePropDescriptor] !==
                        controlLines[_RunInRootFrame$Deter])
                  ) {
                    var _frame =
                      "\n" +
                      sampleLines[namePropDescriptor].replace(
                        " at new ",
                        " at "
                      );
                    fn.displayName &&
                      _frame.includes("<anonymous>") &&
                      (_frame = _frame.replace("<anonymous>", fn.displayName));
                    "function" === typeof fn &&
                      componentFrameCache.set(fn, _frame);
                    return _frame;
                  }
                while (1 <= namePropDescriptor && 0 <= _RunInRootFrame$Deter);
              }
              break;
            }
        }
      } finally {
        (reentry = !1),
          (ReactSharedInternals.H = previousDispatcher),
          reenableLogs(),
          (Error.prepareStackTrace = frame);
      }
      sampleLines = (sampleLines = fn ? fn.displayName || fn.name : "")
        ? describeBuiltInComponentFrame(sampleLines)
        : "";
      "function" === typeof fn && componentFrameCache.set(fn, sampleLines);
      return sampleLines;
    }
    function describeFiber(fiber) {
      switch (fiber.tag) {
        case 26:
        case 27:
        case 5:
          return describeBuiltInComponentFrame(fiber.type);
        case 16:
          return describeBuiltInComponentFrame("Lazy");
        case 13:
          return describeBuiltInComponentFrame("Suspense");
        case 19:
          return describeBuiltInComponentFrame("SuspenseList");
        case 0:
        case 15:
          return (fiber = describeNativeComponentFrame(fiber.type, !1)), fiber;
        case 11:
          return (
            (fiber = describeNativeComponentFrame(fiber.type.render, !1)), fiber
          );
        case 1:
          return (fiber = describeNativeComponentFrame(fiber.type, !0)), fiber;
        default:
          return "";
      }
    }
    function getStackByFiberInDevAndProd(workInProgress) {
      try {
        var info = "";
        do {
          info += describeFiber(workInProgress);
          var debugInfo = workInProgress._debugInfo;
          if (debugInfo)
            for (var i = debugInfo.length - 1; 0 <= i; i--) {
              var entry = debugInfo[i];
              if ("string" === typeof entry.name) {
                var JSCompiler_temp_const = info,
                  env = entry.env;
                var JSCompiler_inline_result = describeBuiltInComponentFrame(
                  entry.name + (env ? " [" + env + "]" : "")
                );
                info = JSCompiler_temp_const + JSCompiler_inline_result;
              }
            }
          workInProgress = workInProgress.return;
        } while (workInProgress);
        return info;
      } catch (x) {
        return "\nError generating stack: " + x.message + "\n" + x.stack;
      }
    }
    function getCurrentFiberOwnerNameInDevOrNull() {
      if (null === current) return null;
      var owner = current._debugOwner;
      return null != owner ? getComponentNameFromOwner(owner) : null;
    }
    function getCurrentFiberStackInDev() {
      return null === current ? "" : getStackByFiberInDevAndProd(current);
    }
    function runWithFiberInDEV(fiber, callback, arg0, arg1, arg2, arg3, arg4) {
      var previousFiber = current;
      ReactSharedInternals.getCurrentStack =
        null === fiber ? null : getCurrentFiberStackInDev;
      isRendering = !1;
      current = fiber;
      try {
        return callback(arg0, arg1, arg2, arg3, arg4);
      } finally {
        current = previousFiber;
      }
      throw Error(
        "runWithFiberInDEV should never be called in production. This is a bug in React."
      );
    }
    function getNearestMountedFiber(fiber) {
      var node = fiber,
        nearestMounted = fiber;
      if (fiber.alternate) for (; node.return; ) node = node.return;
      else {
        fiber = node;
        do
          (node = fiber),
            0 !== (node.flags & 4098) && (nearestMounted = node.return),
            (fiber = node.return);
        while (fiber);
      }
      return 3 === node.tag ? nearestMounted : null;
    }
    function getSuspenseInstanceFromFiber(fiber) {
      if (13 === fiber.tag) {
        var suspenseState = fiber.memoizedState;
        null === suspenseState &&
          ((fiber = fiber.alternate),
          null !== fiber && (suspenseState = fiber.memoizedState));
        if (null !== suspenseState) return suspenseState.dehydrated;
      }
      return null;
    }
    function assertIsMounted(fiber) {
      if (getNearestMountedFiber(fiber) !== fiber)
        throw Error("Unable to find node on an unmounted component.");
    }
    function findCurrentFiberUsingSlowPath(fiber) {
      var alternate = fiber.alternate;
      if (!alternate) {
        alternate = getNearestMountedFiber(fiber);
        if (null === alternate)
          throw Error("Unable to find node on an unmounted component.");
        return alternate !== fiber ? null : fiber;
      }
      for (var a = fiber, b = alternate; ; ) {
        var parentA = a.return;
        if (null === parentA) break;
        var parentB = parentA.alternate;
        if (null === parentB) {
          b = parentA.return;
          if (null !== b) {
            a = b;
            continue;
          }
          break;
        }
        if (parentA.child === parentB.child) {
          for (parentB = parentA.child; parentB; ) {
            if (parentB === a) return assertIsMounted(parentA), fiber;
            if (parentB === b) return assertIsMounted(parentA), alternate;
            parentB = parentB.sibling;
          }
          throw Error("Unable to find node on an unmounted component.");
        }
        if (a.return !== b.return) (a = parentA), (b = parentB);
        else {
          for (var didFindChild = !1, _child = parentA.child; _child; ) {
            if (_child === a) {
              didFindChild = !0;
              a = parentA;
              b = parentB;
              break;
            }
            if (_child === b) {
              didFindChild = !0;
              b = parentA;
              a = parentB;
              break;
            }
            _child = _child.sibling;
          }
          if (!didFindChild) {
            for (_child = parentB.child; _child; ) {
              if (_child === a) {
                didFindChild = !0;
                a = parentB;
                b = parentA;
                break;
              }
              if (_child === b) {
                didFindChild = !0;
                b = parentB;
                a = parentA;
                break;
              }
              _child = _child.sibling;
            }
            if (!didFindChild)
              throw Error(
                "Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue."
              );
          }
        }
        if (a.alternate !== b)
          throw Error(
            "Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue."
          );
      }
      if (3 !== a.tag)
        throw Error("Unable to find node on an unmounted component.");
      return a.stateNode.current === a ? fiber : alternate;
    }
    function findCurrentHostFiberImpl(node) {
      var tag = node.tag;
      if (5 === tag || 26 === tag || 27 === tag || 6 === tag) return node;
      for (node = node.child; null !== node; ) {
        tag = findCurrentHostFiberImpl(node);
        if (null !== tag) return tag;
        node = node.sibling;
      }
      return null;
    }
    function resolveDispatcher() {
      var dispatcher = ReactSharedInternals.H;
      null === dispatcher &&
        console.error(
          "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."
        );
      return dispatcher;
    }
    function createCursor(defaultValue) {
      return { current: defaultValue };
    }
    function pop(cursor, fiber) {
      0 > index$jscomp$0
        ? console.error("Unexpected pop.")
        : (fiber !== fiberStack[index$jscomp$0] &&
            console.error("Unexpected Fiber popped."),
          (cursor.current = valueStack[index$jscomp$0]),
          (valueStack[index$jscomp$0] = null),
          (fiberStack[index$jscomp$0] = null),
          index$jscomp$0--);
    }
    function push(cursor, value, fiber) {
      index$jscomp$0++;
      valueStack[index$jscomp$0] = cursor.current;
      fiberStack[index$jscomp$0] = fiber;
      cursor.current = value;
    }
    function requiredContext(c) {
      null === c &&
        console.error(
          "Expected host context to exist. This error is likely caused by a bug in React. Please file an issue."
        );
      return c;
    }
    function pushHostContainer(fiber, nextRootInstance) {
      push(rootInstanceStackCursor, nextRootInstance, fiber);
      push(contextFiberStackCursor, fiber, fiber);
      push(contextStackCursor, null, fiber);
      var nextRootContext = nextRootInstance.nodeType;
      switch (nextRootContext) {
        case 9:
        case 11:
          nextRootContext = 9 === nextRootContext ? "#document" : "#fragment";
          nextRootInstance = (nextRootInstance =
            nextRootInstance.documentElement)
            ? (nextRootInstance = nextRootInstance.namespaceURI)
              ? getOwnHostContext(nextRootInstance)
              : HostContextNamespaceNone
            : HostContextNamespaceNone;
          break;
        default:
          if (
            ((nextRootInstance =
              8 === nextRootContext
                ? nextRootInstance.parentNode
                : nextRootInstance),
            (nextRootContext = nextRootInstance.tagName),
            (nextRootInstance = nextRootInstance.namespaceURI))
          )
            (nextRootInstance = getOwnHostContext(nextRootInstance)),
              (nextRootInstance = getChildHostContextProd(
                nextRootInstance,
                nextRootContext
              ));
          else
            switch (nextRootContext) {
              case "svg":
                nextRootInstance = HostContextNamespaceSvg;
                break;
              case "math":
                nextRootInstance = HostContextNamespaceMath;
                break;
              default:
                nextRootInstance = HostContextNamespaceNone;
            }
      }
      nextRootContext = nextRootContext.toLowerCase();
      nextRootContext = updatedAncestorInfoDev(null, nextRootContext);
      nextRootContext = {
        context: nextRootInstance,
        ancestorInfo: nextRootContext
      };
      pop(contextStackCursor, fiber);
      push(contextStackCursor, nextRootContext, fiber);
    }
    function popHostContainer(fiber) {
      pop(contextStackCursor, fiber);
      pop(contextFiberStackCursor, fiber);
      pop(rootInstanceStackCursor, fiber);
    }
    function getHostContext() {
      return requiredContext(contextStackCursor.current);
    }
    function pushHostContext(fiber) {
      null !== fiber.memoizedState &&
        push(hostTransitionProviderCursor, fiber, fiber);
      var context = requiredContext(contextStackCursor.current);
      var type = fiber.type;
      var nextContext = getChildHostContextProd(context.context, type);
      type = updatedAncestorInfoDev(context.ancestorInfo, type);
      nextContext = { context: nextContext, ancestorInfo: type };
      context !== nextContext &&
        (push(contextFiberStackCursor, fiber, fiber),
        push(contextStackCursor, nextContext, fiber));
    }
    function popHostContext(fiber) {
      contextFiberStackCursor.current === fiber &&
        (pop(contextStackCursor, fiber), pop(contextFiberStackCursor, fiber));
      hostTransitionProviderCursor.current === fiber &&
        (pop(hostTransitionProviderCursor, fiber),
        (HostTransitionContext._currentValue = NotPendingTransition));
    }
    function typeName(value) {
      return (
        ("function" === typeof Symbol &&
          Symbol.toStringTag &&
          value[Symbol.toStringTag]) ||
        value.constructor.name ||
        "Object"
      );
    }
    function willCoercionThrow(value) {
      try {
        return testStringCoercion(value), !1;
      } catch (e) {
        return !0;
      }
    }
    function testStringCoercion(value) {
      return "" + value;
    }
    function checkAttributeStringCoercion(value, attributeName) {
      if (willCoercionThrow(value))
        return (
          console.error(
            "The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before using it here.",
            attributeName,
            typeName(value)
          ),
          testStringCoercion(value)
        );
    }
    function checkCSSPropertyStringCoercion(value, propName) {
      if (willCoercionThrow(value))
        return (
          console.error(
            "The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before using it here.",
            propName,
            typeName(value)
          ),
          testStringCoercion(value)
        );
    }
    function checkFormFieldValueStringCoercion(value) {
      if (willCoercionThrow(value))
        return (
          console.error(
            "Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before using it here.",
            typeName(value)
          ),
          testStringCoercion(value)
        );
    }
    function injectInternals(internals) {
      if ("undefined" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) return !1;
      var hook = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (hook.isDisabled) return !0;
      if (!hook.supportsFiber)
        return (
          console.error(
            "The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://react.dev/link/react-devtools"
          ),
          !0
        );
      try {
        (rendererID = hook.inject(internals)), (injectedHook = hook);
      } catch (err) {
        console.error("React instrumentation encountered an error: %s.", err);
      }
      return hook.checkDCE ? !0 : !1;
    }
    function onCommitRoot$1(root, eventPriority) {
      if (injectedHook && "function" === typeof injectedHook.onCommitFiberRoot)
        try {
          var didError = 128 === (root.current.flags & 128);
          switch (eventPriority) {
            case DiscreteEventPriority:
              var schedulerPriority = ImmediatePriority;
              break;
            case ContinuousEventPriority:
              schedulerPriority = UserBlockingPriority;
              break;
            case DefaultEventPriority:
              schedulerPriority = NormalPriority$1;
              break;
            case IdleEventPriority:
              schedulerPriority = IdlePriority;
              break;
            default:
              schedulerPriority = NormalPriority$1;
          }
          injectedHook.onCommitFiberRoot(
            rendererID,
            root,
            schedulerPriority,
            didError
          );
        } catch (err) {
          hasLoggedError ||
            ((hasLoggedError = !0),
            console.error(
              "React instrumentation encountered an error: %s",
              err
            ));
        }
    }
    function setIsStrictModeForDevtools(newIsStrictMode) {
      "function" === typeof log$1 &&
        unstable_setDisableYieldValue(newIsStrictMode);
      if (injectedHook && "function" === typeof injectedHook.setStrictMode)
        try {
          injectedHook.setStrictMode(rendererID, newIsStrictMode);
        } catch (err) {
          hasLoggedError ||
            ((hasLoggedError = !0),
            console.error(
              "React instrumentation encountered an error: %s",
              err
            ));
        }
    }
    function injectProfilingHooks(profilingHooks) {
      injectedProfilingHooks = profilingHooks;
    }
    function markCommitStopped() {
      null !== injectedProfilingHooks &&
        "function" === typeof injectedProfilingHooks.markCommitStopped &&
        injectedProfilingHooks.markCommitStopped();
    }
    function markComponentRenderStarted(fiber) {
      null !== injectedProfilingHooks &&
        "function" ===
          typeof injectedProfilingHooks.markComponentRenderStarted &&
        injectedProfilingHooks.markComponentRenderStarted(fiber);
    }
    function markComponentRenderStopped() {
      null !== injectedProfilingHooks &&
        "function" ===
          typeof injectedProfilingHooks.markComponentRenderStopped &&
        injectedProfilingHooks.markComponentRenderStopped();
    }
    function markRenderStarted(lanes) {
      null !== injectedProfilingHooks &&
        "function" === typeof injectedProfilingHooks.markRenderStarted &&
        injectedProfilingHooks.markRenderStarted(lanes);
    }
    function markRenderStopped() {
      null !== injectedProfilingHooks &&
        "function" === typeof injectedProfilingHooks.markRenderStopped &&
        injectedProfilingHooks.markRenderStopped();
    }
    function markStateUpdateScheduled(fiber, lane) {
      null !== injectedProfilingHooks &&
        "function" === typeof injectedProfilingHooks.markStateUpdateScheduled &&
        injectedProfilingHooks.markStateUpdateScheduled(fiber, lane);
    }
    function clz32Fallback(x) {
      x >>>= 0;
      return 0 === x ? 32 : (31 - ((log(x) / LN2) | 0)) | 0;
    }
    function getLabelForLane(lane) {
      if (lane & 1) return "SyncHydrationLane";
      if (lane & 2) return "Sync";
      if (lane & 4) return "InputContinuousHydration";
      if (lane & 8) return "InputContinuous";
      if (lane & 16) return "DefaultHydration";
      if (lane & 32) return "Default";
      if (lane & 64) return "TransitionHydration";
      if (lane & 4194176) return "Transition";
      if (lane & 62914560) return "Retry";
      if (lane & 67108864) return "SelectiveHydration";
      if (lane & 134217728) return "IdleHydration";
      if (lane & 268435456) return "Idle";
      if (lane & 536870912) return "Offscreen";
      if (lane & 1073741824) return "Deferred";
    }
    function getHighestPriorityLanes(lanes) {
      var pendingSyncLanes = lanes & 42;
      if (0 !== pendingSyncLanes) return pendingSyncLanes;
      switch (lanes & -lanes) {
        case 1:
          return 1;
        case 2:
          return 2;
        case 4:
          return 4;
        case 8:
          return 8;
        case 16:
          return 16;
        case 32:
          return 32;
        case 64:
          return 64;
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return lanes & 4194176;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return lanes & 62914560;
        case 67108864:
          return 67108864;
        case 134217728:
          return 134217728;
        case 268435456:
          return 268435456;
        case 536870912:
          return 536870912;
        case 1073741824:
          return 0;
        default:
          return (
            console.error(
              "Should have found matching lanes. This is a bug in React."
            ),
            lanes
          );
      }
    }
    function getNextLanes(root, wipLanes) {
      var pendingLanes = root.pendingLanes;
      if (0 === pendingLanes) return 0;
      var nextLanes = 0,
        suspendedLanes = root.suspendedLanes,
        pingedLanes = root.pingedLanes,
        warmLanes = root.warmLanes;
      root = 0 !== root.finishedLanes;
      var nonIdlePendingLanes = pendingLanes & 134217727;
      0 !== nonIdlePendingLanes
        ? ((pendingLanes = nonIdlePendingLanes & ~suspendedLanes),
          0 !== pendingLanes
            ? (nextLanes = getHighestPriorityLanes(pendingLanes))
            : ((pingedLanes &= nonIdlePendingLanes),
              0 !== pingedLanes
                ? (nextLanes = getHighestPriorityLanes(pingedLanes))
                : root ||
                  ((warmLanes = nonIdlePendingLanes & ~warmLanes),
                  0 !== warmLanes &&
                    (nextLanes = getHighestPriorityLanes(warmLanes)))))
        : ((nonIdlePendingLanes = pendingLanes & ~suspendedLanes),
          0 !== nonIdlePendingLanes
            ? (nextLanes = getHighestPriorityLanes(nonIdlePendingLanes))
            : 0 !== pingedLanes
              ? (nextLanes = getHighestPriorityLanes(pingedLanes))
              : root ||
                ((warmLanes = pendingLanes & ~warmLanes),
                0 !== warmLanes &&
                  (nextLanes = getHighestPriorityLanes(warmLanes))));
      return 0 === nextLanes
        ? 0
        : 0 !== wipLanes &&
            wipLanes !== nextLanes &&
            0 === (wipLanes & suspendedLanes) &&
            ((suspendedLanes = nextLanes & -nextLanes),
            (warmLanes = wipLanes & -wipLanes),
            suspendedLanes >= warmLanes ||
              (32 === suspendedLanes && 0 !== (warmLanes & 4194176)))
          ? wipLanes
          : nextLanes;
    }
    function checkIfRootIsPrerendering(root, renderLanes) {
      return (
        0 ===
        (root.pendingLanes &
          ~(root.suspendedLanes & ~root.pingedLanes) &
          renderLanes)
      );
    }
    function computeExpirationTime(lane, currentTime) {
      switch (lane) {
        case 1:
        case 2:
        case 4:
        case 8:
          return currentTime + 250;
        case 16:
        case 32:
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return currentTime + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return -1;
        case 67108864:
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
          return -1;
        default:
          return (
            console.error(
              "Should have found matching lanes. This is a bug in React."
            ),
            -1
          );
      }
    }
    function claimNextTransitionLane() {
      var lane = nextTransitionLane;
      nextTransitionLane <<= 1;
      0 === (nextTransitionLane & 4194176) && (nextTransitionLane = 128);
      return lane;
    }
    function claimNextRetryLane() {
      var lane = nextRetryLane;
      nextRetryLane <<= 1;
      0 === (nextRetryLane & 62914560) && (nextRetryLane = 4194304);
      return lane;
    }
    function createLaneMap(initial) {
      for (var laneMap = [], i = 0; 31 > i; i++) laneMap.push(initial);
      return laneMap;
    }
    function markRootUpdated$1(root, updateLane) {
      root.pendingLanes |= updateLane;
      268435456 !== updateLane &&
        ((root.suspendedLanes = 0),
        (root.pingedLanes = 0),
        (root.warmLanes = 0));
    }
    function markRootFinished(
      root,
      finishedLanes,
      remainingLanes,
      spawnedLane,
      updatedLanes,
      suspendedRetryLanes
    ) {
      var previouslyPendingLanes = root.pendingLanes;
      root.pendingLanes = remainingLanes;
      root.suspendedLanes = 0;
      root.pingedLanes = 0;
      root.warmLanes = 0;
      root.expiredLanes &= remainingLanes;
      root.entangledLanes &= remainingLanes;
      root.errorRecoveryDisabledLanes &= remainingLanes;
      root.shellSuspendCounter = 0;
      var entanglements = root.entanglements,
        expirationTimes = root.expirationTimes,
        hiddenUpdates = root.hiddenUpdates;
      for (
        remainingLanes = previouslyPendingLanes & ~remainingLanes;
        0 < remainingLanes;

      ) {
        var index = 31 - clz32(remainingLanes),
          lane = 1 << index;
        entanglements[index] = 0;
        expirationTimes[index] = -1;
        var hiddenUpdatesForLane = hiddenUpdates[index];
        if (null !== hiddenUpdatesForLane)
          for (
            hiddenUpdates[index] = null, index = 0;
            index < hiddenUpdatesForLane.length;
            index++
          ) {
            var update = hiddenUpdatesForLane[index];
            null !== update && (update.lane &= -536870913);
          }
        remainingLanes &= ~lane;
      }
      0 !== spawnedLane && markSpawnedDeferredLane(root, spawnedLane, 0);
      0 !== suspendedRetryLanes &&
        0 === updatedLanes &&
        0 !== root.tag &&
        (root.suspendedLanes |=
          suspendedRetryLanes & ~(previouslyPendingLanes & ~finishedLanes));
    }
    function markSpawnedDeferredLane(root, spawnedLane, entangledLanes) {
      root.pendingLanes |= spawnedLane;
      root.suspendedLanes &= ~spawnedLane;
      var spawnedLaneIndex = 31 - clz32(spawnedLane);
      root.entangledLanes |= spawnedLane;
      root.entanglements[spawnedLaneIndex] =
        root.entanglements[spawnedLaneIndex] |
        1073741824 |
        (entangledLanes & 4194218);
    }
    function markRootEntangled(root, entangledLanes) {
      var rootEntangledLanes = (root.entangledLanes |= entangledLanes);
      for (root = root.entanglements; rootEntangledLanes; ) {
        var index = 31 - clz32(rootEntangledLanes),
          lane = 1 << index;
        (lane & entangledLanes) | (root[index] & entangledLanes) &&
          (root[index] |= entangledLanes);
        rootEntangledLanes &= ~lane;
      }
    }
    function addFiberToLanesMap(root, fiber, lanes) {
      if (isDevToolsPresent)
        for (root = root.pendingUpdatersLaneMap; 0 < lanes; ) {
          var index = 31 - clz32(lanes),
            lane = 1 << index;
          root[index].add(fiber);
          lanes &= ~lane;
        }
    }
    function movePendingFibersToMemoized(root, lanes) {
      if (isDevToolsPresent)
        for (
          var pendingUpdatersLaneMap = root.pendingUpdatersLaneMap,
            memoizedUpdaters = root.memoizedUpdaters;
          0 < lanes;

        ) {
          var index = 31 - clz32(lanes);
          root = 1 << index;
          index = pendingUpdatersLaneMap[index];
          0 < index.size &&
            (index.forEach(function (fiber) {
              var alternate = fiber.alternate;
              (null !== alternate && memoizedUpdaters.has(alternate)) ||
                memoizedUpdaters.add(fiber);
            }),
            index.clear());
          lanes &= ~root;
        }
    }
    function lanesToEventPriority(lanes) {
      lanes &= -lanes;
      return 0 !== DiscreteEventPriority && DiscreteEventPriority < lanes
        ? 0 !== ContinuousEventPriority && ContinuousEventPriority < lanes
          ? 0 !== (lanes & 134217727)
            ? DefaultEventPriority
            : IdleEventPriority
          : ContinuousEventPriority
        : DiscreteEventPriority;
    }
    function resolveUpdatePriority() {
      var updatePriority = ReactDOMSharedInternals.p;
      if (0 !== updatePriority) return updatePriority;
      updatePriority = window.event;
      return void 0 === updatePriority
        ? DefaultEventPriority
        : getEventPriority(updatePriority.type);
    }
    function runWithPriority(priority, fn) {
      var previousPriority = ReactDOMSharedInternals.p;
      try {
        return (ReactDOMSharedInternals.p = priority), fn();
      } finally {
        ReactDOMSharedInternals.p = previousPriority;
      }
    }
    function detachDeletedInstance(node) {
      delete node[internalInstanceKey];
      delete node[internalPropsKey];
      delete node[internalEventHandlersKey];
      delete node[internalEventHandlerListenersKey];
      delete node[internalEventHandlesSetKey];
    }
    function getClosestInstanceFromNode(targetNode) {
      var targetInst = targetNode[internalInstanceKey];
      if (targetInst) return targetInst;
      for (var parentNode = targetNode.parentNode; parentNode; ) {
        if (
          (targetInst =
            parentNode[internalContainerInstanceKey] ||
            parentNode[internalInstanceKey])
        ) {
          parentNode = targetInst.alternate;
          if (
            null !== targetInst.child ||
            (null !== parentNode && null !== parentNode.child)
          )
            for (
              targetNode = getParentSuspenseInstance(targetNode);
              null !== targetNode;

            ) {
              if ((parentNode = targetNode[internalInstanceKey]))
                return parentNode;
              targetNode = getParentSuspenseInstance(targetNode);
            }
          return targetInst;
        }
        targetNode = parentNode;
        parentNode = targetNode.parentNode;
      }
      return null;
    }
    function getInstanceFromNode(node) {
      if (
        (node = node[internalInstanceKey] || node[internalContainerInstanceKey])
      ) {
        var tag = node.tag;
        if (
          5 === tag ||
          6 === tag ||
          13 === tag ||
          26 === tag ||
          27 === tag ||
          3 === tag
        )
          return node;
      }
      return null;
    }
    function getNodeFromInstance(inst) {
      var tag = inst.tag;
      if (5 === tag || 26 === tag || 27 === tag || 6 === tag)
        return inst.stateNode;
      throw Error("getNodeFromInstance: Invalid argument.");
    }
    function getResourcesFromRoot(root) {
      var resources = root[internalRootNodeResourcesKey];
      resources ||
        (resources = root[internalRootNodeResourcesKey] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() });
      return resources;
    }
    function markNodeAsHoistable(node) {
      node[internalHoistableMarker] = !0;
    }
    function registerTwoPhaseEvent(registrationName, dependencies) {
      registerDirectEvent(registrationName, dependencies);
      registerDirectEvent(registrationName + "Capture", dependencies);
    }
    function registerDirectEvent(registrationName, dependencies) {
      registrationNameDependencies[registrationName] &&
        console.error(
          "EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.",
          registrationName
        );
      registrationNameDependencies[registrationName] = dependencies;
      var lowerCasedName = registrationName.toLowerCase();
      possibleRegistrationNames[lowerCasedName] = registrationName;
      "onDoubleClick" === registrationName &&
        (possibleRegistrationNames.ondblclick = registrationName);
      for (
        registrationName = 0;
        registrationName < dependencies.length;
        registrationName++
      )
        allNativeEvents.add(dependencies[registrationName]);
    }
    function checkControlledValueProps(tagName, props) {
      hasReadOnlyValue[props.type] ||
        props.onChange ||
        props.onInput ||
        props.readOnly ||
        props.disabled ||
        null == props.value ||
        ("select" === tagName
          ? console.error(
              "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set `onChange`."
            )
          : console.error(
              "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."
            ));
      props.onChange ||
        props.readOnly ||
        props.disabled ||
        null == props.checked ||
        console.error(
          "You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`."
        );
    }
    function isAttributeNameSafe(attributeName) {
      if (hasOwnProperty.call(validatedAttributeNameCache, attributeName))
        return !0;
      if (hasOwnProperty.call(illegalAttributeNameCache, attributeName))
        return !1;
      if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName))
        return (validatedAttributeNameCache[attributeName] = !0);
      illegalAttributeNameCache[attributeName] = !0;
      console.error("Invalid attribute name: `%s`", attributeName);
      return !1;
    }
    function getValueForAttributeOnCustomComponent(node, name, expected) {
      if (isAttributeNameSafe(name)) {
        if (!node.hasAttribute(name)) {
          switch (typeof expected) {
            case "symbol":
            case "object":
              return expected;
            case "function":
              return expected;
            case "boolean":
              if (!1 === expected) return expected;
          }
          return void 0 === expected ? void 0 : null;
        }
        node = node.getAttribute(name);
        if ("" === node && !0 === expected) return !0;
        checkAttributeStringCoercion(expected, name);
        return node === "" + expected ? expected : node;
      }
    }
    function setValueForAttribute(node, name, value) {
      if (isAttributeNameSafe(name))
        if (null === value) node.removeAttribute(name);
        else {
          switch (typeof value) {
            case "undefined":
            case "function":
            case "symbol":
              node.removeAttribute(name);
              return;
            case "boolean":
              var prefix = name.toLowerCase().slice(0, 5);
              if ("data-" !== prefix && "aria-" !== prefix) {
                node.removeAttribute(name);
                return;
              }
          }
          checkAttributeStringCoercion(value, name);
          node.setAttribute(name, "" + value);
        }
    }
    function setValueForKnownAttribute(node, name, value) {
      if (null === value) node.removeAttribute(name);
      else {
        switch (typeof value) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            node.removeAttribute(name);
            return;
        }
        checkAttributeStringCoercion(value, name);
        node.setAttribute(name, "" + value);
      }
    }
    function setValueForNamespacedAttribute(node, namespace, name, value) {
      if (null === value) node.removeAttribute(name);
      else {
        switch (typeof value) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            node.removeAttribute(name);
            return;
        }
        checkAttributeStringCoercion(value, name);
        node.setAttributeNS(namespace, name, "" + value);
      }
    }
    function getToStringValue(value) {
      switch (typeof value) {
        case "bigint":
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return value;
        case "object":
          return checkFormFieldValueStringCoercion(value), value;
        default:
          return "";
      }
    }
    function isCheckable(elem) {
      var type = elem.type;
      return (
        (elem = elem.nodeName) &&
        "input" === elem.toLowerCase() &&
        ("checkbox" === type || "radio" === type)
      );
    }
    function trackValueOnNode(node) {
      var valueField = isCheckable(node) ? "checked" : "value",
        descriptor = Object.getOwnPropertyDescriptor(
          node.constructor.prototype,
          valueField
        );
      checkFormFieldValueStringCoercion(node[valueField]);
      var currentValue = "" + node[valueField];
      if (
        !node.hasOwnProperty(valueField) &&
        "undefined" !== typeof descriptor &&
        "function" === typeof descriptor.get &&
        "function" === typeof descriptor.set
      ) {
        var get = descriptor.get,
          set = descriptor.set;
        Object.defineProperty(node, valueField, {
          configurable: !0,
          get: function () {
            return get.call(this);
          },
          set: function (value) {
            checkFormFieldValueStringCoercion(value);
            currentValue = "" + value;
            set.call(this, value);
          }
        });
        Object.defineProperty(node, valueField, {
          enumerable: descriptor.enumerable
        });
        return {
          getValue: function () {
            return currentValue;
          },
          setValue: function (value) {
            checkFormFieldValueStringCoercion(value);
            currentValue = "" + value;
          },
          stopTracking: function () {
            node._valueTracker = null;
            delete node[valueField];
          }
        };
      }
    }
    function track(node) {
      node._valueTracker || (node._valueTracker = trackValueOnNode(node));
    }
    function updateValueIfChanged(node) {
      if (!node) return !1;
      var tracker = node._valueTracker;
      if (!tracker) return !0;
      var lastValue = tracker.getValue();
      var value = "";
      node &&
        (value = isCheckable(node)
          ? node.checked
            ? "true"
            : "false"
          : node.value);
      node = value;
      return node !== lastValue ? (tracker.setValue(node), !0) : !1;
    }
    function getActiveElement(doc) {
      doc = doc || ("undefined" !== typeof document ? document : void 0);
      if ("undefined" === typeof doc) return null;
      try {
        return doc.activeElement || doc.body;
      } catch (e) {
        return doc.body;
      }
    }
    function escapeSelectorAttributeValueInsideDoubleQuotes(value) {
      return value.replace(
        escapeSelectorAttributeValueInsideDoubleQuotesRegex,
        function (ch) {
          return "\\" + ch.charCodeAt(0).toString(16) + " ";
        }
      );
    }
    function validateInputProps(element, props) {
      void 0 === props.checked ||
        void 0 === props.defaultChecked ||
        didWarnCheckedDefaultChecked ||
        (console.error(
          "%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components",
          getCurrentFiberOwnerNameInDevOrNull() || "A component",
          props.type
        ),
        (didWarnCheckedDefaultChecked = !0));
      void 0 === props.value ||
        void 0 === props.defaultValue ||
        didWarnValueDefaultValue$1 ||
        (console.error(
          "%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components",
          getCurrentFiberOwnerNameInDevOrNull() || "A component",
          props.type
        ),
        (didWarnValueDefaultValue$1 = !0));
    }
    function updateInput(
      element,
      value,
      defaultValue,
      lastDefaultValue,
      checked,
      defaultChecked,
      type,
      name
    ) {
      element.name = "";
      null != type &&
      "function" !== typeof type &&
      "symbol" !== typeof type &&
      "boolean" !== typeof type
        ? (checkAttributeStringCoercion(type, "type"), (element.type = type))
        : element.removeAttribute("type");
      if (null != value)
        if ("number" === type) {
          if ((0 === value && "" === element.value) || element.value != value)
            element.value = "" + getToStringValue(value);
        } else
          element.value !== "" + getToStringValue(value) &&
            (element.value = "" + getToStringValue(value));
      else
        ("submit" !== type && "reset" !== type) ||
          element.removeAttribute("value");
      null != value
        ? setDefaultValue(element, type, getToStringValue(value))
        : null != defaultValue
          ? setDefaultValue(element, type, getToStringValue(defaultValue))
          : null != lastDefaultValue && element.removeAttribute("value");
      null == checked &&
        null != defaultChecked &&
        (element.defaultChecked = !!defaultChecked);
      null != checked &&
        (element.checked =
          checked &&
          "function" !== typeof checked &&
          "symbol" !== typeof checked);
      null != name &&
      "function" !== typeof name &&
      "symbol" !== typeof name &&
      "boolean" !== typeof name
        ? (checkAttributeStringCoercion(name, "name"),
          (element.name = "" + getToStringValue(name)))
        : element.removeAttribute("name");
    }
    function initInput(
      element,
      value,
      defaultValue,
      checked,
      defaultChecked,
      type,
      name,
      isHydrating
    ) {
      null != type &&
        "function" !== typeof type &&
        "symbol" !== typeof type &&
        "boolean" !== typeof type &&
        (checkAttributeStringCoercion(type, "type"), (element.type = type));
      if (null != value || null != defaultValue) {
        if (
          !(
            ("submit" !== type && "reset" !== type) ||
            (void 0 !== value && null !== value)
          )
        )
          return;
        defaultValue =
          null != defaultValue ? "" + getToStringValue(defaultValue) : "";
        value = null != value ? "" + getToStringValue(value) : defaultValue;
        isHydrating || value === element.value || (element.value = value);
        element.defaultValue = value;
      }
      checked = null != checked ? checked : defaultChecked;
      checked =
        "function" !== typeof checked &&
        "symbol" !== typeof checked &&
        !!checked;
      element.checked = isHydrating ? element.checked : !!checked;
      element.defaultChecked = !!checked;
      null != name &&
        "function" !== typeof name &&
        "symbol" !== typeof name &&
        "boolean" !== typeof name &&
        (checkAttributeStringCoercion(name, "name"), (element.name = name));
    }
    function setDefaultValue(node, type, value) {
      ("number" === type && getActiveElement(node.ownerDocument) === node) ||
        node.defaultValue === "" + value ||
        (node.defaultValue = "" + value);
    }
    function validateOptionProps(element, props) {
      null == props.value &&
        ("object" === typeof props.children && null !== props.children
          ? React.Children.forEach(props.children, function (child) {
              null == child ||
                "string" === typeof child ||
                "number" === typeof child ||
                "bigint" === typeof child ||
                didWarnInvalidChild ||
                ((didWarnInvalidChild = !0),
                console.error(
                  "Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>."
                ));
            })
          : null == props.dangerouslySetInnerHTML ||
            didWarnInvalidInnerHTML ||
            ((didWarnInvalidInnerHTML = !0),
            console.error(
              "Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected."
            )));
      null == props.selected ||
        didWarnSelectedSetOnOption ||
        (console.error(
          "Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."
        ),
        (didWarnSelectedSetOnOption = !0));
    }
    function getDeclarationErrorAddendum() {
      var ownerName = getCurrentFiberOwnerNameInDevOrNull();
      return ownerName
        ? "\n\nCheck the render method of `" + ownerName + "`."
        : "";
    }
    function updateOptions(node, multiple, propValue, setDefaultSelected) {
      node = node.options;
      if (multiple) {
        multiple = {};
        for (var i = 0; i < propValue.length; i++)
          multiple["$" + propValue[i]] = !0;
        for (propValue = 0; propValue < node.length; propValue++)
          (i = multiple.hasOwnProperty("$" + node[propValue].value)),
            node[propValue].selected !== i && (node[propValue].selected = i),
            i && setDefaultSelected && (node[propValue].defaultSelected = !0);
      } else {
        propValue = "" + getToStringValue(propValue);
        multiple = null;
        for (i = 0; i < node.length; i++) {
          if (node[i].value === propValue) {
            node[i].selected = !0;
            setDefaultSelected && (node[i].defaultSelected = !0);
            return;
          }
          null !== multiple || node[i].disabled || (multiple = node[i]);
        }
        null !== multiple && (multiple.selected = !0);
      }
    }
    function validateSelectProps(element, props) {
      for (element = 0; element < valuePropNames.length; element++) {
        var propName = valuePropNames[element];
        if (null != props[propName]) {
          var propNameIsArray = isArrayImpl(props[propName]);
          props.multiple && !propNameIsArray
            ? console.error(
                "The `%s` prop supplied to <select> must be an array if `multiple` is true.%s",
                propName,
                getDeclarationErrorAddendum()
              )
            : !props.multiple &&
              propNameIsArray &&
              console.error(
                "The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s",
                propName,
                getDeclarationErrorAddendum()
              );
        }
      }
      void 0 === props.value ||
        void 0 === props.defaultValue ||
        didWarnValueDefaultValue ||
        (console.error(
          "Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://react.dev/link/controlled-components"
        ),
        (didWarnValueDefaultValue = !0));
    }
    function validateTextareaProps(element, props) {
      void 0 === props.value ||
        void 0 === props.defaultValue ||
        didWarnValDefaultVal ||
        (console.error(
          "%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://react.dev/link/controlled-components",
          getCurrentFiberOwnerNameInDevOrNull() || "A component"
        ),
        (didWarnValDefaultVal = !0));
      null != props.children &&
        null == props.value &&
        console.error(
          "Use the `defaultValue` or `value` props instead of setting children on <textarea>."
        );
    }
    function updateTextarea(element, value, defaultValue) {
      if (
        null != value &&
        ((value = "" + getToStringValue(value)),
        value !== element.value && (element.value = value),
        null == defaultValue)
      ) {
        element.defaultValue !== value && (element.defaultValue = value);
        return;
      }
      element.defaultValue =
        null != defaultValue ? "" + getToStringValue(defaultValue) : "";
    }
    function initTextarea(element, value, defaultValue, children) {
      if (null == value) {
        if (null != children) {
          if (null != defaultValue)
            throw Error(
              "If you supply `defaultValue` on a <textarea>, do not pass children."
            );
          if (isArrayImpl(children)) {
            if (1 < children.length)
              throw Error("<textarea> can only have at most one child.");
            children = children[0];
          }
          defaultValue = children;
        }
        null == defaultValue && (defaultValue = "");
        value = defaultValue;
      }
      defaultValue = getToStringValue(value);
      element.defaultValue = defaultValue;
      children = element.textContent;
      children === defaultValue &&
        "" !== children &&
        null !== children &&
        (element.value = children);
    }
    function findNotableNode(node, indent) {
      return void 0 === node.serverProps &&
        0 === node.serverTail.length &&
        1 === node.children.length &&
        3 < node.distanceFromLeaf &&
        node.distanceFromLeaf > 15 - indent
        ? findNotableNode(node.children[0], indent)
        : node;
    }
    function indentation(indent) {
      return "  " + "  ".repeat(indent);
    }
    function added(indent) {
      return "+ " + "  ".repeat(indent);
    }
    function removed(indent) {
      return "- " + "  ".repeat(indent);
    }
    function describeFiberType(fiber) {
      switch (fiber.tag) {
        case 26:
        case 27:
        case 5:
          return fiber.type;
        case 16:
          return "Lazy";
        case 13:
          return "Suspense";
        case 19:
          return "SuspenseList";
        case 0:
        case 15:
          return (fiber = fiber.type), fiber.displayName || fiber.name || null;
        case 11:
          return (
            (fiber = fiber.type.render), fiber.displayName || fiber.name || null
          );
        case 1:
          return (fiber = fiber.type), fiber.displayName || fiber.name || null;
        default:
          return null;
      }
    }
    function describeTextNode(content, maxLength) {
      return needsEscaping.test(content)
        ? ((content = JSON.stringify(content)),
          content.length > maxLength - 2
            ? 8 > maxLength
              ? '{"..."}'
              : "{" + content.slice(0, maxLength - 7) + '..."}'
            : "{" + content + "}")
        : content.length > maxLength
          ? 5 > maxLength
            ? '{"..."}'
            : content.slice(0, maxLength - 3) + "..."
          : content;
    }
    function describeTextDiff(clientText, serverProps, indent) {
      var maxLength = 120 - 2 * indent;
      if (null === serverProps)
        return added(indent) + describeTextNode(clientText, maxLength) + "\n";
      if ("string" === typeof serverProps) {
        for (
          var firstDiff = 0;
          firstDiff < serverProps.length &&
          firstDiff < clientText.length &&
          serverProps.charCodeAt(firstDiff) ===
            clientText.charCodeAt(firstDiff);
          firstDiff++
        );
        firstDiff > maxLength - 8 &&
          10 < firstDiff &&
          ((clientText = "..." + clientText.slice(firstDiff - 8)),
          (serverProps = "..." + serverProps.slice(firstDiff - 8)));
        return (
          added(indent) +
          describeTextNode(clientText, maxLength) +
          "\n" +
          removed(indent) +
          describeTextNode(serverProps, maxLength) +
          "\n"
        );
      }
      return (
        indentation(indent) + describeTextNode(clientText, maxLength) + "\n"
      );
    }
    function objectName(object) {
      return Object.prototype.toString
        .call(object)
        .replace(/^\[object (.*)\]$/, function (m, p0) {
          return p0;
        });
    }
    function describeValue(value, maxLength) {
      switch (typeof value) {
        case "string":
          return (
            (value = JSON.stringify(value)),
            value.length > maxLength
              ? 5 > maxLength
                ? '"..."'
                : value.slice(0, maxLength - 4) + '..."'
              : value
          );
        case "object":
          if (null === value) return "null";
          if (isArrayImpl(value)) return "[...]";
          if (value.$$typeof === REACT_ELEMENT_TYPE)
            return (maxLength = getComponentNameFromType(value.type))
              ? "<" + maxLength + ">"
              : "<...>";
          var name = objectName(value);
          if ("Object" === name) {
            name = "";
            maxLength -= 2;
            for (var propName in value)
              if (value.hasOwnProperty(propName)) {
                var jsonPropName = JSON.stringify(propName);
                jsonPropName !== '"' + propName + '"' &&
                  (propName = jsonPropName);
                maxLength -= propName.length - 2;
                jsonPropName = describeValue(
                  value[propName],
                  15 > maxLength ? maxLength : 15
                );
                maxLength -= jsonPropName.length;
                if (0 > maxLength) {
                  name += "" === name ? "..." : ", ...";
                  break;
                }
                name +=
                  ("" === name ? "" : ",") + propName + ":" + jsonPropName;
              }
            return "{" + name + "}";
          }
          return name;
        case "function":
          return (maxLength = value.displayName || value.name)
            ? "function " + maxLength
            : "function";
        default:
          return String(value);
      }
    }
    function describePropValue(value, maxLength) {
      return "string" !== typeof value || needsEscaping.test(value)
        ? "{" + describeValue(value, maxLength - 2) + "}"
        : value.length > maxLength - 2
          ? 5 > maxLength
            ? '"..."'
            : '"' + value.slice(0, maxLength - 5) + '..."'
          : '"' + value + '"';
    }
    function describeExpandedElement(type, props, rowPrefix) {
      var remainingRowLength = 120 - rowPrefix.length - type.length,
        properties = [],
        propName;
      for (propName in props)
        if (props.hasOwnProperty(propName) && "children" !== propName) {
          var propValue = describePropValue(
            props[propName],
            120 - rowPrefix.length - propName.length - 1
          );
          remainingRowLength -= propName.length + propValue.length + 2;
          properties.push(propName + "=" + propValue);
        }
      return 0 === properties.length
        ? rowPrefix + "<" + type + ">\n"
        : 0 < remainingRowLength
          ? rowPrefix + "<" + type + " " + properties.join(" ") + ">\n"
          : rowPrefix +
            "<" +
            type +
            "\n" +
            rowPrefix +
            "  " +
            properties.join("\n" + rowPrefix + "  ") +
            "\n" +
            rowPrefix +
            ">\n";
    }
    function describePropertiesDiff(clientObject, serverObject, indent) {
      var properties = "",
        remainingServerProperties = assign({}, serverObject),
        propName;
      for (propName in clientObject)
        if (clientObject.hasOwnProperty(propName)) {
          delete remainingServerProperties[propName];
          var maxLength = 120 - 2 * indent - propName.length - 2,
            clientPropValue = describeValue(clientObject[propName], maxLength);
          serverObject.hasOwnProperty(propName)
            ? ((maxLength = describeValue(serverObject[propName], maxLength)),
              (properties +=
                added(indent) + propName + ": " + clientPropValue + "\n"),
              (properties +=
                removed(indent) + propName + ": " + maxLength + "\n"))
            : (properties +=
                added(indent) + propName + ": " + clientPropValue + "\n");
        }
      for (var _propName in remainingServerProperties)
        remainingServerProperties.hasOwnProperty(_propName) &&
          ((clientObject = describeValue(
            remainingServerProperties[_propName],
            120 - 2 * indent - _propName.length - 2
          )),
          (properties +=
            removed(indent) + _propName + ": " + clientObject + "\n"));
      return properties;
    }
    function describeElementDiff(type, clientProps, serverProps, indent) {
      var content = "",
        serverPropNames = new Map();
      for (propName$jscomp$0 in serverProps)
        serverProps.hasOwnProperty(propName$jscomp$0) &&
          serverPropNames.set(
            propName$jscomp$0.toLowerCase(),
            propName$jscomp$0
          );
      if (1 === serverPropNames.size && serverPropNames.has("children"))
        content += describeExpandedElement(
          type,
          clientProps,
          indentation(indent)
        );
      else {
        for (var _propName2 in clientProps)
          if (
            clientProps.hasOwnProperty(_propName2) &&
            "children" !== _propName2
          ) {
            var maxLength$jscomp$0 =
                120 - 2 * (indent + 1) - _propName2.length - 1,
              serverPropName = serverPropNames.get(_propName2.toLowerCase());
            if (void 0 !== serverPropName) {
              serverPropNames.delete(_propName2.toLowerCase());
              var propName$jscomp$0 = clientProps[_propName2];
              serverPropName = serverProps[serverPropName];
              var clientPropValue = describePropValue(
                propName$jscomp$0,
                maxLength$jscomp$0
              );
              maxLength$jscomp$0 = describePropValue(
                serverPropName,
                maxLength$jscomp$0
              );
              "object" === typeof propName$jscomp$0 &&
              null !== propName$jscomp$0 &&
              "object" === typeof serverPropName &&
              null !== serverPropName &&
              "Object" === objectName(propName$jscomp$0) &&
              "Object" === objectName(serverPropName) &&
              (2 < Object.keys(propName$jscomp$0).length ||
                2 < Object.keys(serverPropName).length ||
                -1 < clientPropValue.indexOf("...") ||
                -1 < maxLength$jscomp$0.indexOf("..."))
                ? (content +=
                    indentation(indent + 1) +
                    _propName2 +
                    "={{\n" +
                    describePropertiesDiff(
                      propName$jscomp$0,
                      serverPropName,
                      indent + 2
                    ) +
                    indentation(indent + 1) +
                    "}}\n")
                : ((content +=
                    added(indent + 1) +
                    _propName2 +
                    "=" +
                    clientPropValue +
                    "\n"),
                  (content +=
                    removed(indent + 1) +
                    _propName2 +
                    "=" +
                    maxLength$jscomp$0 +
                    "\n"));
            } else
              content +=
                indentation(indent + 1) +
                _propName2 +
                "=" +
                describePropValue(clientProps[_propName2], maxLength$jscomp$0) +
                "\n";
          }
        serverPropNames.forEach(function (propName) {
          if ("children" !== propName) {
            var maxLength = 120 - 2 * (indent + 1) - propName.length - 1;
            content +=
              removed(indent + 1) +
              propName +
              "=" +
              describePropValue(serverProps[propName], maxLength) +
              "\n";
          }
        });
        content =
          "" === content
            ? indentation(indent) + "<" + type + ">\n"
            : indentation(indent) +
              "<" +
              type +
              "\n" +
              content +
              indentation(indent) +
              ">\n";
      }
      type = serverProps.children;
      clientProps = clientProps.children;
      if (
        "string" === typeof type ||
        "number" === typeof type ||
        "bigint" === typeof type
      ) {
        serverPropNames = "";
        if (
          "string" === typeof clientProps ||
          "number" === typeof clientProps ||
          "bigint" === typeof clientProps
        )
          serverPropNames = "" + clientProps;
        content += describeTextDiff(serverPropNames, "" + type, indent + 1);
      } else if (
        "string" === typeof clientProps ||
        "number" === typeof clientProps ||
        "bigint" === typeof clientProps
      )
        content =
          null == type
            ? content + describeTextDiff("" + clientProps, null, indent + 1)
            : content + describeTextDiff("" + clientProps, void 0, indent + 1);
      return content;
    }
    function describeSiblingFiber(fiber, indent) {
      var type = describeFiberType(fiber);
      if (null === type) {
        type = "";
        for (fiber = fiber.child; fiber; )
          (type += describeSiblingFiber(fiber, indent)),
            (fiber = fiber.sibling);
        return type;
      }
      return indentation(indent) + "<" + type + ">\n";
    }
    function describeNode(node, indent) {
      var skipToNode = findNotableNode(node, indent);
      if (
        skipToNode !== node &&
        (1 !== node.children.length || node.children[0] !== skipToNode)
      )
        return (
          indentation(indent) + "...\n" + describeNode(skipToNode, indent + 1)
        );
      skipToNode = "";
      var debugInfo = node.fiber._debugInfo;
      if (debugInfo)
        for (var i = 0; i < debugInfo.length; i++) {
          var serverComponentName = debugInfo[i].name;
          "string" === typeof serverComponentName &&
            ((skipToNode +=
              indentation(indent) + "<" + serverComponentName + ">\n"),
            indent++);
        }
      debugInfo = "";
      i = node.fiber.pendingProps;
      if (6 === node.fiber.tag)
        (debugInfo = describeTextDiff(i, node.serverProps, indent)), indent++;
      else if (
        ((serverComponentName = describeFiberType(node.fiber)),
        null !== serverComponentName)
      )
        if (void 0 === node.serverProps) {
          debugInfo = indent;
          var maxLength = 120 - 2 * debugInfo - serverComponentName.length - 2,
            content = "";
          for (propName in i)
            if (i.hasOwnProperty(propName) && "children" !== propName) {
              var propValue = describePropValue(i[propName], 15);
              maxLength -= propName.length + propValue.length + 2;
              if (0 > maxLength) {
                content += " ...";
                break;
              }
              content += " " + propName + "=" + propValue;
            }
          debugInfo =
            indentation(debugInfo) +
            "<" +
            serverComponentName +
            content +
            ">\n";
          indent++;
        } else
          null === node.serverProps
            ? ((debugInfo = describeExpandedElement(
                serverComponentName,
                i,
                added(indent)
              )),
              indent++)
            : "string" === typeof node.serverProps
              ? console.error(
                  "Should not have matched a non HostText fiber to a Text node. This is a bug in React."
                )
              : ((debugInfo = describeElementDiff(
                  serverComponentName,
                  i,
                  node.serverProps,
                  indent
                )),
                indent++);
      var propName = "";
      i = node.fiber.child;
      for (
        serverComponentName = 0;
        i && serverComponentName < node.children.length;

      )
        (maxLength = node.children[serverComponentName]),
          maxLength.fiber === i
            ? ((propName += describeNode(maxLength, indent)),
              serverComponentName++)
            : (propName += describeSiblingFiber(i, indent)),
          (i = i.sibling);
      i &&
        0 < node.children.length &&
        (propName += indentation(indent) + "...\n");
      i = node.serverTail;
      null === node.serverProps && indent--;
      for (node = 0; node < i.length; node++)
        (serverComponentName = i[node]),
          (propName =
            "string" === typeof serverComponentName
              ? propName +
                (removed(indent) +
                  describeTextNode(serverComponentName, 120 - 2 * indent) +
                  "\n")
              : propName +
                describeExpandedElement(
                  serverComponentName.type,
                  serverComponentName.props,
                  removed(indent)
                ));
      return skipToNode + debugInfo + propName;
    }
    function describeDiff(rootNode) {
      try {
        return "\n\n" + describeNode(rootNode, 0);
      } catch (x) {
        return "";
      }
    }
    function describeAncestors(ancestor, child, props) {
      for (var fiber = child, node = null, distanceFromLeaf = 0; fiber; )
        fiber === ancestor && (distanceFromLeaf = 0),
          (node = {
            fiber: fiber,
            children: null !== node ? [node] : [],
            serverProps:
              fiber === child ? props : fiber === ancestor ? null : void 0,
            serverTail: [],
            distanceFromLeaf: distanceFromLeaf
          }),
          distanceFromLeaf++,
          (fiber = fiber.return);
      return null !== node ? describeDiff(node).replaceAll(/^[+-]/gm, ">") : "";
    }
    function updatedAncestorInfoDev(oldInfo, tag) {
      oldInfo = assign({}, oldInfo || emptyAncestorInfoDev);
      var info = { tag: tag };
      -1 !== inScopeTags.indexOf(tag) &&
        ((oldInfo.aTagInScope = null),
        (oldInfo.buttonTagInScope = null),
        (oldInfo.nobrTagInScope = null));
      -1 !== buttonScopeTags.indexOf(tag) && (oldInfo.pTagInButtonScope = null);
      -1 !== specialTags.indexOf(tag) &&
        "address" !== tag &&
        "div" !== tag &&
        "p" !== tag &&
        ((oldInfo.listItemTagAutoclosing = null),
        (oldInfo.dlItemTagAutoclosing = null));
      oldInfo.current = info;
      "form" === tag && (oldInfo.formTag = info);
      "a" === tag && (oldInfo.aTagInScope = info);
      "button" === tag && (oldInfo.buttonTagInScope = info);
      "nobr" === tag && (oldInfo.nobrTagInScope = info);
      "p" === tag && (oldInfo.pTagInButtonScope = info);
      "li" === tag && (oldInfo.listItemTagAutoclosing = info);
      if ("dd" === tag || "dt" === tag) oldInfo.dlItemTagAutoclosing = info;
      "#document" === tag || "html" === tag
        ? (oldInfo.containerTagInScope = null)
        : oldInfo.containerTagInScope || (oldInfo.containerTagInScope = info);
      return oldInfo;
    }
    function isTagValidWithParent(tag, parentTag) {
      switch (parentTag) {
        case "select":
          return (
            "hr" === tag ||
            "option" === tag ||
            "optgroup" === tag ||
            "#text" === tag
          );
        case "optgroup":
          return "option" === tag || "#text" === tag;
        case "option":
          return "#text" === tag;
        case "tr":
          return (
            "th" === tag ||
            "td" === tag ||
            "style" === tag ||
            "script" === tag ||
            "template" === tag
          );
        case "tbody":
        case "thead":
        case "tfoot":
          return (
            "tr" === tag ||
            "style" === tag ||
            "script" === tag ||
            "template" === tag
          );
        case "colgroup":
          return "col" === tag || "template" === tag;
        case "table":
          return (
            "caption" === tag ||
            "colgroup" === tag ||
            "tbody" === tag ||
            "tfoot" === tag ||
            "thead" === tag ||
            "style" === tag ||
            "script" === tag ||
            "template" === tag
          );
        case "head":
          return (
            "base" === tag ||
            "basefont" === tag ||
            "bgsound" === tag ||
            "link" === tag ||
            "meta" === tag ||
            "title" === tag ||
            "noscript" === tag ||
            "noframes" === tag ||
            "style" === tag ||
            "script" === tag ||
            "template" === tag
          );
        case "html":
          return "head" === tag || "body" === tag || "frameset" === tag;
        case "frameset":
          return "frame" === tag;
        case "#document":
          return "html" === tag;
      }
      switch (tag) {
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
          return (
            "h1" !== parentTag &&
            "h2" !== parentTag &&
            "h3" !== parentTag &&
            "h4" !== parentTag &&
            "h5" !== parentTag &&
            "h6" !== parentTag
          );
        case "rp":
        case "rt":
          return -1 === impliedEndTags.indexOf(parentTag);
        case "body":
        case "caption":
        case "col":
        case "colgroup":
        case "frameset":
        case "frame":
        case "head":
        case "html":
        case "tbody":
        case "td":
        case "tfoot":
        case "th":
        case "thead":
        case "tr":
          return null == parentTag;
      }
      return !0;
    }
    function findInvalidAncestorForTag(tag, ancestorInfo) {
      switch (tag) {
        case "address":
        case "article":
        case "aside":
        case "blockquote":
        case "center":
        case "details":
        case "dialog":
        case "dir":
        case "div":
        case "dl":
        case "fieldset":
        case "figcaption":
        case "figure":
        case "footer":
        case "header":
        case "hgroup":
        case "main":
        case "menu":
        case "nav":
        case "ol":
        case "p":
        case "section":
        case "summary":
        case "ul":
        case "pre":
        case "listing":
        case "table":
        case "hr":
        case "xmp":
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
          return ancestorInfo.pTagInButtonScope;
        case "form":
          return ancestorInfo.formTag || ancestorInfo.pTagInButtonScope;
        case "li":
          return ancestorInfo.listItemTagAutoclosing;
        case "dd":
        case "dt":
          return ancestorInfo.dlItemTagAutoclosing;
        case "button":
          return ancestorInfo.buttonTagInScope;
        case "a":
          return ancestorInfo.aTagInScope;
        case "nobr":
          return ancestorInfo.nobrTagInScope;
      }
      return null;
    }
    function findAncestor(parent, tagName) {
      for (; parent; ) {
        switch (parent.tag) {
          case 5:
          case 26:
          case 27:
            if (parent.type === tagName) return parent;
        }
        parent = parent.return;
      }
      return null;
    }
    function validateDOMNesting(childTag, ancestorInfo) {
      ancestorInfo = ancestorInfo || emptyAncestorInfoDev;
      var parentInfo = ancestorInfo.current;
      ancestorInfo = (parentInfo = isTagValidWithParent(
        childTag,
        parentInfo && parentInfo.tag
      )
        ? null
        : parentInfo)
        ? null
        : findInvalidAncestorForTag(childTag, ancestorInfo);
      ancestorInfo = parentInfo || ancestorInfo;
      if (!ancestorInfo) return !0;
      ancestorInfo = ancestorInfo.tag;
      var warnKey = String(!!parentInfo) + "|" + childTag + "|" + ancestorInfo;
      if (didWarn[warnKey]) return !1;
      didWarn[warnKey] = !0;
      var ancestor = (warnKey = current)
        ? findAncestor(warnKey.return, ancestorInfo)
        : null;
      warnKey =
        null !== warnKey && null !== ancestor
          ? describeAncestors(ancestor, warnKey, null)
          : "";
      ancestor = "<" + childTag + ">";
      parentInfo
        ? ((parentInfo = ""),
          "table" === ancestorInfo &&
            "tr" === childTag &&
            (parentInfo +=
              " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."),
          console.error(
            "In HTML, %s cannot be a child of <%s>.%s\nThis will cause a hydration error.%s",
            ancestor,
            ancestorInfo,
            parentInfo,
            warnKey
          ))
        : console.error(
            "In HTML, %s cannot be a descendant of <%s>.\nThis will cause a hydration error.%s",
            ancestor,
            ancestorInfo,
            warnKey
          );
      return !1;
    }
    function validateTextNesting(childText, parentTag) {
      if (isTagValidWithParent("#text", parentTag)) return !0;
      var warnKey = "#text|" + parentTag;
      if (didWarn[warnKey]) return !1;
      didWarn[warnKey] = !0;
      var ancestor = (warnKey = current)
        ? findAncestor(warnKey, parentTag)
        : null;
      warnKey =
        null !== warnKey && null !== ancestor
          ? describeAncestors(
              ancestor,
              warnKey,
              6 !== warnKey.tag ? { children: null } : null
            )
          : "";
      /\S/.test(childText)
        ? console.error(
            "In HTML, text nodes cannot be a child of <%s>.\nThis will cause a hydration error.%s",
            parentTag,
            warnKey
          )
        : console.error(
            "In HTML, whitespace text nodes cannot be a child of <%s>. Make sure you don't have any extra whitespace between tags on each line of your source code.\nThis will cause a hydration error.%s",
            parentTag,
            warnKey
          );
      return !1;
    }
    function setTextContent(node, text) {
      if (text) {
        var firstChild = node.firstChild;
        if (
          firstChild &&
          firstChild === node.lastChild &&
          3 === firstChild.nodeType
        ) {
          firstChild.nodeValue = text;
          return;
        }
      }
      node.textContent = text;
    }
    function camelize(string) {
      return string.replace(hyphenPattern, function (_, character) {
        return character.toUpperCase();
      });
    }
    function setValueForStyle(style, styleName, value) {
      var isCustomProperty = 0 === styleName.indexOf("--");
      isCustomProperty ||
        (-1 < styleName.indexOf("-")
          ? (warnedStyleNames.hasOwnProperty(styleName) &&
              warnedStyleNames[styleName]) ||
            ((warnedStyleNames[styleName] = !0),
            console.error(
              "Unsupported style property %s. Did you mean %s?",
              styleName,
              camelize(styleName.replace(msPattern, "ms-"))
            ))
          : badVendoredStyleNamePattern.test(styleName)
            ? (warnedStyleNames.hasOwnProperty(styleName) &&
                warnedStyleNames[styleName]) ||
              ((warnedStyleNames[styleName] = !0),
              console.error(
                "Unsupported vendor-prefixed style property %s. Did you mean %s?",
                styleName,
                styleName.charAt(0).toUpperCase() + styleName.slice(1)
              ))
            : !badStyleValueWithSemicolonPattern.test(value) ||
              (warnedStyleValues.hasOwnProperty(value) &&
                warnedStyleValues[value]) ||
              ((warnedStyleValues[value] = !0),
              console.error(
                'Style property values shouldn\'t contain a semicolon. Try "%s: %s" instead.',
                styleName,
                value.replace(badStyleValueWithSemicolonPattern, "")
              )),
        "number" === typeof value &&
          (isNaN(value)
            ? warnedForNaNValue ||
              ((warnedForNaNValue = !0),
              console.error(
                "`NaN` is an invalid value for the `%s` css style property.",
                styleName
              ))
            : isFinite(value) ||
              warnedForInfinityValue ||
              ((warnedForInfinityValue = !0),
              console.error(
                "`Infinity` is an invalid value for the `%s` css style property.",
                styleName
              ))));
      null == value || "boolean" === typeof value || "" === value
        ? isCustomProperty
          ? style.setProperty(styleName, "")
          : "float" === styleName
            ? (style.cssFloat = "")
            : (style[styleName] = "")
        : isCustomProperty
          ? style.setProperty(styleName, value)
          : "number" !== typeof value ||
              0 === value ||
              unitlessNumbers.has(styleName)
            ? "float" === styleName
              ? (style.cssFloat = value)
              : (checkCSSPropertyStringCoercion(value, styleName),
                (style[styleName] = ("" + value).trim()))
            : (style[styleName] = value + "px");
    }
    function setValueForStyles(node, styles, prevStyles) {
      if (null != styles && "object" !== typeof styles)
        throw Error(
          "The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX."
        );
      styles && Object.freeze(styles);
      node = node.style;
      if (null != prevStyles) {
        if (styles) {
          var expandedUpdates = {};
          if (prevStyles)
            for (var key in prevStyles)
              if (prevStyles.hasOwnProperty(key) && !styles.hasOwnProperty(key))
                for (
                  var longhands = shorthandToLonghand[key] || [key], i = 0;
                  i < longhands.length;
                  i++
                )
                  expandedUpdates[longhands[i]] = key;
          for (var _key in styles)
            if (
              styles.hasOwnProperty(_key) &&
              (!prevStyles || prevStyles[_key] !== styles[_key])
            )
              for (
                key = shorthandToLonghand[_key] || [_key], longhands = 0;
                longhands < key.length;
                longhands++
              )
                expandedUpdates[key[longhands]] = _key;
          _key = {};
          for (var key$jscomp$0 in styles)
            for (
              key = shorthandToLonghand[key$jscomp$0] || [key$jscomp$0],
                longhands = 0;
              longhands < key.length;
              longhands++
            )
              _key[key[longhands]] = key$jscomp$0;
          key$jscomp$0 = {};
          for (var _key2 in expandedUpdates)
            if (
              ((key = expandedUpdates[_key2]),
              (longhands = _key[_key2]) &&
                key !== longhands &&
                ((i = key + "," + longhands), !key$jscomp$0[i]))
            ) {
              key$jscomp$0[i] = !0;
              i = console;
              var value = styles[key];
              i.error.call(
                i,
                "%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.",
                null == value || "boolean" === typeof value || "" === value
                  ? "Removing"
                  : "Updating",
                key,
                longhands
              );
            }
        }
        for (var styleName in prevStyles)
          !prevStyles.hasOwnProperty(styleName) ||
            (null != styles && styles.hasOwnProperty(styleName)) ||
            (0 === styleName.indexOf("--")
              ? node.setProperty(styleName, "")
              : "float" === styleName
                ? (node.cssFloat = "")
                : (node[styleName] = ""));
        for (var _styleName in styles)
          (_key2 = styles[_styleName]),
            styles.hasOwnProperty(_styleName) &&
              prevStyles[_styleName] !== _key2 &&
              setValueForStyle(node, _styleName, _key2);
      } else
        for (expandedUpdates in styles)
          styles.hasOwnProperty(expandedUpdates) &&
            setValueForStyle(node, expandedUpdates, styles[expandedUpdates]);
    }
    function isCustomElement(tagName) {
      if (-1 === tagName.indexOf("-")) return !1;
      switch (tagName) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return !1;
        default:
          return !0;
      }
    }
    function getAttributeAlias(name) {
      return aliases.get(name) || name;
    }
    function validateProperty$1(tagName, name) {
      if (
        hasOwnProperty.call(warnedProperties$1, name) &&
        warnedProperties$1[name]
      )
        return !0;
      if (rARIACamel$1.test(name)) {
        tagName = "aria-" + name.slice(4).toLowerCase();
        tagName = ariaProperties.hasOwnProperty(tagName) ? tagName : null;
        if (null == tagName)
          return (
            console.error(
              "Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.",
              name
            ),
            (warnedProperties$1[name] = !0)
          );
        if (name !== tagName)
          return (
            console.error(
              "Invalid ARIA attribute `%s`. Did you mean `%s`?",
              name,
              tagName
            ),
            (warnedProperties$1[name] = !0)
          );
      }
      if (rARIA$1.test(name)) {
        tagName = name.toLowerCase();
        tagName = ariaProperties.hasOwnProperty(tagName) ? tagName : null;
        if (null == tagName) return (warnedProperties$1[name] = !0), !1;
        name !== tagName &&
          (console.error(
            "Unknown ARIA attribute `%s`. Did you mean `%s`?",
            name,
            tagName
          ),
          (warnedProperties$1[name] = !0));
      }
      return !0;
    }
    function validateProperties$2(type, props) {
      var invalidProps = [],
        key;
      for (key in props)
        validateProperty$1(type, key) || invalidProps.push(key);
      props = invalidProps
        .map(function (prop) {
          return "`" + prop + "`";
        })
        .join(", ");
      1 === invalidProps.length
        ? console.error(
            "Invalid aria prop %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props",
            props,
            type
          )
        : 1 < invalidProps.length &&
          console.error(
            "Invalid aria props %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props",
            props,
            type
          );
    }
    function validateProperty(tagName, name, value, eventRegistry) {
      if (hasOwnProperty.call(warnedProperties, name) && warnedProperties[name])
        return !0;
      var lowerCasedName = name.toLowerCase();
      if ("onfocusin" === lowerCasedName || "onfocusout" === lowerCasedName)
        return (
          console.error(
            "React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."
          ),
          (warnedProperties[name] = !0)
        );
      if (
        "function" === typeof value &&
        (("form" === tagName && "action" === name) ||
          ("input" === tagName && "formAction" === name) ||
          ("button" === tagName && "formAction" === name))
      )
        return !0;
      if (null != eventRegistry) {
        tagName = eventRegistry.possibleRegistrationNames;
        if (eventRegistry.registrationNameDependencies.hasOwnProperty(name))
          return !0;
        eventRegistry = tagName.hasOwnProperty(lowerCasedName)
          ? tagName[lowerCasedName]
          : null;
        if (null != eventRegistry)
          return (
            console.error(
              "Invalid event handler property `%s`. Did you mean `%s`?",
              name,
              eventRegistry
            ),
            (warnedProperties[name] = !0)
          );
        if (EVENT_NAME_REGEX.test(name))
          return (
            console.error(
              "Unknown event handler property `%s`. It will be ignored.",
              name
            ),
            (warnedProperties[name] = !0)
          );
      } else if (EVENT_NAME_REGEX.test(name))
        return (
          INVALID_EVENT_NAME_REGEX.test(name) &&
            console.error(
              "Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.",
              name
            ),
          (warnedProperties[name] = !0)
        );
      if (rARIA.test(name) || rARIACamel.test(name)) return !0;
      if ("innerhtml" === lowerCasedName)
        return (
          console.error(
            "Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."
          ),
          (warnedProperties[name] = !0)
        );
      if ("aria" === lowerCasedName)
        return (
          console.error(
            "The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."
          ),
          (warnedProperties[name] = !0)
        );
      if (
        "is" === lowerCasedName &&
        null !== value &&
        void 0 !== value &&
        "string" !== typeof value
      )
        return (
          console.error(
            "Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.",
            typeof value
          ),
          (warnedProperties[name] = !0)
        );
      if ("number" === typeof value && isNaN(value))
        return (
          console.error(
            "Received NaN for the `%s` attribute. If this is expected, cast the value to a string.",
            name
          ),
          (warnedProperties[name] = !0)
        );
      if (possibleStandardNames.hasOwnProperty(lowerCasedName)) {
        if (
          ((lowerCasedName = possibleStandardNames[lowerCasedName]),
          lowerCasedName !== name)
        )
          return (
            console.error(
              "Invalid DOM property `%s`. Did you mean `%s`?",
              name,
              lowerCasedName
            ),
            (warnedProperties[name] = !0)
          );
      } else if (name !== lowerCasedName)
        return (
          console.error(
            "React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.",
            name,
            lowerCasedName
          ),
          (warnedProperties[name] = !0)
        );
      switch (name) {
        case "dangerouslySetInnerHTML":
        case "children":
        case "style":
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "ref":
          return !0;
        case "innerText":
        case "textContent":
          return !0;
      }
      switch (typeof value) {
        case "boolean":
          switch (name) {
            case "autoFocus":
            case "checked":
            case "multiple":
            case "muted":
            case "selected":
            case "contentEditable":
            case "spellCheck":
            case "draggable":
            case "value":
            case "autoReverse":
            case "externalResourcesRequired":
            case "focusable":
            case "preserveAlpha":
            case "allowFullScreen":
            case "async":
            case "autoPlay":
            case "controls":
            case "default":
            case "defer":
            case "disabled":
            case "disablePictureInPicture":
            case "disableRemotePlayback":
            case "formNoValidate":
            case "hidden":
            case "loop":
            case "noModule":
            case "noValidate":
            case "open":
            case "playsInline":
            case "readOnly":
            case "required":
            case "reversed":
            case "scoped":
            case "seamless":
            case "itemScope":
            case "capture":
            case "download":
            case "inert":
              return !0;
            default:
              lowerCasedName = name.toLowerCase().slice(0, 5);
              if ("data-" === lowerCasedName || "aria-" === lowerCasedName)
                return !0;
              value
                ? console.error(
                    'Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.',
                    value,
                    name,
                    name,
                    value,
                    name
                  )
                : console.error(
                    'Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.',
                    value,
                    name,
                    name,
                    value,
                    name,
                    name,
                    name
                  );
              return (warnedProperties[name] = !0);
          }
        case "function":
        case "symbol":
          return (warnedProperties[name] = !0), !1;
        case "string":
          if ("false" === value || "true" === value) {
            switch (name) {
              case "checked":
              case "selected":
              case "multiple":
              case "muted":
              case "allowFullScreen":
              case "async":
              case "autoPlay":
              case "controls":
              case "default":
              case "defer":
              case "disabled":
              case "disablePictureInPicture":
              case "disableRemotePlayback":
              case "formNoValidate":
              case "hidden":
              case "loop":
              case "noModule":
              case "noValidate":
              case "open":
              case "playsInline":
              case "readOnly":
              case "required":
              case "reversed":
              case "scoped":
              case "seamless":
              case "itemScope":
              case "inert":
                break;
              default:
                return !0;
            }
            console.error(
              "Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?",
              value,
              name,
              "false" === value
                ? "The browser will interpret it as a truthy value."
                : 'Although this works, it will not work as expected if you pass the string "false".',
              name,
              value
            );
            warnedProperties[name] = !0;
          }
      }
      return !0;
    }
    function warnUnknownProperties(type, props, eventRegistry) {
      var unknownProps = [],
        key;
      for (key in props)
        validateProperty(type, key, props[key], eventRegistry) ||
          unknownProps.push(key);
      props = unknownProps
        .map(function (prop) {
          return "`" + prop + "`";
        })
        .join(", ");
      1 === unknownProps.length
        ? console.error(
            "Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://react.dev/link/attribute-behavior ",
            props,
            type
          )
        : 1 < unknownProps.length &&
          console.error(
            "Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://react.dev/link/attribute-behavior ",
            props,
            type
          );
    }
    function sanitizeURL(url) {
      return isJavaScriptProtocol.test("" + url)
        ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
        : url;
    }
    function getEventTarget(nativeEvent) {
      nativeEvent = nativeEvent.target || nativeEvent.srcElement || window;
      nativeEvent.correspondingUseElement &&
        (nativeEvent = nativeEvent.correspondingUseElement);
      return 3 === nativeEvent.nodeType ? nativeEvent.parentNode : nativeEvent;
    }
    function restoreStateOfTarget(target) {
      var internalInstance = getInstanceFromNode(target);
      if (internalInstance && (target = internalInstance.stateNode)) {
        var props = target[internalPropsKey] || null;
        a: switch (
          ((target = internalInstance.stateNode), internalInstance.type)
        ) {
          case "input":
            updateInput(
              target,
              props.value,
              props.defaultValue,
              props.defaultValue,
              props.checked,
              props.defaultChecked,
              props.type,
              props.name
            );
            internalInstance = props.name;
            if ("radio" === props.type && null != internalInstance) {
              for (props = target; props.parentNode; ) props = props.parentNode;
              checkAttributeStringCoercion(internalInstance, "name");
              props = props.querySelectorAll(
                'input[name="' +
                  escapeSelectorAttributeValueInsideDoubleQuotes(
                    "" + internalInstance
                  ) +
                  '"][type="radio"]'
              );
              for (
                internalInstance = 0;
                internalInstance < props.length;
                internalInstance++
              ) {
                var otherNode = props[internalInstance];
                if (otherNode !== target && otherNode.form === target.form) {
                  var otherProps = otherNode[internalPropsKey] || null;
                  if (!otherProps)
                    throw Error(
                      "ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported."
                    );
                  updateInput(
                    otherNode,
                    otherProps.value,
                    otherProps.defaultValue,
                    otherProps.defaultValue,
                    otherProps.checked,
                    otherProps.defaultChecked,
                    otherProps.type,
                    otherProps.name
                  );
                }
              }
              for (
                internalInstance = 0;
                internalInstance < props.length;
                internalInstance++
              )
                (otherNode = props[internalInstance]),
                  otherNode.form === target.form &&
                    updateValueIfChanged(otherNode);
            }
            break a;
          case "textarea":
            updateTextarea(target, props.value, props.defaultValue);
            break a;
          case "select":
            (internalInstance = props.value),
              null != internalInstance &&
                updateOptions(target, !!props.multiple, internalInstance, !1);
        }
      }
    }
    function batchedUpdates$2(fn, a, b) {
      if (isInsideEventHandler) return fn(a, b);
      isInsideEventHandler = !0;
      try {
        var JSCompiler_inline_result = fn(a);
        return JSCompiler_inline_result;
      } finally {
        if (
          ((isInsideEventHandler = !1),
          null !== restoreTarget || null !== restoreQueue)
        )
          if (
            (flushSyncWork$1(),
            restoreTarget &&
              ((a = restoreTarget),
              (fn = restoreQueue),
              (restoreQueue = restoreTarget = null),
              restoreStateOfTarget(a),
              fn))
          )
            for (a = 0; a < fn.length; a++) restoreStateOfTarget(fn[a]);
      }
    }
    function getListener(inst, registrationName) {
      var stateNode = inst.stateNode;
      if (null === stateNode) return null;
      var props = stateNode[internalPropsKey] || null;
      if (null === props) return null;
      stateNode = props[registrationName];
      a: switch (registrationName) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          (props = !props.disabled) ||
            ((inst = inst.type),
            (props = !(
              "button" === inst ||
              "input" === inst ||
              "select" === inst ||
              "textarea" === inst
            )));
          inst = !props;
          break a;
        default:
          inst = !1;
      }
      if (inst) return null;
      if (stateNode && "function" !== typeof stateNode)
        throw Error(
          "Expected `" +
            registrationName +
            "` listener to be a function, instead got a value of `" +
            typeof stateNode +
            "` type."
        );
      return stateNode;
    }
    function getData() {
      if (fallbackText) return fallbackText;
      var start,
        startValue = startText,
        startLength = startValue.length,
        end,
        endValue = "value" in root ? root.value : root.textContent,
        endLength = endValue.length;
      for (
        start = 0;
        start < startLength && startValue[start] === endValue[start];
        start++
      );
      var minEnd = startLength - start;
      for (
        end = 1;
        end <= minEnd &&
        startValue[startLength - end] === endValue[endLength - end];
        end++
      );
      return (fallbackText = endValue.slice(start, 1 < end ? 1 - end : void 0));
    }
    function getEventCharCode(nativeEvent) {
      var keyCode = nativeEvent.keyCode;
      "charCode" in nativeEvent
        ? ((nativeEvent = nativeEvent.charCode),
          0 === nativeEvent && 13 === keyCode && (nativeEvent = 13))
        : (nativeEvent = keyCode);
      10 === nativeEvent && (nativeEvent = 13);
      return 32 <= nativeEvent || 13 === nativeEvent ? nativeEvent : 0;
    }
    function functionThatReturnsTrue() {
      return !0;
    }
    function functionThatReturnsFalse() {
      return !1;
    }
    function createSyntheticEvent(Interface) {
      function SyntheticBaseEvent(
        reactName,
        reactEventType,
        targetInst,
        nativeEvent,
        nativeEventTarget
      ) {
        this._reactName = reactName;
        this._targetInst = targetInst;
        this.type = reactEventType;
        this.nativeEvent = nativeEvent;
        this.target = nativeEventTarget;
        this.currentTarget = null;
        for (var propName in Interface)
          Interface.hasOwnProperty(propName) &&
            ((reactName = Interface[propName]),
            (this[propName] = reactName
              ? reactName(nativeEvent)
              : nativeEvent[propName]));
        this.isDefaultPrevented = (
          null != nativeEvent.defaultPrevented
            ? nativeEvent.defaultPrevented
            : !1 === nativeEvent.returnValue
        )
          ? functionThatReturnsTrue
          : functionThatReturnsFalse;
        this.isPropagationStopped = functionThatReturnsFalse;
        return this;
      }
      assign(SyntheticBaseEvent.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var event = this.nativeEvent;
          event &&
            (event.preventDefault
              ? event.preventDefault()
              : "unknown" !== typeof event.returnValue &&
                (event.returnValue = !1),
            (this.isDefaultPrevented = functionThatReturnsTrue));
        },
        stopPropagation: function () {
          var event = this.nativeEvent;
          event &&
            (event.stopPropagation
              ? event.stopPropagation()
              : "unknown" !== typeof event.cancelBubble &&
                (event.cancelBubble = !0),
            (this.isPropagationStopped = functionThatReturnsTrue));
        },
        persist: function () {},
        isPersistent: functionThatReturnsTrue
      });
      return SyntheticBaseEvent;
    }
    function modifierStateGetter(keyArg) {
      var nativeEvent = this.nativeEvent;
      return nativeEvent.getModifierState
        ? nativeEvent.getModifierState(keyArg)
        : (keyArg = modifierKeyToProp[keyArg])
          ? !!nativeEvent[keyArg]
          : !1;
    }
    function getEventModifierState() {
      return modifierStateGetter;
    }
    function isFallbackCompositionEnd(domEventName, nativeEvent) {
      switch (domEventName) {
        case "keyup":
          return -1 !== END_KEYCODES.indexOf(nativeEvent.keyCode);
        case "keydown":
          return nativeEvent.keyCode !== START_KEYCODE;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function getDataFromCustomEvent(nativeEvent) {
      nativeEvent = nativeEvent.detail;
      return "object" === typeof nativeEvent && "data" in nativeEvent
        ? nativeEvent.data
        : null;
    }
    function getNativeBeforeInputChars(domEventName, nativeEvent) {
      switch (domEventName) {
        case "compositionend":
          return getDataFromCustomEvent(nativeEvent);
        case "keypress":
          if (nativeEvent.which !== SPACEBAR_CODE) return null;
          hasSpaceKeypress = !0;
          return SPACEBAR_CHAR;
        case "textInput":
          return (
            (domEventName = nativeEvent.data),
            domEventName === SPACEBAR_CHAR && hasSpaceKeypress
              ? null
              : domEventName
          );
        default:
          return null;
      }
    }
    function getFallbackBeforeInputChars(domEventName, nativeEvent) {
      if (isComposing)
        return "compositionend" === domEventName ||
          (!canUseCompositionEvent &&
            isFallbackCompositionEnd(domEventName, nativeEvent))
          ? ((domEventName = getData()),
            (fallbackText = startText = root = null),
            (isComposing = !1),
            domEventName)
          : null;
      switch (domEventName) {
        case "paste":
          return null;
        case "keypress":
          if (
            !(
              nativeEvent.ctrlKey ||
              nativeEvent.altKey ||
              nativeEvent.metaKey
            ) ||
            (nativeEvent.ctrlKey && nativeEvent.altKey)
          ) {
            if (nativeEvent.char && 1 < nativeEvent.char.length)
              return nativeEvent.char;
            if (nativeEvent.which)
              return String.fromCharCode(nativeEvent.which);
          }
          return null;
        case "compositionend":
          return useFallbackCompositionData && "ko" !== nativeEvent.locale
            ? null
            : nativeEvent.data;
        default:
          return null;
      }
    }
    function isTextInputElement(elem) {
      var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
      return "input" === nodeName
        ? !!supportedInputTypes[elem.type]
        : "textarea" === nodeName
          ? !0
          : !1;
    }
    function isEventSupported(eventNameSuffix) {
      if (!canUseDOM) return !1;
      eventNameSuffix = "on" + eventNameSuffix;
      var isSupported = eventNameSuffix in document;
      isSupported ||
        ((isSupported = document.createElement("div")),
        isSupported.setAttribute(eventNameSuffix, "return;"),
        (isSupported = "function" === typeof isSupported[eventNameSuffix]));
      return isSupported;
    }
    function createAndAccumulateChangeEvent(
      dispatchQueue,
      inst,
      nativeEvent,
      target
    ) {
      restoreTarget
        ? restoreQueue
          ? restoreQueue.push(target)
          : (restoreQueue = [target])
        : (restoreTarget = target);
      inst = accumulateTwoPhaseListeners(inst, "onChange");
      0 < inst.length &&
        ((nativeEvent = new SyntheticEvent(
          "onChange",
          "change",
          null,
          nativeEvent,
          target
        )),
        dispatchQueue.push({ event: nativeEvent, listeners: inst }));
    }
    function runEventInBatch(dispatchQueue) {
      processDispatchQueue(dispatchQueue, 0);
    }
    function getInstIfValueChanged(targetInst) {
      var targetNode = getNodeFromInstance(targetInst);
      if (updateValueIfChanged(targetNode)) return targetInst;
    }
    function getTargetInstForChangeEvent(domEventName, targetInst) {
      if ("change" === domEventName) return targetInst;
    }
    function stopWatchingForValueChange() {
      activeElement$1 &&
        (activeElement$1.detachEvent("onpropertychange", handlePropertyChange),
        (activeElementInst$1 = activeElement$1 = null));
    }
    function handlePropertyChange(nativeEvent) {
      if (
        "value" === nativeEvent.propertyName &&
        getInstIfValueChanged(activeElementInst$1)
      ) {
        var dispatchQueue = [];
        createAndAccumulateChangeEvent(
          dispatchQueue,
          activeElementInst$1,
          nativeEvent,
          getEventTarget(nativeEvent)
        );
        batchedUpdates$2(runEventInBatch, dispatchQueue);
      }
    }
    function handleEventsForInputEventPolyfill(
      domEventName,
      target,
      targetInst
    ) {
      "focusin" === domEventName
        ? (stopWatchingForValueChange(),
          (activeElement$1 = target),
          (activeElementInst$1 = targetInst),
          activeElement$1.attachEvent("onpropertychange", handlePropertyChange))
        : "focusout" === domEventName && stopWatchingForValueChange();
    }
    function getTargetInstForInputEventPolyfill(domEventName) {
      if (
        "selectionchange" === domEventName ||
        "keyup" === domEventName ||
        "keydown" === domEventName
      )
        return getInstIfValueChanged(activeElementInst$1);
    }
    function getTargetInstForClickEvent(domEventName, targetInst) {
      if ("click" === domEventName) return getInstIfValueChanged(targetInst);
    }
    function getTargetInstForInputOrChangeEvent(domEventName, targetInst) {
      if ("input" === domEventName || "change" === domEventName)
        return getInstIfValueChanged(targetInst);
    }
    function is(x, y) {
      return (x === y && (0 !== x || 1 / x === 1 / y)) || (x !== x && y !== y);
    }
    function shallowEqual(objA, objB) {
      if (objectIs(objA, objB)) return !0;
      if (
        "object" !== typeof objA ||
        null === objA ||
        "object" !== typeof objB ||
        null === objB
      )
        return !1;
      var keysA = Object.keys(objA),
        keysB = Object.keys(objB);
      if (keysA.length !== keysB.length) return !1;
      for (keysB = 0; keysB < keysA.length; keysB++) {
        var currentKey = keysA[keysB];
        if (
          !hasOwnProperty.call(objB, currentKey) ||
          !objectIs(objA[currentKey], objB[currentKey])
        )
          return !1;
      }
      return !0;
    }
    function getLeafNode(node) {
      for (; node && node.firstChild; ) node = node.firstChild;
      return node;
    }
    function getNodeForCharacterOffset(root, offset) {
      var node = getLeafNode(root);
      root = 0;
      for (var nodeEnd; node; ) {
        if (3 === node.nodeType) {
          nodeEnd = root + node.textContent.length;
          if (root <= offset && nodeEnd >= offset)
            return { node: node, offset: offset - root };
          root = nodeEnd;
        }
        a: {
          for (; node; ) {
            if (node.nextSibling) {
              node = node.nextSibling;
              break a;
            }
            node = node.parentNode;
          }
          node = void 0;
        }
        node = getLeafNode(node);
      }
    }
    function containsNode(outerNode, innerNode) {
      return outerNode && innerNode
        ? outerNode === innerNode
          ? !0
          : outerNode && 3 === outerNode.nodeType
            ? !1
            : innerNode && 3 === innerNode.nodeType
              ? containsNode(outerNode, innerNode.parentNode)
              : "contains" in outerNode
                ? outerNode.contains(innerNode)
                : outerNode.compareDocumentPosition
                  ? !!(outerNode.compareDocumentPosition(innerNode) & 16)
                  : !1
        : !1;
    }
    function getActiveElementDeep(containerInfo) {
      containerInfo =
        null != containerInfo &&
        null != containerInfo.ownerDocument &&
        null != containerInfo.ownerDocument.defaultView
          ? containerInfo.ownerDocument.defaultView
          : window;
      for (
        var element = getActiveElement(containerInfo.document);
        element instanceof containerInfo.HTMLIFrameElement;

      ) {
        try {
          var JSCompiler_inline_result =
            "string" === typeof element.contentWindow.location.href;
        } catch (err) {
          JSCompiler_inline_result = !1;
        }
        if (JSCompiler_inline_result) containerInfo = element.contentWindow;
        else break;
        element = getActiveElement(containerInfo.document);
      }
      return element;
    }
    function hasSelectionCapabilities(elem) {
      var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
      return (
        nodeName &&
        (("input" === nodeName &&
          ("text" === elem.type ||
            "search" === elem.type ||
            "tel" === elem.type ||
            "url" === elem.type ||
            "password" === elem.type)) ||
          "textarea" === nodeName ||
          "true" === elem.contentEditable)
      );
    }
    function restoreSelection(priorSelectionInformation, containerInfo) {
      var curFocusedElem = getActiveElementDeep(containerInfo);
      containerInfo = priorSelectionInformation.focusedElem;
      var priorSelectionRange = priorSelectionInformation.selectionRange;
      if (
        curFocusedElem !== containerInfo &&
        containerInfo &&
        containerInfo.ownerDocument &&
        containsNode(containerInfo.ownerDocument.documentElement, containerInfo)
      ) {
        if (
          null !== priorSelectionRange &&
          hasSelectionCapabilities(containerInfo)
        )
          if (
            ((priorSelectionInformation = priorSelectionRange.start),
            (curFocusedElem = priorSelectionRange.end),
            void 0 === curFocusedElem &&
              (curFocusedElem = priorSelectionInformation),
            "selectionStart" in containerInfo)
          )
            (containerInfo.selectionStart = priorSelectionInformation),
              (containerInfo.selectionEnd = Math.min(
                curFocusedElem,
                containerInfo.value.length
              ));
          else if (
            ((curFocusedElem =
              ((priorSelectionInformation =
                containerInfo.ownerDocument || document) &&
                priorSelectionInformation.defaultView) ||
              window),
            curFocusedElem.getSelection)
          ) {
            curFocusedElem = curFocusedElem.getSelection();
            var length = containerInfo.textContent.length,
              start = Math.min(priorSelectionRange.start, length);
            priorSelectionRange =
              void 0 === priorSelectionRange.end
                ? start
                : Math.min(priorSelectionRange.end, length);
            !curFocusedElem.extend &&
              start > priorSelectionRange &&
              ((length = priorSelectionRange),
              (priorSelectionRange = start),
              (start = length));
            length = getNodeForCharacterOffset(containerInfo, start);
            var endMarker = getNodeForCharacterOffset(
              containerInfo,
              priorSelectionRange
            );
            length &&
              endMarker &&
              (1 !== curFocusedElem.rangeCount ||
                curFocusedElem.anchorNode !== length.node ||
                curFocusedElem.anchorOffset !== length.offset ||
                curFocusedElem.focusNode !== endMarker.node ||
                curFocusedElem.focusOffset !== endMarker.offset) &&
              ((priorSelectionInformation =
                priorSelectionInformation.createRange()),
              priorSelectionInformation.setStart(length.node, length.offset),
              curFocusedElem.removeAllRanges(),
              start > priorSelectionRange
                ? (curFocusedElem.addRange(priorSelectionInformation),
                  curFocusedElem.extend(endMarker.node, endMarker.offset))
                : (priorSelectionInformation.setEnd(
                    endMarker.node,
                    endMarker.offset
                  ),
                  curFocusedElem.addRange(priorSelectionInformation)));
          }
        priorSelectionInformation = [];
        for (
          curFocusedElem = containerInfo;
          (curFocusedElem = curFocusedElem.parentNode);

        )
          1 === curFocusedElem.nodeType &&
            priorSelectionInformation.push({
              element: curFocusedElem,
              left: curFocusedElem.scrollLeft,
              top: curFocusedElem.scrollTop
            });
        "function" === typeof containerInfo.focus && containerInfo.focus();
        for (
          containerInfo = 0;
          containerInfo < priorSelectionInformation.length;
          containerInfo++
        )
          (curFocusedElem = priorSelectionInformation[containerInfo]),
            (curFocusedElem.element.scrollLeft = curFocusedElem.left),
            (curFocusedElem.element.scrollTop = curFocusedElem.top);
      }
    }
    function constructSelectEvent(
      dispatchQueue,
      nativeEvent,
      nativeEventTarget
    ) {
      var doc =
        nativeEventTarget.window === nativeEventTarget
          ? nativeEventTarget.document
          : 9 === nativeEventTarget.nodeType
            ? nativeEventTarget
            : nativeEventTarget.ownerDocument;
      mouseDown ||
        null == activeElement ||
        activeElement !== getActiveElement(doc) ||
        ((doc = activeElement),
        "selectionStart" in doc && hasSelectionCapabilities(doc)
          ? (doc = { start: doc.selectionStart, end: doc.selectionEnd })
          : ((doc = (
              (doc.ownerDocument && doc.ownerDocument.defaultView) ||
              window
            ).getSelection()),
            (doc = {
              anchorNode: doc.anchorNode,
              anchorOffset: doc.anchorOffset,
              focusNode: doc.focusNode,
              focusOffset: doc.focusOffset
            })),
        (lastSelection && shallowEqual(lastSelection, doc)) ||
          ((lastSelection = doc),
          (doc = accumulateTwoPhaseListeners(activeElementInst, "onSelect")),
          0 < doc.length &&
            ((nativeEvent = new SyntheticEvent(
              "onSelect",
              "select",
              null,
              nativeEvent,
              nativeEventTarget
            )),
            dispatchQueue.push({ event: nativeEvent, listeners: doc }),
            (nativeEvent.target = activeElement))));
    }
    function makePrefixMap(styleProp, eventName) {
      var prefixes = {};
      prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
      prefixes["Webkit" + styleProp] = "webkit" + eventName;
      prefixes["Moz" + styleProp] = "moz" + eventName;
      return prefixes;
    }
    function getVendorPrefixedEventName(eventName) {
      if (prefixedEventNames[eventName]) return prefixedEventNames[eventName];
      if (!vendorPrefixes[eventName]) return eventName;
      var prefixMap = vendorPrefixes[eventName],
        styleProp;
      for (styleProp in prefixMap)
        if (prefixMap.hasOwnProperty(styleProp) && styleProp in style)
          return (prefixedEventNames[eventName] = prefixMap[styleProp]);
      return eventName;
    }
    function registerSimpleEvent(domEventName, reactName) {
      topLevelEventsToReactNames.set(domEventName, reactName);
      registerTwoPhaseEvent(reactName, [domEventName]);
    }
    function finishQueueingConcurrentUpdates() {
      for (
        var endIndex = concurrentQueuesIndex,
          i = (concurrentlyUpdatedLanes = concurrentQueuesIndex = 0);
        i < endIndex;

      ) {
        var fiber = concurrentQueues[i];
        concurrentQueues[i++] = null;
        var queue = concurrentQueues[i];
        concurrentQueues[i++] = null;
        var update = concurrentQueues[i];
        concurrentQueues[i++] = null;
        var lane = concurrentQueues[i];
        concurrentQueues[i++] = null;
        if (null !== queue && null !== update) {
          var pending = queue.pending;
          null === pending
            ? (update.next = update)
            : ((update.next = pending.next), (pending.next = update));
          queue.pending = update;
        }
        0 !== lane && markUpdateLaneFromFiberToRoot(fiber, update, lane);
      }
    }
    function enqueueUpdate$1(fiber, queue, update, lane) {
      concurrentQueues[concurrentQueuesIndex++] = fiber;
      concurrentQueues[concurrentQueuesIndex++] = queue;
      concurrentQueues[concurrentQueuesIndex++] = update;
      concurrentQueues[concurrentQueuesIndex++] = lane;
      concurrentlyUpdatedLanes |= lane;
      fiber.lanes |= lane;
      fiber = fiber.alternate;
      null !== fiber && (fiber.lanes |= lane);
    }
    function enqueueConcurrentHookUpdate(fiber, queue, update, lane) {
      enqueueUpdate$1(fiber, queue, update, lane);
      return getRootForUpdatedFiber(fiber);
    }
    function enqueueConcurrentRenderForLane(fiber, lane) {
      enqueueUpdate$1(fiber, null, null, lane);
      return getRootForUpdatedFiber(fiber);
    }
    function markUpdateLaneFromFiberToRoot(sourceFiber, update, lane) {
      sourceFiber.lanes |= lane;
      var alternate = sourceFiber.alternate;
      null !== alternate && (alternate.lanes |= lane);
      for (var isHidden = !1, parent = sourceFiber.return; null !== parent; )
        (parent.childLanes |= lane),
          (alternate = parent.alternate),
          null !== alternate && (alternate.childLanes |= lane),
          22 === parent.tag &&
            ((sourceFiber = parent.stateNode),
            null === sourceFiber ||
              sourceFiber._visibility & OffscreenVisible ||
              (isHidden = !0)),
          (sourceFiber = parent),
          (parent = parent.return);
      isHidden &&
        null !== update &&
        3 === sourceFiber.tag &&
        ((parent = sourceFiber.stateNode),
        (isHidden = 31 - clz32(lane)),
        (parent = parent.hiddenUpdates),
        (sourceFiber = parent[isHidden]),
        null === sourceFiber
          ? (parent[isHidden] = [update])
          : sourceFiber.push(update),
        (update.lane = lane | 536870912));
    }
    function getRootForUpdatedFiber(sourceFiber) {
      if (nestedUpdateCount > NESTED_UPDATE_LIMIT)
        throw (
          ((nestedPassiveUpdateCount = nestedUpdateCount = 0),
          (rootWithPassiveNestedUpdates = rootWithNestedUpdates = null),
          Error(
            "Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops."
          ))
        );
      nestedPassiveUpdateCount > NESTED_PASSIVE_UPDATE_LIMIT &&
        ((nestedPassiveUpdateCount = 0),
        (rootWithPassiveNestedUpdates = null),
        console.error(
          "Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."
        ));
      null === sourceFiber.alternate &&
        0 !== (sourceFiber.flags & 4098) &&
        warnAboutUpdateOnNotYetMountedFiberInDEV(sourceFiber);
      for (var node = sourceFiber, parent = node.return; null !== parent; )
        null === node.alternate &&
          0 !== (node.flags & 4098) &&
          warnAboutUpdateOnNotYetMountedFiberInDEV(sourceFiber),
          (node = parent),
          (parent = node.return);
      return 3 === node.tag ? node.stateNode : null;
    }
    function resolveFunctionForHotReloading(type) {
      if (null === resolveFamily) return type;
      var family = resolveFamily(type);
      return void 0 === family ? type : family.current;
    }
    function resolveForwardRefForHotReloading(type) {
      if (null === resolveFamily) return type;
      var family = resolveFamily(type);
      return void 0 === family
        ? null !== type &&
          void 0 !== type &&
          "function" === typeof type.render &&
          ((family = resolveFunctionForHotReloading(type.render)),
          type.render !== family)
          ? ((family = { $$typeof: REACT_FORWARD_REF_TYPE, render: family }),
            void 0 !== type.displayName &&
              (family.displayName = type.displayName),
            family)
          : type
        : family.current;
    }
    function isCompatibleFamilyForHotReloading(fiber, element) {
      if (null === resolveFamily) return !1;
      var prevType = fiber.elementType;
      element = element.type;
      var needsCompareFamilies = !1,
        $$typeofNextType =
          "object" === typeof element && null !== element
            ? element.$$typeof
            : null;
      switch (fiber.tag) {
        case 1:
          "function" === typeof element && (needsCompareFamilies = !0);
          break;
        case 0:
          "function" === typeof element
            ? (needsCompareFamilies = !0)
            : $$typeofNextType === REACT_LAZY_TYPE &&
              (needsCompareFamilies = !0);
          break;
        case 11:
          $$typeofNextType === REACT_FORWARD_REF_TYPE
            ? (needsCompareFamilies = !0)
            : $$typeofNextType === REACT_LAZY_TYPE &&
              (needsCompareFamilies = !0);
          break;
        case 14:
        case 15:
          $$typeofNextType === REACT_MEMO_TYPE
            ? (needsCompareFamilies = !0)
            : $$typeofNextType === REACT_LAZY_TYPE &&
              (needsCompareFamilies = !0);
          break;
        default:
          return !1;
      }
      return needsCompareFamilies &&
        ((fiber = resolveFamily(prevType)),
        void 0 !== fiber && fiber === resolveFamily(element))
        ? !0
        : !1;
    }
    function markFailedErrorBoundaryForHotReloading(fiber) {
      null !== resolveFamily &&
        "function" === typeof WeakSet &&
        (null === failedBoundaries && (failedBoundaries = new WeakSet()),
        failedBoundaries.add(fiber));
    }
    function scheduleFibersWithFamiliesRecursively(
      fiber,
      updatedFamilies,
      staleFamilies
    ) {
      var alternate = fiber.alternate,
        child = fiber.child,
        sibling = fiber.sibling,
        tag = fiber.tag,
        type = fiber.type,
        candidateType = null;
      switch (tag) {
        case 0:
        case 15:
        case 1:
          candidateType = type;
          break;
        case 11:
          candidateType = type.render;
      }
      if (null === resolveFamily)
        throw Error("Expected resolveFamily to be set during hot reload.");
      var needsRender = !1;
      type = !1;
      null !== candidateType &&
        ((candidateType = resolveFamily(candidateType)),
        void 0 !== candidateType &&
          (staleFamilies.has(candidateType)
            ? (type = !0)
            : updatedFamilies.has(candidateType) &&
              (1 === tag ? (type = !0) : (needsRender = !0))));
      null !== failedBoundaries &&
        (failedBoundaries.has(fiber) ||
          (null !== alternate && failedBoundaries.has(alternate))) &&
        (type = !0);
      type && (fiber._debugNeedsRemount = !0);
      if (type || needsRender)
        (alternate = enqueueConcurrentRenderForLane(fiber, 2)),
          null !== alternate && scheduleUpdateOnFiber(alternate, fiber, 2);
      null === child ||
        type ||
        scheduleFibersWithFamiliesRecursively(
          child,
          updatedFamilies,
          staleFamilies
        );
      null !== sibling &&
        scheduleFibersWithFamiliesRecursively(
          sibling,
          updatedFamilies,
          staleFamilies
        );
    }
    function pushNestedEffectDurations() {
      var prevEffectDuration = profilerEffectDuration;
      profilerEffectDuration = 0;
      return prevEffectDuration;
    }
    function popNestedEffectDurations(prevEffectDuration) {
      var elapsedTime = profilerEffectDuration;
      profilerEffectDuration = prevEffectDuration;
      return elapsedTime;
    }
    function bubbleNestedEffectDurations(prevEffectDuration) {
      var elapsedTime = profilerEffectDuration;
      profilerEffectDuration += prevEffectDuration;
      return elapsedTime;
    }
    function startProfilerTimer(fiber) {
      profilerStartTime = now();
      0 > fiber.actualStartTime && (fiber.actualStartTime = profilerStartTime);
    }
    function stopProfilerTimerIfRunningAndRecordDuration(fiber) {
      if (0 <= profilerStartTime) {
        var elapsedTime = now() - profilerStartTime;
        fiber.actualDuration += elapsedTime;
        fiber.selfBaseDuration = elapsedTime;
        profilerStartTime = -1;
      }
    }
    function stopProfilerTimerIfRunningAndRecordIncompleteDuration(fiber) {
      if (0 <= profilerStartTime) {
        var elapsedTime = now() - profilerStartTime;
        fiber.actualDuration += elapsedTime;
        profilerStartTime = -1;
      }
    }
    function recordEffectDuration() {
      if (0 <= profilerStartTime) {
        var elapsedTime = now() - profilerStartTime;
        profilerStartTime = -1;
        profilerEffectDuration += elapsedTime;
      }
    }
    function startEffectTimer() {
      profilerStartTime = now();
    }
    function transferActualDuration(fiber) {
      for (var child = fiber.child; child; )
        (fiber.actualDuration += child.actualDuration), (child = child.sibling);
    }
    function createCapturedValueAtFiber(value, source) {
      if ("object" === typeof value && null !== value) {
        var existing = CapturedStacks.get(value);
        if (void 0 !== existing) return existing;
        source = {
          value: value,
          source: source,
          stack: getStackByFiberInDevAndProd(source)
        };
        CapturedStacks.set(value, source);
        return source;
      }
      return {
        value: value,
        source: source,
        stack: getStackByFiberInDevAndProd(source)
      };
    }
    function pushTreeFork(workInProgress, totalChildren) {
      warnIfNotHydrating();
      forkStack[forkStackIndex++] = treeForkCount;
      forkStack[forkStackIndex++] = treeForkProvider;
      treeForkProvider = workInProgress;
      treeForkCount = totalChildren;
    }
    function pushTreeId(workInProgress, totalChildren, index) {
      warnIfNotHydrating();
      idStack[idStackIndex++] = treeContextId;
      idStack[idStackIndex++] = treeContextOverflow;
      idStack[idStackIndex++] = treeContextProvider;
      treeContextProvider = workInProgress;
      var baseIdWithLeadingBit = treeContextId;
      workInProgress = treeContextOverflow;
      var baseLength = 32 - clz32(baseIdWithLeadingBit) - 1;
      baseIdWithLeadingBit &= ~(1 << baseLength);
      index += 1;
      var length = 32 - clz32(totalChildren) + baseLength;
      if (30 < length) {
        var numberOfOverflowBits = baseLength - (baseLength % 5);
        length = (
          baseIdWithLeadingBit &
          ((1 << numberOfOverflowBits) - 1)
        ).toString(32);
        baseIdWithLeadingBit >>= numberOfOverflowBits;
        baseLength -= numberOfOverflowBits;
        treeContextId =
          (1 << (32 - clz32(totalChildren) + baseLength)) |
          (index << baseLength) |
          baseIdWithLeadingBit;
        treeContextOverflow = length + workInProgress;
      } else
        (treeContextId =
          (1 << length) | (index << baseLength) | baseIdWithLeadingBit),
          (treeContextOverflow = workInProgress);
    }
    function pushMaterializedTreeId(workInProgress) {
      warnIfNotHydrating();
      null !== workInProgress.return &&
        (pushTreeFork(workInProgress, 1), pushTreeId(workInProgress, 1, 0));
    }
    function popTreeContext(workInProgress) {
      for (; workInProgress === treeForkProvider; )
        (treeForkProvider = forkStack[--forkStackIndex]),
          (forkStack[forkStackIndex] = null),
          (treeForkCount = forkStack[--forkStackIndex]),
          (forkStack[forkStackIndex] = null);
      for (; workInProgress === treeContextProvider; )
        (treeContextProvider = idStack[--idStackIndex]),
          (idStack[idStackIndex] = null),
          (treeContextOverflow = idStack[--idStackIndex]),
          (idStack[idStackIndex] = null),
          (treeContextId = idStack[--idStackIndex]),
          (idStack[idStackIndex] = null);
    }
    function warnIfNotHydrating() {
      isHydrating ||
        console.error(
          "Expected to be hydrating. This is a bug in React. Please file an issue."
        );
    }
    function buildHydrationDiffNode(fiber, distanceFromLeaf) {
      if (null === fiber.return) {
        if (null === hydrationDiffRootDEV)
          hydrationDiffRootDEV = {
            fiber: fiber,
            children: [],
            serverProps: void 0,
            serverTail: [],
            distanceFromLeaf: distanceFromLeaf
          };
        else {
          if (hydrationDiffRootDEV.fiber !== fiber)
            throw Error(
              "Saw multiple hydration diff roots in a pass. This is a bug in React."
            );
          hydrationDiffRootDEV.distanceFromLeaf > distanceFromLeaf &&
            (hydrationDiffRootDEV.distanceFromLeaf = distanceFromLeaf);
        }
        return hydrationDiffRootDEV;
      }
      var siblings = buildHydrationDiffNode(
        fiber.return,
        distanceFromLeaf + 1
      ).children;
      if (0 < siblings.length && siblings[siblings.length - 1].fiber === fiber)
        return (
          (siblings = siblings[siblings.length - 1]),
          siblings.distanceFromLeaf > distanceFromLeaf &&
            (siblings.distanceFromLeaf = distanceFromLeaf),
          siblings
        );
      distanceFromLeaf = {
        fiber: fiber,
        children: [],
        serverProps: void 0,
        serverTail: [],
        distanceFromLeaf: distanceFromLeaf
      };
      siblings.push(distanceFromLeaf);
      return distanceFromLeaf;
    }
    function warnNonHydratedInstance(fiber, rejectedCandidate) {
      didSuspendOrErrorDEV ||
        ((fiber = buildHydrationDiffNode(fiber, 0)),
        (fiber.serverProps = null),
        null !== rejectedCandidate &&
          ((rejectedCandidate =
            describeHydratableInstanceForDevWarnings(rejectedCandidate)),
          fiber.serverTail.push(rejectedCandidate)));
    }
    function throwOnHydrationMismatch(fiber) {
      var diff = "",
        diffRoot = hydrationDiffRootDEV;
      null !== diffRoot &&
        ((hydrationDiffRootDEV = null), (diff = describeDiff(diffRoot)));
      queueHydrationError(
        createCapturedValueAtFiber(
          Error(
            "Hydration failed because the server rendered HTML didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:\n\n- A server/client branch `if (typeof window !== 'undefined')`.\n- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.\n- Date formatting in a user's locale which doesn't match the server.\n- External changing data without sending a snapshot of it along with the HTML.\n- Invalid HTML tag nesting.\n\nIt can also happen if the client has a browser extension installed which messes with the HTML before React loaded.\n\nhttps://react.dev/link/hydration-mismatch" +
              diff
          ),
          fiber
        )
      );
      throw HydrationMismatchException;
    }
    function prepareToHydrateHostInstance(fiber) {
      var didHydrate = fiber.stateNode;
      var type = fiber.type,
        props = fiber.memoizedProps;
      didHydrate[internalInstanceKey] = fiber;
      didHydrate[internalPropsKey] = props;
      validatePropertiesInDevelopment(type, props);
      switch (type) {
        case "dialog":
          listenToNonDelegatedEvent("cancel", didHydrate);
          listenToNonDelegatedEvent("close", didHydrate);
          break;
        case "iframe":
        case "object":
        case "embed":
          listenToNonDelegatedEvent("load", didHydrate);
          break;
        case "video":
        case "audio":
          for (type = 0; type < mediaEventTypes.length; type++)
            listenToNonDelegatedEvent(mediaEventTypes[type], didHydrate);
          break;
        case "source":
          listenToNonDelegatedEvent("error", didHydrate);
          break;
        case "img":
        case "image":
        case "link":
          listenToNonDelegatedEvent("error", didHydrate);
          listenToNonDelegatedEvent("load", didHydrate);
          break;
        case "details":
          listenToNonDelegatedEvent("toggle", didHydrate);
          break;
        case "input":
          checkControlledValueProps("input", props);
          listenToNonDelegatedEvent("invalid", didHydrate);
          validateInputProps(didHydrate, props);
          initInput(
            didHydrate,
            props.value,
            props.defaultValue,
            props.checked,
            props.defaultChecked,
            props.type,
            props.name,
            !0
          );
          track(didHydrate);
          break;
        case "option":
          validateOptionProps(didHydrate, props);
          break;
        case "select":
          checkControlledValueProps("select", props);
          listenToNonDelegatedEvent("invalid", didHydrate);
          validateSelectProps(didHydrate, props);
          break;
        case "textarea":
          checkControlledValueProps("textarea", props),
            listenToNonDelegatedEvent("invalid", didHydrate),
            validateTextareaProps(didHydrate, props),
            initTextarea(
              didHydrate,
              props.value,
              props.defaultValue,
              props.children
            ),
            track(didHydrate);
      }
      type = props.children;
      ("string" !== typeof type &&
        "number" !== typeof type &&
        "bigint" !== typeof type) ||
      didHydrate.textContent === "" + type ||
      !0 === props.suppressHydrationWarning ||
      checkForUnmatchedText(didHydrate.textContent, type)
        ? (null != props.popover &&
            (listenToNonDelegatedEvent("beforetoggle", didHydrate),
            listenToNonDelegatedEvent("toggle", didHydrate)),
          null != props.onScroll &&
            listenToNonDelegatedEvent("scroll", didHydrate),
          null != props.onScrollEnd &&
            listenToNonDelegatedEvent("scrollend", didHydrate),
          null != props.onClick && (didHydrate.onclick = noop$2),
          (didHydrate = !0))
        : (didHydrate = !1);
      didHydrate || throwOnHydrationMismatch(fiber);
    }
    function popToNextHostParent(fiber) {
      for (hydrationParentFiber = fiber.return; hydrationParentFiber; )
        switch (hydrationParentFiber.tag) {
          case 3:
          case 27:
            rootOrSingletonContext = !0;
            return;
          case 5:
          case 13:
            rootOrSingletonContext = !1;
            return;
          default:
            hydrationParentFiber = hydrationParentFiber.return;
        }
    }
    function popHydrationState(fiber) {
      if (fiber !== hydrationParentFiber) return !1;
      if (!isHydrating)
        return popToNextHostParent(fiber), (isHydrating = !0), !1;
      var shouldClear = !1,
        JSCompiler_temp;
      if ((JSCompiler_temp = 3 !== fiber.tag && 27 !== fiber.tag)) {
        if ((JSCompiler_temp = 5 === fiber.tag))
          (JSCompiler_temp = fiber.type),
            (JSCompiler_temp =
              !("form" !== JSCompiler_temp && "button" !== JSCompiler_temp) ||
              shouldSetTextContent(fiber.type, fiber.memoizedProps));
        JSCompiler_temp = !JSCompiler_temp;
      }
      JSCompiler_temp && (shouldClear = !0);
      if (shouldClear && nextHydratableInstance) {
        for (shouldClear = nextHydratableInstance; shouldClear; ) {
          JSCompiler_temp = buildHydrationDiffNode(fiber, 0);
          var description =
            describeHydratableInstanceForDevWarnings(shouldClear);
          JSCompiler_temp.serverTail.push(description);
          shouldClear =
            "Suspense" === description.type
              ? getNextHydratableInstanceAfterSuspenseInstance(shouldClear)
              : getNextHydratable(shouldClear.nextSibling);
        }
        throwOnHydrationMismatch(fiber);
      }
      popToNextHostParent(fiber);
      if (13 === fiber.tag) {
        fiber = fiber.memoizedState;
        fiber = null !== fiber ? fiber.dehydrated : null;
        if (!fiber)
          throw Error(
            "Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue."
          );
        nextHydratableInstance =
          getNextHydratableInstanceAfterSuspenseInstance(fiber);
      } else
        nextHydratableInstance = hydrationParentFiber
          ? getNextHydratable(fiber.stateNode.nextSibling)
          : null;
      return !0;
    }
    function resetHydrationState() {
      nextHydratableInstance = hydrationParentFiber = null;
      didSuspendOrErrorDEV = isHydrating = !1;
    }
    function queueHydrationError(error) {
      null === hydrationErrors
        ? (hydrationErrors = [error])
        : hydrationErrors.push(error);
    }
    function emitPendingHydrationWarnings() {
      var diffRoot = hydrationDiffRootDEV;
      null !== diffRoot &&
        ((hydrationDiffRootDEV = null),
        (diffRoot = describeDiff(diffRoot)),
        console.error(
          "A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:\n\n- A server/client branch `if (typeof window !== 'undefined')`.\n- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.\n- Date formatting in a user's locale which doesn't match the server.\n- External changing data without sending a snapshot of it along with the HTML.\n- Invalid HTML tag nesting.\n\nIt can also happen if the client has a browser extension installed which messes with the HTML before React loaded.\n\n%s%s",
          "https://react.dev/link/hydration-mismatch",
          diffRoot
        ));
    }
    function createThenableState() {
      return { didWarnAboutUncachedPromise: !1, thenables: [] };
    }
    function isThenableResolved(thenable) {
      thenable = thenable.status;
      return "fulfilled" === thenable || "rejected" === thenable;
    }
    function noop$4() {}
    function trackUsedThenable(thenableState, thenable, index) {
      null !== ReactSharedInternals.actQueue &&
        (ReactSharedInternals.didUsePromise = !0);
      var trackedThenables = thenableState.thenables;
      index = trackedThenables[index];
      void 0 === index
        ? trackedThenables.push(thenable)
        : index !== thenable &&
          (thenableState.didWarnAboutUncachedPromise ||
            ((thenableState.didWarnAboutUncachedPromise = !0),
            console.error(
              "A component was suspended by an uncached promise. Creating promises inside a Client Component or hook is not yet supported, except via a Suspense-compatible library or framework."
            )),
          thenable.then(noop$4, noop$4),
          (thenable = index));
      switch (thenable.status) {
        case "fulfilled":
          return thenable.value;
        case "rejected":
          throw (
            ((thenableState = thenable.reason),
            checkIfUseWrappedInAsyncCatch(thenableState),
            thenableState)
          );
        default:
          if ("string" === typeof thenable.status)
            thenable.then(noop$4, noop$4);
          else {
            thenableState = workInProgressRoot;
            if (
              null !== thenableState &&
              100 < thenableState.shellSuspendCounter
            )
              throw Error(
                "async/await is not yet supported in Client Components, only Server Components. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server."
              );
            thenableState = thenable;
            thenableState.status = "pending";
            thenableState.then(
              function (fulfilledValue) {
                if ("pending" === thenable.status) {
                  var fulfilledThenable = thenable;
                  fulfilledThenable.status = "fulfilled";
                  fulfilledThenable.value = fulfilledValue;
                }
              },
              function (error) {
                if ("pending" === thenable.status) {
                  var rejectedThenable = thenable;
                  rejectedThenable.status = "rejected";
                  rejectedThenable.reason = error;
                }
              }
            );
          }
          switch (thenable.status) {
            case "fulfilled":
              return thenable.value;
            case "rejected":
              throw (
                ((thenableState = thenable.reason),
                checkIfUseWrappedInAsyncCatch(thenableState),
                thenableState)
              );
          }
          suspendedThenable = thenable;
          needsToResetSuspendedThenableDEV = !0;
          throw SuspenseException;
      }
    }
    function getSuspendedThenable() {
      if (null === suspendedThenable)
        throw Error(
          "Expected a suspended thenable. This is a bug in React. Please file an issue."
        );
      var thenable = suspendedThenable;
      suspendedThenable = null;
      needsToResetSuspendedThenableDEV = !1;
      return thenable;
    }
    function checkIfUseWrappedInAsyncCatch(rejectedReason) {
      if (
        rejectedReason === SuspenseException ||
        rejectedReason === SuspenseActionException
      )
        throw Error(
          "Hooks are not supported inside an async component. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server."
        );
    }
    function createCache() {
      return {
        controller: new AbortControllerLocal(),
        data: new Map(),
        refCount: 0
      };
    }
    function retainCache(cache) {
      cache.controller.signal.aborted &&
        console.warn(
          "A cache instance was retained after it was already freed. This likely indicates a bug in React."
        );
      cache.refCount++;
    }
    function releaseCache(cache) {
      cache.refCount--;
      0 > cache.refCount &&
        console.warn(
          "A cache instance was released after it was already freed. This likely indicates a bug in React."
        );
      0 === cache.refCount &&
        scheduleCallback$2(NormalPriority, function () {
          cache.controller.abort();
        });
    }
    function entangleAsyncAction(transition, thenable) {
      if (null === currentEntangledListeners) {
        var entangledListeners = (currentEntangledListeners = []);
        currentEntangledPendingCount = 0;
        currentEntangledLane = requestTransitionLane();
        currentEntangledActionThenable = {
          status: "pending",
          value: void 0,
          then: function (resolve) {
            entangledListeners.push(resolve);
          }
        };
      }
      currentEntangledPendingCount++;
      thenable.then(pingEngtangledActionScope, pingEngtangledActionScope);
      return thenable;
    }
    function pingEngtangledActionScope() {
      if (
        0 === --currentEntangledPendingCount &&
        null !== currentEntangledListeners
      ) {
        null !== currentEntangledActionThenable &&
          (currentEntangledActionThenable.status = "fulfilled");
        var listeners = currentEntangledListeners;
        currentEntangledListeners = null;
        currentEntangledLane = 0;
        currentEntangledActionThenable = null;
        for (var i = 0; i < listeners.length; i++) (0, listeners[i])();
      }
    }
    function chainThenableValue(thenable, result) {
      var listeners = [],
        thenableWithOverride = {
          status: "pending",
          value: null,
          reason: null,
          then: function (resolve) {
            listeners.push(resolve);
          }
        };
      thenable.then(
        function () {
          thenableWithOverride.status = "fulfilled";
          thenableWithOverride.value = result;
          for (var i = 0; i < listeners.length; i++) (0, listeners[i])(result);
        },
        function (error) {
          thenableWithOverride.status = "rejected";
          thenableWithOverride.reason = error;
          for (error = 0; error < listeners.length; error++)
            (0, listeners[error])(void 0);
        }
      );
      return thenableWithOverride;
    }
    function pushHiddenContext(fiber, context) {
      var prevEntangledRenderLanes = entangledRenderLanes;
      push(prevEntangledRenderLanesCursor, prevEntangledRenderLanes, fiber);
      push(currentTreeHiddenStackCursor, context, fiber);
      entangledRenderLanes = prevEntangledRenderLanes | context.baseLanes;
    }
    function reuseHiddenContextOnStack(fiber) {
      push(prevEntangledRenderLanesCursor, entangledRenderLanes, fiber);
      push(
        currentTreeHiddenStackCursor,
        currentTreeHiddenStackCursor.current,
        fiber
      );
    }
    function popHiddenContext(fiber) {
      entangledRenderLanes = prevEntangledRenderLanesCursor.current;
      pop(currentTreeHiddenStackCursor, fiber);
      pop(prevEntangledRenderLanesCursor, fiber);
    }
    function peekCacheFromPool() {
      var cacheResumedFromPreviousRender = resumedCache.current;
      return null !== cacheResumedFromPreviousRender
        ? cacheResumedFromPreviousRender
        : workInProgressRoot.pooledCache;
    }
    function pushTransition(offscreenWorkInProgress, prevCachePool) {
      null === prevCachePool
        ? push(resumedCache, resumedCache.current, offscreenWorkInProgress)
        : push(resumedCache, prevCachePool.pool, offscreenWorkInProgress);
    }
    function getSuspendedCache() {
      var cacheFromPool = peekCacheFromPool();
      return null === cacheFromPool
        ? null
        : { parent: CacheContext._currentValue, pool: cacheFromPool };
    }
    function mountHookTypesDev() {
      var hookName = currentHookNameInDev;
      null === hookTypesDev
        ? (hookTypesDev = [hookName])
        : hookTypesDev.push(hookName);
    }
    function updateHookTypesDev() {
      var hookName = currentHookNameInDev;
      if (
        null !== hookTypesDev &&
        (hookTypesUpdateIndexDev++,
        hookTypesDev[hookTypesUpdateIndexDev] !== hookName)
      ) {
        var componentName = getComponentNameFromFiber(
          currentlyRenderingFiber$1
        );
        if (
          !didWarnAboutMismatchedHooksForComponent.has(componentName) &&
          (didWarnAboutMismatchedHooksForComponent.add(componentName),
          null !== hookTypesDev)
        ) {
          for (var table = "", i = 0; i <= hookTypesUpdateIndexDev; i++) {
            var oldHookName = hookTypesDev[i],
              newHookName =
                i === hookTypesUpdateIndexDev ? hookName : oldHookName;
            for (
              oldHookName = i + 1 + ". " + oldHookName;
              30 > oldHookName.length;

            )
              oldHookName += " ";
            oldHookName += newHookName + "\n";
            table += oldHookName;
          }
          console.error(
            "React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://react.dev/link/rules-of-hooks\n\n   Previous render            Next render\n   ------------------------------------------------------\n%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n",
            componentName,
            table
          );
        }
      }
    }
    function checkDepsAreArrayDev(deps) {
      void 0 === deps ||
        null === deps ||
        isArrayImpl(deps) ||
        console.error(
          "%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.",
          currentHookNameInDev,
          typeof deps
        );
    }
    function warnOnUseFormStateInDev() {
      var componentName = getComponentNameFromFiber(currentlyRenderingFiber$1);
      didWarnAboutUseFormState.has(componentName) ||
        (didWarnAboutUseFormState.add(componentName),
        console.error(
          "ReactDOM.useFormState has been renamed to React.useActionState. Please update %s to use React.useActionState.",
          componentName
        ));
    }
    function throwInvalidHookError() {
      throw Error(
        "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."
      );
    }
    function areHookInputsEqual(nextDeps, prevDeps) {
      if (ignorePreviousDependencies) return !1;
      if (null === prevDeps)
        return (
          console.error(
            "%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.",
            currentHookNameInDev
          ),
          !1
        );
      nextDeps.length !== prevDeps.length &&
        console.error(
          "The final argument passed to %s changed size between renders. The order and size of this array must remain constant.\n\nPrevious: %s\nIncoming: %s",
          currentHookNameInDev,
          "[" + prevDeps.join(", ") + "]",
          "[" + nextDeps.join(", ") + "]"
        );
      for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++)
        if (!objectIs(nextDeps[i], prevDeps[i])) return !1;
      return !0;
    }
    function renderWithHooks(
      current,
      workInProgress,
      Component,
      props,
      secondArg,
      nextRenderLanes
    ) {
      renderLanes = nextRenderLanes;
      currentlyRenderingFiber$1 = workInProgress;
      hookTypesDev = null !== current ? current._debugHookTypes : null;
      hookTypesUpdateIndexDev = -1;
      ignorePreviousDependencies =
        null !== current && current.type !== workInProgress.type;
      if (
        "[object AsyncFunction]" ===
          Object.prototype.toString.call(Component) ||
        "[object AsyncGeneratorFunction]" ===
          Object.prototype.toString.call(Component)
      )
        (nextRenderLanes = getComponentNameFromFiber(
          currentlyRenderingFiber$1
        )),
          didWarnAboutAsyncClientComponent.has(nextRenderLanes) ||
            (didWarnAboutAsyncClientComponent.add(nextRenderLanes),
            console.error(
              "async/await is not yet supported in Client Components, only Server Components. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server."
            ));
      workInProgress.memoizedState = null;
      workInProgress.updateQueue = null;
      workInProgress.lanes = 0;
      ReactSharedInternals.H =
        null !== current && null !== current.memoizedState
          ? HooksDispatcherOnUpdateInDEV
          : null !== hookTypesDev
            ? HooksDispatcherOnMountWithHookTypesInDEV
            : HooksDispatcherOnMountInDEV;
      shouldDoubleInvokeUserFnsInHooksDEV = nextRenderLanes =
        (workInProgress.mode & StrictLegacyMode) !== NoMode;
      var children = callComponentInDEV(Component, props, secondArg);
      shouldDoubleInvokeUserFnsInHooksDEV = !1;
      didScheduleRenderPhaseUpdateDuringThisPass &&
        (children = renderWithHooksAgain(
          workInProgress,
          Component,
          props,
          secondArg
        ));
      if (nextRenderLanes) {
        setIsStrictModeForDevtools(!0);
        try {
          children = renderWithHooksAgain(
            workInProgress,
            Component,
            props,
            secondArg
          );
        } finally {
          setIsStrictModeForDevtools(!1);
        }
      }
      finishRenderingHooks(current, workInProgress);
      return children;
    }
    function finishRenderingHooks(current, workInProgress) {
      workInProgress._debugHookTypes = hookTypesDev;
      null === workInProgress.dependencies
        ? null !== thenableState$1 &&
          (workInProgress.dependencies = {
            lanes: 0,
            firstContext: null,
            _debugThenableState: thenableState$1
          })
        : (workInProgress.dependencies._debugThenableState = thenableState$1);
      ReactSharedInternals.H = ContextOnlyDispatcher;
      var didRenderTooFewHooks =
        null !== currentHook && null !== currentHook.next;
      renderLanes = 0;
      hookTypesDev =
        currentHookNameInDev =
        workInProgressHook =
        currentHook =
        currentlyRenderingFiber$1 =
          null;
      hookTypesUpdateIndexDev = -1;
      null !== current &&
        (current.flags & 31457280) !== (workInProgress.flags & 31457280) &&
        console.error(
          "Internal React error: Expected static flag was missing. Please notify the React team."
        );
      didScheduleRenderPhaseUpdate = !1;
      thenableIndexCounter$1 = 0;
      thenableState$1 = null;
      if (didRenderTooFewHooks)
        throw Error(
          "Rendered fewer hooks than expected. This may be caused by an accidental early return statement."
        );
      null === current ||
        didReceiveUpdate ||
        ((current = current.dependencies),
        null !== current &&
          checkIfContextChanged(current) &&
          (didReceiveUpdate = !0));
      needsToResetSuspendedThenableDEV
        ? ((needsToResetSuspendedThenableDEV = !1), (current = !0))
        : (current = !1);
      current &&
        ((workInProgress =
          getComponentNameFromFiber(workInProgress) || "Unknown"),
        didWarnAboutUseWrappedInTryCatch.has(workInProgress) ||
          didWarnAboutAsyncClientComponent.has(workInProgress) ||
          (didWarnAboutUseWrappedInTryCatch.add(workInProgress),
          console.error(
            "`use` was called from inside a try/catch block. This is not allowed and can lead to unexpected behavior. To handle errors triggered by `use`, wrap your component in a error boundary."
          )));
    }
    function renderWithHooksAgain(workInProgress, Component, props, secondArg) {
      currentlyRenderingFiber$1 = workInProgress;
      var numberOfReRenders = 0;
      do {
        didScheduleRenderPhaseUpdateDuringThisPass && (thenableState$1 = null);
        thenableIndexCounter$1 = 0;
        didScheduleRenderPhaseUpdateDuringThisPass = !1;
        if (numberOfReRenders >= RE_RENDER_LIMIT)
          throw Error(
            "Too many re-renders. React limits the number of renders to prevent an infinite loop."
          );
        numberOfReRenders += 1;
        ignorePreviousDependencies = !1;
        workInProgressHook = currentHook = null;
        if (null != workInProgress.updateQueue) {
          var children = workInProgress.updateQueue;
          children.lastEffect = null;
          children.events = null;
          children.stores = null;
          null != children.memoCache && (children.memoCache.index = 0);
        }
        hookTypesUpdateIndexDev = -1;
        ReactSharedInternals.H = HooksDispatcherOnRerenderInDEV;
        children = callComponentInDEV(Component, props, secondArg);
      } while (didScheduleRenderPhaseUpdateDuringThisPass);
      return children;
    }
    function TransitionAwareHostComponent() {
      var dispatcher = ReactSharedInternals.H,
        maybeThenable = dispatcher.useState()[0];
      maybeThenable =
        "function" === typeof maybeThenable.then
          ? useThenable(maybeThenable)
          : maybeThenable;
      dispatcher = dispatcher.useState()[0];
      (null !== currentHook ? currentHook.memoizedState : null) !==
        dispatcher && (currentlyRenderingFiber$1.flags |= 1024);
      return maybeThenable;
    }
    function checkDidRenderIdHook() {
      var didRenderIdHook = 0 !== localIdCounter;
      localIdCounter = 0;
      return didRenderIdHook;
    }
    function bailoutHooks(current, workInProgress, lanes) {
      workInProgress.updateQueue = current.updateQueue;
      workInProgress.flags =
        (workInProgress.mode & StrictEffectsMode) !== NoMode
          ? workInProgress.flags & -201328645
          : workInProgress.flags & -2053;
      current.lanes &= ~lanes;
    }
    function resetHooksOnUnwind(workInProgress) {
      if (didScheduleRenderPhaseUpdate) {
        for (
          workInProgress = workInProgress.memoizedState;
          null !== workInProgress;

        ) {
          var queue = workInProgress.queue;
          null !== queue && (queue.pending = null);
          workInProgress = workInProgress.next;
        }
        didScheduleRenderPhaseUpdate = !1;
      }
      renderLanes = 0;
      hookTypesDev =
        workInProgressHook =
        currentHook =
        currentlyRenderingFiber$1 =
          null;
      hookTypesUpdateIndexDev = -1;
      currentHookNameInDev = null;
      didScheduleRenderPhaseUpdateDuringThisPass = !1;
      thenableIndexCounter$1 = localIdCounter = 0;
      thenableState$1 = null;
    }
    function mountWorkInProgressHook() {
      var hook = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      null === workInProgressHook
        ? (currentlyRenderingFiber$1.memoizedState = workInProgressHook = hook)
        : (workInProgressHook = workInProgressHook.next = hook);
      return workInProgressHook;
    }
    function updateWorkInProgressHook() {
      if (null === currentHook) {
        var nextCurrentHook = currentlyRenderingFiber$1.alternate;
        nextCurrentHook =
          null !== nextCurrentHook ? nextCurrentHook.memoizedState : null;
      } else nextCurrentHook = currentHook.next;
      var nextWorkInProgressHook =
        null === workInProgressHook
          ? currentlyRenderingFiber$1.memoizedState
          : workInProgressHook.next;
      if (null !== nextWorkInProgressHook)
        (workInProgressHook = nextWorkInProgressHook),
          (currentHook = nextCurrentHook);
      else {
        if (null === nextCurrentHook) {
          if (null === currentlyRenderingFiber$1.alternate)
            throw Error(
              "Update hook called on initial render. This is likely a bug in React. Please file an issue."
            );
          throw Error("Rendered more hooks than during the previous render.");
        }
        currentHook = nextCurrentHook;
        nextCurrentHook = {
          memoizedState: currentHook.memoizedState,
          baseState: currentHook.baseState,
          baseQueue: currentHook.baseQueue,
          queue: currentHook.queue,
          next: null
        };
        null === workInProgressHook
          ? (currentlyRenderingFiber$1.memoizedState = workInProgressHook =
              nextCurrentHook)
          : (workInProgressHook = workInProgressHook.next = nextCurrentHook);
      }
      return workInProgressHook;
    }
    function useThenable(thenable) {
      var index = thenableIndexCounter$1;
      thenableIndexCounter$1 += 1;
      null === thenableState$1 && (thenableState$1 = createThenableState());
      thenable = trackUsedThenable(thenableState$1, thenable, index);
      index = currentlyRenderingFiber$1;
      null ===
        (null === workInProgressHook
          ? index.memoizedState
          : workInProgressHook.next) &&
        ((index = index.alternate),
        (ReactSharedInternals.H =
          null !== index && null !== index.memoizedState
            ? HooksDispatcherOnUpdateInDEV
            : HooksDispatcherOnMountInDEV));
      return thenable;
    }
    function use(usable) {
      if (null !== usable && "object" === typeof usable) {
        if ("function" === typeof usable.then) return useThenable(usable);
        if (usable.$$typeof === REACT_CONTEXT_TYPE) return readContext(usable);
      }
      throw Error("An unsupported type was passed to use(): " + String(usable));
    }
    function useMemoCache(size) {
      var memoCache = null,
        updateQueue = currentlyRenderingFiber$1.updateQueue;
      null !== updateQueue && (memoCache = updateQueue.memoCache);
      if (null == memoCache) {
        var current = currentlyRenderingFiber$1.alternate;
        null !== current &&
          ((current = current.updateQueue),
          null !== current &&
            ((current = current.memoCache),
            null != current &&
              (memoCache = {
                data: current.data.map(function (array) {
                  return array.slice();
                }),
                index: 0
              })));
      }
      null == memoCache && (memoCache = { data: [], index: 0 });
      null === updateQueue &&
        ((updateQueue = createFunctionComponentUpdateQueue()),
        (currentlyRenderingFiber$1.updateQueue = updateQueue));
      updateQueue.memoCache = memoCache;
      updateQueue = memoCache.data[memoCache.index];
      if (void 0 === updateQueue || ignorePreviousDependencies)
        for (
          updateQueue = memoCache.data[memoCache.index] = Array(size),
            current = 0;
          current < size;
          current++
        )
          updateQueue[current] = REACT_MEMO_CACHE_SENTINEL;
      else
        updateQueue.length !== size &&
          console.error(
            "Expected a constant size argument for each invocation of useMemoCache. The previous cache was allocated with size %s but size %s was requested.",
            updateQueue.length,
            size
          );
      memoCache.index++;
      return updateQueue;
    }
    function basicStateReducer(state, action) {
      return "function" === typeof action ? action(state) : action;
    }
    function mountReducer(reducer, initialArg, init) {
      var hook = mountWorkInProgressHook();
      if (void 0 !== init) {
        var initialState = init(initialArg);
        if (shouldDoubleInvokeUserFnsInHooksDEV) {
          setIsStrictModeForDevtools(!0);
          try {
            init(initialArg);
          } finally {
            setIsStrictModeForDevtools(!1);
          }
        }
      } else initialState = initialArg;
      hook.memoizedState = hook.baseState = initialState;
      reducer = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: reducer,
        lastRenderedState: initialState
      };
      hook.queue = reducer;
      reducer = reducer.dispatch = dispatchReducerAction.bind(
        null,
        currentlyRenderingFiber$1,
        reducer
      );
      return [hook.memoizedState, reducer];
    }
    function updateReducer(reducer) {
      var hook = updateWorkInProgressHook();
      return updateReducerImpl(hook, currentHook, reducer);
    }
    function updateReducerImpl(hook, current, reducer) {
      var queue = hook.queue;
      if (null === queue)
        throw Error(
          "Should have a queue. You are likely calling Hooks conditionally, which is not allowed. (https://react.dev/link/invalid-hook-call)"
        );
      queue.lastRenderedReducer = reducer;
      var baseQueue = hook.baseQueue,
        pendingQueue = queue.pending;
      if (null !== pendingQueue) {
        if (null !== baseQueue) {
          var baseFirst = baseQueue.next;
          baseQueue.next = pendingQueue.next;
          pendingQueue.next = baseFirst;
        }
        current.baseQueue !== baseQueue &&
          console.error(
            "Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."
          );
        current.baseQueue = baseQueue = pendingQueue;
        queue.pending = null;
      }
      pendingQueue = hook.baseState;
      if (null === baseQueue) hook.memoizedState = pendingQueue;
      else {
        current = baseQueue.next;
        var newBaseQueueFirst = (baseFirst = null),
          newBaseQueueLast = null,
          update = current,
          didReadFromEntangledAsyncAction = !1;
        do {
          var updateLane = update.lane & -536870913;
          if (
            updateLane !== update.lane
              ? (workInProgressRootRenderLanes & updateLane) === updateLane
              : (renderLanes & updateLane) === updateLane
          ) {
            var revertLane = update.revertLane;
            if (0 === revertLane)
              null !== newBaseQueueLast &&
                (newBaseQueueLast = newBaseQueueLast.next =
                  {
                    lane: 0,
                    revertLane: 0,
                    action: update.action,
                    hasEagerState: update.hasEagerState,
                    eagerState: update.eagerState,
                    next: null
                  }),
                updateLane === currentEntangledLane &&
                  (didReadFromEntangledAsyncAction = !0);
            else if ((renderLanes & revertLane) === revertLane) {
              update = update.next;
              revertLane === currentEntangledLane &&
                (didReadFromEntangledAsyncAction = !0);
              continue;
            } else
              (updateLane = {
                lane: 0,
                revertLane: update.revertLane,
                action: update.action,
                hasEagerState: update.hasEagerState,
                eagerState: update.eagerState,
                next: null
              }),
                null === newBaseQueueLast
                  ? ((newBaseQueueFirst = newBaseQueueLast = updateLane),
                    (baseFirst = pendingQueue))
                  : (newBaseQueueLast = newBaseQueueLast.next = updateLane),
                (currentlyRenderingFiber$1.lanes |= revertLane),
                (workInProgressRootSkippedLanes |= revertLane);
            updateLane = update.action;
            shouldDoubleInvokeUserFnsInHooksDEV &&
              reducer(pendingQueue, updateLane);
            pendingQueue = update.hasEagerState
              ? update.eagerState
              : reducer(pendingQueue, updateLane);
          } else
            (revertLane = {
              lane: updateLane,
              revertLane: update.revertLane,
              action: update.action,
              hasEagerState: update.hasEagerState,
              eagerState: update.eagerState,
              next: null
            }),
              null === newBaseQueueLast
                ? ((newBaseQueueFirst = newBaseQueueLast = revertLane),
                  (baseFirst = pendingQueue))
                : (newBaseQueueLast = newBaseQueueLast.next = revertLane),
              (currentlyRenderingFiber$1.lanes |= updateLane),
              (workInProgressRootSkippedLanes |= updateLane);
          update = update.next;
        } while (null !== update && update !== current);
        null === newBaseQueueLast
          ? (baseFirst = pendingQueue)
          : (newBaseQueueLast.next = newBaseQueueFirst);
        if (
          !objectIs(pendingQueue, hook.memoizedState) &&
          ((didReceiveUpdate = !0),
          didReadFromEntangledAsyncAction &&
            ((reducer = currentEntangledActionThenable), null !== reducer))
        )
          throw reducer;
        hook.memoizedState = pendingQueue;
        hook.baseState = baseFirst;
        hook.baseQueue = newBaseQueueLast;
        queue.lastRenderedState = pendingQueue;
      }
      null === baseQueue && (queue.lanes = 0);
      return [hook.memoizedState, queue.dispatch];
    }
    function rerenderReducer(reducer) {
      var hook = updateWorkInProgressHook(),
        queue = hook.queue;
      if (null === queue)
        throw Error(
          "Should have a queue. You are likely calling Hooks conditionally, which is not allowed. (https://react.dev/link/invalid-hook-call)"
        );
      queue.lastRenderedReducer = reducer;
      var dispatch = queue.dispatch,
        lastRenderPhaseUpdate = queue.pending,
        newState = hook.memoizedState;
      if (null !== lastRenderPhaseUpdate) {
        queue.pending = null;
        var update = (lastRenderPhaseUpdate = lastRenderPhaseUpdate.next);
        do
          (newState = reducer(newState, update.action)), (update = update.next);
        while (update !== lastRenderPhaseUpdate);
        objectIs(newState, hook.memoizedState) || (didReceiveUpdate = !0);
        hook.memoizedState = newState;
        null === hook.baseQueue && (hook.baseState = newState);
        queue.lastRenderedState = newState;
      }
      return [newState, dispatch];
    }
    function mountSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
      var fiber = currentlyRenderingFiber$1,
        hook = mountWorkInProgressHook();
      if (isHydrating) {
        if (void 0 === getServerSnapshot)
          throw Error(
            "Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering."
          );
        var nextSnapshot = getServerSnapshot();
        didWarnUncachedGetSnapshot ||
          nextSnapshot === getServerSnapshot() ||
          (console.error(
            "The result of getServerSnapshot should be cached to avoid an infinite loop"
          ),
          (didWarnUncachedGetSnapshot = !0));
      } else {
        nextSnapshot = getSnapshot();
        didWarnUncachedGetSnapshot ||
          ((getServerSnapshot = getSnapshot()),
          objectIs(nextSnapshot, getServerSnapshot) ||
            (console.error(
              "The result of getSnapshot should be cached to avoid an infinite loop"
            ),
            (didWarnUncachedGetSnapshot = !0)));
        if (null === workInProgressRoot)
          throw Error(
            "Expected a work-in-progress root. This is a bug in React. Please file an issue."
          );
        0 !== (workInProgressRootRenderLanes & 60) ||
          pushStoreConsistencyCheck(fiber, getSnapshot, nextSnapshot);
      }
      hook.memoizedState = nextSnapshot;
      getServerSnapshot = { value: nextSnapshot, getSnapshot: getSnapshot };
      hook.queue = getServerSnapshot;
      mountEffect(
        subscribeToStore.bind(null, fiber, getServerSnapshot, subscribe),
        [subscribe]
      );
      fiber.flags |= 2048;
      pushSimpleEffect(
        HasEffect | Passive,
        createEffectInstance(),
        updateStoreInstance.bind(
          null,
          fiber,
          getServerSnapshot,
          nextSnapshot,
          getSnapshot
        ),
        null
      );
      return nextSnapshot;
    }
    function updateSyncExternalStore(
      subscribe,
      getSnapshot,
      getServerSnapshot
    ) {
      var fiber = currentlyRenderingFiber$1,
        hook = updateWorkInProgressHook(),
        isHydrating$jscomp$0 = isHydrating;
      if (isHydrating$jscomp$0) {
        if (void 0 === getServerSnapshot)
          throw Error(
            "Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering."
          );
        getServerSnapshot = getServerSnapshot();
      } else if (
        ((getServerSnapshot = getSnapshot()), !didWarnUncachedGetSnapshot)
      ) {
        var cachedSnapshot = getSnapshot();
        objectIs(getServerSnapshot, cachedSnapshot) ||
          (console.error(
            "The result of getSnapshot should be cached to avoid an infinite loop"
          ),
          (didWarnUncachedGetSnapshot = !0));
      }
      if (
        (cachedSnapshot = !objectIs(
          (currentHook || hook).memoizedState,
          getServerSnapshot
        ))
      )
        (hook.memoizedState = getServerSnapshot), (didReceiveUpdate = !0);
      hook = hook.queue;
      var create = subscribeToStore.bind(null, fiber, hook, subscribe);
      updateEffectImpl(2048, Passive, create, [subscribe]);
      if (
        hook.getSnapshot !== getSnapshot ||
        cachedSnapshot ||
        (null !== workInProgressHook &&
          workInProgressHook.memoizedState.tag & HasEffect)
      ) {
        fiber.flags |= 2048;
        pushSimpleEffect(
          HasEffect | Passive,
          createEffectInstance(),
          updateStoreInstance.bind(
            null,
            fiber,
            hook,
            getServerSnapshot,
            getSnapshot
          ),
          null
        );
        if (null === workInProgressRoot)
          throw Error(
            "Expected a work-in-progress root. This is a bug in React. Please file an issue."
          );
        isHydrating$jscomp$0 ||
          0 !== (renderLanes & 60) ||
          pushStoreConsistencyCheck(fiber, getSnapshot, getServerSnapshot);
      }
      return getServerSnapshot;
    }
    function pushStoreConsistencyCheck(fiber, getSnapshot, renderedSnapshot) {
      fiber.flags |= 16384;
      fiber = { getSnapshot: getSnapshot, value: renderedSnapshot };
      getSnapshot = currentlyRenderingFiber$1.updateQueue;
      null === getSnapshot
        ? ((getSnapshot = createFunctionComponentUpdateQueue()),
          (currentlyRenderingFiber$1.updateQueue = getSnapshot),
          (getSnapshot.stores = [fiber]))
        : ((renderedSnapshot = getSnapshot.stores),
          null === renderedSnapshot
            ? (getSnapshot.stores = [fiber])
            : renderedSnapshot.push(fiber));
    }
    function updateStoreInstance(fiber, inst, nextSnapshot, getSnapshot) {
      inst.value = nextSnapshot;
      inst.getSnapshot = getSnapshot;
      checkIfSnapshotChanged(inst) && forceStoreRerender(fiber);
    }
    function subscribeToStore(fiber, inst, subscribe) {
      return subscribe(function () {
        checkIfSnapshotChanged(inst) && forceStoreRerender(fiber);
      });
    }
    function checkIfSnapshotChanged(inst) {
      var latestGetSnapshot = inst.getSnapshot;
      inst = inst.value;
      try {
        var nextValue = latestGetSnapshot();
        return !objectIs(inst, nextValue);
      } catch (error) {
        return !0;
      }
    }
    function forceStoreRerender(fiber) {
      var root = enqueueConcurrentRenderForLane(fiber, 2);
      null !== root && scheduleUpdateOnFiber(root, fiber, 2);
    }
    function mountStateImpl(initialState) {
      var hook = mountWorkInProgressHook();
      if ("function" === typeof initialState) {
        var initialStateInitializer = initialState;
        initialState = initialStateInitializer();
        if (shouldDoubleInvokeUserFnsInHooksDEV) {
          setIsStrictModeForDevtools(!0);
          try {
            initialStateInitializer();
          } finally {
            setIsStrictModeForDevtools(!1);
          }
        }
      }
      hook.memoizedState = hook.baseState = initialState;
      hook.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: basicStateReducer,
        lastRenderedState: initialState
      };
      return hook;
    }
    function mountState(initialState) {
      initialState = mountStateImpl(initialState);
      var queue = initialState.queue,
        dispatch = dispatchSetState.bind(
          null,
          currentlyRenderingFiber$1,
          queue
        );
      queue.dispatch = dispatch;
      return [initialState.memoizedState, dispatch];
    }
    function mountOptimistic(passthrough) {
      var hook = mountWorkInProgressHook();
      hook.memoizedState = hook.baseState = passthrough;
      var queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      hook.queue = queue;
      hook = dispatchOptimisticSetState.bind(
        null,
        currentlyRenderingFiber$1,
        !0,
        queue
      );
      queue.dispatch = hook;
      return [passthrough, hook];
    }
    function updateOptimistic(passthrough, reducer) {
      var hook = updateWorkInProgressHook();
      return updateOptimisticImpl(hook, currentHook, passthrough, reducer);
    }
    function updateOptimisticImpl(hook, current, passthrough, reducer) {
      hook.baseState = passthrough;
      return updateReducerImpl(
        hook,
        currentHook,
        "function" === typeof reducer ? reducer : basicStateReducer
      );
    }
    function rerenderOptimistic(passthrough, reducer) {
      var hook = updateWorkInProgressHook();
      if (null !== currentHook)
        return updateOptimisticImpl(hook, currentHook, passthrough, reducer);
      hook.baseState = passthrough;
      return [passthrough, hook.queue.dispatch];
    }
    function dispatchActionState(
      fiber,
      actionQueue,
      setPendingState,
      setState,
      payload
    ) {
      if (isRenderPhaseUpdate(fiber))
        throw Error("Cannot update form state while rendering.");
      fiber = actionQueue.action;
      if (null !== fiber) {
        var actionNode = {
          payload: payload,
          action: fiber,
          next: null,
          isTransition: !0,
          status: "pending",
          value: null,
          reason: null,
          listeners: [],
          then: function (listener) {
            actionNode.listeners.push(listener);
          }
        };
        null !== ReactSharedInternals.T
          ? setPendingState(!0)
          : (actionNode.isTransition = !1);
        setState(actionNode);
        setPendingState = actionQueue.pending;
        null === setPendingState
          ? ((actionNode.next = actionQueue.pending = actionNode),
            runActionStateAction(actionQueue, actionNode))
          : ((actionNode.next = setPendingState.next),
            (actionQueue.pending = setPendingState.next = actionNode));
      }
    }
    function runActionStateAction(actionQueue, node) {
      var action = node.action,
        payload = node.payload,
        prevState = actionQueue.state;
      if (node.isTransition) {
        var prevTransition = ReactSharedInternals.T,
          currentTransition = {};
        ReactSharedInternals.T = currentTransition;
        ReactSharedInternals.T._updatedFibers = new Set();
        try {
          var returnValue = action(prevState, payload),
            onStartTransitionFinish = ReactSharedInternals.S;
          null !== onStartTransitionFinish &&
            onStartTransitionFinish(currentTransition, returnValue);
          handleActionReturnValue(actionQueue, node, returnValue);
        } catch (error) {
          onActionError(actionQueue, node, error);
        } finally {
          (ReactSharedInternals.T = prevTransition),
            null === prevTransition &&
              currentTransition._updatedFibers &&
              ((actionQueue = currentTransition._updatedFibers.size),
              currentTransition._updatedFibers.clear(),
              10 < actionQueue &&
                console.warn(
                  "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
                ));
        }
      } else
        try {
          (currentTransition = action(prevState, payload)),
            handleActionReturnValue(actionQueue, node, currentTransition);
        } catch (error$3) {
          onActionError(actionQueue, node, error$3);
        }
    }
    function handleActionReturnValue(actionQueue, node, returnValue) {
      null !== returnValue &&
      "object" === typeof returnValue &&
      "function" === typeof returnValue.then
        ? (returnValue.then(
            function (nextState) {
              onActionSuccess(actionQueue, node, nextState);
            },
            function (error) {
              return onActionError(actionQueue, node, error);
            }
          ),
          node.isTransition ||
            console.error(
              "An async function was passed to useActionState, but it was dispatched outside of an action context. This is likely not what you intended. Either pass the dispatch function to an `action` prop, or dispatch manually inside `startTransition`"
            ))
        : onActionSuccess(actionQueue, node, returnValue);
    }
    function onActionSuccess(actionQueue, actionNode, nextState) {
      actionNode.status = "fulfilled";
      actionNode.value = nextState;
      notifyActionListeners(actionNode);
      actionQueue.state = nextState;
      actionNode = actionQueue.pending;
      null !== actionNode &&
        ((nextState = actionNode.next),
        nextState === actionNode
          ? (actionQueue.pending = null)
          : ((nextState = nextState.next),
            (actionNode.next = nextState),
            runActionStateAction(actionQueue, nextState)));
    }
    function onActionError(actionQueue, actionNode, error) {
      var last = actionQueue.pending;
      actionQueue.pending = null;
      if (null !== last) {
        last = last.next;
        do
          (actionNode.status = "rejected"),
            (actionNode.reason = error),
            notifyActionListeners(actionNode),
            (actionNode = actionNode.next);
        while (actionNode !== last);
      }
      actionQueue.action = null;
    }
    function notifyActionListeners(actionNode) {
      actionNode = actionNode.listeners;
      for (var i = 0; i < actionNode.length; i++) (0, actionNode[i])();
    }
    function actionStateReducer(oldState, newState) {
      return newState;
    }
    function mountActionState(action, initialStateProp) {
      if (isHydrating) {
        var ssrFormState = workInProgressRoot.formState;
        if (null !== ssrFormState) {
          a: {
            var isMatching = currentlyRenderingFiber$1;
            if (isHydrating) {
              if (nextHydratableInstance) {
                b: {
                  var markerInstance = nextHydratableInstance;
                  for (
                    var inRootOrSingleton = rootOrSingletonContext;
                    8 !== markerInstance.nodeType;

                  ) {
                    if (!inRootOrSingleton) {
                      markerInstance = null;
                      break b;
                    }
                    markerInstance = getNextHydratable(
                      markerInstance.nextSibling
                    );
                    if (null === markerInstance) {
                      markerInstance = null;
                      break b;
                    }
                  }
                  inRootOrSingleton = markerInstance.data;
                  markerInstance =
                    inRootOrSingleton === FORM_STATE_IS_MATCHING ||
                    inRootOrSingleton === FORM_STATE_IS_NOT_MATCHING
                      ? markerInstance
                      : null;
                }
                if (markerInstance) {
                  nextHydratableInstance = getNextHydratable(
                    markerInstance.nextSibling
                  );
                  isMatching = markerInstance.data === FORM_STATE_IS_MATCHING;
                  break a;
                }
              }
              throwOnHydrationMismatch(isMatching);
            }
            isMatching = !1;
          }
          isMatching && (initialStateProp = ssrFormState[0]);
        }
      }
      ssrFormState = mountWorkInProgressHook();
      ssrFormState.memoizedState = ssrFormState.baseState = initialStateProp;
      isMatching = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: actionStateReducer,
        lastRenderedState: initialStateProp
      };
      ssrFormState.queue = isMatching;
      ssrFormState = dispatchSetState.bind(
        null,
        currentlyRenderingFiber$1,
        isMatching
      );
      isMatching.dispatch = ssrFormState;
      isMatching = mountStateImpl(!1);
      inRootOrSingleton = dispatchOptimisticSetState.bind(
        null,
        currentlyRenderingFiber$1,
        !1,
        isMatching.queue
      );
      isMatching = mountWorkInProgressHook();
      markerInstance = {
        state: initialStateProp,
        dispatch: null,
        action: action,
        pending: null
      };
      isMatching.queue = markerInstance;
      ssrFormState = dispatchActionState.bind(
        null,
        currentlyRenderingFiber$1,
        markerInstance,
        inRootOrSingleton,
        ssrFormState
      );
      markerInstance.dispatch = ssrFormState;
      isMatching.memoizedState = action;
      return [initialStateProp, ssrFormState, !1];
    }
    function updateActionState(action) {
      var stateHook = updateWorkInProgressHook();
      return updateActionStateImpl(stateHook, currentHook, action);
    }
    function updateActionStateImpl(stateHook, currentStateHook, action) {
      currentStateHook = updateReducerImpl(
        stateHook,
        currentStateHook,
        actionStateReducer
      )[0];
      stateHook = updateReducer(basicStateReducer)[0];
      if (
        "object" === typeof currentStateHook &&
        null !== currentStateHook &&
        "function" === typeof currentStateHook.then
      )
        try {
          var state = useThenable(currentStateHook);
        } catch (x) {
          if (x === SuspenseException) throw SuspenseActionException;
          throw x;
        }
      else state = currentStateHook;
      currentStateHook = updateWorkInProgressHook();
      var actionQueue = currentStateHook.queue,
        dispatch = actionQueue.dispatch;
      action !== currentStateHook.memoizedState &&
        ((currentlyRenderingFiber$1.flags |= 2048),
        pushSimpleEffect(
          HasEffect | Passive,
          createEffectInstance(),
          actionStateActionEffect.bind(null, actionQueue, action),
          null
        ));
      return [state, dispatch, stateHook];
    }
    function actionStateActionEffect(actionQueue, action) {
      actionQueue.action = action;
    }
    function rerenderActionState(action) {
      var stateHook = updateWorkInProgressHook(),
        currentStateHook = currentHook;
      if (null !== currentStateHook)
        return updateActionStateImpl(stateHook, currentStateHook, action);
      updateWorkInProgressHook();
      stateHook = stateHook.memoizedState;
      currentStateHook = updateWorkInProgressHook();
      var dispatch = currentStateHook.queue.dispatch;
      currentStateHook.memoizedState = action;
      return [stateHook, dispatch, !1];
    }
    function pushSimpleEffect(tag, inst, create, deps) {
      tag = { tag: tag, create: create, deps: deps, inst: inst, next: null };
      inst = currentlyRenderingFiber$1.updateQueue;
      null === inst &&
        ((inst = createFunctionComponentUpdateQueue()),
        (currentlyRenderingFiber$1.updateQueue = inst));
      create = inst.lastEffect;
      null === create
        ? (inst.lastEffect = tag.next = tag)
        : ((deps = create.next),
          (create.next = tag),
          (tag.next = deps),
          (inst.lastEffect = tag));
      return tag;
    }
    function createEffectInstance() {
      return { destroy: void 0, resource: void 0 };
    }
    function mountRef(initialValue) {
      var hook = mountWorkInProgressHook();
      initialValue = { current: initialValue };
      return (hook.memoizedState = initialValue);
    }
    function mountEffectImpl(fiberFlags, hookFlags, create, deps) {
      var hook = mountWorkInProgressHook();
      deps = void 0 === deps ? null : deps;
      currentlyRenderingFiber$1.flags |= fiberFlags;
      hook.memoizedState = pushSimpleEffect(
        HasEffect | hookFlags,
        createEffectInstance(),
        create,
        deps
      );
    }
    function updateEffectImpl(fiberFlags, hookFlags, create, deps) {
      var hook = updateWorkInProgressHook();
      deps = void 0 === deps ? null : deps;
      var inst = hook.memoizedState.inst;
      null !== currentHook &&
      null !== deps &&
      areHookInputsEqual(deps, currentHook.memoizedState.deps)
        ? (hook.memoizedState = pushSimpleEffect(hookFlags, inst, create, deps))
        : ((currentlyRenderingFiber$1.flags |= fiberFlags),
          (hook.memoizedState = pushSimpleEffect(
            HasEffect | hookFlags,
            inst,
            create,
            deps
          )));
    }
    function mountEffect(create, deps) {
      (currentlyRenderingFiber$1.mode & StrictEffectsMode) !== NoMode &&
      (currentlyRenderingFiber$1.mode & NoStrictPassiveEffectsMode) === NoMode
        ? mountEffectImpl(142608384, Passive, create, deps)
        : mountEffectImpl(8390656, Passive, create, deps);
    }
    function mountLayoutEffect(create, deps) {
      var fiberFlags = 4194308;
      (currentlyRenderingFiber$1.mode & StrictEffectsMode) !== NoMode &&
        (fiberFlags |= 67108864);
      return mountEffectImpl(fiberFlags, Layout, create, deps);
    }
    function imperativeHandleEffect(create, ref) {
      if ("function" === typeof ref) {
        create = create();
        var refCleanup = ref(create);
        return function () {
          "function" === typeof refCleanup ? refCleanup() : ref(null);
        };
      }
      if (null !== ref && void 0 !== ref)
        return (
          ref.hasOwnProperty("current") ||
            console.error(
              "Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.",
              "an object with keys {" + Object.keys(ref).join(", ") + "}"
            ),
          (create = create()),
          (ref.current = create),
          function () {
            ref.current = null;
          }
        );
    }
    function mountImperativeHandle(ref, create, deps) {
      "function" !== typeof create &&
        console.error(
          "Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.",
          null !== create ? typeof create : "null"
        );
      deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
      var fiberFlags = 4194308;
      (currentlyRenderingFiber$1.mode & StrictEffectsMode) !== NoMode &&
        (fiberFlags |= 67108864);
      mountEffectImpl(
        fiberFlags,
        Layout,
        imperativeHandleEffect.bind(null, create, ref),
        deps
      );
    }
    function updateImperativeHandle(ref, create, deps) {
      "function" !== typeof create &&
        console.error(
          "Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.",
          null !== create ? typeof create : "null"
        );
      deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
      updateEffectImpl(
        4,
        Layout,
        imperativeHandleEffect.bind(null, create, ref),
        deps
      );
    }
    function mountCallback(callback, deps) {
      mountWorkInProgressHook().memoizedState = [
        callback,
        void 0 === deps ? null : deps
      ];
      return callback;
    }
    function updateCallback(callback, deps) {
      var hook = updateWorkInProgressHook();
      deps = void 0 === deps ? null : deps;
      var prevState = hook.memoizedState;
      if (null !== deps && areHookInputsEqual(deps, prevState[1]))
        return prevState[0];
      hook.memoizedState = [callback, deps];
      return callback;
    }
    function mountMemo(nextCreate, deps) {
      var hook = mountWorkInProgressHook();
      deps = void 0 === deps ? null : deps;
      var nextValue = nextCreate();
      if (shouldDoubleInvokeUserFnsInHooksDEV) {
        setIsStrictModeForDevtools(!0);
        try {
          nextCreate();
        } finally {
          setIsStrictModeForDevtools(!1);
        }
      }
      hook.memoizedState = [nextValue, deps];
      return nextValue;
    }
    function updateMemo(nextCreate, deps) {
      var hook = updateWorkInProgressHook();
      deps = void 0 === deps ? null : deps;
      var prevState = hook.memoizedState;
      if (null !== deps && areHookInputsEqual(deps, prevState[1]))
        return prevState[0];
      prevState = nextCreate();
      if (shouldDoubleInvokeUserFnsInHooksDEV) {
        setIsStrictModeForDevtools(!0);
        try {
          nextCreate();
        } finally {
          setIsStrictModeForDevtools(!1);
        }
      }
      hook.memoizedState = [prevState, deps];
      return prevState;
    }
    function mountDeferredValue(value, initialValue) {
      var hook = mountWorkInProgressHook();
      return mountDeferredValueImpl(hook, value, initialValue);
    }
    function updateDeferredValue(value, initialValue) {
      var hook = updateWorkInProgressHook();
      return updateDeferredValueImpl(
        hook,
        currentHook.memoizedState,
        value,
        initialValue
      );
    }
    function rerenderDeferredValue(value, initialValue) {
      var hook = updateWorkInProgressHook();
      return null === currentHook
        ? mountDeferredValueImpl(hook, value, initialValue)
        : updateDeferredValueImpl(
            hook,
            currentHook.memoizedState,
            value,
            initialValue
          );
    }
    function mountDeferredValueImpl(hook, value, initialValue) {
      if (void 0 === initialValue || 0 !== (renderLanes & 1073741824))
        return (hook.memoizedState = value);
      hook.memoizedState = initialValue;
      hook = requestDeferredLane();
      currentlyRenderingFiber$1.lanes |= hook;
      workInProgressRootSkippedLanes |= hook;
      return initialValue;
    }
    function updateDeferredValueImpl(hook, prevValue, value, initialValue) {
      if (objectIs(value, prevValue)) return value;
      if (null !== currentTreeHiddenStackCursor.current)
        return (
          (hook = mountDeferredValueImpl(hook, value, initialValue)),
          objectIs(hook, prevValue) || (didReceiveUpdate = !0),
          hook
        );
      if (0 === (renderLanes & 42))
        return (didReceiveUpdate = !0), (hook.memoizedState = value);
      hook = requestDeferredLane();
      currentlyRenderingFiber$1.lanes |= hook;
      workInProgressRootSkippedLanes |= hook;
      return prevValue;
    }
    function startTransition(
      fiber,
      queue,
      pendingState,
      finishedState,
      callback
    ) {
      var previousPriority = ReactDOMSharedInternals.p;
      ReactDOMSharedInternals.p =
        0 !== previousPriority && previousPriority < ContinuousEventPriority
          ? previousPriority
          : ContinuousEventPriority;
      var prevTransition = ReactSharedInternals.T,
        currentTransition = {};
      ReactSharedInternals.T = currentTransition;
      dispatchOptimisticSetState(fiber, !1, queue, pendingState);
      currentTransition._updatedFibers = new Set();
      try {
        var returnValue = callback(),
          onStartTransitionFinish = ReactSharedInternals.S;
        null !== onStartTransitionFinish &&
          onStartTransitionFinish(currentTransition, returnValue);
        if (
          null !== returnValue &&
          "object" === typeof returnValue &&
          "function" === typeof returnValue.then
        ) {
          var thenableForFinishedState = chainThenableValue(
            returnValue,
            finishedState
          );
          dispatchSetStateInternal(
            fiber,
            queue,
            thenableForFinishedState,
            requestUpdateLane(fiber)
          );
        } else
          dispatchSetStateInternal(
            fiber,
            queue,
            finishedState,
            requestUpdateLane(fiber)
          );
      } catch (error) {
        dispatchSetStateInternal(
          fiber,
          queue,
          { then: function () {}, status: "rejected", reason: error },
          requestUpdateLane(fiber)
        );
      } finally {
        (ReactDOMSharedInternals.p = previousPriority),
          (ReactSharedInternals.T = prevTransition),
          null === prevTransition &&
            currentTransition._updatedFibers &&
            ((fiber = currentTransition._updatedFibers.size),
            currentTransition._updatedFibers.clear(),
            10 < fiber &&
              console.warn(
                "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
              ));
      }
    }
    function startHostTransition(formFiber, pendingState, action, formData) {
      if (5 !== formFiber.tag)
        throw Error(
          "Expected the form instance to be a HostComponent. This is a bug in React."
        );
      var queue = ensureFormComponentIsStateful(formFiber).queue;
      startTransition(
        formFiber,
        queue,
        pendingState,
        NotPendingTransition,
        null === action
          ? noop$3
          : function () {
              requestFormReset$2(formFiber);
              return action(formData);
            }
      );
    }
    function ensureFormComponentIsStateful(formFiber) {
      var existingStateHook = formFiber.memoizedState;
      if (null !== existingStateHook) return existingStateHook;
      existingStateHook = {
        memoizedState: NotPendingTransition,
        baseState: NotPendingTransition,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: basicStateReducer,
          lastRenderedState: NotPendingTransition
        },
        next: null
      };
      var initialResetState = {};
      existingStateHook.next = {
        memoizedState: initialResetState,
        baseState: initialResetState,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: basicStateReducer,
          lastRenderedState: initialResetState
        },
        next: null
      };
      formFiber.memoizedState = existingStateHook;
      formFiber = formFiber.alternate;
      null !== formFiber && (formFiber.memoizedState = existingStateHook);
      return existingStateHook;
    }
    function requestFormReset$2(formFiber) {
      null === ReactSharedInternals.T &&
        console.error(
          "requestFormReset was called outside a transition or action. To fix, move to an action, or wrap with startTransition."
        );
      var resetStateQueue = ensureFormComponentIsStateful(formFiber).next.queue;
      dispatchSetStateInternal(
        formFiber,
        resetStateQueue,
        {},
        requestUpdateLane(formFiber)
      );
    }
    function mountTransition() {
      var stateHook = mountStateImpl(!1);
      stateHook = startTransition.bind(
        null,
        currentlyRenderingFiber$1,
        stateHook.queue,
        !0,
        !1
      );
      mountWorkInProgressHook().memoizedState = stateHook;
      return [!1, stateHook];
    }
    function updateTransition() {
      var booleanOrThenable = updateReducer(basicStateReducer)[0],
        start = updateWorkInProgressHook().memoizedState;
      return [
        "boolean" === typeof booleanOrThenable
          ? booleanOrThenable
          : useThenable(booleanOrThenable),
        start
      ];
    }
    function rerenderTransition() {
      var booleanOrThenable = rerenderReducer(basicStateReducer)[0],
        start = updateWorkInProgressHook().memoizedState;
      return [
        "boolean" === typeof booleanOrThenable
          ? booleanOrThenable
          : useThenable(booleanOrThenable),
        start
      ];
    }
    function useHostTransitionStatus() {
      return readContext(HostTransitionContext);
    }
    function mountId() {
      var hook = mountWorkInProgressHook(),
        identifierPrefix = workInProgressRoot.identifierPrefix;
      if (isHydrating) {
        var treeId = treeContextOverflow;
        var idWithLeadingBit = treeContextId;
        treeId =
          (
            idWithLeadingBit & ~(1 << (32 - clz32(idWithLeadingBit) - 1))
          ).toString(32) + treeId;
        identifierPrefix = ":" + identifierPrefix + "R" + treeId;
        treeId = localIdCounter++;
        0 < treeId && (identifierPrefix += "H" + treeId.toString(32));
        identifierPrefix += ":";
      } else
        (treeId = globalClientIdCounter++),
          (identifierPrefix =
            ":" + identifierPrefix + "r" + treeId.toString(32) + ":");
      return (hook.memoizedState = identifierPrefix);
    }
    function mountRefresh() {
      return (mountWorkInProgressHook().memoizedState = refreshCache.bind(
        null,
        currentlyRenderingFiber$1
      ));
    }
    function refreshCache(fiber, seedKey) {
      for (var provider = fiber.return; null !== provider; ) {
        switch (provider.tag) {
          case 24:
          case 3:
            var lane = requestUpdateLane(provider);
            fiber = createUpdate(lane);
            var root = enqueueUpdate(provider, fiber, lane);
            null !== root &&
              (scheduleUpdateOnFiber(root, provider, lane),
              entangleTransitions(root, provider, lane));
            provider = createCache();
            null !== seedKey &&
              void 0 !== seedKey &&
              null !== root &&
              console.error(
                "The seed argument is not enabled outside experimental channels."
              );
            fiber.payload = { cache: provider };
            return;
        }
        provider = provider.return;
      }
    }
    function dispatchReducerAction(
      fiber,
      queue,
      action,
      JSCompiler_OptimizeArgumentsArray_p0
    ) {
      "function" === typeof JSCompiler_OptimizeArgumentsArray_p0 &&
        console.error(
          "State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()."
        );
      JSCompiler_OptimizeArgumentsArray_p0 = requestUpdateLane(fiber);
      action = {
        lane: JSCompiler_OptimizeArgumentsArray_p0,
        revertLane: 0,
        action: action,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      isRenderPhaseUpdate(fiber)
        ? enqueueRenderPhaseUpdate(queue, action)
        : ((action = enqueueConcurrentHookUpdate(
            fiber,
            queue,
            action,
            JSCompiler_OptimizeArgumentsArray_p0
          )),
          null !== action &&
            (scheduleUpdateOnFiber(
              action,
              fiber,
              JSCompiler_OptimizeArgumentsArray_p0
            ),
            entangleTransitionUpdate(
              action,
              queue,
              JSCompiler_OptimizeArgumentsArray_p0
            )));
      markStateUpdateScheduled(fiber, JSCompiler_OptimizeArgumentsArray_p0);
    }
    function dispatchSetState(
      fiber,
      queue,
      action,
      JSCompiler_OptimizeArgumentsArray_p1
    ) {
      "function" === typeof JSCompiler_OptimizeArgumentsArray_p1 &&
        console.error(
          "State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()."
        );
      JSCompiler_OptimizeArgumentsArray_p1 = requestUpdateLane(fiber);
      dispatchSetStateInternal(
        fiber,
        queue,
        action,
        JSCompiler_OptimizeArgumentsArray_p1
      );
      markStateUpdateScheduled(fiber, JSCompiler_OptimizeArgumentsArray_p1);
    }
    function dispatchSetStateInternal(fiber, queue, action, lane) {
      var update = {
        lane: lane,
        revertLane: 0,
        action: action,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (isRenderPhaseUpdate(fiber)) enqueueRenderPhaseUpdate(queue, update);
      else {
        var alternate = fiber.alternate;
        if (
          0 === fiber.lanes &&
          (null === alternate || 0 === alternate.lanes) &&
          ((alternate = queue.lastRenderedReducer), null !== alternate)
        ) {
          var prevDispatcher = ReactSharedInternals.H;
          ReactSharedInternals.H = InvalidNestedHooksDispatcherOnUpdateInDEV;
          try {
            var currentState = queue.lastRenderedState,
              eagerState = alternate(currentState, action);
            update.hasEagerState = !0;
            update.eagerState = eagerState;
            if (objectIs(eagerState, currentState))
              return (
                enqueueUpdate$1(fiber, queue, update, 0),
                null === workInProgressRoot &&
                  finishQueueingConcurrentUpdates(),
                !1
              );
          } catch (error) {
          } finally {
            ReactSharedInternals.H = prevDispatcher;
          }
        }
        action = enqueueConcurrentHookUpdate(fiber, queue, update, lane);
        if (null !== action)
          return (
            scheduleUpdateOnFiber(action, fiber, lane),
            entangleTransitionUpdate(action, queue, lane),
            !0
          );
      }
      return !1;
    }
    function dispatchOptimisticSetState(
      fiber,
      throwIfDuringRender,
      queue,
      action
    ) {
      null === ReactSharedInternals.T &&
        0 === currentEntangledLane &&
        console.error(
          "An optimistic state update occurred outside a transition or action. To fix, move the update to an action, or wrap with startTransition."
        );
      action = {
        lane: 2,
        revertLane: requestTransitionLane(),
        action: action,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (isRenderPhaseUpdate(fiber)) {
        if (throwIfDuringRender)
          throw Error("Cannot update optimistic state while rendering.");
        console.error("Cannot call startTransition while rendering.");
      } else
        (throwIfDuringRender = enqueueConcurrentHookUpdate(
          fiber,
          queue,
          action,
          2
        )),
          null !== throwIfDuringRender &&
            scheduleUpdateOnFiber(throwIfDuringRender, fiber, 2);
      markStateUpdateScheduled(fiber, 2);
    }
    function isRenderPhaseUpdate(fiber) {
      var alternate = fiber.alternate;
      return (
        fiber === currentlyRenderingFiber$1 ||
        (null !== alternate && alternate === currentlyRenderingFiber$1)
      );
    }
    function enqueueRenderPhaseUpdate(queue, update) {
      didScheduleRenderPhaseUpdateDuringThisPass =
        didScheduleRenderPhaseUpdate = !0;
      var pending = queue.pending;
      null === pending
        ? (update.next = update)
        : ((update.next = pending.next), (pending.next = update));
      queue.pending = update;
    }
    function entangleTransitionUpdate(root, queue, lane) {
      if (0 !== (lane & 4194176)) {
        var queueLanes = queue.lanes;
        queueLanes &= root.pendingLanes;
        lane |= queueLanes;
        queue.lanes = lane;
        markRootEntangled(root, lane);
      }
    }
    function pushDebugInfo(debugInfo) {
      var previousDebugInfo = currentDebugInfo;
      null != debugInfo &&
        (currentDebugInfo =
          null === previousDebugInfo
            ? debugInfo
            : previousDebugInfo.concat(debugInfo));
      return previousDebugInfo;
    }
    function validateFragmentProps(element, fiber, returnFiber) {
      for (var keys = Object.keys(element.props), i = 0; i < keys.length; i++) {
        var key = keys[i];
        if ("children" !== key && "key" !== key) {
          null === fiber &&
            ((fiber = createFiberFromElement(element, returnFiber.mode, 0)),
            (fiber._debugInfo = currentDebugInfo),
            (fiber.return = returnFiber));
          runWithFiberInDEV(
            fiber,
            function (erroredKey) {
              console.error(
                "Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",
                erroredKey
              );
            },
            key
          );
          break;
        }
      }
    }
    function unwrapThenable(thenable) {
      var index = thenableIndexCounter;
      thenableIndexCounter += 1;
      null === thenableState && (thenableState = createThenableState());
      return trackUsedThenable(thenableState, thenable, index);
    }
    function coerceRef(workInProgress, element) {
      element = element.props.ref;
      workInProgress.ref = void 0 !== element ? element : null;
    }
    function throwOnInvalidObjectType(returnFiber, newChild) {
      if (newChild.$$typeof === REACT_LEGACY_ELEMENT_TYPE)
        throw Error(
          'A React Element from an older version of React was rendered. This is not supported. It can happen if:\n- Multiple copies of the "react" package is used.\n- A library pre-bundled an old copy of "react" or "react/jsx-runtime".\n- A compiler tries to "inline" JSX instead of using the runtime.'
        );
      returnFiber = Object.prototype.toString.call(newChild);
      throw Error(
        "Objects are not valid as a React child (found: " +
          ("[object Object]" === returnFiber
            ? "object with keys {" + Object.keys(newChild).join(", ") + "}"
            : returnFiber) +
          "). If you meant to render a collection of children, use an array instead."
      );
    }
    function warnOnFunctionType(returnFiber, invalidChild) {
      var parentName = getComponentNameFromFiber(returnFiber) || "Component";
      ownerHasFunctionTypeWarning[parentName] ||
        ((ownerHasFunctionTypeWarning[parentName] = !0),
        (invalidChild =
          invalidChild.displayName || invalidChild.name || "Component"),
        3 === returnFiber.tag
          ? console.error(
              "Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.\n  root.render(%s)",
              invalidChild,
              invalidChild,
              invalidChild
            )
          : console.error(
              "Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.\n  <%s>{%s}</%s>",
              invalidChild,
              invalidChild,
              parentName,
              invalidChild,
              parentName
            ));
    }
    function warnOnSymbolType(returnFiber, invalidChild) {
      var parentName = getComponentNameFromFiber(returnFiber) || "Component";
      ownerHasSymbolTypeWarning[parentName] ||
        ((ownerHasSymbolTypeWarning[parentName] = !0),
        (invalidChild = String(invalidChild)),
        3 === returnFiber.tag
          ? console.error(
              "Symbols are not valid as a React child.\n  root.render(%s)",
              invalidChild
            )
          : console.error(
              "Symbols are not valid as a React child.\n  <%s>%s</%s>",
              parentName,
              invalidChild,
              parentName
            ));
    }
    function createChildReconciler(shouldTrackSideEffects) {
      function deleteChild(returnFiber, childToDelete) {
        if (shouldTrackSideEffects) {
          var deletions = returnFiber.deletions;
          null === deletions
            ? ((returnFiber.deletions = [childToDelete]),
              (returnFiber.flags |= 16))
            : deletions.push(childToDelete);
        }
      }
      function deleteRemainingChildren(returnFiber, currentFirstChild) {
        if (!shouldTrackSideEffects) return null;
        for (; null !== currentFirstChild; )
          deleteChild(returnFiber, currentFirstChild),
            (currentFirstChild = currentFirstChild.sibling);
        return null;
      }
      function mapRemainingChildren(currentFirstChild) {
        for (var existingChildren = new Map(); null !== currentFirstChild; )
          null !== currentFirstChild.key
            ? existingChildren.set(currentFirstChild.key, currentFirstChild)
            : existingChildren.set(currentFirstChild.index, currentFirstChild),
            (currentFirstChild = currentFirstChild.sibling);
        return existingChildren;
      }
      function useFiber(fiber, pendingProps) {
        fiber = createWorkInProgress(fiber, pendingProps);
        fiber.index = 0;
        fiber.sibling = null;
        return fiber;
      }
      function placeChild(newFiber, lastPlacedIndex, newIndex) {
        newFiber.index = newIndex;
        if (!shouldTrackSideEffects)
          return (newFiber.flags |= 1048576), lastPlacedIndex;
        newIndex = newFiber.alternate;
        if (null !== newIndex)
          return (
            (newIndex = newIndex.index),
            newIndex < lastPlacedIndex
              ? ((newFiber.flags |= 33554434), lastPlacedIndex)
              : newIndex
          );
        newFiber.flags |= 33554434;
        return lastPlacedIndex;
      }
      function placeSingleChild(newFiber) {
        shouldTrackSideEffects &&
          null === newFiber.alternate &&
          (newFiber.flags |= 33554434);
        return newFiber;
      }
      function updateTextNode(returnFiber, current, textContent, lanes) {
        if (null === current || 6 !== current.tag)
          return (
            (current = createFiberFromText(
              textContent,
              returnFiber.mode,
              lanes
            )),
            (current.return = returnFiber),
            (current._debugOwner = returnFiber),
            (current._debugInfo = currentDebugInfo),
            current
          );
        current = useFiber(current, textContent);
        current.return = returnFiber;
        current._debugInfo = currentDebugInfo;
        return current;
      }
      function updateElement(returnFiber, current, element, lanes) {
        var elementType = element.type;
        if (elementType === REACT_FRAGMENT_TYPE)
          return (
            (current = updateFragment(
              returnFiber,
              current,
              element.props.children,
              lanes,
              element.key
            )),
            validateFragmentProps(element, current, returnFiber),
            current
          );
        if (
          null !== current &&
          (current.elementType === elementType ||
            isCompatibleFamilyForHotReloading(current, element) ||
            ("object" === typeof elementType &&
              null !== elementType &&
              elementType.$$typeof === REACT_LAZY_TYPE &&
              callLazyInitInDEV(elementType) === current.type))
        )
          return (
            (current = useFiber(current, element.props)),
            coerceRef(current, element),
            (current.return = returnFiber),
            (current._debugOwner = element._owner),
            (current._debugInfo = currentDebugInfo),
            current
          );
        current = createFiberFromElement(element, returnFiber.mode, lanes);
        coerceRef(current, element);
        current.return = returnFiber;
        current._debugInfo = currentDebugInfo;
        return current;
      }
      function updatePortal(returnFiber, current, portal, lanes) {
        if (
          null === current ||
          4 !== current.tag ||
          current.stateNode.containerInfo !== portal.containerInfo ||
          current.stateNode.implementation !== portal.implementation
        )
          return (
            (current = createFiberFromPortal(portal, returnFiber.mode, lanes)),
            (current.return = returnFiber),
            (current._debugInfo = currentDebugInfo),
            current
          );
        current = useFiber(current, portal.children || []);
        current.return = returnFiber;
        current._debugInfo = currentDebugInfo;
        return current;
      }
      function updateFragment(returnFiber, current, fragment, lanes, key) {
        if (null === current || 7 !== current.tag)
          return (
            (current = createFiberFromFragment(
              fragment,
              returnFiber.mode,
              lanes,
              key
            )),
            (current.return = returnFiber),
            (current._debugOwner = returnFiber),
            (current._debugInfo = currentDebugInfo),
            current
          );
        current = useFiber(current, fragment);
        current.return = returnFiber;
        current._debugInfo = currentDebugInfo;
        return current;
      }
      function createChild(returnFiber, newChild, lanes) {
        if (
          ("string" === typeof newChild && "" !== newChild) ||
          "number" === typeof newChild ||
          "bigint" === typeof newChild
        )
          return (
            (newChild = createFiberFromText(
              "" + newChild,
              returnFiber.mode,
              lanes
            )),
            (newChild.return = returnFiber),
            (newChild._debugOwner = returnFiber),
            (newChild._debugInfo = currentDebugInfo),
            newChild
          );
        if ("object" === typeof newChild && null !== newChild) {
          switch (newChild.$$typeof) {
            case REACT_ELEMENT_TYPE:
              return (
                (lanes = createFiberFromElement(
                  newChild,
                  returnFiber.mode,
                  lanes
                )),
                coerceRef(lanes, newChild),
                (lanes.return = returnFiber),
                (returnFiber = pushDebugInfo(newChild._debugInfo)),
                (lanes._debugInfo = currentDebugInfo),
                (currentDebugInfo = returnFiber),
                lanes
              );
            case REACT_PORTAL_TYPE:
              return (
                (newChild = createFiberFromPortal(
                  newChild,
                  returnFiber.mode,
                  lanes
                )),
                (newChild.return = returnFiber),
                (newChild._debugInfo = currentDebugInfo),
                newChild
              );
            case REACT_LAZY_TYPE:
              var _prevDebugInfo = pushDebugInfo(newChild._debugInfo);
              newChild = callLazyInitInDEV(newChild);
              returnFiber = createChild(returnFiber, newChild, lanes);
              currentDebugInfo = _prevDebugInfo;
              return returnFiber;
          }
          if (isArrayImpl(newChild) || getIteratorFn(newChild))
            return (
              (lanes = createFiberFromFragment(
                newChild,
                returnFiber.mode,
                lanes,
                null
              )),
              (lanes.return = returnFiber),
              (lanes._debugOwner = returnFiber),
              (returnFiber = pushDebugInfo(newChild._debugInfo)),
              (lanes._debugInfo = currentDebugInfo),
              (currentDebugInfo = returnFiber),
              lanes
            );
          if ("function" === typeof newChild.then)
            return (
              (_prevDebugInfo = pushDebugInfo(newChild._debugInfo)),
              (returnFiber = createChild(
                returnFiber,
                unwrapThenable(newChild),
                lanes
              )),
              (currentDebugInfo = _prevDebugInfo),
              returnFiber
            );
          if (newChild.$$typeof === REACT_CONTEXT_TYPE)
            return createChild(
              returnFiber,
              readContextDuringReconciliation(returnFiber, newChild),
              lanes
            );
          throwOnInvalidObjectType(returnFiber, newChild);
        }
        "function" === typeof newChild &&
          warnOnFunctionType(returnFiber, newChild);
        "symbol" === typeof newChild && warnOnSymbolType(returnFiber, newChild);
        return null;
      }
      function updateSlot(returnFiber, oldFiber, newChild, lanes) {
        var key = null !== oldFiber ? oldFiber.key : null;
        if (
          ("string" === typeof newChild && "" !== newChild) ||
          "number" === typeof newChild ||
          "bigint" === typeof newChild
        )
          return null !== key
            ? null
            : updateTextNode(returnFiber, oldFiber, "" + newChild, lanes);
        if ("object" === typeof newChild && null !== newChild) {
          switch (newChild.$$typeof) {
            case REACT_ELEMENT_TYPE:
              return newChild.key === key
                ? ((key = pushDebugInfo(newChild._debugInfo)),
                  (returnFiber = updateElement(
                    returnFiber,
                    oldFiber,
                    newChild,
                    lanes
                  )),
                  (currentDebugInfo = key),
                  returnFiber)
                : null;
            case REACT_PORTAL_TYPE:
              return newChild.key === key
                ? updatePortal(returnFiber, oldFiber, newChild, lanes)
                : null;
            case REACT_LAZY_TYPE:
              return (
                (key = pushDebugInfo(newChild._debugInfo)),
                (newChild = callLazyInitInDEV(newChild)),
                (returnFiber = updateSlot(
                  returnFiber,
                  oldFiber,
                  newChild,
                  lanes
                )),
                (currentDebugInfo = key),
                returnFiber
              );
          }
          if (isArrayImpl(newChild) || getIteratorFn(newChild)) {
            if (null !== key) return null;
            key = pushDebugInfo(newChild._debugInfo);
            returnFiber = updateFragment(
              returnFiber,
              oldFiber,
              newChild,
              lanes,
              null
            );
            currentDebugInfo = key;
            return returnFiber;
          }
          if ("function" === typeof newChild.then)
            return (
              (key = pushDebugInfo(newChild._debugInfo)),
              (returnFiber = updateSlot(
                returnFiber,
                oldFiber,
                unwrapThenable(newChild),
                lanes
              )),
              (currentDebugInfo = key),
              returnFiber
            );
          if (newChild.$$typeof === REACT_CONTEXT_TYPE)
            return updateSlot(
              returnFiber,
              oldFiber,
              readContextDuringReconciliation(returnFiber, newChild),
              lanes
            );
          throwOnInvalidObjectType(returnFiber, newChild);
        }
        "function" === typeof newChild &&
          warnOnFunctionType(returnFiber, newChild);
        "symbol" === typeof newChild && warnOnSymbolType(returnFiber, newChild);
        return null;
      }
      function updateFromMap(
        existingChildren,
        returnFiber,
        newIdx,
        newChild,
        lanes
      ) {
        if (
          ("string" === typeof newChild && "" !== newChild) ||
          "number" === typeof newChild ||
          "bigint" === typeof newChild
        )
          return (
            (existingChildren = existingChildren.get(newIdx) || null),
            updateTextNode(returnFiber, existingChildren, "" + newChild, lanes)
          );
        if ("object" === typeof newChild && null !== newChild) {
          switch (newChild.$$typeof) {
            case REACT_ELEMENT_TYPE:
              return (
                (newIdx =
                  existingChildren.get(
                    null === newChild.key ? newIdx : newChild.key
                  ) || null),
                (existingChildren = pushDebugInfo(newChild._debugInfo)),
                (returnFiber = updateElement(
                  returnFiber,
                  newIdx,
                  newChild,
                  lanes
                )),
                (currentDebugInfo = existingChildren),
                returnFiber
              );
            case REACT_PORTAL_TYPE:
              return (
                (existingChildren =
                  existingChildren.get(
                    null === newChild.key ? newIdx : newChild.key
                  ) || null),
                updatePortal(returnFiber, existingChildren, newChild, lanes)
              );
            case REACT_LAZY_TYPE:
              var _prevDebugInfo7 = pushDebugInfo(newChild._debugInfo);
              newChild = callLazyInitInDEV(newChild);
              returnFiber = updateFromMap(
                existingChildren,
                returnFiber,
                newIdx,
                newChild,
                lanes
              );
              currentDebugInfo = _prevDebugInfo7;
              return returnFiber;
          }
          if (isArrayImpl(newChild) || getIteratorFn(newChild))
            return (
              (newIdx = existingChildren.get(newIdx) || null),
              (existingChildren = pushDebugInfo(newChild._debugInfo)),
              (returnFiber = updateFragment(
                returnFiber,
                newIdx,
                newChild,
                lanes,
                null
              )),
              (currentDebugInfo = existingChildren),
              returnFiber
            );
          if ("function" === typeof newChild.then)
            return (
              (_prevDebugInfo7 = pushDebugInfo(newChild._debugInfo)),
              (returnFiber = updateFromMap(
                existingChildren,
                returnFiber,
                newIdx,
                unwrapThenable(newChild),
                lanes
              )),
              (currentDebugInfo = _prevDebugInfo7),
              returnFiber
            );
          if (newChild.$$typeof === REACT_CONTEXT_TYPE)
            return updateFromMap(
              existingChildren,
              returnFiber,
              newIdx,
              readContextDuringReconciliation(returnFiber, newChild),
              lanes
            );
          throwOnInvalidObjectType(returnFiber, newChild);
        }
        "function" === typeof newChild &&
          warnOnFunctionType(returnFiber, newChild);
        "symbol" === typeof newChild && warnOnSymbolType(returnFiber, newChild);
        return null;
      }
      function warnOnInvalidKey(returnFiber, workInProgress, child, knownKeys) {
        if ("object" !== typeof child || null === child) return knownKeys;
        switch (child.$$typeof) {
          case REACT_ELEMENT_TYPE:
          case REACT_PORTAL_TYPE:
            warnForMissingKey(returnFiber, workInProgress, child);
            var key = child.key;
            if ("string" !== typeof key) break;
            if (null === knownKeys) {
              knownKeys = new Set();
              knownKeys.add(key);
              break;
            }
            if (!knownKeys.has(key)) {
              knownKeys.add(key);
              break;
            }
            runWithFiberInDEV(workInProgress, function () {
              console.error(
                "Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted \u2014 the behavior is unsupported and could change in a future version.",
                key
              );
            });
            break;
          case REACT_LAZY_TYPE:
            (child = callLazyInitInDEV(child)),
              warnOnInvalidKey(returnFiber, workInProgress, child, knownKeys);
        }
        return knownKeys;
      }
      function reconcileChildrenArray(
        returnFiber,
        currentFirstChild,
        newChildren,
        lanes
      ) {
        for (
          var knownKeys = null,
            resultingFirstChild = null,
            previousNewFiber = null,
            oldFiber = currentFirstChild,
            newIdx = (currentFirstChild = 0),
            nextOldFiber = null;
          null !== oldFiber && newIdx < newChildren.length;
          newIdx++
        ) {
          oldFiber.index > newIdx
            ? ((nextOldFiber = oldFiber), (oldFiber = null))
            : (nextOldFiber = oldFiber.sibling);
          var newFiber = updateSlot(
            returnFiber,
            oldFiber,
            newChildren[newIdx],
            lanes
          );
          if (null === newFiber) {
            null === oldFiber && (oldFiber = nextOldFiber);
            break;
          }
          knownKeys = warnOnInvalidKey(
            returnFiber,
            newFiber,
            newChildren[newIdx],
            knownKeys
          );
          shouldTrackSideEffects &&
            oldFiber &&
            null === newFiber.alternate &&
            deleteChild(returnFiber, oldFiber);
          currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
          null === previousNewFiber
            ? (resultingFirstChild = newFiber)
            : (previousNewFiber.sibling = newFiber);
          previousNewFiber = newFiber;
          oldFiber = nextOldFiber;
        }
        if (newIdx === newChildren.length)
          return (
            deleteRemainingChildren(returnFiber, oldFiber),
            isHydrating && pushTreeFork(returnFiber, newIdx),
            resultingFirstChild
          );
        if (null === oldFiber) {
          for (; newIdx < newChildren.length; newIdx++)
            (oldFiber = createChild(returnFiber, newChildren[newIdx], lanes)),
              null !== oldFiber &&
                ((knownKeys = warnOnInvalidKey(
                  returnFiber,
                  oldFiber,
                  newChildren[newIdx],
                  knownKeys
                )),
                (currentFirstChild = placeChild(
                  oldFiber,
                  currentFirstChild,
                  newIdx
                )),
                null === previousNewFiber
                  ? (resultingFirstChild = oldFiber)
                  : (previousNewFiber.sibling = oldFiber),
                (previousNewFiber = oldFiber));
          isHydrating && pushTreeFork(returnFiber, newIdx);
          return resultingFirstChild;
        }
        for (
          oldFiber = mapRemainingChildren(oldFiber);
          newIdx < newChildren.length;
          newIdx++
        )
          (nextOldFiber = updateFromMap(
            oldFiber,
            returnFiber,
            newIdx,
            newChildren[newIdx],
            lanes
          )),
            null !== nextOldFiber &&
              ((knownKeys = warnOnInvalidKey(
                returnFiber,
                nextOldFiber,
                newChildren[newIdx],
                knownKeys
              )),
              shouldTrackSideEffects &&
                null !== nextOldFiber.alternate &&
                oldFiber.delete(
                  null === nextOldFiber.key ? newIdx : nextOldFiber.key
                ),
              (currentFirstChild = placeChild(
                nextOldFiber,
                currentFirstChild,
                newIdx
              )),
              null === previousNewFiber
                ? (resultingFirstChild = nextOldFiber)
                : (previousNewFiber.sibling = nextOldFiber),
              (previousNewFiber = nextOldFiber));
        shouldTrackSideEffects &&
          oldFiber.forEach(function (child) {
            return deleteChild(returnFiber, child);
          });
        isHydrating && pushTreeFork(returnFiber, newIdx);
        return resultingFirstChild;
      }
      function reconcileChildrenIterator(
        returnFiber,
        currentFirstChild,
        newChildren,
        lanes
      ) {
        if (null == newChildren)
          throw Error("An iterable object provided no iterator.");
        for (
          var resultingFirstChild = null,
            previousNewFiber = null,
            oldFiber = currentFirstChild,
            newIdx = (currentFirstChild = 0),
            nextOldFiber = null,
            knownKeys = null,
            step = newChildren.next();
          null !== oldFiber && !step.done;
          newIdx++, step = newChildren.next()
        ) {
          oldFiber.index > newIdx
            ? ((nextOldFiber = oldFiber), (oldFiber = null))
            : (nextOldFiber = oldFiber.sibling);
          var newFiber = updateSlot(returnFiber, oldFiber, step.value, lanes);
          if (null === newFiber) {
            null === oldFiber && (oldFiber = nextOldFiber);
            break;
          }
          knownKeys = warnOnInvalidKey(
            returnFiber,
            newFiber,
            step.value,
            knownKeys
          );
          shouldTrackSideEffects &&
            oldFiber &&
            null === newFiber.alternate &&
            deleteChild(returnFiber, oldFiber);
          currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
          null === previousNewFiber
            ? (resultingFirstChild = newFiber)
            : (previousNewFiber.sibling = newFiber);
          previousNewFiber = newFiber;
          oldFiber = nextOldFiber;
        }
        if (step.done)
          return (
            deleteRemainingChildren(returnFiber, oldFiber),
            isHydrating && pushTreeFork(returnFiber, newIdx),
            resultingFirstChild
          );
        if (null === oldFiber) {
          for (; !step.done; newIdx++, step = newChildren.next())
            (oldFiber = createChild(returnFiber, step.value, lanes)),
              null !== oldFiber &&
                ((knownKeys = warnOnInvalidKey(
                  returnFiber,
                  oldFiber,
                  step.value,
                  knownKeys
                )),
                (currentFirstChild = placeChild(
                  oldFiber,
                  currentFirstChild,
                  newIdx
                )),
                null === previousNewFiber
                  ? (resultingFirstChild = oldFiber)
                  : (previousNewFiber.sibling = oldFiber),
                (previousNewFiber = oldFiber));
          isHydrating && pushTreeFork(returnFiber, newIdx);
          return resultingFirstChild;
        }
        for (
          oldFiber = mapRemainingChildren(oldFiber);
          !step.done;
          newIdx++, step = newChildren.next()
        )
          (nextOldFiber = updateFromMap(
            oldFiber,
            returnFiber,
            newIdx,
            step.value,
            lanes
          )),
            null !== nextOldFiber &&
              ((knownKeys = warnOnInvalidKey(
                returnFiber,
                nextOldFiber,
                step.value,
                knownKeys
              )),
              shouldTrackSideEffects &&
                null !== nextOldFiber.alternate &&
                oldFiber.delete(
                  null === nextOldFiber.key ? newIdx : nextOldFiber.key
                ),
              (currentFirstChild = placeChild(
                nextOldFiber,
                currentFirstChild,
                newIdx
              )),
              null === previousNewFiber
                ? (resultingFirstChild = nextOldFiber)
                : (previousNewFiber.sibling = nextOldFiber),
              (previousNewFiber = nextOldFiber));
        shouldTrackSideEffects &&
          oldFiber.forEach(function (child) {
            return deleteChild(returnFiber, child);
          });
        isHydrating && pushTreeFork(returnFiber, newIdx);
        return resultingFirstChild;
      }
      function reconcileChildFibersImpl(
        returnFiber,
        currentFirstChild,
        newChild,
        lanes
      ) {
        "object" === typeof newChild &&
          null !== newChild &&
          newChild.type === REACT_FRAGMENT_TYPE &&
          null === newChild.key &&
          (validateFragmentProps(newChild, null, returnFiber),
          (newChild = newChild.props.children));
        if ("object" === typeof newChild && null !== newChild) {
          switch (newChild.$$typeof) {
            case REACT_ELEMENT_TYPE:
              var prevDebugInfo = pushDebugInfo(newChild._debugInfo);
              a: {
                for (var key = newChild.key; null !== currentFirstChild; ) {
                  if (currentFirstChild.key === key) {
                    key = newChild.type;
                    if (key === REACT_FRAGMENT_TYPE) {
                      if (7 === currentFirstChild.tag) {
                        deleteRemainingChildren(
                          returnFiber,
                          currentFirstChild.sibling
                        );
                        lanes = useFiber(
                          currentFirstChild,
                          newChild.props.children
                        );
                        lanes.return = returnFiber;
                        lanes._debugOwner = newChild._owner;
                        lanes._debugInfo = currentDebugInfo;
                        validateFragmentProps(newChild, lanes, returnFiber);
                        returnFiber = lanes;
                        break a;
                      }
                    } else if (
                      currentFirstChild.elementType === key ||
                      isCompatibleFamilyForHotReloading(
                        currentFirstChild,
                        newChild
                      ) ||
                      ("object" === typeof key &&
                        null !== key &&
                        key.$$typeof === REACT_LAZY_TYPE &&
                        callLazyInitInDEV(key) === currentFirstChild.type)
                    ) {
                      deleteRemainingChildren(
                        returnFiber,
                        currentFirstChild.sibling
                      );
                      lanes = useFiber(currentFirstChild, newChild.props);
                      coerceRef(lanes, newChild);
                      lanes.return = returnFiber;
                      lanes._debugOwner = newChild._owner;
                      lanes._debugInfo = currentDebugInfo;
                      returnFiber = lanes;
                      break a;
                    }
                    deleteRemainingChildren(returnFiber, currentFirstChild);
                    break;
                  } else deleteChild(returnFiber, currentFirstChild);
                  currentFirstChild = currentFirstChild.sibling;
                }
                newChild.type === REACT_FRAGMENT_TYPE
                  ? ((lanes = createFiberFromFragment(
                      newChild.props.children,
                      returnFiber.mode,
                      lanes,
                      newChild.key
                    )),
                    (lanes.return = returnFiber),
                    (lanes._debugOwner = returnFiber),
                    (lanes._debugInfo = currentDebugInfo),
                    validateFragmentProps(newChild, lanes, returnFiber),
                    (returnFiber = lanes))
                  : ((lanes = createFiberFromElement(
                      newChild,
                      returnFiber.mode,
                      lanes
                    )),
                    coerceRef(lanes, newChild),
                    (lanes.return = returnFiber),
                    (lanes._debugInfo = currentDebugInfo),
                    (returnFiber = lanes));
              }
              returnFiber = placeSingleChild(returnFiber);
              currentDebugInfo = prevDebugInfo;
              return returnFiber;
            case REACT_PORTAL_TYPE:
              a: {
                prevDebugInfo = newChild;
                for (
                  newChild = prevDebugInfo.key;
                  null !== currentFirstChild;

                ) {
                  if (currentFirstChild.key === newChild)
                    if (
                      4 === currentFirstChild.tag &&
                      currentFirstChild.stateNode.containerInfo ===
                        prevDebugInfo.containerInfo &&
                      currentFirstChild.stateNode.implementation ===
                        prevDebugInfo.implementation
                    ) {
                      deleteRemainingChildren(
                        returnFiber,
                        currentFirstChild.sibling
                      );
                      lanes = useFiber(
                        currentFirstChild,
                        prevDebugInfo.children || []
                      );
                      lanes.return = returnFiber;
                      returnFiber = lanes;
                      break a;
                    } else {
                      deleteRemainingChildren(returnFiber, currentFirstChild);
                      break;
                    }
                  else deleteChild(returnFiber, currentFirstChild);
                  currentFirstChild = currentFirstChild.sibling;
                }
                lanes = createFiberFromPortal(
                  prevDebugInfo,
                  returnFiber.mode,
                  lanes
                );
                lanes.return = returnFiber;
                returnFiber = lanes;
              }
              return placeSingleChild(returnFiber);
            case REACT_LAZY_TYPE:
              return (
                (prevDebugInfo = pushDebugInfo(newChild._debugInfo)),
                (newChild = callLazyInitInDEV(newChild)),
                (returnFiber = reconcileChildFibersImpl(
                  returnFiber,
                  currentFirstChild,
                  newChild,
                  lanes
                )),
                (currentDebugInfo = prevDebugInfo),
                returnFiber
              );
          }
          if (isArrayImpl(newChild))
            return (
              (prevDebugInfo = pushDebugInfo(newChild._debugInfo)),
              (returnFiber = reconcileChildrenArray(
                returnFiber,
                currentFirstChild,
                newChild,
                lanes
              )),
              (currentDebugInfo = prevDebugInfo),
              returnFiber
            );
          if (getIteratorFn(newChild)) {
            prevDebugInfo = pushDebugInfo(newChild._debugInfo);
            key = getIteratorFn(newChild);
            if ("function" !== typeof key)
              throw Error(
                "An object is not an iterable. This error is likely caused by a bug in React. Please file an issue."
              );
            var newChildren = key.call(newChild);
            if (newChildren === newChild) {
              if (
                0 !== returnFiber.tag ||
                "[object GeneratorFunction]" !==
                  Object.prototype.toString.call(returnFiber.type) ||
                "[object Generator]" !==
                  Object.prototype.toString.call(newChildren)
              )
                didWarnAboutGenerators ||
                  console.error(
                    "Using Iterators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. You can also use an Iterable that can iterate multiple times over the same items."
                  ),
                  (didWarnAboutGenerators = !0);
            } else
              newChild.entries !== key ||
                didWarnAboutMaps ||
                (console.error(
                  "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
                ),
                (didWarnAboutMaps = !0));
            returnFiber = reconcileChildrenIterator(
              returnFiber,
              currentFirstChild,
              newChildren,
              lanes
            );
            currentDebugInfo = prevDebugInfo;
            return returnFiber;
          }
          if ("function" === typeof newChild.then)
            return (
              (prevDebugInfo = pushDebugInfo(newChild._debugInfo)),
              (returnFiber = reconcileChildFibersImpl(
                returnFiber,
                currentFirstChild,
                unwrapThenable(newChild),
                lanes
              )),
              (currentDebugInfo = prevDebugInfo),
              returnFiber
            );
          if (newChild.$$typeof === REACT_CONTEXT_TYPE)
            return reconcileChildFibersImpl(
              returnFiber,
              currentFirstChild,
              readContextDuringReconciliation(returnFiber, newChild),
              lanes
            );
          throwOnInvalidObjectType(returnFiber, newChild);
        }
        if (
          ("string" === typeof newChild && "" !== newChild) ||
          "number" === typeof newChild ||
          "bigint" === typeof newChild
        )
          return (
            (prevDebugInfo = "" + newChild),
            null !== currentFirstChild && 6 === currentFirstChild.tag
              ? (deleteRemainingChildren(
                  returnFiber,
                  currentFirstChild.sibling
                ),
                (lanes = useFiber(currentFirstChild, prevDebugInfo)),
                (lanes.return = returnFiber),
                (returnFiber = lanes))
              : (deleteRemainingChildren(returnFiber, currentFirstChild),
                (lanes = createFiberFromText(
                  prevDebugInfo,
                  returnFiber.mode,
                  lanes
                )),
                (lanes.return = returnFiber),
                (lanes._debugOwner = returnFiber),
                (lanes._debugInfo = currentDebugInfo),
                (returnFiber = lanes)),
            placeSingleChild(returnFiber)
          );
        "function" === typeof newChild &&
          warnOnFunctionType(returnFiber, newChild);
        "symbol" === typeof newChild && warnOnSymbolType(returnFiber, newChild);
        return deleteRemainingChildren(returnFiber, currentFirstChild);
      }
      return function (returnFiber, currentFirstChild, newChild, lanes) {
        var prevDebugInfo = currentDebugInfo;
        currentDebugInfo = null;
        try {
          thenableIndexCounter = 0;
          var firstChildFiber = reconcileChildFibersImpl(
            returnFiber,
            currentFirstChild,
            newChild,
            lanes
          );
          thenableState = null;
          return firstChildFiber;
        } catch (x) {
          if (x === SuspenseException || x === SuspenseActionException) throw x;
          var fiber = createFiber(29, x, null, returnFiber.mode);
          fiber.lanes = lanes;
          fiber.return = returnFiber;
          var debugInfo = (fiber._debugInfo = currentDebugInfo);
          fiber._debugOwner = returnFiber._debugOwner;
          if (null != debugInfo)
            for (var i = debugInfo.length - 1; 0 <= i; i--)
              if ("string" === typeof debugInfo[i].stack) {
                fiber._debugOwner = debugInfo[i];
                break;
              }
          return fiber;
        } finally {
          currentDebugInfo = prevDebugInfo;
        }
      };
    }
    function pushPrimaryTreeSuspenseHandler(handler) {
      var current = handler.alternate;
      push(
        suspenseStackCursor,
        suspenseStackCursor.current & SubtreeSuspenseContextMask,
        handler
      );
      push(suspenseHandlerStackCursor, handler, handler);
      null === shellBoundary &&
        (null === current || null !== currentTreeHiddenStackCursor.current
          ? (shellBoundary = handler)
          : null !== current.memoizedState && (shellBoundary = handler));
    }
    function pushOffscreenSuspenseHandler(fiber) {
      if (22 === fiber.tag) {
        if (
          (push(suspenseStackCursor, suspenseStackCursor.current, fiber),
          push(suspenseHandlerStackCursor, fiber, fiber),
          null === shellBoundary)
        ) {
          var current = fiber.alternate;
          null !== current &&
            null !== current.memoizedState &&
            (shellBoundary = fiber);
        }
      } else reuseSuspenseHandlerOnStack(fiber);
    }
    function reuseSuspenseHandlerOnStack(fiber) {
      push(suspenseStackCursor, suspenseStackCursor.current, fiber);
      push(
        suspenseHandlerStackCursor,
        suspenseHandlerStackCursor.current,
        fiber
      );
    }
    function popSuspenseHandler(fiber) {
      pop(suspenseHandlerStackCursor, fiber);
      shellBoundary === fiber && (shellBoundary = null);
      pop(suspenseStackCursor, fiber);
    }
    function findFirstSuspended(row) {
      for (var node = row; null !== node; ) {
        if (13 === node.tag) {
          var state = node.memoizedState;
          if (
            null !== state &&
            ((state = state.dehydrated),
            null === state ||
              state.data === SUSPENSE_PENDING_START_DATA ||
              isSuspenseInstanceFallback(state))
          )
            return node;
        } else if (
          19 === node.tag &&
          void 0 !== node.memoizedProps.revealOrder
        ) {
          if (0 !== (node.flags & 128)) return node;
        } else if (null !== node.child) {
          node.child.return = node;
          node = node.child;
          continue;
        }
        if (node === row) break;
        for (; null === node.sibling; ) {
          if (null === node.return || node.return === row) return null;
          node = node.return;
        }
        node.sibling.return = node.return;
        node = node.sibling;
      }
      return null;
    }
    function warnOnInvalidCallback(callback) {
      if (null !== callback && "function" !== typeof callback) {
        var key = String(callback);
        didWarnOnInvalidCallback.has(key) ||
          (didWarnOnInvalidCallback.add(key),
          console.error(
            "Expected the last optional `callback` argument to be a function. Instead received: %s.",
            callback
          ));
      }
    }
    function applyDerivedStateFromProps(
      workInProgress,
      ctor,
      getDerivedStateFromProps,
      nextProps
    ) {
      var prevState = workInProgress.memoizedState,
        partialState = getDerivedStateFromProps(nextProps, prevState);
      if (workInProgress.mode & StrictLegacyMode) {
        setIsStrictModeForDevtools(!0);
        try {
          partialState = getDerivedStateFromProps(nextProps, prevState);
        } finally {
          setIsStrictModeForDevtools(!1);
        }
      }
      void 0 === partialState &&
        ((ctor = getComponentNameFromType(ctor) || "Component"),
        didWarnAboutUndefinedDerivedState.has(ctor) ||
          (didWarnAboutUndefinedDerivedState.add(ctor),
          console.error(
            "%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.",
            ctor
          )));
      prevState =
        null === partialState || void 0 === partialState
          ? prevState
          : assign({}, prevState, partialState);
      workInProgress.memoizedState = prevState;
      0 === workInProgress.lanes &&
        (workInProgress.updateQueue.baseState = prevState);
    }
    function checkShouldComponentUpdate(
      workInProgress,
      ctor,
      oldProps,
      newProps,
      oldState,
      newState,
      nextContext
    ) {
      var instance = workInProgress.stateNode;
      if ("function" === typeof instance.shouldComponentUpdate) {
        oldProps = instance.shouldComponentUpdate(
          newProps,
          newState,
          nextContext
        );
        if (workInProgress.mode & StrictLegacyMode) {
          setIsStrictModeForDevtools(!0);
          try {
            oldProps = instance.shouldComponentUpdate(
              newProps,
              newState,
              nextContext
            );
          } finally {
            setIsStrictModeForDevtools(!1);
          }
        }
        void 0 === oldProps &&
          console.error(
            "%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.",
            getComponentNameFromType(ctor) || "Component"
          );
        return oldProps;
      }
      return ctor.prototype && ctor.prototype.isPureReactComponent
        ? !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState)
        : !0;
    }
    function callComponentWillReceiveProps(
      workInProgress,
      instance,
      newProps,
      nextContext
    ) {
      var oldState = instance.state;
      "function" === typeof instance.componentWillReceiveProps &&
        instance.componentWillReceiveProps(newProps, nextContext);
      "function" === typeof instance.UNSAFE_componentWillReceiveProps &&
        instance.UNSAFE_componentWillReceiveProps(newProps, nextContext);
      instance.state !== oldState &&
        ((workInProgress =
          getComponentNameFromFiber(workInProgress) || "Component"),
        didWarnAboutStateAssignmentForComponent.has(workInProgress) ||
          (didWarnAboutStateAssignmentForComponent.add(workInProgress),
          console.error(
            "%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.",
            workInProgress
          )),
        classComponentUpdater.enqueueReplaceState(
          instance,
          instance.state,
          null
        ));
    }
    function resolveClassComponentProps(Component, baseProps) {
      var newProps = baseProps;
      if ("ref" in baseProps) {
        newProps = {};
        for (var propName in baseProps)
          "ref" !== propName && (newProps[propName] = baseProps[propName]);
      }
      if ((Component = Component.defaultProps)) {
        newProps === baseProps && (newProps = assign({}, newProps));
        for (var _propName in Component)
          void 0 === newProps[_propName] &&
            (newProps[_propName] = Component[_propName]);
      }
      return newProps;
    }
    function defaultOnUncaughtError(error, errorInfo) {
      reportGlobalError(error);
      error = componentName
        ? "An error occurred in the <" + componentName + "> component."
        : "An error occurred in one of your React components.";
      var prevGetCurrentStack = ReactSharedInternals.getCurrentStack,
        componentStack =
          null != errorInfo.componentStack ? errorInfo.componentStack : "";
      ReactSharedInternals.getCurrentStack = function () {
        return componentStack;
      };
      try {
        console.warn(
          "%s\n\n%s\n",
          error,
          "Consider adding an error boundary to your tree to customize error handling behavior.\nVisit https://react.dev/link/error-boundaries to learn more about error boundaries."
        );
      } finally {
        ReactSharedInternals.getCurrentStack = prevGetCurrentStack;
      }
    }
    function defaultOnCaughtError(error, errorInfo) {
      var componentNameMessage = componentName
          ? "The above error occurred in the <" + componentName + "> component."
          : "The above error occurred in one of your React components.",
        recreateMessage =
          "React will try to recreate this component tree from scratch using the error boundary you provided, " +
          ((errorBoundaryName || "Anonymous") + "."),
        prevGetCurrentStack = ReactSharedInternals.getCurrentStack,
        componentStack =
          null != errorInfo.componentStack ? errorInfo.componentStack : "";
      ReactSharedInternals.getCurrentStack = function () {
        return componentStack;
      };
      try {
        "object" === typeof error &&
        null !== error &&
        "string" === typeof error.environmentName
          ? bindToConsole(
              "error",
              [
                "%o\n\n%s\n\n%s\n",
                error,
                componentNameMessage,
                recreateMessage
              ],
              error.environmentName
            )()
          : console.error(
              "%o\n\n%s\n\n%s\n",
              error,
              componentNameMessage,
              recreateMessage
            );
      } finally {
        ReactSharedInternals.getCurrentStack = prevGetCurrentStack;
      }
    }
    function defaultOnRecoverableError(error) {
      reportGlobalError(error);
    }
    function logUncaughtError(root, errorInfo) {
      try {
        componentName = errorInfo.source
          ? getComponentNameFromFiber(errorInfo.source)
          : null;
        errorBoundaryName = null;
        var error = errorInfo.value;
        if (null !== ReactSharedInternals.actQueue)
          ReactSharedInternals.thrownErrors.push(error);
        else {
          var onUncaughtError = root.onUncaughtError;
          onUncaughtError(error, { componentStack: errorInfo.stack });
        }
      } catch (e$4) {
        setTimeout(function () {
          throw e$4;
        });
      }
    }
    function logCaughtError(root, boundary, errorInfo) {
      try {
        componentName = errorInfo.source
          ? getComponentNameFromFiber(errorInfo.source)
          : null;
        errorBoundaryName = getComponentNameFromFiber(boundary);
        var onCaughtError = root.onCaughtError;
        onCaughtError(errorInfo.value, {
          componentStack: errorInfo.stack,
          errorBoundary: 1 === boundary.tag ? boundary.stateNode : null
        });
      } catch (e$5) {
        setTimeout(function () {
          throw e$5;
        });
      }
    }
    function createRootErrorUpdate(root, errorInfo, lane) {
      lane = createUpdate(lane);
      lane.tag = CaptureUpdate;
      lane.payload = { element: null };
      lane.callback = function () {
        runWithFiberInDEV(errorInfo.source, logUncaughtError, root, errorInfo);
      };
      return lane;
    }
    function createClassErrorUpdate(lane) {
      lane = createUpdate(lane);
      lane.tag = CaptureUpdate;
      return lane;
    }
    function initializeClassErrorUpdate(update, root, fiber, errorInfo) {
      var getDerivedStateFromError = fiber.type.getDerivedStateFromError;
      if ("function" === typeof getDerivedStateFromError) {
        var error = errorInfo.value;
        update.payload = function () {
          return getDerivedStateFromError(error);
        };
        update.callback = function () {
          markFailedErrorBoundaryForHotReloading(fiber);
          runWithFiberInDEV(
            errorInfo.source,
            logCaughtError,
            root,
            fiber,
            errorInfo
          );
        };
      }
      var inst = fiber.stateNode;
      null !== inst &&
        "function" === typeof inst.componentDidCatch &&
        (update.callback = function () {
          markFailedErrorBoundaryForHotReloading(fiber);
          runWithFiberInDEV(
            errorInfo.source,
            logCaughtError,
            root,
            fiber,
            errorInfo
          );
          "function" !== typeof getDerivedStateFromError &&
            (null === legacyErrorBoundariesThatAlreadyFailed
              ? (legacyErrorBoundariesThatAlreadyFailed = new Set([this]))
              : legacyErrorBoundariesThatAlreadyFailed.add(this));
          callComponentDidCatchInDEV(this, errorInfo);
          "function" === typeof getDerivedStateFromError ||
            (0 === (fiber.lanes & 2) &&
              console.error(
                "%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.",
                getComponentNameFromFiber(fiber) || "Unknown"
              ));
        });
    }
    function throwException(
      root,
      returnFiber,
      sourceFiber,
      value,
      rootRenderLanes
    ) {
      sourceFiber.flags |= 32768;
      isDevToolsPresent && restorePendingUpdaters(root, rootRenderLanes);
      if (
        null !== value &&
        "object" === typeof value &&
        "function" === typeof value.then
      ) {
        returnFiber = sourceFiber.alternate;
        null !== returnFiber &&
          propagateParentContextChanges(
            returnFiber,
            sourceFiber,
            rootRenderLanes,
            !0
          );
        isHydrating && (didSuspendOrErrorDEV = !0);
        sourceFiber = suspenseHandlerStackCursor.current;
        if (null !== sourceFiber) {
          switch (sourceFiber.tag) {
            case 13:
              return (
                null === shellBoundary
                  ? renderDidSuspendDelayIfPossible()
                  : null === sourceFiber.alternate &&
                    workInProgressRootExitStatus === RootInProgress &&
                    (workInProgressRootExitStatus = RootSuspended),
                (sourceFiber.flags &= -257),
                (sourceFiber.flags |= 65536),
                (sourceFiber.lanes = rootRenderLanes),
                value === noopSuspenseyCommitThenable
                  ? (sourceFiber.flags |= 16384)
                  : ((returnFiber = sourceFiber.updateQueue),
                    null === returnFiber
                      ? (sourceFiber.updateQueue = new Set([value]))
                      : returnFiber.add(value),
                    attachPingListener(root, value, rootRenderLanes)),
                !1
              );
            case 22:
              return (
                (sourceFiber.flags |= 65536),
                value === noopSuspenseyCommitThenable
                  ? (sourceFiber.flags |= 16384)
                  : ((returnFiber = sourceFiber.updateQueue),
                    null === returnFiber
                      ? ((returnFiber = {
                          transitions: null,
                          markerInstances: null,
                          retryQueue: new Set([value])
                        }),
                        (sourceFiber.updateQueue = returnFiber))
                      : ((sourceFiber = returnFiber.retryQueue),
                        null === sourceFiber
                          ? (returnFiber.retryQueue = new Set([value]))
                          : sourceFiber.add(value)),
                    attachPingListener(root, value, rootRenderLanes)),
                !1
              );
          }
          throw Error(
            "Unexpected Suspense handler tag (" +
              sourceFiber.tag +
              "). This is a bug in React."
          );
        }
        attachPingListener(root, value, rootRenderLanes);
        renderDidSuspendDelayIfPossible();
        return !1;
      }
      if (isHydrating)
        return (
          (didSuspendOrErrorDEV = !0),
          (returnFiber = suspenseHandlerStackCursor.current),
          null !== returnFiber
            ? (0 === (returnFiber.flags & 65536) && (returnFiber.flags |= 256),
              (returnFiber.flags |= 65536),
              (returnFiber.lanes = rootRenderLanes),
              value !== HydrationMismatchException &&
                queueHydrationError(
                  createCapturedValueAtFiber(
                    Error(
                      "There was an error while hydrating but React was able to recover by instead client rendering from the nearest Suspense boundary.",
                      { cause: value }
                    ),
                    sourceFiber
                  )
                ))
            : (value !== HydrationMismatchException &&
                queueHydrationError(
                  createCapturedValueAtFiber(
                    Error(
                      "There was an error while hydrating but React was able to recover by instead client rendering the entire root.",
                      { cause: value }
                    ),
                    sourceFiber
                  )
                ),
              (root = root.current.alternate),
              (root.flags |= 65536),
              (rootRenderLanes &= -rootRenderLanes),
              (root.lanes |= rootRenderLanes),
              (value = createCapturedValueAtFiber(value, sourceFiber)),
              (rootRenderLanes = createRootErrorUpdate(
                root.stateNode,
                value,
                rootRenderLanes
              )),
              enqueueCapturedUpdate(root, rootRenderLanes),
              workInProgressRootExitStatus !== RootSuspendedWithDelay &&
                (workInProgressRootExitStatus = RootErrored)),
          !1
        );
      var error = createCapturedValueAtFiber(
        Error(
          "There was an error during concurrent rendering but React was able to recover by instead synchronously rendering the entire root.",
          { cause: value }
        ),
        sourceFiber
      );
      null === workInProgressRootConcurrentErrors
        ? (workInProgressRootConcurrentErrors = [error])
        : workInProgressRootConcurrentErrors.push(error);
      workInProgressRootExitStatus !== RootSuspendedWithDelay &&
        (workInProgressRootExitStatus = RootErrored);
      if (null === returnFiber) return !0;
      value = createCapturedValueAtFiber(value, sourceFiber);
      sourceFiber = returnFiber;
      do {
        switch (sourceFiber.tag) {
          case 3:
            return (
              (sourceFiber.flags |= 65536),
              (root = rootRenderLanes & -rootRenderLanes),
              (sourceFiber.lanes |= root),
              (root = createRootErrorUpdate(
                sourceFiber.stateNode,
                value,
                root
              )),
              enqueueCapturedUpdate(sourceFiber, root),
              !1
            );
          case 1:
            if (
              ((returnFiber = sourceFiber.type),
              (error = sourceFiber.stateNode),
              0 === (sourceFiber.flags & 128) &&
                ("function" === typeof returnFiber.getDerivedStateFromError ||
                  (null !== error &&
                    "function" === typeof error.componentDidCatch &&
                    (null === legacyErrorBoundariesThatAlreadyFailed ||
                      !legacyErrorBoundariesThatAlreadyFailed.has(error)))))
            )
              return (
                (sourceFiber.flags |= 65536),
                (rootRenderLanes &= -rootRenderLanes),
                (sourceFiber.lanes |= rootRenderLanes),
                (rootRenderLanes = createClassErrorUpdate(rootRenderLanes)),
                initializeClassErrorUpdate(
                  rootRenderLanes,
                  root,
                  sourceFiber,
                  value
                ),
                enqueueCapturedUpdate(sourceFiber, rootRenderLanes),
                !1
              );
        }
        sourceFiber = sourceFiber.return;
      } while (null !== sourceFiber);
      return !1;
    }
    function reconcileChildren(
      current,
      workInProgress,
      nextChildren,
      renderLanes
    ) {
      workInProgress.child =
        null === current
          ? mountChildFibers(workInProgress, null, nextChildren, renderLanes)
          : reconcileChildFibers(
              workInProgress,
              current.child,
              nextChildren,
              renderLanes
            );
    }
    function updateForwardRef(
      current,
      workInProgress,
      Component,
      nextProps,
      renderLanes
    ) {
      Component = Component.render;
      var ref = workInProgress.ref;
      if ("ref" in nextProps) {
        var propsWithoutRef = {};
        for (var key in nextProps)
          "ref" !== key && (propsWithoutRef[key] = nextProps[key]);
      } else propsWithoutRef = nextProps;
      prepareToReadContext(workInProgress);
      markComponentRenderStarted(workInProgress);
      nextProps = renderWithHooks(
        current,
        workInProgress,
        Component,
        propsWithoutRef,
        ref,
        renderLanes
      );
      key = checkDidRenderIdHook();
      markComponentRenderStopped();
      if (null !== current && !didReceiveUpdate)
        return (
          bailoutHooks(current, workInProgress, renderLanes),
          bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes)
        );
      isHydrating && key && pushMaterializedTreeId(workInProgress);
      workInProgress.flags |= 1;
      reconcileChildren(current, workInProgress, nextProps, renderLanes);
      return workInProgress.child;
    }
    function updateMemoComponent(
      current,
      workInProgress,
      Component,
      nextProps,
      renderLanes
    ) {
      if (null === current) {
        var type = Component.type;
        if (
          "function" === typeof type &&
          !shouldConstruct(type) &&
          void 0 === type.defaultProps &&
          null === Component.compare
        )
          return (
            (Component = resolveFunctionForHotReloading(type)),
            (workInProgress.tag = 15),
            (workInProgress.type = Component),
            validateFunctionComponentInDev(workInProgress, type),
            updateSimpleMemoComponent(
              current,
              workInProgress,
              Component,
              nextProps,
              renderLanes
            )
          );
        current = createFiberFromTypeAndProps(
          Component.type,
          null,
          nextProps,
          workInProgress,
          workInProgress.mode,
          renderLanes
        );
        current.ref = workInProgress.ref;
        current.return = workInProgress;
        return (workInProgress.child = current);
      }
      type = current.child;
      if (!checkScheduledUpdateOrContext(current, renderLanes)) {
        var prevProps = type.memoizedProps;
        Component = Component.compare;
        Component = null !== Component ? Component : shallowEqual;
        if (
          Component(prevProps, nextProps) &&
          current.ref === workInProgress.ref
        )
          return bailoutOnAlreadyFinishedWork(
            current,
            workInProgress,
            renderLanes
          );
      }
      workInProgress.flags |= 1;
      current = createWorkInProgress(type, nextProps);
      current.ref = workInProgress.ref;
      current.return = workInProgress;
      return (workInProgress.child = current);
    }
    function updateSimpleMemoComponent(
      current,
      workInProgress,
      Component,
      nextProps,
      renderLanes
    ) {
      if (null !== current) {
        var prevProps = current.memoizedProps;
        if (
          shallowEqual(prevProps, nextProps) &&
          current.ref === workInProgress.ref &&
          workInProgress.type === current.type
        )
          if (
            ((didReceiveUpdate = !1),
            (workInProgress.pendingProps = nextProps = prevProps),
            checkScheduledUpdateOrContext(current, renderLanes))
          )
            0 !== (current.flags & 131072) && (didReceiveUpdate = !0);
          else
            return (
              (workInProgress.lanes = current.lanes),
              bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes)
            );
      }
      return updateFunctionComponent(
        current,
        workInProgress,
        Component,
        nextProps,
        renderLanes
      );
    }
    function updateOffscreenComponent(current, workInProgress, renderLanes) {
      var nextProps = workInProgress.pendingProps,
        nextChildren = nextProps.children,
        nextIsDetached =
          0 !==
          (workInProgress.stateNode._pendingVisibility & OffscreenDetached),
        prevState = null !== current ? current.memoizedState : null;
      markRef(current, workInProgress);
      if ("hidden" === nextProps.mode || nextIsDetached) {
        if (0 !== (workInProgress.flags & 128)) {
          nextProps =
            null !== prevState
              ? prevState.baseLanes | renderLanes
              : renderLanes;
          if (null !== current) {
            nextChildren = workInProgress.child = current.child;
            for (nextIsDetached = 0; null !== nextChildren; )
              (nextIsDetached =
                nextIsDetached | nextChildren.lanes | nextChildren.childLanes),
                (nextChildren = nextChildren.sibling);
            workInProgress.childLanes = nextIsDetached & ~nextProps;
          } else (workInProgress.childLanes = 0), (workInProgress.child = null);
          return deferHiddenOffscreenComponent(
            current,
            workInProgress,
            nextProps,
            renderLanes
          );
        }
        if (0 !== (renderLanes & 536870912))
          (workInProgress.memoizedState = { baseLanes: 0, cachePool: null }),
            null !== current &&
              pushTransition(
                workInProgress,
                null !== prevState ? prevState.cachePool : null
              ),
            null !== prevState
              ? pushHiddenContext(workInProgress, prevState)
              : reuseHiddenContextOnStack(workInProgress),
            pushOffscreenSuspenseHandler(workInProgress);
        else
          return (
            (workInProgress.lanes = workInProgress.childLanes = 536870912),
            deferHiddenOffscreenComponent(
              current,
              workInProgress,
              null !== prevState
                ? prevState.baseLanes | renderLanes
                : renderLanes,
              renderLanes
            )
          );
      } else
        null !== prevState
          ? (pushTransition(workInProgress, prevState.cachePool),
            pushHiddenContext(workInProgress, prevState),
            reuseSuspenseHandlerOnStack(workInProgress),
            (workInProgress.memoizedState = null))
          : (null !== current && pushTransition(workInProgress, null),
            reuseHiddenContextOnStack(workInProgress),
            reuseSuspenseHandlerOnStack(workInProgress));
      reconcileChildren(current, workInProgress, nextChildren, renderLanes);
      return workInProgress.child;
    }
    function deferHiddenOffscreenComponent(
      current,
      workInProgress,
      nextBaseLanes,
      renderLanes
    ) {
      var JSCompiler_inline_result = peekCacheFromPool();
      JSCompiler_inline_result =
        null === JSCompiler_inline_result
          ? null
          : {
              parent: CacheContext._currentValue,
              pool: JSCompiler_inline_result
            };
      workInProgress.memoizedState = {
        baseLanes: nextBaseLanes,
        cachePool: JSCompiler_inline_result
      };
      null !== current && pushTransition(workInProgress, null);
      reuseHiddenContextOnStack(workInProgress);
      pushOffscreenSuspenseHandler(workInProgress);
      null !== current &&
        propagateParentContextChanges(current, workInProgress, renderLanes, !0);
      return null;
    }
    function markRef(current, workInProgress) {
      var ref = workInProgress.ref;
      if (null === ref)
        null !== current &&
          null !== current.ref &&
          (workInProgress.flags |= 2097664);
      else {
        if ("function" !== typeof ref && "object" !== typeof ref)
          throw Error(
            "Expected ref to be a function, an object returned by React.createRef(), or undefined/null."
          );
        if (null === current || current.ref !== ref)
          workInProgress.flags |= 2097664;
      }
    }
    function updateFunctionComponent(
      current,
      workInProgress,
      Component,
      nextProps,
      renderLanes
    ) {
      if (
        Component.prototype &&
        "function" === typeof Component.prototype.render
      ) {
        var componentName = getComponentNameFromType(Component) || "Unknown";
        didWarnAboutBadClass[componentName] ||
          (console.error(
            "The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.",
            componentName,
            componentName
          ),
          (didWarnAboutBadClass[componentName] = !0));
      }
      workInProgress.mode & StrictLegacyMode &&
        ReactStrictModeWarnings.recordLegacyContextWarning(
          workInProgress,
          null
        );
      null === current &&
        (validateFunctionComponentInDev(workInProgress, workInProgress.type),
        Component.contextTypes &&
          ((componentName = getComponentNameFromType(Component) || "Unknown"),
          didWarnAboutContextTypes[componentName] ||
            ((didWarnAboutContextTypes[componentName] = !0),
            console.error(
              "%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with React.useContext() instead. (https://react.dev/link/legacy-context)",
              componentName
            ))));
      prepareToReadContext(workInProgress);
      markComponentRenderStarted(workInProgress);
      Component = renderWithHooks(
        current,
        workInProgress,
        Component,
        nextProps,
        void 0,
        renderLanes
      );
      nextProps = checkDidRenderIdHook();
      markComponentRenderStopped();
      if (null !== current && !didReceiveUpdate)
        return (
          bailoutHooks(current, workInProgress, renderLanes),
          bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes)
        );
      isHydrating && nextProps && pushMaterializedTreeId(workInProgress);
      workInProgress.flags |= 1;
      reconcileChildren(current, workInProgress, Component, renderLanes);
      return workInProgress.child;
    }
    function replayFunctionComponent(
      current,
      workInProgress,
      nextProps,
      Component,
      secondArg,
      renderLanes
    ) {
      prepareToReadContext(workInProgress);
      markComponentRenderStarted(workInProgress);
      hookTypesUpdateIndexDev = -1;
      ignorePreviousDependencies =
        null !== current && current.type !== workInProgress.type;
      workInProgress.updateQueue = null;
      nextProps = renderWithHooksAgain(
        workInProgress,
        Component,
        nextProps,
        secondArg
      );
      finishRenderingHooks(current, workInProgress);
      Component = checkDidRenderIdHook();
      markComponentRenderStopped();
      if (null !== current && !didReceiveUpdate)
        return (
          bailoutHooks(current, workInProgress, renderLanes),
          bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes)
        );
      isHydrating && Component && pushMaterializedTreeId(workInProgress);
      workInProgress.flags |= 1;
      reconcileChildren(current, workInProgress, nextProps, renderLanes);
      return workInProgress.child;
    }
    function updateClassComponent(
      current$jscomp$0,
      workInProgress,
      Component,
      nextProps,
      renderLanes
    ) {
      switch (shouldErrorImpl(workInProgress)) {
        case !1:
          var _instance = workInProgress.stateNode,
            state = new workInProgress.type(
              workInProgress.memoizedProps,
              _instance.context
            ).state;
          _instance.updater.enqueueSetState(_instance, state, null);
          break;
        case !0:
          workInProgress.flags |= 128;
          workInProgress.flags |= 65536;
          _instance = Error("Simulated error coming from DevTools");
          var lane = renderLanes & -renderLanes;
          workInProgress.lanes |= lane;
          state = workInProgressRoot;
          if (null === state)
            throw Error(
              "Expected a work-in-progress root. This is a bug in React. Please file an issue."
            );
          lane = createClassErrorUpdate(lane);
          initializeClassErrorUpdate(
            lane,
            state,
            workInProgress,
            createCapturedValueAtFiber(_instance, workInProgress)
          );
          enqueueCapturedUpdate(workInProgress, lane);
      }
      prepareToReadContext(workInProgress);
      if (null === workInProgress.stateNode) {
        state = emptyContextObject;
        _instance = Component.contextType;
        "contextType" in Component &&
          null !== _instance &&
          (void 0 === _instance || _instance.$$typeof !== REACT_CONTEXT_TYPE) &&
          !didWarnAboutInvalidateContextType.has(Component) &&
          (didWarnAboutInvalidateContextType.add(Component),
          (lane =
            void 0 === _instance
              ? " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file."
              : "object" !== typeof _instance
                ? " However, it is set to a " + typeof _instance + "."
                : _instance.$$typeof === REACT_CONSUMER_TYPE
                  ? " Did you accidentally pass the Context.Consumer instead?"
                  : " However, it is set to an object with keys {" +
                    Object.keys(_instance).join(", ") +
                    "}."),
          console.error(
            "%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s",
            getComponentNameFromType(Component) || "Component",
            lane
          ));
        "object" === typeof _instance &&
          null !== _instance &&
          (state = readContext(_instance));
        _instance = new Component(nextProps, state);
        if (workInProgress.mode & StrictLegacyMode) {
          setIsStrictModeForDevtools(!0);
          try {
            _instance = new Component(nextProps, state);
          } finally {
            setIsStrictModeForDevtools(!1);
          }
        }
        state = workInProgress.memoizedState =
          null !== _instance.state && void 0 !== _instance.state
            ? _instance.state
            : null;
        _instance.updater = classComponentUpdater;
        workInProgress.stateNode = _instance;
        _instance._reactInternals = workInProgress;
        _instance._reactInternalInstance = fakeInternalInstance;
        "function" === typeof Component.getDerivedStateFromProps &&
          null === state &&
          ((state = getComponentNameFromType(Component) || "Component"),
          didWarnAboutUninitializedState.has(state) ||
            (didWarnAboutUninitializedState.add(state),
            console.error(
              "`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.",
              state,
              null === _instance.state ? "null" : "undefined",
              state
            )));
        if (
          "function" === typeof Component.getDerivedStateFromProps ||
          "function" === typeof _instance.getSnapshotBeforeUpdate
        ) {
          var foundWillUpdateName = (lane = state = null);
          "function" === typeof _instance.componentWillMount &&
          !0 !== _instance.componentWillMount.__suppressDeprecationWarning
            ? (state = "componentWillMount")
            : "function" === typeof _instance.UNSAFE_componentWillMount &&
              (state = "UNSAFE_componentWillMount");
          "function" === typeof _instance.componentWillReceiveProps &&
          !0 !==
            _instance.componentWillReceiveProps.__suppressDeprecationWarning
            ? (lane = "componentWillReceiveProps")
            : "function" ===
                typeof _instance.UNSAFE_componentWillReceiveProps &&
              (lane = "UNSAFE_componentWillReceiveProps");
          "function" === typeof _instance.componentWillUpdate &&
          !0 !== _instance.componentWillUpdate.__suppressDeprecationWarning
            ? (foundWillUpdateName = "componentWillUpdate")
            : "function" === typeof _instance.UNSAFE_componentWillUpdate &&
              (foundWillUpdateName = "UNSAFE_componentWillUpdate");
          if (null !== state || null !== lane || null !== foundWillUpdateName) {
            _instance = getComponentNameFromType(Component) || "Component";
            var newApiName =
              "function" === typeof Component.getDerivedStateFromProps
                ? "getDerivedStateFromProps()"
                : "getSnapshotBeforeUpdate()";
            didWarnAboutLegacyLifecyclesAndDerivedState.has(_instance) ||
              (didWarnAboutLegacyLifecyclesAndDerivedState.add(_instance),
              console.error(
                "Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n%s uses %s but also contains the following legacy lifecycles:%s%s%s\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://react.dev/link/unsafe-component-lifecycles",
                _instance,
                newApiName,
                null !== state ? "\n  " + state : "",
                null !== lane ? "\n  " + lane : "",
                null !== foundWillUpdateName ? "\n  " + foundWillUpdateName : ""
              ));
          }
        }
        _instance = workInProgress.stateNode;
        state = getComponentNameFromType(Component) || "Component";
        _instance.render ||
          (Component.prototype &&
          "function" === typeof Component.prototype.render
            ? console.error(
                "No `render` method found on the %s instance: did you accidentally return an object from the constructor?",
                state
              )
            : console.error(
                "No `render` method found on the %s instance: you may have forgotten to define `render`.",
                state
              ));
        !_instance.getInitialState ||
          _instance.getInitialState.isReactClassApproved ||
          _instance.state ||
          console.error(
            "getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?",
            state
          );
        _instance.getDefaultProps &&
          !_instance.getDefaultProps.isReactClassApproved &&
          console.error(
            "getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.",
            state
          );
        _instance.contextType &&
          console.error(
            "contextType was defined as an instance property on %s. Use a static property to define contextType instead.",
            state
          );
        Component.childContextTypes &&
          !didWarnAboutChildContextTypes.has(Component) &&
          (didWarnAboutChildContextTypes.add(Component),
          console.error(
            "%s uses the legacy childContextTypes API which was removed in React 19. Use React.createContext() instead. (https://react.dev/link/legacy-context)",
            state
          ));
        Component.contextTypes &&
          !didWarnAboutContextTypes$1.has(Component) &&
          (didWarnAboutContextTypes$1.add(Component),
          console.error(
            "%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with static contextType instead. (https://react.dev/link/legacy-context)",
            state
          ));
        "function" === typeof _instance.componentShouldUpdate &&
          console.error(
            "%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.",
            state
          );
        Component.prototype &&
          Component.prototype.isPureReactComponent &&
          "undefined" !== typeof _instance.shouldComponentUpdate &&
          console.error(
            "%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.",
            getComponentNameFromType(Component) || "A pure component"
          );
        "function" === typeof _instance.componentDidUnmount &&
          console.error(
            "%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?",
            state
          );
        "function" === typeof _instance.componentDidReceiveProps &&
          console.error(
            "%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().",
            state
          );
        "function" === typeof _instance.componentWillRecieveProps &&
          console.error(
            "%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?",
            state
          );
        "function" === typeof _instance.UNSAFE_componentWillRecieveProps &&
          console.error(
            "%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?",
            state
          );
        lane = _instance.props !== nextProps;
        void 0 !== _instance.props &&
          lane &&
          console.error(
            "When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.",
            state
          );
        _instance.defaultProps &&
          console.error(
            "Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.",
            state,
            state
          );
        "function" !== typeof _instance.getSnapshotBeforeUpdate ||
          "function" === typeof _instance.componentDidUpdate ||
          didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.has(Component) ||
          (didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.add(Component),
          console.error(
            "%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.",
            getComponentNameFromType(Component)
          ));
        "function" === typeof _instance.getDerivedStateFromProps &&
          console.error(
            "%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.",
            state
          );
        "function" === typeof _instance.getDerivedStateFromError &&
          console.error(
            "%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.",
            state
          );
        "function" === typeof Component.getSnapshotBeforeUpdate &&
          console.error(
            "%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.",
            state
          );
        (lane = _instance.state) &&
          ("object" !== typeof lane || isArrayImpl(lane)) &&
          console.error("%s.state: must be set to an object or null", state);
        "function" === typeof _instance.getChildContext &&
          "object" !== typeof Component.childContextTypes &&
          console.error(
            "%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().",
            state
          );
        _instance = workInProgress.stateNode;
        _instance.props = nextProps;
        _instance.state = workInProgress.memoizedState;
        _instance.refs = {};
        initializeUpdateQueue(workInProgress);
        state = Component.contextType;
        _instance.context =
          "object" === typeof state && null !== state
            ? readContext(state)
            : emptyContextObject;
        _instance.state === nextProps &&
          ((state = getComponentNameFromType(Component) || "Component"),
          didWarnAboutDirectlyAssigningPropsToState.has(state) ||
            (didWarnAboutDirectlyAssigningPropsToState.add(state),
            console.error(
              "%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.",
              state
            )));
        workInProgress.mode & StrictLegacyMode &&
          ReactStrictModeWarnings.recordLegacyContextWarning(
            workInProgress,
            _instance
          );
        ReactStrictModeWarnings.recordUnsafeLifecycleWarnings(
          workInProgress,
          _instance
        );
        _instance.state = workInProgress.memoizedState;
        state = Component.getDerivedStateFromProps;
        "function" === typeof state &&
          (applyDerivedStateFromProps(
            workInProgress,
            Component,
            state,
            nextProps
          ),
          (_instance.state = workInProgress.memoizedState));
        "function" === typeof Component.getDerivedStateFromProps ||
          "function" === typeof _instance.getSnapshotBeforeUpdate ||
          ("function" !== typeof _instance.UNSAFE_componentWillMount &&
            "function" !== typeof _instance.componentWillMount) ||
          ((state = _instance.state),
          "function" === typeof _instance.componentWillMount &&
            _instance.componentWillMount(),
          "function" === typeof _instance.UNSAFE_componentWillMount &&
            _instance.UNSAFE_componentWillMount(),
          state !== _instance.state &&
            (console.error(
              "%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.",
              getComponentNameFromFiber(workInProgress) || "Component"
            ),
            classComponentUpdater.enqueueReplaceState(
              _instance,
              _instance.state,
              null
            )),
          processUpdateQueue(workInProgress, nextProps, _instance, renderLanes),
          suspendIfUpdateReadFromEntangledAsyncAction(),
          (_instance.state = workInProgress.memoizedState));
        "function" === typeof _instance.componentDidMount &&
          (workInProgress.flags |= 4194308);
        (workInProgress.mode & StrictEffectsMode) !== NoMode &&
          (workInProgress.flags |= 67108864);
        _instance = !0;
      } else if (null === current$jscomp$0) {
        _instance = workInProgress.stateNode;
        var unresolvedOldProps = workInProgress.memoizedProps;
        lane = resolveClassComponentProps(Component, unresolvedOldProps);
        _instance.props = lane;
        var oldContext = _instance.context;
        foundWillUpdateName = Component.contextType;
        state = emptyContextObject;
        "object" === typeof foundWillUpdateName &&
          null !== foundWillUpdateName &&
          (state = readContext(foundWillUpdateName));
        newApiName = Component.getDerivedStateFromProps;
        foundWillUpdateName =
          "function" === typeof newApiName ||
          "function" === typeof _instance.getSnapshotBeforeUpdate;
        unresolvedOldProps = workInProgress.pendingProps !== unresolvedOldProps;
        foundWillUpdateName ||
          ("function" !== typeof _instance.UNSAFE_componentWillReceiveProps &&
            "function" !== typeof _instance.componentWillReceiveProps) ||
          ((unresolvedOldProps || oldContext !== state) &&
            callComponentWillReceiveProps(
              workInProgress,
              _instance,
              nextProps,
              state
            ));
        hasForceUpdate = !1;
        var oldState = workInProgress.memoizedState;
        _instance.state = oldState;
        processUpdateQueue(workInProgress, nextProps, _instance, renderLanes);
        suspendIfUpdateReadFromEntangledAsyncAction();
        oldContext = workInProgress.memoizedState;
        unresolvedOldProps || oldState !== oldContext || hasForceUpdate
          ? ("function" === typeof newApiName &&
              (applyDerivedStateFromProps(
                workInProgress,
                Component,
                newApiName,
                nextProps
              ),
              (oldContext = workInProgress.memoizedState)),
            (lane =
              hasForceUpdate ||
              checkShouldComponentUpdate(
                workInProgress,
                Component,
                lane,
                nextProps,
                oldState,
                oldContext,
                state
              ))
              ? (foundWillUpdateName ||
                  ("function" !== typeof _instance.UNSAFE_componentWillMount &&
                    "function" !== typeof _instance.componentWillMount) ||
                  ("function" === typeof _instance.componentWillMount &&
                    _instance.componentWillMount(),
                  "function" === typeof _instance.UNSAFE_componentWillMount &&
                    _instance.UNSAFE_componentWillMount()),
                "function" === typeof _instance.componentDidMount &&
                  (workInProgress.flags |= 4194308),
                (workInProgress.mode & StrictEffectsMode) !== NoMode &&
                  (workInProgress.flags |= 67108864))
              : ("function" === typeof _instance.componentDidMount &&
                  (workInProgress.flags |= 4194308),
                (workInProgress.mode & StrictEffectsMode) !== NoMode &&
                  (workInProgress.flags |= 67108864),
                (workInProgress.memoizedProps = nextProps),
                (workInProgress.memoizedState = oldContext)),
            (_instance.props = nextProps),
            (_instance.state = oldContext),
            (_instance.context = state),
            (_instance = lane))
          : ("function" === typeof _instance.componentDidMount &&
              (workInProgress.flags |= 4194308),
            (workInProgress.mode & StrictEffectsMode) !== NoMode &&
              (workInProgress.flags |= 67108864),
            (_instance = !1));
      } else {
        _instance = workInProgress.stateNode;
        cloneUpdateQueue(current$jscomp$0, workInProgress);
        state = workInProgress.memoizedProps;
        foundWillUpdateName = resolveClassComponentProps(Component, state);
        _instance.props = foundWillUpdateName;
        newApiName = workInProgress.pendingProps;
        oldState = _instance.context;
        oldContext = Component.contextType;
        lane = emptyContextObject;
        "object" === typeof oldContext &&
          null !== oldContext &&
          (lane = readContext(oldContext));
        unresolvedOldProps = Component.getDerivedStateFromProps;
        (oldContext =
          "function" === typeof unresolvedOldProps ||
          "function" === typeof _instance.getSnapshotBeforeUpdate) ||
          ("function" !== typeof _instance.UNSAFE_componentWillReceiveProps &&
            "function" !== typeof _instance.componentWillReceiveProps) ||
          ((state !== newApiName || oldState !== lane) &&
            callComponentWillReceiveProps(
              workInProgress,
              _instance,
              nextProps,
              lane
            ));
        hasForceUpdate = !1;
        oldState = workInProgress.memoizedState;
        _instance.state = oldState;
        processUpdateQueue(workInProgress, nextProps, _instance, renderLanes);
        suspendIfUpdateReadFromEntangledAsyncAction();
        var newState = workInProgress.memoizedState;
        state !== newApiName ||
        oldState !== newState ||
        hasForceUpdate ||
        (null !== current$jscomp$0 &&
          null !== current$jscomp$0.dependencies &&
          checkIfContextChanged(current$jscomp$0.dependencies))
          ? ("function" === typeof unresolvedOldProps &&
              (applyDerivedStateFromProps(
                workInProgress,
                Component,
                unresolvedOldProps,
                nextProps
              ),
              (newState = workInProgress.memoizedState)),
            (foundWillUpdateName =
              hasForceUpdate ||
              checkShouldComponentUpdate(
                workInProgress,
                Component,
                foundWillUpdateName,
                nextProps,
                oldState,
                newState,
                lane
              ) ||
              (null !== current$jscomp$0 &&
                null !== current$jscomp$0.dependencies &&
                checkIfContextChanged(current$jscomp$0.dependencies)))
              ? (oldContext ||
                  ("function" !== typeof _instance.UNSAFE_componentWillUpdate &&
                    "function" !== typeof _instance.componentWillUpdate) ||
                  ("function" === typeof _instance.componentWillUpdate &&
                    _instance.componentWillUpdate(nextProps, newState, lane),
                  "function" === typeof _instance.UNSAFE_componentWillUpdate &&
                    _instance.UNSAFE_componentWillUpdate(
                      nextProps,
                      newState,
                      lane
                    )),
                "function" === typeof _instance.componentDidUpdate &&
                  (workInProgress.flags |= 4),
                "function" === typeof _instance.getSnapshotBeforeUpdate &&
                  (workInProgress.flags |= 1024))
              : ("function" !== typeof _instance.componentDidUpdate ||
                  (state === current$jscomp$0.memoizedProps &&
                    oldState === current$jscomp$0.memoizedState) ||
                  (workInProgress.flags |= 4),
                "function" !== typeof _instance.getSnapshotBeforeUpdate ||
                  (state === current$jscomp$0.memoizedProps &&
                    oldState === current$jscomp$0.memoizedState) ||
                  (workInProgress.flags |= 1024),
                (workInProgress.memoizedProps = nextProps),
                (workInProgress.memoizedState = newState)),
            (_instance.props = nextProps),
            (_instance.state = newState),
            (_instance.context = lane),
            (_instance = foundWillUpdateName))
          : ("function" !== typeof _instance.componentDidUpdate ||
              (state === current$jscomp$0.memoizedProps &&
                oldState === current$jscomp$0.memoizedState) ||
              (workInProgress.flags |= 4),
            "function" !== typeof _instance.getSnapshotBeforeUpdate ||
              (state === current$jscomp$0.memoizedProps &&
                oldState === current$jscomp$0.memoizedState) ||
              (workInProgress.flags |= 1024),
            (_instance = !1));
      }
      lane = _instance;
      markRef(current$jscomp$0, workInProgress);
      state = 0 !== (workInProgress.flags & 128);
      if (lane || state) {
        lane = workInProgress.stateNode;
        ReactSharedInternals.getCurrentStack =
          null === workInProgress ? null : getCurrentFiberStackInDev;
        isRendering = !1;
        current = workInProgress;
        if (state && "function" !== typeof Component.getDerivedStateFromError)
          (Component = null), (profilerStartTime = -1);
        else {
          markComponentRenderStarted(workInProgress);
          Component = callRenderInDEV(lane);
          if (workInProgress.mode & StrictLegacyMode) {
            setIsStrictModeForDevtools(!0);
            try {
              callRenderInDEV(lane);
            } finally {
              setIsStrictModeForDevtools(!1);
            }
          }
          markComponentRenderStopped();
        }
        workInProgress.flags |= 1;
        null !== current$jscomp$0 && state
          ? ((workInProgress.child = reconcileChildFibers(
              workInProgress,
              current$jscomp$0.child,
              null,
              renderLanes
            )),
            (workInProgress.child = reconcileChildFibers(
              workInProgress,
              null,
              Component,
              renderLanes
            )))
          : reconcileChildren(
              current$jscomp$0,
              workInProgress,
              Component,
              renderLanes
            );
        workInProgress.memoizedState = lane.state;
        current$jscomp$0 = workInProgress.child;
      } else
        current$jscomp$0 = bailoutOnAlreadyFinishedWork(
          current$jscomp$0,
          workInProgress,
          renderLanes
        );
      renderLanes = workInProgress.stateNode;
      _instance &&
        renderLanes.props !== nextProps &&
        (didWarnAboutReassigningProps ||
          console.error(
            "It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.",
            getComponentNameFromFiber(workInProgress) || "a component"
          ),
        (didWarnAboutReassigningProps = !0));
      return current$jscomp$0;
    }
    function mountHostRootWithoutHydrating(
      current,
      workInProgress,
      nextChildren,
      renderLanes
    ) {
      resetHydrationState();
      workInProgress.flags |= 256;
      reconcileChildren(current, workInProgress, nextChildren, renderLanes);
      return workInProgress.child;
    }
    function validateFunctionComponentInDev(workInProgress, Component) {
      Component &&
        Component.childContextTypes &&
        console.error(
          "childContextTypes cannot be defined on a function component.\n  %s.childContextTypes = ...",
          Component.displayName || Component.name || "Component"
        );
      "function" === typeof Component.getDerivedStateFromProps &&
        ((workInProgress = getComponentNameFromType(Component) || "Unknown"),
        didWarnAboutGetDerivedStateOnFunctionComponent[workInProgress] ||
          (console.error(
            "%s: Function components do not support getDerivedStateFromProps.",
            workInProgress
          ),
          (didWarnAboutGetDerivedStateOnFunctionComponent[workInProgress] =
            !0)));
      "object" === typeof Component.contextType &&
        null !== Component.contextType &&
        ((Component = getComponentNameFromType(Component) || "Unknown"),
        didWarnAboutContextTypeOnFunctionComponent[Component] ||
          (console.error(
            "%s: Function components do not support contextType.",
            Component
          ),
          (didWarnAboutContextTypeOnFunctionComponent[Component] = !0)));
    }
    function mountSuspenseOffscreenState(renderLanes) {
      return { baseLanes: renderLanes, cachePool: getSuspendedCache() };
    }
    function getRemainingWorkInPrimaryTree(
      current,
      primaryTreeDidDefer,
      renderLanes
    ) {
      current = null !== current ? current.childLanes & ~renderLanes : 0;
      primaryTreeDidDefer && (current |= workInProgressDeferredLane);
      return current;
    }
    function updateSuspenseComponent(current, workInProgress, renderLanes) {
      var JSCompiler_object_inline_digest_2321;
      var JSCompiler_object_inline_stack_2322 = workInProgress.pendingProps;
      shouldSuspendImpl(workInProgress) && (workInProgress.flags |= 128);
      var JSCompiler_object_inline_componentStack_2323 = !1;
      var didSuspend = 0 !== (workInProgress.flags & 128);
      (JSCompiler_object_inline_digest_2321 = didSuspend) ||
        (JSCompiler_object_inline_digest_2321 =
          null !== current && null === current.memoizedState
            ? !1
            : 0 !== (suspenseStackCursor.current & ForceSuspenseFallback));
      JSCompiler_object_inline_digest_2321 &&
        ((JSCompiler_object_inline_componentStack_2323 = !0),
        (workInProgress.flags &= -129));
      JSCompiler_object_inline_digest_2321 = 0 !== (workInProgress.flags & 32);
      workInProgress.flags &= -33;
      if (null === current) {
        if (isHydrating) {
          JSCompiler_object_inline_componentStack_2323
            ? pushPrimaryTreeSuspenseHandler(workInProgress)
            : reuseSuspenseHandlerOnStack(workInProgress);
          if (isHydrating) {
            var JSCompiler_object_inline_message_2320 = nextHydratableInstance;
            var JSCompiler_temp;
            if (!(JSCompiler_temp = !JSCompiler_object_inline_message_2320)) {
              c: {
                var instance = JSCompiler_object_inline_message_2320;
                for (
                  JSCompiler_temp = rootOrSingletonContext;
                  8 !== instance.nodeType;

                ) {
                  if (!JSCompiler_temp) {
                    JSCompiler_temp = null;
                    break c;
                  }
                  instance = getNextHydratable(instance.nextSibling);
                  if (null === instance) {
                    JSCompiler_temp = null;
                    break c;
                  }
                }
                JSCompiler_temp = instance;
              }
              null !== JSCompiler_temp
                ? (warnIfNotHydrating(),
                  (workInProgress.memoizedState = {
                    dehydrated: JSCompiler_temp,
                    treeContext:
                      null !== treeContextProvider
                        ? { id: treeContextId, overflow: treeContextOverflow }
                        : null,
                    retryLane: 536870912
                  }),
                  (instance = createFiber(18, null, null, NoMode)),
                  (instance.stateNode = JSCompiler_temp),
                  (instance.return = workInProgress),
                  (workInProgress.child = instance),
                  (hydrationParentFiber = workInProgress),
                  (nextHydratableInstance = null),
                  (JSCompiler_temp = !0))
                : (JSCompiler_temp = !1);
              JSCompiler_temp = !JSCompiler_temp;
            }
            JSCompiler_temp &&
              (warnNonHydratedInstance(
                workInProgress,
                JSCompiler_object_inline_message_2320
              ),
              throwOnHydrationMismatch(workInProgress));
          }
          JSCompiler_object_inline_message_2320 = workInProgress.memoizedState;
          if (
            null !== JSCompiler_object_inline_message_2320 &&
            ((JSCompiler_object_inline_message_2320 =
              JSCompiler_object_inline_message_2320.dehydrated),
            null !== JSCompiler_object_inline_message_2320)
          )
            return (
              isSuspenseInstanceFallback(JSCompiler_object_inline_message_2320)
                ? (workInProgress.lanes = 16)
                : (workInProgress.lanes = 536870912),
              null
            );
          popSuspenseHandler(workInProgress);
        }
        JSCompiler_object_inline_message_2320 =
          JSCompiler_object_inline_stack_2322.children;
        JSCompiler_object_inline_stack_2322 =
          JSCompiler_object_inline_stack_2322.fallback;
        if (JSCompiler_object_inline_componentStack_2323)
          return (
            reuseSuspenseHandlerOnStack(workInProgress),
            (JSCompiler_object_inline_componentStack_2323 =
              workInProgress.mode),
            (JSCompiler_object_inline_message_2320 =
              mountWorkInProgressOffscreenFiber(
                {
                  mode: "hidden",
                  children: JSCompiler_object_inline_message_2320
                },
                JSCompiler_object_inline_componentStack_2323
              )),
            (JSCompiler_object_inline_stack_2322 = createFiberFromFragment(
              JSCompiler_object_inline_stack_2322,
              JSCompiler_object_inline_componentStack_2323,
              renderLanes,
              null
            )),
            (JSCompiler_object_inline_message_2320.return = workInProgress),
            (JSCompiler_object_inline_stack_2322.return = workInProgress),
            (JSCompiler_object_inline_message_2320.sibling =
              JSCompiler_object_inline_stack_2322),
            (workInProgress.child = JSCompiler_object_inline_message_2320),
            (JSCompiler_object_inline_componentStack_2323 =
              workInProgress.child),
            (JSCompiler_object_inline_componentStack_2323.memoizedState =
              mountSuspenseOffscreenState(renderLanes)),
            (JSCompiler_object_inline_componentStack_2323.childLanes =
              getRemainingWorkInPrimaryTree(
                current,
                JSCompiler_object_inline_digest_2321,
                renderLanes
              )),
            (workInProgress.memoizedState = SUSPENDED_MARKER),
            JSCompiler_object_inline_stack_2322
          );
        pushPrimaryTreeSuspenseHandler(workInProgress);
        return mountSuspensePrimaryChildren(
          workInProgress,
          JSCompiler_object_inline_message_2320
        );
      }
      var prevState = current.memoizedState;
      if (
        null !== prevState &&
        ((JSCompiler_object_inline_message_2320 = prevState.dehydrated),
        null !== JSCompiler_object_inline_message_2320)
      ) {
        if (didSuspend)
          workInProgress.flags & 256
            ? (pushPrimaryTreeSuspenseHandler(workInProgress),
              (workInProgress.flags &= -257),
              (workInProgress = retrySuspenseComponentWithoutHydrating(
                current,
                workInProgress,
                renderLanes
              )))
            : null !== workInProgress.memoizedState
              ? (reuseSuspenseHandlerOnStack(workInProgress),
                (workInProgress.child = current.child),
                (workInProgress.flags |= 128),
                (workInProgress = null))
              : (reuseSuspenseHandlerOnStack(workInProgress),
                (JSCompiler_object_inline_componentStack_2323 =
                  JSCompiler_object_inline_stack_2322.fallback),
                (JSCompiler_object_inline_message_2320 = workInProgress.mode),
                (JSCompiler_object_inline_stack_2322 =
                  mountWorkInProgressOffscreenFiber(
                    {
                      mode: "visible",
                      children: JSCompiler_object_inline_stack_2322.children
                    },
                    JSCompiler_object_inline_message_2320
                  )),
                (JSCompiler_object_inline_componentStack_2323 =
                  createFiberFromFragment(
                    JSCompiler_object_inline_componentStack_2323,
                    JSCompiler_object_inline_message_2320,
                    renderLanes,
                    null
                  )),
                (JSCompiler_object_inline_componentStack_2323.flags |= 2),
                (JSCompiler_object_inline_stack_2322.return = workInProgress),
                (JSCompiler_object_inline_componentStack_2323.return =
                  workInProgress),
                (JSCompiler_object_inline_stack_2322.sibling =
                  JSCompiler_object_inline_componentStack_2323),
                (workInProgress.child = JSCompiler_object_inline_stack_2322),
                reconcileChildFibers(
                  workInProgress,
                  current.child,
                  null,
                  renderLanes
                ),
                (JSCompiler_object_inline_stack_2322 = workInProgress.child),
                (JSCompiler_object_inline_stack_2322.memoizedState =
                  mountSuspenseOffscreenState(renderLanes)),
                (JSCompiler_object_inline_stack_2322.childLanes =
                  getRemainingWorkInPrimaryTree(
                    current,
                    JSCompiler_object_inline_digest_2321,
                    renderLanes
                  )),
                (workInProgress.memoizedState = SUSPENDED_MARKER),
                (workInProgress =
                  JSCompiler_object_inline_componentStack_2323));
        else if (
          (pushPrimaryTreeSuspenseHandler(workInProgress),
          isHydrating &&
            console.error(
              "We should not be hydrating here. This is a bug in React. Please file a bug."
            ),
          isSuspenseInstanceFallback(JSCompiler_object_inline_message_2320))
        ) {
          JSCompiler_object_inline_digest_2321 =
            JSCompiler_object_inline_message_2320.nextSibling &&
            JSCompiler_object_inline_message_2320.nextSibling.dataset;
          if (JSCompiler_object_inline_digest_2321) {
            JSCompiler_temp = JSCompiler_object_inline_digest_2321.dgst;
            var message = JSCompiler_object_inline_digest_2321.msg;
            instance = JSCompiler_object_inline_digest_2321.stck;
            var componentStack = JSCompiler_object_inline_digest_2321.cstck;
          }
          JSCompiler_object_inline_message_2320 = message;
          JSCompiler_object_inline_digest_2321 = JSCompiler_temp;
          JSCompiler_object_inline_stack_2322 = instance;
          JSCompiler_temp = JSCompiler_object_inline_componentStack_2323 =
            componentStack;
          JSCompiler_object_inline_componentStack_2323 =
            JSCompiler_object_inline_message_2320
              ? Error(JSCompiler_object_inline_message_2320)
              : Error(
                  "The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering."
                );
          JSCompiler_object_inline_componentStack_2323.stack =
            JSCompiler_object_inline_stack_2322 || "";
          JSCompiler_object_inline_componentStack_2323.digest =
            JSCompiler_object_inline_digest_2321;
          JSCompiler_object_inline_digest_2321 =
            void 0 === JSCompiler_temp ? null : JSCompiler_temp;
          JSCompiler_object_inline_stack_2322 = {
            value: JSCompiler_object_inline_componentStack_2323,
            source: null,
            stack: JSCompiler_object_inline_digest_2321
          };
          "string" === typeof JSCompiler_object_inline_digest_2321 &&
            CapturedStacks.set(
              JSCompiler_object_inline_componentStack_2323,
              JSCompiler_object_inline_stack_2322
            );
          queueHydrationError(JSCompiler_object_inline_stack_2322);
          workInProgress = retrySuspenseComponentWithoutHydrating(
            current,
            workInProgress,
            renderLanes
          );
        } else if (
          (didReceiveUpdate ||
            propagateParentContextChanges(
              current,
              workInProgress,
              renderLanes,
              !1
            ),
          (JSCompiler_object_inline_digest_2321 =
            0 !== (renderLanes & current.childLanes)),
          didReceiveUpdate || JSCompiler_object_inline_digest_2321)
        ) {
          JSCompiler_object_inline_digest_2321 = workInProgressRoot;
          if (null !== JSCompiler_object_inline_digest_2321) {
            JSCompiler_object_inline_stack_2322 = renderLanes & -renderLanes;
            if (0 !== (JSCompiler_object_inline_stack_2322 & 42))
              JSCompiler_object_inline_stack_2322 = 1;
            else
              switch (JSCompiler_object_inline_stack_2322) {
                case 2:
                  JSCompiler_object_inline_stack_2322 = 1;
                  break;
                case 8:
                  JSCompiler_object_inline_stack_2322 = 4;
                  break;
                case 32:
                  JSCompiler_object_inline_stack_2322 = 16;
                  break;
                case 128:
                case 256:
                case 512:
                case 1024:
                case 2048:
                case 4096:
                case 8192:
                case 16384:
                case 32768:
                case 65536:
                case 131072:
                case 262144:
                case 524288:
                case 1048576:
                case 2097152:
                case 4194304:
                case 8388608:
                case 16777216:
                case 33554432:
                  JSCompiler_object_inline_stack_2322 = 64;
                  break;
                case 268435456:
                  JSCompiler_object_inline_stack_2322 = 134217728;
                  break;
                default:
                  JSCompiler_object_inline_stack_2322 = 0;
              }
            JSCompiler_object_inline_stack_2322 =
              0 !==
              (JSCompiler_object_inline_stack_2322 &
                (JSCompiler_object_inline_digest_2321.suspendedLanes |
                  renderLanes))
                ? 0
                : JSCompiler_object_inline_stack_2322;
            if (
              0 !== JSCompiler_object_inline_stack_2322 &&
              JSCompiler_object_inline_stack_2322 !== prevState.retryLane
            )
              throw (
                ((prevState.retryLane = JSCompiler_object_inline_stack_2322),
                enqueueConcurrentRenderForLane(
                  current,
                  JSCompiler_object_inline_stack_2322
                ),
                scheduleUpdateOnFiber(
                  JSCompiler_object_inline_digest_2321,
                  current,
                  JSCompiler_object_inline_stack_2322
                ),
                SelectiveHydrationException)
              );
          }
          JSCompiler_object_inline_message_2320.data ===
            SUSPENSE_PENDING_START_DATA || renderDidSuspendDelayIfPossible();
          workInProgress = retrySuspenseComponentWithoutHydrating(
            current,
            workInProgress,
            renderLanes
          );
        } else
          JSCompiler_object_inline_message_2320.data ===
          SUSPENSE_PENDING_START_DATA
            ? ((workInProgress.flags |= 192),
              (workInProgress.child = current.child),
              (workInProgress = null))
            : ((current = prevState.treeContext),
              (nextHydratableInstance = getNextHydratable(
                JSCompiler_object_inline_message_2320.nextSibling
              )),
              (hydrationParentFiber = workInProgress),
              (isHydrating = !0),
              (hydrationErrors = null),
              (didSuspendOrErrorDEV = !1),
              (hydrationDiffRootDEV = null),
              (rootOrSingletonContext = !1),
              null !== current &&
                (warnIfNotHydrating(),
                (idStack[idStackIndex++] = treeContextId),
                (idStack[idStackIndex++] = treeContextOverflow),
                (idStack[idStackIndex++] = treeContextProvider),
                (treeContextId = current.id),
                (treeContextOverflow = current.overflow),
                (treeContextProvider = workInProgress)),
              (workInProgress = mountSuspensePrimaryChildren(
                workInProgress,
                JSCompiler_object_inline_stack_2322.children
              )),
              (workInProgress.flags |= 4096));
        return workInProgress;
      }
      if (JSCompiler_object_inline_componentStack_2323)
        return (
          reuseSuspenseHandlerOnStack(workInProgress),
          (JSCompiler_object_inline_componentStack_2323 =
            JSCompiler_object_inline_stack_2322.fallback),
          (JSCompiler_object_inline_message_2320 = workInProgress.mode),
          (JSCompiler_temp = current.child),
          (instance = JSCompiler_temp.sibling),
          (JSCompiler_object_inline_stack_2322 = createWorkInProgress(
            JSCompiler_temp,
            {
              mode: "hidden",
              children: JSCompiler_object_inline_stack_2322.children
            }
          )),
          (JSCompiler_object_inline_stack_2322.subtreeFlags =
            JSCompiler_temp.subtreeFlags & 31457280),
          null !== instance
            ? (JSCompiler_object_inline_componentStack_2323 =
                createWorkInProgress(
                  instance,
                  JSCompiler_object_inline_componentStack_2323
                ))
            : ((JSCompiler_object_inline_componentStack_2323 =
                createFiberFromFragment(
                  JSCompiler_object_inline_componentStack_2323,
                  JSCompiler_object_inline_message_2320,
                  renderLanes,
                  null
                )),
              (JSCompiler_object_inline_componentStack_2323.flags |= 2)),
          (JSCompiler_object_inline_componentStack_2323.return =
            workInProgress),
          (JSCompiler_object_inline_stack_2322.return = workInProgress),
          (JSCompiler_object_inline_stack_2322.sibling =
            JSCompiler_object_inline_componentStack_2323),
          (workInProgress.child = JSCompiler_object_inline_stack_2322),
          (JSCompiler_object_inline_stack_2322 =
            JSCompiler_object_inline_componentStack_2323),
          (JSCompiler_object_inline_componentStack_2323 = workInProgress.child),
          (JSCompiler_object_inline_message_2320 = current.child.memoizedState),
          null === JSCompiler_object_inline_message_2320
            ? (JSCompiler_object_inline_message_2320 =
                mountSuspenseOffscreenState(renderLanes))
            : ((JSCompiler_temp =
                JSCompiler_object_inline_message_2320.cachePool),
              null !== JSCompiler_temp
                ? ((instance = CacheContext._currentValue),
                  (JSCompiler_temp =
                    JSCompiler_temp.parent !== instance
                      ? { parent: instance, pool: instance }
                      : JSCompiler_temp))
                : (JSCompiler_temp = getSuspendedCache()),
              (JSCompiler_object_inline_message_2320 = {
                baseLanes:
                  JSCompiler_object_inline_message_2320.baseLanes | renderLanes,
                cachePool: JSCompiler_temp
              })),
          (JSCompiler_object_inline_componentStack_2323.memoizedState =
            JSCompiler_object_inline_message_2320),
          (JSCompiler_object_inline_componentStack_2323.childLanes =
            getRemainingWorkInPrimaryTree(
              current,
              JSCompiler_object_inline_digest_2321,
              renderLanes
            )),
          (workInProgress.memoizedState = SUSPENDED_MARKER),
          JSCompiler_object_inline_stack_2322
        );
      pushPrimaryTreeSuspenseHandler(workInProgress);
      renderLanes = current.child;
      current = renderLanes.sibling;
      renderLanes = createWorkInProgress(renderLanes, {
        mode: "visible",
        children: JSCompiler_object_inline_stack_2322.children
      });
      renderLanes.return = workInProgress;
      renderLanes.sibling = null;
      null !== current &&
        ((JSCompiler_object_inline_digest_2321 = workInProgress.deletions),
        null === JSCompiler_object_inline_digest_2321
          ? ((workInProgress.deletions = [current]),
            (workInProgress.flags |= 16))
          : JSCompiler_object_inline_digest_2321.push(current));
      workInProgress.child = renderLanes;
      workInProgress.memoizedState = null;
      return renderLanes;
    }
    function mountSuspensePrimaryChildren(workInProgress, primaryChildren) {
      primaryChildren = mountWorkInProgressOffscreenFiber(
        { mode: "visible", children: primaryChildren },
        workInProgress.mode
      );
      primaryChildren.return = workInProgress;
      return (workInProgress.child = primaryChildren);
    }
    function mountWorkInProgressOffscreenFiber(offscreenProps, mode) {
      return createFiberFromOffscreen(offscreenProps, mode, 0, null);
    }
    function retrySuspenseComponentWithoutHydrating(
      current,
      workInProgress,
      renderLanes
    ) {
      reconcileChildFibers(workInProgress, current.child, null, renderLanes);
      current = mountSuspensePrimaryChildren(
        workInProgress,
        workInProgress.pendingProps.children
      );
      current.flags |= 2;
      workInProgress.memoizedState = null;
      return current;
    }
    function scheduleSuspenseWorkOnFiber(fiber, renderLanes, propagationRoot) {
      fiber.lanes |= renderLanes;
      var alternate = fiber.alternate;
      null !== alternate && (alternate.lanes |= renderLanes);
      scheduleContextWorkOnParentPath(
        fiber.return,
        renderLanes,
        propagationRoot
      );
    }
    function validateSuspenseListNestedChild(childSlot, index) {
      var isAnArray = isArrayImpl(childSlot);
      childSlot = !isAnArray && "function" === typeof getIteratorFn(childSlot);
      return isAnArray || childSlot
        ? ((isAnArray = isAnArray ? "array" : "iterable"),
          console.error(
            "A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>",
            isAnArray,
            index,
            isAnArray
          ),
          !1)
        : !0;
    }
    function initSuspenseListRenderState(
      workInProgress,
      isBackwards,
      tail,
      lastContentRow,
      tailMode
    ) {
      var renderState = workInProgress.memoizedState;
      null === renderState
        ? (workInProgress.memoizedState = {
            isBackwards: isBackwards,
            rendering: null,
            renderingStartTime: 0,
            last: lastContentRow,
            tail: tail,
            tailMode: tailMode
          })
        : ((renderState.isBackwards = isBackwards),
          (renderState.rendering = null),
          (renderState.renderingStartTime = 0),
          (renderState.last = lastContentRow),
          (renderState.tail = tail),
          (renderState.tailMode = tailMode));
    }
    function updateSuspenseListComponent(current, workInProgress, renderLanes) {
      var nextProps = workInProgress.pendingProps,
        revealOrder = nextProps.revealOrder,
        tailMode = nextProps.tail;
      nextProps = nextProps.children;
      if (
        void 0 !== revealOrder &&
        "forwards" !== revealOrder &&
        "backwards" !== revealOrder &&
        "together" !== revealOrder &&
        !didWarnAboutRevealOrder[revealOrder]
      )
        if (
          ((didWarnAboutRevealOrder[revealOrder] = !0),
          "string" === typeof revealOrder)
        )
          switch (revealOrder.toLowerCase()) {
            case "together":
            case "forwards":
            case "backwards":
              console.error(
                '"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.',
                revealOrder,
                revealOrder.toLowerCase()
              );
              break;
            case "forward":
            case "backward":
              console.error(
                '"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.',
                revealOrder,
                revealOrder.toLowerCase()
              );
              break;
            default:
              console.error(
                '"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?',
                revealOrder
              );
          }
        else
          console.error(
            '%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?',
            revealOrder
          );
      void 0 === tailMode ||
        didWarnAboutTailOptions[tailMode] ||
        ("collapsed" !== tailMode && "hidden" !== tailMode
          ? ((didWarnAboutTailOptions[tailMode] = !0),
            console.error(
              '"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?',
              tailMode
            ))
          : "forwards" !== revealOrder &&
            "backwards" !== revealOrder &&
            ((didWarnAboutTailOptions[tailMode] = !0),
            console.error(
              '<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?',
              tailMode
            )));
      a: if (
        ("forwards" === revealOrder || "backwards" === revealOrder) &&
        void 0 !== nextProps &&
        null !== nextProps &&
        !1 !== nextProps
      )
        if (isArrayImpl(nextProps))
          for (var i = 0; i < nextProps.length; i++) {
            if (!validateSuspenseListNestedChild(nextProps[i], i)) break a;
          }
        else if (((i = getIteratorFn(nextProps)), "function" === typeof i)) {
          if ((i = i.call(nextProps)))
            for (var step = i.next(), _i = 0; !step.done; step = i.next()) {
              if (!validateSuspenseListNestedChild(step.value, _i)) break a;
              _i++;
            }
        } else
          console.error(
            'A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?',
            revealOrder
          );
      reconcileChildren(current, workInProgress, nextProps, renderLanes);
      nextProps = suspenseStackCursor.current;
      if (0 !== (nextProps & ForceSuspenseFallback))
        (nextProps =
          (nextProps & SubtreeSuspenseContextMask) | ForceSuspenseFallback),
          (workInProgress.flags |= 128);
      else {
        if (null !== current && 0 !== (current.flags & 128))
          a: for (current = workInProgress.child; null !== current; ) {
            if (13 === current.tag)
              null !== current.memoizedState &&
                scheduleSuspenseWorkOnFiber(
                  current,
                  renderLanes,
                  workInProgress
                );
            else if (19 === current.tag)
              scheduleSuspenseWorkOnFiber(current, renderLanes, workInProgress);
            else if (null !== current.child) {
              current.child.return = current;
              current = current.child;
              continue;
            }
            if (current === workInProgress) break a;
            for (; null === current.sibling; ) {
              if (null === current.return || current.return === workInProgress)
                break a;
              current = current.return;
            }
            current.sibling.return = current.return;
            current = current.sibling;
          }
        nextProps &= SubtreeSuspenseContextMask;
      }
      push(suspenseStackCursor, nextProps, workInProgress);
      switch (revealOrder) {
        case "forwards":
          renderLanes = workInProgress.child;
          for (revealOrder = null; null !== renderLanes; )
            (current = renderLanes.alternate),
              null !== current &&
                null === findFirstSuspended(current) &&
                (revealOrder = renderLanes),
              (renderLanes = renderLanes.sibling);
          renderLanes = revealOrder;
          null === renderLanes
            ? ((revealOrder = workInProgress.child),
              (workInProgress.child = null))
            : ((revealOrder = renderLanes.sibling),
              (renderLanes.sibling = null));
          initSuspenseListRenderState(
            workInProgress,
            !1,
            revealOrder,
            renderLanes,
            tailMode
          );
          break;
        case "backwards":
          renderLanes = null;
          revealOrder = workInProgress.child;
          for (workInProgress.child = null; null !== revealOrder; ) {
            current = revealOrder.alternate;
            if (null !== current && null === findFirstSuspended(current)) {
              workInProgress.child = revealOrder;
              break;
            }
            current = revealOrder.sibling;
            revealOrder.sibling = renderLanes;
            renderLanes = revealOrder;
            revealOrder = current;
          }
          initSuspenseListRenderState(
            workInProgress,
            !0,
            renderLanes,
            null,
            tailMode
          );
          break;
        case "together":
          initSuspenseListRenderState(workInProgress, !1, null, null, void 0);
          break;
        default:
          workInProgress.memoizedState = null;
      }
      return workInProgress.child;
    }
    function bailoutOnAlreadyFinishedWork(
      current,
      workInProgress,
      renderLanes
    ) {
      null !== current && (workInProgress.dependencies = current.dependencies);
      profilerStartTime = -1;
      workInProgressRootSkippedLanes |= workInProgress.lanes;
      if (0 === (renderLanes & workInProgress.childLanes))
        if (null !== current) {
          if (
            (propagateParentContextChanges(
              current,
              workInProgress,
              renderLanes,
              !1
            ),
            0 === (renderLanes & workInProgress.childLanes))
          )
            return null;
        } else return null;
      if (null !== current && workInProgress.child !== current.child)
        throw Error("Resuming work not yet implemented.");
      if (null !== workInProgress.child) {
        current = workInProgress.child;
        renderLanes = createWorkInProgress(current, current.pendingProps);
        workInProgress.child = renderLanes;
        for (renderLanes.return = workInProgress; null !== current.sibling; )
          (current = current.sibling),
            (renderLanes = renderLanes.sibling =
              createWorkInProgress(current, current.pendingProps)),
            (renderLanes.return = workInProgress);
        renderLanes.sibling = null;
      }
      return workInProgress.child;
    }
    function checkScheduledUpdateOrContext(current, renderLanes) {
      if (0 !== (current.lanes & renderLanes)) return !0;
      current = current.dependencies;
      return null !== current && checkIfContextChanged(current) ? !0 : !1;
    }
    function attemptEarlyBailoutIfNoScheduledUpdate(
      current,
      workInProgress,
      renderLanes
    ) {
      switch (workInProgress.tag) {
        case 3:
          pushHostContainer(
            workInProgress,
            workInProgress.stateNode.containerInfo
          );
          pushProvider(
            workInProgress,
            CacheContext,
            current.memoizedState.cache
          );
          resetHydrationState();
          break;
        case 27:
        case 5:
          pushHostContext(workInProgress);
          break;
        case 4:
          pushHostContainer(
            workInProgress,
            workInProgress.stateNode.containerInfo
          );
          break;
        case 10:
          pushProvider(
            workInProgress,
            workInProgress.type,
            workInProgress.memoizedProps.value
          );
          break;
        case 12:
          0 !== (renderLanes & workInProgress.childLanes) &&
            (workInProgress.flags |= 4);
          workInProgress.flags |= 2048;
          var stateNode = workInProgress.stateNode;
          stateNode.effectDuration = -0;
          stateNode.passiveEffectDuration = -0;
          break;
        case 13:
          stateNode = workInProgress.memoizedState;
          if (null !== stateNode) {
            if (null !== stateNode.dehydrated)
              return (
                pushPrimaryTreeSuspenseHandler(workInProgress),
                (workInProgress.flags |= 128),
                null
              );
            if (0 !== (renderLanes & workInProgress.child.childLanes))
              return updateSuspenseComponent(
                current,
                workInProgress,
                renderLanes
              );
            pushPrimaryTreeSuspenseHandler(workInProgress);
            current = bailoutOnAlreadyFinishedWork(
              current,
              workInProgress,
              renderLanes
            );
            return null !== current ? current.sibling : null;
          }
          pushPrimaryTreeSuspenseHandler(workInProgress);
          break;
        case 19:
          var didSuspendBefore = 0 !== (current.flags & 128);
          stateNode = 0 !== (renderLanes & workInProgress.childLanes);
          stateNode ||
            (propagateParentContextChanges(
              current,
              workInProgress,
              renderLanes,
              !1
            ),
            (stateNode = 0 !== (renderLanes & workInProgress.childLanes)));
          if (didSuspendBefore) {
            if (stateNode)
              return updateSuspenseListComponent(
                current,
                workInProgress,
                renderLanes
              );
            workInProgress.flags |= 128;
          }
          didSuspendBefore = workInProgress.memoizedState;
          null !== didSuspendBefore &&
            ((didSuspendBefore.rendering = null),
            (didSuspendBefore.tail = null),
            (didSuspendBefore.lastEffect = null));
          push(
            suspenseStackCursor,
            suspenseStackCursor.current,
            workInProgress
          );
          if (stateNode) break;
          else return null;
        case 22:
        case 23:
          return (
            (workInProgress.lanes = 0),
            updateOffscreenComponent(current, workInProgress, renderLanes)
          );
        case 24:
          pushProvider(
            workInProgress,
            CacheContext,
            current.memoizedState.cache
          );
      }
      return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
    }
    function beginWork(current, workInProgress, renderLanes) {
      if (workInProgress._debugNeedsRemount && null !== current) {
        renderLanes = createFiberFromTypeAndProps(
          workInProgress.type,
          workInProgress.key,
          workInProgress.pendingProps,
          workInProgress._debugOwner || null,
          workInProgress.mode,
          workInProgress.lanes
        );
        var returnFiber = workInProgress.return;
        if (null === returnFiber) throw Error("Cannot swap the root fiber.");
        current.alternate = null;
        workInProgress.alternate = null;
        renderLanes.index = workInProgress.index;
        renderLanes.sibling = workInProgress.sibling;
        renderLanes.return = workInProgress.return;
        renderLanes.ref = workInProgress.ref;
        renderLanes._debugInfo = workInProgress._debugInfo;
        if (workInProgress === returnFiber.child)
          returnFiber.child = renderLanes;
        else {
          var prevSibling = returnFiber.child;
          if (null === prevSibling)
            throw Error("Expected parent to have a child.");
          for (; prevSibling.sibling !== workInProgress; )
            if (((prevSibling = prevSibling.sibling), null === prevSibling))
              throw Error("Expected to find the previous sibling.");
          prevSibling.sibling = renderLanes;
        }
        workInProgress = returnFiber.deletions;
        null === workInProgress
          ? ((returnFiber.deletions = [current]), (returnFiber.flags |= 16))
          : workInProgress.push(current);
        renderLanes.flags |= 2;
        return renderLanes;
      }
      if (null !== current)
        if (
          current.memoizedProps !== workInProgress.pendingProps ||
          workInProgress.type !== current.type
        )
          didReceiveUpdate = !0;
        else {
          if (
            !checkScheduledUpdateOrContext(current, renderLanes) &&
            0 === (workInProgress.flags & 128)
          )
            return (
              (didReceiveUpdate = !1),
              attemptEarlyBailoutIfNoScheduledUpdate(
                current,
                workInProgress,
                renderLanes
              )
            );
          didReceiveUpdate = 0 !== (current.flags & 131072) ? !0 : !1;
        }
      else {
        didReceiveUpdate = !1;
        if ((returnFiber = isHydrating))
          warnIfNotHydrating(),
            (returnFiber = 0 !== (workInProgress.flags & 1048576));
        returnFiber &&
          ((returnFiber = workInProgress.index),
          warnIfNotHydrating(),
          pushTreeId(workInProgress, treeForkCount, returnFiber));
      }
      workInProgress.lanes = 0;
      switch (workInProgress.tag) {
        case 16:
          a: if (
            ((returnFiber = workInProgress.pendingProps),
            (current = callLazyInitInDEV(workInProgress.elementType)),
            (workInProgress.type = current),
            "function" === typeof current)
          )
            shouldConstruct(current)
              ? ((returnFiber = resolveClassComponentProps(
                  current,
                  returnFiber
                )),
                (workInProgress.tag = 1),
                (workInProgress.type = current =
                  resolveFunctionForHotReloading(current)),
                (workInProgress = updateClassComponent(
                  null,
                  workInProgress,
                  current,
                  returnFiber,
                  renderLanes
                )))
              : ((workInProgress.tag = 0),
                validateFunctionComponentInDev(workInProgress, current),
                (workInProgress.type = current =
                  resolveFunctionForHotReloading(current)),
                (workInProgress = updateFunctionComponent(
                  null,
                  workInProgress,
                  current,
                  returnFiber,
                  renderLanes
                )));
          else {
            if (void 0 !== current && null !== current)
              if (
                ((prevSibling = current.$$typeof),
                prevSibling === REACT_FORWARD_REF_TYPE)
              ) {
                workInProgress.tag = 11;
                workInProgress.type = current =
                  resolveForwardRefForHotReloading(current);
                workInProgress = updateForwardRef(
                  null,
                  workInProgress,
                  current,
                  returnFiber,
                  renderLanes
                );
                break a;
              } else if (prevSibling === REACT_MEMO_TYPE) {
                workInProgress.tag = 14;
                workInProgress = updateMemoComponent(
                  null,
                  workInProgress,
                  current,
                  returnFiber,
                  renderLanes
                );
                break a;
              }
            workInProgress = "";
            null !== current &&
              "object" === typeof current &&
              current.$$typeof === REACT_LAZY_TYPE &&
              (workInProgress =
                " Did you wrap a component in React.lazy() more than once?");
            current = getComponentNameFromType(current) || current;
            throw Error(
              "Element type is invalid. Received a promise that resolves to: " +
                current +
                ". Lazy element type must resolve to a class or function." +
                workInProgress
            );
          }
          return workInProgress;
        case 0:
          return updateFunctionComponent(
            current,
            workInProgress,
            workInProgress.type,
            workInProgress.pendingProps,
            renderLanes
          );
        case 1:
          return (
            (returnFiber = workInProgress.type),
            (prevSibling = resolveClassComponentProps(
              returnFiber,
              workInProgress.pendingProps
            )),
            updateClassComponent(
              current,
              workInProgress,
              returnFiber,
              prevSibling,
              renderLanes
            )
          );
        case 3:
          a: {
            pushHostContainer(
              workInProgress,
              workInProgress.stateNode.containerInfo
            );
            if (null === current)
              throw Error(
                "Should have a current fiber. This is a bug in React."
              );
            var nextProps = workInProgress.pendingProps;
            prevSibling = workInProgress.memoizedState;
            returnFiber = prevSibling.element;
            cloneUpdateQueue(current, workInProgress);
            processUpdateQueue(workInProgress, nextProps, null, renderLanes);
            var nextState = workInProgress.memoizedState;
            nextProps = nextState.cache;
            pushProvider(workInProgress, CacheContext, nextProps);
            nextProps !== prevSibling.cache &&
              propagateContextChanges(
                workInProgress,
                [CacheContext],
                renderLanes,
                !0
              );
            suspendIfUpdateReadFromEntangledAsyncAction();
            nextProps = nextState.element;
            if (prevSibling.isDehydrated)
              if (
                ((prevSibling = {
                  element: nextProps,
                  isDehydrated: !1,
                  cache: nextState.cache
                }),
                (workInProgress.updateQueue.baseState = prevSibling),
                (workInProgress.memoizedState = prevSibling),
                workInProgress.flags & 256)
              ) {
                workInProgress = mountHostRootWithoutHydrating(
                  current,
                  workInProgress,
                  nextProps,
                  renderLanes
                );
                break a;
              } else if (nextProps !== returnFiber) {
                returnFiber = createCapturedValueAtFiber(
                  Error(
                    "This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."
                  ),
                  workInProgress
                );
                queueHydrationError(returnFiber);
                workInProgress = mountHostRootWithoutHydrating(
                  current,
                  workInProgress,
                  nextProps,
                  renderLanes
                );
                break a;
              } else
                for (
                  nextHydratableInstance = getNextHydratable(
                    workInProgress.stateNode.containerInfo.firstChild
                  ),
                    hydrationParentFiber = workInProgress,
                    isHydrating = !0,
                    hydrationErrors = null,
                    didSuspendOrErrorDEV = !1,
                    hydrationDiffRootDEV = null,
                    rootOrSingletonContext = !0,
                    current = mountChildFibers(
                      workInProgress,
                      null,
                      nextProps,
                      renderLanes
                    ),
                    workInProgress.child = current;
                  current;

                )
                  (current.flags = (current.flags & -3) | 4096),
                    (current = current.sibling);
            else {
              resetHydrationState();
              if (nextProps === returnFiber) {
                workInProgress = bailoutOnAlreadyFinishedWork(
                  current,
                  workInProgress,
                  renderLanes
                );
                break a;
              }
              reconcileChildren(
                current,
                workInProgress,
                nextProps,
                renderLanes
              );
            }
            workInProgress = workInProgress.child;
          }
          return workInProgress;
        case 26:
          return (
            markRef(current, workInProgress),
            null === current
              ? (current = getResource(
                  workInProgress.type,
                  null,
                  workInProgress.pendingProps,
                  null
                ))
                ? (workInProgress.memoizedState = current)
                : isHydrating ||
                  ((current = workInProgress.type),
                  (renderLanes = workInProgress.pendingProps),
                  (returnFiber = requiredContext(
                    rootInstanceStackCursor.current
                  )),
                  (returnFiber =
                    getOwnerDocumentFromRootContainer(
                      returnFiber
                    ).createElement(current)),
                  (returnFiber[internalInstanceKey] = workInProgress),
                  (returnFiber[internalPropsKey] = renderLanes),
                  setInitialProperties(returnFiber, current, renderLanes),
                  markNodeAsHoistable(returnFiber),
                  (workInProgress.stateNode = returnFiber))
              : (workInProgress.memoizedState = getResource(
                  workInProgress.type,
                  current.memoizedProps,
                  workInProgress.pendingProps,
                  current.memoizedState
                )),
            null
          );
        case 27:
          return (
            pushHostContext(workInProgress),
            null === current &&
              isHydrating &&
              ((prevSibling = requiredContext(rootInstanceStackCursor.current)),
              (returnFiber = getHostContext()),
              (prevSibling = workInProgress.stateNode =
                resolveSingletonInstance(
                  workInProgress.type,
                  workInProgress.pendingProps,
                  prevSibling,
                  returnFiber,
                  !1
                )),
              didSuspendOrErrorDEV ||
                ((returnFiber = diffHydratedProperties(
                  prevSibling,
                  workInProgress.type,
                  workInProgress.pendingProps,
                  returnFiber
                )),
                null !== returnFiber &&
                  (buildHydrationDiffNode(workInProgress, 0).serverProps =
                    returnFiber)),
              (hydrationParentFiber = workInProgress),
              (rootOrSingletonContext = !0),
              (nextHydratableInstance = getNextHydratable(
                prevSibling.firstChild
              ))),
            (returnFiber = workInProgress.pendingProps.children),
            null !== current || isHydrating
              ? reconcileChildren(
                  current,
                  workInProgress,
                  returnFiber,
                  renderLanes
                )
              : (workInProgress.child = reconcileChildFibers(
                  workInProgress,
                  null,
                  returnFiber,
                  renderLanes
                )),
            markRef(current, workInProgress),
            workInProgress.child
          );
        case 5:
          return (
            null === current &&
              isHydrating &&
              ((nextProps = getHostContext()),
              (returnFiber = validateDOMNesting(
                workInProgress.type,
                nextProps.ancestorInfo
              )),
              (prevSibling = nextHydratableInstance),
              (nextState = !prevSibling) ||
                ((nextState = canHydrateInstance(
                  prevSibling,
                  workInProgress.type,
                  workInProgress.pendingProps,
                  rootOrSingletonContext
                )),
                null !== nextState
                  ? ((workInProgress.stateNode = nextState),
                    didSuspendOrErrorDEV ||
                      ((nextProps = diffHydratedProperties(
                        nextState,
                        workInProgress.type,
                        workInProgress.pendingProps,
                        nextProps
                      )),
                      null !== nextProps &&
                        (buildHydrationDiffNode(workInProgress, 0).serverProps =
                          nextProps)),
                    (hydrationParentFiber = workInProgress),
                    (nextHydratableInstance = getNextHydratable(
                      nextState.firstChild
                    )),
                    (rootOrSingletonContext = !1),
                    (nextProps = !0))
                  : (nextProps = !1),
                (nextState = !nextProps)),
              nextState &&
                (returnFiber &&
                  warnNonHydratedInstance(workInProgress, prevSibling),
                throwOnHydrationMismatch(workInProgress))),
            pushHostContext(workInProgress),
            (prevSibling = workInProgress.type),
            (nextProps = workInProgress.pendingProps),
            (nextState = null !== current ? current.memoizedProps : null),
            (returnFiber = nextProps.children),
            shouldSetTextContent(prevSibling, nextProps)
              ? (returnFiber = null)
              : null !== nextState &&
                shouldSetTextContent(prevSibling, nextState) &&
                (workInProgress.flags |= 32),
            null !== workInProgress.memoizedState &&
              ((prevSibling = renderWithHooks(
                current,
                workInProgress,
                TransitionAwareHostComponent,
                null,
                null,
                renderLanes
              )),
              (HostTransitionContext._currentValue = prevSibling)),
            markRef(current, workInProgress),
            reconcileChildren(
              current,
              workInProgress,
              returnFiber,
              renderLanes
            ),
            workInProgress.child
          );
        case 6:
          return (
            null === current &&
              isHydrating &&
              ((current = workInProgress.pendingProps),
              (renderLanes = getHostContext().ancestorInfo.current),
              (current =
                null != renderLanes
                  ? validateTextNesting(current, renderLanes.tag)
                  : !0),
              (renderLanes = nextHydratableInstance),
              (returnFiber = !renderLanes) ||
                ((returnFiber = canHydrateTextInstance(
                  renderLanes,
                  workInProgress.pendingProps,
                  rootOrSingletonContext
                )),
                null !== returnFiber
                  ? ((workInProgress.stateNode = returnFiber),
                    (hydrationParentFiber = workInProgress),
                    (nextHydratableInstance = null),
                    (returnFiber = !0))
                  : (returnFiber = !1),
                (returnFiber = !returnFiber)),
              returnFiber &&
                (current &&
                  warnNonHydratedInstance(workInProgress, renderLanes),
                throwOnHydrationMismatch(workInProgress))),
            null
          );
        case 13:
          return updateSuspenseComponent(current, workInProgress, renderLanes);
        case 4:
          return (
            pushHostContainer(
              workInProgress,
              workInProgress.stateNode.containerInfo
            ),
            (returnFiber = workInProgress.pendingProps),
            null === current
              ? (workInProgress.child = reconcileChildFibers(
                  workInProgress,
                  null,
                  returnFiber,
                  renderLanes
                ))
              : reconcileChildren(
                  current,
                  workInProgress,
                  returnFiber,
                  renderLanes
                ),
            workInProgress.child
          );
        case 11:
          return updateForwardRef(
            current,
            workInProgress,
            workInProgress.type,
            workInProgress.pendingProps,
            renderLanes
          );
        case 7:
          return (
            reconcileChildren(
              current,
              workInProgress,
              workInProgress.pendingProps,
              renderLanes
            ),
            workInProgress.child
          );
        case 8:
          return (
            reconcileChildren(
              current,
              workInProgress,
              workInProgress.pendingProps.children,
              renderLanes
            ),
            workInProgress.child
          );
        case 12:
          return (
            (workInProgress.flags |= 4),
            (workInProgress.flags |= 2048),
            (returnFiber = workInProgress.stateNode),
            (returnFiber.effectDuration = -0),
            (returnFiber.passiveEffectDuration = -0),
            reconcileChildren(
              current,
              workInProgress,
              workInProgress.pendingProps.children,
              renderLanes
            ),
            workInProgress.child
          );
        case 10:
          return (
            (returnFiber = workInProgress.type),
            (prevSibling = workInProgress.pendingProps),
            (nextProps = prevSibling.value),
            "value" in prevSibling ||
              hasWarnedAboutUsingNoValuePropOnContextProvider ||
              ((hasWarnedAboutUsingNoValuePropOnContextProvider = !0),
              console.error(
                "The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"
              )),
            pushProvider(workInProgress, returnFiber, nextProps),
            reconcileChildren(
              current,
              workInProgress,
              prevSibling.children,
              renderLanes
            ),
            workInProgress.child
          );
        case 9:
          return (
            (prevSibling = workInProgress.type._context),
            (returnFiber = workInProgress.pendingProps.children),
            "function" !== typeof returnFiber &&
              console.error(
                "A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."
              ),
            prepareToReadContext(workInProgress),
            (prevSibling = readContext(prevSibling)),
            markComponentRenderStarted(workInProgress),
            (returnFiber = callComponentInDEV(
              returnFiber,
              prevSibling,
              void 0
            )),
            markComponentRenderStopped(),
            (workInProgress.flags |= 1),
            reconcileChildren(
              current,
              workInProgress,
              returnFiber,
              renderLanes
            ),
            workInProgress.child
          );
        case 14:
          return updateMemoComponent(
            current,
            workInProgress,
            workInProgress.type,
            workInProgress.pendingProps,
            renderLanes
          );
        case 15:
          return updateSimpleMemoComponent(
            current,
            workInProgress,
            workInProgress.type,
            workInProgress.pendingProps,
            renderLanes
          );
        case 19:
          return updateSuspenseListComponent(
            current,
            workInProgress,
            renderLanes
          );
        case 22:
          return updateOffscreenComponent(current, workInProgress, renderLanes);
        case 24:
          return (
            prepareToReadContext(workInProgress),
            (returnFiber = readContext(CacheContext)),
            null === current
              ? ((prevSibling = peekCacheFromPool()),
                null === prevSibling &&
                  ((prevSibling = workInProgressRoot),
                  (nextProps = createCache()),
                  (prevSibling.pooledCache = nextProps),
                  retainCache(nextProps),
                  null !== nextProps &&
                    (prevSibling.pooledCacheLanes |= renderLanes),
                  (prevSibling = nextProps)),
                (workInProgress.memoizedState = {
                  parent: returnFiber,
                  cache: prevSibling
                }),
                initializeUpdateQueue(workInProgress),
                pushProvider(workInProgress, CacheContext, prevSibling))
              : (0 !== (current.lanes & renderLanes) &&
                  (cloneUpdateQueue(current, workInProgress),
                  processUpdateQueue(workInProgress, null, null, renderLanes),
                  suspendIfUpdateReadFromEntangledAsyncAction()),
                (prevSibling = current.memoizedState),
                (nextProps = workInProgress.memoizedState),
                prevSibling.parent !== returnFiber
                  ? ((prevSibling = {
                      parent: returnFiber,
                      cache: returnFiber
                    }),
                    (workInProgress.memoizedState = prevSibling),
                    0 === workInProgress.lanes &&
                      (workInProgress.memoizedState =
                        workInProgress.updateQueue.baseState =
                          prevSibling),
                    pushProvider(workInProgress, CacheContext, returnFiber))
                  : ((returnFiber = nextProps.cache),
                    pushProvider(workInProgress, CacheContext, returnFiber),
                    returnFiber !== prevSibling.cache &&
                      propagateContextChanges(
                        workInProgress,
                        [CacheContext],
                        renderLanes,
                        !0
                      ))),
            reconcileChildren(
              current,
              workInProgress,
              workInProgress.pendingProps.children,
              renderLanes
            ),
            workInProgress.child
          );
        case 29:
          throw workInProgress.pendingProps;
      }
      throw Error(
        "Unknown unit of work tag (" +
          workInProgress.tag +
          "). This error is likely caused by a bug in React. Please file an issue."
      );
    }
    function resetContextDependencies() {
      lastContextDependency = currentlyRenderingFiber = null;
      isDisallowedContextReadInDEV = !1;
    }
    function pushProvider(providerFiber, context, nextValue) {
      push(valueCursor, context._currentValue, providerFiber);
      context._currentValue = nextValue;
      push(rendererCursorDEV, context._currentRenderer, providerFiber);
      void 0 !== context._currentRenderer &&
        null !== context._currentRenderer &&
        context._currentRenderer !== rendererSigil &&
        console.error(
          "Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."
        );
      context._currentRenderer = rendererSigil;
    }
    function popProvider(context, providerFiber) {
      context._currentValue = valueCursor.current;
      var currentRenderer = rendererCursorDEV.current;
      pop(rendererCursorDEV, providerFiber);
      context._currentRenderer = currentRenderer;
      pop(valueCursor, providerFiber);
    }
    function scheduleContextWorkOnParentPath(
      parent,
      renderLanes,
      propagationRoot
    ) {
      for (; null !== parent; ) {
        var alternate = parent.alternate;
        (parent.childLanes & renderLanes) !== renderLanes
          ? ((parent.childLanes |= renderLanes),
            null !== alternate && (alternate.childLanes |= renderLanes))
          : null !== alternate &&
            (alternate.childLanes & renderLanes) !== renderLanes &&
            (alternate.childLanes |= renderLanes);
        if (parent === propagationRoot) break;
        parent = parent.return;
      }
      parent !== propagationRoot &&
        console.error(
          "Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue."
        );
    }
    function propagateContextChanges(
      workInProgress,
      contexts,
      renderLanes,
      forcePropagateEntireTree
    ) {
      var fiber = workInProgress.child;
      null !== fiber && (fiber.return = workInProgress);
      for (; null !== fiber; ) {
        var list = fiber.dependencies;
        if (null !== list) {
          var nextFiber = fiber.child;
          list = list.firstContext;
          a: for (; null !== list; ) {
            var dependency = list;
            list = fiber;
            for (var i = 0; i < contexts.length; i++)
              if (dependency.context === contexts[i]) {
                list.lanes |= renderLanes;
                dependency = list.alternate;
                null !== dependency && (dependency.lanes |= renderLanes);
                scheduleContextWorkOnParentPath(
                  list.return,
                  renderLanes,
                  workInProgress
                );
                forcePropagateEntireTree || (nextFiber = null);
                break a;
              }
            list = dependency.next;
          }
        } else if (18 === fiber.tag) {
          nextFiber = fiber.return;
          if (null === nextFiber)
            throw Error(
              "We just came from a parent so we must have had a parent. This is a bug in React."
            );
          nextFiber.lanes |= renderLanes;
          list = nextFiber.alternate;
          null !== list && (list.lanes |= renderLanes);
          scheduleContextWorkOnParentPath(
            nextFiber,
            renderLanes,
            workInProgress
          );
          nextFiber = null;
        } else nextFiber = fiber.child;
        if (null !== nextFiber) nextFiber.return = fiber;
        else
          for (nextFiber = fiber; null !== nextFiber; ) {
            if (nextFiber === workInProgress) {
              nextFiber = null;
              break;
            }
            fiber = nextFiber.sibling;
            if (null !== fiber) {
              fiber.return = nextFiber.return;
              nextFiber = fiber;
              break;
            }
            nextFiber = nextFiber.return;
          }
        fiber = nextFiber;
      }
    }
    function propagateParentContextChanges(
      current,
      workInProgress,
      renderLanes,
      forcePropagateEntireTree
    ) {
      current = null;
      for (
        var parent = workInProgress, isInsidePropagationBailout = !1;
        null !== parent;

      ) {
        if (!isInsidePropagationBailout)
          if (0 !== (parent.flags & 524288)) isInsidePropagationBailout = !0;
          else if (0 !== (parent.flags & 262144)) break;
        if (10 === parent.tag) {
          var currentParent = parent.alternate;
          if (null === currentParent)
            throw Error("Should have a current fiber. This is a bug in React.");
          currentParent = currentParent.memoizedProps;
          if (null !== currentParent) {
            var context = parent.type;
            objectIs(parent.pendingProps.value, currentParent.value) ||
              (null !== current
                ? current.push(context)
                : (current = [context]));
          }
        } else if (parent === hostTransitionProviderCursor.current) {
          currentParent = parent.alternate;
          if (null === currentParent)
            throw Error("Should have a current fiber. This is a bug in React.");
          currentParent.memoizedState.memoizedState !==
            parent.memoizedState.memoizedState &&
            (null !== current
              ? current.push(HostTransitionContext)
              : (current = [HostTransitionContext]));
        }
        parent = parent.return;
      }
      null !== current &&
        propagateContextChanges(
          workInProgress,
          current,
          renderLanes,
          forcePropagateEntireTree
        );
      workInProgress.flags |= 262144;
    }
    function checkIfContextChanged(currentDependencies) {
      for (
        currentDependencies = currentDependencies.firstContext;
        null !== currentDependencies;

      ) {
        if (
          !objectIs(
            currentDependencies.context._currentValue,
            currentDependencies.memoizedValue
          )
        )
          return !0;
        currentDependencies = currentDependencies.next;
      }
      return !1;
    }
    function prepareToReadContext(workInProgress) {
      currentlyRenderingFiber = workInProgress;
      lastContextDependency = null;
      workInProgress = workInProgress.dependencies;
      null !== workInProgress && (workInProgress.firstContext = null);
    }
    function readContext(context) {
      isDisallowedContextReadInDEV &&
        console.error(
          "Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."
        );
      return readContextForConsumer(currentlyRenderingFiber, context);
    }
    function readContextDuringReconciliation(consumer, context) {
      null === currentlyRenderingFiber && prepareToReadContext(consumer);
      return readContextForConsumer(consumer, context);
    }
    function readContextForConsumer(consumer, context) {
      var value = context._currentValue;
      context = { context: context, memoizedValue: value, next: null };
      if (null === lastContextDependency) {
        if (null === consumer)
          throw Error(
            "Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."
          );
        lastContextDependency = context;
        consumer.dependencies = {
          lanes: 0,
          firstContext: context,
          _debugThenableState: null
        };
        consumer.flags |= 524288;
      } else lastContextDependency = lastContextDependency.next = context;
      return value;
    }
    function initializeUpdateQueue(fiber) {
      fiber.updateQueue = {
        baseState: fiber.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, lanes: 0, hiddenCallbacks: null },
        callbacks: null
      };
    }
    function cloneUpdateQueue(current, workInProgress) {
      current = current.updateQueue;
      workInProgress.updateQueue === current &&
        (workInProgress.updateQueue = {
          baseState: current.baseState,
          firstBaseUpdate: current.firstBaseUpdate,
          lastBaseUpdate: current.lastBaseUpdate,
          shared: current.shared,
          callbacks: null
        });
    }
    function createUpdate(lane) {
      return {
        lane: lane,
        tag: UpdateState,
        payload: null,
        callback: null,
        next: null
      };
    }
    function enqueueUpdate(fiber, update, lane) {
      var updateQueue = fiber.updateQueue;
      if (null === updateQueue) return null;
      updateQueue = updateQueue.shared;
      if (
        currentlyProcessingQueue === updateQueue &&
        !didWarnUpdateInsideUpdate
      ) {
        var componentName = getComponentNameFromFiber(fiber);
        console.error(
          "An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback.\n\nPlease update the following component: %s",
          componentName
        );
        didWarnUpdateInsideUpdate = !0;
      }
      if ((executionContext & RenderContext) !== NoContext)
        return (
          (componentName = updateQueue.pending),
          null === componentName
            ? (update.next = update)
            : ((update.next = componentName.next),
              (componentName.next = update)),
          (updateQueue.pending = update),
          (update = getRootForUpdatedFiber(fiber)),
          markUpdateLaneFromFiberToRoot(fiber, null, lane),
          update
        );
      enqueueUpdate$1(fiber, updateQueue, update, lane);
      return getRootForUpdatedFiber(fiber);
    }
    function entangleTransitions(root, fiber, lane) {
      fiber = fiber.updateQueue;
      if (null !== fiber && ((fiber = fiber.shared), 0 !== (lane & 4194176))) {
        var queueLanes = fiber.lanes;
        queueLanes &= root.pendingLanes;
        lane |= queueLanes;
        fiber.lanes = lane;
        markRootEntangled(root, lane);
      }
    }
    function enqueueCapturedUpdate(workInProgress, capturedUpdate) {
      var queue = workInProgress.updateQueue,
        current = workInProgress.alternate;
      if (
        null !== current &&
        ((current = current.updateQueue), queue === current)
      ) {
        var newFirst = null,
          newLast = null;
        queue = queue.firstBaseUpdate;
        if (null !== queue) {
          do {
            var clone = {
              lane: queue.lane,
              tag: queue.tag,
              payload: queue.payload,
              callback: null,
              next: null
            };
            null === newLast
              ? (newFirst = newLast = clone)
              : (newLast = newLast.next = clone);
            queue = queue.next;
          } while (null !== queue);
          null === newLast
            ? (newFirst = newLast = capturedUpdate)
            : (newLast = newLast.next = capturedUpdate);
        } else newFirst = newLast = capturedUpdate;
        queue = {
          baseState: current.baseState,
          firstBaseUpdate: newFirst,
          lastBaseUpdate: newLast,
          shared: current.shared,
          callbacks: current.callbacks
        };
        workInProgress.updateQueue = queue;
        return;
      }
      workInProgress = queue.lastBaseUpdate;
      null === workInProgress
        ? (queue.firstBaseUpdate = capturedUpdate)
        : (workInProgress.next = capturedUpdate);
      queue.lastBaseUpdate = capturedUpdate;
    }
    function suspendIfUpdateReadFromEntangledAsyncAction() {
      if (didReadFromEntangledAsyncAction) {
        var entangledActionThenable = currentEntangledActionThenable;
        if (null !== entangledActionThenable) throw entangledActionThenable;
      }
    }
    function processUpdateQueue(
      workInProgress,
      props,
      instance$jscomp$0,
      renderLanes
    ) {
      didReadFromEntangledAsyncAction = !1;
      var queue = workInProgress.updateQueue;
      hasForceUpdate = !1;
      currentlyProcessingQueue = queue.shared;
      var firstBaseUpdate = queue.firstBaseUpdate,
        lastBaseUpdate = queue.lastBaseUpdate,
        pendingQueue = queue.shared.pending;
      if (null !== pendingQueue) {
        queue.shared.pending = null;
        var lastPendingUpdate = pendingQueue,
          firstPendingUpdate = lastPendingUpdate.next;
        lastPendingUpdate.next = null;
        null === lastBaseUpdate
          ? (firstBaseUpdate = firstPendingUpdate)
          : (lastBaseUpdate.next = firstPendingUpdate);
        lastBaseUpdate = lastPendingUpdate;
        var current = workInProgress.alternate;
        null !== current &&
          ((current = current.updateQueue),
          (pendingQueue = current.lastBaseUpdate),
          pendingQueue !== lastBaseUpdate &&
            (null === pendingQueue
              ? (current.firstBaseUpdate = firstPendingUpdate)
              : (pendingQueue.next = firstPendingUpdate),
            (current.lastBaseUpdate = lastPendingUpdate)));
      }
      if (null !== firstBaseUpdate) {
        var newState = queue.baseState;
        lastBaseUpdate = 0;
        current = firstPendingUpdate = lastPendingUpdate = null;
        pendingQueue = firstBaseUpdate;
        do {
          var updateLane = pendingQueue.lane & -536870913,
            isHiddenUpdate = updateLane !== pendingQueue.lane;
          if (
            isHiddenUpdate
              ? (workInProgressRootRenderLanes & updateLane) === updateLane
              : (renderLanes & updateLane) === updateLane
          ) {
            0 !== updateLane &&
              updateLane === currentEntangledLane &&
              (didReadFromEntangledAsyncAction = !0);
            null !== current &&
              (current = current.next =
                {
                  lane: 0,
                  tag: pendingQueue.tag,
                  payload: pendingQueue.payload,
                  callback: null,
                  next: null
                });
            a: {
              updateLane = workInProgress;
              var partialState = pendingQueue;
              var nextProps = props,
                instance = instance$jscomp$0;
              switch (partialState.tag) {
                case ReplaceState:
                  partialState = partialState.payload;
                  if ("function" === typeof partialState) {
                    isDisallowedContextReadInDEV = !0;
                    var nextState = partialState.call(
                      instance,
                      newState,
                      nextProps
                    );
                    if (updateLane.mode & StrictLegacyMode) {
                      setIsStrictModeForDevtools(!0);
                      try {
                        partialState.call(instance, newState, nextProps);
                      } finally {
                        setIsStrictModeForDevtools(!1);
                      }
                    }
                    isDisallowedContextReadInDEV = !1;
                    newState = nextState;
                    break a;
                  }
                  newState = partialState;
                  break a;
                case CaptureUpdate:
                  updateLane.flags = (updateLane.flags & -65537) | 128;
                case UpdateState:
                  nextState = partialState.payload;
                  if ("function" === typeof nextState) {
                    isDisallowedContextReadInDEV = !0;
                    partialState = nextState.call(
                      instance,
                      newState,
                      nextProps
                    );
                    if (updateLane.mode & StrictLegacyMode) {
                      setIsStrictModeForDevtools(!0);
                      try {
                        nextState.call(instance, newState, nextProps);
                      } finally {
                        setIsStrictModeForDevtools(!1);
                      }
                    }
                    isDisallowedContextReadInDEV = !1;
                  } else partialState = nextState;
                  if (null === partialState || void 0 === partialState) break a;
                  newState = assign({}, newState, partialState);
                  break a;
                case ForceUpdate:
                  hasForceUpdate = !0;
              }
            }
            updateLane = pendingQueue.callback;
            null !== updateLane &&
              ((workInProgress.flags |= 64),
              isHiddenUpdate && (workInProgress.flags |= 8192),
              (isHiddenUpdate = queue.callbacks),
              null === isHiddenUpdate
                ? (queue.callbacks = [updateLane])
                : isHiddenUpdate.push(updateLane));
          } else
            (isHiddenUpdate = {
              lane: updateLane,
              tag: pendingQueue.tag,
              payload: pendingQueue.payload,
              callback: pendingQueue.callback,
              next: null
            }),
              null === current
                ? ((firstPendingUpdate = current = isHiddenUpdate),
                  (lastPendingUpdate = newState))
                : (current = current.next = isHiddenUpdate),
              (lastBaseUpdate |= updateLane);
          pendingQueue = pendingQueue.next;
          if (null === pendingQueue)
            if (((pendingQueue = queue.shared.pending), null === pendingQueue))
              break;
            else
              (isHiddenUpdate = pendingQueue),
                (pendingQueue = isHiddenUpdate.next),
                (isHiddenUpdate.next = null),
                (queue.lastBaseUpdate = isHiddenUpdate),
                (queue.shared.pending = null);
        } while (1);
        null === current && (lastPendingUpdate = newState);
        queue.baseState = lastPendingUpdate;
        queue.firstBaseUpdate = firstPendingUpdate;
        queue.lastBaseUpdate = current;
        null === firstBaseUpdate && (queue.shared.lanes = 0);
        workInProgressRootSkippedLanes |= lastBaseUpdate;
        workInProgress.lanes = lastBaseUpdate;
        workInProgress.memoizedState = newState;
      }
      currentlyProcessingQueue = null;
    }
    function callCallback(callback, context) {
      if ("function" !== typeof callback)
        throw Error(
          "Invalid argument passed as callback. Expected a function. Instead received: " +
            callback
        );
      callback.call(context);
    }
    function commitHiddenCallbacks(updateQueue, context) {
      var hiddenCallbacks = updateQueue.shared.hiddenCallbacks;
      if (null !== hiddenCallbacks)
        for (
          updateQueue.shared.hiddenCallbacks = null, updateQueue = 0;
          updateQueue < hiddenCallbacks.length;
          updateQueue++
        )
          callCallback(hiddenCallbacks[updateQueue], context);
    }
    function commitCallbacks(updateQueue, context) {
      var callbacks = updateQueue.callbacks;
      if (null !== callbacks)
        for (
          updateQueue.callbacks = null, updateQueue = 0;
          updateQueue < callbacks.length;
          updateQueue++
        )
          callCallback(callbacks[updateQueue], context);
    }
    function shouldProfile(current) {
      return (current.mode & ProfileMode) !== NoMode;
    }
    function commitHookLayoutEffects(finishedWork, hookFlags) {
      shouldProfile(finishedWork)
        ? (startEffectTimer(),
          commitHookEffectListMount(hookFlags, finishedWork),
          recordEffectDuration())
        : commitHookEffectListMount(hookFlags, finishedWork);
    }
    function commitHookLayoutUnmountEffects(
      finishedWork,
      nearestMountedAncestor,
      hookFlags
    ) {
      shouldProfile(finishedWork)
        ? (startEffectTimer(),
          commitHookEffectListUnmount(
            hookFlags,
            finishedWork,
            nearestMountedAncestor
          ),
          recordEffectDuration())
        : commitHookEffectListUnmount(
            hookFlags,
            finishedWork,
            nearestMountedAncestor
          );
    }
    function commitHookEffectListMount(flags, finishedWork) {
      try {
        var updateQueue = finishedWork.updateQueue,
          lastEffect = null !== updateQueue ? updateQueue.lastEffect : null;
        if (null !== lastEffect) {
          var firstEffect = lastEffect.next;
          updateQueue = firstEffect;
          do {
            if (
              (updateQueue.tag & flags) === flags &&
              ((flags & Passive) !== NoFlags
                ? null !== injectedProfilingHooks &&
                  "function" ===
                    typeof injectedProfilingHooks.markComponentPassiveEffectMountStarted &&
                  injectedProfilingHooks.markComponentPassiveEffectMountStarted(
                    finishedWork
                  )
                : (flags & Layout) !== NoFlags &&
                  null !== injectedProfilingHooks &&
                  "function" ===
                    typeof injectedProfilingHooks.markComponentLayoutEffectMountStarted &&
                  injectedProfilingHooks.markComponentLayoutEffectMountStarted(
                    finishedWork
                  ),
              (lastEffect = void 0),
              (flags & Insertion) !== NoFlags &&
                (isRunningInsertionEffect = !0),
              (lastEffect = runWithFiberInDEV(
                finishedWork,
                callCreateInDEV,
                updateQueue
              )),
              (flags & Insertion) !== NoFlags &&
                (isRunningInsertionEffect = !1),
              (flags & Passive) !== NoFlags
                ? null !== injectedProfilingHooks &&
                  "function" ===
                    typeof injectedProfilingHooks.markComponentPassiveEffectMountStopped &&
                  injectedProfilingHooks.markComponentPassiveEffectMountStopped()
                : (flags & Layout) !== NoFlags &&
                  null !== injectedProfilingHooks &&
                  "function" ===
                    typeof injectedProfilingHooks.markComponentLayoutEffectMountStopped &&
                  injectedProfilingHooks.markComponentLayoutEffectMountStopped(),
              void 0 !== lastEffect && "function" !== typeof lastEffect)
            ) {
              var hookName = void 0;
              hookName =
                0 !== (updateQueue.tag & Layout)
                  ? "useLayoutEffect"
                  : 0 !== (updateQueue.tag & Insertion)
                    ? "useInsertionEffect"
                    : "useEffect";
              var addendum = void 0;
              addendum =
                null === lastEffect
                  ? " You returned null. If your effect does not require clean up, return undefined (or nothing)."
                  : "function" === typeof lastEffect.then
                    ? "\n\nIt looks like you wrote " +
                      hookName +
                      "(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:\n\n" +
                      hookName +
                      "(() => {\n  async function fetchData() {\n    // You can await here\n    const response = await MyAPI.getData(someId);\n    // ...\n  }\n  fetchData();\n}, [someId]); // Or [] if effect doesn't need props or state\n\nLearn more about data fetching with Hooks: https://react.dev/link/hooks-data-fetching"
                    : " You returned: " + lastEffect;
              runWithFiberInDEV(
                finishedWork,
                function (n, a) {
                  console.error(
                    "%s must not return anything besides a function, which is used for clean-up.%s",
                    n,
                    a
                  );
                },
                hookName,
                addendum
              );
            }
            updateQueue = updateQueue.next;
          } while (updateQueue !== firstEffect);
        }
      } catch (error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, error);
      }
    }
    function commitHookEffectListUnmount(
      flags,
      finishedWork,
      nearestMountedAncestor
    ) {
      try {
        var updateQueue = finishedWork.updateQueue,
          lastEffect = null !== updateQueue ? updateQueue.lastEffect : null;
        if (null !== lastEffect) {
          var firstEffect = lastEffect.next;
          updateQueue = firstEffect;
          do {
            if ((updateQueue.tag & flags) === flags) {
              var inst = updateQueue.inst,
                destroy = inst.destroy;
              void 0 !== destroy &&
                ((inst.destroy = void 0),
                (flags & Passive) !== NoFlags
                  ? null !== injectedProfilingHooks &&
                    "function" ===
                      typeof injectedProfilingHooks.markComponentPassiveEffectUnmountStarted &&
                    injectedProfilingHooks.markComponentPassiveEffectUnmountStarted(
                      finishedWork
                    )
                  : (flags & Layout) !== NoFlags &&
                    null !== injectedProfilingHooks &&
                    "function" ===
                      typeof injectedProfilingHooks.markComponentLayoutEffectUnmountStarted &&
                    injectedProfilingHooks.markComponentLayoutEffectUnmountStarted(
                      finishedWork
                    ),
                (flags & Insertion) !== NoFlags &&
                  (isRunningInsertionEffect = !0),
                runWithFiberInDEV(
                  finishedWork,
                  callDestroyInDEV,
                  finishedWork,
                  nearestMountedAncestor,
                  destroy
                ),
                (flags & Insertion) !== NoFlags &&
                  (isRunningInsertionEffect = !1),
                (flags & Passive) !== NoFlags
                  ? null !== injectedProfilingHooks &&
                    "function" ===
                      typeof injectedProfilingHooks.markComponentPassiveEffectUnmountStopped &&
                    injectedProfilingHooks.markComponentPassiveEffectUnmountStopped()
                  : (flags & Layout) !== NoFlags &&
                    null !== injectedProfilingHooks &&
                    "function" ===
                      typeof injectedProfilingHooks.markComponentLayoutEffectUnmountStopped &&
                    injectedProfilingHooks.markComponentLayoutEffectUnmountStopped());
            }
            updateQueue = updateQueue.next;
          } while (updateQueue !== firstEffect);
        }
      } catch (error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, error);
      }
    }
    function commitHookPassiveMountEffects(finishedWork, hookFlags) {
      shouldProfile(finishedWork)
        ? (startEffectTimer(),
          commitHookEffectListMount(hookFlags, finishedWork),
          recordEffectDuration())
        : commitHookEffectListMount(hookFlags, finishedWork);
    }
    function commitHookPassiveUnmountEffects(
      finishedWork,
      nearestMountedAncestor,
      hookFlags
    ) {
      shouldProfile(finishedWork)
        ? (startEffectTimer(),
          commitHookEffectListUnmount(
            hookFlags,
            finishedWork,
            nearestMountedAncestor
          ),
          recordEffectDuration())
        : commitHookEffectListUnmount(
            hookFlags,
            finishedWork,
            nearestMountedAncestor
          );
    }
    function commitClassCallbacks(finishedWork) {
      var updateQueue = finishedWork.updateQueue;
      if (null !== updateQueue) {
        var instance = finishedWork.stateNode;
        finishedWork.type.defaultProps ||
          "ref" in finishedWork.memoizedProps ||
          didWarnAboutReassigningProps ||
          (instance.props !== finishedWork.memoizedProps &&
            console.error(
              "Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",
              getComponentNameFromFiber(finishedWork) || "instance"
            ),
          instance.state !== finishedWork.memoizedState &&
            console.error(
              "Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",
              getComponentNameFromFiber(finishedWork) || "instance"
            ));
        try {
          runWithFiberInDEV(
            finishedWork,
            commitCallbacks,
            updateQueue,
            instance
          );
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
      }
    }
    function callGetSnapshotBeforeUpdates(instance, prevProps, prevState) {
      return instance.getSnapshotBeforeUpdate(prevProps, prevState);
    }
    function commitClassSnapshot(finishedWork, current) {
      var prevProps = current.memoizedProps,
        prevState = current.memoizedState;
      current = finishedWork.stateNode;
      finishedWork.type.defaultProps ||
        "ref" in finishedWork.memoizedProps ||
        didWarnAboutReassigningProps ||
        (current.props !== finishedWork.memoizedProps &&
          console.error(
            "Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",
            getComponentNameFromFiber(finishedWork) || "instance"
          ),
        current.state !== finishedWork.memoizedState &&
          console.error(
            "Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",
            getComponentNameFromFiber(finishedWork) || "instance"
          ));
      try {
        var resolvedPrevProps = resolveClassComponentProps(
          finishedWork.type,
          prevProps,
          finishedWork.elementType === finishedWork.type
        );
        var snapshot = runWithFiberInDEV(
          finishedWork,
          callGetSnapshotBeforeUpdates,
          current,
          resolvedPrevProps,
          prevState
        );
        prevProps = didWarnAboutUndefinedSnapshotBeforeUpdate;
        void 0 !== snapshot ||
          prevProps.has(finishedWork.type) ||
          (prevProps.add(finishedWork.type),
          runWithFiberInDEV(finishedWork, function () {
            console.error(
              "%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.",
              getComponentNameFromFiber(finishedWork)
            );
          }));
        current.__reactInternalSnapshotBeforeUpdate = snapshot;
      } catch (error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, error);
      }
    }
    function safelyCallComponentWillUnmount(
      current,
      nearestMountedAncestor,
      instance
    ) {
      instance.props = resolveClassComponentProps(
        current.type,
        current.memoizedProps
      );
      instance.state = current.memoizedState;
      shouldProfile(current)
        ? (startEffectTimer(),
          runWithFiberInDEV(
            current,
            callComponentWillUnmountInDEV,
            current,
            nearestMountedAncestor,
            instance
          ),
          recordEffectDuration())
        : runWithFiberInDEV(
            current,
            callComponentWillUnmountInDEV,
            current,
            nearestMountedAncestor,
            instance
          );
    }
    function commitAttachRef(finishedWork) {
      var ref = finishedWork.ref;
      if (null !== ref) {
        var instance = finishedWork.stateNode;
        if ("function" === typeof ref)
          if (shouldProfile(finishedWork))
            try {
              startEffectTimer(), (finishedWork.refCleanup = ref(instance));
            } finally {
              recordEffectDuration();
            }
          else finishedWork.refCleanup = ref(instance);
        else
          "string" === typeof ref
            ? console.error("String refs are no longer supported.")
            : ref.hasOwnProperty("current") ||
              console.error(
                "Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().",
                getComponentNameFromFiber(finishedWork)
              ),
            (ref.current = instance);
      }
    }
    function safelyAttachRef(current, nearestMountedAncestor) {
      try {
        runWithFiberInDEV(current, commitAttachRef, current);
      } catch (error) {
        captureCommitPhaseError(current, nearestMountedAncestor, error);
      }
    }
    function safelyDetachRef(current, nearestMountedAncestor) {
      var ref = current.ref,
        refCleanup = current.refCleanup;
      if (null !== ref)
        if ("function" === typeof refCleanup)
          try {
            if (shouldProfile(current))
              try {
                startEffectTimer(), runWithFiberInDEV(current, refCleanup);
              } finally {
                recordEffectDuration(current);
              }
            else runWithFiberInDEV(current, refCleanup);
          } catch (error) {
            captureCommitPhaseError(current, nearestMountedAncestor, error);
          } finally {
            (current.refCleanup = null),
              (current = current.alternate),
              null != current && (current.refCleanup = null);
          }
        else if ("function" === typeof ref)
          try {
            if (shouldProfile(current))
              try {
                startEffectTimer(), runWithFiberInDEV(current, ref, null);
              } finally {
                recordEffectDuration(current);
              }
            else runWithFiberInDEV(current, ref, null);
          } catch (error$6) {
            captureCommitPhaseError(current, nearestMountedAncestor, error$6);
          }
        else ref.current = null;
    }
    function commitProfiler(
      finishedWork,
      current,
      commitStartTime,
      effectDuration
    ) {
      var _finishedWork$memoize = finishedWork.memoizedProps,
        id = _finishedWork$memoize.id,
        onCommit = _finishedWork$memoize.onCommit;
      _finishedWork$memoize = _finishedWork$memoize.onRender;
      current = null === current ? "mount" : "update";
      currentUpdateIsNested && (current = "nested-update");
      "function" === typeof _finishedWork$memoize &&
        _finishedWork$memoize(
          id,
          current,
          finishedWork.actualDuration,
          finishedWork.treeBaseDuration,
          finishedWork.actualStartTime,
          commitStartTime
        );
      "function" === typeof onCommit &&
        onCommit(
          finishedWork.memoizedProps.id,
          current,
          effectDuration,
          commitStartTime
        );
    }
    function commitProfilerPostCommitImpl(
      finishedWork,
      current,
      commitStartTime,
      passiveEffectDuration
    ) {
      var _finishedWork$memoize2 = finishedWork.memoizedProps;
      finishedWork = _finishedWork$memoize2.id;
      _finishedWork$memoize2 = _finishedWork$memoize2.onPostCommit;
      current = null === current ? "mount" : "update";
      currentUpdateIsNested && (current = "nested-update");
      "function" === typeof _finishedWork$memoize2 &&
        _finishedWork$memoize2(
          finishedWork,
          current,
          passiveEffectDuration,
          commitStartTime
        );
    }
    function commitHostMount(finishedWork) {
      var type = finishedWork.type,
        props = finishedWork.memoizedProps,
        instance = finishedWork.stateNode;
      try {
        runWithFiberInDEV(
          finishedWork,
          commitMount,
          instance,
          type,
          props,
          finishedWork
        );
      } catch (error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, error);
      }
    }
    function commitHostUpdate(finishedWork, newProps, oldProps) {
      try {
        runWithFiberInDEV(
          finishedWork,
          commitUpdate,
          finishedWork.stateNode,
          finishedWork.type,
          oldProps,
          newProps,
          finishedWork
        );
      } catch (error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, error);
      }
    }
    function isHostParent(fiber) {
      return (
        5 === fiber.tag ||
        3 === fiber.tag ||
        26 === fiber.tag ||
        27 === fiber.tag ||
        4 === fiber.tag
      );
    }
    function getHostSibling(fiber) {
      a: for (;;) {
        for (; null === fiber.sibling; ) {
          if (null === fiber.return || isHostParent(fiber.return)) return null;
          fiber = fiber.return;
        }
        fiber.sibling.return = fiber.return;
        for (
          fiber = fiber.sibling;
          5 !== fiber.tag &&
          6 !== fiber.tag &&
          27 !== fiber.tag &&
          18 !== fiber.tag;

        ) {
          if (fiber.flags & 2) continue a;
          if (null === fiber.child || 4 === fiber.tag) continue a;
          else (fiber.child.return = fiber), (fiber = fiber.child);
        }
        if (!(fiber.flags & 2)) return fiber.stateNode;
      }
    }
    function insertOrAppendPlacementNodeIntoContainer(node, before, parent) {
      var tag = node.tag;
      if (5 === tag || 6 === tag)
        (node = node.stateNode),
          before
            ? 8 === parent.nodeType
              ? parent.parentNode.insertBefore(node, before)
              : parent.insertBefore(node, before)
            : (8 === parent.nodeType
                ? ((before = parent.parentNode),
                  before.insertBefore(node, parent))
                : ((before = parent), before.appendChild(node)),
              (parent = parent._reactRootContainer),
              (null !== parent && void 0 !== parent) ||
                null !== before.onclick ||
                (before.onclick = noop$2));
      else if (4 !== tag && 27 !== tag && ((node = node.child), null !== node))
        for (
          insertOrAppendPlacementNodeIntoContainer(node, before, parent),
            node = node.sibling;
          null !== node;

        )
          insertOrAppendPlacementNodeIntoContainer(node, before, parent),
            (node = node.sibling);
    }
    function insertOrAppendPlacementNode(node, before, parent) {
      var tag = node.tag;
      if (5 === tag || 6 === tag)
        (node = node.stateNode),
          before ? parent.insertBefore(node, before) : parent.appendChild(node);
      else if (4 !== tag && 27 !== tag && ((node = node.child), null !== node))
        for (
          insertOrAppendPlacementNode(node, before, parent),
            node = node.sibling;
          null !== node;

        )
          insertOrAppendPlacementNode(node, before, parent),
            (node = node.sibling);
    }
    function commitPlacement(finishedWork) {
      if (27 !== finishedWork.tag) {
        a: {
          for (var parent = finishedWork.return; null !== parent; ) {
            if (isHostParent(parent)) {
              var parentFiber = parent;
              break a;
            }
            parent = parent.return;
          }
          throw Error(
            "Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue."
          );
        }
        switch (parentFiber.tag) {
          case 27:
            parent = parentFiber.stateNode;
            parentFiber = getHostSibling(finishedWork);
            insertOrAppendPlacementNode(finishedWork, parentFiber, parent);
            break;
          case 5:
            parent = parentFiber.stateNode;
            parentFiber.flags & 32 &&
              (resetTextContent(parent), (parentFiber.flags &= -33));
            parentFiber = getHostSibling(finishedWork);
            insertOrAppendPlacementNode(finishedWork, parentFiber, parent);
            break;
          case 3:
          case 4:
            parent = parentFiber.stateNode.containerInfo;
            parentFiber = getHostSibling(finishedWork);
            insertOrAppendPlacementNodeIntoContainer(
              finishedWork,
              parentFiber,
              parent
            );
            break;
          default:
            throw Error(
              "Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue."
            );
        }
      }
    }
    function commitBeforeMutationEffects(root, firstChild) {
      root = root.containerInfo;
      eventsEnabled = _enabled;
      root = getActiveElementDeep(root);
      if (hasSelectionCapabilities(root)) {
        if ("selectionStart" in root)
          var JSCompiler_temp = {
            start: root.selectionStart,
            end: root.selectionEnd
          };
        else
          a: {
            JSCompiler_temp =
              ((JSCompiler_temp = root.ownerDocument) &&
                JSCompiler_temp.defaultView) ||
              window;
            var selection =
              JSCompiler_temp.getSelection && JSCompiler_temp.getSelection();
            if (selection && 0 !== selection.rangeCount) {
              JSCompiler_temp = selection.anchorNode;
              var anchorOffset = selection.anchorOffset,
                focusNode = selection.focusNode;
              selection = selection.focusOffset;
              try {
                JSCompiler_temp.nodeType, focusNode.nodeType;
              } catch (e$2) {
                JSCompiler_temp = null;
                break a;
              }
              var length = 0,
                start = -1,
                end = -1,
                indexWithinAnchor = 0,
                indexWithinFocus = 0,
                node = root,
                parentNode = null;
              b: for (;;) {
                for (var next; ; ) {
                  node !== JSCompiler_temp ||
                    (0 !== anchorOffset && 3 !== node.nodeType) ||
                    (start = length + anchorOffset);
                  node !== focusNode ||
                    (0 !== selection && 3 !== node.nodeType) ||
                    (end = length + selection);
                  3 === node.nodeType && (length += node.nodeValue.length);
                  if (null === (next = node.firstChild)) break;
                  parentNode = node;
                  node = next;
                }
                for (;;) {
                  if (node === root) break b;
                  parentNode === JSCompiler_temp &&
                    ++indexWithinAnchor === anchorOffset &&
                    (start = length);
                  parentNode === focusNode &&
                    ++indexWithinFocus === selection &&
                    (end = length);
                  if (null !== (next = node.nextSibling)) break;
                  node = parentNode;
                  parentNode = node.parentNode;
                }
                node = next;
              }
              JSCompiler_temp =
                -1 === start || -1 === end ? null : { start: start, end: end };
            } else JSCompiler_temp = null;
          }
        JSCompiler_temp = JSCompiler_temp || { start: 0, end: 0 };
      } else JSCompiler_temp = null;
      selectionInformation = {
        focusedElem: root,
        selectionRange: JSCompiler_temp
      };
      _enabled = !1;
      for (nextEffect = firstChild; null !== nextEffect; )
        if (
          ((firstChild = nextEffect),
          (root = firstChild.child),
          0 !== (firstChild.subtreeFlags & 1028) && null !== root)
        )
          (root.return = firstChild), (nextEffect = root);
        else
          for (; null !== nextEffect; ) {
            root = firstChild = nextEffect;
            JSCompiler_temp = root.alternate;
            anchorOffset = root.flags;
            switch (root.tag) {
              case 0:
                break;
              case 11:
              case 15:
                break;
              case 1:
                0 !== (anchorOffset & 1024) &&
                  null !== JSCompiler_temp &&
                  commitClassSnapshot(root, JSCompiler_temp);
                break;
              case 3:
                if (0 !== (anchorOffset & 1024))
                  if (
                    ((root = root.stateNode.containerInfo),
                    (JSCompiler_temp = root.nodeType),
                    9 === JSCompiler_temp)
                  )
                    clearContainerSparingly(root);
                  else if (1 === JSCompiler_temp)
                    switch (root.nodeName) {
                      case "HEAD":
                      case "HTML":
                      case "BODY":
                        clearContainerSparingly(root);
                        break;
                      default:
                        root.textContent = "";
                    }
                break;
              case 5:
              case 26:
              case 27:
              case 6:
              case 4:
              case 17:
                break;
              default:
                if (0 !== (anchorOffset & 1024))
                  throw Error(
                    "This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue."
                  );
            }
            root = firstChild.sibling;
            if (null !== root) {
              root.return = firstChild.return;
              nextEffect = root;
              break;
            }
            nextEffect = firstChild.return;
          }
      firstChild = shouldFireAfterActiveInstanceBlur;
      shouldFireAfterActiveInstanceBlur = !1;
      return firstChild;
    }
    function commitLayoutEffectOnFiber(finishedRoot, current, finishedWork) {
      var flags = finishedWork.flags;
      switch (finishedWork.tag) {
        case 0:
        case 11:
        case 15:
          recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
          flags & 4 &&
            commitHookLayoutEffects(finishedWork, Layout | HasEffect);
          break;
        case 1:
          recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
          if (flags & 4)
            if (((finishedRoot = finishedWork.stateNode), null === current))
              finishedWork.type.defaultProps ||
                "ref" in finishedWork.memoizedProps ||
                didWarnAboutReassigningProps ||
                (finishedRoot.props !== finishedWork.memoizedProps &&
                  console.error(
                    "Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",
                    getComponentNameFromFiber(finishedWork) || "instance"
                  ),
                finishedRoot.state !== finishedWork.memoizedState &&
                  console.error(
                    "Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",
                    getComponentNameFromFiber(finishedWork) || "instance"
                  )),
                shouldProfile(finishedWork)
                  ? (startEffectTimer(),
                    runWithFiberInDEV(
                      finishedWork,
                      callComponentDidMountInDEV,
                      finishedWork,
                      finishedRoot
                    ),
                    recordEffectDuration())
                  : runWithFiberInDEV(
                      finishedWork,
                      callComponentDidMountInDEV,
                      finishedWork,
                      finishedRoot
                    );
            else {
              var prevProps = resolveClassComponentProps(
                finishedWork.type,
                current.memoizedProps
              );
              current = current.memoizedState;
              finishedWork.type.defaultProps ||
                "ref" in finishedWork.memoizedProps ||
                didWarnAboutReassigningProps ||
                (finishedRoot.props !== finishedWork.memoizedProps &&
                  console.error(
                    "Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",
                    getComponentNameFromFiber(finishedWork) || "instance"
                  ),
                finishedRoot.state !== finishedWork.memoizedState &&
                  console.error(
                    "Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",
                    getComponentNameFromFiber(finishedWork) || "instance"
                  ));
              shouldProfile(finishedWork)
                ? (startEffectTimer(),
                  runWithFiberInDEV(
                    finishedWork,
                    callComponentDidUpdateInDEV,
                    finishedWork,
                    finishedRoot,
                    prevProps,
                    current,
                    finishedRoot.__reactInternalSnapshotBeforeUpdate
                  ),
                  recordEffectDuration())
                : runWithFiberInDEV(
                    finishedWork,
                    callComponentDidUpdateInDEV,
                    finishedWork,
                    finishedRoot,
                    prevProps,
                    current,
                    finishedRoot.__reactInternalSnapshotBeforeUpdate
                  );
            }
          flags & 64 && commitClassCallbacks(finishedWork);
          flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
          break;
        case 3:
          current = pushNestedEffectDurations();
          recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
          if (
            flags & 64 &&
            ((flags = finishedWork.updateQueue), null !== flags)
          ) {
            prevProps = null;
            if (null !== finishedWork.child)
              switch (finishedWork.child.tag) {
                case 27:
                case 5:
                  prevProps = finishedWork.child.stateNode;
                  break;
                case 1:
                  prevProps = finishedWork.child.stateNode;
              }
            try {
              runWithFiberInDEV(
                finishedWork,
                commitCallbacks,
                flags,
                prevProps
              );
            } catch (error) {
              captureCommitPhaseError(finishedWork, finishedWork.return, error);
            }
          }
          finishedRoot.effectDuration += popNestedEffectDurations(current);
          break;
        case 26:
          recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
          flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
          break;
        case 27:
        case 5:
          recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
          null === current && flags & 4 && commitHostMount(finishedWork);
          flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
          break;
        case 12:
          if (flags & 4) {
            flags = pushNestedEffectDurations();
            recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
            finishedRoot = finishedWork.stateNode;
            finishedRoot.effectDuration += bubbleNestedEffectDurations(flags);
            try {
              runWithFiberInDEV(
                finishedWork,
                commitProfiler,
                finishedWork,
                current,
                commitStartTime,
                finishedRoot.effectDuration
              );
            } catch (error) {
              captureCommitPhaseError(finishedWork, finishedWork.return, error);
            }
          } else recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
          break;
        case 13:
          recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
          flags & 4 &&
            commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
          flags & 64 &&
            ((finishedRoot = finishedWork.memoizedState),
            null !== finishedRoot &&
              ((finishedRoot = finishedRoot.dehydrated),
              null !== finishedRoot &&
                ((finishedWork = retryDehydratedSuspenseBoundary.bind(
                  null,
                  finishedWork
                )),
                registerSuspenseInstanceRetry(finishedRoot, finishedWork))));
          break;
        case 22:
          prevProps =
            null !== finishedWork.memoizedState || offscreenSubtreeIsHidden;
          if (!prevProps) {
            current =
              (null !== current && null !== current.memoizedState) ||
              offscreenSubtreeWasHidden;
            var prevOffscreenSubtreeIsHidden = offscreenSubtreeIsHidden,
              prevOffscreenSubtreeWasHidden = offscreenSubtreeWasHidden;
            offscreenSubtreeIsHidden = prevProps;
            (offscreenSubtreeWasHidden = current) &&
            !prevOffscreenSubtreeWasHidden
              ? recursivelyTraverseReappearLayoutEffects(
                  finishedRoot,
                  finishedWork,
                  0 !== (finishedWork.subtreeFlags & 8772)
                )
              : recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
            offscreenSubtreeIsHidden = prevOffscreenSubtreeIsHidden;
            offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden;
          }
          flags & 512 &&
            ("manual" === finishedWork.memoizedProps.mode
              ? safelyAttachRef(finishedWork, finishedWork.return)
              : safelyDetachRef(finishedWork, finishedWork.return));
          break;
        default:
          recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
      }
    }
    function detachFiberAfterEffects(fiber) {
      var alternate = fiber.alternate;
      null !== alternate &&
        ((fiber.alternate = null), detachFiberAfterEffects(alternate));
      fiber.child = null;
      fiber.deletions = null;
      fiber.sibling = null;
      5 === fiber.tag &&
        ((alternate = fiber.stateNode),
        null !== alternate && detachDeletedInstance(alternate));
      fiber.stateNode = null;
      fiber._debugOwner = null;
      fiber.return = null;
      fiber.dependencies = null;
      fiber.memoizedProps = null;
      fiber.memoizedState = null;
      fiber.pendingProps = null;
      fiber.stateNode = null;
      fiber.updateQueue = null;
    }
    function recursivelyTraverseDeletionEffects(
      finishedRoot,
      nearestMountedAncestor,
      parent
    ) {
      for (parent = parent.child; null !== parent; )
        commitDeletionEffectsOnFiber(
          finishedRoot,
          nearestMountedAncestor,
          parent
        ),
          (parent = parent.sibling);
    }
    function commitDeletionEffectsOnFiber(
      finishedRoot,
      nearestMountedAncestor,
      deletedFiber
    ) {
      if (
        injectedHook &&
        "function" === typeof injectedHook.onCommitFiberUnmount
      )
        try {
          injectedHook.onCommitFiberUnmount(rendererID, deletedFiber);
        } catch (err) {
          hasLoggedError ||
            ((hasLoggedError = !0),
            console.error(
              "React instrumentation encountered an error: %s",
              err
            ));
        }
      switch (deletedFiber.tag) {
        case 26:
          offscreenSubtreeWasHidden ||
            safelyDetachRef(deletedFiber, nearestMountedAncestor);
          recursivelyTraverseDeletionEffects(
            finishedRoot,
            nearestMountedAncestor,
            deletedFiber
          );
          deletedFiber.memoizedState
            ? deletedFiber.memoizedState.count--
            : deletedFiber.stateNode &&
              ((deletedFiber = deletedFiber.stateNode),
              deletedFiber.parentNode.removeChild(deletedFiber));
          break;
        case 27:
          offscreenSubtreeWasHidden ||
            safelyDetachRef(deletedFiber, nearestMountedAncestor);
          var prevHostParent = hostParent,
            prevHostParentIsContainer = hostParentIsContainer;
          hostParent = deletedFiber.stateNode;
          recursivelyTraverseDeletionEffects(
            finishedRoot,
            nearestMountedAncestor,
            deletedFiber
          );
          deletedFiber = deletedFiber.stateNode;
          for (finishedRoot = deletedFiber.attributes; finishedRoot.length; )
            deletedFiber.removeAttributeNode(finishedRoot[0]);
          detachDeletedInstance(deletedFiber);
          hostParent = prevHostParent;
          hostParentIsContainer = prevHostParentIsContainer;
          break;
        case 5:
          offscreenSubtreeWasHidden ||
            safelyDetachRef(deletedFiber, nearestMountedAncestor);
        case 6:
          prevHostParent = hostParent;
          prevHostParentIsContainer = hostParentIsContainer;
          hostParent = null;
          recursivelyTraverseDeletionEffects(
            finishedRoot,
            nearestMountedAncestor,
            deletedFiber
          );
          hostParent = prevHostParent;
          hostParentIsContainer = prevHostParentIsContainer;
          if (null !== hostParent)
            if (hostParentIsContainer)
              try {
                runWithFiberInDEV(
                  deletedFiber,
                  removeChildFromContainer,
                  hostParent,
                  deletedFiber.stateNode
                );
              } catch (error) {
                captureCommitPhaseError(
                  deletedFiber,
                  nearestMountedAncestor,
                  error
                );
              }
            else
              try {
                runWithFiberInDEV(
                  deletedFiber,
                  removeChild,
                  hostParent,
                  deletedFiber.stateNode
                );
              } catch (error) {
                captureCommitPhaseError(
                  deletedFiber,
                  nearestMountedAncestor,
                  error
                );
              }
          break;
        case 18:
          null !== hostParent &&
            (hostParentIsContainer
              ? ((finishedRoot = hostParent),
                (deletedFiber = deletedFiber.stateNode),
                8 === finishedRoot.nodeType
                  ? clearSuspenseBoundary(finishedRoot.parentNode, deletedFiber)
                  : 1 === finishedRoot.nodeType &&
                    clearSuspenseBoundary(finishedRoot, deletedFiber),
                retryIfBlockedOn(finishedRoot))
              : clearSuspenseBoundary(hostParent, deletedFiber.stateNode));
          break;
        case 4:
          prevHostParent = hostParent;
          prevHostParentIsContainer = hostParentIsContainer;
          hostParent = deletedFiber.stateNode.containerInfo;
          hostParentIsContainer = !0;
          recursivelyTraverseDeletionEffects(
            finishedRoot,
            nearestMountedAncestor,
            deletedFiber
          );
          hostParent = prevHostParent;
          hostParentIsContainer = prevHostParentIsContainer;
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          offscreenSubtreeWasHidden ||
            commitHookEffectListUnmount(
              Insertion,
              deletedFiber,
              nearestMountedAncestor
            );
          offscreenSubtreeWasHidden ||
            commitHookLayoutUnmountEffects(
              deletedFiber,
              nearestMountedAncestor,
              Layout
            );
          recursivelyTraverseDeletionEffects(
            finishedRoot,
            nearestMountedAncestor,
            deletedFiber
          );
          break;
        case 1:
          offscreenSubtreeWasHidden ||
            (safelyDetachRef(deletedFiber, nearestMountedAncestor),
            (prevHostParent = deletedFiber.stateNode),
            "function" === typeof prevHostParent.componentWillUnmount &&
              safelyCallComponentWillUnmount(
                deletedFiber,
                nearestMountedAncestor,
                prevHostParent
              ));
          recursivelyTraverseDeletionEffects(
            finishedRoot,
            nearestMountedAncestor,
            deletedFiber
          );
          break;
        case 21:
          recursivelyTraverseDeletionEffects(
            finishedRoot,
            nearestMountedAncestor,
            deletedFiber
          );
          break;
        case 22:
          offscreenSubtreeWasHidden ||
            safelyDetachRef(deletedFiber, nearestMountedAncestor);
          offscreenSubtreeWasHidden =
            (prevHostParent = offscreenSubtreeWasHidden) ||
            null !== deletedFiber.memoizedState;
          recursivelyTraverseDeletionEffects(
            finishedRoot,
            nearestMountedAncestor,
            deletedFiber
          );
          offscreenSubtreeWasHidden = prevHostParent;
          break;
        default:
          recursivelyTraverseDeletionEffects(
            finishedRoot,
            nearestMountedAncestor,
            deletedFiber
          );
      }
    }
    function commitSuspenseHydrationCallbacks(finishedRoot, finishedWork) {
      if (
        null === finishedWork.memoizedState &&
        ((finishedRoot = finishedWork.alternate),
        null !== finishedRoot &&
          ((finishedRoot = finishedRoot.memoizedState),
          null !== finishedRoot &&
            ((finishedRoot = finishedRoot.dehydrated), null !== finishedRoot)))
      )
        try {
          runWithFiberInDEV(
            finishedWork,
            commitHydratedSuspenseInstance,
            finishedRoot
          );
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
    }
    function getRetryCache(finishedWork) {
      switch (finishedWork.tag) {
        case 13:
        case 19:
          var retryCache = finishedWork.stateNode;
          null === retryCache &&
            (retryCache = finishedWork.stateNode = new PossiblyWeakSet());
          return retryCache;
        case 22:
          return (
            (finishedWork = finishedWork.stateNode),
            (retryCache = finishedWork._retryCache),
            null === retryCache &&
              (retryCache = finishedWork._retryCache = new PossiblyWeakSet()),
            retryCache
          );
        default:
          throw Error(
            "Unexpected Suspense handler tag (" +
              finishedWork.tag +
              "). This is a bug in React."
          );
      }
    }
    function attachSuspenseRetryListeners(finishedWork, wakeables) {
      var retryCache = getRetryCache(finishedWork);
      wakeables.forEach(function (wakeable) {
        var retry = resolveRetryWakeable.bind(null, finishedWork, wakeable);
        if (!retryCache.has(wakeable)) {
          retryCache.add(wakeable);
          if (isDevToolsPresent)
            if (null !== inProgressLanes && null !== inProgressRoot)
              restorePendingUpdaters(inProgressRoot, inProgressLanes);
            else
              throw Error(
                "Expected finished root and lanes to be set. This is a bug in React."
              );
          wakeable.then(retry, retry);
        }
      });
    }
    function commitMutationEffects(root, finishedWork, committedLanes) {
      inProgressLanes = committedLanes;
      inProgressRoot = root;
      commitMutationEffectsOnFiber(finishedWork, root);
      inProgressRoot = inProgressLanes = null;
    }
    function recursivelyTraverseMutationEffects(root$jscomp$0, parentFiber) {
      var deletions = parentFiber.deletions;
      if (null !== deletions)
        for (var i = 0; i < deletions.length; i++) {
          var root = root$jscomp$0,
            returnFiber = parentFiber,
            deletedFiber = deletions[i],
            parent = returnFiber;
          a: for (; null !== parent; ) {
            switch (parent.tag) {
              case 27:
              case 5:
                hostParent = parent.stateNode;
                hostParentIsContainer = !1;
                break a;
              case 3:
                hostParent = parent.stateNode.containerInfo;
                hostParentIsContainer = !0;
                break a;
              case 4:
                hostParent = parent.stateNode.containerInfo;
                hostParentIsContainer = !0;
                break a;
            }
            parent = parent.return;
          }
          if (null === hostParent)
            throw Error(
              "Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue."
            );
          commitDeletionEffectsOnFiber(root, returnFiber, deletedFiber);
          hostParent = null;
          hostParentIsContainer = !1;
          root = deletedFiber;
          returnFiber = root.alternate;
          null !== returnFiber && (returnFiber.return = null);
          root.return = null;
        }
      if (parentFiber.subtreeFlags & 13878)
        for (parentFiber = parentFiber.child; null !== parentFiber; )
          commitMutationEffectsOnFiber(parentFiber, root$jscomp$0),
            (parentFiber = parentFiber.sibling);
    }
    function commitMutationEffectsOnFiber(finishedWork, root) {
      var current = finishedWork.alternate,
        flags = finishedWork.flags;
      switch (finishedWork.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          recursivelyTraverseMutationEffects(root, finishedWork);
          commitReconciliationEffects(finishedWork);
          flags & 4 &&
            (commitHookEffectListUnmount(
              Insertion | HasEffect,
              finishedWork,
              finishedWork.return
            ),
            commitHookEffectListMount(Insertion | HasEffect, finishedWork),
            commitHookLayoutUnmountEffects(
              finishedWork,
              finishedWork.return,
              Layout | HasEffect
            ));
          break;
        case 1:
          recursivelyTraverseMutationEffects(root, finishedWork);
          commitReconciliationEffects(finishedWork);
          flags & 512 &&
            (offscreenSubtreeWasHidden ||
              null === current ||
              safelyDetachRef(current, current.return));
          flags & 64 &&
            offscreenSubtreeIsHidden &&
            ((finishedWork = finishedWork.updateQueue),
            null !== finishedWork &&
              ((flags = finishedWork.callbacks),
              null !== flags &&
                ((current = finishedWork.shared.hiddenCallbacks),
                (finishedWork.shared.hiddenCallbacks =
                  null === current ? flags : current.concat(flags)))));
          break;
        case 26:
          var hoistableRoot = currentHoistableRoot;
          recursivelyTraverseMutationEffects(root, finishedWork);
          commitReconciliationEffects(finishedWork);
          flags & 512 &&
            (offscreenSubtreeWasHidden ||
              null === current ||
              safelyDetachRef(current, current.return));
          if (flags & 4)
            if (
              ((root = null !== current ? current.memoizedState : null),
              (flags = finishedWork.memoizedState),
              null === current)
            )
              if (null === flags)
                if (null === finishedWork.stateNode) {
                  a: {
                    flags = finishedWork.type;
                    current = finishedWork.memoizedProps;
                    root = hoistableRoot.ownerDocument || hoistableRoot;
                    b: switch (flags) {
                      case "title":
                        hoistableRoot = root.getElementsByTagName("title")[0];
                        if (
                          !hoistableRoot ||
                          hoistableRoot[internalHoistableMarker] ||
                          hoistableRoot[internalInstanceKey] ||
                          hoistableRoot.namespaceURI === SVG_NAMESPACE ||
                          hoistableRoot.hasAttribute("itemprop")
                        )
                          (hoistableRoot = root.createElement(flags)),
                            root.head.insertBefore(
                              hoistableRoot,
                              root.querySelector("head > title")
                            );
                        setInitialProperties(hoistableRoot, flags, current);
                        hoistableRoot[internalInstanceKey] = finishedWork;
                        markNodeAsHoistable(hoistableRoot);
                        flags = hoistableRoot;
                        break a;
                      case "link":
                        var maybeNodes = getHydratableHoistableCache(
                          "link",
                          "href",
                          root
                        ).get(flags + (current.href || ""));
                        if (maybeNodes)
                          for (var i = 0; i < maybeNodes.length; i++)
                            if (
                              ((hoistableRoot = maybeNodes[i]),
                              hoistableRoot.getAttribute("href") ===
                                (null == current.href ? null : current.href) &&
                                hoistableRoot.getAttribute("rel") ===
                                  (null == current.rel ? null : current.rel) &&
                                hoistableRoot.getAttribute("title") ===
                                  (null == current.title
                                    ? null
                                    : current.title) &&
                                hoistableRoot.getAttribute("crossorigin") ===
                                  (null == current.crossOrigin
                                    ? null
                                    : current.crossOrigin))
                            ) {
                              maybeNodes.splice(i, 1);
                              break b;
                            }
                        hoistableRoot = root.createElement(flags);
                        setInitialProperties(hoistableRoot, flags, current);
                        root.head.appendChild(hoistableRoot);
                        break;
                      case "meta":
                        if (
                          (maybeNodes = getHydratableHoistableCache(
                            "meta",
                            "content",
                            root
                          ).get(flags + (current.content || "")))
                        )
                          for (i = 0; i < maybeNodes.length; i++)
                            if (
                              ((hoistableRoot = maybeNodes[i]),
                              checkAttributeStringCoercion(
                                current.content,
                                "content"
                              ),
                              hoistableRoot.getAttribute("content") ===
                                (null == current.content
                                  ? null
                                  : "" + current.content) &&
                                hoistableRoot.getAttribute("name") ===
                                  (null == current.name
                                    ? null
                                    : current.name) &&
                                hoistableRoot.getAttribute("property") ===
                                  (null == current.property
                                    ? null
                                    : current.property) &&
                                hoistableRoot.getAttribute("http-equiv") ===
                                  (null == current.httpEquiv
                                    ? null
                                    : current.httpEquiv) &&
                                hoistableRoot.getAttribute("charset") ===
                                  (null == current.charSet
                                    ? null
                                    : current.charSet))
                            ) {
                              maybeNodes.splice(i, 1);
                              break b;
                            }
                        hoistableRoot = root.createElement(flags);
                        setInitialProperties(hoistableRoot, flags, current);
                        root.head.appendChild(hoistableRoot);
                        break;
                      default:
                        throw Error(
                          'getNodesForType encountered a type it did not expect: "' +
                            flags +
                            '". This is a bug in React.'
                        );
                    }
                    hoistableRoot[internalInstanceKey] = finishedWork;
                    markNodeAsHoistable(hoistableRoot);
                    flags = hoistableRoot;
                  }
                  finishedWork.stateNode = flags;
                } else
                  mountHoistable(
                    hoistableRoot,
                    finishedWork.type,
                    finishedWork.stateNode
                  );
              else
                finishedWork.stateNode = acquireResource(
                  hoistableRoot,
                  flags,
                  finishedWork.memoizedProps
                );
            else
              root !== flags
                ? (null === root
                    ? null !== current.stateNode &&
                      ((current = current.stateNode),
                      current.parentNode.removeChild(current))
                    : root.count--,
                  null === flags
                    ? mountHoistable(
                        hoistableRoot,
                        finishedWork.type,
                        finishedWork.stateNode
                      )
                    : acquireResource(
                        hoistableRoot,
                        flags,
                        finishedWork.memoizedProps
                      ))
                : null === flags &&
                  null !== finishedWork.stateNode &&
                  commitHostUpdate(
                    finishedWork,
                    finishedWork.memoizedProps,
                    current.memoizedProps
                  );
          break;
        case 27:
          if (flags & 4 && null === finishedWork.alternate) {
            hoistableRoot = finishedWork.stateNode;
            maybeNodes = finishedWork.memoizedProps;
            try {
              for (i = hoistableRoot.firstChild; i; ) {
                var nextNode = i.nextSibling,
                  nodeName = i.nodeName;
                i[internalHoistableMarker] ||
                  "HEAD" === nodeName ||
                  "BODY" === nodeName ||
                  "SCRIPT" === nodeName ||
                  "STYLE" === nodeName ||
                  ("LINK" === nodeName &&
                    "stylesheet" === i.rel.toLowerCase()) ||
                  hoistableRoot.removeChild(i);
                i = nextNode;
              }
              runWithFiberInDEV(
                finishedWork,
                acquireSingletonInstance,
                finishedWork.type,
                maybeNodes,
                hoistableRoot,
                finishedWork
              );
            } catch (error) {
              captureCommitPhaseError(finishedWork, finishedWork.return, error);
            }
          }
        case 5:
          recursivelyTraverseMutationEffects(root, finishedWork);
          commitReconciliationEffects(finishedWork);
          flags & 512 &&
            (offscreenSubtreeWasHidden ||
              null === current ||
              safelyDetachRef(current, current.return));
          if (finishedWork.flags & 32) {
            root = finishedWork.stateNode;
            try {
              runWithFiberInDEV(finishedWork, resetTextContent, root);
            } catch (error) {
              captureCommitPhaseError(finishedWork, finishedWork.return, error);
            }
          }
          flags & 4 &&
            null != finishedWork.stateNode &&
            ((root = finishedWork.memoizedProps),
            commitHostUpdate(
              finishedWork,
              root,
              null !== current ? current.memoizedProps : root
            ));
          flags & 1024 &&
            ((needsFormReset = !0),
            "form" !== finishedWork.type &&
              console.error(
                "Unexpected host component type. Expected a form. This is a bug in React."
              ));
          break;
        case 6:
          recursivelyTraverseMutationEffects(root, finishedWork);
          commitReconciliationEffects(finishedWork);
          if (flags & 4) {
            if (null === finishedWork.stateNode)
              throw Error(
                "This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue."
              );
            flags = finishedWork.memoizedProps;
            current = null !== current ? current.memoizedProps : flags;
            root = finishedWork.stateNode;
            try {
              runWithFiberInDEV(
                finishedWork,
                commitTextUpdate,
                root,
                current,
                flags
              );
            } catch (error) {
              captureCommitPhaseError(finishedWork, finishedWork.return, error);
            }
          }
          break;
        case 3:
          hoistableRoot = pushNestedEffectDurations();
          tagCaches = null;
          maybeNodes = currentHoistableRoot;
          currentHoistableRoot = getHoistableRoot(root.containerInfo);
          recursivelyTraverseMutationEffects(root, finishedWork);
          currentHoistableRoot = maybeNodes;
          commitReconciliationEffects(finishedWork);
          if (
            flags & 4 &&
            null !== current &&
            current.memoizedState.isDehydrated
          )
            try {
              runWithFiberInDEV(
                finishedWork,
                commitHydratedContainer,
                root.containerInfo
              );
            } catch (error) {
              captureCommitPhaseError(finishedWork, finishedWork.return, error);
            }
          needsFormReset &&
            ((needsFormReset = !1), recursivelyResetForms(finishedWork));
          root.effectDuration += popNestedEffectDurations(hoistableRoot);
          break;
        case 4:
          flags = currentHoistableRoot;
          currentHoistableRoot = getHoistableRoot(
            finishedWork.stateNode.containerInfo
          );
          recursivelyTraverseMutationEffects(root, finishedWork);
          commitReconciliationEffects(finishedWork);
          currentHoistableRoot = flags;
          break;
        case 12:
          flags = pushNestedEffectDurations();
          recursivelyTraverseMutationEffects(root, finishedWork);
          commitReconciliationEffects(finishedWork);
          finishedWork.stateNode.effectDuration +=
            bubbleNestedEffectDurations(flags);
          break;
        case 13:
          recursivelyTraverseMutationEffects(root, finishedWork);
          commitReconciliationEffects(finishedWork);
          finishedWork.child.flags & 8192 &&
            (null !== finishedWork.memoizedState) !==
              (null !== current && null !== current.memoizedState) &&
            (globalMostRecentFallbackTime = now$1());
          flags & 4 &&
            ((flags = finishedWork.updateQueue),
            null !== flags &&
              ((finishedWork.updateQueue = null),
              attachSuspenseRetryListeners(finishedWork, flags)));
          break;
        case 22:
          flags & 512 &&
            (offscreenSubtreeWasHidden ||
              null === current ||
              safelyDetachRef(current, current.return));
          i = null !== finishedWork.memoizedState;
          nextNode = null !== current && null !== current.memoizedState;
          nodeName = offscreenSubtreeIsHidden;
          var prevOffscreenSubtreeWasHidden = offscreenSubtreeWasHidden;
          offscreenSubtreeIsHidden = nodeName || i;
          offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden || nextNode;
          recursivelyTraverseMutationEffects(root, finishedWork);
          offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden;
          offscreenSubtreeIsHidden = nodeName;
          commitReconciliationEffects(finishedWork);
          root = finishedWork.stateNode;
          root._current = finishedWork;
          root._visibility &= ~OffscreenDetached;
          root._visibility |= root._pendingVisibility & OffscreenDetached;
          if (
            flags & 8192 &&
            ((root._visibility = i
              ? root._visibility & ~OffscreenVisible
              : root._visibility | OffscreenVisible),
            i &&
              ((root = offscreenSubtreeIsHidden || offscreenSubtreeWasHidden),
              null === current ||
                nextNode ||
                root ||
                recursivelyTraverseDisappearLayoutEffects(finishedWork)),
            null === finishedWork.memoizedProps ||
              "manual" !== finishedWork.memoizedProps.mode)
          )
            a: for (current = null, root = finishedWork; ; ) {
              if (5 === root.tag || 26 === root.tag || 27 === root.tag) {
                if (null === current) {
                  nextNode = current = root;
                  try {
                    (hoistableRoot = nextNode.stateNode),
                      i
                        ? runWithFiberInDEV(
                            nextNode,
                            hideInstance,
                            hoistableRoot
                          )
                        : runWithFiberInDEV(
                            nextNode,
                            unhideInstance,
                            nextNode.stateNode,
                            nextNode.memoizedProps
                          );
                  } catch (error) {
                    captureCommitPhaseError(nextNode, nextNode.return, error);
                  }
                }
              } else if (6 === root.tag) {
                if (null === current) {
                  nextNode = root;
                  try {
                    (maybeNodes = nextNode.stateNode),
                      i
                        ? runWithFiberInDEV(
                            nextNode,
                            hideTextInstance,
                            maybeNodes
                          )
                        : runWithFiberInDEV(
                            nextNode,
                            unhideTextInstance,
                            maybeNodes,
                            nextNode.memoizedProps
                          );
                  } catch (error) {
                    captureCommitPhaseError(nextNode, nextNode.return, error);
                  }
                }
              } else if (
                ((22 !== root.tag && 23 !== root.tag) ||
                  null === root.memoizedState ||
                  root === finishedWork) &&
                null !== root.child
              ) {
                root.child.return = root;
                root = root.child;
                continue;
              }
              if (root === finishedWork) break a;
              for (; null === root.sibling; ) {
                if (null === root.return || root.return === finishedWork)
                  break a;
                current === root && (current = null);
                root = root.return;
              }
              current === root && (current = null);
              root.sibling.return = root.return;
              root = root.sibling;
            }
          flags & 4 &&
            ((flags = finishedWork.updateQueue),
            null !== flags &&
              ((current = flags.retryQueue),
              null !== current &&
                ((flags.retryQueue = null),
                attachSuspenseRetryListeners(finishedWork, current))));
          break;
        case 19:
          recursivelyTraverseMutationEffects(root, finishedWork);
          commitReconciliationEffects(finishedWork);
          flags & 4 &&
            ((flags = finishedWork.updateQueue),
            null !== flags &&
              ((finishedWork.updateQueue = null),
              attachSuspenseRetryListeners(finishedWork, flags)));
          break;
        case 21:
          break;
        default:
          recursivelyTraverseMutationEffects(root, finishedWork),
            commitReconciliationEffects(finishedWork);
      }
    }
    function commitReconciliationEffects(finishedWork) {
      var flags = finishedWork.flags;
      if (flags & 2) {
        try {
          runWithFiberInDEV(finishedWork, commitPlacement, finishedWork);
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
        finishedWork.flags &= -3;
      }
      flags & 4096 && (finishedWork.flags &= -4097);
    }
    function recursivelyResetForms(parentFiber) {
      if (parentFiber.subtreeFlags & 1024)
        for (parentFiber = parentFiber.child; null !== parentFiber; ) {
          var fiber = parentFiber;
          recursivelyResetForms(fiber);
          5 === fiber.tag && fiber.flags & 1024 && fiber.stateNode.reset();
          parentFiber = parentFiber.sibling;
        }
    }
    function commitLayoutEffects(finishedWork, root, committedLanes) {
      inProgressLanes = committedLanes;
      inProgressRoot = root;
      commitLayoutEffectOnFiber(root, finishedWork.alternate, finishedWork);
      inProgressRoot = inProgressLanes = null;
    }
    function recursivelyTraverseLayoutEffects(root, parentFiber) {
      if (parentFiber.subtreeFlags & 8772)
        for (parentFiber = parentFiber.child; null !== parentFiber; )
          commitLayoutEffectOnFiber(root, parentFiber.alternate, parentFiber),
            (parentFiber = parentFiber.sibling);
    }
    function disappearLayoutEffects(finishedWork) {
      switch (finishedWork.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          commitHookLayoutUnmountEffects(
            finishedWork,
            finishedWork.return,
            Layout
          );
          recursivelyTraverseDisappearLayoutEffects(finishedWork);
          break;
        case 1:
          safelyDetachRef(finishedWork, finishedWork.return);
          var instance = finishedWork.stateNode;
          "function" === typeof instance.componentWillUnmount &&
            safelyCallComponentWillUnmount(
              finishedWork,
              finishedWork.return,
              instance
            );
          recursivelyTraverseDisappearLayoutEffects(finishedWork);
          break;
        case 26:
        case 27:
        case 5:
          safelyDetachRef(finishedWork, finishedWork.return);
          recursivelyTraverseDisappearLayoutEffects(finishedWork);
          break;
        case 22:
          safelyDetachRef(finishedWork, finishedWork.return);
          null === finishedWork.memoizedState &&
            recursivelyTraverseDisappearLayoutEffects(finishedWork);
          break;
        default:
          recursivelyTraverseDisappearLayoutEffects(finishedWork);
      }
    }
    function recursivelyTraverseDisappearLayoutEffects(parentFiber) {
      for (parentFiber = parentFiber.child; null !== parentFiber; )
        disappearLayoutEffects(parentFiber),
          (parentFiber = parentFiber.sibling);
    }
    function reappearLayoutEffects(
      finishedRoot,
      current,
      finishedWork,
      includeWorkInProgressEffects
    ) {
      var flags = finishedWork.flags;
      switch (finishedWork.tag) {
        case 0:
        case 11:
        case 15:
          recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            includeWorkInProgressEffects
          );
          commitHookLayoutEffects(finishedWork, Layout);
          break;
        case 1:
          recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            includeWorkInProgressEffects
          );
          current = finishedWork.stateNode;
          "function" === typeof current.componentDidMount &&
            runWithFiberInDEV(
              finishedWork,
              callComponentDidMountInDEV,
              finishedWork,
              current
            );
          current = finishedWork.updateQueue;
          if (null !== current) {
            finishedRoot = finishedWork.stateNode;
            try {
              runWithFiberInDEV(
                finishedWork,
                commitHiddenCallbacks,
                current,
                finishedRoot
              );
            } catch (error) {
              captureCommitPhaseError(finishedWork, finishedWork.return, error);
            }
          }
          includeWorkInProgressEffects &&
            flags & 64 &&
            commitClassCallbacks(finishedWork);
          safelyAttachRef(finishedWork, finishedWork.return);
          break;
        case 26:
        case 27:
        case 5:
          recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            includeWorkInProgressEffects
          );
          includeWorkInProgressEffects &&
            null === current &&
            flags & 4 &&
            commitHostMount(finishedWork);
          safelyAttachRef(finishedWork, finishedWork.return);
          break;
        case 12:
          if (includeWorkInProgressEffects && flags & 4) {
            flags = pushNestedEffectDurations();
            recursivelyTraverseReappearLayoutEffects(
              finishedRoot,
              finishedWork,
              includeWorkInProgressEffects
            );
            includeWorkInProgressEffects = finishedWork.stateNode;
            includeWorkInProgressEffects.effectDuration +=
              bubbleNestedEffectDurations(flags);
            try {
              runWithFiberInDEV(
                finishedWork,
                commitProfiler,
                finishedWork,
                current,
                commitStartTime,
                includeWorkInProgressEffects.effectDuration
              );
            } catch (error) {
              captureCommitPhaseError(finishedWork, finishedWork.return, error);
            }
          } else
            recursivelyTraverseReappearLayoutEffects(
              finishedRoot,
              finishedWork,
              includeWorkInProgressEffects
            );
          break;
        case 13:
          recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            includeWorkInProgressEffects
          );
          includeWorkInProgressEffects &&
            flags & 4 &&
            commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
          break;
        case 22:
          null === finishedWork.memoizedState &&
            recursivelyTraverseReappearLayoutEffects(
              finishedRoot,
              finishedWork,
              includeWorkInProgressEffects
            );
          safelyAttachRef(finishedWork, finishedWork.return);
          break;
        default:
          recursivelyTraverseReappearLayoutEffects(
            finishedRoot,
            finishedWork,
            includeWorkInProgressEffects
          );
      }
    }
    function recursivelyTraverseReappearLayoutEffects(
      finishedRoot,
      parentFiber,
      includeWorkInProgressEffects
    ) {
      includeWorkInProgressEffects =
        includeWorkInProgressEffects && 0 !== (parentFiber.subtreeFlags & 8772);
      for (parentFiber = parentFiber.child; null !== parentFiber; )
        reappearLayoutEffects(
          finishedRoot,
          parentFiber.alternate,
          parentFiber,
          includeWorkInProgressEffects
        ),
          (parentFiber = parentFiber.sibling);
    }
    function commitOffscreenPassiveMountEffects(current, finishedWork) {
      var previousCache = null;
      null !== current &&
        null !== current.memoizedState &&
        null !== current.memoizedState.cachePool &&
        (previousCache = current.memoizedState.cachePool.pool);
      current = null;
      null !== finishedWork.memoizedState &&
        null !== finishedWork.memoizedState.cachePool &&
        (current = finishedWork.memoizedState.cachePool.pool);
      current !== previousCache &&
        (null != current && retainCache(current),
        null != previousCache && releaseCache(previousCache));
    }
    function commitCachePassiveMountEffect(current, finishedWork) {
      current = null;
      null !== finishedWork.alternate &&
        (current = finishedWork.alternate.memoizedState.cache);
      finishedWork = finishedWork.memoizedState.cache;
      finishedWork !== current &&
        (retainCache(finishedWork), null != current && releaseCache(current));
    }
    function recursivelyTraversePassiveMountEffects(
      root,
      parentFiber,
      committedLanes,
      committedTransitions
    ) {
      if (parentFiber.subtreeFlags & 10256)
        for (parentFiber = parentFiber.child; null !== parentFiber; )
          commitPassiveMountOnFiber(
            root,
            parentFiber,
            committedLanes,
            committedTransitions
          ),
            (parentFiber = parentFiber.sibling);
    }
    function commitPassiveMountOnFiber(
      finishedRoot,
      finishedWork,
      committedLanes,
      committedTransitions
    ) {
      var flags = finishedWork.flags;
      switch (finishedWork.tag) {
        case 0:
        case 11:
        case 15:
          recursivelyTraversePassiveMountEffects(
            finishedRoot,
            finishedWork,
            committedLanes,
            committedTransitions
          );
          flags & 2048 &&
            commitHookPassiveMountEffects(finishedWork, Passive | HasEffect);
          break;
        case 3:
          var prevEffectDuration = pushNestedEffectDurations();
          recursivelyTraversePassiveMountEffects(
            finishedRoot,
            finishedWork,
            committedLanes,
            committedTransitions
          );
          flags & 2048 &&
            ((committedLanes = null),
            null !== finishedWork.alternate &&
              (committedLanes = finishedWork.alternate.memoizedState.cache),
            (finishedWork = finishedWork.memoizedState.cache),
            finishedWork !== committedLanes &&
              (retainCache(finishedWork),
              null != committedLanes && releaseCache(committedLanes)));
          finishedRoot.passiveEffectDuration +=
            popNestedEffectDurations(prevEffectDuration);
          break;
        case 12:
          if (flags & 2048) {
            prevEffectDuration = pushNestedEffectDurations();
            recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            );
            finishedRoot = finishedWork.stateNode;
            finishedRoot.passiveEffectDuration +=
              bubbleNestedEffectDurations(prevEffectDuration);
            try {
              runWithFiberInDEV(
                finishedWork,
                commitProfilerPostCommitImpl,
                finishedWork,
                finishedWork.alternate,
                commitStartTime,
                finishedRoot.passiveEffectDuration
              );
            } catch (error) {
              captureCommitPhaseError(finishedWork, finishedWork.return, error);
            }
          } else
            recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            );
          break;
        case 23:
          break;
        case 22:
          prevEffectDuration = finishedWork.stateNode;
          null !== finishedWork.memoizedState
            ? prevEffectDuration._visibility & OffscreenPassiveEffectsConnected
              ? recursivelyTraversePassiveMountEffects(
                  finishedRoot,
                  finishedWork,
                  committedLanes,
                  committedTransitions
                )
              : recursivelyTraverseAtomicPassiveEffects(
                  finishedRoot,
                  finishedWork
                )
            : prevEffectDuration._visibility & OffscreenPassiveEffectsConnected
              ? recursivelyTraversePassiveMountEffects(
                  finishedRoot,
                  finishedWork,
                  committedLanes,
                  committedTransitions
                )
              : ((prevEffectDuration._visibility |=
                  OffscreenPassiveEffectsConnected),
                recursivelyTraverseReconnectPassiveEffects(
                  finishedRoot,
                  finishedWork,
                  committedLanes,
                  committedTransitions,
                  0 !== (finishedWork.subtreeFlags & 10256)
                ));
          flags & 2048 &&
            commitOffscreenPassiveMountEffects(
              finishedWork.alternate,
              finishedWork
            );
          break;
        case 24:
          recursivelyTraversePassiveMountEffects(
            finishedRoot,
            finishedWork,
            committedLanes,
            committedTransitions
          );
          flags & 2048 &&
            commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
          break;
        default:
          recursivelyTraversePassiveMountEffects(
            finishedRoot,
            finishedWork,
            committedLanes,
            committedTransitions
          );
      }
    }
    function recursivelyTraverseReconnectPassiveEffects(
      finishedRoot,
      parentFiber,
      committedLanes,
      committedTransitions,
      includeWorkInProgressEffects
    ) {
      includeWorkInProgressEffects =
        includeWorkInProgressEffects &&
        0 !== (parentFiber.subtreeFlags & 10256);
      for (parentFiber = parentFiber.child; null !== parentFiber; )
        reconnectPassiveEffects(
          finishedRoot,
          parentFiber,
          committedLanes,
          committedTransitions,
          includeWorkInProgressEffects
        ),
          (parentFiber = parentFiber.sibling);
    }
    function reconnectPassiveEffects(
      finishedRoot,
      finishedWork,
      committedLanes,
      committedTransitions,
      includeWorkInProgressEffects
    ) {
      var flags = finishedWork.flags;
      switch (finishedWork.tag) {
        case 0:
        case 11:
        case 15:
          recursivelyTraverseReconnectPassiveEffects(
            finishedRoot,
            finishedWork,
            committedLanes,
            committedTransitions,
            includeWorkInProgressEffects
          );
          commitHookPassiveMountEffects(finishedWork, Passive);
          break;
        case 23:
          break;
        case 22:
          var _instance2 = finishedWork.stateNode;
          null !== finishedWork.memoizedState
            ? _instance2._visibility & OffscreenPassiveEffectsConnected
              ? recursivelyTraverseReconnectPassiveEffects(
                  finishedRoot,
                  finishedWork,
                  committedLanes,
                  committedTransitions,
                  includeWorkInProgressEffects
                )
              : recursivelyTraverseAtomicPassiveEffects(
                  finishedRoot,
                  finishedWork
                )
            : ((_instance2._visibility |= OffscreenPassiveEffectsConnected),
              recursivelyTraverseReconnectPassiveEffects(
                finishedRoot,
                finishedWork,
                committedLanes,
                committedTransitions,
                includeWorkInProgressEffects
              ));
          includeWorkInProgressEffects &&
            flags & 2048 &&
            commitOffscreenPassiveMountEffects(
              finishedWork.alternate,
              finishedWork
            );
          break;
        case 24:
          recursivelyTraverseReconnectPassiveEffects(
            finishedRoot,
            finishedWork,
            committedLanes,
            committedTransitions,
            includeWorkInProgressEffects
          );
          includeWorkInProgressEffects &&
            flags & 2048 &&
            commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
          break;
        default:
          recursivelyTraverseReconnectPassiveEffects(
            finishedRoot,
            finishedWork,
            committedLanes,
            committedTransitions,
            includeWorkInProgressEffects
          );
      }
    }
    function recursivelyTraverseAtomicPassiveEffects(
      finishedRoot$jscomp$0,
      parentFiber
    ) {
      if (parentFiber.subtreeFlags & 10256)
        for (parentFiber = parentFiber.child; null !== parentFiber; ) {
          var finishedRoot = finishedRoot$jscomp$0,
            finishedWork = parentFiber,
            flags = finishedWork.flags;
          switch (finishedWork.tag) {
            case 22:
              recursivelyTraverseAtomicPassiveEffects(
                finishedRoot,
                finishedWork
              );
              flags & 2048 &&
                commitOffscreenPassiveMountEffects(
                  finishedWork.alternate,
                  finishedWork
                );
              break;
            case 24:
              recursivelyTraverseAtomicPassiveEffects(
                finishedRoot,
                finishedWork
              );
              flags & 2048 &&
                commitCachePassiveMountEffect(
                  finishedWork.alternate,
                  finishedWork
                );
              break;
            default:
              recursivelyTraverseAtomicPassiveEffects(
                finishedRoot,
                finishedWork
              );
          }
          parentFiber = parentFiber.sibling;
        }
    }
    function recursivelyAccumulateSuspenseyCommit(parentFiber) {
      if (parentFiber.subtreeFlags & suspenseyCommitFlag)
        for (parentFiber = parentFiber.child; null !== parentFiber; )
          accumulateSuspenseyCommitOnFiber(parentFiber),
            (parentFiber = parentFiber.sibling);
    }
    function accumulateSuspenseyCommitOnFiber(fiber) {
      switch (fiber.tag) {
        case 26:
          recursivelyAccumulateSuspenseyCommit(fiber);
          fiber.flags & suspenseyCommitFlag &&
            null !== fiber.memoizedState &&
            suspendResource(
              currentHoistableRoot,
              fiber.memoizedState,
              fiber.memoizedProps
            );
          break;
        case 5:
          recursivelyAccumulateSuspenseyCommit(fiber);
          break;
        case 3:
        case 4:
          var previousHoistableRoot = currentHoistableRoot;
          currentHoistableRoot = getHoistableRoot(
            fiber.stateNode.containerInfo
          );
          recursivelyAccumulateSuspenseyCommit(fiber);
          currentHoistableRoot = previousHoistableRoot;
          break;
        case 22:
          null === fiber.memoizedState &&
            ((previousHoistableRoot = fiber.alternate),
            null !== previousHoistableRoot &&
            null !== previousHoistableRoot.memoizedState
              ? ((previousHoistableRoot = suspenseyCommitFlag),
                (suspenseyCommitFlag = 16777216),
                recursivelyAccumulateSuspenseyCommit(fiber),
                (suspenseyCommitFlag = previousHoistableRoot))
              : recursivelyAccumulateSuspenseyCommit(fiber));
          break;
        default:
          recursivelyAccumulateSuspenseyCommit(fiber);
      }
    }
    function detachAlternateSiblings(parentFiber) {
      var previousFiber = parentFiber.alternate;
      if (
        null !== previousFiber &&
        ((parentFiber = previousFiber.child), null !== parentFiber)
      ) {
        previousFiber.child = null;
        do
          (previousFiber = parentFiber.sibling),
            (parentFiber.sibling = null),
            (parentFiber = previousFiber);
        while (null !== parentFiber);
      }
    }
    function recursivelyTraversePassiveUnmountEffects(parentFiber) {
      var deletions = parentFiber.deletions;
      if (0 !== (parentFiber.flags & 16)) {
        if (null !== deletions)
          for (var i = 0; i < deletions.length; i++) {
            var childToDelete = deletions[i];
            nextEffect = childToDelete;
            commitPassiveUnmountEffectsInsideOfDeletedTree_begin(
              childToDelete,
              parentFiber
            );
          }
        detachAlternateSiblings(parentFiber);
      }
      if (parentFiber.subtreeFlags & 10256)
        for (parentFiber = parentFiber.child; null !== parentFiber; )
          commitPassiveUnmountOnFiber(parentFiber),
            (parentFiber = parentFiber.sibling);
    }
    function commitPassiveUnmountOnFiber(finishedWork) {
      switch (finishedWork.tag) {
        case 0:
        case 11:
        case 15:
          recursivelyTraversePassiveUnmountEffects(finishedWork);
          finishedWork.flags & 2048 &&
            commitHookPassiveUnmountEffects(
              finishedWork,
              finishedWork.return,
              Passive | HasEffect
            );
          break;
        case 3:
          var prevEffectDuration = pushNestedEffectDurations();
          recursivelyTraversePassiveUnmountEffects(finishedWork);
          finishedWork.stateNode.passiveEffectDuration +=
            popNestedEffectDurations(prevEffectDuration);
          break;
        case 12:
          prevEffectDuration = pushNestedEffectDurations();
          recursivelyTraversePassiveUnmountEffects(finishedWork);
          finishedWork.stateNode.passiveEffectDuration +=
            bubbleNestedEffectDurations(prevEffectDuration);
          break;
        case 22:
          prevEffectDuration = finishedWork.stateNode;
          null !== finishedWork.memoizedState &&
          prevEffectDuration._visibility & OffscreenPassiveEffectsConnected &&
          (null === finishedWork.return || 13 !== finishedWork.return.tag)
            ? ((prevEffectDuration._visibility &=
                ~OffscreenPassiveEffectsConnected),
              recursivelyTraverseDisconnectPassiveEffects(finishedWork))
            : recursivelyTraversePassiveUnmountEffects(finishedWork);
          break;
        default:
          recursivelyTraversePassiveUnmountEffects(finishedWork);
      }
    }
    function recursivelyTraverseDisconnectPassiveEffects(parentFiber) {
      var deletions = parentFiber.deletions;
      if (0 !== (parentFiber.flags & 16)) {
        if (null !== deletions)
          for (var i = 0; i < deletions.length; i++) {
            var childToDelete = deletions[i];
            nextEffect = childToDelete;
            commitPassiveUnmountEffectsInsideOfDeletedTree_begin(
              childToDelete,
              parentFiber
            );
          }
        detachAlternateSiblings(parentFiber);
      }
      for (parentFiber = parentFiber.child; null !== parentFiber; )
        disconnectPassiveEffect(parentFiber),
          (parentFiber = parentFiber.sibling);
    }
    function disconnectPassiveEffect(finishedWork) {
      switch (finishedWork.tag) {
        case 0:
        case 11:
        case 15:
          commitHookPassiveUnmountEffects(
            finishedWork,
            finishedWork.return,
            Passive
          );
          recursivelyTraverseDisconnectPassiveEffects(finishedWork);
          break;
        case 22:
          var instance = finishedWork.stateNode;
          instance._visibility & OffscreenPassiveEffectsConnected &&
            ((instance._visibility &= ~OffscreenPassiveEffectsConnected),
            recursivelyTraverseDisconnectPassiveEffects(finishedWork));
          break;
        default:
          recursivelyTraverseDisconnectPassiveEffects(finishedWork);
      }
    }
    function commitPassiveUnmountEffectsInsideOfDeletedTree_begin(
      deletedSubtreeRoot,
      nearestMountedAncestor
    ) {
      for (; null !== nextEffect; ) {
        var fiber = nextEffect,
          current = fiber;
        switch (current.tag) {
          case 0:
          case 11:
          case 15:
            commitHookPassiveUnmountEffects(
              current,
              nearestMountedAncestor,
              Passive
            );
            break;
          case 23:
          case 22:
            null !== current.memoizedState &&
              null !== current.memoizedState.cachePool &&
              ((current = current.memoizedState.cachePool.pool),
              null != current && retainCache(current));
            break;
          case 24:
            releaseCache(current.memoizedState.cache);
        }
        current = fiber.child;
        if (null !== current) (current.return = fiber), (nextEffect = current);
        else
          a: for (fiber = deletedSubtreeRoot; null !== nextEffect; ) {
            current = nextEffect;
            var sibling = current.sibling,
              returnFiber = current.return;
            detachFiberAfterEffects(current);
            if (current === fiber) {
              nextEffect = null;
              break a;
            }
            if (null !== sibling) {
              sibling.return = returnFiber;
              nextEffect = sibling;
              break a;
            }
            nextEffect = returnFiber;
          }
      }
    }
    function FiberNode(tag, pendingProps, key, mode) {
      this.tag = tag;
      this.key = key;
      this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null;
      this.index = 0;
      this.refCleanup = this.ref = null;
      this.pendingProps = pendingProps;
      this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null;
      this.mode = mode;
      this.subtreeFlags = this.flags = 0;
      this.deletions = null;
      this.childLanes = this.lanes = 0;
      this.alternate = null;
      this.actualDuration = -0;
      this.actualStartTime = -1.1;
      this.treeBaseDuration = this.selfBaseDuration = -0;
      this._debugOwner = this._debugInfo = null;
      this._debugNeedsRemount = !1;
      this._debugHookTypes = null;
      hasBadMapPolyfill ||
        "function" !== typeof Object.preventExtensions ||
        Object.preventExtensions(this);
    }
    function shouldConstruct(Component) {
      Component = Component.prototype;
      return !(!Component || !Component.isReactComponent);
    }
    function createWorkInProgress(current, pendingProps) {
      var workInProgress = current.alternate;
      null === workInProgress
        ? ((workInProgress = createFiber(
            current.tag,
            pendingProps,
            current.key,
            current.mode
          )),
          (workInProgress.elementType = current.elementType),
          (workInProgress.type = current.type),
          (workInProgress.stateNode = current.stateNode),
          (workInProgress._debugOwner = current._debugOwner),
          (workInProgress._debugHookTypes = current._debugHookTypes),
          (workInProgress.alternate = current),
          (current.alternate = workInProgress))
        : ((workInProgress.pendingProps = pendingProps),
          (workInProgress.type = current.type),
          (workInProgress.flags = 0),
          (workInProgress.subtreeFlags = 0),
          (workInProgress.deletions = null),
          (workInProgress.actualDuration = -0),
          (workInProgress.actualStartTime = -1.1));
      workInProgress.flags = current.flags & 31457280;
      workInProgress.childLanes = current.childLanes;
      workInProgress.lanes = current.lanes;
      workInProgress.child = current.child;
      workInProgress.memoizedProps = current.memoizedProps;
      workInProgress.memoizedState = current.memoizedState;
      workInProgress.updateQueue = current.updateQueue;
      pendingProps = current.dependencies;
      workInProgress.dependencies =
        null === pendingProps
          ? null
          : {
              lanes: pendingProps.lanes,
              firstContext: pendingProps.firstContext,
              _debugThenableState: pendingProps._debugThenableState
            };
      workInProgress.sibling = current.sibling;
      workInProgress.index = current.index;
      workInProgress.ref = current.ref;
      workInProgress.refCleanup = current.refCleanup;
      workInProgress.selfBaseDuration = current.selfBaseDuration;
      workInProgress.treeBaseDuration = current.treeBaseDuration;
      workInProgress._debugInfo = current._debugInfo;
      workInProgress._debugNeedsRemount = current._debugNeedsRemount;
      switch (workInProgress.tag) {
        case 0:
        case 15:
          workInProgress.type = resolveFunctionForHotReloading(current.type);
          break;
        case 1:
          workInProgress.type = resolveFunctionForHotReloading(current.type);
          break;
        case 11:
          workInProgress.type = resolveForwardRefForHotReloading(current.type);
      }
      return workInProgress;
    }
    function resetWorkInProgress(workInProgress, renderLanes) {
      workInProgress.flags &= 31457282;
      var current = workInProgress.alternate;
      null === current
        ? ((workInProgress.childLanes = 0),
          (workInProgress.lanes = renderLanes),
          (workInProgress.child = null),
          (workInProgress.subtreeFlags = 0),
          (workInProgress.memoizedProps = null),
          (workInProgress.memoizedState = null),
          (workInProgress.updateQueue = null),
          (workInProgress.dependencies = null),
          (workInProgress.stateNode = null),
          (workInProgress.selfBaseDuration = 0),
          (workInProgress.treeBaseDuration = 0))
        : ((workInProgress.childLanes = current.childLanes),
          (workInProgress.lanes = current.lanes),
          (workInProgress.child = current.child),
          (workInProgress.subtreeFlags = 0),
          (workInProgress.deletions = null),
          (workInProgress.memoizedProps = current.memoizedProps),
          (workInProgress.memoizedState = current.memoizedState),
          (workInProgress.updateQueue = current.updateQueue),
          (workInProgress.type = current.type),
          (renderLanes = current.dependencies),
          (workInProgress.dependencies =
            null === renderLanes
              ? null
              : {
                  lanes: renderLanes.lanes,
                  firstContext: renderLanes.firstContext,
                  _debugThenableState: renderLanes._debugThenableState
                }),
          (workInProgress.selfBaseDuration = current.selfBaseDuration),
          (workInProgress.treeBaseDuration = current.treeBaseDuration));
      return workInProgress;
    }
    function createFiberFromTypeAndProps(
      type,
      key,
      pendingProps,
      owner,
      mode,
      lanes
    ) {
      var fiberTag = 0,
        resolvedType = type;
      if ("function" === typeof type)
        shouldConstruct(type) && (fiberTag = 1),
          (resolvedType = resolveFunctionForHotReloading(resolvedType));
      else if ("string" === typeof type)
        (fiberTag = getHostContext()),
          (fiberTag = isHostHoistableType(type, pendingProps, fiberTag)
            ? 26
            : "html" === type || "head" === type || "body" === type
              ? 27
              : 5);
      else
        a: switch (type) {
          case REACT_FRAGMENT_TYPE:
            return createFiberFromFragment(
              pendingProps.children,
              mode,
              lanes,
              key
            );
          case REACT_STRICT_MODE_TYPE:
            fiberTag = 8;
            mode |= StrictLegacyMode;
            mode |= StrictEffectsMode;
            break;
          case REACT_PROFILER_TYPE:
            return (
              (type = pendingProps),
              (owner = mode),
              "string" !== typeof type.id &&
                console.error(
                  'Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.',
                  typeof type.id
                ),
              (key = createFiber(12, type, key, owner | ProfileMode)),
              (key.elementType = REACT_PROFILER_TYPE),
              (key.lanes = lanes),
              (key.stateNode = { effectDuration: 0, passiveEffectDuration: 0 }),
              key
            );
          case REACT_SUSPENSE_TYPE:
            return (
              (key = createFiber(13, pendingProps, key, mode)),
              (key.elementType = REACT_SUSPENSE_TYPE),
              (key.lanes = lanes),
              key
            );
          case REACT_SUSPENSE_LIST_TYPE:
            return (
              (key = createFiber(19, pendingProps, key, mode)),
              (key.elementType = REACT_SUSPENSE_LIST_TYPE),
              (key.lanes = lanes),
              key
            );
          case REACT_OFFSCREEN_TYPE:
            return createFiberFromOffscreen(pendingProps, mode, lanes, key);
          default:
            if ("object" === typeof type && null !== type)
              switch (type.$$typeof) {
                case REACT_PROVIDER_TYPE:
                case REACT_CONTEXT_TYPE:
                  fiberTag = 10;
                  break a;
                case REACT_CONSUMER_TYPE:
                  fiberTag = 9;
                  break a;
                case REACT_FORWARD_REF_TYPE:
                  fiberTag = 11;
                  resolvedType = resolveForwardRefForHotReloading(resolvedType);
                  break a;
                case REACT_MEMO_TYPE:
                  fiberTag = 14;
                  break a;
                case REACT_LAZY_TYPE:
                  fiberTag = 16;
                  resolvedType = null;
                  break a;
              }
            resolvedType = "";
            if (
              void 0 === type ||
              ("object" === typeof type &&
                null !== type &&
                0 === Object.keys(type).length)
            )
              resolvedType +=
                " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
            null === type
              ? (pendingProps = "null")
              : isArrayImpl(type)
                ? (pendingProps = "array")
                : void 0 !== type && type.$$typeof === REACT_ELEMENT_TYPE
                  ? ((pendingProps =
                      "<" +
                      (getComponentNameFromType(type.type) || "Unknown") +
                      " />"),
                    (resolvedType =
                      " Did you accidentally export a JSX literal instead of a component?"))
                  : (pendingProps = typeof type);
            (fiberTag = owner ? getComponentNameFromOwner(owner) : null) &&
              (resolvedType +=
                "\n\nCheck the render method of `" + fiberTag + "`.");
            fiberTag = 29;
            pendingProps = Error(
              "Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " +
                (pendingProps + "." + resolvedType)
            );
            resolvedType = null;
        }
      key = createFiber(fiberTag, pendingProps, key, mode);
      key.elementType = type;
      key.type = resolvedType;
      key.lanes = lanes;
      key._debugOwner = owner;
      return key;
    }
    function createFiberFromElement(element, mode, lanes) {
      mode = createFiberFromTypeAndProps(
        element.type,
        element.key,
        element.props,
        element._owner,
        mode,
        lanes
      );
      mode._debugOwner = element._owner;
      return mode;
    }
    function createFiberFromFragment(elements, mode, lanes, key) {
      elements = createFiber(7, elements, key, mode);
      elements.lanes = lanes;
      return elements;
    }
    function createFiberFromOffscreen(pendingProps, mode, lanes, key) {
      pendingProps = createFiber(22, pendingProps, key, mode);
      pendingProps.elementType = REACT_OFFSCREEN_TYPE;
      pendingProps.lanes = lanes;
      var primaryChildInstance = {
        _visibility: OffscreenVisible,
        _pendingVisibility: OffscreenVisible,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null,
        _current: null,
        detach: function () {
          var instance = primaryChildInstance,
            fiber = instance._current;
          if (null === fiber)
            throw Error(
              "Calling Offscreen.detach before instance handle has been set."
            );
          if (0 === (instance._pendingVisibility & OffscreenDetached)) {
            var root = enqueueConcurrentRenderForLane(fiber, 2);
            null !== root &&
              ((instance._pendingVisibility |= OffscreenDetached),
              scheduleUpdateOnFiber(root, fiber, 2));
          }
        },
        attach: function () {
          var instance = primaryChildInstance,
            fiber = instance._current;
          if (null === fiber)
            throw Error(
              "Calling Offscreen.detach before instance handle has been set."
            );
          if (0 !== (instance._pendingVisibility & OffscreenDetached)) {
            var root = enqueueConcurrentRenderForLane(fiber, 2);
            null !== root &&
              ((instance._pendingVisibility &= ~OffscreenDetached),
              scheduleUpdateOnFiber(root, fiber, 2));
          }
        }
      };
      pendingProps.stateNode = primaryChildInstance;
      return pendingProps;
    }
    function createFiberFromText(content, mode, lanes) {
      content = createFiber(6, content, null, mode);
      content.lanes = lanes;
      return content;
    }
    function createFiberFromPortal(portal, mode, lanes) {
      mode = createFiber(
        4,
        null !== portal.children ? portal.children : [],
        portal.key,
        mode
      );
      mode.lanes = lanes;
      mode.stateNode = {
        containerInfo: portal.containerInfo,
        pendingChildren: null,
        implementation: portal.implementation
      };
      return mode;
    }
    function markUpdate(workInProgress) {
      workInProgress.flags |= 4;
    }
    function preloadResourceAndSuspendIfNeeded(workInProgress, resource) {
      if (
        "stylesheet" !== resource.type ||
        (resource.state.loading & Inserted) !== NotLoaded
      )
        workInProgress.flags &= -16777217;
      else if (
        ((workInProgress.flags |= 16777216), !preloadResource(resource))
      ) {
        resource = suspenseHandlerStackCursor.current;
        if (
          null !== resource &&
          ((workInProgressRootRenderLanes & 4194176) ===
          workInProgressRootRenderLanes
            ? null !== shellBoundary
            : ((workInProgressRootRenderLanes & 62914560) !==
                workInProgressRootRenderLanes &&
                0 === (workInProgressRootRenderLanes & 536870912)) ||
              resource !== shellBoundary)
        )
          throw (
            ((suspendedThenable = noopSuspenseyCommitThenable),
            SuspenseyCommitException)
          );
        workInProgress.flags |= 8192;
      }
    }
    function scheduleRetryEffect(workInProgress, retryQueue) {
      null !== retryQueue && (workInProgress.flags |= 4);
      workInProgress.flags & 16384 &&
        ((retryQueue =
          22 !== workInProgress.tag ? claimNextRetryLane() : 536870912),
        (workInProgress.lanes |= retryQueue),
        (workInProgressSuspendedRetryLanes |= retryQueue));
    }
    function cutOffTailIfNeeded(renderState, hasRenderedATailFallback) {
      if (!isHydrating)
        switch (renderState.tailMode) {
          case "hidden":
            hasRenderedATailFallback = renderState.tail;
            for (var lastTailNode = null; null !== hasRenderedATailFallback; )
              null !== hasRenderedATailFallback.alternate &&
                (lastTailNode = hasRenderedATailFallback),
                (hasRenderedATailFallback = hasRenderedATailFallback.sibling);
            null === lastTailNode
              ? (renderState.tail = null)
              : (lastTailNode.sibling = null);
            break;
          case "collapsed":
            lastTailNode = renderState.tail;
            for (var _lastTailNode = null; null !== lastTailNode; )
              null !== lastTailNode.alternate && (_lastTailNode = lastTailNode),
                (lastTailNode = lastTailNode.sibling);
            null === _lastTailNode
              ? hasRenderedATailFallback || null === renderState.tail
                ? (renderState.tail = null)
                : (renderState.tail.sibling = null)
              : (_lastTailNode.sibling = null);
        }
    }
    function bubbleProperties(completedWork) {
      var didBailout =
          null !== completedWork.alternate &&
          completedWork.alternate.child === completedWork.child,
        newChildLanes = 0,
        subtreeFlags = 0;
      if (didBailout)
        if ((completedWork.mode & ProfileMode) !== NoMode) {
          for (
            var _treeBaseDuration = completedWork.selfBaseDuration,
              _child2 = completedWork.child;
            null !== _child2;

          )
            (newChildLanes |= _child2.lanes | _child2.childLanes),
              (subtreeFlags |= _child2.subtreeFlags & 31457280),
              (subtreeFlags |= _child2.flags & 31457280),
              (_treeBaseDuration += _child2.treeBaseDuration),
              (_child2 = _child2.sibling);
          completedWork.treeBaseDuration = _treeBaseDuration;
        } else
          for (
            _treeBaseDuration = completedWork.child;
            null !== _treeBaseDuration;

          )
            (newChildLanes |=
              _treeBaseDuration.lanes | _treeBaseDuration.childLanes),
              (subtreeFlags |= _treeBaseDuration.subtreeFlags & 31457280),
              (subtreeFlags |= _treeBaseDuration.flags & 31457280),
              (_treeBaseDuration.return = completedWork),
              (_treeBaseDuration = _treeBaseDuration.sibling);
      else if ((completedWork.mode & ProfileMode) !== NoMode) {
        _treeBaseDuration = completedWork.actualDuration;
        _child2 = completedWork.selfBaseDuration;
        for (var child = completedWork.child; null !== child; )
          (newChildLanes |= child.lanes | child.childLanes),
            (subtreeFlags |= child.subtreeFlags),
            (subtreeFlags |= child.flags),
            (_treeBaseDuration += child.actualDuration),
            (_child2 += child.treeBaseDuration),
            (child = child.sibling);
        completedWork.actualDuration = _treeBaseDuration;
        completedWork.treeBaseDuration = _child2;
      } else
        for (
          _treeBaseDuration = completedWork.child;
          null !== _treeBaseDuration;

        )
          (newChildLanes |=
            _treeBaseDuration.lanes | _treeBaseDuration.childLanes),
            (subtreeFlags |= _treeBaseDuration.subtreeFlags),
            (subtreeFlags |= _treeBaseDuration.flags),
            (_treeBaseDuration.return = completedWork),
            (_treeBaseDuration = _treeBaseDuration.sibling);
      completedWork.subtreeFlags |= subtreeFlags;
      completedWork.childLanes = newChildLanes;
      return didBailout;
    }
    function completeWork(current, workInProgress, renderLanes) {
      var newProps = workInProgress.pendingProps;
      popTreeContext(workInProgress);
      switch (workInProgress.tag) {
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return bubbleProperties(workInProgress), null;
        case 1:
          return bubbleProperties(workInProgress), null;
        case 3:
          newProps = workInProgress.stateNode;
          renderLanes = null;
          null !== current && (renderLanes = current.memoizedState.cache);
          workInProgress.memoizedState.cache !== renderLanes &&
            (workInProgress.flags |= 2048);
          popProvider(CacheContext, workInProgress);
          popHostContainer(workInProgress);
          newProps.pendingContext &&
            ((newProps.context = newProps.pendingContext),
            (newProps.pendingContext = null));
          if (null === current || null === current.child)
            popHydrationState(workInProgress)
              ? (emitPendingHydrationWarnings(), markUpdate(workInProgress))
              : null === current ||
                (current.memoizedState.isDehydrated &&
                  0 === (workInProgress.flags & 256)) ||
                ((workInProgress.flags |= 1024),
                null !== hydrationErrors &&
                  (queueRecoverableErrors(hydrationErrors),
                  (hydrationErrors = null)));
          bubbleProperties(workInProgress);
          return null;
        case 26:
          return (
            (renderLanes = workInProgress.memoizedState),
            null === current
              ? (markUpdate(workInProgress),
                null !== renderLanes
                  ? (bubbleProperties(workInProgress),
                    preloadResourceAndSuspendIfNeeded(
                      workInProgress,
                      renderLanes
                    ))
                  : (bubbleProperties(workInProgress),
                    (workInProgress.flags &= -16777217)))
              : renderLanes
                ? renderLanes !== current.memoizedState
                  ? (markUpdate(workInProgress),
                    bubbleProperties(workInProgress),
                    preloadResourceAndSuspendIfNeeded(
                      workInProgress,
                      renderLanes
                    ))
                  : (bubbleProperties(workInProgress),
                    (workInProgress.flags &= -16777217))
                : (current.memoizedProps !== newProps &&
                    markUpdate(workInProgress),
                  bubbleProperties(workInProgress),
                  (workInProgress.flags &= -16777217)),
            null
          );
        case 27:
          popHostContext(workInProgress);
          renderLanes = requiredContext(rootInstanceStackCursor.current);
          var _type = workInProgress.type;
          if (null !== current && null != workInProgress.stateNode)
            current.memoizedProps !== newProps && markUpdate(workInProgress);
          else {
            if (!newProps) {
              if (null === workInProgress.stateNode)
                throw Error(
                  "We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue."
                );
              bubbleProperties(workInProgress);
              return null;
            }
            current = getHostContext();
            popHydrationState(workInProgress)
              ? prepareToHydrateHostInstance(workInProgress, current)
              : ((current = resolveSingletonInstance(
                  _type,
                  newProps,
                  renderLanes,
                  current,
                  !0
                )),
                (workInProgress.stateNode = current),
                markUpdate(workInProgress));
          }
          bubbleProperties(workInProgress);
          return null;
        case 5:
          popHostContext(workInProgress);
          renderLanes = workInProgress.type;
          if (null !== current && null != workInProgress.stateNode)
            current.memoizedProps !== newProps && markUpdate(workInProgress);
          else {
            if (!newProps) {
              if (null === workInProgress.stateNode)
                throw Error(
                  "We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue."
                );
              bubbleProperties(workInProgress);
              return null;
            }
            _type = getHostContext();
            if (popHydrationState(workInProgress))
              prepareToHydrateHostInstance(workInProgress, _type);
            else {
              current = requiredContext(rootInstanceStackCursor.current);
              validateDOMNesting(renderLanes, _type.ancestorInfo);
              _type = _type.context;
              current = getOwnerDocumentFromRootContainer(current);
              switch (_type) {
                case HostContextNamespaceSvg:
                  current = current.createElementNS(SVG_NAMESPACE, renderLanes);
                  break;
                case HostContextNamespaceMath:
                  current = current.createElementNS(
                    MATH_NAMESPACE,
                    renderLanes
                  );
                  break;
                default:
                  switch (renderLanes) {
                    case "svg":
                      current = current.createElementNS(
                        SVG_NAMESPACE,
                        renderLanes
                      );
                      break;
                    case "math":
                      current = current.createElementNS(
                        MATH_NAMESPACE,
                        renderLanes
                      );
                      break;
                    case "script":
                      current = current.createElement("div");
                      current.innerHTML = "<script>\x3c/script>";
                      current = current.removeChild(current.firstChild);
                      break;
                    case "select":
                      current =
                        "string" === typeof newProps.is
                          ? current.createElement("select", { is: newProps.is })
                          : current.createElement("select");
                      newProps.multiple
                        ? (current.multiple = !0)
                        : newProps.size && (current.size = newProps.size);
                      break;
                    default:
                      (current =
                        "string" === typeof newProps.is
                          ? current.createElement(renderLanes, {
                              is: newProps.is
                            })
                          : current.createElement(renderLanes)),
                        -1 === renderLanes.indexOf("-") &&
                          (renderLanes !== renderLanes.toLowerCase() &&
                            console.error(
                              "<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.",
                              renderLanes
                            ),
                          "[object HTMLUnknownElement]" !==
                            Object.prototype.toString.call(current) ||
                            hasOwnProperty.call(
                              warnedUnknownTags,
                              renderLanes
                            ) ||
                            ((warnedUnknownTags[renderLanes] = !0),
                            console.error(
                              "The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.",
                              renderLanes
                            )));
                  }
              }
              current[internalInstanceKey] = workInProgress;
              current[internalPropsKey] = newProps;
              a: for (_type = workInProgress.child; null !== _type; ) {
                if (5 === _type.tag || 6 === _type.tag)
                  current.appendChild(_type.stateNode);
                else if (
                  4 !== _type.tag &&
                  27 !== _type.tag &&
                  null !== _type.child
                ) {
                  _type.child.return = _type;
                  _type = _type.child;
                  continue;
                }
                if (_type === workInProgress) break a;
                for (; null === _type.sibling; ) {
                  if (null === _type.return || _type.return === workInProgress)
                    break a;
                  _type = _type.return;
                }
                _type.sibling.return = _type.return;
                _type = _type.sibling;
              }
              workInProgress.stateNode = current;
              a: switch (
                (setInitialProperties(current, renderLanes, newProps),
                renderLanes)
              ) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  current = !!newProps.autoFocus;
                  break a;
                case "img":
                  current = !0;
                  break a;
                default:
                  current = !1;
              }
              current && markUpdate(workInProgress);
            }
          }
          bubbleProperties(workInProgress);
          workInProgress.flags &= -16777217;
          return null;
        case 6:
          if (current && null != workInProgress.stateNode)
            current.memoizedProps !== newProps && markUpdate(workInProgress);
          else {
            if (
              "string" !== typeof newProps &&
              null === workInProgress.stateNode
            )
              throw Error(
                "We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue."
              );
            current = requiredContext(rootInstanceStackCursor.current);
            renderLanes = getHostContext();
            if (popHydrationState(workInProgress)) {
              current = workInProgress.stateNode;
              newProps = workInProgress.memoizedProps;
              _type = !didSuspendOrErrorDEV;
              renderLanes = null;
              var returnFiber = hydrationParentFiber;
              if (null !== returnFiber)
                switch (returnFiber.tag) {
                  case 3:
                    _type &&
                      ((_type = diffHydratedTextForDevWarnings(
                        current,
                        newProps,
                        renderLanes
                      )),
                      null !== _type &&
                        (buildHydrationDiffNode(workInProgress, 0).serverProps =
                          _type));
                    break;
                  case 27:
                  case 5:
                    (renderLanes = returnFiber.memoizedProps),
                      _type &&
                        ((_type = diffHydratedTextForDevWarnings(
                          current,
                          newProps,
                          renderLanes
                        )),
                        null !== _type &&
                          (buildHydrationDiffNode(
                            workInProgress,
                            0
                          ).serverProps = _type));
                }
              current[internalInstanceKey] = workInProgress;
              current =
                current.nodeValue === newProps ||
                (null !== renderLanes &&
                  !0 === renderLanes.suppressHydrationWarning) ||
                checkForUnmatchedText(current.nodeValue, newProps)
                  ? !0
                  : !1;
              current || throwOnHydrationMismatch(workInProgress);
            } else
              (renderLanes = renderLanes.ancestorInfo.current),
                null != renderLanes &&
                  validateTextNesting(newProps, renderLanes.tag),
                (current =
                  getOwnerDocumentFromRootContainer(current).createTextNode(
                    newProps
                  )),
                (current[internalInstanceKey] = workInProgress),
                (workInProgress.stateNode = current);
          }
          bubbleProperties(workInProgress);
          return null;
        case 13:
          newProps = workInProgress.memoizedState;
          if (
            null === current ||
            (null !== current.memoizedState &&
              null !== current.memoizedState.dehydrated)
          ) {
            _type = popHydrationState(workInProgress);
            if (null !== newProps && null !== newProps.dehydrated) {
              if (null === current) {
                if (!_type)
                  throw Error(
                    "A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React."
                  );
                _type = workInProgress.memoizedState;
                _type = null !== _type ? _type.dehydrated : null;
                if (!_type)
                  throw Error(
                    "Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue."
                  );
                _type[internalInstanceKey] = workInProgress;
                bubbleProperties(workInProgress);
                (workInProgress.mode & ProfileMode) !== NoMode &&
                  null !== newProps &&
                  ((_type = workInProgress.child),
                  null !== _type &&
                    (workInProgress.treeBaseDuration -=
                      _type.treeBaseDuration));
              } else
                emitPendingHydrationWarnings(),
                  resetHydrationState(),
                  0 === (workInProgress.flags & 128) &&
                    (workInProgress.memoizedState = null),
                  (workInProgress.flags |= 4),
                  bubbleProperties(workInProgress),
                  (workInProgress.mode & ProfileMode) !== NoMode &&
                    null !== newProps &&
                    ((_type = workInProgress.child),
                    null !== _type &&
                      (workInProgress.treeBaseDuration -=
                        _type.treeBaseDuration));
              _type = !1;
            } else
              null !== hydrationErrors &&
                (queueRecoverableErrors(hydrationErrors),
                (hydrationErrors = null)),
                (_type = !0);
            if (!_type) {
              if (workInProgress.flags & 256)
                return popSuspenseHandler(workInProgress), workInProgress;
              popSuspenseHandler(workInProgress);
              return null;
            }
          }
          popSuspenseHandler(workInProgress);
          if (0 !== (workInProgress.flags & 128))
            return (
              (workInProgress.lanes = renderLanes),
              (workInProgress.mode & ProfileMode) !== NoMode &&
                transferActualDuration(workInProgress),
              workInProgress
            );
          newProps = null !== newProps;
          current = null !== current && null !== current.memoizedState;
          newProps &&
            ((renderLanes = workInProgress.child),
            (_type = null),
            null !== renderLanes.alternate &&
              null !== renderLanes.alternate.memoizedState &&
              null !== renderLanes.alternate.memoizedState.cachePool &&
              (_type = renderLanes.alternate.memoizedState.cachePool.pool),
            (returnFiber = null),
            null !== renderLanes.memoizedState &&
              null !== renderLanes.memoizedState.cachePool &&
              (returnFiber = renderLanes.memoizedState.cachePool.pool),
            returnFiber !== _type && (renderLanes.flags |= 2048));
          newProps !== current &&
            newProps &&
            (workInProgress.child.flags |= 8192);
          scheduleRetryEffect(workInProgress, workInProgress.updateQueue);
          bubbleProperties(workInProgress);
          (workInProgress.mode & ProfileMode) !== NoMode &&
            newProps &&
            ((current = workInProgress.child),
            null !== current &&
              (workInProgress.treeBaseDuration -= current.treeBaseDuration));
          return null;
        case 4:
          return (
            popHostContainer(workInProgress),
            null === current &&
              listenToAllSupportedEvents(
                workInProgress.stateNode.containerInfo
              ),
            bubbleProperties(workInProgress),
            null
          );
        case 10:
          return (
            popProvider(workInProgress.type, workInProgress),
            bubbleProperties(workInProgress),
            null
          );
        case 19:
          pop(suspenseStackCursor, workInProgress);
          _type = workInProgress.memoizedState;
          if (null === _type) return bubbleProperties(workInProgress), null;
          newProps = 0 !== (workInProgress.flags & 128);
          returnFiber = _type.rendering;
          if (null === returnFiber)
            if (newProps) cutOffTailIfNeeded(_type, !1);
            else {
              if (
                workInProgressRootExitStatus !== RootInProgress ||
                (null !== current && 0 !== (current.flags & 128))
              )
                for (current = workInProgress.child; null !== current; ) {
                  returnFiber = findFirstSuspended(current);
                  if (null !== returnFiber) {
                    workInProgress.flags |= 128;
                    cutOffTailIfNeeded(_type, !1);
                    current = returnFiber.updateQueue;
                    workInProgress.updateQueue = current;
                    scheduleRetryEffect(workInProgress, current);
                    workInProgress.subtreeFlags = 0;
                    current = renderLanes;
                    for (newProps = workInProgress.child; null !== newProps; )
                      resetWorkInProgress(newProps, current),
                        (newProps = newProps.sibling);
                    push(
                      suspenseStackCursor,
                      (suspenseStackCursor.current &
                        SubtreeSuspenseContextMask) |
                        ForceSuspenseFallback,
                      workInProgress
                    );
                    return workInProgress.child;
                  }
                  current = current.sibling;
                }
              null !== _type.tail &&
                now$1() > workInProgressRootRenderTargetTime &&
                ((workInProgress.flags |= 128),
                (newProps = !0),
                cutOffTailIfNeeded(_type, !1),
                (workInProgress.lanes = 4194304));
            }
          else {
            if (!newProps)
              if (
                ((current = findFirstSuspended(returnFiber)), null !== current)
              ) {
                if (
                  ((workInProgress.flags |= 128),
                  (newProps = !0),
                  (current = current.updateQueue),
                  (workInProgress.updateQueue = current),
                  scheduleRetryEffect(workInProgress, current),
                  cutOffTailIfNeeded(_type, !0),
                  null === _type.tail &&
                    "hidden" === _type.tailMode &&
                    !returnFiber.alternate &&
                    !isHydrating)
                )
                  return bubbleProperties(workInProgress), null;
              } else
                2 * now$1() - _type.renderingStartTime >
                  workInProgressRootRenderTargetTime &&
                  536870912 !== renderLanes &&
                  ((workInProgress.flags |= 128),
                  (newProps = !0),
                  cutOffTailIfNeeded(_type, !1),
                  (workInProgress.lanes = 4194304));
            _type.isBackwards
              ? ((returnFiber.sibling = workInProgress.child),
                (workInProgress.child = returnFiber))
              : ((current = _type.last),
                null !== current
                  ? (current.sibling = returnFiber)
                  : (workInProgress.child = returnFiber),
                (_type.last = returnFiber));
          }
          if (null !== _type.tail)
            return (
              (current = _type.tail),
              (_type.rendering = current),
              (_type.tail = current.sibling),
              (_type.renderingStartTime = now$1()),
              (current.sibling = null),
              (renderLanes = suspenseStackCursor.current),
              (renderLanes = newProps
                ? (renderLanes & SubtreeSuspenseContextMask) |
                  ForceSuspenseFallback
                : renderLanes & SubtreeSuspenseContextMask),
              push(suspenseStackCursor, renderLanes, workInProgress),
              current
            );
          bubbleProperties(workInProgress);
          return null;
        case 22:
        case 23:
          return (
            popSuspenseHandler(workInProgress),
            popHiddenContext(workInProgress),
            (newProps = null !== workInProgress.memoizedState),
            null !== current
              ? (null !== current.memoizedState) !== newProps &&
                (workInProgress.flags |= 8192)
              : newProps && (workInProgress.flags |= 8192),
            newProps
              ? 0 !== (renderLanes & 536870912) &&
                0 === (workInProgress.flags & 128) &&
                (bubbleProperties(workInProgress),
                workInProgress.subtreeFlags & 6 &&
                  (workInProgress.flags |= 8192))
              : bubbleProperties(workInProgress),
            (newProps = workInProgress.updateQueue),
            null !== newProps &&
              scheduleRetryEffect(workInProgress, newProps.retryQueue),
            (newProps = null),
            null !== current &&
              null !== current.memoizedState &&
              null !== current.memoizedState.cachePool &&
              (newProps = current.memoizedState.cachePool.pool),
            (renderLanes = null),
            null !== workInProgress.memoizedState &&
              null !== workInProgress.memoizedState.cachePool &&
              (renderLanes = workInProgress.memoizedState.cachePool.pool),
            renderLanes !== newProps && (workInProgress.flags |= 2048),
            null !== current && pop(resumedCache, workInProgress),
            null
          );
        case 24:
          return (
            (newProps = null),
            null !== current && (newProps = current.memoizedState.cache),
            workInProgress.memoizedState.cache !== newProps &&
              (workInProgress.flags |= 2048),
            popProvider(CacheContext, workInProgress),
            bubbleProperties(workInProgress),
            null
          );
        case 25:
          return null;
      }
      throw Error(
        "Unknown unit of work tag (" +
          workInProgress.tag +
          "). This error is likely caused by a bug in React. Please file an issue."
      );
    }
    function unwindWork(current, workInProgress) {
      popTreeContext(workInProgress);
      switch (workInProgress.tag) {
        case 1:
          return (
            (current = workInProgress.flags),
            current & 65536
              ? ((workInProgress.flags = (current & -65537) | 128),
                (workInProgress.mode & ProfileMode) !== NoMode &&
                  transferActualDuration(workInProgress),
                workInProgress)
              : null
          );
        case 3:
          return (
            popProvider(CacheContext, workInProgress),
            popHostContainer(workInProgress),
            (current = workInProgress.flags),
            0 !== (current & 65536) && 0 === (current & 128)
              ? ((workInProgress.flags = (current & -65537) | 128),
                workInProgress)
              : null
          );
        case 26:
        case 27:
        case 5:
          return popHostContext(workInProgress), null;
        case 13:
          popSuspenseHandler(workInProgress);
          current = workInProgress.memoizedState;
          if (null !== current && null !== current.dehydrated) {
            if (null === workInProgress.alternate)
              throw Error(
                "Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue."
              );
            resetHydrationState();
          }
          current = workInProgress.flags;
          return current & 65536
            ? ((workInProgress.flags = (current & -65537) | 128),
              (workInProgress.mode & ProfileMode) !== NoMode &&
                transferActualDuration(workInProgress),
              workInProgress)
            : null;
        case 19:
          return pop(suspenseStackCursor, workInProgress), null;
        case 4:
          return popHostContainer(workInProgress), null;
        case 10:
          return popProvider(workInProgress.type, workInProgress), null;
        case 22:
        case 23:
          return (
            popSuspenseHandler(workInProgress),
            popHiddenContext(workInProgress),
            null !== current && pop(resumedCache, workInProgress),
            (current = workInProgress.flags),
            current & 65536
              ? ((workInProgress.flags = (current & -65537) | 128),
                (workInProgress.mode & ProfileMode) !== NoMode &&
                  transferActualDuration(workInProgress),
                workInProgress)
              : null
          );
        case 24:
          return popProvider(CacheContext, workInProgress), null;
        case 25:
          return null;
        default:
          return null;
      }
    }
    function unwindInterruptedWork(current, interruptedWork) {
      popTreeContext(interruptedWork);
      switch (interruptedWork.tag) {
        case 3:
          popProvider(CacheContext, interruptedWork);
          popHostContainer(interruptedWork);
          break;
        case 26:
        case 27:
        case 5:
          popHostContext(interruptedWork);
          break;
        case 4:
          popHostContainer(interruptedWork);
          break;
        case 13:
          popSuspenseHandler(interruptedWork);
          break;
        case 19:
          pop(suspenseStackCursor, interruptedWork);
          break;
        case 10:
          popProvider(interruptedWork.type, interruptedWork);
          break;
        case 22:
        case 23:
          popSuspenseHandler(interruptedWork);
          popHiddenContext(interruptedWork);
          null !== current && pop(resumedCache, interruptedWork);
          break;
        case 24:
          popProvider(CacheContext, interruptedWork);
      }
    }
    function onCommitRoot() {
      commitHooks.forEach(function (commitHook) {
        return commitHook();
      });
    }
    function isConcurrentActEnvironment() {
      var isReactActEnvironmentGlobal =
        "undefined" !== typeof IS_REACT_ACT_ENVIRONMENT
          ? IS_REACT_ACT_ENVIRONMENT
          : void 0;
      isReactActEnvironmentGlobal ||
        null === ReactSharedInternals.actQueue ||
        console.error(
          "The current testing environment is not configured to support act(...)"
        );
      return isReactActEnvironmentGlobal;
    }
    function requestUpdateLane(fiber) {
      if (
        (executionContext & RenderContext) !== NoContext &&
        0 !== workInProgressRootRenderLanes
      )
        return workInProgressRootRenderLanes & -workInProgressRootRenderLanes;
      var transition = ReactSharedInternals.T;
      return null !== transition
        ? (transition._updatedFibers || (transition._updatedFibers = new Set()),
          transition._updatedFibers.add(fiber),
          (fiber = currentEntangledLane),
          0 !== fiber ? fiber : requestTransitionLane())
        : resolveUpdatePriority();
    }
    function requestDeferredLane() {
      0 === workInProgressDeferredLane &&
        (workInProgressDeferredLane =
          0 === (workInProgressRootRenderLanes & 536870912) || isHydrating
            ? claimNextTransitionLane()
            : 536870912);
      var suspenseHandler = suspenseHandlerStackCursor.current;
      null !== suspenseHandler && (suspenseHandler.flags |= 32);
      return workInProgressDeferredLane;
    }
    function scheduleUpdateOnFiber(root, fiber, lane) {
      isRunningInsertionEffect &&
        console.error("useInsertionEffect must not schedule updates.");
      isFlushingPassiveEffects && (didScheduleUpdateDuringPassiveEffects = !0);
      if (
        (root === workInProgressRoot &&
          (workInProgressSuspendedReason === SuspendedOnData ||
            workInProgressSuspendedReason === SuspendedOnAction)) ||
        null !== root.cancelPendingCommit
      )
        prepareFreshStack(root, 0),
          markRootSuspended(
            root,
            workInProgressRootRenderLanes,
            workInProgressDeferredLane,
            !1
          );
      markRootUpdated$1(root, lane);
      if (
        0 !== (executionContext & RenderContext) &&
        root === workInProgressRoot
      ) {
        if (isRendering)
          switch (fiber.tag) {
            case 0:
            case 11:
            case 15:
              root =
                (workInProgress && getComponentNameFromFiber(workInProgress)) ||
                "Unknown";
              didWarnAboutUpdateInRenderForAnotherComponent.has(root) ||
                (didWarnAboutUpdateInRenderForAnotherComponent.add(root),
                (fiber = getComponentNameFromFiber(fiber) || "Unknown"),
                console.error(
                  "Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://react.dev/link/setstate-in-render",
                  fiber,
                  root,
                  root
                ));
              break;
            case 1:
              didWarnAboutUpdateInRender ||
                (console.error(
                  "Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."
                ),
                (didWarnAboutUpdateInRender = !0));
          }
      } else
        isDevToolsPresent && addFiberToLanesMap(root, fiber, lane),
          warnIfUpdatesNotWrappedWithActDEV(fiber),
          root === workInProgressRoot &&
            ((executionContext & RenderContext) === NoContext &&
              (workInProgressRootInterleavedUpdatedLanes |= lane),
            workInProgressRootExitStatus === RootSuspendedWithDelay &&
              markRootSuspended(
                root,
                workInProgressRootRenderLanes,
                workInProgressDeferredLane,
                !1
              )),
          ensureRootIsScheduled(root);
    }
    function performWorkOnRoot(root, lanes, forceSync) {
      if ((executionContext & (RenderContext | CommitContext)) !== NoContext)
        throw Error("Should not already be working.");
      var shouldTimeSlice =
          (!forceSync &&
            0 === (lanes & 60) &&
            0 === (lanes & root.expiredLanes)) ||
          checkIfRootIsPrerendering(root, lanes),
        exitStatus = shouldTimeSlice
          ? renderRootConcurrent(root, lanes)
          : renderRootSync(root, lanes, !0),
        renderWasConcurrent = shouldTimeSlice;
      do {
        if (exitStatus === RootInProgress) {
          workInProgressRootIsPrerendering &&
            !shouldTimeSlice &&
            markRootSuspended(root, lanes, 0, !1);
          break;
        } else {
          forceSync = root.current.alternate;
          if (
            renderWasConcurrent &&
            !isRenderConsistentWithExternalStores(forceSync)
          ) {
            exitStatus = renderRootSync(root, lanes, !1);
            renderWasConcurrent = !1;
            continue;
          }
          if (exitStatus === RootErrored) {
            renderWasConcurrent = lanes;
            if (root.errorRecoveryDisabledLanes & renderWasConcurrent)
              var errorRetryLanes = 0;
            else
              (errorRetryLanes = root.pendingLanes & -536870913),
                (errorRetryLanes =
                  0 !== errorRetryLanes
                    ? errorRetryLanes
                    : errorRetryLanes & 536870912
                      ? 536870912
                      : 0);
            if (0 !== errorRetryLanes) {
              lanes = errorRetryLanes;
              a: {
                exitStatus = root;
                var errorRetryLanes$jscomp$0 = errorRetryLanes;
                errorRetryLanes = workInProgressRootConcurrentErrors;
                var wasRootDehydrated =
                  exitStatus.current.memoizedState.isDehydrated;
                wasRootDehydrated &&
                  (prepareFreshStack(
                    exitStatus,
                    errorRetryLanes$jscomp$0
                  ).flags |= 256);
                errorRetryLanes$jscomp$0 = renderRootSync(
                  exitStatus,
                  errorRetryLanes$jscomp$0,
                  !1
                );
                if (errorRetryLanes$jscomp$0 !== RootErrored) {
                  if (
                    workInProgressRootDidAttachPingListener &&
                    !wasRootDehydrated
                  ) {
                    exitStatus.errorRecoveryDisabledLanes |=
                      renderWasConcurrent;
                    workInProgressRootInterleavedUpdatedLanes |=
                      renderWasConcurrent;
                    exitStatus = RootSuspendedWithDelay;
                    break a;
                  }
                  exitStatus = workInProgressRootRecoverableErrors;
                  workInProgressRootRecoverableErrors = errorRetryLanes;
                  null !== exitStatus && queueRecoverableErrors(exitStatus);
                }
                exitStatus = errorRetryLanes$jscomp$0;
              }
              renderWasConcurrent = !1;
              if (exitStatus !== RootErrored) continue;
            }
          }
          if (exitStatus === RootFatalErrored) {
            prepareFreshStack(root, 0);
            markRootSuspended(root, lanes, 0, !0);
            break;
          }
          a: {
            shouldTimeSlice = root;
            switch (exitStatus) {
              case RootInProgress:
              case RootFatalErrored:
                throw Error("Root did not complete. This is a bug in React.");
              case RootSuspendedWithDelay:
                if ((lanes & 4194176) !== lanes) break;
              case RootSuspendedAtTheShell:
                markRootSuspended(
                  shouldTimeSlice,
                  lanes,
                  workInProgressDeferredLane,
                  !workInProgressRootDidSkipSuspendedSiblings
                );
                break a;
              case RootErrored:
                workInProgressRootRecoverableErrors = null;
                break;
              case RootSuspended:
              case RootCompleted:
                break;
              default:
                throw Error("Unknown root exit status.");
            }
            shouldTimeSlice.finishedWork = forceSync;
            shouldTimeSlice.finishedLanes = lanes;
            if (null !== ReactSharedInternals.actQueue)
              commitRoot(
                shouldTimeSlice,
                workInProgressRootRecoverableErrors,
                workInProgressTransitions,
                workInProgressRootDidIncludeRecursiveRenderUpdate,
                workInProgressDeferredLane,
                workInProgressRootInterleavedUpdatedLanes,
                workInProgressSuspendedRetryLanes,
                exitStatus,
                IMMEDIATE_COMMIT,
                renderStartTime,
                0
              );
            else {
              if (
                (lanes & 62914560) === lanes &&
                ((renderWasConcurrent =
                  globalMostRecentFallbackTime +
                  FALLBACK_THROTTLE_MS -
                  now$1()),
                10 < renderWasConcurrent)
              ) {
                markRootSuspended(
                  shouldTimeSlice,
                  lanes,
                  workInProgressDeferredLane,
                  !workInProgressRootDidSkipSuspendedSiblings
                );
                if (0 !== getNextLanes(shouldTimeSlice, 0)) break a;
                shouldTimeSlice.timeoutHandle = scheduleTimeout(
                  commitRootWhenReady.bind(
                    null,
                    shouldTimeSlice,
                    forceSync,
                    workInProgressRootRecoverableErrors,
                    workInProgressTransitions,
                    workInProgressRootDidIncludeRecursiveRenderUpdate,
                    lanes,
                    workInProgressDeferredLane,
                    workInProgressRootInterleavedUpdatedLanes,
                    workInProgressSuspendedRetryLanes,
                    workInProgressRootDidSkipSuspendedSiblings,
                    exitStatus,
                    THROTTLED_COMMIT,
                    renderStartTime,
                    0
                  ),
                  renderWasConcurrent
                );
                break a;
              }
              commitRootWhenReady(
                shouldTimeSlice,
                forceSync,
                workInProgressRootRecoverableErrors,
                workInProgressTransitions,
                workInProgressRootDidIncludeRecursiveRenderUpdate,
                lanes,
                workInProgressDeferredLane,
                workInProgressRootInterleavedUpdatedLanes,
                workInProgressSuspendedRetryLanes,
                workInProgressRootDidSkipSuspendedSiblings,
                exitStatus,
                IMMEDIATE_COMMIT,
                renderStartTime,
                0
              );
            }
          }
        }
        break;
      } while (1);
      ensureRootIsScheduled(root);
    }
    function queueRecoverableErrors(errors) {
      null === workInProgressRootRecoverableErrors
        ? (workInProgressRootRecoverableErrors = errors)
        : workInProgressRootRecoverableErrors.push.apply(
            workInProgressRootRecoverableErrors,
            errors
          );
    }
    function commitRootWhenReady(
      root,
      finishedWork,
      recoverableErrors,
      transitions,
      didIncludeRenderPhaseUpdate,
      lanes,
      spawnedLane,
      updatedLanes,
      suspendedRetryLanes,
      didSkipSuspendedSiblings,
      exitStatus,
      suspendedCommitReason,
      completedRenderStartTime,
      completedRenderEndTime
    ) {
      var subtreeFlags = finishedWork.subtreeFlags;
      if (subtreeFlags & 8192 || 16785408 === (subtreeFlags & 16785408))
        if (
          ((suspendedState = {
            stylesheets: null,
            count: 0,
            unsuspend: noop$1
          }),
          accumulateSuspenseyCommitOnFiber(finishedWork),
          (finishedWork = waitForCommitToBeReady()),
          null !== finishedWork)
        ) {
          root.cancelPendingCommit = finishedWork(
            commitRoot.bind(
              null,
              root,
              recoverableErrors,
              transitions,
              didIncludeRenderPhaseUpdate,
              spawnedLane,
              updatedLanes,
              suspendedRetryLanes,
              exitStatus,
              SUSPENDED_COMMIT,
              completedRenderStartTime,
              completedRenderEndTime
            )
          );
          markRootSuspended(
            root,
            lanes,
            spawnedLane,
            !didSkipSuspendedSiblings
          );
          return;
        }
      commitRoot(
        root,
        recoverableErrors,
        transitions,
        didIncludeRenderPhaseUpdate,
        spawnedLane,
        updatedLanes,
        suspendedRetryLanes,
        exitStatus,
        suspendedCommitReason,
        completedRenderStartTime,
        completedRenderEndTime
      );
    }
    function isRenderConsistentWithExternalStores(finishedWork) {
      for (var node = finishedWork; ; ) {
        var tag = node.tag;
        if (
          (0 === tag || 11 === tag || 15 === tag) &&
          node.flags & 16384 &&
          ((tag = node.updateQueue),
          null !== tag && ((tag = tag.stores), null !== tag))
        )
          for (var i = 0; i < tag.length; i++) {
            var check = tag[i],
              getSnapshot = check.getSnapshot;
            check = check.value;
            try {
              if (!objectIs(getSnapshot(), check)) return !1;
            } catch (error) {
              return !1;
            }
          }
        tag = node.child;
        if (node.subtreeFlags & 16384 && null !== tag)
          (tag.return = node), (node = tag);
        else {
          if (node === finishedWork) break;
          for (; null === node.sibling; ) {
            if (null === node.return || node.return === finishedWork) return !0;
            node = node.return;
          }
          node.sibling.return = node.return;
          node = node.sibling;
        }
      }
      return !0;
    }
    function markRootSuspended(
      root,
      suspendedLanes,
      spawnedLane,
      didAttemptEntireTree
    ) {
      suspendedLanes &= ~workInProgressRootPingedLanes;
      suspendedLanes &= ~workInProgressRootInterleavedUpdatedLanes;
      root.suspendedLanes |= suspendedLanes;
      root.pingedLanes &= ~suspendedLanes;
      didAttemptEntireTree && (root.warmLanes |= suspendedLanes);
      didAttemptEntireTree = root.expirationTimes;
      for (var lanes = suspendedLanes; 0 < lanes; ) {
        var index = 31 - clz32(lanes),
          lane = 1 << index;
        didAttemptEntireTree[index] = -1;
        lanes &= ~lane;
      }
      0 !== spawnedLane &&
        markSpawnedDeferredLane(root, spawnedLane, suspendedLanes);
    }
    function flushSyncWork$1() {
      return (executionContext & (RenderContext | CommitContext)) === NoContext
        ? (flushSyncWorkAcrossRoots_impl(0, !1), !1)
        : !0;
    }
    function resetWorkInProgressStack() {
      if (null !== workInProgress) {
        if (workInProgressSuspendedReason === NotSuspended)
          var interruptedWork = workInProgress.return;
        else
          (interruptedWork = workInProgress),
            resetContextDependencies(),
            resetHooksOnUnwind(interruptedWork),
            (thenableState = null),
            (thenableIndexCounter = 0),
            (interruptedWork = workInProgress);
        for (; null !== interruptedWork; )
          unwindInterruptedWork(interruptedWork.alternate, interruptedWork),
            (interruptedWork = interruptedWork.return);
        workInProgress = null;
      }
    }
    function prepareFreshStack(root, lanes) {
      root.finishedWork = null;
      root.finishedLanes = 0;
      var timeoutHandle = root.timeoutHandle;
      timeoutHandle !== noTimeout &&
        ((root.timeoutHandle = noTimeout), cancelTimeout(timeoutHandle));
      timeoutHandle = root.cancelPendingCommit;
      null !== timeoutHandle &&
        ((root.cancelPendingCommit = null), timeoutHandle());
      resetWorkInProgressStack();
      workInProgressRoot = root;
      workInProgress = timeoutHandle = createWorkInProgress(root.current, null);
      workInProgressRootRenderLanes = lanes;
      workInProgressSuspendedReason = NotSuspended;
      workInProgressThrownValue = null;
      workInProgressRootDidSkipSuspendedSiblings = !1;
      workInProgressRootIsPrerendering = checkIfRootIsPrerendering(root, lanes);
      workInProgressRootDidAttachPingListener = !1;
      workInProgressRootExitStatus = RootInProgress;
      workInProgressSuspendedRetryLanes =
        workInProgressDeferredLane =
        workInProgressRootPingedLanes =
        workInProgressRootInterleavedUpdatedLanes =
        workInProgressRootSkippedLanes =
          0;
      workInProgressRootRecoverableErrors = workInProgressRootConcurrentErrors =
        null;
      workInProgressRootDidIncludeRecursiveRenderUpdate = !1;
      0 !== (lanes & 8) && (lanes |= lanes & 32);
      var allEntangledLanes = root.entangledLanes;
      if (0 !== allEntangledLanes)
        for (
          root = root.entanglements, allEntangledLanes &= lanes;
          0 < allEntangledLanes;

        ) {
          var index = 31 - clz32(allEntangledLanes),
            lane = 1 << index;
          lanes |= root[index];
          allEntangledLanes &= ~lane;
        }
      entangledRenderLanes = lanes;
      finishQueueingConcurrentUpdates();
      ReactStrictModeWarnings.discardPendingWarnings();
      return timeoutHandle;
    }
    function handleThrow(root, thrownValue) {
      currentlyRenderingFiber$1 = null;
      ReactSharedInternals.H = ContextOnlyDispatcher;
      ReactSharedInternals.getCurrentStack = null;
      isRendering = !1;
      current = null;
      thrownValue === SuspenseException ||
      thrownValue === SuspenseActionException
        ? ((thrownValue = getSuspendedThenable()),
          (workInProgressSuspendedReason = SuspendedOnImmediate))
        : thrownValue === SuspenseyCommitException
          ? ((thrownValue = getSuspendedThenable()),
            (workInProgressSuspendedReason = SuspendedOnInstance))
          : (workInProgressSuspendedReason =
              thrownValue === SelectiveHydrationException
                ? SuspendedOnHydration
                : null !== thrownValue &&
                    "object" === typeof thrownValue &&
                    "function" === typeof thrownValue.then
                  ? SuspendedOnDeprecatedThrowPromise
                  : SuspendedOnError);
      workInProgressThrownValue = thrownValue;
      var erroredWork = workInProgress;
      if (null === erroredWork)
        (workInProgressRootExitStatus = RootFatalErrored),
          logUncaughtError(
            root,
            createCapturedValueAtFiber(thrownValue, root.current)
          );
      else
        switch (
          (erroredWork.mode & ProfileMode &&
            stopProfilerTimerIfRunningAndRecordDuration(erroredWork),
          markComponentRenderStopped(),
          workInProgressSuspendedReason)
        ) {
          case SuspendedOnError:
            null !== injectedProfilingHooks &&
              "function" ===
                typeof injectedProfilingHooks.markComponentErrored &&
              injectedProfilingHooks.markComponentErrored(
                erroredWork,
                thrownValue,
                workInProgressRootRenderLanes
              );
            break;
          case SuspendedOnData:
          case SuspendedOnAction:
          case SuspendedOnImmediate:
          case SuspendedOnDeprecatedThrowPromise:
          case SuspendedAndReadyToContinue:
            null !== injectedProfilingHooks &&
              "function" ===
                typeof injectedProfilingHooks.markComponentSuspended &&
              injectedProfilingHooks.markComponentSuspended(
                erroredWork,
                thrownValue,
                workInProgressRootRenderLanes
              );
        }
    }
    function pushDispatcher() {
      var prevDispatcher = ReactSharedInternals.H;
      ReactSharedInternals.H = ContextOnlyDispatcher;
      return null === prevDispatcher ? ContextOnlyDispatcher : prevDispatcher;
    }
    function pushAsyncDispatcher() {
      var prevAsyncDispatcher = ReactSharedInternals.A;
      ReactSharedInternals.A = DefaultAsyncDispatcher;
      return prevAsyncDispatcher;
    }
    function renderDidSuspendDelayIfPossible() {
      workInProgressRootExitStatus = RootSuspendedWithDelay;
      workInProgressRootDidSkipSuspendedSiblings ||
        ((workInProgressRootRenderLanes & 4194176) !==
          workInProgressRootRenderLanes &&
          null !== suspenseHandlerStackCursor.current) ||
        (workInProgressRootIsPrerendering = !0);
      (0 === (workInProgressRootSkippedLanes & 134217727) &&
        0 === (workInProgressRootInterleavedUpdatedLanes & 134217727)) ||
        null === workInProgressRoot ||
        markRootSuspended(
          workInProgressRoot,
          workInProgressRootRenderLanes,
          workInProgressDeferredLane,
          !1
        );
    }
    function renderRootSync(root, lanes, shouldYieldForPrerendering) {
      var prevExecutionContext = executionContext;
      executionContext |= RenderContext;
      var prevDispatcher = pushDispatcher(),
        prevAsyncDispatcher = pushAsyncDispatcher();
      if (
        workInProgressRoot !== root ||
        workInProgressRootRenderLanes !== lanes
      ) {
        if (isDevToolsPresent) {
          var memoizedUpdaters = root.memoizedUpdaters;
          0 < memoizedUpdaters.size &&
            (restorePendingUpdaters(root, workInProgressRootRenderLanes),
            memoizedUpdaters.clear());
          movePendingFibersToMemoized(root, lanes);
        }
        workInProgressTransitions = null;
        prepareFreshStack(root, lanes);
      }
      markRenderStarted(lanes);
      lanes = !1;
      memoizedUpdaters = workInProgressRootExitStatus;
      a: do
        try {
          if (
            workInProgressSuspendedReason !== NotSuspended &&
            null !== workInProgress
          ) {
            var unitOfWork = workInProgress,
              thrownValue = workInProgressThrownValue;
            switch (workInProgressSuspendedReason) {
              case SuspendedOnHydration:
                resetWorkInProgressStack();
                memoizedUpdaters = RootSuspendedAtTheShell;
                break a;
              case SuspendedOnImmediate:
              case SuspendedOnData:
              case SuspendedOnAction:
              case SuspendedOnDeprecatedThrowPromise:
                null === suspenseHandlerStackCursor.current && (lanes = !0);
                var reason = workInProgressSuspendedReason;
                workInProgressSuspendedReason = NotSuspended;
                workInProgressThrownValue = null;
                throwAndUnwindWorkLoop(root, unitOfWork, thrownValue, reason);
                if (
                  shouldYieldForPrerendering &&
                  workInProgressRootIsPrerendering
                ) {
                  memoizedUpdaters = RootInProgress;
                  break a;
                }
                break;
              default:
                (reason = workInProgressSuspendedReason),
                  (workInProgressSuspendedReason = NotSuspended),
                  (workInProgressThrownValue = null),
                  throwAndUnwindWorkLoop(root, unitOfWork, thrownValue, reason);
            }
          }
          workLoopSync();
          memoizedUpdaters = workInProgressRootExitStatus;
          break;
        } catch (thrownValue$8) {
          handleThrow(root, thrownValue$8);
        }
      while (1);
      lanes && root.shellSuspendCounter++;
      resetContextDependencies();
      executionContext = prevExecutionContext;
      ReactSharedInternals.H = prevDispatcher;
      ReactSharedInternals.A = prevAsyncDispatcher;
      markRenderStopped();
      null === workInProgress &&
        ((workInProgressRoot = null),
        (workInProgressRootRenderLanes = 0),
        finishQueueingConcurrentUpdates());
      return memoizedUpdaters;
    }
    function workLoopSync() {
      for (; null !== workInProgress; ) performUnitOfWork(workInProgress);
    }
    function renderRootConcurrent(root, lanes) {
      var prevExecutionContext = executionContext;
      executionContext |= RenderContext;
      var prevDispatcher = pushDispatcher(),
        prevAsyncDispatcher = pushAsyncDispatcher();
      if (
        workInProgressRoot !== root ||
        workInProgressRootRenderLanes !== lanes
      ) {
        if (isDevToolsPresent) {
          var memoizedUpdaters = root.memoizedUpdaters;
          0 < memoizedUpdaters.size &&
            (restorePendingUpdaters(root, workInProgressRootRenderLanes),
            memoizedUpdaters.clear());
          movePendingFibersToMemoized(root, lanes);
        }
        workInProgressTransitions = null;
        workInProgressRootRenderTargetTime = now$1() + RENDER_TIMEOUT_MS;
        prepareFreshStack(root, lanes);
      } else
        workInProgressRootIsPrerendering = checkIfRootIsPrerendering(
          root,
          lanes
        );
      markRenderStarted(lanes);
      a: do
        try {
          if (
            workInProgressSuspendedReason !== NotSuspended &&
            null !== workInProgress
          )
            b: switch (
              ((lanes = workInProgress),
              (memoizedUpdaters = workInProgressThrownValue),
              workInProgressSuspendedReason)
            ) {
              case SuspendedOnError:
                workInProgressSuspendedReason = NotSuspended;
                workInProgressThrownValue = null;
                throwAndUnwindWorkLoop(
                  root,
                  lanes,
                  memoizedUpdaters,
                  SuspendedOnError
                );
                break;
              case SuspendedOnData:
              case SuspendedOnAction:
                if (isThenableResolved(memoizedUpdaters)) {
                  workInProgressSuspendedReason = NotSuspended;
                  workInProgressThrownValue = null;
                  replaySuspendedUnitOfWork(lanes);
                  break;
                }
                lanes = function () {
                  (workInProgressSuspendedReason !== SuspendedOnData &&
                    workInProgressSuspendedReason !== SuspendedOnAction) ||
                    workInProgressRoot !== root ||
                    (workInProgressSuspendedReason =
                      SuspendedAndReadyToContinue);
                  ensureRootIsScheduled(root);
                };
                memoizedUpdaters.then(lanes, lanes);
                break a;
              case SuspendedOnImmediate:
                workInProgressSuspendedReason = SuspendedAndReadyToContinue;
                break a;
              case SuspendedOnInstance:
                workInProgressSuspendedReason =
                  SuspendedOnInstanceAndReadyToContinue;
                break a;
              case SuspendedAndReadyToContinue:
                isThenableResolved(memoizedUpdaters)
                  ? ((workInProgressSuspendedReason = NotSuspended),
                    (workInProgressThrownValue = null),
                    replaySuspendedUnitOfWork(lanes))
                  : ((workInProgressSuspendedReason = NotSuspended),
                    (workInProgressThrownValue = null),
                    throwAndUnwindWorkLoop(
                      root,
                      lanes,
                      memoizedUpdaters,
                      SuspendedAndReadyToContinue
                    ));
                break;
              case SuspendedOnInstanceAndReadyToContinue:
                var resource = null;
                switch (workInProgress.tag) {
                  case 26:
                    resource = workInProgress.memoizedState;
                  case 5:
                  case 27:
                    var hostFiber = workInProgress;
                    if (resource ? preloadResource(resource) : 1) {
                      workInProgressSuspendedReason = NotSuspended;
                      workInProgressThrownValue = null;
                      var sibling = hostFiber.sibling;
                      if (null !== sibling) workInProgress = sibling;
                      else {
                        var returnFiber = hostFiber.return;
                        null !== returnFiber
                          ? ((workInProgress = returnFiber),
                            completeUnitOfWork(returnFiber))
                          : (workInProgress = null);
                      }
                      break b;
                    }
                    break;
                  default:
                    console.error(
                      "Unexpected type of fiber triggered a suspensey commit. This is a bug in React."
                    );
                }
                workInProgressSuspendedReason = NotSuspended;
                workInProgressThrownValue = null;
                throwAndUnwindWorkLoop(
                  root,
                  lanes,
                  memoizedUpdaters,
                  SuspendedOnInstanceAndReadyToContinue
                );
                break;
              case SuspendedOnDeprecatedThrowPromise:
                workInProgressSuspendedReason = NotSuspended;
                workInProgressThrownValue = null;
                throwAndUnwindWorkLoop(
                  root,
                  lanes,
                  memoizedUpdaters,
                  SuspendedOnDeprecatedThrowPromise
                );
                break;
              case SuspendedOnHydration:
                resetWorkInProgressStack();
                workInProgressRootExitStatus = RootSuspendedAtTheShell;
                break a;
              default:
                throw Error(
                  "Unexpected SuspendedReason. This is a bug in React."
                );
            }
          null !== ReactSharedInternals.actQueue
            ? workLoopSync()
            : workLoopConcurrent();
          break;
        } catch (thrownValue$9) {
          handleThrow(root, thrownValue$9);
        }
      while (1);
      resetContextDependencies();
      ReactSharedInternals.H = prevDispatcher;
      ReactSharedInternals.A = prevAsyncDispatcher;
      executionContext = prevExecutionContext;
      if (null !== workInProgress)
        return (
          null !== injectedProfilingHooks &&
            "function" === typeof injectedProfilingHooks.markRenderYielded &&
            injectedProfilingHooks.markRenderYielded(),
          RootInProgress
        );
      markRenderStopped();
      workInProgressRoot = null;
      workInProgressRootRenderLanes = 0;
      finishQueueingConcurrentUpdates();
      return workInProgressRootExitStatus;
    }
    function workLoopConcurrent() {
      for (; null !== workInProgress && !shouldYield(); )
        performUnitOfWork(workInProgress);
    }
    function performUnitOfWork(unitOfWork) {
      var current = unitOfWork.alternate;
      (unitOfWork.mode & ProfileMode) !== NoMode
        ? (startProfilerTimer(unitOfWork),
          (current = runWithFiberInDEV(
            unitOfWork,
            beginWork,
            current,
            unitOfWork,
            entangledRenderLanes
          )),
          stopProfilerTimerIfRunningAndRecordDuration(unitOfWork))
        : (current = runWithFiberInDEV(
            unitOfWork,
            beginWork,
            current,
            unitOfWork,
            entangledRenderLanes
          ));
      unitOfWork.memoizedProps = unitOfWork.pendingProps;
      null === current
        ? completeUnitOfWork(unitOfWork)
        : (workInProgress = current);
    }
    function replaySuspendedUnitOfWork(unitOfWork) {
      var next = runWithFiberInDEV(unitOfWork, replayBeginWork, unitOfWork);
      unitOfWork.memoizedProps = unitOfWork.pendingProps;
      null === next ? completeUnitOfWork(unitOfWork) : (workInProgress = next);
    }
    function replayBeginWork(unitOfWork) {
      var current = unitOfWork.alternate,
        isProfilingMode = (unitOfWork.mode & ProfileMode) !== NoMode;
      isProfilingMode && startProfilerTimer(unitOfWork);
      switch (unitOfWork.tag) {
        case 15:
        case 0:
          current = replayFunctionComponent(
            current,
            unitOfWork,
            unitOfWork.pendingProps,
            unitOfWork.type,
            void 0,
            workInProgressRootRenderLanes
          );
          break;
        case 11:
          current = replayFunctionComponent(
            current,
            unitOfWork,
            unitOfWork.pendingProps,
            unitOfWork.type.render,
            unitOfWork.ref,
            workInProgressRootRenderLanes
          );
          break;
        case 5:
          resetHooksOnUnwind(unitOfWork);
        default:
          unwindInterruptedWork(current, unitOfWork),
            (unitOfWork = workInProgress =
              resetWorkInProgress(unitOfWork, entangledRenderLanes)),
            (current = beginWork(current, unitOfWork, entangledRenderLanes));
      }
      isProfilingMode &&
        stopProfilerTimerIfRunningAndRecordDuration(unitOfWork);
      return current;
    }
    function throwAndUnwindWorkLoop(
      root,
      unitOfWork,
      thrownValue,
      suspendedReason
    ) {
      resetContextDependencies();
      resetHooksOnUnwind(unitOfWork);
      thenableState = null;
      thenableIndexCounter = 0;
      var returnFiber = unitOfWork.return;
      try {
        if (
          throwException(
            root,
            returnFiber,
            unitOfWork,
            thrownValue,
            workInProgressRootRenderLanes
          )
        ) {
          workInProgressRootExitStatus = RootFatalErrored;
          logUncaughtError(
            root,
            createCapturedValueAtFiber(thrownValue, root.current)
          );
          workInProgress = null;
          return;
        }
      } catch (error) {
        if (null !== returnFiber) throw ((workInProgress = returnFiber), error);
        workInProgressRootExitStatus = RootFatalErrored;
        logUncaughtError(
          root,
          createCapturedValueAtFiber(thrownValue, root.current)
        );
        workInProgress = null;
        return;
      }
      if (unitOfWork.flags & 32768) {
        if (isHydrating || suspendedReason === SuspendedOnError) root = !0;
        else if (
          workInProgressRootIsPrerendering ||
          0 !== (workInProgressRootRenderLanes & 536870912)
        )
          root = !1;
        else if (
          ((workInProgressRootDidSkipSuspendedSiblings = root = !0),
          suspendedReason === SuspendedOnData ||
            suspendedReason === SuspendedOnAction ||
            suspendedReason === SuspendedOnImmediate ||
            suspendedReason === SuspendedOnDeprecatedThrowPromise)
        )
          (suspendedReason = suspenseHandlerStackCursor.current),
            null !== suspendedReason &&
              13 === suspendedReason.tag &&
              (suspendedReason.flags |= 16384);
        unwindUnitOfWork(unitOfWork, root);
      } else completeUnitOfWork(unitOfWork);
    }
    function completeUnitOfWork(unitOfWork) {
      var completedWork = unitOfWork;
      do {
        if (0 !== (completedWork.flags & 32768)) {
          unwindUnitOfWork(
            completedWork,
            workInProgressRootDidSkipSuspendedSiblings
          );
          return;
        }
        var current = completedWork.alternate;
        unitOfWork = completedWork.return;
        startProfilerTimer(completedWork);
        current = runWithFiberInDEV(
          completedWork,
          completeWork,
          current,
          completedWork,
          entangledRenderLanes
        );
        (completedWork.mode & ProfileMode) !== NoMode &&
          stopProfilerTimerIfRunningAndRecordIncompleteDuration(completedWork);
        if (null !== current) {
          workInProgress = current;
          return;
        }
        completedWork = completedWork.sibling;
        if (null !== completedWork) {
          workInProgress = completedWork;
          return;
        }
        workInProgress = completedWork = unitOfWork;
      } while (null !== completedWork);
      workInProgressRootExitStatus === RootInProgress &&
        (workInProgressRootExitStatus = RootCompleted);
    }
    function unwindUnitOfWork(unitOfWork, skipSiblings) {
      do {
        var next = unwindWork(unitOfWork.alternate, unitOfWork);
        if (null !== next) {
          next.flags &= 32767;
          workInProgress = next;
          return;
        }
        if ((unitOfWork.mode & ProfileMode) !== NoMode) {
          stopProfilerTimerIfRunningAndRecordIncompleteDuration(unitOfWork);
          next = unitOfWork.actualDuration;
          for (var child = unitOfWork.child; null !== child; )
            (next += child.actualDuration), (child = child.sibling);
          unitOfWork.actualDuration = next;
        }
        next = unitOfWork.return;
        null !== next &&
          ((next.flags |= 32768),
          (next.subtreeFlags = 0),
          (next.deletions = null));
        if (
          !skipSiblings &&
          ((unitOfWork = unitOfWork.sibling), null !== unitOfWork)
        ) {
          workInProgress = unitOfWork;
          return;
        }
        workInProgress = unitOfWork = next;
      } while (null !== unitOfWork);
      workInProgressRootExitStatus = RootSuspendedAtTheShell;
      workInProgress = null;
    }
    function commitRoot(
      root,
      recoverableErrors,
      transitions,
      didIncludeRenderPhaseUpdate,
      spawnedLane,
      updatedLanes,
      suspendedRetryLanes,
      exitStatus,
      suspendedCommitReason,
      completedRenderStartTime,
      completedRenderEndTime
    ) {
      var prevTransition = ReactSharedInternals.T,
        previousUpdateLanePriority = ReactDOMSharedInternals.p;
      try {
        (ReactDOMSharedInternals.p = DiscreteEventPriority),
          (ReactSharedInternals.T = null),
          commitRootImpl(
            root,
            recoverableErrors,
            transitions,
            didIncludeRenderPhaseUpdate,
            previousUpdateLanePriority,
            spawnedLane,
            updatedLanes,
            suspendedRetryLanes,
            exitStatus,
            suspendedCommitReason,
            completedRenderStartTime,
            completedRenderEndTime
          );
      } finally {
        (ReactSharedInternals.T = prevTransition),
          (ReactDOMSharedInternals.p = previousUpdateLanePriority);
      }
    }
    function commitRootImpl(
      root,
      recoverableErrors,
      transitions,
      didIncludeRenderPhaseUpdate,
      renderPriorityLevel,
      spawnedLane,
      updatedLanes,
      suspendedRetryLanes
    ) {
      do flushPassiveEffects();
      while (null !== rootWithPendingPassiveEffects);
      ReactStrictModeWarnings.flushLegacyContextWarning();
      ReactStrictModeWarnings.flushPendingUnsafeLifecycleWarnings();
      if ((executionContext & (RenderContext | CommitContext)) !== NoContext)
        throw Error("Should not already be working.");
      var finishedWork = root.finishedWork;
      didIncludeRenderPhaseUpdate = root.finishedLanes;
      null !== injectedProfilingHooks &&
        "function" === typeof injectedProfilingHooks.markCommitStarted &&
        injectedProfilingHooks.markCommitStarted(didIncludeRenderPhaseUpdate);
      if (null === finishedWork) return markCommitStopped(), null;
      0 === didIncludeRenderPhaseUpdate &&
        console.error(
          "root.finishedLanes should not be empty during a commit. This is a bug in React."
        );
      root.finishedWork = null;
      root.finishedLanes = 0;
      if (finishedWork === root.current)
        throw Error(
          "Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue."
        );
      root.callbackNode = null;
      root.callbackPriority = 0;
      root.cancelPendingCommit = null;
      var remainingLanes = finishedWork.lanes | finishedWork.childLanes;
      remainingLanes |= concurrentlyUpdatedLanes;
      markRootFinished(
        root,
        didIncludeRenderPhaseUpdate,
        remainingLanes,
        spawnedLane,
        updatedLanes,
        suspendedRetryLanes
      );
      root === workInProgressRoot &&
        ((workInProgress = workInProgressRoot = null),
        (workInProgressRootRenderLanes = 0));
      (0 === (finishedWork.subtreeFlags & 10256) &&
        0 === (finishedWork.flags & 10256)) ||
        rootDoesHavePassiveEffects ||
        ((rootDoesHavePassiveEffects = !0),
        (pendingPassiveEffectsRemainingLanes = remainingLanes),
        (pendingPassiveTransitions = transitions),
        scheduleCallback$1(NormalPriority$1, function () {
          flushPassiveEffects(!0);
          return null;
        }));
      commitStartTime = now();
      transitions = 0 !== (finishedWork.flags & 15990);
      0 !== (finishedWork.subtreeFlags & 15990) || transitions
        ? ((transitions = ReactSharedInternals.T),
          (ReactSharedInternals.T = null),
          (spawnedLane = ReactDOMSharedInternals.p),
          (ReactDOMSharedInternals.p = DiscreteEventPriority),
          (updatedLanes = executionContext),
          (executionContext |= CommitContext),
          commitBeforeMutationEffects(root, finishedWork),
          commitMutationEffects(
            root,
            finishedWork,
            didIncludeRenderPhaseUpdate
          ),
          restoreSelection(selectionInformation, root.containerInfo),
          (_enabled = !!eventsEnabled),
          (selectionInformation = eventsEnabled = null),
          (root.current = finishedWork),
          null !== injectedProfilingHooks &&
            "function" ===
              typeof injectedProfilingHooks.markLayoutEffectsStarted &&
            injectedProfilingHooks.markLayoutEffectsStarted(
              didIncludeRenderPhaseUpdate
            ),
          commitLayoutEffects(finishedWork, root, didIncludeRenderPhaseUpdate),
          null !== injectedProfilingHooks &&
            "function" ===
              typeof injectedProfilingHooks.markLayoutEffectsStopped &&
            injectedProfilingHooks.markLayoutEffectsStopped(),
          requestPaint(),
          (executionContext = updatedLanes),
          (ReactDOMSharedInternals.p = spawnedLane),
          (ReactSharedInternals.T = transitions))
        : (root.current = finishedWork);
      (transitions = rootDoesHavePassiveEffects)
        ? ((rootDoesHavePassiveEffects = !1),
          (rootWithPendingPassiveEffects = root),
          (pendingPassiveEffectsLanes = didIncludeRenderPhaseUpdate))
        : (releaseRootPooledCache(root, remainingLanes),
          (nestedPassiveUpdateCount = 0),
          (rootWithPassiveNestedUpdates = null));
      remainingLanes = root.pendingLanes;
      0 === remainingLanes && (legacyErrorBoundariesThatAlreadyFailed = null);
      transitions || commitDoubleInvokeEffectsInDEV(root);
      onCommitRoot$1(finishedWork.stateNode, renderPriorityLevel);
      isDevToolsPresent && root.memoizedUpdaters.clear();
      onCommitRoot();
      ensureRootIsScheduled(root);
      if (null !== recoverableErrors)
        for (
          renderPriorityLevel = root.onRecoverableError, finishedWork = 0;
          finishedWork < recoverableErrors.length;
          finishedWork++
        )
          (remainingLanes = recoverableErrors[finishedWork]),
            (transitions = makeErrorInfo(remainingLanes.stack)),
            runWithFiberInDEV(
              remainingLanes.source,
              renderPriorityLevel,
              remainingLanes.value,
              transitions
            );
      0 !== (pendingPassiveEffectsLanes & 3) && flushPassiveEffects();
      remainingLanes = root.pendingLanes;
      0 !== (didIncludeRenderPhaseUpdate & 4194218) &&
      0 !== (remainingLanes & 42)
        ? ((nestedUpdateScheduled = !0),
          root === rootWithNestedUpdates
            ? nestedUpdateCount++
            : ((nestedUpdateCount = 0), (rootWithNestedUpdates = root)))
        : (nestedUpdateCount = 0);
      flushSyncWorkAcrossRoots_impl(0, !1);
      markCommitStopped();
      return null;
    }
    function makeErrorInfo(componentStack) {
      componentStack = { componentStack: componentStack };
      Object.defineProperty(componentStack, "digest", {
        get: function () {
          console.error(
            'You are accessing "digest" from the errorInfo object passed to onRecoverableError. This property is no longer provided as part of errorInfo but can be accessed as a property of the Error instance itself.'
          );
        }
      });
      return componentStack;
    }
    function releaseRootPooledCache(root, remainingLanes) {
      0 === (root.pooledCacheLanes &= remainingLanes) &&
        ((remainingLanes = root.pooledCache),
        null != remainingLanes &&
          ((root.pooledCache = null), releaseCache(remainingLanes)));
    }
    function flushPassiveEffects() {
      if (null !== rootWithPendingPassiveEffects) {
        var root = rootWithPendingPassiveEffects,
          remainingLanes = pendingPassiveEffectsRemainingLanes;
        pendingPassiveEffectsRemainingLanes = 0;
        var renderPriority = lanesToEventPriority(pendingPassiveEffectsLanes),
          priority =
            0 === DefaultEventPriority || DefaultEventPriority > renderPriority
              ? DefaultEventPriority
              : renderPriority;
        renderPriority = ReactSharedInternals.T;
        var previousPriority = ReactDOMSharedInternals.p;
        try {
          ReactDOMSharedInternals.p = priority;
          ReactSharedInternals.T = null;
          if (null === rootWithPendingPassiveEffects)
            var JSCompiler_inline_result = !1;
          else {
            priority = pendingPassiveTransitions;
            pendingPassiveTransitions = null;
            var root$jscomp$0 = rootWithPendingPassiveEffects,
              lanes = pendingPassiveEffectsLanes;
            rootWithPendingPassiveEffects = null;
            pendingPassiveEffectsLanes = 0;
            if (
              (executionContext & (RenderContext | CommitContext)) !==
              NoContext
            )
              throw Error(
                "Cannot flush passive effects while already rendering."
              );
            isFlushingPassiveEffects = !0;
            didScheduleUpdateDuringPassiveEffects = !1;
            null !== injectedProfilingHooks &&
              "function" ===
                typeof injectedProfilingHooks.markPassiveEffectsStarted &&
              injectedProfilingHooks.markPassiveEffectsStarted(lanes);
            var prevExecutionContext = executionContext;
            executionContext |= CommitContext;
            commitPassiveUnmountOnFiber(root$jscomp$0.current);
            commitPassiveMountOnFiber(
              root$jscomp$0,
              root$jscomp$0.current,
              lanes,
              priority
            );
            null !== injectedProfilingHooks &&
              "function" ===
                typeof injectedProfilingHooks.markPassiveEffectsStopped &&
              injectedProfilingHooks.markPassiveEffectsStopped();
            commitDoubleInvokeEffectsInDEV(root$jscomp$0);
            executionContext = prevExecutionContext;
            flushSyncWorkAcrossRoots_impl(0, !1);
            didScheduleUpdateDuringPassiveEffects
              ? root$jscomp$0 === rootWithPassiveNestedUpdates
                ? nestedPassiveUpdateCount++
                : ((nestedPassiveUpdateCount = 0),
                  (rootWithPassiveNestedUpdates = root$jscomp$0))
              : (nestedPassiveUpdateCount = 0);
            didScheduleUpdateDuringPassiveEffects = isFlushingPassiveEffects =
              !1;
            if (
              injectedHook &&
              "function" === typeof injectedHook.onPostCommitFiberRoot
            )
              try {
                injectedHook.onPostCommitFiberRoot(rendererID, root$jscomp$0);
              } catch (err) {
                hasLoggedError ||
                  ((hasLoggedError = !0),
                  console.error(
                    "React instrumentation encountered an error: %s",
                    err
                  ));
              }
            var stateNode = root$jscomp$0.current.stateNode;
            stateNode.effectDuration = 0;
            stateNode.passiveEffectDuration = 0;
            JSCompiler_inline_result = !0;
          }
          return JSCompiler_inline_result;
        } finally {
          (ReactDOMSharedInternals.p = previousPriority),
            (ReactSharedInternals.T = renderPriority),
            releaseRootPooledCache(root, remainingLanes);
        }
      }
      return !1;
    }
    function captureCommitPhaseErrorOnRoot(rootFiber, sourceFiber, error) {
      sourceFiber = createCapturedValueAtFiber(error, sourceFiber);
      sourceFiber = createRootErrorUpdate(rootFiber.stateNode, sourceFiber, 2);
      rootFiber = enqueueUpdate(rootFiber, sourceFiber, 2);
      null !== rootFiber &&
        (markRootUpdated$1(rootFiber, 2), ensureRootIsScheduled(rootFiber));
    }
    function captureCommitPhaseError(
      sourceFiber,
      nearestMountedAncestor,
      error
    ) {
      isRunningInsertionEffect = !1;
      if (3 === sourceFiber.tag)
        captureCommitPhaseErrorOnRoot(sourceFiber, sourceFiber, error);
      else {
        for (; null !== nearestMountedAncestor; ) {
          if (3 === nearestMountedAncestor.tag) {
            captureCommitPhaseErrorOnRoot(
              nearestMountedAncestor,
              sourceFiber,
              error
            );
            return;
          }
          if (1 === nearestMountedAncestor.tag) {
            var instance = nearestMountedAncestor.stateNode;
            if (
              "function" ===
                typeof nearestMountedAncestor.type.getDerivedStateFromError ||
              ("function" === typeof instance.componentDidCatch &&
                (null === legacyErrorBoundariesThatAlreadyFailed ||
                  !legacyErrorBoundariesThatAlreadyFailed.has(instance)))
            ) {
              sourceFiber = createCapturedValueAtFiber(error, sourceFiber);
              error = createClassErrorUpdate(2);
              instance = enqueueUpdate(nearestMountedAncestor, error, 2);
              null !== instance &&
                (initializeClassErrorUpdate(
                  error,
                  instance,
                  nearestMountedAncestor,
                  sourceFiber
                ),
                markRootUpdated$1(instance, 2),
                ensureRootIsScheduled(instance));
              return;
            }
          }
          nearestMountedAncestor = nearestMountedAncestor.return;
        }
        console.error(
          "Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Potential causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.\n\nError message:\n\n%s",
          error
        );
      }
    }
    function attachPingListener(root, wakeable, lanes) {
      var pingCache = root.pingCache;
      if (null === pingCache) {
        pingCache = root.pingCache = new PossiblyWeakMap();
        var threadIDs = new Set();
        pingCache.set(wakeable, threadIDs);
      } else
        (threadIDs = pingCache.get(wakeable)),
          void 0 === threadIDs &&
            ((threadIDs = new Set()), pingCache.set(wakeable, threadIDs));
      threadIDs.has(lanes) ||
        ((workInProgressRootDidAttachPingListener = !0),
        threadIDs.add(lanes),
        (pingCache = pingSuspendedRoot.bind(null, root, wakeable, lanes)),
        isDevToolsPresent && restorePendingUpdaters(root, lanes),
        wakeable.then(pingCache, pingCache));
    }
    function pingSuspendedRoot(root, wakeable, pingedLanes) {
      var pingCache = root.pingCache;
      null !== pingCache && pingCache.delete(wakeable);
      root.pingedLanes |= root.suspendedLanes & pingedLanes;
      root.warmLanes &= ~pingedLanes;
      isConcurrentActEnvironment() &&
        null === ReactSharedInternals.actQueue &&
        console.error(
          "A suspended resource finished loading inside a test, but the event was not wrapped in act(...).\n\nWhen testing, code that resolves suspended data should be wrapped into act(...):\n\nact(() => {\n  /* finish loading suspended data */\n});\n/* assert on the output */\n\nThis ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act"
        );
      workInProgressRoot === root &&
        (workInProgressRootRenderLanes & pingedLanes) === pingedLanes &&
        (workInProgressRootExitStatus === RootSuspendedWithDelay ||
        (workInProgressRootExitStatus === RootSuspended &&
          (workInProgressRootRenderLanes & 62914560) ===
            workInProgressRootRenderLanes &&
          now$1() - globalMostRecentFallbackTime < FALLBACK_THROTTLE_MS)
          ? (executionContext & RenderContext) === NoContext &&
            prepareFreshStack(root, 0)
          : (workInProgressRootPingedLanes |= pingedLanes),
        workInProgressSuspendedRetryLanes === workInProgressRootRenderLanes &&
          (workInProgressSuspendedRetryLanes = 0));
      ensureRootIsScheduled(root);
    }
    function retryTimedOutBoundary(boundaryFiber, retryLane) {
      0 === retryLane && (retryLane = claimNextRetryLane());
      boundaryFiber = enqueueConcurrentRenderForLane(boundaryFiber, retryLane);
      null !== boundaryFiber &&
        (markRootUpdated$1(boundaryFiber, retryLane),
        ensureRootIsScheduled(boundaryFiber));
    }
    function retryDehydratedSuspenseBoundary(boundaryFiber) {
      var suspenseState = boundaryFiber.memoizedState,
        retryLane = 0;
      null !== suspenseState && (retryLane = suspenseState.retryLane);
      retryTimedOutBoundary(boundaryFiber, retryLane);
    }
    function resolveRetryWakeable(boundaryFiber, wakeable) {
      var retryLane = 0;
      switch (boundaryFiber.tag) {
        case 13:
          var retryCache = boundaryFiber.stateNode;
          var suspenseState = boundaryFiber.memoizedState;
          null !== suspenseState && (retryLane = suspenseState.retryLane);
          break;
        case 19:
          retryCache = boundaryFiber.stateNode;
          break;
        case 22:
          retryCache = boundaryFiber.stateNode._retryCache;
          break;
        default:
          throw Error(
            "Pinged unknown suspense boundary type. This is probably a bug in React."
          );
      }
      null !== retryCache && retryCache.delete(wakeable);
      retryTimedOutBoundary(boundaryFiber, retryLane);
    }
    function recursivelyTraverseAndDoubleInvokeEffectsInDEV(
      root$jscomp$0,
      parentFiber,
      isInStrictMode
    ) {
      if (0 !== (parentFiber.subtreeFlags & 33562624))
        for (parentFiber = parentFiber.child; null !== parentFiber; ) {
          var root = root$jscomp$0,
            fiber = parentFiber,
            isStrictModeFiber = fiber.type === REACT_STRICT_MODE_TYPE;
          isStrictModeFiber = isInStrictMode || isStrictModeFiber;
          22 !== fiber.tag
            ? fiber.flags & 33554432
              ? isStrictModeFiber &&
                runWithFiberInDEV(
                  fiber,
                  doubleInvokeEffectsOnFiber,
                  root,
                  fiber,
                  (fiber.mode & NoStrictPassiveEffectsMode) === NoMode
                )
              : recursivelyTraverseAndDoubleInvokeEffectsInDEV(
                  root,
                  fiber,
                  isStrictModeFiber
                )
            : null === fiber.memoizedState &&
              (isStrictModeFiber && fiber.flags & 8192
                ? runWithFiberInDEV(
                    fiber,
                    doubleInvokeEffectsOnFiber,
                    root,
                    fiber
                  )
                : fiber.subtreeFlags & 33554432 &&
                  runWithFiberInDEV(
                    fiber,
                    recursivelyTraverseAndDoubleInvokeEffectsInDEV,
                    root,
                    fiber,
                    isStrictModeFiber
                  ));
          parentFiber = parentFiber.sibling;
        }
    }
    function doubleInvokeEffectsOnFiber(root, fiber) {
      var shouldDoubleInvokePassiveEffects =
        2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : !0;
      setIsStrictModeForDevtools(!0);
      try {
        disappearLayoutEffects(fiber),
          shouldDoubleInvokePassiveEffects && disconnectPassiveEffect(fiber),
          reappearLayoutEffects(root, fiber.alternate, fiber, !1),
          shouldDoubleInvokePassiveEffects &&
            reconnectPassiveEffects(root, fiber, 0, null, !1);
      } finally {
        setIsStrictModeForDevtools(!1);
      }
    }
    function commitDoubleInvokeEffectsInDEV(root) {
      var doubleInvokeEffects = !0;
      root.current.mode & (StrictLegacyMode | StrictEffectsMode) ||
        (doubleInvokeEffects = !1);
      recursivelyTraverseAndDoubleInvokeEffectsInDEV(
        root,
        root.current,
        doubleInvokeEffects
      );
    }
    function warnAboutUpdateOnNotYetMountedFiberInDEV(fiber) {
      if ((executionContext & RenderContext) === NoContext) {
        var tag = fiber.tag;
        if (
          3 === tag ||
          1 === tag ||
          0 === tag ||
          11 === tag ||
          14 === tag ||
          15 === tag
        ) {
          tag = getComponentNameFromFiber(fiber) || "ReactComponent";
          if (null !== didWarnStateUpdateForNotYetMountedComponent) {
            if (didWarnStateUpdateForNotYetMountedComponent.has(tag)) return;
            didWarnStateUpdateForNotYetMountedComponent.add(tag);
          } else didWarnStateUpdateForNotYetMountedComponent = new Set([tag]);
          runWithFiberInDEV(fiber, function () {
            console.error(
              "Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead."
            );
          });
        }
      }
    }
    function restorePendingUpdaters(root, lanes) {
      isDevToolsPresent &&
        root.memoizedUpdaters.forEach(function (schedulingFiber) {
          addFiberToLanesMap(root, schedulingFiber, lanes);
        });
    }
    function scheduleCallback$1(priorityLevel, callback) {
      var actQueue = ReactSharedInternals.actQueue;
      return null !== actQueue
        ? (actQueue.push(callback), fakeActCallbackNode$1)
        : scheduleCallback$3(priorityLevel, callback);
    }
    function warnIfUpdatesNotWrappedWithActDEV(fiber) {
      isConcurrentActEnvironment() &&
        null === ReactSharedInternals.actQueue &&
        runWithFiberInDEV(fiber, function () {
          console.error(
            "An update to %s inside a test was not wrapped in act(...).\n\nWhen testing, code that causes React state updates should be wrapped into act(...):\n\nact(() => {\n  /* fire events that update state */\n});\n/* assert on the output */\n\nThis ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act",
            getComponentNameFromFiber(fiber)
          );
        });
    }
    function ensureRootIsScheduled(root) {
      root !== lastScheduledRoot &&
        null === root.next &&
        (null === lastScheduledRoot
          ? (firstScheduledRoot = lastScheduledRoot = root)
          : (lastScheduledRoot = lastScheduledRoot.next = root));
      mightHavePendingSyncWork = !0;
      null !== ReactSharedInternals.actQueue
        ? didScheduleMicrotask_act ||
          ((didScheduleMicrotask_act = !0),
          scheduleImmediateTask(processRootScheduleInMicrotask))
        : didScheduleMicrotask ||
          ((didScheduleMicrotask = !0),
          scheduleImmediateTask(processRootScheduleInMicrotask));
    }
    function flushSyncWorkAcrossRoots_impl(syncTransitionLanes, onlyLegacy) {
      if (!isFlushingWork && mightHavePendingSyncWork) {
        isFlushingWork = !0;
        do {
          var didPerformSomeWork = !1;
          for (var root = firstScheduledRoot; null !== root; ) {
            if (!onlyLegacy)
              if (0 !== syncTransitionLanes) {
                var pendingLanes = root.pendingLanes;
                if (0 === pendingLanes) var nextLanes = 0;
                else {
                  var suspendedLanes = root.suspendedLanes,
                    pingedLanes = root.pingedLanes;
                  nextLanes =
                    (1 << (31 - clz32(42 | syncTransitionLanes) + 1)) - 1;
                  nextLanes &= pendingLanes & ~(suspendedLanes & ~pingedLanes);
                  nextLanes =
                    nextLanes & 201326677
                      ? (nextLanes & 201326677) | 1
                      : nextLanes
                        ? nextLanes | 2
                        : 0;
                }
                0 !== nextLanes &&
                  ((didPerformSomeWork = !0),
                  performSyncWorkOnRoot(root, nextLanes));
              } else
                (nextLanes = workInProgressRootRenderLanes),
                  (nextLanes = getNextLanes(
                    root,
                    root === workInProgressRoot ? nextLanes : 0
                  )),
                  0 === (nextLanes & 3) ||
                    checkIfRootIsPrerendering(root, nextLanes) ||
                    ((didPerformSomeWork = !0),
                    performSyncWorkOnRoot(root, nextLanes));
            root = root.next;
          }
        } while (didPerformSomeWork);
        isFlushingWork = !1;
      }
    }
    function processRootScheduleInMicrotask() {
      mightHavePendingSyncWork =
        didScheduleMicrotask_act =
        didScheduleMicrotask =
          !1;
      var syncTransitionLanes = 0;
      0 !== currentEventTransitionLane &&
        (shouldAttemptEagerTransition() &&
          (syncTransitionLanes = currentEventTransitionLane),
        (currentEventTransitionLane = 0));
      for (
        var currentTime = now$1(), prev = null, root = firstScheduledRoot;
        null !== root;

      ) {
        var next = root.next,
          nextLanes = scheduleTaskForRootDuringMicrotask(root, currentTime);
        if (0 === nextLanes)
          (root.next = null),
            null === prev ? (firstScheduledRoot = next) : (prev.next = next),
            null === next && (lastScheduledRoot = prev);
        else if (
          ((prev = root), 0 !== syncTransitionLanes || 0 !== (nextLanes & 3))
        )
          mightHavePendingSyncWork = !0;
        root = next;
      }
      flushSyncWorkAcrossRoots_impl(syncTransitionLanes, !1);
    }
    function scheduleTaskForRootDuringMicrotask(root, currentTime) {
      for (
        var suspendedLanes = root.suspendedLanes,
          pingedLanes = root.pingedLanes,
          expirationTimes = root.expirationTimes,
          lanes = root.pendingLanes & -62914561;
        0 < lanes;

      ) {
        var index = 31 - clz32(lanes),
          lane = 1 << index,
          expirationTime = expirationTimes[index];
        if (-1 === expirationTime) {
          if (0 === (lane & suspendedLanes) || 0 !== (lane & pingedLanes))
            expirationTimes[index] = computeExpirationTime(lane, currentTime);
        } else expirationTime <= currentTime && (root.expiredLanes |= lane);
        lanes &= ~lane;
      }
      currentTime = workInProgressRoot;
      suspendedLanes = workInProgressRootRenderLanes;
      suspendedLanes = getNextLanes(
        root,
        root === currentTime ? suspendedLanes : 0
      );
      pingedLanes = root.callbackNode;
      if (
        0 === suspendedLanes ||
        (root === currentTime &&
          (workInProgressSuspendedReason === SuspendedOnData ||
            workInProgressSuspendedReason === SuspendedOnAction)) ||
        null !== root.cancelPendingCommit
      )
        return (
          null !== pingedLanes && cancelCallback(pingedLanes),
          (root.callbackNode = null),
          (root.callbackPriority = 0)
        );
      if (
        0 === (suspendedLanes & 3) ||
        checkIfRootIsPrerendering(root, suspendedLanes)
      ) {
        currentTime = suspendedLanes & -suspendedLanes;
        if (
          currentTime !== root.callbackPriority ||
          (null !== ReactSharedInternals.actQueue &&
            pingedLanes !== fakeActCallbackNode)
        )
          cancelCallback(pingedLanes);
        else return currentTime;
        switch (lanesToEventPriority(suspendedLanes)) {
          case DiscreteEventPriority:
          case ContinuousEventPriority:
            suspendedLanes = UserBlockingPriority;
            break;
          case DefaultEventPriority:
            suspendedLanes = NormalPriority$1;
            break;
          case IdleEventPriority:
            suspendedLanes = IdlePriority;
            break;
          default:
            suspendedLanes = NormalPriority$1;
        }
        pingedLanes = performWorkOnRootViaSchedulerTask.bind(null, root);
        null !== ReactSharedInternals.actQueue
          ? (ReactSharedInternals.actQueue.push(pingedLanes),
            (suspendedLanes = fakeActCallbackNode))
          : (suspendedLanes = scheduleCallback$3(suspendedLanes, pingedLanes));
        root.callbackPriority = currentTime;
        root.callbackNode = suspendedLanes;
        return currentTime;
      }
      null !== pingedLanes && cancelCallback(pingedLanes);
      root.callbackPriority = 2;
      root.callbackNode = null;
      return 2;
    }
    function performWorkOnRootViaSchedulerTask(root, didTimeout) {
      nestedUpdateScheduled = currentUpdateIsNested = !1;
      var originalCallbackNode = root.callbackNode;
      if (flushPassiveEffects() && root.callbackNode !== originalCallbackNode)
        return null;
      var workInProgressRootRenderLanes$jscomp$0 =
        workInProgressRootRenderLanes;
      workInProgressRootRenderLanes$jscomp$0 = getNextLanes(
        root,
        root === workInProgressRoot ? workInProgressRootRenderLanes$jscomp$0 : 0
      );
      if (0 === workInProgressRootRenderLanes$jscomp$0) return null;
      performWorkOnRoot(
        root,
        workInProgressRootRenderLanes$jscomp$0,
        didTimeout
      );
      scheduleTaskForRootDuringMicrotask(root, now$1());
      return null != root.callbackNode &&
        root.callbackNode === originalCallbackNode
        ? performWorkOnRootViaSchedulerTask.bind(null, root)
        : null;
    }
    function performSyncWorkOnRoot(root, lanes) {
      if (flushPassiveEffects()) return null;
      currentUpdateIsNested = nestedUpdateScheduled;
      nestedUpdateScheduled = !1;
      performWorkOnRoot(root, lanes, !0);
    }
    function cancelCallback(callbackNode) {
      callbackNode !== fakeActCallbackNode &&
        null !== callbackNode &&
        cancelCallback$1(callbackNode);
    }
    function scheduleImmediateTask(cb) {
      null !== ReactSharedInternals.actQueue &&
        ReactSharedInternals.actQueue.push(function () {
          cb();
          return null;
        });
      scheduleMicrotask(function () {
        (executionContext & (RenderContext | CommitContext)) !== NoContext
          ? scheduleCallback$3(ImmediatePriority, cb)
          : cb();
      });
    }
    function requestTransitionLane() {
      0 === currentEventTransitionLane &&
        (currentEventTransitionLane = claimNextTransitionLane());
      return currentEventTransitionLane;
    }
    function coerceFormActionProp(actionProp) {
      if (
        null == actionProp ||
        "symbol" === typeof actionProp ||
        "boolean" === typeof actionProp
      )
        return null;
      if ("function" === typeof actionProp) return actionProp;
      checkAttributeStringCoercion(actionProp, "action");
      return sanitizeURL("" + actionProp);
    }
    function createFormDataWithSubmitter(form, submitter) {
      var temp = submitter.ownerDocument.createElement("input");
      temp.name = submitter.name;
      temp.value = submitter.value;
      form.id && temp.setAttribute("form", form.id);
      submitter.parentNode.insertBefore(temp, submitter);
      form = new FormData(form);
      temp.parentNode.removeChild(temp);
      return form;
    }
    function extractEvents$1(
      dispatchQueue,
      domEventName,
      maybeTargetInst,
      nativeEvent,
      nativeEventTarget
    ) {
      if (
        "submit" === domEventName &&
        maybeTargetInst &&
        maybeTargetInst.stateNode === nativeEventTarget
      ) {
        var action = coerceFormActionProp(
            (nativeEventTarget[internalPropsKey] || null).action
          ),
          submitter = nativeEvent.submitter;
        submitter &&
          ((domEventName = (domEventName = submitter[internalPropsKey] || null)
            ? coerceFormActionProp(domEventName.formAction)
            : submitter.getAttribute("formAction")),
          null !== domEventName &&
            ((action = domEventName), (submitter = null)));
        var event = new SyntheticEvent(
          "action",
          "action",
          null,
          nativeEvent,
          nativeEventTarget
        );
        dispatchQueue.push({
          event: event,
          listeners: [
            {
              instance: null,
              listener: function () {
                if (nativeEvent.defaultPrevented) {
                  if (0 !== currentEventTransitionLane) {
                    var formData = submitter
                        ? createFormDataWithSubmitter(
                            nativeEventTarget,
                            submitter
                          )
                        : new FormData(nativeEventTarget),
                      pendingState = {
                        pending: !0,
                        data: formData,
                        method: nativeEventTarget.method,
                        action: action
                      };
                    Object.freeze(pendingState);
                    startHostTransition(
                      maybeTargetInst,
                      pendingState,
                      null,
                      formData
                    );
                  }
                } else
                  "function" === typeof action &&
                    (event.preventDefault(),
                    (formData = submitter
                      ? createFormDataWithSubmitter(
                          nativeEventTarget,
                          submitter
                        )
                      : new FormData(nativeEventTarget)),
                    (pendingState = {
                      pending: !0,
                      data: formData,
                      method: nativeEventTarget.method,
                      action: action
                    }),
                    Object.freeze(pendingState),
                    startHostTransition(
                      maybeTargetInst,
                      pendingState,
                      action,
                      formData
                    ));
              },
              currentTarget: nativeEventTarget
            }
          ]
        });
      }
    }
    function processDispatchQueue(dispatchQueue, eventSystemFlags) {
      eventSystemFlags = 0 !== (eventSystemFlags & 4);
      for (var i = 0; i < dispatchQueue.length; i++) {
        var _dispatchQueue$i = dispatchQueue[i];
        a: {
          var previousInstance = void 0,
            event = _dispatchQueue$i.event;
          _dispatchQueue$i = _dispatchQueue$i.listeners;
          if (eventSystemFlags)
            for (
              var i$jscomp$0 = _dispatchQueue$i.length - 1;
              0 <= i$jscomp$0;
              i$jscomp$0--
            ) {
              var _dispatchListeners$i = _dispatchQueue$i[i$jscomp$0],
                instance = _dispatchListeners$i.instance,
                currentTarget = _dispatchListeners$i.currentTarget;
              _dispatchListeners$i = _dispatchListeners$i.listener;
              if (instance !== previousInstance && event.isPropagationStopped())
                break a;
              previousInstance = event;
              previousInstance.currentTarget = currentTarget;
              try {
                _dispatchListeners$i(previousInstance);
              } catch (error) {
                reportGlobalError(error);
              }
              previousInstance.currentTarget = null;
              previousInstance = instance;
            }
          else
            for (
              i$jscomp$0 = 0;
              i$jscomp$0 < _dispatchQueue$i.length;
              i$jscomp$0++
            ) {
              _dispatchListeners$i = _dispatchQueue$i[i$jscomp$0];
              instance = _dispatchListeners$i.instance;
              currentTarget = _dispatchListeners$i.currentTarget;
              _dispatchListeners$i = _dispatchListeners$i.listener;
              if (instance !== previousInstance && event.isPropagationStopped())
                break a;
              previousInstance = event;
              previousInstance.currentTarget = currentTarget;
              try {
                _dispatchListeners$i(previousInstance);
              } catch (error) {
                reportGlobalError(error);
              }
              previousInstance.currentTarget = null;
              previousInstance = instance;
            }
        }
      }
    }
    function listenToNonDelegatedEvent(domEventName, targetElement) {
      nonDelegatedEvents.has(domEventName) ||
        console.error(
          'Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.',
          domEventName
        );
      var listenerSet = targetElement[internalEventHandlersKey];
      void 0 === listenerSet &&
        (listenerSet = targetElement[internalEventHandlersKey] = new Set());
      var listenerSetKey = domEventName + "__bubble";
      listenerSet.has(listenerSetKey) ||
        (addTrappedEventListener(targetElement, domEventName, 2, !1),
        listenerSet.add(listenerSetKey));
    }
    function listenToNativeEvent(domEventName, isCapturePhaseListener, target) {
      nonDelegatedEvents.has(domEventName) &&
        !isCapturePhaseListener &&
        console.error(
          'Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.',
          domEventName
        );
      var eventSystemFlags = 0;
      isCapturePhaseListener && (eventSystemFlags |= 4);
      addTrappedEventListener(
        target,
        domEventName,
        eventSystemFlags,
        isCapturePhaseListener
      );
    }
    function listenToAllSupportedEvents(rootContainerElement) {
      if (!rootContainerElement[listeningMarker]) {
        rootContainerElement[listeningMarker] = !0;
        allNativeEvents.forEach(function (domEventName) {
          "selectionchange" !== domEventName &&
            (nonDelegatedEvents.has(domEventName) ||
              listenToNativeEvent(domEventName, !1, rootContainerElement),
            listenToNativeEvent(domEventName, !0, rootContainerElement));
        });
        var ownerDocument =
          9 === rootContainerElement.nodeType
            ? rootContainerElement
            : rootContainerElement.ownerDocument;
        null === ownerDocument ||
          ownerDocument[listeningMarker] ||
          ((ownerDocument[listeningMarker] = !0),
          listenToNativeEvent("selectionchange", !1, ownerDocument));
      }
    }
    function addTrappedEventListener(
      targetContainer,
      domEventName,
      eventSystemFlags,
      isCapturePhaseListener
    ) {
      switch (getEventPriority(domEventName)) {
        case DiscreteEventPriority:
          var listenerWrapper = dispatchDiscreteEvent;
          break;
        case ContinuousEventPriority:
          listenerWrapper = dispatchContinuousEvent;
          break;
        default:
          listenerWrapper = dispatchEvent;
      }
      eventSystemFlags = listenerWrapper.bind(
        null,
        domEventName,
        eventSystemFlags,
        targetContainer
      );
      listenerWrapper = void 0;
      !passiveBrowserEventsSupported ||
        ("touchstart" !== domEventName &&
          "touchmove" !== domEventName &&
          "wheel" !== domEventName) ||
        (listenerWrapper = !0);
      isCapturePhaseListener
        ? void 0 !== listenerWrapper
          ? targetContainer.addEventListener(domEventName, eventSystemFlags, {
              capture: !0,
              passive: listenerWrapper
            })
          : targetContainer.addEventListener(domEventName, eventSystemFlags, !0)
        : void 0 !== listenerWrapper
          ? targetContainer.addEventListener(domEventName, eventSystemFlags, {
              passive: listenerWrapper
            })
          : targetContainer.addEventListener(
              domEventName,
              eventSystemFlags,
              !1
            );
    }
    function dispatchEventForPluginEventSystem(
      domEventName,
      eventSystemFlags,
      nativeEvent,
      targetInst$jscomp$0,
      targetContainer
    ) {
      var ancestorInst = targetInst$jscomp$0;
      if (
        0 === (eventSystemFlags & 1) &&
        0 === (eventSystemFlags & 2) &&
        null !== targetInst$jscomp$0
      )
        a: for (;;) {
          if (null === targetInst$jscomp$0) return;
          var nodeTag = targetInst$jscomp$0.tag;
          if (3 === nodeTag || 4 === nodeTag) {
            var container = targetInst$jscomp$0.stateNode.containerInfo;
            if (
              container === targetContainer ||
              (8 === container.nodeType &&
                container.parentNode === targetContainer)
            )
              break;
            if (4 === nodeTag)
              for (nodeTag = targetInst$jscomp$0.return; null !== nodeTag; ) {
                var grandTag = nodeTag.tag;
                if (3 === grandTag || 4 === grandTag)
                  if (
                    ((grandTag = nodeTag.stateNode.containerInfo),
                    grandTag === targetContainer ||
                      (8 === grandTag.nodeType &&
                        grandTag.parentNode === targetContainer))
                  )
                    return;
                nodeTag = nodeTag.return;
              }
            for (; null !== container; ) {
              nodeTag = getClosestInstanceFromNode(container);
              if (null === nodeTag) return;
              grandTag = nodeTag.tag;
              if (
                5 === grandTag ||
                6 === grandTag ||
                26 === grandTag ||
                27 === grandTag
              ) {
                targetInst$jscomp$0 = ancestorInst = nodeTag;
                continue a;
              }
              container = container.parentNode;
            }
          }
          targetInst$jscomp$0 = targetInst$jscomp$0.return;
        }
      batchedUpdates$2(function () {
        var targetInst = ancestorInst,
          nativeEventTarget = getEventTarget(nativeEvent),
          dispatchQueue = [];
        a: {
          var reactName = topLevelEventsToReactNames.get(domEventName);
          if (void 0 !== reactName) {
            var SyntheticEventCtor = SyntheticEvent,
              reactEventType = domEventName;
            switch (domEventName) {
              case "keypress":
                if (0 === getEventCharCode(nativeEvent)) break a;
              case "keydown":
              case "keyup":
                SyntheticEventCtor = SyntheticKeyboardEvent;
                break;
              case "focusin":
                reactEventType = "focus";
                SyntheticEventCtor = SyntheticFocusEvent;
                break;
              case "focusout":
                reactEventType = "blur";
                SyntheticEventCtor = SyntheticFocusEvent;
                break;
              case "beforeblur":
              case "afterblur":
                SyntheticEventCtor = SyntheticFocusEvent;
                break;
              case "click":
                if (2 === nativeEvent.button) break a;
              case "auxclick":
              case "dblclick":
              case "mousedown":
              case "mousemove":
              case "mouseup":
              case "mouseout":
              case "mouseover":
              case "contextmenu":
                SyntheticEventCtor = SyntheticMouseEvent;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                SyntheticEventCtor = SyntheticDragEvent;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                SyntheticEventCtor = SyntheticTouchEvent;
                break;
              case ANIMATION_END:
              case ANIMATION_ITERATION:
              case ANIMATION_START:
                SyntheticEventCtor = SyntheticAnimationEvent;
                break;
              case TRANSITION_END:
                SyntheticEventCtor = SyntheticTransitionEvent;
                break;
              case "scroll":
              case "scrollend":
                SyntheticEventCtor = SyntheticUIEvent;
                break;
              case "wheel":
                SyntheticEventCtor = SyntheticWheelEvent;
                break;
              case "copy":
              case "cut":
              case "paste":
                SyntheticEventCtor = SyntheticClipboardEvent;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                SyntheticEventCtor = SyntheticPointerEvent;
                break;
              case "toggle":
              case "beforetoggle":
                SyntheticEventCtor = SyntheticToggleEvent;
            }
            var inCapturePhase = 0 !== (eventSystemFlags & 4),
              accumulateTargetOnly =
                !inCapturePhase &&
                ("scroll" === domEventName || "scrollend" === domEventName),
              reactEventName = inCapturePhase
                ? null !== reactName
                  ? reactName + "Capture"
                  : null
                : reactName;
            inCapturePhase = [];
            for (
              var instance = targetInst, lastHostComponent;
              null !== instance;

            ) {
              var _instance2 = instance;
              lastHostComponent = _instance2.stateNode;
              _instance2 = _instance2.tag;
              (5 !== _instance2 && 26 !== _instance2 && 27 !== _instance2) ||
                null === lastHostComponent ||
                null === reactEventName ||
                ((_instance2 = getListener(instance, reactEventName)),
                null != _instance2 &&
                  inCapturePhase.push(
                    createDispatchListener(
                      instance,
                      _instance2,
                      lastHostComponent
                    )
                  ));
              if (accumulateTargetOnly) break;
              instance = instance.return;
            }
            0 < inCapturePhase.length &&
              ((reactName = new SyntheticEventCtor(
                reactName,
                reactEventType,
                null,
                nativeEvent,
                nativeEventTarget
              )),
              dispatchQueue.push({
                event: reactName,
                listeners: inCapturePhase
              }));
          }
        }
        if (0 === (eventSystemFlags & 7)) {
          a: {
            reactName =
              "mouseover" === domEventName || "pointerover" === domEventName;
            SyntheticEventCtor =
              "mouseout" === domEventName || "pointerout" === domEventName;
            if (
              reactName &&
              nativeEvent !== currentReplayingEvent &&
              (reactEventType =
                nativeEvent.relatedTarget || nativeEvent.fromElement) &&
              (getClosestInstanceFromNode(reactEventType) ||
                reactEventType[internalContainerInstanceKey])
            )
              break a;
            if (SyntheticEventCtor || reactName) {
              reactName =
                nativeEventTarget.window === nativeEventTarget
                  ? nativeEventTarget
                  : (reactName = nativeEventTarget.ownerDocument)
                    ? reactName.defaultView || reactName.parentWindow
                    : window;
              if (SyntheticEventCtor) {
                if (
                  ((reactEventType =
                    nativeEvent.relatedTarget || nativeEvent.toElement),
                  (SyntheticEventCtor = targetInst),
                  (reactEventType = reactEventType
                    ? getClosestInstanceFromNode(reactEventType)
                    : null),
                  null !== reactEventType &&
                    ((accumulateTargetOnly =
                      getNearestMountedFiber(reactEventType)),
                    (inCapturePhase = reactEventType.tag),
                    reactEventType !== accumulateTargetOnly ||
                      (5 !== inCapturePhase &&
                        27 !== inCapturePhase &&
                        6 !== inCapturePhase)))
                )
                  reactEventType = null;
              } else (SyntheticEventCtor = null), (reactEventType = targetInst);
              if (SyntheticEventCtor !== reactEventType) {
                inCapturePhase = SyntheticMouseEvent;
                _instance2 = "onMouseLeave";
                reactEventName = "onMouseEnter";
                instance = "mouse";
                if (
                  "pointerout" === domEventName ||
                  "pointerover" === domEventName
                )
                  (inCapturePhase = SyntheticPointerEvent),
                    (_instance2 = "onPointerLeave"),
                    (reactEventName = "onPointerEnter"),
                    (instance = "pointer");
                accumulateTargetOnly =
                  null == SyntheticEventCtor
                    ? reactName
                    : getNodeFromInstance(SyntheticEventCtor);
                lastHostComponent =
                  null == reactEventType
                    ? reactName
                    : getNodeFromInstance(reactEventType);
                reactName = new inCapturePhase(
                  _instance2,
                  instance + "leave",
                  SyntheticEventCtor,
                  nativeEvent,
                  nativeEventTarget
                );
                reactName.target = accumulateTargetOnly;
                reactName.relatedTarget = lastHostComponent;
                _instance2 = null;
                getClosestInstanceFromNode(nativeEventTarget) === targetInst &&
                  ((inCapturePhase = new inCapturePhase(
                    reactEventName,
                    instance + "enter",
                    reactEventType,
                    nativeEvent,
                    nativeEventTarget
                  )),
                  (inCapturePhase.target = lastHostComponent),
                  (inCapturePhase.relatedTarget = accumulateTargetOnly),
                  (_instance2 = inCapturePhase));
                accumulateTargetOnly = _instance2;
                if (SyntheticEventCtor && reactEventType)
                  b: {
                    inCapturePhase = SyntheticEventCtor;
                    reactEventName = reactEventType;
                    instance = 0;
                    for (
                      lastHostComponent = inCapturePhase;
                      lastHostComponent;
                      lastHostComponent = getParent(lastHostComponent)
                    )
                      instance++;
                    lastHostComponent = 0;
                    for (
                      _instance2 = reactEventName;
                      _instance2;
                      _instance2 = getParent(_instance2)
                    )
                      lastHostComponent++;
                    for (; 0 < instance - lastHostComponent; )
                      (inCapturePhase = getParent(inCapturePhase)), instance--;
                    for (; 0 < lastHostComponent - instance; )
                      (reactEventName = getParent(reactEventName)),
                        lastHostComponent--;
                    for (; instance--; ) {
                      if (
                        inCapturePhase === reactEventName ||
                        (null !== reactEventName &&
                          inCapturePhase === reactEventName.alternate)
                      )
                        break b;
                      inCapturePhase = getParent(inCapturePhase);
                      reactEventName = getParent(reactEventName);
                    }
                    inCapturePhase = null;
                  }
                else inCapturePhase = null;
                null !== SyntheticEventCtor &&
                  accumulateEnterLeaveListenersForEvent(
                    dispatchQueue,
                    reactName,
                    SyntheticEventCtor,
                    inCapturePhase,
                    !1
                  );
                null !== reactEventType &&
                  null !== accumulateTargetOnly &&
                  accumulateEnterLeaveListenersForEvent(
                    dispatchQueue,
                    accumulateTargetOnly,
                    reactEventType,
                    inCapturePhase,
                    !0
                  );
              }
            }
          }
          a: {
            reactName = targetInst ? getNodeFromInstance(targetInst) : window;
            SyntheticEventCtor =
              reactName.nodeName && reactName.nodeName.toLowerCase();
            if (
              "select" === SyntheticEventCtor ||
              ("input" === SyntheticEventCtor && "file" === reactName.type)
            )
              var getTargetInstFunc = getTargetInstForChangeEvent;
            else if (isTextInputElement(reactName))
              if (isInputEventSupported)
                getTargetInstFunc = getTargetInstForInputOrChangeEvent;
              else {
                getTargetInstFunc = getTargetInstForInputEventPolyfill;
                var handleEventFunc = handleEventsForInputEventPolyfill;
              }
            else
              (SyntheticEventCtor = reactName.nodeName),
                !SyntheticEventCtor ||
                "input" !== SyntheticEventCtor.toLowerCase() ||
                ("checkbox" !== reactName.type && "radio" !== reactName.type)
                  ? targetInst &&
                    isCustomElement(targetInst.elementType) &&
                    (getTargetInstFunc = getTargetInstForChangeEvent)
                  : (getTargetInstFunc = getTargetInstForClickEvent);
            if (
              getTargetInstFunc &&
              (getTargetInstFunc = getTargetInstFunc(domEventName, targetInst))
            ) {
              createAndAccumulateChangeEvent(
                dispatchQueue,
                getTargetInstFunc,
                nativeEvent,
                nativeEventTarget
              );
              break a;
            }
            handleEventFunc &&
              handleEventFunc(domEventName, reactName, targetInst);
            "focusout" === domEventName &&
              targetInst &&
              "number" === reactName.type &&
              null != targetInst.memoizedProps.value &&
              setDefaultValue(reactName, "number", reactName.value);
          }
          handleEventFunc = targetInst
            ? getNodeFromInstance(targetInst)
            : window;
          switch (domEventName) {
            case "focusin":
              if (
                isTextInputElement(handleEventFunc) ||
                "true" === handleEventFunc.contentEditable
              )
                (activeElement = handleEventFunc),
                  (activeElementInst = targetInst),
                  (lastSelection = null);
              break;
            case "focusout":
              lastSelection = activeElementInst = activeElement = null;
              break;
            case "mousedown":
              mouseDown = !0;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              mouseDown = !1;
              constructSelectEvent(
                dispatchQueue,
                nativeEvent,
                nativeEventTarget
              );
              break;
            case "selectionchange":
              if (skipSelectionChangeEvent) break;
            case "keydown":
            case "keyup":
              constructSelectEvent(
                dispatchQueue,
                nativeEvent,
                nativeEventTarget
              );
          }
          var fallbackData;
          if (canUseCompositionEvent)
            b: {
              switch (domEventName) {
                case "compositionstart":
                  var eventType = "onCompositionStart";
                  break b;
                case "compositionend":
                  eventType = "onCompositionEnd";
                  break b;
                case "compositionupdate":
                  eventType = "onCompositionUpdate";
                  break b;
              }
              eventType = void 0;
            }
          else
            isComposing
              ? isFallbackCompositionEnd(domEventName, nativeEvent) &&
                (eventType = "onCompositionEnd")
              : "keydown" === domEventName &&
                nativeEvent.keyCode === START_KEYCODE &&
                (eventType = "onCompositionStart");
          eventType &&
            (useFallbackCompositionData &&
              "ko" !== nativeEvent.locale &&
              (isComposing || "onCompositionStart" !== eventType
                ? "onCompositionEnd" === eventType &&
                  isComposing &&
                  (fallbackData = getData())
                : ((root = nativeEventTarget),
                  (startText = "value" in root ? root.value : root.textContent),
                  (isComposing = !0))),
            (handleEventFunc = accumulateTwoPhaseListeners(
              targetInst,
              eventType
            )),
            0 < handleEventFunc.length &&
              ((eventType = new SyntheticCompositionEvent(
                eventType,
                domEventName,
                null,
                nativeEvent,
                nativeEventTarget
              )),
              dispatchQueue.push({
                event: eventType,
                listeners: handleEventFunc
              }),
              fallbackData
                ? (eventType.data = fallbackData)
                : ((fallbackData = getDataFromCustomEvent(nativeEvent)),
                  null !== fallbackData && (eventType.data = fallbackData))));
          if (
            (fallbackData = canUseTextInputEvent
              ? getNativeBeforeInputChars(domEventName, nativeEvent)
              : getFallbackBeforeInputChars(domEventName, nativeEvent))
          )
            (eventType = accumulateTwoPhaseListeners(
              targetInst,
              "onBeforeInput"
            )),
              0 < eventType.length &&
                ((handleEventFunc = new SyntheticInputEvent(
                  "onBeforeInput",
                  "beforeinput",
                  null,
                  nativeEvent,
                  nativeEventTarget
                )),
                dispatchQueue.push({
                  event: handleEventFunc,
                  listeners: eventType
                }),
                (handleEventFunc.data = fallbackData));
          extractEvents$1(
            dispatchQueue,
            domEventName,
            targetInst,
            nativeEvent,
            nativeEventTarget
          );
        }
        processDispatchQueue(dispatchQueue, eventSystemFlags);
      });
    }
    function createDispatchListener(instance, listener, currentTarget) {
      return {
        instance: instance,
        listener: listener,
        currentTarget: currentTarget
      };
    }
    function accumulateTwoPhaseListeners(targetFiber, reactName) {
      for (
        var captureName = reactName + "Capture", listeners = [];
        null !== targetFiber;

      ) {
        var _instance3 = targetFiber,
          stateNode = _instance3.stateNode;
        _instance3 = _instance3.tag;
        (5 !== _instance3 && 26 !== _instance3 && 27 !== _instance3) ||
          null === stateNode ||
          ((_instance3 = getListener(targetFiber, captureName)),
          null != _instance3 &&
            listeners.unshift(
              createDispatchListener(targetFiber, _instance3, stateNode)
            ),
          (_instance3 = getListener(targetFiber, reactName)),
          null != _instance3 &&
            listeners.push(
              createDispatchListener(targetFiber, _instance3, stateNode)
            ));
        targetFiber = targetFiber.return;
      }
      return listeners;
    }
    function getParent(inst) {
      if (null === inst) return null;
      do inst = inst.return;
      while (inst && 5 !== inst.tag && 27 !== inst.tag);
      return inst ? inst : null;
    }
    function accumulateEnterLeaveListenersForEvent(
      dispatchQueue,
      event,
      target,
      common,
      inCapturePhase
    ) {
      for (
        var registrationName = event._reactName, listeners = [];
        null !== target && target !== common;

      ) {
        var _instance4 = target,
          alternate = _instance4.alternate,
          stateNode = _instance4.stateNode;
        _instance4 = _instance4.tag;
        if (null !== alternate && alternate === common) break;
        (5 !== _instance4 && 26 !== _instance4 && 27 !== _instance4) ||
          null === stateNode ||
          ((alternate = stateNode),
          inCapturePhase
            ? ((stateNode = getListener(target, registrationName)),
              null != stateNode &&
                listeners.unshift(
                  createDispatchListener(target, stateNode, alternate)
                ))
            : inCapturePhase ||
              ((stateNode = getListener(target, registrationName)),
              null != stateNode &&
                listeners.push(
                  createDispatchListener(target, stateNode, alternate)
                )));
        target = target.return;
      }
      0 !== listeners.length &&
        dispatchQueue.push({ event: event, listeners: listeners });
    }
    function validatePropertiesInDevelopment(type, props) {
      validateProperties$2(type, props);
      ("input" !== type && "textarea" !== type && "select" !== type) ||
        null == props ||
        null !== props.value ||
        didWarnValueNull ||
        ((didWarnValueNull = !0),
        "select" === type && props.multiple
          ? console.error(
              "`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.",
              type
            )
          : console.error(
              "`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.",
              type
            ));
      var eventRegistry = {
        registrationNameDependencies: registrationNameDependencies,
        possibleRegistrationNames: possibleRegistrationNames
      };
      isCustomElement(type) ||
        "string" === typeof props.is ||
        warnUnknownProperties(type, props, eventRegistry);
      props.contentEditable &&
        !props.suppressContentEditableWarning &&
        null != props.children &&
        console.error(
          "A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."
        );
    }
    function warnForPropDifference(
      propName,
      serverValue,
      clientValue,
      serverDifferences
    ) {
      serverValue !== clientValue &&
        ((clientValue = normalizeMarkupForTextOrAttribute(clientValue)),
        normalizeMarkupForTextOrAttribute(serverValue) !== clientValue &&
          (serverDifferences[propName] = serverValue));
    }
    function warnForExtraAttributes(
      domElement,
      attributeNames,
      serverDifferences
    ) {
      attributeNames.forEach(function (attributeName) {
        serverDifferences[getPropNameFromAttributeName(attributeName)] =
          "style" === attributeName
            ? getStylesObjectFromElement(domElement)
            : domElement.getAttribute(attributeName);
      });
    }
    function warnForInvalidEventListener(registrationName, listener) {
      !1 === listener
        ? console.error(
            "Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.",
            registrationName,
            registrationName,
            registrationName
          )
        : console.error(
            "Expected `%s` listener to be a function, instead got a value of `%s` type.",
            registrationName,
            typeof listener
          );
    }
    function normalizeHTML(parent, html) {
      parent =
        parent.namespaceURI === MATH_NAMESPACE ||
        parent.namespaceURI === SVG_NAMESPACE
          ? parent.ownerDocument.createElementNS(
              parent.namespaceURI,
              parent.tagName
            )
          : parent.ownerDocument.createElement(parent.tagName);
      parent.innerHTML = html;
      return parent.innerHTML;
    }
    function normalizeMarkupForTextOrAttribute(markup) {
      willCoercionThrow(markup) &&
        (console.error(
          "The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before using it here.",
          typeName(markup)
        ),
        testStringCoercion(markup));
      return ("string" === typeof markup ? markup : "" + markup)
        .replace(NORMALIZE_NEWLINES_REGEX, "\n")
        .replace(NORMALIZE_NULL_AND_REPLACEMENT_REGEX, "");
    }
    function checkForUnmatchedText(serverText, clientText) {
      clientText = normalizeMarkupForTextOrAttribute(clientText);
      return normalizeMarkupForTextOrAttribute(serverText) === clientText
        ? !0
        : !1;
    }
    function noop$2() {}
    function setProp(domElement, tag, key, value, props, prevValue) {
      switch (key) {
        case "children":
          if ("string" === typeof value)
            validateTextNesting(value, tag),
              "body" === tag ||
                ("textarea" === tag && "" === value) ||
                setTextContent(domElement, value);
          else if ("number" === typeof value || "bigint" === typeof value)
            validateTextNesting("" + value, tag),
              "body" !== tag && setTextContent(domElement, "" + value);
          break;
        case "className":
          setValueForKnownAttribute(domElement, "class", value);
          break;
        case "tabIndex":
          setValueForKnownAttribute(domElement, "tabindex", value);
          break;
        case "dir":
        case "role":
        case "viewBox":
        case "width":
        case "height":
          setValueForKnownAttribute(domElement, key, value);
          break;
        case "style":
          setValueForStyles(domElement, value, prevValue);
          break;
        case "data":
          if ("object" !== tag) {
            setValueForKnownAttribute(domElement, "data", value);
            break;
          }
        case "src":
        case "href":
          if ("" === value && ("a" !== tag || "href" !== key)) {
            "src" === key
              ? console.error(
                  'An empty string ("") was passed to the %s attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to %s instead of an empty string.',
                  key,
                  key
                )
              : console.error(
                  'An empty string ("") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.',
                  key,
                  key
                );
            domElement.removeAttribute(key);
            break;
          }
          if (
            null == value ||
            "function" === typeof value ||
            "symbol" === typeof value ||
            "boolean" === typeof value
          ) {
            domElement.removeAttribute(key);
            break;
          }
          checkAttributeStringCoercion(value, key);
          value = sanitizeURL("" + value);
          domElement.setAttribute(key, value);
          break;
        case "action":
        case "formAction":
          null != value &&
            ("form" === tag
              ? "formAction" === key
                ? console.error(
                    "You can only pass the formAction prop to <input> or <button>. Use the action prop on <form>."
                  )
                : "function" === typeof value &&
                  ((null == props.encType && null == props.method) ||
                    didWarnFormActionMethod ||
                    ((didWarnFormActionMethod = !0),
                    console.error(
                      "Cannot specify a encType or method for a form that specifies a function as the action. React provides those automatically. They will get overridden."
                    )),
                  null == props.target ||
                    didWarnFormActionTarget ||
                    ((didWarnFormActionTarget = !0),
                    console.error(
                      "Cannot specify a target for a form that specifies a function as the action. The function will always be executed in the same window."
                    )))
              : "input" === tag || "button" === tag
                ? "action" === key
                  ? console.error(
                      "You can only pass the action prop to <form>. Use the formAction prop on <input> or <button>."
                    )
                  : "input" !== tag ||
                      "submit" === props.type ||
                      "image" === props.type ||
                      didWarnFormActionType
                    ? "button" !== tag ||
                      null == props.type ||
                      "submit" === props.type ||
                      didWarnFormActionType
                      ? "function" === typeof value &&
                        (null == props.name ||
                          didWarnFormActionName ||
                          ((didWarnFormActionName = !0),
                          console.error(
                            'Cannot specify a "name" prop for a button that specifies a function as a formAction. React needs it to encode which action should be invoked. It will get overridden.'
                          )),
                        (null == props.formEncType &&
                          null == props.formMethod) ||
                          didWarnFormActionMethod ||
                          ((didWarnFormActionMethod = !0),
                          console.error(
                            "Cannot specify a formEncType or formMethod for a button that specifies a function as a formAction. React provides those automatically. They will get overridden."
                          )),
                        null == props.formTarget ||
                          didWarnFormActionTarget ||
                          ((didWarnFormActionTarget = !0),
                          console.error(
                            "Cannot specify a formTarget for a button that specifies a function as a formAction. The function will always be executed in the same window."
                          )))
                      : ((didWarnFormActionType = !0),
                        console.error(
                          'A button can only specify a formAction along with type="submit" or no type.'
                        ))
                    : ((didWarnFormActionType = !0),
                      console.error(
                        'An input can only specify a formAction along with type="submit" or type="image".'
                      ))
                : "action" === key
                  ? console.error(
                      "You can only pass the action prop to <form>."
                    )
                  : console.error(
                      "You can only pass the formAction prop to <input> or <button>."
                    ));
          if ("function" === typeof value) {
            domElement.setAttribute(
              key,
              "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
            );
            break;
          } else
            "function" === typeof prevValue &&
              ("formAction" === key
                ? ("input" !== tag &&
                    setProp(domElement, tag, "name", props.name, props, null),
                  setProp(
                    domElement,
                    tag,
                    "formEncType",
                    props.formEncType,
                    props,
                    null
                  ),
                  setProp(
                    domElement,
                    tag,
                    "formMethod",
                    props.formMethod,
                    props,
                    null
                  ),
                  setProp(
                    domElement,
                    tag,
                    "formTarget",
                    props.formTarget,
                    props,
                    null
                  ))
                : (setProp(
                    domElement,
                    tag,
                    "encType",
                    props.encType,
                    props,
                    null
                  ),
                  setProp(domElement, tag, "method", props.method, props, null),
                  setProp(
                    domElement,
                    tag,
                    "target",
                    props.target,
                    props,
                    null
                  )));
          if (
            null == value ||
            "symbol" === typeof value ||
            "boolean" === typeof value
          ) {
            domElement.removeAttribute(key);
            break;
          }
          checkAttributeStringCoercion(value, key);
          value = sanitizeURL("" + value);
          domElement.setAttribute(key, value);
          break;
        case "onClick":
          null != value &&
            ("function" !== typeof value &&
              warnForInvalidEventListener(key, value),
            (domElement.onclick = noop$2));
          break;
        case "onScroll":
          null != value &&
            ("function" !== typeof value &&
              warnForInvalidEventListener(key, value),
            listenToNonDelegatedEvent("scroll", domElement));
          break;
        case "onScrollEnd":
          null != value &&
            ("function" !== typeof value &&
              warnForInvalidEventListener(key, value),
            listenToNonDelegatedEvent("scrollend", domElement));
          break;
        case "dangerouslySetInnerHTML":
          if (null != value) {
            if ("object" !== typeof value || !("__html" in value))
              throw Error(
                "`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information."
              );
            key = value.__html;
            if (null != key) {
              if (null != props.children)
                throw Error(
                  "Can only set one of `children` or `props.dangerouslySetInnerHTML`."
                );
              domElement.innerHTML = key;
            }
          }
          break;
        case "multiple":
          domElement.multiple =
            value && "function" !== typeof value && "symbol" !== typeof value;
          break;
        case "muted":
          domElement.muted =
            value && "function" !== typeof value && "symbol" !== typeof value;
          break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "ref":
          break;
        case "autoFocus":
          break;
        case "xlinkHref":
          if (
            null == value ||
            "function" === typeof value ||
            "boolean" === typeof value ||
            "symbol" === typeof value
          ) {
            domElement.removeAttribute("xlink:href");
            break;
          }
          checkAttributeStringCoercion(value, key);
          key = sanitizeURL("" + value);
          domElement.setAttributeNS(xlinkNamespace, "xlink:href", key);
          break;
        case "contentEditable":
        case "spellCheck":
        case "draggable":
        case "value":
        case "autoReverse":
        case "externalResourcesRequired":
        case "focusable":
        case "preserveAlpha":
          null != value &&
          "function" !== typeof value &&
          "symbol" !== typeof value
            ? (checkAttributeStringCoercion(value, key),
              domElement.setAttribute(key, "" + value))
            : domElement.removeAttribute(key);
          break;
        case "inert":
          "" !== value ||
            didWarnForNewBooleanPropsWithEmptyValue[key] ||
            ((didWarnForNewBooleanPropsWithEmptyValue[key] = !0),
            console.error(
              "Received an empty string for a boolean attribute `%s`. This will treat the attribute as if it were false. Either pass `false` to silence this warning, or pass `true` if you used an empty string in earlier versions of React to indicate this attribute is true.",
              key
            ));
        case "allowFullScreen":
        case "async":
        case "autoPlay":
        case "controls":
        case "default":
        case "defer":
        case "disabled":
        case "disablePictureInPicture":
        case "disableRemotePlayback":
        case "formNoValidate":
        case "hidden":
        case "loop":
        case "noModule":
        case "noValidate":
        case "open":
        case "playsInline":
        case "readOnly":
        case "required":
        case "reversed":
        case "scoped":
        case "seamless":
        case "itemScope":
          value && "function" !== typeof value && "symbol" !== typeof value
            ? domElement.setAttribute(key, "")
            : domElement.removeAttribute(key);
          break;
        case "capture":
        case "download":
          !0 === value
            ? domElement.setAttribute(key, "")
            : !1 !== value &&
                null != value &&
                "function" !== typeof value &&
                "symbol" !== typeof value
              ? (checkAttributeStringCoercion(value, key),
                domElement.setAttribute(key, value))
              : domElement.removeAttribute(key);
          break;
        case "cols":
        case "rows":
        case "size":
        case "span":
          null != value &&
          "function" !== typeof value &&
          "symbol" !== typeof value &&
          !isNaN(value) &&
          1 <= value
            ? (checkAttributeStringCoercion(value, key),
              domElement.setAttribute(key, value))
            : domElement.removeAttribute(key);
          break;
        case "rowSpan":
        case "start":
          null == value ||
          "function" === typeof value ||
          "symbol" === typeof value ||
          isNaN(value)
            ? domElement.removeAttribute(key)
            : (checkAttributeStringCoercion(value, key),
              domElement.setAttribute(key, value));
          break;
        case "popover":
          listenToNonDelegatedEvent("beforetoggle", domElement);
          listenToNonDelegatedEvent("toggle", domElement);
          setValueForAttribute(domElement, "popover", value);
          break;
        case "xlinkActuate":
          setValueForNamespacedAttribute(
            domElement,
            xlinkNamespace,
            "xlink:actuate",
            value
          );
          break;
        case "xlinkArcrole":
          setValueForNamespacedAttribute(
            domElement,
            xlinkNamespace,
            "xlink:arcrole",
            value
          );
          break;
        case "xlinkRole":
          setValueForNamespacedAttribute(
            domElement,
            xlinkNamespace,
            "xlink:role",
            value
          );
          break;
        case "xlinkShow":
          setValueForNamespacedAttribute(
            domElement,
            xlinkNamespace,
            "xlink:show",
            value
          );
          break;
        case "xlinkTitle":
          setValueForNamespacedAttribute(
            domElement,
            xlinkNamespace,
            "xlink:title",
            value
          );
          break;
        case "xlinkType":
          setValueForNamespacedAttribute(
            domElement,
            xlinkNamespace,
            "xlink:type",
            value
          );
          break;
        case "xmlBase":
          setValueForNamespacedAttribute(
            domElement,
            xmlNamespace,
            "xml:base",
            value
          );
          break;
        case "xmlLang":
          setValueForNamespacedAttribute(
            domElement,
            xmlNamespace,
            "xml:lang",
            value
          );
          break;
        case "xmlSpace":
          setValueForNamespacedAttribute(
            domElement,
            xmlNamespace,
            "xml:space",
            value
          );
          break;
        case "is":
          null != prevValue &&
            console.error(
              'Cannot update the "is" prop after it has been initialized.'
            );
          setValueForAttribute(domElement, "is", value);
          break;
        case "innerText":
        case "textContent":
          break;
        case "popoverTarget":
          didWarnPopoverTargetObject ||
            null == value ||
            "object" !== typeof value ||
            ((didWarnPopoverTargetObject = !0),
            console.error(
              "The `popoverTarget` prop expects the ID of an Element as a string. Received %s instead.",
              value
            ));
        default:
          !(2 < key.length) ||
          ("o" !== key[0] && "O" !== key[0]) ||
          ("n" !== key[1] && "N" !== key[1])
            ? ((key = getAttributeAlias(key)),
              setValueForAttribute(domElement, key, value))
            : registrationNameDependencies.hasOwnProperty(key) &&
              null != value &&
              "function" !== typeof value &&
              warnForInvalidEventListener(key, value);
      }
    }
    function setPropOnCustomElement(
      domElement,
      tag,
      key,
      value,
      props,
      prevValue
    ) {
      switch (key) {
        case "style":
          setValueForStyles(domElement, value, prevValue);
          break;
        case "dangerouslySetInnerHTML":
          if (null != value) {
            if ("object" !== typeof value || !("__html" in value))
              throw Error(
                "`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information."
              );
            key = value.__html;
            if (null != key) {
              if (null != props.children)
                throw Error(
                  "Can only set one of `children` or `props.dangerouslySetInnerHTML`."
                );
              domElement.innerHTML = key;
            }
          }
          break;
        case "children":
          "string" === typeof value
            ? setTextContent(domElement, value)
            : ("number" === typeof value || "bigint" === typeof value) &&
              setTextContent(domElement, "" + value);
          break;
        case "onScroll":
          null != value &&
            ("function" !== typeof value &&
              warnForInvalidEventListener(key, value),
            listenToNonDelegatedEvent("scroll", domElement));
          break;
        case "onScrollEnd":
          null != value &&
            ("function" !== typeof value &&
              warnForInvalidEventListener(key, value),
            listenToNonDelegatedEvent("scrollend", domElement));
          break;
        case "onClick":
          null != value &&
            ("function" !== typeof value &&
              warnForInvalidEventListener(key, value),
            (domElement.onclick = noop$2));
          break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "innerHTML":
        case "ref":
          break;
        case "innerText":
        case "textContent":
          break;
        default:
          if (registrationNameDependencies.hasOwnProperty(key))
            null != value &&
              "function" !== typeof value &&
              warnForInvalidEventListener(key, value);
          else
            a: {
              if (
                "o" === key[0] &&
                "n" === key[1] &&
                ((props = key.endsWith("Capture")),
                (tag = key.slice(2, props ? key.length - 7 : void 0)),
                (prevValue = domElement[internalPropsKey] || null),
                (prevValue = null != prevValue ? prevValue[key] : null),
                "function" === typeof prevValue &&
                  domElement.removeEventListener(tag, prevValue, props),
                "function" === typeof value)
              ) {
                "function" !== typeof prevValue &&
                  null !== prevValue &&
                  (key in domElement
                    ? (domElement[key] = null)
                    : domElement.hasAttribute(key) &&
                      domElement.removeAttribute(key));
                domElement.addEventListener(tag, value, props);
                break a;
              }
              key in domElement
                ? (domElement[key] = value)
                : !0 === value
                  ? domElement.setAttribute(key, "")
                  : setValueForAttribute(domElement, key, value);
            }
      }
    }
    function setInitialProperties(domElement, tag, props) {
      validatePropertiesInDevelopment(tag, props);
      switch (tag) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
          break;
        case "img":
          listenToNonDelegatedEvent("error", domElement);
          listenToNonDelegatedEvent("load", domElement);
          var hasSrc = !1,
            hasSrcSet = !1,
            propKey;
          for (propKey in props)
            if (props.hasOwnProperty(propKey)) {
              var propValue = props[propKey];
              if (null != propValue)
                switch (propKey) {
                  case "src":
                    hasSrc = !0;
                    break;
                  case "srcSet":
                    hasSrcSet = !0;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw Error(
                      tag +
                        " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                    );
                  default:
                    setProp(domElement, tag, propKey, propValue, props, null);
                }
            }
          hasSrcSet &&
            setProp(domElement, tag, "srcSet", props.srcSet, props, null);
          hasSrc && setProp(domElement, tag, "src", props.src, props, null);
          return;
        case "input":
          checkControlledValueProps("input", props);
          listenToNonDelegatedEvent("invalid", domElement);
          var defaultValue = (propKey = propValue = hasSrcSet = null),
            checked = null,
            defaultChecked = null;
          for (hasSrc in props)
            if (props.hasOwnProperty(hasSrc)) {
              var _propValue = props[hasSrc];
              if (null != _propValue)
                switch (hasSrc) {
                  case "name":
                    hasSrcSet = _propValue;
                    break;
                  case "type":
                    propValue = _propValue;
                    break;
                  case "checked":
                    checked = _propValue;
                    break;
                  case "defaultChecked":
                    defaultChecked = _propValue;
                    break;
                  case "value":
                    propKey = _propValue;
                    break;
                  case "defaultValue":
                    defaultValue = _propValue;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    if (null != _propValue)
                      throw Error(
                        tag +
                          " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                      );
                    break;
                  default:
                    setProp(domElement, tag, hasSrc, _propValue, props, null);
                }
            }
          validateInputProps(domElement, props);
          initInput(
            domElement,
            propKey,
            defaultValue,
            checked,
            defaultChecked,
            propValue,
            hasSrcSet,
            !1
          );
          track(domElement);
          return;
        case "select":
          checkControlledValueProps("select", props);
          listenToNonDelegatedEvent("invalid", domElement);
          hasSrc = propValue = propKey = null;
          for (hasSrcSet in props)
            if (
              props.hasOwnProperty(hasSrcSet) &&
              ((defaultValue = props[hasSrcSet]), null != defaultValue)
            )
              switch (hasSrcSet) {
                case "value":
                  propKey = defaultValue;
                  break;
                case "defaultValue":
                  propValue = defaultValue;
                  break;
                case "multiple":
                  hasSrc = defaultValue;
                default:
                  setProp(
                    domElement,
                    tag,
                    hasSrcSet,
                    defaultValue,
                    props,
                    null
                  );
              }
          validateSelectProps(domElement, props);
          tag = propKey;
          props = propValue;
          domElement.multiple = !!hasSrc;
          null != tag
            ? updateOptions(domElement, !!hasSrc, tag, !1)
            : null != props && updateOptions(domElement, !!hasSrc, props, !0);
          return;
        case "textarea":
          checkControlledValueProps("textarea", props);
          listenToNonDelegatedEvent("invalid", domElement);
          propKey = hasSrcSet = hasSrc = null;
          for (propValue in props)
            if (
              props.hasOwnProperty(propValue) &&
              ((defaultValue = props[propValue]), null != defaultValue)
            )
              switch (propValue) {
                case "value":
                  hasSrc = defaultValue;
                  break;
                case "defaultValue":
                  hasSrcSet = defaultValue;
                  break;
                case "children":
                  propKey = defaultValue;
                  break;
                case "dangerouslySetInnerHTML":
                  if (null != defaultValue)
                    throw Error(
                      "`dangerouslySetInnerHTML` does not make sense on <textarea>."
                    );
                  break;
                default:
                  setProp(
                    domElement,
                    tag,
                    propValue,
                    defaultValue,
                    props,
                    null
                  );
              }
          validateTextareaProps(domElement, props);
          initTextarea(domElement, hasSrc, hasSrcSet, propKey);
          track(domElement);
          return;
        case "option":
          validateOptionProps(domElement, props);
          for (checked in props)
            if (
              props.hasOwnProperty(checked) &&
              ((hasSrc = props[checked]), null != hasSrc)
            )
              switch (checked) {
                case "selected":
                  domElement.selected =
                    hasSrc &&
                    "function" !== typeof hasSrc &&
                    "symbol" !== typeof hasSrc;
                  break;
                default:
                  setProp(domElement, tag, checked, hasSrc, props, null);
              }
          return;
        case "dialog":
          listenToNonDelegatedEvent("cancel", domElement);
          listenToNonDelegatedEvent("close", domElement);
          break;
        case "iframe":
        case "object":
          listenToNonDelegatedEvent("load", domElement);
          break;
        case "video":
        case "audio":
          for (hasSrc = 0; hasSrc < mediaEventTypes.length; hasSrc++)
            listenToNonDelegatedEvent(mediaEventTypes[hasSrc], domElement);
          break;
        case "image":
          listenToNonDelegatedEvent("error", domElement);
          listenToNonDelegatedEvent("load", domElement);
          break;
        case "details":
          listenToNonDelegatedEvent("toggle", domElement);
          break;
        case "embed":
        case "source":
        case "link":
          listenToNonDelegatedEvent("error", domElement),
            listenToNonDelegatedEvent("load", domElement);
        case "area":
        case "base":
        case "br":
        case "col":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "track":
        case "wbr":
        case "menuitem":
          for (defaultChecked in props)
            if (
              props.hasOwnProperty(defaultChecked) &&
              ((hasSrc = props[defaultChecked]), null != hasSrc)
            )
              switch (defaultChecked) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(
                    tag +
                      " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                  );
                default:
                  setProp(domElement, tag, defaultChecked, hasSrc, props, null);
              }
          return;
        default:
          if (isCustomElement(tag)) {
            for (_propValue in props)
              props.hasOwnProperty(_propValue) &&
                ((hasSrc = props[_propValue]),
                void 0 !== hasSrc &&
                  setPropOnCustomElement(
                    domElement,
                    tag,
                    _propValue,
                    hasSrc,
                    props,
                    void 0
                  ));
            return;
          }
      }
      for (defaultValue in props)
        props.hasOwnProperty(defaultValue) &&
          ((hasSrc = props[defaultValue]),
          null != hasSrc &&
            setProp(domElement, tag, defaultValue, hasSrc, props, null));
    }
    function updateProperties(domElement, tag, lastProps, nextProps) {
      validatePropertiesInDevelopment(tag, nextProps);
      switch (tag) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
          break;
        case "input":
          var name = null,
            type = null,
            value = null,
            defaultValue = null,
            lastDefaultValue = null,
            checked = null,
            defaultChecked = null;
          for (propKey in lastProps) {
            var lastProp = lastProps[propKey];
            if (lastProps.hasOwnProperty(propKey) && null != lastProp)
              switch (propKey) {
                case "checked":
                  break;
                case "value":
                  break;
                case "defaultValue":
                  lastDefaultValue = lastProp;
                default:
                  nextProps.hasOwnProperty(propKey) ||
                    setProp(
                      domElement,
                      tag,
                      propKey,
                      null,
                      nextProps,
                      lastProp
                    );
              }
          }
          for (var _propKey8 in nextProps) {
            var propKey = nextProps[_propKey8];
            lastProp = lastProps[_propKey8];
            if (
              nextProps.hasOwnProperty(_propKey8) &&
              (null != propKey || null != lastProp)
            )
              switch (_propKey8) {
                case "type":
                  type = propKey;
                  break;
                case "name":
                  name = propKey;
                  break;
                case "checked":
                  checked = propKey;
                  break;
                case "defaultChecked":
                  defaultChecked = propKey;
                  break;
                case "value":
                  value = propKey;
                  break;
                case "defaultValue":
                  defaultValue = propKey;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (null != propKey)
                    throw Error(
                      tag +
                        " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                    );
                  break;
                default:
                  propKey !== lastProp &&
                    setProp(
                      domElement,
                      tag,
                      _propKey8,
                      propKey,
                      nextProps,
                      lastProp
                    );
              }
          }
          tag =
            "checkbox" === lastProps.type || "radio" === lastProps.type
              ? null != lastProps.checked
              : null != lastProps.value;
          nextProps =
            "checkbox" === nextProps.type || "radio" === nextProps.type
              ? null != nextProps.checked
              : null != nextProps.value;
          tag ||
            !nextProps ||
            didWarnUncontrolledToControlled ||
            (console.error(
              "A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"
            ),
            (didWarnUncontrolledToControlled = !0));
          !tag ||
            nextProps ||
            didWarnControlledToUncontrolled ||
            (console.error(
              "A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"
            ),
            (didWarnControlledToUncontrolled = !0));
          updateInput(
            domElement,
            value,
            defaultValue,
            lastDefaultValue,
            checked,
            defaultChecked,
            type,
            name
          );
          return;
        case "select":
          propKey = value = defaultValue = _propKey8 = null;
          for (type in lastProps)
            if (
              ((lastDefaultValue = lastProps[type]),
              lastProps.hasOwnProperty(type) && null != lastDefaultValue)
            )
              switch (type) {
                case "value":
                  break;
                case "multiple":
                  propKey = lastDefaultValue;
                default:
                  nextProps.hasOwnProperty(type) ||
                    setProp(
                      domElement,
                      tag,
                      type,
                      null,
                      nextProps,
                      lastDefaultValue
                    );
              }
          for (name in nextProps)
            if (
              ((type = nextProps[name]),
              (lastDefaultValue = lastProps[name]),
              nextProps.hasOwnProperty(name) &&
                (null != type || null != lastDefaultValue))
            )
              switch (name) {
                case "value":
                  _propKey8 = type;
                  break;
                case "defaultValue":
                  defaultValue = type;
                  break;
                case "multiple":
                  value = type;
                default:
                  type !== lastDefaultValue &&
                    setProp(
                      domElement,
                      tag,
                      name,
                      type,
                      nextProps,
                      lastDefaultValue
                    );
              }
          nextProps = defaultValue;
          tag = value;
          lastProps = propKey;
          null != _propKey8
            ? updateOptions(domElement, !!tag, _propKey8, !1)
            : !!lastProps !== !!tag &&
              (null != nextProps
                ? updateOptions(domElement, !!tag, nextProps, !0)
                : updateOptions(domElement, !!tag, tag ? [] : "", !1));
          return;
        case "textarea":
          propKey = _propKey8 = null;
          for (defaultValue in lastProps)
            if (
              ((name = lastProps[defaultValue]),
              lastProps.hasOwnProperty(defaultValue) &&
                null != name &&
                !nextProps.hasOwnProperty(defaultValue))
            )
              switch (defaultValue) {
                case "value":
                  break;
                case "children":
                  break;
                default:
                  setProp(domElement, tag, defaultValue, null, nextProps, name);
              }
          for (value in nextProps)
            if (
              ((name = nextProps[value]),
              (type = lastProps[value]),
              nextProps.hasOwnProperty(value) && (null != name || null != type))
            )
              switch (value) {
                case "value":
                  _propKey8 = name;
                  break;
                case "defaultValue":
                  propKey = name;
                  break;
                case "children":
                  break;
                case "dangerouslySetInnerHTML":
                  if (null != name)
                    throw Error(
                      "`dangerouslySetInnerHTML` does not make sense on <textarea>."
                    );
                  break;
                default:
                  name !== type &&
                    setProp(domElement, tag, value, name, nextProps, type);
              }
          updateTextarea(domElement, _propKey8, propKey);
          return;
        case "option":
          for (var _propKey13 in lastProps)
            if (
              ((_propKey8 = lastProps[_propKey13]),
              lastProps.hasOwnProperty(_propKey13) &&
                null != _propKey8 &&
                !nextProps.hasOwnProperty(_propKey13))
            )
              switch (_propKey13) {
                case "selected":
                  domElement.selected = !1;
                  break;
                default:
                  setProp(
                    domElement,
                    tag,
                    _propKey13,
                    null,
                    nextProps,
                    _propKey8
                  );
              }
          for (lastDefaultValue in nextProps)
            if (
              ((_propKey8 = nextProps[lastDefaultValue]),
              (propKey = lastProps[lastDefaultValue]),
              nextProps.hasOwnProperty(lastDefaultValue) &&
                _propKey8 !== propKey &&
                (null != _propKey8 || null != propKey))
            )
              switch (lastDefaultValue) {
                case "selected":
                  domElement.selected =
                    _propKey8 &&
                    "function" !== typeof _propKey8 &&
                    "symbol" !== typeof _propKey8;
                  break;
                default:
                  setProp(
                    domElement,
                    tag,
                    lastDefaultValue,
                    _propKey8,
                    nextProps,
                    propKey
                  );
              }
          return;
        case "img":
        case "link":
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
        case "menuitem":
          for (var _propKey15 in lastProps)
            (_propKey8 = lastProps[_propKey15]),
              lastProps.hasOwnProperty(_propKey15) &&
                null != _propKey8 &&
                !nextProps.hasOwnProperty(_propKey15) &&
                setProp(
                  domElement,
                  tag,
                  _propKey15,
                  null,
                  nextProps,
                  _propKey8
                );
          for (checked in nextProps)
            if (
              ((_propKey8 = nextProps[checked]),
              (propKey = lastProps[checked]),
              nextProps.hasOwnProperty(checked) &&
                _propKey8 !== propKey &&
                (null != _propKey8 || null != propKey))
            )
              switch (checked) {
                case "children":
                case "dangerouslySetInnerHTML":
                  if (null != _propKey8)
                    throw Error(
                      tag +
                        " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                    );
                  break;
                default:
                  setProp(
                    domElement,
                    tag,
                    checked,
                    _propKey8,
                    nextProps,
                    propKey
                  );
              }
          return;
        default:
          if (isCustomElement(tag)) {
            for (var _propKey17 in lastProps)
              (_propKey8 = lastProps[_propKey17]),
                lastProps.hasOwnProperty(_propKey17) &&
                  void 0 !== _propKey8 &&
                  !nextProps.hasOwnProperty(_propKey17) &&
                  setPropOnCustomElement(
                    domElement,
                    tag,
                    _propKey17,
                    void 0,
                    nextProps,
                    _propKey8
                  );
            for (defaultChecked in nextProps)
              (_propKey8 = nextProps[defaultChecked]),
                (propKey = lastProps[defaultChecked]),
                !nextProps.hasOwnProperty(defaultChecked) ||
                  _propKey8 === propKey ||
                  (void 0 === _propKey8 && void 0 === propKey) ||
                  setPropOnCustomElement(
                    domElement,
                    tag,
                    defaultChecked,
                    _propKey8,
                    nextProps,
                    propKey
                  );
            return;
          }
      }
      for (var _propKey19 in lastProps)
        (_propKey8 = lastProps[_propKey19]),
          lastProps.hasOwnProperty(_propKey19) &&
            null != _propKey8 &&
            !nextProps.hasOwnProperty(_propKey19) &&
            setProp(domElement, tag, _propKey19, null, nextProps, _propKey8);
      for (lastProp in nextProps)
        (_propKey8 = nextProps[lastProp]),
          (propKey = lastProps[lastProp]),
          !nextProps.hasOwnProperty(lastProp) ||
            _propKey8 === propKey ||
            (null == _propKey8 && null == propKey) ||
            setProp(domElement, tag, lastProp, _propKey8, nextProps, propKey);
    }
    function getPropNameFromAttributeName(attrName) {
      switch (attrName) {
        case "class":
          return "className";
        case "for":
          return "htmlFor";
        default:
          return attrName;
      }
    }
    function getStylesObjectFromElement(domElement) {
      var serverValueInObjectForm = {};
      domElement = domElement.style;
      for (var i = 0; i < domElement.length; i++) {
        var styleName = domElement[i];
        serverValueInObjectForm[styleName] =
          domElement.getPropertyValue(styleName);
      }
      return serverValueInObjectForm;
    }
    function diffHydratedStyles(domElement, value$jscomp$0, serverDifferences) {
      if (null != value$jscomp$0 && "object" !== typeof value$jscomp$0)
        console.error(
          "The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX."
        );
      else if (canDiffStyleForHydrationWarning) {
        var clientValue;
        var delimiter = (clientValue = ""),
          styleName;
        for (styleName in value$jscomp$0)
          if (value$jscomp$0.hasOwnProperty(styleName)) {
            var value = value$jscomp$0[styleName];
            null != value &&
              "boolean" !== typeof value &&
              "" !== value &&
              (0 === styleName.indexOf("--")
                ? (checkCSSPropertyStringCoercion(value, styleName),
                  (clientValue +=
                    delimiter + styleName + ":" + ("" + value).trim()))
                : "number" !== typeof value ||
                    0 === value ||
                    unitlessNumbers.has(styleName)
                  ? (checkCSSPropertyStringCoercion(value, styleName),
                    (clientValue +=
                      delimiter +
                      styleName
                        .replace(uppercasePattern, "-$1")
                        .toLowerCase()
                        .replace(msPattern$1, "-ms-") +
                      ":" +
                      ("" + value).trim()))
                  : (clientValue +=
                      delimiter +
                      styleName
                        .replace(uppercasePattern, "-$1")
                        .toLowerCase()
                        .replace(msPattern$1, "-ms-") +
                      ":" +
                      value +
                      "px"),
              (delimiter = ";"));
          }
        clientValue = clientValue || null;
        value$jscomp$0 = domElement.getAttribute("style");
        value$jscomp$0 !== clientValue &&
          ((clientValue = normalizeMarkupForTextOrAttribute(clientValue)),
          normalizeMarkupForTextOrAttribute(value$jscomp$0) !== clientValue &&
            (serverDifferences.style = getStylesObjectFromElement(domElement)));
      }
    }
    function hydrateAttribute(
      domElement,
      propKey,
      attributeName,
      value,
      extraAttributes,
      serverDifferences
    ) {
      extraAttributes.delete(attributeName);
      domElement = domElement.getAttribute(attributeName);
      if (null === domElement)
        switch (typeof value) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            return;
        }
      else if (null != value)
        switch (typeof value) {
          case "function":
          case "symbol":
          case "boolean":
            break;
          default:
            if (
              (checkAttributeStringCoercion(value, propKey),
              domElement === "" + value)
            )
              return;
        }
      warnForPropDifference(propKey, domElement, value, serverDifferences);
    }
    function hydrateBooleanAttribute(
      domElement,
      propKey,
      attributeName,
      value,
      extraAttributes,
      serverDifferences
    ) {
      extraAttributes.delete(attributeName);
      domElement = domElement.getAttribute(attributeName);
      if (null === domElement) {
        switch (typeof value) {
          case "function":
          case "symbol":
            return;
        }
        if (!value) return;
      } else
        switch (typeof value) {
          case "function":
          case "symbol":
            break;
          default:
            if (value) return;
        }
      warnForPropDifference(propKey, domElement, value, serverDifferences);
    }
    function hydrateBooleanishAttribute(
      domElement,
      propKey,
      attributeName,
      value,
      extraAttributes,
      serverDifferences
    ) {
      extraAttributes.delete(attributeName);
      domElement = domElement.getAttribute(attributeName);
      if (null === domElement)
        switch (typeof value) {
          case "undefined":
          case "function":
          case "symbol":
            return;
        }
      else if (null != value)
        switch (typeof value) {
          case "function":
          case "symbol":
            break;
          default:
            if (
              (checkAttributeStringCoercion(value, attributeName),
              domElement === "" + value)
            )
              return;
        }
      warnForPropDifference(propKey, domElement, value, serverDifferences);
    }
    function hydrateNumericAttribute(
      domElement,
      propKey,
      attributeName,
      value,
      extraAttributes,
      serverDifferences
    ) {
      extraAttributes.delete(attributeName);
      domElement = domElement.getAttribute(attributeName);
      if (null === domElement)
        switch (typeof value) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            return;
          default:
            if (isNaN(value)) return;
        }
      else if (null != value)
        switch (typeof value) {
          case "function":
          case "symbol":
          case "boolean":
            break;
          default:
            if (
              !isNaN(value) &&
              (checkAttributeStringCoercion(value, propKey),
              domElement === "" + value)
            )
              return;
        }
      warnForPropDifference(propKey, domElement, value, serverDifferences);
    }
    function hydrateSanitizedAttribute(
      domElement,
      propKey,
      attributeName,
      value,
      extraAttributes,
      serverDifferences
    ) {
      extraAttributes.delete(attributeName);
      domElement = domElement.getAttribute(attributeName);
      if (null === domElement)
        switch (typeof value) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            return;
        }
      else if (null != value)
        switch (typeof value) {
          case "function":
          case "symbol":
          case "boolean":
            break;
          default:
            if (
              (checkAttributeStringCoercion(value, propKey),
              (attributeName = sanitizeURL("" + value)),
              domElement === attributeName)
            )
              return;
        }
      warnForPropDifference(propKey, domElement, value, serverDifferences);
    }
    function diffHydratedProperties(domElement, tag, props, hostContext) {
      for (
        var serverDifferences = {},
          extraAttributes = new Set(),
          attributes = domElement.attributes,
          i = 0;
        i < attributes.length;
        i++
      )
        switch (attributes[i].name.toLowerCase()) {
          case "value":
            break;
          case "checked":
            break;
          case "selected":
            break;
          default:
            extraAttributes.add(attributes[i].name);
        }
      if (isCustomElement(tag))
        for (var propKey in props) {
          if (props.hasOwnProperty(propKey)) {
            var value = props[propKey];
            if (null != value)
              if (registrationNameDependencies.hasOwnProperty(propKey))
                "function" !== typeof value &&
                  warnForInvalidEventListener(propKey, value);
              else if (!0 !== props.suppressHydrationWarning)
                switch (propKey) {
                  case "children":
                    ("string" !== typeof value && "number" !== typeof value) ||
                      warnForPropDifference(
                        "children",
                        domElement.textContent,
                        value,
                        serverDifferences
                      );
                    continue;
                  case "suppressContentEditableWarning":
                  case "suppressHydrationWarning":
                  case "defaultValue":
                  case "defaultChecked":
                  case "innerHTML":
                  case "ref":
                    continue;
                  case "dangerouslySetInnerHTML":
                    attributes = domElement.innerHTML;
                    value = value ? value.__html : void 0;
                    null != value &&
                      ((value = normalizeHTML(domElement, value)),
                      warnForPropDifference(
                        propKey,
                        attributes,
                        value,
                        serverDifferences
                      ));
                    continue;
                  case "style":
                    extraAttributes.delete(propKey);
                    diffHydratedStyles(domElement, value, serverDifferences);
                    continue;
                  case "offsetParent":
                  case "offsetTop":
                  case "offsetLeft":
                  case "offsetWidth":
                  case "offsetHeight":
                  case "isContentEditable":
                  case "outerText":
                  case "outerHTML":
                    extraAttributes.delete(propKey.toLowerCase());
                    console.error(
                      "Assignment to read-only property will result in a no-op: `%s`",
                      propKey
                    );
                    continue;
                  case "className":
                    extraAttributes.delete("class");
                    attributes = getValueForAttributeOnCustomComponent(
                      domElement,
                      "class",
                      value
                    );
                    warnForPropDifference(
                      "className",
                      attributes,
                      value,
                      serverDifferences
                    );
                    continue;
                  default:
                    hostContext.context === HostContextNamespaceNone &&
                    "svg" !== tag &&
                    "math" !== tag
                      ? extraAttributes.delete(propKey.toLowerCase())
                      : extraAttributes.delete(propKey),
                      (attributes = getValueForAttributeOnCustomComponent(
                        domElement,
                        propKey,
                        value
                      )),
                      warnForPropDifference(
                        propKey,
                        attributes,
                        value,
                        serverDifferences
                      );
                }
          }
        }
      else
        for (value in props)
          if (
            props.hasOwnProperty(value) &&
            ((propKey = props[value]), null != propKey)
          )
            if (registrationNameDependencies.hasOwnProperty(value))
              "function" !== typeof propKey &&
                warnForInvalidEventListener(value, propKey);
            else if (!0 !== props.suppressHydrationWarning)
              switch (value) {
                case "children":
                  ("string" !== typeof propKey &&
                    "number" !== typeof propKey) ||
                    warnForPropDifference(
                      "children",
                      domElement.textContent,
                      propKey,
                      serverDifferences
                    );
                  continue;
                case "suppressContentEditableWarning":
                case "suppressHydrationWarning":
                case "value":
                case "checked":
                case "selected":
                case "defaultValue":
                case "defaultChecked":
                case "innerHTML":
                case "ref":
                  continue;
                case "dangerouslySetInnerHTML":
                  attributes = domElement.innerHTML;
                  propKey = propKey ? propKey.__html : void 0;
                  null != propKey &&
                    ((propKey = normalizeHTML(domElement, propKey)),
                    attributes !== propKey &&
                      (serverDifferences[value] = { __html: attributes }));
                  continue;
                case "className":
                  hydrateAttribute(
                    domElement,
                    value,
                    "class",
                    propKey,
                    extraAttributes,
                    serverDifferences
                  );
                  continue;
                case "tabIndex":
                  hydrateAttribute(
                    domElement,
                    value,
                    "tabindex",
                    propKey,
                    extraAttributes,
                    serverDifferences
                  );
                  continue;
                case "style":
                  extraAttributes.delete(value);
                  diffHydratedStyles(domElement, propKey, serverDifferences);
                  continue;
                case "multiple":
                  extraAttributes.delete(value);
                  warnForPropDifference(
                    value,
                    domElement.multiple,
                    propKey,
                    serverDifferences
                  );
                  continue;
                case "muted":
                  extraAttributes.delete(value);
                  warnForPropDifference(
                    value,
                    domElement.muted,
                    propKey,
                    serverDifferences
                  );
                  continue;
                case "autoFocus":
                  extraAttributes.delete("autofocus");
                  warnForPropDifference(
                    value,
                    domElement.autofocus,
                    propKey,
                    serverDifferences
                  );
                  continue;
                case "data":
                  if ("object" !== tag) {
                    extraAttributes.delete(value);
                    attributes = domElement.getAttribute("data");
                    warnForPropDifference(
                      value,
                      attributes,
                      propKey,
                      serverDifferences
                    );
                    continue;
                  }
                case "src":
                case "href":
                  if (
                    !(
                      "" !== propKey ||
                      ("a" === tag && "href" === value) ||
                      ("object" === tag && "data" === value)
                    )
                  ) {
                    "src" === value
                      ? console.error(
                          'An empty string ("") was passed to the %s attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to %s instead of an empty string.',
                          value,
                          value
                        )
                      : console.error(
                          'An empty string ("") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.',
                          value,
                          value
                        );
                    hydrateSanitizedAttribute(
                      domElement,
                      value,
                      value,
                      null,
                      extraAttributes,
                      serverDifferences
                    );
                    continue;
                  }
                  hydrateSanitizedAttribute(
                    domElement,
                    value,
                    value,
                    propKey,
                    extraAttributes,
                    serverDifferences
                  );
                  continue;
                case "action":
                case "formAction":
                  attributes = domElement.getAttribute(value);
                  if ("function" === typeof propKey) {
                    extraAttributes.delete(value.toLowerCase());
                    "formAction" === value
                      ? (extraAttributes.delete("name"),
                        extraAttributes.delete("formenctype"),
                        extraAttributes.delete("formmethod"),
                        extraAttributes.delete("formtarget"))
                      : (extraAttributes.delete("enctype"),
                        extraAttributes.delete("method"),
                        extraAttributes.delete("target"));
                    continue;
                  } else if (attributes === EXPECTED_FORM_ACTION_URL) {
                    extraAttributes.delete(value.toLowerCase());
                    warnForPropDifference(
                      value,
                      "function",
                      propKey,
                      serverDifferences
                    );
                    continue;
                  }
                  hydrateSanitizedAttribute(
                    domElement,
                    value,
                    value.toLowerCase(),
                    propKey,
                    extraAttributes,
                    serverDifferences
                  );
                  continue;
                case "xlinkHref":
                  hydrateSanitizedAttribute(
                    domElement,
                    value,
                    "xlink:href",
                    propKey,
                    extraAttributes,
                    serverDifferences
                  );
                  continue;
                case "contentEditable":
                  hydrateBooleanishAttribute(
                    domElement,
                    value,
                    "contenteditable",
                    propKey,
                    extraAttributes,
                    serverDifferences
                  );
                  continue;
                case "spellCheck":
                  hydrateBooleanishAttribute(
                    domElement,
                    value,
                    "spellcheck",
                    propKey,
                    extraAttributes,
                    serverDifferences
                  );
                  continue;
                case "draggable":
                case "autoReverse":
                case "externalResourcesRequired":
                case "focusable":
                case "preserveAlpha":
                  hydrateBooleanishAttribute(
                    domElement,
                    value,
                    value,
                    propKey,
                    extraAttributes,
                    serverDifferences
                  );
                  continue;
                case "allowFullScreen":
                case "async":
                case "autoPlay":
                case "controls":
                case "default":
                case "defer":
                case "disabled":
                case "disablePictureInPicture":
                case "disableRemotePlayback":
                case "formNoValidate":
                case "hidden":
                case "loop":
                case "noModule":
                case "noValidate":
                case "open":
                case "playsInline":
                case "readOnly":
                case "required":
                case "reversed":
                case "scoped":
                case "seamless":
                case "itemScope":
                  hydrateBooleanAttribute(
                    domElement,
                    value,
                    value.toLowerCase(),
                    propKey,
                    extraAttributes,
                    serverDifferences
                  );
                  continue;
                case "capture":
                case "download":
                  a: {
                    i = domElement;
                    var attributeName = (attributes = value),
                      serverDifferences$jscomp$0 = serverDifferences;
                    extraAttributes.delete(attributeName);
                    i = i.getAttribute(attributeName);
                    if (null === i)
                      switch (typeof propKey) {
                        case "undefined":
                        case "function":
                        case "symbol":
                          break a;
                        default:
                          if (!1 === propKey) break a;
                      }
                    else if (null != propKey)
                      switch (typeof propKey) {
                        case "function":
                        case "symbol":
                          break;
                        case "boolean":
                          if (!0 === propKey && "" === i) break a;
                          break;
                        default:
                          if (
                            (checkAttributeStringCoercion(propKey, attributes),
                            i === "" + propKey)
                          )
                            break a;
                      }
                    warnForPropDifference(
                      attributes,
                      i,
                      propKey,
                      serverDifferences$jscomp$0
                    );
                  }
                  continue;
                case "cols":
                case "rows":
                case "size":
                case "span":
                  a: {
                    i = domElement;
                    attributeName = attributes = value;
                    serverDifferences$jscomp$0 = serverDifferences;
                    extraAttributes.delete(attributeName);
                    i = i.getAttribute(attributeName);
                    if (null === i)
                      switch (typeof propKey) {
                        case "undefined":
                        case "function":
                        case "symbol":
                        case "boolean":
                          break a;
                        default:
                          if (isNaN(propKey) || 1 > propKey) break a;
                      }
                    else if (null != propKey)
                      switch (typeof propKey) {
                        case "function":
                        case "symbol":
                        case "boolean":
                          break;
                        default:
                          if (
                            !(isNaN(propKey) || 1 > propKey) &&
                            (checkAttributeStringCoercion(propKey, attributes),
                            i === "" + propKey)
                          )
                            break a;
                      }
                    warnForPropDifference(
                      attributes,
                      i,
                      propKey,
                      serverDifferences$jscomp$0
                    );
                  }
                  continue;
                case "rowSpan":
                  hydrateNumericAttribute(
                    domElement,
                    value,
                    "rowspan",
                    propKey,
                    extraAttributes,
                    serverDifferences
                  );
                  continue;
                case "start":
                  hydrateNumericAttribute(
                    domElement,
                    value,
                    value,
                    propKey,
                    extraAttributes,
                    serverDifferences
                  );
                  continue;
                case "xHeight":
                  hydrateAttribute(
                    domElement,
                    value,
                    "x-height",
                    propKey,
                    extraAttributes,
                    serverDifferences
                  );
                  continue;
                case "xlinkActuate":
                  hydrateAttribute(
                    domElement,
                    value,
                    "xlink:actuate",
                    propKey,
                    extraAttributes,
                    serverDifferences
                  );
                  continue;
                case "xlinkArcrole":
                  hydrateAttribute(
                    domElement,
                    value,
                    "xlink:arcrole",
                    propKey,
                    extraAttributes,
                    serverDifferences
                  );
                  continue;
                case "xlinkRole":
                  hydrateAttribute(
                    domElement,
                    value,
                    "xlink:role",
                    propKey,
                    extraAttributes,
                    serverDifferences
                  );
                  continue;
                case "xlinkShow":
                  hydrateAttribute(
                    domElement,
                    value,
                    "xlink:show",
                    propKey,
                    extraAttributes,
                    serverDifferences
                  );
                  continue;
                case "xlinkTitle":
                  hydrateAttribute(
                    domElement,
                    value,
                    "xlink:title",
                    propKey,
                    extraAttributes,
                    serverDifferences
                  );
                  continue;
                case "xlinkType":
                  hydrateAttribute(
                    domElement,
                    value,
                    "xlink:type",
                    propKey,
                    extraAttributes,
                    serverDifferences
                  );
                  continue;
                case "xmlBase":
                  hydrateAttribute(
                    domElement,
                    value,
                    "xml:base",
                    propKey,
                    extraAttributes,
                    serverDifferences
                  );
                  continue;
                case "xmlLang":
                  hydrateAttribute(
                    domElement,
                    value,
                    "xml:lang",
                    propKey,
                    extraAttributes,
                    serverDifferences
                  );
                  continue;
                case "xmlSpace":
                  hydrateAttribute(
                    domElement,
                    value,
                    "xml:space",
                    propKey,
                    extraAttributes,
                    serverDifferences
                  );
                  continue;
                case "inert":
                  "" !== propKey ||
                    didWarnForNewBooleanPropsWithEmptyValue[value] ||
                    ((didWarnForNewBooleanPropsWithEmptyValue[value] = !0),
                    console.error(
                      "Received an empty string for a boolean attribute `%s`. This will treat the attribute as if it were false. Either pass `false` to silence this warning, or pass `true` if you used an empty string in earlier versions of React to indicate this attribute is true.",
                      value
                    ));
                  hydrateBooleanAttribute(
                    domElement,
                    value,
                    value,
                    propKey,
                    extraAttributes,
                    serverDifferences
                  );
                  continue;
                default:
                  if (
                    !(2 < value.length) ||
                    ("o" !== value[0] && "O" !== value[0]) ||
                    ("n" !== value[1] && "N" !== value[1])
                  ) {
                    i = getAttributeAlias(value);
                    attributes = !1;
                    hostContext.context === HostContextNamespaceNone &&
                    "svg" !== tag &&
                    "math" !== tag
                      ? extraAttributes.delete(i.toLowerCase())
                      : ((attributeName = value.toLowerCase()),
                        (attributeName = possibleStandardNames.hasOwnProperty(
                          attributeName
                        )
                          ? possibleStandardNames[attributeName] || null
                          : null),
                        null !== attributeName &&
                          attributeName !== value &&
                          ((attributes = !0),
                          extraAttributes.delete(attributeName)),
                        extraAttributes.delete(i));
                    a: if (
                      ((attributeName = domElement),
                      (serverDifferences$jscomp$0 = i),
                      (i = propKey),
                      isAttributeNameSafe(serverDifferences$jscomp$0))
                    )
                      if (
                        attributeName.hasAttribute(serverDifferences$jscomp$0)
                      )
                        (attributeName = attributeName.getAttribute(
                          serverDifferences$jscomp$0
                        )),
                          checkAttributeStringCoercion(
                            i,
                            serverDifferences$jscomp$0
                          ),
                          (i = attributeName === "" + i ? i : attributeName);
                      else {
                        switch (typeof i) {
                          case "function":
                          case "symbol":
                            break a;
                          case "boolean":
                            if (
                              ((attributeName = serverDifferences$jscomp$0
                                .toLowerCase()
                                .slice(0, 5)),
                              "data-" !== attributeName &&
                                "aria-" !== attributeName)
                            )
                              break a;
                        }
                        i = void 0 === i ? void 0 : null;
                      }
                    else i = void 0;
                    attributes ||
                      warnForPropDifference(
                        value,
                        i,
                        propKey,
                        serverDifferences
                      );
                  }
              }
      0 < extraAttributes.size &&
        !0 !== props.suppressHydrationWarning &&
        warnForExtraAttributes(domElement, extraAttributes, serverDifferences);
      return 0 === Object.keys(serverDifferences).length
        ? null
        : serverDifferences;
    }
    function propNamesListJoin(list, combinator) {
      switch (list.length) {
        case 0:
          return "";
        case 1:
          return list[0];
        case 2:
          return list[0] + " " + combinator + " " + list[1];
        default:
          return (
            list.slice(0, -1).join(", ") +
            ", " +
            combinator +
            " " +
            list[list.length - 1]
          );
      }
    }
    function getOwnerDocumentFromRootContainer(rootContainerElement) {
      return 9 === rootContainerElement.nodeType
        ? rootContainerElement
        : rootContainerElement.ownerDocument;
    }
    function getOwnHostContext(namespaceURI) {
      switch (namespaceURI) {
        case SVG_NAMESPACE:
          return HostContextNamespaceSvg;
        case MATH_NAMESPACE:
          return HostContextNamespaceMath;
        default:
          return HostContextNamespaceNone;
      }
    }
    function getChildHostContextProd(parentNamespace, type) {
      if (parentNamespace === HostContextNamespaceNone)
        switch (type) {
          case "svg":
            return HostContextNamespaceSvg;
          case "math":
            return HostContextNamespaceMath;
          default:
            return HostContextNamespaceNone;
        }
      return parentNamespace === HostContextNamespaceSvg &&
        "foreignObject" === type
        ? HostContextNamespaceNone
        : parentNamespace;
    }
    function shouldSetTextContent(type, props) {
      return (
        "textarea" === type ||
        "noscript" === type ||
        "string" === typeof props.children ||
        "number" === typeof props.children ||
        "bigint" === typeof props.children ||
        ("object" === typeof props.dangerouslySetInnerHTML &&
          null !== props.dangerouslySetInnerHTML &&
          null != props.dangerouslySetInnerHTML.__html)
      );
    }
    function shouldAttemptEagerTransition() {
      var event = window.event;
      if (event && "popstate" === event.type) {
        if (event === currentPopstateTransitionEvent) return !1;
        currentPopstateTransitionEvent = event;
        return !0;
      }
      currentPopstateTransitionEvent = null;
      return !1;
    }
    function handleErrorInNextTick(error) {
      setTimeout(function () {
        throw error;
      });
    }
    function commitMount(domElement, type, newProps) {
      switch (type) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          newProps.autoFocus && domElement.focus();
          break;
        case "img":
          newProps.src
            ? (domElement.src = newProps.src)
            : newProps.srcSet && (domElement.srcset = newProps.srcSet);
      }
    }
    function commitUpdate(domElement, type, oldProps, newProps) {
      updateProperties(domElement, type, oldProps, newProps);
      domElement[internalPropsKey] = newProps;
    }
    function resetTextContent(domElement) {
      setTextContent(domElement, "");
    }
    function commitTextUpdate(textInstance, oldText, newText) {
      textInstance.nodeValue = newText;
    }
    function removeChild(parentInstance, child) {
      parentInstance.removeChild(child);
    }
    function removeChildFromContainer(container, child) {
      8 === container.nodeType
        ? container.parentNode.removeChild(child)
        : container.removeChild(child);
    }
    function clearSuspenseBoundary(parentInstance, suspenseInstance) {
      var node = suspenseInstance,
        depth = 0;
      do {
        var nextNode = node.nextSibling;
        parentInstance.removeChild(node);
        if (nextNode && 8 === nextNode.nodeType)
          if (((node = nextNode.data), node === SUSPENSE_END_DATA)) {
            if (0 === depth) {
              parentInstance.removeChild(nextNode);
              retryIfBlockedOn(suspenseInstance);
              return;
            }
            depth--;
          } else
            (node !== SUSPENSE_START_DATA &&
              node !== SUSPENSE_PENDING_START_DATA &&
              node !== SUSPENSE_FALLBACK_START_DATA) ||
              depth++;
        node = nextNode;
      } while (node);
      retryIfBlockedOn(suspenseInstance);
    }
    function hideInstance(instance) {
      instance = instance.style;
      "function" === typeof instance.setProperty
        ? instance.setProperty("display", "none", "important")
        : (instance.display = "none");
    }
    function hideTextInstance(textInstance) {
      textInstance.nodeValue = "";
    }
    function unhideInstance(instance, props) {
      props = props[STYLE];
      props =
        void 0 !== props && null !== props && props.hasOwnProperty("display")
          ? props.display
          : null;
      instance.style.display =
        null == props || "boolean" === typeof props ? "" : ("" + props).trim();
    }
    function unhideTextInstance(textInstance, text) {
      textInstance.nodeValue = text;
    }
    function clearContainerSparingly(container) {
      var nextNode = container.firstChild;
      nextNode && 10 === nextNode.nodeType && (nextNode = nextNode.nextSibling);
      for (; nextNode; ) {
        var node = nextNode;
        nextNode = nextNode.nextSibling;
        switch (node.nodeName) {
          case "HTML":
          case "HEAD":
          case "BODY":
            clearContainerSparingly(node);
            detachDeletedInstance(node);
            continue;
          case "SCRIPT":
          case "STYLE":
            continue;
          case "LINK":
            if ("stylesheet" === node.rel.toLowerCase()) continue;
        }
        container.removeChild(node);
      }
    }
    function canHydrateInstance(instance, type, props, inRootOrSingleton) {
      for (; 1 === instance.nodeType; ) {
        var anyProps = props;
        if (instance.nodeName.toLowerCase() !== type.toLowerCase()) {
          if (
            !inRootOrSingleton &&
            ("INPUT" !== instance.nodeName || "hidden" !== instance.type)
          )
            break;
        } else if (!inRootOrSingleton)
          if ("input" === type && "hidden" === instance.type) {
            checkAttributeStringCoercion(anyProps.name, "name");
            var name = null == anyProps.name ? null : "" + anyProps.name;
            if (
              "hidden" === anyProps.type &&
              instance.getAttribute("name") === name
            )
              return instance;
          } else return instance;
        else if (!instance[internalHoistableMarker])
          switch (type) {
            case "meta":
              if (!instance.hasAttribute("itemprop")) break;
              return instance;
            case "link":
              name = instance.getAttribute("rel");
              if (
                "stylesheet" === name &&
                instance.hasAttribute("data-precedence")
              )
                break;
              else if (
                name !== anyProps.rel ||
                instance.getAttribute("href") !==
                  (null == anyProps.href ? null : anyProps.href) ||
                instance.getAttribute("crossorigin") !==
                  (null == anyProps.crossOrigin
                    ? null
                    : anyProps.crossOrigin) ||
                instance.getAttribute("title") !==
                  (null == anyProps.title ? null : anyProps.title)
              )
                break;
              return instance;
            case "style":
              if (instance.hasAttribute("data-precedence")) break;
              return instance;
            case "script":
              name = instance.getAttribute("src");
              if (
                (name !== (null == anyProps.src ? null : anyProps.src) ||
                  instance.getAttribute("type") !==
                    (null == anyProps.type ? null : anyProps.type) ||
                  instance.getAttribute("crossorigin") !==
                    (null == anyProps.crossOrigin
                      ? null
                      : anyProps.crossOrigin)) &&
                name &&
                instance.hasAttribute("async") &&
                !instance.hasAttribute("itemprop")
              )
                break;
              return instance;
            default:
              return instance;
          }
        instance = getNextHydratable(instance.nextSibling);
        if (null === instance) break;
      }
      return null;
    }
    function canHydrateTextInstance(instance, text, inRootOrSingleton) {
      if ("" === text) return null;
      for (; 3 !== instance.nodeType; ) {
        if (
          (1 !== instance.nodeType ||
            "INPUT" !== instance.nodeName ||
            "hidden" !== instance.type) &&
          !inRootOrSingleton
        )
          return null;
        instance = getNextHydratable(instance.nextSibling);
        if (null === instance) return null;
      }
      return instance;
    }
    function isSuspenseInstanceFallback(instance) {
      return (
        instance.data === SUSPENSE_FALLBACK_START_DATA ||
        (instance.data === SUSPENSE_PENDING_START_DATA &&
          instance.ownerDocument.readyState === DOCUMENT_READY_STATE_COMPLETE)
      );
    }
    function registerSuspenseInstanceRetry(instance, callback) {
      var ownerDocument = instance.ownerDocument;
      if (
        instance.data !== SUSPENSE_PENDING_START_DATA ||
        ownerDocument.readyState === DOCUMENT_READY_STATE_COMPLETE
      )
        callback();
      else {
        var listener = function () {
          callback();
          ownerDocument.removeEventListener("DOMContentLoaded", listener);
        };
        ownerDocument.addEventListener("DOMContentLoaded", listener);
        instance._reactRetry = listener;
      }
    }
    function getNextHydratable(node) {
      for (; null != node; node = node.nextSibling) {
        var nodeType = node.nodeType;
        if (1 === nodeType || 3 === nodeType) break;
        if (8 === nodeType) {
          nodeType = node.data;
          if (
            nodeType === SUSPENSE_START_DATA ||
            nodeType === SUSPENSE_FALLBACK_START_DATA ||
            nodeType === SUSPENSE_PENDING_START_DATA ||
            nodeType === FORM_STATE_IS_MATCHING ||
            nodeType === FORM_STATE_IS_NOT_MATCHING
          )
            break;
          if (nodeType === SUSPENSE_END_DATA) return null;
        }
      }
      return node;
    }
    function describeHydratableInstanceForDevWarnings(instance) {
      if (1 === instance.nodeType) {
        for (
          var JSCompiler_temp_const = instance.nodeName.toLowerCase(),
            serverDifferences = {},
            attributes = instance.attributes,
            i = 0;
          i < attributes.length;
          i++
        ) {
          var attr = attributes[i];
          serverDifferences[getPropNameFromAttributeName(attr.name)] =
            "style" === attr.name.toLowerCase()
              ? getStylesObjectFromElement(instance)
              : attr.value;
        }
        return { type: JSCompiler_temp_const, props: serverDifferences };
      }
      return 8 === instance.nodeType
        ? { type: "Suspense", props: {} }
        : instance.nodeValue;
    }
    function diffHydratedTextForDevWarnings(textInstance, text, parentProps) {
      return null === parentProps ||
        !0 !== parentProps[SUPPRESS_HYDRATION_WARNING]
        ? (textInstance.nodeValue === text
            ? (textInstance = null)
            : ((text = normalizeMarkupForTextOrAttribute(text)),
              (textInstance =
                normalizeMarkupForTextOrAttribute(textInstance.nodeValue) ===
                text
                  ? null
                  : textInstance.nodeValue)),
          textInstance)
        : null;
    }
    function getNextHydratableInstanceAfterSuspenseInstance(suspenseInstance) {
      suspenseInstance = suspenseInstance.nextSibling;
      for (var depth = 0; suspenseInstance; ) {
        if (8 === suspenseInstance.nodeType) {
          var data = suspenseInstance.data;
          if (data === SUSPENSE_END_DATA) {
            if (0 === depth)
              return getNextHydratable(suspenseInstance.nextSibling);
            depth--;
          } else
            (data !== SUSPENSE_START_DATA &&
              data !== SUSPENSE_FALLBACK_START_DATA &&
              data !== SUSPENSE_PENDING_START_DATA) ||
              depth++;
        }
        suspenseInstance = suspenseInstance.nextSibling;
      }
      return null;
    }
    function getParentSuspenseInstance(targetInstance) {
      targetInstance = targetInstance.previousSibling;
      for (var depth = 0; targetInstance; ) {
        if (8 === targetInstance.nodeType) {
          var data = targetInstance.data;
          if (
            data === SUSPENSE_START_DATA ||
            data === SUSPENSE_FALLBACK_START_DATA ||
            data === SUSPENSE_PENDING_START_DATA
          ) {
            if (0 === depth) return targetInstance;
            depth--;
          } else data === SUSPENSE_END_DATA && depth++;
        }
        targetInstance = targetInstance.previousSibling;
      }
      return null;
    }
    function commitHydratedContainer(container) {
      retryIfBlockedOn(container);
    }
    function commitHydratedSuspenseInstance(suspenseInstance) {
      retryIfBlockedOn(suspenseInstance);
    }
    function resolveSingletonInstance(
      type,
      props,
      rootContainerInstance,
      hostContext,
      validateDOMNestingDev
    ) {
      validateDOMNestingDev &&
        validateDOMNesting(type, hostContext.ancestorInfo);
      props = getOwnerDocumentFromRootContainer(rootContainerInstance);
      switch (type) {
        case "html":
          type = props.documentElement;
          if (!type)
            throw Error(
              "React expected an <html> element (document.documentElement) to exist in the Document but one was not found. React never removes the documentElement for any Document it renders into so the cause is likely in some other script running on this page."
            );
          return type;
        case "head":
          type = props.head;
          if (!type)
            throw Error(
              "React expected a <head> element (document.head) to exist in the Document but one was not found. React never removes the head for any Document it renders into so the cause is likely in some other script running on this page."
            );
          return type;
        case "body":
          type = props.body;
          if (!type)
            throw Error(
              "React expected a <body> element (document.body) to exist in the Document but one was not found. React never removes the body for any Document it renders into so the cause is likely in some other script running on this page."
            );
          return type;
        default:
          throw Error(
            "resolveSingletonInstance was called with an element type that is not supported. This is a bug in React."
          );
      }
    }
    function acquireSingletonInstance(
      type,
      props,
      instance,
      internalInstanceHandle
    ) {
      if (getInstanceFromNode(instance)) {
        var tagName = instance.tagName.toLowerCase();
        console.error(
          "You are mounting a new %s component when a previous one has not first unmounted. It is an error to render more than one %s component at a time and attributes and children of these components will likely fail in unpredictable ways. Please only render a single instance of <%s> and if you need to mount a new one, ensure any previous ones have unmounted first.",
          tagName,
          tagName,
          tagName
        );
      }
      switch (type) {
        case "html":
        case "head":
        case "body":
          break;
        default:
          console.error(
            "acquireSingletonInstance was called with an element type that is not supported. This is a bug in React."
          );
      }
      for (tagName = instance.attributes; tagName.length; )
        instance.removeAttributeNode(tagName[0]);
      setInitialProperties(instance, type, props);
      instance[internalInstanceKey] = internalInstanceHandle;
      instance[internalPropsKey] = props;
    }
    function getHoistableRoot(container) {
      return "function" === typeof container.getRootNode
        ? container.getRootNode()
        : container.ownerDocument;
    }
    function preconnectAs(rel, href, crossOrigin) {
      var ownerDocument = globalDocument;
      if (ownerDocument && "string" === typeof href && href) {
        var limitedEscapedHref =
          escapeSelectorAttributeValueInsideDoubleQuotes(href);
        limitedEscapedHref =
          'link[rel="' + rel + '"][href="' + limitedEscapedHref + '"]';
        "string" === typeof crossOrigin &&
          (limitedEscapedHref += '[crossorigin="' + crossOrigin + '"]');
        preconnectsSet.has(limitedEscapedHref) ||
          (preconnectsSet.add(limitedEscapedHref),
          (rel = { rel: rel, crossOrigin: crossOrigin, href: href }),
          null === ownerDocument.querySelector(limitedEscapedHref) &&
            ((href = ownerDocument.createElement("link")),
            setInitialProperties(href, "link", rel),
            markNodeAsHoistable(href),
            ownerDocument.head.appendChild(href)));
      }
    }
    function getResource(type, currentProps, pendingProps, currentResource) {
      var resourceRoot = (resourceRoot = rootInstanceStackCursor.current)
        ? getHoistableRoot(resourceRoot)
        : null;
      if (!resourceRoot)
        throw Error(
          '"resourceRoot" was expected to exist. This is a bug in React.'
        );
      switch (type) {
        case "meta":
        case "title":
          return null;
        case "style":
          return "string" === typeof pendingProps.precedence &&
            "string" === typeof pendingProps.href
            ? ((pendingProps = getStyleKey(pendingProps.href)),
              (currentProps =
                getResourcesFromRoot(resourceRoot).hoistableStyles),
              (currentResource = currentProps.get(pendingProps)),
              currentResource ||
                ((currentResource = {
                  type: "style",
                  instance: null,
                  count: 0,
                  state: null
                }),
                currentProps.set(pendingProps, currentResource)),
              currentResource)
            : { type: "void", instance: null, count: 0, state: null };
        case "link":
          if (
            "stylesheet" === pendingProps.rel &&
            "string" === typeof pendingProps.href &&
            "string" === typeof pendingProps.precedence
          ) {
            type = getStyleKey(pendingProps.href);
            var _styles = getResourcesFromRoot(resourceRoot).hoistableStyles,
              _resource = _styles.get(type);
            if (
              !_resource &&
              ((resourceRoot = resourceRoot.ownerDocument || resourceRoot),
              (_resource = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: NotLoaded, preload: null }
              }),
              _styles.set(type, _resource),
              (_styles = resourceRoot.querySelector(
                getStylesheetSelectorFromKey(type)
              )) &&
                !_styles._p &&
                ((_resource.instance = _styles),
                (_resource.state.loading = Loaded | Inserted)),
              !preloadPropsMap.has(type))
            ) {
              var preloadProps = {
                rel: "preload",
                as: "style",
                href: pendingProps.href,
                crossOrigin: pendingProps.crossOrigin,
                integrity: pendingProps.integrity,
                media: pendingProps.media,
                hrefLang: pendingProps.hrefLang,
                referrerPolicy: pendingProps.referrerPolicy
              };
              preloadPropsMap.set(type, preloadProps);
              _styles ||
                preloadStylesheet(
                  resourceRoot,
                  type,
                  preloadProps,
                  _resource.state
                );
            }
            if (currentProps && null === currentResource)
              throw (
                ((pendingProps =
                  "\n\n  - " +
                  describeLinkForResourceErrorDEV(currentProps) +
                  "\n  + " +
                  describeLinkForResourceErrorDEV(pendingProps)),
                Error(
                  "Expected <link> not to update to be updated to a stylesheet with precedence. Check the `rel`, `href`, and `precedence` props of this component. Alternatively, check whether two different <link> components render in the same slot or share the same key." +
                    pendingProps
                ))
              );
            return _resource;
          }
          if (currentProps && null !== currentResource)
            throw (
              ((pendingProps =
                "\n\n  - " +
                describeLinkForResourceErrorDEV(currentProps) +
                "\n  + " +
                describeLinkForResourceErrorDEV(pendingProps)),
              Error(
                "Expected stylesheet with precedence to not be updated to a different kind of <link>. Check the `rel`, `href`, and `precedence` props of this component. Alternatively, check whether two different <link> components render in the same slot or share the same key." +
                  pendingProps
              ))
            );
          return null;
        case "script":
          return (
            (currentProps = pendingProps.async),
            (pendingProps = pendingProps.src),
            "string" === typeof pendingProps &&
            currentProps &&
            "function" !== typeof currentProps &&
            "symbol" !== typeof currentProps
              ? ((pendingProps = getScriptKey(pendingProps)),
                (currentProps =
                  getResourcesFromRoot(resourceRoot).hoistableScripts),
                (currentResource = currentProps.get(pendingProps)),
                currentResource ||
                  ((currentResource = {
                    type: "script",
                    instance: null,
                    count: 0,
                    state: null
                  }),
                  currentProps.set(pendingProps, currentResource)),
                currentResource)
              : { type: "void", instance: null, count: 0, state: null }
          );
        default:
          throw Error(
            'getResource encountered a type it did not expect: "' +
              type +
              '". this is a bug in React.'
          );
      }
    }
    function describeLinkForResourceErrorDEV(props) {
      var describedProps = 0,
        description = "<link";
      "string" === typeof props.rel
        ? (describedProps++, (description += ' rel="' + props.rel + '"'))
        : hasOwnProperty.call(props, "rel") &&
          (describedProps++,
          (description +=
            ' rel="' +
            (null === props.rel ? "null" : "invalid type " + typeof props.rel) +
            '"'));
      "string" === typeof props.href
        ? (describedProps++, (description += ' href="' + props.href + '"'))
        : hasOwnProperty.call(props, "href") &&
          (describedProps++,
          (description +=
            ' href="' +
            (null === props.href
              ? "null"
              : "invalid type " + typeof props.href) +
            '"'));
      "string" === typeof props.precedence
        ? (describedProps++,
          (description += ' precedence="' + props.precedence + '"'))
        : hasOwnProperty.call(props, "precedence") &&
          (describedProps++,
          (description +=
            " precedence={" +
            (null === props.precedence
              ? "null"
              : "invalid type " + typeof props.precedence) +
            "}"));
      Object.getOwnPropertyNames(props).length > describedProps &&
        (description += " ...");
      return description + " />";
    }
    function getStyleKey(href) {
      return (
        'href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"'
      );
    }
    function getStylesheetSelectorFromKey(key) {
      return 'link[rel="stylesheet"][' + key + "]";
    }
    function stylesheetPropsFromRawProps(rawProps) {
      return assign({}, rawProps, {
        "data-precedence": rawProps.precedence,
        precedence: null
      });
    }
    function preloadStylesheet(ownerDocument, key, preloadProps, state) {
      ownerDocument.querySelector(
        'link[rel="preload"][as="style"][' + key + "]"
      )
        ? (state.loading = Loaded)
        : ((key = ownerDocument.createElement("link")),
          (state.preload = key),
          key.addEventListener("load", function () {
            return (state.loading |= Loaded);
          }),
          key.addEventListener("error", function () {
            return (state.loading |= Errored);
          }),
          setInitialProperties(key, "link", preloadProps),
          markNodeAsHoistable(key),
          ownerDocument.head.appendChild(key));
    }
    function getScriptKey(src) {
      return (
        '[src="' + escapeSelectorAttributeValueInsideDoubleQuotes(src) + '"]'
      );
    }
    function getScriptSelectorFromKey(key) {
      return "script[async]" + key;
    }
    function acquireResource(hoistableRoot, resource, props) {
      resource.count++;
      if (null === resource.instance)
        switch (resource.type) {
          case "style":
            var instance = hoistableRoot.querySelector(
              'style[data-href~="' +
                escapeSelectorAttributeValueInsideDoubleQuotes(props.href) +
                '"]'
            );
            if (instance)
              return (
                (resource.instance = instance),
                markNodeAsHoistable(instance),
                instance
              );
            var styleProps = assign({}, props, {
              "data-href": props.href,
              "data-precedence": props.precedence,
              href: null,
              precedence: null
            });
            instance = (
              hoistableRoot.ownerDocument || hoistableRoot
            ).createElement("style");
            markNodeAsHoistable(instance);
            setInitialProperties(instance, "style", styleProps);
            insertStylesheet(instance, props.precedence, hoistableRoot);
            return (resource.instance = instance);
          case "stylesheet":
            styleProps = getStyleKey(props.href);
            var _instance = hoistableRoot.querySelector(
              getStylesheetSelectorFromKey(styleProps)
            );
            if (_instance)
              return (
                (resource.state.loading |= Inserted),
                (resource.instance = _instance),
                markNodeAsHoistable(_instance),
                _instance
              );
            instance = stylesheetPropsFromRawProps(props);
            (styleProps = preloadPropsMap.get(styleProps)) &&
              adoptPreloadPropsForStylesheet(instance, styleProps);
            _instance = (
              hoistableRoot.ownerDocument || hoistableRoot
            ).createElement("link");
            markNodeAsHoistable(_instance);
            var linkInstance = _instance;
            linkInstance._p = new Promise(function (resolve, reject) {
              linkInstance.onload = resolve;
              linkInstance.onerror = reject;
            });
            setInitialProperties(_instance, "link", instance);
            resource.state.loading |= Inserted;
            insertStylesheet(_instance, props.precedence, hoistableRoot);
            return (resource.instance = _instance);
          case "script":
            _instance = getScriptKey(props.src);
            if (
              (styleProps = hoistableRoot.querySelector(
                getScriptSelectorFromKey(_instance)
              ))
            )
              return (
                (resource.instance = styleProps),
                markNodeAsHoistable(styleProps),
                styleProps
              );
            instance = props;
            if ((styleProps = preloadPropsMap.get(_instance)))
              (instance = assign({}, props)),
                adoptPreloadPropsForScript(instance, styleProps);
            hoistableRoot = hoistableRoot.ownerDocument || hoistableRoot;
            styleProps = hoistableRoot.createElement("script");
            markNodeAsHoistable(styleProps);
            setInitialProperties(styleProps, "link", instance);
            hoistableRoot.head.appendChild(styleProps);
            return (resource.instance = styleProps);
          case "void":
            return null;
          default:
            throw Error(
              'acquireResource encountered a resource type it did not expect: "' +
                resource.type +
                '". this is a bug in React.'
            );
        }
      else
        "stylesheet" === resource.type &&
          (resource.state.loading & Inserted) === NotLoaded &&
          ((instance = resource.instance),
          (resource.state.loading |= Inserted),
          insertStylesheet(instance, props.precedence, hoistableRoot));
      return resource.instance;
    }
    function insertStylesheet(instance, precedence, root) {
      for (
        var nodes = root.querySelectorAll(
            'link[rel="stylesheet"][data-precedence],style[data-precedence]'
          ),
          last = nodes.length ? nodes[nodes.length - 1] : null,
          prior = last,
          i = 0;
        i < nodes.length;
        i++
      ) {
        var node = nodes[i];
        if (node.dataset.precedence === precedence) prior = node;
        else if (prior !== last) break;
      }
      prior
        ? prior.parentNode.insertBefore(instance, prior.nextSibling)
        : ((precedence = 9 === root.nodeType ? root.head : root),
          precedence.insertBefore(instance, precedence.firstChild));
    }
    function adoptPreloadPropsForStylesheet(stylesheetProps, preloadProps) {
      null == stylesheetProps.crossOrigin &&
        (stylesheetProps.crossOrigin = preloadProps.crossOrigin);
      null == stylesheetProps.referrerPolicy &&
        (stylesheetProps.referrerPolicy = preloadProps.referrerPolicy);
      null == stylesheetProps.title &&
        (stylesheetProps.title = preloadProps.title);
    }
    function adoptPreloadPropsForScript(scriptProps, preloadProps) {
      null == scriptProps.crossOrigin &&
        (scriptProps.crossOrigin = preloadProps.crossOrigin);
      null == scriptProps.referrerPolicy &&
        (scriptProps.referrerPolicy = preloadProps.referrerPolicy);
      null == scriptProps.integrity &&
        (scriptProps.integrity = preloadProps.integrity);
    }
    function getHydratableHoistableCache(type, keyAttribute, ownerDocument) {
      if (null === tagCaches) {
        var cache = new Map();
        var caches = (tagCaches = new Map());
        caches.set(ownerDocument, cache);
      } else
        (caches = tagCaches),
          (cache = caches.get(ownerDocument)),
          cache || ((cache = new Map()), caches.set(ownerDocument, cache));
      if (cache.has(type)) return cache;
      cache.set(type, null);
      ownerDocument = ownerDocument.getElementsByTagName(type);
      for (caches = 0; caches < ownerDocument.length; caches++) {
        var node = ownerDocument[caches];
        if (
          !(
            node[internalHoistableMarker] ||
            node[internalInstanceKey] ||
            ("link" === type && "stylesheet" === node.getAttribute("rel"))
          ) &&
          node.namespaceURI !== SVG_NAMESPACE
        ) {
          var nodeKey = node.getAttribute(keyAttribute) || "";
          nodeKey = type + nodeKey;
          var existing = cache.get(nodeKey);
          existing ? existing.push(node) : cache.set(nodeKey, [node]);
        }
      }
      return cache;
    }
    function mountHoistable(hoistableRoot, type, instance) {
      hoistableRoot = hoistableRoot.ownerDocument || hoistableRoot;
      hoistableRoot.head.insertBefore(
        instance,
        "title" === type ? hoistableRoot.querySelector("head > title") : null
      );
    }
    function isHostHoistableType(type, props, hostContext) {
      var outsideHostContainerContext =
        !hostContext.ancestorInfo.containerTagInScope;
      if (
        hostContext.context === HostContextNamespaceSvg ||
        null != props.itemProp
      )
        return (
          !outsideHostContainerContext ||
            null == props.itemProp ||
            ("meta" !== type &&
              "title" !== type &&
              "style" !== type &&
              "link" !== type &&
              "script" !== type) ||
            console.error(
              "Cannot render a <%s> outside the main document if it has an `itemProp` prop. `itemProp` suggests the tag belongs to an `itemScope` which can appear anywhere in the DOM. If you were intending for React to hoist this <%s> remove the `itemProp` prop. Otherwise, try moving this tag into the <head> or <body> of the Document.",
              type,
              type
            ),
          !1
        );
      switch (type) {
        case "meta":
        case "title":
          return !0;
        case "style":
          if (
            "string" !== typeof props.precedence ||
            "string" !== typeof props.href ||
            "" === props.href
          ) {
            outsideHostContainerContext &&
              console.error(
                'Cannot render a <style> outside the main document without knowing its precedence and a unique href key. React can hoist and deduplicate <style> tags if you provide a `precedence` prop along with an `href` prop that does not conflict with the `href` values used in any other hoisted <style> or <link rel="stylesheet" ...> tags.  Note that hoisting <style> tags is considered an advanced feature that most will not use directly. Consider moving the <style> tag to the <head> or consider adding a `precedence="default"` and `href="some unique resource identifier"`.'
              );
            break;
          }
          return !0;
        case "link":
          if (
            "string" !== typeof props.rel ||
            "string" !== typeof props.href ||
            "" === props.href ||
            props.onLoad ||
            props.onError
          ) {
            if (
              "stylesheet" === props.rel &&
              "string" === typeof props.precedence
            ) {
              type = props.href;
              var onError = props.onError,
                disabled = props.disabled;
              hostContext = [];
              props.onLoad && hostContext.push("`onLoad`");
              onError && hostContext.push("`onError`");
              null != disabled && hostContext.push("`disabled`");
              onError = propNamesListJoin(hostContext, "and");
              onError += 1 === hostContext.length ? " prop" : " props";
              disabled =
                1 === hostContext.length ? "an " + onError : "the " + onError;
              hostContext.length &&
                console.error(
                  'React encountered a <link rel="stylesheet" href="%s" ... /> with a `precedence` prop that also included %s. The presence of loading and error handlers indicates an intent to manage the stylesheet loading state from your from your Component code and React will not hoist or deduplicate this stylesheet. If your intent was to have React hoist and deduplciate this stylesheet using the `precedence` prop remove the %s, otherwise remove the `precedence` prop.',
                  type,
                  disabled,
                  onError
                );
            }
            outsideHostContainerContext &&
              ("string" !== typeof props.rel ||
              "string" !== typeof props.href ||
              "" === props.href
                ? console.error(
                    "Cannot render a <link> outside the main document without a `rel` and `href` prop. Try adding a `rel` and/or `href` prop to this <link> or moving the link into the <head> tag"
                  )
                : (props.onError || props.onLoad) &&
                  console.error(
                    "Cannot render a <link> with onLoad or onError listeners outside the main document. Try removing onLoad={...} and onError={...} or moving it into the root <head> tag or somewhere in the <body>."
                  ));
            break;
          }
          switch (props.rel) {
            case "stylesheet":
              return (
                (type = props.precedence),
                (props = props.disabled),
                "string" !== typeof type &&
                  outsideHostContainerContext &&
                  console.error(
                    'Cannot render a <link rel="stylesheet" /> outside the main document without knowing its precedence. Consider adding precedence="default" or moving it into the root <head> tag.'
                  ),
                "string" === typeof type && null == props
              );
            default:
              return !0;
          }
        case "script":
          type =
            props.async &&
            "function" !== typeof props.async &&
            "symbol" !== typeof props.async;
          if (
            !type ||
            props.onLoad ||
            props.onError ||
            !props.src ||
            "string" !== typeof props.src
          ) {
            outsideHostContainerContext &&
              (type
                ? props.onLoad || props.onError
                  ? console.error(
                      "Cannot render a <script> with onLoad or onError listeners outside the main document. Try removing onLoad={...} and onError={...} or moving it into the root <head> tag or somewhere in the <body>."
                    )
                  : console.error(
                      "Cannot render a <script> outside the main document without `async={true}` and a non-empty `src` prop. Ensure there is a valid `src` and either make the script async or move it into the root <head> tag or somewhere in the <body>."
                    )
                : console.error(
                    'Cannot render a sync or defer <script> outside the main document without knowing its order. Try adding async="" or moving it into the root <head> tag.'
                  ));
            break;
          }
          return !0;
        case "noscript":
        case "template":
          outsideHostContainerContext &&
            console.error(
              "Cannot render <%s> outside the main document. Try moving it into the root <head> tag.",
              type
            );
      }
      return !1;
    }
    function preloadResource(resource) {
      return "stylesheet" === resource.type &&
        (resource.state.loading & Settled) === NotLoaded
        ? !1
        : !0;
    }
    function noop$1() {}
    function suspendResource(hoistableRoot, resource, props) {
      if (null === suspendedState)
        throw Error(
          "Internal React Error: suspendedState null when it was expected to exists. Please report this as a React bug."
        );
      var state = suspendedState;
      if (
        "stylesheet" === resource.type &&
        ("string" !== typeof props.media ||
          !1 !== matchMedia(props.media).matches) &&
        (resource.state.loading & Inserted) === NotLoaded
      ) {
        if (null === resource.instance) {
          var key = getStyleKey(props.href),
            instance = hoistableRoot.querySelector(
              getStylesheetSelectorFromKey(key)
            );
          if (instance) {
            hoistableRoot = instance._p;
            null !== hoistableRoot &&
              "object" === typeof hoistableRoot &&
              "function" === typeof hoistableRoot.then &&
              (state.count++,
              (state = onUnsuspend.bind(state)),
              hoistableRoot.then(state, state));
            resource.state.loading |= Inserted;
            resource.instance = instance;
            markNodeAsHoistable(instance);
            return;
          }
          instance = hoistableRoot.ownerDocument || hoistableRoot;
          props = stylesheetPropsFromRawProps(props);
          (key = preloadPropsMap.get(key)) &&
            adoptPreloadPropsForStylesheet(props, key);
          instance = instance.createElement("link");
          markNodeAsHoistable(instance);
          var linkInstance = instance;
          linkInstance._p = new Promise(function (resolve, reject) {
            linkInstance.onload = resolve;
            linkInstance.onerror = reject;
          });
          setInitialProperties(instance, "link", props);
          resource.instance = instance;
        }
        null === state.stylesheets && (state.stylesheets = new Map());
        state.stylesheets.set(resource, hoistableRoot);
        (hoistableRoot = resource.state.preload) &&
          (resource.state.loading & Settled) === NotLoaded &&
          (state.count++,
          (resource = onUnsuspend.bind(state)),
          hoistableRoot.addEventListener("load", resource),
          hoistableRoot.addEventListener("error", resource));
      }
    }
    function waitForCommitToBeReady() {
      if (null === suspendedState)
        throw Error(
          "Internal React Error: suspendedState null when it was expected to exists. Please report this as a React bug."
        );
      var state = suspendedState;
      state.stylesheets &&
        0 === state.count &&
        insertSuspendedStylesheets(state, state.stylesheets);
      return 0 < state.count
        ? function (commit) {
            var stylesheetTimer = setTimeout(function () {
              state.stylesheets &&
                insertSuspendedStylesheets(state, state.stylesheets);
              if (state.unsuspend) {
                var unsuspend = state.unsuspend;
                state.unsuspend = null;
                unsuspend();
              }
            }, 6e4);
            state.unsuspend = commit;
            return function () {
              state.unsuspend = null;
              clearTimeout(stylesheetTimer);
            };
          }
        : null;
    }
    function onUnsuspend() {
      this.count--;
      if (0 === this.count)
        if (this.stylesheets)
          insertSuspendedStylesheets(this, this.stylesheets);
        else if (this.unsuspend) {
          var unsuspend = this.unsuspend;
          this.unsuspend = null;
          unsuspend();
        }
    }
    function insertSuspendedStylesheets(state, resources) {
      state.stylesheets = null;
      null !== state.unsuspend &&
        (state.count++,
        (precedencesByRoot = new Map()),
        resources.forEach(insertStylesheetIntoRoot, state),
        (precedencesByRoot = null),
        onUnsuspend.call(state));
    }
    function insertStylesheetIntoRoot(root, resource) {
      if (!(resource.state.loading & Inserted)) {
        var precedences = precedencesByRoot.get(root);
        if (precedences) var last = precedences.get(LAST_PRECEDENCE);
        else {
          precedences = new Map();
          precedencesByRoot.set(root, precedences);
          for (
            var nodes = root.querySelectorAll(
                "link[data-precedence],style[data-precedence]"
              ),
              i = 0;
            i < nodes.length;
            i++
          ) {
            var node = nodes[i];
            if (
              "LINK" === node.nodeName ||
              "not all" !== node.getAttribute("media")
            )
              precedences.set(node.dataset.precedence, node), (last = node);
          }
          last && precedences.set(LAST_PRECEDENCE, last);
        }
        nodes = resource.instance;
        node = nodes.getAttribute("data-precedence");
        i = precedences.get(node) || last;
        i === last && precedences.set(LAST_PRECEDENCE, nodes);
        precedences.set(node, nodes);
        this.count++;
        last = onUnsuspend.bind(this);
        nodes.addEventListener("load", last);
        nodes.addEventListener("error", last);
        i
          ? i.parentNode.insertBefore(nodes, i.nextSibling)
          : ((root = 9 === root.nodeType ? root.head : root),
            root.insertBefore(nodes, root.firstChild));
        resource.state.loading |= Inserted;
      }
    }
    function bindToConsole(methodName, args, badgeName) {
      var offset = 0;
      switch (methodName) {
        case "dir":
        case "dirxml":
        case "groupEnd":
        case "table":
          return bind.apply(console[methodName], [console].concat(args));
        case "assert":
          offset = 1;
      }
      args = args.slice(0);
      "string" === typeof args[offset]
        ? args.splice(
            offset,
            1,
            badgeFormat + args[offset],
            badgeStyle,
            pad + badgeName + pad,
            resetStyle
          )
        : args.splice(
            offset,
            0,
            badgeFormat,
            badgeStyle,
            pad + badgeName + pad,
            resetStyle
          );
      args.unshift(console);
      return bind.apply(console[methodName], args);
    }
    function FiberRootNode(
      containerInfo,
      tag,
      hydrate,
      identifierPrefix,
      onUncaughtError,
      onCaughtError,
      onRecoverableError,
      formState
    ) {
      this.tag = 1;
      this.containerInfo = containerInfo;
      this.finishedWork =
        this.pingCache =
        this.current =
        this.pendingChildren =
          null;
      this.timeoutHandle = noTimeout;
      this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null;
      this.callbackPriority = 0;
      this.expirationTimes = createLaneMap(-1);
      this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.finishedLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0;
      this.entanglements = createLaneMap(0);
      this.hiddenUpdates = createLaneMap(null);
      this.identifierPrefix = identifierPrefix;
      this.onUncaughtError = onUncaughtError;
      this.onCaughtError = onCaughtError;
      this.onRecoverableError = onRecoverableError;
      this.pooledCache = null;
      this.pooledCacheLanes = 0;
      this.formState = formState;
      this.incompleteTransitions = new Map();
      this.passiveEffectDuration = this.effectDuration = -0;
      this.memoizedUpdaters = new Set();
      containerInfo = this.pendingUpdatersLaneMap = [];
      for (tag = 0; 31 > tag; tag++) containerInfo.push(new Set());
      this._debugRootType = hydrate ? "hydrateRoot()" : "createRoot()";
    }
    function createFiberRoot(
      containerInfo,
      tag,
      hydrate,
      initialChildren,
      hydrationCallbacks,
      isStrictMode,
      identifierPrefix,
      onUncaughtError,
      onCaughtError,
      onRecoverableError,
      transitionCallbacks,
      formState
    ) {
      containerInfo = new FiberRootNode(
        containerInfo,
        tag,
        hydrate,
        identifierPrefix,
        onUncaughtError,
        onCaughtError,
        onRecoverableError,
        formState
      );
      tag = ConcurrentMode;
      !0 === isStrictMode && (tag |= StrictLegacyMode | StrictEffectsMode);
      isDevToolsPresent && (tag |= ProfileMode);
      isStrictMode = createFiber(3, null, null, tag);
      containerInfo.current = isStrictMode;
      isStrictMode.stateNode = containerInfo;
      tag = createCache();
      retainCache(tag);
      containerInfo.pooledCache = tag;
      retainCache(tag);
      isStrictMode.memoizedState = {
        element: initialChildren,
        isDehydrated: hydrate,
        cache: tag
      };
      initializeUpdateQueue(isStrictMode);
      return containerInfo;
    }
    function createPortal$1(children, containerInfo, implementation) {
      var key =
        3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
      willCoercionThrow(key) &&
        (console.error(
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          typeName(key)
        ),
        testStringCoercion(key));
      return {
        $$typeof: REACT_PORTAL_TYPE,
        key: null == key ? null : "" + key,
        children: children,
        containerInfo: containerInfo,
        implementation: implementation
      };
    }
    function getContextForSubtree(parentComponent) {
      if (!parentComponent) return emptyContextObject;
      parentComponent = emptyContextObject;
      return parentComponent;
    }
    function updateContainerSync(
      element,
      container,
      parentComponent,
      callback
    ) {
      0 === container.tag && flushPassiveEffects();
      updateContainerImpl(
        container.current,
        2,
        element,
        container,
        parentComponent,
        callback
      );
      return 2;
    }
    function updateContainerImpl(
      rootFiber,
      lane,
      element,
      container,
      parentComponent,
      callback
    ) {
      if (
        injectedHook &&
        "function" === typeof injectedHook.onScheduleFiberRoot
      )
        try {
          injectedHook.onScheduleFiberRoot(rendererID, container, element);
        } catch (err) {
          hasLoggedError ||
            ((hasLoggedError = !0),
            console.error(
              "React instrumentation encountered an error: %s",
              err
            ));
        }
      null !== injectedProfilingHooks &&
        "function" === typeof injectedProfilingHooks.markRenderScheduled &&
        injectedProfilingHooks.markRenderScheduled(lane);
      parentComponent = getContextForSubtree(parentComponent);
      null === container.context
        ? (container.context = parentComponent)
        : (container.pendingContext = parentComponent);
      isRendering &&
        null !== current &&
        !didWarnAboutNestedUpdates &&
        ((didWarnAboutNestedUpdates = !0),
        console.error(
          "Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.\n\nCheck the render method of %s.",
          getComponentNameFromFiber(current) || "Unknown"
        ));
      container = createUpdate(lane);
      container.payload = { element: element };
      callback = void 0 === callback ? null : callback;
      null !== callback &&
        ("function" !== typeof callback &&
          console.error(
            "Expected the last optional `callback` argument to be a function. Instead received: %s.",
            callback
          ),
        (container.callback = callback));
      element = enqueueUpdate(rootFiber, container, lane);
      null !== element &&
        (scheduleUpdateOnFiber(element, rootFiber, lane),
        entangleTransitions(element, rootFiber, lane));
    }
    function markRetryLaneImpl(fiber, retryLane) {
      fiber = fiber.memoizedState;
      if (null !== fiber && null !== fiber.dehydrated) {
        var a = fiber.retryLane;
        fiber.retryLane = 0 !== a && a < retryLane ? a : retryLane;
      }
    }
    function markRetryLaneIfNotHydrated(fiber, retryLane) {
      markRetryLaneImpl(fiber, retryLane);
      (fiber = fiber.alternate) && markRetryLaneImpl(fiber, retryLane);
    }
    function attemptContinuousHydration(fiber) {
      if (13 === fiber.tag) {
        var root = enqueueConcurrentRenderForLane(fiber, 67108864);
        null !== root && scheduleUpdateOnFiber(root, fiber, 67108864);
        markRetryLaneIfNotHydrated(fiber, 67108864);
      }
    }
    function getCurrentFiberForDevTools() {
      return current;
    }
    function getLaneLabelMap() {
      for (var map = new Map(), lane = 1, index = 0; 31 > index; index++) {
        var label = getLabelForLane(lane);
        map.set(lane, label);
        lane *= 2;
      }
      return map;
    }
    function dispatchDiscreteEvent(
      domEventName,
      eventSystemFlags,
      container,
      nativeEvent
    ) {
      var prevTransition = ReactSharedInternals.T;
      ReactSharedInternals.T = null;
      var previousPriority = ReactDOMSharedInternals.p;
      try {
        (ReactDOMSharedInternals.p = DiscreteEventPriority),
          dispatchEvent(domEventName, eventSystemFlags, container, nativeEvent);
      } finally {
        (ReactDOMSharedInternals.p = previousPriority),
          (ReactSharedInternals.T = prevTransition);
      }
    }
    function dispatchContinuousEvent(
      domEventName,
      eventSystemFlags,
      container,
      nativeEvent
    ) {
      var prevTransition = ReactSharedInternals.T;
      ReactSharedInternals.T = null;
      var previousPriority = ReactDOMSharedInternals.p;
      try {
        (ReactDOMSharedInternals.p = ContinuousEventPriority),
          dispatchEvent(domEventName, eventSystemFlags, container, nativeEvent);
      } finally {
        (ReactDOMSharedInternals.p = previousPriority),
          (ReactSharedInternals.T = prevTransition);
      }
    }
    function dispatchEvent(
      domEventName,
      eventSystemFlags,
      targetContainer,
      nativeEvent
    ) {
      if (_enabled) {
        var blockedOn = findInstanceBlockingEvent(nativeEvent);
        if (null === blockedOn)
          dispatchEventForPluginEventSystem(
            domEventName,
            eventSystemFlags,
            nativeEvent,
            return_targetInst,
            targetContainer
          ),
            clearIfContinuousEvent(domEventName, nativeEvent);
        else if (
          queueIfContinuousEvent(
            blockedOn,
            domEventName,
            eventSystemFlags,
            targetContainer,
            nativeEvent
          )
        )
          nativeEvent.stopPropagation();
        else if (
          (clearIfContinuousEvent(domEventName, nativeEvent),
          eventSystemFlags & 4 &&
            -1 < discreteReplayableEvents.indexOf(domEventName))
        ) {
          for (; null !== blockedOn; ) {
            var fiber = getInstanceFromNode(blockedOn);
            if (null !== fiber)
              switch (fiber.tag) {
                case 3:
                  fiber = fiber.stateNode;
                  if (fiber.current.memoizedState.isDehydrated) {
                    var lanes = getHighestPriorityLanes(fiber.pendingLanes);
                    if (0 !== lanes) {
                      var root = fiber;
                      root.pendingLanes |= 2;
                      for (root.entangledLanes |= 2; lanes; ) {
                        var lane = 1 << (31 - clz32(lanes));
                        root.entanglements[1] |= lane;
                        lanes &= ~lane;
                      }
                      ensureRootIsScheduled(fiber);
                      (executionContext & (RenderContext | CommitContext)) ===
                        NoContext &&
                        ((workInProgressRootRenderTargetTime =
                          now$1() + RENDER_TIMEOUT_MS),
                        flushSyncWorkAcrossRoots_impl(0, !1));
                    }
                  }
                  break;
                case 13:
                  (root = enqueueConcurrentRenderForLane(fiber, 2)),
                    null !== root && scheduleUpdateOnFiber(root, fiber, 2),
                    flushSyncWork$1(),
                    markRetryLaneIfNotHydrated(fiber, 2);
              }
            fiber = findInstanceBlockingEvent(nativeEvent);
            null === fiber &&
              dispatchEventForPluginEventSystem(
                domEventName,
                eventSystemFlags,
                nativeEvent,
                return_targetInst,
                targetContainer
              );
            if (fiber === blockedOn) break;
            blockedOn = fiber;
          }
          null !== blockedOn && nativeEvent.stopPropagation();
        } else
          dispatchEventForPluginEventSystem(
            domEventName,
            eventSystemFlags,
            nativeEvent,
            null,
            targetContainer
          );
      }
    }
    function findInstanceBlockingEvent(nativeEvent) {
      nativeEvent = getEventTarget(nativeEvent);
      return findInstanceBlockingTarget(nativeEvent);
    }
    function findInstanceBlockingTarget(targetNode) {
      return_targetInst = null;
      targetNode = getClosestInstanceFromNode(targetNode);
      if (null !== targetNode) {
        var nearestMounted = getNearestMountedFiber(targetNode);
        if (null === nearestMounted) targetNode = null;
        else {
          var tag = nearestMounted.tag;
          if (13 === tag) {
            targetNode = getSuspenseInstanceFromFiber(nearestMounted);
            if (null !== targetNode) return targetNode;
            targetNode = null;
          } else if (3 === tag) {
            if (nearestMounted.stateNode.current.memoizedState.isDehydrated)
              return 3 === nearestMounted.tag
                ? nearestMounted.stateNode.containerInfo
                : null;
            targetNode = null;
          } else nearestMounted !== targetNode && (targetNode = null);
        }
      }
      return_targetInst = targetNode;
      return null;
    }
    function getEventPriority(domEventName) {
      switch (domEventName) {
        case "beforetoggle":
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "toggle":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
          return DiscreteEventPriority;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return ContinuousEventPriority;
        case "message":
          switch (getCurrentPriorityLevel()) {
            case ImmediatePriority:
              return DiscreteEventPriority;
            case UserBlockingPriority:
              return ContinuousEventPriority;
            case NormalPriority$1:
            case LowPriority:
              return DefaultEventPriority;
            case IdlePriority:
              return IdleEventPriority;
            default:
              return DefaultEventPriority;
          }
        default:
          return DefaultEventPriority;
      }
    }
    function clearIfContinuousEvent(domEventName, nativeEvent) {
      switch (domEventName) {
        case "focusin":
        case "focusout":
          queuedFocus = null;
          break;
        case "dragenter":
        case "dragleave":
          queuedDrag = null;
          break;
        case "mouseover":
        case "mouseout":
          queuedMouse = null;
          break;
        case "pointerover":
        case "pointerout":
          queuedPointers.delete(nativeEvent.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          queuedPointerCaptures.delete(nativeEvent.pointerId);
      }
    }
    function accumulateOrCreateContinuousQueuedReplayableEvent(
      existingQueuedEvent,
      blockedOn,
      domEventName,
      eventSystemFlags,
      targetContainer,
      nativeEvent
    ) {
      if (
        null === existingQueuedEvent ||
        existingQueuedEvent.nativeEvent !== nativeEvent
      )
        return (
          (existingQueuedEvent = {
            blockedOn: blockedOn,
            domEventName: domEventName,
            eventSystemFlags: eventSystemFlags,
            nativeEvent: nativeEvent,
            targetContainers: [targetContainer]
          }),
          null !== blockedOn &&
            ((blockedOn = getInstanceFromNode(blockedOn)),
            null !== blockedOn && attemptContinuousHydration(blockedOn)),
          existingQueuedEvent
        );
      existingQueuedEvent.eventSystemFlags |= eventSystemFlags;
      blockedOn = existingQueuedEvent.targetContainers;
      null !== targetContainer &&
        -1 === blockedOn.indexOf(targetContainer) &&
        blockedOn.push(targetContainer);
      return existingQueuedEvent;
    }
    function queueIfContinuousEvent(
      blockedOn,
      domEventName,
      eventSystemFlags,
      targetContainer,
      nativeEvent
    ) {
      switch (domEventName) {
        case "focusin":
          return (
            (queuedFocus = accumulateOrCreateContinuousQueuedReplayableEvent(
              queuedFocus,
              blockedOn,
              domEventName,
              eventSystemFlags,
              targetContainer,
              nativeEvent
            )),
            !0
          );
        case "dragenter":
          return (
            (queuedDrag = accumulateOrCreateContinuousQueuedReplayableEvent(
              queuedDrag,
              blockedOn,
              domEventName,
              eventSystemFlags,
              targetContainer,
              nativeEvent
            )),
            !0
          );
        case "mouseover":
          return (
            (queuedMouse = accumulateOrCreateContinuousQueuedReplayableEvent(
              queuedMouse,
              blockedOn,
              domEventName,
              eventSystemFlags,
              targetContainer,
              nativeEvent
            )),
            !0
          );
        case "pointerover":
          var pointerId = nativeEvent.pointerId;
          queuedPointers.set(
            pointerId,
            accumulateOrCreateContinuousQueuedReplayableEvent(
              queuedPointers.get(pointerId) || null,
              blockedOn,
              domEventName,
              eventSystemFlags,
              targetContainer,
              nativeEvent
            )
          );
          return !0;
        case "gotpointercapture":
          return (
            (pointerId = nativeEvent.pointerId),
            queuedPointerCaptures.set(
              pointerId,
              accumulateOrCreateContinuousQueuedReplayableEvent(
                queuedPointerCaptures.get(pointerId) || null,
                blockedOn,
                domEventName,
                eventSystemFlags,
                targetContainer,
                nativeEvent
              )
            ),
            !0
          );
      }
      return !1;
    }
    function attemptExplicitHydrationTarget(queuedTarget) {
      var targetInst = getClosestInstanceFromNode(queuedTarget.target);
      if (null !== targetInst) {
        var nearestMounted = getNearestMountedFiber(targetInst);
        if (null !== nearestMounted)
          if (((targetInst = nearestMounted.tag), 13 === targetInst)) {
            if (
              ((targetInst = getSuspenseInstanceFromFiber(nearestMounted)),
              null !== targetInst)
            ) {
              queuedTarget.blockedOn = targetInst;
              runWithPriority(queuedTarget.priority, function () {
                if (13 === nearestMounted.tag) {
                  var lane = requestUpdateLane(nearestMounted),
                    root = enqueueConcurrentRenderForLane(nearestMounted, lane);
                  null !== root &&
                    scheduleUpdateOnFiber(root, nearestMounted, lane);
                  markRetryLaneIfNotHydrated(nearestMounted, lane);
                }
              });
              return;
            }
          } else if (
            3 === targetInst &&
            nearestMounted.stateNode.current.memoizedState.isDehydrated
          ) {
            queuedTarget.blockedOn =
              3 === nearestMounted.tag
                ? nearestMounted.stateNode.containerInfo
                : null;
            return;
          }
      }
      queuedTarget.blockedOn = null;
    }
    function attemptReplayContinuousQueuedEvent(queuedEvent) {
      if (null !== queuedEvent.blockedOn) return !1;
      for (
        var targetContainers = queuedEvent.targetContainers;
        0 < targetContainers.length;

      ) {
        var nextBlockedOn = findInstanceBlockingEvent(queuedEvent.nativeEvent);
        if (null === nextBlockedOn) {
          nextBlockedOn = queuedEvent.nativeEvent;
          var nativeEventClone = new nextBlockedOn.constructor(
              nextBlockedOn.type,
              nextBlockedOn
            ),
            event = nativeEventClone;
          null !== currentReplayingEvent &&
            console.error(
              "Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."
            );
          currentReplayingEvent = event;
          nextBlockedOn.target.dispatchEvent(nativeEventClone);
          null === currentReplayingEvent &&
            console.error(
              "Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."
            );
          currentReplayingEvent = null;
        } else
          return (
            (targetContainers = getInstanceFromNode(nextBlockedOn)),
            null !== targetContainers &&
              attemptContinuousHydration(targetContainers),
            (queuedEvent.blockedOn = nextBlockedOn),
            !1
          );
        targetContainers.shift();
      }
      return !0;
    }
    function attemptReplayContinuousQueuedEventInMap(queuedEvent, key, map) {
      attemptReplayContinuousQueuedEvent(queuedEvent) && map.delete(key);
    }
    function replayUnblockedEvents() {
      hasScheduledReplayAttempt = !1;
      null !== queuedFocus &&
        attemptReplayContinuousQueuedEvent(queuedFocus) &&
        (queuedFocus = null);
      null !== queuedDrag &&
        attemptReplayContinuousQueuedEvent(queuedDrag) &&
        (queuedDrag = null);
      null !== queuedMouse &&
        attemptReplayContinuousQueuedEvent(queuedMouse) &&
        (queuedMouse = null);
      queuedPointers.forEach(attemptReplayContinuousQueuedEventInMap);
      queuedPointerCaptures.forEach(attemptReplayContinuousQueuedEventInMap);
    }
    function scheduleCallbackIfUnblocked(queuedEvent, unblocked) {
      queuedEvent.blockedOn === unblocked &&
        ((queuedEvent.blockedOn = null),
        hasScheduledReplayAttempt ||
          ((hasScheduledReplayAttempt = !0),
          Scheduler.unstable_scheduleCallback(
            Scheduler.unstable_NormalPriority,
            replayUnblockedEvents
          )));
    }
    function scheduleReplayQueueIfNeeded(formReplayingQueue) {
      lastScheduledReplayQueue !== formReplayingQueue &&
        ((lastScheduledReplayQueue = formReplayingQueue),
        Scheduler.unstable_scheduleCallback(
          Scheduler.unstable_NormalPriority,
          function () {
            lastScheduledReplayQueue === formReplayingQueue &&
              (lastScheduledReplayQueue = null);
            for (var i = 0; i < formReplayingQueue.length; i += 3) {
              var form = formReplayingQueue[i],
                submitterOrAction = formReplayingQueue[i + 1],
                formData = formReplayingQueue[i + 2];
              if ("function" !== typeof submitterOrAction)
                if (
                  null === findInstanceBlockingTarget(submitterOrAction || form)
                )
                  continue;
                else break;
              var formInst = getInstanceFromNode(form);
              null !== formInst &&
                (formReplayingQueue.splice(i, 3),
                (i -= 3),
                (form = {
                  pending: !0,
                  data: formData,
                  method: form.method,
                  action: submitterOrAction
                }),
                Object.freeze(form),
                startHostTransition(
                  formInst,
                  form,
                  submitterOrAction,
                  formData
                ));
            }
          }
        ));
    }
    function retryIfBlockedOn(unblocked) {
      function unblock(queuedEvent) {
        return scheduleCallbackIfUnblocked(queuedEvent, unblocked);
      }
      null !== queuedFocus &&
        scheduleCallbackIfUnblocked(queuedFocus, unblocked);
      null !== queuedDrag && scheduleCallbackIfUnblocked(queuedDrag, unblocked);
      null !== queuedMouse &&
        scheduleCallbackIfUnblocked(queuedMouse, unblocked);
      queuedPointers.forEach(unblock);
      queuedPointerCaptures.forEach(unblock);
      for (var i = 0; i < queuedExplicitHydrationTargets.length; i++) {
        var queuedTarget = queuedExplicitHydrationTargets[i];
        queuedTarget.blockedOn === unblocked && (queuedTarget.blockedOn = null);
      }
      for (
        ;
        0 < queuedExplicitHydrationTargets.length &&
        ((i = queuedExplicitHydrationTargets[0]), null === i.blockedOn);

      )
        attemptExplicitHydrationTarget(i),
          null === i.blockedOn && queuedExplicitHydrationTargets.shift();
      i = (unblocked.ownerDocument || unblocked).$$reactFormReplay;
      if (null != i)
        for (queuedTarget = 0; queuedTarget < i.length; queuedTarget += 3) {
          var form = i[queuedTarget],
            submitterOrAction = i[queuedTarget + 1],
            formProps = form[internalPropsKey] || null;
          if ("function" === typeof submitterOrAction)
            formProps || scheduleReplayQueueIfNeeded(i);
          else if (formProps) {
            var action = null;
            if (
              submitterOrAction &&
              submitterOrAction.hasAttribute("formAction")
            )
              if (
                ((form = submitterOrAction),
                (formProps = submitterOrAction[internalPropsKey] || null))
              )
                action = formProps.formAction;
              else {
                if (null !== findInstanceBlockingTarget(form)) continue;
              }
            else action = formProps.action;
            "function" === typeof action
              ? (i[queuedTarget + 1] = action)
              : (i.splice(queuedTarget, 3), (queuedTarget -= 3));
            scheduleReplayQueueIfNeeded(i);
          }
        }
    }
    function ReactDOMRoot(internalRoot) {
      this._internalRoot = internalRoot;
    }
    function ReactDOMHydrationRoot(internalRoot) {
      this._internalRoot = internalRoot;
    }
    function warnIfReactDOMContainerInDEV(container) {
      container[internalContainerInstanceKey] &&
        (container._reactRootContainer
          ? console.error(
              "You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported."
            )
          : console.error(
              "You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."
            ));
    }
    function noop() {}
    function getCrossOriginStringAs(as, input) {
      if ("font" === as) return "";
      if ("string" === typeof input)
        return "use-credentials" === input ? input : "";
    }
    function getValueDescriptorExpectingObjectForWarning(thing) {
      return null === thing
        ? "`null`"
        : void 0 === thing
          ? "`undefined`"
          : "" === thing
            ? "an empty string"
            : 'something with type "' + typeof thing + '"';
    }
    function getValueDescriptorExpectingEnumForWarning(thing) {
      return null === thing
        ? "`null`"
        : void 0 === thing
          ? "`undefined`"
          : "" === thing
            ? "an empty string"
            : "string" === typeof thing
              ? JSON.stringify(thing)
              : "number" === typeof thing
                ? "`" + thing + "`"
                : 'something with type "' + typeof thing + '"';
    }
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
      "function" ===
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart &&
      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var Scheduler = require("scheduler"),
      React = require("react"),
      ReactDOM = require("react-dom"),
      REACT_LEGACY_ELEMENT_TYPE = Symbol.for("react.element"),
      REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
      REACT_PORTAL_TYPE = Symbol.for("react.portal"),
      REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"),
      REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"),
      REACT_PROFILER_TYPE = Symbol.for("react.profiler"),
      REACT_PROVIDER_TYPE = Symbol.for("react.provider"),
      REACT_CONSUMER_TYPE = Symbol.for("react.consumer"),
      REACT_CONTEXT_TYPE = Symbol.for("react.context"),
      REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"),
      REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"),
      REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"),
      REACT_MEMO_TYPE = Symbol.for("react.memo"),
      REACT_LAZY_TYPE = Symbol.for("react.lazy");
    Symbol.for("react.scope");
    Symbol.for("react.debug_trace_mode");
    var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
    Symbol.for("react.legacy_hidden");
    Symbol.for("react.tracing_marker");
    var REACT_MEMO_CACHE_SENTINEL = Symbol.for("react.memo_cache_sentinel"),
      MAYBE_ITERATOR_SYMBOL = Symbol.iterator,
      REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"),
      ReactSharedInternals =
        React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
      assign = Object.assign,
      disabledDepth = 0,
      prevLog,
      prevInfo,
      prevWarn,
      prevError,
      prevGroup,
      prevGroupCollapsed,
      prevGroupEnd;
    disabledLog.__reactDisabledLog = !0;
    var prefix,
      suffix,
      reentry = !1;
    var componentFrameCache = new (
      "function" === typeof WeakMap ? WeakMap : Map
    )();
    var current = null,
      isRendering = !1,
      isArrayImpl = Array.isArray,
      ReactDOMSharedInternals =
        ReactDOM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
      NotPending = Object.freeze({
        pending: !1,
        data: null,
        method: null,
        action: null
      }),
      valueStack = [];
    var fiberStack = [];
    var index$jscomp$0 = -1,
      contextStackCursor = createCursor(null),
      contextFiberStackCursor = createCursor(null),
      rootInstanceStackCursor = createCursor(null),
      hostTransitionProviderCursor = createCursor(null),
      hasOwnProperty = Object.prototype.hasOwnProperty,
      scheduleCallback$3 = Scheduler.unstable_scheduleCallback,
      cancelCallback$1 = Scheduler.unstable_cancelCallback,
      shouldYield = Scheduler.unstable_shouldYield,
      requestPaint = Scheduler.unstable_requestPaint,
      now$1 = Scheduler.unstable_now,
      getCurrentPriorityLevel = Scheduler.unstable_getCurrentPriorityLevel,
      ImmediatePriority = Scheduler.unstable_ImmediatePriority,
      UserBlockingPriority = Scheduler.unstable_UserBlockingPriority,
      NormalPriority$1 = Scheduler.unstable_NormalPriority,
      LowPriority = Scheduler.unstable_LowPriority,
      IdlePriority = Scheduler.unstable_IdlePriority,
      log$1 = Scheduler.log,
      unstable_setDisableYieldValue = Scheduler.unstable_setDisableYieldValue,
      rendererID = null,
      injectedHook = null,
      injectedProfilingHooks = null,
      hasLoggedError = !1,
      isDevToolsPresent = "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__,
      clz32 = Math.clz32 ? Math.clz32 : clz32Fallback,
      log = Math.log,
      LN2 = Math.LN2,
      nextTransitionLane = 128,
      nextRetryLane = 4194304,
      DiscreteEventPriority = 2,
      ContinuousEventPriority = 8,
      DefaultEventPriority = 32,
      IdleEventPriority = 268435456,
      randomKey = Math.random().toString(36).slice(2),
      internalInstanceKey = "__reactFiber$" + randomKey,
      internalPropsKey = "__reactProps$" + randomKey,
      internalContainerInstanceKey = "__reactContainer$" + randomKey,
      internalEventHandlersKey = "__reactEvents$" + randomKey,
      internalEventHandlerListenersKey = "__reactListeners$" + randomKey,
      internalEventHandlesSetKey = "__reactHandles$" + randomKey,
      internalRootNodeResourcesKey = "__reactResources$" + randomKey,
      internalHoistableMarker = "__reactMarker$" + randomKey,
      allNativeEvents = new Set(),
      registrationNameDependencies = {},
      possibleRegistrationNames = {},
      canUseDOM = !(
        "undefined" === typeof window ||
        "undefined" === typeof window.document ||
        "undefined" === typeof window.document.createElement
      ),
      hasReadOnlyValue = {
        button: !0,
        checkbox: !0,
        image: !0,
        hidden: !0,
        radio: !0,
        reset: !0,
        submit: !0
      },
      VALID_ATTRIBUTE_NAME_REGEX = RegExp(
        "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
      ),
      illegalAttributeNameCache = {},
      validatedAttributeNameCache = {},
      escapeSelectorAttributeValueInsideDoubleQuotesRegex = /[\n"\\]/g,
      didWarnValueDefaultValue$1 = !1,
      didWarnCheckedDefaultChecked = !1,
      didWarnSelectedSetOnOption = !1,
      didWarnInvalidChild = !1,
      didWarnInvalidInnerHTML = !1;
    var didWarnValueDefaultValue = !1;
    var valuePropNames = ["value", "defaultValue"],
      didWarnValDefaultVal = !1,
      needsEscaping = /["'&<>\n\t]|^\s|\s$/,
      specialTags =
        "address applet area article aside base basefont bgsound blockquote body br button caption center col colgroup dd details dir div dl dt embed fieldset figcaption figure footer form frame frameset h1 h2 h3 h4 h5 h6 head header hgroup hr html iframe img input isindex li link listing main marquee menu menuitem meta nav noembed noframes noscript object ol p param plaintext pre script section select source style summary table tbody td template textarea tfoot th thead title tr track ul wbr xmp".split(
          " "
        ),
      inScopeTags =
        "applet caption html table td th marquee object template foreignObject desc title".split(
          " "
        ),
      buttonScopeTags = inScopeTags.concat(["button"]),
      impliedEndTags = "dd dt li option optgroup p rp rt".split(" "),
      emptyAncestorInfoDev = {
        current: null,
        formTag: null,
        aTagInScope: null,
        buttonTagInScope: null,
        nobrTagInScope: null,
        pTagInButtonScope: null,
        listItemTagAutoclosing: null,
        dlItemTagAutoclosing: null,
        containerTagInScope: null
      },
      didWarn = {},
      MATH_NAMESPACE = "http://www.w3.org/1998/Math/MathML",
      SVG_NAMESPACE = "http://www.w3.org/2000/svg",
      shorthandToLonghand = {
        animation:
          "animationDelay animationDirection animationDuration animationFillMode animationIterationCount animationName animationPlayState animationTimingFunction".split(
            " "
          ),
        background:
          "backgroundAttachment backgroundClip backgroundColor backgroundImage backgroundOrigin backgroundPositionX backgroundPositionY backgroundRepeat backgroundSize".split(
            " "
          ),
        backgroundPosition: ["backgroundPositionX", "backgroundPositionY"],
        border:
          "borderBottomColor borderBottomStyle borderBottomWidth borderImageOutset borderImageRepeat borderImageSlice borderImageSource borderImageWidth borderLeftColor borderLeftStyle borderLeftWidth borderRightColor borderRightStyle borderRightWidth borderTopColor borderTopStyle borderTopWidth".split(
            " "
          ),
        borderBlockEnd: [
          "borderBlockEndColor",
          "borderBlockEndStyle",
          "borderBlockEndWidth"
        ],
        borderBlockStart: [
          "borderBlockStartColor",
          "borderBlockStartStyle",
          "borderBlockStartWidth"
        ],
        borderBottom: [
          "borderBottomColor",
          "borderBottomStyle",
          "borderBottomWidth"
        ],
        borderColor: [
          "borderBottomColor",
          "borderLeftColor",
          "borderRightColor",
          "borderTopColor"
        ],
        borderImage: [
          "borderImageOutset",
          "borderImageRepeat",
          "borderImageSlice",
          "borderImageSource",
          "borderImageWidth"
        ],
        borderInlineEnd: [
          "borderInlineEndColor",
          "borderInlineEndStyle",
          "borderInlineEndWidth"
        ],
        borderInlineStart: [
          "borderInlineStartColor",
          "borderInlineStartStyle",
          "borderInlineStartWidth"
        ],
        borderLeft: ["borderLeftColor", "borderLeftStyle", "borderLeftWidth"],
        borderRadius: [
          "borderBottomLeftRadius",
          "borderBottomRightRadius",
          "borderTopLeftRadius",
          "borderTopRightRadius"
        ],
        borderRight: [
          "borderRightColor",
          "borderRightStyle",
          "borderRightWidth"
        ],
        borderStyle: [
          "borderBottomStyle",
          "borderLeftStyle",
          "borderRightStyle",
          "borderTopStyle"
        ],
        borderTop: ["borderTopColor", "borderTopStyle", "borderTopWidth"],
        borderWidth: [
          "borderBottomWidth",
          "borderLeftWidth",
          "borderRightWidth",
          "borderTopWidth"
        ],
        columnRule: ["columnRuleColor", "columnRuleStyle", "columnRuleWidth"],
        columns: ["columnCount", "columnWidth"],
        flex: ["flexBasis", "flexGrow", "flexShrink"],
        flexFlow: ["flexDirection", "flexWrap"],
        font: "fontFamily fontFeatureSettings fontKerning fontLanguageOverride fontSize fontSizeAdjust fontStretch fontStyle fontVariant fontVariantAlternates fontVariantCaps fontVariantEastAsian fontVariantLigatures fontVariantNumeric fontVariantPosition fontWeight lineHeight".split(
          " "
        ),
        fontVariant:
          "fontVariantAlternates fontVariantCaps fontVariantEastAsian fontVariantLigatures fontVariantNumeric fontVariantPosition".split(
            " "
          ),
        gap: ["columnGap", "rowGap"],
        grid: "gridAutoColumns gridAutoFlow gridAutoRows gridTemplateAreas gridTemplateColumns gridTemplateRows".split(
          " "
        ),
        gridArea: [
          "gridColumnEnd",
          "gridColumnStart",
          "gridRowEnd",
          "gridRowStart"
        ],
        gridColumn: ["gridColumnEnd", "gridColumnStart"],
        gridColumnGap: ["columnGap"],
        gridGap: ["columnGap", "rowGap"],
        gridRow: ["gridRowEnd", "gridRowStart"],
        gridRowGap: ["rowGap"],
        gridTemplate: [
          "gridTemplateAreas",
          "gridTemplateColumns",
          "gridTemplateRows"
        ],
        listStyle: ["listStyleImage", "listStylePosition", "listStyleType"],
        margin: ["marginBottom", "marginLeft", "marginRight", "marginTop"],
        marker: ["markerEnd", "markerMid", "markerStart"],
        mask: "maskClip maskComposite maskImage maskMode maskOrigin maskPositionX maskPositionY maskRepeat maskSize".split(
          " "
        ),
        maskPosition: ["maskPositionX", "maskPositionY"],
        outline: ["outlineColor", "outlineStyle", "outlineWidth"],
        overflow: ["overflowX", "overflowY"],
        padding: ["paddingBottom", "paddingLeft", "paddingRight", "paddingTop"],
        placeContent: ["alignContent", "justifyContent"],
        placeItems: ["alignItems", "justifyItems"],
        placeSelf: ["alignSelf", "justifySelf"],
        textDecoration: [
          "textDecorationColor",
          "textDecorationLine",
          "textDecorationStyle"
        ],
        textEmphasis: ["textEmphasisColor", "textEmphasisStyle"],
        transition: [
          "transitionDelay",
          "transitionDuration",
          "transitionProperty",
          "transitionTimingFunction"
        ],
        wordWrap: ["overflowWrap"]
      },
      uppercasePattern = /([A-Z])/g,
      msPattern$1 = /^ms-/,
      badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/,
      msPattern = /^-ms-/,
      hyphenPattern = /-(.)/g,
      badStyleValueWithSemicolonPattern = /;\s*$/,
      warnedStyleNames = {},
      warnedStyleValues = {},
      warnedForNaNValue = !1,
      warnedForInfinityValue = !1,
      unitlessNumbers = new Set(
        "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
          " "
        )
      ),
      aliases = new Map([
        ["acceptCharset", "accept-charset"],
        ["htmlFor", "for"],
        ["httpEquiv", "http-equiv"],
        ["crossOrigin", "crossorigin"],
        ["accentHeight", "accent-height"],
        ["alignmentBaseline", "alignment-baseline"],
        ["arabicForm", "arabic-form"],
        ["baselineShift", "baseline-shift"],
        ["capHeight", "cap-height"],
        ["clipPath", "clip-path"],
        ["clipRule", "clip-rule"],
        ["colorInterpolation", "color-interpolation"],
        ["colorInterpolationFilters", "color-interpolation-filters"],
        ["colorProfile", "color-profile"],
        ["colorRendering", "color-rendering"],
        ["dominantBaseline", "dominant-baseline"],
        ["enableBackground", "enable-background"],
        ["fillOpacity", "fill-opacity"],
        ["fillRule", "fill-rule"],
        ["floodColor", "flood-color"],
        ["floodOpacity", "flood-opacity"],
        ["fontFamily", "font-family"],
        ["fontSize", "font-size"],
        ["fontSizeAdjust", "font-size-adjust"],
        ["fontStretch", "font-stretch"],
        ["fontStyle", "font-style"],
        ["fontVariant", "font-variant"],
        ["fontWeight", "font-weight"],
        ["glyphName", "glyph-name"],
        ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
        ["glyphOrientationVertical", "glyph-orientation-vertical"],
        ["horizAdvX", "horiz-adv-x"],
        ["horizOriginX", "horiz-origin-x"],
        ["imageRendering", "image-rendering"],
        ["letterSpacing", "letter-spacing"],
        ["lightingColor", "lighting-color"],
        ["markerEnd", "marker-end"],
        ["markerMid", "marker-mid"],
        ["markerStart", "marker-start"],
        ["overlinePosition", "overline-position"],
        ["overlineThickness", "overline-thickness"],
        ["paintOrder", "paint-order"],
        ["panose-1", "panose-1"],
        ["pointerEvents", "pointer-events"],
        ["renderingIntent", "rendering-intent"],
        ["shapeRendering", "shape-rendering"],
        ["stopColor", "stop-color"],
        ["stopOpacity", "stop-opacity"],
        ["strikethroughPosition", "strikethrough-position"],
        ["strikethroughThickness", "strikethrough-thickness"],
        ["strokeDasharray", "stroke-dasharray"],
        ["strokeDashoffset", "stroke-dashoffset"],
        ["strokeLinecap", "stroke-linecap"],
        ["strokeLinejoin", "stroke-linejoin"],
        ["strokeMiterlimit", "stroke-miterlimit"],
        ["strokeOpacity", "stroke-opacity"],
        ["strokeWidth", "stroke-width"],
        ["textAnchor", "text-anchor"],
        ["textDecoration", "text-decoration"],
        ["textRendering", "text-rendering"],
        ["transformOrigin", "transform-origin"],
        ["underlinePosition", "underline-position"],
        ["underlineThickness", "underline-thickness"],
        ["unicodeBidi", "unicode-bidi"],
        ["unicodeRange", "unicode-range"],
        ["unitsPerEm", "units-per-em"],
        ["vAlphabetic", "v-alphabetic"],
        ["vHanging", "v-hanging"],
        ["vIdeographic", "v-ideographic"],
        ["vMathematical", "v-mathematical"],
        ["vectorEffect", "vector-effect"],
        ["vertAdvY", "vert-adv-y"],
        ["vertOriginX", "vert-origin-x"],
        ["vertOriginY", "vert-origin-y"],
        ["wordSpacing", "word-spacing"],
        ["writingMode", "writing-mode"],
        ["xmlnsXlink", "xmlns:xlink"],
        ["xHeight", "x-height"]
      ]),
      possibleStandardNames = {
        accept: "accept",
        acceptcharset: "acceptCharset",
        "accept-charset": "acceptCharset",
        accesskey: "accessKey",
        action: "action",
        allowfullscreen: "allowFullScreen",
        alt: "alt",
        as: "as",
        async: "async",
        autocapitalize: "autoCapitalize",
        autocomplete: "autoComplete",
        autocorrect: "autoCorrect",
        autofocus: "autoFocus",
        autoplay: "autoPlay",
        autosave: "autoSave",
        capture: "capture",
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        challenge: "challenge",
        charset: "charSet",
        checked: "checked",
        children: "children",
        cite: "cite",
        class: "className",
        classid: "classID",
        classname: "className",
        cols: "cols",
        colspan: "colSpan",
        content: "content",
        contenteditable: "contentEditable",
        contextmenu: "contextMenu",
        controls: "controls",
        controlslist: "controlsList",
        coords: "coords",
        crossorigin: "crossOrigin",
        dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
        data: "data",
        datetime: "dateTime",
        default: "default",
        defaultchecked: "defaultChecked",
        defaultvalue: "defaultValue",
        defer: "defer",
        dir: "dir",
        disabled: "disabled",
        disablepictureinpicture: "disablePictureInPicture",
        disableremoteplayback: "disableRemotePlayback",
        download: "download",
        draggable: "draggable",
        enctype: "encType",
        enterkeyhint: "enterKeyHint",
        fetchpriority: "fetchPriority",
        for: "htmlFor",
        form: "form",
        formmethod: "formMethod",
        formaction: "formAction",
        formenctype: "formEncType",
        formnovalidate: "formNoValidate",
        formtarget: "formTarget",
        frameborder: "frameBorder",
        headers: "headers",
        height: "height",
        hidden: "hidden",
        high: "high",
        href: "href",
        hreflang: "hrefLang",
        htmlfor: "htmlFor",
        httpequiv: "httpEquiv",
        "http-equiv": "httpEquiv",
        icon: "icon",
        id: "id",
        imagesizes: "imageSizes",
        imagesrcset: "imageSrcSet",
        inert: "inert",
        innerhtml: "innerHTML",
        inputmode: "inputMode",
        integrity: "integrity",
        is: "is",
        itemid: "itemID",
        itemprop: "itemProp",
        itemref: "itemRef",
        itemscope: "itemScope",
        itemtype: "itemType",
        keyparams: "keyParams",
        keytype: "keyType",
        kind: "kind",
        label: "label",
        lang: "lang",
        list: "list",
        loop: "loop",
        low: "low",
        manifest: "manifest",
        marginwidth: "marginWidth",
        marginheight: "marginHeight",
        max: "max",
        maxlength: "maxLength",
        media: "media",
        mediagroup: "mediaGroup",
        method: "method",
        min: "min",
        minlength: "minLength",
        multiple: "multiple",
        muted: "muted",
        name: "name",
        nomodule: "noModule",
        nonce: "nonce",
        novalidate: "noValidate",
        open: "open",
        optimum: "optimum",
        pattern: "pattern",
        placeholder: "placeholder",
        playsinline: "playsInline",
        poster: "poster",
        preload: "preload",
        profile: "profile",
        radiogroup: "radioGroup",
        readonly: "readOnly",
        referrerpolicy: "referrerPolicy",
        rel: "rel",
        required: "required",
        reversed: "reversed",
        role: "role",
        rows: "rows",
        rowspan: "rowSpan",
        sandbox: "sandbox",
        scope: "scope",
        scoped: "scoped",
        scrolling: "scrolling",
        seamless: "seamless",
        selected: "selected",
        shape: "shape",
        size: "size",
        sizes: "sizes",
        span: "span",
        spellcheck: "spellCheck",
        src: "src",
        srcdoc: "srcDoc",
        srclang: "srcLang",
        srcset: "srcSet",
        start: "start",
        step: "step",
        style: "style",
        summary: "summary",
        tabindex: "tabIndex",
        target: "target",
        title: "title",
        type: "type",
        usemap: "useMap",
        value: "value",
        width: "width",
        wmode: "wmode",
        wrap: "wrap",
        about: "about",
        accentheight: "accentHeight",
        "accent-height": "accentHeight",
        accumulate: "accumulate",
        additive: "additive",
        alignmentbaseline: "alignmentBaseline",
        "alignment-baseline": "alignmentBaseline",
        allowreorder: "allowReorder",
        alphabetic: "alphabetic",
        amplitude: "amplitude",
        arabicform: "arabicForm",
        "arabic-form": "arabicForm",
        ascent: "ascent",
        attributename: "attributeName",
        attributetype: "attributeType",
        autoreverse: "autoReverse",
        azimuth: "azimuth",
        basefrequency: "baseFrequency",
        baselineshift: "baselineShift",
        "baseline-shift": "baselineShift",
        baseprofile: "baseProfile",
        bbox: "bbox",
        begin: "begin",
        bias: "bias",
        by: "by",
        calcmode: "calcMode",
        capheight: "capHeight",
        "cap-height": "capHeight",
        clip: "clip",
        clippath: "clipPath",
        "clip-path": "clipPath",
        clippathunits: "clipPathUnits",
        cliprule: "clipRule",
        "clip-rule": "clipRule",
        color: "color",
        colorinterpolation: "colorInterpolation",
        "color-interpolation": "colorInterpolation",
        colorinterpolationfilters: "colorInterpolationFilters",
        "color-interpolation-filters": "colorInterpolationFilters",
        colorprofile: "colorProfile",
        "color-profile": "colorProfile",
        colorrendering: "colorRendering",
        "color-rendering": "colorRendering",
        contentscripttype: "contentScriptType",
        contentstyletype: "contentStyleType",
        cursor: "cursor",
        cx: "cx",
        cy: "cy",
        d: "d",
        datatype: "datatype",
        decelerate: "decelerate",
        descent: "descent",
        diffuseconstant: "diffuseConstant",
        direction: "direction",
        display: "display",
        divisor: "divisor",
        dominantbaseline: "dominantBaseline",
        "dominant-baseline": "dominantBaseline",
        dur: "dur",
        dx: "dx",
        dy: "dy",
        edgemode: "edgeMode",
        elevation: "elevation",
        enablebackground: "enableBackground",
        "enable-background": "enableBackground",
        end: "end",
        exponent: "exponent",
        externalresourcesrequired: "externalResourcesRequired",
        fill: "fill",
        fillopacity: "fillOpacity",
        "fill-opacity": "fillOpacity",
        fillrule: "fillRule",
        "fill-rule": "fillRule",
        filter: "filter",
        filterres: "filterRes",
        filterunits: "filterUnits",
        floodopacity: "floodOpacity",
        "flood-opacity": "floodOpacity",
        floodcolor: "floodColor",
        "flood-color": "floodColor",
        focusable: "focusable",
        fontfamily: "fontFamily",
        "font-family": "fontFamily",
        fontsize: "fontSize",
        "font-size": "fontSize",
        fontsizeadjust: "fontSizeAdjust",
        "font-size-adjust": "fontSizeAdjust",
        fontstretch: "fontStretch",
        "font-stretch": "fontStretch",
        fontstyle: "fontStyle",
        "font-style": "fontStyle",
        fontvariant: "fontVariant",
        "font-variant": "fontVariant",
        fontweight: "fontWeight",
        "font-weight": "fontWeight",
        format: "format",
        from: "from",
        fx: "fx",
        fy: "fy",
        g1: "g1",
        g2: "g2",
        glyphname: "glyphName",
        "glyph-name": "glyphName",
        glyphorientationhorizontal: "glyphOrientationHorizontal",
        "glyph-orientation-horizontal": "glyphOrientationHorizontal",
        glyphorientationvertical: "glyphOrientationVertical",
        "glyph-orientation-vertical": "glyphOrientationVertical",
        glyphref: "glyphRef",
        gradienttransform: "gradientTransform",
        gradientunits: "gradientUnits",
        hanging: "hanging",
        horizadvx: "horizAdvX",
        "horiz-adv-x": "horizAdvX",
        horizoriginx: "horizOriginX",
        "horiz-origin-x": "horizOriginX",
        ideographic: "ideographic",
        imagerendering: "imageRendering",
        "image-rendering": "imageRendering",
        in2: "in2",
        in: "in",
        inlist: "inlist",
        intercept: "intercept",
        k1: "k1",
        k2: "k2",
        k3: "k3",
        k4: "k4",
        k: "k",
        kernelmatrix: "kernelMatrix",
        kernelunitlength: "kernelUnitLength",
        kerning: "kerning",
        keypoints: "keyPoints",
        keysplines: "keySplines",
        keytimes: "keyTimes",
        lengthadjust: "lengthAdjust",
        letterspacing: "letterSpacing",
        "letter-spacing": "letterSpacing",
        lightingcolor: "lightingColor",
        "lighting-color": "lightingColor",
        limitingconeangle: "limitingConeAngle",
        local: "local",
        markerend: "markerEnd",
        "marker-end": "markerEnd",
        markerheight: "markerHeight",
        markermid: "markerMid",
        "marker-mid": "markerMid",
        markerstart: "markerStart",
        "marker-start": "markerStart",
        markerunits: "markerUnits",
        markerwidth: "markerWidth",
        mask: "mask",
        maskcontentunits: "maskContentUnits",
        maskunits: "maskUnits",
        mathematical: "mathematical",
        mode: "mode",
        numoctaves: "numOctaves",
        offset: "offset",
        opacity: "opacity",
        operator: "operator",
        order: "order",
        orient: "orient",
        orientation: "orientation",
        origin: "origin",
        overflow: "overflow",
        overlineposition: "overlinePosition",
        "overline-position": "overlinePosition",
        overlinethickness: "overlineThickness",
        "overline-thickness": "overlineThickness",
        paintorder: "paintOrder",
        "paint-order": "paintOrder",
        panose1: "panose1",
        "panose-1": "panose1",
        pathlength: "pathLength",
        patterncontentunits: "patternContentUnits",
        patterntransform: "patternTransform",
        patternunits: "patternUnits",
        pointerevents: "pointerEvents",
        "pointer-events": "pointerEvents",
        points: "points",
        pointsatx: "pointsAtX",
        pointsaty: "pointsAtY",
        pointsatz: "pointsAtZ",
        popover: "popover",
        popovertarget: "popoverTarget",
        popovertargetaction: "popoverTargetAction",
        prefix: "prefix",
        preservealpha: "preserveAlpha",
        preserveaspectratio: "preserveAspectRatio",
        primitiveunits: "primitiveUnits",
        property: "property",
        r: "r",
        radius: "radius",
        refx: "refX",
        refy: "refY",
        renderingintent: "renderingIntent",
        "rendering-intent": "renderingIntent",
        repeatcount: "repeatCount",
        repeatdur: "repeatDur",
        requiredextensions: "requiredExtensions",
        requiredfeatures: "requiredFeatures",
        resource: "resource",
        restart: "restart",
        result: "result",
        results: "results",
        rotate: "rotate",
        rx: "rx",
        ry: "ry",
        scale: "scale",
        security: "security",
        seed: "seed",
        shaperendering: "shapeRendering",
        "shape-rendering": "shapeRendering",
        slope: "slope",
        spacing: "spacing",
        specularconstant: "specularConstant",
        specularexponent: "specularExponent",
        speed: "speed",
        spreadmethod: "spreadMethod",
        startoffset: "startOffset",
        stddeviation: "stdDeviation",
        stemh: "stemh",
        stemv: "stemv",
        stitchtiles: "stitchTiles",
        stopcolor: "stopColor",
        "stop-color": "stopColor",
        stopopacity: "stopOpacity",
        "stop-opacity": "stopOpacity",
        strikethroughposition: "strikethroughPosition",
        "strikethrough-position": "strikethroughPosition",
        strikethroughthickness: "strikethroughThickness",
        "strikethrough-thickness": "strikethroughThickness",
        string: "string",
        stroke: "stroke",
        strokedasharray: "strokeDasharray",
        "stroke-dasharray": "strokeDasharray",
        strokedashoffset: "strokeDashoffset",
        "stroke-dashoffset": "strokeDashoffset",
        strokelinecap: "strokeLinecap",
        "stroke-linecap": "strokeLinecap",
        strokelinejoin: "strokeLinejoin",
        "stroke-linejoin": "strokeLinejoin",
        strokemiterlimit: "strokeMiterlimit",
        "stroke-miterlimit": "strokeMiterlimit",
        strokewidth: "strokeWidth",
        "stroke-width": "strokeWidth",
        strokeopacity: "strokeOpacity",
        "stroke-opacity": "strokeOpacity",
        suppresscontenteditablewarning: "suppressContentEditableWarning",
        suppresshydrationwarning: "suppressHydrationWarning",
        surfacescale: "surfaceScale",
        systemlanguage: "systemLanguage",
        tablevalues: "tableValues",
        targetx: "targetX",
        targety: "targetY",
        textanchor: "textAnchor",
        "text-anchor": "textAnchor",
        textdecoration: "textDecoration",
        "text-decoration": "textDecoration",
        textlength: "textLength",
        textrendering: "textRendering",
        "text-rendering": "textRendering",
        to: "to",
        transform: "transform",
        transformorigin: "transformOrigin",
        "transform-origin": "transformOrigin",
        typeof: "typeof",
        u1: "u1",
        u2: "u2",
        underlineposition: "underlinePosition",
        "underline-position": "underlinePosition",
        underlinethickness: "underlineThickness",
        "underline-thickness": "underlineThickness",
        unicode: "unicode",
        unicodebidi: "unicodeBidi",
        "unicode-bidi": "unicodeBidi",
        unicoderange: "unicodeRange",
        "unicode-range": "unicodeRange",
        unitsperem: "unitsPerEm",
        "units-per-em": "unitsPerEm",
        unselectable: "unselectable",
        valphabetic: "vAlphabetic",
        "v-alphabetic": "vAlphabetic",
        values: "values",
        vectoreffect: "vectorEffect",
        "vector-effect": "vectorEffect",
        version: "version",
        vertadvy: "vertAdvY",
        "vert-adv-y": "vertAdvY",
        vertoriginx: "vertOriginX",
        "vert-origin-x": "vertOriginX",
        vertoriginy: "vertOriginY",
        "vert-origin-y": "vertOriginY",
        vhanging: "vHanging",
        "v-hanging": "vHanging",
        videographic: "vIdeographic",
        "v-ideographic": "vIdeographic",
        viewbox: "viewBox",
        viewtarget: "viewTarget",
        visibility: "visibility",
        vmathematical: "vMathematical",
        "v-mathematical": "vMathematical",
        vocab: "vocab",
        widths: "widths",
        wordspacing: "wordSpacing",
        "word-spacing": "wordSpacing",
        writingmode: "writingMode",
        "writing-mode": "writingMode",
        x1: "x1",
        x2: "x2",
        x: "x",
        xchannelselector: "xChannelSelector",
        xheight: "xHeight",
        "x-height": "xHeight",
        xlinkactuate: "xlinkActuate",
        "xlink:actuate": "xlinkActuate",
        xlinkarcrole: "xlinkArcrole",
        "xlink:arcrole": "xlinkArcrole",
        xlinkhref: "xlinkHref",
        "xlink:href": "xlinkHref",
        xlinkrole: "xlinkRole",
        "xlink:role": "xlinkRole",
        xlinkshow: "xlinkShow",
        "xlink:show": "xlinkShow",
        xlinktitle: "xlinkTitle",
        "xlink:title": "xlinkTitle",
        xlinktype: "xlinkType",
        "xlink:type": "xlinkType",
        xmlbase: "xmlBase",
        "xml:base": "xmlBase",
        xmllang: "xmlLang",
        "xml:lang": "xmlLang",
        xmlns: "xmlns",
        "xml:space": "xmlSpace",
        xmlnsxlink: "xmlnsXlink",
        "xmlns:xlink": "xmlnsXlink",
        xmlspace: "xmlSpace",
        y1: "y1",
        y2: "y2",
        y: "y",
        ychannelselector: "yChannelSelector",
        z: "z",
        zoomandpan: "zoomAndPan"
      },
      ariaProperties = {
        "aria-current": 0,
        "aria-description": 0,
        "aria-details": 0,
        "aria-disabled": 0,
        "aria-hidden": 0,
        "aria-invalid": 0,
        "aria-keyshortcuts": 0,
        "aria-label": 0,
        "aria-roledescription": 0,
        "aria-autocomplete": 0,
        "aria-checked": 0,
        "aria-expanded": 0,
        "aria-haspopup": 0,
        "aria-level": 0,
        "aria-modal": 0,
        "aria-multiline": 0,
        "aria-multiselectable": 0,
        "aria-orientation": 0,
        "aria-placeholder": 0,
        "aria-pressed": 0,
        "aria-readonly": 0,
        "aria-required": 0,
        "aria-selected": 0,
        "aria-sort": 0,
        "aria-valuemax": 0,
        "aria-valuemin": 0,
        "aria-valuenow": 0,
        "aria-valuetext": 0,
        "aria-atomic": 0,
        "aria-busy": 0,
        "aria-live": 0,
        "aria-relevant": 0,
        "aria-dropeffect": 0,
        "aria-grabbed": 0,
        "aria-activedescendant": 0,
        "aria-colcount": 0,
        "aria-colindex": 0,
        "aria-colspan": 0,
        "aria-controls": 0,
        "aria-describedby": 0,
        "aria-errormessage": 0,
        "aria-flowto": 0,
        "aria-labelledby": 0,
        "aria-owns": 0,
        "aria-posinset": 0,
        "aria-rowcount": 0,
        "aria-rowindex": 0,
        "aria-rowspan": 0,
        "aria-setsize": 0
      },
      warnedProperties$1 = {},
      rARIA$1 = RegExp(
        "^(aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
      ),
      rARIACamel$1 = RegExp(
        "^(aria)[A-Z][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
      ),
      didWarnValueNull = !1,
      warnedProperties = {},
      EVENT_NAME_REGEX = /^on./,
      INVALID_EVENT_NAME_REGEX = /^on[^A-Z]/,
      rARIA = RegExp(
        "^(aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
      ),
      rARIACamel = RegExp(
        "^(aria)[A-Z][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
      ),
      isJavaScriptProtocol =
        /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i,
      currentReplayingEvent = null,
      restoreTarget = null,
      restoreQueue = null,
      isInsideEventHandler = !1,
      passiveBrowserEventsSupported = !1;
    if (canUseDOM)
      try {
        var options$jscomp$0 = {};
        Object.defineProperty(options$jscomp$0, "passive", {
          get: function () {
            passiveBrowserEventsSupported = !0;
          }
        });
        window.addEventListener("test", options$jscomp$0, options$jscomp$0);
        window.removeEventListener("test", options$jscomp$0, options$jscomp$0);
      } catch (e) {
        passiveBrowserEventsSupported = !1;
      }
    var root = null,
      startText = null,
      fallbackText = null,
      EventInterface = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function (event) {
          return event.timeStamp || Date.now();
        },
        defaultPrevented: 0,
        isTrusted: 0
      },
      SyntheticEvent = createSyntheticEvent(EventInterface),
      UIEventInterface = assign({}, EventInterface, { view: 0, detail: 0 }),
      SyntheticUIEvent = createSyntheticEvent(UIEventInterface),
      lastMovementX,
      lastMovementY,
      lastMouseEvent,
      MouseEventInterface = assign({}, UIEventInterface, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: getEventModifierState,
        button: 0,
        buttons: 0,
        relatedTarget: function (event) {
          return void 0 === event.relatedTarget
            ? event.fromElement === event.srcElement
              ? event.toElement
              : event.fromElement
            : event.relatedTarget;
        },
        movementX: function (event) {
          if ("movementX" in event) return event.movementX;
          event !== lastMouseEvent &&
            (lastMouseEvent && "mousemove" === event.type
              ? ((lastMovementX = event.screenX - lastMouseEvent.screenX),
                (lastMovementY = event.screenY - lastMouseEvent.screenY))
              : (lastMovementY = lastMovementX = 0),
            (lastMouseEvent = event));
          return lastMovementX;
        },
        movementY: function (event) {
          return "movementY" in event ? event.movementY : lastMovementY;
        }
      }),
      SyntheticMouseEvent = createSyntheticEvent(MouseEventInterface),
      DragEventInterface = assign({}, MouseEventInterface, { dataTransfer: 0 }),
      SyntheticDragEvent = createSyntheticEvent(DragEventInterface),
      FocusEventInterface = assign({}, UIEventInterface, { relatedTarget: 0 }),
      SyntheticFocusEvent = createSyntheticEvent(FocusEventInterface),
      AnimationEventInterface = assign({}, EventInterface, {
        animationName: 0,
        elapsedTime: 0,
        pseudoElement: 0
      }),
      SyntheticAnimationEvent = createSyntheticEvent(AnimationEventInterface),
      ClipboardEventInterface = assign({}, EventInterface, {
        clipboardData: function (event) {
          return "clipboardData" in event
            ? event.clipboardData
            : window.clipboardData;
        }
      }),
      SyntheticClipboardEvent = createSyntheticEvent(ClipboardEventInterface),
      CompositionEventInterface = assign({}, EventInterface, { data: 0 }),
      SyntheticCompositionEvent = createSyntheticEvent(
        CompositionEventInterface
      ),
      SyntheticInputEvent = SyntheticCompositionEvent,
      normalizeKey = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified"
      },
      translateToKey = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta"
      },
      modifierKeyToProp = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey"
      },
      KeyboardEventInterface = assign({}, UIEventInterface, {
        key: function (nativeEvent) {
          if (nativeEvent.key) {
            var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
            if ("Unidentified" !== key) return key;
          }
          return "keypress" === nativeEvent.type
            ? ((nativeEvent = getEventCharCode(nativeEvent)),
              13 === nativeEvent ? "Enter" : String.fromCharCode(nativeEvent))
            : "keydown" === nativeEvent.type || "keyup" === nativeEvent.type
              ? translateToKey[nativeEvent.keyCode] || "Unidentified"
              : "";
        },
        code: 0,
        location: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        repeat: 0,
        locale: 0,
        getModifierState: getEventModifierState,
        charCode: function (event) {
          return "keypress" === event.type ? getEventCharCode(event) : 0;
        },
        keyCode: function (event) {
          return "keydown" === event.type || "keyup" === event.type
            ? event.keyCode
            : 0;
        },
        which: function (event) {
          return "keypress" === event.type
            ? getEventCharCode(event)
            : "keydown" === event.type || "keyup" === event.type
              ? event.keyCode
              : 0;
        }
      }),
      SyntheticKeyboardEvent = createSyntheticEvent(KeyboardEventInterface),
      PointerEventInterface = assign({}, MouseEventInterface, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0
      }),
      SyntheticPointerEvent = createSyntheticEvent(PointerEventInterface),
      TouchEventInterface = assign({}, UIEventInterface, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: getEventModifierState
      }),
      SyntheticTouchEvent = createSyntheticEvent(TouchEventInterface),
      TransitionEventInterface = assign({}, EventInterface, {
        propertyName: 0,
        elapsedTime: 0,
        pseudoElement: 0
      }),
      SyntheticTransitionEvent = createSyntheticEvent(TransitionEventInterface),
      WheelEventInterface = assign({}, MouseEventInterface, {
        deltaX: function (event) {
          return "deltaX" in event
            ? event.deltaX
            : "wheelDeltaX" in event
              ? -event.wheelDeltaX
              : 0;
        },
        deltaY: function (event) {
          return "deltaY" in event
            ? event.deltaY
            : "wheelDeltaY" in event
              ? -event.wheelDeltaY
              : "wheelDelta" in event
                ? -event.wheelDelta
                : 0;
        },
        deltaZ: 0,
        deltaMode: 0
      }),
      SyntheticWheelEvent = createSyntheticEvent(WheelEventInterface),
      ToggleEventInterface = assign({}, EventInterface, {
        newState: 0,
        oldState: 0
      }),
      SyntheticToggleEvent = createSyntheticEvent(ToggleEventInterface),
      END_KEYCODES = [9, 13, 27, 32],
      START_KEYCODE = 229,
      canUseCompositionEvent = canUseDOM && "CompositionEvent" in window,
      documentMode = null;
    canUseDOM &&
      "documentMode" in document &&
      (documentMode = document.documentMode);
    var canUseTextInputEvent =
        canUseDOM && "TextEvent" in window && !documentMode,
      useFallbackCompositionData =
        canUseDOM &&
        (!canUseCompositionEvent ||
          (documentMode && 8 < documentMode && 11 >= documentMode)),
      SPACEBAR_CODE = 32,
      SPACEBAR_CHAR = String.fromCharCode(SPACEBAR_CODE),
      hasSpaceKeypress = !1,
      isComposing = !1,
      supportedInputTypes = {
        color: !0,
        date: !0,
        datetime: !0,
        "datetime-local": !0,
        email: !0,
        month: !0,
        number: !0,
        password: !0,
        range: !0,
        search: !0,
        tel: !0,
        text: !0,
        time: !0,
        url: !0,
        week: !0
      },
      activeElement$1 = null,
      activeElementInst$1 = null,
      isInputEventSupported = !1;
    canUseDOM &&
      (isInputEventSupported =
        isEventSupported("input") &&
        (!document.documentMode || 9 < document.documentMode));
    var objectIs = "function" === typeof Object.is ? Object.is : is,
      skipSelectionChangeEvent =
        canUseDOM && "documentMode" in document && 11 >= document.documentMode,
      activeElement = null,
      activeElementInst = null,
      lastSelection = null,
      mouseDown = !1,
      vendorPrefixes = {
        animationend: makePrefixMap("Animation", "AnimationEnd"),
        animationiteration: makePrefixMap("Animation", "AnimationIteration"),
        animationstart: makePrefixMap("Animation", "AnimationStart"),
        transitionrun: makePrefixMap("Transition", "TransitionRun"),
        transitionstart: makePrefixMap("Transition", "TransitionStart"),
        transitioncancel: makePrefixMap("Transition", "TransitionCancel"),
        transitionend: makePrefixMap("Transition", "TransitionEnd")
      },
      prefixedEventNames = {},
      style = {};
    canUseDOM &&
      ((style = document.createElement("div").style),
      "AnimationEvent" in window ||
        (delete vendorPrefixes.animationend.animation,
        delete vendorPrefixes.animationiteration.animation,
        delete vendorPrefixes.animationstart.animation),
      "TransitionEvent" in window ||
        delete vendorPrefixes.transitionend.transition);
    var ANIMATION_END = getVendorPrefixedEventName("animationend"),
      ANIMATION_ITERATION = getVendorPrefixedEventName("animationiteration"),
      ANIMATION_START = getVendorPrefixedEventName("animationstart"),
      TRANSITION_RUN = getVendorPrefixedEventName("transitionrun"),
      TRANSITION_START = getVendorPrefixedEventName("transitionstart"),
      TRANSITION_CANCEL = getVendorPrefixedEventName("transitioncancel"),
      TRANSITION_END = getVendorPrefixedEventName("transitionend"),
      topLevelEventsToReactNames = new Map(),
      simpleEventPluginEvents =
        "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll scrollEnd toggle touchMove waiting wheel".split(
          " "
        ),
      OffscreenVisible = 1,
      OffscreenDetached = 2,
      OffscreenPassiveEffectsConnected = 4,
      concurrentQueues = [],
      concurrentQueuesIndex = 0,
      concurrentlyUpdatedLanes = 0,
      emptyContextObject = {};
    Object.freeze(emptyContextObject);
    var resolveFamily = null,
      failedBoundaries = null,
      NoMode = 0,
      ConcurrentMode = 1,
      ProfileMode = 2,
      StrictLegacyMode = 8,
      StrictEffectsMode = 16,
      NoStrictPassiveEffectsMode = 64,
      now = Scheduler.unstable_now,
      renderStartTime = -0,
      commitStartTime = -0,
      profilerStartTime = -1.1,
      profilerEffectDuration = -0,
      currentUpdateIsNested = !1,
      nestedUpdateScheduled = !1,
      ReactStrictModeWarnings = {
        recordUnsafeLifecycleWarnings: function () {},
        flushPendingUnsafeLifecycleWarnings: function () {},
        recordLegacyContextWarning: function () {},
        flushLegacyContextWarning: function () {},
        discardPendingWarnings: function () {}
      },
      pendingComponentWillMountWarnings = [],
      pendingUNSAFE_ComponentWillMountWarnings = [],
      pendingComponentWillReceivePropsWarnings = [],
      pendingUNSAFE_ComponentWillReceivePropsWarnings = [],
      pendingComponentWillUpdateWarnings = [],
      pendingUNSAFE_ComponentWillUpdateWarnings = [],
      didWarnAboutUnsafeLifecycles = new Set();
    ReactStrictModeWarnings.recordUnsafeLifecycleWarnings = function (
      fiber,
      instance
    ) {
      didWarnAboutUnsafeLifecycles.has(fiber.type) ||
        ("function" === typeof instance.componentWillMount &&
          !0 !== instance.componentWillMount.__suppressDeprecationWarning &&
          pendingComponentWillMountWarnings.push(fiber),
        fiber.mode & StrictLegacyMode &&
          "function" === typeof instance.UNSAFE_componentWillMount &&
          pendingUNSAFE_ComponentWillMountWarnings.push(fiber),
        "function" === typeof instance.componentWillReceiveProps &&
          !0 !==
            instance.componentWillReceiveProps.__suppressDeprecationWarning &&
          pendingComponentWillReceivePropsWarnings.push(fiber),
        fiber.mode & StrictLegacyMode &&
          "function" === typeof instance.UNSAFE_componentWillReceiveProps &&
          pendingUNSAFE_ComponentWillReceivePropsWarnings.push(fiber),
        "function" === typeof instance.componentWillUpdate &&
          !0 !== instance.componentWillUpdate.__suppressDeprecationWarning &&
          pendingComponentWillUpdateWarnings.push(fiber),
        fiber.mode & StrictLegacyMode &&
          "function" === typeof instance.UNSAFE_componentWillUpdate &&
          pendingUNSAFE_ComponentWillUpdateWarnings.push(fiber));
    };
    ReactStrictModeWarnings.flushPendingUnsafeLifecycleWarnings = function () {
      var componentWillMountUniqueNames = new Set();
      0 < pendingComponentWillMountWarnings.length &&
        (pendingComponentWillMountWarnings.forEach(function (fiber) {
          componentWillMountUniqueNames.add(
            getComponentNameFromFiber(fiber) || "Component"
          );
          didWarnAboutUnsafeLifecycles.add(fiber.type);
        }),
        (pendingComponentWillMountWarnings = []));
      var UNSAFE_componentWillMountUniqueNames = new Set();
      0 < pendingUNSAFE_ComponentWillMountWarnings.length &&
        (pendingUNSAFE_ComponentWillMountWarnings.forEach(function (fiber) {
          UNSAFE_componentWillMountUniqueNames.add(
            getComponentNameFromFiber(fiber) || "Component"
          );
          didWarnAboutUnsafeLifecycles.add(fiber.type);
        }),
        (pendingUNSAFE_ComponentWillMountWarnings = []));
      var componentWillReceivePropsUniqueNames = new Set();
      0 < pendingComponentWillReceivePropsWarnings.length &&
        (pendingComponentWillReceivePropsWarnings.forEach(function (fiber) {
          componentWillReceivePropsUniqueNames.add(
            getComponentNameFromFiber(fiber) || "Component"
          );
          didWarnAboutUnsafeLifecycles.add(fiber.type);
        }),
        (pendingComponentWillReceivePropsWarnings = []));
      var UNSAFE_componentWillReceivePropsUniqueNames = new Set();
      0 < pendingUNSAFE_ComponentWillReceivePropsWarnings.length &&
        (pendingUNSAFE_ComponentWillReceivePropsWarnings.forEach(
          function (fiber) {
            UNSAFE_componentWillReceivePropsUniqueNames.add(
              getComponentNameFromFiber(fiber) || "Component"
            );
            didWarnAboutUnsafeLifecycles.add(fiber.type);
          }
        ),
        (pendingUNSAFE_ComponentWillReceivePropsWarnings = []));
      var componentWillUpdateUniqueNames = new Set();
      0 < pendingComponentWillUpdateWarnings.length &&
        (pendingComponentWillUpdateWarnings.forEach(function (fiber) {
          componentWillUpdateUniqueNames.add(
            getComponentNameFromFiber(fiber) || "Component"
          );
          didWarnAboutUnsafeLifecycles.add(fiber.type);
        }),
        (pendingComponentWillUpdateWarnings = []));
      var UNSAFE_componentWillUpdateUniqueNames = new Set();
      0 < pendingUNSAFE_ComponentWillUpdateWarnings.length &&
        (pendingUNSAFE_ComponentWillUpdateWarnings.forEach(function (fiber) {
          UNSAFE_componentWillUpdateUniqueNames.add(
            getComponentNameFromFiber(fiber) || "Component"
          );
          didWarnAboutUnsafeLifecycles.add(fiber.type);
        }),
        (pendingUNSAFE_ComponentWillUpdateWarnings = []));
      if (0 < UNSAFE_componentWillMountUniqueNames.size) {
        var sortedNames = setToSortedString(
          UNSAFE_componentWillMountUniqueNames
        );
        console.error(
          "Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move code with side effects to componentDidMount, and set initial state in the constructor.\n\nPlease update the following components: %s",
          sortedNames
        );
      }
      0 < UNSAFE_componentWillReceivePropsUniqueNames.size &&
        ((sortedNames = setToSortedString(
          UNSAFE_componentWillReceivePropsUniqueNames
        )),
        console.error(
          "Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state\n\nPlease update the following components: %s",
          sortedNames
        ));
      0 < UNSAFE_componentWillUpdateUniqueNames.size &&
        ((sortedNames = setToSortedString(
          UNSAFE_componentWillUpdateUniqueNames
        )),
        console.error(
          "Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n\nPlease update the following components: %s",
          sortedNames
        ));
      0 < componentWillMountUniqueNames.size &&
        ((sortedNames = setToSortedString(componentWillMountUniqueNames)),
        console.warn(
          "componentWillMount has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move code with side effects to componentDidMount, and set initial state in the constructor.\n* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s",
          sortedNames
        ));
      0 < componentWillReceivePropsUniqueNames.size &&
        ((sortedNames = setToSortedString(
          componentWillReceivePropsUniqueNames
        )),
        console.warn(
          "componentWillReceiveProps has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state\n* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s",
          sortedNames
        ));
      0 < componentWillUpdateUniqueNames.size &&
        ((sortedNames = setToSortedString(componentWillUpdateUniqueNames)),
        console.warn(
          "componentWillUpdate has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s",
          sortedNames
        ));
    };
    var pendingLegacyContextWarning = new Map(),
      didWarnAboutLegacyContext = new Set();
    ReactStrictModeWarnings.recordLegacyContextWarning = function (
      fiber,
      instance
    ) {
      var strictRoot = null;
      for (var node = fiber; null !== node; )
        node.mode & StrictLegacyMode && (strictRoot = node),
          (node = node.return);
      null === strictRoot
        ? console.error(
            "Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue."
          )
        : !didWarnAboutLegacyContext.has(fiber.type) &&
          ((node = pendingLegacyContextWarning.get(strictRoot)),
          null != fiber.type.contextTypes ||
            null != fiber.type.childContextTypes ||
            (null !== instance &&
              "function" === typeof instance.getChildContext)) &&
          (void 0 === node &&
            ((node = []), pendingLegacyContextWarning.set(strictRoot, node)),
          node.push(fiber));
    };
    ReactStrictModeWarnings.flushLegacyContextWarning = function () {
      pendingLegacyContextWarning.forEach(function (fiberArray) {
        if (0 !== fiberArray.length) {
          var firstFiber = fiberArray[0],
            uniqueNames = new Set();
          fiberArray.forEach(function (fiber) {
            uniqueNames.add(getComponentNameFromFiber(fiber) || "Component");
            didWarnAboutLegacyContext.add(fiber.type);
          });
          var sortedNames = setToSortedString(uniqueNames);
          runWithFiberInDEV(firstFiber, function () {
            console.error(
              "Legacy context API has been detected within a strict-mode tree.\n\nThe old API will be supported in all 16.x releases, but applications using it should migrate to the new version.\n\nPlease update the following components: %s\n\nLearn more about this warning here: https://react.dev/link/legacy-context",
              sortedNames
            );
          });
        }
      });
    };
    ReactStrictModeWarnings.discardPendingWarnings = function () {
      pendingComponentWillMountWarnings = [];
      pendingUNSAFE_ComponentWillMountWarnings = [];
      pendingComponentWillReceivePropsWarnings = [];
      pendingUNSAFE_ComponentWillReceivePropsWarnings = [];
      pendingComponentWillUpdateWarnings = [];
      pendingUNSAFE_ComponentWillUpdateWarnings = [];
      pendingLegacyContextWarning = new Map();
    };
    var CapturedStacks = new WeakMap(),
      forkStack = [],
      forkStackIndex = 0,
      treeForkProvider = null,
      treeForkCount = 0,
      idStack = [],
      idStackIndex = 0,
      treeContextProvider = null,
      treeContextId = 1,
      treeContextOverflow = "",
      hydrationParentFiber = null,
      nextHydratableInstance = null,
      isHydrating = !1,
      didSuspendOrErrorDEV = !1,
      hydrationDiffRootDEV = null,
      hydrationErrors = null,
      rootOrSingletonContext = !1,
      HydrationMismatchException = Error(
        "Hydration Mismatch Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React."
      ),
      SuspenseException = Error(
        "Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`."
      ),
      SuspenseyCommitException = Error(
        "Suspense Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React."
      ),
      SuspenseActionException = Error(
        "Suspense Exception: This is not a real error! It's an implementation detail of `useActionState` to interrupt the current render. You must either rethrow it immediately, or move the `useActionState` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary."
      ),
      noopSuspenseyCommitThenable = {
        then: function () {
          console.error(
            'Internal React error: A listener was unexpectedly attached to a "noop" thenable. This is a bug in React. Please file an issue.'
          );
        }
      },
      suspendedThenable = null,
      needsToResetSuspendedThenableDEV = !1,
      NoFlags = 0,
      HasEffect = 1,
      Insertion = 2,
      Layout = 4,
      Passive = 8,
      AbortControllerLocal =
        "undefined" !== typeof AbortController
          ? AbortController
          : function () {
              var listeners = [],
                signal = (this.signal = {
                  aborted: !1,
                  addEventListener: function (type, listener) {
                    listeners.push(listener);
                  }
                });
              this.abort = function () {
                signal.aborted = !0;
                listeners.forEach(function (listener) {
                  return listener();
                });
              };
            },
      scheduleCallback$2 = Scheduler.unstable_scheduleCallback,
      NormalPriority = Scheduler.unstable_NormalPriority,
      CacheContext = {
        $$typeof: REACT_CONTEXT_TYPE,
        Consumer: null,
        Provider: null,
        _currentValue: null,
        _currentValue2: null,
        _threadCount: 0,
        _currentRenderer: null,
        _currentRenderer2: null
      },
      currentEntangledListeners = null,
      currentEntangledPendingCount = 0,
      currentEntangledLane = 0,
      currentEntangledActionThenable = null,
      currentTreeHiddenStackCursor = createCursor(null),
      prevEntangledRenderLanesCursor = createCursor(0),
      prevOnStartTransitionFinish = ReactSharedInternals.S;
    ReactSharedInternals.S = function (transition, returnValue) {
      "object" === typeof returnValue &&
        null !== returnValue &&
        "function" === typeof returnValue.then &&
        entangleAsyncAction(transition, returnValue);
      null !== prevOnStartTransitionFinish &&
        prevOnStartTransitionFinish(transition, returnValue);
    };
    var resumedCache = createCursor(null),
      didWarnUncachedGetSnapshot;
    var didWarnAboutMismatchedHooksForComponent = new Set();
    var didWarnAboutUseWrappedInTryCatch = new Set();
    var didWarnAboutAsyncClientComponent = new Set();
    var didWarnAboutUseFormState = new Set();
    var renderLanes = 0,
      currentlyRenderingFiber$1 = null,
      currentHook = null,
      workInProgressHook = null,
      didScheduleRenderPhaseUpdate = !1,
      didScheduleRenderPhaseUpdateDuringThisPass = !1,
      shouldDoubleInvokeUserFnsInHooksDEV = !1,
      localIdCounter = 0,
      thenableIndexCounter$1 = 0,
      thenableState$1 = null,
      globalClientIdCounter = 0,
      RE_RENDER_LIMIT = 25,
      currentHookNameInDev = null,
      hookTypesDev = null,
      hookTypesUpdateIndexDev = -1,
      ignorePreviousDependencies = !1;
    var createFunctionComponentUpdateQueue = function () {
      return { lastEffect: null, events: null, stores: null, memoCache: null };
    };
    var ContextOnlyDispatcher = {
      readContext: readContext,
      use: use,
      useCallback: throwInvalidHookError,
      useContext: throwInvalidHookError,
      useEffect: throwInvalidHookError,
      useImperativeHandle: throwInvalidHookError,
      useLayoutEffect: throwInvalidHookError,
      useInsertionEffect: throwInvalidHookError,
      useMemo: throwInvalidHookError,
      useReducer: throwInvalidHookError,
      useRef: throwInvalidHookError,
      useState: throwInvalidHookError,
      useDebugValue: throwInvalidHookError,
      useDeferredValue: throwInvalidHookError,
      useTransition: throwInvalidHookError,
      useSyncExternalStore: throwInvalidHookError,
      useId: throwInvalidHookError
    };
    ContextOnlyDispatcher.useCacheRefresh = throwInvalidHookError;
    ContextOnlyDispatcher.useMemoCache = throwInvalidHookError;
    ContextOnlyDispatcher.useHostTransitionStatus = throwInvalidHookError;
    ContextOnlyDispatcher.useFormState = throwInvalidHookError;
    ContextOnlyDispatcher.useActionState = throwInvalidHookError;
    ContextOnlyDispatcher.useOptimistic = throwInvalidHookError;
    var HooksDispatcherOnMountInDEV = null,
      HooksDispatcherOnMountWithHookTypesInDEV = null,
      HooksDispatcherOnUpdateInDEV = null,
      HooksDispatcherOnRerenderInDEV = null,
      InvalidNestedHooksDispatcherOnMountInDEV = null,
      InvalidNestedHooksDispatcherOnUpdateInDEV = null,
      InvalidNestedHooksDispatcherOnRerenderInDEV = null;
    HooksDispatcherOnMountInDEV = {
      readContext: function (context) {
        return readContext(context);
      },
      use: use,
      useCallback: function (callback, deps) {
        currentHookNameInDev = "useCallback";
        mountHookTypesDev();
        checkDepsAreArrayDev(deps);
        return mountCallback(callback, deps);
      },
      useContext: function (context) {
        currentHookNameInDev = "useContext";
        mountHookTypesDev();
        return readContext(context);
      },
      useEffect: function (create, deps) {
        currentHookNameInDev = "useEffect";
        mountHookTypesDev();
        checkDepsAreArrayDev(deps);
        return mountEffect(create, deps);
      },
      useImperativeHandle: function (ref, create, deps) {
        currentHookNameInDev = "useImperativeHandle";
        mountHookTypesDev();
        checkDepsAreArrayDev(deps);
        return mountImperativeHandle(ref, create, deps);
      },
      useInsertionEffect: function (create, deps) {
        currentHookNameInDev = "useInsertionEffect";
        mountHookTypesDev();
        checkDepsAreArrayDev(deps);
        mountEffectImpl(4, Insertion, create, deps);
      },
      useLayoutEffect: function (create, deps) {
        currentHookNameInDev = "useLayoutEffect";
        mountHookTypesDev();
        checkDepsAreArrayDev(deps);
        return mountLayoutEffect(create, deps);
      },
      useMemo: function (create, deps) {
        currentHookNameInDev = "useMemo";
        mountHookTypesDev();
        checkDepsAreArrayDev(deps);
        var prevDispatcher = ReactSharedInternals.H;
        ReactSharedInternals.H = InvalidNestedHooksDispatcherOnMountInDEV;
        try {
          return mountMemo(create, deps);
        } finally {
          ReactSharedInternals.H = prevDispatcher;
        }
      },
      useReducer: function (reducer, initialArg, init) {
        currentHookNameInDev = "useReducer";
        mountHookTypesDev();
        var prevDispatcher = ReactSharedInternals.H;
        ReactSharedInternals.H = InvalidNestedHooksDispatcherOnMountInDEV;
        try {
          return mountReducer(reducer, initialArg, init);
        } finally {
          ReactSharedInternals.H = prevDispatcher;
        }
      },
      useRef: function (initialValue) {
        currentHookNameInDev = "useRef";
        mountHookTypesDev();
        return mountRef(initialValue);
      },
      useState: function (initialState) {
        currentHookNameInDev = "useState";
        mountHookTypesDev();
        var prevDispatcher = ReactSharedInternals.H;
        ReactSharedInternals.H = InvalidNestedHooksDispatcherOnMountInDEV;
        try {
          return mountState(initialState);
        } finally {
          ReactSharedInternals.H = prevDispatcher;
        }
      },
      useDebugValue: function () {
        currentHookNameInDev = "useDebugValue";
        mountHookTypesDev();
      },
      useDeferredValue: function (value, initialValue) {
        currentHookNameInDev = "useDeferredValue";
        mountHookTypesDev();
        return mountDeferredValue(value, initialValue);
      },
      useTransition: function () {
        currentHookNameInDev = "useTransition";
        mountHookTypesDev();
        return mountTransition();
      },
      useSyncExternalStore: function (
        subscribe,
        getSnapshot,
        getServerSnapshot
      ) {
        currentHookNameInDev = "useSyncExternalStore";
        mountHookTypesDev();
        return mountSyncExternalStore(
          subscribe,
          getSnapshot,
          getServerSnapshot
        );
      },
      useId: function () {
        currentHookNameInDev = "useId";
        mountHookTypesDev();
        return mountId();
      },
      useCacheRefresh: function () {
        currentHookNameInDev = "useCacheRefresh";
        mountHookTypesDev();
        return mountRefresh();
      }
    };
    HooksDispatcherOnMountInDEV.useMemoCache = useMemoCache;
    HooksDispatcherOnMountInDEV.useHostTransitionStatus =
      useHostTransitionStatus;
    HooksDispatcherOnMountInDEV.useFormState = function (action, initialState) {
      currentHookNameInDev = "useFormState";
      mountHookTypesDev();
      warnOnUseFormStateInDev();
      return mountActionState(action, initialState);
    };
    HooksDispatcherOnMountInDEV.useActionState = function (
      action,
      initialState
    ) {
      currentHookNameInDev = "useActionState";
      mountHookTypesDev();
      return mountActionState(action, initialState);
    };
    HooksDispatcherOnMountInDEV.useOptimistic = function (passthrough) {
      currentHookNameInDev = "useOptimistic";
      mountHookTypesDev();
      return mountOptimistic(passthrough);
    };
    HooksDispatcherOnMountWithHookTypesInDEV = {
      readContext: function (context) {
        return readContext(context);
      },
      use: use,
      useCallback: function (callback, deps) {
        currentHookNameInDev = "useCallback";
        updateHookTypesDev();
        return mountCallback(callback, deps);
      },
      useContext: function (context) {
        currentHookNameInDev = "useContext";
        updateHookTypesDev();
        return readContext(context);
      },
      useEffect: function (create, deps) {
        currentHookNameInDev = "useEffect";
        updateHookTypesDev();
        return mountEffect(create, deps);
      },
      useImperativeHandle: function (ref, create, deps) {
        currentHookNameInDev = "useImperativeHandle";
        updateHookTypesDev();
        return mountImperativeHandle(ref, create, deps);
      },
      useInsertionEffect: function (create, deps) {
        currentHookNameInDev = "useInsertionEffect";
        updateHookTypesDev();
        mountEffectImpl(4, Insertion, create, deps);
      },
      useLayoutEffect: function (create, deps) {
        currentHookNameInDev = "useLayoutEffect";
        updateHookTypesDev();
        return mountLayoutEffect(create, deps);
      },
      useMemo: function (create, deps) {
        currentHookNameInDev = "useMemo";
        updateHookTypesDev();
        var prevDispatcher = ReactSharedInternals.H;
        ReactSharedInternals.H = InvalidNestedHooksDispatcherOnMountInDEV;
        try {
          return mountMemo(create, deps);
        } finally {
          ReactSharedInternals.H = prevDispatcher;
        }
      },
      useReducer: function (reducer, initialArg, init) {
        currentHookNameInDev = "useReducer";
        updateHookTypesDev();
        var prevDispatcher = ReactSharedInternals.H;
        ReactSharedInternals.H = InvalidNestedHooksDispatcherOnMountInDEV;
        try {
          return mountReducer(reducer, initialArg, init);
        } finally {
          ReactSharedInternals.H = prevDispatcher;
        }
      },
      useRef: function (initialValue) {
        currentHookNameInDev = "useRef";
        updateHookTypesDev();
        return mountRef(initialValue);
      },
      useState: function (initialState) {
        currentHookNameInDev = "useState";
        updateHookTypesDev();
        var prevDispatcher = ReactSharedInternals.H;
        ReactSharedInternals.H = InvalidNestedHooksDispatcherOnMountInDEV;
        try {
          return mountState(initialState);
        } finally {
          ReactSharedInternals.H = prevDispatcher;
        }
      },
      useDebugValue: function () {
        currentHookNameInDev = "useDebugValue";
        updateHookTypesDev();
      },
      useDeferredValue: function (value, initialValue) {
        currentHookNameInDev = "useDeferredValue";
        updateHookTypesDev();
        return mountDeferredValue(value, initialValue);
      },
      useTransition: function () {
        currentHookNameInDev = "useTransition";
        updateHookTypesDev();
        return mountTransition();
      },
      useSyncExternalStore: function (
        subscribe,
        getSnapshot,
        getServerSnapshot
      ) {
        currentHookNameInDev = "useSyncExternalStore";
        updateHookTypesDev();
        return mountSyncExternalStore(
          subscribe,
          getSnapshot,
          getServerSnapshot
        );
      },
      useId: function () {
        currentHookNameInDev = "useId";
        updateHookTypesDev();
        return mountId();
      },
      useCacheRefresh: function () {
        currentHookNameInDev = "useCacheRefresh";
        updateHookTypesDev();
        return mountRefresh();
      }
    };
    HooksDispatcherOnMountWithHookTypesInDEV.useMemoCache = useMemoCache;
    HooksDispatcherOnMountWithHookTypesInDEV.useHostTransitionStatus =
      useHostTransitionStatus;
    HooksDispatcherOnMountWithHookTypesInDEV.useFormState = function (
      action,
      initialState
    ) {
      currentHookNameInDev = "useFormState";
      updateHookTypesDev();
      warnOnUseFormStateInDev();
      return mountActionState(action, initialState);
    };
    HooksDispatcherOnMountWithHookTypesInDEV.useActionState = function (
      action,
      initialState
    ) {
      currentHookNameInDev = "useActionState";
      updateHookTypesDev();
      return mountActionState(action, initialState);
    };
    HooksDispatcherOnMountWithHookTypesInDEV.useOptimistic = function (
      passthrough
    ) {
      currentHookNameInDev = "useOptimistic";
      updateHookTypesDev();
      return mountOptimistic(passthrough);
    };
    HooksDispatcherOnUpdateInDEV = {
      readContext: function (context) {
        return readContext(context);
      },
      use: use,
      useCallback: function (callback, deps) {
        currentHookNameInDev = "useCallback";
        updateHookTypesDev();
        return updateCallback(callback, deps);
      },
      useContext: function (context) {
        currentHookNameInDev = "useContext";
        updateHookTypesDev();
        return readContext(context);
      },
      useEffect: function (create, deps) {
        currentHookNameInDev = "useEffect";
        updateHookTypesDev();
        updateEffectImpl(2048, Passive, create, deps);
      },
      useImperativeHandle: function (ref, create, deps) {
        currentHookNameInDev = "useImperativeHandle";
        updateHookTypesDev();
        return updateImperativeHandle(ref, create, deps);
      },
      useInsertionEffect: function (create, deps) {
        currentHookNameInDev = "useInsertionEffect";
        updateHookTypesDev();
        return updateEffectImpl(4, Insertion, create, deps);
      },
      useLayoutEffect: function (create, deps) {
        currentHookNameInDev = "useLayoutEffect";
        updateHookTypesDev();
        return updateEffectImpl(4, Layout, create, deps);
      },
      useMemo: function (create, deps) {
        currentHookNameInDev = "useMemo";
        updateHookTypesDev();
        var prevDispatcher = ReactSharedInternals.H;
        ReactSharedInternals.H = InvalidNestedHooksDispatcherOnUpdateInDEV;
        try {
          return updateMemo(create, deps);
        } finally {
          ReactSharedInternals.H = prevDispatcher;
        }
      },
      useReducer: function (reducer, initialArg, init) {
        currentHookNameInDev = "useReducer";
        updateHookTypesDev();
        var prevDispatcher = ReactSharedInternals.H;
        ReactSharedInternals.H = InvalidNestedHooksDispatcherOnUpdateInDEV;
        try {
          return updateReducer(reducer, initialArg, init);
        } finally {
          ReactSharedInternals.H = prevDispatcher;
        }
      },
      useRef: function () {
        currentHookNameInDev = "useRef";
        updateHookTypesDev();
        return updateWorkInProgressHook().memoizedState;
      },
      useState: function () {
        currentHookNameInDev = "useState";
        updateHookTypesDev();
        var prevDispatcher = ReactSharedInternals.H;
        ReactSharedInternals.H = InvalidNestedHooksDispatcherOnUpdateInDEV;
        try {
          return updateReducer(basicStateReducer);
        } finally {
          ReactSharedInternals.H = prevDispatcher;
        }
      },
      useDebugValue: function () {
        currentHookNameInDev = "useDebugValue";
        updateHookTypesDev();
      },
      useDeferredValue: function (value, initialValue) {
        currentHookNameInDev = "useDeferredValue";
        updateHookTypesDev();
        return updateDeferredValue(value, initialValue);
      },
      useTransition: function () {
        currentHookNameInDev = "useTransition";
        updateHookTypesDev();
        return updateTransition();
      },
      useSyncExternalStore: function (
        subscribe,
        getSnapshot,
        getServerSnapshot
      ) {
        currentHookNameInDev = "useSyncExternalStore";
        updateHookTypesDev();
        return updateSyncExternalStore(
          subscribe,
          getSnapshot,
          getServerSnapshot
        );
      },
      useId: function () {
        currentHookNameInDev = "useId";
        updateHookTypesDev();
        return updateWorkInProgressHook().memoizedState;
      },
      useCacheRefresh: function () {
        currentHookNameInDev = "useCacheRefresh";
        updateHookTypesDev();
        return updateWorkInProgressHook().memoizedState;
      }
    };
    HooksDispatcherOnUpdateInDEV.useMemoCache = useMemoCache;
    HooksDispatcherOnUpdateInDEV.useHostTransitionStatus =
      useHostTransitionStatus;
    HooksDispatcherOnUpdateInDEV.useFormState = function (action) {
      currentHookNameInDev = "useFormState";
      updateHookTypesDev();
      warnOnUseFormStateInDev();
      return updateActionState(action);
    };
    HooksDispatcherOnUpdateInDEV.useActionState = function (action) {
      currentHookNameInDev = "useActionState";
      updateHookTypesDev();
      return updateActionState(action);
    };
    HooksDispatcherOnUpdateInDEV.useOptimistic = function (
      passthrough,
      reducer
    ) {
      currentHookNameInDev = "useOptimistic";
      updateHookTypesDev();
      return updateOptimistic(passthrough, reducer);
    };
    HooksDispatcherOnRerenderInDEV = {
      readContext: function (context) {
        return readContext(context);
      },
      use: use,
      useCallback: function (callback, deps) {
        currentHookNameInDev = "useCallback";
        updateHookTypesDev();
        return updateCallback(callback, deps);
      },
      useContext: function (context) {
        currentHookNameInDev = "useContext";
        updateHookTypesDev();
        return readContext(context);
      },
      useEffect: function (create, deps) {
        currentHookNameInDev = "useEffect";
        updateHookTypesDev();
        updateEffectImpl(2048, Passive, create, deps);
      },
      useImperativeHandle: function (ref, create, deps) {
        currentHookNameInDev = "useImperativeHandle";
        updateHookTypesDev();
        return updateImperativeHandle(ref, create, deps);
      },
      useInsertionEffect: function (create, deps) {
        currentHookNameInDev = "useInsertionEffect";
        updateHookTypesDev();
        return updateEffectImpl(4, Insertion, create, deps);
      },
      useLayoutEffect: function (create, deps) {
        currentHookNameInDev = "useLayoutEffect";
        updateHookTypesDev();
        return updateEffectImpl(4, Layout, create, deps);
      },
      useMemo: function (create, deps) {
        currentHookNameInDev = "useMemo";
        updateHookTypesDev();
        var prevDispatcher = ReactSharedInternals.H;
        ReactSharedInternals.H = InvalidNestedHooksDispatcherOnRerenderInDEV;
        try {
          return updateMemo(create, deps);
        } finally {
          ReactSharedInternals.H = prevDispatcher;
        }
      },
      useReducer: function (reducer, initialArg, init) {
        currentHookNameInDev = "useReducer";
        updateHookTypesDev();
        var prevDispatcher = ReactSharedInternals.H;
        ReactSharedInternals.H = InvalidNestedHooksDispatcherOnRerenderInDEV;
        try {
          return rerenderReducer(reducer, initialArg, init);
        } finally {
          ReactSharedInternals.H = prevDispatcher;
        }
      },
      useRef: function () {
        currentHookNameInDev = "useRef";
        updateHookTypesDev();
        return updateWorkInProgressHook().memoizedState;
      },
      useState: function () {
        currentHookNameInDev = "useState";
        updateHookTypesDev();
        var prevDispatcher = ReactSharedInternals.H;
        ReactSharedInternals.H = InvalidNestedHooksDispatcherOnRerenderInDEV;
        try {
          return rerenderReducer(basicStateReducer);
        } finally {
          ReactSharedInternals.H = prevDispatcher;
        }
      },
      useDebugValue: function () {
        currentHookNameInDev = "useDebugValue";
        updateHookTypesDev();
      },
      useDeferredValue: function (value, initialValue) {
        currentHookNameInDev = "useDeferredValue";
        updateHookTypesDev();
        return rerenderDeferredValue(value, initialValue);
      },
      useTransition: function () {
        currentHookNameInDev = "useTransition";
        updateHookTypesDev();
        return rerenderTransition();
      },
      useSyncExternalStore: function (
        subscribe,
        getSnapshot,
        getServerSnapshot
      ) {
        currentHookNameInDev = "useSyncExternalStore";
        updateHookTypesDev();
        return updateSyncExternalStore(
          subscribe,
          getSnapshot,
          getServerSnapshot
        );
      },
      useId: function () {
        currentHookNameInDev = "useId";
        updateHookTypesDev();
        return updateWorkInProgressHook().memoizedState;
      },
      useCacheRefresh: function () {
        currentHookNameInDev = "useCacheRefresh";
        updateHookTypesDev();
        return updateWorkInProgressHook().memoizedState;
      }
    };
    HooksDispatcherOnRerenderInDEV.useMemoCache = useMemoCache;
    HooksDispatcherOnRerenderInDEV.useHostTransitionStatus =
      useHostTransitionStatus;
    HooksDispatcherOnRerenderInDEV.useFormState = function (action) {
      currentHookNameInDev = "useFormState";
      updateHookTypesDev();
      warnOnUseFormStateInDev();
      return rerenderActionState(action);
    };
    HooksDispatcherOnRerenderInDEV.useActionState = function (action) {
      currentHookNameInDev = "useActionState";
      updateHookTypesDev();
      return rerenderActionState(action);
    };
    HooksDispatcherOnRerenderInDEV.useOptimistic = function (
      passthrough,
      reducer
    ) {
      currentHookNameInDev = "useOptimistic";
      updateHookTypesDev();
      return rerenderOptimistic(passthrough, reducer);
    };
    InvalidNestedHooksDispatcherOnMountInDEV = {
      readContext: function (context) {
        warnInvalidContextAccess();
        return readContext(context);
      },
      use: function (usable) {
        warnInvalidHookAccess();
        return use(usable);
      },
      useCallback: function (callback, deps) {
        currentHookNameInDev = "useCallback";
        warnInvalidHookAccess();
        mountHookTypesDev();
        return mountCallback(callback, deps);
      },
      useContext: function (context) {
        currentHookNameInDev = "useContext";
        warnInvalidHookAccess();
        mountHookTypesDev();
        return readContext(context);
      },
      useEffect: function (create, deps) {
        currentHookNameInDev = "useEffect";
        warnInvalidHookAccess();
        mountHookTypesDev();
        return mountEffect(create, deps);
      },
      useImperativeHandle: function (ref, create, deps) {
        currentHookNameInDev = "useImperativeHandle";
        warnInvalidHookAccess();
        mountHookTypesDev();
        return mountImperativeHandle(ref, create, deps);
      },
      useInsertionEffect: function (create, deps) {
        currentHookNameInDev = "useInsertionEffect";
        warnInvalidHookAccess();
        mountHookTypesDev();
        mountEffectImpl(4, Insertion, create, deps);
      },
      useLayoutEffect: function (create, deps) {
        currentHookNameInDev = "useLayoutEffect";
        warnInvalidHookAccess();
        mountHookTypesDev();
        return mountLayoutEffect(create, deps);
      },
      useMemo: function (create, deps) {
        currentHookNameInDev = "useMemo";
        warnInvalidHookAccess();
        mountHookTypesDev();
        var prevDispatcher = ReactSharedInternals.H;
        ReactSharedInternals.H = InvalidNestedHooksDispatcherOnMountInDEV;
        try {
          return mountMemo(create, deps);
        } finally {
          ReactSharedInternals.H = prevDispatcher;
        }
      },
      useReducer: function (reducer, initialArg, init) {
        currentHookNameInDev = "useReducer";
        warnInvalidHookAccess();
        mountHookTypesDev();
        var prevDispatcher = ReactSharedInternals.H;
        ReactSharedInternals.H = InvalidNestedHooksDispatcherOnMountInDEV;
        try {
          return mountReducer(reducer, initialArg, init);
        } finally {
          ReactSharedInternals.H = prevDispatcher;
        }
      },
      useRef: function (initialValue) {
        currentHookNameInDev = "useRef";
        warnInvalidHookAccess();
        mountHookTypesDev();
        return mountRef(initialValue);
      },
      useState: function (initialState) {
        currentHookNameInDev = "useState";
        warnInvalidHookAccess();
        mountHookTypesDev();
        var prevDispatcher = ReactSharedInternals.H;
        ReactSharedInternals.H = InvalidNestedHooksDispatcherOnMountInDEV;
        try {
          return mountState(initialState);
        } finally {
          ReactSharedInternals.H = prevDispatcher;
        }
      },
      useDebugValue: function () {
        currentHookNameInDev = "useDebugValue";
        warnInvalidHookAccess();
        mountHookTypesDev();
      },
      useDeferredValue: function (value, initialValue) {
        currentHookNameInDev = "useDeferredValue";
        warnInvalidHookAccess();
        mountHookTypesDev();
        return mountDeferredValue(value, initialValue);
      },
      useTransition: function () {
        currentHookNameInDev = "useTransition";
        warnInvalidHookAccess();
        mountHookTypesDev();
        return mountTransition();
      },
      useSyncExternalStore: function (
        subscribe,
        getSnapshot,
        getServerSnapshot
      ) {
        currentHookNameInDev = "useSyncExternalStore";
        warnInvalidHookAccess();
        mountHookTypesDev();
        return mountSyncExternalStore(
          subscribe,
          getSnapshot,
          getServerSnapshot
        );
      },
      useId: function () {
        currentHookNameInDev = "useId";
        warnInvalidHookAccess();
        mountHookTypesDev();
        return mountId();
      },
      useCacheRefresh: function () {
        currentHookNameInDev = "useCacheRefresh";
        mountHookTypesDev();
        return mountRefresh();
      },
      useMemoCache: function (size) {
        warnInvalidHookAccess();
        return useMemoCache(size);
      }
    };
    InvalidNestedHooksDispatcherOnMountInDEV.useHostTransitionStatus =
      useHostTransitionStatus;
    InvalidNestedHooksDispatcherOnMountInDEV.useFormState = function (
      action,
      initialState
    ) {
      currentHookNameInDev = "useFormState";
      warnInvalidHookAccess();
      mountHookTypesDev();
      return mountActionState(action, initialState);
    };
    InvalidNestedHooksDispatcherOnMountInDEV.useActionState = function (
      action,
      initialState
    ) {
      currentHookNameInDev = "useActionState";
      warnInvalidHookAccess();
      mountHookTypesDev();
      return mountActionState(action, initialState);
    };
    InvalidNestedHooksDispatcherOnMountInDEV.useOptimistic = function (
      passthrough
    ) {
      currentHookNameInDev = "useOptimistic";
      warnInvalidHookAccess();
      mountHookTypesDev();
      return mountOptimistic(passthrough);
    };
    InvalidNestedHooksDispatcherOnUpdateInDEV = {
      readContext: function (context) {
        warnInvalidContextAccess();
        return readContext(context);
      },
      use: function (usable) {
        warnInvalidHookAccess();
        return use(usable);
      },
      useCallback: function (callback, deps) {
        currentHookNameInDev = "useCallback";
        warnInvalidHookAccess();
        updateHookTypesDev();
        return updateCallback(callback, deps);
      },
      useContext: function (context) {
        currentHookNameInDev = "useContext";
        warnInvalidHookAccess();
        updateHookTypesDev();
        return readContext(context);
      },
      useEffect: function (create, deps) {
        currentHookNameInDev = "useEffect";
        warnInvalidHookAccess();
        updateHookTypesDev();
        updateEffectImpl(2048, Passive, create, deps);
      },
      useImperativeHandle: function (ref, create, deps) {
        currentHookNameInDev = "useImperativeHandle";
        warnInvalidHookAccess();
        updateHookTypesDev();
        return updateImperativeHandle(ref, create, deps);
      },
      useInsertionEffect: function (create, deps) {
        currentHookNameInDev = "useInsertionEffect";
        warnInvalidHookAccess();
        updateHookTypesDev();
        return updateEffectImpl(4, Insertion, create, deps);
      },
      useLayoutEffect: function (create, deps) {
        currentHookNameInDev = "useLayoutEffect";
        warnInvalidHookAccess();
        updateHookTypesDev();
        return updateEffectImpl(4, Layout, create, deps);
      },
      useMemo: function (create, deps) {
        currentHookNameInDev = "useMemo";
        warnInvalidHookAccess();
        updateHookTypesDev();
        var prevDispatcher = ReactSharedInternals.H;
        ReactSharedInternals.H = InvalidNestedHooksDispatcherOnUpdateInDEV;
        try {
          return updateMemo(create, deps);
        } finally {
          ReactSharedInternals.H = prevDispatcher;
        }
      },
      useReducer: function (reducer, initialArg, init) {
        currentHookNameInDev = "useReducer";
        warnInvalidHookAccess();
        updateHookTypesDev();
        var prevDispatcher = ReactSharedInternals.H;
        ReactSharedInternals.H = InvalidNestedHooksDispatcherOnUpdateInDEV;
        try {
          return updateReducer(reducer, initialArg, init);
        } finally {
          ReactSharedInternals.H = prevDispatcher;
        }
      },
      useRef: function () {
        currentHookNameInDev = "useRef";
        warnInvalidHookAccess();
        updateHookTypesDev();
        return updateWorkInProgressHook().memoizedState;
      },
      useState: function () {
        currentHookNameInDev = "useState";
        warnInvalidHookAccess();
        updateHookTypesDev();
        var prevDispatcher = ReactSharedInternals.H;
        ReactSharedInternals.H = InvalidNestedHooksDispatcherOnUpdateInDEV;
        try {
          return updateReducer(basicStateReducer);
        } finally {
          ReactSharedInternals.H = prevDispatcher;
        }
      },
      useDebugValue: function () {
        currentHookNameInDev = "useDebugValue";
        warnInvalidHookAccess();
        updateHookTypesDev();
      },
      useDeferredValue: function (value, initialValue) {
        currentHookNameInDev = "useDeferredValue";
        warnInvalidHookAccess();
        updateHookTypesDev();
        return updateDeferredValue(value, initialValue);
      },
      useTransition: function () {
        currentHookNameInDev = "useTransition";
        warnInvalidHookAccess();
        updateHookTypesDev();
        return updateTransition();
      },
      useSyncExternalStore: function (
        subscribe,
        getSnapshot,
        getServerSnapshot
      ) {
        currentHookNameInDev = "useSyncExternalStore";
        warnInvalidHookAccess();
        updateHookTypesDev();
        return updateSyncExternalStore(
          subscribe,
          getSnapshot,
          getServerSnapshot
        );
      },
      useId: function () {
        currentHookNameInDev = "useId";
        warnInvalidHookAccess();
        updateHookTypesDev();
        return updateWorkInProgressHook().memoizedState;
      },
      useCacheRefresh: function () {
        currentHookNameInDev = "useCacheRefresh";
        updateHookTypesDev();
        return updateWorkInProgressHook().memoizedState;
      },
      useMemoCache: function (size) {
        warnInvalidHookAccess();
        return useMemoCache(size);
      }
    };
    InvalidNestedHooksDispatcherOnUpdateInDEV.useHostTransitionStatus =
      useHostTransitionStatus;
    InvalidNestedHooksDispatcherOnUpdateInDEV.useFormState = function (action) {
      currentHookNameInDev = "useFormState";
      warnInvalidHookAccess();
      updateHookTypesDev();
      return updateActionState(action);
    };
    InvalidNestedHooksDispatcherOnUpdateInDEV.useActionState = function (
      action
    ) {
      currentHookNameInDev = "useActionState";
      warnInvalidHookAccess();
      updateHookTypesDev();
      return updateActionState(action);
    };
    InvalidNestedHooksDispatcherOnUpdateInDEV.useOptimistic = function (
      passthrough,
      reducer
    ) {
      currentHookNameInDev = "useOptimistic";
      warnInvalidHookAccess();
      updateHookTypesDev();
      return updateOptimistic(passthrough, reducer);
    };
    InvalidNestedHooksDispatcherOnRerenderInDEV = {
      readContext: function (context) {
        warnInvalidContextAccess();
        return readContext(context);
      },
      use: function (usable) {
        warnInvalidHookAccess();
        return use(usable);
      },
      useCallback: function (callback, deps) {
        currentHookNameInDev = "useCallback";
        warnInvalidHookAccess();
        updateHookTypesDev();
        return updateCallback(callback, deps);
      },
      useContext: function (context) {
        currentHookNameInDev = "useContext";
        warnInvalidHookAccess();
        updateHookTypesDev();
        return readContext(context);
      },
      useEffect: function (create, deps) {
        currentHookNameInDev = "useEffect";
        warnInvalidHookAccess();
        updateHookTypesDev();
        updateEffectImpl(2048, Passive, create, deps);
      },
      useImperativeHandle: function (ref, create, deps) {
        currentHookNameInDev = "useImperativeHandle";
        warnInvalidHookAccess();
        updateHookTypesDev();
        return updateImperativeHandle(ref, create, deps);
      },
      useInsertionEffect: function (create, deps) {
        currentHookNameInDev = "useInsertionEffect";
        warnInvalidHookAccess();
        updateHookTypesDev();
        return updateEffectImpl(4, Insertion, create, deps);
      },
      useLayoutEffect: function (create, deps) {
        currentHookNameInDev = "useLayoutEffect";
        warnInvalidHookAccess();
        updateHookTypesDev();
        return updateEffectImpl(4, Layout, create, deps);
      },
      useMemo: function (create, deps) {
        currentHookNameInDev = "useMemo";
        warnInvalidHookAccess();
        updateHookTypesDev();
        var prevDispatcher = ReactSharedInternals.H;
        ReactSharedInternals.H = InvalidNestedHooksDispatcherOnUpdateInDEV;
        try {
          return updateMemo(create, deps);
        } finally {
          ReactSharedInternals.H = prevDispatcher;
        }
      },
      useReducer: function (reducer, initialArg, init) {
        currentHookNameInDev = "useReducer";
        warnInvalidHookAccess();
        updateHookTypesDev();
        var prevDispatcher = ReactSharedInternals.H;
        ReactSharedInternals.H = InvalidNestedHooksDispatcherOnUpdateInDEV;
        try {
          return rerenderReducer(reducer, initialArg, init);
        } finally {
          ReactSharedInternals.H = prevDispatcher;
        }
      },
      useRef: function () {
        currentHookNameInDev = "useRef";
        warnInvalidHookAccess();
        updateHookTypesDev();
        return updateWorkInProgressHook().memoizedState;
      },
      useState: function () {
        currentHookNameInDev = "useState";
        warnInvalidHookAccess();
        updateHookTypesDev();
        var prevDispatcher = ReactSharedInternals.H;
        ReactSharedInternals.H = InvalidNestedHooksDispatcherOnUpdateInDEV;
        try {
          return rerenderReducer(basicStateReducer);
        } finally {
          ReactSharedInternals.H = prevDispatcher;
        }
      },
      useDebugValue: function () {
        currentHookNameInDev = "useDebugValue";
        warnInvalidHookAccess();
        updateHookTypesDev();
      },
      useDeferredValue: function (value, initialValue) {
        currentHookNameInDev = "useDeferredValue";
        warnInvalidHookAccess();
        updateHookTypesDev();
        return rerenderDeferredValue(value, initialValue);
      },
      useTransition: function () {
        currentHookNameInDev = "useTransition";
        warnInvalidHookAccess();
        updateHookTypesDev();
        return rerenderTransition();
      },
      useSyncExternalStore: function (
        subscribe,
        getSnapshot,
        getServerSnapshot
      ) {
        currentHookNameInDev = "useSyncExternalStore";
        warnInvalidHookAccess();
        updateHookTypesDev();
        return updateSyncExternalStore(
          subscribe,
          getSnapshot,
          getServerSnapshot
        );
      },
      useId: function () {
        currentHookNameInDev = "useId";
        warnInvalidHookAccess();
        updateHookTypesDev();
        return updateWorkInProgressHook().memoizedState;
      },
      useCacheRefresh: function () {
        currentHookNameInDev = "useCacheRefresh";
        updateHookTypesDev();
        return updateWorkInProgressHook().memoizedState;
      },
      useMemoCache: function (size) {
        warnInvalidHookAccess();
        return useMemoCache(size);
      }
    };
    InvalidNestedHooksDispatcherOnRerenderInDEV.useHostTransitionStatus =
      useHostTransitionStatus;
    InvalidNestedHooksDispatcherOnRerenderInDEV.useFormState = function (
      action
    ) {
      currentHookNameInDev = "useFormState";
      warnInvalidHookAccess();
      updateHookTypesDev();
      return rerenderActionState(action);
    };
    InvalidNestedHooksDispatcherOnRerenderInDEV.useActionState = function (
      action
    ) {
      currentHookNameInDev = "useActionState";
      warnInvalidHookAccess();
      updateHookTypesDev();
      return rerenderActionState(action);
    };
    InvalidNestedHooksDispatcherOnRerenderInDEV.useOptimistic = function (
      passthrough,
      reducer
    ) {
      currentHookNameInDev = "useOptimistic";
      warnInvalidHookAccess();
      updateHookTypesDev();
      return rerenderOptimistic(passthrough, reducer);
    };
    var callComponent = {
        "react-stack-bottom-frame": function (Component, props, secondArg) {
          var wasRendering = isRendering;
          isRendering = !0;
          try {
            return Component(props, secondArg);
          } finally {
            isRendering = wasRendering;
          }
        }
      },
      callComponentInDEV =
        callComponent["react-stack-bottom-frame"].bind(callComponent),
      callRender = {
        "react-stack-bottom-frame": function (instance) {
          var wasRendering = isRendering;
          isRendering = !0;
          try {
            return instance.render();
          } finally {
            isRendering = wasRendering;
          }
        }
      },
      callRenderInDEV = callRender["react-stack-bottom-frame"].bind(callRender),
      callComponentDidMount = {
        "react-stack-bottom-frame": function (finishedWork, instance) {
          try {
            instance.componentDidMount();
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
        }
      },
      callComponentDidMountInDEV = callComponentDidMount[
        "react-stack-bottom-frame"
      ].bind(callComponentDidMount),
      callComponentDidUpdate = {
        "react-stack-bottom-frame": function (
          finishedWork,
          instance,
          prevProps,
          prevState,
          snapshot
        ) {
          try {
            instance.componentDidUpdate(prevProps, prevState, snapshot);
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
        }
      },
      callComponentDidUpdateInDEV = callComponentDidUpdate[
        "react-stack-bottom-frame"
      ].bind(callComponentDidUpdate),
      callComponentDidCatch = {
        "react-stack-bottom-frame": function (instance, errorInfo) {
          var stack = errorInfo.stack;
          instance.componentDidCatch(errorInfo.value, {
            componentStack: null !== stack ? stack : ""
          });
        }
      },
      callComponentDidCatchInDEV = callComponentDidCatch[
        "react-stack-bottom-frame"
      ].bind(callComponentDidCatch),
      callComponentWillUnmount = {
        "react-stack-bottom-frame": function (
          current,
          nearestMountedAncestor,
          instance
        ) {
          try {
            instance.componentWillUnmount();
          } catch (error) {
            captureCommitPhaseError(current, nearestMountedAncestor, error);
          }
        }
      },
      callComponentWillUnmountInDEV = callComponentWillUnmount[
        "react-stack-bottom-frame"
      ].bind(callComponentWillUnmount),
      callCreate = {
        "react-stack-bottom-frame": function (effect) {
          null != effect.resourceKind &&
            console.error(
              "Expected only SimpleEffects when enableUseResourceEffectHook is disabled, got %s",
              effect.resourceKind
            );
          var create = effect.create;
          effect = effect.inst;
          create = create();
          return (effect.destroy = create);
        }
      },
      callCreateInDEV = callCreate["react-stack-bottom-frame"].bind(callCreate),
      callDestroy = {
        "react-stack-bottom-frame": function (
          current,
          nearestMountedAncestor,
          destroy
        ) {
          try {
            destroy();
          } catch (error) {
            captureCommitPhaseError(current, nearestMountedAncestor, error);
          }
        }
      },
      callDestroyInDEV =
        callDestroy["react-stack-bottom-frame"].bind(callDestroy),
      callLazyInit = {
        "react-stack-bottom-frame": function (lazy) {
          var init = lazy._init;
          return init(lazy._payload);
        }
      },
      callLazyInitInDEV =
        callLazyInit["react-stack-bottom-frame"].bind(callLazyInit),
      thenableState = null,
      thenableIndexCounter = 0,
      currentDebugInfo = null,
      didWarnAboutMaps;
    var didWarnAboutGenerators = (didWarnAboutMaps = !1);
    var ownerHasKeyUseWarning = {};
    var ownerHasFunctionTypeWarning = {};
    var ownerHasSymbolTypeWarning = {};
    warnForMissingKey = function (returnFiber, workInProgress, child) {
      if (
        null !== child &&
        "object" === typeof child &&
        child._store &&
        ((!child._store.validated && null == child.key) ||
          2 === child._store.validated)
      ) {
        if ("object" !== typeof child._store)
          throw Error(
            "React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue."
          );
        child._store.validated = 1;
        var componentName = getComponentNameFromFiber(returnFiber),
          componentKey = componentName || "null";
        if (!ownerHasKeyUseWarning[componentKey]) {
          ownerHasKeyUseWarning[componentKey] = !0;
          child = child._owner;
          returnFiber = returnFiber._debugOwner;
          var currentComponentErrorInfo = "";
          returnFiber &&
            "number" === typeof returnFiber.tag &&
            (componentKey = getComponentNameFromFiber(returnFiber)) &&
            (currentComponentErrorInfo =
              "\n\nCheck the render method of `" + componentKey + "`.");
          currentComponentErrorInfo ||
            (componentName &&
              (currentComponentErrorInfo =
                "\n\nCheck the top-level render call using <" +
                componentName +
                ">."));
          var childOwnerAppendix = "";
          null != child &&
            returnFiber !== child &&
            ((componentName = null),
            "number" === typeof child.tag
              ? (componentName = getComponentNameFromFiber(child))
              : "string" === typeof child.name && (componentName = child.name),
            componentName &&
              (childOwnerAppendix =
                " It was passed a child from " + componentName + "."));
          runWithFiberInDEV(workInProgress, function () {
            console.error(
              'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
              currentComponentErrorInfo,
              childOwnerAppendix
            );
          });
        }
      }
    };
    var reconcileChildFibers = createChildReconciler(!0),
      mountChildFibers = createChildReconciler(!1),
      suspenseHandlerStackCursor = createCursor(null),
      shellBoundary = null,
      SubtreeSuspenseContextMask = 1,
      ForceSuspenseFallback = 2,
      suspenseStackCursor = createCursor(0),
      fakeInternalInstance = {};
    var didWarnAboutStateAssignmentForComponent = new Set();
    var didWarnAboutUninitializedState = new Set();
    var didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate = new Set();
    var didWarnAboutLegacyLifecyclesAndDerivedState = new Set();
    var didWarnAboutDirectlyAssigningPropsToState = new Set();
    var didWarnAboutUndefinedDerivedState = new Set();
    var didWarnAboutContextTypes$1 = new Set();
    var didWarnAboutChildContextTypes = new Set();
    var didWarnAboutInvalidateContextType = new Set();
    var didWarnOnInvalidCallback = new Set();
    Object.freeze(fakeInternalInstance);
    var classComponentUpdater = {
        isMounted: function (component) {
          var owner = current;
          if (null !== owner && isRendering && 1 === owner.tag) {
            var instance = owner.stateNode;
            instance._warnedAboutRefsInRender ||
              console.error(
                "%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.",
                getComponentNameFromFiber(owner) || "A component"
              );
            instance._warnedAboutRefsInRender = !0;
          }
          return (component = component._reactInternals)
            ? getNearestMountedFiber(component) === component
            : !1;
        },
        enqueueSetState: function (inst, payload, callback) {
          inst = inst._reactInternals;
          var lane = requestUpdateLane(inst),
            update = createUpdate(lane);
          update.payload = payload;
          void 0 !== callback &&
            null !== callback &&
            (warnOnInvalidCallback(callback), (update.callback = callback));
          payload = enqueueUpdate(inst, update, lane);
          null !== payload &&
            (scheduleUpdateOnFiber(payload, inst, lane),
            entangleTransitions(payload, inst, lane));
          markStateUpdateScheduled(inst, lane);
        },
        enqueueReplaceState: function (inst, payload, callback) {
          inst = inst._reactInternals;
          var lane = requestUpdateLane(inst),
            update = createUpdate(lane);
          update.tag = ReplaceState;
          update.payload = payload;
          void 0 !== callback &&
            null !== callback &&
            (warnOnInvalidCallback(callback), (update.callback = callback));
          payload = enqueueUpdate(inst, update, lane);
          null !== payload &&
            (scheduleUpdateOnFiber(payload, inst, lane),
            entangleTransitions(payload, inst, lane));
          markStateUpdateScheduled(inst, lane);
        },
        enqueueForceUpdate: function (inst, callback) {
          inst = inst._reactInternals;
          var lane = requestUpdateLane(inst),
            update = createUpdate(lane);
          update.tag = ForceUpdate;
          void 0 !== callback &&
            null !== callback &&
            (warnOnInvalidCallback(callback), (update.callback = callback));
          callback = enqueueUpdate(inst, update, lane);
          null !== callback &&
            (scheduleUpdateOnFiber(callback, inst, lane),
            entangleTransitions(callback, inst, lane));
          null !== injectedProfilingHooks &&
            "function" ===
              typeof injectedProfilingHooks.markForceUpdateScheduled &&
            injectedProfilingHooks.markForceUpdateScheduled(inst, lane);
        }
      },
      reportGlobalError =
        "function" === typeof reportError
          ? reportError
          : function (error) {
              if (
                "object" === typeof window &&
                "function" === typeof window.ErrorEvent
              ) {
                var event = new window.ErrorEvent("error", {
                  bubbles: !0,
                  cancelable: !0,
                  message:
                    "object" === typeof error &&
                    null !== error &&
                    "string" === typeof error.message
                      ? String(error.message)
                      : String(error),
                  error: error
                });
                if (!window.dispatchEvent(event)) return;
              } else if (
                "object" === typeof process &&
                "function" === typeof process.emit
              ) {
                process.emit("uncaughtException", error);
                return;
              }
              console.error(error);
            },
      componentName = null,
      errorBoundaryName = null,
      SelectiveHydrationException = Error(
        "This is not a real error. It's an implementation detail of React's selective hydration feature. If this leaks into userspace, it's a bug in React. Please file an issue."
      ),
      didReceiveUpdate = !1;
    var didWarnAboutBadClass = {};
    var didWarnAboutContextTypeOnFunctionComponent = {};
    var didWarnAboutContextTypes = {};
    var didWarnAboutGetDerivedStateOnFunctionComponent = {};
    var didWarnAboutReassigningProps = !1;
    var didWarnAboutRevealOrder = {};
    var didWarnAboutTailOptions = {};
    var SUSPENDED_MARKER = {
        dehydrated: null,
        treeContext: null,
        retryLane: 0
      },
      hasWarnedAboutUsingNoValuePropOnContextProvider = !1,
      valueCursor = createCursor(null);
    var rendererCursorDEV = createCursor(null);
    var rendererSigil = {};
    var currentlyRenderingFiber = null,
      lastContextDependency = null,
      isDisallowedContextReadInDEV = !1,
      UpdateState = 0,
      ReplaceState = 1,
      ForceUpdate = 2,
      CaptureUpdate = 3,
      hasForceUpdate = !1;
    var didWarnUpdateInsideUpdate = !1;
    var currentlyProcessingQueue = null;
    var didReadFromEntangledAsyncAction = !1,
      didWarnAboutUndefinedSnapshotBeforeUpdate = null;
    didWarnAboutUndefinedSnapshotBeforeUpdate = new Set();
    var offscreenSubtreeIsHidden = !1,
      offscreenSubtreeWasHidden = !1,
      needsFormReset = !1,
      PossiblyWeakSet = "function" === typeof WeakSet ? WeakSet : Set,
      nextEffect = null,
      inProgressLanes = null,
      inProgressRoot = null,
      shouldFireAfterActiveInstanceBlur = !1,
      hostParent = null,
      hostParentIsContainer = !1,
      currentHoistableRoot = null,
      suspenseyCommitFlag = 8192;
    var hasBadMapPolyfill = !1;
    try {
      var nonExtensibleObject = Object.preventExtensions({});
      new Map([[nonExtensibleObject, null]]);
      new Set([nonExtensibleObject]);
    } catch (e$7) {
      hasBadMapPolyfill = !0;
    }
    var DefaultAsyncDispatcher = {
      getCacheForType: function (resourceType) {
        var cache = readContext(CacheContext),
          cacheForType = cache.data.get(resourceType);
        void 0 === cacheForType &&
          ((cacheForType = resourceType()),
          cache.data.set(resourceType, cacheForType));
        return cacheForType;
      },
      getOwner: function () {
        return current;
      }
    };
    if ("function" === typeof Symbol && Symbol.for) {
      var symbolFor = Symbol.for;
      symbolFor("selector.component");
      symbolFor("selector.has_pseudo_class");
      symbolFor("selector.role");
      symbolFor("selector.test_id");
      symbolFor("selector.text");
    }
    var commitHooks = [],
      PossiblyWeakMap = "function" === typeof WeakMap ? WeakMap : Map,
      NoContext = 0,
      RenderContext = 2,
      CommitContext = 4,
      RootInProgress = 0,
      RootFatalErrored = 1,
      RootErrored = 2,
      RootSuspended = 3,
      RootSuspendedWithDelay = 4,
      RootSuspendedAtTheShell = 6,
      RootCompleted = 5,
      executionContext = NoContext,
      workInProgressRoot = null,
      workInProgress = null,
      workInProgressRootRenderLanes = 0,
      NotSuspended = 0,
      SuspendedOnError = 1,
      SuspendedOnData = 2,
      SuspendedOnImmediate = 3,
      SuspendedOnInstance = 4,
      SuspendedOnInstanceAndReadyToContinue = 5,
      SuspendedOnDeprecatedThrowPromise = 6,
      SuspendedAndReadyToContinue = 7,
      SuspendedOnHydration = 8,
      SuspendedOnAction = 9,
      workInProgressSuspendedReason = NotSuspended,
      workInProgressThrownValue = null,
      workInProgressRootDidSkipSuspendedSiblings = !1,
      workInProgressRootIsPrerendering = !1,
      workInProgressRootDidAttachPingListener = !1,
      entangledRenderLanes = 0,
      workInProgressRootExitStatus = RootInProgress,
      workInProgressRootSkippedLanes = 0,
      workInProgressRootInterleavedUpdatedLanes = 0,
      workInProgressRootPingedLanes = 0,
      workInProgressDeferredLane = 0,
      workInProgressSuspendedRetryLanes = 0,
      workInProgressRootConcurrentErrors = null,
      workInProgressRootRecoverableErrors = null,
      workInProgressRootDidIncludeRecursiveRenderUpdate = !1,
      globalMostRecentFallbackTime = 0,
      FALLBACK_THROTTLE_MS = 300,
      workInProgressRootRenderTargetTime = Infinity,
      RENDER_TIMEOUT_MS = 500,
      workInProgressTransitions = null,
      legacyErrorBoundariesThatAlreadyFailed = null,
      rootDoesHavePassiveEffects = !1,
      rootWithPendingPassiveEffects = null,
      pendingPassiveEffectsLanes = 0,
      pendingPassiveEffectsRemainingLanes = 0,
      pendingPassiveTransitions = null,
      NESTED_UPDATE_LIMIT = 50,
      nestedUpdateCount = 0,
      rootWithNestedUpdates = null,
      isFlushingPassiveEffects = !1,
      didScheduleUpdateDuringPassiveEffects = !1,
      NESTED_PASSIVE_UPDATE_LIMIT = 50,
      nestedPassiveUpdateCount = 0,
      rootWithPassiveNestedUpdates = null,
      isRunningInsertionEffect = !1,
      IMMEDIATE_COMMIT = 0,
      SUSPENDED_COMMIT = 1,
      THROTTLED_COMMIT = 2,
      didWarnStateUpdateForNotYetMountedComponent = null,
      didWarnAboutUpdateInRender = !1;
    var didWarnAboutUpdateInRenderForAnotherComponent = new Set();
    var fakeActCallbackNode$1 = {},
      firstScheduledRoot = null,
      lastScheduledRoot = null,
      didScheduleMicrotask = !1,
      didScheduleMicrotask_act = !1,
      mightHavePendingSyncWork = !1,
      isFlushingWork = !1,
      currentEventTransitionLane = 0,
      fakeActCallbackNode = {};
    (function () {
      for (var i = 0; i < simpleEventPluginEvents.length; i++) {
        var eventName = simpleEventPluginEvents[i],
          domEventName = eventName.toLowerCase();
        eventName = eventName[0].toUpperCase() + eventName.slice(1);
        registerSimpleEvent(domEventName, "on" + eventName);
      }
      registerSimpleEvent(ANIMATION_END, "onAnimationEnd");
      registerSimpleEvent(ANIMATION_ITERATION, "onAnimationIteration");
      registerSimpleEvent(ANIMATION_START, "onAnimationStart");
      registerSimpleEvent("dblclick", "onDoubleClick");
      registerSimpleEvent("focusin", "onFocus");
      registerSimpleEvent("focusout", "onBlur");
      registerSimpleEvent(TRANSITION_RUN, "onTransitionRun");
      registerSimpleEvent(TRANSITION_START, "onTransitionStart");
      registerSimpleEvent(TRANSITION_CANCEL, "onTransitionCancel");
      registerSimpleEvent(TRANSITION_END, "onTransitionEnd");
    })();
    registerDirectEvent("onMouseEnter", ["mouseout", "mouseover"]);
    registerDirectEvent("onMouseLeave", ["mouseout", "mouseover"]);
    registerDirectEvent("onPointerEnter", ["pointerout", "pointerover"]);
    registerDirectEvent("onPointerLeave", ["pointerout", "pointerover"]);
    registerTwoPhaseEvent(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " "
      )
    );
    registerTwoPhaseEvent(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    );
    registerTwoPhaseEvent("onBeforeInput", [
      "compositionend",
      "keypress",
      "textInput",
      "paste"
    ]);
    registerTwoPhaseEvent(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" ")
    );
    registerTwoPhaseEvent(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" ")
    );
    registerTwoPhaseEvent(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
    );
    var mediaEventTypes =
        "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
          " "
        ),
      nonDelegatedEvents = new Set(
        "beforetoggle cancel close invalid load scroll scrollend toggle"
          .split(" ")
          .concat(mediaEventTypes)
      ),
      listeningMarker = "_reactListening" + Math.random().toString(36).slice(2),
      didWarnControlledToUncontrolled = !1,
      didWarnUncontrolledToControlled = !1,
      didWarnFormActionType = !1,
      didWarnFormActionName = !1,
      didWarnFormActionTarget = !1,
      didWarnFormActionMethod = !1,
      didWarnPopoverTargetObject = !1;
    var didWarnForNewBooleanPropsWithEmptyValue = {};
    var canDiffStyleForHydrationWarning = !0;
    var NORMALIZE_NEWLINES_REGEX = /\r\n?/g,
      NORMALIZE_NULL_AND_REPLACEMENT_REGEX = /\u0000|\uFFFD/g,
      xlinkNamespace = "http://www.w3.org/1999/xlink",
      xmlNamespace = "http://www.w3.org/XML/1998/namespace",
      EXPECTED_FORM_ACTION_URL =
        "javascript:throw new Error('React form unexpectedly submitted.')",
      SUPPRESS_HYDRATION_WARNING = "suppressHydrationWarning",
      SUSPENSE_START_DATA = "$",
      SUSPENSE_END_DATA = "/$",
      SUSPENSE_PENDING_START_DATA = "$?",
      SUSPENSE_FALLBACK_START_DATA = "$!",
      FORM_STATE_IS_MATCHING = "F!",
      FORM_STATE_IS_NOT_MATCHING = "F",
      DOCUMENT_READY_STATE_COMPLETE = "complete",
      STYLE = "style",
      HostContextNamespaceNone = 0,
      HostContextNamespaceSvg = 1,
      HostContextNamespaceMath = 2,
      eventsEnabled = null,
      selectionInformation = null,
      warnedUnknownTags = { dialog: !0, webview: !0 },
      currentPopstateTransitionEvent = null,
      scheduleTimeout = "function" === typeof setTimeout ? setTimeout : void 0,
      cancelTimeout =
        "function" === typeof clearTimeout ? clearTimeout : void 0,
      noTimeout = -1,
      localPromise = "function" === typeof Promise ? Promise : void 0,
      scheduleMicrotask =
        "function" === typeof queueMicrotask
          ? queueMicrotask
          : "undefined" !== typeof localPromise
            ? function (callback) {
                return localPromise
                  .resolve(null)
                  .then(callback)
                  .catch(handleErrorInNextTick);
              }
            : scheduleTimeout,
      NotLoaded = 0,
      Loaded = 1,
      Errored = 2,
      Settled = 3,
      Inserted = 4,
      preloadPropsMap = new Map(),
      preconnectsSet = new Set(),
      previousDispatcher = ReactDOMSharedInternals.d;
    ReactDOMSharedInternals.d = {
      f: function () {
        var previousWasRendering = previousDispatcher.f(),
          wasRendering = flushSyncWork$1();
        return previousWasRendering || wasRendering;
      },
      r: function (form) {
        var formInst = getInstanceFromNode(form);
        null !== formInst && 5 === formInst.tag && "form" === formInst.type
          ? requestFormReset$2(formInst)
          : previousDispatcher.r(form);
      },
      D: function (href) {
        previousDispatcher.D(href);
        preconnectAs("dns-prefetch", href, null);
      },
      C: function (href, crossOrigin) {
        previousDispatcher.C(href, crossOrigin);
        preconnectAs("preconnect", href, crossOrigin);
      },
      L: function (href, as, options) {
        previousDispatcher.L(href, as, options);
        var ownerDocument = globalDocument;
        if (ownerDocument && href && as) {
          var preloadSelector =
            'link[rel="preload"][as="' +
            escapeSelectorAttributeValueInsideDoubleQuotes(as) +
            '"]';
          "image" === as
            ? options && options.imageSrcSet
              ? ((preloadSelector +=
                  '[imagesrcset="' +
                  escapeSelectorAttributeValueInsideDoubleQuotes(
                    options.imageSrcSet
                  ) +
                  '"]'),
                "string" === typeof options.imageSizes &&
                  (preloadSelector +=
                    '[imagesizes="' +
                    escapeSelectorAttributeValueInsideDoubleQuotes(
                      options.imageSizes
                    ) +
                    '"]'))
              : (preloadSelector +=
                  '[href="' +
                  escapeSelectorAttributeValueInsideDoubleQuotes(href) +
                  '"]')
            : (preloadSelector +=
                '[href="' +
                escapeSelectorAttributeValueInsideDoubleQuotes(href) +
                '"]');
          var key = preloadSelector;
          switch (as) {
            case "style":
              key = getStyleKey(href);
              break;
            case "script":
              key = getScriptKey(href);
          }
          preloadPropsMap.has(key) ||
            ((href = assign(
              {
                rel: "preload",
                href:
                  "image" === as && options && options.imageSrcSet
                    ? void 0
                    : href,
                as: as
              },
              options
            )),
            preloadPropsMap.set(key, href),
            null !== ownerDocument.querySelector(preloadSelector) ||
              ("style" === as &&
                ownerDocument.querySelector(
                  getStylesheetSelectorFromKey(key)
                )) ||
              ("script" === as &&
                ownerDocument.querySelector(getScriptSelectorFromKey(key))) ||
              ((as = ownerDocument.createElement("link")),
              setInitialProperties(as, "link", href),
              markNodeAsHoistable(as),
              ownerDocument.head.appendChild(as)));
        }
      },
      m: function (href, options) {
        previousDispatcher.m(href, options);
        var ownerDocument = globalDocument;
        if (ownerDocument && href) {
          var as =
              options && "string" === typeof options.as ? options.as : "script",
            preloadSelector =
              'link[rel="modulepreload"][as="' +
              escapeSelectorAttributeValueInsideDoubleQuotes(as) +
              '"][href="' +
              escapeSelectorAttributeValueInsideDoubleQuotes(href) +
              '"]',
            key = preloadSelector;
          switch (as) {
            case "audioworklet":
            case "paintworklet":
            case "serviceworker":
            case "sharedworker":
            case "worker":
            case "script":
              key = getScriptKey(href);
          }
          if (
            !preloadPropsMap.has(key) &&
            ((href = assign({ rel: "modulepreload", href: href }, options)),
            preloadPropsMap.set(key, href),
            null === ownerDocument.querySelector(preloadSelector))
          ) {
            switch (as) {
              case "audioworklet":
              case "paintworklet":
              case "serviceworker":
              case "sharedworker":
              case "worker":
              case "script":
                if (ownerDocument.querySelector(getScriptSelectorFromKey(key)))
                  return;
            }
            as = ownerDocument.createElement("link");
            setInitialProperties(as, "link", href);
            markNodeAsHoistable(as);
            ownerDocument.head.appendChild(as);
          }
        }
      },
      X: function (src, options) {
        previousDispatcher.X(src, options);
        var ownerDocument = globalDocument;
        if (ownerDocument && src) {
          var scripts = getResourcesFromRoot(ownerDocument).hoistableScripts,
            key = getScriptKey(src),
            resource = scripts.get(key);
          resource ||
            ((resource = ownerDocument.querySelector(
              getScriptSelectorFromKey(key)
            )),
            resource ||
              ((src = assign({ src: src, async: !0 }, options)),
              (options = preloadPropsMap.get(key)) &&
                adoptPreloadPropsForScript(src, options),
              (resource = ownerDocument.createElement("script")),
              markNodeAsHoistable(resource),
              setInitialProperties(resource, "link", src),
              ownerDocument.head.appendChild(resource)),
            (resource = {
              type: "script",
              instance: resource,
              count: 1,
              state: null
            }),
            scripts.set(key, resource));
        }
      },
      S: function (href, precedence, options) {
        previousDispatcher.S(href, precedence, options);
        var ownerDocument = globalDocument;
        if (ownerDocument && href) {
          var styles = getResourcesFromRoot(ownerDocument).hoistableStyles,
            key = getStyleKey(href);
          precedence = precedence || "default";
          var resource = styles.get(key);
          if (!resource) {
            var state = { loading: NotLoaded, preload: null };
            if (
              (resource = ownerDocument.querySelector(
                getStylesheetSelectorFromKey(key)
              ))
            )
              state.loading = Loaded | Inserted;
            else {
              href = assign(
                {
                  rel: "stylesheet",
                  href: href,
                  "data-precedence": precedence
                },
                options
              );
              (options = preloadPropsMap.get(key)) &&
                adoptPreloadPropsForStylesheet(href, options);
              var link = (resource = ownerDocument.createElement("link"));
              markNodeAsHoistable(link);
              setInitialProperties(link, "link", href);
              link._p = new Promise(function (resolve, reject) {
                link.onload = resolve;
                link.onerror = reject;
              });
              link.addEventListener("load", function () {
                state.loading |= Loaded;
              });
              link.addEventListener("error", function () {
                state.loading |= Errored;
              });
              state.loading |= Inserted;
              insertStylesheet(resource, precedence, ownerDocument);
            }
            resource = {
              type: "stylesheet",
              instance: resource,
              count: 1,
              state: state
            };
            styles.set(key, resource);
          }
        }
      },
      M: function (src, options) {
        previousDispatcher.M(src, options);
        var ownerDocument = globalDocument;
        if (ownerDocument && src) {
          var scripts = getResourcesFromRoot(ownerDocument).hoistableScripts,
            key = getScriptKey(src),
            resource = scripts.get(key);
          resource ||
            ((resource = ownerDocument.querySelector(
              getScriptSelectorFromKey(key)
            )),
            resource ||
              ((src = assign({ src: src, async: !0, type: "module" }, options)),
              (options = preloadPropsMap.get(key)) &&
                adoptPreloadPropsForScript(src, options),
              (resource = ownerDocument.createElement("script")),
              markNodeAsHoistable(resource),
              setInitialProperties(resource, "link", src),
              ownerDocument.head.appendChild(resource)),
            (resource = {
              type: "script",
              instance: resource,
              count: 1,
              state: null
            }),
            scripts.set(key, resource));
        }
      }
    };
    var globalDocument = "undefined" === typeof document ? null : document,
      tagCaches = null,
      suspendedState = null,
      LAST_PRECEDENCE = null,
      precedencesByRoot = null,
      NotPendingTransition = NotPending,
      HostTransitionContext = {
        $$typeof: REACT_CONTEXT_TYPE,
        Provider: null,
        Consumer: null,
        _currentValue: NotPendingTransition,
        _currentValue2: NotPendingTransition,
        _threadCount: 0
      },
      badgeFormat = "%c%s%c ",
      badgeStyle =
        "background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px",
      resetStyle = "",
      pad = " ",
      bind = Function.prototype.bind;
    var didWarnAboutNestedUpdates = !1;
    var overrideHookState = null,
      overrideHookStateDeletePath = null,
      overrideHookStateRenamePath = null,
      overrideProps = null,
      overridePropsDeletePath = null,
      overridePropsRenamePath = null,
      scheduleUpdate = null,
      setErrorHandler = null,
      setSuspenseHandler = null;
    overrideHookState = function (fiber, id, path, value) {
      id = findHook(fiber, id);
      null !== id &&
        ((path = copyWithSetImpl(id.memoizedState, path, 0, value)),
        (id.memoizedState = path),
        (id.baseState = path),
        (fiber.memoizedProps = assign({}, fiber.memoizedProps)),
        (path = enqueueConcurrentRenderForLane(fiber, 2)),
        null !== path && scheduleUpdateOnFiber(path, fiber, 2));
    };
    overrideHookStateDeletePath = function (fiber, id, path) {
      id = findHook(fiber, id);
      null !== id &&
        ((path = copyWithDeleteImpl(id.memoizedState, path, 0)),
        (id.memoizedState = path),
        (id.baseState = path),
        (fiber.memoizedProps = assign({}, fiber.memoizedProps)),
        (path = enqueueConcurrentRenderForLane(fiber, 2)),
        null !== path && scheduleUpdateOnFiber(path, fiber, 2));
    };
    overrideHookStateRenamePath = function (fiber, id, oldPath, newPath) {
      id = findHook(fiber, id);
      null !== id &&
        ((oldPath = copyWithRename(id.memoizedState, oldPath, newPath)),
        (id.memoizedState = oldPath),
        (id.baseState = oldPath),
        (fiber.memoizedProps = assign({}, fiber.memoizedProps)),
        (oldPath = enqueueConcurrentRenderForLane(fiber, 2)),
        null !== oldPath && scheduleUpdateOnFiber(oldPath, fiber, 2));
    };
    overrideProps = function (fiber, path, value) {
      fiber.pendingProps = copyWithSetImpl(fiber.memoizedProps, path, 0, value);
      fiber.alternate && (fiber.alternate.pendingProps = fiber.pendingProps);
      path = enqueueConcurrentRenderForLane(fiber, 2);
      null !== path && scheduleUpdateOnFiber(path, fiber, 2);
    };
    overridePropsDeletePath = function (fiber, path) {
      fiber.pendingProps = copyWithDeleteImpl(fiber.memoizedProps, path, 0);
      fiber.alternate && (fiber.alternate.pendingProps = fiber.pendingProps);
      path = enqueueConcurrentRenderForLane(fiber, 2);
      null !== path && scheduleUpdateOnFiber(path, fiber, 2);
    };
    overridePropsRenamePath = function (fiber, oldPath, newPath) {
      fiber.pendingProps = copyWithRename(
        fiber.memoizedProps,
        oldPath,
        newPath
      );
      fiber.alternate && (fiber.alternate.pendingProps = fiber.pendingProps);
      oldPath = enqueueConcurrentRenderForLane(fiber, 2);
      null !== oldPath && scheduleUpdateOnFiber(oldPath, fiber, 2);
    };
    scheduleUpdate = function (fiber) {
      var root = enqueueConcurrentRenderForLane(fiber, 2);
      null !== root && scheduleUpdateOnFiber(root, fiber, 2);
    };
    setErrorHandler = function (newShouldErrorImpl) {
      shouldErrorImpl = newShouldErrorImpl;
    };
    setSuspenseHandler = function (newShouldSuspendImpl) {
      shouldSuspendImpl = newShouldSuspendImpl;
    };
    var _enabled = !0,
      return_targetInst = null,
      hasScheduledReplayAttempt = !1,
      queuedFocus = null,
      queuedDrag = null,
      queuedMouse = null,
      queuedPointers = new Map(),
      queuedPointerCaptures = new Map(),
      queuedExplicitHydrationTargets = [],
      discreteReplayableEvents =
        "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
          " "
        ),
      lastScheduledReplayQueue = null;
    ReactDOMHydrationRoot.prototype.render = ReactDOMRoot.prototype.render =
      function (children, JSCompiler_OptimizeArgumentsArray_p2) {
        var root = this._internalRoot;
        if (null === root) throw Error("Cannot update an unmounted root.");
        "function" === typeof JSCompiler_OptimizeArgumentsArray_p2
          ? console.error(
              "does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect()."
            )
          : isValidContainer(JSCompiler_OptimizeArgumentsArray_p2)
            ? console.error(
                "You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root."
              )
            : "undefined" !== typeof JSCompiler_OptimizeArgumentsArray_p2 &&
              console.error(
                "You passed a second argument to root.render(...) but it only accepts one argument."
              );
        JSCompiler_OptimizeArgumentsArray_p2 = root.current;
        var lane = requestUpdateLane(JSCompiler_OptimizeArgumentsArray_p2);
        updateContainerImpl(
          JSCompiler_OptimizeArgumentsArray_p2,
          lane,
          children,
          root,
          null,
          null
        );
      };
    ReactDOMHydrationRoot.prototype.unmount = ReactDOMRoot.prototype.unmount =
      function (JSCompiler_OptimizeArgumentsArray_p3) {
        "function" === typeof JSCompiler_OptimizeArgumentsArray_p3 &&
          console.error(
            "does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect()."
          );
        JSCompiler_OptimizeArgumentsArray_p3 = this._internalRoot;
        if (null !== JSCompiler_OptimizeArgumentsArray_p3) {
          this._internalRoot = null;
          var container = JSCompiler_OptimizeArgumentsArray_p3.containerInfo;
          (executionContext & (RenderContext | CommitContext)) !== NoContext &&
            console.error(
              "Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."
            );
          updateContainerSync(
            null,
            JSCompiler_OptimizeArgumentsArray_p3,
            null,
            null
          );
          flushSyncWork$1();
          container[internalContainerInstanceKey] = null;
        }
      };
    ReactDOMHydrationRoot.prototype.unstable_scheduleHydration = function (
      target
    ) {
      if (target) {
        var updatePriority = resolveUpdatePriority();
        target = { blockedOn: null, target: target, priority: updatePriority };
        for (
          var i = 0;
          i < queuedExplicitHydrationTargets.length &&
          0 !== updatePriority &&
          updatePriority < queuedExplicitHydrationTargets[i].priority;
          i++
        );
        queuedExplicitHydrationTargets.splice(i, 0, target);
        0 === i && attemptExplicitHydrationTarget(target);
      }
    };
    (function () {
      var isomorphicReactPackageVersion = React.version;
      if ("19.0.0-rc-79ddf5b5-20241210" !== isomorphicReactPackageVersion)
        throw Error(
          'Incompatible React versions: The "react" and "react-dom" packages must have the exact same version. Instead got:\n  - react:      ' +
            (isomorphicReactPackageVersion +
              "\n  - react-dom:  19.0.0-rc-79ddf5b5-20241210\nLearn more: https://react.dev/warnings/version-mismatch")
        );
    })();
    ("function" === typeof Map &&
      null != Map.prototype &&
      "function" === typeof Map.prototype.forEach &&
      "function" === typeof Set &&
      null != Set.prototype &&
      "function" === typeof Set.prototype.clear &&
      "function" === typeof Set.prototype.forEach) ||
      console.error(
        "React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://react.dev/link/react-polyfills"
      );
    ReactDOMSharedInternals.findDOMNode = function (componentOrElement) {
      var fiber = componentOrElement._reactInternals;
      if (void 0 === fiber) {
        if ("function" === typeof componentOrElement.render)
          throw Error("Unable to find node on an unmounted component.");
        componentOrElement = Object.keys(componentOrElement).join(",");
        throw Error(
          "Argument appears to not be a ReactComponent. Keys: " +
            componentOrElement
        );
      }
      componentOrElement = findCurrentFiberUsingSlowPath(fiber);
      componentOrElement =
        null !== componentOrElement
          ? findCurrentHostFiberImpl(componentOrElement)
          : null;
      componentOrElement =
        null === componentOrElement ? null : componentOrElement.stateNode;
      return componentOrElement;
    };
    if (
      !(function () {
        var internals = {
          bundleType: 1,
          version: "19.0.0-rc-79ddf5b5-20241210",
          rendererPackageName: "react-dom",
          currentDispatcherRef: ReactSharedInternals,
          reconcilerVersion: "19.0.0-rc-79ddf5b5-20241210"
        };
        internals.overrideHookState = overrideHookState;
        internals.overrideHookStateDeletePath = overrideHookStateDeletePath;
        internals.overrideHookStateRenamePath = overrideHookStateRenamePath;
        internals.overrideProps = overrideProps;
        internals.overridePropsDeletePath = overridePropsDeletePath;
        internals.overridePropsRenamePath = overridePropsRenamePath;
        internals.scheduleUpdate = scheduleUpdate;
        internals.setErrorHandler = setErrorHandler;
        internals.setSuspenseHandler = setSuspenseHandler;
        internals.scheduleRefresh = scheduleRefresh;
        internals.scheduleRoot = scheduleRoot;
        internals.setRefreshHandler = setRefreshHandler;
        internals.getCurrentFiber = getCurrentFiberForDevTools;
        internals.getLaneLabelMap = getLaneLabelMap;
        internals.injectProfilingHooks = injectProfilingHooks;
        return injectInternals(internals);
      })() &&
      canUseDOM &&
      window.top === window.self &&
      ((-1 < navigator.userAgent.indexOf("Chrome") &&
        -1 === navigator.userAgent.indexOf("Edge")) ||
        -1 < navigator.userAgent.indexOf("Firefox"))
    ) {
      var protocol = window.location.protocol;
      /^(https?|file):$/.test(protocol) &&
        console.info(
          "%cDownload the React DevTools for a better development experience: https://react.dev/link/react-devtools" +
            ("file:" === protocol
              ? "\nYou might need to use a local HTTP server (instead of file://): https://react.dev/link/react-devtools-faq"
              : ""),
          "font-weight:bold"
        );
    }
    var Internals = {
      d: {
        f: noop,
        r: function () {
          throw Error(
            "Invalid form element. requestFormReset must be passed a form that was rendered by React."
          );
        },
        D: noop,
        C: noop,
        L: noop,
        m: noop,
        X: noop,
        S: noop,
        M: noop
      },
      p: 0,
      findDOMNode: null
    };
    ("function" === typeof Map &&
      null != Map.prototype &&
      "function" === typeof Map.prototype.forEach &&
      "function" === typeof Set &&
      null != Set.prototype &&
      "function" === typeof Set.prototype.clear &&
      "function" === typeof Set.prototype.forEach) ||
      console.error(
        "React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"
      );
    exports.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE =
      Internals;
    exports.createPortal = function (children, container) {
      var key =
        2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
      if (!isValidContainer(container))
        throw Error("Target container is not a DOM element.");
      return createPortal$1(children, container, null, key);
    };
    exports.createRoot = function (container, options) {
      if (!isValidContainer(container))
        throw Error("Target container is not a DOM element.");
      warnIfReactDOMContainerInDEV(container);
      var isStrictMode = !1,
        identifierPrefix = "",
        onUncaughtError = defaultOnUncaughtError,
        onCaughtError = defaultOnCaughtError,
        onRecoverableError = defaultOnRecoverableError,
        transitionCallbacks = null;
      null !== options &&
        void 0 !== options &&
        (options.hydrate
          ? console.warn(
              "hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead."
            )
          : "object" === typeof options &&
            null !== options &&
            options.$$typeof === REACT_ELEMENT_TYPE &&
            console.error(
              "You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:\n\n  let root = createRoot(domContainer);\n  root.render(<App />);"
            ),
        !0 === options.unstable_strictMode && (isStrictMode = !0),
        void 0 !== options.identifierPrefix &&
          (identifierPrefix = options.identifierPrefix),
        void 0 !== options.onUncaughtError &&
          (onUncaughtError = options.onUncaughtError),
        void 0 !== options.onCaughtError &&
          (onCaughtError = options.onCaughtError),
        void 0 !== options.onRecoverableError &&
          (onRecoverableError = options.onRecoverableError),
        void 0 !== options.unstable_transitionCallbacks &&
          (transitionCallbacks = options.unstable_transitionCallbacks));
      options = createFiberRoot(
        container,
        1,
        !1,
        null,
        null,
        isStrictMode,
        identifierPrefix,
        onUncaughtError,
        onCaughtError,
        onRecoverableError,
        transitionCallbacks,
        null
      );
      container[internalContainerInstanceKey] = options.current;
      listenToAllSupportedEvents(
        8 === container.nodeType ? container.parentNode : container
      );
      return new ReactDOMRoot(options);
    };
    exports.flushSync = function (fn) {
      var previousTransition = ReactSharedInternals.T,
        previousUpdatePriority = ReactDOMSharedInternals.p;
      try {
        if (
          ((ReactSharedInternals.T = null),
          (ReactDOMSharedInternals.p = DiscreteEventPriority),
          fn)
        )
          return fn();
      } finally {
        (ReactSharedInternals.T = previousTransition),
          (ReactDOMSharedInternals.p = previousUpdatePriority),
          ReactDOMSharedInternals.d.f() &&
            console.error(
              "flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."
            );
      }
    };
    exports.hydrateRoot = function (container, initialChildren, options) {
      if (!isValidContainer(container))
        throw Error("Target container is not a DOM element.");
      warnIfReactDOMContainerInDEV(container);
      void 0 === initialChildren &&
        console.error(
          "Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)"
        );
      var isStrictMode = !1,
        identifierPrefix = "",
        onUncaughtError = defaultOnUncaughtError,
        onCaughtError = defaultOnCaughtError,
        onRecoverableError = defaultOnRecoverableError,
        transitionCallbacks = null,
        formState = null;
      null !== options &&
        void 0 !== options &&
        (!0 === options.unstable_strictMode && (isStrictMode = !0),
        void 0 !== options.identifierPrefix &&
          (identifierPrefix = options.identifierPrefix),
        void 0 !== options.onUncaughtError &&
          (onUncaughtError = options.onUncaughtError),
        void 0 !== options.onCaughtError &&
          (onCaughtError = options.onCaughtError),
        void 0 !== options.onRecoverableError &&
          (onRecoverableError = options.onRecoverableError),
        void 0 !== options.unstable_transitionCallbacks &&
          (transitionCallbacks = options.unstable_transitionCallbacks),
        void 0 !== options.formState && (formState = options.formState));
      initialChildren = createFiberRoot(
        container,
        1,
        !0,
        initialChildren,
        null != options ? options : null,
        isStrictMode,
        identifierPrefix,
        onUncaughtError,
        onCaughtError,
        onRecoverableError,
        transitionCallbacks,
        formState
      );
      initialChildren.context = getContextForSubtree(null);
      options = initialChildren.current;
      isStrictMode = requestUpdateLane(options);
      identifierPrefix = createUpdate(isStrictMode);
      identifierPrefix.callback = null;
      enqueueUpdate(options, identifierPrefix, isStrictMode);
      initialChildren.current.lanes = isStrictMode;
      markRootUpdated$1(initialChildren, isStrictMode);
      ensureRootIsScheduled(initialChildren);
      container[internalContainerInstanceKey] = initialChildren.current;
      listenToAllSupportedEvents(container);
      return new ReactDOMHydrationRoot(initialChildren);
    };
    exports.preconnect = function (href, options) {
      "string" === typeof href && href
        ? null != options && "object" !== typeof options
          ? console.error(
              "ReactDOM.preconnect(): Expected the `options` argument (second) to be an object but encountered %s instead. The only supported option at this time is `crossOrigin` which accepts a string.",
              getValueDescriptorExpectingEnumForWarning(options)
            )
          : null != options &&
            "string" !== typeof options.crossOrigin &&
            console.error(
              "ReactDOM.preconnect(): Expected the `crossOrigin` option (second argument) to be a string but encountered %s instead. Try removing this option or passing a string value instead.",
              getValueDescriptorExpectingObjectForWarning(options.crossOrigin)
            )
        : console.error(
            "ReactDOM.preconnect(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",
            getValueDescriptorExpectingObjectForWarning(href)
          );
      "string" === typeof href &&
        (options
          ? ((options = options.crossOrigin),
            (options =
              "string" === typeof options
                ? "use-credentials" === options
                  ? options
                  : ""
                : void 0))
          : (options = null),
        ReactDOMSharedInternals.d.C(href, options));
    };
    exports.prefetchDNS = function (href) {
      if ("string" !== typeof href || !href)
        console.error(
          "ReactDOM.prefetchDNS(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",
          getValueDescriptorExpectingObjectForWarning(href)
        );
      else if (1 < arguments.length) {
        var options = arguments[1];
        "object" === typeof options && options.hasOwnProperty("crossOrigin")
          ? console.error(
              "ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. It looks like the you are attempting to set a crossOrigin property for this DNS lookup hint. Browsers do not perform DNS queries using CORS and setting this attribute on the resource hint has no effect. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.",
              getValueDescriptorExpectingEnumForWarning(options)
            )
          : console.error(
              "ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.",
              getValueDescriptorExpectingEnumForWarning(options)
            );
      }
      "string" === typeof href && ReactDOMSharedInternals.d.D(href);
    };
    exports.preinit = function (href, options) {
      "string" === typeof href && href
        ? null == options || "object" !== typeof options
          ? console.error(
              "ReactDOM.preinit(): Expected the `options` argument (second) to be an object with an `as` property describing the type of resource to be preinitialized but encountered %s instead.",
              getValueDescriptorExpectingEnumForWarning(options)
            )
          : "style" !== options.as &&
            "script" !== options.as &&
            console.error(
              'ReactDOM.preinit(): Expected the `as` property in the `options` argument (second) to contain a valid value describing the type of resource to be preinitialized but encountered %s instead. Valid values for `as` are "style" and "script".',
              getValueDescriptorExpectingEnumForWarning(options.as)
            )
        : console.error(
            "ReactDOM.preinit(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",
            getValueDescriptorExpectingObjectForWarning(href)
          );
      if (
        "string" === typeof href &&
        options &&
        "string" === typeof options.as
      ) {
        var as = options.as,
          crossOrigin = getCrossOriginStringAs(as, options.crossOrigin),
          integrity =
            "string" === typeof options.integrity ? options.integrity : void 0,
          fetchPriority =
            "string" === typeof options.fetchPriority
              ? options.fetchPriority
              : void 0;
        "style" === as
          ? ReactDOMSharedInternals.d.S(
              href,
              "string" === typeof options.precedence
                ? options.precedence
                : void 0,
              {
                crossOrigin: crossOrigin,
                integrity: integrity,
                fetchPriority: fetchPriority
              }
            )
          : "script" === as &&
            ReactDOMSharedInternals.d.X(href, {
              crossOrigin: crossOrigin,
              integrity: integrity,
              fetchPriority: fetchPriority,
              nonce: "string" === typeof options.nonce ? options.nonce : void 0
            });
      }
    };
    exports.preinitModule = function (href, options) {
      var encountered = "";
      ("string" === typeof href && href) ||
        (encountered +=
          " The `href` argument encountered was " +
          getValueDescriptorExpectingObjectForWarning(href) +
          ".");
      void 0 !== options && "object" !== typeof options
        ? (encountered +=
            " The `options` argument encountered was " +
            getValueDescriptorExpectingObjectForWarning(options) +
            ".")
        : options &&
          "as" in options &&
          "script" !== options.as &&
          (encountered +=
            " The `as` option encountered was " +
            getValueDescriptorExpectingEnumForWarning(options.as) +
            ".");
      if (encountered)
        console.error(
          "ReactDOM.preinitModule(): Expected up to two arguments, a non-empty `href` string and, optionally, an `options` object with a valid `as` property.%s",
          encountered
        );
      else
        switch (
          ((encountered =
            options && "string" === typeof options.as ? options.as : "script"),
          encountered)
        ) {
          case "script":
            break;
          default:
            (encountered =
              getValueDescriptorExpectingEnumForWarning(encountered)),
              console.error(
                'ReactDOM.preinitModule(): Currently the only supported "as" type for this function is "script" but received "%s" instead. This warning was generated for `href` "%s". In the future other module types will be supported, aligning with the import-attributes proposal. Learn more here: (https://github.com/tc39/proposal-import-attributes)',
                encountered,
                href
              );
        }
      if ("string" === typeof href)
        if ("object" === typeof options && null !== options) {
          if (null == options.as || "script" === options.as)
            (encountered = getCrossOriginStringAs(
              options.as,
              options.crossOrigin
            )),
              ReactDOMSharedInternals.d.M(href, {
                crossOrigin: encountered,
                integrity:
                  "string" === typeof options.integrity
                    ? options.integrity
                    : void 0,
                nonce:
                  "string" === typeof options.nonce ? options.nonce : void 0
              });
        } else null == options && ReactDOMSharedInternals.d.M(href);
    };
    exports.preload = function (href, options) {
      var encountered = "";
      ("string" === typeof href && href) ||
        (encountered +=
          " The `href` argument encountered was " +
          getValueDescriptorExpectingObjectForWarning(href) +
          ".");
      null == options || "object" !== typeof options
        ? (encountered +=
            " The `options` argument encountered was " +
            getValueDescriptorExpectingObjectForWarning(options) +
            ".")
        : ("string" === typeof options.as && options.as) ||
          (encountered +=
            " The `as` option encountered was " +
            getValueDescriptorExpectingObjectForWarning(options.as) +
            ".");
      encountered &&
        console.error(
          'ReactDOM.preload(): Expected two arguments, a non-empty `href` string and an `options` object with an `as` property valid for a `<link rel="preload" as="..." />` tag.%s',
          encountered
        );
      if (
        "string" === typeof href &&
        "object" === typeof options &&
        null !== options &&
        "string" === typeof options.as
      ) {
        encountered = options.as;
        var crossOrigin = getCrossOriginStringAs(
          encountered,
          options.crossOrigin
        );
        ReactDOMSharedInternals.d.L(href, encountered, {
          crossOrigin: crossOrigin,
          integrity:
            "string" === typeof options.integrity ? options.integrity : void 0,
          nonce: "string" === typeof options.nonce ? options.nonce : void 0,
          type: "string" === typeof options.type ? options.type : void 0,
          fetchPriority:
            "string" === typeof options.fetchPriority
              ? options.fetchPriority
              : void 0,
          referrerPolicy:
            "string" === typeof options.referrerPolicy
              ? options.referrerPolicy
              : void 0,
          imageSrcSet:
            "string" === typeof options.imageSrcSet
              ? options.imageSrcSet
              : void 0,
          imageSizes:
            "string" === typeof options.imageSizes
              ? options.imageSizes
              : void 0,
          media: "string" === typeof options.media ? options.media : void 0
        });
      }
    };
    exports.preloadModule = function (href, options) {
      var encountered = "";
      ("string" === typeof href && href) ||
        (encountered +=
          " The `href` argument encountered was " +
          getValueDescriptorExpectingObjectForWarning(href) +
          ".");
      void 0 !== options && "object" !== typeof options
        ? (encountered +=
            " The `options` argument encountered was " +
            getValueDescriptorExpectingObjectForWarning(options) +
            ".")
        : options &&
          "as" in options &&
          "string" !== typeof options.as &&
          (encountered +=
            " The `as` option encountered was " +
            getValueDescriptorExpectingObjectForWarning(options.as) +
            ".");
      encountered &&
        console.error(
          'ReactDOM.preloadModule(): Expected two arguments, a non-empty `href` string and, optionally, an `options` object with an `as` property valid for a `<link rel="modulepreload" as="..." />` tag.%s',
          encountered
        );
      "string" === typeof href &&
        (options
          ? ((encountered = getCrossOriginStringAs(
              options.as,
              options.crossOrigin
            )),
            ReactDOMSharedInternals.d.m(href, {
              as:
                "string" === typeof options.as && "script" !== options.as
                  ? options.as
                  : void 0,
              crossOrigin: encountered,
              integrity:
                "string" === typeof options.integrity
                  ? options.integrity
                  : void 0
            }))
          : ReactDOMSharedInternals.d.m(href));
    };
    exports.requestFormReset = function (form) {
      ReactDOMSharedInternals.d.r(form);
    };
    exports.unstable_batchedUpdates = function (fn, a) {
      return fn(a);
    };
    exports.useFormState = function (action, initialState, permalink) {
      return resolveDispatcher().useFormState(action, initialState, permalink);
    };
    exports.useFormStatus = function () {
      return resolveDispatcher().useHostTransitionStatus();
    };
    exports.version = "19.0.0-rc-79ddf5b5-20241210";
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
      "function" ===
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop &&
      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })();