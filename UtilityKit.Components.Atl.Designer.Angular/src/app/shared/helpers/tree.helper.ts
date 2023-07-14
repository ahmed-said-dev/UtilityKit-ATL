import { TreeNode } from 'primeng/api';

export class TreeNodeClass<T = any> implements TreeNode {
  label?: string;
  data?: T;
  icon?: string;
  expandedIcon?: any;
  collapsedIcon?: any;
  children: TreeNodeClass<T>[] = [];
  leaf?: boolean;
  expanded?: boolean;
  type?: string;
  parent?: TreeNodeClass<T>;
  partialSelected?: boolean;
  styleClass?: string;
  draggable?: boolean;
  droppable?: boolean;
  selectable?: boolean;
  key?: string;
}
