// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({7:[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],6:[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":7}],4:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":6}],5:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/** Virtual DOM Node */
function VNode() {}

/** Global options
 *	@public
 *	@namespace options {Object}
 */
var options = {

	/** If `true`, `prop` changes trigger synchronous component updates.
  *	@name syncComponentUpdates
  *	@type Boolean
  *	@default true
  */
	//syncComponentUpdates: true,

	/** Processes all created VNodes.
  *	@param {VNode} vnode	A newly-created VNode to normalize/process
  */
	//vnode(vnode) { }

	/** Hook invoked after a component is mounted. */
	// afterMount(component) { }

	/** Hook invoked after the DOM is updated with a component's latest render. */
	// afterUpdate(component) { }

	/** Hook invoked immediately before a component is unmounted. */
	// beforeUnmount(component) { }
};

var stack = [];

var EMPTY_CHILDREN = [];

/**
 * JSX/hyperscript reviver.
 * @see http://jasonformat.com/wtf-is-jsx
 * Benchmarks: https://esbench.com/bench/57ee8f8e330ab09900a1a1a0
 *
 * Note: this is exported as both `h()` and `createElement()` for compatibility reasons.
 *
 * Creates a VNode (virtual DOM element). A tree of VNodes can be used as a lightweight representation
 * of the structure of a DOM tree. This structure can be realized by recursively comparing it against
 * the current _actual_ DOM structure, and applying only the differences.
 *
 * `h()`/`createElement()` accepts an element name, a list of attributes/props,
 * and optionally children to append to the element.
 *
 * @example The following DOM tree
 *
 * `<div id="foo" name="bar">Hello!</div>`
 *
 * can be constructed using this function as:
 *
 * `h('div', { id: 'foo', name : 'bar' }, 'Hello!');`
 *
 * @param {string} nodeName	An element name. Ex: `div`, `a`, `span`, etc.
 * @param {Object} attributes	Any attributes/props to set on the created element.
 * @param rest			Additional arguments are taken to be children to append. Can be infinitely nested Arrays.
 *
 * @public
 */
function h(nodeName, attributes) {
	var children = EMPTY_CHILDREN,
	    lastSimple,
	    child,
	    simple,
	    i;
	for (i = arguments.length; i-- > 2;) {
		stack.push(arguments[i]);
	}
	if (attributes && attributes.children != null) {
		if (!stack.length) stack.push(attributes.children);
		delete attributes.children;
	}
	while (stack.length) {
		if ((child = stack.pop()) && child.pop !== undefined) {
			for (i = child.length; i--;) {
				stack.push(child[i]);
			}
		} else {
			if (typeof child === 'boolean') child = null;

			if (simple = typeof nodeName !== 'function') {
				if (child == null) child = '';else if (typeof child === 'number') child = String(child);else if (typeof child !== 'string') simple = false;
			}

			if (simple && lastSimple) {
				children[children.length - 1] += child;
			} else if (children === EMPTY_CHILDREN) {
				children = [child];
			} else {
				children.push(child);
			}

			lastSimple = simple;
		}
	}

	var p = new VNode();
	p.nodeName = nodeName;
	p.children = children;
	p.attributes = attributes == null ? undefined : attributes;
	p.key = attributes == null ? undefined : attributes.key;

	// if a "vnode hook" is defined, pass every created VNode to it
	if (options.vnode !== undefined) options.vnode(p);

	return p;
}

/**
 *  Copy all properties from `props` onto `obj`.
 *  @param {Object} obj		Object onto which properties should be copied.
 *  @param {Object} props	Object from which to copy properties.
 *  @returns obj
 *  @private
 */
function extend(obj, props) {
	for (var i in props) {
		obj[i] = props[i];
	}return obj;
}

/**
 * Call a function asynchronously, as soon as possible. Makes
 * use of HTML Promise to schedule the callback if available,
 * otherwise falling back to `setTimeout` (mainly for IE<11).
 *
 * @param {Function} callback
 */
var defer = typeof Promise == 'function' ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;

/**
 * Clones the given VNode, optionally adding attributes/props and replacing its children.
 * @param {VNode} vnode		The virtual DOM element to clone
 * @param {Object} props	Attributes/props to add when cloning
 * @param {VNode} rest		Any additional arguments will be used as replacement children.
 */
function cloneElement(vnode, props) {
	return h(vnode.nodeName, extend(extend({}, vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
}

// DOM properties that should NOT have "px" added when numeric
var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;

/** Managed queue of dirty components to be re-rendered */

var items = [];

function enqueueRender(component) {
	if (!component._dirty && (component._dirty = true) && items.push(component) == 1) {
		(options.debounceRendering || defer)(rerender);
	}
}

function rerender() {
	var p,
	    list = items;
	items = [];
	while (p = list.pop()) {
		if (p._dirty) renderComponent(p);
	}
}

/**
 * Check if two nodes are equivalent.
 *
 * @param {Node} node			DOM Node to compare
 * @param {VNode} vnode			Virtual DOM node to compare
 * @param {boolean} [hydrating=false]	If true, ignores component constructors when comparing.
 * @private
 */
function isSameNodeType(node, vnode, hydrating) {
	if (typeof vnode === 'string' || typeof vnode === 'number') {
		return node.splitText !== undefined;
	}
	if (typeof vnode.nodeName === 'string') {
		return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
	}
	return hydrating || node._componentConstructor === vnode.nodeName;
}

/**
 * Check if an Element has a given nodeName, case-insensitively.
 *
 * @param {Element} node	A DOM Element to inspect the name of.
 * @param {String} nodeName	Unnormalized name to compare against.
 */
function isNamedNode(node, nodeName) {
	return node.normalizedNodeName === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase();
}

/**
 * Reconstruct Component-style `props` from a VNode.
 * Ensures default/fallback values from `defaultProps`:
 * Own-properties of `defaultProps` not present in `vnode.attributes` are added.
 *
 * @param {VNode} vnode
 * @returns {Object} props
 */
function getNodeProps(vnode) {
	var props = extend({}, vnode.attributes);
	props.children = vnode.children;

	var defaultProps = vnode.nodeName.defaultProps;
	if (defaultProps !== undefined) {
		for (var i in defaultProps) {
			if (props[i] === undefined) {
				props[i] = defaultProps[i];
			}
		}
	}

	return props;
}

/** Create an element with the given nodeName.
 *	@param {String} nodeName
 *	@param {Boolean} [isSvg=false]	If `true`, creates an element within the SVG namespace.
 *	@returns {Element} node
 */
function createNode(nodeName, isSvg) {
	var node = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName);
	node.normalizedNodeName = nodeName;
	return node;
}

/** Remove a child node from its parent if attached.
 *	@param {Element} node		The node to remove
 */
function removeNode(node) {
	var parentNode = node.parentNode;
	if (parentNode) parentNode.removeChild(node);
}

/** Set a named attribute on the given Node, with special behavior for some names and event handlers.
 *	If `value` is `null`, the attribute/handler will be removed.
 *	@param {Element} node	An element to mutate
 *	@param {string} name	The name/key to set, such as an event or attribute name
 *	@param {any} old	The last value that was set for this name/node pair
 *	@param {any} value	An attribute value, such as a function to be used as an event handler
 *	@param {Boolean} isSvg	Are we currently diffing inside an svg?
 *	@private
 */
function setAccessor(node, name, old, value, isSvg) {
	if (name === 'className') name = 'class';

	if (name === 'key') {
		// ignore
	} else if (name === 'ref') {
		if (old) old(null);
		if (value) value(node);
	} else if (name === 'class' && !isSvg) {
		node.className = value || '';
	} else if (name === 'style') {
		if (!value || typeof value === 'string' || typeof old === 'string') {
			node.style.cssText = value || '';
		}
		if (value && typeof value === 'object') {
			if (typeof old !== 'string') {
				for (var i in old) {
					if (!(i in value)) node.style[i] = '';
				}
			}
			for (var i in value) {
				node.style[i] = typeof value[i] === 'number' && IS_NON_DIMENSIONAL.test(i) === false ? value[i] + 'px' : value[i];
			}
		}
	} else if (name === 'dangerouslySetInnerHTML') {
		if (value) node.innerHTML = value.__html || '';
	} else if (name[0] == 'o' && name[1] == 'n') {
		var useCapture = name !== (name = name.replace(/Capture$/, ''));
		name = name.toLowerCase().substring(2);
		if (value) {
			if (!old) node.addEventListener(name, eventProxy, useCapture);
		} else {
			node.removeEventListener(name, eventProxy, useCapture);
		}
		(node._listeners || (node._listeners = {}))[name] = value;
	} else if (name !== 'list' && name !== 'type' && !isSvg && name in node) {
		setProperty(node, name, value == null ? '' : value);
		if (value == null || value === false) node.removeAttribute(name);
	} else {
		var ns = isSvg && name !== (name = name.replace(/^xlink:?/, ''));
		if (value == null || value === false) {
			if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase());else node.removeAttribute(name);
		} else if (typeof value !== 'function') {
			if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value);else node.setAttribute(name, value);
		}
	}
}

/** Attempt to set a DOM property to the given value.
 *	IE & FF throw for certain property-value combinations.
 */
function setProperty(node, name, value) {
	try {
		node[name] = value;
	} catch (e) {}
}

/** Proxy an event to hooked event handlers
 *	@private
 */
function eventProxy(e) {
	return this._listeners[e.type](options.event && options.event(e) || e);
}

/** Queue of components that have been mounted and are awaiting componentDidMount */
var mounts = [];

/** Diff recursion count, used to track the end of the diff cycle. */
var diffLevel = 0;

/** Global flag indicating if the diff is currently within an SVG */
var isSvgMode = false;

/** Global flag indicating if the diff is performing hydration */
var hydrating = false;

/** Invoke queued componentDidMount lifecycle methods */
function flushMounts() {
	var c;
	while (c = mounts.pop()) {
		if (options.afterMount) options.afterMount(c);
		if (c.componentDidMount) c.componentDidMount();
	}
}

/** Apply differences in a given vnode (and it's deep children) to a real DOM Node.
 *	@param {Element} [dom=null]		A DOM node to mutate into the shape of the `vnode`
 *	@param {VNode} vnode			A VNode (with descendants forming a tree) representing the desired DOM structure
 *	@returns {Element} dom			The created/mutated element
 *	@private
 */
function diff(dom, vnode, context, mountAll, parent, componentRoot) {
	// diffLevel having been 0 here indicates initial entry into the diff (not a subdiff)
	if (!diffLevel++) {
		// when first starting the diff, check if we're diffing an SVG or within an SVG
		isSvgMode = parent != null && parent.ownerSVGElement !== undefined;

		// hydration is indicated by the existing element to be diffed not having a prop cache
		hydrating = dom != null && !('__preactattr_' in dom);
	}

	var ret = idiff(dom, vnode, context, mountAll, componentRoot);

	// append the element if its a new parent
	if (parent && ret.parentNode !== parent) parent.appendChild(ret);

	// diffLevel being reduced to 0 means we're exiting the diff
	if (! --diffLevel) {
		hydrating = false;
		// invoke queued componentDidMount lifecycle methods
		if (!componentRoot) flushMounts();
	}

	return ret;
}

