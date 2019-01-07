import treeify from 'treeify-paths'
import TreeItem from './tree-item'

class TreeNode {
    path: string
    name: string
    children: Array<TreeNode>
}

const normalizePath = (p: string) => {
    if(p.endsWith('/'))  {
        p = p.substr(0, p.length - 1);
    }
    if(!p.startsWith('/')) {
        p = '/' + p;
    }
    return p;
}

export function buildTreeFromNodes(nodes: Array<GatsbyNode>, selectedPath: string, ignorePaths: string[]): Array<TreeItem> {
    selectedPath = normalizePath(selectedPath);
    let pages = nodes.filter(x => x.internal.type == 'SitePage');
    if (!ignorePaths) {
        ignorePaths = [];
    }
    ignorePaths = ignorePaths.map(normalizePath);
    let treePaths = pages
        .map(x => normalizePath(x.path))
        .filter(x => x !== '/')
        .filter(x => {            
            return ignorePaths.findIndex(ignorePath => (ignorePath == x || x.startsWith(ignorePath)) ) == -1;
        });
    let tree = treeify(treePaths) as TreeNode;
         
    let rootNode = tree.children[0];
  
    let result: Array<TreeItem> = [];
    
    const walkTreeNode = (node: TreeNode, parents: TreeItem[]): TreeItem => {
        let normalizedPath = normalizePath(node.path);
        let treeItem = new TreeItem();
        treeItem.path = normalizedPath;

        let page = pages.find(x => normalizePath(x.path) == normalizedPath);
        if (page) {
            
            treeItem.title = page.context.title ? page.context.title : '';
            //console.log(page)
            if(page.fields && page.fields.order) {
                treeItem.order = page.fields.order;
            } else {
                treeItem.order = 0;
            }
        } else {
           
            var title = "";
            if(node.path.indexOf("/") > -1){
                title = node.path.split("/")[1].toUpperCase();
            } else {
                title = node.path.toUpperCase();  
            }
            treeItem.title = title;
            treeItem.isEmptyParent = true;
            treeItem.order = 0;
        }

        if(normalizedPath == selectedPath) {
            treeItem.selected = true;
            for(let parent of parents) {
                parent.active = true;
            }
        }

        if (node.children && node.children.length > 0) {
            let newParents = [
                ...parents,
                treeItem
            ];
            treeItem.children = node.children.map(child => {
                return walkTreeNode(child, newParents)
            })
        }
        //console.log(treeItem);
        return treeItem;
    };

    for(let child of rootNode.children) {
        result.push(walkTreeNode(child, []));
    }

    const sortChildren = (items: TreeItem[]): TreeItem[] => {
        for(let item of items) {
            item.children = sortChildren(item.children);
        }
        return items.sort((a, b) => a.order - b.order);
    };

    result = result.sort((a,b) => a.order - b.order);
    for(let item of result) {
        item.children = sortChildren(item.children);
    }

    // Now that we built the entire tree, let's remove the nodes that don't matter.
    const collapseChildren = (item: TreeItem) => {
        // We only want to consider collapsing children if this current node can be selected.
        // If it isn't a valid page, then the user can't navigate to it to see it's children.
        if(!item.isEmptyParent) {
            // Collapse children if this node isn't in the active selected path.
            if(!item.active && !item.selected) {
                item.children = [];
            }
        }
        for(let child of item.children) {
            collapseChildren(child);
        }
    };

    for(let child of result) {
        collapseChildren(child);
    }

    return result;
}