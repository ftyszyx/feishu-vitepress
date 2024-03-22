
export interface Doc {
  title: string;
  meta?: Record<string, any>;
  node_token: string;
  parent_node_token?: string;
  depth: number;
  obj_create_time?: string;
  obj_edit_time?: string;
  obj_token?: string;
  children: Doc[];
  has_child?: boolean;
}

/**
 * 节点信息
 *
 * https://open.feishu.cn/document/server-docs/docs/wiki-v2/space-node/get_node
 * https://open.feishu.cn/document/server-docs/docs/wiki-v2/space-node/list
 */
export interface WikiNode {
  /**
   * 知识空间 id
   */
  space_id: string;
  /**
   * 节点 token
   */
  node_token: string;
  obj_token: string;
  obj_type: "doc" | "docx" | "sheet" | "file";
  /**
   * 父节点 token。若当前节点为一级节点，父节点 token 为空
   */
  parent_node_token?: string;
  /**
   * 节点类型
   *
   * origin：实体
   * shortcut：快捷方式
   */
  node_type: "origin" | "shortcut";
  origin_node_token: string;
  origin_space_id: string;
  has_child: boolean;
  title: string;
  obj_create_time: string;
  obj_edit_time: string;
  node_create_time: string;
  creator: string;
  owner: string;
}
