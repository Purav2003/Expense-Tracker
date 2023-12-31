import {
  require_classnames
} from "./chunk-PLBRVQQT.js";
import {
  require_react
} from "./chunk-HRFUSPI4.js";
import {
  __toESM
} from "./chunk-5WWUZCGV.js";

// frontend/node_modules/react-tooltip/dist/react-tooltip.min.mjs
var import_react = __toESM(require_react(), 1);

// frontend/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var sides = ["top", "right", "bottom", "left"];
var alignments = ["start", "end"];
var placements = sides.reduce((acc, side) => acc.concat(side, side + "-" + alignments[0], side + "-" + alignments[1]), []);
var min = Math.min;
var max = Math.max;
var round = Math.round;
var floor = Math.floor;
var createCoords = (v) => ({
  x: v,
  y: v
});
var oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
var oppositeAlignmentMap = {
  start: "end",
  end: "start"
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  return ["top", "bottom"].includes(getSide(placement)) ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
  const lr = ["left", "right"];
  const rl = ["right", "left"];
  const tb = ["top", "bottom"];
  const bt = ["bottom", "top"];
  switch (side) {
    case "top":
    case "bottom":
      if (rtl)
        return isStart ? rl : lr;
      return isStart ? lr : rl;
    case "left":
    case "right":
      return isStart ? tb : bt;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  return {
    ...rect,
    top: rect.y,
    left: rect.x,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  };
}

// frontend/node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
var computePosition = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x: x2,
    y: y2
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i2 = 0; i2 < validMiddleware.length; i2++) {
    const {
      name,
      fn
    } = validMiddleware[i2];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x: x2,
      y: y2,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platform2,
      elements: {
        reference,
        floating
      }
    });
    x2 = nextX != null ? nextX : x2;
    y2 = nextY != null ? nextY : y2;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x: x2,
          y: y2
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i2 = -1;
      continue;
    }
  }
  return {
    x: x2,
    y: y2,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x: x2,
    y: y2,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    ...rects.floating,
    x: x2,
    y: y2
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
var arrow = (options) => ({
  name: "arrow",
  options,
  async fn(state) {
    const {
      x: x2,
      y: y2,
      placement,
      rects,
      platform: platform2,
      elements
    } = state;
    const {
      element,
      padding = 0
    } = evaluate(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = {
      x: x2,
      y: y2
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform2.getDimensions(element);
    const isYAxis = axis === "y";
    const minProp = isYAxis ? "top" : "left";
    const maxProp = isYAxis ? "bottom" : "right";
    const clientProp = isYAxis ? "clientHeight" : "clientWidth";
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
    if (!clientSize || !await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
    const min$1 = minPadding;
    const max2 = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset2 = clamp(min$1, center, max2);
    const shouldAddOffset = getAlignment(placement) != null && center != offset2 && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1 ? min$1 - center : max2 - center : 0;
    return {
      [axis]: coords[axis] - alignmentOffset,
      data: {
        [axis]: offset2,
        centerOffset: center - offset2 + alignmentOffset
      }
    };
  }
});
var flip = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(state) {
      var _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      const side = getSide(placement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      if (!specifiedFallbackPlacements && fallbackAxisSideDirection !== "none") {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements2 = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides2 = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements2[nextIndex];
        if (nextPlacement) {
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData
            },
            reset: {
              placement: nextPlacement
            }
          };
        }
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a2, b2) => a2.overflows[1] - b2.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$map$so;
              const placement2 = (_overflowsData$map$so = overflowsData.map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a2, b2) => a2[1] - b2[1])[0]) == null ? void 0 : _overflowsData$map$so[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...rawValue
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
var offset = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state) {
      const {
        x: x2,
        y: y2
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      return {
        x: x2 + diffCoords.x,
        y: y2 + diffCoords.y,
        data: diffCoords
      };
    }
  };
};
var shift = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(state) {
      const {
        x: x2,
        y: y2,
        placement
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x3,
              y: y3
            } = _ref;
            return {
              x: x3,
              y: y3
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x: x2,
        y: y2
      };
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === "y" ? "top" : "left";
        const maxSide = mainAxis === "y" ? "bottom" : "right";
        const min2 = mainAxisCoord + overflow[minSide];
        const max2 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min2, mainAxisCoord, max2);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === "y" ? "top" : "left";
        const maxSide = crossAxis === "y" ? "bottom" : "right";
        const min2 = crossAxisCoord + overflow[minSide];
        const max2 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min2, crossAxisCoord, max2);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x2,
          y: limitedCoords.y - y2
        }
      };
    }
  };
};