/** Internals of `diff()`, separated to allow bypassing diffLevel / mount flushing. */
function idiff(dom, vnode, context, mountAll, componentRoot) {
	var out = dom,
	    prevSvgMode = isSvgMode;

	// empty values (null, undefined, booleans) render as empty Text nodes
	if (vnode == null || typeof vnode === 'boolean') vnode = '';

	// Fast case: Strings & Numbers create/update Text nodes.
	if (typeof vnode === 'string' || typeof vnode === 'number') {

		// update if it's already a Text node:
		if (dom && dom.splitText !== undefined && dom.parentNode && (!dom._component || componentRoot)) {
			/* istanbul ignore if */ /* Browser quirk that can't be covered: https://github.com/developit/preact/commit/fd4f21f5c45dfd75151bd27b4c217d8003aa5eb9 */
			if (dom.nodeValue != vnode) {
				dom.nodeValue = vnode;
			}
		} else {
			// it wasn't a Text node: replace it with one and recycle the old Element
			out = document.createTextNode(vnode);
			if (dom) {
				if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
				recollectNodeTree(dom, true);
			}
		}

		out['__preactattr_'] = true;

		return out;
	}

	// If the VNode represents a Component, perform a component diff:
	var vnodeName = vnode.nodeName;
	if (typeof vnodeName === 'function') {
		return buildComponentFromVNode(dom, vnode, context, mountAll);
	}

	// Tracks entering and exiting SVG namespace when descending through the tree.
	isSvgMode = vnodeName === 'svg' ? true : vnodeName === 'foreignObject' ? false : isSvgMode;

	// If there's no existing element or it's the wrong type, create a new one:
	vnodeName = String(vnodeName);
	if (!dom || !isNamedNode(dom, vnodeName)) {
		out = createNode(vnodeName, isSvgMode);

		if (dom) {
			// move children into the replacement node
			while (dom.firstChild) {
				out.appendChild(dom.firstChild);
			} // if the previous Element was mounted into the DOM, replace it inline
			if (dom.parentNode) dom.parentNode.replaceChild(out, dom);

			// recycle the old element (skips non-Element node types)
			recollectNodeTree(dom, true);
		}
	}

	var fc = out.firstChild,
	    props = out['__preactattr_'],
	    vchildren = vnode.children;

	if (props == null) {
		props = out['__preactattr_'] = {};
		for (var a = out.attributes, i = a.length; i--;) {
			props[a[i].name] = a[i].value;
		}
	}

	// Optimization: fast-path for elements containing a single TextNode:
	if (!hydrating && vchildren && vchildren.length === 1 && typeof vchildren[0] === 'string' && fc != null && fc.splitText !== undefined && fc.nextSibling == null) {
		if (fc.nodeValue != vchildren[0]) {
			fc.nodeValue = vchildren[0];
		}
	}
	// otherwise, if there are existing or new children, diff them:
	else if (vchildren && vchildren.length || fc != null) {
			innerDiffNode(out, vchildren, context, mountAll, hydrating || props.dangerouslySetInnerHTML != null);
		}

	// Apply attributes/props from VNode to the DOM Element:
	diffAttributes(out, vnode.attributes, props);

	// restore previous SVG mode: (in case we're exiting an SVG namespace)
	isSvgMode = prevSvgMode;

	return out;
}

/** Apply child and attribute changes between a VNode and a DOM Node to the DOM.
 *	@param {Element} dom			Element whose children should be compared & mutated
 *	@param {Array} vchildren		Array of VNodes to compare to `dom.childNodes`
 *	@param {Object} context			Implicitly descendant context object (from most recent `getChildContext()`)
 *	@param {Boolean} mountAll
 *	@param {Boolean} isHydrating	If `true`, consumes externally created elements similar to hydration
 */
function innerDiffNode(dom, vchildren, context, mountAll, isHydrating) {
	var originalChildren = dom.childNodes,
	    children = [],
	    keyed = {},
	    keyedLen = 0,
	    min = 0,
	    len = originalChildren.length,
	    childrenLen = 0,
	    vlen = vchildren ? vchildren.length : 0,
	    j,
	    c,
	    f,
	    vchild,
	    child;

	// Build up a map of keyed children and an Array of unkeyed children:
	if (len !== 0) {
		for (var i = 0; i < len; i++) {
			var _child = originalChildren[i],
			    props = _child['__preactattr_'],
			    key = vlen && props ? _child._component ? _child._component.__key : props.key : null;
			if (key != null) {
				keyedLen++;
				keyed[key] = _child;
			} else if (props || (_child.splitText !== undefined ? isHydrating ? _child.nodeValue.trim() : true : isHydrating)) {
				children[childrenLen++] = _child;
			}
		}
	}

	if (vlen !== 0) {
		for (var i = 0; i < vlen; i++) {
			vchild = vchildren[i];
			child = null;

			// attempt to find a node based on key matching
			var key = vchild.key;
			if (key != null) {
				if (keyedLen && keyed[key] !== undefined) {
					child = keyed[key];
					keyed[key] = undefined;
					keyedLen--;
				}
			}
			// attempt to pluck a node of the same type from the existing children
			else if (!child && min < childrenLen) {
					for (j = min; j < childrenLen; j++) {
						if (children[j] !== undefined && isSameNodeType(c = children[j], vchild, isHydrating)) {
							child = c;
							children[j] = undefined;
							if (j === childrenLen - 1) childrenLen--;
							if (j === min) min++;
							break;
						}
					}
				}

			// morph the matched/found/created DOM child to match vchild (deep)
			child = idiff(child, vchild, context, mountAll);

			f = originalChildren[i];
			if (child && child !== dom && child !== f) {
				if (f == null) {
					dom.appendChild(child);
				} else if (child === f.nextSibling) {
					removeNode(f);
				} else {
					dom.insertBefore(child, f);
				}
			}
		}
	}

	// remove unused keyed children:
	if (keyedLen) {
		for (var i in keyed) {
			if (keyed[i] !== undefined) recollectNodeTree(keyed[i], false);
		}
	}

	// remove orphaned unkeyed children:
	while (min <= childrenLen) {
		if ((child = children[childrenLen--]) !== undefined) recollectNodeTree(child, false);
	}
}

/** Recursively recycle (or just unmount) a node and its descendants.
 *	@param {Node} node						DOM node to start unmount/removal from
 *	@param {Boolean} [unmountOnly=false]	If `true`, only triggers unmount lifecycle, skips removal
 */
function recollectNodeTree(node, unmountOnly) {
	var component = node._component;
	if (component) {
		// if node is owned by a Component, unmount that component (ends up recursing back here)
		unmountComponent(component);
	} else {
		// If the node's VNode had a ref function, invoke it with null here.
		// (this is part of the React spec, and smart for unsetting references)
		if (node['__preactattr_'] != null && node['__preactattr_'].ref) node['__preactattr_'].ref(null);

		if (unmountOnly === false || node['__preactattr_'] == null) {
			removeNode(node);
		}

		removeChildren(node);
	}
}

/** Recollect/unmount all children.
 *	- we use .lastChild here because it causes less reflow than .firstChild
 *	- it's also cheaper than accessing the .childNodes Live NodeList
 */
function removeChildren(node) {
	node = node.lastChild;
	while (node) {
		var next = node.previousSibling;
		recollectNodeTree(node, true);
		node = next;
	}
}

/** Apply differences in attributes from a VNode to the given DOM Element.
 *	@param {Element} dom		Element with attributes to diff `attrs` against
 *	@param {Object} attrs		The desired end-state key-value attribute pairs
 *	@param {Object} old			Current/previous attributes (from previous VNode or element's prop cache)
 */
function diffAttributes(dom, attrs, old) {
	var name;

	// remove attributes no longer present on the vnode by setting them to undefined
	for (name in old) {
		if (!(attrs && attrs[name] != null) && old[name] != null) {
			setAccessor(dom, name, old[name], old[name] = undefined, isSvgMode);
		}
	}

	// add new & update changed attributes
	for (name in attrs) {
		if (name !== 'children' && name !== 'innerHTML' && (!(name in old) || attrs[name] !== (name === 'value' || name === 'checked' ? dom[name] : old[name]))) {
			setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
		}
	}
}

/** Retains a pool of Components for re-use, keyed on component name.
 *	Note: since component names are not unique or even necessarily available, these are primarily a form of sharding.
 *	@private
 */
var components = {};

/** Reclaim a component for later re-use by the recycler. */
function collectComponent(component) {
	var name = component.constructor.name;
	(components[name] || (components[name] = [])).push(component);
}

/** Create a component. Normalizes differences between PFC's and classful Components. */
function createComponent(Ctor, props, context) {
	var list = components[Ctor.name],
	    inst;

	if (Ctor.prototype && Ctor.prototype.render) {
		inst = new Ctor(props, context);
		Component.call(inst, props, context);
	} else {
		inst = new Component(props, context);
		inst.constructor = Ctor;
		inst.render = doRender;
	}

	if (list) {
		for (var i = list.length; i--;) {
			if (list[i].constructor === Ctor) {
				inst.nextBase = list[i].nextBase;
				list.splice(i, 1);
				break;
			}
		}
	}
	return inst;
}

/** The `.render()` method for a PFC backing instance. */
function doRender(props, state, context) {
	return this.constructor(props, context);
}

/** Set a component's `props` (generally derived from JSX attributes).
 *	@param {Object} props
 *	@param {Object} [opts]
 *	@param {boolean} [opts.renderSync=false]	If `true` and {@link options.syncComponentUpdates} is `true`, triggers synchronous rendering.
 *	@param {boolean} [opts.render=true]			If `false`, no render will be triggered.
 */
function setComponentProps(component, props, opts, context, mountAll) {
	if (component._disable) return;
	component._disable = true;

	if (component.__ref = props.ref) delete props.ref;
	if (component.__key = props.key) delete props.key;

	if (!component.base || mountAll) {
		if (component.componentWillMount) component.componentWillMount();
	} else if (component.componentWillReceiveProps) {
		component.componentWillReceiveProps(props, context);
	}

	if (context && context !== component.context) {
		if (!component.prevContext) component.prevContext = component.context;
		component.context = context;
	}

	if (!component.prevProps) component.prevProps = component.props;
	component.props = props;

	component._disable = false;

	if (opts !== 0) {
		if (opts === 1 || options.syncComponentUpdates !== false || !component.base) {
			renderComponent(component, 1, mountAll);
		} else {
			enqueueRender(component);
		}
	}

	if (component.__ref) component.__ref(component);
}

/** Render a Component, triggering necessary lifecycle events and taking High-Order Components into account.
 *	@param {Component} component
 *	@param {Object} [opts]
 *	@param {boolean} [opts.build=false]		If `true`, component will build and store a DOM node if not already associated with one.
 *	@private
 */
function renderComponent(component, opts, mountAll, isChild) {
	if (component._disable) return;

	var props = component.props,
	    state = component.state,
	    context = component.context,
	    previousProps = component.prevProps || props,
	    previousState = component.prevState || state,
	    previousContext = component.prevContext || context,
	    isUpdate = component.base,
	    nextBase = component.nextBase,
	    initialBase = isUpdate || nextBase,
	    initialChildComponent = component._component,
	    skip = false,
	    rendered,
	    inst,
	    cbase;

	// if updating
	if (isUpdate) {
		component.props = previousProps;
		component.state = previousState;
		component.context = previousContext;
		if (opts !== 2 && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === false) {
			skip = true;
		} else if (component.componentWillUpdate) {
			component.componentWillUpdate(props, state, context);
		}
		component.props = props;
		component.state = state;
		component.context = context;
	}

	component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
	component._dirty = false;

	if (!skip) {
		rendered = component.render(props, state, context);

		// context to pass to the child, can be updated via (grand-)parent component
		if (component.getChildContext) {
			context = extend(extend({}, context), component.getChildContext());
		}

		var childComponent = rendered && rendered.nodeName,
		    toUnmount,
		    base;

		if (typeof childComponent === 'function') {
			// set up high order component link

			var childProps = getNodeProps(rendered);
			inst = initialChildComponent;

			if (inst && inst.constructor === childComponent && childProps.key == inst.__key) {
				setComponentProps(inst, childProps, 1, context, false);
			} else {
				toUnmount = inst;

				component._component = inst = createComponent(childComponent, childProps, context);
				inst.nextBase = inst.nextBase || nextBase;
				inst._parentComponent = component;
				setComponentProps(inst, childProps, 0, context, false);
				renderComponent(inst, 1, mountAll, true);
			}

			base = inst.base;
		} else {
			cbase = initialBase;

			// destroy high order component link
			toUnmount = initialChildComponent;
			if (toUnmount) {
				cbase = component._component = null;
			}

			if (initialBase || opts === 1) {
				if (cbase) cbase._component = null;
				base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, true);
			}
		}

		if (initialBase && base !== initialBase && inst !== initialChildComponent) {
			var baseParent = initialBase.parentNode;
			if (baseParent && base !== baseParent) {
				baseParent.replaceChild(base, initialBase);

				if (!toUnmount) {
					initialBase._component = null;
					recollectNodeTree(initialBase, false);
				}
			}
		}

		if (toUnmount) {
			unmountComponent(toUnmount);
		}

		component.base = base;
		if (base && !isChild) {
			var componentRef = component,
			    t = component;
			while (t = t._parentComponent) {
				(componentRef = t).base = base;
			}
			base._component = componentRef;
			base._componentConstructor = componentRef.constructor;
		}
	}

	if (!isUpdate || mountAll) {
		mounts.unshift(component);
	} else if (!skip) {
		// Ensure that pending componentDidMount() hooks of child components
		// are called before the componentDidUpdate() hook in the parent.
		// Note: disabled as it causes duplicate hooks, see https://github.com/developit/preact/issues/750
		// flushMounts();

		if (component.componentDidUpdate) {
			component.componentDidUpdate(previousProps, previousState, previousContext);
		}
		if (options.afterUpdate) options.afterUpdate(component);
	}

	if (component._renderCallbacks != null) {
		while (component._renderCallbacks.length) {
			component._renderCallbacks.pop().call(component);
		}
	}

	if (!diffLevel && !isChild) flushMounts();
}

