export interface WikiNode {
  depth: number;
  children: WikiNode[];
  doc_path: string;
  wiki_path_arr: string[];
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

export interface SideBarItem {
  text: string;
  items?: SideBarItem[];
  link?: string;
  collapsed?: boolean;
}