// frontend/node_modules/@floating-ui/utils/dom/dist/floating-ui.utils.dom.mjs
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null ? void 0 : (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle2(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
}
function isTableElement(element) {
  return ["table", "td", "th"].includes(getNodeName(element));
}
function isContainingBlock(element) {
  const webkit = isWebKit();
  const css = getComputedStyle2(element);
  return css.transform !== "none" || css.perspective !== "none" || (css.containerType ? css.containerType !== "normal" : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== "none" : false) || !webkit && (css.filter ? css.filter !== "none" : false) || ["transform", "perspective", "filter"].some((value) => (css.willChange || "").includes(value)) || ["paint", "layout", "strict", "content"].some((value) => (css.contain || "").includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else {
      currentNode = getParentNode(currentNode);
    }
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === "undefined" || !CSS.supports)
    return false;
  return CSS.supports("-webkit-backdrop-filter", "none");
}
function isLastTraversableNode(node) {
  return ["html", "body", "#document"].includes(getNodeName(node));
}
function getComputedStyle2(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.pageXOffset,
    scrollTop: element.pageYOffset
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor));
}

// frontend/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
  const css = getComputedStyle2(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $: $2
  } = getCssDimensions(domElement);
  let x2 = ($2 ? round(rect.width) : rect.width) / width;
  let y2 = ($2 ? round(rect.height) : rect.height) / height;
  if (!x2 || !Number.isFinite(x2)) {
    x2 = 1;
  }
  if (!y2 || !Number.isFinite(y2)) {
    y2 = 1;
  }
  return {
    x: x2,
    y: y2
  };
}
var noOffsets = createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x2 = (clientRect.left + visualOffsets.x) / scale.x;
  let y2 = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentIFrame = win.frameElement;
    while (currentIFrame && offsetParent && offsetWin !== win) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle2(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x2 *= iframeScale.x;
      y2 *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x2 += left;
      y2 += top;
      currentIFrame = getWindow(currentIFrame).frameElement;
    }
  }
  return rectToClientRect({
    width,
    height,
    x: x2,
    y: y2
  });
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  if (offsetParent === documentElement) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== "fixed") {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x2 = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y2 = -scroll.scrollTop;
  if (getComputedStyle2(body).direction === "rtl") {
    x2 += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x: x2,
    y: y2
  };
}
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x2 = 0;
  let y2 = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x2 = visualViewport.offsetLeft;
      y2 = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x2,
    y: y2
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x2 = left * scale.x;
  const y2 = top * scale.y;
  return {
    width,
    height,
    x: x2,
    y: y2
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      ...clippingAncestor,
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle2(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle2(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle2(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && ["absolute", "fixed"].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
function getDimensions(element) {
  return getCssDimensions(element);
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle2(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  return element.offsetParent;
}
function getOffsetParent(element, polyfill) {
  const window2 = getWindow(element);
  if (!isHTMLElement(element)) {
    return window2;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle2(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle2(offsetParent).position === "static" && !isContainingBlock(offsetParent))) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}
var getElementRects = async function(_ref) {
  let {
    reference,
    floating,
    strategy
  } = _ref;
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  return {
    reference: getRectRelativeToOffsetParent(reference, await getOffsetParentFn(floating), strategy),
    floating: {
      x: 0,
      y: 0,
      ...await getDimensionsFn(floating)
    }
  };
};
function isRTL(element) {
  return getComputedStyle2(element).direction === "rtl";
}
var platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    clearTimeout(timeoutId);
    io && io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const {
      left,
      top,
      width,
      height
    } = element.getBoundingClientRect();
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 100);
        } else {
          refresh(false, ratio);
        }
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (e2) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...getOverflowAncestors(floating)] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          resizeObserver && resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo && cleanupIo();
    resizeObserver && resizeObserver.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
var computePosition2 = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};

// frontend/node_modules/react-tooltip/dist/react-tooltip.min.mjs
var import_classnames = __toESM(require_classnames(), 1);
var f = "react-tooltip-core-styles";
var h = "react-tooltip-base-styles";
var w = { core: false, base: false };
function b({ css: e2, id: t2 = h, type: r2 = "base", ref: o2 }) {
  var n2, l2;
  if (!e2 || "undefined" == typeof document || w[r2])
    return;
  if ("core" === r2 && "undefined" != typeof process && (null === (n2 = null === process || void 0 === process ? void 0 : process.env) || void 0 === n2 ? void 0 : n2.REACT_TOOLTIP_DISABLE_CORE_STYLES))
    return;
  if ("base" !== r2 && "undefined" != typeof process && (null === (l2 = null === process || void 0 === process ? void 0 : process.env) || void 0 === l2 ? void 0 : l2.REACT_TOOLTIP_DISABLE_BASE_STYLES))
    return;
  "core" === r2 && (t2 = f), o2 || (o2 = {});
  const { insertAt: i2 } = o2;
  if (document.getElementById(t2))
    return void console.warn(`[react-tooltip] Element with id '${t2}' already exists. Call \`removeStyle()\` first`);
  const c2 = document.head || document.getElementsByTagName("head")[0], a2 = document.createElement("style");
  a2.id = t2, a2.type = "text/css", "top" === i2 && c2.firstChild ? c2.insertBefore(a2, c2.firstChild) : c2.appendChild(a2), a2.styleSheet ? a2.styleSheet.cssText = e2 : a2.appendChild(document.createTextNode(e2)), w[r2] = true;
}
function S({ type: e2 = "base", id: t2 = h } = {}) {
  if (!w[e2])
    return;
  "core" === e2 && (t2 = f);
  const r2 = document.getElementById(t2);
  "style" === (null == r2 ? void 0 : r2.tagName) ? null == r2 || r2.remove() : console.warn(`[react-tooltip] Failed to remove 'style' element with id '${t2}'. Call \`injectStyle()\` first`), w[e2] = false;
}
var E = (e2, t2, r2) => {
  let o2 = null;
  return function(...n2) {
    const l2 = () => {
      o2 = null, r2 || e2.apply(this, n2);
    };
    r2 && !o2 && (e2.apply(this, n2), o2 = setTimeout(l2, t2)), r2 || (o2 && clearTimeout(o2), o2 = setTimeout(l2, t2));
  };
};
var _ = "DEFAULT_TOOLTIP_ID";
var g = { anchorRefs: /* @__PURE__ */ new Set(), activeAnchor: { current: null }, attach: () => {
}, detach: () => {
}, setActiveAnchor: () => {
} };
var A = (0, import_react.createContext)({ getTooltipData: () => g });
var T = ({ children: t2 }) => {
  const [l2, i2] = (0, import_react.useState)({ [_]: /* @__PURE__ */ new Set() }), [c2, a2] = (0, import_react.useState)({ [_]: { current: null } }), s = (e2, ...t3) => {
    i2((r2) => {
      var o2;
      const n2 = null !== (o2 = r2[e2]) && void 0 !== o2 ? o2 : /* @__PURE__ */ new Set();
      return t3.forEach((e3) => n2.add(e3)), { ...r2, [e2]: new Set(n2) };
    });
  }, u = (e2, ...t3) => {
    i2((r2) => {
      const o2 = r2[e2];
      return o2 ? (t3.forEach((e3) => o2.delete(e3)), { ...r2 }) : r2;
    });
  }, d = (0, import_react.useCallback)((e2 = _) => {
    var t3, r2;
    return { anchorRefs: null !== (t3 = l2[e2]) && void 0 !== t3 ? t3 : /* @__PURE__ */ new Set(), activeAnchor: null !== (r2 = c2[e2]) && void 0 !== r2 ? r2 : { current: null }, attach: (...t4) => s(e2, ...t4), detach: (...t4) => u(e2, ...t4), setActiveAnchor: (t4) => ((e3, t5) => {
      a2((r3) => {
        var o2;
        return (null === (o2 = r3[e3]) || void 0 === o2 ? void 0 : o2.current) === t5.current ? r3 : { ...r3, [e3]: t5 };
      });
    })(e2, t4) };
  }, [l2, c2, s, u]), p = (0, import_react.useMemo)(() => ({ getTooltipData: d }), [d]);
  return import_react.default.createElement(A.Provider, { value: p }, t2);
};
function O(e2 = _) {
  return (0, import_react.useContext)(A).getTooltipData(e2);
}
var L = ({ tooltipId: t2, children: r2, className: o2, place: n2, content: l2, html: a2, variant: s, offset: u, wrapper: d, events: p, positionStrategy: v, delayShow: m, delayHide: f2 }) => {
  const { attach: h2, detach: w2 } = O(t2), b2 = (0, import_react.useRef)(null);
  return (0, import_react.useEffect)(() => (h2(b2), () => {
    w2(b2);
  }), []), import_react.default.createElement("span", { ref: b2, className: (0, import_classnames.default)("react-tooltip-wrapper", o2), "data-tooltip-place": n2, "data-tooltip-content": l2, "data-tooltip-html": a2, "data-tooltip-variant": s, "data-tooltip-offset": u, "data-tooltip-wrapper": d, "data-tooltip-events": p, "data-tooltip-position-strategy": v, "data-tooltip-delay-show": m, "data-tooltip-delay-hide": f2 }, r2);
};
var R = "undefined" != typeof window ? import_react.useLayoutEffect : import_react.useEffect;
var N = (e2) => {
  if (!(e2 instanceof HTMLElement || e2 instanceof SVGElement))
    return false;
  const t2 = getComputedStyle(e2);
  return ["overflow", "overflow-x", "overflow-y"].some((e3) => {
    const r2 = t2.getPropertyValue(e3);
    return "auto" === r2 || "scroll" === r2;
  });
};
var k = (e2) => {
  if (!e2)
    return null;
  let t2 = e2.parentElement;
  for (; t2; ) {
    if (N(t2))
      return t2;
    t2 = t2.parentElement;
  }
  return document.scrollingElement || document.documentElement;
};
var x = async ({ elementReference: e2 = null, tooltipReference: t2 = null, tooltipArrowReference: r2 = null, place: o2 = "top", offset: n2 = 10, strategy: l2 = "absolute", middlewares: i2 = [offset(Number(n2)), flip(), shift({ padding: 5 })], border: c2 }) => {
  if (!e2)
    return { tooltipStyles: {}, tooltipArrowStyles: {}, place: o2 };
  if (null === t2)
    return { tooltipStyles: {}, tooltipArrowStyles: {}, place: o2 };
  const a2 = i2;
  return r2 ? (a2.push(arrow({ element: r2, padding: 5 })), computePosition2(e2, t2, { placement: o2, strategy: l2, middleware: a2 }).then(({ x: e3, y: t3, placement: r3, middlewareData: o3 }) => {
    var n3, l3;
    const i3 = { left: `${e3}px`, top: `${t3}px`, border: c2 }, { x: a3, y: s } = null !== (n3 = o3.arrow) && void 0 !== n3 ? n3 : { x: 0, y: 0 }, u = null !== (l3 = { top: "bottom", right: "left", bottom: "top", left: "right" }[r3.split("-")[0]]) && void 0 !== l3 ? l3 : "bottom", d = c2 && { borderBottom: c2, borderRight: c2 };
    let p = 0;
    if (c2) {
      const e4 = `${c2}`.match(/(\d+)px/);
      p = (null == e4 ? void 0 : e4[1]) ? Number(e4[1]) : 1;
    }
    return { tooltipStyles: i3, tooltipArrowStyles: { left: null != a3 ? `${a3}px` : "", top: null != s ? `${s}px` : "", right: "", bottom: "", ...d, [u]: `-${4 + p}px` }, place: r3 };
  })) : computePosition2(e2, t2, { placement: "bottom", strategy: l2, middleware: a2 }).then(({ x: e3, y: t3, placement: r3 }) => ({ tooltipStyles: { left: `${e3}px`, top: `${t3}px` }, tooltipArrowStyles: {}, place: r3 }));
};
var C = "core-styles-module_tooltip__3vRRp";
var $ = "core-styles-module_fixed__pcSol";
var I = "core-styles-module_arrow__cvMwQ";
var j = "core-styles-module_noArrow__xock6";
var B = "core-styles-module_clickable__ZuTTB";
var D = "core-styles-module_show__Nt9eE";
var H = { tooltip: "styles-module_tooltip__mnnfp", arrow: "styles-module_arrow__K0L3T", dark: "styles-module_dark__xNqje", light: "styles-module_light__Z6W-X", success: "styles-module_success__A2AKt", warning: "styles-module_warning__SCK0X", error: "styles-module_error__JvumD", info: "styles-module_info__BWdHW" };
var z = ({ id: t2, className: n2, classNameArrow: l2, variant: a2 = "dark", anchorId: s, anchorSelect: u, place: d = "top", offset: p = 10, events: v = ["hover"], openOnClick: f2 = false, positionStrategy: h2 = "absolute", middlewares: w2, wrapper: b2, delayShow: S2 = 0, delayHide: _2 = 0, float: g2 = false, hidden: A2 = false, noArrow: T2 = false, clickable: L2 = false, closeOnEsc: N2 = false, closeOnScroll: z2 = false, closeOnResize: q2 = false, style: W2, position: M, afterShow: P, afterHide: F, content: K, contentWrapperRef: U, isOpen: X, setIsOpen: Y, activeAnchor: V, setActiveAnchor: Z, border: G, opacity: J, arrowColor: Q }) => {
  const ee = (0, import_react.useRef)(null), te = (0, import_react.useRef)(null), re = (0, import_react.useRef)(null), oe = (0, import_react.useRef)(null), [ne, le] = (0, import_react.useState)(d), [ie, ce] = (0, import_react.useState)({}), [ae, se] = (0, import_react.useState)({}), [ue, de] = (0, import_react.useState)(false), [pe, ve] = (0, import_react.useState)(false), me = (0, import_react.useRef)(false), ye = (0, import_react.useRef)(null), { anchorRefs: fe, setActiveAnchor: he } = O(t2), we = (0, import_react.useRef)(false), [be, Se] = (0, import_react.useState)([]), Ee = (0, import_react.useRef)(false), _e = f2 || v.includes("click");
  R(() => (Ee.current = true, () => {
    Ee.current = false;
  }), []), (0, import_react.useEffect)(() => {
    if (!ue) {
      const e2 = setTimeout(() => {
        ve(false);
      }, 150);
      return () => {
        clearTimeout(e2);
      };
    }
    return () => null;
  }, [ue]);
  const ge = (e2) => {
    Ee.current && (e2 && ve(true), setTimeout(() => {
      Ee.current && (null == Y || Y(e2), void 0 === X && de(e2));
    }, 10));
  };
  (0, import_react.useEffect)(() => {
    if (void 0 === X)
      return () => null;
    X && ve(true);
    const e2 = setTimeout(() => {
      de(X);
    }, 10);
    return () => {
      clearTimeout(e2);
    };
  }, [X]), (0, import_react.useEffect)(() => {
    ue !== me.current && (me.current = ue, ue ? null == P || P() : null == F || F());
  }, [ue]);
  const Ae = (e2 = _2) => {
    oe.current && clearTimeout(oe.current), oe.current = setTimeout(() => {
      we.current || ge(false);
    }, e2);
  }, Te = (e2) => {
    var t3;
    if (!e2)
      return;
    const r2 = null !== (t3 = e2.currentTarget) && void 0 !== t3 ? t3 : e2.target;
    if (!(null == r2 ? void 0 : r2.isConnected))
      return Z(null), void he({ current: null });
    S2 ? (re.current && clearTimeout(re.current), re.current = setTimeout(() => {
      ge(true);
    }, S2)) : ge(true), Z(r2), he({ current: r2 }), oe.current && clearTimeout(oe.current);
  }, Oe = () => {
    L2 ? Ae(_2 || 100) : _2 ? Ae() : ge(false), re.current && clearTimeout(re.current);
  }, Le = ({ x: e2, y: t3 }) => {
    x({ place: d, offset: p, elementReference: { getBoundingClientRect: () => ({ x: e2, y: t3, width: 0, height: 0, top: t3, left: e2, right: e2, bottom: t3 }) }, tooltipReference: ee.current, tooltipArrowReference: te.current, strategy: h2, middlewares: w2, border: G }).then((e3) => {
      Object.keys(e3.tooltipStyles).length && ce(e3.tooltipStyles), Object.keys(e3.tooltipArrowStyles).length && se(e3.tooltipArrowStyles), le(e3.place);
    });
  }, Re = (e2) => {
    if (!e2)
      return;
    const t3 = e2, r2 = { x: t3.clientX, y: t3.clientY };
    Le(r2), ye.current = r2;
  }, Ne = (e2) => {
    Te(e2), _2 && Ae();
  }, ke = (e2) => {
    var t3;
    [document.querySelector(`[id='${s}']`), ...be].some((t4) => null == t4 ? void 0 : t4.contains(e2.target)) || (null === (t3 = ee.current) || void 0 === t3 ? void 0 : t3.contains(e2.target)) || (ge(false), re.current && clearTimeout(re.current));
  }, xe = E(Te, 50, true), Ce = E(Oe, 50, true), $e = (0, import_react.useCallback)(() => {
    M ? Le(M) : g2 ? ye.current && Le(ye.current) : x({ place: d, offset: p, elementReference: V, tooltipReference: ee.current, tooltipArrowReference: te.current, strategy: h2, middlewares: w2, border: G }).then((e2) => {
      Ee.current && (Object.keys(e2.tooltipStyles).length && ce(e2.tooltipStyles), Object.keys(e2.tooltipArrowStyles).length && se(e2.tooltipArrowStyles), le(e2.place));
    });
  }, [ue, V, K, W2, d, p, h2, M, g2]);
  (0, import_react.useEffect)(() => {
    var e2, t3;
    const r2 = new Set(fe);
    be.forEach((e3) => {
      r2.add({ current: e3 });
    });
    const o2 = document.querySelector(`[id='${s}']`);
    o2 && r2.add({ current: o2 });
    const n3 = () => {
      ge(false);
    }, l3 = k(V), i2 = k(ee.current);
    z2 && (window.addEventListener("scroll", n3), null == l3 || l3.addEventListener("scroll", n3), null == i2 || i2.addEventListener("scroll", n3));
    let c2 = null;
    q2 ? window.addEventListener("resize", n3) : V && ee.current && (c2 = autoUpdate(V, ee.current, $e, { ancestorResize: true, elementResize: true, layoutShift: true }));
    const a3 = (e3) => {
      "Escape" === e3.key && ge(false);
    };
    N2 && window.addEventListener("keydown", a3);
    const u2 = [];
    _e ? (window.addEventListener("click", ke), u2.push({ event: "click", listener: Ne })) : (u2.push({ event: "mouseenter", listener: xe }, { event: "mouseleave", listener: Ce }, { event: "focus", listener: xe }, { event: "blur", listener: Ce }), g2 && u2.push({ event: "mousemove", listener: Re }));
    const d2 = () => {
      we.current = true;
    }, p2 = () => {
      we.current = false, Oe();
    };
    return L2 && !_e && (null === (e2 = ee.current) || void 0 === e2 || e2.addEventListener("mouseenter", d2), null === (t3 = ee.current) || void 0 === t3 || t3.addEventListener("mouseleave", p2)), u2.forEach(({ event: e3, listener: t4 }) => {
      r2.forEach((r3) => {
        var o3;
        null === (o3 = r3.current) || void 0 === o3 || o3.addEventListener(e3, t4);
      });
    }), () => {
      var e3, t4;
      z2 && (window.removeEventListener("scroll", n3), null == l3 || l3.removeEventListener("scroll", n3), null == i2 || i2.removeEventListener("scroll", n3)), q2 ? window.removeEventListener("resize", n3) : null == c2 || c2(), _e && window.removeEventListener("click", ke), N2 && window.removeEventListener("keydown", a3), L2 && !_e && (null === (e3 = ee.current) || void 0 === e3 || e3.removeEventListener("mouseenter", d2), null === (t4 = ee.current) || void 0 === t4 || t4.removeEventListener("mouseleave", p2)), u2.forEach(({ event: e4, listener: t5 }) => {
        r2.forEach((r3) => {
          var o3;
          null === (o3 = r3.current) || void 0 === o3 || o3.removeEventListener(e4, t5);
        });
      });
    };
  }, [V, $e, pe, fe, be, N2, v]), (0, import_react.useEffect)(() => {
    let e2 = null != u ? u : "";
    !e2 && t2 && (e2 = `[data-tooltip-id='${t2}']`);
    const r2 = new MutationObserver((r3) => {
      const o2 = [];
      r3.forEach((r4) => {
        if ("attributes" === r4.type && "data-tooltip-id" === r4.attributeName) {
          r4.target.getAttribute("data-tooltip-id") === t2 && o2.push(r4.target);
        }
        if ("childList" === r4.type && (V && [...r4.removedNodes].some((e3) => {
          var t3;
          return !!(null === (t3 = null == e3 ? void 0 : e3.contains) || void 0 === t3 ? void 0 : t3.call(e3, V)) && (ve(false), ge(false), Z(null), re.current && clearTimeout(re.current), oe.current && clearTimeout(oe.current), true);
        }), e2))
          try {
            const t3 = [...r4.addedNodes].filter((e3) => 1 === e3.nodeType);
            o2.push(...t3.filter((t4) => t4.matches(e2))), o2.push(...t3.flatMap((t4) => [...t4.querySelectorAll(e2)]));
          } catch (e3) {
          }
      }), o2.length && Se((e3) => [...e3, ...o2]);
    });
    return r2.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["data-tooltip-id"] }), () => {
      r2.disconnect();
    };
  }, [t2, u, V]), (0, import_react.useEffect)(() => {
    $e();
  }, [$e]), (0, import_react.useEffect)(() => {
    if (!(null == U ? void 0 : U.current))
      return () => null;
    const e2 = new ResizeObserver(() => {
      $e();
    });
    return e2.observe(U.current), () => {
      e2.disconnect();
    };
  }, [K, null == U ? void 0 : U.current]), (0, import_react.useEffect)(() => {
    var e2;
    const t3 = document.querySelector(`[id='${s}']`), r2 = [...be, t3];
    V && r2.includes(V) || Z(null !== (e2 = be[0]) && void 0 !== e2 ? e2 : t3);
  }, [s, be, V]), (0, import_react.useEffect)(() => () => {
    re.current && clearTimeout(re.current), oe.current && clearTimeout(oe.current);
  }, []), (0, import_react.useEffect)(() => {
    let e2 = u;
    if (!e2 && t2 && (e2 = `[data-tooltip-id='${t2}']`), e2)
      try {
        const t3 = Array.from(document.querySelectorAll(e2));
        Se(t3);
      } catch (e3) {
        Se([]);
      }
  }, [t2, u]);
  const Ie = !A2 && K && ue && Object.keys(ie).length > 0;
  return pe ? import_react.default.createElement(b2, { id: t2, role: "tooltip", className: (0, import_classnames.default)("react-tooltip", C, H.tooltip, H[a2], n2, `react-tooltip__place-${ne}`, { "react-tooltip__show": Ie, [D]: Ie, [$]: "fixed" === h2, [B]: L2 }), style: { ...W2, ...ie, opacity: void 0 !== J && Ie ? J : void 0 }, ref: ee }, K, import_react.default.createElement(b2, { className: (0, import_classnames.default)("react-tooltip-arrow", I, H.arrow, l2, { [j]: T2 }), style: { ...ae, background: Q ? `linear-gradient(to right bottom, transparent 50%, ${Q} 50%)` : void 0 }, ref: te })) : null;
};
var q = ({ content: t2 }) => import_react.default.createElement("span", { dangerouslySetInnerHTML: { __html: t2 } });
var W = ({ id: t2, anchorId: o2, anchorSelect: n2, content: l2, html: a2, render: s, className: u, classNameArrow: d, variant: p = "dark", place: v = "top", offset: m = 10, wrapper: y2 = "div", children: f2 = null, events: h2 = ["hover"], openOnClick: w2 = false, positionStrategy: b2 = "absolute", middlewares: S2, delayShow: E2 = 0, delayHide: _2 = 0, float: g2 = false, hidden: A2 = false, noArrow: T2 = false, clickable: L2 = false, closeOnEsc: R2 = false, closeOnScroll: N2 = false, closeOnResize: k2 = false, style: x2, position: C2, isOpen: $2, disableStyleInjection: I2 = false, border: j2, opacity: B2, arrowColor: D2, setIsOpen: H2, afterShow: W2, afterHide: M }) => {
  const [P, F] = (0, import_react.useState)(l2), [K, U] = (0, import_react.useState)(a2), [X, Y] = (0, import_react.useState)(v), [V, Z] = (0, import_react.useState)(p), [G, J] = (0, import_react.useState)(m), [Q, ee] = (0, import_react.useState)(E2), [te, re] = (0, import_react.useState)(_2), [oe, ne] = (0, import_react.useState)(g2), [le, ie] = (0, import_react.useState)(A2), [ce, ae] = (0, import_react.useState)(y2), [se, ue] = (0, import_react.useState)(h2), [de, pe] = (0, import_react.useState)(b2), [ve, me] = (0, import_react.useState)(null), ye = (0, import_react.useRef)(I2), { anchorRefs: fe, activeAnchor: he } = O(t2), we = (e2) => null == e2 ? void 0 : e2.getAttributeNames().reduce((t3, r2) => {
    var o3;
    if (r2.startsWith("data-tooltip-")) {
      t3[r2.replace(/^data-tooltip-/, "")] = null !== (o3 = null == e2 ? void 0 : e2.getAttribute(r2)) && void 0 !== o3 ? o3 : null;
    }
    return t3;
  }, {}), be = (e2) => {
    const t3 = { place: (e3) => {
      var t4;
      Y(null !== (t4 = e3) && void 0 !== t4 ? t4 : v);
    }, content: (e3) => {
      F(null != e3 ? e3 : l2);
    }, html: (e3) => {
      U(null != e3 ? e3 : a2);
    }, variant: (e3) => {
      var t4;
      Z(null !== (t4 = e3) && void 0 !== t4 ? t4 : p);
    }, offset: (e3) => {
      J(null === e3 ? m : Number(e3));
    }, wrapper: (e3) => {
      var t4;
      ae(null !== (t4 = e3) && void 0 !== t4 ? t4 : y2);
    }, events: (e3) => {
      const t4 = null == e3 ? void 0 : e3.split(" ");
      ue(null != t4 ? t4 : h2);
    }, "position-strategy": (e3) => {
      var t4;
      pe(null !== (t4 = e3) && void 0 !== t4 ? t4 : b2);
    }, "delay-show": (e3) => {
      ee(null === e3 ? E2 : Number(e3));
    }, "delay-hide": (e3) => {
      re(null === e3 ? _2 : Number(e3));
    }, float: (e3) => {
      ne(null === e3 ? g2 : "true" === e3);
    }, hidden: (e3) => {
      ie(null === e3 ? A2 : "true" === e3);
    } };
    Object.values(t3).forEach((e3) => e3(null)), Object.entries(e2).forEach(([e3, r2]) => {
      var o3;
      null === (o3 = t3[e3]) || void 0 === o3 || o3.call(t3, r2);
    });
  };
  (0, import_react.useEffect)(() => {
    F(l2);
  }, [l2]), (0, import_react.useEffect)(() => {
    U(a2);
  }, [a2]), (0, import_react.useEffect)(() => {
    Y(v);
  }, [v]), (0, import_react.useEffect)(() => {
    Z(p);
  }, [p]), (0, import_react.useEffect)(() => {
    J(m);
  }, [m]), (0, import_react.useEffect)(() => {
    ee(E2);
  }, [E2]), (0, import_react.useEffect)(() => {
    re(_2);
  }, [_2]), (0, import_react.useEffect)(() => {
    ne(g2);
  }, [g2]), (0, import_react.useEffect)(() => {
    ie(A2);
  }, [A2]), (0, import_react.useEffect)(() => {
    pe(b2);
  }, [b2]), (0, import_react.useEffect)(() => {
    ye.current !== I2 && console.warn("[react-tooltip] Do not change `disableStyleInjection` dynamically.");
  }, [I2]), (0, import_react.useEffect)(() => {
    "undefined" != typeof window && window.dispatchEvent(new CustomEvent("react-tooltip-inject-styles", { detail: { disableCore: "core" === I2, disableBase: I2 } }));
  }, []), (0, import_react.useEffect)(() => {
    var e2;
    const r2 = new Set(fe);
    let l3 = n2;
    if (!l3 && t2 && (l3 = `[data-tooltip-id='${t2}']`), l3)
      try {
        document.querySelectorAll(l3).forEach((e3) => {
          r2.add({ current: e3 });
        });
      } catch (e3) {
        console.warn(`[react-tooltip] "${l3}" is not a valid CSS selector`);
      }
    const i2 = document.querySelector(`[id='${o2}']`);
    if (i2 && r2.add({ current: i2 }), !r2.size)
      return () => null;
    const c2 = null !== (e2 = null != ve ? ve : i2) && void 0 !== e2 ? e2 : he.current, a3 = new MutationObserver((e3) => {
      e3.forEach((e4) => {
        var t3;
        if (!c2 || "attributes" !== e4.type || !(null === (t3 = e4.attributeName) || void 0 === t3 ? void 0 : t3.startsWith("data-tooltip-")))
          return;
        const r3 = we(c2);
        be(r3);
      });
    }), s2 = { attributes: true, childList: false, subtree: false };
    if (c2) {
      const e3 = we(c2);
      be(e3), a3.observe(c2, s2);
    }
    return () => {
      a3.disconnect();
    };
  }, [fe, he, ve, o2, n2]), (0, import_react.useEffect)(() => {
    (null == x2 ? void 0 : x2.border) && console.warn("[react-tooltip] Do not set `style.border`. Use `border` prop instead."), j2 && !CSS.supports("border", `${j2}`) && console.warn(`[react-tooltip] "${j2}" is not a valid \`border\`.`), (null == x2 ? void 0 : x2.opacity) && console.warn("[react-tooltip] Do not set `style.opacity`. Use `opacity` prop instead."), B2 && !CSS.supports("opacity", `${B2}`) && console.warn(`[react-tooltip] "${B2}" is not a valid \`opacity\`.`);
  }, []);
  let Se = f2;
  const Ee = (0, import_react.useRef)(null);
  if (s) {
    const t3 = s({ content: null != P ? P : null, activeAnchor: ve });
    Se = t3 ? import_react.default.createElement("div", { ref: Ee, className: "react-tooltip-content-wrapper" }, t3) : null;
  } else
    P && (Se = P);
  K && (Se = import_react.default.createElement(q, { content: K }));
  const _e = { id: t2, anchorId: o2, anchorSelect: n2, className: u, classNameArrow: d, content: Se, contentWrapperRef: Ee, place: X, variant: V, offset: G, wrapper: ce, events: se, openOnClick: w2, positionStrategy: de, middlewares: S2, delayShow: Q, delayHide: te, float: oe, hidden: le, noArrow: T2, clickable: L2, closeOnEsc: R2, closeOnScroll: N2, closeOnResize: k2, style: x2, position: C2, isOpen: $2, border: j2, opacity: B2, arrowColor: D2, setIsOpen: H2, afterShow: W2, afterHide: M, activeAnchor: ve, setActiveAnchor: (e2) => me(e2) };
  return import_react.default.createElement(z, { ..._e });
};
"undefined" != typeof window && window.addEventListener("react-tooltip-inject-styles", (e2) => {
  e2.detail.disableCore || b({ css: `:root{--rt-color-white:#fff;--rt-color-dark:#222;--rt-color-success:#8dc572;--rt-color-error:#be6464;--rt-color-warning:#f0ad4e;--rt-color-info:#337ab7;--rt-opacity:0.9}.core-styles-module_tooltip__3vRRp{visibility:hidden;position:absolute;top:0;left:0;pointer-events:none;opacity:0;transition:opacity 0.3s ease-out;will-change:opacity,visibility}.core-styles-module_fixed__pcSol{position:fixed}.core-styles-module_arrow__cvMwQ{position:absolute;background:inherit}.core-styles-module_noArrow__xock6{display:none}.core-styles-module_clickable__ZuTTB{pointer-events:auto}.core-styles-module_show__Nt9eE{visibility:visible;opacity:var(--rt-opacity)}`, type: "core" }), e2.detail.disableBase || b({ css: `
.styles-module_tooltip__mnnfp{padding:8px 16px;border-radius:3px;font-size:90%;width:max-content}.styles-module_arrow__K0L3T{width:8px;height:8px}[class*='react-tooltip__place-top']>.styles-module_arrow__K0L3T{transform:rotate(45deg)}[class*='react-tooltip__place-right']>.styles-module_arrow__K0L3T{transform:rotate(135deg)}[class*='react-tooltip__place-bottom']>.styles-module_arrow__K0L3T{transform:rotate(225deg)}[class*='react-tooltip__place-left']>.styles-module_arrow__K0L3T{transform:rotate(315deg)}.styles-module_dark__xNqje{background:var(--rt-color-dark);color:var(--rt-color-white)}.styles-module_light__Z6W-X{background-color:var(--rt-color-white);color:var(--rt-color-dark)}.styles-module_success__A2AKt{background-color:var(--rt-color-success);color:var(--rt-color-white)}.styles-module_warning__SCK0X{background-color:var(--rt-color-warning);color:var(--rt-color-white)}.styles-module_error__JvumD{background-color:var(--rt-color-error);color:var(--rt-color-white)}.styles-module_info__BWdHW{background-color:var(--rt-color-info);color:var(--rt-color-white)}`, type: "base" });
});
export {
  W as Tooltip,
  T as TooltipProvider,
  L as TooltipWrapper,
  S as removeStyle
};
/*! Bundled license information:

react-tooltip/dist/react-tooltip.min.mjs:
  (*
  * React Tooltip
  * {@link https://github.com/ReactTooltip/react-tooltip}
  * @copyright ReactTooltip Team
  * @license MIT
  *)
*/
//# sourceMappingURL=react-tooltip.js.map