/** Apply the Component referenced by a VNode to the DOM.
 *	@param {Element} dom	The DOM node to mutate
 *	@param {VNode} vnode	A Component-referencing VNode
 *	@returns {Element} dom	The created/mutated element
 *	@private
 */
function buildComponentFromVNode(dom, vnode, context, mountAll) {
	var c = dom && dom._component,
	    originalComponent = c,
	    oldDom = dom,
	    isDirectOwner = c && dom._componentConstructor === vnode.nodeName,
	    isOwner = isDirectOwner,
	    props = getNodeProps(vnode);
	while (c && !isOwner && (c = c._parentComponent)) {
		isOwner = c.constructor === vnode.nodeName;
	}

	if (c && isOwner && (!mountAll || c._component)) {
		setComponentProps(c, props, 3, context, mountAll);
		dom = c.base;
	} else {
		if (originalComponent && !isDirectOwner) {
			unmountComponent(originalComponent);
			dom = oldDom = null;
		}

		c = createComponent(vnode.nodeName, props, context);
		if (dom && !c.nextBase) {
			c.nextBase = dom;
			// passing dom/oldDom as nextBase will recycle it if unused, so bypass recycling on L229:
			oldDom = null;
		}
		setComponentProps(c, props, 1, context, mountAll);
		dom = c.base;

		if (oldDom && dom !== oldDom) {
			oldDom._component = null;
			recollectNodeTree(oldDom, false);
		}
	}

	return dom;
}

/** Remove a component from the DOM and recycle it.
 *	@param {Component} component	The Component instance to unmount
 *	@private
 */
function unmountComponent(component) {
	if (options.beforeUnmount) options.beforeUnmount(component);

	var base = component.base;

	component._disable = true;

	if (component.componentWillUnmount) component.componentWillUnmount();

	component.base = null;

	// recursively tear down & recollect high-order component children:
	var inner = component._component;
	if (inner) {
		unmountComponent(inner);
	} else if (base) {
		if (base['__preactattr_'] && base['__preactattr_'].ref) base['__preactattr_'].ref(null);

		component.nextBase = base;

		removeNode(base);
		collectComponent(component);

		removeChildren(base);
	}

	if (component.__ref) component.__ref(null);
}

/** Base Component class.
 *	Provides `setState()` and `forceUpdate()`, which trigger rendering.
 *	@public
 *
 *	@example
 *	class MyFoo extends Component {
 *		render(props, state) {
 *			return <div />;
 *		}
 *	}
 */
function Component(props, context) {
	this._dirty = true;

	/** @public
  *	@type {object}
  */
	this.context = context;

	/** @public
  *	@type {object}
  */
	this.props = props;

	/** @public
  *	@type {object}
  */
	this.state = this.state || {};
}

extend(Component.prototype, {

	/** Returns a `boolean` indicating if the component should re-render when receiving the given `props` and `state`.
  *	@param {object} nextProps
  *	@param {object} nextState
  *	@param {object} nextContext
  *	@returns {Boolean} should the component re-render
  *	@name shouldComponentUpdate
  *	@function
  */

	/** Update component state by copying properties from `state` to `this.state`.
  *	@param {object} state		A hash of state properties to update with new values
  *	@param {function} callback	A function to be called once component state is updated
  */
	setState: function setState(state, callback) {
		var s = this.state;
		if (!this.prevState) this.prevState = extend({}, s);
		extend(s, typeof state === 'function' ? state(s, this.props) : state);
		if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
		enqueueRender(this);
	},

	/** Immediately perform a synchronous re-render of the component.
  *	@param {function} callback		A function to be called after component is re-rendered.
  *	@private
  */
	forceUpdate: function forceUpdate(callback) {
		if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
		renderComponent(this, 2);
	},

	/** Accepts `props` and `state`, and returns a new Virtual DOM tree to build.
  *	Virtual DOM is generally constructed via [JSX](http://jasonformat.com/wtf-is-jsx).
  *	@param {object} props		Props (eg: JSX attributes) received from parent element/component
  *	@param {object} state		The component's current state
  *	@param {object} context		Context object (if a parent component has provided context)
  *	@returns VNode
  */
	render: function render() {}
});

/** Render JSX into a `parent` Element.
 *	@param {VNode} vnode		A (JSX) VNode to render
 *	@param {Element} parent		DOM element to render into
 *	@param {Element} [merge]	Attempt to re-use an existing DOM tree rooted at `merge`
 *	@public
 *
 *	@example
 *	// render a div into <body>:
 *	render(<div id="hello">hello!</div>, document.body);
 *
 *	@example
 *	// render a "Thing" component into #foo:
 *	const Thing = ({ name }) => <span>{ name }</span>;
 *	render(<Thing name="one" />, document.querySelector('#foo'));
 */
function render(vnode, parent, merge) {
	return diff(merge, vnode, {}, false, parent, false);
}

var preact = {
	h: h,
	createElement: h,
	cloneElement: cloneElement,
	Component: Component,
	render: render,
	rerender: rerender,
	options: options
};

