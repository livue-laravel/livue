/**
 * LiVue DevTools - Component Tree Builder
 *
 * Builds and renders the component tree visualization.
 */

/**
 * Reference to the LiVue runtime (set during init).
 * @type {object|null}
 */
var _runtime = null;

/**
 * Currently selected component ID.
 * @type {string|null}
 */
var _selectedId = null;

/**
 * Selection change callback.
 * @type {Function|null}
 */
var _onSelect = null;

/**
 * Set the LiVue runtime reference.
 * @param {object} runtime
 */
export function setRuntime(runtime) {
    _runtime = runtime;
}

/**
 * Set the selection change callback.
 * @param {Function} callback - function(componentInfo)
 */
export function onSelect(callback) {
    _onSelect = callback;
}

/**
 * Get the selected component ID.
 * @returns {string|null}
 */
export function getSelectedId() {
    return _selectedId;
}

/**
 * Set the selected component ID.
 * @param {string|null} id
 */
export function setSelectedId(id) {
    _selectedId = id;
}

/**
 * Build the component tree data structure.
 * @returns {Array<object>} Array of root component nodes
 */
export function buildTree() {
    if (!_runtime) {
        return [];
    }

    var roots = _runtime.all();
    var tree = [];

    roots.forEach(function (root) {
        var node = buildNode(root, false);
        tree.push(node);
    });

    return tree;
}

/**
 * Build a single node in the tree.
 * @param {object} component - LiVueComponent instance
 * @param {boolean} isChild
 * @returns {object}
 */
function buildNode(component, isChild) {
    var livue = isChild ? component.livue : component._rootLivue;
    var state = isChild ? component.state : component.state;
    var name = isChild ? component.name : component.name;
    var id = isChild ? component.id : component.componentId;
    var isIsland = !isChild && component.el && component.el.hasAttribute('data-livue-island');

    var node = {
        id: id,
        name: name,
        isChild: isChild,
        isIsland: isIsland,
        loading: livue ? livue.loading : false,
        dirty: livue ? livue.isDirty() : false,
        errorCount: livue && livue.errors ? Object.keys(livue.errors).length : 0,
        state: state,
        livue: livue,
        children: [],
    };

    // Add children if this is a root component
    if (!isChild && component._childRegistry) {
        for (var childId in component._childRegistry) {
            var child = component._childRegistry[childId];
            node.children.push(buildNode(child, true));
        }
    }

    return node;
}

/**
 * Render the component tree to DOM.
 * @param {HTMLElement} container
 */
export function render(container) {
    var tree = buildTree();
    container.innerHTML = '';

    if (tree.length === 0) {
        container.innerHTML = '<div class="livue-devtools__empty">' +
            '<div class="livue-devtools__empty-icon">&#x1F4E6;</div>' +
            'No components found' +
            '</div>';
        return;
    }

    tree.forEach(function (node) {
        container.appendChild(renderNode(node, 0));
    });
}

/**
 * Render a single tree node.
 * @param {object} node
 * @param {number} depth
 * @returns {HTMLElement}
 */
function renderNode(node, depth) {
    var div = document.createElement('div');
    div.className = 'livue-devtools__node';
    div.dataset.id = node.id;

    var hasChildren = node.children && node.children.length > 0;
    var isExpanded = true; // Default expanded

    // Header
    var header = document.createElement('div');
    header.className = 'livue-devtools__node-header';
    if (node.id === _selectedId) {
        header.classList.add('livue-devtools__node-header--selected');
    }

    // Toggle
    var toggle = document.createElement('span');
    toggle.className = 'livue-devtools__node-toggle';
    toggle.textContent = hasChildren ? (isExpanded ? '\u25BC' : '\u25B6') : '';
    header.appendChild(toggle);

    // Icon
    var icon = document.createElement('span');
    icon.className = 'livue-devtools__node-icon';
    if (node.isIsland) {
        icon.classList.add('livue-devtools__node-icon--island');
        icon.textContent = '\u25C6'; // Diamond
    } else if (node.isChild) {
        icon.classList.add('livue-devtools__node-icon--child');
        icon.textContent = '\u25CB'; // Circle
    } else {
        icon.classList.add('livue-devtools__node-icon--root');
        icon.textContent = '\u25A0'; // Square
    }
    header.appendChild(icon);

    // Name
    var nameSpan = document.createElement('span');
    nameSpan.className = 'livue-devtools__node-name';
    nameSpan.textContent = '<' + node.name + '>';
    header.appendChild(nameSpan);

    // ID (truncated)
    var idSpan = document.createElement('span');
    idSpan.className = 'livue-devtools__node-id';
    idSpan.textContent = '#' + node.id.substring(0, 8);
    idSpan.title = node.id;
    header.appendChild(idSpan);

    // Badges
    var badges = document.createElement('span');
    badges.className = 'livue-devtools__node-badges';

    if (node.loading) {
        var loadingBadge = document.createElement('span');
        loadingBadge.className = 'livue-devtools__badge livue-devtools__badge--loading';
        loadingBadge.textContent = 'loading';
        badges.appendChild(loadingBadge);
    }

    if (node.dirty) {
        var dirtyBadge = document.createElement('span');
        dirtyBadge.className = 'livue-devtools__badge livue-devtools__badge--dirty';
        dirtyBadge.textContent = 'dirty';
        badges.appendChild(dirtyBadge);
    }

    if (node.errorCount > 0) {
        var errorBadge = document.createElement('span');
        errorBadge.className = 'livue-devtools__badge livue-devtools__badge--error';
        errorBadge.textContent = node.errorCount + ' error' + (node.errorCount > 1 ? 's' : '');
        badges.appendChild(errorBadge);
    }

    header.appendChild(badges);

    // Click handler for selection
    header.addEventListener('click', function (e) {
        // Toggle expand/collapse if clicking on toggle
        if (e.target === toggle && hasChildren) {
            var children = div.querySelector('.livue-devtools__node-children');
            if (children) {
                var isNowExpanded = children.style.display !== 'none';
                children.style.display = isNowExpanded ? 'none' : 'block';
                toggle.textContent = isNowExpanded ? '\u25B6' : '\u25BC';
            }
            return;
        }

        // Select component
        _selectedId = node.id;

        // Update selection styling
        var allHeaders = document.querySelectorAll('.livue-devtools__node-header');
        allHeaders.forEach(function (h) {
            h.classList.remove('livue-devtools__node-header--selected');
        });
        header.classList.add('livue-devtools__node-header--selected');

        // Notify callback
        if (_onSelect) {
            _onSelect(node);
        }
    });

    div.appendChild(header);

    // Children
    if (hasChildren) {
        var childrenContainer = document.createElement('div');
        childrenContainer.className = 'livue-devtools__node-children';

        node.children.forEach(function (child) {
            childrenContainer.appendChild(renderNode(child, depth + 1));
        });

        div.appendChild(childrenContainer);
    }

    return div;
}

/**
 * Find a node by ID in the tree.
 * @param {string} id
 * @returns {object|null}
 */
export function findNode(id) {
    var tree = buildTree();

    function search(nodes) {
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (node.id === id) {
                return node;
            }
            if (node.children && node.children.length > 0) {
                var found = search(node.children);
                if (found) {
                    return found;
                }
            }
        }
        return null;
    }

    return search(tree);
}
