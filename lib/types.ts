export interface NavItem {
  id: number
  title: string
  target?: string
  visible?: boolean
  children?: NavItem[]
}

