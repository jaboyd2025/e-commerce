export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container py-6">
      {children}
    </div>
  )
} 