exports.default = preact;
exports.h = h;
exports.createElement = h;
exports.cloneElement = cloneElement;
exports.Component = Component;
exports.render = render;
exports.rerender = rerender;
exports.options = options;
//# sourceMappingURL=preact.esm.js.map
},{}],15:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var connect = exports.connect = function connect(model, eventHandlers) {
  return function (ConnectedComponent) {
    return function (_Component) {
      _inherits(ModelComponent, _Component);

      /**
       * Constructor
       */
      function ModelComponent() {
        _classCallCheck(this, ModelComponent);

        var _this = _possibleConstructorReturn(this, (ModelComponent.__proto__ || Object.getPrototypeOf(ModelComponent)).call(this));

        _this.state = _extends({}, model.data, eventHandlers);
        return _this;
      }

      /**
       * @inheritDoc
       */


      _createClass(ModelComponent, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
          var _this2 = this;

          var updateData = function updateData(oldUpdater) {
            return function (data) {
              oldUpdater(data);

              _this2.setState(_extends({}, _this2.state, model.data));
            };
          };

          // Set state on every model data update
          model.updateData = updateData(model.updateData);
        }

        /**
         * @inheritDoc
         */

      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          // Reset model's update data to previous state
          model.updateData = this.oldUpdater;
        }

        /**
         * @inheritDoc
         */

      }, {
        key: 'render',
        value: function render() {
          return (0, _preact.h)(ConnectedComponent, _extends({}, this.state, this.props));
        }
      }]);

      return ModelComponent;
    }(_preact.Component);
  };
};
},{"preact":5}],29:[function(require,module,exports) {
(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1])
      }, this)
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = String(input)
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
    // https://tools.ietf.org/html/rfc7230#section-3.2
    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ')
    preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = options.status === undefined ? 200 : options.status
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      } else if (request.credentials === 'omit') {
        xhr.withCredentials = false
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);

},{}],28:[function(require,module,exports) {
// the whatwg-fetch polyfill installs the fetch() function
// on the global object (window or self)
//
// Return that as the export for use in Webpack, Browserify etc.
require('whatwg-fetch');
var globalObj = typeof self !== 'undefined' && self || this;
module.exports = globalObj.fetch.bind(globalObj);

},{"whatwg-fetch":29}],25:[function(require,module,exports) {
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("fetch-everywhere")):"function"==typeof define&&define.amd?define("PrismicJS",["fetch-everywhere"],e):"object"==typeof exports?exports.PrismicJS=e(require("fetch-everywhere")):t.PrismicJS=e(t["fetch-everywhere"])}("undefined"!=typeof self?self:this,function(t){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=5)}([function(t,e,n){"use strict";function r(t){return"string"==typeof t?'"'+t+'"':t instanceof Array?"["+t.map(function(t){return r(t)}).join(",")+"]":"number"==typeof t?t:null}e.__esModule=!0;var o={at:"at",not:"not",missing:"missing",has:"has",any:"any",in:"in",fulltext:"fulltext",similar:"similar",numberGt:"number.gt",numberLt:"number.lt",numberInRange:"number.inRange",dateBefore:"date.before",dateAfter:"date.after",dateBetween:"date.between",dateDayOfMonth:"date.day-of-month",dateDayOfMonthAfter:"date.day-of-month-after",dateDayOfMonthBefore:"date.day-of-month-before",dateDayOfWeek:"date.day-of-week",dateDayOfWeekAfter:"date.day-of-week-after",dateDayOfWeekBefore:"date.day-of-week-before",dateMonth:"date.month",dateMonthBefore:"date.month-before",dateMonthAfter:"date.month-after",dateYear:"date.year",dateHour:"date.hour",dateHourBefore:"date.hour-before",dateHourAfter:"date.hour-after",GeopointNear:"geopoint.near"},i={near:function(t,e,n,r){return"["+o.GeopointNear+"("+t+", "+e+", "+n+", "+r+")]"}},u={before:function(t,e){return"["+o.dateBefore+"("+t+", "+e.getTime()+")]"},after:function(t,e){return"["+o.dateAfter+"("+t+", "+e.getTime()+")]"},between:function(t,e,n){return"["+o.dateBetween+"("+t+", "+e.getTime()+", "+n.getTime()+")]"},dayOfMonth:function(t,e){return"["+o.dateDayOfMonth+"("+t+", "+e+")]"},dayOfMonthAfter:function(t,e){return"["+o.dateDayOfMonthAfter+"("+t+", "+e+")]"},dayOfMonthBefore:function(t,e){return"["+o.dateDayOfMonthBefore+"("+t+", "+e+")]"},dayOfWeek:function(t,e){return"["+o.dateDayOfWeek+"("+t+", "+e+")]"},dayOfWeekAfter:function(t,e){return"["+o.dateDayOfWeekAfter+"("+t+", "+e+")]"},dayOfWeekBefore:function(t,e){return"["+o.dateDayOfWeekBefore+"("+t+", "+e+")]"},month:function(t,e){return"number"==typeof e?"["+o.dateMonth+"("+t+", "+e+")]":"["+o.dateMonth+"("+t+', "'+e+'")]'},monthBefore:function(t,e){return"number"==typeof e?"["+o.dateMonthBefore+"("+t+", "+e+")]":"["+o.dateMonthBefore+"("+t+', "'+e+'")]'},monthAfter:function(t,e){return"number"==typeof e?"["+o.dateMonthAfter+"("+t+", "+e+")]":"["+o.dateMonthAfter+"("+t+', "'+e+'")]'},year:function(t,e){return"["+o.dateYear+"("+t+", "+e+")]"},hour:function(t,e){return"["+o.dateHour+"("+t+", "+e+")]"},hourBefore:function(t,e){return"["+o.dateHourBefore+"("+t+", "+e+")]"},hourAfter:function(t,e){return"["+o.dateHourAfter+"("+t+", "+e+")]"}},a={gt:function(t,e){return"["+o.numberGt+"("+t+", "+e+")]"},lt:function(t,e){return"["+o.numberLt+"("+t+", "+e+")]"},inRange:function(t,e,n){return"["+o.numberInRange+"("+t+", "+e+", "+n+")]"}};e.default={at:function(t,e){return"["+o.at+"("+t+", "+r(e)+")]"},not:function(t,e){return"["+o.not+"("+t+", "+r(e)+")]"},missing:function(t){return"["+o.missing+"("+t+")]"},has:function(t){return"["+o.has+"("+t+")]"},any:function(t,e){return"["+o.any+"("+t+", "+r(e)+")]"},in:function(t,e){return"["+o.in+"("+t+", "+r(e)+")]"},fulltext:function(t,e){return"["+o.fulltext+"("+t+", "+r(e)+")]"},similar:function(t,e){return"["+o.similar+'("'+t+'", '+e+")]"},date:u,dateBefore:u.before,dateAfter:u.after,dateBetween:u.between,dayOfMonth:u.dayOfMonth,dayOfMonthAfter:u.dayOfMonthAfter,dayOfMonthBefore:u.dayOfMonthBefore,dayOfWeek:u.dayOfWeek,dayOfWeekAfter:u.dayOfWeekAfter,dayOfWeekBefore:u.dayOfWeekBefore,month:u.month,monthBefore:u.monthBefore,monthAfter:u.monthAfter,year:u.year,hour:u.hour,hourBefore:u.hourBefore,hourAfter:u.hourAfter,number:a,gt:a.gt,lt:a.lt,inRange:a.inRange,near:i.near,geopoint:i}},function(t,e,n){"use strict";e.__esModule=!0;var r=function(){function t(t){this.data={},this.data=t}return t.prototype.id=function(){return this.data.id},t.prototype.ref=function(){return this.data.ref},t.prototype.label=function(){return this.data.label},t}();e.Variation=r;var o=function(){function t(t){this.data={},this.data=t,this.variations=(t.variations||[]).map(function(t){return new r(t)})}return t.prototype.id=function(){return this.data.id},t.prototype.googleId=function(){return this.data.googleId},t.prototype.name=function(){return this.data.name},t}();e.Experiment=o;var i=function(){function t(t){t&&(this.drafts=(t.drafts||[]).map(function(t){return new o(t)}),this.running=(t.running||[]).map(function(t){return new o(t)}))}return t.prototype.current=function(){return this.running.length>0?this.running[0]:null},t.prototype.refFromCookie=function(t){if(!t||""===t.trim())return null;var e=t.trim().split(" ");if(e.length<2)return null;var n=e[0],r=parseInt(e[1],10),o=this.running.filter(function(t){return t.googleId()===n&&t.variations.length>r})[0];return o?o.variations[r].ref():null},t}();e.Experiments=i},function(t,e,n){"use strict";e.__esModule=!0;var r=function(){function t(t,e){this.id=t,this.api=e,this.fields={}}return t.prototype.set=function(t,e){return this.fields[t]=e,this},t.prototype.ref=function(t){return this.set("ref",t)},t.prototype.query=function(t){return this.set("q",t)},t.prototype.pageSize=function(t){return this.set("pageSize",t)},t.prototype.fetch=function(t){return this.set("fetch",t)},t.prototype.fetchLinks=function(t){return this.set("fetchLinks",t)},t.prototype.lang=function(t){return this.set("lang",t)},t.prototype.page=function(t){return this.set("page",t)},t.prototype.after=function(t){return this.set("after",t)},t.prototype.orderings=function(t){return this.set("orderings",t)},t.prototype.url=function(){var e=this;return this.api.get().then(function(n){return t.toSearchForm(e,n).url()})},t.prototype.submit=function(e){var n=this;return this.api.get().then(function(r){return t.toSearchForm(n,r).submit(e)})},t.toSearchForm=function(t,e){var n=e.form(t.id);if(n)return Object.keys(t.fields).reduce(function(e,n){var r=t.fields[n];return"q"===n?e.query(r):"pageSize"===n?e.pageSize(r):"fetch"===n?e.fetch(r):"fetchLinks"===n?e.fetchLinks(r):"lang"===n?e.lang(r):"page"===n?e.page(r):"after"===n?e.after(r):"orderings"===n?e.orderings(r):e.set(n,r)},n);throw new Error("Unable to access to form "+t.id)},t}();e.LazySearchForm=r;var o=function(){function t(t,e){this.httpClient=e,this.form=t,this.data={};for(var n in t.fields)t.fields[n].default&&(this.data[n]=[t.fields[n].default])}return t.prototype.set=function(t,e){var n=this.form.fields[t];if(!n)throw new Error("Unknown field "+t);var r=""===e||void 0===e?null:e,o=this.data[t]||[];return o=n.multiple?r?o.concat([r]):o:r?[r]:o,this.data[t]=o,this},t.prototype.ref=function(t){return this.set("ref",t)},t.prototype.query=function(t){if("string"==typeof t)return this.query([t]);if(t instanceof Array)return this.set("q","["+t.join("")+"]");throw new Error("Invalid query : "+t)},t.prototype.pageSize=function(t){return this.set("pageSize",t)},t.prototype.fetch=function(t){var e=t instanceof Array?t.join(","):t;return this.set("fetch",e)},t.prototype.fetchLinks=function(t){var e=t instanceof Array?t.join(","):t;return this.set("fetchLinks",e)},t.prototype.lang=function(t){return this.set("lang",t)},t.prototype.page=function(t){return this.set("page",t)},t.prototype.after=function(t){return this.set("after",t)},t.prototype.orderings=function(t){return t?this.set("orderings","["+t.join(",")+"]"):this},t.prototype.url=function(){var t=this.form.action;if(this.data){var e=t.indexOf("?")>-1?"&":"?";for(var n in this.data)if(this.data.hasOwnProperty(n)){var r=this.data[n];if(r)for(var o=0;o<r.length;o++)t+=e+n+"="+encodeURIComponent(r[o]),e="&"}}return t},t.prototype.submit=function(t){return this.httpClient.cachedRequest(this.url()).then(function(e){return t&&t(null,e),e}).catch(function(e){throw t&&t(e),e})},t}();e.SearchForm=o},function(t,e,n){"use strict";e.__esModule=!0;var r=n(4),o=n(10),i=function(){function t(t,e){if(this.options=e||{},this.url=t,this.options.accessToken){var n="access_token="+this.options.accessToken;this.url+=(t.indexOf("?")>-1?"&":"?")+n}this.apiDataTTL=this.options.apiDataTTL||5,this.httpClient=new o.default(this.options.requestHandler,this.options.apiCache,this.options.proxyAgent)}return t.prototype.get=function(t){var e=this;return this.httpClient.cachedRequest(this.url,{ttl:this.apiDataTTL}).then(function(n){var o=new r.default(n,e.httpClient,e.options);return t&&t(null,o),o}).catch(function(e){throw t&&t(e),e})},t}();e.default=i},function(t,e,n){"use strict";e.__esModule=!0;var r=n(1),o=n(2),i=n(0),u=n(9);e.PREVIEW_COOKIE="io.prismic.preview",e.EXPERIMENT_COOKIE="io.prismic.experiment";var a=function(){function t(t,e,n){this.data=t,this.masterRef=t.refs.filter(function(t){return t.isMasterRef})[0],this.experiments=new r.Experiments(t.experiments),this.bookmarks=t.bookmarks,this.httpClient=e,this.options=n,this.refs=t.refs,this.tags=t.tags,this.types=t.types}return t.prototype.form=function(t){var e=this.data.forms[t];return e?new o.SearchForm(e,this.httpClient):null},t.prototype.everything=function(){var t=this.form("everything");if(!t)throw new Error("Missing everything form");return t},t.prototype.master=function(){return this.masterRef.ref},t.prototype.ref=function(t){var e=this.data.refs.filter(function(e){return e.label===t})[0];return e?e.ref:null},t.prototype.currentExperiment=function(){return this.experiments.current()},t.prototype.query=function(t,n,r){void 0===r&&(r=function(){});var o="function"==typeof n?{options:{},callback:n}:{options:n||{},callback:r},i=o.options,a=o.callback,f=this.everything();for(var s in i)f=f.set(s,i[s]);if(!i.ref){var c="";this.options.req?c=this.options.req.headers.cookie||"":"undefined"!=typeof window&&window.document&&(c=window.document.cookie||"");var h=u.default.parse(c),p=h[e.PREVIEW_COOKIE],l=this.experiments.refFromCookie(h[e.EXPERIMENT_COOKIE]);f=f.ref(p||l||this.masterRef.ref)}return t&&f.query(t),f.submit(a)},t.prototype.queryFirst=function(t,e,n){var r="function"==typeof e?{options:{},callback:e}:{options:e||{},callback:n||function(){}},o=r.options,i=r.callback;return o.page=1,o.pageSize=1,this.query(t,o).then(function(t){var e=t&&t.results&&t.results[0];return i(null,e),e}).catch(function(t){throw i(t),t})},t.prototype.getByID=function(t,e,n){var r=e||{};return r.lang||(r.lang="*"),this.queryFirst(i.default.at("document.id",t),r,n)},t.prototype.getByIDs=function(t,e,n){var r=e||{};return r.lang||(r.lang="*"),this.query(i.default.in("document.id",t),r,n)},t.prototype.getByUID=function(t,e,n,r){var o=n||{};return o.lang||(o.lang="*"),this.queryFirst(i.default.at("my."+t+".uid",e),o,r)},t.prototype.getSingle=function(t,e,n){var r=e||{};return this.queryFirst(i.default.at("document.type",t),r,n)},t.prototype.getBookmark=function(t,e,n){var r=this.data.bookmarks[t];return r?this.getByID(r,e,n):Promise.reject("Error retrieving bookmarked id")},t.prototype.previewSession=function(t,e,n,r){var o=this;return this.httpClient.request(t).then(function(t){return t.mainDocument?o.getByID(t.mainDocument).then(function(t){if(t){var o=e(t);return r&&r(null,o),o}return r&&r(null,n),n}):(r&&r(null,n),Promise.resolve(n))}).catch(function(t){throw r&&r(t),t})},t}();e.default=a},function(t,e,n){n(6),t.exports=n(7)},function(e,n){e.exports=t},function(t,e,n){"use strict";var r,o=n(0),i=n(1),u=n(8),a=n(3),f=n(4);!function(t){function e(t,e){return new u.DefaultClient(t,e)}function n(t,e){return u.DefaultClient.getApi(t,e)}function r(t,e){return n(t,e)}t.experimentCookie=f.EXPERIMENT_COOKIE,t.previewCookie=f.PREVIEW_COOKIE,t.Predicates=o.default,t.Experiments=i.Experiments,t.Api=a.default,t.client=e,t.getApi=n,t.api=r}(r||(r={})),t.exports=r},function(t,e,n){"use strict";e.__esModule=!0;var r=n(2),o=n(3),i=function(){function t(t,e){this.api=new o.default(t,e)}return t.prototype.getApi=function(){return this.api.get()},t.prototype.everything=function(){return this.form("everything")},t.prototype.form=function(t){return new r.LazySearchForm(t,this.api)},t.prototype.query=function(t,e,n){return this.getApi().then(function(r){return r.query(t,e,n)})},t.prototype.queryFirst=function(t,e,n){return this.getApi().then(function(r){return r.queryFirst(t,e,n)})},t.prototype.getByID=function(t,e,n){return this.getApi().then(function(r){return r.getByID(t,e,n)})},t.prototype.getByIDs=function(t,e,n){return this.getApi().then(function(r){return r.getByIDs(t,e,n)})},t.prototype.getByUID=function(t,e,n,r){return this.getApi().then(function(o){return o.getByUID(t,e,n,r)})},t.prototype.getSingle=function(t,e,n){return this.getApi().then(function(r){return r.getSingle(t,e,n)})},t.prototype.getBookmark=function(t,e,n){return this.getApi().then(function(r){return r.getBookmark(t,e,n)})},t.prototype.previewSession=function(t,e,n,r){return this.getApi().then(function(o){return o.previewSession(t,e,n,r)})},t.getApi=function(t,e){return new o.default(t,e).get()},t}();e.DefaultClient=i},function(t,e,n){"use strict";function r(t,e){try{return e(t)}catch(e){return t}}function o(t,e){if("string"!=typeof t)throw new TypeError("argument str must be a string");var n={},o=e||{},u=o.decode||i;return t.split(/; */).forEach(function(t){var e=t.indexOf("=");if(!(e<0)){var o=t.substr(0,e).trim(),i=t.substr(++e,t.length).trim();'"'==i[0]&&(i=i.slice(1,-1)),void 0==n[o]&&(n[o]=r(i,u))}}),n}e.__esModule=!0;var i=decodeURIComponent;e.default={parse:o}},function(t,e,n){"use strict";e.__esModule=!0;var r=n(11),o=n(13),i=function(){function t(t,e,n){this.requestHandler=t||new o.DefaultRequestHandler({proxyAgent:n}),this.cache=e||new r.DefaultApiCache}return t.prototype.request=function(t,e){var n=this;return new Promise(function(r,o){n.requestHandler.request(t,function(t,n,i,u){t?(o(t),e&&e(t,null,i,u)):n&&(r(n),e&&e(null,n,i,u))})})},t.prototype.cachedRequest=function(t,e){var n=this,r=e||{},o=function(e){var o=r.cacheKey||t;n.cache.get(o,function(i,u){i||u?e(i,u):n.request(t,function(t,i,u,a){if(t)e(t,null);else{var f=a||r.ttl;f&&n.cache.set(o,i,f,e),e(null,i)}})})};return new Promise(function(t,e){o(function(n,r){n&&e(n),r&&t(r)})})},t}();e.default=i},function(t,e,n){"use strict";e.__esModule=!0;var r=n(12),o=function(){function t(t){void 0===t&&(t=1e3),this.lru=r.MakeLRUCache(t)}return t.prototype.isExpired=function(t){var e=this.lru.get(t,!1);return!!e&&0!==e.expiredIn&&e.expiredIn<Date.now()},t.prototype.get=function(t,e){var n=this.lru.get(t,!1);n&&!this.isExpired(t)?e(null,n.data):e&&e(null)},t.prototype.set=function(t,e,n,r){this.lru.remove(t),this.lru.put(t,{data:e,expiredIn:n?Date.now()+1e3*n:0}),r&&r(null)},t.prototype.remove=function(t,e){this.lru.remove(t),e&&e(null)},t.prototype.clear=function(t){this.lru.removeAll(),t&&t(null)},t}();e.DefaultApiCache=o},function(t,e,n){"use strict";function r(t){return new o(t)}function o(t){this.size=0,this.limit=t,this._keymap={}}e.__esModule=!0,e.MakeLRUCache=r,o.prototype.put=function(t,e){var n={key:t,value:e};if(this._keymap[t]=n,this.tail?(this.tail.newer=n,n.older=this.tail):this.head=n,this.tail=n,this.size===this.limit)return this.shift();this.size++},o.prototype.shift=function(){var t=this.head;return t&&(this.head.newer?(this.head=this.head.newer,this.head.older=void 0):this.head=void 0,t.newer=t.older=void 0,delete this._keymap[t.key]),console.log("purging ",t.key),t},o.prototype.get=function(t,e){var n=this._keymap[t];if(void 0!==n)return n===this.tail?e?n:n.value:(n.newer&&(n===this.head&&(this.head=n.newer),n.newer.older=n.older),n.older&&(n.older.newer=n.newer),n.newer=void 0,n.older=this.tail,this.tail&&(this.tail.newer=n),this.tail=n,e?n:n.value)},o.prototype.find=function(t){return this._keymap[t]},o.prototype.set=function(t,e){var n,r=this.get(t,!0);return r?(n=r.value,r.value=e):(n=this.put(t,e))&&(n=n.value),n},o.prototype.remove=function(t){var e=this._keymap[t];if(e)return delete this._keymap[e.key],e.newer&&e.older?(e.older.newer=e.newer,e.newer.older=e.older):e.newer?(e.newer.older=void 0,this.head=e.newer):e.older?(e.older.newer=void 0,this.tail=e.older):this.head=this.tail=void 0,this.size--,e.value},o.prototype.removeAll=function(){this.head=this.tail=void 0,this.size=0,this._keymap={}},"function"==typeof Object.keys?o.prototype.keys=function(){return Object.keys(this._keymap)}:o.prototype.keys=function(){var t=[];for(var e in this._keymap)t.push(e);return t},o.prototype.forEach=function(t,e,n){var r;if(!0===e?(n=!0,e=void 0):"object"!=typeof e&&(e=this),n)for(r=this.tail;r;)t.call(e,r.key,r.value,this),r=r.older;else for(r=this.head;r;)t.call(e,r.key,r.value,this),r=r.newer},o.prototype.toString=function(){for(var t="",e=this.head;e;)t+=String(e.key)+":"+e.value,(e=e.newer)&&(t+=" < ");return t}},function(t,e,n){"use strict";function r(t,e,n){var r={headers:{Accept:"application/json"}};e&&e.proxyAgent&&(r.agent=e.proxyAgent),fetch(t,r).then(function(e){if(~~(e.status/100!=2)){var r=new Error("Unexpected status code ["+e.status+"] on URL "+t);throw r.status=e.status,r}return e.json().then(function(t){var r=e.headers.get("cache-control"),o=r?/max-age=(\d+)/.exec(r):null,i=o?parseInt(o[1],10):void 0;n(null,t,e,i)})}).catch(n)}function o(t){if(a.length>0&&u<i){u++;var e=a.shift();e&&r(e.url,t,function(n,r,i,a){u--,e.callback(n,r,i,a),o(t)})}}e.__esModule=!0;var i=20,u=0,a=[],f=function(){function t(t){this.options=t||{}}return t.prototype.request=function(t,e){a.push({url:t,callback:e}),o(this.options)},t}();e.DefaultRequestHandler=f}])});
},{"fetch-everywhere":28}],17:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Api = undefined;

