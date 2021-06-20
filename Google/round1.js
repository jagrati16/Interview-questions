class Node {
  constructor(id, parentId) {
    this.id = id;
    this.parentId = parentId;
  }
}
// [ node1, node2, node3]
// .filter((n) => n.id === parentId)

// {id: [node1, node2]}
class GraphPool {
  constructor(nodes) {
    this.data = this.generateMap(nodes);
  }

  generateMap(nodes) {
    const map = new Map();
    for (let i = 0; i < nodes.length; i++) {
      const { parendId } = nodes[i];
      const list = map.get(parentId) || [];
      list.push(node[i]);
      map.set(parendId, list);
    }
    return list;
  }

  getChildren(parent) {
    const { id } = parent;
    return this.data[id] || [];
  }

  dfs(node, result, visited) {
    if (visited[node.id]) return;
    visited[node.id] = true;
    const children = this.getChildren(node);
    for (let i = 0; i < children.length; i++) {
      if (!visited[children[i].id]) {
        result.push(children[i]);
        this.dfs(children[i], result, visited);
      }
    }
  }

  getDecendents(parent) {
    const result = [];
    this.dfs(parent, result, {});
    return result;
  }

  getDecendents(parent) {
    const q = [parent];
    const result = [];
    const visited = {};
    while (q.length) {
      const res = q.shift();
      visited[res.id] = true;
      const children = this.getChildren(res);
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (!visited[child]) {
          result.push(child);
          q.push(child);
        }
      }
    }
    return result;
  }
}
