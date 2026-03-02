import { ReactNode } from 'react'

export default function TableSelectionBar({
  total = 0,
  selectedTotal = 0,
  action,
}: {
  total?: number
  selectedTotal?: number
  action?: ReactNode
}) {
  return (
    <div className="w-full py-2 px-4 border rounded-lg flex items-center bg-accent text-accent-foreground">
      <div className="flex-1 text-sm">
        {selectedTotal} of {total} row(s) selected.
      </div>
      <div className="flex items-center-gap-2">{action}</div>
    </div>
  )
}