var _prismicJavascript = require('prismic-javascript');

var _prismicJavascript2 = _interopRequireDefault(_prismicJavascript);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiEndpoint = 'https://pavlo.cdn.prismic.io/api/v2';
// eslint-disable-next-line
var apiToken = 'MC5Xcy1kNUNnQUFDY0FRcWM5.77-9Xe-_vXrvv70rb--_ve-_vQo177-9FQHvv73vv71JX--_ve-_vUHvv70W77-977-977-9LnTvv73vv71B77-9';

var Api = exports.Api = function Api(callback) {
  return _prismicJavascript2.default.getApi(apiEndpoint, {
    accessToken: apiToken
  }).then(function (api) {
    return callback(api);
  }).catch(function (reason) {
    return console.log(reason);
  });
};

Api.Predicates = _prismicJavascript2.default.Predicates;
},{"prismic-javascript":25}],12:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Model = exports.Model = {
  data: {
    iddle: true
  },
  updateData: function updateData(data) {
    Model.data = Object.assign(Model.data, data);
  }
};
},{}],10:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commands = undefined;

var _api = require('../api');

var _model = require('./model');

var commands = exports.commands = {
  hideLoaders: function hideLoaders() {
    return function () {
      _model.Model.updateData({
        isLoading: false
      });
    };
  },
  showContacts: function showContacts() {
    return function () {
      _model.Model.updateData({
        showContacts: true,
        showContactMe: false
      });
    };
  },
  hideContacts: function hideContacts() {
    return function () {
      _model.Model.updateData({
        showContacts: false,
        showContactMe: true
      });
    };
  },
  fetchData: function fetchData(transit) {
    return function () {
      _model.Model.updateData({
        isLoading: true
      });

      (0, _api.Api)(function (api) {
        return api.query('', {
          pageSize: 100
        });
      }).then(function (response) {
        transit({
          event: 'fetchSuccess',
          payload: response
        });
      });
    };
  },
  updateData: function updateData() {
    return function (payload) {
      var careerHistory = [];
      var skills = [];
      var contacts = [];
      var languages = [];

      payload.results.forEach(function (result) {
        switch (result.type) {
          case 'career':
            careerHistory.push(result);
            break;
          case 'skill':
            skills.push(result);
            break;
          case 'contact':
            contacts.push(result);
            break;
          case 'language':
            languages.push(result);
            break;
        }
      });

      careerHistory.reverse();
      languages.reverse();
      skills.reverse();

      var data = {
        skills: skills,
        languages: languages,
        careerHistory: careerHistory,
        contacts: contacts
      };

      _model.Model.updateData(data);
    };
  },
  stats: function stats() {
    return function () {
      window.gtag('event', 'revealContacts');
    };
  }
};
},{"../api":17,"./model":12}],13:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Logo = undefined;

var _preact = require('preact');

var Logo = exports.Logo = function Logo() {
  return (0, _preact.h)(
    'svg',
    { width: '42px', height: '42px', viewBox: '0 0 42 42', version: '1.1', xmlns: 'http://www.w3.org/2000/svg' },
    (0, _preact.h)(
      'g',
      { id: 'Page-1', stroke: 'none', 'stroke-width': '1', fill: 'none',
        'fill-rule': 'evenodd' },
      (0, _preact.h)(
        'g',
        { id: 'logo' },
        (0, _preact.h)('circle', { id: 'Oval-2', fill: '#DEF1FF', cx: '21', cy: '21', r: '21' }),
        (0, _preact.h)('circle', { id: 'Oval', fill: '#A4D2F4', cx: '20', cy: '17', r: '12' })
      )
    )
  );
};
},{"preact":5}],9:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CvTemplate = undefined;

var _preact = require('preact');

var _logo = require('./logo');

var GroupTitle = function GroupTitle(_ref) {
  var children = _ref.children,
      isLoading = _ref.isLoading;
  return (0, _preact.h)(
    'div',
    { 'class': 'group_title ' + (isLoading ? 'group_title-loading' : '') },
    children
  );
};

var CvTemplate = exports.CvTemplate = function CvTemplate(_ref2) {
  var _ref2$isLoading = _ref2.isLoading,
      isLoading = _ref2$isLoading === undefined ? true : _ref2$isLoading,
      _ref2$showContactMe = _ref2.showContactMe,
      showContactMe = _ref2$showContactMe === undefined ? false : _ref2$showContactMe,
      _ref2$showContacts = _ref2.showContacts,
      showContacts = _ref2$showContacts === undefined ? false : _ref2$showContacts,
      _ref2$contacts = _ref2.contacts,
      contacts = _ref2$contacts === undefined ? [] : _ref2$contacts,
      _ref2$skills = _ref2.skills,
      skills = _ref2$skills === undefined ? [] : _ref2$skills,
      _ref2$careerHistory = _ref2.careerHistory,
      careerHistory = _ref2$careerHistory === undefined ? [] : _ref2$careerHistory,
      _ref2$languages = _ref2.languages,
      languages = _ref2$languages === undefined ? [] : _ref2$languages,
      _ref2$onClickContactM = _ref2.onClickContactMe,
      onClickContactMe = _ref2$onClickContactM === undefined ? function () {
    return null;
  } : _ref2$onClickContactM;

  return (0, _preact.h)(
    'div',
    null,
    (0, _preact.h)(
      'div',
      { 'class': 'header' },
      (0, _preact.h)(
        'div',
        { 'class': 'header_maininfo' },
        (0, _preact.h)(
          'div',
          { 'class': 'header_logo' },
          (0, _preact.h)(_logo.Logo, null)
        ),
        (0, _preact.h)(
          'div',
          { 'class': 'header_left' },
          (0, _preact.h)(
            'div',
            { 'class': 'header_name ' + (isLoading ? 'header_name-loading' : '') },
            'Pavlo Lompas'
          ),
          (0, _preact.h)(
            'div',
            { 'class': 'header_description \n              ' + (isLoading ? 'header_description-loading' : '') },
            'Frontend developer'
          )
        )
      ),
      (0, _preact.h)(
        'div',
        { 'class': 'header_right' },
        isLoading && [(0, _preact.h)('div', { 'class': 'header_contact header_contact-loading' })],
        showContactMe && (0, _preact.h)(
          'div',
          { 'class': 'button button-contactme', onClick: onClickContactMe },
          'Contact me'
        ),
        showContacts && contacts.map(function (contact) {
          return (0, _preact.h)(
            'div',
            { 'class': 'header_contact' },
            (0, _preact.h)(
              'div',
              { 'class': 'header_contactname' },
              contact.data.contact_name,
              ':'
            ),
            (0, _preact.h)(
              'div',
              { 'class': 'header_contactvalue' },
              contact.data.contact_value
            )
          );
        })
      )
    ),
    (0, _preact.h)(
      'div',
      { 'class': 'group group-darkgrey' },
      (0, _preact.h)(
        GroupTitle,
        { isLoading: isLoading },
        'Technical skills'
      ),
      (0, _preact.h)(
        'div',
        { 'class': 'group_content' },
        (0, _preact.h)(
          'div',
          { 'class': 'group_tags' },
          skills.map(function (skill) {
            return (0, _preact.h)(
              'div',
              { 'class': 'tag group_tag' },
              skill.data.skill[0].text
            );
          })
        )
      )
    ),
    (0, _preact.h)(
      'div',
      { 'class': 'group group-grey' },
      (0, _preact.h)(
        GroupTitle,
        { isLoading: isLoading },
        'Career history'
      ),
      (0, _preact.h)(
        'div',
        { 'class': 'group_content' },
        careerHistory.map(function (career) {
          // eslint-disable-next-line
          var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

          var startedAt = new Date(career.data.started_at);
          var finishedAt = career.data.finished_at ? new Date(career.data.finished_at) : null;

          return (0, _preact.h)(
            'div',
            { 'class': 'career' },
            (0, _preact.h)(
              'div',
              { 'class': 'career_title' },
              career.data.career[0].text,
              ' at ',
              career.data.company_name
            ),
            (0, _preact.h)(
              'div',
              { 'class': 'career_date' },
              months[startedAt.getMonth()] + ' ' + startedAt.getFullYear(),
              finishedAt &&
              // eslint-disable-next-line
              ' - ' + months[finishedAt.getMonth()] + ' ' + finishedAt.getFullYear()
            ),
            (0, _preact.h)(
              'div',
              { 'class': 'career_duties' },
              'Duties:'
            ),
            (0, _preact.h)(
              'div',
              { 'class': 'career_description' },
              career.data.responsibilities[0].text
            )
          );
        })
      )
    ),
    (0, _preact.h)(
      'div',
      { 'class': 'group' },
      (0, _preact.h)(
        GroupTitle,
        { isLoading: isLoading },
        'Languages'
      ),
      (0, _preact.h)(
        'div',
        { 'class': 'group_content' },
        (0, _preact.h)(
          'div',
          { 'class': 'languages' },
          languages.map(function (language) {
            return (0, _preact.h)(
              'div',
              { 'class': 'language' },
              (0, _preact.h)(
                'div',
                { 'class': 'language_name' },
                language.data.lanugage[0].text
              ),
              (0, _preact.h)(
                'div',
                { 'class': 'language_level' },
                language.data.level
              )
            );
          })
        )
      )
    )
  );
};
},{"preact":5,"./logo":13}],14:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var toggleContactsStatechart = exports.toggleContactsStatechart = {
  initial: 'CONTACTS_HIDDEN',
  states: {
    CONTACTS_SHOWN: {
      onEntry: ['stats', 'showContacts'],
      on: {
        toggleContacts: 'CONTACTS_HIDDEN'
      }
    },
    CONTACTS_HIDDEN: {
      onEntry: ['hideContacts'],
      on: {
        toggleContacts: 'CONTACTS_SHOWN'
      }
    }
  }
};
},{}],11:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CvStatechart = undefined;

var _toggleContacts = require('./toggle-contacts.statechart');

var CvStatechart = exports.CvStatechart = {
  initial: 'START',
  states: {
    START: {
      on: {
        getData: 'LOADING'
      }
    },
    LOADING: {
      onEntry: ['fetchData'],
      on: {
        fetchSuccess: {
          CV: {
            actions: ['updateData']
          }
        }
      }
    },
    CV: {
      parallel: true,
      onEntry: ['hideLoaders'],
      states: {
        TOGGLE_CONTACTS: _toggleContacts.toggleContactsStatechart
      }
    }
  }
};
},{"./toggle-contacts.statechart":14}],27:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var STATE_DELIMITER = exports.STATE_DELIMITER = '.';
var EMPTY_ACTIVITY_MAP = exports.EMPTY_ACTIVITY_MAP = {};
},{}],22:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.State = undefined;

var _constants = require('./constants');

var State = /** @class */function () {
    function State(value, history, actions, activities, data,
    /**
     * Internal event queue
     */
    events) {
        if (actions === void 0) {
            actions = [];
        }
        if (activities === void 0) {
            activities = _constants.EMPTY_ACTIVITY_MAP;
        }
        if (data === void 0) {
            data = {};
        }
        if (events === void 0) {
            events = [];
        }
        this.value = value;
        this.history = history;
        this.actions = actions;
        this.activities = activities;
        this.data = data;
        this.events = events;
    }
    State.from = function (stateValue) {
        if (stateValue instanceof State) {
            return stateValue;
        }
        return new State(stateValue);
    };
    State.inert = function (stateValue) {
        if (stateValue instanceof State) {
            if (!stateValue.actions.length) {
                return stateValue;
            }
            return new State(stateValue.value, stateValue.history, []);
        }
        return State.from(stateValue);
    };
    State.prototype.toString = function () {
        if (typeof this.value === 'string') {
            return this.value;
        }
        var path = [];
        var marker = this.value;
        while (true) {
            if (typeof marker === 'string') {
                path.push(marker);
                break;
            }
            var _a = Object.keys(marker),
                firstKey = _a[0],
                otherKeys = _a.slice(1);
            if (otherKeys.length) {
                return undefined;
            }
            path.push(firstKey);
            marker = marker[firstKey];
        }
        return path.join(_constants.STATE_DELIMITER);
    };
    return State;
}();
exports.State = State;
},{"./constants":27}],26:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.pathsToStateValue = exports.toStatePaths = exports.path = undefined;
exports.getEventType = getEventType;
exports.getActionType = getActionType;
exports.toStatePath = toStatePath;
exports.toStateValue = toStateValue;
exports.pathToStateValue = pathToStateValue;
exports.mapValues = mapValues;

var _State = require('./State');

function getEventType(event) {
    try {
        return typeof event === 'string' || typeof event === 'number' ? "" + event : event.type;
    } catch (e) {
        throw new Error('Events must be strings or objects with a string event.type property.');
    }
}
function getActionType(action) {
    try {
        return typeof action === 'string' || typeof action === 'number' ? "" + action : typeof action === 'function' ? action.name : action.type;
    } catch (e) {
        throw new Error('Events must be strings or objects with a string event.type property.');
    }
}
function toStatePath(stateId, delimiter) {
    try {
        if (Array.isArray(stateId)) {
            return stateId;
        }
        return stateId.toString().split(delimiter);
    } catch (e) {
        throw new Error("'" + stateId + "' is not a valid state path.");
    }
}
function toStateValue(stateValue, delimiter) {
    if (stateValue instanceof _State.State) {
        return stateValue.value;
    }
    if (typeof stateValue === 'object' && !(stateValue instanceof _State.State)) {
        return stateValue;
    }
    var statePath = toStatePath(stateValue, delimiter);
    return pathToStateValue(statePath);
}
function pathToStateValue(statePath) {
    if (statePath.length === 1) {
        return statePath[0];
    }
    var value = {};
    var marker = value;
    for (var i = 0; i < statePath.length - 1; i++) {
        if (i === statePath.length - 2) {
            marker[statePath[i]] = statePath[i + 1];
        } else {
            marker[statePath[i]] = {};
            marker = marker[statePath[i]];
        }
    }
    return value;
}
function mapValues(collection, iteratee) {
    var result = {};
    Object.keys(collection).forEach(function (key) {
        result[key] = iteratee(collection[key], key, collection);
    });
    return result;
}
/**
 * Retrieves a value at the given path.
 * @param props The deep path to the prop of the desired value
 */
var path = exports.path = function (props) {
    return function (object) {
        var result = object;
        for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
            var prop = props_1[_i];
            result = result[prop];
        }
        return result;
    };
};
var toStatePaths = exports.toStatePaths = function (stateValue) {
    if (typeof stateValue === 'string') {
        return [[stateValue]];
    }
    var result = Object.keys(stateValue).map(function (key) {
        return toStatePaths(stateValue[key]).map(function (subPath) {
            return [key].concat(subPath);
        });
    }).reduce(function (a, b) {
        return a.concat(b);
    }, []);
    return result;
};
var pathsToStateValue = exports.pathsToStateValue = function (paths) {
    var result = {};
    if (paths && paths.length === 1 && paths[0].length === 1) {
        return paths[0][0];
    }
    for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
        var currentPath = paths_1[_i];
        var marker = result;
        // tslint:disable-next-line:prefer-for-of
        for (var i = 0; i < currentPath.length; i++) {
            var subPath = currentPath[i];
            if (i === currentPath.length - 2) {
                marker[subPath] = currentPath[i + 1];
                break;
            }
            marker[subPath] = marker[subPath] || {};
            marker = marker[subPath];
        }
    }
    return result;
};
},{"./State":22}],19:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.matchesState = matchesState;

var _utils = require('./utils');

var _constants = require('./constants');

function matchesState(parentStateId, childStateId, delimiter) {
    if (delimiter === void 0) {
        delimiter = _constants.STATE_DELIMITER;
    }
    var parentStateValue = (0, _utils.toStateValue)(parentStateId, delimiter);
    var childStateValue = (0, _utils.toStateValue)(childStateId, delimiter);
    if (typeof childStateValue === 'string') {
        if (typeof parentStateValue === 'string') {
            return childStateValue === parentStateValue;
        }
        // Parent more specific than child
        return false;
    }
    if (typeof parentStateValue === 'string') {
        return parentStateValue in childStateValue;
    }
    return Object.keys(parentStateValue).every(function (key) {
        if (!(key in childStateValue)) {
            return false;
        }
        return matchesState(parentStateValue[key], childStateValue[key]);
    });
} // TODO: change to utils
},{"./utils":26,"./constants":27}],20:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mapState = mapState;

var _matchesState = require('./matchesState');

function mapState(stateMap, stateId) {
    var foundStateId;
    Object.keys(stateMap).forEach(function (mappedStateId) {
        if ((0, _matchesState.matchesState)(mappedStateId, stateId) && (!foundStateId || stateId.length > foundStateId.length)) {
            foundStateId = mappedStateId;
        }
    });
    return stateMap[foundStateId];
}
},{"./matchesState":19}],24:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.stop = exports.start = exports.cancel = exports.send = exports.raise = exports.toActionObjects = exports.toActionObject = exports.toEventObject = exports.actionTypes = undefined;

var _utils = require('./utils');

var PREFIX = 'xstate';
// xstate-specific action types
var actionTypes = exports.actionTypes = {
    start: PREFIX + ".start",
    stop: PREFIX + ".stop",
    raise: PREFIX + ".raise",
    send: PREFIX + ".send",
    cancel: PREFIX + ".cancel",
    null: PREFIX + ".null"
};
var createActivityAction = function (actionType) {
    return function (activity) {
        var data = typeof activity === 'string' || typeof activity === 'number' ? { type: activity } : activity;
        return {
            type: actionType,
            activity: (0, _utils.getEventType)(activity),
            data: data
        };
    };
};
var toEventObject = exports.toEventObject = function (event) {
    if (typeof event === 'string' || typeof event === 'number') {
        return { type: event };
    }
    return event;
};
var toActionObject = exports.toActionObject = function (action) {
    var actionObject;
    if (typeof action === 'string' || typeof action === 'number') {
        actionObject = { type: action };
    } else if (typeof action === 'function') {
        actionObject = { type: action.name };
    } else {
        return action;
    }
    Object.defineProperty(actionObject, 'toString', {
        value: function () {
            return actionObject.type;
        }
    });
    return actionObject;
};
var toActionObjects = exports.toActionObjects = function (action) {
    if (!action) {
        return [];
    }
    var actions = Array.isArray(action) ? action : [action];
    return actions.map(toActionObject);
};
var raise = exports.raise = function (eventType) {
    return {
        type: actionTypes.raise,
        event: eventType
    };
};
var send = exports.send = function (event, options) {
    return {
        type: actionTypes.send,
        event: toEventObject(event),
        delay: options ? options.delay : undefined,
        id: options && options.id !== undefined ? options.id : (0, _utils.getEventType)(event)
    };
};
var cancel = exports.cancel = function (sendId) {
    return {
        type: actionTypes.cancel,
        sendId: sendId
    };
};
var start = exports.start = createActivityAction(actionTypes.start);
var stop = exports.stop = createActivityAction(actionTypes.stop);
},{"./utils":26}],21:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StateNode = undefined;
exports.Machine = Machine;

var _utils = require('./utils');

var _matchesState = require('./matchesState');

var _State = require('./State');

var _actions = require('./actions');

var __assign = undefined && undefined.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

var STATE_DELIMITER = '.';
var HISTORY_KEY = '$history';
var NULL_EVENT = '';
var STATE_IDENTIFIER = '#';
var isStateId = function (str) {
    return str[0] === STATE_IDENTIFIER;
};
var emptyActions = Object.freeze({
    onEntry: [],
    onExit: [],
    actions: []
});
/**
 * Given a StateNode, walk up the parent chain until we find an
 * orthogonal region of a parallel state, or the top level machine
 * itself
 */
var regionOf = function (node) {
    // If we reach the top of the state machine, we're a "region".
    // If our parent is a parallel state, we're a region.
    while (node.parent && !node.parent.parallel) {
        node = node.parent;
    }
    return node;
};
/**
 * Ensure that the passed in StateNode instance belongs to a region
 * that previously had not been used, or that matches the existing
 * StateNode for the orthogonal regions.  This function is used to
 * verify that a transition that has multiple targets ends doesn't try
 * to target several states in the same orthogonal region.  The passed
 * state is added to the regions data structure using the state's
 * _region_ (see regionOf), and the region's parent.  If there is
 * already an object in the structure which is not already the state
 * in question, an Error is thrown, otherwise the state is added to
 * the structure, and the _region_ is returned.
 *
 * @param sourceState the state in which the event was triggered (used
 * to report error messages)
 * @param event the event that triggered the transition (used to
 * report error messages)
 * @param regions A data structure that retains the current set of
 * orthogonal regions (their IDs), grouped by their parallel state
 * (their IDs), with the values being the chosen states
 * @param state A state to add to the structure if possible.
 * @returns The region of the state, in order for the caller to repeat the process for the parent.
 * @throws Error if the region found already exists in the regions
 */
var ensureTargetStateIsInCorrectRegion = function (sourceState, event, regions, stateToCheck) {
    var region = regionOf(stateToCheck);
    var parent = region.parent;
    var parentId = parent ? parent.id : ''; // '' == machine
    regions[parentId] = regions[parentId] || {};
    if (regions[parentId][region.id] && regions[parentId][region.id] !== stateToCheck) {
        throw new Error("Event '" + event + "' on state '" + sourceState.id + "' leads to an invalid configuration: " + ("Two or more states in the orthogonal region '" + region.id + "'."));
    }
    // Keep track of which state was chosen in a particular region.
    regions[parentId][region.id] = stateToCheck;
    return region;
};
var StateNode = /** @class */function () {
    function StateNode(config) {
        var _this = this;
        this.config = config;
        this.__cache = {
            events: undefined,
            relativeValue: new Map(),
            initialState: undefined
        };
        this.idMap = {};
        this.key = config.key || '(machine)';
        this.parent = config.parent;
        this.machine = this.parent ? this.parent.machine : this;
        this.path = this.parent ? this.parent.path.concat(this.key) : [];
        this.delimiter = config.delimiter || (this.parent ? this.parent.delimiter : STATE_DELIMITER);
        this.id = config.id || (this.machine ? [this.machine.key].concat(this.path).join(this.delimiter) : this.key);
        this.initial = config.initial;
        this.parallel = !!config.parallel;
        this.states = config.states ? (0, _utils.mapValues)(config.states, function (stateConfig, key) {
            var stateNode = new StateNode(__assign({}, stateConfig, { key: key, parent: _this }));
            Object.assign(_this.idMap, __assign((_a = {}, _a[stateNode.id] = stateNode, _a), stateNode.idMap));
            return stateNode;
            var _a;
        }) : {};
        this.on = config.on ? this.formatTransitions(config.on) : {};
        this.strict = !!config.strict;
        this.onEntry = config.onEntry ? [].concat(config.onEntry) : undefined;
        this.onExit = config.onExit ? [].concat(config.onExit) : undefined;
        this.data = config.data;
        this.activities = config.activities;
    }
    StateNode.prototype.getStateNodes = function (state) {
        var _this = this;
        var stateValue = state instanceof _State.State ? state.value : (0, _utils.toStateValue)(state, this.delimiter);
        if (typeof stateValue === 'string') {
            var initialStateValue = this.getStateNode(stateValue).initial;
            return initialStateValue ? this.getStateNodes((_a = {}, _a[stateValue] = initialStateValue, _a)) : [this.states[stateValue]];
        }
        var subStateKeys = Object.keys(stateValue);
        var subStateNodes = subStateKeys.map(function (subStateKey) {
            return _this.getStateNode(subStateKey);
        });
        return subStateNodes.concat(subStateKeys.reduce(function (allSubStateNodes, subStateKey) {
            var subStateNode = _this.getStateNode(subStateKey).getStateNodes(stateValue[subStateKey]);
            return allSubStateNodes.concat(subStateNode);
        }, []));
        var _a;
    };
    StateNode.prototype.handles = function (event) {
        var eventType = (0, _utils.getEventType)(event);
        return this.events.indexOf(eventType) !== -1;
    };
    StateNode.prototype.transition = function (state, event, extendedState) {
        var resolvedStateValue = typeof state === 'string' ? this.resolve((0, _utils.pathToStateValue)(this.getResolvedPath(state))) : state instanceof _State.State ? state : this.resolve(state);
        if (this.strict) {
            var eventType = (0, _utils.getEventType)(event);
            if (this.events.indexOf(eventType) === -1) {
                throw new Error("Machine '" + this.id + "' does not accept event '" + eventType + "'");
            }
        }
        var currentState = _State.State.from(resolvedStateValue);
        var stateTransition = this.transitionStateValue(currentState, event, currentState, extendedState);
        var nextState = this.stateTransitionToState(stateTransition, currentState);
        if (!nextState) {
            return _State.State.inert(currentState);
        }
        var maybeNextState = nextState;
        var raisedEvents = nextState.actions.filter(function (action) {
            return typeof action === 'object' && action.type === _actions.actionTypes.raise;
        });
        if (raisedEvents.length) {
            var raisedEvent = raisedEvents[0].event;
            nextState = this.transition(nextState, raisedEvent, extendedState);
            (_a = nextState.actions).unshift.apply(_a, nextState.actions);
            return nextState;
        }
        if (stateTransition.events.length) {
            var raised = stateTransition.events[0].type === _actions.actionTypes.raise ? stateTransition.events[0].event : undefined;
            var nullEvent = stateTransition.events[0].type === _actions.actionTypes.null;
            if (raised || nullEvent) {
                maybeNextState = this.transition(nextState, nullEvent ? NULL_EVENT : raised, extendedState);
                (_b = maybeNextState.actions).unshift.apply(_b, nextState.actions);
                return maybeNextState;
            }
        }
        return nextState;
        var _a, _b;
    };
    StateNode.prototype.stateTransitionToState = function (stateTransition, prevState) {
        var nextStatePaths = stateTransition.statePaths,
            nextActions = stateTransition.actions,
            nextActivities = stateTransition.activities,
            events = stateTransition.events;
        if (!nextStatePaths.length) {
            return undefined;
        }
        var prevActivities = prevState instanceof _State.State ? prevState.activities : undefined;
        var activities = __assign({}, prevActivities, nextActivities);
        var nextStateValue = this.resolve((0, _utils.pathsToStateValue)(nextStatePaths));
        return new _State.State(
        // next state value
        nextStateValue,
        // history
        _State.State.from(prevState),
        // effects
        nextActions ? nextActions.onExit.concat(nextActions.actions).concat(nextActions.onEntry) : [],
        // activities
        activities,
        // data
        this.getStateNodes(nextStateValue).reduce(function (data, stateNode) {
            if (stateNode.data !== undefined) {
                data[stateNode.id] = stateNode.data;
            }
            return data;
        }, {}), events);
    };
    StateNode.prototype.getStateNode = function (stateKey) {
        if (isStateId(stateKey)) {
            return this.machine.getStateNodeById(stateKey);
        }
        if (!this.states) {
            throw new Error("Unable to retrieve child state '" + stateKey + "' from '" + this.id + "'; no child states exist.");
        }
        var result = this.states[stateKey];
        if (!result) {
            throw new Error("Child state '" + stateKey + "' does not exist on '" + this.id + "'");
        }
        return result;
    };
    StateNode.prototype.getStateNodeById = function (stateId) {
        var resolvedStateId = isStateId(stateId) ? stateId.slice(STATE_IDENTIFIER.length) : stateId;
        var stateNode = this.idMap[resolvedStateId];
        if (!stateNode) {
            throw new Error("Substate '#" + resolvedStateId + "' does not exist on '" + this.id + "'");
        }
        return stateNode;
    };
    StateNode.prototype.resolve = function (stateValue) {
        var _this = this;
        if (typeof stateValue === 'string') {
            var subStateNode = this.getStateNode(stateValue);
            return subStateNode.initial ? (_a = {}, _a[stateValue] = subStateNode.initialStateValue, _a) : stateValue;
        }
        if (this.parallel) {
            return (0, _utils.mapValues)(this.initialStateValue, function (subStateValue, subStateKey) {
                return _this.getStateNode(subStateKey).resolve(stateValue[subStateKey] || subStateValue);
            });
        }
        return (0, _utils.mapValues)(stateValue, function (subStateValue, subStateKey) {
            return _this.getStateNode(subStateKey).resolve(subStateValue);
        });
        var _a;
    };
    StateNode.prototype.transitionStateValue = function (state, event, fullState, extendedState) {
        var _this = this;
        var history = state.history;
        var stateValue = state.value;
        if (typeof stateValue === 'string') {
            var subStateNode = this.getStateNode(stateValue);
            var result = subStateNode.next(event, fullState, history ? history.value : undefined, extendedState);
            // If a machine substate returns no potential transitions,
            // check on the machine itself.
            if (!result.statePaths.length && !this.parent) {
                return this.next(event, fullState, history ? history.value : undefined, extendedState);
            }
            return result;
        }
        // Potential transition tuples from parent state nodes
        var potentialStateTransitions = [];
        var willTransition = false;
        var nextStateTransitionMap = (0, _utils.mapValues)(stateValue, function (subStateValue, subStateKey) {
            var subStateNode = _this.getStateNode(subStateKey);
            var subHistory = history ? history.value[subStateKey] : undefined;
            var subState = new _State.State(subStateValue, subHistory ? _State.State.from(subHistory) : undefined);
            var subStateTransition = subStateNode.transitionStateValue(subState, event, fullState, extendedState);
            if (!subStateTransition.statePaths.length) {
                potentialStateTransitions.push(subStateNode.next(event, fullState, history ? history.value : undefined, extendedState));
            } else {
                willTransition = true;
            }
            return subStateTransition;
        });
        if (!willTransition) {
            if (this.parallel) {
                if (potentialStateTransitions.length) {
                    // Select the first potential state transition to take
                    return potentialStateTransitions[0];
                }
                return {
                    statePaths: [],
                    actions: emptyActions,
                    activities: undefined,
                    events: []
                };
            }
            var subStateKey = Object.keys(nextStateTransitionMap)[0];
            // try with parent
            var _a = this.getStateNode(subStateKey).next(event, fullState, history ? history.value : undefined, extendedState),
                parentStatePaths = _a.statePaths,
                parentNextActions = _a.actions,
                parentActivities = _a.activities;
            var nextActions = nextStateTransitionMap[subStateKey].actions;
            var activities = nextStateTransitionMap[subStateKey].activities;
            var allActivities = __assign({}, activities, parentActivities);
            var allActions = parentNextActions ? nextActions ? {
                onEntry: nextActions.onEntry.concat(parentNextActions.onEntry),
                actions: nextActions.actions.concat(parentNextActions.actions),
                onExit: nextActions.onExit.concat(parentNextActions.onExit)
            } : parentNextActions : nextActions;
            return {
                statePaths: parentStatePaths,
                actions: allActions,
                activities: allActivities,
                events: []
            };
        }
        if (this.parallel) {
            nextStateTransitionMap = __assign({}, (0, _utils.mapValues)(this.initialState.value, function (subStateValue, key) {
                var subStateTransition = nextStateTransitionMap[key];
                return {
                    statePaths: subStateTransition && subStateTransition.statePaths.length ? subStateTransition.statePaths : (0, _utils.toStatePaths)(stateValue[key] || subStateValue).map(function (subPath) {
                        return _this.getStateNode(key).path.concat(subPath);
                    }),
                    actions: subStateTransition && subStateTransition.actions ? subStateTransition.actions : {
                        onEntry: [],
                        onExit: [],
                        actions: []
                    },
                    activities: undefined,
                    events: []
                };
            }));
        }
        var finalActions = {
            onEntry: [],
            actions: [],
            onExit: []
        };
        var finalActivities = {};
        (0, _utils.mapValues)(nextStateTransitionMap, function (subStateTransition) {
            var
            // statePaths: nextSubStatePaths,
            nextSubActions = subStateTransition.actions,
                nextSubActivities = subStateTransition.activities;
            if (nextSubActions) {
                if (nextSubActions.onEntry) {
                    (_a = finalActions.onEntry).push.apply(_a, nextSubActions.onEntry);
                }
                if (nextSubActions.actions) {
                    (_b = finalActions.actions).push.apply(_b, nextSubActions.actions);
                }
                if (nextSubActions.onExit) {
                    (_c = finalActions.onExit).push.apply(_c, nextSubActions.onExit);
                }
            }
            if (nextSubActivities) {
                Object.assign(finalActivities, nextSubActivities);
            }
            var _a, _b, _c;
        });
        return {
            statePaths: Object.keys(nextStateTransitionMap).map(function (stateKey) {
                return nextStateTransitionMap[stateKey].statePaths;
            }).reduce(function (a, b) {
                return a.concat(b);
            }, []),
            actions: finalActions,
            activities: finalActivities,
            events: []
        };
    };
    StateNode.prototype.next = function (event, fullState, history, extendedState) {
        var _this = this;
        var eventType = (0, _utils.getEventType)(event);
        var actionMap = { onEntry: [], onExit: [], actions: [] };
        var activityMap = {};
        var candidates = this.on[eventType];
        if (this.onExit) {
            actionMap.onExit = this.onExit;
        }
        if (this.activities) {
            this.activities.forEach(function (activity) {
                activityMap[(0, _utils.getEventType)(activity)] = false;
                actionMap.onExit = actionMap.onExit.concat((0, _actions.stop)(activity));
            });
        }
        if (!candidates) {
            return {
                statePaths: [],
                actions: actionMap,
                activities: activityMap,
                events: []
            };
        }
        var nextStateStrings = [];
        for (var _i = 0, candidates_1 = candidates; _i < candidates_1.length; _i++) {
            var candidate = candidates_1[_i];
            var _a = candidate,
                cond = _a.cond,
                stateIn = _a.in,
                transitionActions = _a.actions;
            var extendedStateObject = extendedState || {};
            var eventObject = (0, _actions.toEventObject)(event);
            var isInState = stateIn ? (0, _matchesState.matchesState)((0, _utils.toStateValue)(stateIn, this.delimiter), (0, _utils.path)(this.path.slice(0, -2))(fullState.value)) : true;
            if ((!cond || cond(extendedStateObject, eventObject)) && (!stateIn || isInState)) {
                nextStateStrings = Array.isArray(candidate.target) ? candidate.target : [candidate.target];
                if (transitionActions) {
                    actionMap.actions = actionMap.actions.concat(transitionActions);
                }
                break;
            }
        }
        if (nextStateStrings.length === 0) {
            return {
                statePaths: [],
                actions: actionMap,
                activities: activityMap,
                events: []
            };
        }
        var finalPaths = [];
        var raisedEvents = [];
        var usedRegions = {};
        nextStateStrings.forEach(function (nextStateString) {
            var nextStatePath = _this.getResolvedPath(nextStateString);
            var currentState = isStateId(nextStateString) ? _this.machine : _this.parent;
            var currentHistory = history;
            var currentPath = _this.key;
            nextStatePath.forEach(function (subPath) {
                if (subPath === '') {
                    actionMap.onExit = [];
                    currentState = _this;
                    return;
                }
                if (!currentState || !currentState.states) {
                    throw new Error("Unable to read '" + subPath + "' from '" + _this.id + "'");
                }
                if (subPath === HISTORY_KEY) {
                    if (!Object.keys(currentState.states).length) {
                        subPath = '';
                    } else if (currentHistory) {
                        subPath = typeof currentHistory === 'object' ? Object.keys(currentHistory)[0] : currentHistory;
                    } else if (currentState.initial) {
                        subPath = currentState.initial;
                    } else {
                        throw new Error("Cannot read '" + HISTORY_KEY + "' from state '" + currentState.id + "': missing 'initial'");
                    }
                }
                try {
                    if (subPath !== '') {
                        currentState = currentState.getStateNode(subPath);
                    }
                } catch (e) {
                    throw new Error("Event '" + event + "' on state '" + currentPath + "' leads to undefined state '" + nextStatePath.join(_this.delimiter) + "'.");
                }
                if (currentState.onEntry) {
                    actionMap.onEntry = actionMap.onEntry.concat(currentState.onEntry);
                }
                if (currentState.activities) {
                    currentState.activities.forEach(function (activity) {
                        activityMap[(0, _utils.getEventType)(activity)] = true;
                        actionMap.onEntry = actionMap.onEntry.concat((0, _actions.start)(activity));
                    });
                }
                currentPath = subPath;
                if (currentHistory) {
                    currentHistory = currentHistory[subPath];
                }
            });
            if (!currentState) {
                throw new Error('no state');
            }
            var region = ensureTargetStateIsInCorrectRegion(_this, event, usedRegions, currentState);
            while (region.parent) {
                region = ensureTargetStateIsInCorrectRegion(_this, event, usedRegions, region.parent);
            }
            var paths = [currentState.path];
            if (currentState.initial || currentState.parallel) {
                var initialState = currentState.initialState;
                actionMap.onEntry = actionMap.onEntry.concat(initialState.actions);
                paths = (0, _utils.toStatePaths)(initialState.value).map(function (subPath) {
                    return currentState.path.concat(subPath);
                });
            }
            finalPaths.push.apply(finalPaths, paths);
            while (currentState.initial) {
                if (!currentState || !currentState.states) {
                    throw new Error("Invalid initial state");
                }
                currentState = currentState.states[currentState.initial];
                if (currentState.activities) {
                    currentState.activities.forEach(function (activity) {
                        activityMap[(0, _utils.getEventType)(activity)] = true;
                        actionMap.onEntry = actionMap.onEntry.concat((0, _actions.start)(activity));
                    });
                }
            }
            var myActions = (currentState.onEntry ? currentState.onEntry.filter(function (action) {
                return typeof action === 'object' && action.type === _actions.actionTypes.raise;
            }) : []).concat(currentState.on[NULL_EVENT] ? { type: _actions.actionTypes.null } : []);
            myActions.forEach(function (action) {
                return raisedEvents.push(action);
            });
        });
        return {
            statePaths: finalPaths,
            actions: actionMap,
            activities: activityMap,
            events: raisedEvents
        };
    };
    Object.defineProperty(StateNode.prototype, "resolvedStateValue", {
        get: function () {
            var key = this.key;
            if (this.parallel) {
                return _a = {}, _a[key] = (0, _utils.mapValues)(this.states, function (stateNode) {
                    return stateNode.resolvedStateValue[stateNode.key];
                }), _a;
            }
            if (!this.initial) {
                // If leaf node, value is just the state node's key
                return key;
            }
            return _b = {}, _b[key] = this.states[this.initial].resolvedStateValue, _b;
            var _a, _b;
        },
        enumerable: true,
        configurable: true
    });
    StateNode.prototype.getResolvedPath = function (stateIdentifier) {
        if (isStateId(stateIdentifier)) {
            var stateNode = this.machine.idMap[stateIdentifier.slice(STATE_IDENTIFIER.length)];
            if (!stateNode) {
                throw new Error("Unable to find state node '" + stateIdentifier + "'");
            }
            return stateNode.path;
        }
        return (0, _utils.toStatePath)(stateIdentifier, this.delimiter);
    };
    Object.defineProperty(StateNode.prototype, "initialStateValue", {
        get: function () {
            var initialStateValue = this.__cache.initialState || (this.parallel ? (0, _utils.mapValues)(this.states, function (state) {
                return state.initialStateValue;
            }) : typeof this.resolvedStateValue === 'string' ? undefined : this.resolvedStateValue[this.key]);
            this.__cache.initialState = initialStateValue;
            return this.__cache.initialState;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateNode.prototype, "initialState", {
        get: function () {
            var initialStateValue = this.initialStateValue;
            if (!initialStateValue) {
                throw new Error("Cannot retrieve initial state from simple state '" + this.id + ".'");
            }
            var activityMap = {};
            var actions = [];
            this.getStateNodes(initialStateValue).forEach(function (stateNode) {
                if (stateNode.onEntry) {
                    actions.push.apply(actions, stateNode.onEntry);
                }
                if (stateNode.activities) {
                    stateNode.activities.forEach(function (activity) {
                        activityMap[(0, _utils.getEventType)(activity)] = true;
                        actions.push((0, _actions.start)(activity));
                    });
                }
            });
            return new _State.State(initialStateValue, undefined, actions, activityMap);
        },
        enumerable: true,
        configurable: true
    });
    StateNode.prototype.getStates = function (stateValue) {
        var _this = this;
        if (typeof stateValue === 'string') {
            return [this.states[stateValue]];
        }
        var stateNodes = [];
        Object.keys(stateValue).forEach(function (key) {
            stateNodes.push.apply(stateNodes, _this.states[key].getStates(stateValue[key]));
        });
        return stateNodes;
    };
    StateNode.prototype.getState = function (relativeStateId) {
        if (typeof relativeStateId === 'string' && isStateId(relativeStateId)) {
            return this.getStateNodeById(relativeStateId);
        }
        var statePath = (0, _utils.toStatePath)(relativeStateId, this.delimiter);
        try {
            return statePath.reduce(function (subState, subPath) {
                if (!subState.states) {
                    throw new Error("Cannot retrieve subPath '" + subPath + "' from node with no states");
                }
                return subState.states[subPath];
            }, this);
        } catch (e) {
            throw new Error("State '" + relativeStateId + " does not exist on machine '" + this.id + "'");
        }
    };
    Object.defineProperty(StateNode.prototype, "events", {
        get: function () {
            if (this.__cache.events) {
                return this.__cache.events;
            }
            var states = this.states;
            var events = new Set(Object.keys(this.on));
            if (states) {
                Object.keys(states).forEach(function (stateId) {
                    var state = states[stateId];
                    if (state.states) {
                        for (var _i = 0, _a = state.events; _i < _a.length; _i++) {
                            var event_1 = _a[_i];
                            events.add("" + event_1);
                        }
                    }
                });
            }
            return this.__cache.events = Array.from(events);
        },
        enumerable: true,
        configurable: true
    });
    StateNode.prototype.formatTransitions = function (onConfig) {
        return (0, _utils.mapValues)(onConfig, function (value) {
            if (value === undefined) {
                return [];
            }
            if (Array.isArray(value)) {
                return value;
            }
            if (typeof value === 'string') {
                return [{ target: value }];
            }
            return Object.keys(value).map(function (target) {
                return __assign({ target: target }, value[target]);
            });
        });
    };
    return StateNode;
}();
function Machine(config) {
    return new StateNode(config);
}
exports.StateNode = StateNode;
},{"./utils":26,"./matchesState":19,"./State":22,"./actions":24}],23:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Machine = Machine;

var _StateNode = require('./StateNode');

function Machine(config) {
    return new _StateNode.StateNode(config);
}
},{"./StateNode":21}],18:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = exports.mapState = exports.matchesState = exports.State = exports.StateNode = exports.Machine = undefined;

var _matchesState = require('./matchesState');

var _mapState = require('./mapState');

var _StateNode = require('./StateNode');

var _State = require('./State');

var _Machine = require('./Machine');

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.Machine = _Machine.Machine;
exports.StateNode = _StateNode.StateNode;
exports.State = _State.State;
exports.matchesState = _matchesState.matchesState;
exports.mapState = _mapState.mapState;
exports.actions = actions;
},{"./matchesState":19,"./mapState":20,"./StateNode":21,"./State":22,"./Machine":23,"./actions":24}],16:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ControlFlow = undefined;

var _xstate = require('xstate');

var ControlFlow = exports.ControlFlow = function ControlFlow(statechart, commands) {
  var machine = (0, _xstate.Machine)(statechart);

  var currentState = machine.initialState.value;

  var command = function command(action, event) {
    return commands[action] && commands[action](transit)(event.payload);
  };

  var transit = function transit(transitObj) {
    var nextState = machine.transition(transitObj.to ? transitObj.to : currentState, transitObj.event);

    nextState.actions.forEach(function (action) {
      return command(action, transitObj);
    });

    currentState = nextState.value;
  };

  var getCurrentState = function getCurrentState() {
    return currentState;
  };

  return {
    transit: transit,
    getCurrentState: getCurrentState
  };
};
},{"xstate":18}],8:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cv = undefined;

var _connect = require('../connect');

var _commands = require('./commands');

var _template = require('./template');

var _statechart = require('./statechart');

var _model = require('./model');

var _controlFlow = require('../control-flow');

var CvControlFlow = (0, _controlFlow.ControlFlow)(_statechart.CvStatechart, _commands.commands);

var eventHandlers = {
  onClickContactMe: function onClickContactMe() {
    return CvControlFlow.transit({
      event: 'toggleContacts'
    });
  }
};

if (_model.Model.data.iddle) {
  CvControlFlow.transit({
    event: 'getData'
  });
}

var Cv = exports.Cv = (0, _connect.connect)(_model.Model, eventHandlers)(_template.CvTemplate);
},{"../connect":15,"./commands":10,"./template":9,"./statechart":11,"./model":12,"../control-flow":16}],2:[function(require,module,exports) {
'use strict';

require('./scss/index.scss');

var _preact = require('preact');

var _cv = require('./modules/cv');

var main = document.getElementById('app');

(0, _preact.render)((0, _preact.h)(_cv.Cv, null), main, main.lastElementChild);
},{"./scss/index.scss":4,"preact":5,"./modules/cv":8}],36:[function(require,module,exports) {

var OVERLAY_ID = '__parcel__error__overlay__';

var global = (1, eval)('this');
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '57431' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[36,2])
//# sourceMappingURL=/src.b1436008.map